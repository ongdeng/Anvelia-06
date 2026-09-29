import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  imagesByRole,
  siteImages,
  type SiteImage
} from "../../src/content/images";

type ManifestRow = {
  category: string;
  original_path: string;
  library_path: string;
  publication_status: string;
  notes: string;
};

const manifestPath = resolve(
  process.cwd(),
  "assets/anvelia/ASSET_MANIFEST.csv"
);
const manifest = readFileSync(manifestPath, "utf8");

const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
};

const [, ...manifestLines] = manifest.trim().split(/\r?\n/);
const manifestRows = manifestLines.map((line) => {
  const [category, originalPath, libraryPath, publicationStatus, notes] =
    parseCsvLine(line);

  return {
    category,
    original_path: originalPath,
    library_path: libraryPath,
    publication_status: publicationStatus,
    notes
  } satisfies ManifestRow;
});

const normalizePath = (path: string) => path.replaceAll("\\", "/");
const filenameFromPath = (path: string) =>
  normalizePath(path).split("/").at(-1) ?? "";
const findLibraryRow = (libraryPath: string) =>
  manifestRows.find(
    (row) => normalizePath(row.library_path) === normalizePath(libraryPath)
  );
const findRuntimeRow = (assetUrl: string) => {
  const filename = filenameFromPath(assetUrl.split("?")[0]);
  const runtimePath = `src/assets/images/${filename}`;

  return manifestRows.find(
    (row) => normalizePath(row.original_path) === runtimePath
  );
};
const runtimeUrlsFor = (image: SiteImage) => [
  image.src,
  ...(image.smallSrc ? [image.smallSrc] : []),
  ...(image.srcSet
    ? image.srcSet.split(",").map((source) => source.trim().split(/\s+/)[0])
    : [])
];

const activeImages: readonly SiteImage[] = siteImages;
const runtimeSourceStatus = "phase-1-runtime-concept";
const runtimeDerivativeStatus = "phase-1-runtime-concept-derivative";

describe("Phase 1 asset manifest", () => {
  it("records every active source as a non-documentary runtime concept", () => {
    for (const image of activeImages) {
      const row = findLibraryRow(image.sourcePath);

      expect(image.conceptOnly, image.id).toBe(true);
      expect(image.publicationStatus, image.id).toBe(runtimeSourceStatus);
      expect(row, image.sourcePath).toBeDefined();
      expect(row?.publication_status, image.sourcePath).toBe(
        runtimeSourceStatus
      );
      expect(
        row &&
          existsSync(
            resolve(process.cwd(), normalizePath(row.library_path))
          ),
        image.sourcePath
      ).toBe(true);
      expect(row?.notes.toLowerCase(), image.sourcePath).toMatch(
        /concept|decorative/
      );
    }
  });

  it("records every bundled runtime image as a concept source or derivative", () => {
    for (const image of activeImages) {
      for (const assetUrl of new Set(runtimeUrlsFor(image))) {
        const usesOriginalSource = normalizePath(assetUrl.split("?")[0]).replace(/^\//, "") === normalizePath(image.sourcePath);
        const row = usesOriginalSource ? findLibraryRow(image.sourcePath) : findRuntimeRow(assetUrl);
        const filename = filenameFromPath(assetUrl);

        expect(row, filename).toBeDefined();
        expect(row?.publication_status, filename).toBe(
          usesOriginalSource ? runtimeSourceStatus : runtimeDerivativeStatus
        );
        expect(filenameFromPath(row?.library_path ?? ""), filename).toBe(
          filename
        );
        expect(
          row &&
            existsSync(
              resolve(process.cwd(), normalizePath(row.library_path))
            ),
          filename
        ).toBe(true);
      }
    }
  });

  it("keeps reference and superseded imagery outside the runtime inventory", () => {
    expect(activeImages).not.toContain(imagesByRole["cabin-timber-detail"]);
    expect(
      findLibraryRow(
        "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-timber-craft.jpg"
      )?.publication_status
    ).toBe("internal-art-direction-thumbnail");
    expect(
      manifestRows.find((row) =>
        row.library_path.includes("anvelia-mist-forest-transition-optimized.jpg")
      )?.publication_status
    ).toBe("superseded-reference-only");
  });
});
