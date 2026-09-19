import { useEffect, useRef } from "react";
import { ArrowRight, Compass, ListTree, Target, Trophy } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Business Strategy", icon: Trophy },
  { title: "Competitive Positioning", icon: Target },
  { title: "Strategic Planning", icon: Compass },
  { title: "Organizational Priorities", icon: ListTree },
];

export function CorporateStrategy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cs-eyebrow", ".cs-heading-line", ".cs-copy", ".cs-focus", ".cs-cta", ".cs-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".cs-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cs-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cs-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".cs-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".cs-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".cs-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(
          ".cs-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.7,
        )
        .fromTo(
          ".cs-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.8,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".cs-image img", { scale: 1.12 });
        gsap.to(".cs-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="corporate-strategy" ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="cs-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              CORPORATE STRATEGY
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="cs-heading-line inline-block">Clarity for the decisions</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="cs-heading-line inline-block">that shape what comes next.</span>
              </span>
            </h2>
            <p className="cs-copy mt-6 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              We help businesses define strategic priorities, strengthen
              competitive positioning and build practical plans for
              sustainable long-term growth.
            </p>
            <a
              href="/contact"
              className="cs-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Corporate Strategy
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#12161B]/10 pt-8 sm:grid-cols-4">
              {focusAreas.map((area, index) => (
                <div key={area.title} className="cs-focus relative pl-0 sm:pl-6 sm:first:pl-0">
                  {index > 0 && (
                    <span
                      className="cs-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                      aria-hidden
                    />
                  )}
                  <area.icon className="text-[#C7A86B]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="mt-3 block font-[Inter] text-[13px] font-semibold leading-[1.3] text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="cs-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="Angular glass corporate towers viewed from street level against a bright sky"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/45 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
