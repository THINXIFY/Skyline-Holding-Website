import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE = "/images/slide-2.webp";

const themes = [
  "Long-Term Perspective",
  "Disciplined Capital",
  "Strategic Partnerships",
  "A Brighter Tomorrow",
];

export function StrategyFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".sf-eyebrow", ".sf-heading-line", ".sf-copy", ".sf-cta", ".sf-theme", ".sf-quote", ".sf-image"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".sf-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      tl.fromTo(".sf-image", { scale: 1.05 }, { scale: 1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".sf-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left" }, 0.15)
        .fromTo(".sf-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".sf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".sf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo(".sf-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.9)
        .fromTo(
          ".sf-theme",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          1.1,
        )
        .fromTo(".sf-quote", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.35);

      if (window.innerWidth >= 1024) {
        gsap.to(".sf-image", {
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
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#080A0D] py-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="sf-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/85 via-[#080A0D]/40 to-[#080A0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-[#080A0D]/30" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <p className="sf-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="sf-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            GET IN TOUCH
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(42px,5vw,64px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="sf-heading-line inline-block">Let&rsquo;s build</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="sf-heading-line inline-block">
                what&rsquo;s <em className="italic text-[#D8BD82]">next.</em>
              </span>
            </span>
          </h2>
          <p className="sf-copy mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
            We welcome the opportunity to discuss investment opportunities,
            strategic partnerships and how Skyline Holding can create
            long-term value together.
          </p>
          <div className="sf-cta mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href="#approach"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70"
            >
              Explore Our Approach
            </a>
          </div>

          <div className="mt-11 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-7">
            {themes.map((theme) => (
              <span
                key={theme}
                className="sf-theme font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9DA5AE]"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sf-quote border-l border-[#D8BD82]/40 pl-6">
            <p className="font-[Cormorant_Garamond] text-[23px] italic leading-[1.35] text-[#F5F2EA]/85 md:text-[26px]">
              &ldquo;Enduring value is built through perspective, discipline
              and people.&rdquo;
            </p>
            <p className="mt-4 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
              Skyline Holding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
