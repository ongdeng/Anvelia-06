import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const manifest = readFileSync(
  resolve(process.cwd(), "assets/anvelia/ASSET_MANIFEST.csv"),
  "utf8"
);

const findAssetRow = (assetName: string) =>
  manifest.split(/\r?\n/).find((row) => row.includes(assetName));

describe("Visit asset manifest", () => {
  it("keeps the active Visit sources aligned with the image registry", () => {
    expect(
      findAssetRow("anvelia-visit-arrival-path-concept.png")
    ).toContain('"task-9-3-runtime-candidate"');
    expect(findAssetRow("anvelia-visit-paper-field.png")).toContain(
      '"task-9-3-runtime-candidate"'
    );
    expect(
      findAssetRow("anvelia-mist-forest-transition-optimized.jpg")
    ).toContain('"superseded-reference-only"');
  });
});
