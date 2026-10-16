import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Access sessions for the protected /portfolio page.
 *
 * After a correct access code the server mints a random opaque token (256 bits from
 * crypto.randomBytes) and hands it to the browser once. The browser keeps it in
 * sessionStorage only (tab-scoped) and sends it as "Authorization: Bearer <token>".
 *
 * The server never stores the token itself, only its SHA-256 digest plus issue/expiry
 * times, so a memory dump or log of the store cannot be replayed as a token. The token
 * carries no information and is not derived from the access code. The access code is
 * never stored here.
 *
 * Sessions live in process memory: they end when the API restarts (visitors simply
 * enter the code again). That matches the deployment, which runs a single PM2 instance.
 */

/** Normalises what a visitor typed: surrounding whitespace removed, upper-cased. */
export function normalizeAccessCode(raw: string): string {
  return raw.trim().toUpperCase();
}

/**
 * Constant-time comparison of a submitted code against the configured one.
 * Both sides are HMAC'd first, so the comparison runs over equal-length
 * digests and never leaks the length of the real code through timing.
 */
export function accessCodeMatches(submitted: string, expected: string, secret: string): boolean {
  const mac = (value: string) => createHmac("sha256", secret).update(`access-code-compare|${value}`).digest();
  return timingSafeEqual(mac(normalizeAccessCode(submitted)), mac(normalizeAccessCode(expected)));
}

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/; // base64url of 32 random bytes
const MAX_SESSIONS = 10_000;

interface SessionRecord {
  issuedAt: number;
  expiresAt: number;
}

function digest(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Extracts the token from an "Authorization: Bearer <token>" header value; null if absent/malformed. */
export function parseBearerToken(header: unknown): string | null {
  if (typeof header !== "string") return null;
  const match = /^Bearer ([^\s]+)$/.exec(header);
  const token = match?.[1];
  return token && TOKEN_PATTERN.test(token) ? token : null;
}

export class PortfolioSessionStore {
  private readonly sessions = new Map<string, SessionRecord>();

  constructor(
    private readonly ttlMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  /** Mints a new session and returns the opaque token (the only time it exists in plaintext here). */
  create(): string {
    const issuedAt = this.now();
    this.prune(issuedAt);
    if (this.sessions.size >= MAX_SESSIONS) {
      // Evict the oldest entry (Map keeps insertion order) rather than grow without bound.
      const oldest = this.sessions.keys().next().value;
      if (oldest !== undefined) this.sessions.delete(oldest);
    }
    const token = randomBytes(32).toString("base64url");
    this.sessions.set(digest(token), { issuedAt, expiresAt: issuedAt + this.ttlMs });
    return token;
  }

  /** True only for a token this server issued that has not expired. Expired entries are dropped. */
  isValid(token: string | null): boolean {
    if (!token || !TOKEN_PATTERN.test(token)) return false;
    const key = digest(token);
    const record = this.sessions.get(key);
    if (!record) return false;
    if (record.expiresAt <= this.now()) {
      this.sessions.delete(key);
      return false;
    }
    return true;
  }

  private prune(now: number): void {
    for (const [key, record] of this.sessions) {
      if (record.expiresAt <= now) this.sessions.delete(key);
    }
  }

  /** Test helper. */
  get size(): number {
    return this.sessions.size;
  }
}
