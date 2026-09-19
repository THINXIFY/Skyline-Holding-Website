import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { WorldMapVisual, type MapHub } from "../WorldMapVisual";

const hubs: MapHub[] = [
  { id: "la", label: "Latin America", x: 230, y: 330 },
  { id: "na", label: "North America", x: 150, y: 150 },
  { id: "eu", label: "Europe", x: 500, y: 105 },
  { id: "me", label: "Middle East", x: 585, y: 195 },
  { id: "ap", label: "Asia Pacific", x: 800, y: 175 },
];

// A star pattern radiating from North America, reading as "reach" rather
// than a sequential pathway (Market Expansion) or dense mesh (AI Advisory).
const routes: Array<[string, string]> = [
  ["na", "la"],
  ["na", "eu"],
  ["na", "me"],
  ["na", "ap"],
];

export function GlobalNetworkAccess() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".gn-eyebrow", ".gn-heading-line", ".gn-copy", ".gn-cta", ".gn-map"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".gn-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".gn-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".gn-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".gn-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(".gn-map", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.35);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="global-network" ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="gn-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            GLOBAL NETWORK &amp; ACCESS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="gn-heading-line inline-block">A more connected</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gn-heading-line inline-block text-[#D8BD82]">world of opportunity.</span>
            </span>
          </h2>
          <p className="gn-copy mt-6 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
            Our international network provides access to markets, sectors
            and opportunities around the world, helping our partners
            identify potential and act with greater perspective.
          </p>
          <a
            href="/contact"
            className="gn-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Our Global Reach
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        </div>

        <div className="gn-map mt-14 md:mt-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] sm:aspect-[16/9] lg:h-[520px] lg:aspect-auto">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 22% 45%, rgba(18,48,74,0.5) 0%, rgba(18,48,74,0) 70%)",
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
              showParticles
              caption="A strategic reach, not a confirmed office network"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
