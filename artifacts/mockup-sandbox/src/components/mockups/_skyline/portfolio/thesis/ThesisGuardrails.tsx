import { useLayoutEffect, useRef } from "react";
import { Ban, FileCheck, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../../gsap";
import { GUARDRAILS as G } from "./thesisDataLower";
import { useThesisReveal } from "./useThesisReveal";

const ICONS: Record<(typeof G.items)[number]["icon"], LucideIcon> = {
  binary: Ban,
  leverage: Scale,
  review: FileCheck,
  pathway: ShieldCheck,
};

export function ThesisGuardrails() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  useThesisReveal(rootRef);

  // Short, staggered entrance: icon settles in, divider grows, content fades up. Plays once.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".gr-item", grid);
      const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 85%", once: true } });
      items.forEach((item, i) => {
        const at = i * 0.12;
        tl.fromTo(item.querySelector(".gr-icon"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: EASE.out3 }, at)
          .fromTo(item.querySelector(".gr-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: EASE.out3, transformOrigin: "top center" }, at)
          .fromTo(item.querySelector(".gr-body"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE.out3 }, at + 0.08);
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="guardrails"
      aria-labelledby="guardrails-heading"
      className="relative bg-[#F8F7F3] pb-24 md:pb-32"
    >
      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        {/* A slightly deeper warm panel, visually attached to the Process above it. */}
        <div data-rv className="border border-[#0B1017]/8 bg-[#EFEBE1] px-6 py-12 sm:px-10 md:py-14 lg:px-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8F7035] sm:text-[12px]">{G.eyebrow}</p>
          <h2
            id="guardrails-heading"
            className="mt-5 font-['Cormorant_Garamond',serif] text-[clamp(2.2rem,1.5rem+2.6vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.01em] text-[#0B1017]"
          >
            {G.headingLead} <em className="text-[#A9873F]">{G.headingEmphasis}</em>
          </h2>

          <ul ref={gridRef} className="mt-10 grid gap-x-0 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {G.items.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <li key={item.title} className="gr-item relative flex gap-0">
                  <span
                    aria-hidden
                    className={`gr-rule absolute bottom-0 left-0 top-0 w-px bg-[#0B1017]/15 ${i === 0 ? "hidden" : i === 2 ? "hidden lg:block" : "hidden sm:block"}`}
                  />
                  <div className={`flex-1 ${i === 0 ? "" : "lg:pl-8"} ${i % 2 === 1 ? "sm:pl-8" : ""} ${i < 3 ? "lg:pr-6" : ""}`}>
                    <span className="gr-icon flex h-10 w-10 items-center justify-center rounded-full border border-[#A9873F]/70 text-[#8F7035]">
                      <Icon size={17} strokeWidth={1.3} aria-hidden />
                    </span>
                    <div className="gr-body">
                      <h3 className="mt-5 max-w-[240px] font-['Cormorant_Garamond',serif] text-[21px] font-medium leading-[1.25] text-[#0B1017]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[260px] text-[13.5px] leading-[1.7] text-[#3C444D]">{item.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
