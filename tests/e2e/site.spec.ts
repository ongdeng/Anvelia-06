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

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
  expect(overflow.overflowingElements).toEqual([]);
});

test("Task 10.1 fits a 320px device after a reserved scrollbar reduces its layout viewport", async ({
  page
}) => {
  const states = [
    { path: "/", menuOpen: false },
    { path: "/", menuOpen: true },
    { path: "/activities/", menuOpen: false }
  ];

  await page.setViewportSize({ width: 320, height: 568 });

  for (const state of states) {
    await page.goto(state.path);

    if (state.menuOpen) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        page.getByRole("button", { name: "Close menu" })
      ).toBeVisible();
    }

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      const layoutWidth = document.body.clientWidth;
      const overflowingElements = Array.from(
        document.body.querySelectorAll<HTMLElement>("*")
      )
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const styles = window.getComputedStyle(element);

          if (
            styles.display === "none" ||
            styles.visibility === "hidden" ||
            rect.width === 0 ||
            rect.height === 0
          ) {
            return false;
          }

          return rect.left < -1 || rect.right > layoutWidth + 1;
        })
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          className: element.getAttribute("class") ?? "",
          id: element.id
        }));

      return {
        innerWidth: window.innerWidth,
        layoutWidth,
        rootScrollWidth: root.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        rootOverflowX: window.getComputedStyle(root).overflowX,
        bodyOverflowX: window.getComputedStyle(document.body).overflowX,
        overflowingElements
      };
    });

    expect(overflow.innerWidth).toBe(320);
    expect(overflow.layoutWidth).toBe(305);
    expect(overflow.rootScrollWidth).toBeLessThanOrEqual(overflow.layoutWidth);
    expect(overflow.bodyScrollWidth).toBeLessThanOrEqual(overflow.layoutWidth);
    expect(["hidden", "clip"]).not.toContain(overflow.rootOverflowX);

    if (!state.menuOpen) {
      expect(["hidden", "clip"]).not.toContain(overflow.bodyOverflowX);
    }

    expect(overflow.overflowingElements).toEqual([]);
  }
});

test("Task 10.1 shared phone header separates controls and clears page content", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 }
  ];
  const paths = ["/", "/activities/"];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const path of paths) {
      await page.goto(path);

      const readGeometry = () =>
        page.evaluate(() => {
          const header = document.querySelector<HTMLElement>(".site-header");
          const whatsapp = document.querySelector<HTMLElement>(
            ".site-header > .header-whatsapp"
          );
          const menu = document.querySelector<HTMLElement>(
            ".mobile-menu-toggle"
          );
          const eyebrow = document.querySelector<HTMLElement>(
            ".activities-chapter__eyebrow"
          );
          const rect = (element: Element | null) =>
            element?.getBoundingClientRect() ?? null;
          const headerRect = rect(header);
          const whatsappRect = rect(whatsapp);
          const menuRect = rect(menu);
          const eyebrowRect = rect(eyebrow);
          const headerStyles = header
            ? window.getComputedStyle(header)
            : null;
          const headerSurfaceStyles = header
            ? window.getComputedStyle(header, "::before")
            : null;

          return {
            headerBottom: headerRect?.bottom,
            headerBackdropFilter: headerStyles?.backdropFilter,
            headerSurfaceBackdropFilter:
              headerSurfaceStyles?.backdropFilter,
            whatsappMenuGap:
              whatsappRect && menuRect
                ? menuRect.left - whatsappRect.right
                : null,
            whatsappMenuCenterDelta:
              whatsappRect && menuRect
                ? Math.abs(
                    whatsappRect.top +
                      whatsappRect.height / 2 -
                      (menuRect.top + menuRect.height / 2)
                  )
                : null,
            menu: menuRect
              ? {
                  top: menuRect.top,
                  right: document.body.clientWidth - menuRect.right,
                  width: menuRect.width,
                  height: menuRect.height
                }
              : null,
            eyebrowClearance:
              headerRect && eyebrowRect
                ? eyebrowRect.top - headerRect.bottom
                : null
          };
        });

      const topGeometry = await readGeometry();

      expect(Number(topGeometry.whatsappMenuGap)).toBeGreaterThanOrEqual(9);
      expect(Number(topGeometry.whatsappMenuCenterDelta)).toBeLessThanOrEqual(
        2
      );
      expect(topGeometry.menu).toMatchObject({ width: 44, height: 44 });

      if (path === "/activities/") {
        expect(Number(topGeometry.eyebrowClearance)).toBeGreaterThanOrEqual(16);
        expect(topGeometry.headerBackdropFilter).toBe("none");
        expect(topGeometry.headerSurfaceBackdropFilter).toContain("blur");
      }

      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(
        page.getByRole("button", { name: "Close menu" })
      ).toBeVisible();

      const openGeometry = await readGeometry();

      expect(
        Math.abs(
          Number(openGeometry.menu?.top) - Number(topGeometry.menu?.top)
        )
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(
          Number(openGeometry.menu?.right) - Number(topGeometry.menu?.right)
        )
      ).toBeLessThanOrEqual(1);
      expect(openGeometry.menu).toMatchObject({ width: 44, height: 44 });
    }
  }
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
    focus: "#94856a"
  });
  expect(tokens.displayFont).toContain("Cormorant Garamond");
});

test("phase 1 section targets are semantic and not aria-hidden", async ({
  page
}) => {
  await page.goto("/");

  const targetStates = await page
    .locator("#place, #cabins, #open-air-living, #gatherings, #visit")
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
    {
      id: "cabins",
      tag: "section",
      ariaHidden: null,
      heading: "Cabins in nature's embrace"
    },
    {
      id: "open-air-living",
      tag: "section",
      ariaHidden: null,
      heading: "Living with the hillside"
    },
    {
      id: "gatherings",
      tag: "section",
      ariaHidden: null,
      heading: "A quieter way to gather"
    },
    {
      id: "visit",
      tag: "section",
      ariaHidden: null,
      heading: "Come and see Anvelia"
    }
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
      placeImageLoading: placeImage?.getAttribute("loading")
    };
  });

  expect(openingState.heroBottom).toBeGreaterThanOrEqual(
    openingState.innerHeight - 1
  );
  expect(openingState.placeTop).toBeGreaterThanOrEqual(
    openingState.innerHeight - 1
  );
  expect(openingState.placeImageLoading).toBe("lazy");
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

  expect(mobileOpeningState.scrollWidth).toBeLessThanOrEqual(
    mobileOpeningState.innerWidth
  );
  expect(mobileOpeningState.placeTop).toBeGreaterThanOrEqual(
    mobileOpeningState.innerHeight - 1
  );
});

test("Place portrait keeps the current image blended while landscape stays split", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const portraitImage = page.locator(".place-section__image img");
  await portraitImage.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      portraitImage.evaluate(
        (image) =>
          (image as HTMLImageElement).complete &&
          (image as HTMLImageElement).naturalWidth > 0
      )
    )
    .toBe(true);

  const portraitState = await page.evaluate(() => {
    const imageFrame = document.querySelector(".place-section__image");
    const image = imageFrame?.querySelector("img");
    const imageRect = imageFrame?.getBoundingClientRect();
    const imageFrameStyles = imageFrame
      ? window.getComputedStyle(imageFrame)
      : null;
    const imageStyles = image ? window.getComputedStyle(image) : null;
    const fadeStyles = imageFrame
      ? window.getComputedStyle(imageFrame, "::before")
      : null;

    return {
      imageHeight: imageRect?.height,
      imageMarginTop: imageFrameStyles?.marginTop,
      imageObjectFit: imageStyles?.objectFit,
      imageObjectPosition: imageStyles?.objectPosition,
      imageSrc: image?.getAttribute("src"),
      imageLoaded:
        Boolean(image?.complete) && Number(image?.naturalWidth) > 0,
      fadeContent: fadeStyles?.content,
      fadeBackground: fadeStyles?.backgroundImage
    };
  });

  expect(portraitState.imageSrc).toContain("anvelia-place-hillside-setting");
  expect(portraitState.imageLoaded).toBe(true);
  expect(Number(portraitState.imageHeight) / 844).toBeGreaterThanOrEqual(0.28);
  expect(Number(portraitState.imageHeight) / 844).toBeLessThanOrEqual(0.36);
  expect(Number.parseFloat(String(portraitState.imageMarginTop))).toBe(-18);
  expect(portraitState.imageObjectFit).toBe("cover");
  expect(portraitState.imageObjectPosition).toBe("58% 46%");
  expect(portraitState.fadeContent).toBe('""');
  expect(portraitState.fadeBackground).toContain("linear-gradient");

  await page.setViewportSize({ width: 1077, height: 808 });
  await page.reload();

  const landscapeImage = page.locator(".place-section__image img");
  await landscapeImage.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      landscapeImage.evaluate(
        (image) =>
          (image as HTMLImageElement).complete &&
          (image as HTMLImageElement).naturalWidth > 0
      )
    )
    .toBe(true);

  const landscapeState = await page.evaluate(() => {
    const place = document.querySelector(".place-section");
    const imageFrame = document.querySelector(".place-section__image");
    const image = imageFrame?.querySelector("img");
    const placeStyles = place ? window.getComputedStyle(place) : null;
    const imageRect = imageFrame?.getBoundingClientRect();

    return {
      gridTemplateColumns: placeStyles?.gridTemplateColumns,
      imageHeight: imageRect?.height,
      imageSrc: image?.getAttribute("src"),
      narrativeParagraphs:
        place?.querySelectorAll(
          ".place-section__copy p:not(.place-section__eyebrow)"
        ).length ?? 0,
      intro:
        place?.querySelector(".place-section__intro")?.textContent?.trim() ??
        "",
      factCount:
        place?.querySelectorAll(".place-section__fact").length ?? 0
    };
  });

  expect(landscapeState.imageSrc).toBe(portraitState.imageSrc);
  expect(landscapeState.gridTemplateColumns).not.toBe("1fr");
  expect(Number(landscapeState.imageHeight)).toBeGreaterThan(500);
  expect(landscapeState.narrativeParagraphs).toBe(1);
  expect(landscapeState.intro).toContain("fresh hillside air");
  expect(landscapeState.factCount).toBe(3);

  await page.setViewportSize({ width: 821, height: 1180 });
  await page.reload();

  const breakpointState = await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("#place");
    const image = section?.querySelector<HTMLElement>(".place-section__image");
    const sectionStyles = section ? window.getComputedStyle(section) : null;
    const sectionBounds = section?.getBoundingClientRect();
    const imageBounds = image?.getBoundingClientRect();

    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      gridTemplateColumns: sectionStyles?.gridTemplateColumns ?? "",
      sectionHeight: sectionBounds?.height ?? 0,
      imageHeight: imageBounds?.height ?? 0
    };
  });

  expect(breakpointState.scrollWidth).toBeLessThanOrEqual(
    breakpointState.innerWidth
  );
  expect(breakpointState.gridTemplateColumns.split(" ")).toHaveLength(2);
  expect(breakpointState.sectionHeight).toBeGreaterThanOrEqual(520);
  expect(breakpointState.imageHeight).toBe(breakpointState.sectionHeight);
});

