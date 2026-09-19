import { useEffect, useRef, useState } from "react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "../gsap";
import { opportunityProcessSteps } from "../data";

const IMAGE = "/images/slide-3.webp";

export function OurProcess() {
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".pr-eyebrow", ".pr-heading-line", ".pr-copy", ".pr-image", ".pr-timeline"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".pr-progress", { scaleX: 1, scaleY: 1 });
        setActiveIndex(opportunityProcessSteps.length - 1);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".pr-image", { scale: 1.08 }, { scale: 1, duration: 1.6, ease: EASE.out3 }, 0)
        .fromTo(".pr-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo(
          ".pr-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.3,
        )
        .fromTo(".pr-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(".pr-timeline", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);

      gsap.set(".pr-progress", { scaleX: 0, scaleY: 0, transformOrigin: "left top" });
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(".pr-progress", { scaleX: self.progress, scaleY: self.progress });
          setActiveIndex(
            Math.min(
              opportunityProcessSteps.length - 1,
              Math.floor(self.progress * opportunityProcessSteps.length),
            ),
          );
        },
      });

      if (window.innerWidth >= 1024) {
        gsap.to(".pr-image", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="pr-image size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#080A0D]/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/50 to-[#080A0D]/60" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[640px]">
          <p className="pr-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
            OUR PROCESS
          </p>
          <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="pr-heading-line inline-block">From opportunity</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="pr-heading-line inline-block">
                to <em className="italic text-[#D8BD82]">execution.</em>
              </span>
            </span>
          </h2>
          <p className="pr-copy mt-6 max-w-[54ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65">
            A disciplined and collaborative process designed to create
            long-term value.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div ref={timelineRef} className="pr-timeline mt-16 hidden md:mt-20 lg:block">
          <div className="relative h-px w-full bg-white/12">
            <span className="pr-progress absolute inset-y-0 left-0 block h-full w-full origin-left bg-[#C7A86B]" />
          </div>
          <div className="mt-0 grid grid-cols-5 gap-x-6">
            {opportunityProcessSteps.map((step, index) => {
              const isActive = index <= activeIndex;
              return (
                <div key={step.number} className="relative pt-7">
                  <span
                    className={`absolute -top-[13px] left-0 flex size-[26px] items-center justify-center rounded-full border font-[Inter] text-[10px] font-semibold transition-colors duration-400 ${
                      isActive
                        ? "border-[#C7A86B] bg-[#C7A86B] text-[#12161B]"
                        : "border-white/20 bg-[#080A0D] text-[#9DA5AE]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={`font-[Cormorant_Garamond] text-[21px] font-semibold uppercase leading-[1.1] transition-colors duration-400 ${
                      isActive ? "text-[#F8F7F3]" : "text-[#F5F2EA]/30"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[22ch] font-[Inter] text-[12.5px] leading-[1.5] transition-colors duration-400 ${
                      isActive ? "text-[#9DA5AE]" : "text-[#9DA5AE]/30"
                    }`}
                  >
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="mt-14 space-y-0 lg:hidden">
          {opportunityProcessSteps.map((step, index) => (
            <div key={step.number} className="relative flex gap-5 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full border border-[#C7A86B] bg-[#C7A86B]/10 font-[Inter] text-[11px] font-semibold text-[#D8BD82]">
                  {step.number}
                </span>
                {index < opportunityProcessSteps.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-white/15" aria-hidden />
                )}
              </div>
              <div className="pb-2">
                <h3 className="font-[Cormorant_Garamond] text-[21px] font-semibold uppercase leading-[1.1] text-[#F8F7F3]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[34ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#9DA5AE]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
