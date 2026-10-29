import { useEffect, type CSSProperties } from "react";
import "@fontsource/cormorant-garamond/latin-500.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { imagesByRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { staysContent, type StayPhoto, type StaysContent } from "../../content/staysContent";
import { withBasePath } from "../../utils/basePath";
import { SiteHeader } from "../layout/SiteHeader";
import "../../styles/stays.css";

type StaysPreviewStyle = CSSProperties & {
  "--mobile-menu-background-image": string;
};

const staysPreviewStyle: StaysPreviewStyle = {
  "--mobile-menu-background-image": `url(${imagesByRole["mobile-navigation-atmosphere"].src})`
};

function StayTemplateValue({ hint }: { hint?: string }) {
  return (
    <span className="stays-template__unconfirmed">
      <span className="stays-template__sr-only">Not yet confirmed</span>
      <span>{hint || "Add the confirmed details here."}</span>
    </span>
  );
}

function StayPhotoFrame({ photo, slot, showUnconfirmed }: {
  photo?: StayPhoto | null;
  slot: "exterior" | "interior";
  showUnconfirmed: boolean;
}) {
  const className = `stays-template__photo stays-template__photo--${slot}`;
  if (photo?.src.trim()) {
    return (
      <figure className={className}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading={slot === "exterior" ? "eager" : "lazy"} decoding="async" />
      </figure>
    );
  }
  if (!showUnconfirmed) return null;
  const label = `Cabin ${slot}`;
  const guidance = slot === "exterior"
    ? "A clear view of the cabin and its setting."
    : "The sleeping space, materials and natural light.";
  return (
    <figure className={`${className} stays-template__photo--blank`} role="group" aria-label={`${label} photo space`}>
      <figcaption>
        <span className="stays-template__photo-label">{label}</span>
        <span className="stays-template__photo-guidance">{guidance}</span>
      </figcaption>
    </figure>
  );
}

