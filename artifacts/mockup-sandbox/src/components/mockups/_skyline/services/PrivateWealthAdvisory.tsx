import { useEffect, useRef } from "react";
import { ArrowRight, Compass, Layers, Lightbulb, Map } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop";

const focusAreas = [
  { title: "Strategic Advice", icon: Lightbulb },
  { title: "Wealth Structuring", icon: Layers },
  { title: "Opportunity Evaluation", icon: Map },
  { title: "Long-Term Planning", icon: Compass },
];

export function PrivateWealthAdvisory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".pw-eyebrow", ".pw-heading-line", ".pw-copy", ".pw-focus", ".pw-cta", ".pw-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".pw-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".pw-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".pw-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".pw-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".pw-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: EASE.expo },
          0.35,
        )
        .fromTo(".pw-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo(
          ".pw-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.55,
        )
        .fromTo(
          ".pw-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.65,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="private-wealth-advisory" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <p className="pw-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="pw-heading-line inline-block">Private Wealth Advisory</span>
              </span>
            </h2>
            <p className="pw-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              Independent guidance for individuals and families seeking
              clarity, discretion and a long-term perspective on wealth.
            </p>
            <a
              href="/contact"
              className="pw-cta group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Explore Private Wealth Advisory
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[#12161B]/10 pt-7">
              {focusAreas.map((area, index) => (
                <div key={area.title} className="pw-focus relative pl-0 sm:pl-6 sm:first:pl-0">
                  {index > 0 && (
                    <span
                      className="pw-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                      aria-hidden
                    />
                  )}
                  <area.icon className="text-[#C7A86B]" size={18} strokeWidth={1.4} aria-hidden />
                  <span className="mt-2.5 block font-[Inter] text-[13px] font-semibold leading-[1.3] text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="pw-image relative aspect-[4/3] w-full overflow-hidden bg-[#0B1624] sm:aspect-[16/11] lg:h-[420px]">
              <img
                src={IMAGE}
                alt="An elegant, understated meeting room with a wooden table and glass walls"
                className="size-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
