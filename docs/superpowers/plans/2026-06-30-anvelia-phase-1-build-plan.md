# Anvelia Phase 1 Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished single-page Anvelia Sanctuary website that showcases the resort, follows the selected Japanese Threshold Resort visual direction, and drives WhatsApp contact.

**Architecture:** Use a small React, TypeScript, and Vite site with structured content, local UI primitives, custom CSS tokens, optimized local imagery, and explicit approval gates after every task. The page remains single-route in phase 1 but is organized so phase 2 pages and future languages can be added cleanly.

**Tech Stack:** React, TypeScript, Vite, custom CSS, local assets, Vitest/Testing Library, Playwright.

## Global Design Constraint

All visual, copy, image, layout, and motion decisions must follow `docs/anvelia-design-language.md`. It is the canonical aesthetic authority; this implementation plan governs task order and acceptance. Do not add decorative section-transition animation. `/stays` remains visibly disabled until Phase 2, while Gatherings and Visit remain required Phase 1 sections.

---

## Approval Rule

After each task:

1. Stop work.
2. Show the rendered preview, screenshots, changed files, and verification results.
3. Ask for approval.
4. Continue only after approval.

No task may silently roll into the next task.

## Subagent Production Workflow

Use subagents to improve production quality, but preserve the user approval gate after every task. The controller agent must not let subagents continue into the next task without approval.

Per task workflow:

1. Dispatch one fresh implementer subagent with the exact task text, relevant files, constraints, and acceptance criteria.
2. If the task changes visuals, dispatch a design fidelity reviewer subagent to compare the result against Option 2 and the current task goal.
3. Dispatch a spec compliance reviewer subagent to check that every acceptance criterion is met and no unrequested scope was added.
4. Dispatch a code quality reviewer subagent for maintainability, file boundaries, accessibility risks, and unnecessary complexity.
5. The controller independently runs verification commands and captures previews.
6. Stop and show the user results. Continue only after approval.

Recommended roles:

```text
Implementer: makes the task change only.
Design fidelity reviewer: checks visual match, spacing, color, detail quality, and mobile polish.
Spec reviewer: checks task scope and acceptance criteria.
Code quality reviewer: checks architecture, simplicity, accessibility, and test quality.
Controller: verifies, previews, records results, and asks user approval.
```

Parallel subagents may be used only for read-only work, such as image selection review, design critique, accessibility review, or final QA investigation. Do not dispatch multiple editing subagents in parallel on the same codebase.

If a subagent reports `NEEDS_CONTEXT` or `BLOCKED`, the controller must resolve the missing context, revise the task, or ask the user. Do not retry blindly.

Additional production checks to add through subagents:

- Visual detail pass: spacing, image crops, material feel, header polish, button states.
- Content truth pass: no pricing, no capacity claims, no detox/medical claims, no documentary overclaiming.
- Accessibility pass: headings, landmarks, focus, keyboard menu, contrast, reduced motion.
- Performance pass: optimized images, lazy loading, no unused dependencies, reasonable JS size.
- Mobile conversion pass: WhatsApp access remains obvious and tasteful.

## Planned File Structure

Create or modify these files during the build:

```text
package.json
index.html
vite.config.ts
tsconfig.json
src/main.tsx
src/App.tsx
src/content/siteContent.ts
src/content/images.ts
src/components/layout/PageShell.tsx
src/components/layout/SiteHeader.tsx
src/components/sections/HeroSection.tsx
src/components/sections/PlaceSection.tsx
src/components/sections/CabinsSection.tsx
src/components/sections/OpenAirLivingSection.tsx
src/components/sections/GatheringsSection.tsx
src/components/sections/VisitSection.tsx
src/components/ui/Button.tsx
src/components/ui/ImageFrame.tsx
src/components/ui/SectionShell.tsx
src/components/ui/WhatsAppLink.tsx
src/styles/tokens.css
src/styles/base.css
src/styles/typography.css
src/styles/layout.css
src/styles/components.css
tests/e2e/site.spec.ts
tests/components/site-content.test.tsx
```

