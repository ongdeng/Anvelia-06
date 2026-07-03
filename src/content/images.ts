import heroThresholdArrivalSrc from "../assets/images/anvelia-arrival-threshold-hero-concept-optimized.jpg";
import mobileNavigationOpenAirSrc from "../assets/images/anvelia-mobile-navigation-open-air-concept.jpg";
import mobileNavigationTimberSrc from "../assets/images/anvelia-mobile-navigation-timber-craft.jpg";
import placeHillsideSettingSrc from "../assets/images/anvelia-place-hillside-setting.jpg";

export type SiteImageRole =
  | "hero-threshold-arrival"
  | "place-hillside-setting"
  | "cabins"
  | "cabin-timber-detail"
  | "mobile-navigation-atmosphere"
  | "open-air-living"
  | "private-dinners-small-retreats"
  | "visit-footer-atmosphere";

export type SiteImage = {
  id: string;
  role: SiteImageRole;
  src: string;
  alt: string;
  conceptOnly: boolean;
  sourcePath: string;
  publicationStatus: "runtime-candidate" | "reference-only";
};

export const imagesByRole = {
  "hero-threshold-arrival": {
    id: "hero-threshold-arrival",
    role: "hero-threshold-arrival",
    src: heroThresholdArrivalSrc,
    alt: "Concept visual of a shaded arrival threshold in a hillside resort setting.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-arrival-threshold-hero-concept-optimized.jpg"
  },
  "place-hillside-setting": {
    id: "place-hillside-setting",
    role: "place-hillside-setting",
    src: placeHillsideSettingSrc,
    alt: "Concept visual for the hillside setting and surrounding greenery.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-sanctuary-background-v1-optimized.jpg"
  },
  cabins: {
    id: "cabins",
    role: "cabins",
    src: "assets/anvelia/01-current-production-candidates/anvelia-cabin-hero-optimized.jpg",
    alt: "Concept visual of cabin architecture in a quiet hillside resort setting.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-cabin-hero-optimized.jpg"
  },
  "cabin-timber-detail": {
    id: "cabin-timber-detail",
    role: "cabin-timber-detail",
    src: "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-timber-craft.jpg",
    alt: "Concept detail of timber craft textures for the cabin atmosphere.",
    conceptOnly: true,
    publicationStatus: "reference-only",
    sourcePath:
      "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-timber-craft.jpg"
  },
  "open-air-living": {
    id: "open-air-living",
    role: "open-air-living",
    src: mobileNavigationOpenAirSrc,
    alt: "Concept visual of open-air seating for shared hillside living.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-ritual-sharing-circle-v1-optimized.jpg"
  },
  "mobile-navigation-atmosphere": {
    id: "mobile-navigation-atmosphere",
    role: "mobile-navigation-atmosphere",
    src: mobileNavigationTimberSrc,
    alt: "Concept detail of rain on timber craft for the mobile navigation atmosphere.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-timber-craft.jpg"
  },
  "private-dinners-small-retreats": {
    id: "private-dinners-small-retreats",
    role: "private-dinners-small-retreats",
    src: "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-shared-table.jpg",
    alt: "Concept visual of a shared table for private dinners and small retreats.",
    conceptOnly: true,
    publicationStatus: "reference-only",
    sourcePath:
      "assets/anvelia/06-moodboard-thumbnails-mcp/vernacular-shared-table.jpg"
  },
  "visit-footer-atmosphere": {
    id: "visit-footer-atmosphere",
    role: "visit-footer-atmosphere",
    src:
      "assets/anvelia/01-current-production-candidates/anvelia-mist-forest-transition-optimized.jpg",
    alt: "Concept visual of mist and forest for the visit and footer atmosphere.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-mist-forest-transition-optimized.jpg"
  }
} as const satisfies Record<SiteImageRole, SiteImage>;

export const siteImages = [
  imagesByRole["hero-threshold-arrival"],
  imagesByRole["place-hillside-setting"],
  imagesByRole.cabins,
  imagesByRole["cabin-timber-detail"],
  imagesByRole["mobile-navigation-atmosphere"],
  imagesByRole["open-air-living"],
  imagesByRole["private-dinners-small-retreats"],
  imagesByRole["visit-footer-atmosphere"]
] as const satisfies readonly SiteImage[];
