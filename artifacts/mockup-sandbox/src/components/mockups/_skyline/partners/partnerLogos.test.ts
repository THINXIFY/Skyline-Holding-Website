import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { deriveLabel, fitLogo, labelFor, LOGO_ROW_HEIGHT, partnerLogos } from "./partnerLogos";

const LOGO_DIR = path.resolve(import.meta.dirname, "../../../../../public/images/partners");
const IMAGE_FILE = /\.(png|webp|svg|jpe?g|gif)$/i;

describe("partner logos", () => {
  it("includes EVERY image found in public/images/partners (nothing hardcoded, nothing dropped)", () => {
    const onDisk = readdirSync(LOGO_DIR).filter((f) => IMAGE_FILE.test(f));
    expect(onDisk.length).toBeGreaterThan(0);
    const served = partnerLogos.map((l) => decodeURIComponent(l.src.replace("/images/partners/", "")));
    expect([...served].sort()).toEqual([...onDisk].sort());
  });

  it("has unique sources (so React keys are unique) and a readable alt on every logo", () => {
    expect(new Set(partnerLogos.map((l) => l.src)).size).toBe(partnerLogos.length);
    for (const logo of partnerLogos) {
      expect(logo.alt.trim().length, logo.src).toBeGreaterThan(1);
      expect(logo.alt, logo.src).not.toMatch(/imgi|chatgpt|\.png|\.webp|\.svg/i);
    }
  });

  it("never distorts a logo: display box keeps the file's aspect ratio and stays within limits", () => {
    for (const logo of partnerLogos) {
      expect(Math.abs(logo.boxW / logo.boxH - logo.width / logo.height) / (logo.width / logo.height), logo.alt).toBeLessThan(0.03);
      expect(logo.boxH, logo.alt).toBeLessThanOrEqual(LOGO_ROW_HEIGHT);
      expect(logo.boxW, logo.alt).toBeLessThanOrEqual(176);
    }
  });

  it("balances very different shapes: a wide wordmark and a square emblem", () => {
    const wide = fitLogo(3840, 624);
    const square = fitLogo(1000, 932);
    expect(wide.boxW).toBe(176);
    expect(square.boxH).toBe(LOGO_ROW_HEIGHT);
    expect(wide.boxW * wide.boxH).toBeGreaterThan(square.boxW * square.boxH * 0.6);
  });

  it("labels known companies and derives sensible labels for new files", () => {
    expect(labelFor("imgi_7_Mercedes-Benz_Logo_2010.svg")).toBe("Mercedes-Benz");
    expect(labelFor("imgi_11_UBS_Logo.png")).toBe("UBS");
    expect(labelFor("imgi_6_ChatGPT-Image-Jul-21-2026-01_24_39-AM.png")).toBe("Nexus Mutual");
    expect(deriveLabel("imgi_20_acme_holdings_logo_2024.png")).toBe("Acme Holdings");
    expect(deriveLabel("3840px-Big_Company_Corporation_-_Logo.svg.png")).toBe("Big Company");
  });
});
