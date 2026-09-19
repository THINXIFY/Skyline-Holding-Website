import { useEffect, useRef } from "react";
import {
  ArrowRight,
  FileCheck,
  FileText,
  Lock,
  Scale,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { legalDocuments } from "../data";

const icons = [FileText, ScrollText, FileCheck, Scale, Lock, ShieldCheck];

export function KeyDocuments() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".kd-eyebrow", ".kd-heading-line", ".kd-copy", ".kd-doc"], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".kd-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".kd-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".kd-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".kd-doc",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="key-documents" ref={rootRef} className="relative bg-[#F8F7F3] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="kd-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
          <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
          KEY DOCUMENTS
        </p>
        <h2 className="mt-6 max-w-[560px] font-[Cormorant_Garamond] text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.0] text-[#12161B]">
          <span className="block overflow-hidden pb-1">
            <span className="kd-heading-line inline-block">Corporate and legal</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="kd-heading-line inline-block">information.</span>
          </span>
        </h2>
        <p className="kd-copy mt-5 max-w-[56ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/60">
          Access key legal and company documents relating to Skyline
          Holding, SLU.
        </p>

        <div className="mt-14 grid grid-cols-1 border-t border-[#12161B]/10 sm:grid-cols-2 lg:grid-cols-4">
          {legalDocuments.map((doc, index) => {
            const Icon = icons[index];
            return (
              <div
                key={doc.id}
                id={doc.id}
                className="kd-doc group relative border-b border-r-0 border-[#12161B]/10 p-7 transition-colors duration-400 hover:bg-white/60 sm:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                <span className="block h-px w-6 bg-[#C7A86B]/50 transition-all duration-400 group-hover:w-10 group-hover:bg-[#C7A86B]" aria-hidden />
                <Icon className="mt-4 text-[#C7A86B]" size={20} strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[19px] font-semibold text-[#12161B]">
                  {doc.title}
                </h3>
                <p className="mt-1.5 font-[Inter] text-[13px] leading-[1.5] text-[#12161B]/55">
                  {doc.body}
                </p>
                {doc.href ? (
                  <a
                    href={doc.href}
                    className="group/link mt-5 inline-flex min-h-11 items-center gap-1.5 font-[Inter] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#12161B] transition-colors hover:text-[#C7A86B]"
                  >
                    View
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </a>
                ) : (
                  <span className="mt-5 inline-flex items-center font-[Inter] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Available on Request
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
