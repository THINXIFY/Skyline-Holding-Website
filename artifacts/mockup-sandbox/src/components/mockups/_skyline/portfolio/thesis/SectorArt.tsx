import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "../../gsap";
import type { Sector } from "./thesisData";

/**
 * Animated SVG scenes for the four target sectors. Each scene is a small GSAP system:
 *   - a BUILD timeline (strokes draw in, nodes light up in sequence) that restarts whenever the
 *     sector becomes active, then hands over to
 *   - an AMBIENT timeline (very slow orbits, pulses, drifting particles) that runs only while the
 *     scene is active AND on screen, and is paused/reset otherwise (no idle animation cost).
 * Under prefers-reduced-motion no timeline is created at all: scenes render in their final,
 * static state. Everything is decorative (aria-hidden); the real content is the page text.
 */

const W = 520;
const H = 560;
const CX = 260;
const CY = 280;
const GOLD = "#C7A86B";
const SOFT = "#D8BD82";
const STEEL = "#6F93B8";
const DEEP = "#16365A";

type Q = (selector: string) => SVGElement[];
type Build = (tl: gsap.core.Timeline, ambient: gsap.core.Timeline, q: Q) => void;

/** Draws strokes in using pathLength=1 on each element (no premium plugin needed). */
function draw(tl: gsap.core.Timeline, targets: SVGElement[], vars: gsap.TweenVars, at: number | string) {
  tl.fromTo(
    targets,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    {
      strokeDashoffset: 0,
      strokeDasharray: 1,
      ease: "power2.inOut",
      ...vars,
      onComplete: () => {
        gsap.set(targets, { strokeDasharray: "none" });
      },
    },
    at,
  );
}

/** Shared build/ambient lifecycle for every scene. */
function useScene(build: Build, playing: boolean, reduce: boolean) {
  const root = useRef<SVGSVGElement>(null);
  const timelines = useRef<{ tl: gsap.core.Timeline; ambient: gsap.core.Timeline } | null>(null);

  useLayoutEffect(() => {
    const svg = root.current;
    if (reduce || !svg) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      const ambient = gsap.timeline({ paused: true });
      const q: Q = (selector) => gsap.utils.toArray<SVGElement>(selector, svg);
      build(tl, ambient, q);
      floatParticles(ambient, q);
      timelines.current = { tl, ambient };
    }, svg);
    return () => {
      ctx.revert();
      timelines.current = null;
    };
    // build is static per scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const t = timelines.current;
    if (!t) return;
    if (playing) {
      t.ambient.pause(0);
      t.tl.restart();
      return;
    }
    // let the outgoing cross-fade finish before resetting, then stop everything
    const call = gsap.delayedCall(0.75, () => {
      t.tl.pause(0);
      t.ambient.pause(0);
    });
    return () => {
      call.kill();
    };
  }, [playing, reduce]);

  return root;
}

// deterministic pseudo-random micro-particles
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function Particles({ seed }: { seed: number }) {
  const r = rng(seed);
  const dots = Array.from({ length: 14 }, () => ({ x: 30 + r() * (W - 60), y: 30 + r() * (H - 60), r: 0.8 + r() * 1.6, o: 0.25 + r() * 0.45 }));
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} className="a-part" cx={d.x} cy={d.y} r={d.r} fill={SOFT} opacity={d.o} />
      ))}
    </g>
  );
}

