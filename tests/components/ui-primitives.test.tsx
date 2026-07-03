import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/ui/Button";
import { ImageFrame } from "../../src/components/ui/ImageFrame";
import { PrimitivePreview } from "../../src/components/ui/PrimitivePreview";
import { SectionShell } from "../../src/components/ui/SectionShell";
import {
  WhatsAppLink,
  whatsappLinkDefaults
} from "../../src/components/ui/WhatsAppLink";
import { imagesByRole } from "../../src/content/images";
import { siteContent } from "../../src/content/siteContent";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const componentsCss = readFileSync(
  resolve(projectRoot, "src/styles/components.css"),
  "utf8"
);

describe("local UI primitives", () => {
  it("renders primary, secondary, and disabled button states", () => {
    const handleClick = vi.fn();

    render(
      <>
        <Button onClick={handleClick}>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "Primary" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Primary" })).toHaveClass(
      "ui-button--primary"
    );
    expect(screen.getByRole("button", { name: "Secondary" })).toHaveClass(
      "ui-button--secondary"
    );
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("prevents disabled anchor buttons from navigating or firing clicks", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled href="https://example.com" onClick={handleClick}>
        Anchor
      </Button>
    );

    const link = screen.getByRole("link", { name: "Anchor" });
    const eventAllowed = fireEvent.click(link);

    expect(eventAllowed).toBe(false);
    expect(handleClick).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("keeps WhatsApp link details centralized", () => {
    render(<WhatsAppLink />);

    const link = screen.getByRole("link", {
      name: siteContent.contact.whatsappAriaLabel
    });

    expect(whatsappLinkDefaults.href).toBe("https://wa.me/60136683113");
    expect(link).toHaveAttribute("href", whatsappLinkDefaults.href);
    expect(link).toHaveTextContent(siteContent.contact.whatsappLabel);
  });

  it("renders stable image frame variants with concept imagery", () => {
    render(
      <>
        <ImageFrame
          image={imagesByRole["hero-threshold-arrival"]}
          variant="threshold"
        />
        <ImageFrame image={imagesByRole["hero-threshold-arrival"]} />
      </>
    );

    const images = screen.getAllByRole("img", {
      name: imagesByRole["hero-threshold-arrival"].alt
    });

    expect(images[0].closest("figure")).toHaveClass("image-frame--threshold");
    expect(images[1].closest("figure")).toHaveClass("image-frame--landscape");
    expect(images[0].closest("figure")).toHaveAttribute(
      "data-concept-only",
      "true"
    );
  });

  it("renders section shells with heading, spacing, tone, and width variants", () => {
    render(
      <SectionShell
        eyebrow="Eyebrow"
        id="place"
        intro="Intro"
        spacing="generous"
        title="Place"
        tone="paper"
        width="wide"
      >
        <p>Body</p>
      </SectionShell>
    );

    const section = screen.getByRole("region", { name: "Place" });

    expect(section).toHaveClass("section-shell--generous");
    expect(section).toHaveClass("section-shell--paper");
    expect(section).toHaveClass("section-shell--wide");
    expect(screen.getByRole("heading", { name: "Place" })).toHaveAttribute(
      "id",
      "place-title"
    );
  });

  it("provides a Task 5 primitive preview surface", () => {
    render(<PrimitivePreview />);

    expect(
      screen.getByRole("main", { name: "Task 5 primitive preview" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Local UI Primitives" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  it("defines visual states and fixed aspect-ratio image variants in CSS", () => {
    expect(componentsCss).toContain(".ui-button:hover");
    expect(componentsCss).toContain(".ui-button:focus-visible");
    expect(componentsCss).toContain(".ui-button:disabled");
    expect(componentsCss).toContain(".section-shell--paper .ui-button--primary");
    expect(componentsCss).toContain(".section-shell--paper .ui-button--secondary");
    expect(componentsCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(componentsCss).toMatch(
      /\.image-frame--threshold\s*{[\s\S]*?aspect-ratio: 16 \/ 10;/
    );
    expect(componentsCss).toMatch(
      /\.image-frame--landscape\s*{[\s\S]*?aspect-ratio: 4 \/ 3;/
    );
    expect(componentsCss).toMatch(
      /\.image-frame--portrait\s*{[\s\S]*?aspect-ratio: 4 \/ 5;/
    );
    expect(componentsCss).toMatch(
      /\.image-frame--detail\s*{[\s\S]*?aspect-ratio: 1 \/ 1;/
    );
  });
});
