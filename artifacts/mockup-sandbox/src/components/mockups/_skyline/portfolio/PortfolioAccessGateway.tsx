import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import {
  checkPortfolioAccess,
  normalizeCodeInput,
  PORTFOLIO_ACCESS_MESSAGES,
  PORTFOLIO_PATH,
  submitPortfolioAccessCode,
  withBase,
  type PortfolioAccessFailure,
} from "./portfolioAccessApi";
import { useNoIndex } from "./useNoIndex";

// Local, optimized WebP copy of the supplied globe artwork (the production CSP only
// allows images from this origin, and one 60 KB file beats a 1.2 MB remote PNG).
const BACKGROUND = "/images/portfolio-access-bg.webp";
const EMBLEM = "/images/skyline-emblem.webp";

/** How long "Access verified" stays on screen before moving on to /portfolio. */
const SUCCESS_DELAY_MS = 650;

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type Phase = "idle" | "verifying" | "verified";

/**
 * Restricted-access gateway for the protected /portfolio page. Isolated from the
 * public site on purpose: no header, no navigation, no footer.
 */
export function PortfolioAccessGateway() {
  useNoIndex();

  const rootRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [failure, setFailure] = useState<PortfolioAccessFailure | null>(null);

  // Entrance sequence (~1s). Layout effect so the hidden start state is applied
  // before first paint (no flash of the finished page).
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".pa-in", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: EASE.out3 } });
      tl.fromTo(".pa-bg-img", { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0)
        .fromTo(".pa-logo", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.05)
        .fromTo(".pa-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(".pa-heading", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE.out4 }, 0.28)
        .fromTo(".pa-copy", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.45)
        .fromTo(".pa-form", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.58)
        .fromTo(".pa-cta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(".pa-foot", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.85);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Tiny pointer parallax on the background art (fine pointers only, never with reduced motion).
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const moveX = gsap.quickTo(bg, "x", { duration: 1.2, ease: "power3.out" });
    const moveY = gsap.quickTo(bg, "y", { duration: 1.2, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      moveX((event.clientX / window.innerWidth - 0.5) * -14);
      moveY((event.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // A tab that already holds a token the server still accepts goes straight to the portfolio.
  // A rejected/expired token is removed by checkPortfolioAccess and the form simply stays.
  useEffect(() => {
    const controller = new AbortController();
    void checkPortfolioAccess(controller.signal).then((state) => {
      if (state === "authorized" && !controller.signal.aborted) window.location.replace(withBase(PORTFOLIO_PATH));
    });
    return () => controller.abort();
  }, []);

  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  // Back in the field after a rejected attempt, ready to retype.
  useEffect(() => {
    if (phase === "idle" && failure) inputRef.current?.focus();
  }, [phase, failure]);

  const nudge = () => {
    if (prefersReducedMotion() || !fieldRef.current) return;
    gsap.fromTo(fieldRef.current, { x: 2 }, { x: 0, duration: 0.45, ease: "elastic.out(1, 0.3)" });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return; // no duplicate requests

    const value = code.trim();
    if (!value) {
      setFailure("invalid");
      nudge();
      inputRef.current?.focus();
      return;
    }

    setFailure(null);
    setPhase("verifying");
    const result = await submitPortfolioAccessCode(value);

    if (result.ok) {
      setCode("");
      setPhase("verified");
      redirectTimer.current = setTimeout(() => window.location.replace(withBase(PORTFOLIO_PATH)), SUCCESS_DELAY_MS);
      return;
    }

    setPhase("idle");
    setFailure(result.reason);
    nudge();
  };

  const busy = phase !== "idle";
  const hasError = failure !== null;

  return (
    <main
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#080A0D] font-[Inter] text-[#F5F2EA]"
    >
      {/* ---- Background: supplied globe artwork + readability overlays ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div ref={bgRef} className="absolute -inset-4 will-change-transform">
          <img
            src={BACKGROUND}
            alt=""
            width={1672}
            height={941}
            decoding="async"
            fetchPriority="high"
            className="pa-bg-img h-full w-full object-cover object-[76%_50%] sm:object-[62%_50%] lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(8,10,13,0.50),rgba(8,10,13,0.72))]" />
        {/* Calm centre for the form; the globe and network stay visible at the edges. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_58%_at_50%_50%,rgba(8,10,13,0.62),rgba(8,10,13,0)_100%)]" />
        <div className="pa-ambient absolute inset-0 bg-[radial-gradient(ellipse_40%_32%_at_50%_30%,rgba(199,168,107,0.09),rgba(199,168,107,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_45%,rgba(8,10,13,0)_55%,rgba(8,10,13,0.55)_100%)]" />
        <div className="absolute inset-0 opacity-[0.045] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      <a
        href="/"
        className="pa-in absolute left-6 top-6 z-20 inline-flex min-h-11 items-center gap-2.5 text-[13px] font-medium tracking-[0.04em] text-[#F5F2EA]/75 transition-colors duration-300 hover:text-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B] md:left-10 md:top-8"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
        Return to Skyline
      </a>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[680px] flex-col items-center px-6 pb-[clamp(16px,3.4svh,32px)] pt-[68px] text-center sm:px-8 md:pt-[clamp(24px,4svh,48px)]">
        <div className="my-auto flex w-full flex-col items-center py-2">
          {/* Logo: the real Skyline emblem in a restrained double ring */}
          <div className="pa-in pa-logo relative flex h-[min(clamp(72px,10.5svh,104px),22vw)] w-[min(clamp(72px,10.5svh,104px),22vw)] items-center justify-center rounded-full border border-[#C7A86B]/60 bg-[#080A0D]/55 shadow-[0_0_44px_rgba(199,168,107,0.14)]">
            <span aria-hidden className="absolute -inset-[7px] rounded-full border border-[#C7A86B]/20" />
            <img
              src={EMBLEM}
              alt="Skyline Holding"
              width={360}
              height={238}
              className="w-[56%] select-none"
              draggable={false}
            />
          </div>

          <p className="pa-in pa-eyebrow mt-[clamp(16px,3.2svh,30px)] inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em] text-[#C7A86B] sm:text-[12px] sm:tracking-[0.26em] md:text-[13px]">
            <Lock size={13} strokeWidth={1.6} aria-hidden className="shrink-0" />
            <span>Restricted Access · Confidential</span>
          </p>

          <h1 className="pa-in pa-heading mt-[clamp(10px,2.2svh,22px)] whitespace-nowrap font-['Cormorant_Garamond',serif] text-[min(5.5rem,13.5vw,12svh)] font-medium italic leading-[1.1] tracking-[-0.01em]">
            <span className="text-[#F8F7F3]">Investment</span>{" "}
            <span className="inline-block bg-[linear-gradient(100deg,#B9985A_0%,#D8BD82_45%,#E9D7A8_60%,#C7A86B_100%)] bg-clip-text pb-[0.06em] pr-[0.08em] text-transparent">
              Thesis
            </span>
          </h1>

          <p className="pa-in pa-copy mt-[clamp(12px,2.8svh,26px)] max-w-[540px] text-[16px] leading-[1.6] text-[#F5F2EA]/70 sm:text-[17px] md:text-[18px]">
            This area is reserved for accredited investors and partners of Skyline Holding. Please enter your personal
            access code.
          </p>

          <form onSubmit={onSubmit} noValidate className="pa-in pa-form mt-[clamp(16px,4.2svh,38px)] w-full max-w-[540px]">
            <label
              htmlFor="portfolio-access-code"
              className="block text-[12px] font-medium uppercase tracking-[0.24em] text-[#F5F2EA]/75"
            >
              Access code
            </label>

            <div ref={fieldRef} className="pa-field group relative mt-2">
              <input
                ref={inputRef}
                id="portfolio-access-code"
                name="portfolio-access-code"
                type="password"
                value={code}
                onChange={(event) => {
                  setCode(normalizeCodeInput(event.target.value));
                  if (failure) setFailure(null);
                }}
                readOnly={busy}
                placeholder="• • • • • • • •"
                maxLength={64}
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                data-1p-ignore
                data-lpignore="true"
                data-bwignore="true"
                enterKeyHint="go"
                aria-invalid={hasError}
                aria-describedby={`portfolio-access-help${hasError ? " portfolio-access-status" : ""}`}
                className="h-[clamp(50px,7.6svh,62px)] w-full rounded-none border-0 bg-transparent px-0 pl-[0.4em] text-center font-[Inter] text-[20px] font-normal uppercase tracking-[0.4em] text-[#F8F7F3] caret-[#D8BD82] outline-none placeholder:text-[26px] placeholder:font-normal placeholder:leading-none placeholder:tracking-[0.12em] placeholder:text-[#F5F2EA]/40 read-only:cursor-wait read-only:opacity-80 sm:text-[22px] sm:placeholder:text-[28px]"
              />
              {/* Rule: thin neutral line, grows into gold on focus; muted red on error */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-colors duration-300 ${
                  hasError ? "bg-[#D98B86]/70" : "bg-[#F5F2EA]/25"
                }`}
              />
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 transition-transform duration-500 group-focus-within:scale-x-100 ${
                  hasError ? "bg-[#D98B86]" : "bg-[#C7A86B]"
                }`}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[10%] -bottom-3 h-6 bg-[radial-gradient(ellipse_at_center_top,rgba(199,168,107,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-focus-within:opacity-100"
              />
            </div>

            <p id="portfolio-access-help" className="mt-[clamp(8px,1.8svh,16px)] text-[14px] leading-relaxed text-[#F5F2EA]/55 sm:text-[15px]">
              Codes are issued personally by the Skyline Holding team.
            </p>

            {/* Status line: reserved height so the CTA never jumps. aria-live announces errors and success. */}
            <div
              id="portfolio-access-status"
              role="status"
              aria-live="polite"
              className="flex min-h-[clamp(30px,4.6svh,40px)] items-center justify-center py-1 text-[14px] leading-snug"
            >
              {failure && <span className="text-[#D98B86]">{PORTFOLIO_ACCESS_MESSAGES[failure]}</span>}
              {phase === "verified" && (
                <span className="inline-flex items-center gap-2 text-[#D8BD82]">
                  <Check size={16} strokeWidth={1.8} aria-hidden />
                  Access verified
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="pa-in pa-cta group/btn relative inline-flex h-[clamp(50px,7.4svh,62px)] w-full items-center justify-center gap-4 overflow-hidden bg-[linear-gradient(120deg,#C7A86B_0%,#D8BD82_50%,#C7A86B_100%)] bg-[length:200%_100%] bg-[position:0%_0%] font-[Inter] text-[13px] font-semibold uppercase tracking-[0.2em] text-[#080A0D] transition-[background-position,filter] duration-700 ease-out hover:bg-[position:100%_0%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82] disabled:cursor-wait disabled:brightness-90"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-out group-hover/btn:left-[110%] group-hover/btn:opacity-100"
              />
              {phase === "idle" ? (
                <>
                  <span>Enter</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </>
              ) : (
                <>
                  <span
                    aria-hidden
                    className="pa-spinner h-[14px] w-[14px] rounded-full border-[1.5px] border-[#080A0D]/30 border-t-[#080A0D]"
                  />
                  <span>{phase === "verified" ? "Verified" : "Verifying"}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="pa-in pa-foot mt-[clamp(12px,2.8svh,24px)] flex w-full items-center justify-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#F5F2EA]/55 sm:text-[11px] sm:tracking-[0.22em]">
          <span aria-hidden className="hidden h-px w-10 bg-[#C7A86B]/35 sm:block" />
          <span>Skyline Holding, SLU · Andorra</span>
          <span aria-hidden className="hidden h-px w-10 bg-[#C7A86B]/35 sm:block" />
        </div>
      </div>
    </main>
  );
}
