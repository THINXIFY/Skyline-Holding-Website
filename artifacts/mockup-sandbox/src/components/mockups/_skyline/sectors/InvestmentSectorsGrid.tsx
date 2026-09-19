import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { investmentSectors } from "../data";

// Desktop mosaic rhythm: alternating 7/5, 5/7, 8/4, 4/8 column spans across
// four rows, each row pairing a taller feature card with a shorter one.
const layout = [
  { lgCol: "lg:col-span-7", aspect: "lg:aspect-[16/11]" },
  { lgCol: "lg:col-span-5", aspect: "lg:aspect-[16/13]" },
  { lgCol: "lg:col-span-5", aspect: "lg:aspect-[16/13]" },
  { lgCol: "lg:col-span-7", aspect: "lg:aspect-[16/11]" },
  { lgCol: "lg:col-span-8", aspect: "lg:aspect-[16/9]" },
  { lgCol: "lg:col-span-4", aspect: "lg:aspect-[3/4]" },
  { lgCol: "lg:col-span-4", aspect: "lg:aspect-[3/4]" },
  { lgCol: "lg:col-span-8", aspect: "lg:aspect-[16/9]" },
];

export function InvestmentSectorsGrid() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".isg-eyebrow", ".isg-heading-line", ".isg-card"], {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });

      tl.fromTo(".isg-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }).fromTo(
        ".isg-heading-line",
        { opacity: 0, y: "60%" },
        { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
        0.1,
      );

      gsap.utils.toArray<HTMLElement>(".isg-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: EASE.expo,
            delay: Math.min(i * 0.06, 0.3),
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="our-sectors" ref={rootRef} className="relative bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="isg-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
          <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
          OUR INVESTMENT SECTORS
        </p>
        <h2 className="mt-6 max-w-[600px] font-[Cormorant_Garamond] text-[clamp(34px,3.8vw,50px)] font-semibold leading-[1.05] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="isg-heading-line inline-block">Eight sectors.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="isg-heading-line inline-block text-[#D8BD82]">One long-term view.</span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 lg:grid-cols-12">
          {investmentSectors.map((sector, index) => {
            const { lgCol, aspect } = layout[index];
            return (
              <a
                key={sector.title}
                href="/investment-opportunities"
                className={`isg-card group relative block aspect-[4/5] w-full overflow-hidden rounded-[4px] sm:aspect-[16/10] ${lgCol} ${aspect}`}
              >
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/45 to-[#080A0D]/10 transition-opacity duration-400 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span
                    className="block h-px w-8 bg-[#C7A86B]/60 transition-all duration-400 group-hover:w-12 group-hover:bg-[#C7A86B]"
                    aria-hidden
                  />
                  <h3 className="mt-4 font-[Cormorant_Garamond] text-[22px] font-semibold leading-[1.1] text-[#F8F7F3] transition-transform duration-400 group-hover:-translate-y-0.5 md:text-[25px]">
                    {sector.title}
                  </h3>
                  <p className="mt-2 max-w-[42ch] font-[Inter] text-[12.5px] leading-[1.5] text-[#F5F2EA]/70">
                    {sector.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                    {sector.focus.map((tag) => (
                      <span
                        key={tag}
                        className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-[Inter] text-[12.5px] font-semibold text-[#F5F2EA]">
                    View Sector
                    <ArrowRight
                      className="size-3.5 text-[#D8BD82] transition-transform duration-300 group-hover:translate-x-1.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
