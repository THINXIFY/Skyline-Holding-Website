import { useEffect, useMemo, useState } from "react";

/**
 * Shared, reusable ambient particle system for hero sections. Every hero
 * across the site should render this rather than reimplementing particles,
 * so the "Skyline particle language" (tones, easing, restraint) stays
 * consistent. Density, drift range, speed and opacity can be nudged per
 * hero background via props, but the defaults are tuned to read as subtle
 * and premium out of the box.
 *
 * Renders nothing when `reduceMotion` is true (respect
 * prefers-reduced-motion by passing the caller's own check through).
 */

interface Range {
  min: number;
  max: number;
}

interface HeroParticlesProps {
  reduceMotion: boolean;
  /** Particle count per breakpoint tier. */
  density?: { desktop: number; tablet: number; mobile: number };
  /** Max drift distance in px (desktop baseline; scaled down on smaller screens). */
  driftRange?: { x: number; y: number };
  /** Loop duration in seconds. */
  speedRange?: Range;
  /** Peak opacity a particle reaches mid-loop (15-30% per the brand's particle spec). */
  opacityRange?: Range;
  /** z-index utility class; particles sit above the background, below content. */
  zIndexClassName?: string;
}

type Tone = "ivory" | "gold" | "blue";

const particleTones: Record<Tone, string> = {
  ivory: "rgba(248,247,243,.85)",
  gold: "rgba(216,189,130,.9)",
  blue: "rgba(206,222,244,.75)",
};
const tones: Tone[] = ["ivory", "gold", "blue"];

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  opacity: number;
  tone: Tone;
  blur: number;
}

type Tier = "mobile" | "tablet" | "desktop";

function useTier(): Tier {
  const [tier, setTier] = useState<Tier>("desktop");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const tabletQuery = window.matchMedia("(min-width: 640px)");

    const resolve = () => (desktopQuery.matches ? "desktop" : tabletQuery.matches ? "tablet" : "mobile");
    setTier(resolve());

    const handler = () => setTier(resolve());
    desktopQuery.addEventListener("change", handler);
    tabletQuery.addEventListener("change", handler);
    return () => {
      desktopQuery.removeEventListener("change", handler);
      tabletQuery.removeEventListener("change", handler);
    };
  }, []);

  return tier;
}

function useParticles(
  count: number,
  driftRange: { x: number; y: number },
  speedRange: Range,
  opacityRange: Range,
  scale: number,
): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.75 + Math.random() * 2.5,
        dx: (Math.random() - 0.5) * driftRange.x * scale,
        dy: (Math.random() - 0.5) * driftRange.y * scale,
        duration: speedRange.min + Math.random() * (speedRange.max - speedRange.min),
        delay: -Math.random() * speedRange.max,
        opacity: opacityRange.min + Math.random() * (opacityRange.max - opacityRange.min),
        tone: tones[Math.floor(Math.random() * tones.length)],
        blur: Math.random() < 0.15 ? 0.3 + Math.random() * 0.25 : 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, scale],
  );
}

const defaultDensity = { desktop: 32, tablet: 22, mobile: 14 };
const defaultDrift = { x: 110, y: 130 };
const defaultSpeed: Range = { min: 18, max: 38 };
const defaultOpacity: Range = { min: 0.28, max: 0.6 };

export function HeroParticles({
  reduceMotion,
  density = defaultDensity,
  driftRange = defaultDrift,
  speedRange = defaultSpeed,
  opacityRange = defaultOpacity,
  zIndexClassName = "z-[3]",
}: HeroParticlesProps) {
  const tier = useTier();
  const count = density[tier];
  // Smaller screens drift a shorter distance so motion stays contained.
  const scale = tier === "desktop" ? 1 : tier === "tablet" ? 0.75 : 0.55;
  const particles = useParticles(count, driftRange, speedRange, opacityRange, scale);

  if (reduceMotion) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${zIndexClassName} overflow-hidden`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full"
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particleTones[particle.tone],
              boxShadow: `0 0 ${particle.size * 2.5}px ${particleTones[particle.tone]}`,
              filter: particle.blur ? `blur(${particle.blur}px)` : undefined,
              "--particle-dx": `${particle.dx}px`,
              "--particle-dy": `${particle.dy}px`,
              "--particle-opacity": particle.opacity,
              animation: `hero-particle-drift ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
