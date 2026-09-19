import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

const HEADER_OFFSET = -88;

/**
 * Site-wide smooth scroll, driven by Lenis and synced to GSAP's own ticker so
 * ScrollTrigger stays perfectly in step with it (the officially recommended
 * Lenis + GSAP wiring). Also intercepts same-page hash links so nav/CTA
 * anchors ease to their target instead of snapping.
 *
 * A no-op under prefers-reduced-motion: native scrolling only.
 */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) {
    return () => {};
  }

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const handleRefresh = () => lenis.resize();
  ScrollTrigger.addEventListener("refresh", handleRefresh);
  ScrollTrigger.refresh();

  const handleAnchorClick = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement)?.closest?.("a[href*='#']");
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Only intercept true same-page hash links; cross-page anchors like
    // "/#contact" from another route need a real navigation.
    if (url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.querySelector(url.hash);
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, duration: 1.1 });
    history.pushState(null, "", url.hash);
  };

  document.addEventListener("click", handleAnchorClick);

  return () => {
    document.removeEventListener("click", handleAnchorClick);
    ScrollTrigger.removeEventListener("refresh", handleRefresh);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
