import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const checklist = [
  "Company or opportunity name",
  "Sector and geography",
  "Indicative capital requirement",
  "A brief opportunity summary",
];

export function SubmitOpportunity() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".so-eyebrow", ".so-heading-line", ".so-copy", ".so-cta", ".so-panel", ".so-item"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      tl.fromTo(".so-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".so-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".so-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".so-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(".so-panel", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".so-item",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
          0.6,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="submit-opportunity" ref={rootRef} className="relative bg-[#F5F2EA]">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#0B1017] px-6 py-20 md:px-14 md:py-28">
          <p className="so-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            SUBMIT AN OPPORTUNITY
          </p>
          <h2 className="mt-6 max-w-[16ch] font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.05] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="so-heading-line inline-block">Have an opportunity</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="so-heading-line inline-block">worth exploring?</span>
            </span>
          </h2>
          <p className="so-copy mt-6 max-w-[48ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65">
            We welcome introductions from businesses, entrepreneurs,
            investors and strategic partners seeking long-term capital
            and a thoughtful investment relationship.
          </p>
          <a
            href="/contact"
            className="so-cta group mt-8 inline-flex min-h-[52px] w-fit items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Submit an Investment Opportunity
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </div>

        <div className="so-panel flex flex-col justify-center px-6 py-16 md:px-14 md:py-20">
          <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]">
            WHAT TO INCLUDE
          </p>
          <div className="mt-6 border-t border-[#12161B]/10">
            {checklist.map((item) => (
              <div key={item} className="so-item flex items-center gap-3 border-b border-[#12161B]/10 py-4">
                <span className="h-px w-4 shrink-0 bg-[#C7A86B]" aria-hidden />
                <span className="font-[Inter] text-[14.5px] font-medium text-[#12161B]">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[46ch] font-[Inter] text-[13px] leading-[1.55] text-[#12161B]/55">
            A brief introduction is enough to begin. Our team will
            follow up to discuss next steps.
          </p>
        </div>
      </div>
    </section>
  );
}
