import { expect, test } from "@playwright/test";

const chapterViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 821, height: 1180 },
  { width: 834, height: 1194 },
  { width: 568, height: 320 },
  { width: 844, height: 390 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 }
];

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 568, height: 320 },
  { width: 844, height: 390 },
  { width: 1440, height: 900 }
]) {
  test(`Experiences index stays readable and navigates by keyboard at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/activities/");
    await page.evaluate(() => document.fonts.ready);
    const index = page.getByRole("navigation", { name: "Experience chapters" });
    await expect(index).toBeVisible();
    const links = index.getByRole("link");
    await expect(links).toHaveText(["Move", "Water", "Rituals"]);

    const opening = await index.evaluate(element => {
      const indexRect = element.getBoundingClientRect();
      const titleElement = document.querySelector("#experience-title")!;
      const chapterElement = document.querySelector("#movement-title")!;
      const title = titleElement.getBoundingClientRect();
      const chapter = chapterElement.getBoundingClientRect();
      const firstLabel = document.createRange();
      firstLabel.selectNodeContents(element.querySelector("a")!);
      return {
        indexTop: indexRect.top, indexBottom: indexRect.bottom,
        firstLabelLeft: firstLabel.getBoundingClientRect().left,
        titleTop: title.top, titleBottom: title.bottom,
        titleLeft: title.left, chapterTop: chapter.top, chapterBottom: chapter.bottom,
        titleSize: Number.parseFloat(getComputedStyle(titleElement).fontSize),
        chapterSize: Number.parseFloat(getComputedStyle(chapterElement).fontSize),
        photoTop: document.querySelector(".spatial-court img")!.getBoundingClientRect().top,
        links: Array.from(element.querySelectorAll("a")).map(link => {
          const rect = link.getBoundingClientRect();
          return { width: rect.width, height: rect.height, right: rect.right };
        }),
        viewport: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth
      };
    });
    expect(opening.pageWidth).toBeLessThanOrEqual(opening.viewport);
    expect(opening.titleSize).toBeGreaterThan(opening.chapterSize);
    expect(opening.photoTop).toBeLessThan(viewport.height - 96);
    for (const link of opening.links) {
      expect(link.width).toBeGreaterThanOrEqual(44);
      expect(link.height).toBeGreaterThanOrEqual(44);
      expect(link.right).toBeLessThanOrEqual(opening.viewport);
    }
    const compactLandscape = viewport.width > viewport.height && viewport.height <= 500;
    if (!compactLandscape) {
      expect(opening.indexTop).toBeGreaterThanOrEqual(opening.titleBottom);
      expect(Math.abs(opening.firstLabelLeft - opening.titleLeft)).toBeLessThanOrEqual(1);
      const chapterPause = opening.chapterTop - opening.indexBottom;
      const imageInterval = opening.photoTop - opening.chapterBottom;
      expect(chapterPause).toBeGreaterThanOrEqual(imageInterval + 12);
    } else {
      expect(opening.indexTop).toBeLessThan(opening.titleBottom);
      expect(opening.indexBottom).toBeGreaterThan(opening.titleTop);
    }

    for (const chapter of [
      { label: "Water", id: "water-warmth" },
      { label: "Rituals", id: "quiet-rituals" },
      { label: "Move", id: "move-explore" }
    ]) {
      await index.getByRole("link", { name: chapter.label, exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`#${chapter.id}$`));
      await expect(page.locator(`#${chapter.id}`)).toBeFocused();
      const landing = await page.locator(`#${chapter.id}`).evaluate(element => ({
        top: element.getBoundingClientRect().top,
        headerBottom: document.querySelector(".site-header")!.getBoundingClientRect().bottom
      }));
      expect(landing.top).toBeGreaterThanOrEqual(landing.headerBottom);
      expect(landing.top).toBeLessThanOrEqual(landing.headerBottom + 40);
    }
  });
}

test("Rhythm passage opens the complete Activities page and exposes focus", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const passage = page.getByRole("link", { name: "Explore experiences" });

  await expect(passage).toHaveAttribute("href", "/activities/");
  await passage.focus();
  await expect(passage).toBeFocused();

  const focusState = await passage.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);

    return {
      height: rect.height,
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth
    };
  });

  expect(focusState.height).toBeGreaterThanOrEqual(44);
  expect(focusState.outlineStyle).not.toBe("none");
  expect(focusState.outlineWidth).not.toBe("0px");

  await passage.click();
  await expect(page).toHaveURL(/\/activities\/$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Experiences"
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Experiences"
    })
  ).toHaveCSS("color", "rgb(32, 58, 43)");
  await expect(page.locator(".experiences-page__main section[aria-labelledby]")).toHaveCount(3);
  await expect(page.locator(".experiences-page__main figure")).toHaveCount(10);

  const returnLink = page.getByRole("link", { name: "Return to Rhythm" });
  await expect(returnLink).toHaveAttribute("href", "/#open-air-living");
  await returnLink.click();
  await expect(page).toHaveURL(/\/#open-air-living$/);
  await expect(page.locator("#open-air-living")).toBeFocused();
});

