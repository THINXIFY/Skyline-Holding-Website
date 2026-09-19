import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1800&auto=format&fit=crop";

const themes = ["PEOPLE", "PRINCIPLES", "PROGRESS", "TOGETHER"];

export function GovernanceFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".gf-eyebrow", ".gf-heading-line", ".gf-copy", ".gf-cta", ".gf-side"], { opacity: 1, y: 0 });
        gsap.set(".gf-image", { scale: 1 });
        gsap.set(".gf-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      tl.fromTo(".gf-image", { scale: 1.05 }, { scale: 1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".gf-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left" }, 0.15)
        .fromTo(".gf-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".gf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".gf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo(".gf-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.9)
        .fromTo(
          ".gf-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          0.85,
        );

      if (window.innerWidth >= 1024) {
        gsap.to(".gf-image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[76vh] items-center overflow-hidden bg-[#080A0D] py-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="gf-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/90 via-[#080A0D]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/40" />
      </div>

      <div className="gf-side pointer-events-none absolute right-10 top-1/2 z-[4] hidden -translate-y-1/2 flex-col items-end gap-1.5 lg:flex xl:right-16">
        {themes.map((w) => (
          <span key={w} className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[660px]">
          <span className="gf-rule block h-px w-16 bg-[#C7A86B]" aria-hidden />
          <p className="gf-eyebrow mt-7 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            OUR COMMITMENT
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(38px,5vw,58px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="gf-heading-line inline-block">Trust is built through</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gf-heading-line inline-block">
                how we <em className="italic text-[#D8BD82]">operate.</em>
              </span>
            </span>
          </h2>
          <p className="gf-copy mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
            Skyline is committed to maintaining governance standards that
            support responsible growth, strong partnerships and long-term
            confidence.
          </p>
          <div className="gf-cta mt-9">
            <a
              href="/about"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Learn More About Our Governance
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
