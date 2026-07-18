import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";

export function CabinsSection() {
  const { cabins } = siteContent;
  const image = imagesByRole.cabins;
  const botanicalBackground = imagesByRole["cabins-botanical-background"];
  return (
    <section
      aria-labelledby="cabins-title"
      className="cabins-section"
      id={cabins.id}
    >
      <figure
        className="cabins-section__image"
        data-concept-only={image.conceptOnly ? "true" : undefined}
      >
        <img
          alt={image.alt}
          decoding="async"
          height={image.height}
          loading="lazy"
          sizes="(max-width: 820px) 100vw, 48vw"
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
        />
        <img
          alt=""
          aria-hidden="true"
          className="cabins-section__image-botanical"
          decoding="async"
          height={botanicalBackground.height}
          loading="lazy"
          src={botanicalBackground.src}
          width={botanicalBackground.width}
        />
      </figure>
      <div className="cabins-section__panel">
        <div
          aria-hidden="true"
          className="cabins-section__background"
          data-concept-only={
            botanicalBackground.conceptOnly ? "true" : undefined
          }
        >
          <img
            alt=""
            decoding="async"
            height={botanicalBackground.height}
            loading="lazy"
            src={botanicalBackground.src}
            width={botanicalBackground.width}
          />
        </div>
        <p className="cabins-section__eyebrow">{cabins.eyebrow}</p>
        <h2 className="cabins-section__title" id="cabins-title">
          {cabins.titleLines.map((line, index) => (
            <span className="cabins-section__title-line" key={line}>
              {line}
              {index < cabins.titleLines.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <p className="cabins-section__intro">{cabins.intro}</p>
        {cabins.markerEnabled ? (
          <a
            aria-label={cabins.markerAriaLabel}
            className="cabins-section__marker"
            href={cabins.markerHref}
          >
            <span>{cabins.markerLabel}</span>
            <span className="cabins-section__marker-rule" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            aria-label={cabins.markerAriaLabel}
            className="cabins-section__marker"
          >
            <span>{cabins.markerLabel}</span>
            <span className="cabins-section__marker-rule" />
          </span>
        )}
      </div>
    </section>
  );
}
