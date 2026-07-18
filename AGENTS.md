# Repository Guidelines

## Project Structure & Module Organization

This repository contains the active Phase 1 Anvelia Sanctuary website.

- `assets/` contains brand, concept, social, responsive derivative, and moodboard imagery.
- `assets/anvelia/ASSET_MANIFEST.csv` records image provenance and publication status.
- `docs/anvelia-design-language.md` is the canonical aesthetic and brand standard.
- `docs/anvelia-current-build-state.md` records approved implementation state.
- `md files/` contains planning/reference documents. Treat older plans as historical comparison unless explicitly reactivated.
- `src/` contains React code, content registries, styles, and runtime assets; `tests/` contains component and Playwright checks.

## Build, Test, and Development Commands

Use `rtk` before shell commands.

```powershell
rtk npm.cmd run dev       # start Vite locally
rtk npm.cmd run build     # type-check and create production output
rtk npm.cmd run test      # run Vitest component/content tests
rtk npm.cmd run test:e2e  # run Playwright behavior checks
```

## Coding Style & Naming Conventions

Keep changes small and traceable to the request. Avoid speculative abstractions, unrelated refactors, and broad formatting churn.

Keep content structured so phase 2 pages and additional languages can be added without rewriting components. Use clear names such as `CabinsSection`, `VisitSection`, and `siteContent`.

## Testing Guidelines

When code exists, test real user-facing behavior: navigation, WhatsApp links, responsive layout, accessibility, and image loading. Prefer focused tests over broad snapshots.

For visual changes, show a preview whenever a major layout, color, imagery, section, or interaction change occurs.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style messages:

```text
feat: build anvelia landing page
fix: correct whatsapp link
docs: update asset guidance
```

Pull requests should include a short summary, screenshots or preview links for visual changes, and tests run.

## Agent-Specific Instructions

Read `docs/anvelia-design-language.md` before visual or content work. Use the actual original Option 2, "Japanese Threshold Resort," as the visual source of truth. Do not use the later hybrid concept or superseded June 23 plan as implementation authority.

Keep Phase 1 resort-first, English-only, and WhatsApp-only, with no pricing, forms, social links, or gallery. `/stays` is a Phase 2 destination and must remain disabled until that page exists. Gatherings and Visit remain planned Phase 1 sections.

Use `src/components/layout/ViewportChapter.tsx` for new full-screen narrative sections. The shared outer contract is one `100svh` chapter in portrait and landscape; preserve content fit through section-specific grid tracks and short-landscape tuning, never clipping or hiding copy.

Current concept imagery is not documentary proof. Use it carefully and avoid copy that implies exact real-world facilities unless confirmed.

When context reaches about 50%, produce a compact handoff summary with decisions, files touched, commands run, and next steps.
