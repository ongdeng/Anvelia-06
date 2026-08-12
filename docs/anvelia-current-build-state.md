# Anvelia Current Build State

Updated: 2026-08-12

## Purpose

This file is the compact implementation memory for the Anvelia Sanctuary Phase 1 website. Use it with `AGENTS.md` and `docs/anvelia-design-language.md` before continuing work.

## Approved Direction

- Phase 1 is a single-page English website.
- Visual source of truth is the original Option 2: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`.
- The canonical aesthetic definition is `docs/anvelia-design-language.md`: quiet hillside hospitality, Japanese-influenced thresholds, Malaysian nature, and materially grounded "silent wealth."
- Do not use the later hybrid concept as the base.
- No pricing, forms, social links, or gallery in Phase 1.
- WhatsApp only: `https://wa.me/60136683113`.
- Address: `Lot 8421, Kampung Bukit Tinggi, 28750 Bentong, Pahang, Malaysia`.
- Images are concept visuals unless proven otherwise. Do not overclaim exact facilities, capacity, availability, medical benefits, or documentary accuracy.
- Keep future multilingual support in mind, but build English only for now.

## Content And Data

- User-facing copy is centralized in `src/content/siteContent.ts`.
- Image records are centralized in `src/content/images.ts` with `src`, `alt`, `role`, and `conceptOnly`.
- Phase 1 section order is hero, place, cabins, open-air living, gatherings, and visit. Visit contains the closing copyright end note; there is no separate visible footer section.
- Resort positioning must stay ahead of detox or medical language.
- Cabin copy should remain general and atmospheric, not operationally specific.

## Current Visual State

- Hero keeps the name-led threshold direction and uses the approved entrance/hillside visual.
- Header/navigation has a sticky premium treatment. On smaller portrait screens, the menu control is minimal and should remain consistent in position and widget size between closed, scrolled, and open states.
- Mobile navigation uses a full-screen panel with calm material imagery and quiet links.
- The former Open-Air Living chapter now appears in navigation as `Rhythm` while retaining the `#open-air-living` anchor, selected veranda concept, `Living with the hillside` title, 38/62 landscape split, and one-viewport 58/42 portrait rhythm. Its only onward path is the restrained `See activities` editorial passage.
- `/activities` is a complete secondary page with one exact-viewport editorial chapter, the approved veranda and botanical registry imagery, and three unprogrammed moments grounded in tea, reading, quiet conversation, timber, greenery, and cooler evening air. Secondary-page navigation returns to the homepage anchors, while `/stays` remains disabled.
- Gatherings now uses the approved people-free quiet-readiness concept with a 58/42 image-left/paper-right landscape split and image-first portrait order. Its copy is limited to the approved introduction and one semantic occasions list, with no CTA or operational claims. The text panel carries a bespoke handmade-paper material layer derived from the photograph's timber grain, glass reflection, linen, and abstract cup rhythm; it remains decorative, low contrast, and excluded from accessibility output.
- Visit uses the people-free arrival-path concept with rain-darkened stone, dense hillside planting, a restrained lantern, and a timber threshold edge. A generated warm-ivory paper field blends broadly over the full-bleed image: paper-left/image-right in landscape and paper-above/image-below in portrait. It presents one concise invitation, the exact address, visible WhatsApp number, one `Plan your visit` WhatsApp action, and the timeless `© Anvelia Sanctuary` end note over the quiet lower image edge. It contains no map, form, pricing, social links, separate footer, or repeated closing information.
- Open-Air Living, Gatherings, and Visit use the shared `ViewportChapter` primitive and occupy exactly one `100svh` chapter in portrait and landscape. Their internal compositions remain distinct, and compact landscape rules preserve content fit down to short phone viewports.
- Place section direction favors full-page pacing on portrait while keeping the original landscape feel.
- Cabins section currently uses a split view: image side plus dark green text panel.
- Cabins panel uses `assets/anvelia/09-generated-backgrounds/anvelia-botanical-background-dark.png` as an embedded background texture, controlled in code by opacity, crop, blend, and overlays.
- Cabins CTA text is `Cabin stays`. `/stays` is reserved for Phase 2 and must remain visibly disabled until the page exists.
- Active cabin image trial is `assets/anvelia/01-current-production-candidates/anvelia-cabin-calm-stay-concept.png`. It should preserve the original cabin product cues while adding a calmer stay feeling: full pitched roof, timber cladding, glass front, deck, warm interior, bedding glow, and hillside planting. The closer threshold image remains a reference only because it felt too dark, rainy, and cinematic for the overall site vibe.

## Current Detail Decisions

- Cabins intro text should use the same body-text language as the rest of the site: quiet, refined, not bold or odd.
- Botanical linework should feel embedded into the material, not pasted on as a separate illustration.
- Avoid cheap fades between image and text panels. Prefer restrained overlays, tonal continuity, and negative space.
- Landscape split balance should not let the cabin image dominate the text panel.
- Decorative details must feel intentional and expensive, not generic.
- Do not add decorative transition animation. Separate chapters through image role, composition, crop, material, and tonal rhythm.
- Build future full-screen narrative sections with `src/components/layout/ViewportChapter.tsx`; use section-specific tracks inside the shared one-screen outer rhythm.

## Remaining Phase 1 Work

