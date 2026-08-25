import { act, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const activitiesTitle = "Activities | Anvelia Sanctuary";
const activitiesDescription =
  "Rhythm at Anvelia Sanctuary, shaped by sunlight, natural wind, meditation, water, tea, and quiet gatherings on the hillside.";
const activitiesUrl = "https://ongdeng.github.io/Anvelia-06/activities/";

describe("route metadata startup", () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.unstubAllEnvs();
    window.history.pushState(null, "", "/");
  });

  it("selects Activities title, description, and Open Graph metadata", async () => {
    document.body.innerHTML = '<div id="root"></div>';
    document.title = "Anvelia Sanctuary";
    window.history.pushState(null, "", "/activities/");

    await act(async () => {
      await import("../../src/main");
    });

    expect(document.title).toBe(activitiesTitle);
    expect(
      document.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content
    ).toBe(activitiesDescription);
    expect(
      document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
        ?.content
    ).toBe(activitiesTitle);
    expect(
      document.querySelector<HTMLMetaElement>(
        'meta[property="og:description"]'
      )?.content
    ).toBe(activitiesDescription);
    expect(
      document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
        ?.content
    ).toBe(activitiesUrl);
    expect(
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
    ).toBe(activitiesUrl);
  });
});
