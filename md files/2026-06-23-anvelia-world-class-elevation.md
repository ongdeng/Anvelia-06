# Anvelia World-Class Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate Anvelia into a distinctive, mature, high-end sanctuary website with world-class art direction, credible content, refined conversion paths, WCAG 2.2 AA accessibility, strong Core Web Vitals, production-grade engineering, and measurable launch quality. The final website must be a visibly new creative build, not a polished version of the old Anvelia page.

**Architecture:** Preserve the current React 19, TypeScript, Vite, custom CSS, GSAP, tests, verified content, and build tooling while treating the existing UI as disposable. Run an evidence-led redesign program: audit the current experience, verify business and health-related claims, establish a selected visual source of truth, then rebuild the interface against that source with automated quality gates. Keep the single-page architecture unless the approved content inventory proves that Stay, Rituals, Programs, or Visit have enough unique search intent and verified content to justify dedicated routes.

**Tech Stack:** React 19, TypeScript, Vite 7, custom CSS design tokens, GSAP and `@gsap/react`, local optimized media, Vitest, Testing Library, Playwright, axe-core, Lighthouse CI, GitHub Actions, GitHub Pages unless the production requirements justify a hosting migration.

---

## June 30 Clarification

The selected Task 5 direction is **Threshold Sequence**:

```text
assets/anvelia/04-creative-direction-sheets/01-threshold-sequence.png
```

This image is the strict visual and structural source of truth for the next build pass. It is not a mood reference, style hint, or loose inspiration board. The rebuild must start from the selected direction's threshold hero, modular image/text rhythm, mobile cards, navigation behavior, image/copy relationship, and practical visit close.

Use `assets/anvelia/04-creative-direction-sheets/03-hosted-rhythm.png` as a supporting source for section 04, Restore: borrow its 4-photo macro textural grid of tea, leaves, water, and tactile ritual details.

The current Anvelia05 implementation is useful as an engineering foundation and content/reference archive only. Its UI decisions must not be protected unless they also appear in the selected source direction or are required for accessibility, verified content, or technical correctness.

The correct next implementation mode is:

```text
clean creative rebuild inside the existing technical foundation
```

Do not continue with incremental polishing of the current page. Patch-by-patch edits are acceptable only after the static Threshold Sequence composition has been rebuilt and source-matched.

## Design Read

Reading this as: a premium destination and wellness sanctuary website for design-conscious regional and international guests, with an editorial, place-led, quietly cinematic language built around Malaysian mountain landscape, architecture, food, ritual, and human hospitality.

Recommended calibration:

- `DESIGN_VARIANCE: 7` - recognizably authored and asymmetric, but composed rather than experimental.
- `MOTION_INTENSITY: 5` - environmental and spatial motion with no spectacle or scroll conflict.
- `VISUAL_DENSITY: 3` - generous space, concise copy, and high-value detail rather than content volume.

## Governing Decisions

- Do not install Material, Carbon, Fluent, Bootstrap, Tailwind, shadcn, or another enterprise UI system. Anvelia is an editorial destination brand, not an enterprise application surface.
- Do not replace the current stack solely to appear more modern.
- Do not add a second animation engine. Keep GSAP for the selected environmental and scroll-linked motion.
- Do not require dark mode. The selected art direction may use deliberate light and forest-dark environments as part of one continuous place narrative.
- Do not implement another major visual pass before a source visual target is selected.
- Do not reinterpret the selected source into the old page structure. Once a source direction is selected, old sections, old hero logic, old spacing, and old navigation patterns are optional reference only.
- Do not publish medical, detoxification, organ-support, circulation, nervous-system, or guaranteed wellness claims without written operational evidence and professional review.
- Do not use generated images as final documentary evidence of the real property, staff, facilities, food, or services.
- Preserve the working site, anchor IDs, deployment path, and existing accessibility wins until a replacement has passed QA, but do not preserve visual structure merely because it already exists.

## Skill And Plugin Sequence

| Stage                | Skill or plugin                                                    | Role                                                                                |
| -------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Baseline review      | `product-design:audit`                                             | Evidence-based UX, visual, responsive, and accessibility audit                      |
| Critical design lens | `design-taste-frontend`                                            | Anti-template review, design dials, rhythm, copy, performance, and preflight checks |
| Visual territories   | Creative Production `moodboard-explorer`                           | Image-first art-direction exploration                                               |
| Product brief        | `product-design:get-context`                                       | Confirm audience, business objective, content, and constraints                      |
| Visual options       | `product-design:ideate`                                            | Produce exactly three reviewable page directions                                    |
| Implementation       | `product-design:image-to-code` plus existing frontend skills       | Build from the selected visual target                                               |
| Design-system QA     | `awesome-design-codex`                                             | Token, state, consistency, and WCAG acceptance checklist only                       |
| Fidelity QA          | `product-design:design-qa`                                         | Compare selected visual target against rendered implementation                      |
| Engineering          | `react-best-practices`, `frontend-testing-debugging`, `gsap-react` | React, testing, debugging, and motion quality                                       |
| Final verification   | Lighthouse, Playwright, axe, build checks                          | Performance, accessibility, responsiveness, and regression gates                    |

`product-design:design-qa` must not be used as the initial critique tool because it requires a source visual target and a rendered implementation. Use `product-design:audit` first.

## Program Gates

No later gate may begin until the preceding gate is accepted.

1. **Baseline Gate:** Current build, screenshots, content, deployment, and metrics are recorded.
2. **Truth Gate:** Business facts, property facts, services, people, pricing approach, policies, and health-related wording are verified.
3. **Direction Gate:** One moodboard territory and one full-page visual direction are explicitly selected, with exact source files named.
4. **Architecture Gate:** Single-page versus multi-page structure and inquiry-provider requirements are resolved.
5. **Build Gate:** Static implementation matches the approved source before motion is added. If the result still feels like the old page with polish, the gate fails.
6. **Quality Gate:** No actionable P0, P1, or P2 design QA finding remains. Qualitative "close enough" review is not sufficient; screenshots must be compared directly against the selected source.
7. **Launch Gate:** Accessibility, performance, SEO, privacy, security, analytics, deployment, and rollback checks pass.

## Official Standards Baseline

Use the standards current on June 23, 2026:

- WCAG 2.2 AA: <https://www.w3.org/TR/WCAG22/>
- Core Web Vitals guidance: <https://web.dev/articles/vitals>
- Responsive images: <https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images>
- Google Local Business structured data: <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- Google sitemap guidance: <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- Playwright and axe accessibility testing: <https://playwright.dev/docs/accessibility-testing>
- Lighthouse: <https://developer.chrome.com/docs/lighthouse/overview>
- GitHub Pages HTTPS: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/securing-your-github-pages-site-with-https>

