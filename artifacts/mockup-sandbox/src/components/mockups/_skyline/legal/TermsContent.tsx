import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "../gsap";
import { companyInfo } from "../data";
import { LegalToc, type TocItem } from "./LegalToc";
import { LegalSection, LegalList } from "./LegalSection";

const toc: TocItem[] = [
  { id: "about-skyline-holding", label: "1. About Skyline Holding" },
  { id: "website-purpose", label: "2. Website Purpose" },
  { id: "investment-opportunities", label: "3. Investment Opportunities" },
  { id: "investor-engagement", label: "4. Investor Engagement" },
  { id: "accuracy-of-information", label: "5. Accuracy of Information" },
  { id: "third-party-information", label: "6. Third-Party Information" },
  { id: "intellectual-property", label: "7. Intellectual Property" },
  { id: "acceptable-use", label: "8. Acceptable Use" },
  { id: "confidentiality-and-business-discussions", label: "9. Confidentiality & Discussions" },
  { id: "privacy", label: "10. Privacy" },
  { id: "changes-to-terms", label: "11. Changes to Terms" },
  { id: "company-information", label: "12. Company Information" },
];

export function TermsContent() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".ls-section", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".ls-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE.out3, scrollTrigger: { trigger: el, start: "top 88%" } },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#F5F2EA] py-20 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <LegalToc items={toc} />

          <div className="border border-[#12161B]/8 bg-white/40 px-6 py-8 md:px-10 md:py-10 lg:col-span-9 lg:max-w-[800px]">
            <LegalSection id="about-skyline-holding" number="01" title="About Skyline Holding">
              <p>
                Skyline Holding, SLU is an investment and solicitation
                company engaged in investment activities, strategic
                partnerships, investor relations and capital
                opportunities across selected sectors and markets.
              </p>
            </LegalSection>

            <LegalSection id="website-purpose" number="02" title="Website Purpose">
              <p>This website may provide:</p>
              <LegalList
                items={[
                  "Company information",
                  "Investment opportunities",
                  "Investor information",
                  "Strategic partnership opportunities",
                  "Management services",
                  "Advisory services",
                  "Corporate and legal information",
                ]}
              />
            </LegalSection>

            <LegalSection id="investment-opportunities" number="03" title="Investment Opportunities">
              <p>
                Skyline Holding may identify, present and facilitate
                investment opportunities, strategic partnerships and
                capital relationships with eligible investors, family
                offices, institutions and strategic capital partners.
              </p>
              <p>
                Specific investment opportunities, terms and conditions
                may be subject to separate agreements, offering
                materials, contractual documentation, eligibility
                requirements and due diligence.
              </p>
            </LegalSection>

            <LegalSection id="investor-engagement" number="04" title="Investor Engagement">
              <p>
                Submitting an enquiry or otherwise communicating with
                Skyline Holding may lead to further discussions relating
                to:
              </p>
              <LegalList
                items={[
                  "Investments",
                  "Partnerships",
                  "Capital opportunities",
                  "Investor relations",
                  "Strategic transactions",
                ]}
              />
            </LegalSection>

            <LegalSection id="accuracy-of-information" number="05" title="Accuracy of Information">
              <p>
                Skyline Holding aims to keep information on this website
                current and accurate. Website content may change, and
                specific investment opportunities should be evaluated
                using the relevant transaction documentation rather than
                general website content.
              </p>
            </LegalSection>

            <LegalSection id="third-party-information" number="06" title="Third-Party Information">
              <p>
                This website may reference or link to external websites,
                third-party profiles, market information or publications
                for convenience. Skyline Holding is not responsible for
                the accuracy or content of third-party information.
              </p>
            </LegalSection>

            <LegalSection id="intellectual-property" number="07" title="Intellectual Property">
              <p>
                The content of this website, including text, graphics,
                branding and design, is owned by or licensed to Skyline
                Holding, SLU unless otherwise stated. No content may be
                reproduced or used for commercial purposes without prior
                written permission.
              </p>
            </LegalSection>

            <LegalSection id="acceptable-use" number="08" title="Acceptable Use">
              <p>When using this website, you must not:</p>
              <LegalList
                items={[
                  "Misuse the website or attempt unauthorized access",
                  "Interfere with website security or functionality",
                  "Introduce viruses, malware or other harmful code",
                  "Scrape or copy content unlawfully",
                  "Use the website for any unlawful purpose",
                ]}
              />
            </LegalSection>

            <LegalSection
              id="confidentiality-and-business-discussions"
              number="09"
              title="Confidentiality & Business Discussions"
            >
              <p>
                Certain investment, partnership or transaction
                discussions may be subject to separate confidentiality
                agreements or contractual terms where applicable.
                Submitting information through this website does not, by
                itself, create an advisory, fiduciary or contractual
                relationship with Skyline Holding; such relationships
                will only arise where separately agreed in writing.
              </p>
            </LegalSection>

            <LegalSection id="privacy" number="10" title="Privacy">
              <p>
                Our use of information is described in our{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-[#12161B] underline decoration-[#C7A86B]/50 underline-offset-4 transition-colors hover:text-[#C7A86B]"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection id="changes-to-terms" number="11" title="Changes to Terms">
              <p>
                We may update these Terms &amp; Conditions from time to
                time. Continued use of the website following any changes
                constitutes acceptance of the current version.
              </p>
            </LegalSection>

            <LegalSection id="company-information" number="12" title="Company Information">
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 border border-[#12161B]/10 bg-white/60 px-6 py-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <p className="font-[Inter] text-[14px] font-semibold text-[#12161B]">
                    {companyInfo.legalName}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Registered Address
                  </p>
                  <p className="mt-1 whitespace-pre-line font-[Inter] text-[13.5px] leading-[1.6] text-[#12161B]/80">
                    {companyInfo.registeredAddress}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Registre de Comerç/Societats
                  </p>
                  <p className="mt-1 font-[Inter] text-[13.5px] text-[#12161B]/80">
                    {companyInfo.commercialRegister}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Registry ID
                  </p>
                  <p className="mt-1 font-[Inter] text-[13.5px] text-[#12161B]/80">{companyInfo.registryId}</p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    LEI
                  </p>
                  <p className="mt-1 font-[Inter] text-[13.5px] text-[#12161B]/80">{companyInfo.lei}</p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Entity Status
                  </p>
                  <p className="mt-1 flex items-center gap-2 font-[Inter] text-[13.5px] font-medium text-[#12161B]/80">
                    <span className="size-1.5 rounded-full bg-emerald-600" aria-hidden />
                    {companyInfo.entityStatus}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Registration Date
                  </p>
                  <p className="mt-1 font-[Inter] text-[13.5px] text-[#12161B]/80">
                    {companyInfo.registrationDate}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Share Capital
                  </p>
                  <p className="mt-1 font-[Inter] text-[13.5px] text-[#12161B]/80">
                    {companyInfo.shareCapital}
                  </p>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9DA5AE]">
                    Email
                  </p>
                  <p className="mt-1 break-all font-[Inter] text-[13.5px] text-[#12161B]/80">
                    <a href={`mailto:${companyInfo.email}`} className="text-[#12161B] underline decoration-[#12161B]/25 underline-offset-4 transition-colors hover:text-[#C7A86B] hover:decoration-[#C7A86B]">
                      {companyInfo.email}
                    </a>
                  </p>
                </div>
              </div>
            </LegalSection>
          </div>
        </div>
      </div>
    </section>
  );
}
