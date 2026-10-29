import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App";
import { siteContent } from "../../src/content/siteContent";
import StaysPreview, { StaysTemplate } from "../../src/components/pages/StaysPreview";
import { staysContent, type StaysContent } from "../../src/content/staysContent";

describe("private stays backbone", () => {
  beforeEach(() => window.history.pushState(null, "", "/?preview=stays"));
  afterEach(() => {
    cleanup();
    window.history.pushState(null, "", "/");
    vi.unstubAllEnvs();
  });

  it("opens a photo-ready private template with labeled blank facts and no invented details", async () => {
    render(<App />);
    const main = await screen.findByRole("main", { name: "Cabin stays" });
    expect(within(main).getByRole("heading", { level: 1 })).toHaveTextContent("Cabin stays");
    expect(main).toHaveAttribute("id", siteContent.accessibility.mainContentId);
    expect(main).toHaveAttribute("tabindex", "-1");
    expect(within(main).getAllByRole("heading", { level: 2 }).map(heading => heading.textContent))
      .toEqual(["The essentials", "Before you arrive", "Around Anvelia"]);
    expect(within(main).queryByRole("img")).not.toBeInTheDocument();
    expect(main.querySelector("picture, video, canvas, form, input, button")).toBeNull();
    expect(main.textContent).not.toMatch(/coming soon|lorem|TBD|sleeps|RM\s?\d/i);
    expect(within(main).getAllByText("Not yet confirmed")).toHaveLength(7);
    expect(main.querySelector('.stays-template__unconfirmed > [aria-hidden]')).toBeNull();
    expect(within(main).getByText("Guest limit, including any child restrictions.")).toBeVisible();
    expect(within(main).getByText("Bed types, quantities and sleeping areas.")).toBeVisible();
    expect(within(main).getByText("Final approach, parking and arrival instructions.")).toBeVisible();
    expect(within(main).getByText("A clear view of the cabin and its setting.")).toBeVisible();
    expect(within(main).getByText("The sleeping space, materials and natural light.")).toBeVisible();
    expect(within(main).getByRole("group", { name: "Cabin exterior photo space" })).toBeVisible();
    expect(within(main).getByRole("group", { name: "Cabin interior photo space" })).toBeVisible();
    const opening = document.getElementById("stay-cabins")!;
    expect(opening).toContainElement(within(main).getByRole("group", { name: "Cabin exterior photo space" }));
    expect(opening.querySelector(".stays-template__opening-copy"))
      .toContainElement(within(main).getByText(staysContent.cabins.description));
    const essentials = within(main).getByRole("region", { name: "The essentials" });
    const supportingPhoto = within(essentials).getByRole("group", { name: "Cabin interior photo space" });
    expect(within(essentials).getByText("Guests", { exact: true }).compareDocumentPosition(supportingPhoto)
      & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    const arrival = within(main).getByRole("region", { name: "Before you arrive" });
    expect(arrival.querySelector("address")).toHaveTextContent(siteContent.contact.addressLines.join(""));
    expect(within(arrival).getByText("Check-in")).toBeVisible();
    expect(within(arrival).getByText("Check-out")).toBeVisible();
    expect(within(main).queryByRole("navigation")).not.toBeInTheDocument();
    expect(within(main).getAllByRole("link").map(link => link.textContent))
      .toEqual(["Explore experiences", "Return to Cabins"]);
    expect(main.querySelector('a[href^="#stay-"]')).toBeNull();
    expect(within(main).getByRole("link", { name: "Explore experiences", exact: true }))
      .toHaveAttribute("href", "/activities/");
    expect(within(main).getByRole("link", { name: "Return to Cabins", exact: true }))
      .toHaveAttribute("href", "/#cabins");
  });

  it("keeps blank template markers opt-in and inserts supplied photos without changing the fact data", () => {
    const { rerender } = render(<StaysTemplate />);
    expect(screen.queryByText("Not yet confirmed")).not.toBeInTheDocument();
    expect(document.querySelector("figure")).toBeNull();
    rerender(<StaysTemplate showUnconfirmed content={{
      ...staysContent,
      photos: {
        exterior: { src: "/fixture-cabin.jpg", alt: "Fixture cabin exterior", width: 1600, height: 1000 },
        interior: null
      },
      essentials: {
        ...staysContent.essentials,
        facts: [{ ...staysContent.essentials.facts[0]!, value: "Confirmed guest value" }, ...staysContent.essentials.facts.slice(1)]
      }
    }} />);
    const photo = screen.getByRole("img", { name: "Fixture cabin exterior" });
    expect(photo).toHaveAttribute("src", "/fixture-cabin.jpg");
    expect(photo).toHaveAttribute("width", "1600");
    expect(photo).toHaveAttribute("height", "1000");
    expect(screen.queryByRole("group", { name: "Cabin exterior photo space" })).not.toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Cabin interior photo space" })).toBeVisible();
    expect(screen.getByText("Confirmed guest value").tagName).toBe("DD");
    expect(screen.queryByText("Guest limit, including any child restrictions.")).not.toBeInTheDocument();
    expect(screen.getAllByText("Not yet confirmed")).toHaveLength(6);
    expect(staysContent.essentials.facts.every(fact => fact.value === null)).toBe(true);
    expect(staysContent.photos).toEqual({ exterior: null, interior: null });
  });

  it("accepts isolated sample photos without changing the canonical stay data", () => {
    render(<StaysPreview content={{
      ...staysContent,
      title: "Sample cabin stay",
      photos: {
        exterior: { src: "/sample-exterior.webp", alt: "Sample timber cabin exterior", width: 1448, height: 1086 },
        interior: { src: "/sample-interior.webp", alt: "Sample timber cabin interior", width: 1122, height: 1402 }
      }
    }} />);
    const main = screen.getByRole("main", { name: "Sample cabin stay" });
    expect(within(main).getAllByRole("img")).toHaveLength(2);
    expect(within(main).getByRole("img", { name: "Sample timber cabin exterior" }))
      .toHaveAttribute("src", "/sample-exterior.webp");
    expect(within(main).getByRole("img", { name: "Sample timber cabin exterior" }))
      .toHaveAttribute("loading", "eager");
    expect(within(main).getByRole("img", { name: "Sample timber cabin interior" }))
      .toHaveAttribute("height", "1402");
    expect(within(main).getByRole("img", { name: "Sample timber cabin interior" }))
      .toHaveAttribute("loading", "lazy");
    expect(within(main).queryByRole("group", { name: /photo space/ })).not.toBeInTheDocument();
    expect(within(main).getAllByText("Not yet confirmed")).toHaveLength(7);
    expect(document.title).toBe("Sample cabin stay | Anvelia Sanctuary");
    expect(staysContent.photos).toEqual({ exterior: null, interior: null });
    expect(staysContent.essentials.facts.every(fact => fact.value === null)).toBe(true);
  });

  it("leads from one cabin introduction to the next section without a duplicate selection layer", () => {
    render(<StaysTemplate />);
    const opening = document.getElementById("stay-cabins")!;
    const title = screen.getByRole("heading", { level: 1, name: "Cabin stays" });
    const introduction = screen.getByText(staysContent.cabins.description);
    expect(opening.tagName).toBe("HEADER");
    expect(opening).toHaveAttribute("tabindex", "-1");
    expect(opening).toContainElement(title);
    expect(opening).toContainElement(introduction);
    expect(opening.querySelector("a, nav, button, select")).toBeNull();
    expect(introduction.compareDocumentPosition(document.getElementById("stay-experiences")!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(screen.getAllByText(staysContent.cabins.description)).toHaveLength(1);
    expect(screen.queryByRole("heading", { name: "The cabins", exact: true })).not.toBeInTheDocument();
  });

  it("grounds the folio in its confirmed place with concise stays-only copy", () => {
    render(<StaysTemplate />);
    const opening = document.getElementById("stay-cabins")!;
    expect(within(opening).getByText("Bukit Tinggi, Pahang")).toHaveClass("stays-template__eyebrow");
    expect(within(opening).getByText("Warm timber, soft light and greenery beyond the door."))
      .toHaveClass("stays-template__lead");
    expect(within(opening).queryByText(siteContent.brand.name)).not.toBeInTheDocument();
    expect(siteContent.cabins.intro).toContain("The cabins offer a place to settle in and rest.");
    expect(staysContent.essentials.facts.every(fact => fact.value === null)).toBe(true);
    expect(staysContent.arrival.facts.every(fact => fact.value === null)).toBe(true);
  });

  it("uses the supplied place label rather than reconstructing it from global content", () => {
    render(<StaysTemplate content={{ ...staysContent, placeLabel: "Confirmed place label" }} />);
    expect(screen.getByText("Confirmed place label")).toBeVisible();
    expect(screen.queryByText("Bukit Tinggi, Pahang")).not.toBeInTheDocument();
  });

  it("keeps the preview links within a configured Pages base", async () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    window.history.pushState(null, "", "/Anvelia-06/?preview=stays");
    render(<App />);
    const main = await screen.findByRole("main", { name: "Cabin stays" });
    expect(within(main).getByRole("link", { name: "Explore experiences", exact: true }))
      .toHaveAttribute("href", "/Anvelia-06/activities/");
    expect(within(main).getByRole("link", { name: "Return to Cabins", exact: true }))
      .toHaveAttribute("href", "/Anvelia-06/#cabins");
  });

  it("does not activate the preview or public stay link in a production build", () => {
    vi.stubEnv("DEV", false);
    render(<App />);
    expect(screen.queryByRole("main", { name: "Cabin stays" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Anvelia Sanctuary");
    expect(document.querySelector('a[href*="/stays"]')).toBeNull();
    expect(document.querySelector('[aria-disabled="true"][aria-label="Cabin stays"]'))
      .toBeInTheDocument();
  });

  it("places supplied essentials and arrival information before the single Experiences invitation", () => {
    const supplied: StaysContent = {
      ...staysContent,
      essentials: {
        ...staysContent.essentials,
        facts: [
          { id: "capacity", label: "Guests", value: "Host-confirmed occupancy" },
          { id: "sleeping", label: "Sleeping arrangements", value: "  " },
          { id: "bathroom", label: "Bathroom", value: null }
        ],
        amenities: ["Host-confirmed amenity", "  "]
      },
      arrival: {
        ...staysContent.arrival,
        facts: [{ id: "check-in", label: "Check-in", value: "Host-confirmed time" }],
        notes: "Host-confirmed arrival note."
      }
    };
    render(<StaysTemplate content={supplied} />);
    expect(screen.getAllByRole("heading", { level: 2 }).map(heading => heading.textContent))
      .toEqual(["The essentials", "Before you arrive", "Around Anvelia"]);
    expect(screen.getByText("Host-confirmed occupancy").tagName).toBe("DD");
    expect(screen.getByText("Host-confirmed time").tagName).toBe("DD");
    expect(screen.queryByText("Sleeping arrangements")).not.toBeInTheDocument();
    expect(screen.queryByText("Bathroom", { exact: true })).not.toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Cabin amenities" })).getAllByRole("listitem"))
      .toHaveLength(1);
    const main = screen.getByRole("main", { name: "Cabin stays" });
    expect(Array.from(main.children).map(element => element.id || element.tagName))
      .toEqual(["stay-cabins", "stay-essentials", "stay-arrival", "stay-experiences", "FOOTER"]);
    expect(within(main).queryByRole("navigation")).not.toBeInTheDocument();
    expect(within(main).getAllByRole("link").map(link => link.textContent))
      .toEqual(["Explore experiences", "Return to Cabins"]);
    expect(screen.getByText("Host-confirmed arrival note.")).toBeVisible();
  });

  it("allows amenities and arrival notes without producing empty fact tables", () => {
    render(<StaysTemplate content={{
      ...staysContent,
      essentials: { ...staysContent.essentials, amenities: ["Confirmed amenity"] },
      arrival: { ...staysContent.arrival, notes: "Confirmed arrival instructions." }
    }} />);
    expect(screen.getByRole("region", { name: "The essentials" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Before you arrive" })).toBeVisible();
    expect(document.querySelector("dl")).toBeNull();
  });

  it("keeps confirmed arrival times separate from directions and omits unknown times", () => {
    render(<StaysTemplate content={{
      ...staysContent,
      arrival: {
        ...staysContent.arrival,
        facts: [
          { id: "check-in", label: "Check-in", value: "Confirmed check-in time" },
          { id: "check-out", label: "Check-out", value: null },
          { id: "arrival", label: "Getting here", value: "Confirmed directions" }
        ]
      }
    }} />);
    const arrival = screen.getByRole("region", { name: "Before you arrive" });
    expect(arrival.querySelector("address")).toBeVisible();
    expect(arrival.querySelector(".stays-template__times")).toHaveTextContent("Confirmed check-in time");
    expect(arrival.querySelector(".stays-template__times")).not.toHaveTextContent("Confirmed directions");
    expect(within(arrival).queryByText("Check-out")).not.toBeInTheDocument();
    expect(within(arrival).getByText("Confirmed directions").tagName).toBe("DD");
  });

  it("hides blank strings just like unconfirmed null values", () => {
    const blankFacts = [{ id: "pending", label: "Pending information", value: " \n " }];
    render(<StaysTemplate content={{
      ...staysContent,
      essentials: { ...staysContent.essentials, facts: blankFacts, amenities: [" "] },
      arrival: { ...staysContent.arrival, address: { label: "Address", lines: [" ", "\n"] }, facts: blankFacts, notes: " " }
    }} />);
    expect(screen.queryByRole("region", { name: "The essentials" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Before you arrive" })).not.toBeInTheDocument();
    expect(screen.queryByText("Pending information")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("restores page metadata when leaving the local preview", () => {
    const previousTitle = document.title;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "index,follow";
    document.head.appendChild(robots);
    const { unmount } = render(<StaysPreview />);
    expect(document.title).toBe("Cabin stays | Anvelia Sanctuary");
    expect(robots.content).toBe("noindex,nofollow");
    unmount();
    expect(document.title).toBe(previousTitle);
    expect(robots.content).toBe("index,follow");
    robots.remove();
  });
});