## Success Metrics

### Brand And Design

- A first-time reviewer can identify the experience as Anvelia without relying only on the logo.
- The selected typography, imagery, material palette, and composition cannot be transferred unchanged to a generic spa or luxury hotel.
- No two consecutive sections repeat the same layout family.
- The page uses no unapproved stock imagery, fake testimonials, invented ratings, or unverifiable statistics.
- Desktop and mobile implementations pass source-target design QA with no P0, P1, or P2 findings.

### Conversion And Trust

- The primary action is consistently named `Plan a visit`.
- Visitors can understand location, stay options, program rhythm, contact method, what to bring, and the next step without opening the menu.
- Verified hosts, practitioners, dining philosophy, accessibility information, policies, and contact expectations are present when the business can substantiate them.
- The inquiry flow has a tested success state, error state, privacy disclosure, and delivery confirmation before collecting visitor data.

### Accessibility

- WCAG 2.2 AA target.
- Zero serious or critical axe findings on tested routes and states.
- Complete keyboard operation with visible focus.
- No loss of content at 200% zoom and no horizontal page scrolling at 320 CSS pixels.
- Reduced-motion mode exposes all content immediately and removes nonessential scroll-linked movement.
- Touch targets are at least 44 by 44 CSS pixels where practical.

### Performance

- LCP at or below 2.5 seconds at the 75th percentile.
- INP at or below 200 milliseconds at the 75th percentile.
- CLS at or below 0.1 at the 75th percentile.
- Lighthouse mobile performance target of 90 or higher on the production build.
- Initial JavaScript budget at or below 150 KB gzip unless an approved feature justifies an exception.
- No hero image larger than necessary for its rendered breakpoint.
- No unused production dependency or unused imported source asset.

### Engineering And Operations

- `npm run build`, lint, unit tests, component tests, Playwright checks, and Lighthouse CI run in GitHub Actions.
- Production has a canonical URL, sitemap, robots file, social image, structured data where accurate, analytics decision, privacy decision, and rollback procedure.
- The deployed site has no browser console errors, broken anchors, failed assets, or mixed-content requests.

## Planned File Ownership

### Central Asset Library

All Anvelia image assets must also be easy to find from one top-level library:

```text
assets/
  README.md
  anvelia/
    00-brand/
    01-current-production-candidates/
    02-responsive-derivatives/
    03-public-icons-and-social/
    04-creative-direction-sheets/
    05-moodboard-full-generated/
    06-moodboard-thumbnails-mcp/
    07-baseline-audit-screenshots/
    08-visual-qa-captures/
    ASSET_MANIFEST.csv
```

This library is the human-facing place to inspect, compare, and choose imagery. It does not replace `src/assets`, `public`, `outputs`, `docs/audits`, or `tests/visual` as working locations. Originals and evidence folders remain in place so existing imports, documentation references, tests, and provenance are not broken.

Rules:

- copy scattered source images into the asset library; do not delete the originals during planning;
- keep generated moodboards and generated direction sheets clearly labeled as art-direction material only;
- keep MCP thumbnails under `assets/anvelia/06-moodboard-thumbnails-mcp/`;
- keep production-ready imports under `src/assets` only after they are intentionally selected and recorded in `src/content/images.ts`;
- record every centralized copy in `assets/anvelia/ASSET_MANIFEST.csv` with original path, library path, category, and publication status.

### Documentation

```text
docs/
  ANVELIA_DESIGN_LANGUAGE.md
  ANVELIA_FRONTEND_STRUCTURE.md
  audits/
    2026-06-23-current-experience-audit.md
    2026-06-23-accessibility-audit.md
    2026-06-23-performance-baseline.md
  brand/
    ANVELIA_AUDIENCE_AND_POSITIONING.md
    ANVELIA_CONTENT_TRUTH_MATRIX.md
    ANVELIA_CONTENT_MODEL.md
  creative/
    ANVELIA_VISUAL_DIRECTION_BRIEF.md
    ANVELIA_MEDIA_SHOT_LIST.md
    ANVELIA_SELECTED_DIRECTION.md
  launch/
    ANVELIA_ANALYTICS_PLAN.md
    ANVELIA_LAUNCH_CHECKLIST.md
    ANVELIA_ROLLBACK_PLAN.md
```

### Application

```text
src/
  assets/
    fonts/
    images/
    logos/
  components/
    common/
    forms/
    layout/
    motion/
    sections/
    seo/
  content/
  services/
  styles/
  types/
```

Create `pages/` and add routing only if the Architecture Gate approves multiple routes.

### Quality Tooling

```text
tests/
  accessibility/
  components/
  e2e/
  visual/
eslint.config.js
prettier.config.mjs
vitest.config.ts
playwright.config.ts
lighthouserc.cjs
.github/workflows/quality.yml
README.md
```

---

## Task 0: Protect And Record The Current Baseline

**Files:**

- Create: `docs/audits/2026-06-23-current-experience-audit.md`
- Create: `docs/audits/2026-06-23-performance-baseline.md`
- Preserve: all current modified source files

- [ ] **Step 1: Record current Git state**

Run:

```powershell
rtk git status --short
rtk git branch --show-current
rtk git remote -v
```

Expected: branch `anvelia-sanctuary-build`, remote `origin`, and the existing uncommitted source changes remain visible.

- [ ] **Step 2: Verify the baseline build**

Run:

```powershell
rtk npm run build
rtk git diff --check
```

Expected: both commands exit successfully.

- [ ] **Step 3: Capture baseline screenshots**

Use the in-app Browser at:

```text
390x844
768x1024
1280x800
1440x900
```

Capture the opening, cabins, pavilion, garden, rituals, programs, visit, navigation-open, and footer states. Save accepted files under:

```text
docs/audits/screenshots/current/
```

- [ ] **Step 4: Write the current-state audit**

The audit must record:

- current strengths worth preserving;
- current design dials;
- content that is verified, uncertain, or missing;
- repeated or generic design patterns;
- navigation and conversion friction;
- responsive and accessibility risks;
- image authenticity and quality concerns;
- motion and performance risks;
- current SEO and deployment gaps.

- [ ] **Step 5: Record baseline metrics**

Run Lighthouse against the production preview and record:

- Performance
- Accessibility
- Best Practices
- SEO
- LCP
- CLS
- Total Blocking Time as a lab diagnostic
- JavaScript and image transfer sizes

