import React from "react";
import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ExperiencesSequence } from "../../src/components/pages/ExperiencesSequence";

afterEach(cleanup);

it("uses consistent genuine serif contrast and balanced massage copy", () => {
  const stylesheet = document.createElement("style");
  // Load the real stylesheet; this project's Vitest setup stubs CSS imports.
  stylesheet.textContent = readFileSync("src/styles/experiences.css", "utf8");
  document.head.appendChild(stylesheet);
  try {
    render(<div className="experiences-page"><ExperiencesSequence /></div>);
    const title = getComputedStyle(screen.getByRole("heading", { level: 1 }));
    const chapter = getComputedStyle(screen.getByRole("heading", { name: "Move & Explore" }));
    expect(title.fontFamily).toBe(chapter.fontFamily);
    expect(Number(title.fontWeight)).toBeGreaterThan(Number(chapter.fontWeight));
    expect(parseFloat(title.fontSize)).toBeLessThan(parseFloat(chapter.fontSize));
    expect(parseFloat(chapter.fontSize) / parseFloat(title.fontSize)).toBeGreaterThanOrEqual(1.5);
    expect(title.getPropertyValue("font-synthesis")).toBe("none");
    expect(title.fontSize).toBe("22px");
    expect(title.lineHeight).toBe("28px");
    const italic = getComputedStyle(screen.getByText("Explore", { exact: true }));
    expect(italic.fontStyle).toBe("italic");
    expect(italic.fontWeight).toBe("400");
    expect(italic.getPropertyValue("font-synthesis")).toBe("none");
    const activities = screen.getAllByRole("heading", { level: 3 });
    expect(activities).toHaveLength(10);
    for (const activity of activities) {
      const style = getComputedStyle(activity);
      expect(style.fontWeight, activity.textContent).toBe("500");
      expect(style.getPropertyValue("font-synthesis")).toBe("none");
    }
    const warmth = screen.getByRole("heading", { name: "Water & Warmth" }).querySelector("em");
    expect(warmth).not.toBeNull();
    expect(getComputedStyle(warmth).fontStyle).toBe("italic");
    expect(getComputedStyle(warmth).fontWeight).toBe("400");
    expect(getComputedStyle(warmth).getPropertyValue("font-synthesis")).toBe("none");
    const massageCopy = screen.getByText("A quiet moment for traditional Thai bodywork.");
    expect(getComputedStyle(massageCopy).getPropertyValue("text-wrap")).toBe("balance");
    const returnLink = screen.getByRole("link", { name: "Return to Rhythm" });
    const returnStyle = getComputedStyle(returnLink);
    expect(returnStyle.fontFamily).toBe(title.fontFamily);
    expect(returnStyle.fontSize).toBe("22px");
    expect(parseFloat(returnStyle.minHeight)).toBeGreaterThanOrEqual(44);
    expect(returnLink.closest("footer").textContent).toBe("Return to Rhythm");
  } finally {
    stylesheet.remove();
  }
});
