import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "../gsap";
import { LOGO_ROW_HEIGHT, partnerLogos, type PartnerLogo } from "./partnerLogos";

export type MarqueeSize = "full" | "compact";

/** Logo scale per breakpoint (1 = the sizes computed in partnerLogos.ts). */
const SCALE: Record<MarqueeSize, string> = {
  full: "[--s:0.62] sm:[--s:0.72] lg:[--s:0.8] xl:[--s:0.9] 2xl:[--s:0.96]",
  compact: "[--s:0.5] sm:[--s:0.6] lg:[--s:0.66] xl:[--s:0.74] 2xl:[--s:0.8]",
};
/** Space between logos, in design px (scaled with --s). */
const GAP: Record<MarqueeSize, number> = { full: 96, compact: 84 };
/** Band padding: slim and quiet, not a bulky card. */
const BAND_PADDING: Record<MarqueeSize, string> = { full: "py-10 md:py-14", compact: "py-8 md:py-10" };
/** Drift speed in px per second: slow enough to read as calm, not a ticker. */
const SPEED = 34;

const EDGE_FADE = "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Logo({ logo, decorative, eager = false }: { logo: PartnerLogo; decorative: boolean; eager?: boolean }) {
  return (
    <div
      className="group flex shrink-0 items-center justify-center"
      style={{ width: `calc(${logo.boxW}px * var(--s))`, height: `calc(${LOGO_ROW_HEIGHT}px * var(--s))` }}
    >
      <img
        src={logo.src}
        alt={decorative ? "" : logo.alt}
        width={logo.boxW}
        height={logo.boxH}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        style={{ width: `calc(${logo.boxW}px * var(--s))`, height: `calc(${logo.boxH}px * var(--s))` }}
        className="object-contain opacity-[0.85] [filter:grayscale(0.3)] transition-[opacity,filter,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:[filter:grayscale(0)] motion-reduce:transition-none"
      />
    </div>
  );
}

/**
 * The strategic-partner logo band, shared by the Strategic Partnerships page
 * (size "full") and the Home page (size "compact").
 *
 * Motion: one set of logos is followed by identical copies inside a single
 * track. GSAP moves the track by exactly one measured set width (x: 0 to
 * -setWidth, linear, repeating), so the frame after the wrap is identical to
 * the first frame: the loop cannot show a jump. Only `transform` animates.
 * Copies are added only as needed to cover the viewport (usually 2).
 *
 * Users can pause it, drag/swipe it, and it slows on hover. It stops while
 * off-screen. With prefers-reduced-motion it is a static logo grid instead.
 */
export function PartnerLogoMarquee({ size = "full" }: { size?: MarqueeSize }) {
  const reduced = useReducedMotion();
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  // The moving strip is only filled once the band is about a screen away, then
  // ALL logos load together (browser lazy-loading would fetch far-along logos
  // late and they could pop in mid-scroll). Until then the strip keeps its exact
  // final height, so nothing shifts.
  const [near, setNear] = useState(false);

  const bandRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLUListElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const runState = useRef({ inView: true, dragging: false, paused: false });

  const applyRun = () => {
    const s = runState.current;
    tweenRef.current?.paused(!(s.inView && !s.dragging && !s.paused));
  };

  useEffect(() => {
    const band = bandRef.current;
    if (!band || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    runState.current.paused = paused;
    applyRun();
  }, [paused]);

  useEffect(() => {
    if (reduced || !near) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !track || !firstSet) return;

    let setWidth = 0;

    const measure = () => {
      const width = firstSet.getBoundingClientRect().width;
      if (!width) return;

      // Enough identical copies to always cover the viewport plus one set.
      const needed = Math.max(2, Math.ceil(viewport.clientWidth / width) + 1);
      setCopies((current) => (current === needed ? current : needed));

      if (Math.abs(width - setWidth) < 0.5) return;
      setWidth = width;
      const progress = tweenRef.current ? tweenRef.current.progress() : 0;
      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, { x: -width, duration: width / SPEED, ease: "none", repeat: -1, force3D: true });
      tweenRef.current.progress(progress);
      applyRun();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(firstSet);
    resizeObserver.observe(viewport);

    // Do no work while the band is off-screen.
    const visibility = new IntersectionObserver(([entry]) => {
      runState.current.inView = entry.isIntersecting;
      applyRun();
    });
    visibility.observe(viewport);

    // Mouse: ease down to a slow drift on hover instead of stopping dead.
    const slowTo = (timeScale: number) => {
      if (tweenRef.current) gsap.to(tweenRef.current, { timeScale, duration: 0.9, ease: "power2.out", overwrite: true });
    };
    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && slowTo(0.25);
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && slowTo(1);

    // Drag / swipe: move the loop position directly, resume on release.
    let startX = 0;
    let startProgress = 0;
    const onDown = (e: PointerEvent) => {
      if (!tweenRef.current || (e.pointerType === "mouse" && e.button !== 0)) return;
      runState.current.dragging = true;
      startX = e.clientX;
      startProgress = tweenRef.current.progress();
      applyRun();
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
        /* capture is a nicety, not required */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!runState.current.dragging || !tweenRef.current || !setWidth) return;
      const next = startProgress - (e.clientX - startX) / setWidth;
      tweenRef.current.progress(((next % 1) + 1) % 1);
    };
    const onUp = () => {
      if (!runState.current.dragging) return;
      runState.current.dragging = false;
      applyRun();
    };

    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    return () => {
      resizeObserver.disconnect();
      visibility.disconnect();
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reduced, near]);

  const vars = { "--gap": `calc(${GAP[size]}px * var(--s))` } as CSSProperties;

  return (
    <div ref={bandRef} className={`relative border-y border-[#C7A86B]/25 bg-[#F5F2EA] ${BAND_PADDING[size]} ${SCALE[size]}`} style={vars}>
      {reduced ? (
        // Reduced motion: a calm, static, responsive grid of the same logos.
        <ul aria-label="Strategic partner logos" className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center px-4">
          {partnerLogos.map((logo) => (
            <li key={logo.src} className="flex basis-1/2 items-center justify-center py-4 sm:basis-1/3 lg:basis-1/5">
              <Logo logo={logo} decorative={false} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div
            ref={viewportRef}
            role="region"
            aria-label="Strategic partner logos"
            className="relative mx-auto max-w-[1600px] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
            style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, minHeight: `calc(${LOGO_ROW_HEIGHT}px * var(--s))` }}
          >
            <div ref={trackRef} className="flex w-max will-change-transform">
              {Array.from({ length: near ? copies : 0 }, (_, copy) => (
                <ul
                  key={copy}
                  ref={copy === 0 ? firstSetRef : undefined}
                  aria-hidden={copy > 0 || undefined}
                  inert={copy > 0 || undefined}
                  className="flex shrink-0 items-center"
                  style={{ gap: "var(--gap)", paddingRight: "var(--gap)" }}
                >
                  {partnerLogos.map((logo) => (
                    <li key={`${copy}-${logo.src}`} className="flex">
                      <Logo logo={logo} decorative={copy > 0} eager />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={paused ? "Play partner logo animation" : "Pause partner logo animation"}
            className="absolute bottom-2 right-3 flex size-7 items-center justify-center rounded-full border border-[#C7A86B]/40 text-[#9A7B3F] transition-colors duration-300 hover:border-[#C7A86B] hover:text-[#12161B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B]"
          >
            {paused ? <Play className="size-3" strokeWidth={2} aria-hidden /> : <Pause className="size-3" strokeWidth={2} aria-hidden />}
          </button>
        </>
      )}
    </div>
  );
}
