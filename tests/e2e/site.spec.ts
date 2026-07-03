import { expect, test } from "@playwright/test";

test("Task 4 foundation has no 320px horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");

  const overflow = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflowingElements: Array.from(document.body.querySelectorAll("*"))
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > window.innerWidth || rect.left < 0;
      })
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: element.getAttribute("class") ?? "",
        id: element.id
      }))
  }));

  expect(overflow.scrollWidth).toBe(overflow.innerWidth);
  expect(overflow.overflowingElements).toEqual([]);
});

test("Task 4 focus state is visibly stronger than decorative hairlines", async ({
  page
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const focusStyles = await page.evaluate(() => {
    const focused = document.activeElement;
    const styles = focused ? window.getComputedStyle(focused) : null;

    return {
      tag: focused?.tagName.toLowerCase(),
      className: focused?.getAttribute("class"),
      outlineStyle: styles?.outlineStyle,
      outlineWidth: styles?.outlineWidth,
      outlineColor: styles?.outlineColor,
      outlineOffset: styles?.outlineOffset,
      boxShadow: styles?.boxShadow
    };
  });

  expect(focusStyles.tag).toBe("a");
  expect(focusStyles.outlineStyle).toBe("solid");
  expect(focusStyles.outlineWidth).toBe("2px");
  expect(focusStyles.outlineOffset).toBe("4px");
  expect(focusStyles.boxShadow).not.toBe("none");
});

test("Task 6 skip link moves keyboard users past the global header", async ({
  page
}) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();

  await page.keyboard.press("Enter");

  const landmarkState = await page.evaluate(() => {
    const main = document.querySelector("main");
    const header = document.querySelector(".site-header");

    return {
      activeId: document.activeElement?.id,
      headerInsideMain: main && header ? main.contains(header) : null
    };
  });

  expect(landmarkState).toEqual({
    activeId: "main-content",
    headerInsideMain: false
  });
});

test("Task 4 runtime tokens are loaded into the page", async ({ page }) => {
  await page.goto("/");

  const tokens = await page.evaluate(() => {
    const styles = window.getComputedStyle(document.documentElement);

    return {
      paper: styles.getPropertyValue("--color-paper").trim(),
      timber: styles.getPropertyValue("--color-timber").trim(),
      forest: styles.getPropertyValue("--color-forest").trim(),
      brass: styles.getPropertyValue("--color-brass").trim(),
      focus: styles.getPropertyValue("--color-focus").trim(),
      displayFont: styles.getPropertyValue("--font-display").trim()
    };
  });

  expect(tokens).toMatchObject({
    paper: "#f4efe5",
    timber: "#4a2f22",
    forest: "#203a2b",
    brass: "#b08a54",
    focus: "#d6b37a"
  });
  expect(tokens.displayFont).toContain("Cormorant Garamond");
});

test("temporary nav targets are semantic and not aria-hidden", async ({
  page
}) => {
  await page.goto("/");

  const targetStates = await page
    .locator("#place, #cabins, #gatherings, #visit")
    .evaluateAll((targets) =>
      targets.map((target) => ({
        id: target.id,
        tag: target.tagName.toLowerCase(),
        ariaHidden: target.getAttribute("aria-hidden"),
        heading: target.querySelector("h2")?.textContent?.trim()
      }))
    );

  expect(targetStates).toEqual([
    {
      id: "place",
      tag: "section",
      ariaHidden: null,
      heading: "A place of quiet elevation"
    },
    { id: "cabins", tag: "section", ariaHidden: null, heading: "Cabins" },
    {
      id: "gatherings",
      tag: "section",
      ariaHidden: null,
      heading: "Gatherings"
    },
    { id: "visit", tag: "section", ariaHidden: null, heading: "Visit" }
  ]);
});

