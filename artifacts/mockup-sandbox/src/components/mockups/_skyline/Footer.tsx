import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUp, ChevronDown } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "./gsap";
import { companyInfo, crunchbaseUrl } from "./data";

const IMAGE = "/images/slide-2.webp";

const sideCopy = ["CAPITAL", "PERSPECTIVE", "PARTNERSHIPS", "LONG-TERM VALUE"];

interface FooterLink {
  label: string;
  href: string;
}

const aboutLinks: FooterLink[] = [
  { label: "About Skyline", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Governance", href: "/governance" },
  { label: "Contact", href: "/contact" },
];

const investmentLinks: FooterLink[] = [
  { label: "Investment Strategy", href: "/investment-strategy" },
  { label: "Investment Opportunities", href: "/investment-opportunities" },
  { label: "Investment Sectors", href: "/investment-sectors" },
  { label: "Strategic Partnerships", href: "/strategic-partnerships" },
  { label: "Investor Relations", href: "/investor-relations" },
];

const serviceLinks: FooterLink[] = [
  { label: "Management Services", href: "/management-services" },
  { label: "Strategic Advisory", href: "/strategic-advisory" },
];

const legalLinks: FooterLink[] = [
  { label: "Legal", href: "/legal" },
  { label: "Impressum", href: "/impressum" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Company Register", href: "/legal#company-register" },
];

const columns: { title: string; links: FooterLink[] }[] = [
  { title: "About", links: aboutLinks },
  { title: "Investments", links: investmentLinks },
  { title: "Services", links: serviceLinks },
  { title: "Legal", links: legalLinks },
];

const bottomLegalLinks: FooterLink[] = [
  { label: "Legal", href: "/legal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  return (
    <a
      href={link.href}
      className="group flex min-h-11 w-fit items-center font-[Inter] text-[13.5px] font-medium text-[#9DA5AE] lg:min-h-8 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B]"
    >
      <span className="relative">
        {link.label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#C7A86B] transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
  );
}

function FooterAccordion({ title, links }: { title: string; links: FooterLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-accordion-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border-b border-white/10 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-14 w-full items-center justify-between font-[Inter] text-[13px] font-semibold uppercase tracking-[0.1em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B]"
      >
        {title}
        <ChevronDown
          className={`text-[#C7A86B] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={16}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col items-start gap-1 pb-6">
            {links.map((link) => (
              <FooterLinkItem key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".ft-eyebrow", ".ft-heading-line", ".ft-copy", ".ft-cta", ".ft-side", ".ft-col", ".ft-bottom"],
          { opacity: 1, y: 0 },
        );
        gsap.set(".ft-rule", { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE.out3 },
        scrollTrigger: { trigger: rootRef.current, start: "top 88%" },
      });

      tl.fromTo(".ft-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".ft-heading-line",
          { opacity: 0, y: "60%" },
          { opacity: 1, y: "0%", duration: 0.9, stagger: 0.1 },
          0.1,
        )
        .fromTo(".ft-copy", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .fromTo(".ft-side", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.3)
        .fromTo(".ft-cta", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.5)
        .fromTo(
          ".ft-col",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.6,
        )
        .fromTo(".ft-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left" }, 0.2)
        .fromTo(".ft-bottom", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative bg-[#080A0D]">
      {/* Layer 1 — top editorial statement */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0" aria-hidden>
          <img src={IMAGE} alt="" className="size-full object-cover opacity-[0.08]" loading="lazy" />
          <div className="absolute inset-0 bg-[#080A0D]/95" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <p className="ft-eyebrow flex items-center gap-3 font-[Inter] text-[12px] font-semibold tracking-[0.16em] text-[#D8BD82]">
                <span className="ft-rule h-px w-8 bg-[#D8BD82]" aria-hidden />
                LOOKING AHEAD
              </p>
              <h2 className="mt-6 font-[Cormorant_Garamond] text-[clamp(34px,4vw,52px)] font-semibold leading-[1.02] text-white">
                <span className="block overflow-hidden pb-1">
                  <span className="ft-heading-line inline-block">Building value.</span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span className="ft-heading-line inline-block">
                    Creating what <em className="italic text-[#D8BD82]">comes next.</em>
                  </span>
                </span>
              </h2>
              <p className="ft-copy mt-6 max-w-[54ch] font-[Inter] text-[15.5px] leading-[1.55] text-[#9DA5AE]">
                Skyline Holding brings together capital, perspective and
                long-term partnerships to pursue meaningful opportunities
                across markets and industries.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/contact"
                  className="ft-cta group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C7A86B] px-6 py-3 font-[Inter] text-[13px] font-semibold text-[#12161B] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Start a Conversation
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
                <a
                  href="/investment-opportunities"
                  className="ft-cta group inline-flex min-h-11 items-center gap-2 font-[Inter] text-[13px] font-semibold text-white/85 transition-colors duration-300 hover:text-[#D8BD82]"
                >
                  Explore Investments
                  <ArrowRight
                    className="size-4 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:gap-1.5">
              {sideCopy.map((w) => (
                <span key={w} className="ft-side font-[Inter] text-[10.5px] font-semibold tracking-[0.14em] text-[#9DA5AE]">
                  {w}
                </span>
              ))}
              <span className="ft-side mt-2 h-px w-8 bg-[#C7A86B]" aria-hidden />
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2 — main navigation + company information */}
      <div className="relative border-b border-white/8">
        <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand / company column */}
            <div className="ft-col lg:col-span-4">
              <a href="/" className="inline-block transition-opacity duration-300 hover:opacity-85">
                <img
                  src="/images/skyline-logo.png"
                  alt="Skyline Holding"
                  width={2041}
                  height={333}
                  loading="lazy"
                  className="h-auto w-[190px] object-contain sm:w-[210px]"
                />
              </a>
              <p className="mt-5 font-[Inter] text-[13.5px] leading-[1.6] text-[#9DA5AE]">
                Independent capital. Long-term perspective.
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="font-[Inter] text-[13px] font-medium leading-[1.7] text-[#F5F2EA]/80">
                  {companyInfo.legalName}
                  <br />
                  Andorra la Vella
                  <br />
                  Principality of Andorra
                </p>
                <p className="mt-3 font-[Inter] text-[12px] leading-[1.6] text-[#9DA5AE]">
                  Registre de Comerç/Societats: {companyInfo.commercialRegister}
                </p>
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="font-[Inter] text-[13px] leading-[1.5] text-[#9DA5AE]">
                  Have an opportunity to discuss?
                </p>
                <a
                  href="/contact"
                  className="group mt-2 inline-flex min-h-11 items-center gap-1.5 font-[Inter] text-[13.5px] font-semibold text-white transition-colors duration-300 hover:text-[#D8BD82]"
                >
                  Get in Touch
                  <ArrowRight
                    className="size-3.5 text-[#C7A86B] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>
                <br />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="inline-flex min-h-11 items-center break-all font-[Inter] text-[13px] text-[#9DA5AE] transition-colors duration-300 hover:text-[#D8BD82]"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={crunchbaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Skyline Holding on Crunchbase"
                  title="Skyline Holding on Crunchbase"
                  className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 opacity-85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C7A86B] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B]"
                >
                  <img
                    src="/images/crunchbase-icon.jpg"
                    alt=""
                    width={500}
                    height={500}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </a>
              </div>
            </div>

            {/* Desktop link columns */}
            <div className="hidden lg:col-span-8 lg:grid lg:grid-cols-4 lg:gap-8">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title} className="ft-col">
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9DA5AE]">
                    {col.title}
                  </p>
                  <div className="mt-4 flex flex-col items-start gap-1">
                    {col.links.map((link) => (
                      <FooterLinkItem key={link.label} link={link} />
                    ))}
                  </div>
                </nav>
              ))}
            </div>

            {/* Mobile accordions */}
            <div className="lg:hidden">
              {columns.map((col) => (
                <FooterAccordion key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3 — bottom legal bar */}
      <div className="ft-bottom relative">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="font-[Inter] text-[12px] text-[#9DA5AE]/80">
            &copy; {year} {companyInfo.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {bottomLegalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex min-h-11 items-center font-[Inter] text-[12px] font-medium text-[#9DA5AE] transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B] sm:min-h-0"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#top"
              className="group flex min-h-11 items-center gap-1.5 font-[Inter] text-[12px] font-semibold text-[#9DA5AE] transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A86B] sm:min-h-0"
              aria-label="Back to top"
            >
              <span className="hidden sm:inline">Back to Top</span>
              <span className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#C7A86B] sm:size-auto sm:border-0 sm:p-0">
                <ArrowUp
                  className="text-[#C7A86B] transition-transform duration-300 group-hover:-translate-y-0.5"
                  size={14}
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
