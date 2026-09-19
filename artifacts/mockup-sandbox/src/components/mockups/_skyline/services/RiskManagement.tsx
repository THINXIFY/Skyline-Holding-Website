import { useEffect, useRef } from "react";
import { ArrowRight, Eye, ShieldCheck, TrendingDown, Waypoints } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Risk Identification", icon: Eye },
  { title: "Downside Analysis", icon: TrendingDown },
  { title: "Portfolio Resilience", icon: ShieldCheck },
  { title: "Ongoing Monitoring", icon: Waypoints },
];

export function RiskManagement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".rm-eyebrow", ".rm-heading-line", ".rm-copy", ".rm-focus", ".rm-cta", ".rm-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".rm-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".rm-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".rm-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".rm-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".rm-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".rm-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(
          ".rm-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.65,
        )
        .fromTo(
          ".rm-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.75,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".rm-image img", { scale: 1.12 });
        gsap.to(".rm-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="risk-management" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="rm-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="rm-heading-line inline-block">Risk Management</span>
              </span>
            </h2>
            <p className="rm-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              A disciplined approach to identifying, assessing and managing
              risks that can affect capital, portfolios and long-term
              value.
            </p>
            <a
              href="/contact"
              className="rm-cta group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Explore Risk Management
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#12161B]/10 pt-8 sm:grid-cols-4">
              {focusAreas.map((area, index) => (
                <div key={area.title} className="rm-focus relative pl-0 sm:pl-6 sm:first:pl-0">
                  {index > 0 && (
                    <span
                      className="rm-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
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
            <div className="rm-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="An empty boardroom with a long table and panoramic windows"
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