test("Task 10.1 Place portrait is one composed, readable viewport", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 820, height: 1180 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile site sections" })
      .getByRole("link", { name: "Place", exact: true })
      .click();
    await expect(page).toHaveURL(/#place$/);
    await expect
      .poll(() =>
        page
          .locator("#place")
          .evaluate((section) => section.getBoundingClientRect().top)
      )
      .toBeLessThanOrEqual(1);
    await expect
      .poll(() =>
        page
          .locator(".site-header")
          .getAttribute("data-scrolled")
      )
      .toBe("true");

    const state = await page.evaluate(() => {
      const section = document.querySelector<HTMLElement>("#place");
      const copy = section?.querySelector<HTMLElement>(".place-section__copy");
      const eyebrow = section?.querySelector<HTMLElement>(
        ".place-section__eyebrow"
      );
      const title = section?.querySelector<HTMLElement>(
        ".place-section__title"
      );
      const imageFrame = section?.querySelector<HTMLElement>(
        ".place-section__image"
      );
      const image = imageFrame?.querySelector<HTMLImageElement>("img");
      const header = document.querySelector<HTMLElement>(".site-header");
      const facts = Array.from(
        section?.querySelectorAll<HTMLElement>(".place-section__fact") ?? []
      );
      const labels = Array.from(
        section?.querySelectorAll<HTMLElement>(".place-section__fact dt") ?? []
      );
      const values = Array.from(
        section?.querySelectorAll<HTMLElement>(".place-section__fact dd") ?? []
      );
      const sectionBounds = section?.getBoundingClientRect();
      const copyBounds = copy?.getBoundingClientRect();
      const eyebrowBounds = eyebrow?.getBoundingClientRect();
      const imageBounds = imageFrame?.getBoundingClientRect();
      const headerBounds = header?.getBoundingClientRect();
      const botanical = copy
        ? window.getComputedStyle(copy, "::before")
        : null;
      const visibleHeaderControls = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".site-header .brand-link, .site-header .header-whatsapp, .mobile-menu-toggle"
        )
      ).filter((control) => {
        const styles = window.getComputedStyle(control);

        return (
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          Number.parseFloat(styles.opacity) > 0.01
        );
      });
      const textBounds = (element: Element | null) => {
        if (!element) {
          return [];
        }

        const range = document.createRange();
        range.selectNodeContents(element);

        return Array.from(range.getClientRects());
      };
      const leadBounds = [
        ...textBounds(eyebrow),
        ...textBounds(title)
      ];
      const leadOverlapsHeaderControl = visibleHeaderControls.some((control) => {
        const controlBounds = control.getBoundingClientRect();

        return leadBounds.some(
          (bounds) =>
            bounds.left < controlBounds.right &&
            bounds.right > controlBounds.left &&
            bounds.top < controlBounds.bottom &&
            bounds.bottom > controlBounds.top
        );
      });
      const visibleHeaderControlBounds = visibleHeaderControls.map((control) => {
        const bounds = control.getBoundingClientRect();

        return {
          className: control.className,
          top: bounds.top,
          right: bounds.right,
          bottom: bounds.bottom,
          left: bounds.left
        };
      });

      return {
        innerHeight: window.innerHeight,
        sectionHeight: sectionBounds?.height ?? 0,
        sectionTop: sectionBounds?.top ?? null,
        sectionScrollHeight: section?.scrollHeight ?? 0,
        copyBottom: copyBounds?.bottom ?? 0,
        eyebrowTop: eyebrowBounds?.top ?? 0,
        headerBottom: headerBounds?.bottom ?? 0,
        leadOverlapsHeaderControl,
        visibleHeaderControlBounds,
        imageTop: imageBounds?.top ?? 0,
        imageBottom: imageBounds?.bottom ?? 0,
        imageHeight: imageBounds?.height ?? 0,
        imageSrc: image?.getAttribute("src") ?? "",
        narrativeParagraphs:
          copy?.querySelectorAll(
            "p:not(.place-section__eyebrow)"
          ).length ?? 0,
        factCount: facts.length,
        factGridColumns: section
          ? window.getComputedStyle(
              section.querySelector<HTMLElement>(".place-section__facts")!
            ).gridTemplateColumns
          : "",
        smallestLabel: Math.min(
          ...labels.map((label) =>
            Number.parseFloat(window.getComputedStyle(label).fontSize)
          )
        ),
        smallestValue: Math.min(
          ...values.map((value) =>
            Number.parseFloat(window.getComputedStyle(value).fontSize)
          )
        ),
        botanicalContent: botanical?.content ?? "none",
        botanicalImage: botanical?.backgroundImage ?? "none",
        botanicalOpacity: Number.parseFloat(botanical?.opacity ?? "1")
      };
    });

    expect(Math.abs(state.sectionHeight - state.innerHeight)).toBeLessThanOrEqual(
      1
    );
    expect(Math.abs(Number(state.sectionTop))).toBeLessThanOrEqual(1);
    expect(state.sectionScrollHeight).toBeLessThanOrEqual(state.innerHeight + 1);
    expect(state.eyebrowTop).toBeGreaterThanOrEqual(64);
    if (viewport.width > 600) {
      expect(state.eyebrowTop).toBeGreaterThanOrEqual(state.headerBottom + 12);
    }
    expect(
      state.leadOverlapsHeaderControl,
      JSON.stringify(state.visibleHeaderControlBounds)
    ).toBe(false);
    expect(state.copyBottom).toBeLessThanOrEqual(state.imageBottom);
    expect(state.imageTop).toBeGreaterThan(0);
    expect(state.imageBottom).toBeLessThanOrEqual(state.innerHeight + 1);
    expect(state.imageHeight / state.innerHeight).toBeGreaterThanOrEqual(0.28);
    expect(state.imageHeight / state.innerHeight).toBeLessThanOrEqual(0.36);
    expect(state.imageSrc).toContain("anvelia-place-hillside-setting");
    expect(state.narrativeParagraphs).toBe(1);
    expect(state.factCount).toBe(3);
    expect(state.factGridColumns.split(" ")).toHaveLength(3);
    expect(state.smallestLabel).toBeGreaterThanOrEqual(10);
    expect(state.smallestValue).toBeGreaterThanOrEqual(12);
    expect(state.botanicalContent).toBe('""');
    expect(state.botanicalImage).toContain("anvelia-botanical-background-light");
    expect(state.botanicalOpacity).toBeGreaterThan(0);
    expect(state.botanicalOpacity).toBeLessThanOrEqual(0.12);
  }
});

test("Task 8 Cabins and Open-Air sections load with distinct Option 2 rhythms", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.querySelector("#cabins")?.scrollIntoView());
  await page.waitForFunction(() => {
    const cabinImage = document.querySelector<HTMLImageElement>(
      ".cabins-section__image img"
    );

    return Boolean(cabinImage?.complete) && Number(cabinImage?.naturalWidth) > 0;
  });
  await page.evaluate(() =>
    document.querySelector("#open-air-living")?.scrollIntoView()
  );
  await page.waitForFunction(() => {
    const openAirImage = document.querySelector<HTMLImageElement>(
      ".open-air-section__image img"
    );

    return (
      Boolean(openAirImage?.complete) && Number(openAirImage?.naturalWidth) > 0
    );
  });

  const sectionState = await page.evaluate(() => {
    const ids = [
      "place",
      "cabins",
      "open-air-living",
      "gatherings",
      "visit"
    ];
    const sections = ids.map((id) => {
      const element = document.querySelector(`#${id}`);
      const rect = element?.getBoundingClientRect();

      return {
        id,
        top: rect ? rect.top + window.scrollY : null,
        tag: element?.tagName.toLowerCase(),
        heading: element?.querySelector("h2")?.textContent?.trim()
      };
    });
    const cabinImage = document.querySelector<HTMLImageElement>(
      ".cabins-section__image img"
    );
    const openAirImage = document.querySelector<HTMLImageElement>(
      ".open-air-section__image img"
    );
    const cabinSection = document.querySelector(".cabins-section");
    const cabinPanel = document.querySelector(".cabins-section__panel");
    const cabinTitle = document.querySelector("#cabins-title");
    const cabinIntro = document.querySelector(".cabins-section__intro");
    const cabinMarker = document.querySelector(".cabins-section__marker");
    const openAirSection = document.querySelector(".open-air-section");
    const openAirCopy = document.querySelector(".open-air-section__copy");
    const openAirImageFrame = document.querySelector(".open-air-section__image");

    return {
      sections,
      cabinImageLoaded:
        Boolean(cabinImage?.complete) && Number(cabinImage?.naturalWidth) > 0,
      cabinImageSrc: cabinImage?.getAttribute("src"),
      cabinObjectPosition: cabinImage
        ? window.getComputedStyle(cabinImage).objectPosition
        : null,
      openAirImageLoaded:
        Boolean(openAirImage?.complete) &&
        Number(openAirImage?.naturalWidth) > 0,
      openAirImageSrc: openAirImage?.getAttribute("src"),
      openAirObjectPosition: openAirImage
        ? window.getComputedStyle(openAirImage).objectPosition
        : null,
      cabinGrid: cabinSection
        ? window.getComputedStyle(cabinSection).gridTemplateColumns
        : null,
      cabinBackground: cabinSection
        ? window.getComputedStyle(cabinSection).backgroundImage
        : null,
      cabinPanelBackground: cabinPanel
        ? window.getComputedStyle(cabinPanel).backgroundImage
        : null,
      cabinPanelLeft: Math.round(
        cabinPanel?.getBoundingClientRect().left ?? 0
      ),
      cabinTitleSize: cabinTitle
        ? window.getComputedStyle(cabinTitle).fontSize
        : null,
      cabinIntroWeight: cabinIntro
        ? window.getComputedStyle(cabinIntro).fontWeight
        : null,
      cabinMarkerText: cabinMarker?.textContent?.trim(),
      cabinMarkerHref:
        cabinMarker instanceof HTMLAnchorElement
          ? cabinMarker.getAttribute("href")
          : null,
      cabinImageFrames: document.querySelectorAll(".cabins-section__image")
        .length,
      cabinLineworkImages: document.querySelectorAll(".cabins-section__linework")
        .length,
      cabinDetailRows: document.querySelectorAll(".cabins-section__detail")
        .length,
      openAirGrid: openAirSection
        ? window.getComputedStyle(openAirSection).gridTemplateColumns
        : null,
      openAirCopyBackground: openAirCopy
        ? window.getComputedStyle(openAirCopy).backgroundImage
        : null,
      openAirSectionWidth: openAirSection?.getBoundingClientRect().width ?? 0,
      openAirCopyWidth: openAirCopy?.getBoundingClientRect().width ?? 0,
      openAirImageWidth: openAirImageFrame?.getBoundingClientRect().width ?? 0,
      openAirParagraphs: document.querySelectorAll("#open-air-living p").length,
      openAirDetails: document.querySelectorAll(".open-air-section__detail").length,
      openAirClosingRule: openAirCopy
        ? window.getComputedStyle(openAirCopy, "::after").content
        : null,
      cabinLinks: document.querySelectorAll("#cabins a").length,
      openAirLinks: document.querySelectorAll("#open-air-living a").length,
      openAirLinkText: document
        .querySelector("#open-air-living a")
        ?.textContent?.trim(),
      openAirLinkHref: document
        .querySelector("#open-air-living a")
        ?.getAttribute("href"),
      duplicateIds: ids.filter(
        (id) => document.querySelectorAll(`#${id}`).length !== 1
      )
    };
  });

  expect(sectionState.sections.map((section) => section.id)).toEqual([
    "place",
    "cabins",
    "open-air-living",
    "gatherings",
    "visit"
  ]);
  expect(sectionState.sections.map((section) => section.tag)).toEqual([
    "section",
    "section",
    "section",
    "section",
    "section"
  ]);
  expect(sectionState.sections[1].heading).toBe("Cabins in nature's embrace");
  expect(sectionState.sections[2].heading).toBe(
    "Living with the hillside"
  );
  expect(sectionState.sections[0].top).toBeLessThan(
    Number(sectionState.sections[1].top)
  );
  expect(sectionState.sections[1].top).toBeLessThan(
    Number(sectionState.sections[2].top)
  );
  expect(sectionState.cabinImageLoaded).toBe(true);
  expect(sectionState.cabinImageSrc).toContain(
    "anvelia-cabin-calm-stay-concept"
  );
  expect(sectionState.cabinObjectPosition).toBe("72% 52%");
  expect(sectionState.openAirImageLoaded).toBe(true);
  expect(sectionState.openAirImageSrc).toContain(
    "anvelia-open-air-living-veranda-concept"
  );
  expect(sectionState.openAirObjectPosition).toBe("48% 52%");
  expect(
    sectionState.openAirCopyWidth / sectionState.openAirSectionWidth
  ).toBeGreaterThan(0.36);
  expect(
    sectionState.openAirCopyWidth / sectionState.openAirSectionWidth
  ).toBeLessThan(0.4);
  expect(
    sectionState.openAirImageWidth / sectionState.openAirSectionWidth
  ).toBeGreaterThan(0.6);
  expect(
    sectionState.openAirImageWidth / sectionState.openAirSectionWidth
  ).toBeLessThan(0.64);
  expect(sectionState.openAirParagraphs).toBe(2);
  expect(sectionState.openAirDetails).toBe(0);
  expect(sectionState.openAirClosingRule).toBe("none");
  expect(sectionState.cabinGrid).not.toBe(sectionState.openAirGrid);
  expect(sectionState.cabinBackground).toContain("linear-gradient");
  expect(sectionState.cabinPanelBackground).toContain("radial-gradient");
  expect(Number(sectionState.cabinPanelLeft)).toBeGreaterThan(520);
  expect(Number.parseFloat(String(sectionState.cabinTitleSize))).toBeGreaterThan(
    56
  );
  expect(Number(sectionState.cabinIntroWeight)).toBe(400);
  expect(sectionState.cabinMarkerText).toBe("Cabin stays");
  expect(sectionState.cabinMarkerHref).toBeNull();
  expect(sectionState.cabinImageFrames).toBe(1);
  expect(sectionState.cabinLineworkImages).toBe(0);
  expect(sectionState.cabinDetailRows).toBe(0);
  expect(sectionState.openAirCopyBackground).toContain("linear-gradient");
  expect(sectionState.cabinLinks).toBe(0);
  expect(sectionState.openAirLinks).toBe(1);
  expect(sectionState.openAirLinkText).toBe("See activities");
  expect(sectionState.openAirLinkHref).toBe("/activities/");
  expect(sectionState.duplicateIds).toEqual([]);
});

