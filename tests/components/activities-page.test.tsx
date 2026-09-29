import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App";
import { siteContent } from "../../src/content/siteContent";

describe("ActivitiesPage", () => {
  beforeEach(() => window.history.pushState(null, "", "/activities/"));
  afterEach(() => {
    cleanup();
    window.history.pushState(null, "", "/");
    vi.unstubAllEnvs();
  });

  it("promotes the approved three chapters and ten activities in order", () => {
    render(<App />);
    const main = screen.getByRole("main", { name: "Experiences" });
    expect(main).toHaveAttribute("id", siteContent.accessibility.mainContentId);
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(within(main).getAllByRole("heading", { level: 2 }).map(node => node.textContent))
      .toEqual(["Move & Explore", "Water & Warmth", "Quiet rituals"]);
    expect(within(main).getAllByRole("heading", { level: 3 }).map(node => node.textContent))
      .toEqual(["Pickleball", "ATV", "Jungle trekking", "Skyedge pool", "Dry sauna", "Natural hot spring", "Chinese tea", "Yoga", "Sound healing", "Thai massage"]);
    expect(within(main).getAllByRole("region").map(node => node.id))
      .toEqual(["move-explore", "water-warmth", "quiet-rituals"]);
  });

  it("bundles all ten truthful concept images without depending on preview URLs", () => {
    render(<App />);
    const figures = within(screen.getByRole("main")).getAllByRole("figure");
    expect(figures).toHaveLength(10);
    for (const [index, figure] of figures.entries()) {
      const image = within(figure).getByRole("img");
      expect(figure).toHaveAttribute("data-concept-only", "true");
      expect(image).toHaveAttribute("alt", expect.stringMatching(/^Concept .*not /));
      expect(image.getAttribute("src")).not.toMatch(/outputs|\.\.\//);
      expect(image).toHaveAttribute("loading", index === 0 ? "eager" : "lazy");
      expect(image).toHaveAttribute("decoding", "async");
      expect(image).toHaveAttribute("width");
      expect(image).toHaveAttribute("height");
      expect(figure.querySelector("figcaption")).toContainElement(within(figure).getByRole("heading", { level: 3 }));
    }
  });

  it("retains the approved captions and a single quiet return to Rhythm", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(within(main).getByText("Korean-style dry heat.")).toBeVisible();
    expect(within(main).getByText("Naturally warm water, beneath the open sky.")).toBeVisible();
    expect(within(main).getByText("A quiet moment for traditional Thai bodywork.")).toBeVisible();
    const link = within(main).getByRole("link", { name: "Return to Rhythm" });
    expect(within(main).getAllByRole("link")).toEqual([link]);
    expect(link).toHaveAttribute("href", "/#open-air-living");
    expect(main.querySelector("button, form")).toBeNull();
    expect(main).not.toHaveTextContent(/\b(?:pricing|booking|whatsapp|detox|medical|clinic|treatment|availability)\b/i);
    expect(main).not.toHaveTextContent(/conceptual|visual preview/i);
  });

  it("keeps the transition drawing decorative", () => {
    render(<App />);
    const main = screen.getByRole("main");
    const drawing = within(main).getByAltText("");
    expect(drawing.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(within(main).getAllByRole("img")).toHaveLength(10);
  });

  it("activates Experiences and keeps its return link within the Pages base", () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    window.history.pushState(null, "", "/Anvelia-06/activities/");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Experiences" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Return to Rhythm" }))
      .toHaveAttribute("href", "/Anvelia-06/#open-air-living");
  });

  it("keeps the existing homepage passage and route unchanged", () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    window.history.pushState(null, "", "/Anvelia-06/");
    render(<App />);
    expect(screen.getByRole("link", { name: "See activities" }))
      .toHaveAttribute("href", "/Anvelia-06/activities/");
  });
});
