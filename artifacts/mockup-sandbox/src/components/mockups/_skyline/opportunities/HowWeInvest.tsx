import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { investmentStructures } from "../data";

export function HowWeInvest() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".hi-eyebrow", ".hi-heading-line", ".hi-copy", ".hi-cta", ".hi-row"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".hi-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hi-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".hi-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".hi-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(
          ".hi-row",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
          0.5,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const [left, right] = [
    investmentStructures.slice(0, 4),
    investmentStructures.slice(4),
  ];

  return (
    <section ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="hi-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              HOW WE INVEST
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="hi-heading-line inline-block">Flexible capital.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hi-heading-line inline-block">
                  Structured around <em className="not-italic text-[#C7A86B]">opportunity.</em>
                </span>
              </span>
            </h2>
            <p className="hi-copy mt-6 max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              We evaluate different investment structures based on the
              characteristics of each opportunity and the objectives of
              the parties involved.
            </p>
            <a
              href="/investment-strategy"
              className="hi-cta group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Investment Approach
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]">
              POSSIBLE STRUCTURES
            </p>
            <div className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <div>
                {left.map((item) => (
                  <div key={item} className="hi-row flex items-center gap-3 border-b border-[#12161B]/10 py-4">
                    <span className="h-px w-4 bg-[#C7A86B]" aria-hidden />
                    <span className="font-[Inter] text-[15px] font-medium text-[#12161B]">{item}</span>
                  </div>
                ))}
              </div>
              <div>
                {right.map((item) => (
                  <div key={item} className="hi-row flex items-center gap-3 border-b border-[#12161B]/10 py-4">
                    <span className="h-px w-4 bg-[#C7A86B]" aria-hidden />
                    <span className="font-[Inter] text-[15px] font-medium text-[#12161B]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
