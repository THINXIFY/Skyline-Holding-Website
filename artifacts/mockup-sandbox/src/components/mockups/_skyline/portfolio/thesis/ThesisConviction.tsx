import { useRef } from "react";
import { CONVICTION } from "./thesisData";
import { useThesisReveal } from "./useThesisReveal";

export function ThesisConviction() {
  const rootRef = useRef<HTMLElement>(null);
  useThesisReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="conviction"
      aria-labelledby="conviction-heading"
      className="relative bg-[#F5F2EA] py-24 text-[#0B1017] md:py-32"
    >
      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p data-rv className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#8F7035] sm:text-[12px]">
              {CONVICTION.eyebrow}
            </p>
            <h2
              id="conviction-heading"
              data-rv
              data-rv-delay="0.08"
              className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.01em]"
            >
              {CONVICTION.headingLead}
              <br />
              <em className="text-[#A9873F]">{CONVICTION.headingEmphasis}</em>
            </h2>
          </div>
          <p data-rv data-rv-delay="0.16" className="max-w-[520px] text-[15px] leading-[1.8] text-[#3C444D] sm:text-[16px] lg:col-span-5">
            {CONVICTION.copy}
          </p>
        </div>

        <ol className="mt-16 grid border-y border-[#0B1017]/12 md:mt-20 md:grid-cols-3">
          {CONVICTION.principles.map((p, i) => (
            <li
              key={p.n}
              data-rv
              data-rv-delay={i * 0.1}
              className={`py-9 md:px-8 md:py-12 ${i > 0 ? "border-t border-[#0B1017]/12 md:border-l md:border-t-0" : ""} ${i === 0 ? "md:pl-0" : ""} ${i === 2 ? "md:pr-0" : ""}`}
            >
              <span className="text-[12px] font-medium tracking-[0.2em] text-[#8F7035]">{p.n}</span>
              <h3 className="mt-5 font-['Cormorant_Garamond',serif] text-[26px] font-medium leading-tight md:text-[28px]">{p.title}</h3>
              <span aria-hidden className="mt-5 block h-px w-8 bg-[#A9873F]" />
              <p className="mt-5 max-w-[360px] text-[15px] leading-[1.75] text-[#3C444D]">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
