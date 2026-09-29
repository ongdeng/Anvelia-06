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
import activitiesBorrowedLightSrc from "../assets/images/anvelia-rhythm-borrowed-light-concept-1672.webp";
import activitiesBorrowedLight640Src from "../assets/images/anvelia-rhythm-borrowed-light-concept-640.webp";
import activitiesBorrowedLight1024Src from "../assets/images/anvelia-rhythm-borrowed-light-concept-1024.webp";
import activitiesEveningWarmthSrc from "../assets/images/anvelia-rhythm-evening-warmth-concept-1672.webp";
import activitiesEveningWarmth640Src from "../assets/images/anvelia-rhythm-evening-warmth-concept-640.webp";
import activitiesEveningWarmth1024Src from "../assets/images/anvelia-rhythm-evening-warmth-concept-1024.webp";
import activitiesWaterIntervalSrc from "../assets/images/anvelia-rhythm-water-interval-concept-1672.webp";
import activitiesWaterInterval640Src from "../assets/images/anvelia-rhythm-water-interval-concept-640.webp";
import activitiesWaterInterval1024Src from "../assets/images/anvelia-rhythm-water-interval-concept-1024.webp";
import activitiesPickleballSrc from "../assets/images/experiences/courtside-concept.png";
import activitiesAtvSrc from "../assets/images/experiences/atv-concept.png";
import activitiesJungleTrekkingSrc from "../assets/images/experiences/jungle-concept.png";
import activitiesSkyedgePoolSrc from "../assets/images/experiences/pool-concept.png";
import activitiesDrySaunaSrc from "../assets/images/experiences/beige-dry-sauna-concept.png";
import activitiesHotSpringSrc from "../assets/images/experiences/natural-hot-spring-concept.png";
import activitiesChineseTeaSrc from "../assets/images/experiences/chinese-tea-concept.png";
import activitiesYogaSrc from "../assets/images/experiences/yoga-concept.png";
import activitiesSoundHealingSrc from "../assets/images/experiences/sound-healing-concept.png";
import activitiesThaiMassageSrc from "../assets/images/experiences/thai-massage-concept.png";
import activitiesTeaEtchingSrc from "../assets/images/experiences/tea-sprig-etching.png";
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
  | "activities-borrowed-light"
  | "activities-water-interval"
  | "activities-evening-warmth"
  | "activities-pickleball"
  | "activities-atv"
  | "activities-jungle-trekking"
  | "activities-skyedge-pool"
  | "activities-dry-sauna"
  | "activities-hot-spring"
  | "activities-chinese-tea"
  | "activities-yoga"
  | "activities-sound-healing"
  | "activities-thai-massage"
  | "activities-tea-etching"
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
  publicationStatus: "phase-1-runtime-concept" | "reference-only";
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
    sourcePath:
      "assets/anvelia/09-generated-backgrounds/anvelia-botanical-background-light.png"
  },
  "activities-borrowed-light": {
    id: "activities-borrowed-light",
    role: "activities-borrowed-light",
    src: activitiesBorrowedLightSrc,
    srcSet: `${activitiesBorrowedLight640Src} 640w, ${activitiesBorrowedLight1024Src} 1024w, ${activitiesBorrowedLightSrc} 1672w`,
    width: 1672,
    height: 941,
    alt: "Concept visual of leaf shadows across warm plaster beside a dark timber post and hillside greenery.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-rhythm-borrowed-light-concept.png"
  },
  "activities-water-interval": {
    id: "activities-water-interval",
    role: "activities-water-interval",
    src: activitiesWaterIntervalSrc,
    srcSet: `${activitiesWaterInterval640Src} 640w, ${activitiesWaterInterval1024Src} 1024w, ${activitiesWaterIntervalSrc} 1672w`,
    width: 1672,
    height: 941,
    alt: "Concept visual of dark rippling water beside rain-wet stone.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-rhythm-water-interval-concept.png"
  },
  "activities-evening-warmth": {
    id: "activities-evening-warmth",
    role: "activities-evening-warmth",
    src: activitiesEveningWarmthSrc,
    srcSet: `${activitiesEveningWarmth640Src} 640w, ${activitiesEveningWarmth1024Src} 1024w, ${activitiesEveningWarmthSrc} 1672w`,
    width: 1672,
    height: 941,
    alt: "Concept visual of a rain-darkened timber table with a teapot and cup beside a sheltered green veranda.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-rhythm-evening-warmth-concept.png"
  },
  "activities-pickleball": {
    id: "activities-pickleball",
    role: "activities-pickleball",
    src: activitiesPickleballSrc,
    width: 1122,
    height: 1402,
    alt: "Concept image of a court and pickleball paddles; not the actual facility.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/courtside-concept.png"
  },
  "activities-atv": {
    id: "activities-atv",
    role: "activities-atv",
    src: activitiesAtvSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of an ATV beside a forest track; not actual equipment or a route.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/atv-concept.png"
  },
  "activities-jungle-trekking": {
    id: "activities-jungle-trekking",
    role: "activities-jungle-trekking",
    src: activitiesJungleTrekkingSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of hikers on a jungle path; not an actual route or guests.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/jungle-concept.png"
  },
  "activities-skyedge-pool": {
    id: "activities-skyedge-pool",
    role: "activities-skyedge-pool",
    src: activitiesSkyedgePoolSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of an infinity pool overlooking forested hills; not the actual facility or a verified outlook.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/pool-concept.png"
  },
  "activities-dry-sauna": {
    id: "activities-dry-sauna",
    role: "activities-dry-sauna",
    src: activitiesDrySaunaSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of a compact beige dry-sauna room; not the actual facility.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/beige-dry-sauna-concept.png"
  },
  "activities-hot-spring": {
    id: "activities-hot-spring",
    role: "activities-hot-spring",
    src: activitiesHotSpringSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of an outdoor natural hot spring; not the actual facility.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/natural-hot-spring-concept.png"
  },
  "activities-chinese-tea": {
    id: "activities-chinese-tea",
    role: "activities-chinese-tea",
    src: activitiesChineseTeaSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of Chinese tea being poured into celadon cups beside tropical greenery; not an actual session or facility.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/chinese-tea-concept.png"
  },
  "activities-yoga": {
    id: "activities-yoga",
    role: "activities-yoga",
    src: activitiesYogaSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of an adult practising a seated yoga stretch on a shaded timber veranda; not an actual guest or facility.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/yoga-concept.png"
  },
  "activities-sound-healing": {
    id: "activities-sound-healing",
    role: "activities-sound-healing",
    src: activitiesSoundHealingSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of a seated practitioner holding a mallet beside bronze singing bowls; not actual equipment or staff.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/sound-healing-concept.png"
  },
  "activities-thai-massage": {
    id: "activities-thai-massage",
    role: "activities-thai-massage",
    src: activitiesThaiMassageSrc,
    width: 1536,
    height: 1024,
    alt: "Concept image of a fully clothed Thai bodywork session on a floor mat; not actual staff, guests or facilities.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/thai-massage-concept.png"
  },
  "activities-tea-etching": {
    id: "activities-tea-etching",
    role: "activities-tea-etching",
    src: activitiesTeaEtchingSrc,
    width: 1024,
    height: 1536,
    alt: "Concept botanical etching of a tea sprig on a transparent background; decorative artwork, not a real plant or site.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath: "src/assets/images/experiences/tea-sprig-etching.png"
  },
  "mobile-navigation-atmosphere": {
    id: "mobile-navigation-atmosphere",
    role: "mobile-navigation-atmosphere",
    src: mobileNavigationTimberSrc,
    alt: "Concept detail of rain on timber craft for the mobile navigation atmosphere.",
    conceptOnly: true,
    publicationStatus: "phase-1-runtime-concept",
    sourcePath:
      "assets/anvelia/01-current-production-candidates/anvelia-mobile-navigation-timber-craft.jpg"
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
    publicationStatus: "phase-1-runtime-concept",
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
  imagesByRole["activities-borrowed-light"],
  imagesByRole["activities-water-interval"],
  imagesByRole["activities-evening-warmth"],
  imagesByRole["activities-pickleball"],
  imagesByRole["activities-atv"],
  imagesByRole["activities-jungle-trekking"],
  imagesByRole["activities-skyedge-pool"],
  imagesByRole["activities-dry-sauna"],
  imagesByRole["activities-hot-spring"],
  imagesByRole["activities-chinese-tea"],
  imagesByRole["activities-yoga"],
  imagesByRole["activities-sound-healing"],
  imagesByRole["activities-thai-massage"],
  imagesByRole["activities-tea-etching"],
  imagesByRole["gatherings-shared-table"],
  imagesByRole["gatherings-material-background"],
  imagesByRole["visit-arrival-path"],
  imagesByRole["visit-paper-background"]
] as const satisfies readonly SiteImage[];
