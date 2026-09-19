import { useEffect, useRef } from "react";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "../gsap";
import { storyMilestones } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1800&auto=format&fit=crop";

export function OurStory() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".os-eyebrow", ".os-heading-line", ".os-copy", ".os-quote", ".os-milestone", ".os-side"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".os-line", { scaleY: 1 });
        gsap.set(".os-title, .os-body", { opacity: 1 });
        gsap.set(".os-dot", { backgroundColor: "#C7A86B", borderColor: "#C7A86B" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });

      tl.fromTo(".os-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".os-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".os-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.35)
        .fromTo(".os-quote", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .fromTo(
          ".os-milestone",
          { opacity: 0, x: 14 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.18 },
          0.5,
        )
        .fromTo(".os-side", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.1);

      // Timeline line draws progressively as the milestone column scrolls
      // through view, rather than on a fixed entrance duration.
      gsap.set(".os-line", { scaleY: 0, transformOrigin: "top" });
      gsap.to(".os-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".os-timeline-col", start: "top 72%", end: "bottom 55%", scrub: 0.6 },
      });

      // Each milestone dims by default and brightens as the line reaches it,
      // so the reader's eye is drawn to the active point in the story.
      const milestones = gsap.utils.toArray<HTMLElement>(".os-milestone", rootRef.current);
      milestones.forEach((milestone) => {
        const dot = milestone.querySelector(".os-dot");
        const title = milestone.querySelector(".os-title");
        const body = milestone.querySelector(".os-body");
        gsap.set([title, body], { opacity: 0.5 });

        ScrollTrigger.create({
          trigger: milestone,
          start: "top 70%",
          end: "bottom 55%",
          onEnter: () => {
            gsap.to(title, { opacity: 1, duration: 0.45, ease: EASE.out3 });
            gsap.to(body, { opacity: 0.85, duration: 0.45, ease: EASE.out3 });
            gsap.to(dot, { backgroundColor: "#C7A86B", borderColor: "#C7A86B", scale: 1.15, duration: 0.4 });
          },
          onLeaveBack: () => {
            gsap.to(title, { opacity: 0.5, duration: 0.35, ease: EASE.out3 });
            gsap.to(body, { opacity: 0.5, duration: 0.35, ease: EASE.out3 });
            gsap.to(dot, { backgroundColor: "#0B1624", borderColor: "#C7A86B", scale: 1, duration: 0.35 });
          },
        });
      });

      if (window.innerWidth >= 1024) {
        gsap.set(".os-bg img", { scale: 1.08 });
        gsap.to(".os-bg img", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#0B1624] py-24 md:py-32">
      <div className="os-bg absolute inset-0" aria-hidden>
        <img src={IMAGE} alt="" className="size-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1624] via-[#0B1624]/85 to-[#0B1624]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1624] via-transparent to-[#0B1624]/60" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="os-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              OUR STORY
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(36px,4vw,52px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="os-heading-line inline-block">Built on perspective.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="os-heading-line inline-block">
                  Driven by <em className="italic text-[#D8BD82]">opportunity.</em>
                </span>
              </span>
            </h2>
            <p className="os-copy mt-7 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              Skyline Holding was created with a simple belief: capital is
              most powerful when combined with clear thinking, strong
              relationships and long-term ambition.
            </p>
            <p className="os-copy mt-4 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              From the beginning, our focus has been on identifying
              opportunities across different industries and markets where we
              can contribute more than investment alone.
            </p>
            <p className="os-copy mt-4 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65 md:text-[17px]">
              Today, Skyline continues to grow as a diversified holding
              company with interests across real assets, private markets,
              technology, healthcare, financial services and other strategic
              sectors.
            </p>

            <div className="os-quote mt-9 border-l border-[#D8BD82]/40 pl-5">
              <p className="font-[Cormorant_Garamond] text-[19px] italic leading-[1.35] text-[#F5F2EA]/80">
                &ldquo;Our story is still being written, through the
                businesses we support, the partnerships we build and the
                opportunities we pursue.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="os-timeline-col relative pl-8">
              <span
                className="os-line absolute left-0 top-1 h-full w-px origin-top bg-gradient-to-b from-[#C7A86B] via-[#C7A86B]/60 to-transparent"
                aria-hidden
              />
              <div className="flex flex-col gap-10">
                {storyMilestones.map((milestone) => (
                  <div key={milestone.label} className="os-milestone relative">
                    <span
                      className="os-dot absolute -left-[38px] top-1.5 size-2.5 rounded-full border border-[#C7A86B] bg-[#0B1624] transition-colors"
                      aria-hidden
                    />
                    <span className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#D8BD82]">
                      {milestone.label}
                    </span>
                    <h3 className="os-title mt-1.5 font-[Cormorant_Garamond] text-[24px] font-semibold text-[#F8F7F3]">
                      {milestone.title}
                    </h3>
                    <p className="os-body mt-1.5 max-w-[36ch] font-[Inter] text-[13.5px] leading-[1.5] text-[#9DA5AE]">
                      {milestone.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="os-side mt-16 hidden justify-end lg:flex">
          <span className="font-[Inter] text-[11px] font-medium uppercase tracking-[0.14em] text-[#9DA5AE]/70">
            Same Principles. A Brighter Tomorrow.
          </span>
        </div>
      </div>
    </section>
  );
}
