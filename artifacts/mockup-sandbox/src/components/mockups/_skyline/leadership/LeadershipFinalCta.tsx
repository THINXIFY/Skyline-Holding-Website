import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1800&auto=format&fit=crop";

export function LeadershipFinalCta() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".lf-eyebrow", ".lf-heading-line", ".lf-copy", ".lf-cta", ".lf-quote", ".lf-rule-v"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".lf-image", { opacity: 1 });
        gsap.set(".lf-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".lf-image", { opacity: 0 }, { opacity: 1, duration: 1.2 })
        .fromTo(".lf-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.9, transformOrigin: "left" }, 0.2)
        .fromTo(".lf-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".lf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.5,
        )
        .fromTo(".lf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
        .fromTo(".lf-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.95)
        .fromTo(".lf-rule-v", { scaleY: 0 }, { scaleY: 1, duration: 0.7, transformOrigin: "top" }, 0.7)
        .fromTo(".lf-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 1.05);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="lf-image size-full object-cover opacity-[0.14]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#080A0D]/92 to-[#080A0D]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <span className="lf-rule block h-px w-16 bg-[#C7A86B]" aria-hidden />
            <p className="lf-eyebrow mt-7 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              LET&rsquo;S BUILD THE FUTURE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(38px,5vw,58px)] font-semibold leading-[0.98] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="lf-heading-line inline-block">
                  Ideas. People. <em className="italic text-[#D8BD82]">Possibilities.</em>
                </span>
              </span>
            </h2>
            <p className="lf-copy mt-7 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/70 md:text-[17px]">
              We are always open to connecting with exceptional people who
              share our vision and values.
            </p>
            <div className="lf-cta mt-9">
              <a
                href="/contact"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join the Conversation
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
              <span
                className="lf-rule-v absolute left-0 top-1 h-full w-px origin-top bg-[#C7A86B]/40"
                aria-hidden
              />
              <p className="lf-quote font-[Cormorant_Garamond] text-[26px] italic leading-[1.35] text-[#F5F2EA] md:text-[30px]">
                &ldquo;The right people can turn ambition into
                extraordinary outcomes.&rdquo;
              </p>
              <p className="lf-quote mt-5 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                Skyline Holding
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
