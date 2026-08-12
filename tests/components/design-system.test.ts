import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const readProjectFile = (path: string) =>
  readFileSync(resolve(projectRoot, path), "utf8").replace(/\r\n/g, "\n");

const tokensCss = readProjectFile("src/styles/tokens.css");
const typographyCss = readProjectFile("src/styles/typography.css");
const baseCss = readProjectFile("src/styles/base.css");
const componentsCss = readProjectFile("src/styles/components.css");
const layoutCss = readProjectFile("src/styles/layout.css");
const mainTsx = readProjectFile("src/main.tsx");

describe("design system contract", () => {
  it("keeps the approved Anvelia color tokens exact", () => {
    expect(tokensCss).toContain("--color-paper: #f4efe5;");
    expect(tokensCss).toContain("--color-stone: #d8cbb7;");
    expect(tokensCss).toContain("--color-timber: #4a2f22;");
    expect(tokensCss).toContain("--color-forest: #203a2b;");
    expect(tokensCss).toContain("--color-moss: #6f7b55;");
    expect(tokensCss).toContain("--color-charcoal: #171614;");
    expect(tokensCss).toContain("--color-brass: #b08a54;");
  });

  it("defines reusable type, spacing, layout, and focus decisions", () => {
    expect(tokensCss).toContain("--font-display:");
    expect(tokensCss).toContain("--font-body:");
    expect(tokensCss).toContain("--type-display-size:");
    expect(tokensCss).toContain("--measure-copy:");
    expect(tokensCss).toContain("--space-10: 128px;");
    expect(tokensCss).toContain("--layout-content: 1180px;");
    expect(tokensCss).toContain("--focus-outline: 2px solid var(--color-focus);");
    expect(tokensCss).toContain("--focus-shadow:");
  });

  it("loads token, typography, and base styles in dependency order", () => {
    expect(mainTsx.indexOf("./styles/tokens.css")).toBeLessThan(
      mainTsx.indexOf("./styles/typography.css")
    );
    expect(mainTsx.indexOf("./styles/typography.css")).toBeLessThan(
      mainTsx.indexOf("./styles/base.css")
    );
    expect(mainTsx.indexOf("./styles/base.css")).toBeLessThan(
      mainTsx.indexOf("./styles/components.css")
    );
    expect(mainTsx.indexOf("./styles/components.css")).toBeLessThan(
      mainTsx.indexOf("./styles/layout.css")
    );
  });

  it("keeps typography tokenized and avoids negative letter spacing", () => {
    expect(typographyCss).toContain("font-size: var(--type-display-size);");
    expect(typographyCss).toContain("max-width: var(--measure-copy);");
    expect(
      `${tokensCss}\n${typographyCss}\n${baseCss}\n${componentsCss}\n${layoutCss}`
    ).not.toMatch(/letter-spacing:\s*-\d/);
  });

  it("sets resilient base defaults for later sections", () => {
    expect(baseCss).toContain("img,\npicture,\nsvg");
    expect(baseCss).toContain("button,\ninput,\ntextarea,\nselect");
    expect(baseCss).toContain(":focus-visible");
    expect(baseCss).toContain("text-underline-offset: var(--link-underline-offset);");
  });

  it("keeps Task 6 layout behaviors in the layout stylesheet", () => {
    expect(layoutCss).toContain(".skip-link");
    expect(layoutCss).toContain(".site-header");
    expect(layoutCss).toContain(".mobile-menu-toggle");
    expect(layoutCss).toContain(".mobile-nav-panel");
  });
});
