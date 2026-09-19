import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { contactChannels } from "../data";
import { AccessVerificationModal } from "../access/AccessVerificationModal";

const icons = [Mail, Phone, MapPin, MessageCircle];

export function WaysToConnect() {
  const rootRef = useRef<HTMLElement>(null);
  const [accessOpen, setAccessOpen] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".wc-eyebrow", ".wc-heading-line", ".wc-copy", ".wc-channel", ".wc-quote"], {
          opacity: 1,
          y: 0,
        });
        gsap.set(".wc-divider", { scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 72%" },
      });

      tl.fromTo(".wc-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".wc-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".wc-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".wc-channel",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.4,
        )
        .fromTo(
          ".wc-divider",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top" },
          0.5,
        )
        .fromTo(".wc-quote", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F5F2EA] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-7">
            <p className="wc-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#C7A86B]">
              <span className="h-px w-8 bg-[#C7A86B]" aria-hidden />
              WAYS TO CONNECT
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(40px,4.5vw,62px)] font-semibold leading-[1.0] text-[#12161B]">
              <span className="block overflow-hidden pb-1">
                <span className="wc-heading-line inline-block">Global perspective.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="wc-heading-line inline-block">
                  A <em className="not-italic text-[#C7A86B]">personal approach.</em>
                </span>
              </span>
            </h2>
            <p className="wc-copy mt-6 max-w-[56ch] font-[Inter] text-[16px] leading-[1.5] text-[#12161B]/65 md:text-[17px]">
              Whether you have a specific enquiry or would like to explore
              a potential partnership, our team is here to assist.
            </p>
            <button
              type="button"
              onClick={() => setAccessOpen(true)}
              aria-haspopup="dialog"
              className="wc-copy group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Request More Info
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </button>
          </div>
          <div className="lg:col-span-5">
            <div className="wc-quote border-l border-[#C7A86B]/40 pl-6">
              <p className="font-[Cormorant_Garamond] text-[22px] italic leading-[1.35] text-[#12161B]">
                &ldquo;Meaningful conversations often begin with a simple
                message.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-[#12161B]/10 pt-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {contactChannels.map((channel, index) => {
            const Icon = icons[index];
            return (
              <div key={channel.label} className="wc-channel relative pl-0 sm:pl-6 sm:first:pl-0">
                {index > 0 && (
                  <span
                    className="wc-divider absolute left-0 top-1 hidden h-full w-px origin-top bg-[#12161B]/10 sm:block"
                    aria-hidden
                  />
                )}
                <Icon className="text-[#C7A86B]" size={22} strokeWidth={1.4} aria-hidden />
                <p className="mt-4 font-[Inter] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C7A86B]">
                  {channel.label}
                </p>
                <h3 className="mt-2 whitespace-pre-line font-[Cormorant_Garamond] text-[20px] font-semibold leading-[1.2] text-[#12161B]">
                  {channel.title}
                </h3>
                <p className="mt-2 whitespace-pre-line font-[Inter] text-[13.5px] leading-[1.5] text-[#12161B]/60">
                  {channel.body}
                </p>
                {channel.cta && channel.href && (
                  <a
                    href={channel.href}
                    className="group mt-4 inline-flex min-h-11 items-center gap-2 font-[Inter] text-[12.5px] font-semibold text-[#12161B] underline decoration-[#12161B]/25 underline-offset-4 transition-colors hover:text-[#C7A86B] hover:decoration-[#C7A86B]"
                  >
                    {channel.cta}
                    <ArrowRight
                      className="size-3.5 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AccessVerificationModal open={accessOpen} onClose={() => setAccessOpen(false)} />
    </section>
  );
}
