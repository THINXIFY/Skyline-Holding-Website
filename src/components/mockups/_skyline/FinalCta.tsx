import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2200&auto=format&fit=crop";

export function FinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".fc-eyebrow", ".fc-heading-line", ".fc-copy", ".fc-cta"], { opacity: 1, y: 0 });
        gsap.set(".fc-image", { scale: 1 });
        gsap.set(".fc-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      tl.fromTo(".fc-image", { scale: 1.06 }, { scale: 1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".fc-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.0, transformOrigin: "left" }, 0.15)
        .fromTo(".fc-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".fc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".fc-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
        .fromTo(".fc-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.95);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#080A0D] py-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src={IMAGE}
          alt=""
          className="fc-image size-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#080A0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/40 to-[#080A0D]/50" />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px] px-6 text-center md:px-10">
        <span className="fc-rule mx-auto block h-px w-16 bg-[#C7A86B]" aria-hidden />
        <p className="fc-eyebrow mt-7 font-[Manrope] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
          LOOKING AHEAD
        </p>
        <h2 className="mx-auto mt-6 max-w-[820px] font-[Cormorant_Garamond] text-[clamp(40px,5.5vw,68px)] font-semibold leading-[1.0] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="fc-heading-line inline-block">Building what endures</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="fc-heading-line inline-block">
              starts with <em className="italic text-[#D8BD82]">perspective.</em>
            </span>
          </span>
        </h2>
        <p className="fc-copy mx-auto mt-7 max-w-[56ch] font-[Manrope] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
          Whether exploring an investment, strategic partnership or
          long-term capital relationship, Skyline welcomes conversations
          built around shared ambition and enduring value.
        </p>
        <div className="fc-cta mt-9 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#investor-relations"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Manrope] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Start a Conversation
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden
            />
          </a>
          <a
            href="#investment-focus"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Manrope] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70"
          >
            Explore Investment Strategy
          </a>
        </div>
      </div>
    </section>
  );
}
