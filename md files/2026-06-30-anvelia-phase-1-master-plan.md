# Anvelia Phase 1 Master Plan

Detailed task-by-task build plan:

```text
docs/superpowers/plans/2026-06-30-anvelia-phase-1-build-plan.md
```

## 1. Objective

Build a single-page English website for Anvelia Sanctuary that showcases the resort, increases exposure, and makes WhatsApp contact easy. Phase 1 is resort-first, not detox-first. Wellness should appear through atmosphere: fresh hillside air, slower pace, timber, greenery, quiet, and open-air living.

Primary conversion:

```text
WhatsApp Anvelia
https://wa.me/60136683113
```

Do not include pricing, forms, social links, gallery, detox program claims, medical language, exact cabin count, or exact capacity.

Detail principle: every visible element should feel considered. Anvelia should not look like a template with resort images dropped in. The page should feel built from timber, stone, air, shade, greenery, and careful spacing.

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
7. Footer

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
- visit/footer atmosphere

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
- WhatsApp links from hero, header, visit, and footer
- visible hover/focus states
- reduced-motion-safe reveal animations if motion is added

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

## 10. Quality Gates

Before handoff:

- build passes
- no broken images
- WhatsApp link opens correctly
- no horizontal mobile overflow
- keyboard navigation works
- headings and landmarks are semantic
- page title and meta description exist
- rendered design is compared against Option 2
- details pass: header spacing, button states, image crops, section rhythm, mobile WhatsApp access, and visit/address clarity

Keep changes simple, scoped, and verifiable. Follow `C:\Users\neo16\.codex\skills\claudemd\SKILL.md`: state assumptions, avoid speculative features, make surgical edits, and verify success.