- [ ] **Step 6: Commit the baseline artifacts**

```powershell
rtk git add docs/audits
rtk git commit -m "docs: record anvelia elevation baseline"
```

## Task 1: Establish Audience, Positioning, And Business Outcomes

**Files:**

- Create: `docs/brand/ANVELIA_AUDIENCE_AND_POSITIONING.md`
- Create: `docs/launch/ANVELIA_ANALYTICS_PLAN.md`

- [ ] **Step 1: Define primary audiences**

Document no more than three:

1. Regional restorative-stay guests from Malaysia and Singapore.
2. International design-conscious wellness travelers.
3. Small retreat facilitators seeking a private group environment.

For each, record motivation, concern, evidence needed, preferred action, and likely device context.

- [ ] **Step 2: Define the website's single primary job**

Use:

```text
Help a qualified guest trust the place and begin planning the right stay.
```

Secondary jobs:

- understand accommodation and shared spaces;
- understand the rhythm of rituals and programs;
- confirm location and practical arrival details;
- contact the sanctuary with informed questions.

- [ ] **Step 3: Define measurable conversion events**

Use these event names consistently:

```text
plan_visit_click
call_click
map_open
menu_open
stay_section_view
rituals_section_view
programs_section_view
inquiry_start
inquiry_submit_success
inquiry_submit_error
```

Do not add analytics code until the privacy and provider decisions are approved.

- [ ] **Step 4: Commit the positioning documents**

```powershell
rtk git add docs/brand/ANVELIA_AUDIENCE_AND_POSITIONING.md docs/launch/ANVELIA_ANALYTICS_PLAN.md
rtk git commit -m "docs: define anvelia audience and outcomes"
```

## Task 2: Create The Content Truth Matrix

**Files:**

- Create: `docs/brand/ANVELIA_CONTENT_TRUTH_MATRIX.md`
- Create: `docs/brand/ANVELIA_CONTENT_MODEL.md`
- Review: `src/content/siteContent.ts`
- Review: `src/content/rituals.ts`
- Review: `src/content/programs.ts`

- [ ] **Step 1: Inventory every factual claim**

The matrix must include:

```text
claim
current wording
source or owner
verification date
publication status
legal or clinical review required
approved replacement wording
```

Include the elevation, cabin count, pavilion size, address, phone number, private baths, farm practices, meal model, rituals, program lengths, accessibility, transport, pricing approach, host qualifications, and operating status.

- [ ] **Step 2: Classify wording**

Use exactly:

```text
verified
requires owner confirmation
requires professional review
remove from public website
```

- [ ] **Step 3: Define missing trust content**

Record whether the website can publish:

- founder or host story;
- practitioner names and credentials;
- hospitality team;
- dining philosophy and dietary support;
- sample daily rhythm;
- what is included and excluded;
- accessibility and mobility information;
- travel time and transfers;
- check-in and check-out expectations;
- child, pet, smoking, cancellation, and privacy policies;
- emergency and medical limitations;
- rates or inquiry-only pricing;
- group retreat capacity;
- real guest testimonials with written permission.

Also record the content owner, review frequency, and expiry date for every operational detail that can change.

- [ ] **Step 4: Apply the Truth Gate**

Rules:

- Unverified claims remain out of the public build.
- Medical or therapeutic language requires professional review.
- No invented testimonial, rating, award, partner, or credential may be used as visual proof.

- [ ] **Step 5: Commit the truth matrix**

```powershell
rtk git add docs/brand/ANVELIA_CONTENT_TRUTH_MATRIX.md docs/brand/ANVELIA_CONTENT_MODEL.md
rtk git commit -m "docs: establish anvelia content truth model"
```

## Task 3: Run Current UX And Competitor Research

**Files:**

- Create: `docs/research/ANVELIA_GUEST_JOURNEY_RESEARCH.md`
- Create: `docs/research/ANVELIA_COMPETITOR_BENCHMARK.md`

- [ ] **Step 1: Run the Product Design audit**

Audit these visitor tasks:

1. Understand what Anvelia is.
2. Inspect the stay.
3. Understand rituals and programs.
4. Decide whether the sanctuary feels credible.
5. Find practical arrival information.
6. Begin planning a visit.

- [ ] **Step 2: Research current guest friction**

Search recent public sources for:

- uncertainty about wellness retreat schedules;
- concern about vague inclusions and pricing;
- arrival and transfer anxiety;
- food and dietary questions;
- privacy and group-program expectations;
- skepticism about wellness claims;
- accessibility and mobility concerns;
- booking and response-time friction.

Separate observed evidence from inference and cite all public sources.

- [ ] **Step 3: Benchmark 8 to 12 current sites**

Select a balanced set:

- three high-end nature retreats;
- three design-led hospitality properties;
- two regional Malaysia or Southeast Asia destinations;
- two wellness-program sites with strong practical information.

Evaluate:

- first-view brand recognition;
- photography and human presence;
- typography;
- information architecture;
- conversion;
- trust;
- pricing clarity;
- accessibility;
- performance;
- mobile behavior;
- content that should not be copied.

- [ ] **Step 4: Convert research into design requirements**

Every finding must become one of:

```text
preserve
introduce
remove
verify
test
```

- [ ] **Step 5: Commit research**

```powershell
rtk git add docs/research
rtk git commit -m "docs: add anvelia guest and competitor research"
```

## Task 4: Explore Three Art-Direction Territories

**Files:**

- Create: `docs/creative/ANVELIA_VISUAL_DIRECTION_BRIEF.md`
- Create: `outputs/moodboards/anvelia-world-class/`

- [ ] **Step 1: Prepare the Creative Production intake**

Lock:

- audience;
- grounded-serenity emotional target;
- real Malaysian mountain context;
- existing emblem;
- environmental transitions;
- prohibited generic spa motifs;
- requirement for credible human hospitality.

- [ ] **Step 2: Generate a 12-image moodboard**

Use four images for each territory:

1. **Malaysian Mountain Vernacular**
   - timber craft, tropical altitude, rain, stone, local material, human-scale hospitality.
2. **Cinematic Regenerative Retreat**
   - dawn and dusk, cultivation, water, restorative movement, quiet human presence.
3. **Contemporary Sanctuary Editorial**
   - architectural restraint, precise typography cues, tactile detail, composed documentary photography.

Each tile must be one scene or material study, with no text, logo, UI, collage, or invented facility claim.

- [ ] **Step 3: Review territories**

Score each from 1 to 5 for:

