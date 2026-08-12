import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { imagesByRole, siteImages } from "../../src/content/images";
import {
  DEFAULT_LOCALE,
  siteContent,
  siteContentByLocale,
  WHATSAPP_URL
} from "../../src/content/siteContent";

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
};

const contentText = collectStrings(siteContent).join(" ");

describe("siteContent registry", () => {
  it("keeps metadata in the content registry", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(siteContentByLocale.en).toBe(siteContent);
    expect(siteContent.locale).toBe("en");
    expect(siteContent.metadata.title).toBe("Anvelia Sanctuary");
    expect(siteContent.metadata.description).toMatch(/hillside resort/i);
  });

  it("uses the approved WhatsApp URL", () => {
    expect(WHATSAPP_URL).toBe("https://wa.me/60136683113");
    expect(siteContent.contact.whatsappUrl).toBe(
      "https://wa.me/60136683113"
    );
  });

  it("keeps the closing end note timeless and non-repetitive", () => {
    expect(siteContent.endNote).toEqual({
      copyright: "© Anvelia Sanctuary"
    });
    expect(siteContent.endNote.copyright).not.toMatch(/\d{4}/);
    expect(siteContent.endNote.copyright).not.toMatch(
      /Bentong|Lot 8421|WhatsApp/i
    );
    expect("footer" in siteContent).toBe(false);
  });

  it("keeps Task 7 hero and place copy in the registry", () => {
    expect(siteContent.hero.ctaLabel).toBe("WhatsApp Anvelia");
    expect(siteContent.hero.detailLine).toMatch(/Bentong, Pahang/i);
    expect(siteContent.hero.detailLine).toBe("Bentong, Pahang, Malaysia.");
    expect(siteContent.place.title).toBe("A place of quiet elevation");
    expect(siteContent.place.intro).toMatch(/timber/i);
    expect(siteContent.place.intro).toMatch(/cooler evenings/i);
    expect(siteContent.place.intro).toMatch(/fresh hillside air/i);
    expect("body" in siteContent.place).toBe(false);
    expect(siteContent.place.facts.map((fact) => fact.label)).toEqual([
      "Elevation",
      "Setting",
      "Location"
    ]);
  });

  it("uses the approved nav labels", () => {
    expect(siteContent.nav.map((item) => item.id)).toEqual([
      "place",
      "cabins",
      "rhythm",
      "gatherings",
      "visit"
    ]);
    expect(siteContent.nav.map((item) => item.label)).toEqual([
      "Place",
      "Cabins",
      "Rhythm",
      "Gatherings",
      "Visit"
    ]);
    expect(siteContent.nav.find((item) => item.id === "rhythm")?.href).toBe(
      "#open-air-living"
    );
  });

  it("defines the expected planned section count and order", () => {
    expect(siteContent.plannedSections.map((section) => section.id)).toEqual([
      "place",
      "cabins",
      "open-air-living",
      "gatherings",
      "visit"
    ]);
  });

  it("keeps the exact address available as lines and complete text", () => {
    expect(siteContent.contact.whatsappNumber).toBe("+60 13-668 3113");
    expect(siteContent.contact.addressText).toBe(
      "Lot 8421, Kampung Bukit Tinggi, 28750 Bentong, Pahang, Malaysia"
    );
    expect(siteContent.contact.addressLines.join(", ")).toBe(
      siteContent.contact.addressText
    );
  });

  it("keeps cabin copy general", () => {
    const cabinSection = siteContent.plannedSections.find(
      (section) => section.id === "cabins"
    );

    expect(cabinSection).toBeDefined();
    expect(siteContent.cabins.title).toMatch(/Cabins/i);
    expect(siteContent.cabins.intro).toMatch(/cabins/i);
    expect(siteContent.cabins.markerLabel).toBe("Cabin stays");
    expect(siteContent.cabins.markerHref).toBe("/stays");
    expect(siteContent.cabins.markerEnabled).toBe(false);

    const cabinText = collectStrings([
      cabinSection,
      siteContent.cabins
    ]).join(" ");

    expect(cabinText).not.toMatch(
      /\b(?:sleeps?|capacity|guests?|pax|rooms?|beds?|available|availability|package|packages|price|pricing|rates?|RM|MYR)\b/i
    );
    expect(cabinText).not.toMatch(/\b\d+\s*(?:cabins?|guests?|pax|rooms?)\b/i);
  });

  it("keeps open-air living copy material-led and resort-first", () => {
    expect(siteContent.openAirLiving.eyebrow).toBe("Rhythm");
    expect(siteContent.openAirLiving.title).toBe(
      "Living with the hillside"
    );
    expect(siteContent.openAirLiving.body).toBe(
      "Sheltered by timber and greenery, open-air spaces invite slow mornings, afternoon tea and quiet conversation as cooler evening air settles across the hillside."
    );
    expect(siteContent.openAirLiving.markerLabel).toBe("See activities");
    expect(siteContent.openAirLiving.markerHref).toBe("/activities");

    const openAirText = collectStrings(siteContent.openAirLiving).join(" ");

    expect(openAirText).toMatch(/timber|wood/i);
    expect(openAirText).toMatch(/greenery|planted/i);
    expect(openAirText).toMatch(/tea/i);
    expect(openAirText).toMatch(/sheltered/i);
    expect(openAirText).not.toMatch(
      /\b(?:detox|medical|clinic|clinical|doctor|treatment|therapy|therapies|hot spring|liver|nutrition coaching)\b/i
    );
  });

  it("defines the complete concise Activities page content", () => {
    expect(siteContent.activities).toEqual({
      metadata: {
        title: "Activities | Anvelia Sanctuary",
        description:
          "Quiet moments at Anvelia Sanctuary, shaped by tea, reading, timber, greenery, and cooler evening air on the hillside."
      },
      eyebrow: "Activities",
      title: "Time, left open",
      intro:
        "Time here moves quietly between timber, greenery and the cooler evening air.",
      moments: [
        {
          title: "Tea in the open air",
          body:
            "Afternoon tea can linger with quiet conversation and the hillside close by."
        },
        {
          title: "A place to read",
          body: "Reading finds its own pace beside timber and greenery."
        },
        {
          title: "Evening, slowly",
          body:
            "Cooler evening air invites the day to settle gently across the hillside."
        }
      ]
    });

    const activitiesText = collectStrings(siteContent.activities).join(" ");

    expect(activitiesText).toMatch(/tea/i);
    expect(activitiesText).toMatch(/reading|read/i);
    expect(activitiesText).toMatch(/quiet conversation/i);
    expect(activitiesText).toMatch(/timber/i);
    expect(activitiesText).toMatch(/greenery/i);
    expect(activitiesText).toMatch(/cooler evening air/i);
    expect(activitiesText).not.toMatch(
      /\b(?:price|pricing|booking|detox|medical|clinic|treatment|programme|program|schedule|capacity|available|availability)\b/i
    );
  });

  it("locks concise, resort-first Gatherings content", () => {
    expect(siteContent.gatherings.eyebrow).toBe("Gatherings");
    expect(siteContent.gatherings.title).toBe("A quieter way to gather");
    expect(siteContent.gatherings.body).toBe(
      "Time together takes on a gentler rhythm here, shaped by timber, greenery and the hillside."
    );
    expect(siteContent.gatherings.occasions).toEqual([
      "Private dinners",
      "Small corporate retreats",
      "Wellness retreats"
    ]);

    const plannedGatherings = siteContent.plannedSections.find(
      (section) => section.id === "gatherings"
    );
    const gatheringsText = collectStrings(siteContent.gatherings).join(" ");

    expect(plannedGatherings?.imageRole).toBe("gatherings-shared-table");
    expect(plannedGatherings?.copy).toBe(siteContent.gatherings.body);
    expect(gatheringsText).not.toMatch(
      /\b(?:wedding|banquet|conference|capacity|package|detox|medical|clinic|treatment)\b/i
    );
  });

  it("locks concise and practical Visit content", () => {
    expect(siteContent.visit.eyebrow).toBe("Visit");
    expect(siteContent.visit.title).toBe("Come and see Anvelia");
    expect(siteContent.visit.intro).toBe(
      "The doors are open in the quieter hills of Bukit Tinggi, at the foot of Genting Highlands."
    );
    expect("guidance" in siteContent.visit).toBe(false);
    expect(siteContent.visit.ctaLabel).toBe("Plan your visit");

    const plannedVisit = siteContent.plannedSections.find(
      (section) => section.id === "visit"
    );

    expect(plannedVisit?.imageRole).toBe("visit-arrival-path");

    const visitText = collectStrings(siteContent.visit).join(" ");

    expect(visitText).not.toMatch(
      /\b(?:map|booking form|price|pricing|package|detox|medical|clinic|treatment)\b/i
    );
  });

  it("does not include pricing copy", () => {
    expect(contentText).not.toMatch(
      /\b(?:price|pricing|rates?|cost|fees?|RM|MYR|per night|nightly|package|packages|promo|discount)\b/i
    );
  });

  it("does not introduce detox or medical-first claims", () => {
    expect(contentText).not.toMatch(
      /\b(?:detox|medical|clinic|clinical|doctor|treatment|therapy|therapies|diagnos\w*|disease|liver|nutrition coaching)\b/i
    );
  });

  it("does not introduce capacity or availability claims anywhere", () => {
    expect(contentText).not.toMatch(
      /\b(?:sleeps?|capacity|guests?|pax|rooms?|beds?|available|availability|vacancies|book now)\b/i
    );
  });

  it("keeps public copy concise and free of internal project language", () => {
    expect(contentText.match(/450m/gi) ?? []).toHaveLength(2);
    expect(contentText).not.toMatch(
      /rather than claims|planned phase|documentary proof|phase 2/i
    );
  });
});

