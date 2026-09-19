import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { responsiblePrinciples } from "./data";

const IMAGE =
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=1400&auto=format&fit=crop";

export function ResponsibleGrowth() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".rg-eyebrow", ".rg-heading-line", ".rg-copy", ".rg-cta", ".rg-principle", ".rg-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".rg-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".rg-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".rg-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".rg-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".rg-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
        .fromTo(
          ".rg-principle",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          0.4,
        )
        .fromTo(
          ".rg-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, stagger: 0.1, transformOrigin: "top" },
          0.45,
        )
        .fromTo(
          ".rg-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.3,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".rg-image img", { scale: 1.12 });
        gsap.to(".rg-image img", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="governance" className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-4">
            <p className="rg-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              RESPONSIBLE GROWTH
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,60px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="rg-heading-line inline-block">Built to create</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="rg-heading-line inline-block text-[#C7A86B]">value responsibly.</span>
              </span>
            </h2>
            <p className="rg-copy mt-7 max-w-[40ch] font-[Manrope] text-[16px] leading-[1.5] text-[#12161B]/65">
              We believe lasting value depends on responsible ownership,
              strong governance and disciplined long-term decision-making.
            </p>
            <a
              href="#management-services"
              className="rg-cta group mt-7 inline-flex min-h-11 items-center gap-2 font-[Manrope] text-[13.5px] font-semibold text-[#12161B]"
            >
              Our Approach
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {responsiblePrinciples.map((principle, index) => (
              <div key={principle.title} className="rg-principle relative flex gap-4 pl-5">
                <span
                  className="rg-divider absolute left-0 top-0.5 h-9 w-px origin-top bg-[#C7A86B]"
                  aria-hidden
                />
                <div>
                  <span className="font-[Manrope] text-[11px] font-semibold text-[#C7A86B]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-1 font-[Manrope] text-[16px] font-semibold text-[#12161B]">
                    {principle.title}
                  </h3>
                  <p className="mt-1 max-w-[30ch] font-[Manrope] text-[13.5px] leading-[1.5] text-[#12161B]/55">
                    {principle.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="rg-image aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] lg:aspect-auto lg:h-[420px]">
              <img
                src={IMAGE}
                alt="Detail of a curved lattice architectural facade against a clear sky"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
