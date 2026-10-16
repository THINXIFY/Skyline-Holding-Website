import { useLayoutEffect, useRef } from "react";
import { FileText, Layers, Search, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { gsap, EASE } from "../../gsap";
import { PROCESS as PR } from "./thesisDataLower";
import { useThesisReveal } from "./useThesisReveal";

const ICONS: Record<(typeof PR.stages)[number]["icon"], LucideIcon> = {
  sourcing: Users,
  screening: FileText,
  diligence: Search,
  committee: Layers,
  value: TrendingUp,
};

export function ThesisProcess() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  useThesisReveal(rootRef);

  // Timeline: the gold line draws (left -> right on desktop, top -> bottom on small screens),
  // and each node lights up with its stage content as the line reaches it. Plays once.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".tl-line", { scaleX: 1, scaleY: 1 });
        gsap.set(".tl-node, .tl-item", { opacity: 1, y: 0, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stages = gsap.utils.toArray<HTMLElement>(".tl-item", list);
        const nodes = gsap.utils.toArray<HTMLElement>(".tl-node", list);
        const horizontal = window.matchMedia("(min-width: 1024px)").matches;
        const lineFrom = horizontal ? { scaleX: 0 } : { scaleY: 0 };
        const lineTo = horizontal ? { scaleX: 1 } : { scaleY: 1 };
        const total = 1.9;

        gsap.set(nodes, { opacity: 0.35, scale: 0.88 });
        gsap.set(stages, { opacity: 0, y: 16 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: list, start: "top 78%", once: true },
        });
        tl.fromTo(
          ".tl-line",
          { ...lineFrom, transformOrigin: horizontal ? "left center" : "center top" },
          { ...lineTo, duration: total, ease: "power2.inOut" },
          0,
        );
        nodes.forEach((node, i) => {
          const at = (i / (nodes.length - 1)) * total * 0.92;
          tl.to(node, { opacity: 1, scale: 1, duration: 0.5, ease: EASE.out3 }, at);
          tl.to(stages[i]!, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out3 }, at + 0.1);
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-[#F8F7F3] pb-16 pt-24 text-[#0B1017] md:pb-20 md:pt-28"
    >
      <div className="mx-auto max-w-[1464px] px-6 md:px-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-9">
            <p data-rv className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8F7035] sm:text-[12px]">
              {PR.eyebrow}
            </p>
            <h2
              id="process-heading"
              data-rv
              data-rv-delay="0.08"
              className="mt-6 font-['Cormorant_Garamond',serif] text-[clamp(2.4rem,1.5rem+2.6vw,3.5rem)] font-normal leading-[1.04] tracking-[-0.01em]"
            >
              {PR.headingLead}
              <br />
              <em className="text-[#A9873F]">{PR.headingEmphasis}</em>
            </h2>
          </div>
          <p data-rv data-rv-delay="0.16" className="max-w-[440px] text-[15px] leading-[1.8] text-[#3C444D] lg:col-span-3">
            {PR.copy}
          </p>
        </div>

        <ol ref={listRef} className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-5 lg:gap-0">
          {/* The gold line: vertical on small screens, horizontal (through the node centres) on desktop. */}
          <span
            aria-hidden
            className="tl-line absolute bottom-0 left-[21px] top-[22px] w-px bg-[linear-gradient(180deg,#A9873F_0%,#A9873F_85%,rgba(169,135,63,0)_100%)] lg:bottom-auto lg:left-[22px] lg:right-[calc(20%-22px)] lg:top-[22px] lg:h-px lg:w-auto lg:bg-[#A9873F]"
          />

          {PR.stages.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.title} className="relative pl-16 lg:pl-0 lg:pr-8">
                <span className="tl-node absolute left-0 top-0 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#A9873F] bg-[#F8F7F3] text-[#8F7035] lg:static">
                  <Icon size={18} strokeWidth={1.3} aria-hidden />
                </span>
                <div className="tl-item lg:mt-7">
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-[#8F7035] sm:text-[11px]">{s.weeks}</p>
                  <h3 className="mt-2 font-['Cormorant_Garamond',serif] text-[24px] font-medium leading-tight">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#3C444D]">{s.body}</p>
                </div>
                <span className="sr-only">Stage {i + 1} of {PR.stages.length}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