test("Task 7 hero CTA works and the opening holds a full viewport", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Anvelia Sanctuary" })
  ).toBeVisible();

  const heroCta = page.locator(".hero-whatsapp");
  await expect(heroCta).toHaveAttribute("href", "https://wa.me/60136683113");
  await expect(heroCta).toContainText("WhatsApp Anvelia");

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "A place of quiet elevation"
    })
  ).toBeVisible();
  await expect(page.locator("#place")).toContainText("450m");
  await expect(page.locator("#place")).toContainText("fresh hillside air");
  await expect(page.locator("#place")).toContainText("Bentong, Pahang");

  const openingState = await page.evaluate(() => {
    const hero = document.querySelector(".threshold-hero");
    const place = document.querySelector("#place");
    const placeImage = document.querySelector<HTMLImageElement>(
      ".place-section__image img"
    );
    const heroRect = hero?.getBoundingClientRect();
    const placeRect = place?.getBoundingClientRect();

    return {
      innerHeight: window.innerHeight,
      heroBottom: heroRect?.bottom,
      placeTop: placeRect?.top,
      placeImageLoaded:
        Boolean(placeImage?.complete) && Number(placeImage?.naturalWidth) > 0
    };
  });

  expect(openingState.heroBottom).toBeGreaterThanOrEqual(
    openingState.innerHeight - 1
  );
  expect(openingState.placeTop).toBeGreaterThanOrEqual(
    openingState.innerHeight - 1
  );
  expect(openingState.placeImageLoaded).toBe(true);
});

test("Task 7 mobile opening keeps a full-screen arrival without overflow", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const mobileOpeningState = await page.evaluate(() => {
    const place = document.querySelector("#place");
    const placeRect = place?.getBoundingClientRect();

    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      placeTop: placeRect?.top
    };
  });

  expect(mobileOpeningState.scrollWidth).toBe(mobileOpeningState.innerWidth);
  expect(mobileOpeningState.placeTop).toBeGreaterThanOrEqual(
    mobileOpeningState.innerHeight - 1
  );
});

test("Task 5 primitive preview renders images without mobile overflow", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?preview=primitives");

  const previewState = await page.evaluate(() => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(".image-frame__image")
    );

    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      imageCount: images.length,
      loadedImages: images.filter(
        (image) => image.complete && image.naturalWidth > 0
      ).length,
      aspectRatios: Array.from(
        document.querySelectorAll<HTMLElement>(".image-frame")
      ).map((frame) => window.getComputedStyle(frame).aspectRatio)
    };
  });

  expect(previewState.scrollWidth).toBe(previewState.innerWidth);
  expect(previewState.imageCount).toBe(4);
  expect(previewState.loadedImages).toBe(4);
  expect(previewState.aspectRatios).toEqual([
    "16 / 10",
    "4 / 3",
    "4 / 5",
    "1 / 1"
  ]);
});

test("Task 5 primitive preview remains a dev-only QA surface", async ({
  page
}) => {
  await page.goto("/?preview=primitives");
  await expect(
    page.getByRole("main", { name: "Task 5 primitive preview" })
  ).toBeVisible();
});

test("Task 6 desktop header keeps approved nav and restrained WhatsApp action", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await expect(page.locator(".site-header")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Anvelia Sanctuary home" })
  ).toContainText("Anvelia");

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });
  await expect(desktopNav.getByRole("link", { name: "Place" })).toBeVisible();
  await expect(desktopNav.getByRole("link", { name: "Cabins" })).toBeVisible();
  await expect(
    desktopNav.getByRole("link", { name: "Gatherings" })
  ).toBeVisible();
  await expect(desktopNav.getByRole("link", { name: "Visit" })).toBeVisible();

  const headerWhatsApp = page.locator(".site-header .header-whatsapp");
  await expect(headerWhatsApp).toHaveAttribute(
    "href",
    "https://wa.me/60136683113"
  );
  await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
});

