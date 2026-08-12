# Task 10.3 Responsive Layout And Surface Polish

Status: approved.

## Intent

Preserve the approved Option 2 compositions while making every narrative chapter behave as one complete, calm viewport. This pass corrects geometry and material continuity only; it does not redesign copy, imagery, typography, or section order.

## Findings And Corrections

- Desktop Place measured only `677.8px` at `1024x768`, `710.8px` at `1280x800`, and `756.6px` at `1440x900`. Place and Cabins now use the shared exact `100svh` chapter contract.
- Place, Cabins, Rhythm, and Gatherings used an `88px` anchor offset. The offset exposed adjacent-section strips and pushed final actions below the viewport. Their anchor margin is now zero; internal section spacing continues to clear the fixed header.
- The desktop Place paper field lacked the faint botanical trace visible in the Option 2 source. The approved light botanical asset is now embedded as a low-opacity, multiply-blended surface detail. Portrait placement is preserved.
- The first locked matrix did not exercise the `820px`, `920px`, or short-desktop breakpoint boundaries. It therefore missed a Hero overrun at `820x441`, stacked Place/Cabins compositions that clipped at `800x600`, and two further cliffs found during independent review.
- Place and Cabins no longer switch back to portrait stacking one pixel above `620px`: the approved split applies across all landscape viewports through `820px` width, while compact short-height rules still protect wider screens.
- The Hero no longer jumps from compact to oversized display type between `500px` and `501px` height. Its short-wide title is capped by available height through `700px`, with restrained spacing adjustments that leave locked desktop and portrait compositions unchanged.
- The Task 10.3 browser check now waits for fonts and verifies the bounds of every visible heading, paragraph, link, button, list item, and description item inside each chapter. This prevents a chapter from passing solely because its outer box measures `100svh` while readable content is clipped.
- Existing image crops, alternating split rhythm, paper/forest palette, typography, and content hierarchy remain unchanged.

## Locked Viewport Matrix

| Viewport | Homepage chapters | Activities | Overflow | Visible content |
| --- | --- | --- | --- | --- |
| `320x568` | `6/6` at `568px` | `568px` | none | complete |
| `390x844` | `6/6` at `844px` | `844px` | none | complete |
| `568x320` | `6/6` at `320px` | `320px` | none | complete |
| `768x1024` | `6/6` at `1024px` | `1024px` | none | complete |
| `844x390` | `6/6` at `390px` | `390px` | none | complete |
| `1024x768` | `6/6` at `768px` | `768px` | none | complete |
| `1280x800` | `6/6` at `800px` | `800px` | none | complete |
| `1440x900` | `6/6` at `900px` | `900px` | none | complete |

Each anchored desktop chapter lands at `top: 0`, keeps its heading below the fixed header, and retains its final action or content group inside the viewport.

## Breakpoint Boundary Matrix

The correction pass adds 36 edge cases around the `500/501px`, `620/621px`, `700/701px`, `820/821px`, and `920/921px` transitions. These include the reviewer-identified `768x700`, `800x640`, `820x621`, `1366x500/501`, and `1920x500/501` risks. At all 44 locked and boundary viewports:

- all six homepage chapters match the visible viewport height;
- no visible text or control escapes its chapter bounds;
- chapter `scrollHeight` does not exceed chapter `clientHeight`;
- the document has no horizontal overflow.

## Evidence

Portable correction captures and the complete 44-viewport metric record are stored in:

`assets/anvelia/08-visual-qa-captures/task-10-3-correction/`

The `locked-before/` and `locked-after/` directories contain every homepage chapter and the Activities page at all eight required sizes. Additional PNGs preserve the first correction diagnostics, while `responsive-matrix.json` records the final boundary pass. The locked results were compared directly, and the `1440x900` Hero, Place, and Cabins results were reviewed beside the original Option 2 creative-direction sheet.

## Verification

- `rtk npm.cmd run test`: 63 tests passed.
- `rtk npm.cmd run test:e2e`: 57 tests passed.
- `rtk npm.cmd run build`: production build passed.
- `rtk git diff --check`: passed.
- Browser console: no warnings or errors.

Task 10.4 accessibility, contrast, performance, metadata, and release-readiness work is recorded in `docs/qa/task-10-4-accessibility-performance-seo.md`.
