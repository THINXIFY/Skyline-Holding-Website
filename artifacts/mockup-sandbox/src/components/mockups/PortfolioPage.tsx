import { Nav } from "./_skyline/Nav";
import { ThesisHero } from "./_skyline/portfolio/thesis/ThesisHero";
import { ThesisConviction } from "./_skyline/portfolio/thesis/ThesisConviction";
import { ThesisSectors } from "./_skyline/portfolio/thesis/ThesisSectors";
import { ThesisHowWeInvest } from "./_skyline/portfolio/thesis/ThesisHowWeInvest";
import { ThesisWhatWeBring } from "./_skyline/portfolio/thesis/ThesisWhatWeBring";
import { ThesisProfiles } from "./_skyline/portfolio/thesis/ThesisProfiles";
import { ThesisProcess } from "./_skyline/portfolio/thesis/ThesisProcess";
import { ThesisGuardrails } from "./_skyline/portfolio/thesis/ThesisGuardrails";
import { ThesisClosingCta } from "./_skyline/portfolio/thesis/ThesisClosingCta";

/**
 * Protected Investment Thesis page, routed at /portfolio behind ProtectedPortfolioRoute.
 *
 * Sections 1-10: Hero, Conviction, Target Sectors, How We Invest, What We Bring, Portfolio Profiles
 * (nine company cards supplied by Skyline Holding), Process, Guardrails, Closing CTA and the
 * confidential note. The page footer is deliberately not built yet (the site Footer is left out
 * so its own closing CTA band does not duplicate the one in this page).
 *
 * CONTENT SENSITIVITY: ProtectedPortfolioRoute only gates this route in the browser, and the
 * app is a static bundle - everything in these components is readable by anyone who requests
 * the JS chunk. That is acceptable ONLY because this copy is non-sensitive, public-safe thesis
 * content gated for UX/discretion. Any genuinely confidential material added later (named
 * holdings, valuations, investor data) must be fetched from an authenticated backend endpoint
 * (one that checks the portfolio access token server-side) after session verification, and must
 * never be embedded in the static frontend bundle.
 */
export default function PortfolioPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <ThesisHero />
        <ThesisConviction />
        <ThesisSectors />
        <ThesisHowWeInvest />
        <ThesisWhatWeBring />
        <ThesisProfiles />
        <ThesisProcess />
        <ThesisGuardrails />
        <ThesisClosingCta />
      </main>
    </div>
  );
}
