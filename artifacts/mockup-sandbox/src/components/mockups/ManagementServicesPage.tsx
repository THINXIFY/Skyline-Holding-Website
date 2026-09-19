import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { ServicesHero } from "./_skyline/services/ServicesHero";
import { ServicesOverview } from "./_skyline/services/ServicesOverview";
import { WealthManagement } from "./_skyline/services/WealthManagement";
import { AssetManagement } from "./_skyline/services/AssetManagement";
import { InvestmentManagement } from "./_skyline/services/InvestmentManagement";
import { PortfolioManagement } from "./_skyline/services/PortfolioManagement";
import { FamilyOfficeServices } from "./_skyline/services/FamilyOfficeServices";
import { PrivateWealthAdvisory } from "./_skyline/services/PrivateWealthAdvisory";
import { CapitalAllocation } from "./_skyline/services/CapitalAllocation";
import { RiskManagement } from "./_skyline/services/RiskManagement";
import { LongTermValue } from "./_skyline/services/LongTermValue";
import { ServicesFinalCta } from "./_skyline/services/ServicesFinalCta";

/** Skyline Holding "Management Services" page, routed at /management-services. */
export default function ManagementServicesPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <ServicesHero />
        <ServicesOverview />
        <WealthManagement />
        <AssetManagement />
        <InvestmentManagement />
        <PortfolioManagement />
        <FamilyOfficeServices />
        <PrivateWealthAdvisory />
        <CapitalAllocation />
        <RiskManagement />
        <LongTermValue />
        <ServicesFinalCta />
      </main>
      <Footer />
    </div>
  );
}
