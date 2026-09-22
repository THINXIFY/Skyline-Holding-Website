import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { pitchDeckPath, whoWeArePrinciples } from "./data";

const IMAGE = "https://marbholding.com/wp-content/uploads/2026/09/about-sec-img.webp";

const microLabels = ["PEOPLE", "CAPITAL", "IDEAS", "PROGRESS"];

export function WhoWeAre() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const targets = {
        eyebrow: ".wwa-eyebrow",
        heading: ".wwa-heading-line",
        copy: ".wwa-copy",
        cta: ".wwa-cta",
        image: ".wwa-image",
        line: ".wwa-gold-line",
        label: ".wwa-micro-label",
        principle: ".wwa-principle",
        divider: ".wwa-divider",
      };

      if (reduce) {
        gsap.set(
          [
            targets.eyebrow,
            targets.heading,
            targets.copy,
            targets.cta,
            targets.image,
            targets.label,
            targets.principle,
          ],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(targets.line, { scaleY: 1 });
        gsap.set(targets.divider, { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(targets.eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          targets.heading,
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(targets.copy, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.4)
        .fromTo(targets.cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(
          targets.image,
          { clipPath: "inset(0% 0% 0% 100%)", scale: 1.03 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.2, ease: EASE.expo },
          0.15,
        )
        .fromTo(targets.line, { scaleY: 0 }, { scaleY: 1, duration: 0.8, transformOrigin: "top" }, 0.5)
        .fromTo(
          targets.label,
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 },
          0.9,
        )
        .fromTo(
          targets.principle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.14 },
          0.95,
        )
        .fromTo(
          targets.divider,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.14, transformOrigin: "top" },
          1.0,
        );

      // Very subtle scroll parallax on the image only; skipped on small screens.
      // Pre-scaled via GSAP (not a CSS class) so the scale composes correctly
      // with the scrubbed yPercent instead of one overwriting the other's
      // inline transform, which previously left a gap exposing the frame's
      // dark fallback background at the top edge.
      if (window.innerWidth >= 1024) {
        gsap.set(".wwa-image img", { scale: 1.14 });
        gsap.to(".wwa-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative overflow-hidden bg-[#F5F2EA] py-24 md:py-32 lg:py-36"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 w-full -translate-x-1/2 -translate-y-[22%] select-none whitespace-nowrap text-center font-[Cormorant_Garamond] text-[20vw] font-semibold leading-none text-[#12161B]/[0.03]"
      >
        PERSPECTIVE
      </span>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="order-1 lg:order-1 lg:col-span-6">
            <p className="wwa-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              WHO WE ARE
            </p>

            <h2 className="mt-7 font-[Cormorant_Garamond] text-[clamp(34px,9vw,48px)] font-semibold leading-[1.0] text-[#12161B] md:text-[clamp(40px,5vw,58px)] lg:text-[clamp(46px,4.6vw,66px)]">
              <span className="block overflow-hidden pb-1">
                <span className="wwa-heading-line inline-block">
                  Independent capital
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="wwa-heading-line inline-block text-[#C7A86B]">
                  for a changing world.
                </span>
              </span>
            </h2>

            <p className="wwa-copy mt-7 max-w-[44ch] font-[Inter] text-base leading-[1.5] text-[#12161B] md:text-[17px]">
              Skyline brings together capital, strategic insight and an
              international perspective to support businesses, assets and
              partners in creating lasting value.
            </p>
            <p className="wwa-copy mt-3 max-w-[44ch] font-[Inter] text-base leading-[1.5] text-[#62676D]">
              We invest with a long-term mindset, focusing on quality,
              resilience and opportunities where our capabilities can make a
              meaningful difference.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-7">
              <a
                href="#investment-focus"
                className="wwa-cta group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold tracking-[0.01em] text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
              >
                Discover Skyline
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href={pitchDeckPath}
                target="_blank"
                rel="noopener noreferrer"
                className="wwa-cta group inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-medium text-[#12161B] transition-colors duration-300 hover:border-[#C7A86B] hover:text-[#C7A86B]"
              >
                Pitch Deck
                <ArrowUpRight
                  className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="order-2 lg:order-2 lg:col-span-6">
            <div className="relative">
              <span
                className="pointer-events-none absolute -right-3 -top-3 hidden h-[38%] w-[30%] bg-[#EFEADD] sm:block lg:-right-4 lg:-top-4"
                aria-hidden
              />

              <div className="wwa-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624] sm:aspect-[16/11] lg:aspect-auto lg:h-[420px]">
                <img
                  src={IMAGE}
                  alt="A cantilevered modern residence overlooking mountains and a lake at sunset"
                  className="size-full object-cover will-change-transform"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#080A0D]/30 via-transparent to-transparent" />
              </div>

              <span
                className="wwa-gold-line pointer-events-none absolute -bottom-4 left-0 hidden h-12 w-px origin-top bg-[#C7A86B] sm:block"
                aria-hidden
              />

              <div
                className="pointer-events-none absolute right-4 top-5 hidden flex-col gap-1.5 text-right sm:flex lg:right-5"
                aria-hidden
              >
                {microLabels.map((label) => (
                  <span
                    key={label}
                    className="wwa-micro-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="order-3 mt-20 grid gap-10 sm:grid-cols-3 md:mt-28">
          {whoWeArePrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="wwa-principle relative border-t border-[rgba(18,22,27,0.12)] pt-6 sm:border-t-0 sm:pt-0"
            >
              {index > 0 && (
                <span
                  className="wwa-divider absolute -left-5 top-0 hidden h-full w-px origin-top bg-[rgba(18,22,27,0.12)] sm:block"
                  aria-hidden
                />
              )}
              <h3 className="font-[Inter] text-[15px] font-semibold tracking-[0.02em] text-[#12161B]">
                {principle.title}
              </h3>
              <p className="mt-2 max-w-[36ch] font-[Inter] text-[15px] leading-[1.5] text-[#62676D]">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