## Task 1: Preserve Visual Source And Asset Decisions

**Goal:** Make Option 2 available inside the project and choose the phase 1 image roles.

**Files:**
- Copy into: `assets/anvelia/04-creative-direction-sheets/anvelia-selected-option-2-japanese-threshold-resort.png`
- Modify: `assets/anvelia/ASSET_MANIFEST.csv`
- Create: `md files/2026-06-30-anvelia-phase-1-asset-selection.md`

**Recommended tools:** PowerShell copy command, `view_image`, asset manifest, browser image preview.

- [ ] Copy the actual original Option 2 image from `C:\Users\neo16\.codex\generated_images\019f1838-7eeb-7e82-8034-52d615e4d733\ig_015876740a940226016a43b48bc2f0819183671a90b2ee4d6e.png`.
- [ ] Inspect current Anvelia images and assign one image to each role: hero threshold, place, cabins, open-air living, gatherings, and the Visit closing atmosphere.
- [ ] Record which images are concept visuals and which claims they must not imply.
- [ ] Update `ASSET_MANIFEST.csv` with the selected visual source.

**Acceptance criteria:**
- Option 2 exists inside `assets/anvelia/04-creative-direction-sheets/`.
- Every required image role has a selected candidate or a clear generation need.
- No selected image is described as documentary proof.

**Stop and preview:** Show Option 2, the selected image list, and any gaps. Continue only after approval.

## Task 2: Scaffold The Frontend Foundation

**Goal:** Create the minimal React/Vite/TypeScript project foundation.

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/styles/base.css`

**Recommended tools:** Vite, npm, TypeScript.

- [ ] Create a Vite React TypeScript app without adding a large UI framework.
- [ ] Add scripts: `dev`, `build`, `preview`, `test`, `test:e2e`.
- [ ] Render a minimal Anvelia page shell with one `main` landmark.
- [ ] Run:

```powershell
rtk npm install
rtk npm run build
```

**Acceptance criteria:**
- Production build succeeds.
- The app renders locally.
- No unused UI framework is installed.

**Stop and preview:** Show the minimal browser preview, file tree, and build result. Continue only after approval.

## Task 3: Define Content And Image Registries

**Goal:** Centralize all copy and image references before building UI.

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/content/images.ts`
- Test: `tests/components/site-content.test.tsx`

**Recommended tools:** TypeScript types, Vitest.

- [ ] Add site metadata, nav labels, hero copy, section copy, address, and WhatsApp link to `siteContent.ts`.
- [ ] Add selected image records to `images.ts` with `src`, `alt`, `role`, and `conceptOnly` fields.
- [ ] Add tests confirming WhatsApp URL, nav labels, section count, and address lines.
- [ ] Run:

```powershell
rtk npm run test
```

**Acceptance criteria:**
- No user-facing copy is scattered across section components.
- WhatsApp link resolves to `https://wa.me/60136683113`.
- Cabin details remain general.

**Stop and preview:** Show the content registry and test output. Continue only after approval.

## Task 4: Build Design Tokens And Base Styles

**Goal:** Establish the Anvelia visual system before sections are built.

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/typography.css`
- Modify: `src/styles/base.css`

**Recommended tools:** CSS custom properties, browser computed styles, Option 2 visual comparison.

- [ ] Define paper, stone, timber, forest, moss, charcoal, and brass color tokens.
- [ ] Define spacing, radius, layout width, typography, and focus tokens.
- [ ] Set semantic HTML defaults, body background, text color, and link behavior.
- [ ] Verify 320px mobile width has no horizontal overflow.

**Acceptance criteria:**
- Tokens match Option 2 mood.
- Typography is calm, premium, readable, and not browser-default.
- Focus states are visible.

**Stop and preview:** Show a style swatch/type preview and compare against Option 2. Continue only after approval.

## Task 5: Build Local UI Primitives

**Goal:** Create reusable components for the page without importing a generic UI kit.

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/ImageFrame.tsx`
- Create: `src/components/ui/SectionShell.tsx`
- Create: `src/components/ui/WhatsAppLink.tsx`
- Modify: `src/styles/components.css`

