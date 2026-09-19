import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { AboutHero } from "./_skyline/about/AboutHero";
import { AboutWhoWeAre } from "./_skyline/about/AboutWhoWeAre";
import { OurStory } from "./_skyline/about/OurStory";
import { VisionMission } from "./_skyline/about/VisionMission";
import { OurValues } from "./_skyline/about/OurValues";
import { HowWeThink } from "./_skyline/about/HowWeThink";
import { AboutFinalCta } from "./_skyline/about/AboutFinalCta";

/** Skyline Holding "About" page, routed at /about. */
export default function AboutPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <AboutHero />
        <AboutWhoWeAre />
        <OurStory />
        <VisionMission />
        <OurValues />
        <HowWeThink />
        <AboutFinalCta />
      </main>
      <Footer />
    </div>
  );
}
