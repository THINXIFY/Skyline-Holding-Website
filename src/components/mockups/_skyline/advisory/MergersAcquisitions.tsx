import { useEffect, useRef } from "react";
import { ArrowRight, FileSearch, Puzzle, Search, Workflow } from "lucide-react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "../gsap";

const IMAGE =
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1400&auto=format&fit=crop";

const focusAreas = [
  { title: "Opportunity Assessment", icon: Search },
  { title: "Transaction Strategy", icon: Workflow },
  { title: "Due Diligence Support", icon: FileSearch },
  { title: "Integration Planning", icon: Puzzle },
];

const pathway = [
  { label: "Identify", body: "Sourcing and assessing relevant opportunities." },
  { label: "Evaluate", body: "Rigorous analysis of strategic and financial fit." },
  { label: "Structure", body: "Thoughtful transaction design and terms." },
  { label: "Execute", body: "Disciplined negotiation and closing." },
  { label: "Integrate", body: "Realizing value after the transaction." },
];

export function MergersAcquisitions() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ma-eyebrow", ".ma-heading-line", ".ma-copy", ".ma-focus", ".ma-cta", ".ma-step"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".ma-line", { scaleY: 1 });
        gsap.set(".ma-dot", { backgroundColor: "#C7A86B", borderColor: "#C7A86B" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".ma-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ma-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".ma-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".ma-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".ma-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(
          ".ma-step",
          { opacity: 0, x: 14 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.12 },
          0.4,
        );

      gsap.set(".ma-line", { scaleY: 0, transformOrigin: "top" });
      gsap.to(".ma-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".ma-pathway", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
      });

      const steps = gsap.utils.toArray<HTMLElement>(".ma-step", rootRef.current);
      steps.forEach((step) => {
        const dot = step.querySelector(".ma-dot");
        const label = step.querySelector(".ma-label");
        const body = step.querySelector(".ma-body");
        gsap.set([label, body], { opacity: 0.5 });

        ScrollTrigger.create({
          trigger: step,
          start: "top 72%",
          end: "bottom 58%",
          onEnter: () => {
            gsap.to(label, { opacity: 1, duration: 0.4 });
            gsap.to(body, { opacity: 0.8, duration: 0.4 });
            gsap.to(dot, { backgroundColor: "#C7A86B", borderColor: "#C7A86B", scale: 1.15, duration: 0.35 });
          },
          onLeaveBack: () => {
            gsap.to(label, { opacity: 0.5, duration: 0.35 });
            gsap.to(body, { opacity: 0.5, duration: 0.35 });
            gsap.to(dot, { backgroundColor: "#0B1017", borderColor: "#C7A86B", scale: 1, duration: 0.35 });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="mergers-acquisitions" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="ma-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              MERGERS &amp; ACQUISITIONS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="ma-heading-line inline-block">Strategic transactions.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ma-heading-line inline-block text-[#D8BD82]">Stronger outcomes.</span>
              </span>
            </h2>
            <p className="ma-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              We support clients through acquisitions, divestitures and
              strategic transactions with disciplined analysis, thoughtful
              structuring and a clear focus on long-term value.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="flex items-center gap-3">
                  <area.icon className="text-[#D8BD82]" size={19} strokeWidth={1.4} aria-hidden />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/85">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="ma-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore M&amp;A Advisory
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] p-8 md:p-10">
              <img
                src={IMAGE}
                alt=""
                className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.14]"
                loading="lazy"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#080A0D]/85 to-[#080A0D]" />

              <div className="ma-pathway relative pl-8">
                <span
                  className="ma-line absolute left-0 top-1 h-full w-px bg-gradient-to-b from-[#C7A86B] via-[#C7A86B]/60 to-transparent"
                  aria-hidden
                />
                <div className="flex flex-col gap-8">
                  {pathway.map((step) => (
                    <div key={step.label} className="ma-step relative">
                      <span
                        className="ma-dot absolute -left-[38px] top-1 size-2.5 rounded-full border border-[#C7A86B] bg-[#0B1017] transition-colors"
                        aria-hidden
                      />
                      <span className="ma-label font-[Cormorant_Garamond] text-[21px] font-semibold text-[#F8F7F3]">
                        {step.label}
                      </span>
                      <p className="ma-body mt-1 max-w-[38ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#9DA5AE]">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
