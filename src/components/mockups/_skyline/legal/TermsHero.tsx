import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const sideCopy = ["GOVERNANCE", "ACCEPTABLE USE", "RESPONSIBILITY"];

export function TermsHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".th-eyebrow", ".th-heading-line", ".th-copy", ".th-side"], { opacity: 1, y: 0 });
        gsap.set(".th-rule", { scaleX: 1 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: EASE.out3 } })
        .fromTo(".th-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.1)
        .fromTo(".th-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15)
        .fromTo(
          ".th-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.8, stagger: 0.1 },
          0.25,
        )
        .fromTo(".th-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .fromTo(".th-side", { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, 0.45);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden bg-[#080A0D] pb-16 pt-40 md:pb-20 md:pt-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F2EA 1px, transparent 1px), linear-gradient(90deg, #F5F2EA 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/60" />

      <div className="th-side pointer-events-none absolute right-10 top-1/2 z-[4] hidden -translate-y-1/2 flex-col items-end gap-1.5 lg:flex xl:right-16">
        {sideCopy.map((w) => (
          <span key={w} className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/60">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="th-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="th-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            TERMS &amp; CONDITIONS
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4.4vw,54px)] font-semibold leading-[1.05] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="th-heading-line inline-block">Clear terms.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="th-heading-line inline-block">Responsible use.</span>
            </span>
          </h1>
          <p className="th-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.6] text-[#F5F2EA]/65">
            These Terms &amp; Conditions govern access to and use of the
            Skyline Holding website and the information made available
            through it.
          </p>
        </div>
      </div>
    </section>
  );
}
