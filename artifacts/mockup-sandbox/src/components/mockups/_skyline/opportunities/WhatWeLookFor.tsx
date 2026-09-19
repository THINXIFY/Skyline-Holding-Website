import { useEffect, useRef } from "react";
import { BarChart3, Clock, Gem, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { opportunityCriteria } from "../data";

const icons = [Gem, Clock, BarChart3, Target, ShieldCheck, HeartHandshake];

export function WhatWeLookFor() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".wl-eyebrow", ".wl-heading-line", ".wl-copy", ".wl-item"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".wl-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".wl-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".wl-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".wl-item",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.08 },
          0.5,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F2EA 1px, transparent 1px), linear-gradient(90deg, #F5F2EA 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <p className="wl-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            WHAT WE LOOK FOR
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="wl-heading-line inline-block">What makes an opportunity</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="wl-heading-line inline-block text-[#D8BD82]">compelling.</span>
            </span>
          </h2>
          <p className="wl-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65">
            Every opportunity is considered individually, but our
            approach is guided by a consistent set of principles.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 md:mt-20 lg:grid-cols-6 lg:divide-x lg:divide-white/10">
          {opportunityCriteria.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="wl-item lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.3} aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[18px] font-semibold leading-[1.15] text-[#F8F7F3]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[22ch] font-[Inter] text-[12.5px] leading-[1.5] text-[#9DA5AE]">
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
