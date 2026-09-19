import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, GitBranch, Puzzle, RefreshCw } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Distressed Assets", body: "Opportunity through complexity.", icon: Puzzle },
  { title: "Turnaround Opportunities", body: "Supporting operational improvement.", icon: RefreshCw },
  { title: "Corporate Transitions", body: "Guiding businesses through change.", icon: GitBranch },
  { title: "Undervalued Assets", body: "Identifying hidden potential.", icon: BarChart3 },
];

export function SpecialSituationsSector() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ss-eyebrow", ".ss-heading-line", ".ss-copy", ".ss-focus", ".ss-cta", ".ss-image", ".ss-label"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(
        ".ss-image",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE.expo },
      )
        .fromTo(".ss-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.25)
        .fromTo(
          ".ss-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.35,
        )
        .fromTo(".ss-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .fromTo(
          ".ss-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.75,
        )
        .fromTo(".ss-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 1.1)
        .fromTo(".ss-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.55);

      if (window.innerWidth >= 1024) {
        gsap.set(".ss-image img", { scale: 1.15 });
        gsap.to(".ss-image img", {
          scale: 1.05,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="ss-image relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1017] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img
                src={IMAGE}
                alt="A dramatic snow-capped mountain peak rising above a golden autumn valley"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/80 via-[#080A0D]/15 to-[#080A0D]/25" />

              <div className="pointer-events-none absolute bottom-6 left-6 flex flex-col gap-1">
                {["COMPLEXITY", "CREATES", "OPPORTUNITY"].map((label) => (
                  <span
                    key={label}
                    className="ss-label font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/85"
                  >
                    {label}
                  </span>
                ))}
                <span className="ss-label mt-1 h-px w-8 bg-[#D8BD82]" aria-hidden />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="ss-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              SECTOR FOCUS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ss-heading-line inline-block">Special</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ss-heading-line inline-block text-[#D8BD82]">Situations</span>
              </span>
            </h2>
            <p className="ss-copy mt-7 max-w-[50ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              We consider special situations where complexity, transition or
              market dislocation can create compelling opportunities. With a
              disciplined approach and experienced perspective, we seek to
              unlock value in situations that require specialized expertise
              and active involvement.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="ss-focus group">
                  <area.icon
                    className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={20}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="relative mt-3 block font-[Inter] text-[13.5px] font-semibold text-[#F5F2EA]">
                    {area.title}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D8BD82] transition-all duration-400 group-hover:w-full" />
                  </span>
                  <span className="mt-1.5 block font-[Inter] text-[12px] leading-[1.4] text-[#9DA5AE]">
                    {area.body}
                  </span>
                </div>
              ))}
            </div>

            <div className="ss-cta mt-9 flex flex-wrap items-center gap-7">
              <a
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore This Sector
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href="/about"
                className="inline-flex min-h-11 items-center border-b border-white/20 pb-0.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/70 transition-colors hover:border-[#D8BD82] hover:text-[#D8BD82]"
              >
                Our Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
