import { useEffect, useRef } from "react";
import { Factory, Landmark, Layers, Lightbulb } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { sectorPhilosophyThemes } from "../data";

const icons = [Landmark, Lightbulb, Factory, Layers];

export function SectorPhilosophy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".sp-eyebrow", ".sp-heading-line", ".sp-copy", ".sp-item"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".sp-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".sp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".sp-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".sp-item",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.5,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="sp-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR SECTOR PHILOSOPHY
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="sp-heading-line inline-block">Diversified by sector.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="sp-heading-line inline-block">
                  Disciplined by <em className="not-italic text-[#C7A86B]">strategy.</em>
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-[52ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              We do not pursue sectors simply because they are
              fashionable. We focus on industries where long-term
              demand, strong fundamentals and meaningful transformation
              can support enduring value.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {sectorPhilosophyThemes.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={item.title}
                    className="sp-item border-t border-[#12161B]/10 py-6 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(n+3)]:border-t"
                  >
                    <Icon className="text-[#C7A86B]" size={20} strokeWidth={1.3} aria-hidden />
                    <h3 className="mt-4 font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 font-[Inter] text-[13px] leading-[1.5] text-[#12161B]/60">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
