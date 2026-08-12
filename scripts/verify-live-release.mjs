import { pathToFileURL } from "node:url";

const defaultBaseUrl = "https://ongdeng.github.io/Anvelia-06/";
const defaultAttempts = 12;
const defaultDelayMs = 5_000;

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const attributeValue = (html, selector, attribute = "content") => {
  const [tag, selectorAttribute, selectorValue] = selector;
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) ?? [];

  for (const candidate of tags) {
    const expected = new RegExp(
      `\\b${selectorAttribute}\\s*=\\s*["']${escapeRegExp(selectorValue)}["']`,
      "i"
    );

    if (!expected.test(candidate)) continue;

    const match = candidate.match(
      new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']*)["']`, "i")
    );
    return match?.[1] ?? null;
  }

  return null;
};

const titleValue = (html) => html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null;

const jsonLdValues = (html) =>
  [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

const graphItems = (value) =>
  Array.isArray(value?.["@graph"]) ? value["@graph"] : [value];

export const inspectHtml = (html, expected) => {
  const errors = [];
  const assertValue = (label, actual, wanted) => {
    if (actual !== wanted) errors.push(`${label}: expected ${wanted}, received ${actual}`);
  };

  assertValue("title", titleValue(html), expected.title);
  assertValue(
    "description",
    attributeValue(html, ["meta", "name", "description"]),
    expected.description
  );
  assertValue(
    "robots",
    attributeValue(html, ["meta", "name", "robots"]),
    "index,follow,max-image-preview:large"
  );
  assertValue(
    "anvelia-build",
    attributeValue(html, ["meta", "name", "anvelia-build"]),
    expected.expectedSha
  );
  assertValue(
    "canonical",
    attributeValue(html, ["link", "rel", "canonical"], "href"),
    expected.url
  );
  assertValue(
    "sitemap link",
    attributeValue(html, ["link", "rel", "sitemap"], "href"),
    `${expected.baseUrl ?? defaultBaseUrl}sitemap.xml`
  );

  for (const [property, value] of [
    ["og:title", expected.title],
    ["og:description", expected.description],
    ["og:type", "website"],
    ["og:locale", "en_MY"],
    ["og:site_name", "Anvelia Sanctuary"],
    ["og:url", expected.url],
    ["og:image", expected.imageUrl]
  ]) {
    assertValue(
      property,
      attributeValue(html, ["meta", "property", property]),
      value
    );
  }

  for (const [name, value] of [
    ["twitter:card", "summary_large_image"],
    ["twitter:title", expected.title],
    ["twitter:description", expected.description],
    ["twitter:image", expected.imageUrl]
  ]) {
    assertValue(name, attributeValue(html, ["meta", "name", name]), value);
  }

  for (const [label, alt] of [
    ["og:image:alt", attributeValue(html, ["meta", "property", "og:image:alt"])],
    [
      "twitter:image:alt",
      attributeValue(html, ["meta", "name", "twitter:image:alt"])
    ]
  ]) {
    if (!alt) {
      errors.push(`${label}: missing`);
    } else if (!/^Concept visual\b/i.test(alt)) {
      errors.push(`${label}: concept status is not explicit`);
    }
  }

  const entities = jsonLdValues(html).flatMap(graphItems);
  const resort = entities.find((entity) => entity?.["@type"] === "Resort");
  const webPage = entities.find((entity) => entity?.["@type"] === "WebPage");

  if (!resort) errors.push("JSON-LD Resort: missing");
  if (!webPage) errors.push("JSON-LD WebPage: missing");
  if (resort?.name !== "Anvelia Sanctuary") errors.push("JSON-LD Resort name: invalid");
  if (resort?.url !== (expected.baseUrl ?? defaultBaseUrl)) {
    errors.push("JSON-LD Resort URL: invalid");
  }
  if (resort?.telephone !== "+60136683113") errors.push("JSON-LD Resort telephone: invalid");
  for (const [field, value] of [
    ["streetAddress", "Lot 8421, Kampung Bukit Tinggi"],
    ["addressLocality", "Bentong"],
    ["addressRegion", "Pahang"],
    ["postalCode", "28750"],
    ["addressCountry", "MY"]
  ]) {
    if (resort?.address?.[field] !== value) {
      errors.push(`JSON-LD Resort address ${field}: invalid`);
    }
  }
  if (Object.hasOwn(resort ?? {}, "image")) {
    errors.push("JSON-LD Resort image: concept imagery must not be documentary data");
  }
  if (Object.hasOwn(resort ?? {}, "offers") || Object.hasOwn(resort ?? {}, "priceRange")) {
    errors.push("JSON-LD Resort pricing: Phase 1 must not publish pricing data");
  }
  if (webPage?.url !== expected.url) errors.push("JSON-LD WebPage URL: invalid");
  if (webPage?.name !== expected.title) errors.push("JSON-LD WebPage name: invalid");
  if (webPage?.description !== expected.description) {
    errors.push("JSON-LD WebPage description: invalid");
  }

  return errors;
};

export const inspectRobots = (robots, baseUrl = defaultBaseUrl) => {
  const errors = [];
  if (!/^User-agent:\s*\*/im.test(robots)) errors.push("robots user-agent: missing");
  if (!/^Allow:\s*\/Anvelia-06\/$/im.test(robots)) errors.push("robots allow scope: invalid");
  if (!new RegExp(`^Sitemap:\\s*${escapeRegExp(`${baseUrl}sitemap.xml`)}$`, "im").test(robots)) {
    errors.push("robots sitemap: invalid");
  }
  return errors;
};

export const inspectSitemap = (sitemap, baseUrl = defaultBaseUrl) => {
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(
    (match) => match[1]
  );
  const releasedUrls = [baseUrl, `${baseUrl}activities/`];

  return urls.length === releasedUrls.length &&
    releasedUrls.every((url) => urls.includes(url))
    ? []
    : [`sitemap released URLs: expected ${releasedUrls.join(", ")}, received ${urls.join(", ")}`];
};

const fetchResponse = async (url) => {
  const response = await fetch(url, {
    headers: { "cache-control": "no-cache" },
    redirect: "follow"
  });

  return { response, body: await response.text() };
};

const verifyLive = async () => {
  const baseUrl = process.env.ANVELIA_LIVE_URL ?? defaultBaseUrl;
  const expectedSha = process.env.ANVELIA_EXPECTED_SHA;

  if (!expectedSha) throw new Error("ANVELIA_EXPECTED_SHA is required");

  const pages = [
    {
      path: "",
      title: "Anvelia Sanctuary",
      description:
        "A hillside resort at the foot of Genting Highlands, with cabin stays, open-air living, and quiet gatherings shaped by cooler evenings and fresh hillside air."
    },
    {
      path: "activities/",
      title: "Activities | Anvelia Sanctuary",
      description:
        "Quiet moments at Anvelia Sanctuary, shaped by tea, reading, timber, greenery, and cooler evening air on the hillside."
    }
  ];
  let lastErrors = [];

  for (let attempt = 1; attempt <= defaultAttempts; attempt += 1) {
    const cacheBust = `?release=${encodeURIComponent(expectedSha)}-${attempt}`;
    const errors = [];

    try {
      for (const page of pages) {
        const url = `${baseUrl}${page.path}`;
        const { response, body } = await fetchResponse(`${url}${cacheBust}`);
        if (!response.ok) errors.push(`${url}: HTTP ${response.status}`);
        errors.push(
          ...inspectHtml(body, {
            ...page,
            url,
            baseUrl,
            imageUrl: `${baseUrl}og-anvelia-threshold.jpg`,
            expectedSha
          }).map((error) => `${url}: ${error}`)
        );
      }

      const [robots, sitemap, shareImage] = await Promise.all([
        fetchResponse(`${baseUrl}robots.txt${cacheBust}`),
        fetchResponse(`${baseUrl}sitemap.xml${cacheBust}`),
        fetch(`${baseUrl}og-anvelia-threshold.jpg${cacheBust}`, {
          headers: { "cache-control": "no-cache" }
        })
      ]);

      if (!robots.response.ok) errors.push(`robots.txt: HTTP ${robots.response.status}`);
      if (!sitemap.response.ok) errors.push(`sitemap.xml: HTTP ${sitemap.response.status}`);
      if (!shareImage.ok) errors.push(`Open Graph image: HTTP ${shareImage.status}`);
      if (!shareImage.headers.get("content-type")?.startsWith("image/")) {
        errors.push("Open Graph image: invalid content type");
      }
      errors.push(...inspectRobots(robots.body, baseUrl));
      errors.push(...inspectSitemap(sitemap.body, baseUrl));
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }

    if (errors.length === 0) {
      console.log(`Live release ${expectedSha} verified at ${baseUrl}`);
      return;
    }

    lastErrors = errors;
    if (attempt < defaultAttempts) {
      await new Promise((resolve) => setTimeout(resolve, defaultDelayMs));
    }
  }

  throw new Error(`Live release verification failed:\n${lastErrors.join("\n")}`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  verifyLive().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
