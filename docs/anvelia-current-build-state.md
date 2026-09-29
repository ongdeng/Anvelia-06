# Anvelia Current Build State

Updated: 2026-09-29

## Purpose

This file is the compact implementation memory for the Anvelia Sanctuary Phase 1 website. Use it with `AGENTS.md` and `docs/anvelia-design-language.md` before continuing work.

## Approved Experiences Integration

- The approved spatial study (r18 typography and r19 usability) now replaces the old Long Veranda content on the real `/activities/` route. The private `outputs/experiences-spatial-study/` preview is retained locally for comparison. The user authorised uploading the approved header and Experiences changes to `ongdeng/Anvelia-06` on September 29. The `main` push triggers the existing gated GitHub Pages workflow; inspect its result before claiming a live release.
- The page title is `Experiences`; homepage navigation remains `Rhythm`, and its existing `See activities` passage is unchanged. The three natural-height chapters are Move & Explore (pickleball, ATV, jungle trekking), Water & Warmth (Skyedge pool, dry sauna, natural hot spring), and Quiet rituals (Chinese tea, yoga, sound healing, Thai massage).
- Runtime content lives in `src/content/siteContent.ts`, the sequence in `src/components/pages/ExperiencesSequence.tsx`, and scoped styles in `src/styles/experiences.css`. Genuine Cormorant 400 italic and 500 upright preserve the approved typographic hierarchy. All ten activity titles use 500; Thai bodywork copy retains balanced wrapping.
- Preserve the approved paper, transitions, crops, 10.5% wide-landscape inset and intentional return-link alignment offset. Homepage chapters and the approved header were not redesigned. The single ending action is `Return to Rhythm`, targeting the base-aware `/#open-air-living` anchor. No booking copy or additional contact action was added.
- Eleven PNG originals were copied byte-for-byte into `src/assets/images/experiences/`, registered with truthful concept provenance and bundled independently of `outputs/`. Real photographs are still pending. Do not replace, crop, convert or optimise this provisional imagery without approval; the retained originals total about 30.5 MB, so final delivery optimisation remains unfinished.
- Current verification: 113 component tests in 22 files pass; normal and GitHub Pages builds pass. In-app Chromium comparison at 320x740, 390x844, 768x1024, 844x390 and 1440x900 found identical geometry and typography to the approved study, with no horizontal or text overflow. The built `/Anvelia-06/activities/` route loads all ten images, preserves medium-weight titles, and returns to/focuses the Rhythm chapter. Homepage onward navigation and mobile-menu Escape restoration also work.
- E2E definitions were updated and all 67 tests enumerate successfully; the full Chromium/WebKit suite was not rerun for this integration. An independent final review was unavailable due to the reviewer usage limit; parent-agent source and browser checks were completed. Evidence: `outputs/experiences-spatial-study/applied-parity-r20.json`, `applied-navigation-r20.json` and `applied-*-r20.png`.
- Upload preflight: all 85 production component tests across 13 files pass, the Pages build passes, and `git diff --check` is clean. The earlier 113-test count includes 28 local study tests that are not release files. Experimental `outputs/`, local screenshots and historical study notes are excluded from this upload; the runtime assets, production styles and tests are included. CI must run the complete browser suite before deployment.

## Approved Header Refinement

- The 2026-09-18 header-only preview is approved and applied locally in `src/styles/header.css`, loaded after the existing page styles. No hero, chapter, imagery, copy, or menu behavior was changed.
- Preserve the existing Cormorant Garamond wordmark: larger Anvelia, smaller Sanctuary, centered alignment, and natural tracking. Desktop navigation and WhatsApp are unboxed.
- The header is transparent over the homepage arrival image, then becomes a full-width warm-paper surface with forest-colored text and a faint bottom border. It has no floating frame, blur, or shadow.
- Mobile retains the wordmark and an unboxed two-line menu control with a 44px target. Header WhatsApp appears inside the existing menu instead of beside the toggle. Control positions remain stable across scroll and menu states.
- Activities uses the paper header and dark text from initial load. Reduced-motion preferences suppress the header transitions.
- Verification: 84 component tests and all 67 Chromium/WebKit browser tests pass, including updated header contracts, menu focus, section anchors, and responsive chapter containment. Desktop and mobile screenshots are under `outputs/header-preview/applied-*.png`.
- This refinement is included in the September 29 authorised upload. Earlier release notes below describe their respective checkpoints.

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
- Header/navigation uses the approved full-width treatment described above. Preserve the wordmark and menu control positions between closed, scrolled, and open states.
- Mobile navigation uses a full-screen panel with calm material imagery and quiet links.
- The former Open-Air Living chapter now appears in navigation as `Rhythm` while retaining the `#open-air-living` anchor, selected veranda concept, `Living with the hillside` title, 38/62 landscape split, and one-viewport 58/42 portrait rhythm. Its only onward path is the restrained `See activities` editorial passage.
- `/activities/` uses the approved Experiences spatial composition described above: three distinct chapters, ten activities and one quiet return to Rhythm. It supersedes the Long Veranda design. Secondary-page navigation returns to homepage anchors, while `/stays` remains disabled.
- Gatherings now uses the approved people-free quiet-readiness concept with a 58/42 image-left/paper-right landscape split and image-first portrait order. Its copy is limited to the approved introduction and one semantic occasions list, with no CTA or operational claims. The text panel carries a bespoke handmade-paper material layer derived from the photograph's timber grain, glass reflection, linen, and abstract cup rhythm; it remains decorative, low contrast, and excluded from accessibility output.
- Visit uses the people-free arrival-path concept with rain-darkened stone, dense hillside planting, a restrained lantern, and a timber threshold edge. A generated warm-ivory paper field blends broadly over the full-bleed image: paper-left/image-right in landscape and paper-above/image-below in portrait. It presents one concise invitation, the exact address, visible WhatsApp number, one `Plan your visit` WhatsApp action, and the timeless `© Anvelia Sanctuary` end note over the quiet lower image edge. It contains no map, form, pricing, social links, separate footer, or repeated closing information.
- The homepage Open-Air Living, Gatherings, and Visit sections use the shared `ViewportChapter` primitive and occupy exactly one `100svh` chapter in portrait and landscape. Their internal compositions remain distinct, and compact landscape rules preserve content fit down to short phone viewports.
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
- Task 10.3 is approved for all six homepage chapters. Activities has used a natural-height editorial exception since 2026-08-24, now retained by the September 29 Experiences composition; responsive containment and overflow protections remain mandatory.
- Task 10.4 and its sixth final-audit correction are approved and committed. The menu is a named, isolated modal with complete focus behavior; contrast, canonical/social/structured metadata, truthful concept-image treatment, crawler artifacts, Latin-only fonts, responsive Hero delivery, deployment CI, exact build identification, and GitHub Pages base-path checks are in place.
- Task 11 is approved. Phase 1 is complete, with final evidence and the release boundary recorded in `md files/2026-06-30-anvelia-phase-1-handoff.md`. Publication remains a separate explicit action.
- The 2026-08-24 Long Veranda content and `Plan your visit` ending are superseded by the September 29 Experiences integration. Remaining work is real photography and delivery optimisation, a full cross-browser regression run, and separately authorised publication.

