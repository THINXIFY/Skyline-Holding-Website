import { useEffect, useRef } from "react";
import { ArrowRight, Handshake, ShieldCheck, Target, Timer } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { partnershipPrinciples } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=1200&auto=format&fit=crop";

const icons = [Target, Handshake, ShieldCheck, Timer];

export function PartnershipApproach() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".pa-eyebrow", ".pa-heading-line", ".pa-copy", ".pa-cta", ".pa-image", ".pa-principle", ".pa-quote"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set([".pa-divider-h", ".pa-divider-v"], { scaleX: 1, scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".pa-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
      )
        .fromTo(".pa-quote", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .fromTo(".pa-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.25)
        .fromTo(
          ".pa-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.35,
        )
        .fromTo(".pa-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .fromTo(".pa-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
        .fromTo(
          ".pa-principle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.55,
        )
        .fromTo(
          [".pa-divider-h", ".pa-divider-v"],
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.6 },
          0.65,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".pa-image img", { scale: 1.12 });
        gsap.to(".pa-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="partnership-approach" ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <div className="pa-image relative aspect-[3/4] w-full overflow-hidden bg-[#0B1624] lg:aspect-[4/5]">
              <img
                src={IMAGE}
                alt="An elegant, understated meeting room with a wooden table and glass walls"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/85 via-[#080A0D]/15 to-[#080A0D]/20" />
              <div className="pa-quote pointer-events-none absolute inset-x-0 bottom-0 p-6">
                <span className="block h-px w-8 bg-[#D8BD82]" aria-hidden />
                <p className="mt-4 font-[Cormorant_Garamond] text-[19px] italic leading-[1.35] text-[#F5F2EA]">
                  &ldquo;Exceptional outcomes are built on trust, alignment
                  and a long-term perspective.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="pa-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR PARTNERSHIP APPROACH
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(32px,3.4vw,44px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="pa-heading-line inline-block">Built on trust.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="pa-heading-line inline-block">
                  Designed for <em className="not-italic text-[#C7A86B]">what&rsquo;s next.</em>
                </span>
              </span>
            </h2>
            <p className="pa-copy mt-6 max-w-[42ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              We take a disciplined and relationship-driven approach,
              focusing on long-term value and meaningful collaboration.
            </p>
            <a
              href="/about"
              className="pa-cta group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Difference
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="relative grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <span
                className="pa-divider-v absolute left-1/2 top-0 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                aria-hidden
              />
              <span
                className="pa-divider-h absolute left-0 top-1/2 hidden h-px w-full origin-left bg-[#12161B]/10 sm:block"
                aria-hidden
              />
              {partnershipPrinciples.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div key={item.title} className="pa-principle pr-4">
                    <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.4} aria-hidden />
                    <h3 className="mt-4 font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[26ch] font-[Inter] text-[13px] leading-[1.5] text-[#12161B]/60">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