**Recommended tools:** React props, TypeScript unions, CSS variants, Testing Library.

- [ ] Create primary and secondary button variants.
- [ ] Create image frame variants for threshold, landscape, portrait, and detail crops.
- [ ] Create section shell spacing variants.
- [ ] Create one source of truth for WhatsApp links and labels.

**Acceptance criteria:**
- Primitives are reusable across sections.
- Buttons have hover, focus, and disabled styles.
- Image frames keep stable aspect ratios.

**Stop and preview:** Show a primitive/component preview screen. Continue only after approval.

## Task 6: Build Header, Navigation, And Page Shell

**Goal:** Create the site frame and navigation.

**Files:**
- Create: `src/components/layout/PageShell.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/layout.css`

**Recommended tools:** Semantic HTML, anchor links, keyboard testing, Playwright.

- [ ] Add header with nav: Place, Cabins, Gatherings, Visit, WhatsApp.
- [ ] Add mobile menu that opens, closes, and returns focus.
- [ ] Add skip link and main landmark.
- [ ] Keep header visually respectful of Option 2.

**Acceptance criteria:**
- Header works on desktop and mobile.
- Keyboard users can open, close, and navigate the menu.
- WhatsApp is easy to access but not visually loud.

**Stop and preview:** Show desktop and mobile header states. Continue only after approval.

## Task 7: Build Hero And Place Sections

