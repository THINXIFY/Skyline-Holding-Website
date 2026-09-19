import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1800&auto=format&fit=crop";

const labels = ["DISCIPLINED OVERSIGHT", "RESPONSIBLE GROWTH", "LASTING CONFIDENCE"];

export function GovernanceQuoteBand() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".gq-line", ".gq-label"], { opacity: 1, y: 0 });
        gsap.set(".gq-rule", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(
        ".gq-rule",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, transformOrigin: "top" },
      )
        .fromTo(
          ".gq-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.2,
        )
        .fromTo(
          ".gq-label",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.7,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".gq-image", { scale: 1.1 });
        gsap.to(".gq-image", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-28 md:py-36">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="gq-image size-full object-cover opacity-[0.16]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#080A0D]/85 to-[#080A0D]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <span className="gq-rule mx-auto block h-16 w-px bg-[#C7A86B]/60" aria-hidden />
        <blockquote className="mx-auto mt-8 max-w-[820px] font-[Cormorant_Garamond] text-[clamp(28px,3.6vw,46px)] font-semibold italic leading-[1.15] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="gq-line inline-block">&ldquo;Strong governance is not a requirement,</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="gq-line inline-block">
              it is a <em className="text-[#D8BD82]">responsibility.&rdquo;</em>
            </span>
          </span>
        </blockquote>
        <p className="gq-line mt-6 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.16em] text-[#9DA5AE]">
          Skyline Holding
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {labels.map((label) => (
            <span
              key={label}
              className="gq-label font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
