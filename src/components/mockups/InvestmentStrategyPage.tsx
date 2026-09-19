import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { StrategyHero } from "./_skyline/strategy/StrategyHero";
import { InvestmentApproach } from "./_skyline/strategy/InvestmentApproach";
import { InvestmentCriteria } from "./_skyline/strategy/InvestmentCriteria";
import { RealEstateSector } from "./_skyline/strategy/RealEstateSector";
import { PrivateEquitySector } from "./_skyline/strategy/PrivateEquitySector";
import { TechnologySector } from "./_skyline/strategy/TechnologySector";
import { HealthcareSector } from "./_skyline/strategy/HealthcareSector";
import { FinancialServicesSector } from "./_skyline/strategy/FinancialServicesSector";
import { EnergySector } from "./_skyline/strategy/EnergySector";
import { ConsumerLuxurySector } from "./_skyline/strategy/ConsumerLuxurySector";
import { SpecialSituationsSector } from "./_skyline/strategy/SpecialSituationsSector";
import { StrategyFinalCta } from "./_skyline/strategy/StrategyFinalCta";

/** Skyline Holding "Investment Strategy" page, routed at /investment-strategy. */
export default function InvestmentStrategyPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <StrategyHero />
        <InvestmentApproach />
        <InvestmentCriteria />
        <RealEstateSector />
        <PrivateEquitySector />
        <TechnologySector />
        <HealthcareSector />
        <FinancialServicesSector />
        <EnergySector />
        <ConsumerLuxurySector />
        <SpecialSituationsSector />
        <StrategyFinalCta />
      </main>
      <Footer />
    </div>
  );
}
