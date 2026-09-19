import { useEffect, useRef } from "react";
import { ArrowRight, Coins, Layers, TrendingUp, Users } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Wealth Preservation", icon: Coins },
  { title: "Long-Term Growth", icon: TrendingUp },
  { title: "Intergenerational Planning", icon: Users },
  { title: "Strategic Diversification", icon: Layers },
];

export function WealthManagement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".wm-eyebrow", ".wm-heading-line", ".wm-copy", ".wm-supp", ".wm-focus", ".wm-cta", ".wm-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".wm-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".wm-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".wm-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".wm-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".wm-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".wm-supp", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
        .fromTo(".wm-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .fromTo(
          ".wm-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.75,
        )
        .fromTo(
          ".wm-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.85,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".wm-image img", { scale: 1.12 });
        gsap.to(".wm-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="wealth-management" ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="wm-heading-line inline-block">Wealth Management</span>
              </span>
            </h2>
            <p className="wm-copy mt-6 max-w-[48ch] font-[Inter] text-[17px] leading-[1.5] text-[#12161B]/75">
              Personalized wealth strategies designed to preserve, grow and
              transfer capital across generations.
            </p>
            <p className="wm-supp mt-4 max-w-[48ch] font-[Inter] text-[15.5px] leading-[1.5] text-[#12161B]/55">
              We take a long-term, tailored approach to wealth planning,
              aligning investment strategy, risk awareness and financial
              priorities with each client&rsquo;s broader objectives.
            </p>
            <a
              href="/contact"
              className="wm-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Wealth Management
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#12161B]/10 pt-8 sm:grid-cols-4">
              {focusAreas.map((area, index) => (
                <div key={area.title} className="wm-focus relative pl-0 sm:pl-6 sm:first:pl-0">
                  {index > 0 && (
                    <span
                      className="wm-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                      aria-hidden
                    />
                  )}
                  <area.icon className="text-[#C7A86B]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="mt-3 block font-[Inter] text-[13px] font-semibold leading-[1.3] text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="wm-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="A luxury villa with an illuminated pool at dusk"
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
