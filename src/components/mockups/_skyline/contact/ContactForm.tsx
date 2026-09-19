import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { enquiryTypes } from "../data";

const IMAGE =
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1400&auto=format&fit=crop";

interface FormState {
  fullName: string;
  email: string;
  company: string;
  enquiryType: string;
  message: string;
}

const initialState: FormState = { fullName: "", email: "", company: "", enquiryType: "", message: "" };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const rootRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".cf-eyebrow", ".cf-heading-line", ".cf-copy", ".cf-field", ".cf-image"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      tl.fromTo(".cf-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".cf-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.12,
        )
        .fromTo(".cf-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(
          ".cf-field",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.45,
        )
        .fromTo(
          ".cf-image",
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.expo },
          0.3,
        );

      if (window.innerWidth >= 1024) {
        gsap.set(".cf-image img", { scale: 1.1 });
        gsap.to(".cf-image img", {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";
    if (!form.enquiryType) next.enquiryType = "Please select an enquiry type.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || status === "loading") return;
    setStatus("loading");
    // No backend is wired up yet; this simulates submission so the UI states
    // (loading / success) can be reviewed and connected to a real endpoint later.
    window.setTimeout(() => {
      setStatus("success");
    }, 1100);
  };

  const inputClass =
    "w-full min-h-[52px] rounded-[3px] border border-white/15 bg-white/[0.03] px-4 py-3 font-[Inter] text-[15px] text-[#F5F2EA] placeholder:text-[#9DA5AE]/60 outline-none transition-colors focus:border-[#C7A86B] focus:bg-white/[0.05]";
  const labelClass = "font-[Inter] text-[12.5px] font-medium text-[#F5F2EA]/80";
  const errorClass = "mt-1.5 font-[Inter] text-[12.5px] text-[#D8827A]";

  return (
    <section id="contact-form" ref={rootRef} className="relative overflow-hidden bg-[#0B1017] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="cf-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
              <span className="h-px w-8 bg-[#D8BD82]" aria-hidden />
              SEND US A MESSAGE
            </p>
            <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,3.6vw,48px)] font-semibold leading-[1.0] text-[#F8F7F3]">
              <span className="block overflow-hidden pb-1">
                <span className="cf-heading-line inline-block">Start the conversation.</span>
              </span>
            </h2>
            <p className="cf-copy mt-6 max-w-[52ch] font-[Inter] text-[16px] leading-[1.5] text-[#F5F2EA]/65">
              Complete the form below and a member of our team will review
              your enquiry.
            </p>

            {status === "success" ? (
              <div className="cf-field mt-10 flex items-start gap-4 border border-[#C7A86B]/30 bg-white/[0.03] p-6">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#D8BD82]" size={24} strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="font-[Cormorant_Garamond] text-[20px] font-semibold text-[#F8F7F3]">
                    Thank you for contacting Skyline.
                  </h3>
                  <p className="mt-2 font-[Inter] text-[14px] leading-[1.5] text-[#F5F2EA]/70">
                    Your message has been received and our team will
                    review your enquiry.
                  </p>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="cf-field">
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name <span className="text-[#D8BD82]">*</span>
                    </label>
                    <input
                      id="fullName"
                      className={`${inputClass} mt-2`}
                      value={form.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className={errorClass}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="cf-field">
                    <label htmlFor="email" className={labelClass}>
                      Email Address <span className="text-[#D8BD82]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`${inputClass} mt-2`}
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className={errorClass}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="cf-field">
                  <label htmlFor="company" className={labelClass}>
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    className={`${inputClass} mt-2`}
                    value={form.company}
                    onChange={(e) => setField("company", e.target.value)}
                  />
                </div>

                <div className="cf-field">
                  <label htmlFor="enquiryType" className={labelClass}>
                    Enquiry Type <span className="text-[#D8BD82]">*</span>
                  </label>
                  <select
                    id="enquiryType"
                    className={`${inputClass} mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%239DA5AE%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10 ${form.enquiryType ? "" : "text-[#9DA5AE]/60"}`}
                    value={form.enquiryType}
                    onChange={(e) => setField("enquiryType", e.target.value)}
                    aria-invalid={!!errors.enquiryType}
                    aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
                  >
                    <option value="" disabled>
                      Select an enquiry type
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="text-[#12161B]">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.enquiryType && (
                    <p id="enquiryType-error" className={errorClass}>
                      {errors.enquiryType}
                    </p>
                  )}
                </div>

                <div className="cf-field">
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-[#D8BD82]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`${inputClass} mt-2 resize-none`}
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className={errorClass}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="cf-field pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#C7A86B] px-7 py-3.5 font-[Inter] text-[13.5px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" strokeWidth={2} aria-hidden />
                        Sending&hellip;
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </>
                    )}
                  </button>
                  <p className="mt-4 font-[Inter] text-[12.5px] leading-[1.5] text-[#9DA5AE]">
                    By submitting this form, you acknowledge our{" "}
                    <a href="/legal#privacy-policy" className="underline decoration-[#9DA5AE]/40 hover:text-[#D8BD82] hover:decoration-[#D8BD82]">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-6">
            <div className="cf-image relative aspect-[4/3] w-full overflow-hidden bg-[#080A0D] sm:aspect-[16/11] lg:aspect-auto lg:h-[560px]">
              <img
                src={IMAGE}
                alt="A dramatic snow-capped mountain peak rising above a golden valley"
                className="size-full object-cover will-change-transform"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-6 left-6">
                <span className="font-[Cormorant_Garamond] text-[20px] font-semibold text-[#F8F7F3]">
                  Andorra
                </span>
                <p className="mt-1.5 font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                  A Global Perspective
                </p>
                <p className="font-[Inter] text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#D8BD82]">
                  A Local Presence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
