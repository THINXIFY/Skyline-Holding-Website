import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cloud, Cpu, LayoutGrid, Share2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop";

const capabilities = [
  { title: "AI & Automation", icon: Cpu },
  { title: "Digital Infrastructure", icon: Cloud },
  { title: "Enterprise Software", icon: LayoutGrid },
  { title: "Transformational Platforms", icon: Share2 },
];

export function TechnologySector() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".te-eyebrow", ".te-heading-line", ".te-copy", ".te-cta", ".te-image", ".te-label", ".te-block"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".te-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".te-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".te-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".te-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(
          ".te-block",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.7,
        )
        .fromTo(".te-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 1.0)
        .fromTo(".te-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.5);

      if (window.innerWidth >= 1024) {
        gsap.set(".te-image img", { scale: 1.15 });
        gsap.to(".te-image img", {
          scale: 1.06,
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
            <div className="te-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#080A0D] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="Illuminated server racks in a modern data infrastructure facility"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/80 via-[#080A0D]/20 to-[#080A0D]/25" />

              <HeroParticles
                reduceMotion={reduceMotion}
                density={{ desktop: 18, tablet: 12, mobile: 8 }}
                opacityRange={{ min: 0.2, max: 0.4 }}
                zIndexClassName="z-[2]"
              />

              <div className="pointer-events-none absolute bottom-6 left-6 flex flex-col gap-1">
                {["TECHNOLOGY", "FOR A MORE", "CONNECTED TOMORROW"].map((label) => (
                  <span
                    key={label}
                    className="te-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="te-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="te-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="te-heading-line inline-block">Technology &amp; AI</span>
              </span>
            </h2>
            <p className="te-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              Skyline evaluates technologies reshaping productivity,
              infrastructure and the future of business. We look for
              opportunities where software, AI, automation and digital
              systems solve meaningful problems, strengthen competitive
              advantage and create long-term relevance.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="te-block group flex items-center gap-3 border border-white/10 px-5 py-4 transition-all duration-400 hover:border-[#C7A86B]/50 hover:bg-white/[.03]"
                >
                  <cap.icon
                    className="shrink-0 text-[#D8BD82] transition-transform duration-400 group-hover:scale-105"
                    size={18}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/85">
                    {cap.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="te-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore This Sector
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
