import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { Hero } from "./_skyline/Hero";
import { WhoWeAre } from "./_skyline/WhoWeAre";
import { InvestmentFocus } from "./_skyline/InvestmentFocus";
import { Philosophy } from "./_skyline/Philosophy";
import { BeyondCapital } from "./_skyline/BeyondCapital";
import { ManagementServices } from "./_skyline/ManagementServices";
import { GlobalPerspective } from "./_skyline/GlobalPerspective";
import { StrategicPartnerships } from "./_skyline/StrategicPartnerships";
import { PartnerLogosSection } from "./_skyline/partners/PartnerLogosSection";
import { ResearchIntelligence } from "./_skyline/ResearchIntelligence";
import { ResponsibleGrowth } from "./_skyline/ResponsibleGrowth";
import { InvestorRelations } from "./_skyline/InvestorRelations";
import { FinalCta } from "./_skyline/FinalCta";

/** Skyline Holding homepage. */
export default function SkylineHomepage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <Hero />
        <WhoWeAre />
        <InvestmentFocus />
        <Philosophy />
        <BeyondCapital />
        <ManagementServices />
        <GlobalPerspective />
        <StrategicPartnerships />
        <PartnerLogosSection compact />
        <ResearchIntelligence />
        <ResponsibleGrowth />
        <InvestorRelations />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
