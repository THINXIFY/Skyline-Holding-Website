import { useEffect, useRef } from "react";
import { ArrowRight, Compass, Landmark, ScrollText, Users2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE = "/images/slide-3.webp";

const focusAreas = [
  { title: "Family Governance", icon: Landmark },
  { title: "Wealth Coordination", icon: Compass },
  { title: "Legacy Planning", icon: ScrollText },
  { title: "Strategic Oversight", icon: Users2 },
];

export function FamilyOfficeServices() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".fo-eyebrow", ".fo-heading-line", ".fo-copy", ".fo-focus", ".fo-cta", ".fo-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".fo-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".fo-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".fo-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".fo-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .fromTo(
          ".fo-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.65,
        )
        .fromTo(".fo-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.95);

      if (window.innerWidth >= 1024) {
        gsap.set(".fo-image img", { scale: 1.12 });
        gsap.to(".fo-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="family-office" ref={rootRef} className="relative overflow-hidden bg-[#0B1624] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="fo-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#080A0D] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px]">
              <img
                src={IMAGE}
                alt="A private residence interior overlooking mountains and a lake at dusk"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/60 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="fo-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="fo-heading-line inline-block">Family Office Services</span>
              </span>
            </h2>
            <p className="fo-copy mt-6 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              Integrated support for families managing complex,
              multi-generational wealth and long-term financial priorities.
            </p>

            <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="fo-focus flex items-center gap-3.5">
                  <area.icon className="shrink-0 text-[#D8BD82]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="font-[Inter] text-[14px] font-medium text-[#F5F2EA]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="fo-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Family Office Services
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
