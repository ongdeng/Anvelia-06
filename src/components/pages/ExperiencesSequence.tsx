import { FiArrowLeft } from "react-icons/fi";
import { imagesByRole, type SiteImage, type SiteImageRole } from "../../content/images";
import { siteContent } from "../../content/siteContent";
import { withBasePath } from "../../utils/basePath";

type Experience = {
  id: string;
  title: string;
  caption: string | null;
  imageRole: SiteImageRole;
};

function ExperienceFigure({ item, className, eager = false }: {
  item: Experience;
  className: string;
  eager?: boolean;
}) {
  const image: SiteImage = imagesByRole[item.imageRole];
  return <figure className={className} data-image-role={item.imageRole} data-concept-only={image.conceptOnly ? "true" : undefined}>
    <img {...(eager ? { fetchpriority: "high" } : {})} src={image.src} alt={image.alt}
      width={image.width} height={image.height} loading={eager ? "eager" : "lazy"} decoding="async" />
    <figcaption><h3>{item.title}</h3>{item.caption && <p>{item.caption}</p>}</figcaption>
  </figure>;
}

export function ExperiencesSequence() {
  const { accessibility, activities } = siteContent;
  const { movement, water, rituals, closing } = activities;
  const [court, atv, trek] = movement.items;
  const [pool, sauna, spring] = water.items;
  const etching = imagesByRole["activities-tea-etching"];

  return <main className="experiences-page__main" id={accessibility.mainContentId} tabIndex={-1} aria-labelledby="experience-title">
    <section className="spatial-movement" id="move-explore" aria-labelledby="movement-title">
      <header className="spatial-opening">
        <h1 id="experience-title">{activities.title}</h1>
        <h2 id="movement-title">{movement.title} <span className="spatial-heading__amp">&amp;</span> <em>{movement.emphasis}</em></h2>
      </header>
      <ExperienceFigure item={court} className="spatial-court" eager />
      <div className="spatial-outdoors">
        <ExperienceFigure item={atv} className="spatial-atv" />
        <ExperienceFigure item={trek} className="spatial-trek" />
      </div>
    </section>
    <div className="spatial-rest">
      <section className="spatial-water" id="water-warmth" aria-labelledby="water-title">
        <header className="spatial-water__heading"><h2 id="water-title">{water.title} <span className="spatial-heading__amp">&amp;</span> <br /><em>{water.emphasis}</em></h2></header>
        <ExperienceFigure item={pool} className="spatial-pool" />
        <div className="spatial-warmth">
          <ExperienceFigure item={sauna} className="spatial-sauna" />
          <ExperienceFigure item={spring} className="spatial-spring" />
        </div>
      </section>
      <div className="spatial-rituals">
        <div className="spatial-threshold" aria-hidden="true">
          <span className="spatial-threshold__contour" />
          <img className="spatial-threshold__botanical" src={etching.src} width={etching.width} height={etching.height} loading="lazy" decoding="async" alt="" />
        </div>
        <section className="ritual-composition" id="quiet-rituals" aria-labelledby="ritual-title">
          <header className="ritual-composition__heading"><h2 id="ritual-title">{rituals.title} <em>{rituals.emphasis}</em></h2></header>
          <div className="ritual-composition__spreads">
            {rituals.items.map(item => <ExperienceFigure key={item.id} item={item} className={`ritual-composition__figure ritual-composition__${item.id}`} />)}
          </div>
        </section>
      </div>
    </div>
    <footer className="spatial-return"><a href={withBasePath(closing.linkHref)}><FiArrowLeft aria-hidden="true" /><span>{closing.linkLabel}</span></a></footer>
  </main>;
}
