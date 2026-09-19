import { Nav } from "./_skyline/Nav";
import { Footer } from "./_skyline/Footer";
import { ContactHero } from "./_skyline/contact/ContactHero";
import { WaysToConnect } from "./_skyline/contact/WaysToConnect";
import { ContactForm } from "./_skyline/contact/ContactForm";
import { GlobalPerspectiveCta } from "./_skyline/contact/GlobalPerspectiveCta";

/** Skyline Holding "Contact" page, routed at /contact. */
export default function ContactPage() {
  return (
    <div className="bg-[#080A0D]">
      <Nav />
      <main>
        <ContactHero />
        <WaysToConnect />
        <ContactForm />
        <GlobalPerspectiveCta />
      </main>
      <Footer />
    </div>
  );
}
