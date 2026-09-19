import { useEffect, useRef, useState } from "react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "../gsap";
import { advisoryProcessSteps } from "../data";

const IMAGE = "/images/slide-3.webp";

export function AdvisoryProcess() {
  const rootRef = useRef<HTMLElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ap-eyebrow", ".ap-heading-line", ".ap-copy", ".ap-image", ".ap-stepper"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        gsap.set(".ap-progress", { scaleX: 1 });
        setActiveIndex(advisoryProcessSteps.length - 1);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ap-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ap-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ap-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".ap-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.3,
        )
        .fromTo(".ap-stepper", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

      gsap.set(".ap-progress", { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.create({
        trigger: stepperRef.current,
        start: "top 72%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(".ap-progress", { scaleX: self.progress });
          setActiveIndex(
            Math.min(advisoryProcessSteps.length - 1, Math.floor(self.progress * advisoryProcessSteps.length)),
          );
        },
      });

      if (window.innerWidth >= 1024) {
        gsap.set(".ap-image img", { scale: 1.12 });
        gsap.to(".ap-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="advisory-process" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="ap-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              A DISCIPLINED PROCESS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ap-heading-line inline-block">From insight</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ap-heading-line inline-block text-[#D8BD82]">to impact.</span>
              </span>
            </h2>
            <p className="ap-copy mt-6 max-w-[46ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              Our advisory process is collaborative, practical and
              outcome-focused, helping clients turn complex challenges into
              meaningful opportunities.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="ap-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#080A0D] sm:aspect-[16/10]">
              <img
                src={IMAGE}
                alt="A private residence interior overlooking mountains and a lake at dusk"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-5 right-5 text-right">
                {["COMPLEX", "CHALLENGES.", "REAL SOLUTIONS."].map((label) => (
                  <span
                    key={label}
                    className="block font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/80"
                  >
                    {label}
                  </span>
                ))}
                <span className="ml-auto mt-1 block h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        <div ref={stepperRef} className="ap-stepper mt-16 md:mt-20">
          <div className="relative h-px w-full bg-white/10">
            <span className="ap-progress absolute inset-y-0 left-0 block h-full w-full origin-left bg-[#C7A86B]" />
          </div>

          <div className="mt-0 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {advisoryProcessSteps.map((step, index) => {
              const isActive = index <= activeIndex;
              return (
                <div key={step.number} className="relative pt-7">
                  <span
                    className={`absolute -top-[13px] left-0 flex size-[26px] items-center justify-center rounded-full border font-[Inter] text-[10px] font-semibold transition-colors duration-400 ${
                      isActive
                        ? "border-[#C7A86B] bg-[#C7A86B] text-[#12161B]"
                        : "border-white/20 bg-[#0B1017] text-[#9DA5AE]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={`font-[Cormorant_Garamond] text-[22px] font-semibold uppercase leading-[1.1] transition-colors duration-400 ${
                      isActive ? "text-[#F8F7F3]" : "text-[#F5F2EA]/30"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[26ch] font-[Inter] text-[13px] leading-[1.5] transition-colors duration-400 ${
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
      </div>
    </section>
  );
}
