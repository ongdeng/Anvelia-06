# Task 8.5 Stabilization Report

## Runtime Image Transfer

Measured on a fresh Chromium session after loading the complete visible Phase 1 page. The original active source set totalled 5,611,920 bytes, excluding the mobile-menu image because the menu remained closed.

| Viewport | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| 390 x 844 | 5.61 MB | 282,254 bytes | 95.0% |
| 1440 x 900 | 5.61 MB | 568,002 bytes | 89.9% |

The hero is the only intentionally eager image. Place, Cabins, botanical detail, and Open-Air imagery use lazy delivery. Primary below-fold images use responsive WebP candidates up to their source dimensions while the original source assets remain untouched. Totals reflect the refined Open-Air veranda and its lightweight decorative botanical trace selected after the original Task 8.5 checkpoint.

## Verification

- Vitest: 39 passed.
- Production build: passed.
- Playwright: 21 passed.
- Responsive review: 390 x 844, 768 x 1024, 1024 x 768, 1280 x 900, and 1440 x 900.
- No horizontal overflow, broken requests, console errors, blank anchor states, or menu-widget shifts were found.
- `/stays` is unavailable in Phase 1; its registry-controlled marker remains prepared for Phase 2.

## Visual Evidence

- `assets/anvelia/08-visual-qa-captures/task8-5-stabilized-portrait-390x844.png`
- `assets/anvelia/08-visual-qa-captures/task8-5-stabilized-desktop-1440x900.png`

Open Graph title, description, type, and locale are present. `og:url` remains intentionally unset until a production canonical URL is confirmed. Concept imagery is not promoted as documentary proof in metadata.
