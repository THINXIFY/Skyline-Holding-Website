import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE = "/images/slide-2.webp";

const themes = ["Global Perspective", "Trusted Relationships", "Shared Success", "Long-Term Value"];

export function PartnershipsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ph2-eyebrow", ".ph2-heading-line", ".ph2-copy", ".ph2-cta", ".ph2-theme", ".ph2-side"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".ph2-rule", { scaleX: 1 });
        gsap.set(".ph2-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".ph2-image", { scale: 1.04 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".ph2-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.35,
        )
        .fromTo(".ph2-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .fromTo(
          ".ph2-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .fromTo(".ph2-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(".ph2-cta", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 1.15)
        .fromTo(
          ".ph2-theme",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          1.3,
        )
        .fromTo(
          ".ph2-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.0,
        );

      gsap.to(".ph2-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".ph2-overlay", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
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
        <div className="ph2-image absolute inset-0 will-change-transform">
          <img
            src={IMAGE}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: "68% center" }}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/85 via-[#080A0D]/25 to-transparent" />
        <div className="ph2-overlay absolute inset-0 bg-[#080A0D]/25 opacity-0" />
      </div>

      <HeroParticles reduceMotion={reduceMotion} density={{ desktop: 30, tablet: 20, mobile: 12 }} />

      <div className="ph2-side pointer-events-none absolute right-10 top-32 z-[4] hidden flex-col items-end gap-1.5 lg:flex xl:right-16">
        {["CAPITAL", "PEOPLE", "IDEAS", "OPPORTUNITIES", "A BRIGHTER TOMORROW"].map((w) => (
          <span
            key={w}
            className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70"
          >
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[760px]">
          <p className="ph2-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="ph2-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            STRATEGIC PARTNERSHIPS
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(54px,6vw,82px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="ph2-heading-line inline-block">Together for</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="ph2-heading-line inline-block">
                a <em className="italic text-[#D8BD82]">greater tomorrow.</em>
              </span>
            </span>
          </h1>
          <p className="ph2-copy mt-7 max-w-[54ch] font-[Inter] text-[17px] leading-[1.55] text-[#F5F2EA]/75 md:text-[19px]">
            We build long-term partnerships with investors, institutions,
            family offices and entrepreneurs who share our vision for
            sustainable growth, responsible capital and enduring value.
          </p>
          <div className="ph2-cta mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#partner-types"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Explore Partnership Opportunities
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href="#partnership-approach"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Our Approach
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-6">
            {themes.map((theme) => (
              <span
                key={theme}
                className="ph2-theme font-[Inter] text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#9DA5AE]"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
