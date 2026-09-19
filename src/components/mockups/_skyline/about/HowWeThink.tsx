import { useEffect, useRef } from "react";
import { FileSearch, Hourglass, Settings2, ShieldCheck, Telescope, Users2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { thinkingPrinciples } from "../data";

const icons = [Hourglass, Telescope, FileSearch, Users2, ShieldCheck, Settings2];

export function HowWeThink() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".hw-eyebrow", ".hw-heading-line", ".hw-intro", ".hw-card", ".hw-quote"],
          { opacity: 1, y: 0 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".hw-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hw-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".hw-intro", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".hw-card",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.4,
        )
        .fromTo(".hw-quote", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="hw-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            HOW WE THINK
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="hw-heading-line inline-block">Long-term thinking.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hw-heading-line inline-block">Selective action.</span>
            </span>
          </h2>
          <p className="hw-intro mt-7 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/60 md:text-[17px]">
            We do not believe in investing simply for activity. We believe in
            understanding an opportunity deeply before committing capital.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {thinkingPrinciples.map((principle, index) => {
            const Icon = icons[index];
            return (
              <div
                key={principle.title}
                className="hw-card group rounded-[6px] border border-white/10 bg-white/[.03] p-7 transition-all duration-400 hover:-translate-y-1 hover:border-[#C7A86B]/50 hover:bg-white/[.05]"
              >
                <Icon
                  className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
                  size={22}
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-5 font-[Cormorant_Garamond] text-[20px] font-semibold text-[#F8F7F3]">
                  {principle.title}
                </h3>
                <p className="mt-2 font-[Inter] text-[13.5px] leading-[1.5] text-[#9DA5AE]">
                  {principle.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="hw-quote mt-16 border-l border-[#D8BD82]/40 pl-5 font-[Cormorant_Garamond] text-[20px] italic leading-[1.35] text-[#F5F2EA]/80 md:max-w-[60ch]">
          We invest with patience, act with conviction and build with the
          long term in mind.
        </p>
      </div>
    </section>
  );
}
