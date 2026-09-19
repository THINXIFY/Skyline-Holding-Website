import { useEffect, useRef } from "react";
import { ArrowRight, Shield, Sprout, Target, Users } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { philosophyPrinciples } from "./data";

const IMAGE = "https://marbholding.com/wp-content/uploads/2026/09/philosophy-img.webp";

const icons = [Sprout, Target, Shield, Users];

export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ph-eyebrow", ".ph-heading-line", ".ph-copy", ".ph-principle", ".ph-cta", ".ph-label", ".ph-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set([".ph-tick", ".ph-divider"], { scaleY: 1 });
        gsap.set(".ph-line", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ph-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ph-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".ph-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: EASE.expo },
          0.15,
        )
        .fromTo(".ph-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
        .fromTo(
          ".ph-label",
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
          0.7,
        )
        .fromTo(
          ".ph-principle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          0.6,
        )
        .fromTo(
          ".ph-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.7,
        )
        .fromTo(".ph-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);

      if (window.innerWidth >= 1024) {
        gsap.set(".ph-image img", { scale: 1.1 });
        gsap.to(".ph-image img", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-6">
            <p className="ph-eyebrow flex items-center gap-4 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              OUR PHILOSOPHY
              <span className="h-px flex-1 bg-[#12161B]/10" aria-hidden />
            </p>
            <h2 className="mt-7 font-[Cormorant_Garamond] text-[clamp(42px,4.5vw,60px)] font-semibold leading-[0.98] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ph-heading-line inline-block">A more thoughtful</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ph-heading-line inline-block">approach to value.</span>
              </span>
            </h2>
            <p className="ph-copy mt-7 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              Meaningful investment goes beyond financial return. We focus on
              building stronger businesses, greater resilience and enduring
              value across changing market cycles.
            </p>
            <a
              href="#management-services"
              className="ph-cta group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Approach
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="ph-image aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/10] lg:aspect-auto lg:h-[400px]">
                <img
                  src={IMAGE}
                  alt="Skyline Holding leadership in conversation, overlooking a coastal skyline at dusk"
                  className="size-full object-cover will-change-transform"
                  style={{ objectPosition: "60% 42%" }}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/55 via-transparent to-[#080A0D]/10" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[26%] bg-gradient-to-r from-[#080A0D]/90 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[26%] bg-gradient-to-l from-[#080A0D]/90 to-transparent" />
              </div>

              <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end gap-1">
                {["HIGHER PERSPECTIVES", "BRIGHTER POSSIBILITIES"].map((label) => (
                  <span
                    key={label}
                    className="ph-label font-[Inter] text-[9.5px] font-semibold tracking-[0.14em] text-[#F5F2EA]/80"
                  >
                    {label}
                  </span>
                ))}
                <span className="ph-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>

              <div className="pointer-events-none absolute bottom-5 right-5 text-right">
                {["A MORE", "ENDURING", "TOMORROW"].map((label) => (
                  <span
                    key={label}
                    className="ph-label block font-[Inter] text-[9.5px] font-semibold tracking-[0.14em] text-[#F5F2EA]/80"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#12161B]/10 pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {philosophyPrinciples.map((principle, index) => {
            const Icon = icons[index];
            return (
              <div key={principle.title} className="ph-principle relative pl-0 sm:pl-6 sm:first:pl-0">
                {index > 0 && (
                  <span
                    className="ph-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                    aria-hidden
                  />
                )}
                <Icon className="text-[#C7A86B]" size={22} strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[21px] font-semibold leading-[1.15] text-[#12161B]">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-[30ch] font-[Inter] text-[14.5px] leading-[1.5] text-[#12161B]/60">
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
