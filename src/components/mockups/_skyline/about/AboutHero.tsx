import { useEffect, useRef, useState } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE = "/images/slide-2.webp";

export function AboutHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ah-eyebrow", ".ah-heading-line", ".ah-support"], { opacity: 1, y: 0 });
        gsap.set(".ah-rule", { scaleX: 1 });
        gsap.set(".ah-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".ah-image", { scale: 1.08 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".ah-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.4,
        )
        .fromTo(".ah-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
        .fromTo(
          ".ah-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.6,
        )
        .fromTo(".ah-support", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 1.05);

      gsap.to(".ah-image", {
        yPercent: 10,
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
      className="relative flex min-h-[78vh] items-end overflow-hidden bg-[#080A0D] pb-16 pt-32 md:min-h-[82vh] md:pb-20"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="ah-image absolute inset-0 will-change-transform">
          <img src={IMAGE} alt="" className="size-full object-cover" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/55 to-[#080A0D]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/60 via-transparent to-[#080A0D]/20" />
      </div>

      <HeroParticles reduceMotion={reduceMotion} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-6 md:px-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[720px]">
          <p className="ah-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="ah-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            ABOUT SKYLINE
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(42px,5.5vw,68px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="ah-heading-line inline-block">A broader perspective for</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="ah-heading-line inline-block">
                a <em className="italic text-[#D8BD82]">brighter tomorrow.</em>
              </span>
            </span>
          </h1>
        </div>

        <p className="ah-support shrink-0 font-[Inter] text-[11px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA]/60 lg:max-w-[220px] lg:text-right">
          People / Capital / Ideas / A Brighter Tomorrow
        </p>
      </div>
    </section>
  );
}