export function StaysTemplate({ content = staysContent, showUnconfirmed = false }: {
  content?: StaysContent;
  showUnconfirmed?: boolean;
}) {
  const essentials = content.essentials.facts.filter(fact => showUnconfirmed || fact.value?.trim());
  const amenities = content.essentials.amenities.map(item => item.trim()).filter(Boolean);
  const arrival = content.arrival.facts.filter(fact => showUnconfirmed || fact.value?.trim());
  const arrivalTimes = arrival.filter(fact => ["check-in", "check-out"].includes(fact.id));
  const arrivalDirections = arrival.filter(fact => !["check-in", "check-out"].includes(fact.id));
  const addressLines = content.arrival.address?.lines.map(line => line.trim()).filter(Boolean) ?? [];
  const arrivalNotes = content.arrival.notes?.trim();
  const hasInterior = !!content.photos?.interior?.src.trim() || showUnconfirmed;
  const hasExterior = !!content.photos?.exterior?.src.trim() || showUnconfirmed;
  const hasEssentials = essentials.length > 0 || amenities.length > 0 || hasInterior;
  const hasArrival = addressLines.length > 0 || arrival.length > 0 || !!arrivalNotes;
  const hasArrivalGroups = arrivalTimes.length > 0 && (addressLines.length > 0 || arrivalDirections.length > 0);

  return (
    <main
      aria-labelledby="stay-title"
      className={`stays-template${hasExterior ? " stays-template--folio" : ""}`}
      id={siteContent.accessibility.mainContentId}
      tabIndex={-1}
    >
      <header className="stays-template__intro stays-template__inner" id="stay-cabins" tabIndex={-1}>
        <div className="stays-template__arrival">
          <div className="stays-template__opening-copy">
            <div className="stays-template__name">
              <p className="stays-template__eyebrow">{content.placeLabel}</p>
              <h1 id="stay-title">{content.title}</h1>
            </div>
            <p className="stays-template__lead">{content.cabins.description}</p>
          </div>
          {hasExterior && <StayPhotoFrame photo={content.photos?.exterior} slot="exterior" showUnconfirmed={showUnconfirmed} />}
        </div>
      </header>

      {hasEssentials && (
        <section aria-labelledby="stay-essentials-title" className={`stays-template__section stays-template__section--essentials${hasInterior ? " stays-template__section--with-photo" : ""}`} id="stay-essentials" tabIndex={-1}>
          <div className="stays-template__section-grid stays-template__inner">
            <div className="stays-template__essentials-copy">
              <h2 id="stay-essentials-title">{content.essentials.title}</h2>
              {(essentials.length > 0 || amenities.length > 0) && (
                <div className="stays-template__body">
                  {essentials.length > 0 && (
                    <dl className="stays-template__facts">
                      {essentials.map(fact => (
                        <div key={fact.id}><dt>{fact.label}</dt><dd>{fact.value?.trim() || <StayTemplateValue hint={fact.templateHint} />}</dd></div>
                      ))}
                    </dl>
                  )}
                  {amenities.length > 0 && (
                    <ul aria-label="Cabin amenities" className="stays-template__amenities">
                      {amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <StayPhotoFrame photo={content.photos?.interior} slot="interior" showUnconfirmed={showUnconfirmed} />
          </div>
        </section>
      )}

      {hasArrival && (
        <section aria-labelledby="stay-arrival-title" className="stays-template__section stays-template__section--practical" id="stay-arrival" tabIndex={-1}>
          <div className="stays-template__section-grid stays-template__inner">
            <h2 id="stay-arrival-title">{content.arrival.title}</h2>
            <div className={`stays-template__body${hasArrivalGroups ? " stays-template__body--arrival-split" : ""}`}>
              {addressLines.length > 0 && (
                <div className="stays-template__address">
                  <p className="stays-template__label">{content.arrival.address?.label}</p>
                  <address>{addressLines.map(line => <span key={line}>{line}</span>)}</address>
                </div>
              )}
              {arrivalTimes.length > 0 && (
                <dl className="stays-template__times">
                  {arrivalTimes.map(fact => (
                    <div key={fact.id}><dt>{fact.label}</dt><dd>{fact.value?.trim() || <StayTemplateValue hint={fact.templateHint} />}</dd></div>
                  ))}
                </dl>
              )}
              {arrivalDirections.length > 0 && (
                <dl className="stays-template__facts">
                  {arrivalDirections.map(fact => (
                    <div key={fact.id}><dt>{fact.label}</dt><dd>{fact.value?.trim() || <StayTemplateValue hint={fact.templateHint} />}</dd></div>
                  ))}
                </dl>
              )}
              {arrivalNotes && <p>{arrivalNotes}</p>}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="stay-experiences-title" className="stays-template__section stays-template__section--experiences" id="stay-experiences" tabIndex={-1}>
        <div className="stays-template__section-grid stays-template__inner">
          <h2 id="stay-experiences-title">{content.experiences.title}</h2>
          <div className="stays-template__body">
            <p>{content.experiences.description}</p>
            <a className="stays-template__link" href={withBasePath(content.experiences.linkHref)}>
              {content.experiences.linkLabel}<FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="stays-template__closing stays-template__inner">
        <a className="stays-template__link" href={withBasePath(content.closing.linkHref)}>
          <FiArrowLeft aria-hidden="true" />{content.closing.linkLabel}
        </a>
      </footer>
    </main>
  );
}

export default function StaysPreview({ content = staysContent }: { content?: StaysContent }) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const robots = existingRobots ?? document.createElement("meta");
    const previousRobots = robots.content;
    document.title = `${content.title} | ${siteContent.brand.name}`;
    robots.name = "robots";
    robots.content = "noindex,nofollow";
    if (!existingRobots) document.head.appendChild(robots);

    let cancelled = false;
    const targetId = window.location.hash.slice(1);
    if (["stay-cabins", "stay-essentials", "stay-arrival", "stay-experiences"].includes(targetId)) {
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (cancelled) return;
        const target = document.getElementById(targetId);
        target?.scrollIntoView?.({ block: "start" });
        target?.focus({ preventScroll: true });
      });
    }

    return () => {
      cancelled = true;
      document.title = previousTitle;
      if (existingRobots) robots.content = previousRobots;
      else robots.remove();
    };
  }, [content.title]);

  return (
    <>
      <a className="skip-link" href={`#${siteContent.accessibility.mainContentId}`}>
        {siteContent.accessibility.skipToContentLabel}
      </a>
      <div className="rhythm-page site-frame stays-preview" style={staysPreviewStyle}>
        <SiteHeader homeRooted />
        <StaysTemplate content={content} showUnconfirmed />
      </div>
    </>
  );
}
