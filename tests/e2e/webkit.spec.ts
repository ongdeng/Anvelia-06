import { expect, test, type Page } from "@playwright/test";

test("WebKit keeps the private botanical cabin folio readable", async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1024, height: 768 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.getByRole("link", { name: "Cabin stays details", exact: true }).click();
    const main = page.getByRole("main", { name: "Cabin stays", exact: true });
    await expect(main).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(main.locator("dd")).toHaveCount(7);
    const layout = await main.evaluate(element => {
      const photo = element.querySelector(".stays-template__photo--exterior")!.getBoundingClientRect();
      const firstFact = element.querySelector("dt")!.getBoundingClientRect();
      const text = [...element.querySelectorAll<HTMLElement>("h1, h2, p, address, a, dt, dd, li")];
      return {
        width: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
        firstFactTop: firstFact.top,
        photoAndFactOverlap: Math.min(photo.right, firstFact.right) - Math.max(photo.left, firstFact.left) > 1 && Math.min(photo.bottom, firstFact.bottom) - Math.max(photo.top, firstFact.top) > 1,
        overflow: text.filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.textContent)
      };
    });
    expect(layout.pageWidth).toBeLessThanOrEqual(layout.width);
    expect(layout.photoAndFactOverlap).toBe(false);
    expect(layout.overflow).toEqual([]);
    if (viewport.width >= 1000) expect(layout.firstFactTop).toBeLessThan(viewport.height);
    for (const image of await main.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    await page.goto("/outputs/stays-botanical-folio/#stay-essentials");
    await expect(page.locator("#stay-essentials")).toBeFocused();
  }
});

test("WebKit keeps the private stays backbone readable and returns to Cabins", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?preview=stays");
  const main = page.getByRole("main", { name: "Cabin stays", exact: true });
  await expect(main).toBeVisible();
  await expect(main.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(32, 58, 43)");
  await expect(main.getByRole("heading", { level: 1 })).toHaveCSS("text-shadow", "none");
  await expect(main.getByRole("heading", { level: 1 })).toHaveCSS("font-weight", "500");
  await expect(main.locator(".stays-template__eyebrow")).toHaveText("Bukit Tinggi, Pahang");
  await expect(main.locator("img, picture, video, form")).toHaveCount(0);
  await expect(main.getByText("Not yet confirmed", { exact: true })).toHaveCount(7);
  await expect(main.getByRole("group", { name: "Cabin exterior photo space" })).toBeVisible();
  await expect(main.getByRole("group", { name: "Cabin interior photo space" })).toBeVisible();
  await expect(main.getByRole("navigation")).toHaveCount(0);
  await expect(main.getByRole("link")).toHaveText(["Explore experiences", "Return to Cabins"]);
  await page.goto("/?preview=stays#stay-cabins");
  await expect(page.locator("#stay-cabins")).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await main.getByRole("link", { name: "Return to Cabins", exact: true }).click();
  await expect(page).toHaveURL(/\/#cabins$/);
  await expect(page.locator("#cabins")).toBeFocused();
  await expect(page.getByRole("link", { name: "Cabin stays details", exact: true }))
    .toHaveAttribute("href", "/stays/");
  await expect(page.locator('a[href="/stays/"]')).toHaveCount(1);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`WebKit expands populated private stays content at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/tests/fixtures/stays-layout.html");
    const main = page.getByRole("main", { name: "Cabin stays", exact: true });
    await expect(main.getByRole("heading", { level: 2 }))
      .toHaveText(["The essentials", "Before you arrive", "Around Anvelia"]);
    await page.evaluate(() => document.fonts.ready);
    await main.evaluate(element => {
      for (const node of element.querySelectorAll<HTMLElement>("h1, h2, p, figcaption, address, a, dt, dd, li")) {
        node.style.fontSize = `${Number.parseFloat(getComputedStyle(node).fontSize) * 2}px`;
        node.style.lineHeight = "1.5";
        node.style.letterSpacing = "0.12em";
        node.style.wordSpacing = "0.16em";
        if (node.tagName === "P") node.style.marginBottom = "2em";
      }
    });
    const layout = await main.evaluate(element => {
      const nodes = Array.from(element.querySelectorAll<HTMLElement>("h1, h2, p, a, dt, dd, li"));
      const sections = Array.from(element.children).map(node => node.getBoundingClientRect());
      return {
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        overflow: nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent),
        overlap: sections.some((rect, index) => index > 0 && rect.top < sections[index - 1].bottom - 1)
      };
    });
    expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.overflow).toEqual([]);
    expect(layout.overlap).toBe(false);
    await main.getByRole("link", { name: "Return to Cabins", exact: true }).focus();
    await expect(main.getByRole("link", { name: "Return to Cabins", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/#cabins$/);
    await expect(page.locator("#cabins")).toBeFocused();
  });
}

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
  await expect(page.locator(".experiences-page__main")).toBeVisible();
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

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile site sections", exact: true })
    .getByRole("link", { name: "Experiences", exact: true }).click();
  await expect(page).toHaveURL(/\/activities\/$/);
  await page.getByRole("link", { name: "Return to Rhythm", exact: true }).click();
  await expect(page).toHaveURL(/\/#open-air-living$/);
  await expect(page.locator("#open-air-living")).toBeFocused();

  await page.locator("#open-air-living").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: "Explore experiences" }).click();
  await expect(page).toHaveURL(/\/activities\/?$/);
  await waitForActivities(page);
  await expect(page.locator(".experiences-page__main figure")).toHaveCount(10);
  for (const aperture of await page.locator(".experiences-page__main figure").all()) {
    await expect(aperture).toHaveAttribute("data-concept-only", "true");
  }

  const index = page.getByRole("navigation", { name: "Experience chapters" });
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
  }

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
