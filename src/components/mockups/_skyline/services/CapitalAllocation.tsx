import { useEffect, useRef, useState } from "react";
import { ArrowRight, GitBranch, ListChecks, Map as MapIcon, Target } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const focusAreas = [
  { title: "Capital Prioritization", icon: ListChecks },
  { title: "Strategic Allocation", icon: MapIcon },
  { title: "Scenario Planning", icon: GitBranch },
  { title: "Opportunity Assessment", icon: Target },
];

interface DestNode {
  id: string;
  x: number;
  y: number;
  lines: string[];
  anchor: "start" | "middle" | "end";
  labelDx: number;
  labelDy: number;
  micro: string;
  microX: number;
  microY: number;
}

interface Layout {
  viewBox: string;
  center: { x: number; y: number };
  destinations: DestNode[];
}

// Desktop: an intentional radial fan sweeping upper-right -> mid-right ->
// lower-right -> lower-center, computed on a shared radius so the spacing
// reads as deliberate rather than scattered.
const desktopLayout: Layout = {
  viewBox: "0 0 600 430",
  center: { x: 190, y: 215 },
  destinations: [
    {
      id: "strategic",
      x: 312,
      y: 69,
      lines: ["Strategic", "Allocation"],
      anchor: "start",
      labelDx: 15,
      labelDy: -4,
      micro: "RETURN",
      microX: 257,
      microY: 133,
    },
    {
      id: "growth",
      x: 377,
      y: 182,
      lines: ["Growth", "Opportunities"],
      anchor: "start",
      labelDx: 15,
      labelDy: -4,
      micro: "RISK",
      microX: 288,
      microY: 189,
    },
    {
      id: "defensive",
      x: 354,
      y: 310,
      lines: ["Defensive /", "Resilient Assets"],
      anchor: "start",
      labelDx: 15,
      labelDy: -4,
      micro: "TIME HORIZON",
      microX: 275,
      microY: 258,
    },
    {
      id: "liquidity",
      x: 270,
      y: 380,
      lines: ["Liquidity &", "Optionality"],
      anchor: "middle",
      labelDx: 0,
      labelDy: 24,
      micro: "LIQUIDITY",
      microX: 228,
      microY: 297,
    },
  ],
};

// Mobile: not a scaled-down desktop fan. A slim vertical spine with a small
// alternating offset so the four connection lines stay visually distinct.
const mobileLayout: Layout = {
  viewBox: "0 0 320 560",
  center: { x: 160, y: 55 },
  destinations: [
    {
      id: "strategic",
      x: 122,
      y: 165,
      lines: ["Strategic", "Allocation"],
      anchor: "middle",
      labelDx: 0,
      labelDy: 24,
      micro: "RETURN",
      microX: 152,
      microY: 108,
    },
    {
      id: "growth",
      x: 198,
      y: 265,
      lines: ["Growth", "Opportunities"],
      anchor: "middle",
      labelDx: 0,
      labelDy: 24,
      micro: "RISK",
      microX: 190,
      microY: 208,
    },
    {
      id: "defensive",
      x: 122,
      y: 365,
      lines: ["Defensive /", "Resilient Assets"],
      anchor: "middle",
      labelDx: 0,
      labelDy: 24,
      micro: "TIME HORIZON",
      microX: 152,
      microY: 313,
    },
    {
      id: "liquidity",
      x: 198,
      y: 465,
      lines: ["Liquidity &", "Optionality"],
      anchor: "middle",
      labelDx: 0,
      labelDy: 24,
      micro: "LIQUIDITY",
      microX: 190,
      microY: 413,
    },
  ],
};