- specificity to Anvelia;
- cultural fit;
- credibility;
- longevity;
- photography feasibility;
- mobile adaptability;
- distinction from generic wellness design.

- [ ] **Step 4: Select one territory**

Save the decision and rejected-direction reasons in:

```text
docs/creative/ANVELIA_SELECTED_DIRECTION.md
```

- [ ] **Step 5: Commit the visual direction**

```powershell
rtk git add docs/creative outputs/moodboards/anvelia-world-class
rtk git commit -m "docs: select anvelia visual territory"
```

## Task 5: Produce Three Full-Page Visual Directions

**Files:**

- Create: `docs/creative/ANVELIA_SELECTED_DIRECTION.md`
- Create: `outputs/design-directions/anvelia/`

- [ ] **Step 1: Confirm Product Design context**

Use `product-design:get-context` to play back:

- audience;
- selected moodboard;
- current architecture;
- verified content only;
- motion ceiling;
- primary conversion action;
- mobile and accessibility requirements.

- [ ] **Step 2: Generate exactly three directions**

Each direction must show:

- desktop opening and one full-page composition;
- mobile opening and at least three key section states;
- navigation open and closed;
- cabin, pavilion, garden, ritual, program, and visit treatments;
- typography;
- image crops;
- CTA hierarchy;
- footer;
- reduced-motion interpretation.

The three directions must differ structurally, not only by color.

- [ ] **Step 3: Score directions**

Use:

```text
brand specificity
editorial maturity
conversion clarity
content truth
mobile quality
accessibility potential
performance feasibility
implementation risk
```

- [ ] **Step 4: Select one visual source of truth**

Record exact source files, screenshots, viewport sizes, and approved deviations. This selection satisfies the Direction Gate.

For the approved current direction, record:

```text
territory: Malaysian Mountain Vernacular
full-page direction: Threshold Sequence
strict source: assets/anvelia/04-creative-direction-sheets/01-threshold-sequence.png
supporting source: assets/anvelia/04-creative-direction-sheets/03-hosted-rhythm.png for Restore macro texture grid
implementation stance: clean creative rebuild, not old-site polish
```

Any approved deviation must explain why it improves verified content, accessibility, responsiveness, or performance without weakening the Threshold Sequence structure.

- [ ] **Step 5: Commit the selected target**

```powershell
rtk git add docs/creative/ANVELIA_SELECTED_DIRECTION.md outputs/design-directions/anvelia
rtk git commit -m "docs: approve anvelia page direction"
```

## Task 6: Update The Design System Specification

**Files:**

