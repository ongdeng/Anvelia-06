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
  expect(Number(portraitState.imageHeight)).toBeGreaterThanOrEqual(300);
  expect(Number(portraitState.imageHeight)).toBeLessThanOrEqual(430);
  expect(Number.parseFloat(String(portraitState.imageMarginTop))).toBeLessThanOrEqual(
    -72
  );
  expect(Number.parseFloat(String(portraitState.imageMarginTop))).toBeGreaterThanOrEqual(
    -124
  );
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
      imageSrc: image?.getAttribute("src")
    };
  });

  expect(landscapeState.imageSrc).toBe(portraitState.imageSrc);
  expect(landscapeState.gridTemplateColumns).not.toBe("1fr");
  expect(Number(landscapeState.imageHeight)).toBeGreaterThan(500);
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
  expect(parseFloat(desktopState.scrollMarginTop ?? "0")).toBeGreaterThan(0);

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
    expect(parseFloat(compactState.endNoteFontSize)).toBeGreaterThanOrEqual(9.5);
    expect(parseFloat(compactState.introFontSize)).toBeGreaterThanOrEqual(12);
    expect(parseFloat(compactState.addressFontSize)).toBeGreaterThanOrEqual(11);
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
      height: Math.round(rect.height),
      backgroundColor: styles.backgroundColor,
      backgroundImage: styles.backgroundImage,
      backdropFilter: styles.backdropFilter,
      borderColor: styles.borderTopColor,
      brandColor: brandStyles.color,
      navColor: navStyles.color,
      whatsappBackground: whatsappStyles.backgroundColor,
      whatsappColor: whatsappStyles.color
    };
  });

  expect(scrolledState.top).toBe(topState.top);
  expect(scrolledState.bottom).toBeGreaterThan(54);
  expect(scrolledState.height).toBeLessThanOrEqual(58);
  expect(scrolledState.backgroundColor).not.toBe(topState.backgroundColor);
  expect(scrolledState.backgroundImage).toContain("linear-gradient");
  expect(scrolledState.backdropFilter).toContain("blur");
  expect(scrolledState.borderColor).not.toBe("rgba(0, 0, 0, 0)");
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
