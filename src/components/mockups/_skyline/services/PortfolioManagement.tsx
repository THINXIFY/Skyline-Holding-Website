import { useEffect, useRef } from "react";
import { ArrowRight, LineChart, RefreshCw, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Portfolio Construction", icon: SlidersHorizontal },
  { title: "Risk-Adjusted Allocation", icon: ShieldCheck },
  { title: "Monitoring & Rebalancing", icon: RefreshCw },
  { title: "Performance Review", icon: LineChart },
];

export function PortfolioManagement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".pm-eyebrow", ".pm-heading-line", ".pm-copy", ".pm-focus", ".pm-cta", ".pm-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".pm-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".pm-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".pm-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".pm-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".pm-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".pm-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85);

      if (window.innerWidth >= 1024) {
        gsap.set(".pm-image img", { scale: 1.1 });
        gsap.to(".pm-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio-management" ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="pm-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="pm-heading-line inline-block">Portfolio Management</span>
              </span>
            </h2>
            <p className="pm-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              Diversified, risk-aware portfolios designed around clearly
              defined objectives, time horizons and capital priorities.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="pm-focus group flex items-center gap-3">
                  <area.icon
                    className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="pm-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Portfolio Management
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="pm-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <img
                src={IMAGE}
                alt="A minimal investment office workspace overlooking a city skyline"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
