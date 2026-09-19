import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { HeroParticles } from "./HeroParticles";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroSlide {
  id: string;
  image: string;
  objectPosition: string;
  eyebrow: string;
  headlineLines: [ReactNode, ReactNode];
  copy: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  supportLine?: string;
  tags?: string[];
}

const AUTOPLAY_MS = 4000;
const OUT_DURATION = 0.55;
const IMAGE_DURATION = 1.2;
const INTERACTION_PAUSE_MS = 5200;

const slides: HeroSlide[] = [
  {
    id: "positioning",
    image: "/images/slide-1.webp",
    objectPosition: "64% center",
    eyebrow: "PERSPECTIVE CREATES OPPORTUNITY",
    headlineLines: [
      "Building value",
      <>
        beyond <em className="italic text-[#D8BD82]">the horizon.</em>
      </>,
    ],
    copy: "Skyline Holding is an independent investment holding company focused on long-term value across businesses, real assets and transformative industries.",
    primaryCta: { label: "Our Approach", href: "#investment-focus" },
    secondaryCta: { label: "About Skyline", href: "#about" },
    supportLine: "Capital. Strategy. Perspective.",
  },
  {
    id: "investment-focus",
    image: "/images/slide-2.webp",
    objectPosition: "60% center",
    eyebrow: "WHERE WE INVEST",
    headlineLines: [
      "Capital directed toward",
      <>
        enduring <em className="italic text-[#D8BD82]">opportunity.</em>
      </>,
    ],
    copy: "We invest selectively across real assets, private markets and transformative industries where strong fundamentals and long-term relevance can create lasting value.",
    primaryCta: { label: "Explore Investment Strategy", href: "#investment-focus" },
    secondaryCta: { label: "About Skyline", href: "#about" },
    tags: ["Real Assets", "Private Equity", "Technology & AI", "Strategic Resources"],
  },
  {
    id: "beyond-capital",
    image: "/images/slide-3.webp",
    objectPosition: "58% center",
    eyebrow: "BEYOND CAPITAL",
    headlineLines: [
      "More than capital.",
      <>
        A platform for <em className="italic text-[#D8BD82]">value creation.</em>
      </>,
    ],
    copy: "Skyline combines capital, strategy, technology, relationships and execution to help businesses and partners build stronger foundations and long-term value.",
    primaryCta: { label: "How We Create Value", href: "#strategic-advisory" },
    secondaryCta: { label: "Start a Conversation", href: "#strategic-advisory" },
    tags: ["Strategy", "Technology", "Networks", "Execution"],
  },
];

