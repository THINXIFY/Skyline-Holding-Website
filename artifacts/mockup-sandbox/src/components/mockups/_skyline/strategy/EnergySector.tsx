import { useEffect, useRef, useState } from "react";
import { ArrowRight, Flame, Gem, Leaf, Settings2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Renewable Energy", body: "A cleaner, more resilient future.", icon: Leaf },
  { title: "Traditional Energy", body: "Reliable resources for global demand.", icon: Flame },
  { title: "Critical Minerals", body: "Essential materials for a changing world.", icon: Gem },
  { title: "Energy Infrastructure", body: "Building for a more connected future.", icon: Settings2 },
];

export function EnergySector() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".en-eyebrow", ".en-heading-line", ".en-copy", ".en-focus", ".en-cta", ".en-image", ".en-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".en-image",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".en-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".en-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".en-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(
          ".en-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.7,
        )
        .fromTo(".en-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 1.0)
        .fromTo(".en-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.5);

      if (window.innerWidth >= 1024) {
        gsap.set(".en-image img", { scale: 1.12 });
        gsap.to(".en-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="en-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#080A0D] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="Wind turbines silhouetted against a dramatic sunset over open farmland"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/75 via-[#080A0D]/10 to-[#080A0D]/20" />

              <HeroParticles
                reduceMotion={reduceMotion}
                density={{ desktop: 16, tablet: 10, mobile: 6 }}
                opacityRange={{ min: 0.15, max: 0.3 }}
                zIndexClassName="z-[2]"
              />

              <div className="pointer-events-none absolute bottom-6 left-6 flex flex-col gap-1">
                {["CLEAN ENERGY", "STRONGER TOMORROWS"].map((label) => (
                  <span
                    key={label}
                    className="en-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="en-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="en-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="en-heading-line inline-block">Energy &amp;</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="en-heading-line inline-block text-[#D8BD82]">Strategic Resources</span>
              </span>
            </h2>
            <p className="en-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              We invest in energy and strategic resource opportunities that
              support the global transition, long-term energy security and
              sustainable economic growth. Our focus includes traditional
              energy, renewable solutions and critical resources essential
              for the industries of tomorrow.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="en-focus group">
                  <area.icon
                    className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={20}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="relative mt-3 block font-[Inter] text-[13.5px] font-semibold text-[#F5F2EA]">
                    {area.title}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D8BD82] transition-all duration-400 group-hover:w-full" />
                  </span>
                  <span className="mt-1.5 block font-[Inter] text-[12px] leading-[1.4] text-[#9DA5AE]">
                    {area.body}
                  </span>
                </div>
              ))}
            </div>

            <div className="en-cta mt-9 flex flex-wrap items-center gap-7">
              <a
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore This Sector
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href="/about"
                className="inline-flex min-h-11 items-center border-b border-white/20 pb-0.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/70 transition-colors hover:border-[#D8BD82] hover:text-[#D8BD82]"
              >
                Our View on the Energy Transition
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
