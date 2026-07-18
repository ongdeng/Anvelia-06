import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { withBasePath } from "../../utils/basePath";
import { ViewportChapter } from "../layout/ViewportChapter";

export function OpenAirLivingSection() {
  const { openAirLiving } = siteContent;
  const image = imagesByRole["open-air-living"];
  const botanical = imagesByRole["open-air-botanical-background"];

  return (
    <ViewportChapter
      aria-labelledby="open-air-living-title"
      className="open-air-section"
      id={openAirLiving.id}
    >
      <div className="open-air-section__copy">
        <img
          alt=""
          aria-hidden="true"
          className="open-air-section__botanical"
          decoding="async"
          height={botanical.height}
          loading="lazy"
          sizes="(max-width: 820px) 100vw, 38vw"
          src={botanical.src}
          srcSet={botanical.srcSet}
          width={botanical.width}
        />
        <p className="open-air-section__eyebrow">{openAirLiving.eyebrow}</p>
        <h2 className="open-air-section__title" id="open-air-living-title">
          {openAirLiving.title}
        </h2>
        <p className="open-air-section__intro">{openAirLiving.body}</p>
        <a
          className="open-air-section__passage"
          href={withBasePath(openAirLiving.markerHref)}
        >
          {openAirLiving.markerLabel}
        </a>
      </div>
      <figure
        className="open-air-section__image"
        data-concept-only={image.conceptOnly ? "true" : undefined}
      >
        <img
          alt={image.alt}
          decoding="async"
          height={image.height}
          loading="lazy"
          sizes="(max-width: 820px) 100vw, 62vw"
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
        />
      </figure>
    </ViewportChapter>
  );
}
