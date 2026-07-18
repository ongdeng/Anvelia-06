import type { SiteImageRole } from "./images";

export const WHATSAPP_URL = "https://wa.me/60136683113";
export const DEFAULT_LOCALE = "en";

export type Locale = "en";

export type NavItemId =
  | "place"
  | "cabins"
  | "rhythm"
  | "gatherings"
  | "visit";

export type NavItemHref =
  | "#place"
  | "#cabins"
  | "#open-air-living"
  | "#gatherings"
  | "#visit";

export type NavItem = {
  id: NavItemId;
  label: string;
  href: NavItemHref;
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
  navLabel?: string;
  imageRole: SiteImageRole;
  copy: string;
};

const englishGatherings = {
  id: "gatherings" as PlannedSectionId,
  eyebrow: "Gatherings",
  title: "A quieter way to gather",
  body:
    "Time together takes on a gentler rhythm here, shaped by timber, greenery and the hillside.",
  occasions: [
    "Private dinners",
    "Small corporate retreats",
    "Wellness retreats"
  ]
} as const;

export const siteContentByLocale = {
  en: {
    locale: "en" as Locale,
    metadata: {
      title: "Anvelia Sanctuary",
      description:
        "A hillside resort at the foot of Genting Highlands, with cabin stays, open-air living, and quiet gatherings shaped by cooler evenings and fresh hillside air."
    },
    brand: {
      name: "Anvelia Sanctuary",
      wordmarkLines: ["Anvelia", "Sanctuary"],
      homeHref: "/",
      homeAriaLabel: "Anvelia Sanctuary home"
    },
    nav: [
      { id: "place", label: "Place", href: "#place" },
      { id: "cabins", label: "Cabins", href: "#cabins" },
      { id: "rhythm", label: "Rhythm", href: "#open-air-living" },
      { id: "gatherings", label: "Gatherings", href: "#gatherings" },
      { id: "visit", label: "Visit", href: "#visit" }
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
      plannedSectionsLabel: "More about Anvelia"
    },
    hero: {
      ariaLabel: "Anvelia Sanctuary arrival",
      title: "Anvelia Sanctuary",
      subtitle: "A hillside resort at the foot of Genting Highlands",
      lede:
        "Set around 450m above sea level, where cooler evenings and fresh hillside air shape a slower way to stay.",
      detailLine: "Bentong, Pahang, Malaysia.",
      ctaLabel: "WhatsApp Anvelia"
    },
    place: {
      id: "place" as PlannedSectionId,
      eyebrow: "Place",
      title: "A place of quiet elevation",
      intro:
        "Here, the hillside is shaped by timber, layered greenery, and open air, with a sense of distance from the city's faster rhythm.",
      body:
        "Sunny days often settle into cooler evenings here, while fresh hillside air moves through timber, greenery, and open-air spaces as the rhythm begins to slow.",
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
    cabins: {
      id: "cabins" as PlannedSectionId,
      eyebrow: "Cabins",
      title: "Cabins in nature's embrace",
      titleLines: ["Cabins in", "nature's embrace"],
      intro:
        "Timber cabins settle into the hillside, where warm interiors, natural materials, and thoughtful details create a quieter rhythm for rest.",
      markerLabel: "Cabin stays",
      markerHref: "/stays",
      markerEnabled: false,
      markerAriaLabel: "Cabin stays details"
    },
    openAirLiving: {
      id: "open-air-living" as PlannedSectionId,
      eyebrow: "Rhythm",
      title: "Living with the hillside",
      body:
        "Sheltered by timber and greenery, open-air spaces invite slow mornings, afternoon tea and quiet conversation as cooler evening air settles across the hillside.",
      markerLabel: "See activities",
      markerHref: "/activities"
    },
    activities: {
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
    },
    gatherings: englishGatherings,
    visit: {
      id: "visit" as PlannedSectionId,
      eyebrow: "Visit",
      title: "Come and see Anvelia",
      intro:
        "The doors are open in the quieter hills of Bukit Tinggi, at the foot of Genting Highlands.",
      ctaLabel: "Plan your visit",
      ctaAriaLabel: "Plan your visit with Anvelia Sanctuary on WhatsApp"
    },
    plannedSections: [
      {
        id: "place",
        title: "Place",
        navLabel: "Place",
        imageRole: "place-hillside-setting",
        copy:
          "A hillside setting near Bentong and Genting Highlands, shaped by greenery, fresh air, and cooler evenings."
      },
      {
        id: "cabins",
        title: "Cabins",
        navLabel: "Cabins",
        imageRole: "cabins",
        copy:
          "Timber cabins nestled into the hillside, shaped by natural materials, thoughtful details, and a quieter rhythm close to nature."
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
        imageRole: "gatherings-shared-table",
        copy: englishGatherings.body
      },
      {
        id: "visit",
        title: "Visit",
        navLabel: "Visit",
        imageRole: "visit-arrival-path",
        copy:
          "The doors are open in the quieter hills of Bukit Tinggi, at the foot of Genting Highlands."
      }
    ] satisfies PlannedSection[],
    contact: {
      whatsappUrl: WHATSAPP_URL,
      whatsappLabel: "WhatsApp",
      whatsappNumber: "+60 13-668 3113",
      whatsappAriaLabel: "Contact Anvelia Sanctuary on WhatsApp",
      addressLabel: "Address",
      addressLines: [
        "Lot 8421, Kampung Bukit Tinggi",
        "28750 Bentong, Pahang, Malaysia"
      ],
      addressText:
        "Lot 8421, Kampung Bukit Tinggi, 28750 Bentong, Pahang, Malaysia"
    },
    endNote: {
      copyright: "\u00A9 Anvelia Sanctuary"
    }
  }
} as const;

export const siteContent = siteContentByLocale[DEFAULT_LOCALE];
export type SiteContent = typeof siteContent;