test("fixed header stays elegant and readable after scroll", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const header = page.locator(".site-header");

  const topState = await header.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);

    return {
      dataScrolled: element.getAttribute("data-scrolled"),
      position: styles.position,
      top: Math.round(rect.top),
      backgroundColor: styles.backgroundColor
    };
  });

  expect(topState).toMatchObject({
    dataScrolled: null,
    position: "fixed"
  });
  expect(topState.top).toBeGreaterThanOrEqual(0);
  expect(topState.top).toBeLessThanOrEqual(26);

  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 120));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await page.waitForTimeout(220);

  const scrolledState = await header.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    const brandStyles = window.getComputedStyle(
      element.querySelector(".brand-link") as Element
    );
    const navStyles = window.getComputedStyle(
      element.querySelector(".primary-nav a") as Element
    );
    const whatsappStyles = window.getComputedStyle(
      element.querySelector(".header-whatsapp") as Element
    );

    return {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      backgroundColor: styles.backgroundColor,
      backgroundImage: styles.backgroundImage,
      borderColor: styles.borderTopColor,
      brandColor: brandStyles.color,
      navColor: navStyles.color,
      whatsappBackground: whatsappStyles.backgroundColor,
      whatsappColor: whatsappStyles.color
    };
  });

  expect(scrolledState.top).toBe(topState.top);
  expect(scrolledState.bottom).toBeGreaterThan(54);
  expect(scrolledState.backgroundColor).not.toBe(topState.backgroundColor);
  expect(scrolledState.backgroundImage).toContain("linear-gradient");
  expect(scrolledState.borderColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(scrolledState.brandColor).toContain("19, 15, 12");
  expect(scrolledState.navColor).toContain("19, 15, 12");
  expect(scrolledState.whatsappBackground).toContain("10, 8, 6");
  expect(scrolledState.whatsappColor).toContain("255, 250, 240");
});

