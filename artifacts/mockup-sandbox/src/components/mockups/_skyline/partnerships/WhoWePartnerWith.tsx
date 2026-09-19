import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { partnerTypes } from "../data";

export function WhoWePartnerWith() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".wp-eyebrow", ".wp-heading-line", ".wp-copy", ".wp-panel"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".wp-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".wp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".wp-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".wp-panel",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByPanel = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const panel = el.querySelector<HTMLElement>("[data-panel]");
    const amount = (panel?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="partner-types" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="wp-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              WHO WE PARTNER WITH
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="wp-heading-line inline-block">Different perspectives.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="wp-heading-line inline-block">
                  A <em className="not-italic text-[#C7A86B]">shared ambition.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="wp-copy max-w-[46ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65 lg:ml-auto">
              We collaborate with forward-thinking partners, combining
              complementary strengths to pursue meaningful opportunities
              across global markets.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <div
            ref={trackRef}
            onScroll={updateProgress}
            className="no-native-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          >
            {partnerTypes.map((partner, index) => (
              <a
                key={partner.title}
                data-panel
                href="/contact"
                className={`wp-panel group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden border border-[#12161B]/10 bg-[#080A0D] transition-colors duration-400 hover:border-[#C7A86B]/60 sm:w-[360px] ${
                  index % 2 === 1 ? "sm:mt-8" : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={partner.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/45 to-[#080A0D]/10 transition-opacity duration-400 group-hover:opacity-95" />
                  <span className="absolute left-5 top-5 font-[Inter] text-[12px] font-semibold tracking-[0.14em] text-[#D8BD82]">
                    {partner.label}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-400 group-hover:-translate-y-1">
                    <h3 className="font-[Cormorant_Garamond] text-[24px] font-semibold leading-[1.1] text-[#F8F7F3]">
                      {partner.title}
                    </h3>
                    <p className="mt-2 max-w-[30ch] font-[Inter] text-[13px] leading-[1.5] text-[#F5F2EA]/70 transition-colors duration-400 group-hover:text-[#F5F2EA]/90">
                      {partner.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-[Inter] text-[12px] font-semibold text-[#F8F7F3]">
                      Learn More
                      <ArrowRight
                        className="size-3.5 text-[#D8BD82] transition-transform duration-400 group-hover:translate-x-1.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-5">
            <button
              type="button"
              onClick={() => scrollByPanel(-1)}
              aria-label="Previous partner type"
              className="flex size-11 items-center justify-center rounded-full border border-[#12161B]/20 text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              <ArrowLeft size={16} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => scrollByPanel(1)}
              aria-label="Next partner type"
              className="flex size-11 items-center justify-center rounded-full border border-[#12161B]/20 text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
            >
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>

            <div className="relative h-px flex-1 overflow-hidden rounded-full bg-[#12161B]/10">
              <span
                className="absolute inset-y-0 left-0 block h-full rounded-full bg-[#C7A86B] transition-[width] duration-150"
                style={{ width: `${8 + progress * 92}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
