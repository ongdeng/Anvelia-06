# Anvelia Rhythm And Activities Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` and `superpowers:test-driven-development` to implement this plan. Steps use checkbox syntax for tracking.

**Goal:** Refine Open-Air Living into the `Rhythm` chapter, add it to both navigation modes, and connect its quiet editorial passage to a complete `/activities` page.

**Architecture:** Keep all English copy, destinations, and route metadata in `siteContent.ts`. The homepage keeps the approved `#open-air-living` anchor, `38/62` landscape split, `58/42` portrait split, botanical paper, and veranda image. A tested base-path utility normalizes the deployed pathname and renders base-aware links; `App.tsx` selects the homepage or a self-contained Activities page after stripping `import.meta.env.BASE_URL`. Vite emits both homepage and Activities HTML entries so direct GitHub Pages activation works, and startup metadata follows the selected route.

**Tech Stack:** React 18, TypeScript, Vite, CSS, Vitest, Testing Library, Playwright.

## Global Constraints

- Original Option 2, “Japanese Threshold Resort,” remains the visual source of truth.
- Keep the work resort-first, quiet, materially grounded, Japanese-influenced, and free of spectacle.
- Phase 1 remains English-only and WhatsApp-only, with no pricing, forms, social links, or gallery.
- Do not claim scheduled programming, exact facilities, capacity, availability, medical outcomes, or documentary proof.
- Current imagery remains concept-only.
- The homepage Rhythm chapter remains exactly `100svh`. The original single-viewport Activities constraint is superseded by the approved 2026-08-24 `Long Veranda` amendment below; the secondary page must remain free of clipped copy and horizontal overflow.
- Do not change the approved homepage section order, Rhythm image, split proportions, or title `Living with the hillside`.
- Do not expose an unfinished destination: `/activities` and its link ship together.

---

### Task 9.5: Rhythm Passage And Activities Page

**Files:**
- Create: `src/components/pages/ActivitiesPage.tsx`
- Create: `src/styles/activities.css`
- Create: `tests/components/activities-page.test.tsx`
- Create: `tests/e2e/activities.spec.ts`
- Create: `activities/index.html`
- Create: `src/utils/basePath.ts`
- Create: `tests/components/base-path.test.ts`
- Create: `tests/components/page-metadata.test.tsx`
- Create: `tests/components/pages-entry.test.ts`
- Create: `playwright.pages.config.ts`
- Create: `tests/e2e/pages-build.spec.ts`
- Modify: `vite.config.ts`
- Modify: `playwright.config.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/components/sections/OpenAirLivingSection.tsx`
- Modify: `src/content/siteContent.ts`
- Modify: `src/styles/layout.css`
- Modify: `tests/components/site-content.test.tsx`
- Modify: `tests/components/site-header.test.tsx`
- Modify: `tests/e2e/site.spec.ts`
- Modify: `docs/anvelia-current-build-state.md`
- Modify: `docs/superpowers/plans/2026-06-30-anvelia-phase-1-build-plan.md`

**Interfaces:**
- `siteContent.nav` order: `Place`, `Cabins`, `Rhythm`, `Gatherings`, `Visit`.
- `Rhythm` points to the existing `#open-air-living` anchor.
- `siteContent.openAirLiving.eyebrow`: `Rhythm`.
- Homepage passage label: `See activities`; clean destination: `/activities`, rendered with the configured base and trailing directory slash.
- Activities copy uses the approved experiential direction: sunlight, natural wind, meditation, water, time at the spa, tea, private dinners, intimate gatherings, and a quiet hillside pace. It must not imply schedules, treatment outcomes, exact facilities, or guaranteed availability.
- `SiteHeader` accepts a secondary-page mode that renders home-rooted anchors such as `/#place` and `/#open-air-living`.

- [x] **Step 1: Add failing registry and component tests**

Assert the exact five-item navigation order, Rhythm anchor mapping, CTA label and route, complete Activities content, home-rooted secondary navigation, semantic page structure, concept-image disclosure, and absence of pricing/medical/program/capacity claims.

- [x] **Step 2: Run focused tests and verify RED**

Run: `rtk npm.cmd run test -- tests/components/site-content.test.tsx tests/components/site-header.test.tsx tests/components/activities-page.test.tsx`

