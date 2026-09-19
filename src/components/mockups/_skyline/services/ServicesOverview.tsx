import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Coins,
  Compass,
  LineChart,
  PieChart,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { serviceOverviewCards } from "../data";

const icons = [Coins, TrendingUp, LineChart, PieChart, Users, User, Compass, ShieldCheck];

export function ServicesOverview() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".so-eyebrow", ".so-heading-line", ".so-copy", ".so-link", ".so-card"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".so-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".so-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".so-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".so-link", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.45)
        .fromTo(
          ".so-card",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="overview" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="so-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="so-heading-line inline-block">A comprehensive</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="so-heading-line inline-block">
                  approach <em className="not-italic text-[#C7A86B]">to capital.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="so-copy max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65 lg:ml-auto">
              Our management services combine deep market expertise,
              disciplined processes and a client-centric approach. We work
              closely with individuals, families, institutions and business
              owners to deliver solutions aligned with their goals and
              values.
            </p>
            <a
              href="#long-term-value"
              className="so-link group mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B] lg:ml-auto"
            >
              Our Philosophy
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {serviceOverviewCards.map((card, index) => {
            const Icon = icons[index];
            return (
              <a
                key={card.title}
                href={card.anchor}
                className="so-card group relative flex flex-col overflow-hidden border border-[#12161B]/10 bg-[#F8F7F3] transition-colors duration-400 hover:border-[#C7A86B]/60"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B1624]">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-[#0B1624]">
                      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden>
                        <circle cx="44" cy="44" r="38" stroke="#C7A86B" strokeWidth="1" opacity="0.35" />
                        <circle
                          cx="44"
                          cy="44"
                          r="38"
                          stroke="#D8BD82"
                          strokeWidth="2"
                          strokeDasharray="120 358"
                          strokeLinecap="round"
                        />
                        <circle cx="44" cy="44" r="26" stroke="#C7A86B" strokeWidth="1" opacity="0.35" />
                        <circle
                          cx="44"
                          cy="44"
                          r="26"
                          stroke="#F5F2EA"
                          strokeWidth="2"
                          strokeDasharray="70 163"
                          strokeDashoffset="-40"
                          strokeLinecap="round"
                          opacity="0.7"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/60 via-transparent to-transparent transition-opacity duration-400 group-hover:opacity-80" />
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
                  <h3 className="font-[Cormorant_Garamond] text-[21px] font-semibold text-[#12161B] transition-colors duration-300 group-hover:text-[#12161B]">
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
      </div>
    </section>
  );
}
