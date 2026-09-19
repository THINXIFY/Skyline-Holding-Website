import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

export function PrivacyHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ph-eyebrow", ".ph-heading", ".ph-copy"], { opacity: 1, y: 0 });
        gsap.set(".ph-rule", { scaleX: 1 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: EASE.out3 } })
        .fromTo(".ph-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.1)
        .fromTo(".ph-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15)
        .fromTo(".ph-heading", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
        .fromTo(".ph-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative bg-[#F5F2EA] pb-16 pt-40 md:pb-20 md:pt-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="ph-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
            <span className="ph-rule h-px w-8 bg-[#C7A86B]" aria-hidden />
            PRIVACY POLICY
          </p>
          <h1 className="ph-heading mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4.4vw,54px)] font-semibold leading-[1.05] text-[#12161B]">
            Your privacy matters.
          </h1>
          <p className="ph-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.6] text-[#12161B]/65">
            This Privacy Policy explains how Skyline Holding, SLU may
            collect, use and protect information when you visit our
            website or contact us.
          </p>
        </div>
      </div>
    </section>
  );
}
