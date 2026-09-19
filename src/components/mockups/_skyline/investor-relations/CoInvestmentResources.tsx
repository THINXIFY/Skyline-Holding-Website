import { useEffect, useRef } from "react";
import { ArrowRight, FileText, LineChart, ScrollText, TrendingUp } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { investorResources } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1200&auto=format&fit=crop";

const resourceIcons = [FileText, LineChart, ScrollText, TrendingUp];

export function CoInvestmentResources() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cr-image", ".cr-label", ".cr-heading", ".cr-copy", ".cr-cta", ".cr-resource"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".cr-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".cr-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
        .fromTo(".cr-heading", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(".cr-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".cr-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(
          ".cr-resource",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.5,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".cr-image img", { scale: 1.1 });
        gsap.to(".cr-image img", {
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
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <div className="cr-image relative aspect-[4/3] w-full overflow-hidden bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[440px]">
              <img
                src={IMAGE}
                alt="A calm mountain lake reflecting the surrounding peaks"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/40 via-transparent to-transparent" />
            </div>

            <p className="cr-label mt-8 flex items-center gap-3 font-[Inter] text-[11.5px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              CO-INVESTMENT OPPORTUNITIES
            </p>
            <h3 className="cr-heading mt-4 font-[Cormorant_Garamond] text-[clamp(28px,3vw,36px)] font-semibold leading-[1.05] text-[#12161B]">
              Investing alongside aligned partners.
            </h3>
            <p className="cr-copy mt-5 max-w-[48ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              Where appropriate, Skyline may collaborate with investors on
              selected opportunities that benefit from shared capital,
              complementary expertise and a common investment horizon.
            </p>
            <a
              href="/contact"
              className="cr-cta group mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Explore Opportunities
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p className="cr-label flex items-center gap-3 font-[Inter] text-[11.5px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              INVESTOR RESOURCES
            </p>
            <h3 className="cr-heading mt-4 font-[Cormorant_Garamond] text-[clamp(28px,3vw,36px)] font-semibold leading-[1.05] text-[#12161B]">
              Information when it matters.
            </h3>
            <p className="cr-copy mt-5 max-w-[56ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              Approved investors and partners may receive access to
              relevant reports, investment materials, updates and
              due-diligence documentation through Skyline&rsquo;s private
              investor area.
            </p>

            <div className="mt-8 divide-y divide-[#12161B]/10 border-t border-[#12161B]/10">
              {investorResources.map((item, index) => {
                const Icon = resourceIcons[index];
                return (
                  <div key={item} className="cr-resource flex min-h-[56px] items-center gap-4 py-3">
                    <Icon className="shrink-0 text-[#C7A86B]" size={18} strokeWidth={1.5} aria-hidden />
                    <span className="font-[Inter] text-[14.5px] font-medium text-[#12161B]">{item}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="/contact"
              className="cr-cta group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request Private Access
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
