import { expect, test } from "@playwright/test";

const chapterViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
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
    page.getByRole("heading", { level: 1, name: "Time, left open" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Time, left open" })
  ).toHaveCSS("color", "rgb(19, 15, 12)");
  await expect(page.locator(".activities-chapter__moment")).toHaveCount(3);
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
    "Quiet moments at Anvelia Sanctuary, shaped by tea, reading, timber, greenery, and cooler evening air on the hillside."
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Activities | Anvelia Sanctuary"
  );
  await expect(
    page.locator('meta[property="og:description"]')
  ).toHaveAttribute(
    "content",
    "Quiet moments at Anvelia Sanctuary, shaped by tea, reading, timber, greenery, and cooler evening air on the hillside."
  );

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });

  await expect(desktopNav.getByRole("link", { name: "Place" })).toHaveAttribute(
    "href",
    "/#place"
  );
  await expect(
    desktopNav.getByRole("link", { name: "Rhythm" })
  ).toHaveAttribute("href", "/#open-air-living");
  await expect(page.locator(".activities-chapter__image")).toHaveAttribute(
    "data-concept-only",
    "true"
  );

  const image = page.locator(".activities-chapter__image img");

  await expect
    .poll(() =>
      image.evaluate(
        (element: HTMLImageElement) =>
          element.complete && element.naturalWidth > 0
      )
    )
    .toBe(true);

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
  test(`Activities chapter contains content at ${viewport.width}x${viewport.height}`, async ({
    page
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/activities");

    const layout = await page.evaluate(() => {
      const chapter = document.querySelector(".activities-chapter");
      const copy = document.querySelector(".activities-chapter__copy");
      const image = document.querySelector(".activities-chapter__image");
      const chapterRect = chapter?.getBoundingClientRect();
      const copyRect = copy?.getBoundingClientRect();
      const imageRect = image?.getBoundingClientRect();
      const contentRects = Array.from(
        document.querySelectorAll(
          ".activities-chapter__introduction, .activities-chapter__moment, .activities-chapter__moment p"
        )
      ).map((element) => element.getBoundingClientRect());
      const introSize = Number.parseFloat(
        window.getComputedStyle(
          document.querySelector(".activities-chapter__intro") as Element
        ).fontSize
      );
      const momentBodySizes = Array.from(
        document.querySelectorAll(".activities-chapter__moment p")
      ).map((element) =>
        Number.parseFloat(window.getComputedStyle(element).fontSize)
      );

      return {
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        introSize,
        momentBodySizes,
        chapter: chapterRect
          ? {
              top: chapterRect.top,
              right: chapterRect.right,
              bottom: chapterRect.bottom,
              left: chapterRect.left,
              height: chapterRect.height
            }
          : null,
        copy: copyRect
          ? {
              top: copyRect.top,
              right: copyRect.right,
              bottom: copyRect.bottom,
              left: copyRect.left,
              scrollHeight: (copy as HTMLElement).scrollHeight,
              clientHeight: (copy as HTMLElement).clientHeight
            }
          : null,
        image: imageRect
          ? {
              top: imageRect.top,
              right: imageRect.right,
              bottom: imageRect.bottom,
              left: imageRect.left
            }
          : null,
        content: contentRects.map((rect) => ({
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left
        }))
      };
    });

    expect(layout.chapter).not.toBeNull();
    expect(Math.round(layout.chapter?.height ?? 0)).toBe(
      layout.viewportHeight
    );
    expect(Math.round(layout.chapter?.top ?? -1)).toBe(0);
    expect(Math.round(layout.chapter?.bottom ?? 0)).toBe(
      layout.viewportHeight
    );
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.copy?.scrollHeight).toBeLessThanOrEqual(
      (layout.copy?.clientHeight ?? 0) + 1
    );

    for (const rect of layout.content) {
      expect(rect.left).toBeGreaterThanOrEqual((layout.copy?.left ?? 0) - 1);
      expect(rect.right).toBeLessThanOrEqual((layout.copy?.right ?? 0) + 1);
      expect(rect.top).toBeGreaterThanOrEqual((layout.copy?.top ?? 0) - 1);
      expect(rect.bottom).toBeLessThanOrEqual((layout.copy?.bottom ?? 0) + 1);
    }

    expect(layout.image?.left).toBeGreaterThanOrEqual(-1);
    expect(layout.image?.right).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.image?.top).toBeGreaterThanOrEqual(-1);
    expect(layout.image?.bottom).toBeLessThanOrEqual(
      layout.viewportHeight + 1
    );

    expect(layout.introSize).toBeGreaterThanOrEqual(12);
    expect(Math.min(...layout.momentBodySizes)).toBeGreaterThanOrEqual(12);
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
