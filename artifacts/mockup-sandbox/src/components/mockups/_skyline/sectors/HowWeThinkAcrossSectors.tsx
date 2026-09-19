import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { sectorPrinciples } from "../data";

export function HowWeThinkAcrossSectors() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ht-heading-line", ".ht-item"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      tl.fromTo(
        ".ht-heading-line",
        { opacity: 0, y: "60%" },
        { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
      ).fromTo(
        ".ht-item",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
        0.3,
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <h2 className="max-w-[560px] font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.05] text-[#12161B]">
          <span className="block overflow-hidden pb-1">
            <span className="ht-heading-line inline-block">Different industries.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="ht-heading-line inline-block">
              Consistent <em className="not-italic text-[#C7A86B]">principles.</em>
            </span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 border-t border-[#12161B]/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {sectorPrinciples.map((principle, index) => (
            <div
              key={principle}
              className="ht-item border-b border-r-0 border-[#12161B]/10 py-7 pr-6 sm:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <span className="font-[Inter] text-[12px] font-semibold text-[#C7A86B]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[Cormorant_Garamond] text-[20px] font-semibold leading-[1.2] text-[#12161B]">
                {principle}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
