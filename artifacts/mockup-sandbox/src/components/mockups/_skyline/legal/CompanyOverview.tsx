import { useEffect, useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { companyInfo, registryDocument } from "../data";

const rows: Array<[string, string, string?]> = [
  ["Registered Name", companyInfo.legalName],
  ["CEO", companyInfo.ceo],
  ["Registre de Comerç/Societats", companyInfo.commercialRegister],
  ["Registry ID", companyInfo.registryId],
  ["LEI", companyInfo.lei],
  ["Registration Date", companyInfo.registrationDate],
  ["Registered Address", companyInfo.registeredAddress],
  ["Share Capital", companyInfo.shareCapital],
  ["Email", companyInfo.email, `mailto:${companyInfo.email}`],
];

export function CompanyOverview() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".co-eyebrow", ".co-heading", ".co-copy", ".co-row", ".co-panel", ".co-status"],
          { opacity: 1, y: 0 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".co-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".co-heading", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .fromTo(".co-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          ".co-row",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          0.45,
        )
        .fromTo(".co-status", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.7)
        .fromTo(".co-panel", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="company-overview" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <p className="co-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              COMPANY OVERVIEW
            </p>
            <h2 className="co-heading mt-6 font-[Cormorant_Garamond] text-[clamp(30px,3.4vw,44px)] font-semibold leading-[1.05] text-[#12161B]">
              {companyInfo.legalName}
            </h2>
            <p className="co-copy mt-5 max-w-[64ch] font-[Inter] text-[16px] leading-[1.55] text-[#12161B]/65 md:text-[17px]">
              {companyInfo.legalName} is an investment and management
              company incorporated in the Principality of Andorra, with a
              long-term perspective across businesses, assets and
              strategic sectors.
            </p>

            <div className="mt-10 border-t border-[#12161B]/10">
              {rows.map(([label, value, href]) => (
                <div
                  key={label}
                  className="co-row flex flex-col gap-1 border-b border-[#12161B]/10 py-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="font-[Inter] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#9DA5AE] sm:w-[220px] sm:shrink-0">
                    {label}
                  </span>
                  <span className="break-words font-[Inter] text-[14.5px] font-medium text-[#12161B]">
                    {href ? (
                      <a href={href} className="text-[#12161B] underline decoration-[#12161B]/25 underline-offset-4 transition-colors hover:text-[#C7A86B] hover:decoration-[#C7A86B]">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
              <div className="co-row co-status flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="font-[Inter] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#9DA5AE] sm:w-[220px] sm:shrink-0">
                  Entity Status
                </span>
                <span className="flex items-center gap-2 font-[Inter] text-[14.5px] font-semibold text-[#12161B]">
                  <span className="size-2 rounded-full bg-emerald-600" aria-hidden />
                  {companyInfo.entityStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="co-panel border border-[#12161B]/10 bg-[#F8F7F3] p-8">
              <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C7A86B]">
                COMPANY REGISTRATION
              </p>
              <p className="mt-3 font-[Inter] text-[14px] leading-[1.5] text-[#12161B]/65">
                Corporate registration information relating to{" "}
                {companyInfo.legalName}.
              </p>

              <div className="mt-6 flex items-center gap-4 border border-[#12161B]/15 bg-white/60 p-5">
                <FileText className="shrink-0 text-[#C7A86B]" size={28} strokeWidth={1.3} aria-hidden />
                <div>
                  <p className="font-[Inter] text-[13.5px] font-semibold text-[#12161B]">
                    {registryDocument.title}
                  </p>
                  <p className="mt-0.5 font-[Inter] text-[12px] text-[#12161B]/55">
                    Registre: {companyInfo.commercialRegister} &middot; Status: {companyInfo.entityStatus}
                  </p>
                </div>
              </div>

              <a
                href="#company-register"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 font-[Inter] text-[13.5px] font-semibold text-[#12161B] underline decoration-[#12161B]/25 underline-offset-4 transition-colors hover:text-[#C7A86B] hover:decoration-[#C7A86B]"
              >
                View Company Register
                <ArrowRight
                  className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
