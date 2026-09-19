import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { LeadershipHero } from "./_skyline/leadership/LeadershipHero";
import { LeadershipTeam } from "./_skyline/leadership/LeadershipTeam";
import { ValuesInAction } from "./_skyline/leadership/ValuesInAction";
import { LeadershipFinalCta } from "./_skyline/leadership/LeadershipFinalCta";

/** Skyline Holding "Leadership" page, routed at /leadership. */
export default function LeadershipPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <LeadershipHero />
        <LeadershipTeam />
        <ValuesInAction />
        <LeadershipFinalCta />
      </main>
      <Footer />
    </div>
  );
}
