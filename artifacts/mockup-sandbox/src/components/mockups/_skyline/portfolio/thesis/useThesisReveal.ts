import { useLayoutEffect, type RefObject } from "react";
import { gsap, EASE, prefersReducedMotion, ScrollTrigger } from "../../gsap";

/**
 * Scroll-triggered reveals for the Investment Thesis sections, driven by data attributes so
 * every section shares one small, consistent motion language (all one-shot, no scrubbing,
 * no parallax):
 *
 *   data-rv        fade up 18px (optional data-rv-delay="0.15" seconds)
 *   data-rule      gold rule grows from the left
 *   data-bar       allocation bar grows from the left
 *   data-zoom      image settles from scale 1.04 to 1 (wrapper element; hover effects live on a child)
 *
 * Under prefers-reduced-motion everything is simply shown.
 */
export function useThesisReveal(rootRef: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-rv]", { opacity: 1, y: 0 });
        gsap.set("[data-rule], [data-bar]", { scaleX: 1 });
        gsap.set("[data-zoom]", { scale: 1 });
        return;
      }

      const trigger = (el: Element, start = "top 90%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: EASE.out3,
            delay: Number(el.dataset.rvDelay ?? 0),
            scrollTrigger: trigger(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.04 },
          {
            scale: 1,
            duration: 1.4,
            ease: EASE.out3,
            delay: Number(el.dataset.rvDelay ?? 0),
            scrollTrigger: trigger(el),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: EASE.out3, transformOrigin: "left center", scrollTrigger: trigger(el, "top 97%") },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: EASE.out4,
            transformOrigin: "left center",
            delay: Number(el.dataset.rvDelay ?? 0),
            scrollTrigger: trigger(el.closest("[data-bars]") ?? el, "top 92%"),
          },
        );
      });
    }, root);

    // Layout above the triggers can shift once web fonts and images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    void fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [rootRef]);
}
