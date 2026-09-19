import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE = "/images/slide-1.webp";

const sideThemes = [
  "Selective Opportunities",
  "Long-Term Perspective",
  "Active Partnership",
  "Sustainable Growth",
];

export function StrategyHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".sh-eyebrow", ".sh-heading-line", ".sh-copy", ".sh-cta", ".sh-meta", ".sh-side"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".sh-rule", { scaleX: 1 });
        gsap.set(".sh-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".sh-image", { scale: 1.06 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".sh-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.35,
        )
        .fromTo(".sh-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .fromTo(
          ".sh-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .fromTo(".sh-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(".sh-cta", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 1.15)
        .fromTo(".sh-meta", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, 1.3)
        .fromTo(
          ".sh-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.0,
        );

      gsap.to(".sh-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".sh-overlay", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".sh-side-wrap", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "10% top", end: "55% top", scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#080A0D] pb-20 pt-32 md:pb-24"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="sh-image absolute inset-0 will-change-transform">
          <img
            src={IMAGE}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: "70% center" }}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/85 via-[#080A0D]/25 to-transparent" />
        <div className="sh-overlay absolute inset-0 bg-[#080A0D]/25 opacity-0" />
      </div>

      <HeroParticles reduceMotion={reduceMotion} density={{ desktop: 30, tablet: 20, mobile: 12 }} />

      <div className="sh-side-wrap pointer-events-none absolute right-10 top-32 z-[4] hidden flex-col items-end gap-2 lg:flex xl:right-16">
        {sideThemes.map((theme) => (
          <span
            key={theme}
            className="sh-side font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F5F2EA]/70"
          >
            {theme}
          </span>
        ))}
        <span className="sh-side mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="pointer-events-none absolute bottom-10 right-10 z-[4] hidden flex-col items-center gap-3 lg:flex xl:right-16">
        <span className="font-[Inter] text-[10px] tracking-[0.35em] text-[#9DA5AE] [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[#C7A86B]/80 to-transparent" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[760px]">
          <p className="sh-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="sh-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            INVESTMENT STRATEGY
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(54px,6vw,82px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="sh-heading-line inline-block">A disciplined strategy</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="sh-heading-line inline-block">for enduring value.</span>
            </span>
          </h1>
          <p className="sh-copy mt-7 max-w-[54ch] font-[Inter] text-[17px] leading-[1.55] text-[#F5F2EA]/75 md:text-[19px]">
            Skyline Holding invests selectively across businesses, real assets
            and transformative industries where disciplined capital,
            long-term relevance and active value creation can unlock
            enduring opportunity.
          </p>
          <div className="sh-cta mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#approach"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Explore Our Approach
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Discuss an Opportunity
            </a>
          </div>
          <div className="sh-meta mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
            <span className="h-px w-6 bg-[#C7A86B]" aria-hidden />
            <span className="font-[Inter] text-[12px] font-medium uppercase tracking-[0.14em] text-[#9DA5AE]">
              Selective. Structured. Long-term.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
