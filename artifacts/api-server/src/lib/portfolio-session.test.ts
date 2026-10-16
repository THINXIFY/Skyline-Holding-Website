import { describe, expect, it } from "vitest";
import {
  accessCodeMatches,
  normalizeAccessCode,
  parseBearerToken,
  PortfolioSessionStore,
} from "./portfolio-session";

const SECRET = "test-secret";
const CODE = "TEST-CODE-1";
const HOUR = 60 * 60 * 1000;

describe("normalizeAccessCode / accessCodeMatches", () => {
  it("trims and upper-cases", () => {
    expect(normalizeAccessCode("  abc-123 ")).toBe("ABC-123");
  });

  it("matches regardless of case and surrounding whitespace", () => {
    expect(accessCodeMatches("  test-code-1  ", CODE, SECRET)).toBe(true);
  });

  it("rejects wrong, partial and over-long codes", () => {
    expect(accessCodeMatches("TEST-CODE-2", CODE, SECRET)).toBe(false);
    expect(accessCodeMatches("TEST-CODE", CODE, SECRET)).toBe(false);
    expect(accessCodeMatches(`${CODE}${CODE}`, CODE, SECRET)).toBe(false);
    expect(accessCodeMatches("", CODE, SECRET)).toBe(false);
  });
});

describe("parseBearerToken", () => {
  const good = "A".repeat(43);

  it("accepts a well-formed Bearer header", () => {
    expect(parseBearerToken(`Bearer ${good}`)).toBe(good);
  });

  it("rejects missing, malformed and wrong-scheme headers", () => {
    for (const bad of [undefined, null, 42, "", "Bearer", "Bearer ", `Basic ${good}`, good, `Bearer ${good} extra`, "Bearer short", `Bearer ${"!".repeat(43)}`]) {
      expect(parseBearerToken(bad)).toBeNull();
    }
  });
});

describe("PortfolioSessionStore", () => {
  it("issues random, opaque, unique tokens that do not contain the access code", () => {
    const store = new PortfolioSessionStore(4 * HOUR);
    const a = store.create();
    const b = store.create();
    expect(a).not.toBe(b);
    expect(a).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(a.toLowerCase()).not.toContain(CODE.toLowerCase());
  });

  it("accepts an issued token until it expires, then drops it", () => {
    let now = 1_700_000_000_000;
    const store = new PortfolioSessionStore(4 * HOUR, () => now);
    const token = store.create();
    expect(store.isValid(token)).toBe(true);
    now += 4 * HOUR - 1000;
    expect(store.isValid(token)).toBe(true);
    now += 2000;
    expect(store.isValid(token)).toBe(false);
    expect(store.size).toBe(0);
  });

  it("rejects tokens it never issued, and malformed input", () => {
    const store = new PortfolioSessionStore(HOUR);
    store.create();
    expect(store.isValid("B".repeat(43))).toBe(false);
    expect(store.isValid("short")).toBe(false);
    expect(store.isValid(null)).toBe(false);
  });

  it("stores only a digest, never the plaintext token", () => {
    const store = new PortfolioSessionStore(HOUR);
    const token = store.create();
    const keys = [...(store as unknown as { sessions: Map<string, unknown> }).sessions.keys()];
    expect(keys).toHaveLength(1);
    expect(keys[0]).not.toBe(token);
    expect(keys[0]).toMatch(/^[0-9a-f]{64}$/);
  });

  it("prunes expired sessions when new ones are created", () => {
    let now = 0;
    const store = new PortfolioSessionStore(HOUR, () => now);
    store.create();
    store.create();
    now += 2 * HOUR;
    store.create();
    expect(store.size).toBe(1);
  });
});
