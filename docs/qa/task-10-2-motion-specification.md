# Task 10.2 Motion Specification

Status: implemented and verified.

## Intent

Anvelia motion follows three verbs: **settle, clarify, respond**. It should support orientation and interaction while preserving the site's Japanese-inspired restraint, quiet rhythm, and immediate readability.

Motion is never used to make a chapter feel impressive. Chapters, imagery, copy, and primary actions remain visible on first paint.

## Shared Vocabulary

| Token | Value | Use |
| --- | --- | --- |
| `--motion-duration-fast` | `140ms` | color and direct control feedback |
| `--motion-duration-standard` | `200ms` | surfaces, rules, borders, and shadows |
| `--motion-duration-slow` | `260ms` | one short settling movement |
| `--motion-delay-none` | `0ms` | every current interaction |
| `--motion-ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | composed response |
| `--motion-ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | restrained arrival |
| `--motion-distance-subtle` | `2px` | reserved micro-movement |
| `--motion-distance-settle` | `4px` | menu content entry ceiling |
| `--motion-opacity-enter` | `0.94` | visible menu entry floor |

## Approved Motion

- Header materials and controls transition between top and scrolled states.
- The homepage and Activities headers use one surface layer each; their paper materials never stack.
- Buttons respond through surface and ink changes without lifting.
- The Rhythm editorial rule extends with `transform`, so layout never reflows.
- The full-screen menu surface fades from `0.94` opacity; its content settles by `4px`.
- Focus feedback stays immediate and does not depend on animation.

## Prohibited Motion

- No section reveals, scroll-linked effects, parallax, continuous loops, staggered copy, or decorative chapter transitions.
- No positive delays for navigation, copy, imagery, or calls to action.
- No animated width, height, margin, padding, or layout-track values.
- No motion that hides critical content or blocks input.

## Reduced Motion

With `prefers-reduced-motion: reduce`, all shared transitions and menu animations are removed. The menu opens at full opacity with no transform; editorial rules remain still; chapters and actions remain immediately visible.

## Acceptance

- Normal motion stays between `140ms` and `260ms`.
- Menu geometry and the `44px` menu/close widget remain unchanged through all states.
- Editorial-link feedback causes no layout shift.
- Desktop, portrait, and landscape retain the approved static compositions.
- Reduced-motion mode contains no residual transitions or entry animation.
