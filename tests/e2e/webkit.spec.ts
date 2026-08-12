import { expect, test, type Page } from "@playwright/test";

const homeViewports = [
  { width: 390, height: 844 },
  { width: 844, height: 390 },
  { width: 1440, height: 900 }
] as const;

const waitForHome = async (page: Page) => {
  await expect(page.locator(".threshold-hero")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
};

const waitForActivities = async (page: Page) => {
  await expect(page.locator(".activities-chapter")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
};

test("WebKit renders every homepage chapter as one clean viewport", async ({
  page
}) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const viewport of homeViewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await waitForHome(page);

    const state = await page.evaluate(() => {
      const selectors = [
        ".threshold-hero",
        "#place",
        "#cabins",
        "#open-air-living",
        "#gatherings",
        "#visit"
      ];

      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        chapters: selectors.map((selector) => {
          const element = document.querySelector<HTMLElement>(selector);
          const rect = element?.getBoundingClientRect();

          return {
            selector,
            exists: Boolean(element),
            height: rect?.height ?? 0,
            width: rect?.width ?? 0,
            clientHeight: element?.clientHeight ?? 0,
            scrollHeight: element?.scrollHeight ?? 0
          };
        })
      };
    });

    expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth);
    for (const chapter of state.chapters) {
      expect(chapter.exists, chapter.selector).toBe(true);
      expect(
        Math.abs(chapter.height - state.innerHeight),
        `${chapter.selector} height at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(chapter.width - state.innerWidth),
        `${chapter.selector} width at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(chapter.scrollHeight).toBeLessThanOrEqual(chapter.clientHeight + 1);
    }
  }

  expect(pageErrors).toEqual([]);
});

test("WebKit decodes the responsive concept imagery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHome(page);

  const selectors = [
    ".threshold-hero__media img",
    ".place-section__image img",
    ".cabins-section__image > img:first-child",
    ".open-air-section__image img",
    ".gatherings-section__image img",
    ".visit-section__image img"
  ];

  for (const selector of selectors) {
    const image = page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0
        )
      )
      .toBe(true);
  }
});

test("WebKit preserves the fixed header and full-screen menu contract", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHome(page);

  const menuButton = page.getByRole("button", { name: "Open menu" });
  const before = await menuButton.boundingBox();
  expect(before).not.toBeNull();

  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-scrolled",
    "true"
  );
  const scrolled = await menuButton.boundingBox();

  expect(Math.abs((scrolled?.x ?? 0) - (before?.x ?? 0))).toBeLessThanOrEqual(1);
  expect(Math.abs((scrolled?.y ?? 0) - (before?.y ?? 0))).toBeLessThanOrEqual(1);
  expect(scrolled?.width).toBe(44);
  expect(scrolled?.height).toBe(44);

  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Mobile site sections" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog.getByRole("button", { name: "Close menu" })).toBeFocused();

  const open = await dialog
    .getByRole("button", { name: "Close menu" })
    .boundingBox();
  expect(open).toEqual(scrolled);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("WebKit navigates between Rhythm and the Activities route", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHome(page);

  await page.locator("#open-air-living").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: "See activities" }).click();
  await expect(page).toHaveURL(/\/activities\/?$/);
  await waitForActivities(page);
  await expect(page.locator(".activities-chapter__image")).toHaveAttribute(
    "data-concept-only",
    "true"
  );

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Cabins", exact: true }).click();
  await expect(page).toHaveURL(/\/#cabins$/);
  await expect(page.locator("#cabins")).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator("#cabins")
        .evaluate((section) => Math.abs(section.getBoundingClientRect().top))
    )
    .toBeLessThanOrEqual(1);
});
