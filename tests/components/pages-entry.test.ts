import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const activitiesEntryPath = resolve(process.cwd(), "activities/index.html");
const viteConfigPath = resolve(process.cwd(), "vite.config.ts");

describe("Activities production entry", () => {
  it("defines a dedicated Activities HTML entry with static metadata", () => {
    const entryExists = existsSync(activitiesEntryPath);

    expect(entryExists).toBe(true);

    if (!entryExists) {
      return;
    }

    const html = readFileSync(activitiesEntryPath, "utf8").replace(
      /\r\n/g,
      "\n"
    );

    expect(html).toContain("<title>Activities | Anvelia Sanctuary</title>");
    expect(html).toContain(
      'name="description"\n      content="Rhythm at Anvelia Sanctuary, shaped by sunlight, natural wind, meditation, water, tea, and quiet gatherings on the hillside."'
    );
    expect(html).toContain(
      '<meta property="og:title" content="Activities | Anvelia Sanctuary" />'
    );
    expect(html).toContain(
      'property="og:description"\n      content="Rhythm at Anvelia Sanctuary, shaped by sunlight, natural wind, meditation, water, tea, and quiet gatherings on the hillside."'
    );
    expect(html).toContain(
      '<link rel="canonical" href="https://ongdeng.github.io/Anvelia-06/activities/" />'
    );
    expect(html).toContain(
      '<meta property="og:url" content="https://ongdeng.github.io/Anvelia-06/activities/" />'
    );
    expect(html).toContain(
      '<meta property="og:image" content="https://ongdeng.github.io/Anvelia-06/og-anvelia-threshold.jpg" />'
    );
    expect(html).toContain('<script type="module" src="/src/main.tsx"></script>');
  });

  it("configures both homepage and Activities inputs for Vite", () => {
    const config = readFileSync(viteConfigPath, "utf8");

    expect(config).toMatch(/main:\s*htmlEntry\("\.\/index\.html"\)/);
    expect(config).toMatch(
      /activities:\s*htmlEntry\("\.\/activities\/index\.html"\)/
    );
  });
});
