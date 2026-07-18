# Task 9.1 Gatherings Direction

Status: approved and implemented in Task 9.2.

## Purpose

Gatherings moves the page from private hillside living into human-scale hospitality. It should communicate quiet connection and thoughtful hosting without resembling a wedding venue, banquet hall, conference centre, or wellness clinic.

## Content Lock

- Eyebrow: `Gatherings`
- Title: `A quieter way to gather`
- Body: `Time together takes on a gentler rhythm here, shaped by timber, greenery and the hillside.`
- Occasions: `Private dinners`, `Small corporate retreats`, `Wellness retreats`

The occasions should appear as a restrained typographic list, not cards, feature rows, packages, or bookable products. Do not add capacity, menus, pricing, availability, schedules, or detox/medical language.

## Image Lock

Selected concept visual:

`assets/anvelia/01-current-production-candidates/anvelia-gatherings-quiet-readiness-concept.png`

Generated source: `C:\Users\neo16\.codex\generated_images\019f1838-7eeb-7e82-8034-52d615e4d733\exec-4a9985d4-f04c-4de3-ab50-130e68d49808.png` (`1536x1024`).

The image shows a people-free timber pavilion after rain, a tactile shared table, tea ware, a carafe, sparse linen, a notebook and pencil, one pulled-back chair, and quiet hillside greenery. It is concept material only and does not prove an exact facility, setup, view, service, capacity, or event. Task 9.2 provides 640px, 1024px, and 1536px responsive WebP derivatives in both the asset library and runtime image folder.

## Composition Lock

Desktop and landscape use an image-left, paper-right split of approximately `58 / 42`. This reverses Open-Air Living's copy-left/image-right direction and restores the alternating threshold rhythm of Option 2.

Portrait places the image first and copy second. Crop closely enough that the table, tea ware, carafe, notebook, and pulled-back chair remain the clear subject; hillside greenery is quiet context and the entire image is not forced into view. Apply the same subject priority in landscape so Gatherings does not repeat Open-Air Living's broad veranda-and-view composition.

Use warm paper, ink, forest, timber, and restrained brass accents already defined in the design tokens. Keep the paper panel clean: no botanical illustration, floating card, decorative transition, CTA, or artificial image-to-paper fade. The split itself is the threshold.

## Implementation Evidence

- Option 2 Gatherings crop: `assets/anvelia/08-visual-qa-captures/task9-2-option-2-gatherings-reference-crop.png`
- Desktop: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-desktop-1440x900.png`
- Narrow landscape: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-landscape-800x600.png`
- Portrait: `assets/anvelia/08-visual-qa-captures/task9-2-gatherings-portrait-390x844.png`
- Source comparison: `assets/anvelia/08-visual-qa-captures/task9-2-design-qa-reference-vs-implementation.png`

## Task 9.2 Boundary

Task 9.2 builds the responsive section, creates runtime derivatives, connects the `#gatherings` anchor, and covers the production behavior with focused component and Playwright checks. The implementation remains limited to the approved copy, one semantic occasions list, and the concept image; it adds no CTA, packages, pricing, capacity, availability, form, social links, decorative transition, or image-to-paper fade.
