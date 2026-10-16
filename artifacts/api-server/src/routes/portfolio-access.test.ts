import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createPortfolioAccessRouter, type PortfolioAccessRouterDeps } from "./portfolio-access";
import { resetPortfolioAccessRateLimiters } from "../middlewares/portfolio-access-rate-limit";

const CODE = "TEST-CODE-1";
const HOUR = 60 * 60 * 1000;

let clock: number;

function buildApp(overrides: Partial<PortfolioAccessRouterDeps> = {}) {
  const app = express();
  app.set("trust proxy", 1);
  app.use(express.json());
  app.use(
    "/api",
    createPortfolioAccessRouter({
      accessCode: CODE,
      sessionSecret: "test-secret",
      sessionTtlMs: 4 * HOUR,
      now: () => clock,
      ...overrides,
    }),
  );
  return app;
}

async function login(app: express.Express): Promise<string> {
  const res = await request(app).post("/api/portfolio-access/verify").send({ code: CODE });
  expect(res.status).toBe(200);
  return res.body.accessToken as string;
}

const status = (app: express.Express, token?: string) => {
  const req = request(app).get("/api/portfolio-access/status");
  return token === undefined ? req : req.set("Authorization", `Bearer ${token}`);
};

beforeEach(async () => {
  clock = 1_700_000_000_000;
  // The limiter is a module-level singleton shared by every test in this file.
  await resetPortfolioAccessRateLimiters();
});

describe("POST /api/portfolio-access/verify", () => {
  it("returns an opaque access token for the correct code, uncached and without any cookie", async () => {
    const res = await request(buildApp()).post("/api/portfolio-access/verify").send({ code: CODE });
    expect(res.status).toBe(200);
    expect(res.body.authorized).toBe(true);
    expect(res.body.accessToken).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(JSON.stringify(res.body)).not.toContain(CODE);
    expect(res.headers["cache-control"]).toBe("no-store");
    expect(res.headers["set-cookie"]).toBeUndefined();
  });

  it("issues a different token on every login", async () => {
    const app = buildApp();
    expect(await login(app)).not.toBe(await login(app));
  });

  it("trims whitespace and ignores case", async () => {
    const res = await request(buildApp()).post("/api/portfolio-access/verify").send({ code: `  ${CODE.toLowerCase()} ` });
    expect(res.status).toBe(200);
  });

  it("rejects a wrong code with a generic 401 and no token", async () => {
    const res = await request(buildApp()).post("/api/portfolio-access/verify").send({ code: "TEST-CODE-9" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "invalid_code" });
    expect(res.body.accessToken).toBeUndefined();
    expect(JSON.stringify(res.body)).not.toContain(CODE);
  });

  it("rejects missing, non-string, blank and over-long codes the same way", async () => {
    const app = buildApp();
    for (const body of [{}, { code: 123 }, { code: "   " }, { code: "A".repeat(500) }, { code: ["x"] }]) {
      const res = await request(app).post("/api/portfolio-access/verify").send(body);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "invalid_code" });
    }
  });

  it("fails closed (503, no token) when INVESTOR_ACCESS_CODE is not configured", async () => {
    const app = buildApp({ accessCode: null });
    const res = await request(app).post("/api/portfolio-access/verify").send({ code: "" });
    expect(res.status).toBe(503);
    expect(res.body.accessToken).toBeUndefined();
  });
});

describe("GET /api/portfolio-access/status", () => {
  it("is authorized with a token issued by verify, and never cached", async () => {
    const app = buildApp();
    const token = await login(app);
    const res = await status(app, token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ authorized: true });
    expect(res.headers["cache-control"]).toBe("no-store");
  });

  it("fails without a token", async () => {
    const res = await status(buildApp());
    expect(res.body).toEqual({ authorized: false });
  });

  it("fails with an invalid, malformed or wrong-scheme token", async () => {
    const app = buildApp();
    await login(app);
    expect((await status(app, "A".repeat(43))).body).toEqual({ authorized: false });
    expect((await status(app, "garbage")).body).toEqual({ authorized: false });
    const token = await login(app);
    const basic = await request(app).get("/api/portfolio-access/status").set("Authorization", `Basic ${token}`);
    expect(basic.body).toEqual({ authorized: false });
  });

  it("does not accept the token from a cookie, query string or body", async () => {
    const app = buildApp();
    const token = await login(app);
    expect((await request(app).get("/api/portfolio-access/status").set("Cookie", `slh_portfolio_session=${token}`)).body).toEqual({ authorized: false });
    expect((await request(app).get(`/api/portfolio-access/status?token=${token}`)).body).toEqual({ authorized: false });
  });

  it("fails after the 4-hour maximum lifetime", async () => {
    const app = buildApp();
    const token = await login(app);
    clock += 4 * HOUR - 5000;
    expect((await status(app, token)).body).toEqual({ authorized: true });
    clock += 10_000;
    expect((await status(app, token)).body).toEqual({ authorized: false });
  });

  it("is closed for every token while no access code is configured", async () => {
    const store = buildApp();
    const token = await login(store);
    const closed = buildApp({ accessCode: null });
    expect((await status(closed, token)).body).toEqual({ authorized: false });
  });
});

describe("rate limiting", () => {
  it("returns 429 after 5 failed attempts from one IP, even for the right code", async () => {
    const app = buildApp();
    for (let i = 0; i < 5; i += 1) {
      const res = await request(app).post("/api/portfolio-access/verify").send({ code: "WRONG" });
      expect(res.status).toBe(401);
    }
    const blocked = await request(app).post("/api/portfolio-access/verify").send({ code: CODE });
    expect(blocked.status).toBe(429);
    expect(blocked.body).toEqual({ error: "rate_limited" });
    expect(blocked.body.accessToken).toBeUndefined();
  });

  it("does not count successful attempts, and is per IP", async () => {
    const app = buildApp();
    for (let i = 0; i < 8; i += 1) {
      const ok = await request(app).post("/api/portfolio-access/verify").send({ code: CODE });
      expect(ok.status).toBe(200);
    }
    for (let i = 0; i < 5; i += 1) {
      await request(app).post("/api/portfolio-access/verify").set("X-Forwarded-For", "203.0.113.7").send({ code: "WRONG" });
    }
    const otherIp = await request(app)
      .post("/api/portfolio-access/verify")
      .set("X-Forwarded-For", "203.0.113.8")
      .send({ code: CODE });
    expect(otherIp.status).toBe(200);
  });
});
