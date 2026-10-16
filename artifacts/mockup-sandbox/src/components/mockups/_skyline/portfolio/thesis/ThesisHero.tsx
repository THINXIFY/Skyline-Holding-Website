import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../../gsap";
import { HERO, HERO_METRICS } from "./thesisData";

// Local, optimized WebP copy of the supplied globe artwork (the production CSP only allows
// images from this origin).
const BACKGROUND = "/images/portfolio-hero-bg.webp";

export function ThesisHero() {
  const rootRef = useRef<HTMLElement>(null);

  // Load-in sequence (the hero is always on screen at load, so no scroll trigger).
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".th-in", { opacity: 1, y: 0 });
        gsap.set(".th-rule", { scaleX: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: EASE.out3 } });
      tl.fromTo(".th-bg", { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .fromTo(".th-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        .fromTo(".th-line", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.12, ease: EASE.out4 }, 0.3)
        .fromTo(".th-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left center" }, 0.85)
        .fromTo(".th-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0.95)
        .fromTo(".th-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.1)
        .fromTo(".th-metric", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.2)
        .fromTo(".th-scroll", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.5);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      aria-labelledby="thesis-hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#05090E] text-[#F5F2EA]"
    >
      {/* Background: supplied globe artwork. Globe stays on the right; on narrow screens the
          crop is shifted toward it so it never sits behind the heading. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={BACKGROUND}
          alt=""
          width={1672}
          height={941}
          decoding="async"
          fetchPriority="high"
          className="th-bg absolute inset-0 h-full w-full object-cover object-[78%_20%] sm:object-[68%_40%] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,9,14,0.30),rgba(5,9,14,0.60))]" />
        {/* Readability for the text column; the right side stays clear for the globe. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,14,0.78)_0%,rgba(5,9,14,0.5)_38%,rgba(5,9,14,0)_72%)] max-sm:bg-[linear-gradient(180deg,rgba(5,9,14,0.4)_0%,rgba(5,9,14,0.22)_40%,rgba(5,9,14,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#05090E,rgba(5,9,14,0))]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1464px] flex-1 flex-col justify-center px-6 pb-12 pt-32 md:px-10 md:pt-36 lg:px-8">
        <p className="th-in th-eyebrow text-[11px] font-medium uppercase tracking-[0.24em] text-[#C7A86B] sm:text-[12px]">
          {HERO.eyebrow}
        </p>

        <h1
          id="thesis-hero-heading"
          className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(3.1rem,1.7rem+4.3vw,5.25rem)] font-normal leading-[0.94] tracking-[-0.012em] text-[#F8F7F3] md:whitespace-nowrap"
        >
          {HERO.lines.map((line) => (
            <span key={line} className="th-in th-line block">
              {line}
            </span>
          ))}
          <span className="th-in th-line block italic text-[#D8BD82]">{HERO.emphasis}</span>
        </h1>

        <span aria-hidden className="th-rule mt-7 block h-px w-14 origin-left bg-[#C7A86B]" />

        <p className="th-in th-copy mt-7 max-w-[580px] text-[15px] leading-[1.75] text-[#F5F2EA]/75 sm:text-[16px]">
          {HERO.copy}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={HERO.primaryCta.href}
            className="th-in th-cta group inline-flex h-[54px] items-center justify-center gap-3 bg-[linear-gradient(120deg,#C7A86B,#D8BD82_55%,#C7A86B)] px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#080A0D] transition-[filter] duration-300 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82]"
          >
            {HERO.primaryCta.label}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={HERO.secondaryCta.href}
            className="th-in th-cta inline-flex h-[54px] items-center justify-center border border-[#F5F2EA]/25 px-9 text-[12px] font-medium uppercase tracking-[0.2em] text-[#F5F2EA]/85 transition-colors duration-300 hover:border-[#D8BD82]/70 hover:text-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82]"
          >
            {HERO.secondaryCta.label}
          </a>
        </div>
      </div>

      {/* Editorial metrics: serif figures, hairline separators, no cards. */}
      <div className="relative border-t border-[#F5F2EA]/10 bg-[#05090E]/55 backdrop-blur-[2px]">
        <dl className="mx-auto grid max-w-[1464px] grid-cols-2 px-6 md:px-10 lg:grid-cols-4 lg:px-8">
          {HERO_METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`th-in th-metric flex flex-col-reverse justify-end py-6 sm:py-8 ${i % 2 === 1 ? "border-l border-[#F5F2EA]/10 pl-5 sm:pl-8" : "pr-5"} ${
                i >= 2 ? "border-t border-[#F5F2EA]/10 lg:border-t-0" : ""
              } lg:border-l lg:border-[#F5F2EA]/10 lg:pl-8 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
            >
              <dt className="mt-3 text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-[#F5F2EA]/60 sm:text-[11px]">
                {m.label}
              </dt>
              <dd className="font-['Cormorant_Garamond',serif] text-[40px] font-normal leading-none text-[#F8F7F3] sm:text-[48px]">
                {m.value}
                {"unit" in m && <span className="ml-1 text-[0.5em] tracking-wide text-[#F5F2EA]/80">{m.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div
          aria-hidden
          className="th-in th-scroll pointer-events-none absolute bottom-8 right-10 hidden flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#F5F2EA]/50 xl:flex"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-[#C7A86B] to-transparent" />
        </div>
      </div>
    </section>
  );
}