test("phone portrait header aligns and keeps one frosted menu widget", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const topState = await page.evaluate(() => {
    const brand = document.querySelector(".brand-link");
    const whatsapp = document.querySelector(".site-header > .header-whatsapp");
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const brandRect = brand?.getBoundingClientRect();
    const whatsappRect = whatsapp?.getBoundingClientRect();
    const menuRect = menuButton?.getBoundingClientRect();
    const menuStyles = menuButton ? window.getComputedStyle(menuButton) : null;

    return {
      brandCenter: brandRect ? brandRect.top + brandRect.height / 2 : null,
      whatsappCenter: whatsappRect
        ? whatsappRect.top + whatsappRect.height / 2
        : null,
      menuCenter: menuRect ? menuRect.top + menuRect.height / 2 : null,
      menuTop: menuRect?.top,
      menuRight: menuRect ? window.innerWidth - menuRect.right : null,
      menuWidth: menuRect?.width,
      menuHeight: menuRect?.height,
      menuBackgroundColor: menuStyles?.backgroundColor,
      menuBorderColor: menuStyles?.borderTopColor,
      menuColor: menuStyles?.color,
      menuBackdropFilter: menuStyles?.backdropFilter,
      iconWidth: menuButton
        ?.querySelector("svg")
        ?.getBoundingClientRect().width,
      iconHeight: menuButton
        ?.querySelector("svg")
        ?.getBoundingClientRect().height,
      brandVisibility: brand ? window.getComputedStyle(brand).visibility : null,
      whatsappVisibility: whatsapp
        ? window.getComputedStyle(whatsapp).visibility
        : null
    };
  });

  expect(topState.brandVisibility).toBe("visible");
  expect(topState.whatsappVisibility).toBe("visible");
  expect(
    Math.abs(Number(topState.brandCenter) - Number(topState.menuCenter))
  ).toBeLessThanOrEqual(2);
  expect(
    Math.abs(Number(topState.whatsappCenter) - Number(topState.menuCenter))
  ).toBeLessThanOrEqual(2);
  expect(topState.menuWidth).toBe(44);
  expect(topState.menuHeight).toBe(44);
  expect(topState.menuBackgroundColor).toContain("10, 8, 6");
  expect(topState.menuBorderColor).toContain("246, 240, 230");
  expect(topState.menuColor).toContain("246, 240, 230");
  expect(topState.menuBackdropFilter).toContain("blur");
  expect(topState.iconWidth).toBe(20);
  expect(topState.iconHeight).toBe(20);

  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 120));
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-scrolled",
    "true"
  );
  await page.waitForTimeout(220);

  const scrolledState = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const brand = document.querySelector(".brand-link");
    const whatsapp = document.querySelector(".site-header > .header-whatsapp");
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const menuIcon = menuButton?.querySelector("svg");
    const headerStyles = header ? window.getComputedStyle(header) : null;
    const brandStyles = brand ? window.getComputedStyle(brand) : null;
    const whatsappStyles = whatsapp
      ? window.getComputedStyle(whatsapp)
      : null;
    const menuStyles = menuButton ? window.getComputedStyle(menuButton) : null;
    const menuRect = menuButton?.getBoundingClientRect();
    const iconRect = menuIcon?.getBoundingClientRect();

    return {
      headerBackground: headerStyles?.backgroundColor,
      headerPointerEvents: headerStyles?.pointerEvents,
      brandVisibility: brandStyles?.visibility,
      brandOpacity: brandStyles?.opacity,
      whatsappVisibility: whatsappStyles?.visibility,
      whatsappOpacity: whatsappStyles?.opacity,
      menuPointerEvents: menuStyles?.pointerEvents,
      menuBackgroundColor: menuStyles?.backgroundColor,
      menuBorderColor: menuStyles?.borderTopColor,
      menuBackdropFilter: menuStyles?.backdropFilter,
      menuTop: menuRect?.top,
      menuRight: menuRect ? window.innerWidth - menuRect.right : null,
      menuWidth: menuRect?.width,
      menuHeight: menuRect?.height,
      iconWidth: iconRect?.width,
      iconHeight: iconRect?.height
    };
  });

  expect(scrolledState.headerBackground).toBe("rgba(0, 0, 0, 0)");
  expect(scrolledState.headerPointerEvents).toBe("none");
  expect(scrolledState.brandVisibility).toBe("hidden");
  expect(scrolledState.brandOpacity).toBe("0");
  expect(scrolledState.whatsappVisibility).toBe("hidden");
  expect(scrolledState.whatsappOpacity).toBe("0");
  expect(scrolledState.menuPointerEvents).toBe("auto");
  expect(scrolledState.menuBackgroundColor).toBe(
    topState.menuBackgroundColor
  );
  expect(scrolledState.menuBorderColor).toBe(topState.menuBorderColor);
  expect(scrolledState.menuBackdropFilter).toBe(
    topState.menuBackdropFilter
  );
  expect(
    Math.abs(Number(scrolledState.menuTop) - Number(topState.menuTop))
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(Number(scrolledState.menuRight) - Number(topState.menuRight))
  ).toBeLessThanOrEqual(1);
  expect(scrolledState.menuWidth).toBe(44);
  expect(scrolledState.menuHeight).toBe(44);
  expect(scrolledState.iconWidth).toBe(20);
  expect(scrolledState.iconHeight).toBe(20);

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.locator(".mobile-nav-panel")).toBeVisible();

  const openState = await page.evaluate(() => {
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const menuIcon = menuButton?.querySelector("svg");
    const menuStyles = menuButton ? window.getComputedStyle(menuButton) : null;
    const menuRect = menuButton?.getBoundingClientRect();
    const iconRect = menuIcon?.getBoundingClientRect();

    return {
      menuBackgroundColor: menuStyles?.backgroundColor,
      menuBorderColor: menuStyles?.borderTopColor,
      menuColor: menuStyles?.color,
      menuBackdropFilter: menuStyles?.backdropFilter,
      menuTop: menuRect?.top,
      menuRight: menuRect ? window.innerWidth - menuRect.right : null,
      menuWidth: menuRect?.width,
      menuHeight: menuRect?.height,
      iconWidth: iconRect?.width,
      iconHeight: iconRect?.height
    };
  });

  expect(openState.menuBackgroundColor).toBe(scrolledState.menuBackgroundColor);
  expect(openState.menuBorderColor).toBe(scrolledState.menuBorderColor);
  expect(openState.menuBackdropFilter).toBe(scrolledState.menuBackdropFilter);
  expect(openState.menuColor).toBe(topState.menuColor);
  expect(
    Math.abs(Number(openState.menuTop) - Number(scrolledState.menuTop))
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(Number(openState.menuRight) - Number(scrolledState.menuRight))
  ).toBeLessThanOrEqual(1);
  expect(openState.menuWidth).toBe(scrolledState.menuWidth);
  expect(openState.menuHeight).toBe(scrolledState.menuHeight);
  expect(openState.iconWidth).toBe(scrolledState.iconWidth);
  expect(openState.iconHeight).toBe(scrolledState.iconHeight);
});

