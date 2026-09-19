import { useEffect, useRef } from "react";
import { ArrowRight, Cpu, Map as MapIcon, ScanSearch, Workflow } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { WorldMapVisual, type MapHub } from "../WorldMapVisual";

const focusAreas = [
  { title: "AI Strategy", icon: MapIcon },
  { title: "Automation Opportunities", icon: Workflow },
  { title: "Technology Assessment", icon: ScanSearch },
  { title: "Implementation Roadmaps", icon: Cpu },
];

const hubs: MapHub[] = [
  { id: "na", label: "North America", x: 170, y: 150 },
  { id: "eu", label: "Europe", x: 510, y: 110 },
  { id: "me", label: "Middle East", x: 590, y: 190 },
  { id: "ap", label: "Asia Pacific", x: 800, y: 175 },
];

// A denser mesh (vs. Market Expansion's linear chain) to read as an
// interconnected technology network rather than a sequential journey.
const routes: Array<[string, string]> = [
  ["na", "eu"],
  ["na", "ap"],
  ["eu", "me"],
  ["me", "ap"],
  ["eu", "ap"],
];

export function AITechnologyAdvisory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ai-eyebrow", ".ai-heading-line", ".ai-copy", ".ai-focus", ".ai-cta", ".ai-map"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ai-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ai-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ai-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".ai-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".ai-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(".ai-map", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ai-technology-advisory" ref={rootRef} className="relative overflow-hidden bg-[#0B1624] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="ai-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              AI &amp; TECHNOLOGY ADVISORY
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ai-heading-line inline-block">Technology with</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ai-heading-line inline-block text-[#D8BD82]">strategic purpose.</span>
              </span>
            </h2>
            <p className="ai-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              We help businesses identify where AI and emerging
              technologies can create practical advantage, improve
              operations and support long-term competitiveness.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="ai-focus group flex items-center gap-3">
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
              className="ai-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore AI Advisory
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="ai-map lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] sm:aspect-[16/10] lg:aspect-auto lg:h-[460px]">
              <WorldMapVisual
                hubs={hubs}
                routes={routes}
                dotColor="#7C9CB8"
                hubColor="#C7A86B"
                hubFill="#F5F2EA"
                routeColor="#D8BD82"
                accentRouteColor="#5B87AC"
                showParticles
                caption="Technology mapped to strategic intent, at global scale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
