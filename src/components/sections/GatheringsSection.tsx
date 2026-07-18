import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { ViewportChapter } from "../layout/ViewportChapter";

export function GatheringsSection() {
  const { gatherings } = siteContent;
  const image = imagesByRole["gatherings-shared-table"];
  const material = imagesByRole["gatherings-material-background"];

  return (
    <ViewportChapter
      aria-labelledby="gatherings-title"
      className="gatherings-section"
      id={gatherings.id}
    >
      <figure
        className="gatherings-section__image"
        data-concept-only={image.conceptOnly ? "true" : undefined}
      >
        <img
          alt={image.alt}
          decoding="async"
          height={image.height}
          loading="lazy"
          sizes="(max-width: 820px) and (orientation: portrait) 100vw, 58vw"
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
        />
      </figure>
      <div className="gatherings-section__panel">
        <img
          alt=""
          aria-hidden="true"
          className="gatherings-section__material"
          decoding="async"
          height={material.height}
          loading="lazy"
          sizes="(max-width: 820px) and (orientation: portrait) 100vw, 42vw"
          src={material.src}
          srcSet={material.srcSet}
          width={material.width}
        />
        <p className="gatherings-section__eyebrow">{gatherings.eyebrow}</p>
        <h2 className="gatherings-section__title" id="gatherings-title">
          {gatherings.title}
        </h2>
        <p className="gatherings-section__intro">{gatherings.body}</p>
        <ul className="gatherings-section__occasions">
          {gatherings.occasions.map((occasion) => (
            <li key={occasion}>{occasion}</li>
          ))}
        </ul>
      </div>
    </ViewportChapter>
  );
}
