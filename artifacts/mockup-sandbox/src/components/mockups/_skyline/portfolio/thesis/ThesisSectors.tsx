import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap, EASE, prefersReducedMotion, ScrollTrigger } from "../../gsap";
import { SECTORS, SECTORS_SECTION as S } from "./thesisData";
import { SectorArt } from "./SectorArt";
import { useThesisReveal } from "./useThesisReveal";

/** Pinned storytelling needs a real desktop viewport; smaller screens use plain tabs. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";
/** Scroll distance of the pinned story, in viewport heights (about 0.6 per sector). */
const PIN_SCREENS = 2.4;

export function ThesisSectors() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const firstSwap = useRef(true);
  const firstArt = useRef(true);

  const [reduce] = useState(() => prefersReducedMotion());
  const [active, setActive] = useState(0); // drives tabs, artwork, counter, progress
  const [shown, setShown] = useState(0); // drives the text content (swaps after the outgoing fade)
  const [inView, setInView] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  useThesisReveal(rootRef);

  const sector = SECTORS[shown]!;
  const current = SECTORS[active]!;

  const goTo = (i: number) => {
    activeRef.current = i;
    setActive(i);
  };

  // ---- Desktop: pin the stage and advance the sector with scroll progress (no snapping, no scroll lock) ----
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mm = gsap.matchMedia();
    mm.add(PIN_QUERY, () => {
      stage.classList.add("is-pinned");
      const st = ScrollTrigger.create({
        trigger: stage,
        start: "top top+=88",
        end: () => `+=${Math.round(window.innerHeight * PIN_SCREENS)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(SECTORS.length - 1, Math.floor(self.progress * SECTORS.length));
          if (i !== activeRef.current) goTo(i);
        },
      });
      stRef.current = st;
      return () => {
        stRef.current = null;
        stage.classList.remove("is-pinned");
      };
    });
    return () => mm.revert();
  }, []);

  // artwork only plays while the panel is on screen
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---- Tab selection: instant tabs/art, plus (when pinned) move the page to that step ----
  const select = (index: number, focus = false) => {
    const st = stRef.current;
    goTo(index);
    if (st) {
      const y = st.start + ((index + 0.5) / SECTORS.length) * (st.end - st.start);
      window.scrollTo(0, y);
    }
    if (focus) tabRefs.current[index]?.focus({ preventScroll: true });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = SECTORS.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const target = next[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  // ---- Animated underline: measure the active tab, move the indicator ----
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[active];
      const list = tablistRef.current;
      if (!tab || !list) return;
      setIndicator({ x: tab.offsetLeft, w: tab.offsetWidth });
      // keep the active tab visible in the horizontally scrolling tab row (phones)
      if (list.scrollWidth > list.clientWidth + 2) {
        list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      }
    };
    measure();
    const list = tablistRef.current;
    const ro = new ResizeObserver(measure);
    if (list) ro.observe(list);
    void (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active, reduce]);

  // ---- Artwork cross-fade: outgoing fades first, incoming enters just after (opacity, 8-14px, scale) ----
  useLayoutEffect(() => {
    const layers = gsap.utils.toArray<HTMLElement>(".sa-layer", artRef.current);
    if (firstArt.current) {
      firstArt.current = false;
      return;
    }
    layers.forEach((layer, i) => {
      gsap.killTweensOf(layer);
      if (reduce) {
        gsap.set(layer, { opacity: i === active ? 1 : 0, y: 0, scale: 1 });
      } else if (i === active) {
        gsap.fromTo(layer, { opacity: 0, y: 12, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.3, ease: EASE.out3 });
      } else if (Number(layer.style.opacity || 0) > 0.01) {
        gsap.to(layer, { opacity: 0, y: -10, scale: 0.985, duration: 0.3, ease: "power2.in" });
      }
    });
  }, [active, reduce]);

  // ---- Content: outgoing fades quickly, text swaps, incoming staggers in (~0.6s) ----
  useEffect(() => {
    if (active === shown) return;
    if (reduce || !panelRef.current) {
      setShown(active);
      return;
    }
    const els = gsap.utils.toArray<HTMLElement>("[data-swap]", panelRef.current);
    const out = gsap.to(els, {
      opacity: 0,
      y: -10,
      duration: 0.26,
      ease: "power2.in",
      stagger: 0.015,
      overwrite: true,
      onComplete: () => setShown(active),
    });
    return () => {
      out.kill();
    };
  }, [active, shown, reduce]);

  useLayoutEffect(() => {
    if (firstSwap.current) {
      firstSwap.current = false;
      return;
    }
    if (reduce || !panelRef.current) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-swap]", panelRef.current);
    gsap.fromTo(els, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE.out3, stagger: 0.05, overwrite: true });
  }, [shown, reduce]);

  return (
    <section
      ref={rootRef}
      id="target-sectors"
      aria-labelledby="sectors-heading"
      className="relative bg-[linear-gradient(180deg,#0B1624_0%,#0A111B_55%,#0B1017_100%)] pb-24 pt-24 text-[#F5F2EA] md:pb-32 md:pt-32"
    >
      {/* depth: faint technical grid, a soft glow behind the artwork, a few gold micro-particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(199,168,107,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(199,168,107,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_55%,#000,transparent_72%)]" />
        <div className="absolute left-[-10%] top-[28%] h-[70%] w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(40,86,138,0.22),transparent_65%)]" />
        {[[12, 18], [86, 12], [92, 64], [6, 78], [48, 6], [64, 90]].map(([x, y], i) => (
          <span key={i} className="absolute h-[3px] w-[3px] rounded-full bg-[#D8BD82]/50" style={{ left: `${x}%`, top: `${y}%` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p data-rv className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#C7A86B] sm:text-[12px]">
              {S.eyebrow}
            </p>
            <h2
              id="sectors-heading"
              data-rv
              data-rv-delay="0.08"
              className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#F8F7F3]"
            >
              {S.headingLead}
              <br />
              <em className="text-[#D8BD82]">{S.headingEmphasis}</em>
            </h2>
          </div>
          <p data-rv data-rv-delay="0.16" className="max-w-[440px] text-[15px] leading-[1.8] text-[#F5F2EA]/70 lg:col-span-5">
            {S.copy}
          </p>
        </div>

        {/* The stage: pinned on desktop while the four sectors advance with scroll. */}
        <div ref={stageRef} className="th-stage mt-12 md:mt-14">
          <div className="border-b border-[#F5F2EA]/12">
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Target sectors"
              onKeyDown={onKeyDown}
              className="no-native-scrollbar relative -mx-6 flex overflow-x-auto px-6 md:mx-0 md:px-0 lg:grid lg:grid-cols-4"
            >
              {SECTORS.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`sector-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="sector-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className={`relative shrink-0 whitespace-nowrap px-5 py-5 text-center text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D8BD82] sm:px-8 sm:text-[12px] lg:px-4 ${
                      selected ? "text-[#D8BD82]" : "text-[#F5F2EA]/55 hover:text-[#F5F2EA]/85"
                    }`}
                  >
                    {s.tab} · {s.share}%
                  </button>
                );
              })}
              <span
                aria-hidden
                data-testid="tab-indicator"
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#C7A86B] transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)]"
                style={{ width: indicator.w, transform: `translateX(${indicator.x}px)` }}
              />
            </div>
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id="sector-panel"
            aria-labelledby={`sector-tab-${current.id}`}
            tabIndex={0}
            className="th-stage-panel mt-8 grid gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#D8BD82]/60 lg:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
          >
            {/* Artwork panel */}
            <div
              ref={artRef}
              className="th-art relative aspect-[4/3] w-full overflow-hidden border border-[#C7A86B]/20 bg-[#070C13] [background-image:linear-gradient(rgba(199,168,107,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(199,168,107,0.05)_1px,transparent_1px)] [background-size:32px_32px] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]"
            >
              {SECTORS.map((s, i) => (
                <div key={s.id} className="sa-layer absolute inset-0" data-sector={s.id} style={{ opacity: i === 0 ? 1 : 0 }}>
                  <SectorArt id={s.id} playing={i === active && inView} reduce={reduce} />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-[linear-gradient(0deg,rgba(7,12,19,0.92),rgba(7,12,19,0))] px-5 pb-5 pt-14 text-[12px] text-[#F5F2EA]/85">
                <span data-testid="art-caption">{current.caption}</span>
                <span data-testid="art-counter" className="tracking-[0.12em] text-[#F5F2EA]/60">
                  {String(active + 1).padStart(2, "0")} / {String(SECTORS.length).padStart(2, "0")}
                </span>
              </div>
              <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-[#F5F2EA]/10" />
              <span
                aria-hidden
                data-testid="art-progress"
                className="absolute bottom-0 left-0 h-[2px] bg-[#C7A86B] transition-[width] duration-700 ease-out"
                style={{ width: `${((active + 1) / SECTORS.length) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="flex min-h-0 flex-col justify-center">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <p data-swap className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C7A86B]">
                  {sector.eyebrow}
                </p>
                <p data-swap className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F5F2EA]/55 sm:text-[11px]">
                  Target share of capital · {sector.share}%
                </p>
              </div>

              <h3
                data-swap
                className="mt-5 font-['Cormorant_Garamond',serif] text-[clamp(2.6rem,1.8rem+2.8vw,4.4rem)] font-normal leading-[0.98] tracking-[-0.01em] text-[#F8F7F3]"
              >
                {sector.title}
              </h3>

              <p data-swap className="mt-6 max-w-[640px] text-[15px] leading-[1.8] text-[#F5F2EA]/72 sm:text-[16px]">
                {sector.description}
              </p>

              <div className="mt-9 grid gap-8 border-t border-[#F5F2EA]/10 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-14">
                <div>
                  <h4 data-swap className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#C7A86B] sm:text-[11px]">
                    What we look for
                  </h4>
                  <ul className="mt-4 space-y-3.5">
                    {sector.criteria.map((c) => (
                      <li key={c} data-swap className="flex items-start gap-3.5 text-[14.5px] leading-snug text-[#F5F2EA]/88">
                        <span aria-hidden className="mt-[7px] block h-[5px] w-[5px] shrink-0 rotate-45 bg-[#C7A86B]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-swap className="sm:border-l sm:border-[#F5F2EA]/10 sm:pl-10">
                  <h4 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#C7A86B] sm:text-[11px]">Stage</h4>
                  <p className="mt-4 font-['Cormorant_Garamond',serif] text-[clamp(1.7rem,1.3rem+1vw,2.3rem)] font-normal italic leading-[1.1] text-[#F8F7F3]">
                    {sector.stage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
