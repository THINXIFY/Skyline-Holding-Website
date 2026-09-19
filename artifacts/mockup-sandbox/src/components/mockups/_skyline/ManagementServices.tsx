import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { managementServices } from "./data";

export function ManagementServices() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ms-eyebrow", ".ms-heading-line", ".ms-copy", ".ms-cta", ".ms-row", ".ms-visual"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".ms-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ms-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ms-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".ms-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
        .fromTo(
          ".ms-row",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 },
          0.35,
        )
        .fromTo(
          ".ms-visual",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: EASE.expo },
          0.6,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const active = managementServices[activeIndex];

  return (
    <section
      id="management-services"
      ref={rootRef}
      className="relative bg-[#F8F7F3] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="ms-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,60px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="ms-heading-line inline-block">Expertise to move</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="ms-heading-line inline-block text-[#C7A86B]">further.</span>
              </span>
            </h2>
            <p className="ms-copy mt-7 max-w-[42ch] font-[Manrope] text-[16px] leading-[1.5] text-[#12161B]/70">
              Skyline provides tailored management services designed to
              preserve value, strengthen portfolios and support long-term
              financial objectives across markets and generations.
            </p>
            <div className="ms-cta mt-8 flex flex-wrap items-center gap-7">
              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center gap-2 font-[Manrope] text-[13.5px] font-semibold text-[#12161B]"
              >
                Explore Management Services
                <ArrowRight
                  className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href="#management-services"
                className="inline-flex min-h-11 items-center border-b border-[#12161B]/25 pb-0.5 font-[Manrope] text-[13.5px] font-medium text-[#12161B]/70 transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
              >
                How We Work
              </a>
            </div>
          </div>

          {/* Desktop: editorial index + preview. Mobile: accordion. */}
          <div
            className="hidden lg:col-span-4 lg:block"
            role="tablist"
            aria-label="Management services"
          >
            <div className="border-t border-[#12161B]/12">
              {managementServices.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={service.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="ms-row group relative flex w-full items-center justify-between gap-4 border-b border-[#12161B]/12 py-4 text-left"
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[2px] bg-[#C7A86B] transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                      style={{ transformOrigin: "top" }}
                      aria-hidden
                    />
                    <span className="pl-4">
                      <span
                        className={`block font-[Manrope] text-[15px] font-medium transition-colors duration-400 ${
                          isActive ? "text-[#12161B]" : "text-[#12161B]/45"
                        }`}
                      >
                        0{index + 1} {service.title}
                      </span>
                      <span
                        className={`mt-1 block max-h-0 overflow-hidden font-[Manrope] text-[13px] text-[#12161B]/55 transition-all duration-400 ${
                          isActive ? "max-h-8 opacity-100" : "opacity-0"
                        }`}
                      >
                        {service.description}
                      </span>
                    </span>
                    <ArrowRight
                      className={`size-4 shrink-0 text-[#C7A86B] transition-transform duration-400 ${
                        isActive ? "translate-x-0" : "-translate-x-1 opacity-40"
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <div className="ms-visual relative aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-[#0B1624]">
              {managementServices.map((service, index) => (
                <img
                  key={service.title}
                  src={service.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-opacity duration-700"
                  style={{ opacity: index === activeIndex ? 1 : 0 }}
                  loading="lazy"
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/85 via-[#080A0D]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="block h-px w-8 bg-[#C7A86B]" aria-hidden />
                <h3 className="mt-3 font-[Cormorant_Garamond] text-[26px] font-semibold text-[#F8F7F3]">
                  {active.title}
                </h3>
                <p className="mt-1.5 max-w-[30ch] font-[Manrope] text-[13.5px] leading-[1.5] text-[#F5F2EA]/75">
                  {active.description}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile / tablet accordion */}
          <div className="lg:hidden">
            <div className="border-t border-[#12161B]/12">
              {managementServices.map((service, index) => {
                const isOpen = openMobile === index;
                return (
                  <div key={service.title} className="border-b border-[#12161B]/12">
                    <button
                      type="button"
                      onClick={() => setOpenMobile(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="font-[Manrope] text-[15px] font-medium text-[#12161B]">
                        0{index + 1} {service.title}
                      </span>
                      <ArrowRight
                        className={`size-4 shrink-0 text-[#C7A86B] transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5">
                        <p className="font-[Manrope] text-[14px] leading-[1.5] text-[#12161B]/65">
                          {service.description}
                        </p>
                        <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-[#0B1624]">
                          <img
                            src={service.image}
                            alt=""
                            className="size-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
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
