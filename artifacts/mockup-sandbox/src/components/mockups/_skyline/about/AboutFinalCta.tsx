import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE = "/images/slide-3.webp";

export function AboutFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".afc-eyebrow", ".afc-heading-line", ".afc-copy", ".afc-cta"], { opacity: 1, y: 0 });
        gsap.set(".afc-image", { scale: 1 });
        gsap.set(".afc-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      gsap.set(".afc-image", { scale: 1.1 });
      tl.fromTo(".afc-image", { scale: 1.16 }, { scale: 1.1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".afc-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.0, transformOrigin: "left" }, 0.15)
        .fromTo(".afc-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".afc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".afc-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo(".afc-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.9);

      if (window.innerWidth >= 1024) {
        gsap.to(".afc-image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#080A0D] py-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="afc-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/40 to-[#080A0D]/50" />
      </div>

      <div className="relative mx-auto w-full max-w-[1000px] px-6 text-center md:px-10">
        <span className="afc-rule mx-auto block h-px w-16 bg-[#C7A86B]" aria-hidden />
        <p className="afc-eyebrow mt-7 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
          LOOKING AHEAD
        </p>
        <h2 className="mx-auto mt-6 max-w-[720px] font-[Cormorant_Garamond] text-[clamp(38px,5vw,58px)] font-semibold leading-[0.98] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="afc-heading-line inline-block">Building lasting value</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="afc-heading-line inline-block">
              starts with <em className="italic text-[#D8BD82]">perspective.</em>
            </span>
          </span>
        </h2>
        <p className="afc-copy mx-auto mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
          Explore how Skyline invests, partners and creates long-term value
          across markets and industries.
        </p>
        <div className="afc-cta mt-9 flex flex-wrap items-center justify-center gap-5">
          <a
            href="/#investment-focus"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Investment Strategy
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
          <a
            href="/contact"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
