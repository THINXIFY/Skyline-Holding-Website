import { useEffect, useRef } from "react";
import { ArrowRight, ClipboardCheck, Compass, Search, Target } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Investment Research", icon: Search },
  { title: "Opportunity Selection", icon: Target },
  { title: "Strategic Allocation", icon: Compass },
  { title: "Performance Oversight", icon: ClipboardCheck },
];

export function InvestmentManagement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".im-eyebrow", ".im-heading-line", ".im-copy", ".im-focus", ".im-cta", ".im-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".im-image",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".im-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".im-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".im-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .fromTo(
          ".im-focus",
          { opacity: 0, x: 14 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          0.65,
        )
        .fromTo(".im-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.95);

      if (window.innerWidth >= 1024) {
        gsap.set(".im-image img", { scale: 1.1 });
        gsap.to(".im-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="investment-management" ref={rootRef} className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="im-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px]">
              <img
                src={IMAGE}
                alt="Skyscrapers along a city avenue at sunset"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/45 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="im-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="im-heading-line inline-block">Investment Management</span>
              </span>
            </h2>
            <p className="im-copy mt-6 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
              Structured investment solutions built around disciplined
              research, clear objectives and long-term performance.
            </p>

            <div className="mt-8 flex flex-col gap-5 border-t border-[#12161B]/10 pt-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="im-focus flex items-center gap-3.5">
                  <area.icon className="shrink-0 text-[#C7A86B]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="font-[Inter] text-[14px] font-medium text-[#12161B]">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="im-cta group mt-9 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[14px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Explore Investment Management
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
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