test("Task 8 sections remain responsive and keep mobile crops intentional", async ({
  page
}) => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 808, height: 1077 },
    { width: 1280, height: 900 },
    { width: 1440, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const cabinImage = page.locator(
      ".cabins-section__image > img:not(.cabins-section__image-botanical)"
    );
    const openAirImage = page.locator(".open-air-section__image img");

    await cabinImage.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        cabinImage.evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0
        )
      )
      .toBe(true);
    await openAirImage.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        openAirImage.evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0
        )
      )
      .toBe(true);

    const responsiveState = await page.evaluate(() => {
      const cabinImage = document.querySelector<HTMLImageElement>(
        ".cabins-section__image img"
      );
      const openAirImage = document.querySelector<HTMLImageElement>(
        ".open-air-section__image img"
      );
      const cabinSectionRect = document
        .querySelector(".cabins-section")
        ?.getBoundingClientRect();
      const openAirSectionRect = document
        .querySelector(".open-air-section")
        ?.getBoundingClientRect();
      const cabinMarkerRect = document
        .querySelector(".cabins-section__marker")
        ?.getBoundingClientRect();
      const openAirBodyRect = document
        .querySelector(".open-air-section__body-copy")
        ?.getBoundingClientRect();

      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        cabinSectionHeight: cabinSectionRect?.height ?? 0,
        cabinSectionBottom: cabinSectionRect?.bottom ?? 0,
        cabinMarkerBottom: cabinMarkerRect?.bottom ?? 0,
        openAirSectionHeight: openAirSectionRect?.height ?? 0,
        openAirSectionBottom: openAirSectionRect?.bottom ?? 0,
        openAirBodyBottom: openAirBodyRect?.bottom ?? 0,
        cabinImageLoaded:
          Boolean(cabinImage?.complete) && Number(cabinImage?.naturalWidth) > 0,
        cabinImageHeight:
          document
            .querySelector(".cabins-section__image")
            ?.getBoundingClientRect().height ?? 0,
        cabinObjectPosition: cabinImage
          ? window.getComputedStyle(cabinImage).objectPosition
          : null,
        openAirImageHeight:
          document
            .querySelector(".open-air-section__image")
            ?.getBoundingClientRect().height ?? 0,
        openAirObjectPosition: openAirImage
          ? window.getComputedStyle(openAirImage).objectPosition
          : null,
        cabinTitleVisible:
          Number(
            document
              .querySelector("#cabins-title")
              ?.getBoundingClientRect().height
          ) > 0,
        openAirTitleVisible:
          Number(
            document
              .querySelector("#open-air-living-title")
              ?.getBoundingClientRect().height
          ) > 0,
        openAirImageDocumentTop:
          (document
            .querySelector(".open-air-section__image")
            ?.getBoundingClientRect().top ?? 0) + window.scrollY,
        openAirCopyDocumentTop:
          (document
            .querySelector(".open-air-section__copy")
            ?.getBoundingClientRect().top ?? 0) + window.scrollY
      };
    });

    expect(responsiveState.scrollWidth).toBeLessThanOrEqual(
      responsiveState.innerWidth
    );
    expect(responsiveState.cabinImageLoaded).toBe(true);
    expect(responsiveState.cabinTitleVisible).toBe(true);
    expect(responsiveState.openAirTitleVisible).toBe(true);

    if (viewport.width <= 820 && viewport.height > viewport.width) {
      expect(responsiveState.cabinSectionHeight).toBeGreaterThanOrEqual(
        responsiveState.innerHeight - 1
      );
      expect(responsiveState.cabinSectionHeight).toBeLessThanOrEqual(
        responsiveState.innerHeight + 2
      );
      expect(responsiveState.openAirSectionHeight).toBeGreaterThanOrEqual(
        responsiveState.innerHeight - 1
      );
      expect(responsiveState.openAirSectionHeight).toBeLessThanOrEqual(
        responsiveState.innerHeight + 2
      );
      expect(responsiveState.cabinImageHeight).toBeGreaterThan(
        responsiveState.innerHeight * 0.32
      );
      expect(responsiveState.cabinImageHeight).toBeLessThan(
        responsiveState.innerHeight * 0.36
      );
      expect(responsiveState.openAirImageHeight).toBeGreaterThan(
        responsiveState.innerHeight * 0.4
      );
      expect(responsiveState.openAirImageHeight).toBeLessThan(
        responsiveState.innerHeight * 0.44
      );
      expect(responsiveState.cabinMarkerBottom).toBeLessThanOrEqual(
        responsiveState.cabinSectionBottom - 18
      );
      expect(responsiveState.openAirBodyBottom).toBeLessThanOrEqual(
        responsiveState.openAirSectionBottom - 18
      );
    } else {
      expect(responsiveState.cabinSectionHeight).toBeGreaterThan(600);
      expect(responsiveState.cabinImageHeight).toBeGreaterThan(320);
      expect(responsiveState.openAirImageHeight).toBeGreaterThan(320);
    }

    if (viewport.width <= 820) {
      expect(responsiveState.cabinObjectPosition).toBe(
        viewport.height > viewport.width ? "84% 54%" : "76% 50%"
      );
      expect(responsiveState.openAirObjectPosition).toBe("46% 54%");
    }

    if (viewport.width <= 600) {
      expect(responsiveState.openAirImageDocumentTop).toBeGreaterThan(
        responsiveState.openAirCopyDocumentTop
      );
    }
  }
});

test("Task 8 desktop nav jump to Cabins leaves the title clear of the fixed header", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Site sections" })
    .getByRole("link", { name: "Cabins" })
    .click();
  await page.waitForTimeout(260);

  const anchorState = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const title = document.querySelector("#cabins-title");
    const headerRect = header?.getBoundingClientRect();
    const titleRect = title?.getBoundingClientRect();

    return {
      headerBottom: Math.round(headerRect?.bottom ?? 0),
      titleTop: Math.round(titleRect?.top ?? 0),
      hash: window.location.hash
    };
  });

  expect(anchorState.hash).toBe("#cabins");
  expect(anchorState.titleTop).toBeGreaterThan(anchorState.headerBottom + 24);
});

test("Task 9.2 Gatherings is responsive, semantic, and clears the fixed header", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });
  await desktopNav.getByRole("link", { name: "Gatherings" }).click();
  await page.waitForTimeout(260);

  const gatherings = page.locator("#gatherings");
  const image = gatherings.locator(".gatherings-section__image img");
  const material = gatherings.locator(".gatherings-section__material");

  await expect(
    gatherings.getByRole("heading", { level: 2, name: "A quieter way to gather" })
  ).toBeVisible();
  await expect(gatherings.getByRole("listitem")).toHaveText([
    "Private dinners",
    "Small corporate retreats",
    "Wellness retreats"
  ]);
  await expect(gatherings.locator("a, button, form")).toHaveCount(0);
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("decoding", "async");
  await expect(image).toHaveAttribute("srcset", /640w.*1024w.*1536w/);
  await expect(image).toHaveAttribute("sizes");
  await expect(material).toHaveAttribute("alt", "");
  await expect(material).toHaveAttribute("aria-hidden", "true");
  await expect(material).toHaveAttribute("loading", "lazy");
  await expect(material).toHaveAttribute("srcset", /640w.*1024w/);
  await expect
    .poll(() =>
      image.evaluate(
        (element) =>
          (element as HTMLImageElement).complete &&
          (element as HTMLImageElement).naturalWidth > 0
      )
    )
    .toBe(true);
  await expect
    .poll(() =>
      material.evaluate(
        (element) =>
          (element as HTMLImageElement).complete &&
          (element as HTMLImageElement).naturalWidth > 0
      )
    )
    .toBe(true);

  const desktopState = await page.evaluate(() => {
    const section = document.querySelector("#gatherings");
    const imageFrame = section?.querySelector(".gatherings-section__image");
    const panel = section?.querySelector(".gatherings-section__panel");
    const material = section?.querySelector(".gatherings-section__material");
    const title = document.querySelector("#gatherings-title");
    const header = document.querySelector(".site-header");
    const sectionStyles = section ? window.getComputedStyle(section) : null;
    const imageRect = imageFrame?.getBoundingClientRect();
    const panelRect = panel?.getBoundingClientRect();
    const materialRect = material?.getBoundingClientRect();
    const materialStyles = material ? window.getComputedStyle(material) : null;
    const panelOverlay = panel
      ? window.getComputedStyle(panel, "::before")
      : null;

    return {
      hash: window.location.hash,
      columns: sectionStyles?.gridTemplateColumns,
      imageLeft: imageRect?.left,
      panelLeft: panelRect?.left,
      imageShare:
        imageRect && panelRect ? imageRect.width / (imageRect.width + panelRect.width) : 0,
      materialFillsPanel:
        materialRect && panelRect
          ? Math.abs(materialRect.left - panelRect.left) <= 1 &&
            Math.abs(materialRect.top - panelRect.top) <= 1 &&
            Math.abs(materialRect.right - panelRect.right) <= 1 &&
            Math.abs(materialRect.bottom - panelRect.bottom) <= 1
          : false,
      materialObjectPosition: materialStyles?.objectPosition,
      materialOpacity: materialStyles?.opacity,
      materialPointerEvents: materialStyles?.pointerEvents,
      panelOverlay: panelOverlay?.backgroundImage,
      titleTop: title?.getBoundingClientRect().top,
      headerBottom: header?.getBoundingClientRect().bottom,
      scrollMarginTop: sectionStyles?.scrollMarginTop
    };
  });

  expect(desktopState.hash).toBe("#gatherings");
  expect(desktopState.columns).not.toBe("1fr");
  expect(Number(desktopState.imageLeft)).toBeLessThan(Number(desktopState.panelLeft));
  expect(desktopState.imageShare).toBeGreaterThan(0.55);
  expect(desktopState.imageShare).toBeLessThan(0.61);
  expect(desktopState.materialFillsPanel).toBe(true);
  expect(desktopState.materialObjectPosition).toBe("82% 60%");
  expect(Number(desktopState.materialOpacity)).toBeGreaterThan(0.65);
  expect(Number(desktopState.materialOpacity)).toBeLessThan(0.8);
  expect(desktopState.materialPointerEvents).toBe("none");
  expect(desktopState.panelOverlay).toContain("radial-gradient");
  expect(Number(desktopState.titleTop)).toBeGreaterThan(
    Number(desktopState.headerBottom) + 24
  );
  expect(parseFloat(desktopState.scrollMarginTop ?? "0")).toBe(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#gatherings");

  const portraitState = await page.evaluate(() => {
    const section = document.querySelector("#gatherings");
    const imageFrame = section?.querySelector(".gatherings-section__image");
    const panel = section?.querySelector(".gatherings-section__panel");
    const material = section?.querySelector(".gatherings-section__material");
    const image = imageFrame?.querySelector("img");
    const imageRect = imageFrame?.getBoundingClientRect();
    const panelRect = panel?.getBoundingClientRect();
    const imageStyles = image ? window.getComputedStyle(image) : null;
    const materialStyles = material ? window.getComputedStyle(material) : null;

    return {
      scrollWidth: document.documentElement.scrollWidth,
      imageTop: imageRect?.top,
      panelTop: panelRect?.top,
      imageHeight: imageRect?.height,
      objectFit: imageStyles?.objectFit,
      objectPosition: imageStyles?.objectPosition,
      materialObjectPosition: materialStyles?.objectPosition
    };
  });

  expect(portraitState.scrollWidth).toBeLessThanOrEqual(390);
  expect(Number(portraitState.imageTop)).toBeLessThan(Number(portraitState.panelTop));
  expect(Number(portraitState.imageHeight)).toBeGreaterThan(280);
  expect(portraitState.objectFit).toBe("cover");
  expect(portraitState.objectPosition).toBe("50% 54%");
  expect(portraitState.materialObjectPosition).toBe("78% 62%");
});

