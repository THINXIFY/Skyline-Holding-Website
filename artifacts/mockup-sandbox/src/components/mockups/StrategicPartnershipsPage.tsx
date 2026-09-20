import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { PartnershipsHero } from "./_skyline/partnerships/PartnershipsHero";
import { WhoWePartnerWith } from "./_skyline/partnerships/WhoWePartnerWith";
import { HowWePartner } from "./_skyline/partnerships/HowWePartner";
import { PartnershipApproach } from "./_skyline/partnerships/PartnershipApproach";
import { StrategicPartners } from "./_skyline/partnerships/StrategicPartners";
import { PartnerLogosSection } from "./_skyline/partners/PartnerLogosSection";
import { GlobalNetworkAccess } from "./_skyline/partnerships/GlobalNetworkAccess";
import { PartnershipsFinalCta } from "./_skyline/partnerships/PartnershipsFinalCta";

/** Skyline Holding "Strategic Partnerships" page, routed at /strategic-partnerships. */
export default function StrategicPartnershipsPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <PartnershipsHero />
        <WhoWePartnerWith />
        <HowWePartner />
        <PartnershipApproach />
        <StrategicPartners />
        <PartnerLogosSection />
        <GlobalNetworkAccess />
        <PartnershipsFinalCta />
      </main>
      <Footer />
    </div>
  );
}
