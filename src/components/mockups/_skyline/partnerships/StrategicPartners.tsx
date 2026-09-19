import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { strategicPartners } from "../data";
import { InitialsPortrait } from "../InitialsPortrait";

export function StrategicPartners() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".sp-eyebrow", ".sp-heading-line", ".sp-copy", ".sp-card"], {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(".sp-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".sp-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".sp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".sp-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".sp-card",
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.15, ease: EASE.expo },
          0.5,
        )
        .fromTo(".sp-divider", { scaleY: 0 }, { scaleY: 1, duration: 0.7 }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="strategic-partners" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <p className="sp-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            STRATEGIC RELATIONSHIPS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="sp-heading-line inline-block">Relationships that expand</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="sp-heading-line inline-block">
                what is <em className="not-italic text-[#D8BD82]">possible.</em>
              </span>
            </span>
          </h2>
          <p className="sp-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65 md:text-[16.5px]">
            Skyline Holding maintains long-term relationships with
            international entrepreneurs, investors and strategic partners
            who share our perspective on disciplined, long-term value
            creation.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-16 md:mt-20">
          <span
            className="sp-divider absolute left-1/2 top-0 hidden h-full w-px origin-top bg-white/10 sm:block"
            aria-hidden
          />
          {strategicPartners.map((partner) => (
            <div key={partner.name} className="sp-card flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="relative aspect-[4/5] w-[220px] overflow-hidden border border-white/10 sm:w-[240px]">
                <InitialsPortrait name={partner.name} />
              </div>
              <span className="mt-6 h-px w-8 bg-[#C7A86B]/50" aria-hidden />
              <h3 className="mt-5 font-[Cormorant_Garamond] text-[26px] font-semibold text-[#F8F7F3]">
                {partner.name}
              </h3>
              <p className="mt-1.5 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                Strategic Partner
              </p>
              <a
                href={partner.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex min-h-11 items-center gap-1.5 font-[Inter] text-[13px] font-semibold text-[#F5F2EA]/85 transition-colors hover:text-[#D8BD82]"
              >
                External Profile
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
