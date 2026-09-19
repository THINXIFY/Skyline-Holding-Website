import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Cpu,
  Globe2,
  Handshake,
  LineChart,
  MonitorSmartphone,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { advisoryOverviewCards } from "../data";

const icons = [Trophy, Handshake, LineChart, TrendingUp, Globe2, MonitorSmartphone, Cpu];

export function AdvisoryOverview() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ao-eyebrow", ".ao-heading-line", ".ao-copy", ".ao-link", ".ao-card"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".ao-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ao-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ao-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".ao-link", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.45)
        .fromTo(
          ".ao-card",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const topRow = advisoryOverviewCards.slice(0, 3);
  const bottomRow = advisoryOverviewCards.slice(3);

  return (
    <section id="overview" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="ao-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR ADVISORY AREAS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ao-heading-line inline-block">Expertise across</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ao-heading-line inline-block">
                  every <em className="not-italic text-[#C7A86B]">stage of growth.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="ao-copy max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65 lg:ml-auto">
              We combine strategic insight, market expertise and practical
              execution to help clients make better decisions, solve
              complex challenges and pursue meaningful opportunities.
            </p>
            <a
              href="#advisory-process"
              className="ao-link group mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B] lg:ml-auto"
            >
              Our Approach
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* Top row: 3 larger image-led services */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {topRow.map((card, index) => {
            const Icon = icons[index];
            return (
              <a
                key={card.title}
                href={card.anchor}
                className="ao-card group relative flex flex-col overflow-hidden border border-[#12161B]/10 bg-[#F8F7F3] transition-colors duration-400 hover:border-[#C7A86B]/60"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B1624]">
                  <img
                    src={card.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/65 via-transparent to-transparent transition-opacity duration-400 group-hover:opacity-90" />
                  <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full bg-[#F8F7F3]/90">
                    <Icon
                      className="text-[#C7A86B] transition-transform duration-400 group-hover:-translate-y-0.5"
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[Cormorant_Garamond] text-[22px] font-semibold text-[#12161B]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 font-[Inter] text-[13.5px] leading-[1.5] text-[#12161B]/60">
                    {card.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-[Inter] text-[12.5px] font-semibold text-[#12161B]">
                    Learn More
                    <ArrowRight
                      className="size-3.5 text-[#C7A86B] transition-transform duration-400 group-hover:translate-x-1.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom row: 4 compact editorial panels */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bottomRow.map((card, index) => {
            const Icon = icons[index + 3];
            return (
              <a
                key={card.title}
                href={card.anchor}
                className="ao-card group relative flex flex-col overflow-hidden border border-[#12161B]/10 bg-[#F8F7F3] transition-colors duration-400 hover:border-[#C7A86B]/60"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1624]">
                  <img
                    src={card.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/60 via-transparent to-transparent transition-opacity duration-400 group-hover:opacity-85" />
                  <span className="absolute left-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-[#F8F7F3]/90">
                    <Icon className="text-[#C7A86B]" size={14} strokeWidth={1.6} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[Cormorant_Garamond] text-[18px] font-semibold text-[#12161B]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 flex-1 font-[Inter] text-[12.5px] leading-[1.45] text-[#12161B]/60">
                    {card.body}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-[Inter] text-[11.5px] font-semibold text-[#12161B]">
                    Learn More
                    <ArrowRight
                      className="size-3 text-[#C7A86B] transition-transform duration-400 group-hover:translate-x-1.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
