/**
 * Thin client for the api-server's portfolio-access endpoints
 * (/api/portfolio-access/*). The server is the only authority: the access code
 * is checked there and the resulting session lives in an HttpOnly cookie this
 * code can neither read nor write. Nothing about the code exists in the browser
 * beyond what the visitor types.
 */

export const PORTFOLIO_PATH = "/portfolio";
export const PORTFOLIO_ACCESS_PATH = "/portfolio-access";

/** App-relative path -> real URL path (respects a non-root BASE_PATH, like the rest of the app). */
export function withBase(path: string): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "") + path;
}

export type PortfolioAccessFailure = "invalid" | "rate_limited" | "unavailable";

export type PortfolioAccessResult = { ok: true } | { ok: false; reason: PortfolioAccessFailure };

/** While typing: drop leading whitespace and upper-case (the server also normalises). */
export function normalizeCodeInput(raw: string): string {
  return raw.replace(/^\s+/, "").toUpperCase();
}

/** Visitor-facing copy for each failure. Deliberately says nothing about how close a guess was. */
export const PORTFOLIO_ACCESS_MESSAGES: Record<PortfolioAccessFailure, string> = {
  invalid: "Access code not recognized. Please check your credentials and try again.",
  rate_limited: "Too many attempts. Please wait a few minutes and try again.",
  unavailable: "Access is temporarily unavailable. Please try again shortly.",
};

/**
 * Where the access token lives: sessionStorage, which the browser scopes to this tab and
 * clears when the tab/window is closed. It holds ONLY the random opaque token the server
 * issued - never the access code, a hash or any secret. Possessing it proves nothing by
 * itself: the server validates it on every status request.
 */
export const ACCESS_TOKEN_STORAGE_KEY = "skyline_portfolio_access";

export function getStoredAccessToken(): string | null {
  try {
    return window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || null;
  } catch {
    return null; // storage blocked/unavailable: behaves as "not signed in"
  }
}

/** Returns false when the browser refuses storage (then access cannot be kept, so login must not "succeed"). */
function storeAccessToken(token: string): boolean {
  try {
    window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    return true;
  } catch {
    return false;
  }
}

export function clearStoredAccessToken(): void {
  try {
    window.sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  } catch {
    // nothing to clear
  }
}

/**
 * "authorized"   - the server confirmed the stored token.
 * "unauthorized" - no token, or the server rejected/expired it (the stored token is removed).
 * "error"        - the check could not be completed (network/server problem); the token is kept.
 */
export type PortfolioAccessState = "authorized" | "unauthorized" | "error";

export async function checkPortfolioAccess(signal?: AbortSignal): Promise<PortfolioAccessState> {
  const token = getStoredAccessToken();
  if (!token) return "unauthorized";
  try {
    const response = await fetch("/api/portfolio-access/status", {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      signal,
    });
    if (!response.ok) return "error";
    const data = (await response.json()) as { authorized?: unknown } | null;
    if (data?.authorized === true) return "authorized";
    clearStoredAccessToken();
    return "unauthorized";
  } catch {
    return "error";
  }
}

export async function submitPortfolioAccessCode(code: string): Promise<PortfolioAccessResult> {
  try {
    const response = await fetch("/api/portfolio-access/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ code: code.trim() }),
    });
    if (response.status === 401) return { ok: false, reason: "invalid" };
    if (response.status === 429) return { ok: false, reason: "rate_limited" };
    if (!response.ok) return { ok: false, reason: "unavailable" };
    const data = (await response.json()) as { authorized?: unknown; accessToken?: unknown } | null;
    if (data?.authorized !== true || typeof data.accessToken !== "string" || !data.accessToken) {
      return { ok: false, reason: "unavailable" };
    }
    return storeAccessToken(data.accessToken) ? { ok: true } : { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