**Goal:** Establish the opening impression and location story.

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/PlaceSection.tsx`
- Modify: `src/App.tsx`

**Recommended tools:** Option 2 comparison, responsive screenshots, image cropping checks.

- [ ] Build the hero around threshold/arrival imagery.
- [ ] Use approved hero copy exactly unless the user approves edits.
- [ ] Add Place section with 450m elevation, cooler evenings, fresh hillside air, and Bentong/Pahang context.
- [ ] Keep the next section visible below the first viewport.

**Acceptance criteria:**
- First viewport clearly says what Anvelia is.
- Visual mood reads as Japanese Threshold Resort.
- Hero CTA works.

**Stop and preview:** Show desktop and mobile opening screenshots. Continue only after approval.

## Task 8: Build Cabins And Open-Air Living Sections

**Goal:** Show the stay experience and detail quality.

**Files:**
- Create: `src/components/sections/CabinsSection.tsx`
- Create: `src/components/sections/OpenAirLivingSection.tsx`
- Modify: `src/App.tsx`

**Recommended tools:** image crop review, responsive testing, copy review.

- [ ] Build Cabins section with general cabin positioning.
- [ ] Build Open-Air Living section around timber, greenery, stone, tea, water, shade, and slow pace.
- [ ] Avoid exact capacity, pricing, or availability claims.

**Acceptance criteria:**
- Sections feel distinct, not repeated templates.
- Details communicate premium care.
- Copy remains resort-first.

**Stop and preview:** Show section screenshots and selected image crops. Continue only after approval.

## Task 8.5: Truth And Runtime Stabilization

**Goal:** Make the approved upper-page experience truthful, lighter, and technically dependable before building Gatherings, Visit, and the integrated closing end note. Preserve the existing visual composition.

**Files:**
- Modify: `index.html`
- Modify: `src/App.tsx`
- Modify: `src/content/siteContent.ts`
- Modify: `src/content/images.ts`
- Modify: relevant section and image components only when required
- Modify: relevant `src/styles/` files only for stability
- Modify: `tests/components/site-content.test.tsx`
- Modify: `tests/e2e/site.spec.ts`
- Create: optimized runtime image derivatives only for active imagery

**Recommended tools:** content registry review, responsive image tooling, browser network inspection, Playwright, TypeScript, Vitest.

### Outcomes

- `/stays` cannot send a Phase 1 visitor to an unfinished page, while its Phase 2 intent remains easy to restore.
- Public copy is concise, resort-first, and free of misleading, repetitive, medical, detox, capacity, pricing, availability, or documentary implications.
- Browser tabs, search previews, and shared links identify Anvelia accurately.
- Mobile visitors download appropriately sized images instead of unnecessary desktop-scale assets.
- Lazy loading and optimization do not disturb navigation, crops, section positions, or the approved design.
- The visible result remains essentially the same approved website.

### Work

- [ ] Disable active navigation from `Cabin stays` without displaying internal wording such as “Phase 2.”
- [ ] Preserve the Cabin Stays visual treatment and implementation structure so `/stays` can be enabled when Phase 2 exists.
- [ ] Add a test proving the Phase 1 interface cannot navigate to the unfinished route.
- [ ] Review Hero, Place, Cabins, and Open-Air copy against `docs/anvelia-design-language.md`.
- [ ] Remove internal explanations, defensive wording, and unnecessary repetition of elevation or location.
- [ ] Verify the WhatsApp URL, phone number, address, and every factual statement.
- [ ] Confirm no pricing, capacity, availability, detox, medical, clinical, treatment, or documentary claims appear.
- [ ] Add an accurate page title, meta description, document language, and basic Open Graph metadata.
- [ ] Use approved metadata wording and imagery without inventing hotel classifications or facilities.
- [ ] Inventory only images currently rendered by Phase 1.
- [ ] Keep original source assets untouched and create optimized runtime derivatives where they materially reduce transfer size.
- [ ] Add responsive `srcset` and `sizes` where the component architecture supports them cleanly.
- [ ] Keep only the hero eager and high priority; lazy-load below-fold imagery.
- [ ] Preserve approved crops, colour, texture, botanical detail, and stable image dimensions.
- [ ] Remove unused runtime imports without deleting archive, concept, or QA assets.
- [ ] Verify the mobile menu widget retains the same position and dimensions at the top, while scrolled, and while open.
- [ ] Verify anchor navigation, image loading, layout stability, horizontal overflow, console output, and broken requests.

### Verification

Run:

```powershell
rtk npm.cmd run test
rtk npm.cmd run build
rtk npm.cmd run test:e2e
```

Review at `390x844`, `768x1024`, landscape tablet, and desktop widths. Record before-and-after runtime image transfer measurements.

**Acceptance criteria:**
- `/stays` is inaccessible from the Phase 1 interface.
- Gatherings and Visit navigation remains prepared for Task 9.
- All public copy passes the truth restrictions.
- Page title, meta description, language, and Open Graph basics are populated.
- Only the hero is intentionally eager.
- Responsive images preserve acceptable visual fidelity.
- No broken links, requests, console errors, horizontal overflow, blank anchor states, or new layout shifts occur.
- Hero, Place, Cabins, Open-Air Living, header, and mobile menu retain their approved layout and design language.
- Tests, production build, and Playwright checks pass.

**Stop and preview:** Show before-and-after transfer measurements, portrait and desktop screenshots, changed files, verification output, and remaining Task 9 risks. Continue only after approval.


## Task 9: Build Gatherings, Visit, And Closing End Note

**Goal:** Complete the conversion and practical information path without repeating Visit content in a separate footer.

**Approved refinement (2026-07-17):** The former standalone footer requirement is superseded. Visit ends with one timeless `© Anvelia Sanctuary` note integrated over its lower image edge. It has no year, repeated address, location, WhatsApp action, navigation, paper band, hairline, or added page height.

**Task 9.5 refinement (2026-07-17):** Open-Air Living appears in navigation as `Rhythm` without changing its `#open-air-living` anchor, approved image, proportions, or `Living with the hillside` title. A restrained lower-margin `See activities` editorial passage connects it to a complete `/activities` page with one `100svh` chapter and three concise, unprogrammed moments. The label precedes its right-side hairline, short-landscape copy remains visible and readable at `844x390` and `568x320`, secondary-page anchors return home, `/stays` remains disabled, and no pricing, booking, capacity, availability, medical, detox, or scheduled-program claims are introduced. Base-path normalization, route metadata, and a Vite multi-page Activities entry make direct `/Anvelia-06/activities/` activation safe while keeping all GitHub Pages links and assets inside `/Anvelia-06/`. Implementation and complete verification are green: 63 Vitest checks, both normal and GitHub Pages builds, 17 focused Activities browser checks, the complete 42-test Playwright suite, the deployed-base artifact smoke test, and `git diff --check` pass.