test("tablet paper header keeps the menu button inside the header row", async ({
  page
}) => {
  await page.setViewportSize({ width: 808, height: 1077 });
  await page.goto("/");

  await page.evaluate(() => window.scrollTo(0, 120));
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-scrolled",
    "true"
  );
  await page.waitForTimeout(220);

  const closedState = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const whatsapp = document.querySelector(".site-header > .header-whatsapp");
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const headerRect = header?.getBoundingClientRect();
    const whatsappRect = whatsapp?.getBoundingClientRect();
    const menuRect = menuButton?.getBoundingClientRect();
    const menuStyles = menuButton ? window.getComputedStyle(menuButton) : null;

    return {
      headerRight: headerRect ? window.innerWidth - headerRect.right : null,
      whatsappCenter: whatsappRect
        ? whatsappRect.top + whatsappRect.height / 2
        : null,
      menuCenter: menuRect ? menuRect.top + menuRect.height / 2 : null,
      menuPosition: menuStyles?.position,
      menuTop: menuRect?.top,
      menuRight: menuRect ? window.innerWidth - menuRect.right : null,
      menuWidth: menuRect?.width,
      menuHeight: menuRect?.height,
      gapFromWhatsapp:
        whatsappRect && menuRect ? menuRect.left - whatsappRect.right : null
    };
  });

  expect(closedState.menuPosition).toBe("static");
  expect(closedState.menuWidth).toBe(44);
  expect(closedState.menuHeight).toBe(44);
  expect(Number(closedState.gapFromWhatsapp)).toBeGreaterThanOrEqual(8);
  expect(
    Math.abs(Number(closedState.whatsappCenter) - Number(closedState.menuCenter))
  ).toBeLessThanOrEqual(2);
  expect(Number(closedState.menuRight)).toBeGreaterThan(
    Number(closedState.headerRight)
  );

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

  const openState = await page.evaluate(() => {
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const menuRect = menuButton?.getBoundingClientRect();

    return {
      menuTop: menuRect?.top,
      menuRight: menuRect ? window.innerWidth - menuRect.right : null,
      menuWidth: menuRect?.width,
      menuHeight: menuRect?.height
    };
  });

  expect(Math.abs(Number(openState.menuTop) - Number(closedState.menuTop))).toBeLessThanOrEqual(1);
  expect(
    Math.abs(Number(openState.menuRight) - Number(closedState.menuRight))
  ).toBeLessThanOrEqual(1);
  expect(openState.menuWidth).toBe(closedState.menuWidth);
  expect(openState.menuHeight).toBe(closedState.menuHeight);
});

test("fixed header leaves room when desktop nav jumps to Place", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Site sections" })
    .getByRole("link", { name: "Place" })
    .click();
  await page.waitForTimeout(260);

  const anchorState = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const title = document.querySelector("#place-title");
    const headerRect = header?.getBoundingClientRect();
    const titleRect = title?.getBoundingClientRect();

    return {
      headerBottom: Math.round(headerRect?.bottom ?? 0),
      titleTop: Math.round(titleRect?.top ?? 0)
    };
  });

  expect(anchorState.titleTop).toBeGreaterThan(anchorState.headerBottom + 24);
});

