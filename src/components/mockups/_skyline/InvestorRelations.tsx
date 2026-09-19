import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { investorTypes } from "./data";

export function InvestorRelations() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ir-eyebrow", ".ir-heading-line", ".ir-copy", ".ir-type", ".ir-panel"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".ir-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ir-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ir-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ir-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".ir-type",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.45,
        )
        .fromTo(
          ".ir-panel",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.8, ease: EASE.expo },
          0.5,
        )
        .fromTo(".ir-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left" }, 0.7);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="investor-relations" className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(199,168,107,.1), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="ir-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              INVESTOR RELATIONS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,60px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ir-heading-line inline-block">Built for aligned</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ir-heading-line inline-block text-[#D8BD82]">long-term capital.</span>
              </span>
            </h2>
            <p className="ir-copy mt-7 max-w-[42ch] font-[Manrope] text-[16px] leading-[1.5] text-[#F5F2EA]/60">
              Skyline develops trusted relationships with investors and
              strategic capital partners seeking disciplined access to
              thoughtfully selected opportunities.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="border-t border-white/10">
              {investorTypes.map((type) => (
                <a
                  key={type}
                  href="#investor-relations"
                  className="ir-type group flex min-h-[64px] items-center justify-between border-b border-white/10 font-[Cormorant_Garamond] text-[22px] font-medium text-[#F8F7F3] transition-colors hover:text-[#D8BD82]"
                >
                  {type}
                  <ArrowRight
                    className="size-4 text-[#D8BD82] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              ))}
            </div>
            <a
              href="#investor-relations"
              className="ir-type group mt-7 inline-flex min-h-11 items-center gap-2 font-[Manrope] text-[13.5px] font-semibold text-[#F5F2EA]"
            >
              Investor Relations
              <ArrowRight
                className="size-4 text-[#D8BD82] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="ir-panel relative overflow-hidden border border-[#C7A86B]/40 p-8">
              <span className="ir-rule absolute inset-x-0 top-0 h-px bg-[#D8BD82]" aria-hidden />
              <span className="font-[Manrope] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                Private Investor Access
              </span>
              <p className="mt-5 max-w-[32ch] font-[Cormorant_Garamond] text-[28px] font-semibold leading-[1.05] text-[#F8F7F3]">
                Learn how to engage with our team.
              </p>
              <p className="mt-4 max-w-[38ch] font-[Manrope] text-[14px] leading-[1.5] text-[#F5F2EA]/60">
                Learn more about Skyline&rsquo;s investment approach,
                selected opportunities and how to engage with our team.
              </p>
              <a
                href="#investor-relations"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Manrope] text-[13px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Request Investor Access
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
