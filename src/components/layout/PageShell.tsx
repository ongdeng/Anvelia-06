import type { CSSProperties, ReactNode } from "react";
import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { SiteHeader } from "./SiteHeader";

type HeroStyle = CSSProperties & {
  "--hero-background-image": string;
  "--mobile-menu-background-image": string;
};

type PageShellProps = {
  children?: ReactNode;
  hero: ReactNode;
};

const heroStyle: HeroStyle = {
  "--hero-background-image": `url(${imagesByRole["hero-threshold-arrival"].src})`,
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`
};

export function PageShell({ children, hero }: PageShellProps) {
  const { accessibility, hero: heroContent } = siteContent;

  return (
    <>
      <a className="skip-link" href={`#${accessibility.mainContentId}`}>
        {accessibility.skipToContentLabel}
      </a>
      <div className="site-frame" style={heroStyle}>
        <SiteHeader />
        <main
          className="site-shell"
          id={accessibility.mainContentId}
          aria-labelledby={accessibility.pageTitleId}
          tabIndex={-1}
        >
          <section
            className="threshold-hero"
            aria-label={heroContent.ariaLabel}
          >
            {hero}
          </section>
          {children}
        </main>
      </div>
    </>
  );
}