test("Task 10.1 Gatherings keeps every occasion inside the smallest portrait chapter", async ({
  page
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");

  const gatherings = page.locator("#gatherings");
  const occasions = gatherings.locator(".gatherings-section__occasions li");

  await expect(gatherings.locator(".gatherings-section__eyebrow")).toBeVisible();
  await expect(
    gatherings.getByRole("heading", {
      level: 2,
      name: "A quieter way to gather"
    })
  ).toBeVisible();
  await expect(occasions).toHaveText([
    "Private dinners",
    "Small corporate retreats",
    "Wellness retreats"
  ]);

  const smallestPortraitState = await gatherings.evaluate((section) => {
    const sectionRect = section.getBoundingClientRect();
    const image = section.querySelector(".gatherings-section__image");
    const panel = section.querySelector(".gatherings-section__panel");
    const eyebrow = section.querySelector(".gatherings-section__eyebrow");
    const title = section.querySelector(".gatherings-section__title");
    const intro = section.querySelector(".gatherings-section__intro");
    const items = Array.from(
      section.querySelectorAll(".gatherings-section__occasions li")
    );
    const imageRect = image?.getBoundingClientRect();
    const panelRect = panel?.getBoundingClientRect();
    const eyebrowRect = eyebrow?.getBoundingClientRect();
    const titleRect = title?.getBoundingClientRect();

    return {
      sectionHeight: sectionRect.height,
      viewportHeight: window.innerHeight,
      imageHeight: imageRect?.height ?? 0,
      imageFirst:
        imageRect && panelRect
          ? imageRect.top >= sectionRect.top - 0.5 &&
            imageRect.bottom <= panelRect.top + 0.5
          : false,
      headingContentContained:
        eyebrowRect && titleRect && panelRect
          ? eyebrowRect.width > 0 &&
            eyebrowRect.height > 0 &&
            eyebrowRect.top >= panelRect.top - 0.5 &&
            titleRect.width > 0 &&
            titleRect.height > 0 &&
            titleRect.top >= panelRect.top - 0.5 &&
            titleRect.bottom <= panelRect.bottom + 0.5
          : false,
      titleFontSize: title
        ? parseFloat(window.getComputedStyle(title).fontSize)
        : 0,
      allOccasionsContained: items.every((item) => {
        const itemRect = item.getBoundingClientRect();

        return (
          itemRect.top >= sectionRect.top &&
          itemRect.bottom <= sectionRect.bottom + 0.5
        );
      }),
      introFontSize: intro
        ? parseFloat(window.getComputedStyle(intro).fontSize)
        : 0,
      occasionFontSizes: items.map((item) =>
        parseFloat(window.getComputedStyle(item).fontSize)
      )
    };
  });

  expect(
    Math.abs(
      smallestPortraitState.sectionHeight -
        smallestPortraitState.viewportHeight
    )
  ).toBeLessThanOrEqual(1);
  expect(smallestPortraitState.imageHeight).toBeGreaterThanOrEqual(180);
  expect(smallestPortraitState.imageFirst).toBe(true);
  expect(smallestPortraitState.headingContentContained).toBe(true);
  expect(smallestPortraitState.titleFontSize).toBeGreaterThanOrEqual(45);
  expect(smallestPortraitState.allOccasionsContained).toBe(true);
  expect(smallestPortraitState.introFontSize).toBeGreaterThanOrEqual(14);
  expect(
    smallestPortraitState.occasionFontSizes.every((size) => size >= 13.5)
  ).toBe(true);
});

test("Task 10.1 practical type, editorial rules, and header controls stay optically coherent", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 568, height: 320 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 }
  ];
  const practicalSelectors = [
    ".hero-subtitle",
    ".hero-lede",
    ".hero-detail",
    ".place-section__intro",
    ".place-section__fact dd",
    ".cabins-section__intro",
    ".open-air-section__intro",
    ".gatherings-section__intro",
    ".gatherings-section__occasions",
    ".visit-section__intro",
    ".visit-section__address",
    ".visit-section__number",
    ".mobile-nav-panel__address"
  ];
  const restrainedSelectors = [
    ".place-section__eyebrow",
    ".place-section__fact dt",
    ".cabins-section__eyebrow",
    ".cabins-section__marker",
    ".open-air-section__passage",
    ".visit-section__whatsapp",
    ".visit-section__endnote",
    ".header-whatsapp",
    ".mobile-nav__whatsapp"
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const state = await page.evaluate(
      ({ practical, restrained }) => {
        const fontSize = (selector: string) => {
          const element = document.querySelector(selector);

          return element
            ? Number.parseFloat(window.getComputedStyle(element).fontSize)
            : 0;
        };
        const centerY = (rect: DOMRect) => (rect.top + rect.bottom) / 2;
        const marker = document.querySelector(".cabins-section__marker");
        const markerLabel = marker?.querySelector("span:first-child");
        const markerRule = marker?.querySelector(
          ".cabins-section__marker-rule"
        );
        const markerLabelRange = document.createRange();

        if (markerLabel) {
          markerLabelRange.selectNodeContents(markerLabel);
        }

        const markerLabelRect = markerLabel
          ? markerLabelRange.getBoundingClientRect()
          : undefined;
        const markerRuleRect = markerRule?.getBoundingClientRect();
        const passage = document.querySelector(
          ".open-air-section__passage"
        );
        const passageStyles = passage
          ? window.getComputedStyle(passage)
          : undefined;
        const passageRule = passage
          ? window.getComputedStyle(passage, "::after")
          : undefined;
        const visitAction = document.querySelector(
          ".visit-section__whatsapp"
        );
        const visitRule = visitAction
          ? window.getComputedStyle(visitAction, "::before")
          : undefined;
        const visitPractical = document.querySelector(
          ".visit-section__practical"
        );
        const visitNumber = document.querySelector(".visit-section__number");
        const visitEndnote = document.querySelector(
          ".visit-section__endnote"
        );
        const textRect = (element: Element | null) => {
          if (!element) {
            return undefined;
          }

          const range = document.createRange();
          range.selectNodeContents(element);

          return range.getBoundingClientRect();
        };
        const visitNumberRect = textRect(visitNumber);
        const visitEndnoteRect = textRect(visitEndnote);
        const visitEndnoteBox = visitEndnote?.getBoundingClientRect();
        const visitPracticalRect = visitPractical?.getBoundingClientRect();
        const headerControls = Array.from(
          document.querySelectorAll(
            ".site-header .brand-link, .site-header .primary-nav--desktop, .site-header > .header-whatsapp, .site-header .mobile-menu-toggle"
          )
        )
          .filter((element) => {
            const styles = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return (
              styles.display !== "none" &&
              styles.visibility !== "hidden" &&
              Number.parseFloat(styles.opacity) > 0 &&
              rect.width > 0 &&
              rect.height > 0
            );
          })
          .map((element) => centerY(element.getBoundingClientRect()));

        return {
          practical: practical.map((selector) => ({
            selector,
            size: fontSize(selector)
          })),
          restrained: restrained.map((selector) => ({
            selector,
            size: fontSize(selector)
          })),
          markerGap:
            markerLabelRect && markerRuleRect
              ? markerRuleRect.left - markerLabelRect.right
              : Number.POSITIVE_INFINITY,
          markerCenterDelta:
            markerLabelRect && markerRuleRect
              ? Math.abs(centerY(markerRuleRect) - centerY(markerLabelRect))
              : Number.POSITIVE_INFINITY,
          passageGap: Number.parseFloat(
            passageStyles?.columnGap || passageStyles?.gap || "0"
          ),
          passageRuleWidth: Number.parseFloat(passageRule?.width ?? "0"),
          passageRuleHeight: Number.parseFloat(passageRule?.height ?? "0"),
          visitRuleWidth: Number.parseFloat(visitRule?.width ?? "0"),
          visitRuleBorder: Number.parseFloat(
            visitRule?.borderTopWidth ?? "0"
          ),
          visitRuleGap: Number.parseFloat(
            visitAction
              ? window.getComputedStyle(visitAction).columnGap ||
                  window.getComputedStyle(visitAction).gap
              : "0"
          ),
          visitRuleMarginLeft: Number.parseFloat(
            visitRule?.marginLeft ?? "0"
          ),
          visitRuleMarginRight: Number.parseFloat(
            visitRule?.marginRight ?? "0"
          ),
          visitFooterLeftDelta:
            visitPracticalRect && visitEndnoteBox
              ? Math.abs(visitPracticalRect.left - visitEndnoteBox.left)
              : Number.POSITIVE_INFINITY,
          visitFooterBaselineDelta:
            visitNumberRect && visitEndnoteRect
              ? Math.abs(visitNumberRect.bottom - visitEndnoteRect.bottom)
              : Number.POSITIVE_INFINITY,
          orientation:
            window.innerWidth > window.innerHeight
              ? "landscape"
              : "portrait",
          headerCenterSpread:
            headerControls.length > 1
              ? Math.max(...headerControls) - Math.min(...headerControls)
              : 0
        };
      },
      {
        practical: practicalSelectors,
        restrained: restrainedSelectors
      }
    );

    for (const text of state.practical) {
      expect(
        text.size,
        `${text.selector} keeps a 12px practical floor at ${viewport.width}x${viewport.height}`
      ).toBeGreaterThanOrEqual(12);
    }

    for (const text of state.restrained) {
      expect(
        text.size,
        `${text.selector} keeps a restrained readable floor at ${viewport.width}x${viewport.height}`
      ).toBeGreaterThanOrEqual(10.5);
    }

    expect(state.markerGap).toBeGreaterThanOrEqual(8);
    expect(state.markerGap).toBeLessThanOrEqual(18.5);
    expect(state.markerCenterDelta).toBeLessThanOrEqual(1);
    expect(state.passageGap).toBeGreaterThanOrEqual(8);
    expect(state.passageGap).toBeLessThanOrEqual(18.5);
    expect(state.passageRuleWidth).toBeGreaterThanOrEqual(34);
    expect(state.passageRuleHeight).toBe(1);
    expect(state.visitRuleWidth).toBeGreaterThanOrEqual(34);
    expect(state.visitRuleBorder).toBe(1);
    expect(state.visitRuleGap).toBe(0);
    expect(state.visitRuleMarginLeft).toBeGreaterThanOrEqual(8);
    expect(state.visitRuleMarginLeft).toBeLessThanOrEqual(18.5);
    expect(state.visitRuleMarginRight).toBeGreaterThanOrEqual(8);
    expect(state.visitRuleMarginRight).toBeLessThanOrEqual(10);

    if (state.orientation === "portrait") {
      expect(
        state.visitFooterLeftDelta,
        `Visit footer aligns left at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(0.5);
    } else {
      expect(
        state.visitFooterBaselineDelta,
        `Visit footer shares its baseline at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(2);
    }

    expect(state.headerCenterSpread).toBeLessThanOrEqual(0.5);
  }
});

test("Task 9.2 Gatherings keeps its split in narrow landscape", async ({
  page
}) => {
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto("/#gatherings");

  const gatherings = page.locator("#gatherings");
  const title = gatherings.getByRole("heading", {
    level: 2,
    name: "A quieter way to gather"
  });
  const image = gatherings.locator(".gatherings-section__image img");

  await expect(title).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate(
        (element) =>
          (element as HTMLImageElement).complete &&
          (element as HTMLImageElement).naturalWidth > 0
      )
    )
    .toBe(true);

  const landscapeState = await page.evaluate(() => {
    const section = document.querySelector("#gatherings");
    const imageFrame = section?.querySelector(".gatherings-section__image");
    const panel = section?.querySelector(".gatherings-section__panel");
    const title = section?.querySelector("#gatherings-title");
    const imageRect = imageFrame?.getBoundingClientRect();
    const panelRect = panel?.getBoundingClientRect();
    const titleRect = title?.getBoundingClientRect();
    const titleStyles = title ? window.getComputedStyle(title) : null;

    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      imageLeft: imageRect?.left,
      panelLeft: panelRect?.left,
      imageShare:
        imageRect && panelRect
          ? imageRect.width / (imageRect.width + panelRect.width)
          : 0,
      titleFontSize: titleStyles?.fontSize,
      titleFitsPanel:
        titleRect && panelRect
          ? titleRect.left >= panelRect.left &&
            titleRect.right <= panelRect.right &&
            titleRect.top >= panelRect.top &&
            titleRect.bottom <= panelRect.bottom
          : false
    };
  });

  expect(landscapeState.scrollWidth).toBeLessThanOrEqual(
    landscapeState.innerWidth
  );
  expect(Number(landscapeState.imageLeft)).toBeLessThan(
    Number(landscapeState.panelLeft)
  );
  expect(landscapeState.imageShare).toBeGreaterThan(0.55);
  expect(landscapeState.imageShare).toBeLessThan(0.61);
  expect(parseFloat(landscapeState.titleFontSize ?? "0")).toBeGreaterThanOrEqual(
    36
  );
  expect(landscapeState.titleFitsPanel).toBe(true);
});

