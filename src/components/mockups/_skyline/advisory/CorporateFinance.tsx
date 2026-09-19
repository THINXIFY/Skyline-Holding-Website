import { useEffect, useRef } from "react";
import { ArrowRight, Droplets, LineChart, Scale, Wallet } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Capital Structure", icon: Scale },
  { title: "Financing Strategy", icon: Wallet },
  { title: "Liquidity Planning", icon: Droplets },
  { title: "Financial Optimization", icon: LineChart },
];

const structure = [
  { label: "Equity", width: 45, color: "#C7A86B" },
  { label: "Debt", width: 35, color: "#12304A" },
  { label: "Working Capital", width: 20, color: "#9DA5AE" },
];

export function CorporateFinance() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cf-eyebrow", ".cf-heading-line", ".cf-copy", ".cf-focus", ".cf-cta", ".cf-image", ".cf-bar"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", scaleX: 1 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cf-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".cf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".cf-bar",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          0.55,
        )
        .fromTo(
          ".cf-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.3,
        )
        .fromTo(
          ".cf-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.85,
        )
        .fromTo(".cf-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      if (window.innerWidth >= 1024) {
        gsap.set(".cf-image img", { scale: 1.1 });
        gsap.to(".cf-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="corporate-finance" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="cf-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              CORPORATE FINANCE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="cf-heading-line inline-block">Capital structured</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="cf-heading-line inline-block">around clear objectives.</span>
              </span>
            </h2>
            <p className="cf-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              We advise on financial strategy, capital structure and
              funding decisions designed to strengthen businesses and
              support their long-term ambitions.
            </p>

            <div className="mt-8 max-w-[440px]">
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#12161B]/8">
                {structure.map((seg) => (
                  <span
                    key={seg.label}
                    className="cf-bar h-full"
                    style={{ width: `${seg.width}%`, backgroundColor: seg.color }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {structure.map((seg) => (
                  <span
                    key={seg.label}
                    className="flex items-center gap-2 font-[Inter] text-[12px] font-medium text-[#12161B]/65"
                  >
                    <span className="size-2 rounded-full" style={{ backgroundColor: seg.color }} aria-hidden />
                    {seg.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="cf-focus flex items-center gap-3">
                  <area.icon className="text-[#C7A86B]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="cf-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Corporate Finance
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="cf-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="Modern skyscrapers viewed from street level in a financial district"
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
