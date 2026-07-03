import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageShell } from "../../src/components/layout/PageShell";
import { siteContent } from "../../src/content/siteContent";

describe("PageShell", () => {
  it("keeps global navigation outside the main landmark", () => {
    render(
      <PageShell
        hero={<h1 id={siteContent.accessibility.pageTitleId}>Hero</h1>}
      />
    );

    const main = screen.getByRole("main", { name: "Hero" });

    expect(
      within(main).queryByRole("banner", {
        name: siteContent.accessibility.primaryHeaderLabel
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("banner", {
        name: siteContent.accessibility.primaryHeaderLabel
      })
    ).toBeInTheDocument();
  });

  it("points the skip link to the main content landmark", () => {
    render(
      <PageShell
        hero={<h1 id={siteContent.accessibility.pageTitleId}>Hero</h1>}
      />
    );

    expect(
      screen.getByRole("link", {
        name: siteContent.accessibility.skipToContentLabel
      })
    ).toHaveAttribute("href", `#${siteContent.accessibility.mainContentId}`);
    expect(screen.getByRole("main", { name: "Hero" })).toHaveAttribute(
      "id",
      siteContent.accessibility.mainContentId
    );
  });
});