test("Task 9.3 Visit and Task 9.4 end note fill one calm chapter", async ({
  page
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const desktopNav = page.getByRole("navigation", { name: "Site sections" });
  await desktopNav.getByRole("link", { name: "Visit" }).click();
  await page.waitForTimeout(260);

  const visit = page.locator("#visit");
  const arrival = visit.locator(".visit-section__image img");
  const paper = visit.locator(".visit-section__paper");
  const endNote = visit.locator(".visit-section__endnote");
  const whatsapp = visit.getByRole("link", {
    name: "Plan your visit with Anvelia Sanctuary on WhatsApp"
  });

  await expect(
    visit.getByRole("heading", { level: 2, name: "Come and see Anvelia" })
  ).toBeVisible();
  await expect(visit.locator(".visit-section__intro")).toHaveText(
    "The doors are open in the quieter hills of Bukit Tinggi, at the foot of Genting Highlands."
  );
  await expect(visit.locator(".visit-section__guidance")).toHaveCount(0);
  await expect(visit.locator(".visit-section__detail-label")).toHaveCount(0);
  await expect(visit.locator("address")).toHaveText(
    "Lot 8421, Kampung Bukit Tinggi, 28750 Bentong, Pahang, Malaysia"
  );
  await expect(visit).toContainText("+60 13-668 3113");
  await expect(whatsapp).toHaveAttribute("href", "https://wa.me/60136683113");
  await expect(whatsapp).toContainText("Plan your visit");
  await expect(visit.locator('a[href="https://wa.me/60136683113"]')).toHaveCount(1);
  await expect(visit.locator("form")).toHaveCount(0);
  await expect(visit.locator('a[href*="maps"], a[href*="goo.gl"]')).toHaveCount(0);
  await expect(page.locator('footer, [role="contentinfo"]')).toHaveCount(0);
  await expect(endNote).toHaveText("© Anvelia Sanctuary");
  await expect(endNote).not.toContainText(/\d{4}/);
  await expect(visit.locator(".visit-section__endnote")).toHaveCount(1);
  await expect(arrival).toHaveAttribute("loading", "lazy");
  await expect(arrival).toHaveAttribute("decoding", "async");
  await expect(arrival).toHaveAttribute("srcset", /640w.*960w.*1280w.*1586w/);
  await expect(arrival).toHaveAttribute("sizes", "100vw");
  await expect(paper).toHaveAttribute("alt", "");
  await expect(paper).toHaveAttribute("aria-hidden", "true");
  await expect(paper).toHaveAttribute("srcset", /640w.*1024w/);
  await expect
    .poll(() =>
      Promise.all(
        [arrival, paper].map((locator) =>
          locator.evaluate(
            (element) =>
              (element as HTMLImageElement).complete &&
              (element as HTMLImageElement).naturalWidth > 0
          )
        )
      ).then((states) => states.every(Boolean))
    )
    .toBe(true);

  const desktopState = await page.evaluate(() => {
    const section = document.querySelector("#visit");
    const panel = section?.querySelector(".visit-section__panel");
    const content = section?.querySelector(".visit-section__content");
    const imageFrame = section?.querySelector(".visit-section__image");
    const image = imageFrame?.querySelector("img");
    const paper = section?.querySelector(".visit-section__paper");
    const title = section?.querySelector("#visit-title");
    const cta = section?.querySelector(".visit-section__whatsapp");
    const practical = section?.querySelector(".visit-section__practical");
    const endNote = section?.querySelector(".visit-section__endnote");
    const header = document.querySelector(".site-header");
    const sectionRect = section?.getBoundingClientRect();
    const panelRect = panel?.getBoundingClientRect();
    const contentRect = content?.getBoundingClientRect();
    const imageRect = imageFrame?.getBoundingClientRect();
    const paperRect = paper?.getBoundingClientRect();
    const sectionStyles = section ? window.getComputedStyle(section) : null;
    const imageStyles = image ? window.getComputedStyle(image) : null;
    const paperStyles = paper ? window.getComputedStyle(paper) : null;

    return {
      hash: window.location.hash,
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sectionTop: sectionRect?.top,
      sectionBottom: sectionRect?.bottom,
      sectionWidth: sectionRect?.width,
      sectionHeight: sectionRect?.height,
      imageTop: imageRect?.top,
      imageLeft: imageRect?.left,
      imageWidth: imageRect?.width,
      imageHeight: imageRect?.height,
      paperLeft: paperRect?.left,
      paperWidthShare:
        paperRect && sectionRect ? paperRect.width / sectionRect.width : 0,
      paperHeight: paperRect?.height,
      panelWidthShare:
        panelRect && sectionRect ? panelRect.width / sectionRect.width : 0,
      contentLeft: contentRect?.left,
      contentRight: contentRect?.right,
      titleTop: title?.getBoundingClientRect().top,
      ctaHeight: cta?.getBoundingClientRect().height,
      practicalBottom: practical?.getBoundingClientRect().bottom,
      endNoteRight: endNote?.getBoundingClientRect().right,
      endNoteBottom: endNote?.getBoundingClientRect().bottom,
      endNotePosition: endNote ? window.getComputedStyle(endNote).position : "",
      headerBottom: header?.getBoundingClientRect().bottom,
      scrollMarginTop: sectionStyles?.scrollMarginTop,
      objectFit: imageStyles?.objectFit,
      transform: imageStyles?.transform,
      maskImage: paperStyles?.maskImage || paperStyles?.webkitMaskImage
    };
  });

  expect(desktopState.hash).toBe("#visit");
  expect(desktopState.scrollWidth).toBeLessThanOrEqual(desktopState.innerWidth);
  expect(Math.abs(Number(desktopState.sectionTop))).toBeLessThanOrEqual(1);
  expect(
    Math.abs(Number(desktopState.sectionHeight) - desktopState.innerHeight)
  ).toBeLessThanOrEqual(1);
  expect(Math.abs(Number(desktopState.imageTop) - Number(desktopState.sectionTop))).toBeLessThanOrEqual(1);
  expect(Math.abs(Number(desktopState.imageLeft))).toBeLessThanOrEqual(1);
  expect(Math.abs(Number(desktopState.imageWidth) - Number(desktopState.sectionWidth))).toBeLessThanOrEqual(1);
  expect(Math.abs(Number(desktopState.imageHeight) - desktopState.innerHeight)).toBeLessThanOrEqual(1);
  expect(Math.abs(Number(desktopState.paperLeft))).toBeLessThanOrEqual(1);
  expect(desktopState.paperWidthShare).toBeGreaterThan(0.54);
  expect(desktopState.paperWidthShare).toBeLessThan(0.68);
  expect(Math.abs(Number(desktopState.paperHeight) - desktopState.innerHeight)).toBeLessThanOrEqual(1);
  expect(desktopState.panelWidthShare).toBeGreaterThan(0.5);
  expect(desktopState.panelWidthShare).toBeLessThan(0.66);
  expect(Number(desktopState.contentLeft)).toBeGreaterThan(64);
  expect(Number(desktopState.contentRight)).toBeLessThan(desktopState.innerWidth * 0.58);
  expect(Number(desktopState.titleTop)).toBeGreaterThan(Number(desktopState.headerBottom) + 54);
  expect(Number(desktopState.ctaHeight)).toBeGreaterThanOrEqual(44);
  expect(Number(desktopState.practicalBottom)).toBeLessThanOrEqual(Number(desktopState.sectionBottom) - 24);
  expect(Number(desktopState.endNoteRight)).toBeGreaterThan(desktopState.innerWidth * 0.8);
  expect(Number(desktopState.endNoteRight)).toBeLessThanOrEqual(desktopState.innerWidth - 30);
  expect(Number(desktopState.endNoteBottom)).toBeLessThanOrEqual(Number(desktopState.sectionBottom) - 18);
  expect(Number(desktopState.endNoteBottom)).toBeGreaterThanOrEqual(Number(desktopState.sectionBottom) - 48);
  expect(desktopState.endNotePosition).toBe("absolute");
  expect(parseFloat(desktopState.scrollMarginTop ?? "0")).toBe(0);
  expect(desktopState.objectFit).toBe("cover");
  expect(desktopState.transform).toBe("none");
  expect(desktopState.maskImage).not.toBe("none");

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 568, height: 320 },
    { width: 600, height: 320 },
    { width: 601, height: 320 },
    { width: 610, height: 320 },
    { width: 620, height: 320 },
    { width: 667, height: 375 },
    { width: 844, height: 390 },
    { width: 834, height: 1194 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.locator("#visit").evaluate((section) =>
      section.scrollIntoView({ block: "start" })
    );

    const compactState = await page.evaluate(() => {
      const section = document.querySelector("#visit");
      const content = section?.querySelector(".visit-section__content");
      const eyebrow = section?.querySelector(".visit-section__eyebrow");
      const title = section?.querySelector("#visit-title");
      const intro = section?.querySelector(".visit-section__intro");
      const cta = section?.querySelector(".visit-section__whatsapp");
      const practical = section?.querySelector(".visit-section__practical");
      const endNote = section?.querySelector(".visit-section__endnote");
      const address = section?.querySelector(".visit-section__address");
      const number = section?.querySelector(".visit-section__number");
      const paper = section?.querySelector(".visit-section__paper");
      const imageFrame = section?.querySelector(".visit-section__image");
      const header = document.querySelector(".site-header");
      const sectionRect = section?.getBoundingClientRect();
      const contentRect = content?.getBoundingClientRect();
      const paperRect = paper?.getBoundingClientRect();
      const imageRect = imageFrame?.getBoundingClientRect();
      const practicalRect = practical?.getBoundingClientRect();
      const endNoteRect = endNote?.getBoundingClientRect();
      const textRect = (element: Element | null | undefined) => {
        if (!element) return undefined;

        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getBoundingClientRect();
      };
      const addressRect = textRect(address);
      const numberRect = textRect(number);

      return {
        sectionTop: sectionRect?.top,
        sectionBottom: sectionRect?.bottom,
        sectionWidth: sectionRect?.width,
        sectionHeight: sectionRect?.height,
        contentTop: contentRect?.top,
        contentBottom: contentRect?.bottom,
        eyebrowTop: eyebrow?.getBoundingClientRect().top,
        titleRight: title?.getBoundingClientRect().right,
        introFontSize: intro ? window.getComputedStyle(intro).fontSize : "0",
        ctaHeight: cta?.getBoundingClientRect().height,
        practicalBottom: practical?.getBoundingClientRect().bottom,
        practicalTop: practicalRect?.top,
        practicalLeft: practicalRect?.left,
        practicalRight: practicalRect?.right,
        addressTop: addressRect?.top,
        addressRight: addressRect?.right,
        addressBottom: addressRect?.bottom,
        addressLeft: addressRect?.left,
        numberTop: numberRect?.top,
        numberRight: numberRect?.right,
        numberBottom: numberRect?.bottom,
        numberLeft: numberRect?.left,
        endNoteLeft: endNote?.getBoundingClientRect().left,
        endNoteRight: endNote?.getBoundingClientRect().right,
        endNoteTop: endNoteRect?.top,
        endNoteBottom: endNote?.getBoundingClientRect().bottom,
        endNoteFontSize: endNote
          ? window.getComputedStyle(endNote).fontSize
          : "0",
        addressFontSize: address ? window.getComputedStyle(address).fontSize : "0",
        numberFontSize: number ? window.getComputedStyle(number).fontSize : "0",
        paperWidth: paperRect?.width,
        paperHeight: paperRect?.height,
        imageWidth: imageRect?.width,
        imageHeight: imageRect?.height,
        headerBottom: header?.getBoundingClientRect().bottom,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      };
    });

    expect(compactState.scrollWidth).toBeLessThanOrEqual(compactState.innerWidth);
    expect(Math.abs(Number(compactState.sectionHeight) - compactState.innerHeight)).toBeLessThanOrEqual(1);
    expect(Number(compactState.contentTop)).toBeGreaterThanOrEqual(Number(compactState.sectionTop) - 1);
    expect(Number(compactState.contentBottom)).toBeLessThanOrEqual(Number(compactState.sectionBottom));
    expect(Number(compactState.titleRight)).toBeLessThanOrEqual(compactState.innerWidth - 16);
    expect(Number(compactState.ctaHeight)).toBeGreaterThanOrEqual(44);
    expect(Number(compactState.practicalBottom)).toBeLessThanOrEqual(Number(compactState.sectionBottom) - 12);
    for (const [label, rect] of [
      ["address", {
        top: compactState.addressTop,
        right: compactState.addressRight,
        bottom: compactState.addressBottom,
        left: compactState.addressLeft
      }],
      ["phone number", {
        top: compactState.numberTop,
        right: compactState.numberRight,
        bottom: compactState.numberBottom,
        left: compactState.numberLeft
      }]
    ] as const) {
      const overlapsEndNote =
        Number(rect.left) < Number(compactState.endNoteRight) &&
        Number(rect.right) > Number(compactState.endNoteLeft) &&
        Number(rect.top) < Number(compactState.endNoteBottom) &&
        Number(rect.bottom) > Number(compactState.endNoteTop);
      expect(
        overlapsEndNote,
        `Visit ${label} overlaps the end note at ${viewport.width}x${viewport.height}: ${JSON.stringify(compactState)}`
      ).toBe(false);
    }
    expect(Number(compactState.endNoteBottom)).toBeLessThanOrEqual(Number(compactState.sectionBottom) - 10);
    expect(Number(compactState.endNoteBottom)).toBeGreaterThanOrEqual(Number(compactState.sectionBottom) - 40);
    expect(parseFloat(compactState.endNoteFontSize)).toBeGreaterThanOrEqual(10.5);
    expect(parseFloat(compactState.introFontSize)).toBeGreaterThanOrEqual(12);
    expect(parseFloat(compactState.addressFontSize)).toBeGreaterThanOrEqual(12);
    expect(parseFloat(compactState.numberFontSize)).toBeGreaterThanOrEqual(12);
    expect(Math.abs(Number(compactState.imageWidth) - Number(compactState.sectionWidth))).toBeLessThanOrEqual(1);
    expect(Math.abs(Number(compactState.imageHeight) - compactState.innerHeight)).toBeLessThanOrEqual(1);

    if (viewport.height > viewport.width && viewport.width <= 820) {
      expect(Number(compactState.endNoteLeft)).toBeGreaterThanOrEqual(18);
      expect(Number(compactState.endNoteLeft)).toBeLessThanOrEqual(28);
      expect(Math.abs(Number(compactState.paperWidth) - Number(compactState.sectionWidth))).toBeLessThanOrEqual(1);
      expect(Number(compactState.paperHeight)).toBeGreaterThan(compactState.innerHeight * 0.62);
      expect(Number(compactState.paperHeight)).toBeLessThan(compactState.innerHeight * 0.86);
    } else {
      expect(Number(compactState.endNoteRight)).toBeGreaterThan(compactState.innerWidth * 0.7);
      expect(Number(compactState.endNoteRight)).toBeLessThanOrEqual(compactState.innerWidth - 18);
      expect(Number(compactState.eyebrowTop)).toBeGreaterThanOrEqual(Number(compactState.headerBottom) + 6);
    }
  }
});

