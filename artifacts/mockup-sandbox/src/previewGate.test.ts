import { describe, expect, it } from "vitest";
import { resolvePreview } from "./previewGate";

describe("resolvePreview", () => {
  it("blocks /preview/* in production", () => {
    expect(resolvePreview("/preview/AboutPage", false)).toEqual({ kind: "blocked" });
    expect(resolvePreview("/preview/_skyline/Hero", false)).toEqual({ kind: "blocked" });
    expect(resolvePreview("/preview/anything/else", false)).toEqual({ kind: "blocked" });
  });

  it("still renders /preview/* in development", () => {
    expect(resolvePreview("/preview/AboutPage", true)).toEqual({ kind: "render", path: "AboutPage" });
  });

  it("never touches normal Skyline routes, in production or development", () => {
    for (const route of [
      "/", "/about", "/investment-strategy", "/investment-opportunities", "/investment-sectors",
      "/management-services", "/strategic-advisory", "/strategic-partnerships", "/investor-relations",
      "/governance", "/team", "/contact", "/legal", "/impressum", "/privacy", "/terms",
    ]) {
      expect(resolvePreview(route, false)).toEqual({ kind: "none" });
      expect(resolvePreview(route, true)).toEqual({ kind: "none" });
    }
  });

  it("does not treat lookalike paths as previews", () => {
    expect(resolvePreview("/previews", false)).toEqual({ kind: "none" });
    expect(resolvePreview("/preview", false)).toEqual({ kind: "none" });
    expect(resolvePreview("/about/preview/x", false)).toEqual({ kind: "none" });
  });
});
