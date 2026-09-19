import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { sectors } from "./data";

const spanClass: Record<(typeof sectors)[number]["span"], string> = {
  wide: "sm:col-span-2",
  tall: "lg:row-span-2",
  regular: "",
};

export function InvestmentFocus() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".if-panel", { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set([".if-eyebrow", ".if-heading-line", ".if-copy", ".if-cta"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".if-line", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      tl.fromTo(".if-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".if-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".if-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.4)
        .fromTo(".if-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
        .fromTo(".if-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);

      gsap.fromTo(
        ".if-panel",
        { opacity: 0, clipPath: "inset(8% 8% 8% 8%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.09,
          scrollTrigger: { trigger: ".if-grid", start: "top 80%" },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="investment-focus"
      ref={rootRef}
      className="relative bg-[#080A0D] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <p className="if-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.32em] text-[#D8BD82]">
            INVESTMENT FOCUS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.4vw,60px)] font-semibold leading-[1.0] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="if-heading-line inline-block">Investing in</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="if-heading-line inline-block">
                what&apos;s <em className="italic text-[#D8BD82]">next.</em>
              </span>
            </span>
          </h2>
          <span className="if-line mt-8 block h-px w-16 origin-left scale-x-0 bg-[#C7A86B]" />
          <p className="if-copy mt-8 max-w-[58ch] font-[Manrope] text-[16.5px] leading-[1.55] text-[#F5F2EA]/70 md:text-[18px]">
            We invest selectively across businesses, real assets and
            transformative industries where strong fundamentals, long-term
            relevance and active value creation can create enduring
            opportunity.
          </p>
          <a
            href="#strategic-advisory"
            className="if-cta group mt-8 inline-flex items-center gap-2 font-[Manrope] text-[14px] font-semibold tracking-[0.02em] text-[#F5F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
          >
            Explore Investment Strategy
            <ArrowUpRight
              className="size-4 text-[#D8BD82] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </div>

        <div className="if-grid mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-flow-dense lg:grid-cols-4 md:mt-20">
          {sectors.map((sector) => (
            <a
              key={sector.title}
              href="#strategic-advisory"
              className={`if-panel group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden bg-[#0B1624] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B] ${spanClass[sector.span]}`}
            >
              <img
                src={sector.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* Uniform tint so every image (bright or dark) starts from the same
                  baseline contrast, plus a bottom-heavy gradient so the text zone
                  is reliably dark regardless of what's behind it. */}
              <div className="absolute inset-0 bg-[#05060A]/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] from-5% via-[#05060A]/75 via-45% to-[#05060A]/0 to-85% transition-opacity duration-500 group-hover:from-[#05060A]" />

              <div className="relative z-10 p-5 md:p-6">
                <span className="if-panel-line block h-px w-8 origin-left scale-x-100 bg-[#C7A86B] transition-[width] duration-500 group-hover:w-14" />
                <h3 className="mt-3 max-w-[220px] font-[Cormorant_Garamond] text-[23px] font-semibold leading-[1.12] text-[#F8F7F3] [text-shadow:0_2px_10px_rgb(0_0_0_/_0.45)] md:text-[25px]">
                  {sector.title}
                </h3>
                <p className="mt-2 max-w-[240px] font-[Manrope] text-[13.5px] leading-[1.5] text-[#F5F2EA]/80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-[max-height,opacity] lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
                  {sector.description}
                </p>
                <ArrowUpRight
                  className="mt-3 size-4 -translate-x-1 text-[#D8BD82] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:mt-2"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
