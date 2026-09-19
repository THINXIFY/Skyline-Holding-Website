import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { AdvisoryHero } from "./_skyline/advisory/AdvisoryHero";
import { AdvisoryOverview } from "./_skyline/advisory/AdvisoryOverview";
import { CorporateStrategy } from "./_skyline/advisory/CorporateStrategy";
import { MergersAcquisitions } from "./_skyline/advisory/MergersAcquisitions";
import { CorporateFinance } from "./_skyline/advisory/CorporateFinance";
import { GrowthStrategy } from "./_skyline/advisory/GrowthStrategy";
import { MarketExpansion } from "./_skyline/advisory/MarketExpansion";
import { DigitalTransformation } from "./_skyline/advisory/DigitalTransformation";
import { AITechnologyAdvisory } from "./_skyline/advisory/AITechnologyAdvisory";
import { AdvisoryProcess } from "./_skyline/advisory/AdvisoryProcess";
import { WhySkyline } from "./_skyline/advisory/WhySkyline";
import { AdvisoryFinalCta } from "./_skyline/advisory/AdvisoryFinalCta";

/** Skyline Holding "Strategic Advisory" page, routed at /strategic-advisory. */
export default function StrategicAdvisoryPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <AdvisoryHero />
        <AdvisoryOverview />
        <CorporateStrategy />
        <MergersAcquisitions />
        <CorporateFinance />
        <GrowthStrategy />
        <MarketExpansion />
        <DigitalTransformation />
        <AITechnologyAdvisory />
        <AdvisoryProcess />
        <WhySkyline />
        <AdvisoryFinalCta />
      </main>
      <Footer />
    </div>
  );
}