Expected: FAIL because Rhythm content, the Activities page, and secondary-page navigation do not exist.

- [x] **Step 3: Implement centralized content and routing**

Add the fifth nav item, CTA fields, and concise Activities-page registry. Route `/activities` to `ActivitiesPage`; preserve the existing `/stays` redirect and primitive preview.

- [x] **Step 4: Implement the approved visual treatment**

Add a 44px-minimum editorial text link in the lower Rhythm paper field with a restrained hairline. The original implementation used one exact-viewport Activities chapter; its secondary-page composition is superseded by the approved `Long Veranda` amendment below.

- [x] **Step 5: Run focused tests and verify GREEN**

Run the Step 2 command. Expected: all focused tests pass with no warnings.

- [x] **Step 6: Add Playwright behavior and viewport checks**

Verify homepage link navigation, direct `/activities` loading, route metadata, home-rooted navigation, image loading, keyboard focus, content containment, readable type, and no horizontal overflow at `390x844`, `568x320`, `844x390`, `768x1024`, `1024x768`, `1280x800`, and `1440x900`. Keep exact `100svh` coverage on the homepage Rhythm chapter. Lock the lower-margin passage geometry and label-before-hairline relation. Smoke-test direct `/Anvelia-06/activities/` activation against the built GitHub Pages artifact.

- [x] **Step 7: Run complete verification**

Run:

```powershell
rtk npm.cmd run test
rtk npm.cmd run build
rtk npm.cmd run build:pages
rtk npm.cmd run test:e2e
rtk npm.cmd run test:e2e:pages
rtk git diff --check
```

Expected: all commands exit successfully with zero failures.

- [x] **Step 8: Visual and documentation checkpoint**

Capture desktop, tablet, phone portrait, and short-landscape previews. Record Task 9.5 in the current-state document and build plan only after verification succeeds.

## Acceptance Criteria

- Homepage and mobile navigation display exactly `Place · Cabins · Rhythm · Gatherings · Visit` in that order.
- `Rhythm` scrolls to `#open-air-living`; the internal section ID is unchanged.
- The chapter still reads `RHYTHM` / `Living with the hillside` and preserves approved imagery and proportions.
- `See activities` is an editorial passage, not a button, card, banner, or decorative flourish; it has a visible focus state and at least a 44px target.
- `/activities` is complete on activation, uses truthful concise copy, and works on direct load.
- Secondary-page navigation returns to the correct homepage anchors.
- Desktop header remains uncrowded at `821`, `834`, `1024`, `1280`, and `1440` widths.
- The homepage Rhythm chapter remains exactly `100svh`; the Activities page follows the approved multi-movement scroll and creates no clipping or horizontal overflow.
- No pricing, booking, medical, detox, capacity, availability, or scheduled-program claims are introduced.

## Approved Long Veranda Amendment (2026-08-24)

This amendment supersedes only the secondary `/activities` page's former single-chapter visual contract. The homepage `#open-air-living` chapter, navigation order, anchors, and one-viewport behavior remain unchanged.

- **Visual source:** `assets/anvelia/04-creative-direction-sheets/anvelia-rhythm-long-veranda-approved.png`.
- **Movement 1, Borrowed light:** `Rhythm` / `A slower way to spend the day`, paired with a tall right-edge timber-and-shadow threshold.
- **Movement 2, Water interval:** `Time to restore` / `A quieter interval`, paired with a shallow left water-and-stone aperture.
- **Movement 3, Evening warmth:** `Together, slowly` / `Together, without hurry`, paired with an overlapping tea-and-veranda aperture on a deep green material field.
- **Closing:** `Let the day find its own pace` with a functional `Plan your visit` link to `/#visit`.
- **Asset truthfulness:** all three new image families remain `conceptOnly: true`, with source, responsive derivatives, provenance, roles, and alt text in the registries and manifest.
- **Responsive contract:** deliberate multi-movement scroll, readable concise copy, restrained apertures, zero horizontal overflow, an airy stacked treatment through `960px` portrait tablets, and an uncrowded shared header from `320x568` through `1440x900`.
- Unit tests, production build, Playwright checks, and `git diff --check` pass.
