import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "./gsap";
import { capabilities } from "./data";

export function BeyondCapital() {
  const rootRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".bc-eyebrow", ".bc-heading-line", ".bc-copy"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".bc-line", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".bc-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".bc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".bc-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, 0.4)
        .fromTo(".bc-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45);

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE.out3,
            scrollTrigger: { trigger: row, start: "top 88%" },
          },
        );

        createRowScrollSpy(row, i, setActiveIndex);
      });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="strategic-advisory"
      ref={rootRef}
      className="relative bg-[#0B1624] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:h-fit xl:col-span-4">
            <p className="bc-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.32em] text-[#D8BD82]">
              BEYOND CAPITAL
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.4vw,60px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="bc-heading-line inline-block">
                  More than capital.
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="bc-heading-line inline-block">
                  A platform for <em className="italic text-[#D8BD82]">value creation.</em>
                </span>
              </span>
            </h2>
            <span className="bc-line mt-8 block h-px w-16 origin-left scale-x-0 bg-[#C7A86B]" />
            <p className="bc-copy mt-8 max-w-[46ch] font-[Manrope] text-[16.5px] leading-[1.55] text-[#F5F2EA]/70 md:text-[18px]">
              Skyline combines capital, strategy, technology, relationships
              and execution to help businesses strengthen their foundations
              and create durable long-term value.
            </p>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            {capabilities.map((capability, i) => {
              const active = i === activeIndex;
              return (
                <div
                  key={capability.title}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className="flex gap-6 border-t border-white/10 py-7 first:border-t-0 first:pt-0 md:gap-10 md:py-9"
                >
                  {/* Below lg there is no scroll-spy (see createRowScrollSpy), so every
                      row must default to full contrast there; dimming is lg-only. */}
                  <span
                    className={`mt-2 h-12 w-px shrink-0 bg-white/15 transition-colors duration-500 md:h-14 ${
                      active ? "lg:bg-[#C7A86B]" : ""
                    }`}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
                    <h3
                      className={`font-[Cormorant_Garamond] text-[29px] font-semibold leading-[1.08] text-[#F8F7F3] transition-colors duration-500 md:w-[220px] md:text-[34px] ${
                        active ? "" : "lg:text-[#F8F7F3]/35"
                      }`}
                    >
                      {capability.title}
                    </h3>
                    <p
                      className={`max-w-[46ch] font-[Manrope] text-[15px] leading-[1.5] text-[#F5F2EA]/75 transition-colors duration-500 md:text-[16px] ${
                        active ? "" : "lg:text-[#F5F2EA]/30"
                      }`}
                    >
                      {capability.body}
                    </p>
                    <ArrowRight
                      className={`hidden size-5 shrink-0 text-[#D8BD82] transition-all duration-500 lg:block ${
                        active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function createRowScrollSpy(
  row: HTMLDivElement,
  index: number,
  setActiveIndex: (i: number) => void,
) {
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    const st = ScrollTrigger.create({
      trigger: row,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) setActiveIndex(index);
      },
    });
    return () => st.kill();
  });
}
