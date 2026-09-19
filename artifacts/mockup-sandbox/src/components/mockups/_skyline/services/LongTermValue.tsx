import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { longTermDifferentiators } from "../data";

const IMAGE = "/images/slide-1.webp";

export function LongTermValue() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".lv-eyebrow", ".lv-heading-line", ".lv-copy", ".lv-diff", ".lv-image", ".lv-quote"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".lv-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".lv-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".lv-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".lv-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".lv-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".lv-diff",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.6,
        )
        .fromTo(
          ".lv-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.09, transformOrigin: "top" },
          0.7,
        )
        .fromTo(".lv-quote", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9);

      if (window.innerWidth >= 1024) {
        gsap.set(".lv-image img", { scale: 1.12 });
        gsap.to(".lv-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="long-term-value" ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="lv-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              A PARTNER FOR WHAT&rsquo;S AHEAD
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="lv-heading-line inline-block">Focused on</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="lv-heading-line inline-block text-[#D8BD82]">long-term value.</span>
              </span>
            </h2>
            <p className="lv-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              We take a holistic and forward-looking approach to capital
              management, helping clients navigate change, capture
              opportunity and build more resilient financial futures.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4">
              {longTermDifferentiators.map((item, index) => (
                <div key={item} className="lv-diff relative pl-0 sm:pl-6 sm:first:pl-0">
                  {index > 0 && (
                    <span
                      className="lv-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-white/10 sm:block"
                      aria-hidden
                    />
                  )}
                  <span className="block font-[Inter] text-[13px] font-semibold leading-[1.3] text-[#F5F2EA]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="lv-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1017] sm:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <img
                src={IMAGE}
                alt="A city skyline viewed from a private balcony at dusk"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-transparent" />

              <div className="lv-quote pointer-events-none absolute bottom-6 left-6 max-w-[260px] border-l border-[#D8BD82]/50 pl-4">
                <p className="font-[Cormorant_Garamond] text-[19px] italic leading-[1.3] text-[#F5F2EA]/90">
                  &ldquo;Discipline today. Opportunity tomorrow.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
