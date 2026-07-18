import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { ViewportChapter } from "../layout/ViewportChapter";
import { WhatsAppLink } from "../ui/WhatsAppLink";

export function VisitSection() {
  const { contact, endNote, visit } = siteContent;
  const arrivalImage = imagesByRole["visit-arrival-path"];
  const paperImage = imagesByRole["visit-paper-background"];

  return (
    <ViewportChapter
      aria-labelledby="visit-title"
      className="visit-section"
      id={visit.id}
    >
      <figure
        className="visit-section__image"
        data-concept-only={arrivalImage.conceptOnly ? "true" : undefined}
      >
        <img
          alt={arrivalImage.alt}
          decoding="async"
          height={arrivalImage.height}
          loading="lazy"
          sizes="100vw"
          src={arrivalImage.src}
          srcSet={arrivalImage.srcSet}
          width={arrivalImage.width}
        />
      </figure>

      <img
        alt=""
        aria-hidden="true"
        className="visit-section__paper"
        decoding="async"
        height={paperImage.height}
        loading="lazy"
        sizes="(max-width: 820px) and (orientation: portrait) 100vw, (max-width: 700px) and (max-height: 440px) and (orientation: landscape) 82vw, (max-width: 920px) and (orientation: landscape) 72vw, 62vw"
        src={paperImage.src}
        srcSet={paperImage.srcSet}
        width={paperImage.width}
      />

      <div className="visit-section__panel">
        <div className="visit-section__content">
          <div className="visit-section__narrative">
            <p className="visit-section__eyebrow">{visit.eyebrow}</p>
            <h2 className="visit-section__title" id="visit-title">
              {visit.title}
            </h2>
            <p className="visit-section__intro">{visit.intro}</p>

            <WhatsAppLink
              accessibleLabel={visit.ctaAriaLabel}
              className="visit-section__whatsapp"
              label={visit.ctaLabel}
            />
          </div>

          <div className="visit-section__practical">
            <address className="visit-section__address">
              {contact.addressText}
            </address>
            <span className="visit-section__divider" aria-hidden="true" />
            <p className="visit-section__number">
              {contact.whatsappNumber}
            </p>
          </div>
        </div>
      </div>

      <small className="visit-section__endnote">
        {endNote.copyright}
      </small>
    </ViewportChapter>
  );
}
