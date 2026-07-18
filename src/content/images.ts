import heroThresholdArrivalSrc from "../assets/images/anvelia-arrival-threshold-hero-concept-optimized-1600.webp";
import heroThresholdArrivalSmallSrc from "../assets/images/anvelia-arrival-threshold-hero-concept-optimized-960.webp";
import cabinsBotanicalBackgroundDarkSrc from "../assets/images/anvelia-botanical-background-dark-1600.webp";
import cabinCalmStaySrc from "../assets/images/anvelia-cabin-calm-stay-concept-1600.webp";
import cabinCalmStay640Src from "../assets/images/anvelia-cabin-calm-stay-concept-640.webp";
import cabinCalmStay1024Src from "../assets/images/anvelia-cabin-calm-stay-concept-1024.webp";
import gatheringsQuietReadinessSrc from "../assets/images/anvelia-gatherings-quiet-readiness-concept-1536.webp";
import gatheringsQuietReadiness640Src from "../assets/images/anvelia-gatherings-quiet-readiness-concept-640.webp";
import gatheringsQuietReadiness1024Src from "../assets/images/anvelia-gatherings-quiet-readiness-concept-1024.webp";
import gatheringsMaterialBackgroundSrc from "../assets/images/anvelia-gatherings-material-paper-1024.webp";
import gatheringsMaterialBackground640Src from "../assets/images/anvelia-gatherings-material-paper-640.webp";
import mobileNavigationTimberSrc from "../assets/images/anvelia-mobile-navigation-timber-craft.jpg";
import openAirBotanicalBackgroundSrc from "../assets/images/anvelia-botanical-background-light-1024.webp";
import openAirBotanicalBackground640Src from "../assets/images/anvelia-botanical-background-light-640.webp";
import openAirLivingSrc from "../assets/images/anvelia-open-air-living-veranda-concept-1536.webp";
import openAirLiving640Src from "../assets/images/anvelia-open-air-living-veranda-concept-640.webp";
import openAirLiving1024Src from "../assets/images/anvelia-open-air-living-veranda-concept-1024.webp";
import placeHillsideSettingSrc from "../assets/images/anvelia-place-hillside-setting-1600.webp";
import placeHillsideSetting640Src from "../assets/images/anvelia-place-hillside-setting-640.webp";
import placeHillsideSetting1024Src from "../assets/images/anvelia-place-hillside-setting-1024.webp";
import visitArrivalSrc from "../assets/images/anvelia-visit-arrival-path-concept-1586.webp";
import visitArrival640Src from "../assets/images/anvelia-visit-arrival-path-concept-640.webp";
import visitArrival960Src from "../assets/images/anvelia-visit-arrival-path-concept-960.webp";
import visitArrival1280Src from "../assets/images/anvelia-visit-arrival-path-concept-1280.webp";
import visitPaperSrc from "../assets/images/anvelia-visit-paper-field-1024.webp";
import visitPaper640Src from "../assets/images/anvelia-visit-paper-field-640.webp";

export type SiteImageRole =
  | "hero-threshold-arrival"
  | "place-hillside-setting"
  | "cabins"
  | "cabins-botanical-background"
  | "cabin-timber-detail"
  | "mobile-navigation-atmosphere"
  | "open-air-living"
  | "open-air-botanical-background"
  | "gatherings-shared-table"
  | "gatherings-material-background"
  | "visit-arrival-path"
  | "visit-paper-background";

