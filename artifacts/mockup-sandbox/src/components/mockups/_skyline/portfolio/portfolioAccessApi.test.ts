import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  checkPortfolioAccess,
  getStoredAccessToken,
  normalizeCodeInput,
  PORTFOLIO_ACCESS_MESSAGES,
  submitPortfolioAccessCode,
} from "./portfolioAccessApi";

const TOKEN = "T".repeat(43);

/** In-memory stand-in for one browser tab's sessionStorage. */
function makeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: vi.fn((k: string) => data.get(k) ?? null),
    setItem: vi.fn((k: string, v: string) => void data.set(k, v)),
    removeItem: vi.fn((k: string) => void data.delete(k)),
  };
}

let tab: ReturnType<typeof makeStorage>;
let localStorageStub: ReturnType<typeof makeStorage>;

function installTab(initial: Record<string, string> = {}) {
  tab = makeStorage(initial);
  localStorageStub = makeStorage();
  vi.stubGlobal("window", { sessionStorage: tab, localStorage: localStorageStub });
}

function mockFetch(impl: () => Promise<Partial<Response>> | Partial<Response>) {
  const fn = vi.fn(async () => impl() as Response);
  vi.stubGlobal("fetch", fn);
  return fn;
}

beforeEach(() => installTab());
afterEach(() => vi.unstubAllGlobals());

describe("normalizeCodeInput", () => {
  it("upper-cases and drops leading whitespace", () => {
    expect(normalizeCodeInput("  slh-ab12")).toBe("SLH-AB12");
  });
});

describe("submitPortfolioAccessCode", () => {
  it("posts the trimmed code and stores ONLY the returned token, in sessionStorage", async () => {
    const fn = mockFetch(() => ({ ok: true, status: 200, json: async () => ({ authorized: true, accessToken: TOKEN }) }));
    expect(await submitPortfolioAccessCode("  ABC  ")).toEqual({ ok: true });

    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/portfolio-access/verify");
    expect(JSON.parse(init.body as string)).toEqual({ code: "ABC" });

    expect([...tab.data.entries()]).toEqual([[ACCESS_TOKEN_STORAGE_KEY, TOKEN]]);
    expect(localStorageStub.setItem).not.toHaveBeenCalled(); // never localStorage
    expect([...tab.data.values()].join("")).not.toContain("ABC"); // never the code
  });

  it("maps 401 / 429 / other failures to distinct reasons and stores nothing", async () => {
    mockFetch(() => ({ ok: false, status: 401 }));
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "invalid" });
    mockFetch(() => ({ ok: false, status: 429 }));
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "rate_limited" });
    mockFetch(() => ({ ok: false, status: 503 }));
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "unavailable" });
    mockFetch(() => {
      throw new Error("offline");
    });
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "unavailable" });
    expect(tab.data.size).toBe(0);
  });

  it("does not treat a 200 without a token as success", async () => {
    mockFetch(() => ({ ok: true, status: 200, json: async () => ({ authorized: true }) }));
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "unavailable" });
    expect(tab.data.size).toBe(0);
  });

  it("does not report success when the browser refuses storage", async () => {
    tab.setItem.mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    mockFetch(() => ({ ok: true, status: 200, json: async () => ({ authorized: true, accessToken: TOKEN }) }));
    expect(await submitPortfolioAccessCode("x")).toEqual({ ok: false, reason: "unavailable" });
  });
});

describe("checkPortfolioAccess", () => {
  it("with no stored token (e.g. a new tab) is unauthorized and makes no request", async () => {
    const fn = mockFetch(() => ({ ok: true, json: async () => ({ authorized: true }) }));
    expect(await checkPortfolioAccess()).toBe("unauthorized");
    expect(fn).not.toHaveBeenCalled();
  });

  it("sends the stored token as a Bearer header, never in the URL, and no cookies", async () => {
    installTab({ [ACCESS_TOKEN_STORAGE_KEY]: TOKEN });
    const fn = mockFetch(() => ({ ok: true, json: async () => ({ authorized: true }) }));
    expect(await checkPortfolioAccess()).toBe("authorized");
    const [url, init] = fn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/portfolio-access/status");
    expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${TOKEN}`);
    expect(init.cache).toBe("no-store");
  });

  it("keeps access across a refresh of the same tab (the token is still in sessionStorage)", async () => {
    installTab({ [ACCESS_TOKEN_STORAGE_KEY]: TOKEN });
    mockFetch(() => ({ ok: true, json: async () => ({ authorized: true }) }));
    expect(await checkPortfolioAccess()).toBe("authorized");
    expect(await checkPortfolioAccess()).toBe("authorized"); // "reload"
    expect(getStoredAccessToken()).toBe(TOKEN);
  });

  it("removes the token when the server rejects or expires it", async () => {
    installTab({ [ACCESS_TOKEN_STORAGE_KEY]: TOKEN });
    mockFetch(() => ({ ok: true, json: async () => ({ authorized: false }) }));
    expect(await checkPortfolioAccess()).toBe("unauthorized");
    expect(getStoredAccessToken()).toBeNull();
    expect(tab.data.size).toBe(0);
  });

  it("treats only an explicit authorized: true as authorized", async () => {
    installTab({ [ACCESS_TOKEN_STORAGE_KEY]: TOKEN });
    mockFetch(() => ({ ok: true, json: async () => ({ authorized: "yes" }) }));
    expect(await checkPortfolioAccess()).toBe("unauthorized");
  });

  it("fails closed on server/network errors but keeps the token for a retry", async () => {
    installTab({ [ACCESS_TOKEN_STORAGE_KEY]: TOKEN });
    mockFetch(() => ({ ok: false, status: 500 }));
    expect(await checkPortfolioAccess()).toBe("error");
    mockFetch(() => {
      throw new Error("offline");
    });
    expect(await checkPortfolioAccess()).toBe("error");
    expect(getStoredAccessToken()).toBe(TOKEN);
  });

  it("behaves as signed out when storage is blocked", async () => {
    vi.stubGlobal("window", {
      sessionStorage: {
        getItem: () => {
          throw new Error("SecurityError");
        },
      },
    });
    expect(await checkPortfolioAccess()).toBe("unauthorized");
  });
});

describe("copy", () => {
  it("uses the specified invalid-code message", () => {
    expect(PORTFOLIO_ACCESS_MESSAGES.invalid).toBe(
      "Access code not recognized. Please check your credentials and try again.",
    );
  });
});
