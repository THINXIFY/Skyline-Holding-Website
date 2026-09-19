import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { companyInfo } from "../data";

const details: Array<[string, string]> = [
  ["Registered Company", companyInfo.legalName],
  ["Registered Address", companyInfo.registeredAddress],
  ["Chief Executive Officer", companyInfo.ceo],
  ["Registre de Comerç/Societats", companyInfo.commercialRegister],
  ["Registry ID", companyInfo.registryId],
  ["LEI", companyInfo.lei],
  ["Entity Status", companyInfo.entityStatus],
  ["Registration Date", companyInfo.registrationDate],
  ["Share Capital", companyInfo.shareCapital],
];

export function Impressum() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".im-eyebrow", ".im-heading", ".im-copy", ".im-row", ".im-block"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });

      tl.fromTo(".im-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".im-heading", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .fromTo(".im-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(".im-row", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, 0.45)
        .fromTo(".im-block", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative bg-[#F5F2EA] pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-[760px] px-6 md:px-10">
        <p className="im-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
          <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
          IMPRESSUM
        </p>
        <h1 className="im-heading mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4.4vw,54px)] font-semibold leading-[1.05] text-[#12161B]">
          Company &amp; website information.
        </h1>
        <p className="im-copy mt-6 max-w-[58ch] font-[Inter] text-[15.5px] leading-[1.6] text-[#12161B]/65">
          Information required under applicable disclosure obligations for
          {" "}{companyInfo.legalName}.
        </p>

        <div className="mt-14 border-t border-[#12161B]/10">
          {details.map(([label, value]) => (
            <div
              key={label}
              className="im-row flex flex-col gap-1 border-b border-[#12161B]/10 py-4 sm:flex-row sm:items-center sm:gap-8"
            >
              <span className="font-[Inter] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#9DA5AE] sm:w-[240px] sm:shrink-0">
                {label}
              </span>
              <span className="font-[Inter] text-[14.5px] font-medium text-[#12161B]">{value}</span>
            </div>
          ))}
        </div>

        <div className="im-block mt-16">
          <h2 className="font-[Cormorant_Garamond] text-[22px] font-semibold text-[#12161B]">
            Responsible for Content
          </h2>
          <p className="mt-3 max-w-[58ch] font-[Inter] text-[14.5px] leading-[1.6] text-[#12161B]/65">
            {companyInfo.ceo}, on behalf of {companyInfo.legalName}, is
            responsible for the content of this website.
          </p>
        </div>

        <div className="im-block mt-10">
          <h2 className="font-[Cormorant_Garamond] text-[22px] font-semibold text-[#12161B]">
            Further Information
          </h2>
          <p className="mt-3 max-w-[58ch] font-[Inter] text-[14.5px] leading-[1.6] text-[#12161B]/65">
            For full legal and company details, including our registration
            documentation, please see the{" "}
            <a href="/legal" className="font-semibold text-[#12161B] underline decoration-[#C7A86B]/50 underline-offset-4 transition-colors hover:text-[#C7A86B]">
              Legal &amp; Company Information
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