export type SiteImage = {
  id: string;
  role: SiteImageRole;
  src: string;
  srcSet?: string;
  smallSrc?: string;
  width?: number;
  height?: number;
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
    smallSrc: heroThresholdArrivalSmallSrc,
    width: 1600,
    height: 900,
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
    srcSet: `${placeHillsideSetting640Src} 640w, ${placeHillsideSetting1024Src} 1024w, ${placeHillsideSettingSrc} 1600w`,
    width: 1600,
    height: 900,
    alt: "Concept visual for the hillside setting and surrounding greenery.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-sanctuary-background-v1-optimized.jpg"
  },
  cabins: {
    id: "cabins",
    role: "cabins",
    src: cabinCalmStaySrc,
    srcSet: `${cabinCalmStay640Src} 640w, ${cabinCalmStay1024Src} 1024w, ${cabinCalmStaySrc} 1600w`,
    width: 1600,
    height: 941,
    alt: "Concept visual of a timber cabin stay with a pitched roof, deck, warm interior light, and hillside greenery.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-cabin-calm-stay-concept.png"
  },
  "cabins-botanical-background": {
    id: "cabins-botanical-background",
    role: "cabins-botanical-background",
    src: cabinsBotanicalBackgroundDarkSrc,
    width: 1600,
    height: 900,
    alt: "Concept botanical engraving background for the cabins section.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/09-generated-backgrounds/anvelia-botanical-background-dark.png"
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
    src: openAirLivingSrc,
    srcSet: `${openAirLiving640Src} 640w, ${openAirLiving1024Src} 1024w, ${openAirLivingSrc} 1536w`,
    width: 1536,
    height: 1024,
    alt: "Concept visual of an open-air timber veranda with lounge seating and tea overlooking a green hillside.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-open-air-living-veranda-concept.png"
  },
  "open-air-botanical-background": {
    id: "open-air-botanical-background",
    role: "open-air-botanical-background",
    src: openAirBotanicalBackgroundSrc,
    srcSet: `${openAirBotanicalBackground640Src} 640w, ${openAirBotanicalBackgroundSrc} 1024w`,
    width: 1024,
    height: 576,
    alt: "Concept botanical drawing on warm paper for the Open-Air Living section.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/09-generated-backgrounds/anvelia-botanical-background-light.png"
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
  "gatherings-shared-table": {
    id: "gatherings-shared-table",
    role: "gatherings-shared-table",
    src: gatheringsQuietReadinessSrc,
    srcSet: `${gatheringsQuietReadiness640Src} 640w, ${gatheringsQuietReadiness1024Src} 1024w, ${gatheringsQuietReadinessSrc} 1536w`,
    width: 1536,
    height: 1024,
    alt: "Concept visual of a people-free timber pavilion after rain, with tea ware, a carafe, a notebook, and a pulled-back chair beside hillside greenery.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-gatherings-quiet-readiness-concept.png"
  },
  "gatherings-material-background": {
    id: "gatherings-material-background",
    role: "gatherings-material-background",
    src: gatheringsMaterialBackgroundSrc,
    srcSet: `${gatheringsMaterialBackground640Src} 640w, ${gatheringsMaterialBackgroundSrc} 1024w`,
    width: 1024,
    height: 683,
    alt: "Concept material background of warm handmade paper with subtle gathering-inspired embossing.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/09-generated-backgrounds/anvelia-gatherings-material-paper.png"
  },
  "visit-arrival-path": {
    id: "visit-arrival-path",
    role: "visit-arrival-path",
    src: visitArrivalSrc,
    srcSet: `${visitArrival640Src} 640w, ${visitArrival960Src} 960w, ${visitArrival1280Src} 1280w, ${visitArrivalSrc} 1586w`,
    width: 1586,
    height: 992,
    alt: "Concept visual of a stone arrival path through hillside planting, framed by a timber threshold and a warm lantern.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-visit-arrival-path-concept.png"
  },
  "visit-paper-background": {
    id: "visit-paper-background",
    role: "visit-paper-background",
    src: visitPaperSrc,
    srcSet: `${visitPaper640Src} 640w, ${visitPaperSrc} 1024w`,
    width: 1024,
    height: 1536,
    alt: "Concept warm-ivory handmade paper texture for the Visit section.",
    conceptOnly: true,
    publicationStatus: "runtime-candidate",
    sourcePath:
      "assets/anvelia/09-generated-backgrounds/anvelia-visit-paper-field.png"
  }
} as const satisfies Record<SiteImageRole, SiteImage>;

export const siteImages = [
  imagesByRole["hero-threshold-arrival"],
  imagesByRole["place-hillside-setting"],
  imagesByRole.cabins,
  imagesByRole["cabins-botanical-background"],
  imagesByRole["mobile-navigation-atmosphere"],
  imagesByRole["open-air-living"],
  imagesByRole["open-air-botanical-background"],
  imagesByRole["gatherings-shared-table"],
  imagesByRole["gatherings-material-background"],
  imagesByRole["visit-arrival-path"],
  imagesByRole["visit-paper-background"]
] as const satisfies readonly SiteImage[];
