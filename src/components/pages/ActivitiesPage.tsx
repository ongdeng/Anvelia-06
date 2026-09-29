import { useEffect, type CSSProperties } from "react";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { SiteHeader } from "../layout/SiteHeader";
import { ExperiencesSequence } from "./ExperiencesSequence";

type ExperiencesStyle = CSSProperties & {
  "--mobile-menu-background-image": string;
  "--spatial-paper": string;
};

const pageStyle: ExperiencesStyle = {
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`,
  "--spatial-paper": `url(${imagesByRole["visit-paper-background"].src})`
};

export function ActivitiesPage() {
  const { accessibility } = siteContent;

  useEffect(() => {
    const id = window.location.hash.slice(1);
    let cancelled = false;
    if (["move-explore", "water-warmth", "quiet-rituals"].includes(id)) {
      // Direct chapter links settle after the display fonts establish their metrics.
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (!cancelled) document.getElementById(id)?.scrollIntoView?.({ behavior: "instant", block: "start" });
      });
    }
    return () => { cancelled = true; };
  }, []);

  return <>
    <a className="skip-link" href={`#${accessibility.mainContentId}`}>
      {accessibility.skipToContentLabel}
    </a>
    <div className="rhythm-page site-frame experiences-page" style={pageStyle}>
      <SiteHeader homeRooted />
      <ExperiencesSequence />
    </div>
  </>;
}
