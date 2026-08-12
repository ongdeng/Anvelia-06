import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readRepositoryFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const homepageHtml = readRepositoryFile("index.html");
const activitiesHtml = readRepositoryFile("activities/index.html");
const mainSource = readRepositoryFile("src/main.tsx");
const deployWorkflow = readRepositoryFile(".github/workflows/deploy-pages.yml");
const viteConfig = readRepositoryFile("vite.config.ts");
const robotsPath = resolve(process.cwd(), "public/robots.txt");
const sitemapPath = resolve(process.cwd(), "public/sitemap.xml");
const liveVerifierPath = resolve(
  process.cwd(),
  "scripts/verify-live-release.mjs"
);

type JsonLdEntity = Record<string, unknown>;

const readJsonLdGraph = (html: string): JsonLdEntity[] => {
  const source = html.match(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
  )?.[1];

  if (!source) return [];

  const value = JSON.parse(source) as JsonLdEntity & {
    "@graph"?: JsonLdEntity[];
  };

  return value["@graph"] ?? [value];
};

describe("Task 10.4 production metadata", () => {
  it.each([
    ["homepage", homepageHtml, "https://ongdeng.github.io/Anvelia-06/"],
    [
      "Activities",
      activitiesHtml,
      "https://ongdeng.github.io/Anvelia-06/activities/"
    ]
  ])("publishes complete static metadata for the %s entry", (_, html, url) => {
    expect(html).toContain(`<link rel="canonical" href="${url}" />`);
    expect(html).toContain(`<meta property="og:url" content="${url}" />`);
    expect(html).toContain(
      '<meta property="og:image" content="https://ongdeng.github.io/Anvelia-06/og-anvelia-threshold.jpg" />'
    );
    expect(html).toContain('<meta property="og:image:width" content="1672" />');
    expect(html).toContain('<meta property="og:image:height" content="941" />');
    expect(html).toContain('rel="icon" type="image/png" href="/favicon-32.png"');
    expect(html).toContain('rel="apple-touch-icon" href="/apple-touch-icon.png"');
    expect(html).toContain(
      '<meta name="robots" content="index,follow,max-image-preview:large" />'
    );
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain(
      '<meta property="og:image:alt" content="Concept visual of a timber arrival threshold opening onto a green hillside." />'
    );
    expect(html).toContain(
      '<meta name="twitter:image:alt" content="Concept visual of a timber arrival threshold opening onto a green hillside." />'
    );
    expect(html).toContain('rel="sitemap" type="application/xml"');
    expect(html).toContain('type="application/ld+json"');

    const graph = readJsonLdGraph(html);
    const resort = graph.find((entity) => entity["@type"] === "Resort");
    const webPage = graph.find((entity) => entity["@type"] === "WebPage");

    expect(resort).toMatchObject({
      name: "Anvelia Sanctuary",
      url: "https://ongdeng.github.io/Anvelia-06/",
      telephone: "+60136683113",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lot 8421, Kampung Bukit Tinggi",
        addressLocality: "Bentong",
        addressRegion: "Pahang",
        postalCode: "28750",
        addressCountry: "MY"
      }
    });
    expect(resort).not.toHaveProperty("image");
    expect(resort).not.toHaveProperty("offers");
    expect(resort).not.toHaveProperty("priceRange");
    expect(webPage).toMatchObject({ url });
  });

  it("updates route canonical and Open Graph URLs without duplicating elements", () => {
    expect(mainSource).toMatch(/setCanonicalUrl/);
    expect(mainSource).toMatch(/setMetaContent\(\s*['"]meta\[property=["']og:url/);
  });

  it.each([
    "public/favicon-32.png",
    "public/apple-touch-icon.png",
    "public/icon-192.png",
    "public/icon-512.png",
    "public/og-anvelia-threshold.jpg"
  ])("ships the referenced public asset %s", (assetPath) => {
    expect(existsSync(resolve(process.cwd(), assetPath))).toBe(true);
  });
});

describe("Task 10.4 delivery controls", () => {
  it("ships only the English Latin font subsets", () => {
    expect(mainSource).toContain(
      'import "@fontsource/cormorant-garamond/latin-400.css";'
    );
    expect(mainSource).toContain('import "@fontsource/inter/latin-400.css";');
    expect(mainSource).toContain('import "@fontsource/inter/latin-500.css";');
    expect(mainSource).toContain('import "@fontsource/inter/latin-600.css";');
    expect(mainSource).not.toContain('@fontsource/inter/400.css');
  });

  it("gates deployment on browser and GitHub Pages base-path checks", () => {
    expect(deployWorkflow).toContain(
      "npx playwright install --with-deps chromium webkit"
    );
    expect(deployWorkflow).toContain("npm run test:e2e");
    expect(deployWorkflow).toContain("npm run test:e2e:pages");
  });

  it("ships crawler discovery files for only the released routes", () => {
    expect(existsSync(robotsPath)).toBe(true);
    expect(existsSync(sitemapPath)).toBe(true);

    if (!existsSync(robotsPath) || !existsSync(sitemapPath)) {
      return;
    }

    const robots = readFileSync(robotsPath, "utf8");
    const sitemap = readFileSync(sitemapPath, "utf8");

    expect(robots).toContain("Allow: /Anvelia-06/");
    expect(robots).toContain(
      "Sitemap: https://ongdeng.github.io/Anvelia-06/sitemap.xml"
    );
    expect(sitemap).toContain(
      "<loc>https://ongdeng.github.io/Anvelia-06/</loc>"
    );
    expect(sitemap).toContain(
      "<loc>https://ongdeng.github.io/Anvelia-06/activities/</loc>"
    );
    expect(sitemap).not.toContain("stays");
  });

  it("marks and verifies the exact artifact after deployment", () => {
    const deployJob = deployWorkflow.split(/\r?\n  deploy:\r?\n/)[1];

    expect(existsSync(liveVerifierPath)).toBe(true);
    expect(viteConfig).toContain("anvelia-build");
    expect(viteConfig).toContain("GITHUB_SHA");
    expect(deployJob).toBeDefined();
    expect(deployJob).toContain("uses: actions/checkout@v4");
    expect(deployJob).toContain("uses: actions/setup-node@v4");
    expect(deployJob).toContain("npm run verify:live");
    expect(deployJob).toContain("ANVELIA_EXPECTED_SHA");
    expect(deployJob?.indexOf("uses: actions/deploy-pages@v4")).toBeLessThan(
      deployJob?.indexOf("npm run verify:live") ?? -1
    );
  });
});
