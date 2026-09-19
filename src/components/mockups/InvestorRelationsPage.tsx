import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { IRHero } from "./_skyline/investor-relations/IRHero";
import { InvestorApproach } from "./_skyline/investor-relations/InvestorApproach";
import { WhoWeWorkWith } from "./_skyline/investor-relations/WhoWeWorkWith";
import { CoInvestmentResources } from "./_skyline/investor-relations/CoInvestmentResources";
import { IRFinalCta } from "./_skyline/investor-relations/IRFinalCta";

/** Skyline Holding "Investor Relations" page, routed at /investor-relations. */
export default function InvestorRelationsPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <IRHero />
        <InvestorApproach />
        <WhoWeWorkWith />
        <CoInvestmentResources />
        <IRFinalCta />
      </main>
      <Footer />
    </div>
  );
}
