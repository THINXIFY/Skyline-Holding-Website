import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, Layers, Repeat, Target } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";

const focusAreas = [
  { title: "Multi-Asset Strategy", icon: Layers },
  { title: "Active Management", icon: Repeat },
  { title: "Diversification", icon: BarChart3 },
  { title: "Long-Term Allocation", icon: Target },
];

export function AssetManagement() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".am-eyebrow", ".am-heading-line", ".am-copy", ".am-focus", ".am-cta", ".am-path"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".am-line", { strokeDashoffset: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".am-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".am-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".am-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(
          ".am-focus",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
          0.55,
        )
        .fromTo(".am-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85)
        .fromTo(
          ".am-path",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          0.3,
        )
        .fromTo(
          ".am-line",
          { strokeDashoffset: 900 },
          { strokeDashoffset: 0, duration: 2.0, ease: "power2.inOut", stagger: 0.15 },
          0.4,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="asset-management" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="am-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              MANAGEMENT SERVICES
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="am-heading-line inline-block">Asset Management</span>
              </span>
            </h2>
            <p className="am-copy mt-6 max-w-[48ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              Disciplined management across asset classes, markets and
              strategies with a focus on resilience, quality and long-term
              performance.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
              {focusAreas.map((area) => (
                <div key={area.title} className="am-focus group flex items-center gap-3">
                  <area.icon
                    className="text-[#D8BD82] transition-transform duration-400 group-hover:-translate-y-0.5"
                    size={19}
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  <span className="font-[Inter] text-[13.5px] font-medium text-[#F5F2EA]/85">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="am-cta group mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Asset Management
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>

          <div className="am-path lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#080A0D] sm:aspect-[16/11] lg:aspect-auto lg:h-[460px]">
              <svg
                viewBox="0 0 560 400"
                className="size-full"
                fill="none"
                aria-hidden
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  className="am-line"
                  d="M20 300 C 120 280, 160 200, 240 210 S 360 140, 420 150 S 500 90, 540 60"
                  stroke="#C7A86B"
                  strokeWidth="1.5"
                  strokeDasharray="900"
                  opacity="0.9"
                />
                <path
                  className="am-line"
                  d="M20 340 C 100 330, 180 300, 260 290 S 400 260, 460 230 S 520 200, 540 190"
                  stroke="#D8BD82"
                  strokeWidth="1"
                  strokeDasharray="900"
                  opacity="0.5"
                />
                <path
                  className="am-line"
                  d="M20 220 C 90 240, 170 260, 250 250 S 380 220, 440 200 S 510 170, 540 150"
                  stroke="#9DA5AE"
                  strokeWidth="1"
                  strokeDasharray="900"
                  opacity="0.35"
                />
                {[
                  [20, 300],
                  [240, 210],
                  [420, 150],
                  [540, 60],
                ].map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#D8BD82" opacity="0.9" />
                ))}
              </svg>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080A0D] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
