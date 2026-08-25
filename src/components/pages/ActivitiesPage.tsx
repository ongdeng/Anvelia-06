import type { CSSProperties } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  imagesByRole,
  type SiteImage,
  type SiteImageRole
} from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { withBasePath } from "../../utils/basePath";
import { SiteHeader } from "../layout/SiteHeader";

type ActivitiesPageStyle = CSSProperties & {
  "--mobile-menu-background-image": string;
  "--rhythm-paper-image": string;
};

const pageStyle: ActivitiesPageStyle = {
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`,
  "--rhythm-paper-image": `url(${imagesByRole["visit-paper-background"].src})`
};

type RhythmApertureProps = {
  className: string;
  eager?: boolean;
  role: SiteImageRole;
  sizes: string;
};

function RhythmAperture({
  className,
  eager = false,
  role,
  sizes
}: RhythmApertureProps) {
  const image: SiteImage = imagesByRole[role];

  return (
    <figure
      className={`rhythm-aperture ${className}`}
      data-concept-only={image.conceptOnly ? "true" : undefined}
      data-image-role={role}
    >
      <img
        {...(eager ? { fetchpriority: "high" } : {})}
        alt={image.alt}
        decoding="async"
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        src={image.src}
        srcSet={image.srcSet}
        width={image.width}
      />
    </figure>
  );
}

export function ActivitiesPage() {
  const { accessibility, activities } = siteContent;
  const [restore, together] = activities.moments;

  return (
    <>
      <a className="skip-link" href={`#${accessibility.mainContentId}`}>
        {accessibility.skipToContentLabel}
      </a>
      <div className="rhythm-page site-frame" style={pageStyle}>
        <SiteHeader homeRooted />
        <main
          className="rhythm-page__main"
          id={accessibility.mainContentId}
          aria-labelledby="activities-page-title"
          tabIndex={-1}
        >
          <section
            aria-labelledby="activities-page-title"
            className="rhythm-movement rhythm-opening"
            data-rhythm-movement="light"
          >
            <div className="rhythm-copy rhythm-opening__copy">
              <p className="rhythm-eyebrow">{activities.opening.eyebrow}</p>
              <h1 className="rhythm-title" id="activities-page-title">
                {activities.opening.title}
              </h1>
              <p className="rhythm-body">{activities.opening.body}</p>
              <span className="rhythm-joinery-rule" aria-hidden="true" />
            </div>
            <RhythmAperture
              className="rhythm-opening__aperture"
              eager
              role={activities.opening.imageRole}
              sizes="(max-width: 820px) 92vw, 56vw"
            />
          </section>

          <section
            aria-labelledby="activities-restore-title"
            className="rhythm-movement rhythm-restore"
            data-rhythm-movement="water"
          >
            <div className="rhythm-copy rhythm-restore__copy">
              <p className="rhythm-eyebrow">{restore.eyebrow}</p>
              <h2 className="rhythm-title" id="activities-restore-title">
                {restore.title}
              </h2>
              <p className="rhythm-body">{restore.body}</p>
            </div>
            <RhythmAperture
              className="rhythm-restore__aperture"
              role={restore.imageRole}
              sizes="(max-width: 820px) 88vw, 63vw"
            />
            <span className="rhythm-restore__joint" aria-hidden="true" />
          </section>

          <section
            aria-labelledby="activities-together-title"
            className="rhythm-movement rhythm-evening"
            data-rhythm-movement="warmth"
          >
            <div className="rhythm-evening__field">
              <div className="rhythm-copy rhythm-evening__copy">
                <p className="rhythm-eyebrow">{together.eyebrow}</p>
                <h2 className="rhythm-title" id="activities-together-title">
                  {together.title}
                </h2>
                <p className="rhythm-body">{together.body}</p>
              </div>
            </div>
            <RhythmAperture
              className="rhythm-evening__aperture"
              role={together.imageRole}
              sizes="(max-width: 820px) 88vw, 52vw"
            />
          </section>

          <section
            aria-labelledby="activities-closing-title"
            className="rhythm-closing"
          >
            <h2 className="rhythm-closing__title" id="activities-closing-title">
              {activities.closing.title}
            </h2>
            <a
              className="rhythm-closing__link"
              href={withBasePath(activities.closing.linkHref)}
            >
              <span>{activities.closing.linkLabel}</span>
              <span className="rhythm-closing__link-line" aria-hidden="true">
                <FiArrowRight />
              </span>
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
