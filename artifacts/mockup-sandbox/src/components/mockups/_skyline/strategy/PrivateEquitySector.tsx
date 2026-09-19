import { useEffect, useRef } from "react";
import { ArrowRight, Award, TrendingUp, Users2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop";

const qualities = [
  { title: "Quality Businesses", icon: Award },
  { title: "Aligned Leadership", icon: Users2 },
  { title: "Long-Term Growth", icon: TrendingUp },
];

export function PrivateEquitySector() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".pe-eyebrow", ".pe-heading-line", ".pe-copy", ".pe-cta", ".pe-image", ".pe-label", ".pe-quality"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".pe-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".pe-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".pe-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".pe-image",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".pe-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".pe-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6)
        .fromTo(".pe-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.5)
        .fromTo(
          ".pe-quality",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          0.75,
        )
        .fromTo(
          ".pe-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.85,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".pe-image img", { scale: 1.1 });
        gsap.to(".pe-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:order-1 lg:col-span-6">
            <p className="pe-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="pe-heading-line inline-block">Private Equity &amp;</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="pe-heading-line inline-block">Growth Capital</span>
              </span>
            </h2>
            <p className="pe-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We partner with ambitious businesses where capital, strategic
              guidance and long-term alignment can support sustainable
              growth. We look for opportunities where operational strength,
              market demand and management quality create a strong platform
              for value creation.
            </p>
            <a
              href="/contact"
              className="pe-cta group mt-9 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Learn More
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:order-2 lg:col-span-6">
            <div className="pe-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px]">
              <img
                src={IMAGE}
                alt="Lower Manhattan skyline at dusk with the moon rising over the financial district"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/65 via-transparent to-[#080A0D]/10" />

              <div className="pointer-events-none absolute right-6 top-6 flex flex-col items-end gap-1">
                {["AMBITION", "PARTNERSHIP", "PROGRESS", "ENDURING VALUE"].map((label) => (
                  <span
                    key={label}
                    className="pe-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="pe-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#12161B]/10 pt-10 sm:grid-cols-3 md:mt-20">
          {qualities.map((quality, index) => (
            <div key={quality.title} className="pe-quality relative pl-0 sm:pl-6 sm:first:pl-0">
              {index > 0 && (
                <span
                  className="pe-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                  aria-hidden
                />
              )}
              <quality.icon className="text-[#C7A86B]" size={20} strokeWidth={1.4} aria-hidden />
              <span className="mt-3 block font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                {quality.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
