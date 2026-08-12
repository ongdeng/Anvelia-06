import type { CSSProperties } from "react";

import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";

export function PlaceSection() {
  const { place } = siteContent;
  const image = imagesByRole["place-hillside-setting"];
  const botanical = imagesByRole["open-air-botanical-background"];
  const copyStyle = {
    "--place-botanical-image": `url("${botanical.src}")`
  } as CSSProperties;

  return (
    <section
      aria-labelledby="place-title"
      className="place-section"
      id={place.id}
    >
      <div className="place-section__copy" style={copyStyle}>
        <p className="place-section__eyebrow">{place.eyebrow}</p>
        <h2 className="place-section__title" id="place-title">
          {place.title}
        </h2>
        <p className="place-section__intro">{place.intro}</p>
        <dl className="place-section__facts" aria-label="Place details">
          {place.facts.map((fact) => (
            <div className="place-section__fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure
        className="place-section__image"
        data-concept-only={image.conceptOnly ? "true" : undefined}
      >
        <img
          alt={image.alt}
          decoding="async"
          height={image.height}
          loading="lazy"
          sizes="(max-width: 820px) 100vw, 64vw"
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
        />
      </figure>
    </section>
  );
}
