import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";

const ENV_KEYS = ["NODE_ENV", "CORS_ALLOWED_ORIGINS", "SITE_URL", "OTP_HASH_SECRET", "MAIL_PROVIDER"] as const;
const ORIGINAL_VALUES = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

function resetEnv() {
  for (const key of ENV_KEYS) {
    const original = ORIGINAL_VALUES[key];
    if (original === undefined) delete process.env[key];
    else process.env[key] = original;
  }
}

// app.ts (and the routes it imports) read env vars and construct the
// request-info router at *module load* time, so each test needs a fresh
// module instance - vi.resetModules() plus a dynamic re-import, rather
// than importing app once at the top of the file.
async function loadApp() {
  vi.resetModules();
  const mod = await import("./app");
  return mod.default;
}

describe("app CORS configuration", () => {
  afterEach(() => {
    resetEnv();
    vi.restoreAllMocks();
  });

  it("refuses to start in production without CORS_ALLOWED_ORIGINS", async () => {
    process.env.NODE_ENV = "production";
    delete process.env.CORS_ALLOWED_ORIGINS;
    delete process.env.SITE_URL;
    process.env.OTP_HASH_SECRET = "test-secret";
    process.env.MAIL_PROVIDER = "resend";
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM_EMAIL = "no-reply@example.com";

    await expect(loadApp()).rejects.toThrow(/CORS_ALLOWED_ORIGINS or SITE_URL must be set in production/);
  });

  it("boots in production once CORS_ALLOWED_ORIGINS is set", async () => {
    process.env.NODE_ENV = "production";
    process.env.CORS_ALLOWED_ORIGINS = "https://example.com";
    process.env.OTP_HASH_SECRET = "test-secret";
    process.env.MAIL_PROVIDER = "resend";
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM_EMAIL = "no-reply@example.com";

    await expect(loadApp()).resolves.toBeDefined();
  });

  it("boots in production with only SITE_URL set (single production URL setting)", async () => {
    process.env.NODE_ENV = "production";
    delete process.env.CORS_ALLOWED_ORIGINS;
    process.env.SITE_URL = "http://203.0.113.10";
    process.env.OTP_HASH_SECRET = "test-secret";
    process.env.MAIL_PROVIDER = "resend";
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM_EMAIL = "no-reply@example.com";

    await expect(loadApp()).resolves.toBeDefined();
  });

  it("does not require CORS_ALLOWED_ORIGINS outside production", async () => {
    process.env.NODE_ENV = "development";
    delete process.env.CORS_ALLOWED_ORIGINS;
    process.env.OTP_HASH_SECRET = "test-secret";
    delete process.env.MAIL_PROVIDER;

    await expect(loadApp()).resolves.toBeDefined();
  });
});

describe("app production-safe error handling", () => {
  afterEach(() => {
    resetEnv();
    vi.restoreAllMocks();
  });

  it("returns a generic JSON error for malformed bodies, with no stack trace or framework header", async () => {
    process.env.NODE_ENV = "development";
    process.env.OTP_HASH_SECRET = "test-secret";
    delete process.env.MAIL_PROVIDER;
    const app = await loadApp();

    const res = await request(app)
      .post("/api/request-info/start")
      .set("Content-Type", "application/json")
      .send('{"email": "visitor@example.com", ');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "bad_request" });
    expect(res.text).not.toMatch(/SyntaxError|node_modules|.ts|ats/);
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("returns a JSON 404 for unknown API routes", async () => {
    process.env.NODE_ENV = "development";
    process.env.OTP_HASH_SECRET = "test-secret";
    delete process.env.MAIL_PROVIDER;
    const app = await loadApp();

    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "not_found" });
  });
});
