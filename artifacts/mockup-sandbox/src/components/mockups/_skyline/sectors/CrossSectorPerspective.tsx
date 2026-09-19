import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { crossSectorThemes } from "../data";

export function CrossSectorPerspective() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".xs-eyebrow", ".xs-heading-line", ".xs-copy", ".xs-cta", ".xs-item"], { opacity: 1, y: 0 });
        gsap.set(".xs-divider", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".xs-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".xs-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".xs-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".xs-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
        .fromTo(
          ".xs-item",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.09 },
          0.4,
        )
        .fromTo(
          ".xs-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, stagger: 0.09, transformOrigin: "left" },
          0.45,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="xs-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              CROSS-SECTOR PERSPECTIVE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.0] text-white">
              <span className="block overflow-hidden pb-1">
                <span className="xs-heading-line inline-block">Opportunity often exists</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="xs-heading-line inline-block text-[#C7A86B]">between sectors.</span>
              </span>
            </h2>
            <p className="xs-copy mt-6 max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#9DA5AE]">
              Some of the most compelling investment themes sit at the
              intersection of industries — where innovation, capital and
              expertise converge.
            </p>
            <a
              href="/investment-opportunities"
              className="xs-cta group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-white/20 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-white transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Explore Opportunities
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {crossSectorThemes.map((item, index) => (
                <div
                  key={item.theme}
                  className={`xs-item group relative pt-6 pb-9 ${index === crossSectorThemes.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <span
                    className="xs-divider absolute top-0 left-0 h-px w-full bg-white/12 origin-left"
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[12px] font-semibold text-[#C7A86B]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 font-[Cormorant_Garamond] text-[21px] font-semibold leading-[1.2] text-white transition-transform duration-300 group-hover:translate-x-1 md:text-[23px]">
                    {item.theme.split(" × ")[0]}
                    <span className="text-[#C7A86B]">×</span>
                    {item.theme.split(" × ")[1]}
                  </h3>
                  <p
                    className={`mt-2.5 font-[Inter] text-[13.5px] leading-[1.55] text-[#9DA5AE] transition-colors duration-300 group-hover:text-[#F5F2EA]/85 ${index === crossSectorThemes.length - 1 ? "max-w-[52ch]" : "max-w-[34ch]"}`}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
