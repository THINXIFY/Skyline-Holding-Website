import { useRef } from "react";
import { logoUrl, PROFILES, PROFILES_SECTION as P, type NameStyle } from "./thesisDataLower";
import { useThesisReveal } from "./useThesisReveal";

// Name treatments for the compact logo strip (same families as the cards, smaller).
const STRIP_NAME: Record<NameStyle, string> = {
  sans: "font-[Inter] text-[17px] font-semibold tracking-[-0.01em]",
  caps: "font-[Inter] text-[11px] font-semibold uppercase tracking-[0.22em]",
  light: "font-[Inter] text-[18px] font-normal",
  italic: "font-['Cormorant_Garamond',serif] text-[21px] font-bold italic",
  serif: "font-['Cormorant_Garamond',serif] text-[21px] font-medium",
  serifBold: "font-['Cormorant_Garamond',serif] text-[21px] font-bold",
  lower: "font-[Inter] text-[17px] font-medium",
};

function StripItems({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className={`flex shrink-0 items-center ${hidden ? "th-marquee-dup" : ""}`}>
      {PROFILES.map((p) => (
        <li key={p.name} className="flex items-center gap-3 whitespace-nowrap px-7 sm:px-10">
          <img
            src={logoUrl(p.logo)}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 shrink-0 opacity-90 grayscale contrast-110"
          />
          <span className={`text-[#1F2933] ${STRIP_NAME[p.nameStyle]}`}>{p.name}</span>
        </li>
      ))}
    </ul>
  );
}

const PILL =
  "rounded-full border border-[#0B1624]/15 px-3 py-[5px] text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-[#4A525C]";

// Company-name treatments, following the reference: mostly editorial serif, with a few sans/caps wordmarks.
const NAME_CLASS: Record<NameStyle, string> = {
  sans: "font-[Inter] text-[23px] font-semibold tracking-[-0.01em]",
  caps: "font-[Inter] text-[17px] font-semibold uppercase tracking-[0.22em]",
  light: "font-[Inter] text-[24px] font-normal tracking-[-0.005em]",
  italic: "font-['Cormorant_Garamond',serif] text-[29px] font-bold italic",
  serif: "font-['Cormorant_Garamond',serif] text-[30px] font-medium",
  serifBold: "font-['Cormorant_Garamond',serif] text-[30px] font-bold",
  lower: "font-[Inter] text-[24px] font-medium tracking-[-0.01em]",
};

export function ThesisProfiles() {
  const rootRef = useRef<HTMLElement>(null);
  useThesisReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="portfolio-profiles"
      aria-labelledby="profiles-heading"
      className="relative bg-[#F5F2EA] pb-20 pt-24 text-[#0B1017] md:pb-28 md:pt-32"
    >
      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p data-rv className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8F7035] sm:text-[12px]">
              {P.eyebrow}
            </p>
            <h2
              id="profiles-heading"
              data-rv
              data-rv-delay="0.08"
              className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.01em]"
            >
              {P.headingLead}
              <br />
              <em className="text-[#A9873F]">{P.headingEmphasis}</em>
            </h2>
          </div>
          <div data-rv data-rv-delay="0.16" className="max-w-[520px] lg:col-span-5">
            <p className="text-[15px] leading-[1.8] text-[#3C444D] sm:text-[16px]">{P.copy}</p>
          </div>
        </div>
      </div>

      {/* Logo + name strip: full-bleed band, slow marquee, pauses on hover, static under reduced motion. */}
      <div data-rv className="th-marquee mt-14 w-full border-y border-[#0B1017]/10 bg-[#FEFDFB] md:mt-16">
        <div className="overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
          <div className="th-marquee-track">
            <StripItems />
            <StripItems hidden />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
          {PROFILES.map((p, i) => {
            // "Nuclear · SMR · Growth" -> sector "Nuclear · SMR" (muted gold) + stage "Growth" (slate)
            const parts = p.profile.split(" · ");
            const stage = parts[parts.length - 1];
            const sector = parts.slice(0, -1).join(" · ");
            return (
              <li
                key={p.name}
                data-rv
                data-rv-delay={(i % 3) * 0.06}
                className="group relative flex min-h-[300px] flex-col border border-[#0B1624]/12 bg-[#FEFDFB] p-6 transition-[border-color,translate] duration-500 hover:-translate-y-0.5 hover:border-[#A9873F]/55 sm:p-8"
              >
                {/* Top: mark + name + category. The PORTFOLIO pill sits top-right (floated inside the
                    name block so long names flow around it and never run underneath it); on phones it
                    moves above the row. */}
                <span className={`${PILL} mb-5 inline-flex self-start sm:hidden`}>{P.cardLabel}</span>
                <div className="flex items-start gap-4">
                  <img
                    src={logoUrl(p.logo)}
                    alt=""
                    width={52}
                    height={52}
                    loading="lazy"
                    decoding="async"
                    className="h-[52px] w-[52px] shrink-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="min-w-0 flex-1">
                    <span className={`${PILL} hidden sm:float-right sm:ml-3 sm:mt-[3px] sm:inline-flex`}>{P.cardLabel}</span>
                    <h3 className={`leading-[1.15] text-[#0B1017] ${NAME_CLASS[p.nameStyle]}`}>{p.name}</h3>
                    <p className="mt-2 text-[15px] text-[#5A626B]">{p.category}</p>
                  </div>
                </div>

                <p className="mt-6 flex-1 text-[17px] leading-[1.7] text-[#2F3842]">{p.description}</p>

                <div className="mt-7 border-t border-[#D8DDE2] pt-5">
                  <p className="text-[12px] uppercase tracking-[0.16em]">
                    <span className="font-semibold text-[#8F7035]">{sector}</span>
                    <span className="text-[#5A626B]"> · {stage}</span>
                  </p>
                  <p className="mt-2.5 text-[11.5px] uppercase tracking-[0.16em] text-[#5A626B]">{p.location}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
