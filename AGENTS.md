# Repository Guidelines

## Project Structure & Module Organization

This repository is a pre-build website workspace for Anvelia Sanctuary.

- `assets/` contains brand, concept, social, responsive derivative, and moodboard imagery.
- `assets/anvelia/ASSET_MANIFEST.csv` records image provenance and publication status.
- `md files/` contains planning/reference documents. Treat older plans as comparison material unless confirmed.
- Source code and tests have not been scaffolded yet. When added, prefer `src/` for app code, `src/content/` for copy/data, `src/assets/` for runtime assets, and `tests/` for checks.

## Build, Test, and Development Commands

Use `rtk` before shell commands.

There is no `package.json` yet, so no build/test commands are available. After scaffolding, document the real commands here, for example:

```powershell
rtk npm run dev      # start local development server
rtk npm run build    # create production build
rtk npm run test     # run automated tests
rtk npm run lint     # run lint checks
```

Do not add placeholder scripts unless they work.

## Coding Style & Naming Conventions

Keep changes small and traceable to the request. Avoid speculative abstractions, unrelated refactors, and broad formatting churn.

Keep content structured so phase 2 pages and additional languages can be added without rewriting components. Use clear names such as `CabinsSection`, `VisitSection`, and `siteContent`.

## Testing Guidelines

When code exists, test real user-facing behavior: navigation, WhatsApp links, responsive layout, accessibility, and image loading. Prefer focused tests over broad snapshots.

For visual changes, show a preview whenever a major layout, color, imagery, section, or interaction change occurs.

## Commit & Pull Request Guidelines

This folder is not currently a Git repository, so no local commit history is available. When Git is initialized, use concise Conventional Commit-style messages:

```text
feat: build anvelia landing page
fix: correct whatsapp link
docs: update asset guidance
```

Pull requests should include a short summary, screenshots or preview links for visual changes, and tests run.

## Agent-Specific Instructions

Use the actual original visual concept option 2, "Japanese Threshold Resort," as the visual source of truth. Do not use the later hybrid concept as the base. Keep phase 1 resort-first, English-only, WhatsApp-only, with no pricing, forms, social links, or gallery.

Current concept imagery is not documentary proof. Use it carefully and avoid copy that implies exact real-world facilities unless confirmed.

When context reaches about 50%, produce a compact handoff summary with decisions, files touched, commands run, and next steps.
