import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { OpportunitiesHero } from "./_skyline/opportunities/OpportunitiesHero";
import { OpportunityFocus } from "./_skyline/opportunities/OpportunityFocus";
import { WhatWeLookFor } from "./_skyline/opportunities/WhatWeLookFor";
import { HowWeInvest } from "./_skyline/opportunities/HowWeInvest";
import { OurProcess } from "./_skyline/opportunities/OurProcess";
import { SubmitOpportunity } from "./_skyline/opportunities/SubmitOpportunity";
import { OpportunitiesFinalCta } from "./_skyline/opportunities/OpportunitiesFinalCta";

/** Skyline Holding "Investment Opportunities" page, routed at /investment-opportunities. */
export default function InvestmentOpportunitiesPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <OpportunitiesHero />
        <OpportunityFocus />
        <WhatWeLookFor />
        <HowWeInvest />
        <OurProcess />
        <SubmitOpportunity />
        <OpportunitiesFinalCta />
      </main>
      <Footer />
    </div>
  );
}
