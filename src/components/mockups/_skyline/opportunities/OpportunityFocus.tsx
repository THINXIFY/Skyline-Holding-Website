import { useEffect, useRef } from "react";
import { Briefcase, Landmark, Puzzle, Target, TrendingUp, Users2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { opportunityTypes } from "../data";

const icons = [TrendingUp, Briefcase, Landmark, Target, Puzzle, Users2];

export function OpportunityFocus() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".of-eyebrow", ".of-heading-line", ".of-copy", ".of-col"], { opacity: 1, y: 0 });
        gsap.set(".of-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".of-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".of-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".of-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".of-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, stagger: 0.06, transformOrigin: "top" },
          0.55,
        )
        .fromTo(
          ".of-col",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.6,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="opportunity-focus" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <p className="of-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
            <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
            OUR OPPORTUNITY FOCUS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#12161B]">
            <span className="block overflow-hidden pb-1">
              <span className="of-heading-line inline-block">Selective opportunities.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="of-heading-line inline-block">
                Long-term <em className="not-italic text-[#C7A86B]">potential.</em>
              </span>
            </span>
          </h2>
          <p className="of-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
            We focus on opportunities with strong fundamentals, clear
            strategic relevance and the potential to benefit from active
            ownership, capital support and long-term partnership.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-20 lg:grid-cols-6 lg:gap-x-0">
          {opportunityTypes.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="of-col relative lg:px-6 lg:first:pl-0 lg:last:pr-0">
                {index > 0 && (
                  <span
                    className="of-divider absolute -left-3 top-1 hidden h-16 w-px bg-[#12161B]/12 lg:block"
                    aria-hidden
                  />
                )}
                <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.3} aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[18px] font-semibold leading-[1.15] text-[#12161B]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[22ch] font-[Inter] text-[12.5px] leading-[1.5] text-[#12161B]/60">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
