import { expect, test } from "@playwright/test";

test("GitHub Pages artifact activates Activities directly and keeps links in base", async ({
  page
}) => {
  await page.goto("/Anvelia-06/activities/");

  await expect(page).toHaveURL(/\/Anvelia-06\/activities\/$/);
  await expect(page).toHaveTitle("Activities | Anvelia Sanctuary");
  await expect(
    page.getByRole("heading", { level: 1, name: "Time, left open" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Anvelia Sanctuary home" })
  ).toHaveAttribute("href", "/Anvelia-06/");
  await expect(
    page
      .getByRole("navigation", { name: "Site sections" })
      .getByRole("link", { name: "Rhythm" })
  ).toHaveAttribute("href", "/Anvelia-06/#open-air-living");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Quiet moments at Anvelia Sanctuary, shaped by tea, reading, timber, greenery, and cooler evening air on the hillside."
  );

  await page.goto("/Anvelia-06/");

  const passage = page.getByRole("link", { name: "See activities" });

  await expect(passage).toHaveAttribute(
    "href",
    "/Anvelia-06/activities/"
  );
  await passage.click();
  await expect(page).toHaveURL(/\/Anvelia-06\/activities\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Time, left open" })
  ).toBeVisible();
});
