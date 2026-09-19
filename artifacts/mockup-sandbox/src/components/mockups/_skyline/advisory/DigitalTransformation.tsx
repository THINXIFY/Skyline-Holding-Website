import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, Cpu, Database, LayoutGrid } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Digital Strategy", icon: LayoutGrid },
  { title: "Process Automation", icon: Cpu },
  { title: "Data & Analytics", icon: BarChart3 },
  { title: "Platform Modernization", icon: Database },
];

export function DigitalTransformation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".dt-eyebrow", ".dt-heading-line", ".dt-copy", ".dt-focus", ".dt-cta", ".dt-image", ".dt-shift"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".dt-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".dt-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".dt-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".dt-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".dt-shift", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6)
        .fromTo(
          ".dt-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.75,
        )
        .fromTo(".dt-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.05);

      if (window.innerWidth >= 1024) {
        gsap.set(".dt-image img", { scale: 1.12 });
        gsap.to(".dt-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="digital-transformation" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="dt-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              DIGITAL TRANSFORMATION
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="dt-heading-line inline-block">Building smarter,</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="dt-heading-line inline-block">more resilient businesses.</span>
              </span>
            </h2>
            <p className="dt-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              We help businesses use digital systems, automation and modern
              technology to improve efficiency, decision-making and
              customer experience.
            </p>

            <div className="dt-shift mt-7 flex items-center gap-3">
              <span className="rounded-full border border-[#12161B]/15 px-4 py-1.5 font-[Inter] text-[11.5px] font-semibold text-[#12161B]/55">
                Legacy Systems
              </span>
              <ArrowRight className="size-4 text-[#C7A86B]" strokeWidth={2} aria-hidden />
              <span className="rounded-full bg-[#C7A86B]/15 px-4 py-1.5 font-[Inter] text-[11.5px] font-semibold text-[#12161B]">
                Modern Platforms
              </span>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="dt-focus flex items-center gap-3">
                  <area.icon className="text-[#C7A86B]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="dt-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Digital Transformation
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="dt-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="Angular modern architecture viewed from below against a bright sky"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
