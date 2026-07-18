import { PageShell } from "./components/layout/PageShell";
import { ActivitiesPage } from "./components/pages/ActivitiesPage";
import { CabinsSection } from "./components/sections/CabinsSection";
import { GatheringsSection } from "./components/sections/GatheringsSection";
import { HeroSection } from "./components/sections/HeroSection";
import { OpenAirLivingSection } from "./components/sections/OpenAirLivingSection";
import { PlaceSection } from "./components/sections/PlaceSection";
import { VisitSection } from "./components/sections/VisitSection";
import { PrimitivePreview } from "./components/ui/PrimitivePreview";
import { stripBasePath, withBasePath } from "./utils/basePath";

const unavailablePhaseTwoPaths = new Set(["/stays"]);

const getNormalizedPath = () =>
  typeof window === "undefined"
    ? "/"
    : stripBasePath(window.location.pathname);

if (typeof window !== "undefined") {
  if (unavailablePhaseTwoPaths.has(getNormalizedPath())) {
    window.history.replaceState(
      null,
      "",
      `${withBasePath("/")}${window.location.search}${window.location.hash}`
    );
  }
}

function App() {
  const normalizedPath = getNormalizedPath();

  if (
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "primitives"
  ) {
    return <PrimitivePreview />;
  }

  if (normalizedPath === "/activities") {
    return <ActivitiesPage />;
  }

  return (
    <PageShell hero={<HeroSection />}>
      <PlaceSection />
      <CabinsSection />
      <OpenAirLivingSection />
      <GatheringsSection />
      <VisitSection />
    </PageShell>
  );
}

export default App;
