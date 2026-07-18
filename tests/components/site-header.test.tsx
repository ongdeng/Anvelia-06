import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "../../src/components/layout/SiteHeader";
import { siteContent } from "../../src/content/siteContent";

describe("SiteHeader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders the approved text-only wordmark and desktop navigation", () => {
    const { container } = render(<SiteHeader />);

    expect(container.querySelector(".brand-link img")).toBeNull();
    expect(
      screen.getByRole("link", { name: siteContent.brand.homeAriaLabel })
    ).toHaveTextContent("AnveliaSanctuary");

    const desktopNav = screen.getByRole("navigation", {
      name: siteContent.accessibility.siteSectionsLabel
    });

    expect(
      within(desktopNav)
        .getAllByRole("link")
        .map((link) => link.textContent)
    ).toEqual(siteContent.nav.map((item) => item.label));
  });

  it("keeps the WhatsApp action on the approved URL", () => {
    render(<SiteHeader />);

    const whatsappLinks = screen.getAllByRole("link", {
      name: siteContent.contact.whatsappAriaLabel
    });

    expect(whatsappLinks[0]).toHaveAttribute(
      "href",
      "https://wa.me/60136683113"
    );
  });

  it("home-roots desktop and mobile section anchors on a secondary page", () => {
    render(<SiteHeader homeRooted />);

    const desktopNav = screen.getByRole("navigation", {
      name: siteContent.accessibility.siteSectionsLabel
    });

    expect(
      within(desktopNav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual([
      "/#place",
      "/#cabins",
      "/#open-air-living",
      "/#gatherings",
      "/#visit"
    ]);

    fireEvent.click(
      screen.getByRole("button", {
        name: siteContent.accessibility.mobileMenuOpenLabel
      })
    );

    const mobileNav = screen.getByRole("navigation", {
      name: siteContent.accessibility.mobileMenuLabel
    });

    expect(
      within(mobileNav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual([
      "/#place",
      "/#cabins",
      "/#open-air-living",
      "/#gatherings",
      "/#visit"
    ]);
  });

  it("keeps brand and secondary anchors inside the configured Pages base", () => {
    vi.stubEnv("BASE_URL", "/Anvelia-06/");
    render(<SiteHeader homeRooted />);

    expect(
      screen.getByRole("link", { name: siteContent.brand.homeAriaLabel })
    ).toHaveAttribute("href", "/Anvelia-06/");

    const desktopNav = screen.getByRole("navigation", {
      name: siteContent.accessibility.siteSectionsLabel
    });

    expect(
      within(desktopNav)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual([
      "/Anvelia-06/#place",
      "/Anvelia-06/#cabins",
      "/Anvelia-06/#open-air-living",
      "/Anvelia-06/#gatherings",
      "/Anvelia-06/#visit"
    ]);
  });

  it("opens the full-size mobile menu, closes it with Escape, and returns focus", async () => {
    const { container } = render(<SiteHeader />);

    const menuButton = screen.getByRole("button", {
      name: siteContent.accessibility.mobileMenuOpenLabel
    });

    menuButton.focus();
    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", {
        name: siteContent.accessibility.mobileMenuLabel
      })
    ).toBeInTheDocument();
    expect(container.querySelector(".mobile-nav-panel")).not.toHaveAttribute(
      "hidden"
    );
    expect(
      within(container.querySelector(".mobile-nav-panel") as HTMLElement)
        .getByRole("link", {
          name: siteContent.contact.whatsappAriaLabel
        })
    ).toHaveAttribute("href", siteContent.contact.whatsappUrl);
    expect(container.querySelector(".mobile-nav-panel")).toHaveTextContent(
      siteContent.contact.addressLines.join(", ")
    );

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(menuButton).toHaveFocus();
    });
  });

  it("closes the mobile menu after a mobile nav link is selected", () => {
    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", {
      name: siteContent.accessibility.mobileMenuOpenLabel
    });

    fireEvent.click(menuButton);

    const mobileNav = screen.getByRole("navigation", {
      name: siteContent.accessibility.mobileMenuLabel
    });

    fireEvent.click(within(mobileNav).getByRole("link", { name: "Cabins" }));

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", {
        name: siteContent.accessibility.mobileMenuLabel
      })
    ).not.toBeInTheDocument();
  });

  it("keeps background header links out of the tab order while the mobile menu is open", () => {
    render(<SiteHeader />);

    fireEvent.click(
      screen.getByRole("button", {
        name: siteContent.accessibility.mobileMenuOpenLabel
      })
    );

    expect(
      screen.getByRole("link", { name: siteContent.brand.homeAriaLabel })
    ).toHaveAttribute("tabindex", "-1");
    expect(
      screen.getAllByRole("link", {
        name: siteContent.contact.whatsappAriaLabel
      })[0]
    ).toHaveAttribute("tabindex", "-1");
  });
});
