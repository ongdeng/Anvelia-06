import { siteContent } from "../../content/siteContent";
import { WhatsAppLink } from "../ui/WhatsAppLink";

export function HeroSection() {
  const { accessibility, hero } = siteContent;

  return (
    <div className="hero-copy">
      <h1 id={accessibility.pageTitleId}>{hero.title}</h1>
      <p className="hero-subtitle">{hero.subtitle}</p>
      <span className="hero-rule" aria-hidden="true" />
      <p className="hero-lede">{hero.lede}</p>
      <p className="hero-detail">{hero.detailLine}</p>
      <div className="hero-actions">
        <WhatsAppLink className="hero-whatsapp" label={hero.ctaLabel} />
      </div>
    </div>
  );
}
