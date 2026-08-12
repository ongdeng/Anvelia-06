import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readRepositoryFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const homepageHtml = readRepositoryFile("index.html");
const activitiesHtml = readRepositoryFile("activities/index.html");
const mainSource = readRepositoryFile("src/main.tsx");
const deployWorkflow = readRepositoryFile(".github/workflows/deploy-pages.yml");

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
    expect(deployWorkflow).toContain("npx playwright install --with-deps chromium");
    expect(deployWorkflow).toContain("npm run test:e2e");
    expect(deployWorkflow).toContain("npm run test:e2e:pages");
  });
});