test("viewport chapters fill one screen in portrait and landscape", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 568, height: 320 },
    { width: 667, height: 375 },
    { width: 844, height: 390 },
    { width: 800, height: 600 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const chapterState = await page.evaluate(() => {
      const chapters = ["open-air-living", "gatherings", "visit"].map((id) => {
        const section = document.getElementById(id);
        const sectionRect = section?.getBoundingClientRect();
        const directContent = section
          ? Array.from(section.children).map((child) =>
              child.getBoundingClientRect()
            )
          : [];
        const constrainedContent = [...directContent];

        if (id === "visit" && section) {
          const visitContent = section.querySelector(".visit-section__content");
          const visitCta = section.querySelector(".visit-section__whatsapp");

          if (visitContent) {
            constrainedContent.push(visitContent.getBoundingClientRect());
          }

          if (visitCta) {
            constrainedContent.push(visitCta.getBoundingClientRect());
          }
        }

        return {
          id,
          hasContract: section?.classList.contains("viewport-chapter") ?? false,
          height: sectionRect?.height ?? 0,
          sectionBounds: sectionRect
            ? { top: sectionRect.top, bottom: sectionRect.bottom }
            : null,
          contentBounds: constrainedContent.map((rect) => ({
            top: rect.top,
            bottom: rect.bottom
          })),
          contentCoversWidth:
            Boolean(sectionRect) &&
            directContent.length > 0 &&
            Math.abs(
              Math.max(...directContent.map((rect) => rect.right)) -
                Number(sectionRect?.right)
            ) <= 1 &&
            Math.abs(
              Math.min(...directContent.map((rect) => rect.left)) -
                Number(sectionRect?.left)
            ) <= 1,
          contentFits: constrainedContent.every(
            (rect) =>
              sectionRect &&
              rect.top >= sectionRect.top - 1 &&
              rect.bottom <= sectionRect.bottom + 1
          )
        };
      });

      return {
        chapters,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth
      };
    });

    expect(chapterState.scrollWidth).toBeLessThanOrEqual(
      chapterState.innerWidth
    );

    for (const chapter of chapterState.chapters) {
      expect(chapter.hasContract, `${chapter.id} uses the shared contract`).toBe(
        true
      );
      expect(
        Math.abs(chapter.height - chapterState.innerHeight),
        `${chapter.id} fills ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(
        chapter.contentFits,
        `${chapter.id} content stays contained at ${viewport.width}x${viewport.height}: ${JSON.stringify({ section: chapter.sectionBounds, content: chapter.contentBounds })}`
      ).toBe(true);
      expect(
        chapter.contentCoversWidth,
        `${chapter.id} has no unused track at ${viewport.width}x${viewport.height}`
      ).toBe(true);
    }
  }
});

test("Task 10.1 compact-landscape chapters fit one screen below the fixed header", async ({
  page
}) => {
  const viewports = [
    { width: 568, height: 320 },
    { width: 844, height: 390 }
  ];
  const chapters = [
    {
      name: "hero",
      selector: ".threshold-hero",
      leadSelector: ".hero-copy h1",
      requiredSelectors: [
        ".hero-copy",
        ".hero-subtitle",
        ".hero-lede",
        ".hero-detail",
        ".hero-whatsapp"
      ],
      textMinimums: [
        { selector: ".hero-copy h1", pixels: 28 },
        { selector: ".hero-subtitle", pixels: 11 },
        { selector: ".hero-lede", pixels: 12 },
        { selector: ".hero-detail", pixels: 12 }
      ]
    },
    {
      name: "place",
      selector: "#place",
      leadSelector: ".place-section__eyebrow",
      requiredSelectors: [
        ".place-section__copy",
        ".place-section__image",
        ".place-section__title",
        ".place-section__intro",
        ".place-section__facts",
        ".place-section__fact:nth-child(1)",
        ".place-section__fact:nth-child(2)",
        ".place-section__fact:nth-child(3)"
      ],
      textMinimums: [
        { selector: ".place-section__eyebrow", pixels: 9 },
        { selector: ".place-section__title", pixels: 28 },
        { selector: ".place-section__intro", pixels: 12 },
        { selector: ".place-section__fact dt", pixels: 9 },
        { selector: ".place-section__fact dd", pixels: 12 }
      ]
    },
    {
      name: "cabins",
      selector: "#cabins",
      leadSelector: ".cabins-section__eyebrow",
      requiredSelectors: [
        ".cabins-section__image",
        ".cabins-section__panel",
        ".cabins-section__title",
        ".cabins-section__intro",
        ".cabins-section__marker"
      ],
      textMinimums: [
        { selector: ".cabins-section__eyebrow", pixels: 9 },
        { selector: ".cabins-section__title", pixels: 28 },
        { selector: ".cabins-section__intro", pixels: 12 },
        { selector: ".cabins-section__marker", pixels: 10.5 }
      ]
    },
    {
      name: "rhythm",
      selector: "#open-air-living",
      leadSelector: ".open-air-section__eyebrow",
      requiredSelectors: [
        ".open-air-section__copy",
        ".open-air-section__image",
        ".open-air-section__title",
        ".open-air-section__intro",
        ".open-air-section__passage"
      ],
      textMinimums: [
        { selector: ".open-air-section__eyebrow", pixels: 9 },
        { selector: ".open-air-section__title", pixels: 28 },
        { selector: ".open-air-section__intro", pixels: 12 },
        { selector: ".open-air-section__passage", pixels: 10.5 }
      ]
    },
    {
      name: "gatherings",
      selector: "#gatherings",
      leadSelector: ".gatherings-section__eyebrow",
      requiredSelectors: [
        ".gatherings-section__image",
        ".gatherings-section__panel",
        ".gatherings-section__title",
        ".gatherings-section__intro",
        ".gatherings-section__occasions",
        ".gatherings-section__occasions li:nth-child(1)",
        ".gatherings-section__occasions li:nth-child(2)",
        ".gatherings-section__occasions li:nth-child(3)"
      ],
      textMinimums: [
        { selector: ".gatherings-section__eyebrow", pixels: 9 },
        { selector: ".gatherings-section__title", pixels: 28 },
        { selector: ".gatherings-section__intro", pixels: 12 },
        { selector: ".gatherings-section__occasions", pixels: 12 }
      ]
    }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const state = await page.evaluate((chapterDefinitions) => {
      const header = document.querySelector(".site-header");
      const headerRect = header?.getBoundingClientRect();
      const rect = (element: Element | null) => {
        const bounds = element?.getBoundingClientRect();

        return bounds
          ? {
              top: bounds.top,
              right: bounds.right,
              bottom: bounds.bottom,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height
            }
          : null;
      };

      return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headerBottom: headerRect?.bottom ?? 0,
        chapters: chapterDefinitions.map((definition) => {
          const section = document.querySelector(definition.selector);
          const sectionRect = section?.getBoundingClientRect();
          const lead = section?.querySelector(definition.leadSelector) ?? null;
          const leadRect = lead?.getBoundingClientRect();
          const required = definition.requiredSelectors.map((selector) => {
            const element = section?.querySelector(selector) ?? null;
            const bounds = rect(element);

            return {
              selector,
              bounds,
              fontSize: element
                ? Number.parseFloat(window.getComputedStyle(element).fontSize)
                : null
            };
          });

          return {
            name: definition.name,
            section: rect(section),
            scrollHeight: section?.scrollHeight ?? null,
            clientHeight: section?.clientHeight ?? null,
            leadLocalTop:
              sectionRect && leadRect ? leadRect.top - sectionRect.top : null,
            required,
            requiredFits:
              Boolean(sectionRect) &&
              required.every(
                ({ bounds }) =>
                  bounds &&
                  bounds.top >= sectionRect.top - 1 &&
                  bounds.bottom <= sectionRect.bottom + 1 &&
                  bounds.left >= sectionRect.left - 1 &&
                  bounds.right <= sectionRect.right + 1
              )
          };
        })
      };
    }, chapters);

    expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth);

    for (const chapter of state.chapters) {
      expect(
        Math.abs(Number(chapter.section?.height) - state.innerHeight),
        `${chapter.name} fills ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(chapter.clientHeight).toBe(viewport.height);
      expect(chapter.scrollHeight).toBeLessThanOrEqual(viewport.height + 1);
      expect(
        chapter.requiredFits,
        `${chapter.name} keeps required content inside its chapter: ${JSON.stringify(chapter.required)}`
      ).toBe(true);
      expect(
        Number(chapter.leadLocalTop),
        `${chapter.name} clears the fixed header`
      ).toBeGreaterThanOrEqual(state.headerBottom + 6);

      const definition = chapters.find(
        ({ name }) => name === chapter.name
      );

      for (const minimum of definition?.textMinimums ?? []) {
        const textElement = chapter.required.find(
          ({ selector }) => selector === minimum.selector
        );
        const measuredFontSize =
          textElement?.fontSize ??
          (await page
            .locator(`${definition?.selector} ${minimum.selector}`)
            .first()
            .evaluate((element) =>
              Number.parseFloat(window.getComputedStyle(element).fontSize)
            ));

        expect(
          measuredFontSize,
          `${chapter.name} keeps ${minimum.selector} readable at ${viewport.width}x${viewport.height}`
        ).toBeGreaterThanOrEqual(minimum.pixels);
      }
    }

    for (const chapter of chapters) {
      await page.evaluate((selector) => {
        const section = document.querySelector(selector);

        if (section) {
          section.scrollIntoView({ behavior: "instant", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }, chapter.selector);
      await page.waitForTimeout(100);

      const scrolledHeaderState = await page.evaluate((definition) => {
        const header = document.querySelector(".site-header");
        const section = document.querySelector(definition.selector);
        const lead = section?.querySelector(definition.leadSelector);
        const headerBounds = header?.getBoundingClientRect();
        const sectionBounds = section?.getBoundingClientRect();
        const leadBounds = lead?.getBoundingClientRect();

        return {
          headerBottom: headerBounds?.bottom ?? 0,
          sectionTop: sectionBounds?.top ?? null,
          leadTop: leadBounds?.top ?? null
        };
      }, chapter);

      expect(
        Math.abs(Number(scrolledHeaderState.sectionTop)),
        `${chapter.name} aligns to the viewport after navigation`
      ).toBeLessThanOrEqual(1);
      expect(
        Number(scrolledHeaderState.leadTop),
        `${chapter.name} clears the real scrolled header`
      ).toBeGreaterThanOrEqual(scrolledHeaderState.headerBottom + 6);
    }
  }
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

  expect(previewState.scrollWidth).toBeLessThanOrEqual(
    previewState.innerWidth
  );
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

test("Task 8.5 publishes metadata and keeps the unfinished stays route inaccessible", async ({
  page
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Anvelia Sanctuary");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /hillside resort/i
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Anvelia Sanctuary"
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    /hillside resort/i
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website"
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "en_MY"
  );
  await expect(page.locator('a[href="/stays"]')).toHaveCount(0);

  await page.goto("/stays");
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Anvelia Sanctuary" })
  ).toBeVisible();
});

test("Task 8.5 loads cleanly with responsive below-fold images", async ({
  page
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#visit").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");

  const heroImageState = await page.locator(".threshold-hero__media img").evaluate((image) => ({
    loading: image.getAttribute("loading"),
    fetchPriority: image.getAttribute("fetchpriority"),
    complete: (image as HTMLImageElement).complete,
    naturalWidth: (image as HTMLImageElement).naturalWidth
  }));
  const lazyImageState = await page.locator('main section img[loading="lazy"]').evaluateAll((images) =>
    images.map((image) => ({
      loading: image.getAttribute("loading"),
      width: image.getAttribute("width"),
      height: image.getAttribute("height"),
      complete: (image as HTMLImageElement).complete,
      naturalWidth: (image as HTMLImageElement).naturalWidth
    }))
  );
  const responsiveImageState = await page.locator(
    ".place-section__image > img, .cabins-section__image > img:not(.cabins-section__image-botanical), .open-air-section__image > img"
  ).evaluateAll((images) =>
    images.map((image) => ({
      srcset: image.getAttribute("srcset"),
      sizes: image.getAttribute("sizes")
    }))
  );

  expect(heroImageState).toMatchObject({
    loading: "eager",
    fetchPriority: "high",
    complete: true
  });
  expect(heroImageState.naturalWidth).toBeGreaterThan(0);
  expect(lazyImageState).toHaveLength(10);
  for (const image of lazyImageState) {
    expect(image.loading).toBe("lazy");
    expect(Number(image.width)).toBeGreaterThan(0);
    expect(Number(image.height)).toBeGreaterThan(0);
    expect(image.complete).toBe(true);
    expect(image.naturalWidth).toBeGreaterThan(0);
  }
  expect(responsiveImageState).toHaveLength(3);
  for (const image of responsiveImageState) {
    expect(image.srcset).toBeTruthy();
    expect(image.sizes).toBeTruthy();
  }
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
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
    const surfaceStyles = window.getComputedStyle(element, "::after");

    return {
      dataScrolled: element.getAttribute("data-scrolled"),
      position: styles.position,
      top: Math.round(rect.top),
      backgroundColor: styles.backgroundColor,
      surfaceOpacity: surfaceStyles.opacity
    };
  });

  expect(topState).toMatchObject({
    dataScrolled: null,
    position: "fixed"
  });
  expect(topState.top).toBeGreaterThanOrEqual(0);
  expect(topState.top).toBeLessThanOrEqual(26);
  expect(topState.surfaceOpacity).toBe("0");

  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 120));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await header.evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    );
  });

  const scrolledState = await header.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = window.getComputedStyle(element);
    const surfaceStyles = window.getComputedStyle(element, "::after");
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
      height: Math.round(rect.height),
      backgroundColor: styles.backgroundColor,
      surfaceOpacity: surfaceStyles.opacity,
      surfaceBackgroundImage: surfaceStyles.backgroundImage,
      surfaceBackdropFilter: surfaceStyles.backdropFilter,
      surfaceBorderColor: surfaceStyles.borderTopColor,
      surfaceTransitionDuration: surfaceStyles.transitionDuration,
      brandColor: brandStyles.color,
      navColor: navStyles.color,
      whatsappBackground: whatsappStyles.backgroundColor,
      whatsappColor: whatsappStyles.color
    };
  });

  expect(scrolledState.top).toBe(topState.top);
  expect(scrolledState.bottom).toBeGreaterThan(54);
  expect(scrolledState.height).toBeLessThanOrEqual(58);
  expect(scrolledState.backgroundColor).toBe(topState.backgroundColor);
  expect(scrolledState.surfaceOpacity).toBe("1");
  expect(scrolledState.surfaceBackgroundImage).toContain("linear-gradient");
  expect(scrolledState.surfaceBackdropFilter).toContain("blur");
  expect(scrolledState.surfaceBorderColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(scrolledState.surfaceTransitionDuration).toBe("0.2s");
  expect(scrolledState.brandColor).toBe(scrolledState.navColor);
  expect(scrolledState.brandColor).toMatch(
    /rgba\((?:19|20), (?:15|16), (?:12|13), 0\.8\)/
  );
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
    layoutWidth: document.body.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    rootScrollLocked: document.documentElement.getAttribute(
      "data-scroll-locked"
    ),
    rootScrollbarGutter: window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("scrollbar-gutter"),
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

  expect(openOverflow.scrollWidth).toBeLessThanOrEqual(
    openOverflow.innerWidth
  );
  expect(openOverflow.rootScrollLocked).toBe("true");
  expect(openOverflow.rootScrollbarGutter).toContain("stable");
  expect(openOverflow.bodyOverflow).toBe("hidden");
  expect(openOverflow.panel).toMatchObject({
    x: 0,
    y: 0,
    position: "fixed",
    borderRadius: "0px"
  });
  expect(openOverflow.panel?.width).toBe(openOverflow.layoutWidth);
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

  const unlockedState = await page.evaluate(() => ({
    rootScrollLocked: document.documentElement.getAttribute(
      "data-scroll-locked"
    ),
    bodyOverflow: window.getComputedStyle(document.body).overflow
  }));

  expect(unlockedState).toEqual({
    rootScrollLocked: null,
    bodyOverflow: "visible"
  });
});

