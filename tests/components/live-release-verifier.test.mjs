import { describe, expect, it } from "vitest";
import {
  inspectHtml,
  inspectRobots,
  inspectSitemap
} from "../../scripts/verify-live-release.mjs";

const baseUrl = "https://ongdeng.github.io/Anvelia-06/";
const imageUrl = `${baseUrl}og-anvelia-threshold.jpg`;
const description = "A quiet hillside resort.";

const validHtml = `<!doctype html>
<html lang="en"><head>
  <title>Anvelia Sanctuary</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="anvelia-build" content="abc123">
  <meta property="og:title" content="Anvelia Sanctuary">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_MY">
  <meta property="og:site_name" content="Anvelia Sanctuary">
  <meta property="og:url" content="${baseUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="Concept visual of a timber threshold.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Anvelia Sanctuary">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="Concept visual of a timber threshold.">
  <link rel="canonical" href="${baseUrl}">
  <link rel="sitemap" type="application/xml" href="${baseUrl}sitemap.xml">
  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Resort",
        "@id": "${baseUrl}#resort",
        "name": "Anvelia Sanctuary",
        "url": "${baseUrl}",
        "telephone": "+60136683113",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lot 8421, Kampung Bukit Tinggi",
          "addressLocality": "Bentong",
          "addressRegion": "Pahang",
          "postalCode": "28750",
          "addressCountry": "MY"
        }
      },
      {
        "@type": "WebPage",
        "url": "${baseUrl}",
        "name": "Anvelia Sanctuary",
        "description": "${description}"
      }
    ]
  }</script>
</head><body></body></html>`;

const expectedPage = {
  url: baseUrl,
  title: "Anvelia Sanctuary",
  description,
  imageUrl,
  expectedSha: "abc123"
};

describe("live release inspection", () => {
  it("accepts complete static crawler metadata", () => {
    expect(inspectHtml(validHtml, expectedPage)).toEqual([]);
  });

  it("rejects a stale build marker and missing social metadata", () => {
    const staleHtml = validHtml
      .replace('content="abc123"', 'content="older"')
      .replace('<meta name="twitter:card" content="summary_large_image">', "");

    expect(inspectHtml(staleHtml, expectedPage)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("anvelia-build"),
        expect.stringContaining("twitter:card")
      ])
    );
  });

  it("rejects social or structured metadata that presents concept imagery as fact", () => {
    const overclaimingHtml = validHtml
      .replaceAll(
        "Concept visual of a timber threshold.",
        "Anvelia Sanctuary timber threshold."
      )
      .replace(
        '"telephone": "+60136683113",',
        `"telephone": "+60136683113", "image": "${imageUrl}",`
      );

    expect(inspectHtml(overclaimingHtml, expectedPage)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("og:image:alt"),
        expect.stringContaining("twitter:image:alt"),
        expect.stringContaining("must not be documentary data")
      ])
    );
  });

  it("accepts the scoped crawler files and rejects unreleased routes", () => {
    const robots = `User-agent: *\nAllow: /Anvelia-06/\nSitemap: ${baseUrl}sitemap.xml\n`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>${baseUrl}</loc></url>
        <url><loc>${baseUrl}activities/</loc></url>
      </urlset>`;

    expect(inspectRobots(robots, baseUrl)).toEqual([]);
    expect(inspectSitemap(sitemap, baseUrl)).toEqual([]);
    expect(inspectSitemap(sitemap.replace("activities/", "stays/"), baseUrl)).toEqual(
      expect.arrayContaining([expect.stringContaining("released URLs")])
    );
  });
});