describe("image registry", () => {
  it("defines selected concept image records for the planned roles", () => {
    expect(siteImages.map((image) => image.role)).toEqual([
      "hero-threshold-arrival",
      "place-hillside-setting",
      "cabins",
      "cabins-botanical-background",
      "mobile-navigation-atmosphere",
      "open-air-living",
      "open-air-botanical-background",
      "gatherings-shared-table",
      "gatherings-material-background",
      "visit-arrival-path",
      "visit-paper-background"
    ]);

    for (const image of siteImages) {
      expect(image.src).toBeTruthy();
      expect(image.alt).toMatch(/^Concept/);
      expect(image.conceptOnly).toBe(true);
    }
  });

  it("keeps the active runtime inventory free of reference-only images", () => {
    expect(
      siteImages.every(
        (image) => image.publicationStatus === "phase-1-runtime-concept"
      )
    ).toBe(true);
  });

  it("registers the approved quiet-readiness concept for Gatherings", () => {
    const image = imagesByRole["gatherings-shared-table"];

    expect(image.sourcePath).toContain(
      "anvelia-gatherings-quiet-readiness-concept.png"
    );
    expect(image.alt).toBe(
      "Concept visual of a people-free timber pavilion after rain, with tea ware, a carafe, a notebook, and a pulled-back chair beside hillside greenery."
    );
    expect(image.srcSet).toContain("640w");
    expect(image.srcSet).toContain("1024w");
    expect(image.srcSet).toContain("1536w");
    expect(image.width).toBe(1536);
    expect(image.height).toBe(1024);
    expect(image.conceptOnly).toBe(true);
    expect(image.publicationStatus).toBe("phase-1-runtime-concept");
  });

  it("registers the bespoke Gatherings material as a decorative runtime image", () => {
    const image = imagesByRole["gatherings-material-background"];

    expect(image.sourcePath).toContain(
      "anvelia-gatherings-material-paper.png"
    );
    expect(image.srcSet).toContain("640w");
    expect(image.srcSet).toContain("1024w");
    expect(image.width).toBe(1024);
    expect(image.height).toBe(683);
    expect(image.conceptOnly).toBe(true);
    expect(image.publicationStatus).toBe("phase-1-runtime-concept");
  });

  it("registers the responsive arrival-path concept for Visit", () => {
    const image = imagesByRole["visit-arrival-path"];

    expect(image.sourcePath).toContain(
      "anvelia-visit-arrival-path-concept.png"
    );
    expect(image.srcSet).toContain("640w");
    expect(image.srcSet).toContain("960w");
    expect(image.srcSet).toContain("1280w");
    expect(image.srcSet).toContain("1586w");
    expect(image.width).toBe(1586);
    expect(image.height).toBe(992);
    expect(image.conceptOnly).toBe(true);
    expect(image.publicationStatus).toBe("phase-1-runtime-concept");
  });

  it("registers the Visit paper field as a decorative responsive image", () => {
    const image = imagesByRole["visit-paper-background"];

    expect(image.sourcePath).toContain("anvelia-visit-paper-field.png");
    expect(image.srcSet).toContain("640w");
    expect(image.srcSet).toContain("1024w");
    expect(image.width).toBe(1024);
    expect(image.height).toBe(1536);
    expect(image.conceptOnly).toBe(true);
    expect(image.publicationStatus).toBe("phase-1-runtime-concept");
  });
});