test("Task 10.1 menu fits compact screens and protects approved widget states", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568, compact: true },
    { width: 568, height: 320, compact: true },
    { width: 390, height: 844, compact: false },
    { width: 768, height: 1024, compact: false }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    const readWidget = () => menuButton.evaluate((element) => {
      const rect = element.getBoundingClientRect();

      return {
        top: rect.top,
        right: window.innerWidth - rect.right,
        width: rect.width,
        height: rect.height
      };
    });
    const closedWidget = await readWidget();

    expect(closedWidget).toMatchObject({ width: 44, height: 44 });

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 120));
    await expect(page.locator(".site-header")).toHaveAttribute(
      "data-scrolled",
      "true"
    );

    const scrolledWidget = await readWidget();

    expect(Math.abs(scrolledWidget.top - closedWidget.top)).toBeLessThanOrEqual(
      1
    );
    expect(
      Math.abs(scrolledWidget.right - closedWidget.right)
    ).toBeLessThanOrEqual(1);
    expect(scrolledWidget).toMatchObject({ width: 44, height: 44 });

    await menuButton.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    const geometry = await page.evaluate(() => {
      const panel = document.querySelector<HTMLElement>(".mobile-nav-panel");
      const content = document.querySelector<HTMLElement>(
        ".mobile-nav-panel__content"
      );
      const nav = document.querySelector<HTMLElement>(".mobile-nav");
      const footer = document.querySelector<HTMLElement>(
        ".mobile-nav-panel__footer"
      );
      const closeButton = document.querySelector<HTMLElement>(
        ".mobile-menu-toggle"
      );
      const visibleItems = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".mobile-nav a, .mobile-nav__whatsapp, .mobile-nav-panel__address"
        )
      );
      const rect = (element: Element | null) => {
        const bounds = element?.getBoundingClientRect();

        return bounds
          ? {
              top: bounds.top,
              right: bounds.right,
              bottom: bounds.bottom,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height
            }
          : null;
      };

      return {
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          layoutWidth: document.body.clientWidth
        },
        panel: rect(panel),
        panelScrollHeight: panel?.scrollHeight,
        panelOverflowY: panel
          ? window.getComputedStyle(panel).overflowY
          : null,
        content: rect(content),
        nav: rect(nav),
        footer: rect(footer),
        closeButton: rect(closeButton),
        items: visibleItems.map((item) => ({
          label: item.textContent?.trim(),
          rect: rect(item),
          visible: window.getComputedStyle(item).visibility === "visible"
        }))
      };
    });

    expect(geometry.panel).toMatchObject({
      top: 0,
      left: 0,
      width: geometry.viewport.layoutWidth,
      height: viewport.height
    });
    expect(Number(geometry.panelScrollHeight)).toBeLessThanOrEqual(
      viewport.height + 1
    );

    if (viewport.compact) {
      expect(geometry.panelOverflowY).toBe("auto");
    }

    expect(Number(geometry.content?.top)).toBeGreaterThanOrEqual(0);
    expect(Number(geometry.content?.bottom)).toBeLessThanOrEqual(
      viewport.height
    );
    expect(Number(geometry.footer?.bottom)).toBeLessThanOrEqual(
      viewport.height
    );
    const navToFooterGap = Math.max(
      Number(geometry.footer?.top) - Number(geometry.nav?.bottom),
      Number(geometry.nav?.top) - Number(geometry.footer?.bottom),
      Number(geometry.footer?.left) - Number(geometry.nav?.right),
      Number(geometry.nav?.left) - Number(geometry.footer?.right)
    );

    expect(navToFooterGap).toBeGreaterThanOrEqual(viewport.compact ? 12 : 0);
    const intersectionArea = (
      first: typeof geometry.closeButton,
      second: typeof geometry.closeButton
    ) =>
      Math.max(
        0,
        Math.min(Number(first?.right), Number(second?.right)) -
          Math.max(Number(first?.left), Number(second?.left))
      ) *
      Math.max(
        0,
        Math.min(Number(first?.bottom), Number(second?.bottom)) -
          Math.max(Number(first?.top), Number(second?.top))
      );

    expect(Number(geometry.closeButton?.top)).toBeCloseTo(
      scrolledWidget.top,
      0
    );
    expect(viewport.width - Number(geometry.closeButton?.right)).toBeCloseTo(
      scrolledWidget.right,
      0
    );
    expect(geometry.closeButton).toMatchObject({
      width: 44,
      height: 44
    });
    expect(geometry.items).toHaveLength(7);

    for (const item of geometry.items) {
      expect(item.visible).toBe(true);
      expect(Number(item.rect?.top)).toBeGreaterThanOrEqual(0);
      expect(Number(item.rect?.right)).toBeLessThanOrEqual(viewport.width);
      expect(Number(item.rect?.bottom)).toBeLessThanOrEqual(viewport.height);
      expect(Number(item.rect?.left)).toBeGreaterThanOrEqual(0);
      expect(intersectionArea(geometry.closeButton, item.rect)).toBe(0);
    }
  }
});

test("Task 10.2 uses one restrained motion vocabulary without layout shift", async ({
  page
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const initialState = await page.evaluate(() => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const marker = document.querySelector<HTMLElement>(
      ".cabins-section__marker"
    );
    const passage = document.querySelector<HTMLElement>(
      ".open-air-section__passage"
    );
    const passageRule = passage
      ? window.getComputedStyle(passage, "::after")
      : null;
    const passageRect = passage?.getBoundingClientRect();
    const skipLink = document.querySelector<HTMLElement>(".skip-link");
    const button = document.querySelector<HTMLElement>(".ui-button");
    const header = document.querySelector<HTMLElement>(".site-header");
    const headerSurface = header
      ? window.getComputedStyle(header, "::after")
      : null;
    const chapterSelectors = [
      ".threshold-hero",
      ".place-section",
      ".cabins-section",
      ".open-air-section",
      ".gatherings-section",
      ".visit-section"
    ];

    return {
      tokens: {
        fast: rootStyles.getPropertyValue("--motion-duration-fast").trim(),
        standard: rootStyles
          .getPropertyValue("--motion-duration-standard")
          .trim(),
        slow: rootStyles.getPropertyValue("--motion-duration-slow").trim(),
        delayNone: rootStyles.getPropertyValue("--motion-delay-none").trim(),
        easeStandard: rootStyles
          .getPropertyValue("--motion-ease-standard")
          .trim(),
        easeSettle: rootStyles.getPropertyValue("--motion-ease-settle").trim(),
        distanceSubtle: rootStyles
          .getPropertyValue("--motion-distance-subtle")
          .trim(),
        distanceSettle: rootStyles
          .getPropertyValue("--motion-distance-settle")
          .trim(),
        opacityEnter: rootStyles
          .getPropertyValue("--motion-opacity-enter")
          .trim()
      },
      markerTransition: marker
        ? window.getComputedStyle(marker).transitionDuration
        : null,
      skipTransition: skipLink
        ? window.getComputedStyle(skipLink).transitionDuration
        : null,
      buttonTransitionProperty: button
        ? window.getComputedStyle(button).transitionProperty
        : null,
      headerTransition: header
        ? window.getComputedStyle(header).transitionDuration
        : null,
      headerSurface: headerSurface
        ? {
            opacity: headerSurface.opacity,
            transitionDuration: headerSurface.transitionDuration,
            transitionProperty: headerSurface.transitionProperty
          }
        : null,
      passage: passageRect
        ? {
            left: passageRect.left,
            right: passageRect.right,
            width: passageRect.width
          }
        : null,
      passageRule: passageRule
        ? {
            width: passageRule.width,
            transform: passageRule.transform,
            transitionDuration: passageRule.transitionDuration,
            transitionProperty: passageRule.transitionProperty
          }
        : null,
      chapters: chapterSelectors.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        const styles = element ? window.getComputedStyle(element) : null;

        return {
          selector,
          exists: Boolean(element),
          opacity: styles?.opacity,
          visibility: styles?.visibility,
          animationName: styles?.animationName,
          animationIterationCount: styles?.animationIterationCount
        };
      })
    };
  });

  expect(initialState.tokens).toEqual({
    fast: "140ms",
    standard: "200ms",
    slow: "260ms",
    delayNone: "0ms",
    easeStandard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    easeSettle: "cubic-bezier(0.22, 1, 0.36, 1)",
    distanceSubtle: "2px",
    distanceSettle: "4px",
    opacityEnter: "0.94"
  });
  expect(initialState.markerTransition).toBe("0s");
  expect(initialState.skipTransition).toBe("0s");
  expect(initialState.buttonTransitionProperty).not.toContain("transform");
  expect(initialState.headerTransition).toBe("0s");
  expect(initialState.headerSurface).toEqual({
    opacity: "0",
    transitionDuration: "0.2s",
    transitionProperty: "opacity"
  });
  expect(initialState.passageRule?.transitionProperty).toContain("transform");
  expect(initialState.passageRule?.transitionProperty).not.toContain("width");
  expect(initialState.passageRule?.transitionDuration).toBe("0.2s, 0.2s");

  for (const chapter of initialState.chapters) {
    expect(chapter.exists).toBe(true);
    expect(chapter.opacity).toBe("1");
    expect(chapter.visibility).toBe("visible");
    expect(chapter.animationName).toBe("none");
    expect(chapter.animationIterationCount).not.toBe("infinite");
  }

  await page.locator(".open-air-section__passage").hover();
  await page.waitForTimeout(300);

  const hoverState = await page.evaluate(() => {
    const passage = document.querySelector<HTMLElement>(
      ".open-air-section__passage"
    );
    const passageRule = passage
      ? window.getComputedStyle(passage, "::after")
      : null;
    const passageRect = passage?.getBoundingClientRect();

    return {
      passage: passageRect
        ? {
            left: passageRect.left,
            right: passageRect.right,
            width: passageRect.width
          }
        : null,
      passageRule: passageRule
        ? {
            width: passageRule.width,
            transform: passageRule.transform
          }
        : null
    };
  });

  expect(hoverState.passage).toEqual(initialState.passage);
  expect(hoverState.passageRule?.width).toBe(initialState.passageRule?.width);
  expect(hoverState.passageRule?.transform).not.toBe(
    initialState.passageRule?.transform
  );
});

test("Task 10.2 menu settles without changing its full-screen geometry", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();

  const readMenuState = () =>
    page.evaluate(() => {
      const panel = document.querySelector<HTMLElement>(".mobile-nav-panel");
      const content = document.querySelector<HTMLElement>(
        ".mobile-nav-panel__content"
      );
      const panelRect = panel?.getBoundingClientRect();
      const panelStyles = panel ? window.getComputedStyle(panel) : null;
      const contentStyles = content ? window.getComputedStyle(content) : null;

      return {
        viewport: {
          width: document.body.clientWidth,
          height: window.innerHeight
        },
        panel: panelRect
          ? {
              top: panelRect.top,
              left: panelRect.left,
              width: panelRect.width,
              height: panelRect.height
            }
          : null,
        panelMotion: panelStyles
          ? {
              name: panelStyles.animationName,
              duration: panelStyles.animationDuration,
              delay: panelStyles.animationDelay,
              count: panelStyles.animationIterationCount
            }
          : null,
        contentMotion: contentStyles
          ? {
              name: contentStyles.animationName,
              duration: contentStyles.animationDuration,
              delay: contentStyles.animationDelay,
              count: contentStyles.animationIterationCount
            }
          : null
      };
    });

  const openingState = await readMenuState();

  expect(openingState.panel).toEqual({
    top: 0,
    left: 0,
    width: openingState.viewport.width,
    height: openingState.viewport.height
  });
  expect(openingState.panelMotion).toEqual({
    name: "anvelia-menu-surface-settle",
    duration: "0.2s",
    delay: "0s",
    count: "1"
  });
  expect(openingState.contentMotion).toEqual({
    name: "anvelia-menu-content-settle",
    duration: "0.26s",
    delay: "0s",
    count: "1"
  });

  await page.locator(".mobile-nav-panel").evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    );
  });

  const settledState = await readMenuState();

  expect(settledState.panel).toEqual(openingState.panel);
  expect(settledState.viewport).toEqual(openingState.viewport);
});

test("Task 10.2 reduced motion keeps content immediate and removes motion", async ({
  page
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const reducedState = await page.evaluate(() => {
    const selectors = [
      ".ui-button",
      ".site-header",
      ".brand-link",
      ".primary-nav a",
      ".header-whatsapp",
      ".mobile-menu-toggle",
      ".cabins-section__marker",
      ".open-air-section__passage"
    ];
    const chapters = [
      ".threshold-hero",
      ".place-section",
      ".cabins-section",
      ".open-air-section",
      ".gatherings-section",
      ".visit-section"
    ];
    const readMotion = (styles: CSSStyleDeclaration) => ({
      transitionDuration: styles.transitionDuration,
      animationName: styles.animationName,
      animationDuration: styles.animationDuration
    });

    return {
      elements: selectors.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        const styles = element ? window.getComputedStyle(element) : null;

        return {
          selector,
          exists: Boolean(element),
          motion: styles ? readMotion(styles) : null
        };
      }),
      passageRule: (() => {
        const passage = document.querySelector<HTMLElement>(
          ".open-air-section__passage"
        );
        const styles = passage
          ? window.getComputedStyle(passage, "::after")
          : null;

        return styles
          ? {
              ...readMotion(styles),
              transform: styles.transform
            }
          : null;
      })(),
      headerSurface: (() => {
        const header = document.querySelector<HTMLElement>(".site-header");
        const styles = header
          ? window.getComputedStyle(header, "::after")
          : null;

        return styles
          ? {
              transitionDuration: styles.transitionDuration,
              animationName: styles.animationName
            }
          : null;
      })(),
      chapters: chapters.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        const styles = element ? window.getComputedStyle(element) : null;

        return {
          selector,
          exists: Boolean(element),
          opacity: styles?.opacity,
          visibility: styles?.visibility,
          animationName: styles?.animationName
        };
      })
    };
  });

  for (const element of reducedState.elements) {
    expect(element.exists).toBe(true);
    expect(element.motion).toEqual({
      transitionDuration: "0s",
      animationName: "none",
      animationDuration: "0s"
    });
  }
  expect(reducedState.passageRule).toEqual({
    transitionDuration: "0s",
    animationName: "none",
    animationDuration: "0s",
    transform: "none"
  });
  expect(reducedState.headerSurface).toEqual({
    transitionDuration: "0s",
    animationName: "none"
  });

  for (const chapter of reducedState.chapters) {
    expect(chapter.exists).toBe(true);
    expect(chapter.opacity).toBe("1");
    expect(chapter.visibility).toBe("visible");
    expect(chapter.animationName).toBe("none");
  }

  await page.locator(".open-air-section__passage").hover();
  await expect
    .poll(() =>
      page
        .locator(".open-air-section__passage")
        .evaluate((element) =>
          window.getComputedStyle(element, "::after").transform
        )
    )
    .toBe("none");

  await page.getByRole("button", { name: "Open menu" }).click();

  const menuState = await page.evaluate(() => {
    const panel = document.querySelector<HTMLElement>(".mobile-nav-panel");
    const content = document.querySelector<HTMLElement>(
      ".mobile-nav-panel__content"
    );
    const read = (element: HTMLElement | null) => {
      const styles = element ? window.getComputedStyle(element) : null;

      return styles
        ? {
            animationName: styles.animationName,
            animationDuration: styles.animationDuration,
            opacity: styles.opacity,
            transform: styles.transform,
            visibility: styles.visibility
          }
        : null;
    };

    return {
      panel: read(panel),
      content: read(content)
    };
  });

  expect(menuState.panel).toEqual({
    animationName: "none",
    animationDuration: "0s",
    opacity: "1",
    transform: "none",
    visibility: "visible"
  });
  expect(menuState.content).toEqual({
    animationName: "none",
    animationDuration: "0s",
    opacity: "1",
    transform: "none",
    visibility: "visible"
  });

  await page.goto("/activities");
  const activitiesHeaderMotion = await page
    .locator(".site-header")
    .evaluate((element) => {
      const activitySurface = window.getComputedStyle(element, "::before");
      const sharedSurface = window.getComputedStyle(element, "::after");

      return {
        transitionDuration: activitySurface.transitionDuration,
        animationName: activitySurface.animationName,
        sharedSurfaceDisplay: sharedSurface.display
      };
    });

  expect(activitiesHeaderMotion).toEqual({
    transitionDuration: "0s",
    animationName: "none",
    sharedSurfaceDisplay: "none"
  });
});