- Task 8 and Task 8.5 are approved. The upper-page experience is stabilized, `/stays` remains disabled, and the current Open-Air Living direction is accepted.
- Task 9.1 and Task 9.2 are approved: the real Gatherings section, quiet-readiness source, bespoke material paper, responsive derivatives, anchor behavior, narrow-landscape split, and focused test coverage are in place.
- The approved and implemented direction is recorded in `docs/anvelia-task-9-1-gatherings-direction.md`.
- Task 9.3 is approved: the Visit section uses the approved arrival-path imagery, bespoke paper material, continuous responsive composition, one practical contact path, exact anchor alignment, short-landscape containment, and focused test coverage.
- Task 9.4 is approved. The Visit chapter integrates only `© Anvelia Sanctuary` over the quiet lower image edge, with no separate footer or repeated closing information.
- Task 9.5 is approved. `Rhythm` appears in both navigation modes, the homepage passage and complete `/activities` route ship together, and base-aware routing preserves direct `/Anvelia-06/activities/` activation.
- Task 10.1 visual consistency corrections and Task 10.2 motion consistency are implemented and verified.
- Task 10.3 is approved. All six homepage chapters and the Activities chapter hold the exact one-viewport contract across the locked and breakpoint-boundary matrix, with no clipped visible content or horizontal overflow.
- Task 10.4 is approved and fully verified locally. The menu is a named, isolated modal with complete focus behavior; contrast, canonical and Open Graph metadata, truthful share imagery, Latin-only fonts, responsive Hero delivery, deployment CI, and GitHub Pages base-path checks are in place. The final audit is being resolved one finding at a time before Task 11.
- Continue to Task 11 handoff/release preparation only after the final-audit correction gate closes. Do not publish without explicit approval.

## Verification Baseline

Latest known passing checks:

```powershell
rtk npm.cmd run test
rtk npm.cmd run build
rtk npm.cmd run test:e2e
```

Task 9.3 verification: 49 Vitest checks passed, the production build passed, 25 Playwright checks passed, and `git diff --check` passed. The responsive contract covers small and regular phone portrait, compact and short landscape, tablet landscape, and desktop viewports.

Task 9.4 verification: 50 Vitest checks passed, the production build passed, 25 Playwright checks passed, `git diff --check` passed, and independent review passed. The end note remains inside the existing `100svh` Visit chapter at every locked viewport; focused coverage also guards the 600/601/610/620px landscape boundary and the intentional right-side placement in wide portrait.

Task 9.5 verification after independent-review correction: all 63 Vitest checks passed, the normal production build passed, the GitHub Pages build passed and emitted both `dist/index.html` and `dist/activities/index.html` with `/Anvelia-06/` assets, all 17 focused Activities Playwright checks passed, the complete 42-test Playwright suite passed, the deployed-base artifact smoke test passed, and `git diff --check` passed. Coverage locks the label-before-hairline lower-margin relation, readable contained prose at `844x390` and `568x320`, route-specific runtime/static metadata, direct `/Anvelia-06/activities/` activation, and base-aware links. The superseded Task 8 coverage requires exactly one Open-Air link with `See activities` text and the clean Activities destination.

Task 10.3 verification after breakpoint correction: all 63 Vitest checks passed, the production build passed, all 57 Playwright checks passed, `git diff --check` passed, and the browser console remained clean. The complete 44-size matrix spans small portrait through `1920x501`, with the eight locked sizes supplemented by 36 breakpoint-boundary cases. Playwright now checks visible descendant bounds after fonts load, not only chapter geometry. Detailed evidence is recorded in `docs/qa/task-10-3-responsive-layout-surface-polish.md` and `assets/anvelia/08-visual-qa-captures/task-10-3-correction/`.

Task 10.4 verification after the third final-audit correction: all 74 Vitest checks passed, all 61 Playwright checks passed, the normal production build passed, and `git diff --check` passed. Cross-route chapter links from `/activities` now arrive with the selected homepage chapter at the viewport top and focused on desktop and mobile. The mobile modal boundary now contains the unchanged menu/close control while preserving its approved geometry and focus behavior. The public deployment remains the previous artifact until a later approved release. Detailed evidence is recorded in `docs/qa/task-10-4-accessibility-performance-seo.md` and `assets/anvelia/08-visual-qa-captures/task-10-4/`.

Latest visual QA captures:

- `assets/anvelia/08-visual-qa-captures/task-10-4/`
- `assets/anvelia/08-visual-qa-captures/task-10-3-correction/`
- `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-desktop-1440x900.png`
- `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-landscape-800x600.png`
- `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/task9-2-design-qa-reference-vs-implementation.png`
- `assets/anvelia/08-visual-qa-captures/viewport-contract-open-air-living-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/viewport-contract-gatherings-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/viewport-contract-open-air-living-short-landscape-844x390.png`
- `assets/anvelia/08-visual-qa-captures/viewport-contract-gatherings-short-landscape-844x390.png`
- `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-desktop-1440x900.png`
- `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-small-portrait-320x568.png`
- `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-short-landscape-844x390.png`
- `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-compact-landscape-568x320.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-desktop-1440x900.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-small-portrait-320x568.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-short-landscape-844x390.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-compact-landscape-568x320.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-review-boundary-601x320.png`
- `assets/anvelia/08-visual-qa-captures/task9-4-review-wide-portrait-834x1194.png`

## Working Rules

- Before major visual changes, preview or explain the intended result.
- After each major task, stop for approval with changed files, screenshots/previews, and verification.
- Use existing assets first. Generate imagery only when it improves fidelity or solves a clear visual problem.
- Keep edits narrow. Do not refactor unrelated areas or revive old rejected concepts.
- When context gets heavy, update this file and summarize the active state before continuing.
