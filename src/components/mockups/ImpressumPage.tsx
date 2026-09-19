import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { Impressum } from "./_skyline/legal/Impressum";

/** Skyline Holding "Impressum" page, routed at /impressum. */
export default function ImpressumPage() {
  return (
    <div className="relative bg-[#F5F2EA]">
      {/* Scrim keeps the nav's light wordmark/links legible before scroll,
          since this page opens on a light section rather than a dark hero. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-36 bg-gradient-to-b from-[#080A0D]/70 to-transparent"
        aria-hidden
      />
      <Nav />
      <main>
        <Impressum />
      </main>
      <Footer />
    </div>
  );
}
