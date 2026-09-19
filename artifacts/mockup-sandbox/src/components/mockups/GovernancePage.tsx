import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { GovernanceHero } from "./_skyline/governance/GovernanceHero";
import { CorporateGovernance } from "./_skyline/governance/CorporateGovernance";
import { GovernancePillars } from "./_skyline/governance/GovernancePillars";
import { GovernanceQuoteBand } from "./_skyline/governance/GovernanceQuoteBand";
import { GovernanceFinalCta } from "./_skyline/governance/GovernanceFinalCta";

/** Skyline Holding "Governance" page, routed at /governance. */
export default function GovernancePage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <GovernanceHero />
        <CorporateGovernance />
        <GovernancePillars />
        <GovernanceQuoteBand />
        <GovernanceFinalCta />
      </main>
      <Footer />
    </div>
  );
}
