import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, Download, FileText } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { companyInfo, registryDocument } from "../data";

const registryFields: Array<[string, string]> = [
  ["DENOMINACIÓ SOCIAL", companyInfo.legalName],
  ["DOMICILI SOCIAL", companyInfo.registeredAddress],
  ["CAPITAL SOCIAL", companyInfo.shareCapital],
];

export function CompanyRegister() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cr-eyebrow", ".cr-heading-line", ".cr-copy", ".cr-card", ".cr-note", ".cr-field"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cr-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cr-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".cr-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".cr-card",
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: EASE.expo },
          0.4,
        )
        .fromTo(
          ".cr-field",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          0.75,
        )
        .fromTo(".cr-note", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="company-register" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5">
            <p className="cr-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              COMPANY REGISTER
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="cr-heading-line inline-block">Registre de Societats</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="cr-heading-line inline-block">Mercantils.</span>
              </span>
            </h2>
            <p className="cr-copy mt-6 max-w-[48ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#F5F2EA]/65">
              Skyline Holding, SLU is inscribed with the Andorran commercial
              register under the Govern d&rsquo;Andorra, Ministeri
              d&rsquo;Economia i Territori. The certificate below reflects
              the registry document on file.
            </p>

            <a
              href="https://www.e-tramits.ad/tramits/ca/certificat-de-societat-mercantil-andorrana/p/GV000900"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-1.5 font-[Inter] text-[13px] font-semibold text-[#F5F2EA]/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#D8BD82] hover:decoration-[#D8BD82]"
            >
              Official Andorran Company Certificate Service
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="cr-card border border-white/10 bg-[#080A0D]">
              <div className="flex flex-col gap-6 border-b border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center border border-[#C7A86B]/30 bg-[#C7A86B]/5">
                    <FileText className="text-[#D8BD82]" size={22} strokeWidth={1.4} aria-hidden />
                  </div>
                  <div>
                    <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9DA5AE]">
                      REGISTRE DE SOCIETATS MERCANTILS
                    </p>
                    <p className="mt-1 font-[Cormorant_Garamond] text-[22px] font-semibold text-[#F8F7F3]">
                      Certificat d&rsquo;Inscripció
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start font-[Inter] text-[12.5px] font-semibold text-[#F5F2EA]/85 sm:self-auto">
                  <CheckCircle2 className="text-emerald-500" size={16} strokeWidth={2} aria-hidden />
                  ESTAT DE L&rsquo;ENTITAT: ACTIVA
                </div>
              </div>

              <div className="p-7 md:p-9">
                <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9DA5AE]">
                  DADES REGISTRALS PRINCIPALS
                </p>
                <div className="mt-4 border-t border-white/10">
                  {registryFields.map(([label, value]) => (
                    <div
                      key={label}
                      className="cr-field flex flex-col gap-1 border-b border-white/10 py-4 sm:flex-row sm:items-center sm:gap-6"
                    >
                      <span className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE] sm:w-[200px] sm:shrink-0">
                        {label}
                      </span>
                      <span className="font-[Inter] text-[14px] font-medium text-[#F5F2EA]">{value}</span>
                    </div>
                  ))}
                  <div className="cr-field grid grid-cols-2 gap-4 py-4 sm:grid-cols-3">
                    <div>
                      <p className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                        Registre
                      </p>
                      <p className="mt-1 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]">
                        {companyInfo.commercialRegister}
                      </p>
                    </div>
                    <div>
                      <p className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                        LEI
                      </p>
                      <p className="mt-1 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]">
                        {companyInfo.lei}
                      </p>
                    </div>
                    <div>
                      <p className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                        Inscripció
                      </p>
                      <p className="mt-1 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]">
                        {companyInfo.registrationDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={registryDocument.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    View Document
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} aria-hidden />
                  </a>
                  <a
                    href={registryDocument.path}
                    download
                    className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-white/15 px-6 py-3 font-[Inter] text-[13px] font-semibold text-[#F5F2EA] transition-colors duration-300 hover:border-[#C7A86B]/60 hover:text-[#D8BD82]"
                  >
                    Download PDF
                    <Download className="size-4" strokeWidth={2} aria-hidden />
                  </a>
                </div>

                <p className="cr-note mt-5 font-[Inter] text-[11.5px] leading-[1.5] text-[#9DA5AE]">
                  This certificate is provided as supplied and may carry
                  reference or sample markings from the issuing process. It
                  is presented here for transparency and has not been
                  independently re-issued or authenticated by Skyline
                  Holding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