test("Task 6 mobile menu opens, closes, returns focus, and avoids overflow", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();

  const closedTopWidget = await page.evaluate(() => {
    const element = document.querySelector(".mobile-menu-toggle");
    const icon = element?.querySelector("svg");
    const styles = element ? window.getComputedStyle(element) : null;
    const buttonRect = element?.getBoundingClientRect();
    const iconRect = icon?.getBoundingClientRect();

    return {
      top: buttonRect?.top,
      right: buttonRect ? window.innerWidth - buttonRect.right : null,
      width: buttonRect?.width,
      height: buttonRect?.height,
      iconWidth: iconRect?.width,
      iconHeight: iconRect?.height,
      backgroundColor: styles?.backgroundColor,
      borderColor: styles?.borderTopColor,
      backdropFilter: styles?.backdropFilter
    };
  });

  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

  const panel = page.locator(".mobile-nav-panel");
  await expect(panel).toBeVisible();

  const mobileNav = page.getByRole("navigation", {
    name: "Mobile site sections"
  });

  for (const label of ["Place", "Cabins", "Gatherings", "Visit"]) {
    await expect(mobileNav.getByRole("link", { name: label })).toBeVisible();
  }

  const openOverflow = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyOverflow: window.getComputedStyle(document.body).overflow,
    panel: (() => {
      const element = document.querySelector(".mobile-nav-panel");
      const rect = element?.getBoundingClientRect();
      const styles = element ? window.getComputedStyle(element) : null;

      return {
        x: rect?.x,
        y: rect?.y,
        position: styles?.position,
        backgroundImage: styles?.backgroundImage,
        borderRadius: styles?.borderRadius,
        width: rect?.width,
        height: rect?.height
      };
    })(),
    closeButton: (() => {
      const element = document.querySelector(".mobile-menu-toggle");
      const icon = element?.querySelector("svg");
      const styles = element ? window.getComputedStyle(element) : null;
      const buttonRect = element?.getBoundingClientRect();
      const iconRect = icon?.getBoundingClientRect();

      return {
        top: buttonRect?.top,
        right: buttonRect ? window.innerWidth - buttonRect.right : null,
        width: buttonRect?.width,
        height: buttonRect?.height,
        iconWidth: iconRect?.width,
        iconHeight: iconRect?.height,
        backgroundColor: styles?.backgroundColor,
        borderColor: styles?.borderTopColor,
        backdropFilter: styles?.backdropFilter
      };
    })(),
    navRelation: (() => {
      const lastLink = document.querySelector(".mobile-nav a:last-child");
      const rule = document.querySelector(".mobile-nav-panel__rule");
      const lastRect = lastLink?.getBoundingClientRect();
      const ruleRect = rule?.getBoundingClientRect();

      return {
        gapLastLinkToRule:
          lastRect && ruleRect ? Math.round(ruleRect.top - lastRect.bottom) : null
      };
    })(),
    hiddenHeaderLinks: {
      brandTabIndex: document
        .querySelector(".brand-link")
        ?.getAttribute("tabindex"),
      whatsappTabIndex: document
        .querySelector(".site-header > .header-whatsapp")
        ?.getAttribute("tabindex")
    }
  }));

  expect(openOverflow.scrollWidth).toBe(openOverflow.innerWidth);
  expect(openOverflow.bodyOverflow).toBe("hidden");
  expect(openOverflow.panel).toMatchObject({
    x: 0,
    y: 0,
    position: "fixed",
    borderRadius: "0px"
  });
  expect(openOverflow.panel?.width).toBe(openOverflow.innerWidth);
  expect(openOverflow.panel?.height).toBe(844);
  expect(openOverflow.panel?.backgroundImage).toContain("url(");
  expect(openOverflow.panel?.backgroundImage).toContain(
    "anvelia-mobile-navigation-timber-craft"
  );
  expect(Math.abs(Number(openOverflow.closeButton.top) - Number(closedTopWidget.top))).toBeLessThanOrEqual(1);
  expect(
    Math.abs(Number(openOverflow.closeButton.right) - Number(closedTopWidget.right))
  ).toBeLessThanOrEqual(1);
  expect(openOverflow.closeButton).toMatchObject({
    width: closedTopWidget.width,
    height: closedTopWidget.height,
    iconWidth: closedTopWidget.iconWidth,
    iconHeight: closedTopWidget.iconHeight,
    backgroundColor: closedTopWidget.backgroundColor,
    borderColor: closedTopWidget.borderColor,
    backdropFilter: closedTopWidget.backdropFilter
  });
  expect(openOverflow.navRelation.gapLastLinkToRule).toBeLessThanOrEqual(90);
  expect(openOverflow.hiddenHeaderLinks).toEqual({
    brandTabIndex: "-1",
    whatsappTabIndex: "-1"
  });

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
