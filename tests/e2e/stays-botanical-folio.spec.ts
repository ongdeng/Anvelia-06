import { expect, test } from "@playwright/test";

test("mobile cabin preview gives the expanded navigation its intended backdrop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/outputs/stays-botanical-folio/");

  const toggle = page.getByRole("button", { name: "Open menu", exact: true });
  await toggle.click();
  const panel = page.locator(".mobile-nav-panel");
  await expect(panel).toBeVisible();
  const backgroundImage = await panel.evaluate(element => getComputedStyle(element).backgroundImage);
  expect(backgroundImage).toContain("url(");

  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`main-page Cabin stays opens the private cabin preview and returns at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    if (viewport.width <= 820) await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.getByRole("navigation", { name: viewport.width <= 820 ? "Mobile site sections" : "Site sections", exact: true })
      .getByRole("link", { name: "Cabins", exact: true }).click();
    await page.getByRole("link", { name: "Cabin stays details", exact: true }).click();
    await expect(page).toHaveURL(/\/outputs\/stays-botanical-folio\/$/);
    await expect(page.getByRole("main", { name: "Cabin stays", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Beyond the cabin", exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Return to Cabins", exact: true }).click();
    await expect(page).toHaveURL(/\/#cabins$/);
    await expect(page.locator("#cabins")).toBeFocused();
    await expect(page.getByRole("link", { name: "Cabin stays details", exact: true })).toBeVisible();
  });
}

// Exercise the actual private alternative, including its CSS and sample adapter.
for (const viewport of [
  { width: 320, height: 740 },
  { width: 390, height: 844 },
  { width: 1024, height: 768 },
  { width: 844, height: 390 },
  { width: 1440, height: 900 }
]) {
  test(`botanical cabin folio keeps stay information readable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/outputs/stays-botanical-folio/");
    const main = page.getByRole("main", { name: "Cabin stays", exact: true });
    await expect(main).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(main.getByRole("heading", { level: 1 })).toHaveText("Cabin stays");
    await expect(main.locator("dd")).toHaveCount(7);
    await expect(main.locator("#stay-essentials dt")).toHaveText(["Guests", "Beds", "Bathroom", "Cabin access"]);
    await expect(main.locator("#stay-essentials dd").nth(1)).toHaveText("One queen bed.");
    await expect(main.getByRole("region", { name: "Beyond the cabin", exact: true }))
      .toContainText("Pickleball, jungle trekking, hot spring bathing and Chinese tea.");
    await expect(main.getByText("On arrival", { exact: true })).toBeVisible();
    await expect(main.getByText("Access from guest parking includes steps to the deck.", { exact: true })).toBeVisible();
    await expect(main.getByText("Please share your expected arrival time on WhatsApp before you travel.", { exact: true })).toBeVisible();
    await expect(main.getByText("Not yet confirmed", { exact: true })).toHaveCount(0);
    await expect(main.getByRole("link")).toHaveText(["Explore experiences", "Return to Cabins"]);
    await expect(main.getByRole("link", { name: "Explore experiences" })).toHaveAttribute("href", "/activities/");
    await expect(main.getByRole("link", { name: "Return to Cabins" })).toHaveAttribute("href", "/#cabins");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
    for (const image of await main.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(await image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }

    await main.focus();
    await page.keyboard.press("Control+Home");
    const layout = await main.evaluate(element => {
      const text = [...element.querySelectorAll<HTMLElement>("h1, h2, p, address, a, dt, dd, li")];
      const images = [...element.querySelectorAll<HTMLImageElement>("img")];
      const boxes = [...text, ...images].map(node => ({ text: node.textContent || node.getAttribute("alt"), rect: node.getBoundingClientRect() }));
      const overlaps: string[] = [];
      for (let a = 0; a < boxes.length; a++) {
        for (let b = a + 1; b < boxes.length; b++) {
          const x = boxes[a].rect, y = boxes[b].rect;
          if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 1 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 1) {
            overlaps.push(`${boxes[a].text} / ${boxes[b].text}`);
          }
        }
      }
      return {
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        overflow: text.filter(node => {
          const rect = node.getBoundingClientRect();
          return rect.left < -1 || rect.right > document.documentElement.clientWidth + 1 || node.scrollWidth > node.clientWidth + 1;
        }).map(node => node.textContent),
        overlaps,
        firstFactTop: element.querySelector("dt")!.getBoundingClientRect().top,
        imageRatios: images.map(image => ({ rendered: image.getBoundingClientRect().width / image.getBoundingClientRect().height, natural: image.naturalWidth / image.naturalHeight }))
      };
    });
    expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.overflow).toEqual([]);
    expect(layout.overlaps).toEqual([]);
    for (const ratio of layout.imageRatios) expect(ratio.rendered).toBeCloseTo(ratio.natural, 2);
    if (viewport.width >= 1000) expect(layout.firstFactTop).toBeLessThan(viewport.height);

    await page.goto("/outputs/stays-botanical-folio/#stay-essentials");
    await expect(page.locator("#stay-essentials")).toBeFocused();
    const heading = await main.getByRole("heading", { name: "The essentials", exact: true }).boundingBox();
    const header = await page.locator(".site-header").boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  });
}

for (const width of [320, 1440]) {
  test(`botanical cabin folio tolerates enlarged text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/outputs/stays-botanical-folio/");
    const main = page.getByRole("main", { name: "Cabin stays", exact: true });
    await expect(main).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await main.evaluate(element => {
      for (const node of element.querySelectorAll<HTMLElement>("h1, h2, p, address, a, dt, dd, li")) {
        node.style.fontSize = `${Number.parseFloat(getComputedStyle(node).fontSize) * 2}px`;
        node.style.lineHeight = "1.5";
        node.style.letterSpacing = "0.12em";
        node.style.wordSpacing = "0.16em";
        if (node.tagName === "P") node.style.marginBottom = "2em";
      }
    });
    const layout = await main.evaluate(element => {
      const nodes = [...element.querySelectorAll<HTMLElement>("h1, h2, p, address, a, dt, dd, li")];
      const rects = nodes.map(node => ({ text: node.textContent, rect: node.getBoundingClientRect() }));
      return {
        width: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
        overflowing: nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent),
        overlaps: rects.flatMap((a, i) => rects.slice(i + 1).filter(b => Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left) > 1 && Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top) > 1).map(b => `${a.text} / ${b.text}`))
      };
    });
    expect(layout.pageWidth).toBeLessThanOrEqual(layout.width);
    expect(layout.overflowing).toEqual([]);
    expect(layout.overlaps).toEqual([]);
    await main.getByRole("link", { name: "Return to Cabins" }).focus();
    await expect(main.getByRole("link", { name: "Return to Cabins" })).toBeFocused();
  });
}
