import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App";
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

  it("renders the three-movement Long Veranda narrative", () => {
    const { container } = render(<App />);
    const main = screen.getByRole("main");
    const movements = container.querySelectorAll("[data-rhythm-movement]");

    expect(main).toHaveAttribute("id", siteContent.accessibility.mainContentId);
    expect(main).toHaveClass("rhythm-page__main");
    expect(movements).toHaveLength(3);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A slower way to spend the day"
      })
    ).toHaveAttribute("id", "activities-page-title");
    expect(
      within(main)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent)
    ).toEqual([
      "A quieter interval",
      "Together, without hurry",
      "Let the day find its own pace"
    ]);
    expect(main.querySelector("button, form")).toBeNull();
  });

  it("discloses and responsively delivers each approved concept aperture", () => {
    const { container } = render(<App />);
    const figures = Array.from(
      container.querySelectorAll("figure[data-concept-only='true']")
    );

    expect(figures).toHaveLength(3);
    expect(figures.map((figure) => figure.getAttribute("data-image-role"))).toEqual([
      "activities-borrowed-light",
      "activities-water-interval",
      "activities-evening-warmth"
    ]);

    for (const [index, figure] of figures.entries()) {
      const image = figure.querySelector("img");

      expect(image).toHaveAttribute("alt");
      expect(image?.getAttribute("alt")).not.toBe("");
      expect(image).toHaveAttribute(
        "loading",
        index === 0 ? "eager" : "lazy"
      );
      expect(image).toHaveAttribute("decoding", "async");
      expect(image).toHaveAttribute("srcset");
      expect(image).toHaveAttribute("sizes");
    }
  });

  it("ends with one quiet route back to the Visit chapter", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: "Plan your visit" })
    ).toHaveAttribute("href", "/#visit");
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
        name: siteContent.activities.opening.title
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
