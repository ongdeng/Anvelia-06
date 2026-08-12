# Task 10.1 Visual Consistency Audit

Status: audit complete; no interface code changed.

## Scope And Evidence

The current localhost build was compared with the original Option 2 source, `docs/anvelia-design-language.md`, and `docs/anvelia-current-build-state.md`. The review covered the homepage, `/activities/`, both navigation states, and the locked viewport matrix: `320x568`, `390x844`, `568x320`, `768x1024`, `844x390`, `1024x768`, `1280x800`, and `1440x900`.

Fresh evidence is stored at:

`C:\Users\neo16\.codex\visualizations\2026\07\18\task-10-1-anvelia-audit`

The main comparison is `31-option2-vs-current-desktop-flow.png`. Supporting captures use numbered filenames matching the findings below. Browser inspection found no console warnings or errors.

## Overall Health

The core direction is strong. Desktop and regular phone portrait preserve the Option 2 threshold idea, alternating material rhythm, quiet editorial typography, and resort-first restraint. The project is not yet production-polished at the smallest portrait and short-landscape viewports. Four responsive faults materially interrupt navigation or chapter comprehension and should be corrected before motion is added.

## Correction Register

### S1 - Blocker: compact mobile navigation becomes unusable

**Evidence:** `32-home-menu-mobile-320x568.png`, `33-home-menu-landscape-568x320.png`.

At `320x568`, navigation links, the rule, WhatsApp action, and address overlap. At `568x320`, secondary information appears before the primary links and the panel has a measured `561px` scroll height inside a `320px` viewport. This breaks hierarchy and makes destinations difficult to use.

**Source:** `src/styles/layout.css:1065`, `src/styles/layout.css:1088`, `src/styles/layout.css:1118`. One tall-portrait composition uses `padding-top: clamp(260px, 41svh, 346px)` without a compact-height contract.

**Recommended correction:** keep the approved full-screen timber image and fixed `44px` close widget. Add compact portrait and compact landscape grids where navigation remains the first visual group, footer information remains secondary, and neither group overlaps or depends on hidden scrolling.

**Acceptance:** all five links, WhatsApp, and the address are readable; interactive targets do not overlap; panel scroll height does not exceed the viewport; open/close widgets retain identical size and coordinates.

### S2 - Major: Hero, Place, and Cabins break in short landscape

**Evidence:** `14-home-hero-landscape-844x390.png`, `15-home-cabins-landscape-844x390.png`, `19-home-hero-landscape-568x320.png`, `20-home-cabins-landscape-568x320.png`.

Measured chapter heights:

| Chapter | `568x320` | `844x390` |
| --- | ---: | ---: |
| Hero | `509.5px` | `575.1px` |
| Place | `1031px` | `827.3px` |
| Cabins | `913.3px` | `660px` |

The title, body, imagery, and onward content cannot be understood as one composition. The later chapters already contain compact-height tuning, so the upper page feels like a different responsive system.

**Source:** `src/styles/base.css:55`, `src/styles/layout.css:69`, `src/styles/layout.css:184`. Exact short-landscape rules begin at `src/styles/layout.css:1378` but cover only Rhythm and Gatherings.

**Recommended correction:** define section-specific `100svh` short-landscape tracks for Hero, Place, and Cabins. Preserve the existing imagery and landscape alternation. Reduce spacing and rebalance tracks before reducing type; do not hide copy.

**Acceptance:** each chapter is exactly one viewport at both compact landscape sizes; every required line and action is visible; no text/image overlap occurs; title type remains editorial rather than compressed.

### S2 - Major: Activities phone header controls collide

**Evidence:** `24-activities-mobile-390x844.png`, `27-activities-mobile-320x568.png`.

The `44px` menu widget overlaps the WhatsApp control at `320px` and `390px`. At `320px`, the header also intrudes into the Activities eyebrow. The homepage top state does not show the same collision.

**Source:** `src/styles/activities.css:11` adds `backdrop-filter` to the header. The fixed menu button then resolves inside that containing block while the shared grid still reserves a separate menu column.

**Recommended correction:** keep one positioning model at the Activities top state. Preferred: let the widget occupy its real header grid track, retain WhatsApp as text where it fits, and switch to an accessible compact WhatsApp treatment only at the narrowest width.

**Acceptance:** brand, WhatsApp, and menu have visible gaps; the widget does not cross the paper edge or content; all controls stay at least `44px` where interactive.

### S2 - Major: minimum phone width produces horizontal scrolling

**Evidence:** `28-home-hero-mobile-320x568.png`, `29-home-gatherings-mobile-320x568.png`.

A horizontal scrollbar is visible at `320px`. The document client width is `305px`, while `#root`, `.site-frame`, chapters, and media remain `320px` wide.

**Source:** `src/styles/base.css:12-20` combines `min-width: 320px` with stable scrollbar reservation. `src/styles/layout.css:1070` also uses `100vw` for the menu overlay.

