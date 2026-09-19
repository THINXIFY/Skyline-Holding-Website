import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE = "https://marbholding.com/wp-content/uploads/2026/09/about-sec-img.webp";

export function AboutWhoWeAre() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".aw-eyebrow", ".aw-heading-line", ".aw-copy", ".aw-cta", ".aw-image", ".aw-label", ".aw-note"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".aw-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".aw-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(
          ".aw-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".aw-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.4)
        .fromTo(".aw-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.65)
        .fromTo(".aw-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.7)
        .fromTo(".aw-note", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85);

      if (window.innerWidth >= 1024) {
        gsap.set(".aw-image img", { scale: 1.12 });
        gsap.to(".aw-image img", {
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
          <div className="lg:col-span-5">
            <p className="aw-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              WHO WE ARE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="aw-heading-line inline-block">
                  An independent holding company built for{" "}
                  <em className="italic text-[#C7A86B]">long-term value.</em>
                </span>
              </span>
            </h2>
            <p className="aw-copy mt-7 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              Skyline Holding brings together capital, strategic insight and
              an international perspective to invest in businesses, real
              assets and industries with long-term potential.
            </p>
            <p className="aw-copy mt-4 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We focus on opportunities where disciplined capital, strong
              partnerships and active support can create meaningful value
              over time.
            </p>
            <a
              href="/#investment-focus"
              className="aw-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Our Approach
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-start gap-6">
              <div className="aw-image relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px]">
                <img
                  src={IMAGE}
                  alt="A cantilevered modern residence overlooking mountains and a lake at sunset"
                  className="size-full object-cover will-change-transform"
                  loading="lazy"
                />
              </div>

              <div className="hidden shrink-0 flex-col items-end gap-1.5 pt-1 text-right lg:flex">
                <span className="aw-label h-px w-8 bg-[#C7A86B]" aria-hidden />
                {["REAL", "BUSINESSES.", "BRIGHTER", "TOMORROWS."].map((w) => (
                  <span
                    key={w}
                    className="aw-label font-[Inter] text-[10px] font-semibold tracking-[0.12em] text-[#12161B]/45"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <div className="aw-note relative -mt-10 ml-6 max-w-[220px] border-t border-[#C7A86B]/50 bg-[#F8F7F3] p-5 shadow-[0_10px_30px_rgba(18,22,27,0.08)] sm:ml-10">
              <span className="block h-px w-6 bg-[#C7A86B]" aria-hidden />
              <p className="mt-3 font-[Inter] text-[12px] font-semibold uppercase leading-[1.5] tracking-[0.06em] text-[#12161B]">
                Capital for a more resilient tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
