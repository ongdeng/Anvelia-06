# Anvelia Asset Library

This folder is the central human-facing place to find Anvelia image material. Save every new source or generated picture here under `assets/anvelia/` first, so the project has one clear place to inspect and manage imagery.

It is intentionally separate from runtime folders such as `src/assets/`, `public/`, `outputs/`, `docs/audits/`, and `tests/visual/`. Those original folders remain in place so imports, documentation, generated evidence, and tests do not break.

## Structure

```text
assets/
  anvelia/
    00-brand/
    01-current-production-candidates/
    02-responsive-derivatives/
    03-public-icons-and-social/
    04-creative-direction-sheets/
    05-moodboard-full-generated/
    06-moodboard-thumbnails-mcp/
    07-baseline-audit-screenshots/
    08-visual-qa-captures/
    ASSET_MANIFEST.csv
```

## How To Use

- Start with `assets/anvelia/04-creative-direction-sheets/01-threshold-sequence.png` for the approved visual source of truth.
- Use `assets/anvelia/05-moodboard-full-generated/` and `assets/anvelia/06-moodboard-thumbnails-mcp/` only as internal art-direction material.
- Use `assets/anvelia/01-current-production-candidates/` to inspect available prototype imagery.
- Use `assets/anvelia/02-responsive-derivatives/` to inspect generated runtime derivatives. Some derivatives may be generated from selected `06-moodboard-thumbnails-mcp/` art-direction thumbnails for prototype page placement.
- Use `assets/anvelia/07-baseline-audit-screenshots/` and `assets/anvelia/08-visual-qa-captures/` as review evidence, not production media.
- When new pictures are generated or added, place them in the matching `assets/anvelia/` folder, update `ASSET_MANIFEST.csv`, and update this README if a new folder or category is introduced.

## Publication Rule

Generated imagery and direction sheets are not documentary proof of the real Anvelia property, staff, facilities, food, landscape, or services. Before public launch, production imagery must be verified, approved, optimized, and recorded in the runtime image registry. If an optimized runtime copy is needed elsewhere, derive it from this library and keep the source path traceable.

See `assets/anvelia/ASSET_MANIFEST.csv` for source paths, library paths, publication status, and notes.
