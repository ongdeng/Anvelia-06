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

test("Rhythm passage opens the complete Activities page and exposes focus", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const passage = page.getByRole("link", { name: "See activities" });

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
      name: "A slower way to spend the day"
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "A slower way to spend the day"
    })
  ).toHaveCSS("color", "rgb(19, 15, 12)");
  await expect(page.locator("[data-rhythm-movement]")).toHaveCount(3);
  await expect(page.locator(".rhythm-aperture")).toHaveCount(3);
});

for (const viewport of [
  { width: 1280, height: 800, minGap: 44, maxGap: 110 },
  { width: 390, height: 844, minGap: 24, maxGap: 72 },
  { width: 844, height: 390, minGap: 12, maxGap: 48 }
]) {
  test(`Rhythm passage holds the approved lower-margin relation at ${viewport.width}x${viewport.height}`, async ({
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
        bottomGap:
          copyRect && passageRect ? copyRect.bottom - passageRect.bottom : null,
        introGap:
          introRect && passageRect ? passageRect.top - introRect.bottom : null,
        beforeContent: before?.content,
        afterContent: after?.content,
        afterWidth: Number.parseFloat(after?.width ?? "0")
      };
    });

    expect(Number(geometry.bottomGap)).toBeGreaterThanOrEqual(viewport.minGap);
    expect(Number(geometry.bottomGap)).toBeLessThanOrEqual(viewport.maxGap);
    expect(Number(geometry.introGap)).toBeGreaterThanOrEqual(8);
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

  await expect(page).toHaveTitle("Activities | Anvelia Sanctuary");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Rhythm at Anvelia Sanctuary, shaped by sunlight, natural wind, meditation, water, tea, and quiet gatherings on the hillside."
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Activities | Anvelia Sanctuary"
  );
  await expect(
    page.locator('meta[property="og:description"]')
  ).toHaveAttribute(
    "content",
    "Rhythm at Anvelia Sanctuary, shaped by sunlight, natural wind, meditation, water, tea, and quiet gatherings on the hillside."
  );

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });

  await expect(desktopNav.getByRole("link", { name: "Place" })).toHaveAttribute(
    "href",
    "/#place"
  );
  await expect(
    desktopNav.getByRole("link", { name: "Rhythm" })
  ).toHaveAttribute("href", "/#open-air-living");
  const apertures = page.locator(".rhythm-aperture");
  await expect(apertures).toHaveCount(3);

  for (const aperture of await apertures.all()) {
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
      const main = document.querySelector<HTMLElement>(".rhythm-page__main");
      const movementRects = Array.from(
        document.querySelectorAll<HTMLElement>("[data-rhythm-movement]")
      ).map((element) => element.getBoundingClientRect());
      const apertureRects = Array.from(
        document.querySelectorAll<HTMLElement>(".rhythm-aperture")
      ).map((element) => element.getBoundingClientRect());
      const textElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".rhythm-page__main h1, .rhythm-page__main h2, .rhythm-page__main p, .rhythm-page__main a"
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
    expect(layout.apertures).toHaveLength(3);

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
      expect(aperture.width).toBeLessThanOrEqual(layout.viewportWidth * 0.93 + 1);
      expect(aperture.height).toBeLessThanOrEqual(layout.viewportHeight * 0.92 + 1);
    }

    if (
      layout.viewportHeight > layout.viewportWidth &&
      layout.viewportWidth >= 821
    ) {
      expect(layout.apertures[0].width).toBeGreaterThanOrEqual(
        layout.viewportWidth * 0.9
      );
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
