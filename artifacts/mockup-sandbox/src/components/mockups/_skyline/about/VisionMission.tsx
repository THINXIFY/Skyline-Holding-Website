import { useEffect, useRef } from "react";
import { Eye, Target } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

export function VisionMission() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".vm-eyebrow", ".vm-heading-line", ".vm-panel"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".vm-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".vm-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(
          ".vm-panel",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[620px]">
          <p className="vm-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
            <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
            VISION &amp; MISSION
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
            <span className="block overflow-hidden pb-1">
              <span className="vm-heading-line inline-block">A clearer vision.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="vm-heading-line inline-block">A stronger tomorrow.</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="vm-panel group rounded-[6px] border border-[#12161B]/10 bg-[#F8F7F3] p-8 transition-all duration-400 hover:-translate-y-1 hover:border-[#C7A86B]/50 md:p-10">
            <span className="flex size-11 items-center justify-center rounded-full border border-[#C7A86B] text-[#C7A86B] transition-transform duration-400 group-hover:-rotate-6 group-hover:scale-105">
              <Eye size={18} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="mt-6 block h-px w-10 bg-[#C7A86B]" aria-hidden />
            <p className="mt-4 font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C7A86B]">
              Our Vision
            </p>
            <h3 className="mt-3 font-[Cormorant_Garamond] text-[26px] font-semibold leading-[1.15] text-[#12161B] md:text-[28px]">
              To build a trusted global holding company for the next
              generation of opportunity.
            </h3>
            <p className="mt-4 max-w-[46ch] font-[Inter] text-[15px] leading-[1.5] text-[#12161B]/60">
              Our vision is to create a diversified international platform
              known for disciplined investment, strong partnerships and the
              ability to build enduring value across industries and market
              cycles.
            </p>
          </div>

          <div className="vm-panel group rounded-[6px] border border-white/10 bg-[#0B1624] p-8 transition-all duration-400 hover:-translate-y-1 hover:border-[#C7A86B]/50 md:p-10">
            <span className="flex size-11 items-center justify-center rounded-full border border-[#C7A86B] text-[#D8BD82] transition-transform duration-400 group-hover:rotate-6 group-hover:scale-105">
              <Target size={18} strokeWidth={1.5} aria-hidden />
            </span>
            <span className="mt-6 block h-px w-10 bg-[#C7A86B]" aria-hidden />
            <p className="mt-4 font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
              Our Mission
            </p>
            <h3 className="mt-3 font-[Cormorant_Garamond] text-[26px] font-semibold leading-[1.15] text-[#F8F7F3] md:text-[28px]">
              To identify opportunity, invest with conviction and help build
              stronger businesses.
            </h3>
            <p className="mt-4 max-w-[46ch] font-[Inter] text-[15px] leading-[1.5] text-[#F5F2EA]/55">
              Our mission is to combine capital, strategic expertise and an
              owner&rsquo;s mindset to support businesses, assets and
              partners with long-term growth potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
