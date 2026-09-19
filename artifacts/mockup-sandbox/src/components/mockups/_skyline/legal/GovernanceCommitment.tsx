import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1800&auto=format&fit=crop";

export function GovernanceCommitment() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".gc-eyebrow", ".gc-heading-line", ".gc-copy", ".gc-cta", ".gc-quote", ".gc-notice"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".gc-image", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".gc-image", { opacity: 0 }, { opacity: 1, duration: 1.2 })
        .fromTo(".gc-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".gc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.35,
        )
        .fromTo(".gc-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .fromTo(".gc-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.75)
        .fromTo(".gc-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7);

      gsap.fromTo(
        ".gc-notice",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: ".gc-notice", start: "top 90%" },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="gc-image size-full object-cover opacity-[0.14]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1017] via-[#0B1017]/92 to-[#0B1017]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p className="gc-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              OUR COMMITMENT
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="gc-heading-line inline-block">
                  Operating with <em className="italic text-[#D8BD82]">integrity.</em>
                </span>
              </span>
            </h2>
            <p className="gc-copy mt-7 max-w-[56ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              We are committed to responsible governance, transparency and
              thoughtful long-term decision-making across our activities
              and relationships.
            </p>
            <div className="gc-cta mt-8">
              <a
                href="/governance"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore Governance
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative pl-8">
              <span className="absolute left-0 top-1 h-full w-px bg-[#C7A86B]/40" aria-hidden />
              <p className="gc-quote font-[Cormorant_Garamond] text-[24px] italic leading-[1.35] text-[#F5F2EA] md:text-[27px]">
                &ldquo;Trust is the foundation of long-term
                partnerships.&rdquo;
              </p>
              <p className="gc-quote mt-5 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                Skyline Holding
              </p>
            </div>
          </div>
        </div>

        <p className="gc-notice mt-24 max-w-[820px] border-t border-white/10 pt-8 font-[Inter] text-[12.5px] leading-[1.6] text-[#9DA5AE]/80">
          The information presented on this website is provided for
          general corporate and informational purposes. Specific
          investment, financial, legal or regulatory matters should be
          considered in the context of the relevant documentation and
          applicable professional advice.
        </p>
      </div>
    </section>
  );
}
