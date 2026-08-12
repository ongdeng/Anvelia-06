# Task 8 Design QA Record

> **Historical checkpoint:** This file records the Cabins and Open-Air Living review at the original Task 8 checkpoint. It does not certify the complete Phase 1 website or override `docs/anvelia-design-language.md` and `docs/anvelia-current-build-state.md`. Later refinements and the final whole-site QA remain authoritative.

**Checkpoint Findings**
- No P0/P1/P2 findings remained within the reviewed Task 8 scope at that time.

**Source Visual Truth**
- Path: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`
- Role: Task 8 source for the Cabins and Open-Air Living rhythm: dark forest cabin panel, timber warmth, paper editorial copy, pavilion image, and quiet resort atmosphere.

**Implementation Evidence**
- URL: `http://127.0.0.1:5173/`
- Viewport: `1440x900`, `808x1077`, and `390x844`
- State: Cabins and Open-Air Living sections in the main single-page flow
- Desktop Cabins screenshot: `assets/anvelia/08-visual-qa-captures/task8-cabins-desktop-1440x900.png`
- Desktop Open-Air screenshot: `assets/anvelia/08-visual-qa-captures/task8-open-air-desktop-1440x900.png`
- Mobile Cabins screenshot: `assets/anvelia/08-visual-qa-captures/task8-cabins-mobile-390x844.png`
- Mobile Open-Air screenshot: `assets/anvelia/08-visual-qa-captures/task8-open-air-mobile-390x844.png`
- Full-view comparison evidence: `assets/anvelia/08-visual-qa-captures/task8-design-qa-reference-vs-implementation.png`
- Focused region comparison: the desktop Cabins and Open-Air screenshots isolate the two Task 8 sections; mobile captures verify image-first atmosphere and readable copy.

**Required Fidelity Surfaces**
- Fonts and typography: passed. The display serif keeps the gentle, editorial Anvelia tone. Cabins uses a shorter title to avoid awkward stacking; body and detail labels stay readable and restrained.
- Spacing and layout rhythm: passed. Cabins is image-led with a dark forest panel, while Open-Air is lighter with a paper text block and wide pavilion image. The sections feel distinct rather than repeated templates.
- Colors and visual tokens: passed. Cabins uses forest, night, ivory, and brass. Open-Air returns to paper, ink, timber, and warm light, matching the Option 2 cadence.
- Image quality and asset fidelity: passed for the checkpoint crops. Loading strategy was not a final performance decision; below-fold assets should use the optimized responsive strategy defined during production QA.
- Copy and content: passed. Copy remains resort-first and general. No pricing, forms, social links, gallery, capacity, availability, detox, medical, therapy, clinical, or proof-like facility claims were introduced.

**Patches Made**
- Added `CabinsSection` and `OpenAirLivingSection`.
- Added Task 8 copy to `siteContent.ts`.
- Imported cabin and open-air runtime images through `images.ts`.
- Replaced Cabins/Open-Air placeholders in `App.tsx`.
- Added responsive CSS for desktop, tablet, and phone portrait crops.
- Added component and e2e checks for section order, unique IDs, image loading, crop positions, no fake CTAs, and no horizontal overflow.

**Implementation Checklist**
- Review the Task 8 previews in browser.
- If approved, continue to Task 9 only after explicit user approval.

checkpoint result: passed for the recorded Task 8 scope

## Open-Air Living Refinement - 2026-07-11

**Selected visual target:** `assets/anvelia/01-current-production-candidates/anvelia-open-air-living-veranda-concept.png`

**Evidence:**
- `assets/anvelia/08-visual-qa-captures/open-air-refined-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/open-air-refined-tablet-768x1024.png`
- `assets/anvelia/08-visual-qa-captures/open-air-refined-landscape-1024x768.png`
- `assets/anvelia/08-visual-qa-captures/open-air-refined-desktop-1440x900.png`

