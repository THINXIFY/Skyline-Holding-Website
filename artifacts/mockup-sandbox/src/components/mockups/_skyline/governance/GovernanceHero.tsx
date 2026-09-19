import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE =
  "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=1800&auto=format&fit=crop";

export function GovernanceHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".gh-eyebrow", ".gh-heading-line", ".gh-copy", ".gh-cta", ".gh-side", ".gh-mark"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".gh-rule", { scaleX: 1 });
        gsap.set(".gh-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".gh-image", { scale: 1.04 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".gh-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.35,
        )
        .fromTo(".gh-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .fromTo(
          ".gh-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .fromTo(".gh-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(".gh-cta", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 1.15)
        .fromTo(
          ".gh-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.0,
        )
        .fromTo(".gh-mark", { opacity: 0 }, { opacity: 0.5, duration: 1.0 }, 0.8);

      gsap.to(".gh-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#080A0D] pb-20 pt-32 md:pb-24"
    >
      <div className="absolute inset-0" aria-hidden>
        <div className="gh-image absolute inset-0 will-change-transform">
          <img
            src={IMAGE}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: "62% center" }}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/65 to-[#080A0D]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/90 via-[#080A0D]/45 to-transparent" />

        {/* Subtle "engraved wall" wordmark treatment, standing in for a
            physical Skyline-branded reception wall without fabricating
            signage into the photograph itself. */}
        <div className="gh-mark pointer-events-none absolute right-[8%] top-1/2 hidden -translate-y-1/2 text-right opacity-0 lg:block xl:right-[12%]">
          <span className="block font-[Cormorant_Garamond] text-[15px] font-medium tracking-[0.5em] text-[#F5F2EA]/50">
            SKYLINE
          </span>
          <span className="mt-1 block font-[Inter] text-[9px] font-semibold tracking-[0.45em] text-[#F5F2EA]/35">
            HOLDING
          </span>
        </div>
      </div>

      <HeroParticles reduceMotion={reduceMotion} density={{ desktop: 26, tablet: 17, mobile: 10 }} />

      <div className="gh-side pointer-events-none absolute right-10 top-32 z-[4] hidden flex-col items-end gap-1.5 lg:flex xl:right-16">
        {["INTEGRITY", "DISCIPLINE", "RESPONSIBILITY", "LONG-TERM PERSPECTIVE"].map((w) => (
          <span key={w} className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[720px]">
          <p className="gh-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="gh-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            GOVERNANCE
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(54px,6vw,82px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="gh-heading-line inline-block">Strong governance.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="gh-heading-line inline-block">
                Enduring <em className="italic text-[#D8BD82]">confidence.</em>
              </span>
            </span>
          </h1>
          <p className="gh-copy mt-7 max-w-[56ch] font-[Inter] text-[17px] leading-[1.55] text-[#F5F2EA]/75 md:text-[19px]">
            Skyline&rsquo;s approach to governance is built around
            accountability, disciplined decision-making, responsible
            ownership and the long-term protection of value.
          </p>
          <div className="gh-cta mt-9">
            <a
              href="#corporate-governance"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Our Governance Approach
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
