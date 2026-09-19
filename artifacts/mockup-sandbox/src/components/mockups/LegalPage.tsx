import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { LegalHero } from "./_skyline/legal/LegalHero";
import { CompanyOverview } from "./_skyline/legal/CompanyOverview";
import { CompanyRegister } from "./_skyline/legal/CompanyRegister";
import { KeyDocuments } from "./_skyline/legal/KeyDocuments";
import { GovernanceCommitment } from "./_skyline/legal/GovernanceCommitment";

/** Skyline Holding "Legal / Company Information" page, routed at /legal. */
export default function LegalPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <LegalHero />
        <CompanyOverview />
        <CompanyRegister />
        <KeyDocuments />
        <GovernanceCommitment />
      </main>
      <Footer />
    </div>
  );
}
