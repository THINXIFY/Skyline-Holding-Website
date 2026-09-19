import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1800&auto=format&fit=crop";

export function ServicesFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".sc-eyebrow", ".sc-heading-line", ".sc-copy", ".sc-cta"], { opacity: 1, y: 0 });
        gsap.set(".sc-image", { scale: 1 });
        gsap.set(".sc-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      tl.fromTo(".sc-image", { scale: 1.05 }, { scale: 1, duration: 1.8, ease: EASE.out3 }, 0)
        .fromTo(".sc-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left" }, 0.15)
        .fromTo(".sc-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".sc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.45,
        )
        .fromTo(".sc-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        .fromTo(".sc-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.9);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#080A0D] py-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="sc-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/90 via-[#080A0D]/45 to-[#080A0D]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/40" />
      </div>

      <div className="relative mx-auto w-full max-w-[1000px] px-6 md:px-10">
        <span className="sc-rule block h-px w-16 bg-[#C7A86B]" aria-hidden />
        <p className="sc-eyebrow mt-7 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
          LET&rsquo;S BUILD TOGETHER
        </p>
        <h2 className="mt-6 max-w-[640px] font-[Cormorant_Garamond] text-[clamp(38px,5vw,58px)] font-semibold leading-[0.98] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="sc-heading-line inline-block">A longer perspective</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="sc-heading-line inline-block">
              for a <em className="italic text-[#D8BD82]">brighter tomorrow.</em>
            </span>
          </span>
        </h2>
        <p className="sc-copy mt-7 max-w-[54ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
          We welcome the opportunity to discuss how our management services
          can support your goals, strengthen your capital strategy and
          create long-term value.
        </p>
        <div className="sc-cta mt-9 flex flex-wrap items-center gap-4">
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
            href="/investment-strategy"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70"
          >
            Explore Investment Strategy
          </a>
        </div>
      </div>
    </section>
  );
}
