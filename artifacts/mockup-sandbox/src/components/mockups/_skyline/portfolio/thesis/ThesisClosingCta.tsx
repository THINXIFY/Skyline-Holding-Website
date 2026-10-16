import { useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { CLOSING_CTA as C, CONFIDENTIAL_NOTE as N } from "./thesisDataLower";
import { useThesisReveal } from "./useThesisReveal";

// Local, optimized globe/network artwork already used by the access gateway; mirrored so the
// globe sits on the left, as in the design reference.
const BACKGROUND = "/images/portfolio-access-bg.webp";
const EMBLEM = "/images/skyline-emblem.webp";

/** Section 9 (closing CTA) and section 10 (confidential note). No footer. */
export function ThesisClosingCta() {
  const rootRef = useRef<HTMLElement>(null);
  useThesisReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="contact-cta"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#080A0D] py-24 text-center text-[#F5F2EA] md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="th-ambient absolute inset-0 origin-center will-change-transform">
          <img
            src={BACKGROUND}
            alt=""
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="h-full w-full -scale-x-100 object-cover object-[30%_70%] opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.62),rgba(8,10,13,0.82))]" />
        {/* Calm centre for the copy; the globe stays visible on the left. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_50%,rgba(8,10,13,0.78),rgba(8,10,13,0)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#080A0D,rgba(8,10,13,0))]" />
      </div>

      <div className="mx-auto flex max-w-[1464px] flex-col items-center px-6 md:px-10 lg:px-8">
        <img data-rv src={EMBLEM} alt="Skyline Holding" width={360} height={238} loading="lazy" className="w-14 sm:w-16" />

        <h2
          id="cta-heading"
          data-rv
          data-rv-delay="0.1"
          className="mt-8 font-['Cormorant_Garamond',serif] text-[clamp(2.2rem,1.4rem+3vw,3.9rem)] font-normal leading-[1.08] tracking-[-0.01em] text-[#F8F7F3]"
        >
          {C.headingLead}
          <br />
          <em className="text-[#D8BD82]">{C.headingEmphasis}</em>
        </h2>

        <p data-rv data-rv-delay="0.2" className="mt-7 max-w-[600px] text-[15px] leading-[1.8] text-[#F5F2EA]/75 sm:text-[16px]">
          {C.copy}
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            data-rv
            data-rv-delay="0.3"
            href={C.primary.href}
            className="group inline-flex h-[54px] items-center justify-center gap-3 bg-[linear-gradient(120deg,#C7A86B,#D8BD82_55%,#C7A86B)] px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#080A0D] transition-[filter] duration-300 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82]"
          >
            {C.primary.label}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            data-rv
            data-rv-delay="0.4"
            href={C.deck.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[54px] items-center justify-center gap-3 border border-[#C7A86B]/60 px-9 text-[12px] font-medium uppercase tracking-[0.2em] text-[#D8BD82] transition-colors duration-300 hover:border-[#D8BD82] hover:bg-[#D8BD82]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8BD82]"
          >
            <FileText size={16} strokeWidth={1.4} aria-hidden />
            {C.deck.label}
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>

        {/* Section 10: confidential note */}
        <span aria-hidden data-rule className="mt-14 block h-px w-12 origin-center bg-[#C7A86B]/70" />
        <div data-rv data-rv-delay="0.6" className="mt-8 max-w-[920px] text-[12px] leading-[1.8] text-[#F5F2EA]/55 sm:text-[12.5px]">
          <p>{N.main}</p>
        </div>
      </div>
    </section>
  );
}