## Verification Baseline

The September 29 integration verification is recorded above. The checkpoints below are historical, including their browser-test counts.

Earlier release verification commands:

```powershell
rtk npm.cmd run test
rtk npm.cmd run build
rtk npm.cmd run test:e2e
```

Task 9.3 verification: 49 Vitest checks passed, the production build passed, 25 Playwright checks passed, and `git diff --check` passed. The responsive contract covers small and regular phone portrait, compact and short landscape, tablet landscape, and desktop viewports.

Task 9.4 verification: 50 Vitest checks passed, the production build passed, 25 Playwright checks passed, `git diff --check` passed, and independent review passed. The end note remains inside the existing `100svh` Visit chapter at every locked viewport; focused coverage also guards the 600/601/610/620px landscape boundary and the intentional right-side placement in wide portrait.

Task 9.5 verification after independent-review correction: all 63 Vitest checks passed, the normal production build passed, the GitHub Pages build passed and emitted both `dist/index.html` and `dist/activities/index.html` with `/Anvelia-06/` assets, all 17 focused Activities Playwright checks passed, the complete 42-test Playwright suite passed, the deployed-base artifact smoke test passed, and `git diff --check` passed. Coverage locks the label-before-hairline lower-margin relation, readable contained prose at `844x390` and `568x320`, route-specific runtime/static metadata, direct `/Anvelia-06/activities/` activation, and base-aware links. The superseded Task 8 coverage requires exactly one Open-Air link with `See activities` text and the clean Activities destination.

Task 10.3 verification after breakpoint correction: all 63 Vitest checks passed, the production build passed, all 57 Playwright checks passed, `git diff --check` passed, and the browser console remained clean. The complete 44-size matrix spans small portrait through `1920x501`, with the eight locked sizes supplemented by 36 breakpoint-boundary cases. Playwright now checks visible descendant bounds after fonts load, not only chapter geometry. Detailed evidence is recorded in `docs/qa/task-10-3-responsive-layout-surface-polish.md` and `assets/anvelia/08-visual-qa-captures/task-10-3-correction/`.

Task 10.4 verification after the sixth final-audit correction: all 82 Vitest checks passed, all 65 Playwright checks passed across Chromium and WebKit, both production builds passed, the GitHub Pages artifact smoke passed, `git diff --check` passed, and independent review found no issues. Static homepage and Activities entries now include truthful social metadata, restrained resort/page structured data, sitemap discovery, and an exact build-SHA marker. Deployment CI verifies the propagated SHA and public metadata before reporting success. The public deployment remains the previous artifact until a later approved release; the GitHub Project Pages origin-level robots limitation is documented in `docs/qa/task-10-4-accessibility-performance-seo.md`.

Task 11 approved final review: fresh desktop, portrait, menu, short-landscape, and dedicated Place, Rhythm, Gatherings, Visit, and Activities captures were compared with the original Option 2 and the canonical design-language checklist. The final verification matrix again passed with 82 Vitest checks, 65 Chromium/WebKit checks, both builds, the GitHub Pages artifact smoke, and a clean browser console. No Phase 1 blocker was found; documentary photography and expanded routes remain Phase 2 work. Evidence is in `assets/anvelia/08-visual-qa-captures/task-11-final/`.

2026-08-24 Long Veranda verification: all 83 Vitest checks passed, both production builds passed, all 63 Chromium checks and all 4 WebKit checks passed, and the page was visually checked at `390x844`, `834x1194`, `844x390`, and `1440x900`. The final page has no horizontal overflow, preserves truthful concept-image treatment, keeps a deliberate stacked rhythm through portrait-tablet widths, and leaves the homepage viewport chapters unchanged. Evidence is in `assets/anvelia/08-visual-qa-captures/task-rhythm-long-veranda/`.

Latest visual QA captures:

- `assets/anvelia/08-visual-qa-captures/task-11-final/`
- `assets/anvelia/08-visual-qa-captures/task-rhythm-long-veranda/`
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
