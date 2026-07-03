import { PageShell } from "./components/layout/PageShell";
import { HeroSection } from "./components/sections/HeroSection";
import { PlaceSection } from "./components/sections/PlaceSection";
import { PrimitivePreview } from "./components/ui/PrimitivePreview";
import { siteContent } from "./content/siteContent";

function App() {
  if (
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "primitives"
  ) {
    return <PrimitivePreview />;
  }

  const { accessibility, plannedSections } = siteContent;

  return (
    <PageShell hero={<HeroSection />}>
      <PlaceSection />
      <div
        className="planned-section-anchors"
        aria-label={accessibility.plannedSectionsLabel}
      >
        {plannedSections
          .filter((section) => section.navLabel && section.id !== "place")
          .map((section) => (
            <section
              className="planned-section-anchor"
              id={section.id}
              key={section.id}
              tabIndex={-1}
            >
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
            </section>
          ))}
      </div>
    </PageShell>
  );
}

export default App;