export function Hero() {
  const [reduceMotion] = useState(() => prefersReducedMotion());
  const rootRef = useRef<HTMLElement>(null);
  const imageWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const progressFillRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [tabHidden, setTabHidden] = useState(false);
  const [interactionPause, setInteractionPause] = useState(false);
  const animatingRef = useRef(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Autoplay intentionally keeps running on hover; only tab-visibility and a
  // brief post-interaction pause interrupt it.
  const paused = reduceMotion || tabHidden || interactionPause;
  const slide = slides[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const playIncoming = useCallback(() => {
    if (reduceMotion) {
      gsap.set(
        [eyebrowRef.current, ...lineRefs.current, copyRef.current, ctaRef.current, metaRef.current],
        { opacity: 1, y: 0, clearProps: "transform" },
      );
      lineRefs.current.forEach((el) => el && gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" }));
      animatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: EASE.out3 },
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    tl.fromTo(eyebrowRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6 })
      .fromTo(
        lineRefs.current,
        { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", y: "18%" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          y: "0%",
          duration: 0.85,
          stagger: 0.11,
          ease: EASE.expo,
        },
        0.12,
      )
      .fromTo(copyRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.42)
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.56)
      .fromTo(metaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.68);

    if (metaRef.current) {
      const tags = metaRef.current.querySelectorAll("[data-hero-tag]");
      if (tags.length) {
        tl.fromTo(
          tags,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          0.72,
        );
      }
    }
  }, [reduceMotion]);

  useEffect(() => {
    playIncoming();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, playIncoming]);

  const goTo = useCallback(
    (nextIndex: number) => {
      const current = activeIndexRef.current;
      const normalized = ((nextIndex % slides.length) + slides.length) % slides.length;
      if (normalized === current || animatingRef.current) return;
      animatingRef.current = true;

      const currentImage = imageWrapRefs.current[current];
      const nextImage = imageWrapRefs.current[normalized];

      if (reduceMotion) {
        if (currentImage) gsap.set(currentImage, { opacity: 0 });
        if (nextImage) gsap.set(nextImage, { opacity: 1, scale: 1 });
        setActiveIndex(normalized);
        return;
      }

      const textTargets = [
        eyebrowRef.current,
        ...lineRefs.current,
        copyRef.current,
        ctaRef.current,
        metaRef.current,
      ].filter(Boolean);

      const tl = gsap.timeline();
      tl.to(textTargets, {
        opacity: 0,
        y: -8,
        duration: OUT_DURATION,
        ease: EASE.out3,
        stagger: 0.015,
      });

      if (currentImage) {
        tl.to(currentImage, { opacity: 0, duration: IMAGE_DURATION, ease: EASE.out3 }, 0);
      }
      if (nextImage) {
        tl.fromTo(
          nextImage,
          { opacity: 0, scale: 1.025 },
          { opacity: 1, scale: 1, duration: IMAGE_DURATION, ease: EASE.out4 },
          0,
        );
      }

      tl.call(() => setActiveIndex(normalized), [], OUT_DURATION);
    },
    [reduceMotion],
  );

  const registerInteraction = useCallback(() => {
    setInteractionPause(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => setInteractionPause(false), INTERACTION_PAUSE_MS);
  }, []);

  const handlePrev = useCallback(() => {
    registerInteraction();
    goTo(activeIndexRef.current - 1);
  }, [goTo, registerInteraction]);

  const handleNext = useCallback(() => {
    registerInteraction();
    goTo(activeIndexRef.current + 1);
  }, [goTo, registerInteraction]);

  const handleSelect = useCallback(
    (index: number) => {
      registerInteraction();
      goTo(index);
    },
    [goTo, registerInteraction],
  );

  useEffect(
    () => () => {
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    },
    [],
  );

  // Autoplay trigger: a self-sustaining interval independent of the transition's
  // internal timing, so the cadence is a precise, consistent AUTOPLAY_MS rather
  // than drifting with each slide's out-transition delay.
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      goTo(activeIndexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [paused, goTo]);

  // Progress-bar fill: purely visual, synced to whichever slide is displayed.
  useEffect(() => {
    if (paused) return;
    const fill = progressFillRefs.current[activeIndex];
    if (!fill) return;
    gsap.set(fill, { scaleX: 0 });
    const progressTween = gsap.to(fill, {
      scaleX: 1,
      duration: AUTOPLAY_MS / 1000,
      ease: "none",
    });
    return () => {
      progressTween.kill();
    };
  }, [activeIndex, paused]);

  useEffect(() => {
    progressFillRefs.current.forEach((fill, index) => {
      if (!fill) return;
      if (index < activeIndex) gsap.set(fill, { scaleX: 1 });
      else if (index > activeIndex) gsap.set(fill, { scaleX: 0 });
    });
  }, [activeIndex]);

  // Restrained scroll parallax on the background layer only; content stays put.
  useEffect(() => {
    if (reduceMotion || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-slide-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (event: ReactTouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 48) return;
    registerInteraction();
    if (deltaX < 0) goTo(activeIndexRef.current + 1);
    else goTo(activeIndexRef.current - 1);
  };

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    }
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#080A0D]"
      aria-roledescription="carousel"
      aria-label="Skyline Holding introduction slides"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((s, index) => (
        <div
          key={s.id}
          ref={(el) => {
            imageWrapRefs.current[index] = el;
          }}
          className="absolute inset-0"
          style={{ opacity: index === 0 ? 1 : 0 }}
          aria-hidden={index !== activeIndex}
        >
          <img
            src={s.image}
            alt=""
            className="hero-slide-image absolute inset-0 size-full object-cover"
            style={{ objectPosition: s.objectPosition }}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/95 via-[#080A0D]/60 to-[#080A0D]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D]/85 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,transparent_55%,rgba(8,10,13,.5)_100%)]" />
        </div>
      ))}

      <HeroParticles
        reduceMotion={reduceMotion}
        density={{ desktop: 48, tablet: 32, mobile: 18 }}
      />

      {/* Restrained architectural side detail: one gold line, not a repeated corner-text motif. */}
      <div
        className="pointer-events-none absolute right-10 top-1/2 z-[4] hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:right-16"
        aria-hidden
      >
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-[#C7A86B]/70 to-transparent" />
        <span className="font-[Manrope] text-[11px] tracking-[0.35em] text-[#D8BD82]/70 [writing-mode:vertical-rl]">
          PERSPECTIVE
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-[#C7A86B]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-6 pb-20 pt-28 md:px-10 md:pb-24 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-28">
        <div key={slide.id} className="max-w-[820px]">
          <p
            ref={eyebrowRef}
            className="mb-6 font-[Manrope] text-[12px] font-semibold tracking-[0.32em] text-[#D8BD82]"
          >
            {slide.eyebrow}
          </p>

          <h1 className="font-[Cormorant_Garamond] text-[clamp(54px,6vw,82px)] font-semibold leading-[0.98] text-[#F8F7F3]">
            {slide.headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <span
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="inline-block"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={copyRef}
            className="mt-8 max-w-[52ch] font-[Manrope] text-[17px] leading-[1.55] text-[#F5F2EA]/80 md:text-[19px]"
          >
            {slide.copy}
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={slide.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Manrope] text-[13.5px] font-semibold tracking-[0.02em] text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              {slide.primaryCta.label}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </a>
            <a
              href={slide.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F2EA]/35 px-7 py-3.5 font-[Manrope] text-[13.5px] font-medium tracking-[0.02em] text-[#F5F2EA] transition-colors duration-300 hover:border-[#F5F2EA]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7A86B]"
            >
              {slide.secondaryCta.label}
            </a>
          </div>

          <div ref={metaRef} className="mt-10 border-t border-white/10 pt-6">
            {slide.supportLine ? (
              <p className="font-[Manrope] text-[13px] tracking-[0.08em] text-[#9DA5AE]">
                {slide.supportLine}
              </p>
            ) : (
              <div className="flex flex-wrap divide-x divide-white/15 font-[Manrope] text-[11px] uppercase tracking-[0.18em] text-[#9DA5AE]">
                {slide.tags?.map((tag) => (
                  <span key={tag} data-hero-tag className="px-4 first:pl-0">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5 lg:mb-1">
          <div className="hidden items-center gap-2 sm:flex" role="tablist" aria-label="Slide progress">
            {slides.map((s, index) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to slide ${index + 1}: ${s.eyebrow}`}
                onClick={() => handleSelect(index)}
                className="h-1 w-9 overflow-hidden rounded-full bg-white/15"
              >
                <span
                  ref={(el) => {
                    progressFillRefs.current[index] = el;
                  }}
                  className="block h-full w-full origin-left scale-x-0 rounded-full bg-[#D8BD82]"
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C7A86B] text-[#D8BD82] transition-colors hover:bg-[#C7A86B] hover:text-[#12161B]"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C7A86B] text-[#D8BD82] transition-colors hover:bg-[#C7A86B] hover:text-[#12161B]"
            >
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>

          <span
            className="font-[Manrope] text-[11px] uppercase tracking-[0.2em] text-[#9DA5AE]"
            aria-live="polite"
          >
            0{activeIndex + 1} / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
