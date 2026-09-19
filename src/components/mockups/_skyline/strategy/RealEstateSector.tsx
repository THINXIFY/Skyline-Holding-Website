import { useEffect, useRef } from "react";
import { ArrowRight, Building2, Landmark, Palmtree } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Strategic Property", icon: Building2 },
  { title: "Infrastructure Assets", icon: Landmark },
  { title: "Hospitality & Development", icon: Palmtree },
];

export function RealEstateSector() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".re-eyebrow", ".re-heading-line", ".re-copy", ".re-focus", ".re-cta", ".re-image", ".re-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".re-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".re-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".re-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".re-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(
          ".re-focus",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.7,
        )
        .fromTo(".re-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.95)
        .fromTo(".re-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.5);

      if (window.innerWidth >= 1024) {
        gsap.set(".re-image img", { scale: 1.12 });
        gsap.to(".re-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="re-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[520px]">
              <img
                src={IMAGE}
                alt="Modern skyscrapers viewed from street level in a financial district"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-[#080A0D]/10" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[#080A0D]/60 to-transparent" />

              <div className="pointer-events-none absolute bottom-6 left-6 flex flex-col gap-1">
                {["REAL ASSETS", "STRONGER COMMUNITIES", "LASTING VALUE"].map((label) => (
                  <span
                    key={label}
                    className="re-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="re-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="re-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="re-heading-line inline-block">Real Estate &amp;</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="re-heading-line inline-block">Infrastructure</span>
              </span>
            </h2>
            <p className="re-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We invest in real assets that combine strategic location,
              long-term utility and resilient demand. Our focus spans
              selected property, development and infrastructure
              opportunities where disciplined execution can support
              lasting value.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {focusAreas.map((area) => (
                <div key={area.title} className="re-focus group flex items-center gap-3">
                  <area.icon
                    className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[14px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="re-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Sector Focus
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
