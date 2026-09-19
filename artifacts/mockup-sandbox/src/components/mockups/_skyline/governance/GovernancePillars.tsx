import { useEffect, useRef } from "react";
import { ArrowRight, Leaf, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { governancePillars } from "../data";

const icons = [ShieldCheck, TrendingUp, Scale, Leaf];

export function GovernancePillars() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".gp-eyebrow", ".gp-heading-line", ".gp-pillar"], { opacity: 1, y: 0 });
        gsap.set(".gp-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".gp-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".gp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".gp-pillar",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.4,
        )
        .fromTo(
          ".gp-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.12, transformOrigin: "top" },
          0.5,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="governance-pillars" ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <p className="gp-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
            <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
            OUR GOVERNANCE PILLARS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
            <span className="block overflow-hidden pb-1">
              <span className="gp-heading-line inline-block">A disciplined approach</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gp-heading-line inline-block">across every decision.</span>
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#12161B]/10 pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {governancePillars.map((pillar, index) => {
            const Icon = icons[index];
            return (
              <div key={pillar.title} className="gp-pillar relative pl-0 sm:pl-6 sm:first:pl-0">
                {index > 0 && (
                  <span
                    className="gp-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                    aria-hidden
                  />
                )}
                <Icon className="text-[#C7A86B]" size={22} strokeWidth={1.4} aria-hidden />
                <h3 className="mt-5 font-[Cormorant_Garamond] text-[21px] font-semibold leading-[1.15] text-[#12161B]">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 max-w-[30ch] font-[Inter] text-[14px] leading-[1.5] text-[#12161B]/60">
                  {pillar.body}
                </p>
                <a
                  href="/about"
                  className="group mt-4 inline-flex items-center gap-1.5 font-[Inter] text-[12.5px] font-semibold text-[#12161B] underline decoration-[#12161B]/25 underline-offset-4 transition-colors hover:text-[#C7A86B] hover:decoration-[#C7A86B]"
                >
                  {pillar.link}
                  <ArrowRight
                    className="size-3.5 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
