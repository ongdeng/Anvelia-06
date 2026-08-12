# Task 10.4 Accessibility, Performance, And SEO

Status: Task 10.4 approved; the sixth final-audit correction is implemented and awaiting checkpoint approval before Task 11.

## Corrections

- The mobile navigation is now a named modal dialog whose boundary contains the unchanged menu/close control. While open, the page, skip link, brand, desktop navigation, and header WhatsApp action leave the active accessibility path; Escape restores focus and selecting a chapter moves focus to that destination.
- The focus indicator now uses muted neutral brass with at least `3:1` contrast on paper, forest, timber, and ink. Place fact labels now meet the `4.5:1` normal-text threshold.
- Homepage and Activities publish route-specific canonical URLs, `og:url`, shared-site metadata, theme colour, favicons, and a truthful Open Graph image. The share image reuses the approved threshold Hero rather than implying an unconfirmed resort scale.
- Both static entries now publish robots directives, Twitter-card metadata, a sitemap link, and restrained `Resort`/`WebPage` JSON-LD. Social-image alternatives identify the source as a concept visual; structured resort data deliberately excludes that image, pricing, offers, capacities, and unverified amenities.
- The Hero explicitly selects its 960px portrait or 1600px landscape WebP. Only English Latin font subsets ship.
- GitHub Pages deployment now runs component tests, the complete browser suite, the Pages build, and the deployed-base artifact test before upload.
- Every built page receives the exact Git commit SHA as an `anvelia-build` marker. After deployment, a retrying verifier requires that same SHA and checks both released pages, static metadata, structured data, crawler files, and the share image before CI reports success.

## Accessibility And Behavior

- One `h1`, ordered `h2` chapter headings, named header/navigation landmarks, semantic lists and descriptions, meaningful image alternatives, and hidden decorative imagery are present.
- The skip link, visible focus treatment, menu focus loop, Escape behavior, chapter focus transfer, cross-route chapter arrival, WhatsApp URLs, Activities path, disabled `/stays` destination, and reduced-motion mode are covered by browser tests.
- The full-screen menu remains visually identical to the approved Task 10.3 state; the corrections change semantics and focus behavior, not layout.
- Chromium remains the exhaustive geometry engine, while a dedicated WebKit release matrix now verifies Safari-class rendering at portrait, short-landscape, and desktop sizes; responsive image decoding; fixed-header and full-screen-menu behavior; and the homepage-to-Activities journey.
- Opening the mobile menu now focuses the unchanged menu/close control explicitly. This removes a WebKit pointer-focus ambiguity while preserving its exact `44px` geometry and position.

## Performance And Production

- Standard build: passed. Main JavaScript is `174.94 kB` (`55.20 kB` gzip); CSS is `72.24 kB` (`12.52 kB` gzip).
- GitHub Pages build: passed. The bundle contains 8 Latin font files (`219,484` bytes) and no non-Latin subsets. The 960px Hero is `79.19 kB`; the 1600px Hero is `184.43 kB`.
- Pages artifact smoke: passed. Homepage and direct Activities entry load under `/Anvelia-06/`; links, canonical/social metadata, build marker, crawler files, share image, icons, all decoded images, console, page errors, and failed requests are verified.

## Verification

- `rtk npx.cmd vitest run tests/components/production-readiness.test.ts tests/components/live-release-verifier.test.mjs`: 16 focused tests passed after the deployment-job regression was observed failing first.
- `rtk npm.cmd run test`: 82 tests passed.
- `rtk npm.cmd run test:e2e`: 65 tests passed across Chromium and WebKit.
- `rtk npm.cmd run test:e2e:webkit`: 4 WebKit compatibility tests passed.
- `rtk npm.cmd run build`: passed.
- `rtk npm.cmd run build:pages`: passed.
- `rtk npm.cmd run test:e2e:pages`: 1 test passed.
- `rtk git diff --check`: passed.
- In-app browser: desktop, portrait, menu-modal, Escape, chapter focus, direct Activities, image decoding, and console checks passed.
- Independent correction review: passed with no Critical, Important, or Minor findings.

## Evidence And Residual Risk

- Evidence: `assets/anvelia/08-visual-qa-captures/task-10-4/`.
- Final Task 10.4 captures and the Task 10.3 responsive matrix remain release evidence. Loose iteration captures, redundant runtime-source copies, and local execution logs are excluded from Git; canonical source assets remain under `assets/anvelia/`.
- The current public deployment returns `200` for homepage and Activities but predates this artifact; its new share image, sitemap, and project-path robots file are not live yet. Publishing remains a separately approved release action, after which the SHA verifier must pass.
- GitHub Project Pages cannot publish the origin-level `https://ongdeng.github.io/robots.txt` from this repository. The project-path file at `/Anvelia-06/robots.txt`, per-page robots metadata, and sitemap are release-ready, but origin-level robots control requires the account site or a future custom domain.
- All 11 active image masters remain explicitly registered as `phase-1-runtime-concept`; every bundled runtime file has an exact-path `phase-1-runtime-concept-derivative` manifest record. The original moodboard and reference-only records remain outside the active inventory.
- Registry and manifest tests enforce concept-only treatment, non-documentary notes, exact bundled runtime paths, and the separation between active and reference imagery. Documentary photographs should replace concept visuals when verified material becomes available.

Task 10.4 result: the sixth final-audit correction is complete locally and awaiting checkpoint approval. No visual layout or approved Option 2 treatment changed.