function floatParticles(ambient: gsap.core.Timeline, q: Q) {
  q(".a-part").forEach((el, i) => {
    ambient.to(el, { y: i % 2 ? 9 : -9, opacity: 0.15, duration: 3.5 + (i % 4), yoyo: true, repeat: -1, ease: "sine.inOut" }, i * 0.15);
  });
}

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={DEEP} stopOpacity="0.95" />
          <stop offset="55%" stopColor="#0B1624" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#080D14" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SOFT} stopOpacity="0.75" />
          <stop offset="100%" stopColor={SOFT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.6" />
          <stop offset="100%" stopColor={SOFT} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-glow)`} />
    </>
  );
}

/* ------------------------------------------------------------------ BIOTECH */
function Biotech({ playing, reduce }: SceneProps) {
  const steps = 100;
  const top = 92;
  const bottom = 472;
  const amp = 68;
  const turns = 2.4;
  const at = (t: number) => {
    const th = t * turns * Math.PI * 2;
    return { y: bottom - t * (bottom - top), a: CX + amp * Math.sin(th), b: CX - amp * Math.sin(th), z: Math.cos(th) };
  };
  const pts = Array.from({ length: steps + 1 }, (_, i) => at(i / steps));
  const d = (k: "a" | "b") => pts.map((p, i) => `${i ? "L" : "M"}${p[k].toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const rungs = Array.from({ length: 22 }, (_, i) => at((i + 0.5) / 22.5));

  const root = useScene(
    (tl, ambient, q) => {
      tl.fromTo(q(".a-orbit"), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.25, ease: "power2.out" }, 0.8);
      draw(tl, q(".a-strand"), { duration: 1.9, stagger: 0.15 }, 0);
      tl.fromTo(q(".a-rung"), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.07, ease: "power2.out" }, 0.15);
      tl.fromTo(q(".a-node"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.035, ease: "power3.out" }, 0.2);
      tl.fromTo(q(".a-glow"), { opacity: 0 }, { opacity: 0.8, duration: 0.8, stagger: 0.12 }, 1.5);
      tl.call(() => {
        ambient.play();
      }, undefined, 2.3);

      ambient.to(q(".a-orbit-a"), { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 150, repeat: -1, ease: "none" }, 0);
      ambient.to(q(".a-orbit-b"), { rotation: -360, svgOrigin: `${CX} ${CY}`, duration: 190, repeat: -1, ease: "none" }, 0);
      ambient.to(q(".a-helix"), { scaleX: 0.93, svgOrigin: `${CX} ${CY}`, duration: 6.5, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0);
      ambient.to(q(".a-glow"), { opacity: 0.25, scale: 1.4, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.45 }, 0);
      q(".a-trav").forEach((el, i) => {
        const o = { t: i * 0.34 };
        ambient.to(
          o,
          {
            t: i * 0.34 + 1,
            duration: 9,
            repeat: -1,
            ease: "none",
            onUpdate() {
              const p = at(o.t % 1);
              gsap.set(el, { attr: { cx: i % 2 ? p.b : p.a, cy: p.y } });
            },
          },
          0,
        );
      });
    },
    playing,
    reduce,
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false" className="h-full w-full">
      <Backdrop id="bt" />
      <Particles seed={11} />
      <g fill="none" stroke={GOLD} strokeWidth={0.9}>
        <g className="a-orbit-a">
          <ellipse className="a-orbit" cx={CX} cy={CY} rx={210} ry={78} transform={`rotate(-28 ${CX} ${CY})`} strokeOpacity={0.3} />
        </g>
        <g className="a-orbit-b">
          <ellipse className="a-orbit" cx={CX} cy={CY} rx={210} ry={78} transform={`rotate(28 ${CX} ${CY})`} strokeOpacity={0.3} />
        </g>
        <circle className="a-orbit" cx={CX} cy={CY} r={196} strokeOpacity={0.14} />
      </g>
      <g className="a-helix">
        <g stroke={GOLD} strokeLinecap="round">
          {rungs.map((p, i) => (
            <line key={i} className="a-rung" x1={p.a} y1={p.y} x2={p.b} y2={p.y} strokeOpacity={0.18 + 0.4 * Math.abs(p.z)} strokeWidth={1} />
          ))}
        </g>
        <path className="a-strand" pathLength={1} d={d("b")} fill="none" stroke={STEEL} strokeOpacity={0.85} strokeWidth={1.8} strokeLinecap="round" />
        <path className="a-strand" pathLength={1} d={d("a")} fill="none" stroke={`url(#bt-gold)`} strokeWidth={2.2} strokeLinecap="round" />
        {rungs.map((p, i) => (
          <g key={i}>
            <circle className="a-node" cx={p.a} cy={p.y} r={3.4} fill={SOFT} />
            <circle className="a-node" cx={p.b} cy={p.y} r={2.8} fill={STEEL} />
            {i % 4 === 1 && <circle className="a-glow" cx={p.a} cy={p.y} r={13} fill="url(#bt-halo)" opacity={0.9} />}
          </g>
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} className="a-trav" cx={CX} cy={bottom} r={2.6} fill="#F8F7F3" opacity={0.9} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ MEDTECH */
function MedTech({ playing, reduce }: SceneProps) {
  const ecg =
    "M40 280 L128 280 L148 280 L160 262 L172 298 L188 280 L214 280 L228 270 L242 280 L262 280 L272 250 L286 348 L302 170 L322 394 L338 280 L372 280 L390 262 L408 280 L480 280";
  const sensors = [-90, -30, 30, 90, 150, 210].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: CX + Math.cos(a) * 124, y: CY + Math.sin(a) * 124 };
  });
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const len = i % 6 === 0 ? 12 : 6;
    return { x1: CX + Math.cos(a) * 196, y1: CY + Math.sin(a) * 196, x2: CX + Math.cos(a) * (196 - len), y2: CY + Math.sin(a) * (196 - len) };
  });

  const root = useScene(
    (tl, ambient, q) => {
      tl.fromTo(q(".a-ring"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.4, stagger: 0.18, ease: "power3.out" }, 0);
      tl.fromTo(q(".a-ticks"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.3);
      draw(tl, q(".a-axis"), { duration: 1.0, stagger: 0.1 }, 0.2);
      draw(tl, q(".a-ecg"), { duration: 2.0, ease: "power1.inOut" }, 0.5);
      draw(tl, q(".a-conn"), { duration: 0.7, stagger: 0.15 }, 1.0);
      tl.fromTo(q(".a-sensor"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.18, ease: "power3.out" }, 1.1);
      tl.fromTo(q(".a-beam"), { x: 0, opacity: 0 }, { x: 440, opacity: 1, duration: 1.7, ease: "power1.inOut" }, 1.6);
      tl.to(q(".a-beam"), { opacity: 0, duration: 0.3 }, 3.1);
      tl.fromTo(q(".a-data"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }, 2.2);
      tl.call(() => {
        ambient.play();
      }, undefined, 3.0);

      ambient.to(q(".a-ticks"), { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 220, repeat: -1, ease: "none" }, 0);
      ambient.to(q(".a-ring-pulse"), { scale: 1.12, opacity: 0, duration: 3.4, repeat: -1, ease: "power1.out", stagger: 1.1 }, 0);
      ambient.to(q(".a-data"), { scale: 1.8, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.25 }, 0);
      ambient.to(q(".a-sensor-halo"), { scale: 1.6, opacity: 0.05, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.3 }, 0);
    },
    playing,
    reduce,
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false" className="h-full w-full">
      <Backdrop id="mt" />
      <defs>
        <linearGradient id="mt-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SOFT} stopOpacity="0" />
          <stop offset="100%" stopColor={SOFT} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <Particles seed={23} />
      <g fill="none" stroke={GOLD}>
        {[64, 118, 170].map((r) => (
          <circle key={r} className="a-ring" cx={CX} cy={CY} r={r} strokeOpacity={0.3} strokeWidth={0.9} />
        ))}
        {[118, 170].map((r) => (
          <circle key={`p${r}`} className="a-ring-pulse" cx={CX} cy={CY} r={r} strokeOpacity={0.22} strokeWidth={0.8} />
        ))}
        <g className="a-ticks" strokeOpacity={0.5} strokeWidth={0.9}>
          {ticks.map((t, i) => (
            <line key={i} {...t} />
          ))}
        </g>
        <line className="a-axis" pathLength={1} x1={CX} y1={70} x2={CX} y2={490} strokeOpacity={0.18} />
        <line className="a-axis" pathLength={1} x1={40} y1={CY} x2={480} y2={CY} strokeOpacity={0.12} />
      </g>
      <g stroke={STEEL} strokeOpacity={0.5} strokeWidth={0.9} fill="none">
        {sensors.map((s, i) => (
          <line key={i} className="a-conn" pathLength={1} x1={CX} y1={CY} x2={s.x} y2={s.y} />
        ))}
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="a-ecg" pathLength={1} d={ecg} stroke={STEEL} strokeOpacity={0.35} strokeWidth={7} />
        <path className="a-ecg" pathLength={1} d={ecg} stroke={SOFT} strokeWidth={2} />
      </g>
      <rect className="a-beam" x={40} y={150} width={36} height={260} fill="url(#mt-beam)" />
      {sensors.map((s, i) => (
        <g key={i} className="a-sensor">
          <circle className="a-sensor-halo" cx={s.x} cy={s.y} r={15} fill="url(#mt-halo)" opacity={0.7} />
          <circle cx={s.x} cy={s.y} r={4.2} fill="#0B1624" stroke={SOFT} strokeWidth={1.4} />
        </g>
      ))}
      {[[302, 170], [322, 394], [286, 348], [272, 250]].map(([x, y], i) => (
        <circle key={i} className="a-data" cx={x} cy={y} r={2.6} fill="#F8F7F3" />
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------------- AGRITECH */
function AgriTech({ playing, reduce }: SceneProps) {
  const horizon = 250;
  const fieldBottom = 400;
  const rows = Array.from({ length: 11 }, (_, k) => ({ x0: -20 + k * 54 }));
  const cross = [276, 306, 344, 388].map((y, i) => ({ y, i }));
  const sat = { x: CX, y: 62 };
  const arc = (r: number) => {
    const a1 = (35 * Math.PI) / 180;
    const a2 = (145 * Math.PI) / 180;
    return `M${(sat.x + r * Math.cos(a1)).toFixed(1)} ${(sat.y + r * Math.sin(a1)).toFixed(1)} A${r} ${r} 0 0 1 ${(sat.x + r * Math.cos(a2)).toFixed(1)} ${(sat.y + r * Math.sin(a2)).toFixed(1)}`;
  };
  const sensors = [[120, 380], [190, 318], [262, 290], [338, 330], [404, 372], [300, 268]];

  const root = useScene(
    (tl, ambient, q) => {
      draw(tl, q(".a-horizon"), { duration: 1.0 }, 0);
      draw(tl, q(".a-row"), { duration: 1.6, stagger: 0.07 }, 0.2);
      draw(tl, q(".a-cross"), { duration: 1.2, stagger: 0.12 }, 0.9);
      draw(tl, q(".a-soil"), { duration: 1.2, stagger: 0.15 }, 0.6);
      draw(tl, q(".a-root"), { duration: 1.4, stagger: 0.12 }, 1.2);
      draw(tl, q(".a-stem"), { duration: 0.9 }, 1.0);
      tl.fromTo(q(".a-leaf"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }, 1.7);
      draw(tl, q(".a-arc"), { duration: 1.2, stagger: 0.18 }, 1.0);
      tl.fromTo(q(".a-sat"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0.9);
      tl.fromTo(q(".a-beamline"), { opacity: 0 }, { opacity: 0.7, duration: 0.8, stagger: 0.15 }, 2.0);
      tl.fromTo(q(".a-sensor"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: "power3.out" }, 1.8);
      tl.call(() => {
        ambient.play();
      }, undefined, 2.8);

      ambient.fromTo(q(".a-scan"), { x: 0 }, { x: 440, duration: 3.6, ease: "sine.inOut", repeat: -1, repeatDelay: 1.6, yoyo: true }, 0);
      ambient.to(q(".a-sensor-halo"), { scale: 1.8, opacity: 0.04, duration: 2.0, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.3 }, 0);
      ambient.to(q(".a-beamline"), { opacity: 0.2, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.25 }, 0);
      ambient.to(q(".a-leaf"), { rotation: 3, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.4 }, 0);
    },
    playing,
    reduce,
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false" className="h-full w-full">
      <Backdrop id="ag" />
      <defs>
        <linearGradient id="ag-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SOFT} stopOpacity="0" />
          <stop offset="100%" stopColor={SOFT} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <Particles seed={37} />
      <g fill="none" stroke={GOLD} strokeLinecap="round">
        <line className="a-horizon" pathLength={1} x1={0} y1={horizon} x2={W} y2={horizon} strokeOpacity={0.45} strokeWidth={0.9} />
        {rows.map((r, i) => (
          <path key={i} className="a-row" pathLength={1} d={`M${r.x0} ${fieldBottom} L${CX} ${horizon}`} strokeOpacity={0.14 + (1 - Math.abs(i - 5) / 5) * 0.36} strokeWidth={1} />
        ))}
        {cross.map((c) => (
          <path key={c.y} className="a-cross" pathLength={1} d={`M${CX - (c.y - horizon) * 1.9} ${c.y} Q${CX} ${c.y - 6} ${CX + (c.y - horizon) * 1.9} ${c.y}`} strokeOpacity={0.2 + c.i * 0.06} strokeWidth={0.9} />
        ))}
        {[428, 466, 504].map((y, i) => (
          <path key={y} className="a-soil" pathLength={1} d={`M0 ${y} Q130 ${y - 10} ${CX} ${y} T${W} ${y}`} strokeOpacity={0.3 - i * 0.07} strokeWidth={0.9} />
        ))}
      </g>
      <rect className="a-scan" x={40} y={horizon} width={40} height={fieldBottom - horizon} fill="url(#ag-scan)" />
      <g fill="none" stroke={SOFT} strokeLinecap="round" strokeLinejoin="round">
        <path className="a-stem" pathLength={1} d={`M${CX} 428 Q${CX - 3} 408 ${CX} 386`} strokeWidth={1.8} />
        <path className="a-root" pathLength={1} d={`M${CX} 428 Q${CX + 2} 470 ${CX} 524`} strokeWidth={1.4} strokeOpacity={0.8} />
        <path className="a-root" pathLength={1} d={`M${CX} 446 Q${CX - 30} 458 ${CX - 56} 490`} strokeWidth={1} strokeOpacity={0.7} />
        <path className="a-root" pathLength={1} d={`M${CX} 452 Q${CX + 34} 462 ${CX + 60} 498`} strokeWidth={1} strokeOpacity={0.7} />
        <path className="a-root" pathLength={1} d={`M${CX} 480 Q${CX - 18} 494 ${CX - 34} 520`} strokeWidth={0.9} strokeOpacity={0.55} />
        <path className="a-root" pathLength={1} d={`M${CX} 486 Q${CX + 20} 498 ${CX + 38} 524`} strokeWidth={0.9} strokeOpacity={0.55} />
      </g>
      <path className="a-leaf" d={`M${CX} 400 Q${CX - 24} 396 ${CX - 30} 374 Q${CX - 6} 374 ${CX} 400z`} fill={SOFT} fillOpacity={0.3} stroke={SOFT} strokeWidth={1.2} />
      <path className="a-leaf" d={`M${CX} 392 Q${CX + 24} 388 ${CX + 30} 366 Q${CX + 6} 366 ${CX} 392z`} fill={SOFT} fillOpacity={0.3} stroke={SOFT} strokeWidth={1.2} />
      <g fill="none" stroke={GOLD}>
        {[70, 104, 140].map((r, i) => (
          <path key={r} className="a-arc" pathLength={1} d={arc(r)} strokeOpacity={0.5 - i * 0.12} strokeWidth={1} strokeLinecap="round" />
        ))}
      </g>
      <g stroke={SOFT} strokeDasharray="3 5" strokeWidth={0.9} fill="none">
        {[[190, 318], [338, 330], [262, 290]].map(([x, y], i) => (
          <line key={i} className="a-beamline" x1={sat.x} y1={sat.y + 6} x2={x} y2={y} opacity={0.7} />
        ))}
      </g>
      <g className="a-sat">
        <circle cx={sat.x} cy={sat.y} r={6} fill="#0B1624" stroke={SOFT} strokeWidth={1.6} />
        <path d={`M${sat.x - 16} ${sat.y} h8 M${sat.x + 8} ${sat.y} h8`} stroke={SOFT} strokeWidth={1.6} strokeLinecap="round" />
      </g>
      {sensors.map(([x, y], i) => (
        <g key={i} className="a-sensor">
          <circle className="a-sensor-halo" cx={x} cy={y} r={14} fill="url(#ag-halo)" opacity={0.7} />
          <circle cx={x} cy={y} r={3.4} fill={SOFT} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ NUCLEAR */
function Nuclear({ playing, reduce }: SceneProps) {
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * Math.PI * 2;
    const len = i % 4 === 0 ? 12 : 6;
    return { x1: CX + Math.cos(a) * 204, y1: CY + Math.sin(a) * 204, x2: CX + Math.cos(a) * (204 - len), y2: CY + Math.sin(a) * (204 - len) };
  });
  const radials = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
    return { x1: CX + Math.cos(a) * 46, y1: CY + Math.sin(a) * 46, x2: CX + Math.cos(a) * 172, y2: CY + Math.sin(a) * 172, a };
  });
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return { x: CX + Math.cos(a) * 88, y: CY + Math.sin(a) * 88 };
  });
  const arcAt = (r: number, from: number, to: number) => {
    const a1 = (from * Math.PI) / 180;
    const a2 = (to * Math.PI) / 180;
    return `M${(CX + r * Math.cos(a1)).toFixed(1)} ${(CY + r * Math.sin(a1)).toFixed(1)} A${r} ${r} 0 0 1 ${(CX + r * Math.cos(a2)).toFixed(1)} ${(CY + r * Math.sin(a2)).toFixed(1)}`;
  };

  const root = useScene(
    (tl, ambient, q) => {
      tl.fromTo(q(".a-core"), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 2.0, ease: "power2.out" }, 0);
      draw(tl, q(".a-ring"), { duration: 1.5, stagger: 0.25 }, 0.2);
      draw(tl, q(".a-radial"), { duration: 0.8, stagger: 0.1 }, 0.8);
      tl.fromTo(q(".a-ticks"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.8);
      tl.fromTo(q(".a-enode"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: "power3.out" }, 1.4);
      draw(tl, q(".a-arc"), { duration: 1.3, stagger: 0.3 }, 1.6);
      tl.call(() => {
        ambient.play();
      }, undefined, 2.8);

      ambient.to(q(".a-core-glow"), { scale: 1.18, opacity: 0.55, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" }, 0);
      ambient.to(q(".a-ticks"), { rotation: 360, svgOrigin: `${CX} ${CY}`, duration: 260, repeat: -1, ease: "none" }, 0);
      ambient.to(q(".a-ring-spin"), { rotation: -360, svgOrigin: `${CX} ${CY}`, duration: 200, repeat: -1, ease: "none" }, 0);
      ambient.fromTo(q(".a-pulse"), { scale: 0.3, opacity: 0.45 }, { scale: 2.1, opacity: 0, duration: 4.2, repeat: -1, ease: "power1.out", stagger: 1.4 }, 0);
      ambient.to(q(".a-arc-flow"), { strokeDashoffset: -60, duration: 6, repeat: -1, ease: "none" }, 0);
      ambient.to(q(".a-enode-halo"), { scale: 1.7, opacity: 0.05, duration: 2.1, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.2 }, 0);
      q(".a-flow").forEach((el, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.3;
        ambient.fromTo(el, { x: Math.cos(a) * 52, y: Math.sin(a) * 52, opacity: 0.9 }, { x: Math.cos(a) * 176, y: Math.sin(a) * 176, opacity: 0, duration: 4.4, repeat: -1, ease: "power1.in" }, i * 0.7);
      });
    },
    playing,
    reduce,
  );

  return (
    <svg ref={root} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden focusable="false" className="h-full w-full">
      <Backdrop id="nu" />
      <defs>
        <radialGradient id="nu-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F3E3B8" stopOpacity="0.95" />
          <stop offset="35%" stopColor={SOFT} stopOpacity="0.5" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Particles seed={53} />
      <g className="a-ticks" stroke={GOLD} strokeOpacity={0.45} strokeWidth={0.9}>
        {ticks.map((t, i) => (
          <line key={i} {...t} />
        ))}
      </g>
      <g fill="none" stroke={GOLD} strokeLinecap="round">
        {[46, 88, 130, 172].map((r, i) => (
          <circle key={r} className="a-ring" pathLength={1} cx={CX} cy={CY} r={r} strokeOpacity={0.5 - i * 0.07} strokeWidth={i === 0 ? 1.3 : 0.9} />
        ))}
        <g className="a-ring-spin">
          {[0, 60, 120].map((deg) => (
            <ellipse key={deg} className="a-ring" pathLength={1} cx={CX} cy={CY} rx={186} ry={58} strokeOpacity={0.16} strokeWidth={0.8} transform={`rotate(${deg} ${CX} ${CY})`} />
          ))}
        </g>
        {radials.map((r, i) => (
          <line key={i} className="a-radial" pathLength={1} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} strokeOpacity={0.2} strokeWidth={0.8} />
        ))}
      </g>
      <g fill="none" strokeLinecap="round" stroke={SOFT} strokeWidth={1.6}>
        {[[200, 250], [320, 20], [100, 160]].map(([a, b], i) => (
          <path key={i} className="a-arc" pathLength={1} d={arcAt(130, a, b > a ? b : b + 360)} strokeOpacity={0.9} />
        ))}
      </g>
      <g fill="none" stroke={SOFT} strokeWidth={1.2} strokeDasharray="6 14" strokeLinecap="round" strokeOpacity={0.55}>
        <circle className="a-arc-flow" cx={CX} cy={CY} r={152} />
      </g>
      <circle className="a-core-glow" cx={CX} cy={CY} r={70} fill="url(#nu-core)" />
      <circle className="a-core" cx={CX} cy={CY} r={22} fill={SOFT} fillOpacity={0.9} />
      <circle className="a-pulse" cx={CX} cy={CY} r={46} fill="none" stroke={SOFT} strokeWidth={1.2} />
      <circle className="a-pulse" cx={CX} cy={CY} r={46} fill="none" stroke={SOFT} strokeWidth={1.2} />
      {nodes.map((n, i) => (
        <g key={i} className="a-enode">
          <circle className="a-enode-halo" cx={n.x} cy={n.y} r={14} fill="url(#nu-halo)" opacity={0.7} />
          <circle cx={n.x} cy={n.y} r={3.6} fill={i % 2 ? STEEL : SOFT} />
        </g>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i} className="a-flow" cx={CX} cy={CY} r={2.2} fill="#F8F7F3" />
      ))}
    </svg>
  );
}

export interface SceneProps {
  playing: boolean;
  reduce: boolean;
}

const SCENES: Record<Sector["id"], (props: SceneProps) => React.JSX.Element> = {
  biotech: Biotech,
  medtech: MedTech,
  agritech: AgriTech,
  nuclear: Nuclear,
};

export function SectorArt({ id, playing, reduce }: { id: Sector["id"]; playing: boolean; reduce: boolean }) {
  const Scene = SCENES[id];
  return <Scene playing={playing} reduce={reduce} />;
}