**Recommended correction:** remove the intrinsic `320px` floor from document-level boxes, size app surfaces from the available inline size, and replace viewport-width overlay sizing with a scrollbar-safe inset/percentage contract. Do not merely hide overflow.

**Acceptance:** no horizontal scrollbar or clipped edge at `320x568`; document and body scroll widths equal their client widths in closed and open-menu states.

### S2 - Major: anchored one-screen chapters lose their lower content

**Evidence:** `16-home-rhythm-landscape-844x390.png`, `17-home-gatherings-landscape-844x390.png`, `21-home-rhythm-landscape-568x320.png`, `22-home-gatherings-landscape-568x320.png`.

Rhythm and Gatherings are correctly `100svh`, but landscape anchor navigation places their top `88px` below the viewport. Their bottom `88px` then falls outside the screen: `See activities` disappears and occasion content is clipped. Visit avoids the problem because it uses zero scroll margin.

**Source:** `src/styles/layout.css:384`, `src/styles/layout.css:505`, and the fixed header at `src/styles/layout.css:848`.

**Recommended correction:** preserve the exact `100svh` chapter and use zero-offset chapter anchors where the internal safe area already clears the header. Do not reduce the chapter to `calc(100svh - 88px)` because that would break the approved pacing.

**Acceptance:** navigation arrival reveals each whole chapter and its final action/list item at `568x320` and `844x390`; headings remain unobscured by the header.

### S2 - Major: Place portrait remains too long and too dense

**Evidence:** `30-home-place-mobile-390x844.png`, `02-home-place-desktop-1440x900.png`, and the Option 2 comparison.

Place measures `1028.9px` at `320x568` and `986.2px` at `390x844`. The image is disconnected from the first view, while two paragraphs plus three fact rows make this chapter more operational and dense than the approved quiet rhythm. The flat paper field is also the weakest material bridge to Option 2.

**Source:** stacked mobile rules at `src/styles/layout.css:1196` and `src/styles/layout.css:1456`; the section has no shared one-screen outer contract.

**Recommended correction:** retain the title, hillside image, and verified facts. Consolidate the narrative to one concise paragraph, compact the facts without card styling, use a controlled portrait image track, and add only a very faint archival botanical trace tied to the source direction.

**Acceptance:** Place reads as one composed chapter at regular portrait, remains substantially closer to one screen at `320x568`, and shows a clear copy-to-image relationship without clipping or tiny type.

### S3 - Moderate: smallest portrait Gatherings loses the last occasion

**Evidence:** `29-home-gatherings-mobile-320x568.png`.

At `320x568`, measured text ends at `580.1px` inside a `568px` chapter, leaving `Wellness retreats` below the viewport.

**Recommended correction:** tune only the smallest portrait spacing and image/text track. Preserve the image-first order, all three occasions, and current type character.

**Acceptance:** all content is visible inside one `100svh` chapter with no type below the established readable floor.

### S3 - Moderate: supporting type becomes too quiet at edge sizes

Activities moment descriptions reach about `10.2px`; the Visit end note is about `9.8px`; several practical labels are near `10.9px`. Small uppercase accents may remain delicate, but explanatory and practical copy should not depend on unusually sharp screens.

**Recommended correction:** preserve display sizes and label character, then establish a separate practical-copy floor and recheck line length after the fit corrections. Full contrast validation belongs to Task 10.4.

**Acceptance:** body and practical information remain comfortably legible at all locked viewports without disturbing hierarchy.

## Protected Elements

Do not redesign these during correction work:

- the name-led threshold Hero, current entrance image, and desktop/regular-portrait crop;
- the alternating architectural chapter rhythm and people-free imagery;
- Cabins' current calm cabin image, deep forest panel, and embedded botanical field;
- Rhythm's veranda image, paper field, concise copy, and `See activities` editorial passage;
- Gatherings' people-free table image, `58/42` landscape balance, bespoke paper material, and three approved occasions;
- Visit's paper-to-path blend, exact address and WhatsApp information, and integrated end note;
- the desktop/tablet scrolled paper header and the stable `44px` menu/close widget demonstrated at `390x844`;
- the restrained label-plus-hairline language and absence of decorative section animation;
- resort-first, concept-disclosed copy with no pricing, medical claims, forms, social links, or unverified facility detail.

## Evidence Limits

This pass evaluates rendered visual consistency and responsive geometry. It does not certify WCAG contrast, keyboard behavior, performance budgets, metadata, or the final motion vocabulary; those remain Task 10.2-10.4 work. Lazy images were verified in their reached chapter states, and no browser console warnings or errors were observed.

## Recommended Execution Order

1. Repair the compact menu, `320px` overflow, and Activities phone header.
2. Restore Hero, Place, Cabins, and anchored chapter fit across compact landscapes.
3. Refine the Place portrait composition and the smallest Gatherings state.
4. Normalize practical type and optical micro-alignment.
5. Begin Task 10.2 motion only after the responsive geometry is stable.

Stop here for approval before any interface correction.