- Modify: `docs/ANVELIA_DESIGN_LANGUAGE.md`
- Modify: `docs/ANVELIA_FRONTEND_STRUCTURE.md`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/typography.css`
- Create: `src/assets/fonts/`

- [ ] **Step 1: Specify the exact type system**

The selected direction must name:

- display family;
- body family;
- utility family if needed;
- license;
- source files;
- variable axes;
- fallback stack;
- weights used;
- preload decision;
- font-display behavior.

The no-cost fallback is to choose properly licensed, self-hosted variable fonts. Do not rely on a family name that is not actually loaded.

- [ ] **Step 2: Define semantic tokens**

Required token groups:

```css
--surface-page
--surface-mist
--surface-forest
--surface-elevated
--text-primary
--text-secondary
--text-on-dark
--accent-warm
--border-subtle
--focus-ring
--shadow-atmospheric
--radius-image
--radius-interface
--duration-fast
--duration-reveal
--ease-natural
```

- [ ] **Step 3: Define shape rules**

Use:

- image and editorial frames: 4 to 8px;
- navigation pavilion: 12 to 16px;
- command buttons: pill;
- no decorative cards around page sections.

- [ ] **Step 4: Define typography rules**

Include exact desktop and mobile sizes, line heights, maximum measures, optical weights, and wrapping behavior for:

- `h1`;
- section `h2`;
- card `h3`;
- lead;
- body;
- label;
- caption;
- button.

- [ ] **Step 5: Define motion tokens and ownership**

Every motion must name its purpose:

```text
ambient time
spatial transition
content hierarchy
interaction feedback
```

Remove any motion without one of those purposes.

- [ ] **Step 6: Commit the approved system**

```powershell
rtk git add docs/ANVELIA_DESIGN_LANGUAGE.md docs/ANVELIA_FRONTEND_STRUCTURE.md src/styles src/assets/fonts
rtk git commit -m "style: define anvelia design system v2"
```

## Task 7: Decide Information Architecture And Conversion

**Files:**

- Modify: `docs/brand/ANVELIA_CONTENT_MODEL.md`
- Modify: `docs/ANVELIA_FRONTEND_STRUCTURE.md`
- Create if approved: `src/pages/`
- Create if approved: `src/components/forms/VisitInquiryForm.tsx`
- Create if approved: `src/services/inquiry.ts`
- Create if approved: `src/types/inquiry.ts`

- [ ] **Step 1: Apply the routing decision test**

Keep one page unless a destination has:

- independent user intent;
- at least three screen lengths of verified unique content;
- direct-search value;
- a reason to share its URL independently.

If at least two destinations pass, introduce routes for:

```text
/
/stay
/rituals
/programs
/visit
```

Otherwise preserve anchors.

- [ ] **Step 2: Define the trust sequence**

Use:

```text
Feeling
Place
Stay
People and hospitality
Ritual rhythm
Program options
Practical details
Plan a visit
```

Do not restore a generic About section. Trust content must be specific and useful.

- [ ] **Step 3: Define the inquiry flow**

Fields are limited to:

```text
name
email
phone optional
preferred stay length
preferred dates optional
number of guests
dietary or mobility note optional
message
privacy acknowledgement
```

Do not request medical history through the marketing site.

- [ ] **Step 4: Select the inquiry provider**

Evaluate:

- data location;
- spam protection;
- delivery reliability;
- webhook or CRM support;
- accessibility;
- privacy terms;
- monthly cost;
- custom success and error handling;
- compatibility with static hosting.

No provider integration begins without approval of the privacy implications.

- [ ] **Step 5: Define form states**

Required:

```text
idle
validating
submitting
success
recoverable error
offline or network error
```

- [ ] **Step 6: Decide localization**

English remains the primary language. Add Bahasa Malaysia, Simplified Chinese, or another language only when:

- a fluent content owner is named;
- every page and form state can be translated;
- legal and policy copy can be maintained;
- URLs, metadata, and `lang` attributes can be implemented correctly.

Do not add a decorative language switcher with partial translation.

- [ ] **Step 7: Decide content management**

Keep typed local content when developer-managed updates are infrequent. Evaluate a CMS only when a named non-developer owner must update programs, policies, rates, people, or multilingual content regularly.

- [ ] **Step 8: Commit architecture decision**

```powershell
rtk git add docs/brand/ANVELIA_CONTENT_MODEL.md docs/ANVELIA_FRONTEND_STRUCTURE.md
rtk git commit -m "docs: decide anvelia information architecture"
```

## Task 8: Produce The Final Media System And Asset Library

**Files:**

- Create or update: `assets/README.md`
- Create or update: `assets/anvelia/ASSET_MANIFEST.csv`
- Create or update: `assets/anvelia/`
- Create: `docs/creative/ANVELIA_MEDIA_SHOT_LIST.md`
- Modify: `src/assets/images/`
- Modify: `src/content/images.ts`

- [ ] **Step 1: Create the production shot list**

Required subjects:

1. Wide ridge arrival.
2. Cabin exterior at guest scale.
3. Cabin interior and bath.
4. Pavilion in use.
5. Garden cultivation.
6. Meal preparation.
7. Shared table.
8. River walk.
9. Mineral warmth or water ritual.
10. Meditation or breath practice.
11. Hosts or practitioners.
12. Arrival path and transport context.
13. Material details: timber, stone, textiles, herbs.
14. One credible evening or lantern-light scene.
15. Clean portrait and landscape images of named hosts or practitioners.

- [ ] **Step 2: Define production requirements**

- documentary rather than stock-like;
- natural skin and vegetation color;
- visible human presence with consent;
- wide, medium, and detail coverage;
- landscape and portrait crops;
- no fake facilities or activities;
- no heavy preset that hides the property.
- documented consent for recognizable people and testimonials.

- [ ] **Step 3: Centralize all current image assets**

Copy all existing Anvelia image files into the top-level asset library without deleting originals. At minimum include:

- root-level generated and optimized Anvelia images;
- `src/assets/images/` and `src/assets/logos/`;
- `public/` favicons, icons, and social images;
- `outputs/design-directions/anvelia/`;
- `outputs/moodboards/anvelia-world-class/board/generated/`;
- `outputs/moodboards/anvelia-world-class/board/generated/mcp-thumbs/`;
- `docs/audits/screenshots/current/`;
- `tests/visual/anvelia-fidelity/`.

The destination structure must stay:

```text
assets/anvelia/00-brand/
assets/anvelia/01-current-production-candidates/
assets/anvelia/02-responsive-derivatives/
assets/anvelia/03-public-icons-and-social/
assets/anvelia/04-creative-direction-sheets/
assets/anvelia/05-moodboard-full-generated/
assets/anvelia/06-moodboard-thumbnails-mcp/
assets/anvelia/07-baseline-audit-screenshots/
assets/anvelia/08-visual-qa-captures/
```

`assets/anvelia/ASSET_MANIFEST.csv` must list every centralized file with:

```text
category
original_path
library_path
publication_status
notes
```

- [ ] **Step 4: Prepare professional brand assets**

Obtain designer-approved:

```text
vector master logo
horizontal wordmark
emblem
one-color dark version
one-color light version
favicon set
social avatar
```

Do not trace the existing raster logo into an unofficial SVG. Store brand masters and working logo copies under `assets/anvelia/00-brand/`; import only approved runtime copies from `src/assets/logos/`.

- [ ] **Step 5: Prepare responsive masters**

For every production image, create:

```text
AVIF
WebP
JPEG fallback
```

Generate at least the rendered widths required by mobile, tablet, and desktop. Preserve focal points in `src/content/images.ts`.

- [ ] **Step 6: Keep source assets clear and out of the bundle**

Do not delete moodboards, direction sheets, MCP thumbnails, audit screenshots, or visual QA captures during the rebuild. Generated and legacy images may remain in `assets/` and `outputs/` as evidence, but only production-selected images should be imported from `src/assets` or shipped through `public`.

For every imported runtime image, confirm:

- it is listed in the manifest;
- it has publication status `prototype`, `approved-production`, or `replace-before-launch`;
- generated art-direction imagery is not described as a real Anvelia facility, person, service, or landscape.

- [ ] **Step 7: Commit final media**

```powershell
rtk git add assets docs/creative/ANVELIA_MEDIA_SHOT_LIST.md src/assets/images src/content/images.ts
rtk git commit -m "feat: add anvelia production media system"
```

## Task 9: Add Production Engineering Tooling

**Files:**

- Modify: `package.json`
- Create: `eslint.config.js`
- Create: `prettier.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `lighthouserc.cjs`
- Create: `tests/setup.ts`
- Create: `.github/workflows/quality.yml`
- Create: `README.md`

- [ ] **Step 1: Install quality dependencies**

Run:

```powershell
rtk proxy npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh prettier vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test @axe-core/playwright @lhci/cli
rtk npx playwright install chromium
```

- [ ] **Step 2: Add package scripts**

`package.json` must include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format:check": "prettier . --check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/accessibility",
    "lighthouse": "lhci autorun",
    "quality": "npm run lint && npm run format:check && npm run test && npm run build"
  }
}
```

- [ ] **Step 3: Configure Vitest**

Use:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});
```

- [ ] **Step 4: Configure Playwright**

Test Chromium at:

```text
390x844
768x1024
1280x800
1440x900
```

Use the production preview server, not only the development server.

- [ ] **Step 5: Configure Lighthouse budgets**

Set:

```text
performance >= 0.90
accessibility >= 0.95
best-practices >= 0.95
seo >= 0.95
LCP <= 2500ms
CLS <= 0.10
initial JS gzip <= 150KB
```

- [ ] **Step 6: Add the quality workflow**

The workflow must:

1. use Node 22;
2. run `npm ci`;
3. run lint;
4. run format check;
5. run unit tests;
6. build;
7. install Playwright Chromium;
8. run accessibility and end-to-end tests;
9. run Lighthouse CI;
10. upload reports when a check fails.

- [ ] **Step 7: Document the project**

`README.md` must cover:

- purpose;
- approved design references;
- commands;
- directory ownership;
- content verification policy;
- environment variables;
- inquiry provider;
- analytics provider;
- deployment;
- rollback;
- accessibility and performance targets.

- [ ] **Step 8: Commit tooling**

```powershell
rtk git add package.json package-lock.json eslint.config.js prettier.config.mjs vitest.config.ts playwright.config.ts lighthouserc.cjs tests .github/workflows/quality.yml README.md
rtk git commit -m "chore: add anvelia production quality gates"
```