test("Task 10.3 keeps every narrative chapter to one exact viewport", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 568, height: 320 },
    { width: 768, height: 700 },
    { width: 820, height: 440 },
    { width: 820, height: 441 },
    { width: 821, height: 441 },
    { width: 800, height: 600 },
    { width: 800, height: 620 },
    { width: 800, height: 621 },
    { width: 800, height: 640 },
    { width: 800, height: 790 },
    { width: 800, height: 800 },
    { width: 820, height: 600 },
    { width: 820, height: 620 },
    { width: 820, height: 621 },
    { width: 820, height: 800 },
    { width: 821, height: 600 },
    { width: 920, height: 440 },
    { width: 920, height: 441 },
    { width: 920, height: 620 },
    { width: 920, height: 621 },
    { width: 921, height: 441 },
    { width: 921, height: 620 },
    { width: 921, height: 621 },
    { width: 1000, height: 600 },
    { width: 1000, height: 700 },
    { width: 1000, height: 701 },
    { width: 1001, height: 600 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1366, height: 500 },
    { width: 1366, height: 501 },
    { width: 1366, height: 520 },
    { width: 1366, height: 540 },
    { width: 1366, height: 625 },
    { width: 1440, height: 600 },
    { width: 1440, height: 620 },
    { width: 1440, height: 621 },
    { width: 1440, height: 900 },
    { width: 1920, height: 500 },
    { width: 1920, height: 501 }
  ];
  const chapterSelectors = [
    ".threshold-hero",
    "#place",
    "#cabins",
    "#open-air-living",
    "#gatherings",
    "#visit"
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const state = await page.evaluate((selectors) => {
      const root = document.documentElement;

      return {
        layoutWidth: document.body.clientWidth,
        rootScrollWidth: root.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        chapters: selectors.map((selector) => {
          const chapter = document.querySelector<HTMLElement>(selector);
          const bounds = chapter?.getBoundingClientRect();
          const visibleContent = Array.from(
            chapter?.querySelectorAll<HTMLElement>(
              "h1, h2, h3, p, a, button, li, dt, dd"
            ) ?? []
          ).filter((element) => {
            const styles = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return (
              styles.display !== "none" &&
              styles.visibility !== "hidden" &&
              Number.parseFloat(styles.opacity) !== 0 &&
              rect.width > 0 &&
              rect.height > 0
            );
          });

          return {
            selector,
            exists: Boolean(chapter),
            width: bounds?.width ?? 0,
            height: bounds?.height ?? 0,
            clientHeight: chapter?.clientHeight ?? 0,
            scrollHeight: chapter?.scrollHeight ?? 0,
            hiddenContent: visibleContent
              .filter((element) => {
                if (!bounds) {
                  return true;
                }

                const rect = element.getBoundingClientRect();

                return (
                  rect.left < bounds.left - 1 ||
                  rect.right > bounds.right + 1 ||
                  rect.top < bounds.top - 1 ||
                  rect.bottom > bounds.bottom + 1
                );
              })
              .map((element) => element.textContent?.trim() ?? element.tagName)
          };
        })
      };
    }, chapterSelectors);

    expect(state.rootScrollWidth).toBeLessThanOrEqual(state.layoutWidth);
    expect(state.bodyScrollWidth).toBeLessThanOrEqual(state.layoutWidth);

    for (const chapter of state.chapters) {
      expect(chapter.exists, chapter.selector).toBe(true);
      expect(
        Math.abs(chapter.height - viewport.height),
        `${chapter.selector} height at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(chapter.width - state.layoutWidth),
        `${chapter.selector} width at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(
        chapter.scrollHeight,
        `${chapter.selector} content height at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(chapter.clientHeight + 1);
      expect(
        chapter.hiddenContent,
        `${chapter.selector} hidden content at ${viewport.width}x${viewport.height}`
      ).toEqual([]);
    }
  }
});

test("Task 10.3 desktop chapter anchors reveal the complete composition", async ({
  page
}) => {
  const viewports = [
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 }
  ];
  const chapters = [
    {
      label: "Place",
      selector: "#place",
      lead: ".place-section__title",
      ending: ".place-section__facts"
    },
    {
      label: "Cabins",
      selector: "#cabins",
      lead: ".cabins-section__title",
      ending: ".cabins-section__marker"
    },
    {
      label: "Rhythm",
      selector: "#open-air-living",
      lead: ".open-air-section__title",
      ending: ".open-air-section__passage"
    },
    {
      label: "Gatherings",
      selector: "#gatherings",
      lead: ".gatherings-section__title",
      ending: ".gatherings-section__occasions"
    },
    {
      label: "Visit",
      selector: "#visit",
      lead: ".visit-section__title",
      ending: ".visit-section__endnote"
    }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    for (const chapter of chapters) {
      await page
        .getByRole("navigation", { name: "Site sections" })
        .getByRole("link", { name: chapter.label, exact: true })
        .click();
      await page.waitForTimeout(280);

      const state = await page.evaluate((definition) => {
        const section = document.querySelector<HTMLElement>(
          definition.selector
        );
        const lead = section?.querySelector<HTMLElement>(definition.lead);
        const ending = section?.querySelector<HTMLElement>(definition.ending);
        const header = document.querySelector<HTMLElement>(".site-header");
        const sectionBounds = section?.getBoundingClientRect();
        const leadBounds = lead?.getBoundingClientRect();
        const endingBounds = ending?.getBoundingClientRect();
        const headerBounds = header?.getBoundingClientRect();
        const sectionStyles = section
          ? window.getComputedStyle(section)
          : null;

        return {
          sectionTop: sectionBounds?.top ?? Number.NaN,
          sectionBottom: sectionBounds?.bottom ?? Number.NaN,
          sectionHeight: sectionBounds?.height ?? 0,
          leadTop: leadBounds?.top ?? Number.NaN,
          endingBottom: endingBounds?.bottom ?? Number.NaN,
          headerBottom: headerBounds?.bottom ?? 0,
          scrollMarginTop: sectionStyles?.scrollMarginTop ?? ""
        };
      }, chapter);

      expect(
        Math.abs(state.sectionTop),
        `${chapter.label} anchor top at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(state.sectionHeight - viewport.height),
        `${chapter.label} anchor height at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(1);
      expect(state.sectionBottom).toBeLessThanOrEqual(viewport.height + 1);
      expect(state.leadTop).toBeGreaterThan(state.headerBottom + 24);
      expect(state.endingBottom).toBeLessThanOrEqual(viewport.height - 8);
      expect(parseFloat(state.scrollMarginTop)).toBe(0);
    }
  }
});

test("Task 10.3 embeds the Place botanical trace into its paper surface", async ({
  page
}) => {
  const viewports = [
    { width: 390, height: 844 },
    { width: 1440, height: 900 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/#place");

    const surface = await page
      .locator(".place-section__copy")
      .evaluate((element) => {
        const styles = window.getComputedStyle(element, "::before");

        return {
          backgroundImage: styles.backgroundImage,
          backgroundRepeat: styles.backgroundRepeat,
          mixBlendMode: styles.mixBlendMode,
          opacity: Number.parseFloat(styles.opacity),
          pointerEvents: styles.pointerEvents
        };
      });

    expect(surface.backgroundImage).not.toBe("none");
    expect(surface.backgroundRepeat).toBe("no-repeat");
    expect(surface.mixBlendMode).toBe("multiply");
    expect(surface.opacity).toBeGreaterThanOrEqual(0.03);
    expect(surface.opacity).toBeLessThanOrEqual(0.1);
    expect(surface.pointerEvents).toBe("none");
  }
});

test("Task 10.3 keeps Activities exact and readable at every locked viewport", async ({
  page
}) => {
  const viewports = [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 568, height: 320 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/activities/");

    const state = await page.evaluate(() => {
      const root = document.documentElement;
      const chapter = document.querySelector<HTMLElement>(
        ".activities-chapter"
      );
      const bounds = chapter?.getBoundingClientRect();
      const visibleContent = Array.from(
        chapter?.querySelectorAll<HTMLElement>(
          "h1, h2, h3, p, a, li, dt, dd"
        ) ?? []
      ).filter((element) => {
        const styles = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        return (
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      });

      return {
        layoutWidth: document.body.clientWidth,
        rootScrollWidth: root.scrollWidth,
        height: bounds?.height ?? 0,
        width: bounds?.width ?? 0,
        clientHeight: chapter?.clientHeight ?? 0,
        scrollHeight: chapter?.scrollHeight ?? 0,
        hiddenContent: visibleContent.filter((element) => {
          const rect = element.getBoundingClientRect();

          return (
            rect.left < -1 ||
            rect.right > root.clientWidth + 1 ||
            rect.top < -1 ||
            rect.bottom > window.innerHeight + 1
          );
        }).length
      };
    });

    expect(state.rootScrollWidth).toBeLessThanOrEqual(state.layoutWidth);
    expect(Math.abs(state.height - viewport.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(state.width - state.layoutWidth)).toBeLessThanOrEqual(1);
    expect(state.scrollHeight).toBeLessThanOrEqual(state.clientHeight + 1);
    expect(state.hiddenContent).toBe(0);
  }
});

test("Task 10.4 mobile menu isolates the page and moves focus to its selected chapter", async ({
  page
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();

  const main = page.locator("#main-content");
  const skipLink = page.locator(".skip-link");

  await expect(main).toHaveAttribute("inert", "");
  await expect(main).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".mobile-nav-panel")).toHaveAttribute(
    "aria-label",
    "Mobile site sections"
  );
  await expect(page.locator(".brand-link")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
  await expect(page.locator(".header-whatsapp")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
  await expect(skipLink).toHaveAttribute("tabindex", "-1");
  await expect(skipLink).toHaveAttribute("aria-hidden", "true");

  const mobileNav = page.getByRole("navigation", {
    name: "Mobile site sections"
  });

  await mobileNav.getByRole("link", { name: "Place" }).click();

  await expect(page).toHaveURL(/#place$/);
  await expect(page.locator("#place")).toBeFocused();
  await expect(main).not.toHaveAttribute("inert", "");
  await expect(main).not.toHaveAttribute("aria-hidden", "true");
  await expect(skipLink).not.toHaveAttribute("tabindex", "-1");
  await expect(skipLink).not.toHaveAttribute("aria-hidden", "true");
});

test("Task 10.4 paper text and focus indicators meet production contrast", async ({
  page
}) => {
  await page.goto("/");

  const contrast = await page.evaluate(() => {
    const parse = (value: string) => {
      const channels = value.match(/[\d.]+/g)?.map(Number) ?? [];
      return [channels[0], channels[1], channels[2], channels[3] ?? 1] as const;
    };
    const composite = (
      [red, green, blue, alpha]: readonly number[],
      [backgroundRed, backgroundGreen, backgroundBlue]: readonly number[]
    ) => [
      red * alpha + backgroundRed * (1 - alpha),
      green * alpha + backgroundGreen * (1 - alpha),
      blue * alpha + backgroundBlue * (1 - alpha)
    ] as const;
    const luminance = ([red, green, blue]: readonly number[]) => {
      const convert = (channel: number) => {
        const value = channel / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * convert(red) + 0.7152 * convert(green) + 0.0722 * convert(blue);
    };
    const ratio = (foreground: string, background: string) => {
      const parsedBackground = parse(background);
      const parsedForeground = parse(foreground);
      const first = luminance(composite(parsedForeground, parsedBackground));
      const second = luminance(parsedBackground);
      const lighter = Math.max(first, second);
      const darker = Math.min(first, second);
      return (lighter + 0.05) / (darker + 0.05);
    };
    const resolveColor = (value: string) => {
      const probe = document.createElement("span");
      probe.style.color = value.trim();
      document.body.appendChild(probe);
      const resolved = getComputedStyle(probe).color;
      probe.remove();
      return resolved;
    };
    const label = document.querySelector(".place-section__fact dt") as Element;
    const root = getComputedStyle(document.documentElement);
    const paperColor = resolveColor(root.getPropertyValue("--color-paper"));

    return {
      label: ratio(getComputedStyle(label).color, paperColor),
      focus: ratio(
        resolveColor(root.getPropertyValue("--color-focus")),
        paperColor
      )
    };
  });

  expect(contrast.label).toBeGreaterThanOrEqual(4.5);
  expect(contrast.focus).toBeGreaterThanOrEqual(3);
});

test("Task 10.4 hero selects an intentional responsive source", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844, expectedWidth: 960 },
    { width: 1440, height: 900, expectedWidth: 1600 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const selectedWidth = await page
      .locator(".threshold-hero__media img")
      .evaluate((image: HTMLImageElement) => image.currentSrc.includes("960") ? 960 : image.currentSrc.includes("1600") ? 1600 : 0);

    expect(selectedWidth).toBe(viewport.expectedWidth);
  }
});
