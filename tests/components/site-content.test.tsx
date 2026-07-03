import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { siteImages } from "../../src/content/images";
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

  it("keeps Task 7 hero and place copy in the registry", () => {
    expect(siteContent.hero.ctaLabel).toBe("WhatsApp Anvelia");
    expect(siteContent.hero.detailLine).toMatch(/Bentong, Pahang/i);
    expect(siteContent.hero.detailLine).toMatch(/450m/i);
    expect(siteContent.place.title).toBe("A place of quiet elevation");
    expect(siteContent.place.intro).toMatch(/foot of Genting Highlands/i);
    expect(siteContent.place.body).toMatch(/cooler evenings/i);
    expect(siteContent.place.body).toMatch(/fresh hillside air/i);
    expect(siteContent.place.facts.map((fact) => fact.label)).toEqual([
      "Elevation",
      "Setting",
      "Location"
    ]);
  });

  it("uses the approved nav labels", () => {
    expect(siteContent.nav.map((item) => item.label)).toEqual([
      "Place",
      "Cabins",
      "Gatherings",
      "Visit"
    ]);
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

    const cabinText = collectStrings(cabinSection).join(" ");

    expect(cabinText).not.toMatch(
      /\b(?:sleeps?|capacity|guests?|pax|rooms?|beds?|available|availability|package|packages|price|pricing|rates?|RM|MYR)\b/i
    );
    expect(cabinText).not.toMatch(/\b\d+\s*(?:cabins?|guests?|pax|rooms?)\b/i);
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
});

describe("image registry", () => {
  it("defines selected concept image records for the planned roles", () => {
    expect(siteImages.map((image) => image.role)).toEqual([
      "hero-threshold-arrival",
      "place-hillside-setting",
      "cabins",
      "cabin-timber-detail",
      "mobile-navigation-atmosphere",
      "open-air-living",
      "private-dinners-small-retreats",
      "visit-footer-atmosphere"
    ]);

    for (const image of siteImages) {
      expect(image.src).toBeTruthy();
      expect(image.alt).toMatch(/^Concept/);
      expect(image.conceptOnly).toBe(true);
    }
  });

  it("marks moodboard-only selections as reference-only records", () => {
    const referenceOnlyRoles = siteImages
      .filter((image) => image.publicationStatus === "reference-only")
      .map((image) => image.role);

    expect(referenceOnlyRoles).toEqual([
      "cabin-timber-detail",
      "private-dinners-small-retreats"
    ]);
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
});
