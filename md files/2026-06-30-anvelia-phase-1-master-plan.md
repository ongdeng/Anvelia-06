# Anvelia Phase 1 Master Plan

Detailed task-by-task build plan:

```text
docs/superpowers/plans/2026-06-30-anvelia-phase-1-build-plan.md
```

Canonical design language:

```text
docs/anvelia-design-language.md
```

If aesthetic wording in this plan conflicts with that document, the canonical design language takes precedence.

## 1. Objective

Build a single-page English website for Anvelia Sanctuary that showcases the resort, increases exposure, and makes WhatsApp contact easy. Phase 1 is resort-first, not detox-first. Wellness should appear through atmosphere: fresh hillside air, slower pace, timber, greenery, quiet, and open-air living.

Primary conversion:

```text
WhatsApp Anvelia
https://wa.me/60136683113
```

Do not include pricing, forms, social links, gallery, detox program claims, medical language, exact cabin count, or exact capacity.

Detail principle: communicate “silent wealth” through proportion, material, light, restraint, and attentive hospitality. Avoid rustic tourism, wellness-clinic minimalism, Japanese theming, generic luxury, and decorative spectacle.

## 2. Visual Source Of Truth

Use the actual original Option 2 concept only:

```text
Japanese Threshold Resort
C:\Users\neo16\.codex\generated_images\019f1838-7eeb-7e82-8034-52d615e4d733\ig_015876740a940226016a43b48bc2f0819183671a90b2ee4d6e.png
```

Before build, copy this source into the project, ideally:

```text
assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png
```

Use it for color, layout rhythm, atmosphere, threshold/arrival mood, and Japanese-influenced resort identity. Do not use the later hybrid concept as the base. The header may be simplified for usability only if it still respects Option 2.

## 3. Information Architecture

Single-page section order:

1. Hero
2. Place
3. Cabins
4. Open-Air Living
5. Gatherings
6. Visit
7. Integrated copyright end note within Visit; no separate visible footer

Navigation:

```text
Place / Cabins / Gatherings / Visit / WhatsApp
```

Hero copy:

```text
Anvelia Sanctuary
A hillside resort at the foot of Genting Highlands
Set around 450m above sea level, where cooler evenings and fresh hillside air shape a slower way to stay.
```

Visit copy:

```text
Visitors are welcome. Please WhatsApp before coming so we can receive you properly.
```

Address:

```text
Lot 8421, Kampung Bukit Tinggi
28750 Bentong, Pahang, Malaysia
```

### Section Detail Specifications

Hero:

- Full first impression should feel like arrival through a quiet threshold.
- Use name-led hierarchy; do not lead with the logo.
- Include one primary WhatsApp CTA and one restrained location/elevation line.
- Keep the next section slightly visible on desktop and mobile.

Place:

- Explain foot of Genting Highlands, Bentong/Pahang context, 450m elevation, sunny days, cooler evenings, and fresh hillside air.
- Use a calm landscape or open-air image, not a treatment/program image.
- Include 2-3 small place facts, but avoid fake statistics.

Cabins:

- Describe cabins generally for couples, families, solo travelers, and small groups.
- Use cabin exterior plus one interior or timber detail if available.
- Do not mention count, capacity, price, package names, or availability.

Open-Air Living:

- Show the Japanese-influenced details: wood joinery, shaded seating, greenery, stone, tea, water, and slow outdoor living.
- This section should carry the "every detail is nice" message without saying it too loudly.

Gatherings:

- Mention private dinners, small corporate retreats, and wellness retreats.
- Keep the visual language intimate and quiet, not banquet, wedding, or conference-like.

Visit:

- Make WhatsApp and address obvious.
- Explain that visitors are welcome but should message first.
- Prepare space for a future map link without requiring one in phase 1.

## 4. Recommended Stack

Use a small production frontend stack:

```text
React + TypeScript + Vite
Custom CSS with design tokens
Local optimized imagery
Vitest / Testing Library for component tests
Playwright for responsive and link checks
```

Do not add a large UI framework. This is an editorial resort site, not an admin app.

## 5. Project Structure

When scaffolded, use:

```text
src/
  assets/
    images/
    logos/
  components/
    layout/
    sections/
    ui/
  content/
    siteContent.ts
    images.ts
  styles/
    base.css
    tokens.css
    typography.css
  types/
tests/
  components/
  e2e/
```

Keep `App` as composition only. Section components own section markup. `content/` owns copy so future languages and phase 2 pages are easier.

## 6. Design Token System

Define tokens before building sections.

Color tokens:

```css
--color-paper: #f4efe5;
--color-stone: #d8cbb7;
--color-timber: #4a2f22;
--color-forest: #203a2b;
--color-moss: #6f7b55;
--color-charcoal: #171614;
--color-brass: #b08a54;
```

Typography tokens:

```text
Display: elegant serif or high-end editorial font
Body/UI: clean humanist sans
Line length: about 55-70 characters
Letter spacing: normal, never negative
```

Spacing tokens:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
```

Radius:

```text
0 / 4 / 8 / 12
```

Use restrained shadows. Prefer spacing, alignment, and material contrast over card-heavy layouts.

Layout specifications:

```text
Max content width: 1180-1280px
Wide image band: up to full viewport width
Section padding desktop: 96-144px vertical
Section padding mobile: 56-80px vertical
Grid: 12 columns desktop, 4 columns mobile
```

Material detail rules:

- Use fine borders, hairlines, dividers, and natural texture cues instead of heavy cards.
- Use image crops intentionally: threshold, cabin, timber detail, food/table, open-air setting, visit atmosphere.
- Avoid repeated left-text/right-image blocks. Alternate scale, alignment, and density between sections.
- Keep corners modest. Do not over-round the resort into a SaaS aesthetic.

Typography details:

- Hero title should be elegant and calm, not oversized to the point of shouting.
- Body copy should feel editorial and readable.
- UI labels should be smaller, precise, and consistent.
- Avoid negative letter spacing.

## 7. UI Library Decision

Build a local UI primitive layer instead of importing shadcn, Bootstrap, Material, or Tailwind UI.

Local primitives:

```text
Button
SectionShell
ImageFrame
TextBlock
NavLink
MobileMenu
WhatsAppLink
```

Use icons only where useful. A WhatsApp text CTA is enough for phase 1 unless an icon improves recognition.

Primitive specifications:

- `Button`: primary deep forest/brass treatment, secondary quiet text or outline variant, clear focus state.
- `SectionShell`: controls max width, vertical rhythm, and optional full-bleed image behavior.
- `ImageFrame`: supports portrait, landscape, threshold crop, and detail crop with stable aspect ratios.
- `TextBlock`: consistent heading, body, small fact line, and CTA spacing.
- `MobileMenu`: simple, readable, no oversized animation, closes after anchor selection.
- `WhatsAppLink`: one source of truth for number, URL, accessible label, and optional prefilled message.

Header specifications:

- Respect Option 2 visually, but keep usability clean.
- Desktop header should be thin, quiet, and easy to scan.
- Mobile header should prioritize brand/name and WhatsApp access.
- Avoid loud green WhatsApp styling in the header.

## 8. Asset Plan

Use existing concept assets first. Current concept imagery is not documentary proof, so avoid copy that implies exact real-world facilities unless confirmed.

Required image roles:

- hero threshold / arrival
- hillside place image
- cabin exterior
- cabin or timber detail
- open-air sitting or pavilion
- private dinner / retreat gathering
- visit closing atmosphere

Generate new imagery only if these roles are missing or visually inconsistent.

Asset quality checklist:

- Does the image support the resort story without implying unconfirmed facilities?
- Does the crop feel intentional on mobile and desktop?
- Does it match Option 2's palette and atmosphere?
- Does it add a new kind of evidence or mood, rather than repeating another hillside view?
- Is the file optimized before runtime use?

## 9. Interaction And Responsiveness

Required interactions:

- anchor navigation
- mobile menu
- WhatsApp links from hero, header, and visit
- visible hover/focus states
- functional feedback and reduced-motion-safe restrained reveals only when they improve comprehension
- no decorative section-transition animation, scroll spectacle, or parallax

Preview after every major layout, color, imagery, section, or interaction change.

Responsive checkpoints:

```text
390x844
768x1024
1280x800
1440x900
```

Motion specifications:

- Motion should feel like settling, revealing, or entering, not spectacle.
- Use short fades, subtle image drift, or header transitions only if they improve orientation.
- Reduced motion should show all content immediately.
- Never hide critical copy behind scroll animation.

## 10. Task 10: Design Consistency, Motion, And Production Polish

**Goal:** Resolve the small visual and behavioral inconsistencies that separate the current build from a world-class resort experience. Task 10 introduces no new narrative section. It refines the approved design language across the homepage and Activities page before final handoff.

### 10.1 Visual Consistency Audit

Begin with an audit-only pass. Do not edit until the findings and proposed corrections are approved.

- Compare typography, spacing, alignment, image crops, chapter proportions, and optical baselines.
- Audit paper, timber, botanical, shadow, border, hairline, opacity, and blend treatments.
- Check recurring elements including the header, mobile menu, WhatsApp actions, labels, editorial links, and end note.
- Review chapter transitions and confirm each section feels related without losing its individual rhythm.
- Compare the rendered site against original Option 2 and `docs/anvelia-design-language.md`.

**Deliverable:** A severity-ordered correction register with screenshots, exact locations, recommended fixes, and elements that should remain unchanged. Stop for approval.

**Status:** Audit complete. The approved correction register is `docs/qa/task-10-1-visual-consistency-audit.md`. No interface code was changed during the audit.

### 10.1A Audit Correction Gate

The audit found responsive blockers that must be resolved before motion is introduced. This is a sequencing correction, not a new feature or visual redesign.

#### Correction 1: Stabilize Compact Navigation

**What:** Repair the full-screen menu at `320x568` and `568x320` while preserving its approved imagery, content, and `44px` menu/close widget.

**Method:** Replace tall-portrait fixed positioning with height-aware grid tracks and a dedicated short-landscape arrangement. Keep scrollbar handling stable across top, scrolled, and open states.

**Acceptance:** Every navigation link, WhatsApp action, address line, and close control is reachable without overlap. The menu fits `100svh`, and the widget keeps exactly the same size and position in every state.

#### Correction 2: Remove 320px Horizontal Overflow

**What:** Eliminate the horizontal scrollbar on the homepage, Activities page, and open menu.

**Method:** Correct the interaction between minimum widths, scrollbar reservation, `100vw`, and full-width containers. Fix dimensions at their source; do not conceal the problem with overflow clipping.

**Acceptance:** `scrollWidth` equals `clientWidth` at every locked viewport, with no cropped content or horizontal movement.

#### Correction 3: Repair The Activities Mobile Header

**What:** Prevent the WhatsApp and menu controls from colliding or covering the Activities introduction.

**Method:** Separate the translucent header surface from the fixed menu control's containing block, then rebalance the mobile header grid and content clearance.

**Acceptance:** At `320px` and `390px`, controls never overlap, touch targets remain at least `44px`, and the Activities eyebrow and title remain unobstructed.

#### Correction 4: Restore Compact-Landscape Chapter Fit

**What:** Correct Hero, Place, Cabins, Rhythm, and Gatherings at `568x320` and `844x390`.

**Method:** Add shared short-landscape tuning for grid tracks, image crops, fixed-header clearance, and spacing. Preserve approved desktop and regular-portrait compositions.

**Acceptance:** Every chapter fits one `100svh` screen with no clipped copy, missing link, hidden occasion, or unintended internal scrolling.

#### Correction 5: Refine Place In Portrait

**What:** Bring Place closer to one composed screen without changing its factual meaning or current image.

**Method:** Use one concise paragraph, compact the facts, tighten vertical rhythm, and give the image a controlled portrait track that remains visibly connected to the chapter.

**Acceptance:** Place fits one screen at `320x568` and `390x844`; all facts remain readable, and the result retains the approved Option 2 character.

#### Correction 6: Correct The Smallest Gatherings State

**What:** Recover the final occasion that currently falls below the `320x568` viewport.

**Method:** Tune only the smallest portrait image/text tracks and vertical spacing. Preserve the image-first order, title, three occasions, and current type character.

**Acceptance:** Private dinners, small corporate retreats, and wellness retreats are all visible inside one `100svh` chapter without reducing body text below the practical reading floor.

#### Correction 7: Normalize Practical Type And Optical Alignment

**What:** Resolve undersized supporting copy, detached hairlines, and small baseline inconsistencies.

**Method:** Establish a practical-copy size floor, then align recurring labels, editorial links, end notes, header items, and hairlines using shared tokens where appropriate.

**Acceptance:** Practical information is comfortably legible at every locked viewport; repeated elements share consistent spacing and alignment; decorative rules always feel attached to their intended element.

**Correction gate deliverable:** Before-and-after desktop, portrait, and short-landscape screenshots; changed-file list; measured viewport results; tests run; and remaining risks. Stop for approval after each correction group. Begin Task 10.2 only when responsive geometry is stable.

### 10.2 Motion System

- Define shared motion tokens for duration, easing, delay, movement distance, and opacity.
- Limit motion to orientation and feedback: header state changes, menu opening, focus/hover responses, restrained editorial-link movement, and optional section reveals.
- Motion should feel like settling, revealing, or entering. Do not add parallax, scroll spectacle, decorative transitions, or continuous movement.
- Prevent animation-driven layout shift, hidden critical content, delayed usability, and conflicting motion between components.
- Provide a complete `prefers-reduced-motion` experience with immediate content visibility.

**Method:** Define CSS-first shared motion tokens and apply them only to approved orientation and feedback states. Verify normal and reduced-motion modes separately at representative desktop, portrait, and landscape viewports.

**Acceptance:** One restrained motion vocabulary is used throughout. There is no parallax, continuous movement, layout shift, delayed control response, or critical content hidden behind animation. Reduced-motion mode presents all content immediately.

**Deliverable:** A concise motion specification, implementation preview, and normal/reduced-motion verification. Stop for approval.

### 10.3 Responsive Layout And Surface Polish

- Validate `320x568`, `390x844`, `568x320`, `768x1024`, `844x390`, `1024x768`, `1280x800`, and `1440x900`.
- Preserve every narrative chapter's exact `100svh` contract without clipping, unreadable compression, or horizontal overflow.
- Refine portrait and landscape image crops, fixed-header clearances, text measure, chapter balance, and transition boundaries.
- Ensure textures feel embedded and quiet rather than decorative, repeated, or visibly layered over the composition.

**Method:** Capture before-and-after evidence at every locked viewport, inspect computed chapter dimensions and overflow, and tune only the affected responsive rules, crops, and surface treatments.

**Acceptance:** Every narrative chapter preserves its exact `100svh` contract, all copy and controls remain visible, horizontal overflow is absent, approved compositions remain recognizable, and textures support quiet material depth without competing with content.

**Deliverable:** Before-and-after responsive screenshots and a viewport matrix recording every correction. Stop for approval.

### 10.4 Accessibility, Performance, And SEO

- Verify keyboard order, skip link, focus visibility, landmarks, headings, labels, contrast, and mobile-menu behavior.
- Verify all WhatsApp and internal links, direct Activities loading, GitHub Pages base paths, image loading, and clean console output.
- Check layout stability, responsive image delivery, metadata, Open Graph basics, and reduced-motion behavior.
- Run component tests, production builds, responsive Playwright checks, and the deployed-base smoke test.

**Method:** Combine manual keyboard and screen review with focused component tests, Playwright viewport checks, production builds, link validation, browser-console inspection, and a public deployment smoke test.

**Acceptance:** Keyboard order and focus are complete; semantics and contrast have no critical defects; WhatsApp and internal links work; direct Activities loading and GitHub Pages paths resolve; images and metadata load correctly; tests and production build pass; and the deployed console is clean.

**Deliverable:** Accessibility and production checklist, test output, build result, deployed-base evidence, and any documented residual risk. Stop for approval.

**Execution status (2026-08-12):** Approved and fully verified locally through the fifth final-audit correction, with the remaining corrections proceeding one at a time before Task 11. All 76 component tests and all 65 browser tests pass across Chromium and WebKit after correcting cross-route chapter arrival from `/activities`, enclosing and explicitly focusing the unchanged mobile menu/close control within its modal boundary, reconciling every active concept-image master and bundled derivative with exact manifest records, and adding a Safari-class compatibility matrix to local and deployment CI. Accessibility, contrast, responsive Hero delivery, Latin-only fonts, route metadata, truthful Open Graph imagery, deployment CI, and release-package boundaries are in place. Moodboard and reference-only assets remain outside the active inventory. Evidence and residual release risk are recorded in `docs/qa/task-10-4-accessibility-performance-seo.md`. The current public deployment remains the previous artifact until a separately approved publish action.

### Task 10 Execution Protocol

- Work in the blocker-first order defined by the 10.1 audit.
- Make one correction group at a time and avoid unrelated redesign or refactoring.
- After every major group, show before-and-after previews, changed files, viewports checked, verification results, and remaining risks.
- Continue only after approval. Protect the approved Hero, chapter order, imagery, resort-first copy, material palette, and core Option 2 compositions.

### Task 10 Acceptance Criteria

- One restrained motion vocabulary is used across the complete experience.
- No animation causes distraction, layout shift, clipping, or delayed access to content.
- Repeated components use consistent typography, spacing, alignment, surfaces, and interaction states.
- Textures and image transitions support quiet material depth without competing with copy or imagery.
- Every supported viewport remains readable, premium, and faithful to the Option 2 design language.
- WhatsApp links work, imagery loads, keyboard navigation is complete, and no console or deployment-path errors remain.
- The final build, tests, visual comparison, and public deployment checks pass.

**Final checkpoint:** Show the complete correction register, motion specification, responsive previews, verification output, and Option 2 comparison. Continue to Task 11 handoff only after approval.

Keep changes simple, scoped, and verifiable. Follow `C:\Users\neo16\.codex\skills\claudemd\SKILL.md`: state assumptions, avoid speculative features, make surgical edits, and verify success.
