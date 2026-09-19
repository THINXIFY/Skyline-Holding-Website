import { useEffect, useRef } from "react";
import { ArrowRight, Gem, Globe2, Handshake, Wrench } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { whySkylineDifferentiators } from "../data";

const icons = [Globe2, Gem, Wrench, Handshake];

export function WhySkyline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ws-eyebrow", ".ws-heading-line", ".ws-copy", ".ws-cta", ".ws-diff", ".ws-quote"],
          { opacity: 1, y: 0 },
        );
        gsap.set([".ws-divider-h", ".ws-divider-v"], { scaleX: 1, scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ws-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ws-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ws-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".ws-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(
          ".ws-diff",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          0.5,
        )
        .fromTo(
          [".ws-divider-h", ".ws-divider-v"],
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.6 },
          0.6,
        )
        .fromTo(".ws-quote", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-skyline" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="ws-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              WHY SKYLINE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ws-heading-line inline-block">A trusted partner</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ws-heading-line inline-block">
                  for <em className="not-italic text-[#C7A86B]">what&rsquo;s next.</em>
                </span>
              </span>
            </h2>
            <p className="ws-copy mt-6 max-w-[42ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              We bring together strategic insight, global perspective and
              execution capability to help clients navigate change and
              build stronger, more resilient businesses.
            </p>
            <a
              href="/about"
              className="ws-cta group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              Our Difference
              <ArrowRight
                className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="relative grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <span
                className="ws-divider-v absolute left-1/2 top-0 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                aria-hidden
              />
              <span
                className="ws-divider-h absolute left-0 top-1/2 hidden h-px w-full origin-left bg-[#12161B]/10 sm:block"
                aria-hidden
              />
              {whySkylineDifferentiators.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div key={item.title} className="ws-diff pr-4">
                    <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.4} aria-hidden />
                    <h3 className="mt-4 font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[28ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#12161B]/60">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="ws-quote h-full border-l border-[#C7A86B]/40 bg-[#F8F7F3] p-8 md:p-10">
              <span className="block h-px w-8 bg-[#C7A86B]" aria-hidden />
              <p className="mt-6 font-[Cormorant_Garamond] text-[26px] italic leading-[1.3] text-[#12161B] md:text-[28px]">
                &ldquo;Strategy is not just about the next step, but a
                better future.&rdquo;
              </p>
              <p className="mt-6 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#C7A86B]">
                Skyline Holding
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