describe("App registry wiring", () => {
  it("renders current targets for registry nav links", () => {
    const { container } = render(<App />);

    for (const item of siteContent.nav) {
      const id = item.href.replace("#", "");

      expect(container.querySelector(`#${id}`)).toBeTruthy();
    }
  });

  it("renders Task 8 sections as real visible sections with unique IDs", () => {
    const { container } = render(<App />);
    const openAirSection = container.querySelector("#open-air-living");

    expect(container.querySelectorAll("#cabins")).toHaveLength(1);
    expect(container.querySelectorAll("#open-air-living")).toHaveLength(1);
    expect(openAirSection).toHaveClass("viewport-chapter");
    const visibleSections = Array.from(
      container.querySelectorAll<HTMLElement>(".site-shell > section")
    );
    const viewportChapterStart = visibleSections.findIndex(
      (section) => section.id === "open-air-living"
    );

    expect(viewportChapterStart).toBeGreaterThan(-1);
    expect(
      visibleSections
        .slice(viewportChapterStart)
        .every((section) => section.classList.contains("viewport-chapter"))
    ).toBe(true);
    expect(container.querySelector("#cabins-title")).toHaveTextContent(
      siteContent.cabins.title
    );
    expect(container.querySelector("#open-air-living-title")).toHaveTextContent(
      siteContent.openAirLiving.title
    );
    expect(container.querySelector(".open-air-section__details")).toBeNull();
    expect(container.querySelectorAll("#open-air-living p")).toHaveLength(2);
    expect(container.querySelector(".open-air-section__body-copy")).toBeNull();
    const botanical = container.querySelector(
      ".open-air-section__botanical"
    );
    expect(botanical).toHaveAttribute("alt", "");
    expect(botanical).toHaveAttribute("aria-hidden", "true");
    expect(botanical).toHaveAttribute("loading", "lazy");
    expect(container.querySelector(".planned-section-anchors #cabins")).toBeNull();
    expect(
      container.querySelector(".planned-section-anchors #open-air-living")
    ).toBeNull();
  });

  it("uses the approved veranda concept for open-air living", () => {
    const image = imagesByRole["open-air-living"];

    expect(image.sourcePath).toContain(
      "anvelia-open-air-living-veranda-concept.png"
    );
    expect(image.alt).toBe(
      "Concept visual of an open-air timber veranda with lounge seating and tea overlooking a green hillside."
    );
  });

  it("renders Gatherings as a visible semantic section without a CTA", () => {
    const { container } = render(<App />);
    const section = container.querySelector("#gatherings");
    const image = section?.querySelector(".gatherings-section__image img");
    const material = section?.querySelector(
      ".gatherings-section__material"
    );

    expect(container.querySelectorAll("#gatherings")).toHaveLength(1);
    expect(section).toHaveAttribute("aria-labelledby", "gatherings-title");
    expect(section).toHaveClass("gatherings-section", "viewport-chapter");
    expect(
      section?.querySelector(".gatherings-section__eyebrow")?.textContent
    ).toBe(siteContent.gatherings.eyebrow);
    expect(section?.querySelector("#gatherings-title")).toHaveTextContent(
      siteContent.gatherings.title
    );
    expect(
      section?.querySelector(".gatherings-section__intro")?.textContent
    ).toBe(siteContent.gatherings.body);
    expect(section?.querySelectorAll("ul")).toHaveLength(1);
    expect(
      Array.from(section?.querySelectorAll("li") ?? []).map((item) =>
        item.textContent?.trim()
      )
    ).toEqual(siteContent.gatherings.occasions);
    expect(section?.querySelector("a, button, form")).toBeNull();
    expect(section?.querySelector(".gatherings-section__image")).toHaveAttribute(
      "data-concept-only",
      "true"
    );
    expect(image).toHaveAttribute("alt", imagesByRole["gatherings-shared-table"].alt);
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "1536");
    expect(image).toHaveAttribute("height", "1024");
    expect(image).toHaveAttribute("srcset");
    expect(image).toHaveAttribute(
      "sizes",
      "(max-width: 820px) and (orientation: portrait) 100vw, 58vw"
    );
    expect(material).toHaveAttribute("alt", "");
    expect(material).toHaveAttribute("aria-hidden", "true");
    expect(material).toHaveAttribute("loading", "lazy");
    expect(material).toHaveAttribute("decoding", "async");
    expect(material).toHaveAttribute("width", "1024");
    expect(material).toHaveAttribute("height", "683");
    expect(material).toHaveAttribute("srcset");
    expect(container.querySelector(".planned-section-anchors #gatherings")).toBeNull();
  });

  it("renders Visit with one integrated end note and no separate footer", () => {
    const { container } = render(<App />);
    const section = container.querySelector("#visit");
    const image = section?.querySelector(".visit-section__image img");
    const paper = section?.querySelector(".visit-section__paper");
    const endNote = section?.querySelector(".visit-section__endnote");
    const whatsapp = section?.querySelector(`a[href="${WHATSAPP_URL}"]`);

    expect(container.querySelectorAll("#visit")).toHaveLength(1);
    expect(section).toHaveAttribute("aria-labelledby", "visit-title");
    expect(section).toHaveClass("visit-section", "viewport-chapter");
    expect(section?.querySelector("#visit-title")).toHaveTextContent(
      siteContent.visit.title
    );
    expect(section?.querySelector("address")).toHaveTextContent(
      siteContent.contact.addressText
    );
    expect(section).toHaveTextContent(siteContent.contact.whatsappNumber);
    expect(whatsapp).toHaveTextContent(siteContent.visit.ctaLabel);
    expect(
      section?.querySelectorAll(`a[href="${WHATSAPP_URL}"]`)
    ).toHaveLength(1);
    expect(section?.querySelector(".visit-section__guidance")).toBeNull();
    expect(section?.querySelector(".visit-section__detail-label")).toBeNull();
    expect(section?.querySelector("form")).toBeNull();
    expect(section?.querySelector('a[href*="maps"], a[href*="goo.gl"]')).toBeNull();
    expect(section?.querySelectorAll(".visit-section__endnote")).toHaveLength(1);
    expect(endNote?.tagName.toLowerCase()).toBe("small");
    expect(endNote).toHaveTextContent(siteContent.endNote.copyright);
    expect(endNote).not.toHaveTextContent(/\d{4}/);
    expect(container.querySelector('footer, [role="contentinfo"]')).toBeNull();
    expect(section?.querySelector(".visit-section__image")).toHaveAttribute(
      "data-concept-only",
      "true"
    );
    expect(image).toHaveAttribute(
      "alt",
      imagesByRole["visit-arrival-path"].alt
    );
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("width", "1586");
    expect(image).toHaveAttribute("height", "992");
    expect(image).toHaveAttribute("srcset");
    expect(image).toHaveAttribute("sizes", "100vw");
    expect(paper).toHaveAttribute("alt", "");
    expect(paper).toHaveAttribute("aria-hidden", "true");
    expect(paper).toHaveAttribute("loading", "lazy");
    expect(paper).toHaveAttribute("decoding", "async");
    expect(paper).toHaveAttribute("width", "1024");
    expect(paper).toHaveAttribute("height", "1536");
    expect(paper).toHaveAttribute("srcset");
    expect(paper).toHaveAttribute(
      "sizes",
      "(max-width: 820px) and (orientation: portrait) 100vw, (max-width: 700px) and (max-height: 440px) and (orientation: landscape) 82vw, (max-width: 920px) and (orientation: landscape) 72vw, 62vw"
    );
    expect(container.querySelector(".planned-section-anchors #visit")).toBeNull();
  });

  it("renders the Task 7 hero CTA and one visible Place section", () => {
    const { container } = render(<App />);

    const heroCta = container.querySelector(".hero-whatsapp");

    expect(heroCta).toHaveAttribute("href", WHATSAPP_URL);
    expect(heroCta).toHaveTextContent(siteContent.hero.ctaLabel);
    expect(container.querySelectorAll("#place")).toHaveLength(1);
    expect(container.querySelector("#place-title")).toHaveTextContent(
      siteContent.place.title
    );
  });

  it("keeps the future Cabin stays destination visible but unavailable", () => {
    const { container } = render(<App />);
    const marker = container.querySelector(".cabins-section__marker");

    expect(marker).toHaveTextContent("Cabin stays");
    expect(marker).toHaveAttribute("aria-disabled", "true");
    expect(marker?.tagName.toLowerCase()).toBe("span");
    expect(container.querySelector('a[href="/stays"]')).toBeNull();
  });

  it("keeps only the hero eager and gives primary below-fold images responsive delivery", () => {
    const { container } = render(<App />);
    const heroImage = container.querySelector(".threshold-hero__media img");
    const lazyImages = Array.from(
      container.querySelectorAll('main section img[loading="lazy"]')
    );
    const responsiveImages = Array.from(
      container.querySelectorAll(
        ".place-section__image > img, .cabins-section__image > img:not(.cabins-section__image-botanical), .open-air-section__image > img, .gatherings-section__image > img, .visit-section__image > img"
      )
    );

    expect(heroImage).toHaveAttribute("loading", "eager");
    expect(heroImage).toHaveAttribute("fetchpriority", "high");
    expect(lazyImages).toHaveLength(10);
    for (const image of lazyImages) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(Number(image.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(image.getAttribute("height"))).toBeGreaterThan(0);
    }
    expect(responsiveImages).toHaveLength(5);
    for (const image of responsiveImages) {
      expect(image).toHaveAttribute("srcset");
      expect(image.getAttribute("srcset")).not.toBe("");
      expect(image).toHaveAttribute("sizes");
    }
  });
});
