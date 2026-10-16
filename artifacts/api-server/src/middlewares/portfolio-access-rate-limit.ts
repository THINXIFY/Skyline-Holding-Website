import rateLimit, { MemoryStore } from "express-rate-limit";

// Explicit store so tests can clear it between cases (same approach as
// request-info-rate-limit.ts).
const verifyFailuresStore = new MemoryStore();

/**
 * Brute-force protection for POST /api/portfolio-access/verify.
 *
 * Only FAILED attempts (responses >= 400) count: skipSuccessfulRequests means a
 * legitimate investor who gets the code right is never throttled. After 5 wrong
 * codes from one IP the endpoint answers 429 until the 15-minute window rolls
 * over - a temporary pause, not a permanent lockout. The 429 body is generic.
 */
export const portfolioAccessVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: "rate_limited" },
  store: verifyFailuresStore,
});

/** Test-only: clears the failed-attempt counters. */
export async function resetPortfolioAccessRateLimiters(): Promise<void> {
  await verifyFailuresStore.resetAll();
}