**Review:**
- P0/P1/P2 findings: none.
- Copy hierarchy: passed. The section uses one eyebrow, one heading, and one concise paragraph with no detail rows, CTA, or decorative closing rule.
- Responsive composition: passed. Portrait remains one viewport with a 58/42 copy-to-image rhythm; landscape and desktop preserve the alternating split at approximately 38/62.
- Image crop: passed. Tea, informal lounge seating, timber shelter, and hillside remain legible across all reviewed viewports.
- Design language: passed. Paper, ink, timber, restrained greens, natural light, and generous space remain consistent with Japanese Threshold Resort.
- Truthfulness: passed for concept use. Registry and alt text identify the image as a concept visual; no exact facility is claimed in copy.
- Runtime delivery: passed. The original 1536 x 1024 source remains archived and the website uses lazy responsive WebP derivatives.
- Botanical trace: passed. The light botanical source is lazy, decorative, excluded from accessibility output, multiplied into the paper at restrained opacity, and masked away from the primary reading area.
- Botanical evidence: `assets/anvelia/08-visual-qa-captures/open-air-botanical-trace-portrait-390x844.png` and `assets/anvelia/08-visual-qa-captures/open-air-botanical-trace-desktop-1440x900.png`.

final result: passed

## Task 9.2 Gatherings QA - 2026-07-14

**Source visual truth**
- Option 2: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`
- Approved image: `assets/anvelia/01-current-production-candidates/anvelia-gatherings-quiet-readiness-concept.png`
- Focus: Option 2's image-left/paper-right Gatherings rhythm, gentle serif hierarchy, material still life, and restrained hospitality.

**Implementation evidence**
- URL: `http://127.0.0.1:5173/#gatherings`
- Desktop, `1440x900`: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-desktop-1440x900.png`
- Narrow landscape, `800x600`: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-landscape-800x600.png`
- Portrait, `390x844`: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-portrait-390x844.png`
- Full-view comparison: `assets/anvelia/08-visual-qa-captures/task9-2-design-qa-reference-vs-implementation.png`
- Focused-region comparison was not separately required: the 1425px-wide full comparison keeps the source and implementation typography, image crop, panel join, and occasion list legible. The landscape and portrait captures provide the focused responsive evidence.

**Findings and comparison history**
- Initial P2: Gatherings stacked at every width below `820px`, including landscape. Fixed by separating portrait and landscape media rules, retaining the image-left/paper-right split at `800x600`, and aligning `sizes` with the rendered image width.
- Initial test gaps: exact eyebrow/body rendering and the approved portrait crop were not locked. Fixed with exact component assertions and a `50% 54%` Playwright assertion.
- Post-fix review: no P0/P1/P2 findings remain. Independent spec verdict: PASS. Independent code-quality verdict: APPROVED.

**Required fidelity surfaces**
- Fonts and typography: passed. Cormorant Garamond and Inter retain the established editorial hierarchy, natural tracking, and calm line breaks across all reviewed widths.
- Spacing and layout rhythm: passed. Desktop and landscape hold the approved 58/42 threshold; portrait places the image first with generous, readable paper space below.
- Colors and visual tokens: passed. Warm paper, ink, forest, timber, and restrained brass remain within the canonical palette, with no card or artificial join fade.
- Image quality and asset fidelity: passed. The people-free source remains sharp and materially grounded; tea ware, carafe, notebook, table, chair, and hillside context survive the responsive crops. Runtime WebPs are provided at 640px, 1024px, and 1536px.
- Copy and content: passed. The locked copy and semantic three-item list are exact. No CTA, pricing, packages, capacity, availability, form, social link, detox, medical claim, or exact-facility implication was added.

**Behavior and accessibility**
- The `#gatherings` anchor is real, unique, keyboard-targetable through navigation, and clears the fixed header.
- The section has one labelled `h2`, one semantic list, truthful concept alt text, explicit dimensions, lazy loading, responsive `srcset`/`sizes`, and no horizontal overflow.
- Primary Gatherings navigation, responsive layout, image loading, and prohibited-control checks pass in Playwright. In-app browser console check returned no warnings or errors.

final result: passed

## Shared Viewport Chapter QA - 2026-07-14

**Scope:** Open-Air Living and Gatherings now share an exact one-screen outer rhythm while retaining distinct internal compositions.

**Evidence:**
- Portrait Open-Air: `assets/anvelia/08-visual-qa-captures/viewport-contract-open-air-living-portrait-390x844.png`
- Portrait Gatherings: `assets/anvelia/08-visual-qa-captures/viewport-contract-gatherings-portrait-390x844.png`
- Short landscape Open-Air: `assets/anvelia/08-visual-qa-captures/viewport-contract-open-air-living-short-landscape-844x390.png`
- Short landscape Gatherings: `assets/anvelia/08-visual-qa-captures/viewport-contract-gatherings-short-landscape-844x390.png`
- Regular landscape and desktop captures use the same `viewport-contract-*` naming in the QA directory.

