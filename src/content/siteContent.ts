import type { SiteImageRole } from "./images";

export const WHATSAPP_URL = "https://wa.me/60136683113";
export const DEFAULT_LOCALE = "en";

export type Locale = "en";

export type NavItem = {
  label: "Place" | "Cabins" | "Gatherings" | "Visit";
  href: `#${string}`;
};

export type PlannedSectionId =
  | "place"
  | "cabins"
  | "open-air-living"
  | "gatherings"
  | "visit";

export type PlannedSection = {
  id: PlannedSectionId;
  title: string;
  navLabel?: NavItem["label"];
  imageRole: SiteImageRole;
  copy: string;
};

export const siteContentByLocale = {
  en: {
    locale: "en" as Locale,
    metadata: {
      title: "Anvelia Sanctuary",
      description:
        "A hillside resort at the foot of Genting Highlands, with cabin stays, open-air living, and small gatherings shaped by cooler hill air."
    },
    brand: {
      name: "Anvelia Sanctuary",
      wordmarkLines: ["Anvelia", "Sanctuary"],
      homeHref: "/",
      homeAriaLabel: "Anvelia Sanctuary home"
    },
    nav: [
      { label: "Place", href: "#place" },
      { label: "Cabins", href: "#cabins" },
      { label: "Gatherings", href: "#gatherings" },
      { label: "Visit", href: "#visit" }
    ] satisfies NavItem[],
    accessibility: {
      mainContentId: "main-content",
      pageTitleId: "page-title",
      primaryHeaderLabel: "Primary",
      siteSectionsLabel: "Site sections",
      mobileMenuLabel: "Mobile site sections",
      mobileMenuOpenLabel: "Open menu",
      mobileMenuCloseLabel: "Close menu",
      skipToContentLabel: "Skip to content",
      plannedSectionsLabel: "Planned phase 1 sections"
    },
    hero: {
      ariaLabel: "Anvelia Sanctuary arrival",
      title: "Anvelia Sanctuary",
      subtitle: "A hillside resort at the foot of Genting Highlands",
      lede:
        "Set around 450m above sea level, where cooler evenings and fresh hillside air shape a slower way to stay.",
      detailLine: "Bentong, Pahang, around 450m above sea level.",
      ctaLabel: "WhatsApp Anvelia"
    },
    place: {
      id: "place" as PlannedSectionId,
      eyebrow: "Place",
      title: "A place of quiet elevation",
      intro:
        "At the foot of Genting Highlands, Anvelia sits near Bentong, Pahang, in a hillside setting shaped by timber, greenery, and open air.",
      body:
        "Sunny days often settle into cooler evenings here. Around 450m above sea level, the rhythm slows as fresh hillside air moves through shaded paths, cabins, and quiet corners.",
      facts: [
        {
          label: "Elevation",
          value: "Around 450m above sea level"
        },
        {
          label: "Setting",
          value: "At the foot of Genting Highlands"
        },
        {
          label: "Location",
          value: "Bentong, Pahang, Malaysia"
        }
      ]
    },
    plannedSections: [
      {
        id: "place",
        title: "Place",
        navLabel: "Place",
        imageRole: "place-hillside-setting",
        copy:
          "A hillside setting near Bentong and Genting Highlands, shaped by mist, greenery, and cooler evenings around 450m above sea level."
      },
      {
        id: "cabins",
        title: "Cabins",
        navLabel: "Cabins",
        imageRole: "cabins",
        copy:
          "Quiet cabin stays shaped by timber, shade, and hill air, with space for unhurried mornings and easy evenings close to nature."
      },
      {
        id: "open-air-living",
        title: "Open-Air Living",
        imageRole: "open-air-living",
        copy:
          "Days can move between shaded decks, garden paths, shared meals, and quiet moments outdoors, guided by the weather and the hillside."
      },
      {
        id: "gatherings",
        title: "Gatherings",
        navLabel: "Gatherings",
        imageRole: "private-dinners-small-retreats",
        copy:
          "A calm setting for private dinners, small retreats, and hosted moments that feel close to the landscape."
      },
      {
        id: "visit",
        title: "Visit",
        navLabel: "Visit",
        imageRole: "visit-footer-atmosphere",
        copy:
          "For directions and stay enquiries, contact Anvelia Sanctuary on WhatsApp."
      }
    ] satisfies PlannedSection[],
    contact: {
      whatsappUrl: WHATSAPP_URL,
      whatsappLabel: "WhatsApp",
      whatsappAriaLabel: "Contact Anvelia Sanctuary on WhatsApp",
      addressLabel: "Address",
      addressLines: [
        "Lot 8421, Kampung Bukit Tinggi",
        "28750 Bentong, Pahang, Malaysia"
      ],
      addressText:
        "Lot 8421, Kampung Bukit Tinggi, 28750 Bentong, Pahang, Malaysia"
    },
    footer: {
      heading: "Anvelia Sanctuary",
      copy:
        "A hillside resort at the foot of Genting Highlands, open for thoughtful stays and small gatherings.",
      contactPrompt: "Contact Anvelia Sanctuary on WhatsApp."
    }
  }
} as const;

export const siteContent = siteContentByLocale[DEFAULT_LOCALE];
export type SiteContent = typeof siteContent;
