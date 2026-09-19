import { useEffect, useRef } from "react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "./gsap";
import { HeroParticles } from "./HeroParticles";

/**
 * Shared institutional "dot-matrix world map" visual used anywhere a section
 * needs to communicate global reach without a literal Google-Maps-style map
 * or a generic abstract node graph. Continents are simplified, stylized
 * polygons (not cartographic data) filled with a dot pattern; hubs and
 * routes are illustrative, not confirmed office locations.
 */

export interface MapHub {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface WorldMapVisualProps {
  hubs: MapHub[];
  routes: Array<[string, string]>;
  dotColor?: string;
  hubColor?: string;
  hubFill?: string;
  routeColor?: string;
  accentRouteColor?: string;
  showParticles?: boolean;
  caption?: string;
  labelClassName?: string;
}

// Simplified, deliberately stylized continent silhouettes on a 1000x500
// equirectangular-style canvas. Not geographic data - a decorative
// abstraction, consistent with how premium institutional sites render
// "global reach" graphics.
const continents = [
  "M90,70 L200,60 L260,90 L270,140 L230,180 L200,230 L150,220 L110,190 L70,150 L60,100 Z",
  "M190,260 L260,250 L290,300 L270,380 L230,430 L190,420 L170,350 L180,290 Z",
  "M470,70 L550,65 L570,100 L550,140 L500,150 L460,120 Z",
  "M470,175 L580,170 L600,230 L580,300 L540,370 L480,380 L450,300 L455,230 Z",
  "M580,60 L750,50 L880,90 L900,150 L850,220 L750,260 L650,240 L590,180 L570,110 Z",
  "M780,340 L870,330 L890,370 L860,410 L800,415 L770,380 Z",
];

function midpointArc(a: MapHub, b: MapHub): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.18 - 20;
  return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
}

export function WorldMapVisual({
  hubs,
  routes,
  dotColor = "#F5F2EA",
  hubColor = "#C7A86B",
  hubFill = "#F5F2EA",
  routeColor = "#D8BD82",
  accentRouteColor,
  showParticles = false,
  caption,
  labelClassName = "",
}: WorldMapVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const patternId = useRef(`wm-dots-${Math.random().toString(36).slice(2, 9)}`).current;
  const reduceMotion = prefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();
    const infiniteAnims: Array<gsap.core.Tween | gsap.core.Timeline> = [];

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".wm-land", ".wm-hub", ".wm-hub-ring"], { opacity: 1, scale: 1 });
        gsap.set(".wm-hub-label", { opacity: 1, y: 0 });
        gsap.set(".wm-route", { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        defaults: { ease: EASE.out3 },
      });

      tl.fromTo(".wm-land", { opacity: 0 }, { opacity: 1, duration: 1.0 })
        .fromTo(
          ".wm-route",
          { strokeDashoffset: 900 },
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.16 },
          0.35,
        )
        .fromTo(
          [".wm-hub", ".wm-hub-ring"],
          { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.13, ease: EASE.out4 },
          0.9,
        )
        .fromTo(
          ".wm-hub-label",
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.13 },
          1.05,
        )
        .call(startLoop);

      function startLoop() {
        const breathing = gsap.to(".wm-hub-ring", {
          scale: 1.35,
          opacity: 0,
          duration: 2.4,
          ease: "sine.out",
          stagger: { each: 0.6, repeat: -1 },
          transformOrigin: "50% 50%",
        });
        infiniteAnims.push(breathing);

        const routeEls = gsap.utils.toArray<SVGPathElement>(".wm-route", rootRef.current);
        routeEls.forEach((route, i) => {
          const dot = rootRef.current?.querySelector<SVGCircleElement>(`.wm-travel-${i}`);
          if (!dot) return;
          const length = route.getTotalLength();
          gsap.set(dot, { opacity: 0 });
          const travel = gsap.timeline({ repeat: -1, delay: i * 1.4, repeatDelay: (routes.length - 1) * 1.4 + 1 });
          travel
            .set(dot, { opacity: 0 })
            .to(dot, { opacity: 1, duration: 0.2 })
            .to(dot, {
              duration: 1.8,
              ease: "power1.inOut",
              onUpdate: function (this: gsap.core.Tween) {
                const p = route.getPointAtLength(this.progress() * length);
                gsap.set(dot, { attr: { cx: p.x, cy: p.y } });
              },
            })
            .to(dot, { opacity: 0, duration: 0.25 });
          infiniteAnims.push(travel);
        });
      }
    }, rootRef);

    return () => {
      infiniteAnims.forEach((a) => a.kill());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hubById = new Map(hubs.map((h) => [h.id, h]));

  return (
    <div ref={rootRef} className="relative size-full">
      {showParticles && (
        <HeroParticles
          reduceMotion={reduceMotion}
          density={{ desktop: 12, tablet: 8, mobile: 5 }}
          opacityRange={{ min: 0.12, max: 0.25 }}
          zIndexClassName="z-[1]"
        />
      )}
      <svg viewBox="0 0 1000 500" className="relative z-[2] size-full" fill="none" aria-hidden>
        <defs>
          <pattern id={patternId} width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.3" fill={dotColor} opacity="0.55" />
          </pattern>
        </defs>

        {continents.map((d, i) => (
          <path key={i} className="wm-land" d={d} fill={`url(#${patternId})`} />
        ))}

        {routes.map(([from, to], i) => {
          const a = hubById.get(from);
          const b = hubById.get(to);
          if (!a || !b) return null;
          return (
            <path
              key={`${from}-${to}`}
              className="wm-route"
              d={midpointArc(a, b)}
              stroke={accentRouteColor && i === 0 ? accentRouteColor : routeColor}
              strokeWidth="1"
              strokeDasharray="900"
              opacity="0.6"
            />
          );
        })}

        {routes.map((_, i) => (
          <circle key={i} className={`wm-travel-${i}`} r="3" fill={routeColor} opacity="0" />
        ))}

        {hubs.map((hub) => (
          <g key={hub.id}>
            <circle className="wm-hub-ring" cx={hub.x} cy={hub.y} r="12" stroke={hubColor} strokeWidth="1" opacity="0.5" />
            <circle className="wm-hub" cx={hub.x} cy={hub.y} r="4.5" fill={hubFill} />
          </g>
        ))}
      </svg>

      {/* Bottom scrim holding the caption and an HTML legend (not SVG text)
          so labels stay crisp and readable at any viewBox scale, and never
          collide with the map's routes or nodes. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-[#080A0D] via-[#080A0D]/75 to-transparent px-5 pb-4 pt-10 sm:px-6">
        {caption && (
          <span className="block font-[Inter] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5F2EA]/45 sm:text-[10.5px]">
            {caption}
          </span>
        )}
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
          {hubs.map((hub) => (
            <span
              key={hub.id}
              className={`wm-hub-label flex items-center gap-2 font-[Inter] text-[12px] font-semibold ${labelClassName}`}
              style={{ color: hubFill }}
            >
              <span className="size-2 rounded-full" style={{ backgroundColor: hubColor }} aria-hidden />
              {hub.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
