import { useEffect, useRef } from "react";
import { ArrowRight, Activity, FlaskConical, HeartPulse } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Healthcare Services", icon: HeartPulse },
  { title: "Medical Technology", icon: Activity },
  { title: "Life-Science Innovation", icon: FlaskConical },
];

export function HealthcareSector() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".he-eyebrow", ".he-heading-line", ".he-copy", ".he-focus", ".he-cta", ".he-image", ".he-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".he-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".he-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".he-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".he-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".he-focus",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.6,
        )
        .fromTo(".he-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.85)
        .fromTo(".he-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.55);

      if (window.innerWidth >= 1024) {
        gsap.set(".he-image img", { scale: 1.12 });
        gsap.to(".he-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-1 lg:col-span-6">
            <p className="he-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="he-heading-line inline-block">Healthcare &amp;</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="he-heading-line inline-block">Life Sciences</span>
              </span>
            </h2>
            <p className="he-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We invest in healthcare, pharmaceutical and life-science
              opportunities supported by innovation, essential demand and
              long-term structural importance. Our focus spans healthcare
              services, medical technologies and solutions designed to
              improve outcomes while meeting durable market needs.
            </p>

            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5">
              {focusAreas.map((area) => (
                <div key={area.title} className="he-focus group flex items-center gap-3">
                  <area.icon
                    className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[14px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="he-cta group mt-9 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              See Healthcare Focus
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:order-2 lg:col-span-6">
            <div className="he-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px]">
              <img
                src={IMAGE}
                alt="A pipette dispensing sample into a laboratory well plate"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/55 via-transparent to-transparent" />

              <div className="pointer-events-none absolute bottom-6 right-6 text-right">
                {["BETTER HEALTH.", "BRIGHTER LIVES."].map((label) => (
                  <span
                    key={label}
                    className="he-label block font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="he-label ml-auto mt-1 block h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