**Review:**
- Exact height: passed at `390x844`, `768x1024`, `667x375`, `844x390`, `800x600`, `1024x768`, and `1440x900`.
- Content containment: passed; no copy or image frame crosses the chapter boundary.
- Width coverage: passed; the intermediate landscape minimum-track gap was removed and both splits span the available width.
- Responsive character: passed. Portrait remains vertically composed; landscape remains architectural and split.
- Regression protection: passed through the reusable `ViewportChapter` primitive plus component and Playwright checks.

final result: passed

## Gatherings Material Paper Refinement - 2026-07-15

**Source:** `assets/anvelia/09-generated-backgrounds/anvelia-gatherings-material-paper.png`

**Evidence:**
- `assets/anvelia/08-visual-qa-captures/gatherings-material-background-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/gatherings-material-background-landscape-800x600.png`
- `assets/anvelia/08-visual-qa-captures/gatherings-material-background-desktop-1440x900.png`

**Review:**
- Material relationship: passed. Timber embossing, watery reflection, handmade fibres, and abstract cup impressions correlate with the approved Gatherings photograph without illustrating its objects.
- Hierarchy: passed. A warm paper wash protects the reading area; material detail remains concentrated at the outer and lower-right edges.
- Restraint: passed. The panel reads as clean paper first and reveals texture only on closer inspection.
- Responsiveness: passed. Portrait and landscape use separate crops while preserving title, body, list, and one-screen chapter containment.
- Accessibility and delivery: passed. The decorative image has empty alt text, is hidden from assistive technology, lazy-loads, and uses 640px and 1024px WebP derivatives.

final result: passed

## Task 9.3 Visit QA - 2026-07-16

**Source visual truth**
- Option 2: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`
- Approved target: `C:/Users/neo16/.codex/generated_images/019f1838-7eeb-7e82-8034-52d615e4d733/exec-744451a5-7f46-458d-b399-66a7a0cd3b55.png`
- Arrival source: `assets/anvelia/01-current-production-candidates/anvelia-visit-arrival-path-concept.png`
- Paper source: `assets/anvelia/09-generated-backgrounds/anvelia-visit-paper-field.png`
- Focus: a continuous paper-to-landscape threshold, restrained practical information, and a calm invitation to visit.

**Implementation evidence**
- URL: `http://127.0.0.1:5173/#visit`
- Desktop, `1440x900`: `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-desktop-1440x900.png`
- Portrait, `390x844`: `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-portrait-390x844.png`
- Small portrait, `320x568`: `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-small-portrait-320x568.png`
- Short landscape, `844x390`: `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-short-landscape-844x390.png`
- Compact landscape, `568x320`: `assets/anvelia/08-visual-qa-captures/task9-3-visit-refined-compact-landscape-568x320.png`

**Review**
- Purpose and hierarchy: passed. `Come and see Anvelia` leads into one concise invitation, one `Plan your visit` WhatsApp action, and a quiet practical baseline with the exact address and visible number.
- Design language: passed. The warm paper field blends broadly into a people-free stone path, hillside planting, lantern, and timber edge. The result retains Option 2's threshold rhythm without a card, hard panel seam, artificial spectacle, or decorative excess.
- Responsive composition: passed. Landscape uses a paper-left/image-right continuous field; portrait turns the same relationship vertically so the paper settles into the path below. The chapter remains exactly `100svh` at all locked viewports.
- Compact containment: passed. Copy, CTA, address, divider, and number remain inside the section at `320x568`, `390x844`, `568x320`, and `844x390`. The compact landscape contact baseline stacks cleanly instead of clipping.
- Accessibility and behavior: passed. The section has one labelled heading, one 44px keyboard-accessible WhatsApp link, a semantic address, truthful concept alt text, a decorative paper image hidden from assistive technology, and no map, form, or footer.
- Delivery: passed. The arrival image lazy-loads through 640px, 960px, 1280px, and 1586px WebPs; the paper uses 640px and 1024px WebPs. Intrinsic dimensions and responsive `sizes` match the rendered compositions.
- Truthfulness: passed. The image registry and DOM identify the arrival scene as conceptual; copy does not claim an exact route, view, facility, weather condition, capacity, or availability.
- Provenance: passed. The manifest promotes the active arrival and paper sources, retires the former mist image to reference-only status, and has regression coverage against future drift.
- Verification: 49 Vitest checks passed, production build passed, 25 Playwright checks passed, and `git diff --check` passed.