// Matches Tailwind's `sm` breakpoint (640px) so this switch lines up exactly
// with the container's own `sm:` aspect-ratio override below — otherwise the
// mobile node layout could render inside a desktop-shaped panel or vice versa.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function CapitalAllocation() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([]);
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);
  const glowRefs = useRef<Array<SVGCircleElement | null>>([]);
  const microRefs = useRef<Array<SVGTextElement | null>>([]);
  const travelRef = useRef<SVGCircleElement | null>(null);

  const isMobile = useIsMobile();
  const layout = isMobile ? mobileLayout : desktopLayout;
  const { center, destinations, viewBox } = layout;

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();
    const infiniteAnims: Array<gsap.core.Tween | gsap.core.Timeline> = [];

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ca-eyebrow", ".ca-heading-line", ".ca-copy", ".ca-focus", ".ca-cta", ".ca-map"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(
          [".ca-center-dot", ".ca-ring-inner", ".ca-ring-outer", ".ca-node", ".ca-node-ring", ".ca-title", ".ca-micro"],
          { opacity: 1, scale: 1 },
        );
        gsap.set(".ca-path", { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ca-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ca-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ca-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".ca-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".ca-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(".ca-map", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3)
        // 1. central CAPITAL node appears
        .fromTo(
          ".ca-center-dot",
          { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.55, ease: EASE.out4 },
          0.4,
        )
        // 2. outer ring expands subtly
        .fromTo(
          ".ca-ring-inner",
          { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" },
          { opacity: 0.55, scale: 1, duration: 0.6, ease: EASE.out3 },
          0.5,
        )
        .fromTo(
          ".ca-ring-outer",
          { opacity: 0, scale: 0.7, transformOrigin: "50% 50%" },
          { opacity: 0.3, scale: 1, duration: 0.75, ease: EASE.out3 },
          0.55,
        )
        // 3. connection paths draw outward
        .fromTo(
          ".ca-path",
          { strokeDashoffset: 900 },
          { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut", stagger: 0.14 },
          0.75,
        )
        // 4. destination nodes reveal sequentially
        .fromTo(
          [".ca-node", ".ca-node-ring"],
          { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.14, ease: EASE.out4 },
          1.05,
        )
        // 5. labels fade in
        .fromTo(
          ".ca-title",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.14 },
          1.15,
        )
        .fromTo(
          ".ca-micro",
          { opacity: 0, y: 6 },
          { opacity: 0.5, y: 0, duration: 0.4, stagger: 0.1 },
          1.4,
        )
        // 6. infinite loop begins once the reveal has settled
        .call(startInfiniteLoop);

      function startInfiniteLoop() {
        // Central node breathes slowly and continuously.
        const breathing = gsap.to(".ca-ring-outer", {
          scale: 1.14,
          opacity: 0.14,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "50% 50%",
        });
        infiniteAnims.push(breathing);

        // A single light travels center -> each destination in turn, then repeats.
        const dot = travelRef.current;
        if (dot) gsap.set(dot, { opacity: 0 });

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
        destinations.forEach((d, i) => {
          const glow = glowRefs.current[i];
          if (!dot) return;
          loop
            .set(dot, { attr: { cx: center.x, cy: center.y }, opacity: 1 })
            .to(dot, { attr: { cx: d.x, cy: d.y }, duration: 1.7, ease: "power1.inOut" })
            .to(dot, { opacity: 0, duration: 0.15 }, ">-0.1");
          if (glow) {
            loop
              .to(glow, { opacity: 0.6, scale: 1.5, duration: 0.25, transformOrigin: "50% 50%" }, "<-0.1")
              .to(glow, { opacity: 0, scale: 1, duration: 0.45 });
          }
        });
        infiniteAnims.push(loop);
      }
    }, rootRef);

    return () => {
      infiniteAnims.forEach((a) => a.kill());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleEnter = (index: number) => {
    if (prefersReducedMotion()) return;
    pathRefs.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, { opacity: i === index ? 0.9 : 0.2, strokeWidth: i === index ? 1.5 : 1, duration: 0.3 });
    });
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, { attr: { r: i === index ? 6.4 : 6 }, duration: 0.25 });
    });
    ringRefs.current.forEach((r, i) => {
      if (!r) return;
      gsap.to(r, { attr: { r: i === index ? 11.8 : 11 }, opacity: i === index ? 0.75 : 0.4, duration: 0.25 });
    });
    microRefs.current.forEach((m, i) => {
      if (!m) return;
      gsap.to(m, { opacity: i === index ? 0.95 : 0.2, duration: 0.3 });
    });
  };

  const handleLeave = () => {
    if (prefersReducedMotion()) return;
    pathRefs.current.forEach((p) => p && gsap.to(p, { opacity: 0.4, strokeWidth: 1, duration: 0.3 }));
    nodeRefs.current.forEach((n) => n && gsap.to(n, { attr: { r: 6 }, duration: 0.25 }));
    ringRefs.current.forEach((r) => r && gsap.to(r, { attr: { r: 11 }, opacity: 0.4, duration: 0.25 }));
    microRefs.current.forEach((m) => m && gsap.to(m, { opacity: 0.5, duration: 0.3 }));
  };

  return (
    <section id="capital-allocation" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="ca-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ca-heading-line inline-block">Capital Allocation</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ca-heading-line inline-block text-[#D8BD82]">&amp; Strategy</span>
              </span>
            </h2>
            <p className="ca-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              Helping clients deploy capital across opportunities with
              discipline, clarity and a long-term framework.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="ca-focus group flex items-center gap-3">
                  <area.icon
                    className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
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
              className="ca-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Capital Strategy
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="ca-map lg:col-span-6">
            <div className="relative aspect-[320/560] w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] sm:aspect-[4/3] md:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 30% 45%, rgba(18,48,74,0.5) 0%, rgba(18,48,74,0) 70%)",
                }}
                aria-hidden
              />
              <svg viewBox={viewBox} className="size-full" fill="none" aria-hidden>
                {destinations.map((d, i) => (
                  <path
                    key={d.id}
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    className="ca-path"
                    d={`M${center.x} ${center.y} L${d.x} ${d.y}`}
                    stroke="#D8BD82"
                    strokeWidth="1"
                    strokeDasharray="900"
                    opacity="0.4"
                  />
                ))}

                {destinations.map((d, i) => (
                  <text
                    key={`${d.id}-micro`}
                    ref={(el) => {
                      microRefs.current[i] = el;
                    }}
                    className="ca-micro"
                    x={d.microX}
                    y={d.microY}
                    textAnchor="middle"
                    fontFamily="Inter"
                    fontSize={isMobile ? 7.5 : 9}
                    letterSpacing="1.1"
                    fill="#9DA5AE"
                    opacity="0.5"
                  >
                    {d.micro}
                  </text>
                ))}

                {/* traveling light: a single shared dot reused across all four paths */}
                <circle ref={travelRef} r="3" fill="#D8BD82" opacity="0" />

                <g>
                  <circle
                    className="ca-ring-outer"
                    cx={center.x}
                    cy={center.y}
                    r="30"
                    stroke="#C7A86B"
                    strokeWidth="0.75"
                    opacity="0.3"
                  />
                  <circle
                    className="ca-ring-inner"
                    cx={center.x}
                    cy={center.y}
                    r="18"
                    stroke="#C7A86B"
                    strokeWidth="1"
                    opacity="0.55"
                  />
                  <circle className="ca-center-dot" cx={center.x} cy={center.y} r="10.5" fill="#D8BD82" />
                  <text
                    x={center.x}
                    y={center.y + 44}
                    textAnchor="middle"
                    fontFamily="Inter"
                    fontSize="11"
                    fontWeight="600"
                    letterSpacing="1.5"
                    fill="#F8F7F3"
                  >
                    CAPITAL
                  </text>
                </g>

                {destinations.map((d, i) => (
                  <g
                    key={d.id}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={handleLeave}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx={d.x} cy={d.y} r="16" fill="transparent" />
                    <circle
                      ref={(el) => {
                        glowRefs.current[i] = el;
                      }}
                      cx={d.x}
                      cy={d.y}
                      r="10"
                      fill="#D8BD82"
                      opacity="0"
                    />
                    <circle
                      ref={(el) => {
                        ringRefs.current[i] = el;
                      }}
                      className="ca-node-ring"
                      cx={d.x}
                      cy={d.y}
                      r="11"
                      stroke="#C7A86B"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                    <circle
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      className="ca-node"
                      cx={d.x}
                      cy={d.y}
                      r="6"
                      fill="#F5F2EA"
                    />
                    <text
                      className="ca-title"
                      x={d.x + d.labelDx}
                      y={d.y + d.labelDy}
                      textAnchor={d.anchor}
                      fontFamily="Inter"
                      fontSize={isMobile ? 11.5 : 12.5}
                      fontWeight="600"
                      fill="#F5F2EA"
                    >
                      {d.lines.map((line, li) => (
                        <tspan key={line} x={d.x + d.labelDx} dy={li === 0 ? 0 : 15}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#C7A86B]" aria-hidden />
                <span className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#F5F2EA]/50">
                  Capital deployed with intent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
