import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { researchCapabilities } from "./data";

const IMAGE =
  "https://marbholding.com/wp-content/uploads/2026/09/30d91cb5-d5dc-4aa4-afbc-3e821e355f75.png";

const icons = [BarChart3, Globe2, Layers, ShieldCheck, TrendingUp];

const bottomStrip = ["GLOBAL INSIGHT", "LONG-TERM PERSPECTIVE", "REAL-WORLD IMPACT"];

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function useParticles(count: number): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: 40 + Math.random() * 58,
        top: 8 + Math.random() * 80,
        size: 1 + Math.random() * 1.6,
        duration: 10 + Math.random() * 12,
        delay: -Math.random() * 14,
      })),
    [count],
  );
}

export function ResearchIntelligence() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduceMotion] = useState(() => prefersReducedMotion());
  const particles = useParticles(reduceMotion ? 0 : 16);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [".ri-eyebrow", ".ri-heading-line", ".ri-copy", ".ri-cta", ".ri-quote", ".ri-cap", ".ri-strip", ".ri-image"],
          { opacity: 1, y: 0 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".ri-image", { opacity: 0 }, { opacity: 1, duration: 1.2 })
        .fromTo(".ri-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".ri-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".ri-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(".ri-quote", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(".ri-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.65)
        .fromTo(
          ".ri-cap",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.6,
        )
        .fromTo(".ri-strip", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.1);

      // Slow, continuous cinematic drift on the globe image.
      gsap.to(".ri-image img", {
        scale: 1.05,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const activeCapability = researchCapabilities[active];

  return (
    <section id="insights" className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="ri-image absolute inset-0" aria-hidden>
        <img
          src={IMAGE}
          alt=""
          className="size-full object-cover"
          style={{ objectPosition: "68% center", transformOrigin: "68% 45%" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#080A0D]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-[#080A0D]/45 to-[#080A0D]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/40" />
      </div>

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-[#D8BD82]"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0.18,
                animation: `ri-particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5">
            <p className="ri-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              RESEARCH &amp; MARKET INTELLIGENCE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(42px,4.5vw,64px)] font-semibold leading-[0.98] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ri-heading-line inline-block">Insight</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ri-heading-line inline-block">
                  before <em className="italic text-[#D8BD82]">action.</em>
                </span>
              </span>
            </h2>
            <p className="ri-copy mt-7 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              At Skyline, we combine market analysis, economic intelligence,
              sector research, risk assessment and structural trend analysis
              to support better decisions across a more complex world.
            </p>
            <a
              href="#management-services"
              className="ri-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Our Research
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="ri-quote mt-14 border-l border-[#D8BD82]/40 pl-5">
              <p className="font-[Cormorant_Garamond] text-[22px] italic leading-[1.2] text-[#F5F2EA]/85">
                &ldquo;Deeper insight.
                <br />A more resilient tomorrow.&rdquo;
              </p>
              <span className="mt-3 block font-[Inter] text-[11px] font-medium uppercase tracking-[0.12em] text-[#9DA5AE]">
                Skyline Holding
              </span>
            </div>
          </div>

          <div className="lg:col-span-3" />

          <div className="lg:col-span-4">
            <div className="rounded-[6px] bg-[#080A0D]/40 p-3 backdrop-blur-[2px] sm:p-4">
            <div className="border-t border-white/10">
              {researchCapabilities.map((cap, index) => {
                const Icon = icons[index];
                const isActive = active === index;
                return (
                  <button
                    key={cap.title}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`ri-cap group relative flex w-full items-center gap-4 border-b border-white/10 py-4 text-left transition-colors duration-400 ${
                      isActive ? "bg-white/[.04]" : ""
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-400 ${
                        isActive ? "border-[#D8BD82] text-[#D8BD82]" : "border-white/15 text-white/40"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-[Inter] text-[14.5px] font-semibold transition-all duration-400 ${
                          isActive ? "translate-x-1 text-[#F8F7F3]" : "text-[#F8F7F3]/55"
                        }`}
                      >
                        {cap.title}
                      </span>
                      <span
                        className={`mt-0.5 block font-[Inter] text-[12px] uppercase tracking-[0.06em] transition-colors duration-400 ${
                          isActive ? "text-[#9DA5AE]" : "text-[#9DA5AE]/50"
                        }`}
                      >
                        {cap.detail}
                      </span>
                    </span>
                    <ArrowRight
                      className={`size-3.5 shrink-0 text-[#D8BD82] transition-all duration-400 ${
                        isActive ? "translate-x-1 opacity-100" : "opacity-0"
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
            </div>
            <p className="mt-4 font-[Inter] text-[12px] text-[#9DA5AE]/70" aria-live="polite">
              {activeCapability.title}
            </p>
          </div>
        </div>

        <div className="ri-strip mt-20 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-7 md:mt-24">
          {bottomStrip.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && <span className="h-px w-6 bg-white/15" aria-hidden />}
              <span className="font-[Inter] text-[11px] font-medium tracking-[0.1em] text-[#9DA5AE]">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
