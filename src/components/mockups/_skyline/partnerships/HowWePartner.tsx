import { useEffect, useRef } from "react";
import { ArrowRight, Compass, Handshake, TrendingUp, Zap } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { partnershipJourney } from "../data";

const icons = [Compass, Handshake, Zap, TrendingUp];

export function HowWePartner() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".hp-eyebrow", ".hp-heading-line", ".hp-copy", ".hp-cta", ".hp-marquee"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".hp-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".hp-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".hp-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(".hp-marquee", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const loopedSteps = [...partnershipJourney, ...partnershipJourney];

  return (
    <section id="how-we-partner" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="hp-eyebrow flex items-center justify-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            HOW WE PARTNER
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="hp-heading-line inline-block">From alignment</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hp-heading-line inline-block text-[#D8BD82]">to lasting impact.</span>
            </span>
          </h2>
          <p className="hp-copy mx-auto mt-6 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
            We structure flexible partnerships that bring together capital,
            expertise and strategic insight, enabling us to move quickly
            and effectively on opportunities.
          </p>
          <a
            href="/contact"
            className="hp-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
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

      {/* Full-bleed marquee band: breaks out of the container so the motion
          reads as a continuous editorial strip, not content boxed in. */}
      <div className="hp-marquee relative left-1/2 mt-16 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 md:mt-20">
        <div className="hp-marquee-track flex w-max">
          {loopedSteps.map((step, i) => {
            const Icon = icons[i % icons.length];
            const number = `0${(i % partnershipJourney.length) + 1}`;
            return (
              <div
                key={`${step.label}-${i}`}
                className="group flex w-[300px] shrink-0 items-start gap-4 border-r border-white/10 px-7 py-10 transition-colors duration-400 hover:bg-white/[0.03] sm:w-[360px] sm:px-9"
              >
                <span className="font-[Inter] text-[12.5px] font-semibold text-[#D8BD82]/70">{number}</span>
                <div className="transition-transform duration-400 group-hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5">
                    <Icon className="text-[#D8BD82]" size={16} strokeWidth={1.5} aria-hidden />
                    <h3 className="font-[Cormorant_Garamond] text-[21px] font-semibold uppercase tracking-wide text-[#F8F7F3] transition-colors duration-400 group-hover:text-[#D8BD82]">
                      {step.label}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[26ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#9DA5AE]">
                    {step.body}
                  </p>
                  <span className="mt-4 block h-px w-8 bg-[#C7A86B]/40 transition-all duration-400 group-hover:w-14 group-hover:bg-[#C7A86B]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
