import { useEffect, useState, type ReactNode } from "react";
import {
  checkPortfolioAccess,
  PORTFOLIO_ACCESS_PATH,
  withBase,
} from "./portfolioAccessApi";
import { useNoIndex } from "./useNoIndex";

/** Minimal branded placeholder shown while the session is being checked. */
export function PortfolioAccessLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Verifying access"
      className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-[#080A0D]"
    >
      <img src="/images/skyline-emblem.webp" alt="" width={360} height={238} className="w-14 opacity-70" />
      <span aria-hidden className="pa-spinner h-4 w-4 rounded-full border-[1.5px] border-[#C7A86B]/25 border-t-[#C7A86B]" />
      <span className="sr-only">Verifying access</span>
    </main>
  );
}

/**
 * Gate for /portfolio. On every load it reads the tab's access token from sessionStorage
 * (no token: straight to /portfolio-access, no request) and asks the server whether it is
 * still valid. Only a server "authorized: true" renders the children; anything else (no
 * token, rejected/expired token - which is then removed - or an API error) replaces the URL
 * with /portfolio-access. The token's presence alone never grants anything.
 *
 * Pass lazily-loaded content as children so its code is only fetched after the check.
 */
export function ProtectedPortfolioRoute({ children }: { children: ReactNode }) {
  useNoIndex();
  const [state, setState] = useState<"checking" | "authorized">("checking");

  useEffect(() => {
    const controller = new AbortController();
    void checkPortfolioAccess(controller.signal).then((result) => {
      if (controller.signal.aborted) return;
      if (result === "authorized") setState("authorized");
      else window.location.replace(withBase(PORTFOLIO_ACCESS_PATH));
    });
    return () => controller.abort();
  }, []);

  // Coming back via the browser's back/forward cache would show a stale, already-rendered
  // portfolio without re-checking the session - re-verify in that case.
  useEffect(() => {
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  if (state !== "authorized") return <PortfolioAccessLoading />;
  return <>{children}</>;
}
