import { useEffect, useRef } from "react";
import { Compass, Gem, Scale, ShieldCheck, TrendingUp } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { investmentCriteria } from "../data";

const icons = [Compass, Gem, ShieldCheck, Scale, TrendingUp];

export function InvestmentCriteria() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ic-eyebrow", ".ic-heading-line", ".ic-intro", ".ic-card"], { opacity: 1, y: 0 });
        gsap.set(".ic-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".ic-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ic-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ic-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left" }, 0.25)
        .fromTo(".ic-intro", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".ic-card",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="criteria" ref={rootRef} className="relative bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="ic-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="ic-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
              INVESTMENT CRITERIA
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ic-heading-line inline-block">What guides every</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ic-heading-line inline-block">investment decision.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="ic-intro max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#9DA5AE] lg:ml-auto lg:text-right">
              Every opportunity is assessed against a consistent strategic
              framework designed to protect capital, preserve flexibility
              and focus attention on quality.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:mt-20">
          {investmentCriteria.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={item.title}
                className="ic-card group border border-white/10 bg-white/[.02] p-7 transition-all duration-400 hover:-translate-y-0.5 hover:border-[#C7A86B]/50 hover:bg-white/[.045]"
              >
                <Icon
                  className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:scale-105"
                  size={22}
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-6 font-[Cormorant_Garamond] text-[19px] font-semibold leading-[1.2] text-[#F8F7F3] transition-transform duration-400 group-hover:-translate-y-0.5">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-[Inter] text-[13px] leading-[1.5] text-[#9DA5AE] transition-colors duration-400 group-hover:text-[#F5F2EA]/75">
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
