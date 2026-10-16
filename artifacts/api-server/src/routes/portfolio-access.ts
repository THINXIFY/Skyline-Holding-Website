import { Router, type IRouter, type RequestHandler } from "express";
import { accessCodeMatches, parseBearerToken, PortfolioSessionStore } from "../lib/portfolio-session";
import { logger } from "../lib/logger";
import { portfolioAccessVerifyLimiter } from "../middlewares/portfolio-access-rate-limit";

/** Longest code the endpoint will look at; anything longer cannot be valid. */
const MAX_CODE_LENGTH = 64;

export interface PortfolioAccessRouterDeps {
  /** The configured INVESTOR_ACCESS_CODE, or null when unset (every attempt is then refused). */
  accessCode: string | null;
  /** Server-side secret used for the constant-time code comparison. Never sent anywhere. */
  sessionSecret: string;
  /** Maximum lifetime of an access token. */
  sessionTtlMs: number;
  /** Clock, overridable only for tests (token expiry). */
  now?: () => number;
  /** Session store, overridable only for tests. */
  store?: PortfolioSessionStore;
}

const noStore: RequestHandler = (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
};

export function createPortfolioAccessRouter(deps: PortfolioAccessRouterDeps): IRouter {
  const router = Router();
  const store = deps.store ?? new PortfolioSessionStore(deps.sessionTtlMs, deps.now);

  // GET /api/portfolio-access/status  (Authorization: Bearer <token>) -> { authorized: boolean }
  // Validated server-side on every call: the token's presence in the browser proves nothing.
  router.get("/portfolio-access/status", noStore, (req, res) => {
    const token = parseBearerToken(req.headers.authorization);
    res.json({ authorized: deps.accessCode !== null && store.isValid(token) });
  });

  // POST /api/portfolio-access/verify  { code } -> 200 { authorized: true, accessToken }
  router.post("/portfolio-access/verify", noStore, portfolioAccessVerifyLimiter, (req, res) => {
    if (deps.accessCode === null) {
      // Misconfiguration (INVESTOR_ACCESS_CODE not set). Fail closed, say nothing about why.
      logger.error("Portfolio access attempted but INVESTOR_ACCESS_CODE is not configured");
      res.status(503).json({ error: "unavailable" });
      return;
    }

    const submitted = (req.body as { code?: unknown } | undefined)?.code;
    if (
      typeof submitted !== "string" ||
      submitted.trim().length === 0 ||
      submitted.length > MAX_CODE_LENGTH ||
      !accessCodeMatches(submitted, deps.accessCode, deps.sessionSecret)
    ) {
      // One generic answer for every kind of failure: nothing about how close the guess was.
      res.status(401).json({ error: "invalid_code" });
      return;
    }

    // The token is returned in the body only: no cookie is set, nothing persists in the browser
    // beyond what the page chooses to keep in sessionStorage (tab-scoped).
    res.json({ authorized: true, accessToken: store.create() });
  });

  return router;
}
