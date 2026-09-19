import { useEffect, useRef } from "react";
import { ArrowRight, Gem, ShoppingBag, Sparkles, Users } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Luxury Brands", body: "Timeless value across generations.", icon: Gem },
  { title: "Consumer Goods", body: "Quality products for modern lifestyles.", icon: ShoppingBag },
  { title: "Experience & Hospitality", body: "Memorable experiences that inspire loyalty.", icon: Users },
  { title: "Lifestyle & Wellness", body: "Growing demand for healthier, better lives.", icon: Sparkles },
];

export function ConsumerLuxurySector() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cl-eyebrow", ".cl-heading-line", ".cl-copy", ".cl-focus", ".cl-cta", ".cl-image", ".cl-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cl-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cl-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(
          ".cl-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.2,
        )
        .fromTo(".cl-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".cl-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.6,
        )
        .fromTo(".cl-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.95)
        .fromTo(".cl-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.5);

      if (window.innerWidth >= 1024) {
        gsap.set(".cl-image img", { scale: 1.1 });
        gsap.to(".cl-image img", {
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
          <div className="lg:col-span-6">
            <p className="cl-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="cl-heading-line inline-block">Consumer &amp;</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="cl-heading-line inline-block text-[#C7A86B]">Luxury</span>
              </span>
            </h2>
            <p className="cl-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We invest in consumer and luxury businesses that combine
              strong brands, exceptional products and lasting customer
              loyalty. Our focus is on companies that understand evolving
              lifestyles, create meaningful experiences and have the
              potential for long-term, sustainable growth.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="cl-focus group">
                  <area.icon
                    className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={20}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="relative mt-3 block font-[Inter] text-[13.5px] font-semibold text-[#12161B]">
                    {area.title}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C7A86B] transition-all duration-400 group-hover:w-full" />
                  </span>
                  <span className="mt-1.5 block font-[Inter] text-[12px] leading-[1.4] text-[#12161B]/55">
                    {area.body}
                  </span>
                </div>
              ))}
            </div>

            <div className="cl-cta mt-9 flex flex-wrap items-center gap-7">
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
                className="inline-flex min-h-11 items-center border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-medium text-[#12161B]/70 transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
              >
                Our Approach
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="cl-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <img
                src={IMAGE}
                alt="A luxury resort pool bordered by palm trees at golden hour"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/65 via-transparent to-transparent" />

              <div className="pointer-events-none absolute bottom-6 right-6 text-right">
                {["EXCEPTIONAL", "BRANDS.", "MEANINGFUL", "EXPERIENCES."].map((label) => (
                  <span
                    key={label}
                    className="cl-label block font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="cl-label ml-auto mt-1 block h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
