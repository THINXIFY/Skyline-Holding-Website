import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE = "/images/slide-1.webp";

export function SectorsFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".sf-eyebrow", ".sf-heading-line", ".sf-copy", ".sf-cta", ".sf-image"], { opacity: 1, y: 0 });
        gsap.set(".sf-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".sf-image", { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".sf-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left" }, 0.15)
        .fromTo(".sf-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".sf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".sf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo(".sf-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0.9);

      if (window.innerWidth >= 1024) {
        gsap.to(".sf-image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[76vh] items-center overflow-hidden bg-[#080A0D] py-28">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="sf-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/88 via-[#080A0D]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-[#080A0D]/30" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[620px]">
          <span className="sf-rule block h-px w-16 bg-[#C7A86B]" aria-hidden />
          <p className="sf-eyebrow mt-7 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            EXPLORE WITH SKYLINE
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(38px,4.6vw,56px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="sf-heading-line inline-block">Opportunity has</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="sf-heading-line inline-block">
                many <em className="italic text-[#D8BD82]">forms.</em>
              </span>
            </span>
          </h2>
          <p className="sf-copy mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
            We welcome conversations with businesses, investors and
            partners operating across our investment sectors.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/investment-opportunities"
              className="sf-cta group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Investment Opportunities
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href="/contact"
              className="sf-cta group inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70"
            >
              Start a Conversation
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
