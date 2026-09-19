import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";

const themes = ["International Perspective", "Cross-Border Opportunity", "Long-Term Relationships", "Diverse Markets"];

export function GlobalPerspective() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".gp-eyebrow", ".gp-heading-line", ".gp-copy", ".gp-cta", ".gp-theme", ".gp-continent", ".gp-label"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".gp-route", { strokeDashoffset: 0 });
        gsap.set(".gp-marker", { scale: 1, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 68%" },
      });

      tl.fromTo(".gp-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".gp-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".gp-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(".gp-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
        .fromTo(".gp-continent", { opacity: 0 }, { opacity: 1, duration: 1.0 }, 0.3)
        .fromTo(
          ".gp-marker-origin",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          0.55,
        )
        .fromTo(
          ".gp-route",
          { strokeDashoffset: 700 },
          { strokeDashoffset: 0, duration: 1.3, stagger: 0.15, ease: EASE.expo },
          0.7,
        )
        .fromTo(
          ".gp-marker-dest",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, stagger: 0.15, ease: "back.out(2)" },
          1.0,
        )
        .fromTo(".gp-label", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 1.2)
        .fromTo(
          ".gp-theme",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          1.3,
        );

      gsap.to(".gp-map-wrap", {
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080A0D] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <p className="gp-eyebrow font-[Manrope] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              GLOBAL PERSPECTIVE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,60px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="gp-heading-line inline-block">European roots.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="gp-heading-line inline-block">
                  Global <em className="italic text-[#D8BD82]">perspective.</em>
                </span>
              </span>
            </h2>
            <p className="gp-copy mt-7 max-w-[40ch] font-[Manrope] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              From our European foundation, Skyline evaluates opportunities
              across markets, industries and regions with an international
              outlook and a long-term perspective.
            </p>
            <a
              href="#management-services"
              className="gp-cta group mt-8 inline-flex min-h-11 items-center gap-2 font-[Manrope] text-[13.5px] font-semibold text-[#F5F2EA]"
            >
              Explore Our Global View
              <ArrowRight
                className="size-4 text-[#D8BD82] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7">
              {themes.map((theme) => (
                <span
                  key={theme}
                  className="gp-theme font-[Manrope] text-[12px] font-medium uppercase tracking-[0.06em] text-[#9DA5AE]"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          <div className="gp-map-wrap lg:col-span-8">
            <svg
              className="h-auto w-full"
              viewBox="0 0 780 460"
              fill="none"
              role="img"
              aria-label="Abstract map illustrating Skyline Holding's international perspective"
            >
              <g opacity=".35">
                <path className="gp-continent" d="M22 156 C224 100 550 102 762 160" stroke="rgba(245,242,234,.12)" />
                <path className="gp-continent" d="M11 272 C219 228 552 231 773 285" stroke="rgba(245,242,234,.12)" />
                <path className="gp-continent" d="M31 389 C247 339 552 353 744 392" stroke="rgba(245,242,234,.12)" />
              </g>
              <path
                className="gp-continent"
                d="M62 157 L95 125 137 116 163 132 181 125 202 139 232 137 258 158 278 169 268 191 238 195 225 218 188 213 168 233 137 218 112 224 89 204 67 205 50 181Z"
                fill="rgba(245,242,234,.035)"
                stroke="rgba(245,242,234,.18)"
              />
              <path
                className="gp-continent"
                d="M287 164 L311 144 337 150 354 175 379 179 395 213 385 254 404 291 393 334 365 350 350 329 323 336 310 307 289 292 298 255 278 229 285 198Z"
                fill="rgba(245,242,234,.035)"
                stroke="rgba(245,242,234,.18)"
              />
              <path
                className="gp-continent"
                d="M404 165 L436 145 467 150 488 136 522 147 551 145 582 163 620 160 657 184 713 188 748 214 735 238 698 245 672 265 632 259 613 281 578 273 553 291 517 282 490 255 464 251 448 225 420 215Z"
                fill="rgba(245,242,234,.035)"
                stroke="rgba(245,242,234,.18)"
              />
              <path
                className="gp-continent"
                d="M574 308 L605 297 637 310 661 337 701 347 719 377 698 404 667 399 646 421 616 404 591 407 578 379 552 361 558 333Z"
                fill="rgba(245,242,234,.035)"
                stroke="rgba(245,242,234,.18)"
              />

              <path className="gp-route" d="M350 174 C430 136 585 165 686 210" stroke="#D8BD82" strokeWidth="1.1" strokeDasharray="4 6" pathLength={700} />
              <path className="gp-route" d="M350 174 C290 183 197 179 135 165" stroke="rgba(245,242,234,.55)" strokeWidth="1" strokeDasharray="4 6" pathLength={700} />
              <path className="gp-route" d="M350 174 C421 226 508 240 622 351" stroke="rgba(245,242,234,.55)" strokeWidth="1" strokeDasharray="4 6" pathLength={700} />

              <circle className="gp-marker gp-marker-origin" cx="350" cy="174" r="6" fill="#D8BD82" style={{ transformOrigin: "350px 174px" }} />
              <circle className="gp-marker gp-marker-dest" cx="686" cy="210" r="4" fill="#F5F2EA" style={{ transformOrigin: "686px 210px" }} />
              <circle className="gp-marker gp-marker-dest" cx="135" cy="165" r="4" fill="#F5F2EA" style={{ transformOrigin: "135px 165px" }} />
              <circle className="gp-marker gp-marker-dest" cx="622" cy="351" r="4" fill="#F5F2EA" style={{ transformOrigin: "622px 351px" }} />

              <text className="gp-label" x="363" y="162" fill="#D8BD82" fontFamily="Manrope" fontSize="9" letterSpacing="1.6">EUROPE</text>
              <text className="gp-label" x="675" y="197" fill="rgba(245,242,234,.55)" fontFamily="Manrope" fontSize="9" letterSpacing="1.6">ASIA-PACIFIC</text>
              <text className="gp-label" x="94" y="151" fill="rgba(245,242,234,.55)" fontFamily="Manrope" fontSize="9" letterSpacing="1.6">NORTH AMERICA</text>
              <text className="gp-label" x="600" y="374" fill="rgba(245,242,234,.55)" fontFamily="Manrope" fontSize="9" letterSpacing="1.6">MIDDLE EAST</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
