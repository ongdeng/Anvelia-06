import { expect, test } from "@playwright/test";

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 568, height: 320 },
  { width: 1440, height: 900 }
]) {
  test(`private stays backbone remains image-free and navigable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const imageRequests: string[] = [];
    page.on("request", request => {
      if (request.resourceType() === "image") imageRequests.push(request.url());
    });
    await page.setViewportSize(viewport);
    await page.goto("/?preview=stays");
    const main = page.getByRole("main", { name: "Cabin stays", exact: true });
    await expect(main).toBeVisible();
    await expect(main.getByRole("heading", { level: 1 }))
      .toHaveCSS("color", "rgb(32, 58, 43)");
    await expect(main.getByRole("heading", { level: 1 })).toHaveCSS("text-shadow", "none");
    await expect(main.getByRole("heading", { level: 1 })).toHaveCSS("font-weight", "500");
    await expect(main.locator(".stays-template__eyebrow")).toHaveText("Bukit Tinggi, Pahang");
    await expect(main.locator(".stays-template__lead"))
      .toHaveText("Warm timber, soft light and greenery beyond the door.");
    await expect(main.locator(".stays-template__lead")).toHaveCSS("text-wrap", "balance");
    await expect(page).toHaveTitle("Cabin stays | Anvelia Sanctuary");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
    await expect(main.locator("img, picture, video, canvas, form, input, button")).toHaveCount(0);
    await expect(main.getByRole("heading", { level: 2 })).toHaveText(["The essentials", "Before you arrive", "Around Anvelia"]);
    await expect(main.locator("address")).toContainText("Lot 8421, Kampung Bukit Tinggi");
    await expect(main.getByText("Not yet confirmed", { exact: true })).toHaveCount(7);
    await expect(main.getByRole("group", { name: "Cabin exterior photo space" })).toBeVisible();
    await expect(main.getByRole("group", { name: "Cabin interior photo space" })).toBeVisible();
    await expect(main.getByRole("navigation")).toHaveCount(0);
    await expect(main.getByRole("link")).toHaveText(["Explore experiences", "Return to Cabins"]);
    await expect(main.getByRole("link", { name: "The cabins", exact: true })).toHaveCount(0);
    await expect(main.getByRole("link", { name: "Around Anvelia", exact: true })).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);

    const layout = await main.evaluate(element => {
      const elements = Array.from(element.querySelectorAll("h1, h2, p, figcaption, a, dt, dd, li"));
      const viewportWidth = document.documentElement.clientWidth;
      return {
        viewportWidth,
        pageWidth: document.documentElement.scrollWidth,
        overflow: elements.filter(node => {
          const rect = node.getBoundingClientRect();
          return rect.left < -1 || rect.right > viewportWidth + 1 || node.scrollWidth > node.clientWidth + 1;
        }).map(node => node.textContent),
        linkHeights: Array.from(element.querySelectorAll("a")).map(link => link.getBoundingClientRect().height)
      };
    });
    expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.overflow).toEqual([]);
    expect(layout.linkHeights.every(height => height >= 44)).toBe(true);
    if (viewport.width <= 820) {
      const essentials = page.getByRole("region", { name: "The essentials" });
      const firstFact = await essentials.getByText("Guests", { exact: true }).boundingBox();
      const lastValue = await essentials.locator("dd").last().boundingBox();
      const supportingPhoto = await essentials.getByRole("group", { name: "Cabin interior photo space" }).boundingBox();
      expect(firstFact!.y).toBeLessThan(supportingPhoto!.y);
      expect(lastValue!.y + lastValue!.height).toBeLessThanOrEqual(supportingPhoto!.y);
    }
    expect(imageRequests).toHaveLength(1);
    expect(imageRequests[0]).toMatch(/anvelia-visit-paper-field-1024[^/]*\.webp(?:\?|$)/);

    const opening = await main.evaluate(element => {
      const title = element.querySelector("h1")!;
      const lead = element.querySelector(".stays-template__lead")!;
      const titleRect = title.getBoundingClientRect();
      const leadRect = lead.getBoundingClientRect();
      const introRect = element.querySelector(".stays-template__intro")!.getBoundingClientRect();
      return {
        title: { left: titleRect.left, right: titleRect.right, top: titleRect.top, bottom: titleRect.bottom, height: titleRect.height },
        lead: { left: leadRect.left, right: leadRect.right, top: leadRect.top, bottom: leadRect.bottom },
        introBottom: introRect.bottom,
        nextTop: element.querySelector("#stay-experiences")!.getBoundingClientRect().top,
        introWidth: introRect.width,
        titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
        photo: element.querySelector(".stays-template__intro .stays-template__photo")?.getBoundingClientRect().toJSON(),
        arrivalMinHeight: getComputedStyle(element.querySelector(".stays-template__arrival")!).minHeight,
        closingBorder: getComputedStyle(element.querySelector(".stays-template__closing")!).borderTopWidth,
        headerBottom: document.querySelector(".site-header")!.getBoundingClientRect().bottom
      };
    });
    expect(opening.title.top).toBeGreaterThanOrEqual(opening.headerBottom + 24);
    expect(opening.nextTop).toBeGreaterThanOrEqual(Math.max(opening.title.bottom, opening.lead.bottom) + 24);
    expect(opening.photo).toBeTruthy();
    expect(opening.introBottom).toBeGreaterThanOrEqual(opening.photo!.bottom);
    expect(opening.arrivalMinHeight).toBe("0px");
    expect(opening.closingBorder).toBe("0px");
    if (viewport.width > 820 && viewport.height > 500) {
      expect(opening.lead.left - opening.title.left).toBeGreaterThanOrEqual(18);
      expect(opening.lead.left - opening.title.left).toBeLessThanOrEqual(22);
      expect(opening.lead.top - opening.title.bottom).toBeGreaterThanOrEqual(36);
      expect(opening.lead.top - opening.title.bottom).toBeLessThanOrEqual(48);
      expect(opening.title.right + 16).toBeLessThanOrEqual(opening.photo!.left);
    } else if (viewport.height > viewport.width) {
      expect(opening.lead.left - opening.title.left).toBeGreaterThanOrEqual(18);
      expect(opening.lead.left - opening.title.left).toBeLessThanOrEqual(22);
      expect(opening.lead.top - opening.title.bottom).toBeGreaterThanOrEqual(28);
      expect(opening.lead.top - opening.title.bottom).toBeLessThanOrEqual(36);
      if (viewport.width <= 600) expect(opening.title.height).toBeGreaterThan(opening.titleSize * 1.8);
    } else {
      expect(opening.lead.top).toBeGreaterThanOrEqual(opening.title.bottom + 24);
    }
    if (viewport.width <= 820) expect(opening.photo!.top).toBeGreaterThanOrEqual(opening.lead.bottom + 24);

    await page.goto("/?preview=stays#stay-cabins");
    await expect(page.locator("#stay-cabins")).toBeFocused();
    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    if (viewport.width === 390) {
      await page.goto("/?preview=stays#stay-arrival");
      await expect(page.locator("#stay-arrival")).toBeFocused();
      const arrivalTop = await page.locator("#stay-arrival-title").boundingBox();
      const fixedHeader = await page.locator(".site-header").boundingBox();
      expect(arrivalTop!.y).toBeGreaterThanOrEqual(fixedHeader!.y + fixedHeader!.height);
    }
    await page.goto("/?preview=stays");
    await expect(main).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
    for (const control of await page.locator(".site-header :is(a, button):visible").all()) {
      await page.keyboard.press("Tab");
      await expect(control).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(main.getByRole("link", { name: "Explore experiences", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(main.getByRole("link", { name: "Return to Cabins", exact: true })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(main.getByRole("link", { name: "Explore experiences", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/activities\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Experiences", exact: true })).toBeVisible();
    await page.goto("/?preview=stays");
    await expect(main).toBeVisible();
    await main.getByRole("link", { name: "Explore experiences", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(main.getByRole("link", { name: "Return to Cabins", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/#cabins$/);
    await expect(page.locator("#cabins")).toBeFocused();
    await expect(page.getByRole("link", { name: "Cabin stays details", exact: true }))
      .toHaveAttribute("href", "/stays/");
    await expect(page.locator('a[href="/stays/"]')).toHaveCount(1);
  });
}

for (const populated of [false, true]) {
  for (const width of [320, 1440]) {
    test(`private stays folio adapts to enlarged text and spacing with populated=${populated} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(populated ? "/tests/fixtures/stays-layout.html" : "/?preview=stays");
      const main = page.getByRole("main", { name: "Cabin stays", exact: true });
      await expect(main).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      if (populated) {
        await expect(main.getByRole("heading", { level: 2 }))
          .toHaveText(["The essentials", "Before you arrive", "Around Anvelia"]);
        await expect(main.locator("dd")).toHaveCount(5);
      }
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
        const nodes = Array.from(element.querySelectorAll<HTMLElement>("h1, h2, p, figcaption, address, a, dt, dd, li"));
        const sections = Array.from(element.children).map(node => node.getBoundingClientRect());
        return {
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          overflow: nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent),
          overlappingSections: sections.some((rect, index) => index > 0 && rect.top < sections[index - 1].bottom - 1),
          links: Array.from(element.querySelectorAll("a")).map(node => ({ height: node.getBoundingClientRect().height, text: node.textContent }))
        };
      });
      expect(layout.pageWidth).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.overflow).toEqual([]);
      expect(layout.overlappingSections).toBe(false);
      expect(layout.links.map(link => link.text)).toEqual(["Explore experiences", "Return to Cabins"]);
      expect(layout.links.every(link => link.height >= 44)).toBe(true);
      await main.getByRole("link", { name: "Return to Cabins" }).focus();
      await expect(main.getByRole("link", { name: "Return to Cabins" })).toBeFocused();
    });
  }
}