**Files:**
- Create: `src/components/sections/GatheringsSection.tsx`
- Create: `src/components/sections/VisitSection.tsx`
- Modify: `src/App.tsx`

**Recommended tools:** link checker, keyboard test, mobile preview.

- [ ] Add private dinners, small corporate retreats, and wellness retreats.
- [ ] Add address and visitor guidance.
- [ ] Add one WhatsApp CTA in Visit only.
- [ ] Integrate the timeless copyright end note without creating a separate footer section.
- [ ] Leave room for future map link without adding a fake map.

**Acceptance criteria:**
- Visitor knows how to contact Anvelia.
- Address is visible and readable.
- No form, pricing, gallery, or social links appear.
- No separate footer repeats Visit information or extends the closing chapter.

**Stop and preview:** Show lower-page desktop/mobile screenshots and all CTA locations. Continue only after approval.

## Task 10: Responsive, Accessibility, And SEO Pass

**Goal:** Make the site production-ready for phase 1.

**Files:**
- Modify: `index.html`
- Modify: relevant `src/` files
- Create: `tests/e2e/site.spec.ts`

**Recommended tools:** Playwright, browser dev tools, keyboard navigation, Lighthouse if available.

- [ ] Test viewports: `390x844`, `768x1024`, `1280x800`, `1440x900`.
- [ ] Verify headings, landmarks, focus states, skip link, and mobile menu.
- [ ] Verify page title, meta description, and Open Graph basics.
- [ ] Verify no broken images and no console errors.

**Acceptance criteria:**
- No horizontal mobile overflow.
- WhatsApp links work everywhere.
- Page remains readable and premium on mobile.
- Rendered site is compared against Option 2.

**Stop and preview:** Show responsive screenshots, test output, and final comparison notes. Continue only after approval.

## Task 11: Final Review And Handoff

**Goal:** Confirm phase 1 is complete and ready for the next phase or deployment work.

**Files:**
- Modify: `README.md` if created
- Modify: `AGENTS.md` only if workflow rules changed
- Create: `md files/2026-06-30-anvelia-phase-1-handoff.md`

**Recommended tools:** final browser pass, build command, screenshot comparison, manual checklist.

- [ ] Run final build and tests.
- [ ] Record final screenshots and known follow-ups.
- [ ] Record phase 2 candidates: gallery, cabin page, gatherings page, map link, languages, real photography.
- [ ] Summarize changed files and verification commands.

**Acceptance criteria:**
- User approves the final preview.
- Remaining items are phase 2, not phase 1 blockers.
- Handoff doc records final state and next steps.

**Stop and preview:** Show final site, verification summary, and handoff doc. End only after approval.

## Self-Review

Spec coverage:

- Objective, visual source, information architecture, stack, structure, tokens, UI primitives, assets, interactions, responsiveness, quality gates, and approval stops are covered.

Placeholder scan:

- This plan avoids placeholder steps and does not rely on unconfirmed pricing, capacity, gallery, forms, or social links.

Type consistency:

- Planned components, content files, style files, and tests use consistent names across tasks.
