import { useEffect } from "react";
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

  useEffect(() => {
    if (normalizedPath !== "/") {
      return undefined;
    }

    let focusTimer: number | undefined;

    const focusCurrentChapter = () => {
      const encodedId = window.location.hash.slice(1);

      if (!encodedId) {
        return;
      }

      let destinationId: string;

      try {
        destinationId = decodeURIComponent(encodedId);
      } catch {
        return;
      }

      window.clearTimeout(focusTimer);
      focusTimer = window.setTimeout(() => {
        const destination = document.getElementById(destinationId);

        if (!destination) {
          return;
        }

        destination.setAttribute("tabindex", "-1");
        destination.scrollIntoView?.({ block: "start" });
        destination.focus({ preventScroll: true });
      }, 0);
    };

    focusCurrentChapter();
    window.addEventListener("hashchange", focusCurrentChapter);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("hashchange", focusCurrentChapter);
    };
  }, [normalizedPath]);

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