final result: passed and approved

## Task 9.4 Integrated Closing End Note QA - 2026-07-17

**Approved direction**
- Visit closes with only the timeless text `© Anvelia Sanctuary` over the quiet lower image edge.
- There is no year, separate footer section, repeated address, location, WhatsApp action, navigation, paper strip, hairline, back-to-top control, or added page height.

**Implementation evidence**
- URL: `http://127.0.0.1:5173/#visit`
- Desktop, `1440x900`: `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-desktop-1440x900.png`
- Portrait, `390x844`: `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-portrait-390x844.png`
- Small portrait, `320x568`: `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-small-portrait-320x568.png`
- Short landscape, `844x390`: `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-short-landscape-844x390.png`
- Compact landscape, `568x320`: `assets/anvelia/08-visual-qa-captures/task9-4-integrated-endnote-production-compact-landscape-568x320.png`
- Breakpoint audit, `601x320`: `assets/anvelia/08-visual-qa-captures/task9-4-review-boundary-601x320.png`
- Wide portrait, `834x1194`: `assets/anvelia/08-visual-qa-captures/task9-4-review-wide-portrait-834x1194.png`

**Review**
- Rhythm and hierarchy: passed. The end note behaves as a final whisper within Visit rather than introducing another chapter or repeating practical information.
- Design language: passed. Small warm-white type, modest tracking, and restrained shadow preserve legibility without becoming a badge, banner, or conspicuous legal block.
- Responsive placement: passed. Phone portrait anchors to the lower-left stone path; landscape and the active wide-portrait split anchor to the lower-right image field. The `600/601/610/620px` boundary is covered against address or phone-number collision.
- Structure: passed. The registry owns the wording, the DOM contains one semantic `small`, and neither `footer` nor `role="contentinfo"` is introduced.
- Viewport contract: passed. Visit remains exactly one `100svh` chapter with no extra closing band or scroll height.
- Verification: 50 Vitest checks passed, production build passed, 25 Playwright checks passed, `git diff --check` passed, and independent review returned PASS.

final result: passed; approved

## Task 10.4 Final Production QA - 2026-08-12

**Source and evidence**
- Source: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`
- Final desktop: `assets/anvelia/08-visual-qa-captures/task-10-4/homepage-final-desktop-1440x900.jpg`
- Final portrait: `assets/anvelia/08-visual-qa-captures/task-10-4/homepage-final-portrait-390x844.jpg`
- Final menu: `assets/anvelia/08-visual-qa-captures/task-10-4/mobile-menu-final-390x844.jpg`
- Same-input comparison: `assets/anvelia/08-visual-qa-captures/task-10-4/option-2-vs-final-production-desktop.jpg`

**Final comparison**
- P0/P1/P2 findings: none remain in the Task 10.4 local artifact.
- Visual fidelity: passed. Timber framing, deep shade, warm lantern light, threshold reveal, editorial serif hierarchy, restrained labels, and asymmetric image/copy balance remain faithful to Option 2. The user-approved text-only wordmark and five-item navigation are intentional project refinements.
- Responsive quality: passed. Desktop preserves the architectural split; portrait remains one complete arrival chapter with deliberate cropping, stable controls, readable copy, and no overlap.
- Accessibility: passed. Keyboard order, skip link, named landmarks, semantic headings, modal isolation, focus containment/restoration/transfer, labels, reduced motion, and corrected contrast are verified.
- Truthfulness and SEO: passed. Canonical and Open Graph metadata are route-specific; the approved Hero supplies the share image and is clearly described as conceptual.
- Delivery: passed. Responsive Hero sources, lazy below-fold imagery, Latin-only fonts, clean GitHub Pages paths, CI gates, and decoded-image/console checks are in place.
- Residual release note: the current public Pages deployment is healthy but predates this artifact. It will not expose the Task 10.4 metadata/share asset until a later approved publish action.
- Independent review note: an earlier reviewer identified five accessibility/SEO/CI defects, all now corrected and test-locked. A fresh final reviewer could not run because the subagent service reached its usage limit.

final result: passed
