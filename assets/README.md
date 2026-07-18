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
    09-generated-backgrounds/
    ASSET_MANIFEST.csv
```

## How To Use

- Start with `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png` for the approved visual source of truth.
- Use `docs/anvelia-design-language.md` to judge palette, image role, crop, material treatment, and publication tone.
- Use `assets/anvelia/05-moodboard-full-generated/` and `assets/anvelia/06-moodboard-thumbnails-mcp/` only as internal art-direction material.
- Use `assets/anvelia/01-current-production-candidates/` to inspect available prototype imagery.
- Current cabin replacement trial: `assets/anvelia/01-current-production-candidates/anvelia-cabin-calm-stay-concept.png`. It keeps the full cabin form, pitched black roof, timber cladding, glass front, deck, warm interior, bedding glow, and hillside planting while staying calmer and closer to the original product direction.
- Current Open-Air Living candidate: `assets/anvelia/01-current-production-candidates/anvelia-open-air-living-veranda-concept.png`. It replaces the formal ritual-circle composition with an informal timber veranda, tea setting, lounge seating, and hillside outlook; concept visual only, not documentary proof of an exact facility.
- Current Gatherings candidate: `assets/anvelia/01-current-production-candidates/anvelia-gatherings-quiet-readiness-concept.png`. It uses a people-free, rain-darkened timber pavilion and a tactile shared table with tea ware, a carafe, linen, a notebook, and a pulled-back chair to communicate quiet readiness; concept visual only, not proof of an exact facility, setup, view, service, capacity, or event.
- Gatherings runtime derivatives: `assets/anvelia/02-responsive-derivatives/anvelia-gatherings-quiet-readiness-concept-{640,1024,1536}.webp`. Identical copies live in `src/assets/images/` for the responsive runtime registry.
- Gatherings material background: `assets/anvelia/09-generated-backgrounds/anvelia-gatherings-material-paper.png`. This decorative concept translates the approved table image into warm handmade paper, quiet timber embossing, glass-like reflected light, and an abstract cup rhythm. Runtime derivatives are `assets/anvelia/02-responsive-derivatives/anvelia-gatherings-material-paper-{640,1024}.webp`; identical copies live in `src/assets/images/`.
- Current Visit atmosphere: `assets/anvelia/01-current-production-candidates/anvelia-visit-arrival-path-concept.png`. It uses a people-free, rain-darkened stone path, hillside planting, restrained lantern light, a timber threshold edge, and mist-softened hills; concept visual only, not proof of an exact access route, landscape, structure, weather condition, or facility. Runtime WebPs are provided at 640px, 960px, 1280px, and 1586px, with identical copies in `src/assets/images/`.
- Visit material background: `assets/anvelia/09-generated-backgrounds/anvelia-visit-paper-field.png`. This warm handmade-paper field is decorative only. Runtime derivatives are `assets/anvelia/02-responsive-derivatives/anvelia-visit-paper-field-{640,1024}.webp`, with identical copies in `src/assets/images/`.
- Use `assets/anvelia/02-responsive-derivatives/` to inspect generated runtime derivatives. Some derivatives may be generated from selected `06-moodboard-thumbnails-mcp/` art-direction thumbnails for prototype page placement.
- Use `assets/anvelia/07-baseline-audit-screenshots/` and `assets/anvelia/08-visual-qa-captures/` as review evidence, not production media.
- When new pictures are generated or added, place them in the matching `assets/anvelia/` folder, update `ASSET_MANIFEST.csv`, and update this README if a new folder or category is introduced.

## Publication Rule

Generated imagery and direction sheets are not documentary proof of the real Anvelia property, staff, facilities, food, landscape, or services. Before public launch, production imagery must be verified, approved, optimized, and recorded in the runtime image registry. If an optimized runtime copy is needed elsewhere, derive it from this library and keep the source path traceable.

See `assets/anvelia/ASSET_MANIFEST.csv` for source paths, library paths, publication status, and notes.
