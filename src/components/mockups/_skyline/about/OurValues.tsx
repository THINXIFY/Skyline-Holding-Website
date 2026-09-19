import { useEffect, useRef } from "react";
import { ArrowRight, Compass, Eye, Scale, Shield, TrendingUp, Users } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { aboutValues } from "../data";

const icons = [Shield, Scale, Users, Eye, Compass, TrendingUp];

export function OurValues() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ov-eyebrow", ".ov-heading-line", ".ov-cta", ".ov-card"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ov-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ov-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ov-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3)
        .fromTo(
          ".ov-card",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.35,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <p className="ov-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR VALUES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ov-heading-line inline-block">The principles behind</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ov-heading-line inline-block">every decision.</span>
              </span>
            </h2>
          </div>
          <a
            href="/about"
            className="ov-cta group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[13.5px] font-semibold text-[#12161B]"
          >
            <span className="relative">
              Our Culture
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C7A86B] transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight
              className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aboutValues.map((value, index) => {
            const Icon = icons[index];
            return (
              <div
                key={value.title}
                className="ov-card group rounded-[6px] border border-[#12161B]/10 bg-[#F5F2EA] p-7 transition-all duration-400 hover:-translate-y-1 hover:border-[#C7A86B]/60"
              >
                <Icon
                  className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                  size={22}
                  strokeWidth={1.4}
                  aria-hidden
                />
                <h3 className="mt-5 font-[Cormorant_Garamond] text-[21px] font-semibold text-[#12161B]">
                  {value.title}
                </h3>
                <p className="mt-2 font-[Inter] text-[14px] leading-[1.5] text-[#12161B]/60 transition-colors duration-400 group-hover:text-[#12161B]/75">
                  {value.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
