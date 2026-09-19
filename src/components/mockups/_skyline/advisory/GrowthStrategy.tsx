import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "../gsap";
import { growthJourneyStages } from "../data";

export function GrowthStrategy() {
  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".gs-eyebrow", ".gs-heading-line", ".gs-copy", ".gs-focus", ".gs-cta", ".gs-journey"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".gs-progress", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".gs-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".gs-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".gs-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".gs-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".gs-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(".gs-journey", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4);

      gsap.set(".gs-progress", { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.create({
        trigger: journeyRef.current,
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(".gs-progress", { scaleX: self.progress });
          setActiveIndex(Math.min(growthJourneyStages.length - 1, Math.floor(self.progress * growthJourneyStages.length)));
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="growth-strategy" ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="gs-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              GROWTH STRATEGY
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="gs-heading-line inline-block">Turning potential</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="gs-heading-line inline-block">into sustainable growth.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="gs-copy max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65 lg:ml-auto">
              We help businesses identify where to grow, how to prioritize
              opportunities and what capabilities are needed to execute
              successfully.
            </p>
          </div>
        </div>

        <div ref={journeyRef} className="gs-journey mt-16 md:mt-20">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#12161B]/8">
            <span className="gs-progress absolute inset-y-0 left-0 block h-full w-full rounded-full bg-[#C7A86B]" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {growthJourneyStages.map((stage, index) => {
              const isActive = index <= activeIndex;
              return (
                <div key={stage.label}>
                  <span
                    className={`font-[Inter] text-[12px] font-semibold tracking-[0.14em] transition-colors duration-400 ${
                      isActive ? "text-[#C7A86B]" : "text-[#12161B]/30"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <h3
                    className={`mt-2 font-[Cormorant_Garamond] text-[24px] font-semibold uppercase leading-[1.1] transition-colors duration-400 ${
                      isActive ? "text-[#12161B]" : "text-[#12161B]/30"
                    }`}
                  >
                    {stage.label}
                  </h3>
                  <p
                    className={`mt-2 max-w-[28ch] font-[Inter] text-[13px] leading-[1.5] transition-colors duration-400 ${
                      isActive ? "text-[#12161B]/60" : "text-[#12161B]/25"
                    }`}
                  >
                    {stage.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[#12161B]/10 pt-8 sm:grid-cols-4">
          {["Growth Opportunities", "Market Prioritization", "Business Model Development", "Execution Planning"].map(
            (title) => (
              <div key={title} className="gs-focus">
                <span className="block h-px w-6 bg-[#C7A86B]" aria-hidden />
                <span className="mt-3 block font-[Inter] text-[13px] font-semibold leading-[1.3] text-[#12161B]">
                  {title}
                </span>
              </div>
            ),
          )}
        </div>

        <a
          href="/contact"
          className="gs-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
        >
          Explore Growth Strategy
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
