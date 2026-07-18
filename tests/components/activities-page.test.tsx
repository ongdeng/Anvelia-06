import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App";
import { imagesByRole } from "../../src/content/images";
import { siteContent } from "../../src/content/siteContent";

describe("ActivitiesPage", () => {
  beforeEach(() => {
    window.history.pushState(null, "", "/activities");
  });

  afterEach(() => {
    cleanup();
    window.history.pushState(null, "", "/");
    vi.unstubAllEnvs();
  });

  it("renders one complete semantic Activities chapter from registry content", () => {
    const { container } = render(<App />);
    const main = screen.getByRole("main");
    const chapter = container.querySelector(".activities-chapter");

    expect(main).toHaveAttribute("id", siteContent.accessibility.mainContentId);
    expect(chapter).toHaveClass("viewport-chapter");
    expect(chapter).toHaveAttribute(
      "aria-labelledby",
      "activities-page-title"
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: siteContent.activities.title
      })
    ).toHaveAttribute("id", "activities-page-title");
    expect(chapter).toHaveTextContent(siteContent.activities.eyebrow);
    expect(chapter).toHaveTextContent(siteContent.activities.intro);
    expect(
      within(chapter as HTMLElement)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual(siteContent.activities.moments.map((moment) => moment.title));
    expect(chapter?.querySelectorAll("article")).toHaveLength(3);
    expect(chapter?.querySelector("button, form")).toBeNull();
  });

  it("discloses and responsively delivers the approved concept imagery", () => {
    const { container } = render(<App />);
    const figure = container.querySelector(".activities-chapter__image");
    const image = figure?.querySelector("img");
    const botanical = container.querySelector(
      ".activities-chapter__botanical"
    );

    expect(figure).toHaveAttribute("data-concept-only", "true");
    expect(image).toHaveAttribute("alt", imagesByRole["open-air-living"].alt);
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("srcset");
    expect(image).toHaveAttribute("sizes");
    expect(botanical).toHaveAttribute("alt", "");
    expect(botanical).toHaveAttribute("aria-hidden", "true");
    expect(botanical).toHaveAttribute("srcset");
  });

  it("keeps the rendered page free of operational and health claims", () => {
    render(<App />);

    const publicText = screen.getByRole("main").textContent ?? "";

    expect(publicText).not.toMatch(
      /\b(?:price|pricing|booking|detox|medical|clinic|treatment|programme|program|schedule|capacity|available|availability)\b/i
    );
  });

  it("activates Activities after stripping the configured Pages base", () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    window.history.pushState(null, "", "/Anvelia-06/activities/");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: siteContent.activities.title
      })
    ).toBeInTheDocument();
  });

  it("keeps the Activities passage inside the configured Pages base", () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    window.history.pushState(null, "", "/Anvelia-06/");

    render(<App />);

    expect(
      screen.getByRole("link", { name: siteContent.openAirLiving.markerLabel })
    ).toHaveAttribute("href", "/Anvelia-06/activities/");
  });
});
