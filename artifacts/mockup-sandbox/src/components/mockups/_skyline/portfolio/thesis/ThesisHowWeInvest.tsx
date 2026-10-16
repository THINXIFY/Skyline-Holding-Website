import { useLayoutEffect, useRef } from "react";
import { Clock, FileText, Landmark, LayoutGrid, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../../gsap";
import { HOW_WE_INVEST as H } from "./thesisData";
import { useThesisReveal } from "./useThesisReveal";

const ICONS: Record<(typeof H.parameters)[number]["icon"], LucideIcon> = {
  stage: TrendingUp,
  position: Target,
  instruments: FileText,
  horizon: Clock,
  portfolio: LayoutGrid,
  governance: Landmark,
};

const ALIGN = ["items-start text-left", "items-center text-center", "items-end text-right"] as const;

/** Faint topographic wave lines along the bottom edge (decorative). */
function TopoLines() {
  const rows = Array.from({ length: 11 }, (_, k) => {
    const base = 40 + k * 15;
    const amp = 10 + (k % 4) * 3;
    const phase = k * 0.55;
    const pts = Array.from({ length: 49 }, (_, i) => {
      const x = (i / 48) * 1440;
      const y = base + amp * Math.sin(i * 0.26 + phase) + 6 * Math.sin(i * 0.7 + phase * 2);
      return `${i ? "L" : "M"}${x.toFixed(0)} ${y.toFixed(1)}`;
    });
    return { d: pts.join(" "), o: 0.08 + (k / 10) * 0.26 };
  });
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className="decor pointer-events-none absolute inset-x-0 bottom-0 h-[170px] w-full sm:h-[210px]"
    >
      <g fill="none" stroke="#A9873F" strokeWidth={1}>
        {rows.map((r, i) => (
          <path key={i} d={r.d} strokeOpacity={r.o} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}

/** A quiet globe wireframe with the three target markets as nodes sized by allocation. */
function MarketsGlobe() {
  const nodes = [
    { label: "US", x: 58, y: 96, r: 8 },
    { label: "UK", x: 128, y: 62, r: 5.5 },
    { label: "EU", x: 150, y: 84, r: 4.5 },
  ];
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 200 180" className="decor mx-auto h-auto w-full max-w-[260px]">
      <g fill="none" stroke="#A9873F" strokeWidth={0.8} strokeOpacity={0.35}>
        <circle cx={100} cy={90} r={78} />
        <ellipse cx={100} cy={90} rx={34} ry={78} />
        <ellipse cx={100} cy={90} rx={62} ry={78} strokeOpacity={0.2} />
        <ellipse cx={100} cy={90} rx={78} ry={26} />
        <ellipse cx={100} cy={90} rx={78} ry={52} strokeOpacity={0.2} />
        <line x1={22} y1={90} x2={178} y2={90} strokeOpacity={0.25} />
      </g>
      <g fill="none" stroke="#A9873F" strokeWidth={1} strokeDasharray="3 4" strokeOpacity={0.7}>
        <path d="M58 96 Q92 36 128 62" />
        <path d="M128 62 Q142 64 150 84" />
      </g>
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r={n.r + 5} fill="#A9873F" fillOpacity={0.1} />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#A9873F" />
          <text x={n.x} y={n.y + n.r + 14} textAnchor="middle" fontSize={8.5} letterSpacing={1.2} fill="#5A626B" fontFamily="Inter, sans-serif">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ThesisHowWeInvest() {
  const rootRef = useRef<HTMLElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const paramsRef = useRef<HTMLDListElement>(null);
  useThesisReveal(rootRef);

  // Play-once sequences: the ticket rail draws left -> right with its markers and values revealed
  // in turn; the parameter rows stagger in; decorative art fades up. Reduced motion shows all.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".ti-rail, .ti-core", { scaleX: 1 });
        gsap.set(".ti-mark, .ti-val, .pr-row, .decor", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const rail = ticketRef.current;
      if (rail) {
        const marks = gsap.utils.toArray<HTMLElement>(".ti-mark", rail);
        const vals = gsap.utils.toArray<HTMLElement>(".ti-val", rail);
        gsap.set(marks, { opacity: 0, scale: 0.5 });
        gsap.set(vals, { opacity: 0, y: 14 });
        const total = 1.5;
        const tl = gsap.timeline({ scrollTrigger: { trigger: rail, start: "top 82%", once: true } });
        tl.fromTo(".ti-rail", { scaleX: 0 }, { scaleX: 1, duration: total, ease: "power2.inOut", transformOrigin: "left center" }, 0).fromTo(
          ".ti-core",
          { scaleX: 0 },
          { scaleX: 1, duration: total * 0.5, ease: "power2.inOut", transformOrigin: "left center" },
          0,
        );
        marks.forEach((m, i) => {
          const at = (i / (marks.length - 1)) * total * 0.9;
          tl.to(m, { opacity: 1, scale: 1, duration: 0.45, ease: EASE.out3 }, at);
          tl.to(vals[i]!, { opacity: 1, y: 0, duration: 0.65, ease: EASE.out3 }, at + 0.05);
        });
      }

      const params = paramsRef.current;
      if (params) {
        gsap.fromTo(
          ".pr-row",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65, ease: EASE.out3, stagger: 0.09, scrollTrigger: { trigger: params, start: "top 85%", once: true } },
        );
      }

      gsap.utils.toArray<HTMLElement>(".decor").forEach((el) => {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%", once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="how-we-invest"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-[#F5F2EA] pb-40 pt-24 text-[#0B1017] sm:pb-48 md:pt-32"
    >
      <TopoLines />

      <div className="relative mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          {/* LEFT: heading, ticket scale, allocation + markets visual */}
          <div className="lg:col-span-7">
            <p data-rv className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8F7035] sm:text-[12px]">
              {H.eyebrow}
            </p>
            <h2
              id="how-heading"
              data-rv
              data-rv-delay="0.08"
              className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.7rem,1.7rem+3.8vw,5rem)] font-normal leading-[1.0] tracking-[-0.012em]"
            >
              {H.headingLead}
              <br />
              <em className="text-[#A9873F]">{H.headingEmphasis}</em>
            </h2>

            <div className="mt-14 md:mt-16">
              <h3 data-rv className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#3C444D]">
                {H.ticketLabel}
                <span aria-hidden className="h-px flex-1 bg-[#0B1017]/12" />
              </h3>

              <div ref={ticketRef} className="mt-8">
                <ul className="grid grid-cols-3">
                  {H.ticketPoints.map((pt, i) => (
                    <li key={pt.value} className={`ti-val flex flex-col ${ALIGN[i]}`}>
                      <span className="font-['Cormorant_Garamond',serif] text-[34px] font-medium leading-none sm:text-[54px]">{pt.value}</span>
                      <span className="mt-3 text-[9px] font-medium uppercase tracking-[0.18em] text-[#5A626B] sm:text-[10.5px] sm:tracking-[0.22em]">
                        {pt.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Rail: hairline with tick marks, a solid gold core range and a fading follow-on range. */}
                <div className="relative mt-8 h-4" aria-hidden>
                  <span className="ti-rail absolute left-0 right-0 top-1/2 h-px origin-left bg-[#0B1017]/20" />
                  <span className="ti-core absolute left-0 top-1/2 h-[2px] w-1/2 origin-left -translate-y-1/2 bg-[#A9873F]" />
                  <span className="absolute left-1/2 right-0 top-1/2 h-px bg-[linear-gradient(90deg,#A9873F,rgba(169,135,63,0.1))]" />
                  {Array.from({ length: 11 }, (_, k) => (
                    <span key={k} className="absolute top-1/2 h-[7px] w-px -translate-y-1/2 bg-[#0B1017]/15" style={{ left: `${k * 10}%` }} />
                  ))}
                  <span className="ti-mark absolute left-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-[#0B1017]" />
                  <span className="ti-mark absolute left-1/2 top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A9873F] bg-[#F5F2EA] shadow-[0_0_0_5px_rgba(169,135,63,0.12)]" />
                  <span className="ti-mark absolute right-0 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full bg-[#0B1017]" />
                </div>
              </div>

              <p data-rv className="mt-8 max-w-[520px] text-[15px] leading-[1.75] text-[#3C444D]">
                {H.ticketCopy}
              </p>
            </div>

            <div data-rv className="mt-14">
              <h3 className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#3C444D]">
                {H.allocationLabel}
                <span aria-hidden className="h-px flex-1 bg-[#0B1017]/12" />
              </h3>

              <div className="mt-7 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_240px]">
                <ul data-bars className="space-y-7">
                  {H.allocation.map((row, i) => (
                    <li key={row.code}>
                      <div className="flex items-baseline gap-4">
                        <span className="w-7 text-[11px] font-semibold tracking-[0.14em] text-[#8F7035]">{row.code}</span>
                        <span className="flex-1 text-[15.5px]">{row.name}</span>
                        <span className="font-['Cormorant_Garamond',serif] text-[28px] font-medium leading-none">{row.pct}%</span>
                      </div>
                      <div className="mt-3 h-[3px] bg-[#0B1017]/10 sm:ml-11">
                        <div
                          data-bar
                          data-rv-delay={i * 0.12}
                          className="h-full origin-left bg-[linear-gradient(90deg,#8F7035,#D8BD82)]"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <MarketsGlobe />
              </div>
            </div>
          </div>

          {/* RIGHT: intro + investment parameters */}
          <div className="lg:col-span-5 lg:pt-[7.5rem]">
            <p
              data-rv
              data-rv-delay="0.12"
              className="font-['Cormorant_Garamond',serif] text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] font-normal leading-[1.4] text-[#1D252E]"
            >
              {H.intro}
            </p>
            <span aria-hidden data-rule className="mt-8 block h-px w-14 origin-left bg-[#A9873F]" />

            <h3 data-rv className="mt-12 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#3C444D]">
              {H.parametersLabel}
              <span aria-hidden className="h-px flex-1 bg-[#0B1017]/12" />
            </h3>

            <dl ref={paramsRef} className="mt-3">
              {H.parameters.map((row) => {
                const Icon = ICONS[row.icon];
                return (
                  <div
                    key={row.label}
                    className="pr-row grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 border-b border-[#0B1017]/12 py-5 sm:grid-cols-[34px_112px_minmax(0,1fr)] sm:gap-x-5"
                  >
                    <span aria-hidden className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#A9873F]/55 text-[#8F7035]">
                      <Icon size={15} strokeWidth={1.3} />
                    </span>
                    <dt className="self-center text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#5A626B] sm:text-[11px]">{row.label}</dt>
                    <dd className="col-start-2 mt-1 text-[15px] leading-[1.6] sm:col-start-3 sm:mt-0 sm:self-center">{row.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
