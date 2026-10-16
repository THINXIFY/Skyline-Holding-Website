import { useRef } from "react";
import { Globe, Hourglass, Landmark, Layers, Microscope, Users, type LucideIcon } from "lucide-react";
import { WHAT_WE_BRING as W } from "./thesisData";
import { useThesisReveal } from "./useThesisReveal";

const ICONS: Record<(typeof W.capabilities)[number]["icon"], LucideIcon> = {
  patient: Hourglass,
  structuring: Layers,
  europe: Globe,
  network: Users,
  governance: Landmark,
  advisory: Microscope,
};

export function ThesisWhatWeBring() {
  const rootRef = useRef<HTMLElement>(null);
  useThesisReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="what-we-bring"
      aria-labelledby="bring-heading"
      className="relative bg-[linear-gradient(180deg,#0B1017_0%,#080A0D_100%)] py-24 text-[#F5F2EA] md:py-32"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,168,107,0.35),transparent)]" />
      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <p data-rv className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#C7A86B] sm:text-[12px]">
          {W.eyebrow}
        </p>
        <h2
          id="bring-heading"
          data-rv
          data-rv-delay="0.08"
          className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#F8F7F3]"
        >
          {W.headingLead}
          <br />
          <em className="text-[#D8BD82]">{W.headingEmphasis}</em>
        </h2>

        <ul className="mt-14 grid gap-px overflow-hidden border border-[#F5F2EA]/12 bg-[#F5F2EA]/12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {W.capabilities.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <li
                key={c.title}
                data-rv
                data-rv-delay={(i % 3) * 0.08}
                className="group bg-[#0B1624] p-7 transition-colors duration-500 hover:bg-[#0E1C2E] sm:p-8 lg:p-9"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    size={22}
                    strokeWidth={1.2}
                    aria-hidden
                    className="shrink-0 text-[#C7A86B] transition-colors duration-500 group-hover:text-[#D8BD82]"
                  />
                  <h3 className="font-['Cormorant_Garamond',serif] text-[24px] font-medium leading-tight text-[#F8F7F3]">
                    {c.title}
                  </h3>
                </div>
                <span aria-hidden className="mt-5 block h-px w-8 bg-[#C7A86B]/50 transition-all duration-500 group-hover:w-14 group-hover:bg-[#D8BD82]" />
                <p className="mt-5 text-[14.5px] leading-[1.75] text-[#F5F2EA]/65">{c.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
