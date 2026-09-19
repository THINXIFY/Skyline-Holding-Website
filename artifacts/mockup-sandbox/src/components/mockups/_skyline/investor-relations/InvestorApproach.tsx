import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

export function InvestorApproach() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ia2-eyebrow", ".ia2-heading-line", ".ia2-copy", ".ia2-cta", ".ia2-quote"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".ia2-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ia2-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ia2-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ia2-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".ia2-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(
          ".ia2-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.7, transformOrigin: "top" },
          0.5,
        )
        .fromTo(".ia2-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.75);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <p className="ia2-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR APPROACH
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ia2-heading-line inline-block">A relationship built</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ia2-heading-line inline-block">
                  on <em className="not-italic text-[#C7A86B]">clarity and alignment.</em>
                </span>
              </span>
            </h2>
            <p className="ia2-copy mt-7 max-w-[56ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We believe strong investor relationships begin with shared
              objectives, transparent communication and a clear
              understanding of how capital is deployed, managed and
              protected.
            </p>
            <a
              href="#who-we-work-with"
              className="ia2-cta group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Investor Philosophy
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="relative pl-8">
              <span
                className="ia2-divider absolute left-0 top-1 h-full w-px origin-top bg-[#C7A86B]/40"
                aria-hidden
              />
              <p className="ia2-quote font-[Cormorant_Garamond] text-[26px] italic leading-[1.35] text-[#12161B] md:text-[30px]">
                &ldquo;Long-term partnerships create extraordinary
                opportunities.&rdquo;
              </p>
              <p className="ia2-quote mt-5 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#C7A86B]">
                Skyline Holding
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
