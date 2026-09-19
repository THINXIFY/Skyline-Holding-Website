import { useEffect, useRef } from "react";
import { ArrowRight, Building2, Handshake, Landmark, User } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { irPartnerTypes } from "../data";

const icons = [User, Building2, Landmark, Handshake];

export function WhoWeWorkWith() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ww-eyebrow", ".ww-heading-line", ".ww-panel"], { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".ww-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ww-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(
          ".ww-panel",
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.12, ease: EASE.expo },
          0.35,
        );

      if (window.innerWidth >= 1024) {
        gsap.utils.toArray<HTMLElement>(".ww-panel img").forEach((img) => {
          gsap.set(img, { scale: 1.12 });
          gsap.to(img, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="who-we-work-with" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="ww-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
          <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
          WHO WE WORK WITH
        </p>
        <h2 className="mt-6 max-w-[640px] font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#F8F7F3]">
          <span className="block overflow-hidden pb-1">
            <span className="ww-heading-line inline-block">Partners with a</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="ww-heading-line inline-block text-[#D8BD82]">shared perspective.</span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {irPartnerTypes.map((partner, index) => {
            const Icon = icons[index];
            return (
              <div
                key={partner.title}
                className={`ww-panel group relative flex flex-col overflow-hidden border border-white/10 transition-colors duration-400 hover:border-[#C7A86B]/60 ${
                  index % 2 === 1 ? "lg:mt-8" : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#080A0D]">
                  <img
                    src={partner.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/50 to-[#080A0D]/10 transition-opacity duration-400 group-hover:opacity-95" />
                  <span className="absolute left-5 top-5 flex size-9 items-center justify-center rounded-full bg-[#080A0D]/60 backdrop-blur-sm">
                    <Icon className="text-[#D8BD82]" size={16} strokeWidth={1.6} aria-hidden />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-400 group-hover:-translate-y-1">
                    <h3 className="font-[Cormorant_Garamond] text-[21px] font-semibold leading-[1.1] text-[#F8F7F3]">
                      {partner.title}
                    </h3>
                    <p className="mt-2 max-w-[26ch] font-[Inter] text-[12.5px] leading-[1.5] text-[#F5F2EA]/70 transition-colors duration-400 group-hover:text-[#F5F2EA]/90">
                      {partner.body}
                    </p>
                    <span className="mt-3 inline-flex items-center text-[#D8BD82] opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <ArrowRight className="size-4 translate-x-0 transition-transform duration-400 group-hover:translate-x-1.5" strokeWidth={2} aria-hidden />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
