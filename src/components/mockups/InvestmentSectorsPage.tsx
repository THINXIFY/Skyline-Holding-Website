import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { SectorsHero } from "./_skyline/sectors/SectorsHero";
import { SectorPhilosophy } from "./_skyline/sectors/SectorPhilosophy";
import { InvestmentSectorsGrid } from "./_skyline/sectors/InvestmentSectorsGrid";
import { CrossSectorPerspective } from "./_skyline/sectors/CrossSectorPerspective";
import { HowWeThinkAcrossSectors } from "./_skyline/sectors/HowWeThinkAcrossSectors";
import { SectorsFinalCta } from "./_skyline/sectors/SectorsFinalCta";

/** Skyline Holding "Investment Sectors" page, routed at /investment-sectors. */
export default function InvestmentSectorsPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <SectorsHero />
        <SectorPhilosophy />
        <InvestmentSectorsGrid />
        <CrossSectorPerspective />
        <HowWeThinkAcrossSectors />
        <SectorsFinalCta />
      </main>
      <Footer />
    </div>
  );
}
