import { useEffect, useRef } from "react";
import { ArrowRight, Globe2, Handshake, MapPinned, Radar } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { WorldMapVisual, type MapHub } from "../WorldMapVisual";

const focusAreas = [
  { title: "Market Intelligence", icon: Radar },
  { title: "Opportunity Assessment", icon: MapPinned },
  { title: "Entry Strategy", icon: Globe2 },
  { title: "Local Partnerships", icon: Handshake },
];

const hubs: MapHub[] = [
  { id: "na", label: "North America", x: 170, y: 150 },
  { id: "eu", label: "Europe", x: 510, y: 110 },
  { id: "me", label: "Middle East", x: 590, y: 190 },
  { id: "ap", label: "Asia Pacific", x: 800, y: 175 },
];

// A left-to-right chain rather than AI & Technology's dense mesh, so this
// reads as a sequential expansion pathway, not an interconnected network.
const routes: Array<[string, string]> = [
  ["na", "eu"],
  ["eu", "me"],
  ["me", "ap"],
];

export function MarketExpansion() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".me-eyebrow", ".me-heading-line", ".me-copy", ".me-focus", ".me-cta", ".me-map"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".me-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".me-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".me-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".me-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".me-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(".me-map", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3);

      if (window.innerWidth >= 1024) {
        gsap.to(".me-map", {
          y: -14,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="market-expansion" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="me-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              MARKET EXPANSION
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="me-heading-line inline-block">New markets.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="me-heading-line inline-block text-[#D8BD82]">Clearer pathways.</span>
              </span>
            </h2>
            <p className="me-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70">
              We support businesses entering new markets by combining
              market intelligence, strategic planning and practical
              execution.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="me-focus group flex items-center gap-3">
                  <area.icon
                    className="shrink-0 text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/85">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="me-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Market Expansion
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="me-map relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] sm:aspect-[16/10] lg:aspect-auto lg:h-[460px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(65% 60% at 50% 40%, rgba(18,48,74,0.45) 0%, rgba(18,48,74,0) 70%)",
                }}
                aria-hidden
              />
              <WorldMapVisual
                hubs={hubs}
                routes={routes}
                dotColor="#F5F2EA"
                hubColor="#C7A86B"
                hubFill="#F5F2EA"
                routeColor="#D8BD82"
                caption="A strategic view of global opportunity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
