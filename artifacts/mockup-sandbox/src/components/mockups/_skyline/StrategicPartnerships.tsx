import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Lightbulb,
  Network,
  TrendingUp,
  Users,
} from "lucide-react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "./gsap";

const IMAGE =
  "https://marbholding.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-18-2026-12_34_09-PM.webp";

const partners = [
  {
    title: "Investors",
    description: "Aligned capital relationships built around long-term objectives.",
    icon: TrendingUp,
  },
  {
    title: "Founders & Entrepreneurs",
    description: "Supporting ambitious businesses and visionary leadership teams.",
    icon: Lightbulb,
  },
  {
    title: "Family Offices",
    description: "Multi-generational perspectives and long-term capital.",
    icon: Users,
  },
  {
    title: "Institutions",
    description: "Collaborating with established organizations and investment platforms.",
    icon: Building2,
  },
  {
    title: "Strategic Capital Partners",
    description: "Combining capital, expertise and networks to create stronger outcomes.",
    icon: Network,
  },
];

export function StrategicPartnerships() {
  const rootRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const hoverLockRef = useRef(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".sp-eyebrow", ".sp-heading-line", ".sp-copy", ".sp-cta", ".sp-row", ".sp-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".sp-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".sp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".sp-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".sp-image",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.25,
        )
        .fromTo(
          ".sp-row",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.45,
        )
        .fromTo(".sp-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6);

      if (window.innerWidth >= 1024) {
        gsap.set(".sp-image img", { scale: 1.1 });
        gsap.to(".sp-image img", {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        // Active row can also progress gradually with scroll, independent of hover.
        rowRefs.current.forEach((row, i) => {
          if (!row) return;
          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              if (!hoverLockRef.current) setActive(i);
            },
            onEnterBack: () => {
              if (!hoverLockRef.current) setActive(i);
            },
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="sp-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              STRATEGIC PARTNERSHIPS
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(42px,4.5vw,64px)] font-semibold leading-[0.98] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="sp-heading-line inline-block">Aligned partnerships</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="sp-heading-line inline-block">
                  for a bigger <em className="italic text-[#C7A86B]">tomorrow.</em>
                </span>
              </span>
            </h2>
            <p className="sp-copy mt-7 max-w-[42ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              We collaborate with forward-thinking investors, founders,
              institutions and strategic partners to unlock opportunities,
              accelerate growth and create enduring value.
            </p>
            <div className="sp-cta mt-8 flex flex-wrap items-center gap-7">
              <a
                href="#management-services"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Our Partnerships
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
              <a
                href="#investor-relations"
                className="inline-flex min-h-11 items-center border-b border-[#12161B]/25 pb-0.5 font-[Inter] text-[13.5px] font-medium text-[#12161B]/70 transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
              >
                Partner With Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sp-image relative aspect-[3/4] w-full overflow-hidden rounded-[6px] bg-[#0B1624]">
              <img
                src={IMAGE}
                alt="Skyline Holding's illuminated headquarters entrance at dusk, overlooking mountains and a lake"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="block font-[Inter] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EA]/80">
                  Different Perspectives
                </span>
                <span className="block font-[Inter] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D8BD82]">
                  Greater Possibilities
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="mb-5 hidden items-center justify-between lg:flex">
              <span className="h-px flex-1 bg-[#12161B]/10" aria-hidden />
              <span className="ml-4 font-[Inter] text-[11px] font-medium tracking-[0.1em] text-[#12161B]/45">
                0{active + 1} / 0{partners.length}
              </span>
            </div>

            <div className="border-t border-[#12161B]/10">
              {partners.map((partner, index) => {
                const Icon = partner.icon;
                const isActive = active === index;
                return (
                  <button
                    key={partner.title}
                    type="button"
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    onMouseEnter={() => {
                      hoverLockRef.current = true;
                      setActive(index);
                    }}
                    onMouseLeave={() => {
                      hoverLockRef.current = false;
                    }}
                    onFocus={() => setActive(index)}
                    className={`sp-row group relative flex w-full items-start gap-4 border-b border-[#12161B]/10 py-5 text-left transition-[padding,background-color] duration-400 ${
                      isActive ? "-translate-x-0 bg-[#C7A86B]/[.06] pl-3" : "pl-0"
                    }`}
                    style={{ transform: isActive ? "translateX(4px)" : "translateX(0)" }}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-400 ${
                        isActive ? "border-[#C7A86B] text-[#C7A86B]" : "border-[#12161B]/15 text-[#12161B]/40"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="flex-1 pt-1">
                      <span
                        className={`block font-[Inter] text-[15px] font-semibold transition-colors duration-400 ${
                          isActive ? "text-[#12161B]" : "text-[#12161B]/60"
                        }`}
                      >
                        {partner.title}
                      </span>
                      <span
                        className={`mt-1 block max-w-[34ch] font-[Inter] text-[13px] leading-[1.45] transition-colors duration-400 ${
                          isActive ? "text-[#12161B]/60" : "text-[#12161B]/35"
                        }`}
                      >
                        {partner.description}
                      </span>
                    </span>
                    <ArrowRight
                      className={`mt-1.5 size-4 shrink-0 text-[#C7A86B] transition-all duration-400 ${
                        isActive ? "translate-x-1 opacity-100" : "opacity-0"
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: image then accordion list */}
        <div className="mt-12 lg:hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-[#0B1624]">
            <img src={IMAGE} alt="" className="size-full object-cover" loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="block font-[Inter] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F5F2EA]/80">
                Different Perspectives
              </span>
              <span className="block font-[Inter] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                Greater Possibilities
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-[#12161B]/10">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              const isOpen = openMobile === index;
              return (
                <div key={partner.title} className="border-b border-[#12161B]/10">
                  <button
                    type="button"
                    onClick={() => setOpenMobile(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex min-h-[56px] w-full items-center gap-4 py-4 text-left"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#C7A86B]/60 text-[#C7A86B]">
                      <Icon size={15} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="flex-1 font-[Inter] text-[15px] font-semibold text-[#12161B]">
                      {partner.title}
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
                    <p className="pb-4 pl-[52px] font-[Inter] text-[14px] leading-[1.5] text-[#12161B]/60">
                      {partner.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
