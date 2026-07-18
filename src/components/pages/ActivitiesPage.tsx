import type { CSSProperties } from "react";
import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { SiteHeader } from "../layout/SiteHeader";
import { ViewportChapter } from "../layout/ViewportChapter";

type ActivitiesPageStyle = CSSProperties & {
  "--mobile-menu-background-image": string;
};

const pageStyle: ActivitiesPageStyle = {
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`
};

export function ActivitiesPage() {
  const { accessibility, activities } = siteContent;
  const image = imagesByRole["open-air-living"];
  const botanical = imagesByRole["open-air-botanical-background"];

  return (
    <>
      <a className="skip-link" href={`#${accessibility.mainContentId}`}>
        {accessibility.skipToContentLabel}
      </a>
      <div className="activities-page site-frame" style={pageStyle}>
        <SiteHeader homeRooted />
        <main
          className="activities-page__main"
          id={accessibility.mainContentId}
          aria-labelledby="activities-page-title"
          tabIndex={-1}
        >
          <ViewportChapter
            aria-labelledby="activities-page-title"
            className="activities-chapter"
          >
            <div className="activities-chapter__copy">
              <img
                alt=""
                aria-hidden="true"
                className="activities-chapter__botanical"
                decoding="async"
                height={botanical.height}
                src={botanical.src}
                srcSet={botanical.srcSet}
                width={botanical.width}
              />
              <div className="activities-chapter__introduction">
                <p className="activities-chapter__eyebrow">
                  {activities.eyebrow}
                </p>
                <h1
                  className="activities-chapter__title"
                  id="activities-page-title"
                >
                  {activities.title}
                </h1>
                <p className="activities-chapter__intro">
                  {activities.intro}
                </p>
              </div>
              <div className="activities-chapter__moments">
                {activities.moments.map((moment) => (
                  <article
                    className="activities-chapter__moment"
                    key={moment.title}
                  >
                    <h2>{moment.title}</h2>
                    <p>{moment.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <figure
              className="activities-chapter__image"
              data-concept-only={image.conceptOnly ? "true" : undefined}
            >
              <img
                {...{ fetchpriority: "high" }}
                alt={image.alt}
                decoding="async"
                height={image.height}
                loading="eager"
                sizes="(max-width: 820px) and (orientation: portrait) 100vw, 44vw"
                src={image.src}
                srcSet={image.srcSet}
                width={image.width}
              />
            </figure>
          </ViewportChapter>
        </main>
      </div>
    </>
  );
}
