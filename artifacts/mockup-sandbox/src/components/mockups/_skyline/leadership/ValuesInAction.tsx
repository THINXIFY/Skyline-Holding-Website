import { useEffect, useRef } from "react";
import { Handshake, Leaf, Shield, Timer } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { leadershipValues } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop";

const icons = [Shield, Timer, Handshake, Leaf];

export function ValuesInAction() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".va-image", ".va-quote", ".va-eyebrow", ".va-heading-line", ".va-copy", ".va-principle"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set([".va-divider-h", ".va-divider-v"], { scaleX: 1, scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".va-image",
        { clipPath: "inset(0% 0% 0% 100%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: EASE.expo },
      )
        .fromTo(".va-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
        .fromTo(".va-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".va-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.4,
        )
        .fromTo(".va-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .fromTo(
          ".va-principle",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.7,
        )
        .fromTo(
          [".va-divider-h", ".va-divider-v"],
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.6 },
          0.8,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".va-image img", { scale: 1.12 });
        gsap.to(".va-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#F8F7F3]">
      <div className="grid lg:grid-cols-2">
        <div className="va-image relative aspect-[4/3] w-full overflow-hidden bg-[#0B1624] lg:aspect-auto lg:min-h-[640px]">
          <img
            src={IMAGE}
            alt="A glass-walled corporate office corridor"
            className="size-full object-cover will-change-transform"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/75 via-[#080A0D]/10 to-[#080A0D]/15" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-8 md:p-12">
            <span className="va-quote block h-px w-10 bg-[#D8BD82]" aria-hidden />
            <p className="va-quote mt-5 max-w-[420px] font-[Cormorant_Garamond] text-[clamp(26px,3vw,34px)] font-semibold italic leading-[1.2] text-[#F8F7F3]">
              A shared commitment to a better tomorrow.
            </p>
            <p className="va-quote mt-4 font-[Inter] text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
              Skyline Holding
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-14 md:py-20 lg:px-16">
          <p className="va-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
            <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
            OUR VALUES IN ACTION
          </p>
          <h2 className="mt-6 max-w-[520px] font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
            <span className="block overflow-hidden pb-1">
              <span className="va-heading-line inline-block">Leadership beyond</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="va-heading-line inline-block">business.</span>
            </span>
          </h2>
          <p className="va-copy mt-6 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65">
            We believe great leadership is not only measured by results,
            but by the positive impact we create for our investors,
            partners and the communities we serve.
          </p>

          <div className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
            <span
              className="va-divider-v absolute left-1/2 top-0 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
              aria-hidden
            />
            <span
              className="va-divider-h absolute left-0 top-1/2 hidden h-px w-full origin-left bg-[#12161B]/10 sm:block"
              aria-hidden
            />
            {leadershipValues.map((value, index) => {
              const Icon = icons[index];
              return (
                <div key={value.title} className="va-principle pr-4">
                  <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.4} aria-hidden />
                  <h3 className="mt-3.5 font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 max-w-[26ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#12161B]/60">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
