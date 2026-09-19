import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1800&auto=format&fit=crop";

const sideCopy = ["INTEGRITY", "COMPLIANCE", "RESPONSIBILITY", "LONG-TERM VALUE"];

export function LegalHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".lgh-eyebrow", ".lgh-heading-line", ".lgh-copy", ".lgh-side", ".lgh-mark"], { opacity: 1, y: 0 });
        gsap.set(".lgh-rule", { scaleX: 1 });
        gsap.set(".lgh-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".lgh-image", { scale: 1.04 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".lgh-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.35,
        )
        .fromTo(".lgh-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .fromTo(
          ".lgh-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .fromTo(".lgh-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(
          ".lgh-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.0,
        )
        .fromTo(".lgh-mark", { opacity: 0 }, { opacity: 0.5, duration: 1.0 }, 0.8);

      gsap.to(".lgh-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[86vh] items-end overflow-hidden bg-[#080A0D] pb-20 pt-32 md:pb-24"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="lgh-image absolute inset-0 will-change-transform">
          <img
            src={IMAGE}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: "58% center" }}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/65 to-[#080A0D]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/90 via-[#080A0D]/40 to-transparent" />

        <div className="lgh-mark pointer-events-none absolute right-[10%] top-1/2 hidden -translate-y-1/2 text-right opacity-0 lg:block xl:right-[14%]">
          <span className="block font-[Cormorant_Garamond] text-[15px] font-medium tracking-[0.5em] text-[#F5F2EA]/50">
            SKYLINE
          </span>
          <span className="mt-1 block font-[Inter] text-[9px] font-semibold tracking-[0.45em] text-[#F5F2EA]/35">
            HOLDING
          </span>
        </div>
      </div>

      <div className="lgh-side pointer-events-none absolute right-10 top-32 z-[4] hidden flex-col items-end gap-1.5 lg:flex xl:right-16">
        {sideCopy.map((w) => (
          <span key={w} className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="lgh-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="lgh-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            LEGAL &amp; COMPANY INFORMATION
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(48px,5.5vw,72px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="lgh-heading-line inline-block">Transparency</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="lgh-heading-line inline-block">
                builds <em className="italic text-[#D8BD82]">trust.</em>
              </span>
            </span>
          </h1>
          <p className="lgh-copy mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/75 md:text-[18px]">
            Our company information, legal details and key corporate
            documentation are presented here to provide clarity and
            confidence in our operations.
          </p>
        </div>
      </div>
    </section>
  );
}