## Task 10: Implement The Approved Static Design

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/components/layout/`
- Modify: `src/components/sections/`
- Modify: `src/components/common/`
- Modify: `src/styles/`
- Modify: `src/content/`

- [ ] **Step 1: Build static composition first**

Start from a blank page composition inside the existing React/Vite project. Do not edit the old section sequence into shape. Reuse existing content, image registry ideas, tests, accessibility helpers, and build tooling only after the new composition is mapped from `outputs/design-directions/anvelia/02-mountain-field-notes.png`.

Implementation order:

1. source decomposition sheet: desktop, mobile, nav open, footer, and section rhythm;
2. page shell and field-note spine;
3. opening;
4. place observation module;
5. stay;
6. pavilion;
7. garden and food;
8. rituals;
9. programs;
10. visit or inquiry;
11. footer.

Do not add reveal, parallax, stack, spotlight, or pointer behavior during this step.

- [ ] **Step 2: Match the selected desktop source**

Verify:

- container positions;
- typography;
- line breaks;
- image crop;
- section height;
- spacing;
- colors;
- radii;
- navigation;
- CTA hierarchy;
- footer.

The desktop build must visibly preserve:

- the large documentary opening image with refined top navigation;
- the left field-note spine as a real organizing system;
- editorial grid modules rather than repeated full-width stacked sections;
- practical note blocks paired with image evidence;
- a minimal operational footer.

- [ ] **Step 3: Match the selected mobile source**

Verify:

- one-column reading;
- no oversized heading inside compact areas;
- stable image crops;
- reachable CTAs;
- no hidden practical details;
- no overlapping fixed navigation;
- no horizontal overflow.

The mobile build must visibly preserve:

- compact source-like opening cards;
- one idea per state;
- practical visit cards;
- field-note navigation that feels intentional rather than a compressed desktop sidebar;
- no oversized decorative numbering that competes with reading.

- [ ] **Step 4: Add component tests**

At minimum:

- navigation opens, closes, and returns focus;
- hidden menu links are not keyboard reachable;
- inquiry validation works if the form is approved;
- external links have the correct attributes;
- all content lists render the expected approved entries.

- [ ] **Step 5: Run a pre-motion source check**

Capture desktop and mobile screenshots before any motion is added. If the static build still reads as the old Anvelia page with improved styling, stop and rebuild the composition before proceeding.

- [ ] **Step 6: Commit static implementation**

```powershell
rtk git add src tests/components
rtk git commit -m "feat: implement approved anvelia visual direction"
```

## Task 11: Add Purposeful Motion

**Files:**

- Modify: `src/components/motion/SanctuaryMotion.tsx`
- Modify: `src/components/common/FadeContent.tsx`
- Modify: `src/components/common/ScrollStack.tsx`
- Modify: `src/components/common/ScrollStack.css`
- Modify: `src/components/common/CardNav.tsx`
- Modify: `src/components/common/CardNav.css`

- [ ] **Step 1: Create a motion inventory**

For each animation, record:

```text
element
purpose
trigger
duration
easing
reduced-motion result
performance risk
```

- [ ] **Step 2: Preserve only motivated motion**

Allowed:

- opening focus and light settling;
- quiet title reveals;
- image drift where it communicates passing landscape;
- one stable ritual stack if it remains part of the selected direction;
- restrained navigation reveal;
- button feedback.

Remove pointer spotlight effects if they do not materially improve orientation or atmosphere.

- [ ] **Step 3: Eliminate competing scroll systems**

If the ritual stack uses native window scroll, remove the unused Lenis runtime path and dependency. If Lenis remains required for a contained scroller, lazy-load it only with that component.

- [ ] **Step 4: Add reduced-motion tests**

Verify:

- no hidden title before animation;
- no scroll pinning;
- no parallax;
- no delayed content;
- menu remains instant and usable.

- [ ] **Step 5: Verify scroll stability**

Measure the same ritual card rectangle twice after scrolling stops. Position and transform must remain identical.

- [ ] **Step 6: Commit motion**

```powershell
rtk git add src/components/motion src/components/common tests/e2e
rtk git commit -m "style: refine anvelia environmental motion"
```

## Task 12: Implement Responsive Images And Font Loading

**Files:**

- Modify: `src/components/common/ImageBand.tsx`
- Modify: image-rendering section components
- Modify: `index.html`
- Modify: `src/styles/typography.css`
- Modify: `src/styles/base.css`

- [ ] **Step 1: Extend the image registry**

Each image entry must expose:

```ts
type ResponsiveImage = {
  alt: string;
  avif: string;
  webp: string;
  fallback: string;
  width: number;
  height: number;
  focalPoint?: string;
};
```

- [ ] **Step 2: Render `<picture>` sources**

Use AVIF, WebP, and JPEG fallback with `srcSet` and `sizes`. Declare intrinsic dimensions.

- [ ] **Step 3: Prioritize only the opening image**

- preload the actual opening image candidate;
- use eager loading and high fetch priority for the opening;
- lazy-load below-fold images;
- do not preload ritual or footer imagery.

- [ ] **Step 4: Self-host and preload approved fonts**

Use only required subsets and weights. Avoid loading unused italic or heavy weights.

- [ ] **Step 5: Add image tests**

Playwright must confirm:

- no broken image;
- width and height attributes exist;
- below-fold images are lazy;
- opening image is eager;
- no layout shift after image decoding.

- [ ] **Step 6: Commit media delivery**

```powershell
rtk git add src/assets src/content/images.ts src/components index.html src/styles tests
rtk git commit -m "perf: optimize anvelia media delivery"
```

## Task 13: Complete Accessibility

**Files:**

- Modify: `src/components/layout/PageShell.tsx`
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: interactive components
- Create: `tests/accessibility/site.spec.ts`
- Create: `docs/audits/2026-06-23-accessibility-audit.md`

- [ ] **Step 1: Add a skip link**

Add:

```tsx
<a className="skip-link" href="#main-content">
  Skip to main content
