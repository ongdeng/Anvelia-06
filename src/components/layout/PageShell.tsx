import type { CSSProperties, ReactNode } from "react";
import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { SiteHeader } from "./SiteHeader";

type ShellStyle = CSSProperties & {
  "--mobile-menu-background-image": string;
};

type PageShellProps = {
  children?: ReactNode;
  hero: ReactNode;
};

const shellStyle: ShellStyle = {
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`
};

export function PageShell({ children, hero }: PageShellProps) {
  const { accessibility, hero: heroContent } = siteContent;
  const heroImage = imagesByRole["hero-threshold-arrival"];

  return (
    <>
      <a className="skip-link" href={`#${accessibility.mainContentId}`}>
        {accessibility.skipToContentLabel}
      </a>
      <div className="site-frame" style={shellStyle}>
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
            <picture className="threshold-hero__media" aria-hidden="true">
              <source media="(max-width: 820px)" srcSet={heroImage.smallSrc} />
              <img
                {...{ fetchpriority: "high" }}
                alt=""
                decoding="async"
                height={heroImage.height}
                loading="eager"
                src={heroImage.src}
                width={heroImage.width}
              />
            </picture>
            {hero}
          </section>
          {children}
        </main>
      </div>
    </>
  );
}
