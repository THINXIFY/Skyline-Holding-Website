import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CONVICTION, HERO, HERO_METRICS, HOW_WE_INVEST, SECTORS, WHAT_WE_BRING } from "./thesisData";
import { PROFILES, PROFILES_SECTION, CLOSING_CTA } from "./thesisDataLower";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PAGE = path.join(DIR, "..", "..", "..", "PortfolioPage.tsx");

// Words that must never appear in the Skyline portfolio content (company is Skyline Holding, based in Andorra).
const FORBIDDEN = [/\bslide\b/i, /geneva/i, /switzerland/i, /\bswiss\b/i];

function sourceFiles(): string[] {
  const own = readdirSync(DIR)
    .filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f))
    .map((f) => path.join(DIR, f));
  return [...own, PAGE];
}

describe("thesis content", () => {
  it("contains no Slide / Geneva / Switzerland / Swiss references in any thesis source file", () => {
    for (const file of sourceFiles()) {
      const text = readFileSync(file, "utf8");
      for (const word of FORBIDDEN) expect(text, `${path.basename(file)} matches ${word}`).not.toMatch(word);
    }
  });

  it("positions the company in Andorra", () => {
    expect(HERO.copy).toContain("Andorra");
    expect(WHAT_WE_BRING.capabilities.find((c) => c.icon === "structuring")?.body).toContain("Andorra");
  });

  it("sector shares and geographic allocation each add up to 100%", () => {
    expect(SECTORS.reduce((sum, s) => sum + s.share, 0)).toBe(100);
    expect(HOW_WE_INVEST.allocation.reduce((sum, r) => sum + r.pct, 0)).toBe(100);
  });

  it("has four sectors, six capabilities, three principles and four metrics", () => {
    expect(SECTORS).toHaveLength(4);
    expect(WHAT_WE_BRING.capabilities).toHaveLength(6);
    expect(CONVICTION.principles).toHaveLength(3);
    expect(HERO_METRICS).toHaveLength(4);
  });

  it("points the co-investment CTA at a real route and the thesis CTA at the Conviction anchor", () => {
    expect(HERO.secondaryCta.href).toBe("/contact");
    expect(HERO.primaryCta.href).toBe("#conviction");
    expect(HERO.secondaryCta.href).not.toBe("#");
  });

  it("makes no guarantees or invented approvals", () => {
    const all = JSON.stringify({ HERO, CONVICTION, SECTORS, HOW_WE_INVEST, WHAT_WE_BRING });
    for (const word of [/guarantee/i, /licen[cs]ed/i, /regulated by/i, /approved by/i]) expect(all).not.toMatch(word);
  });

  it("lists the nine supplied company profiles exactly, labelled PORTFOLIO", () => {
    expect(PROFILES_SECTION.cardLabel).toBe("Portfolio");
    expect(PROFILES.map((p) => p.name)).toEqual([
      "Quivaris", "KESTRELCORE", "Ostrevo", "Sowarden", "Elbrion", "Sorrendel", "THORVANE", "heliomyx", "Feldkeim",
    ]);
    expect(PROFILES.map((p) => [p.category, p.profile, p.location])).toEqual([
      ["Therapeutics", "Biotech · Series B", "Boston, MA — United States"],
      ["Energy", "Nuclear · SMR · Growth", "Idaho Falls, ID — United States"],
      ["Diagnostics", "MedTech · Series B", "Oxford — United Kingdom"],
      ["Agronomics", "AgriTech · Series B", "Des Moines, IA — United States"],
      ["Biologics", "Biotech · Growth", "Hamburg — Europe"],
      ["Medical", "MedTech · Series C", "Minneapolis, MN — United States"],
      ["Fuel Systems", "Nuclear · SMR · Series B", "Warrington — United Kingdom"],
      ["Bio", "Biotech · Series A", "San Diego, CA — United States"],
      ["Robotics", "AgriTech · Series A", "Munich — Europe"],
    ]);
    expect(new Set(PROFILES.map((p) => p.logo)).size).toBe(9);
  });

  it("closing CTA: introduction request -> /contact, pitch deck -> the published PDF, no co-investment button", () => {
    expect(CLOSING_CTA.primary.href).toBe("/contact");
    expect(CLOSING_CTA.deck.href).toBe("/documents/Skyline-Holding-slu-pitch-deck.pdf");
    expect(Object.keys(CLOSING_CTA)).not.toContain("secondary");
  });
});
