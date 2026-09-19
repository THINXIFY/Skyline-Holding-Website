import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { leadershipTeam } from "../data";
import { InitialsPortrait } from "../InitialsPortrait";

export function LeadershipTeam() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".lt-eyebrow", ".lt-heading-line", ".lt-copy", ".lt-controls", ".lt-card"], {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".lt-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".lt-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".lt-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".lt-card",
          { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, stagger: 0.1, ease: EASE.expo },
          0.4,
        )
        .fromTo(".lt-controls", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    // Skip drag-initiation (and pointer capture) when the press starts on an
    // interactive descendant (e.g. "View Profile"): capturing the pointer
    // here would silently swallow that element's native click event.
    if ((e.target as HTMLElement).closest("button, a")) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current.active = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 20;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const openProfile = (index: number, trigger: HTMLButtonElement) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    lastTriggerRef.current = trigger;
    setSelectedIndex(index);
  };

  return (
    <section id="leadership-team" ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="lt-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              OUR LEADERSHIP
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="lt-heading-line inline-block">People who</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="lt-heading-line inline-block">
                  make a <em className="not-italic text-[#C7A86B]">difference.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-5">
            <p className="lt-copy max-w-[42ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#12161B]/65">
              Our team is united by a common purpose: to invest responsibly,
              build lasting partnerships and contribute to a stronger, more
              sustainable future.
            </p>
            <div className="lt-controls hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous leader"
                className="flex size-11 items-center justify-center rounded-full border border-[#12161B]/20 text-[#12161B] transition-colors hover:border-[#C7A86B] hover:text-[#C7A86B]"
              >
                <ArrowLeft size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next leader"
                className="flex size-11 items-center justify-center rounded-full border border-[#C7A86B] text-[#C7A86B] transition-colors hover:bg-[#C7A86B] hover:text-[#12161B]"
              >
                <ArrowRight size={16} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          tabIndex={0}
          role="group"
          aria-label="Leadership team, scrollable"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") scrollByCard(1);
            if (e.key === "ArrowLeft") scrollByCard(-1);
          }}
          className="no-native-scrollbar mt-14 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-2 active:cursor-grabbing md:mt-16"
        >
          {leadershipTeam.map((member, index) => (
            <div
              key={member.name}
              data-card
              className="lt-card group relative w-[280px] shrink-0 snap-start select-none overflow-hidden border border-[#12161B]/10 bg-[#080A0D] transition-colors duration-400 hover:border-[#C7A86B]/60 sm:w-[320px]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    draggable={false}
                    loading="lazy"
                  />
                ) : (
                  <InitialsPortrait name={member.name} />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/35 to-transparent transition-opacity duration-400 group-hover:opacity-90" />
              </div>

              <div className="relative p-6 transition-transform duration-400 group-hover:-translate-y-1">
                <span className="block h-px w-6 bg-[#C7A86B]/50 transition-all duration-400 group-hover:w-10 group-hover:bg-[#C7A86B]" aria-hidden />
                <h3 className="mt-4 font-[Cormorant_Garamond] text-[21px] font-semibold text-[#F8F7F3]">
                  {member.name}
                </h3>
                <p className="mt-1 font-[Inter] text-[12.5px] font-medium text-[#D8BD82]">{member.shortRole}</p>
                <p className="mt-3 font-[Inter] text-[12.5px] leading-[1.5] text-[#9DA5AE]">
                  {member.shortBio}
                </p>
                <button
                  type="button"
                  onClick={(e) => openProfile(index, e.currentTarget)}
                  className="group/btn mt-4 inline-flex min-h-11 items-center gap-2 font-[Inter] text-[12.5px] font-semibold text-[#F5F2EA]"
                >
                  View Profile
                  <ArrowRight
                    className="size-3.5 text-[#D8BD82] transition-transform duration-300 group-hover/btn:translate-x-1.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <ProfileDrawer
          member={leadershipTeam[selectedIndex]}
          onClose={() => {
            setSelectedIndex(null);
            lastTriggerRef.current?.focus();
          }}
        />
      )}
    </section>
  );
}

function ProfileDrawer({
  member,
  onClose,
}: {
  member: (typeof leadershipTeam)[number];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    closeRef.current?.focus();

    if (!reduce) {
      gsap.fromTo(".pd-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: EASE.out3 });
      gsap.fromTo(
        ".pd-panel",
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: EASE.out4 },
      );
      gsap.fromTo(
        ".pd-content",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.25, ease: EASE.out3 },
      );
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="profile-drawer-name">
      <div className="pd-backdrop absolute inset-0 bg-[#080A0D]/80 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div
        ref={panelRef}
        className="pd-panel absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto bg-[#0B1017] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
          {member.image ? (
            <img src={member.image} alt="" className="size-full object-cover" />
          ) : (
            <InitialsPortrait name={member.name} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1017] via-transparent to-[#0B1017]/20" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-[#080A0D]/70 text-[#F5F2EA] backdrop-blur-sm transition-colors hover:text-[#D8BD82]"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 px-8 py-9 md:px-10">
          <span className="pd-content block h-px w-8 bg-[#C7A86B]" aria-hidden />
          <h2 id="profile-drawer-name" className="pd-content mt-5 font-[Cormorant_Garamond] text-[32px] font-semibold text-[#F8F7F3]">
            {member.name}
          </h2>
          <p className="pd-content mt-1.5 font-[Inter] text-[13.5px] font-semibold uppercase tracking-[0.1em] text-[#D8BD82]">
            {member.role}
          </p>
          <p className="pd-content mt-6 font-[Inter] text-[15.5px] leading-[1.6] text-[#F5F2EA]/75">
            {member.shortBio}
          </p>
        </div>
      </div>
    </div>
  );
}