for (const viewport of [
  { width: 1280, height: 800, minGap: 16, maxGap: 32 },
  { width: 390, height: 844, minGap: 12, maxGap: 24 },
  { width: 320, height: 568, minGap: 12, maxGap: 24 },
  { width: 844, height: 390, minGap: 8, maxGap: 18 },
  { width: 568, height: 320, minGap: 8, maxGap: 18 }
]) {
  test(`Rhythm passage stays associated with its introduction at ${viewport.width}x${viewport.height}`, async ({
    page
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.locator("#open-air-living").scrollIntoViewIfNeeded();

    const geometry = await page.evaluate(() => {
      const copy = document.querySelector(".open-air-section__copy");
      const intro = document.querySelector(".open-air-section__intro");
      const passage = document.querySelector(".open-air-section__passage");
      const copyRect = copy?.getBoundingClientRect();
      const introRect = intro?.getBoundingClientRect();
      const passageRect = passage?.getBoundingClientRect();
      const before = passage
        ? window.getComputedStyle(passage, "::before")
        : null;
      const after = passage
        ? window.getComputedStyle(passage, "::after")
        : null;

      return {
        fitsCopy: !!(copyRect && passageRect && passageRect.bottom <= copyRect.bottom),
        height: passageRect?.height ?? 0,
        fontSize: passage ? Number.parseFloat(getComputedStyle(passage).fontSize) : 0,
        introGap:
          introRect && passageRect ? passageRect.top - introRect.bottom : null,
        beforeContent: before?.content,
        afterContent: after?.content,
        afterWidth: Number.parseFloat(after?.width ?? "0")
      };
    });

    expect(geometry.fitsCopy).toBe(true);
    expect(geometry.height).toBeGreaterThanOrEqual(44);
    expect(geometry.fontSize).toBeGreaterThanOrEqual(14);
    expect(Number(geometry.introGap)).toBeGreaterThanOrEqual(viewport.minGap);
    expect(Number(geometry.introGap)).toBeLessThanOrEqual(viewport.maxGap);
    expect(geometry.beforeContent).toBe("none");
    expect(geometry.afterContent).toBe('\"\"');
    expect(geometry.afterWidth).toBeGreaterThanOrEqual(48);
  });
}

test("Activities loads directly with rooted navigation and concept imagery", async ({
  page
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/activities");

  await expect(page).toHaveTitle("Experiences | Anvelia Sanctuary");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Explore movement, water and quiet rituals at Anvelia Sanctuary, from pickleball and forest trails to tea, yoga and moments of rest."
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Experiences | Anvelia Sanctuary"
  );
  await expect(
    page.locator('meta[property="og:description"]')
  ).toHaveAttribute(
    "content",
    "Explore movement, water and quiet rituals at Anvelia Sanctuary, from pickleball and forest trails to tea, yoga and moments of rest."
  );

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });

  await expect(desktopNav.getByRole("link", { name: "Place" })).toHaveAttribute(
    "href",
    "/#place"
  );
  await expect(
    desktopNav.getByRole("link", { name: "Experiences", exact: true })
  ).toHaveAttribute("href", "/activities/");
  const apertures = page.locator(".experiences-page__main figure");
  await expect(apertures).toHaveCount(10);
  const activityTitles = page.locator(".experiences-page__main h3");
  await expect(activityTitles).toHaveCount(10);
  // Browser specificity must retain the same weight in all three chapters.
  for (const title of await activityTitles.all()) {
    await expect(title).toHaveCSS("font-weight", "500");
  }

  for (const aperture of await apertures.all()) {
    await aperture.scrollIntoViewIfNeeded();
    await expect(aperture).toHaveAttribute("data-concept-only", "true");
    await expect
      .poll(() =>
        aperture.locator("img").evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0
        )
      )
      .toBe(true);
  }

  await desktopNav.getByRole("link", { name: "Place" }).click();
  await expect(page).toHaveURL(/\/#place$/);
  await expect
    .poll(() =>
      page
        .locator("#place")
        .evaluate((section) => Math.round(section.getBoundingClientRect().top))
    )
    .toBe(0);
  await expect(page.locator("#place")).toBeFocused();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`Experiences is one navigation action away and returns to Rhythm at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    if (viewport.width <= 820) {
      await page.getByRole("button", { name: "Open menu" }).click();
    }
    const nav = page.getByRole("navigation", {
      name: viewport.width <= 820 ? "Mobile site sections" : "Site sections",
      exact: true
    });
    const experiences = nav.getByRole("link", { name: "Experiences", exact: true });
    await expect(experiences).toHaveAttribute("href", "/activities/");
    await experiences.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/activities\/$/);
    await expect(page.getByRole("navigation", { name: "Experience chapters" })).toBeVisible();
    await page.getByRole("link", { name: "Return to Rhythm", exact: true }).click();
    await expect(page).toHaveURL(/\/#open-air-living$/);
    await expect(page.locator("#open-air-living")).toBeFocused();
    await expect(page.getByRole("link", { name: "Explore experiences", exact: true })).toBeVisible();
  });
}

test("Activities mobile navigation lands on and focuses the selected home chapter", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/activities");

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Cabins", exact: true }).click();

  await expect(page).toHaveURL(/\/#cabins$/);
  await expect
    .poll(() =>
      page
        .locator("#cabins")
        .evaluate((section) => Math.round(section.getBoundingClientRect().top))
    )
    .toBe(0);
  await expect(page.locator("#cabins")).toBeFocused();
});

for (const viewport of chapterViewports) {
  test(`Activities promenade stays restrained and readable at ${viewport.width}x${viewport.height}`, async ({
    page
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/activities");
    await page.evaluate(() => document.fonts.ready);

    const layout = await page.evaluate(() => {
      const main = document.querySelector<HTMLElement>(".experiences-page__main");
      const movementRects = Array.from(
        document.querySelectorAll<HTMLElement>(".experiences-page__main section[aria-labelledby]")
      ).map((element) => element.getBoundingClientRect());
      const apertureRects = Array.from(
        document.querySelectorAll<HTMLElement>(".experiences-page__main figure")
      ).map((element) => element.getBoundingClientRect());
      const textElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".experiences-page__main h1, .experiences-page__main h2, .experiences-page__main p, .experiences-page__main a"
        )
      );

      return {
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        mainHeight: main?.scrollHeight ?? 0,
        movements: movementRects.map((rect) => ({
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          height: rect.height
        })),
        apertures: apertureRects.map((rect) => ({
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height
        })),
        text: textElements.map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            fontSize: Number.parseFloat(window.getComputedStyle(element).fontSize)
          };
        })
      };
    });

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.mainHeight).toBeGreaterThan(layout.viewportHeight * 2.2);
    expect(layout.movements).toHaveLength(3);
    expect(layout.apertures).toHaveLength(10);

    for (const [index, movement] of layout.movements.entries()) {
      expect(movement.left).toBeGreaterThanOrEqual(-1);
      expect(movement.right).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(movement.height).toBeGreaterThan(layout.viewportHeight * 0.55);
      if (index > 0) {
        expect(movement.top).toBeGreaterThanOrEqual(
          layout.movements[index - 1].bottom - 1
        );
      }
    }

    for (const aperture of layout.apertures) {
      expect(aperture.left).toBeGreaterThanOrEqual(-1);
      expect(aperture.right).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(aperture.width).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(aperture.height).toBeGreaterThan(0);
    }

    for (const text of layout.text) {
      expect(text.left).toBeGreaterThanOrEqual(-1);
      expect(text.right).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(text.fontSize).toBeGreaterThanOrEqual(10);
    }
  });
}

for (const width of [821, 834, 1024, 1280, 1440]) {
  test(`five-item desktop header remains uncrowded at ${width}px`, async ({
    page
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/activities");

    const geometry = await page.evaluate(() => {
      const brand = document.querySelector(".brand-link")?.getBoundingClientRect();
      const nav = document
        .querySelector(".primary-nav--desktop")
        ?.getBoundingClientRect();
      const whatsapp = document
        .querySelector(".site-header > .header-whatsapp")
        ?.getBoundingClientRect();
      const links = Array.from(
        document.querySelectorAll(".primary-nav--desktop a")
      ).map((link) => link.getBoundingClientRect());

      return {
        brandRight: brand?.right,
        navLeft: nav?.left,
        navRight: nav?.right,
        whatsappLeft: whatsapp?.left,
        linkCount: links.length,
        linksSeparated: links.every(
          (rect, index) => index === 0 || rect.left > links[index - 1].right
        )
      };
    });

    expect(geometry.linkCount).toBe(5);
    expect(geometry.linksSeparated).toBe(true);
    expect(Number(geometry.navLeft)).toBeGreaterThanOrEqual(
      Number(geometry.brandRight)
    );
    expect(Number(geometry.whatsappLeft)).toBeGreaterThanOrEqual(
      Number(geometry.navRight)
    );
  });
}
