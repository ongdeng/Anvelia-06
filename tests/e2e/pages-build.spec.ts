import { expect, test } from "@playwright/test";

test("GitHub Pages artifact activates Activities directly and keeps links in base", async ({
  page
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

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
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://ongdeng.github.io/Anvelia-06/activities/"
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://ongdeng.github.io/Anvelia-06/activities/"
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://ongdeng.github.io/Anvelia-06/og-anvelia-threshold.jpg"
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/Anvelia-06/favicon-32.png"
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

  await page.goto("/Anvelia-06/");
  await page.locator("#visit").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");

  const imageState = await page.locator("img").evaluateAll((images) =>
    images.map((image) => ({
      complete: (image as HTMLImageElement).complete,
      naturalWidth: (image as HTMLImageElement).naturalWidth,
      src: (image as HTMLImageElement).currentSrc
    }))
  );

  expect(imageState.length).toBeGreaterThan(0);
  expect(imageState.every((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(imageState.every((image) => image.src.includes("/Anvelia-06/"))).toBe(true);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
