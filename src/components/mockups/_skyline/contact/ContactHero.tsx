import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { HeroParticles } from "../HeroParticles";

const IMAGE =
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1800&auto=format&fit=crop";

const sideCopy = ["PEOPLE", "OPPORTUNITIES", "PARTNERSHIPS", "A BRIGHTER TOMORROW"];

export function ContactHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".ch-eyebrow", ".ch-heading-line", ".ch-copy", ".ch-cta", ".ch-side"], { opacity: 1, y: 0 });
        gsap.set(".ch-rule", { scaleX: 1 });
        gsap.set(".ch-image", { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out4 } });

      tl.fromTo(".ch-image", { scale: 1.04 }, { scale: 1, duration: 2.0, ease: EASE.out3 }, 0)
        .fromTo(
          ".ch-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: EASE.out3, transformOrigin: "left" },
          0.35,
        )
        .fromTo(".ch-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .fromTo(
          ".ch-heading-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .fromTo(".ch-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(".ch-cta", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.15)
        .fromTo(
          ".ch-side",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.0,
        );

      gsap.to(".ch-image", {
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
        <div className="ch-image absolute inset-0 will-change-transform">
          <img
            src={IMAGE}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: "60% center" }}
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/55 to-[#080A0D]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/88 via-[#080A0D]/30 to-transparent" />
      </div>

      <HeroParticles reduceMotion={reduceMotion} density={{ desktop: 22, tablet: 14, mobile: 8 }} />

      <div className="ch-side pointer-events-none absolute right-10 top-32 z-[4] hidden flex-col items-end gap-1.5 lg:flex xl:right-16">
        {sideCopy.map((w) => (
          <span key={w} className="font-[Inter] text-[10px] font-semibold tracking-[0.14em] text-[#F5F2EA]/70">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="max-w-[700px]">
          <p className="ch-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
            <span className="ch-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
            CONTACT
          </p>
          <h1 className="mt-6 font-[Cormorant_Garamond] text-[clamp(54px,6vw,82px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            <span className="block overflow-hidden pb-1">
              <span className="ch-heading-line inline-block">Let&rsquo;s build</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="ch-heading-line inline-block">
                what&rsquo;s next <em className="italic text-[#D8BD82]">together.</em>
              </span>
            </span>
          </h1>
          <p className="ch-copy mt-7 max-w-[54ch] font-[Inter] text-[17px] leading-[1.55] text-[#F5F2EA]/75 md:text-[19px]">
            We welcome the opportunity to connect with investors, partners
            and organizations who share our long-term perspective.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact-form"
              className="ch-cta group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Get in Touch
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href="#contact-form"
              className="ch-cta inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Inter] text-[13.5px] font-medium text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
