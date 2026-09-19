import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { TermsHero } from "./_skyline/legal/TermsHero";
import { TermsContent } from "./_skyline/legal/TermsContent";

/** Skyline Holding "Terms & Conditions" page, routed at /terms. */
export default function TermsPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <TermsHero />
        <TermsContent />
      </main>
      <Footer />
    </div>
  );
}
