import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1400&auto=format&fit=crop";

const sideCopy = ["GOOD", "GOVERNANCE", "BUILDS", "GREATER", "TOMORROWS"];

export function CorporateGovernance() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cg-eyebrow", ".cg-heading-line", ".cg-copy", ".cg-cta", ".cg-image", ".cg-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cg-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cg-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".cg-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".cg-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".cg-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(".cg-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.7);

      if (window.innerWidth >= 1024) {
        gsap.set(".cg-image img", { scale: 1.12 });
        gsap.to(".cg-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="corporate-governance" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="cg-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              CORPORATE GOVERNANCE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="cg-heading-line inline-block">Clear structure.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="cg-heading-line inline-block">
                  Responsible <em className="not-italic text-[#C7A86B]">decisions.</em>
                </span>
              </span>
            </h2>
            <p className="cg-copy mt-7 max-w-[56ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We believe effective governance creates stronger businesses
              and better investment outcomes. Our approach emphasizes clear
              responsibilities, thoughtful oversight and decisions aligned
              with long-term objectives.
            </p>
            <a
              href="#governance-pillars"
              className="cg-cta group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Learn About Our Governance Framework
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="cg-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <img
                src={IMAGE}
                alt="Angular glass corporate towers viewed from street level against a bright sky"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/55 via-transparent to-transparent" />

              <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end gap-1">
                {sideCopy.map((label) => (
                  <span
                    key={label}
                    className="cg-label font-[Inter] text-[9.5px] font-semibold tracking-[0.14em] text-[#F5F2EA]/80"
                  >
                    {label}
                  </span>
                ))}
                <span className="cg-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