</a>
```

Set the main landmark:

```tsx
<main id="main-content">
```

- [ ] **Step 2: Verify heading and landmark structure**

Requirements:

- one `h1`;
- one main landmark;
- logical `h2` and `h3`;
- navigation labels;
- no decorative image with informative alt;
- no informative image with empty alt.

- [ ] **Step 3: Verify menu behavior**

Requirements:

- Escape closes;
- trigger label changes;
- focus remains visible;
- focus returns to trigger on close;
- closed links are not focusable;
- outside click does not trap keyboard users.

- [ ] **Step 4: Run axe tests**

Use `@axe-core/playwright` on:

- page loaded;
- menu open;
- ritual section;
- programs;
- inquiry idle;
- inquiry errors;
- inquiry success.

- [ ] **Step 5: Run manual checks**

- keyboard only;
- screen reader landmark and heading navigation;
- 200% zoom;
- 320 CSS pixel reflow;
- reduced motion;
- increased text spacing;
- Windows high contrast where available;
- touch target inspection.

- [ ] **Step 6: Commit accessibility**

```powershell
rtk git add src tests/accessibility docs/audits/2026-06-23-accessibility-audit.md
rtk git commit -m "feat: complete anvelia accessibility pass"
```

## Task 14: Complete SEO, Local Discovery, And Social Metadata

**Files:**

- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Replace: `public/og-anvelia-hero.jpg`
- Create: `src/components/seo/StructuredData.tsx`

- [ ] **Step 1: Correct canonical and social URLs**

Use the final production URL and respect the `/anvelia-sanctuary/` base path while GitHub Pages remains the host.

- [ ] **Step 2: Create accurate metadata**

Include:

- title;
- description;
- canonical;
- Open Graph title, description, image, URL, and type;
- Twitter card;
- favicon assets;
- theme color.

- [ ] **Step 3: Add structured data only when verified**

Use the most accurate Schema.org type supported by the real business. Include only verified:

- name;
- URL;
- image;
- address;
- telephone;
- geographic coordinates;
- price range if publishable;
- opening or contact availability;
- same-as profiles.

Do not add aggregate rating, review, amenity, medical, or offer data without evidence.

- [ ] **Step 4: Add sitemap and robots**

The sitemap must contain only canonical, public URLs. Update it automatically if routes are introduced.

- [ ] **Step 5: Add SEO tests**

Verify:

- canonical exists;
- one title and description;
- social image resolves;
- robots resolves;
- sitemap resolves;
- structured data parses as JSON;
- no broken anchor or route.

- [ ] **Step 6: Commit SEO**

```powershell
rtk git add index.html public src/components/seo tests/e2e
rtk git commit -m "feat: add anvelia search and social foundations"
```

## Task 15: Complete Privacy, Security, And Hosting Review

**Files:**

- Create: `docs/launch/ANVELIA_PRIVACY_AND_SECURITY.md`
- Modify if needed: deployment configuration
- Modify if needed: `vite.config.ts`

- [ ] **Step 1: Inventory data collection**

Record:

- analytics cookies or identifiers;
- inquiry fields;
- form processor;
- CRM or email destination;
- retention period;
- access owner;
- deletion request process;
- third-party map behavior.

- [ ] **Step 2: Define privacy requirements**

If no analytics and no form are approved, state that the public site collects no visitor-submitted personal data.

If analytics or a form is approved:

- publish an accurate privacy notice;
- collect the minimum fields;
- avoid medical history;
- provide consent where legally required;
- document retention and deletion.

- [ ] **Step 3: Review hosting capability**

Remain on GitHub Pages only if it supports the approved:

- canonical domain;
- HTTPS;
- redirects;
- form architecture;
- security-header expectations;
- deployment workflow.

If custom headers, serverless form handling, edge redirects, or preview environments become mandatory, compare Cloudflare Pages and Vercel and record the approved migration.

- [ ] **Step 4: Define security headers**

Target:

```text
Content-Security-Policy
Referrer-Policy
Permissions-Policy
X-Content-Type-Options
Strict-Transport-Security
```

Apply only through a hosting method that reliably serves them.

- [ ] **Step 5: Run dependency and secret checks**

```powershell
rtk proxy npm audit --omit=dev
rtk grep "api_key|apikey|secret|token|password" src public .github
```

Expected: no client-shipped secret and no unresolved high-severity production dependency issue.

- [ ] **Step 6: Commit the security decision**

```powershell
rtk git add docs/launch/ANVELIA_PRIVACY_AND_SECURITY.md vite.config.ts
rtk git commit -m "docs: define anvelia privacy and hosting controls"
```

## Task 16: Run Fidelity Design QA

**Files:**

- Create: `design-qa.md`
- Create: `tests/visual/`
- Save: implementation screenshots

- [ ] **Step 1: Capture matching source and implementation states**

Use identical viewport, route, content, menu state, theme, and crop.

Required comparison set:

- selected source sheet: `assets/anvelia/04-creative-direction-sheets/01-threshold-sequence.png`;
- desktop opening viewport;
- desktop full-page screenshot;
- desktop navigation-open screenshot;
- mobile opening viewport;
- mobile key-section states;
- mobile navigation-open screenshot;
- footer and visit close.

- [ ] **Step 2: Compare required surfaces**

Explicitly review:

- fonts and typography;
- spacing and rhythm;
- color and tokens;
- image quality and crop;
- copy and content;
- navigation;
- controls and states;
- responsive behavior;
- accessibility;
- overall polish.

Also answer these gate questions explicitly:

```text
Does the page look like Threshold Sequence before reading any labels?
Would a reviewer recognize it as a new website, not the old page polished?
Is the chronological guest rhythm structurally important on desktop?
Are mobile states designed, not merely stacked?
Are generated art-direction images labeled and treated as non-documentary?
```

- [ ] **Step 3: Fix all P0 to P2 findings**

P3 findings may remain only when documented as deliberate follow-up polish. Any finding that says "too close to old version," "source direction only loosely followed," or "Threshold Sequence not recognizable" is P1 and blocks launch.

- [ ] **Step 4: Set final result**

`design-qa.md` must end with exactly:

```text
final result: passed
```

Do not proceed to launch while it says `blocked`.

- [ ] **Step 5: Commit QA fixes**

```powershell
rtk git add design-qa.md src tests/visual
rtk git commit -m "fix: resolve anvelia design qa findings"
```

## Task 17: Run Production Verification

**Files:**

- Create: `docs/launch/ANVELIA_LAUNCH_CHECKLIST.md`
- Create: `docs/launch/ANVELIA_ROLLBACK_PLAN.md`

- [ ] **Step 1: Run the complete quality suite**

```powershell
rtk npm run lint
rtk npm run format:check
rtk npm run test
rtk npm run build
rtk npm run test:e2e
rtk npm run test:a11y
rtk npm run lighthouse
rtk git diff --check
```

Expected: all commands exit successfully.

- [ ] **Step 2: Verify production preview**

Check:

- 390px;
- 768px;
- 1280px;
- 1440px;
- menu;
- keyboard;
- reduced motion;
- 200% zoom;
- inquiry states;
- external links;
- images;
- structured data;
- sitemap;
- console;
- network failures;
- ritual scroll stability.

- [ ] **Step 3: Run cross-browser checks**

Test the production build on:

- current Chrome on Windows and Android;
- current Safari on macOS and iOS;
- current Firefox;
- current Edge.

Record differences in navigation blur, sticky positioning, font rendering, responsive images, form behavior, and reduced motion.

- [ ] **Step 4: Run representative usability checks**

Recruit at least five representative reviewers across the primary audiences. Give them these tasks without coaching:

1. Explain what Anvelia is.
2. Find what a stay includes.
3. Find a suitable stay length.
4. Identify how to arrive.
5. Begin planning a visit.

Record completion, hesitation, misunderstanding, and trust questions. Fix repeated high-impact friction before launch.

- [ ] **Step 5: Verify deployment workflow**

Update `.github/workflows/deploy-pages.yml` so deployment requires the quality job before publishing.

- [ ] **Step 6: Define rollback**

The rollback plan must include:

- last known good commit;
- deployment rerun procedure;
- form-disable procedure;
- analytics-disable procedure;
- DNS rollback owner if a custom domain is used.

- [ ] **Step 7: Define monitoring**

Monitor:

- website availability;
- inquiry endpoint availability;
- form delivery failures;
- production JavaScript errors if an approved error-monitoring provider is used;
- Core Web Vitals;
- broken links.

Do not add a monitoring SDK before reviewing its privacy, bundle, and cost impact.

- [ ] **Step 8: Commit launch documentation**

```powershell
rtk git add docs/launch .github/workflows
rtk git commit -m "chore: prepare anvelia production launch"
```

## Task 18: Launch And Validate Production

**Files:**

- Modify only files required by verified production findings

- [ ] **Step 1: Push the approved branch**

```powershell
rtk git push origin anvelia-sanctuary-build
```

- [ ] **Step 2: Confirm GitHub Actions**

Required jobs:

- quality;
- build;
- deploy.

- [ ] **Step 3: Verify the deployed URL**

Confirm:

- HTTPS;
- canonical URL;
- no broken base-path assets;
- working anchors or routes;
- working social image;
- working form delivery if enabled;
- working analytics events if enabled;
- no console errors;
- production Lighthouse targets.

- [ ] **Step 4: Submit discovery assets**

- submit sitemap to Google Search Console;
- verify canonical indexing;
- verify social preview;
- verify business contact and map links.

- [ ] **Step 5: Record launch**

Add the deployed commit, URL, date, metrics, and known P3 follow-ups to `ANVELIA_LAUNCH_CHECKLIST.md`.

## Task 19: Measure And Improve After Launch

**Files:**

- Create: `docs/launch/ANVELIA_30_DAY_REVIEW.md`

- [ ] **Step 1: Review after 7 days**

Check:

- availability;
- form delivery;
- console and network errors;
- search indexing;
- mobile Core Web Vitals;
- broken links;
- top CTA events.

- [ ] **Step 2: Review after 30 days**

Measure:

- plan-visit click rate;
- inquiry start and completion;
- call and map usage;
- device distribution;
- section engagement;
- abandonment before visit information;
- search queries;
- real-user Core Web Vitals.

- [ ] **Step 3: Prioritize evidence-led changes**

Classify:

```text
conversion
trust
content
accessibility
performance
visual polish
operational
```

Do not redesign from preference alone after launch.

- [ ] **Step 4: Commit the review**

```powershell
rtk git add docs/launch/ANVELIA_30_DAY_REVIEW.md
rtk git commit -m "docs: review anvelia launch performance"
```

---

## Missing Parts Resolved By This Plan

The previous build plan did not fully cover:

- audience and positioning;
- current UX audit;
- current competitor and guest-friction research;
- factual and health-claim governance;
- authentic photography and human presence;
- selected visual source of truth;
- typography licensing and actual font loading;
- conversion and inquiry architecture;
- provider and privacy review;
- component states;
- automated linting, formatting, tests, accessibility, and Lighthouse;
- responsive image delivery;
- structured data, canonical URL, sitemap, and robots;
- security headers and hosting capability;
- analytics naming and measurement;
- production rollback;
- post-launch review.

All are now explicit tasks with acceptance gates.

## Completion Criteria

- [ ] Baseline audit and metrics are recorded.
- [ ] Audience, positioning, and primary conversion are approved.
- [ ] Every public factual and wellness claim has a status in the truth matrix.
- [ ] One moodboard territory and one page direction are approved.
- [ ] The top-level `assets/` library contains all current source, generated, thumbnail, public, audit, and QA image assets with a manifest.
- [ ] Design Language and Frontend Structure match the selected direction.
- [ ] Final typography is licensed, self-hosted, and actually loaded.
- [ ] Final images are authentic, responsive, and optimized.
- [ ] The site architecture matches verified content and user intent.
- [ ] Inquiry collection, if enabled, has privacy, validation, delivery, success, and error handling.
- [ ] Static layout matches `assets/anvelia/04-creative-direction-sheets/01-threshold-sequence.png` before motion is applied.
- [ ] Motion is purposeful, stable, and reduced-motion safe.
- [ ] WCAG 2.2 AA target is met with no serious or critical axe findings.
- [ ] Core Web Vitals and Lighthouse targets pass.
- [ ] SEO, local discovery, social metadata, and canonical URLs are accurate.
- [ ] CI blocks deployment on failed quality gates.
- [ ] Design QA has `final result: passed`.
- [ ] Production deployment and rollback are verified.
- [ ] A 30-day measurement review is scheduled and documented.

## Self-Review

**Spec coverage:** The plan covers art direction, brand specificity, content truth, authentic media, asset provenance, conversion, architecture, design-system development, implementation, motion, responsive delivery, accessibility, performance, SEO, privacy, security, deployment, analytics, rollback, and post-launch measurement.

**Placeholder scan:** The plan contains no deferred placeholder or unspecified implementation step. Decisions that cannot responsibly be made before evidence exists are handled through explicit gates, named evaluation criteria, and required output documents.

**Type and naming consistency:** The primary CTA remains `Plan a visit`; test, analytics, content, visual, launch, and QA artifact names are consistent throughout the plan.

**Scope decision:** This is a staged elevation program. Tasks 0 through 7 create the evidence and approved target. Task 8 centralizes and governs all image assets. Tasks 9 through 19 implement, verify, launch, and measure that target. No code implementation should begin before the Direction and Architecture Gates are approved, and no visual implementation should continue if it drifts from the selected Threshold Sequence source.
