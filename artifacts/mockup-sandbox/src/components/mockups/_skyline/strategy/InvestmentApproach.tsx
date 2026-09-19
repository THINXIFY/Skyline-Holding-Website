import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, Target, Users } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { investmentApproachPrinciples } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1400&auto=format&fit=crop";

const icons = [BarChart3, Target, Users];

export function InvestmentApproach() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ia-eyebrow", ".ia-heading-line", ".ia-copy", ".ia-cta", ".ia-image", ".ia-principle", ".ia-aside"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".ia-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ia-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ia-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".ia-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".ia-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.4)
        .fromTo(".ia-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6)
        .fromTo(".ia-aside", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.75)
        .fromTo(
          ".ia-principle",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.55,
        )
        .fromTo(
          ".ia-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.12, transformOrigin: "top" },
          0.65,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".ia-image img", { scale: 1.12 });
        gsap.to(".ia-image img", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5">
            <p className="ia-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR INVESTMENT APPROACH
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ia-heading-line inline-block">How we evaluate</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ia-heading-line inline-block">opportunity.</span>
              </span>
            </h2>
            <p className="ia-copy mt-7 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              Our strategy is built on disciplined analysis, selective
              conviction and a long-term view. We seek opportunities where
              strong fundamentals, resilient demand and active involvement
              can create lasting value.
            </p>
            <a
              href="#criteria"
              className="ia-cta group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Approach in Practice
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-end gap-6 lg:gap-8">
              <div className="ia-image relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px]">
                <img
                  src={IMAGE}
                  alt="Angular modern architecture viewed from below against a bright sky"
                  className="size-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>

              <p className="ia-aside hidden shrink-0 max-w-[130px] font-[Cormorant_Garamond] text-[19px] italic leading-[1.3] text-[#12161B]/55 lg:block">
                Disciplined today for a brighter tomorrow.
                <span className="mt-3 block h-px w-8 bg-[#C7A86B]" aria-hidden />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#12161B]/10 pt-10 sm:grid-cols-3 md:mt-20">
          {investmentApproachPrinciples.map((principle, index) => {
            const Icon = icons[index];
            return (
              <div key={principle.title} className="ia-principle relative pl-0 sm:pl-6 sm:first:pl-0">
                {index > 0 && (
                  <span
                    className="ia-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                    aria-hidden
                  />
                )}
                <Icon className="text-[#C7A86B]" size={22} strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[21px] font-semibold leading-[1.15] text-[#12161B]">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-[34ch] font-[Inter] text-[14.5px] leading-[1.5] text-[#12161B]/60">
                  {principle.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
