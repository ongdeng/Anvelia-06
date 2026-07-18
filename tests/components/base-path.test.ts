import { describe, expect, it } from "vitest";
import {
  normalizeBasePath,
  stripBasePath,
  withBasePath
} from "../../src/utils/basePath";

describe("base-path routing", () => {
  it("normalizes configured bases and strips them from route pathnames", () => {
    expect(normalizeBasePath("Anvelia-06")).toBe("/Anvelia-06/");
    expect(stripBasePath("/Anvelia-06/activities/", "/Anvelia-06/"))
      .toBe("/activities");
    expect(stripBasePath("/Anvelia-06/", "/Anvelia-06/"))
      .toBe("/");
    expect(stripBasePath("/activities/", "/")).toBe("/activities");
  });

  it("builds clean page and home-anchor hrefs inside the configured base", () => {
    expect(withBasePath("/", "/Anvelia-06/")).toBe("/Anvelia-06/");
    expect(withBasePath("/activities", "/Anvelia-06/")).toBe(
      "/Anvelia-06/activities/"
    );
    expect(withBasePath("#place", "/Anvelia-06/")).toBe(
      "/Anvelia-06/#place"
    );
    expect(withBasePath("/activities", "/")).toBe("/activities/");
  });
});
