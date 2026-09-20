import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { PartnerLogoMarquee } from "./PartnerLogoMarquee";

/**
 * "Strategic network" logo showcase.
 *  - default: full section for the Strategic Partnerships page
 *  - compact: slimmer version for the Home page, with a link to the full page
 * Both render the same PartnerLogoMarquee and the same logo data.
 */
export function PartnerLogosSection({ compact = false }: { compact?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".pl-eyebrow", ".pl-heading-line", ".pl-copy", ".pl-strip", ".pl-link"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });

      tl.fromTo(".pl-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".pl-heading-line", { opacity: 0, y: "60%" }, { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 }, 0.1)
        .fromTo(".pl-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".pl-strip", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
        .fromTo(".pl-link", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby={compact ? "partner-logos-heading-compact" : "partner-logos-heading"}
      className={`relative overflow-hidden bg-[#0B1624] ${compact ? "py-16 md:py-20" : "py-24 md:py-32"}`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {compact ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="pl-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
                <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
                STRATEGIC NETWORK
              </p>
              <h2
                id="partner-logos-heading-compact"
                className="mt-4 font-[Cormorant_Garamond] text-[clamp(28px,3vw,38px)] font-semibold leading-[1.05] text-[#F8F7F3]"
              >
                <span className="block overflow-hidden pb-1">
                  <span className="pl-heading-line inline-block">
                    Selected <em className="italic text-[#D8BD82]">strategic partners.</em>
                  </span>
                </span>
              </h2>
            </div>
            <a
              href="/strategic-partnerships"
              className="pl-link group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[13px] font-semibold text-[#F5F2EA]/80 transition-colors duration-300 hover:text-[#D8BD82] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Explore Strategic Partnerships
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        ) : (
          <div className="max-w-[760px]">
            <p className="pl-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              STRATEGIC NETWORK
            </p>
            <h2
              id="partner-logos-heading"
              className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#F8F7F3]"
            >
              <span className="block overflow-hidden pb-1">
                <span className="pl-heading-line inline-block">Partnerships built around</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="pl-heading-line inline-block">
                  <em className="italic text-[#D8BD82]">long-term value.</em>
                </span>
              </span>
            </h2>
            <p className="pl-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65 md:text-[16.5px]">
              Skyline Holding works with selected organizations and strategic relationships across key international
              markets and sectors.
            </p>
          </div>
        )}
      </div>

      <div className={`pl-strip ${compact ? "mt-9 md:mt-10" : "mt-14 md:mt-16"}`}>
        <PartnerLogoMarquee size={compact ? "compact" : "full"} />
      </div>
    </section>
  );
}
