import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, MoveRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AboutPage from './AboutPage';
import heroSkyline from './assets/hero-skyline.jpg';
import infrastructureCorridor from './assets/infrastructure-corridor.jpg';
import culturalStewardship from './assets/cultural-stewardship.jpg';
import cityAtTwilight from './assets/city-at-twilight.jpg';

gsap.registerPlugin(ScrollTrigger);

type Sector = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  detail: string;
};

const sectors: Sector[] = [
  {
    id: 'real-estate-infrastructure',
    title: 'Real Estate & Infrastructure',
    description:
      'We invest in the assets and systems that shape how economies move, from enduring real estate to essential infrastructure.',
    image: infrastructureCorridor,
    imageAlt: 'Aerial view of a lit infrastructure corridor at blue hour',
    detail: 'Built environment',
  },
  {
    id: 'private-equity-growth-capital',
    title: 'Private Equity & Growth Capital',
    description:
      'We partner with ambitious companies and management teams where patient capital can accelerate durable growth.',
    image: cityAtTwilight,
    imageAlt: 'Coastal city skyline and harbor lights at twilight',
    detail: 'Partnership capital',
  },
  {
    id: 'technology-ai',
    title: 'Technology & AI',
    description:
      'We back technologies that compound human capability, reshape industries, and create strategic advantage.',
    image: heroSkyline,
    imageAlt: 'A monumental city tower emerging through dawn mist',
    detail: 'Systems & intelligence',
  },
  {
    id: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences',
    description:
      'We support innovation that extends quality of life and strengthens the systems communities rely on.',
    image: culturalStewardship,
    imageAlt: 'Modernist pavilion beside a quiet reflecting pool',
    detail: 'Human outcomes',
  },
  {
    id: 'financial-services-fintech',
    title: 'Financial Services & Fintech',
    description:
      'We invest in the infrastructure of trust, access, and intelligent capital across a changing financial system.',
    image: cityAtTwilight,
    imageAlt: 'City lights reflected across a coastal harbor at twilight',
    detail: 'Infrastructure of trust',
  },
  {
    id: 'energy-strategic-resources',
    title: 'Energy & Strategic Resources',
    description:
      'We seek disciplined opportunities across the resources and transition systems that support resilient economies.',
    image: infrastructureCorridor,
    imageAlt: 'Aerial lines of an illuminated corridor through the landscape',
    detail: 'Resilient systems',
  },
  {
    id: 'consumer-luxury',
    title: 'Consumer & Luxury',
    description:
      'We partner with distinctive brands that earn lasting relevance through design, quality, and cultural understanding.',
    image: culturalStewardship,
    imageAlt: 'A refined modernist pavilion beside still water',
    detail: 'Culture & experience',
  },
  {
    id: 'special-situations',
    title: 'Special Situations',
    description:
      'We bring clarity and flexibility to complex situations where thoughtful capital can unlock overlooked value.',
    image: heroSkyline,
    imageAlt: 'A city tower rising through a veil of early morning mist',
    detail: 'Flexible solutions',
  },
];

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Approach', href: '#approach' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Presence', href: '#global-presence' },
  { label: 'Services', href: '#management-services' },
  { label: 'Relations', href: '#investor-relations' },
];

const beyondCapital = [
  {
    title: 'CAPITAL',
    description: 'Patient resources aligned with the decisions that create durable enterprise value.',
  },
  {
    title: 'STRATEGY',
    description: 'A clear point of view on where a business can go, and the choices that will take it there.',
  },
  {
    title: 'TECHNOLOGY',
    description: 'Practical intelligence that strengthens operations, sharpens decisions, and compounds advantage.',
  },
  {
    title: 'NETWORKS',
    description: 'Relationships across markets and disciplines that open doors, accelerate learning, and widen possibility.',
  },
  {
    title: 'EXECUTION',
    description: 'Hands-on partnership that turns a considered plan into measurable, lasting progress.',
  },
];

const philosophy = [
  {
    title: 'Long-Term Perspective',
    description:
      'We look beyond the immediate cycle to understand what can remain relevant, resilient, and valuable through changing conditions.',
  },
  {
    title: 'Selective Conviction',
    description:
      'We pursue fewer opportunities with greater care, committing decisively when the quality of the business and the path ahead are clear.',
  },
  {
    title: 'Disciplined Risk',
    description:
      'We examine what could go wrong before we decide what can go right, protecting optionality while keeping ambition intact.',
  },
  {
    title: 'Active Ownership',
    description:
      'We show up as a thoughtful partner, bringing perspective, relationships, and practical support to the work of building well.',
  },
];

const partnershipNodes = [
  { id: 'institutional', title: 'Institutional Investors', description: 'Patient institutions seeking thoughtful access to long-duration opportunity.' },
  { id: 'family-offices', title: 'Family Offices', description: 'Aligned families and principals building across generations.' },
  { id: 'founders', title: 'Entrepreneurs & Founders', description: 'People with the conviction to build enduring companies.' },
  { id: 'corporations', title: 'Corporations', description: 'Businesses looking for strategic capital and a considered partner.' },
  { id: 'public-sector', title: 'Government & Public Sector', description: 'Public institutions shaping resilient places, systems, and markets.' },
  { id: 'strategic-capital', title: 'Strategic Capital Partners', description: 'Specialists whose insight and reach make an opportunity stronger.' },
];

const services = [
  { title: 'Wealth Management', description: 'A considered approach to preserving, growing, and stewarding wealth over time.' },
  { title: 'Asset Management', description: 'Active oversight of assets with a clear view of quality, context, and long-term value.' },
  { title: 'Investment Management', description: 'Disciplined investment decisions shaped by research, conviction, and a patient horizon.' },
  { title: 'Portfolio Management', description: 'A coherent portfolio perspective that balances opportunity, resilience, and risk.' },
  { title: 'Family Office Services', description: 'Integrated support for families navigating complexity, continuity, and capital.' },
  { title: 'Private Wealth Advisory', description: 'Independent perspective for private investors making consequential decisions.' },
  { title: 'Capital Allocation & Strategy', description: 'A strategic framework for directing capital where it can compound with purpose.' },
  { title: 'Risk Management', description: 'Clear-eyed assessment of exposure, downside, and the choices that protect optionality.' },
];

const researchIndex = [
  { title: 'Market Analysis', detail: 'Reading the forces that move capital' },
  { title: 'Economic Intelligence', detail: 'Context beyond the immediate cycle' },
  { title: 'Sector Research', detail: 'Understanding where relevance compounds' },
  { title: 'Risk Assessment', detail: 'Testing the assumptions beneath an opportunity' },
  { title: 'Technology & Structural Trends', detail: 'Seeing change before it becomes consensus' },
];

const relations = ['Private Investors', 'Family Offices', 'Institutional Partners', 'Co-Investment'];

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 font-technical text-[10px] font-bold uppercase tracking-[0.24em] ${light ? 'text-[var(--gold-light)]' : 'text-[var(--gold)]'}`}
    >
      <span className="section-label-rule h-px w-8 bg-current" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" data-testid="link-logo">
      <span
        className={`flex h-9 w-9 items-center justify-center border ${light ? 'border-[var(--gold-light)]' : 'border-[var(--gold)]'}`}
        aria-hidden="true"
      >
        <span className={`font-editorial text-[clamp(1.25rem,1.6vw,1.5rem)] leading-none ${light ? 'text-[var(--ivory)]' : 'text-[var(--navy)]'}`}>S</span>
      </span>
      <span
        className={`font-technical text-[11px] font-bold uppercase tracking-[0.19em] ${light ? 'text-[var(--ivory)]' : 'text-[var(--navy)]'}`}
      >
        Skyline <span className="text-[var(--gold)]">Holding</span>
      </span>
    </a>
  );
}

function SectorDesktopShowcase({
  activeSector,
  onSelect,
  changing,
}: {
  activeSector: Sector;
  onSelect: (sector: Sector) => void;
  changing: boolean;
}) {
  return (
    <div className="hidden gap-10 xl:grid xl:grid-cols-[.78fr_1.22fr] xl:gap-16">
      <div className="border-t border-[var(--line-dark)]" role="list" aria-label="Investment sectors">
        {sectors.map((sector) => (
          <button
            key={sector.id}
            type="button"
            className="sector-item flex min-h-[92px] w-full items-center justify-between gap-5 border-b border-[var(--line-dark)] px-5 py-5 text-left text-[rgba(244,239,230,.58)]"
            data-active={activeSector.id === sector.id}
            aria-pressed={activeSector.id === sector.id}
            onMouseEnter={() => onSelect(sector)}
            onFocus={() => onSelect(sector)}
            onClick={() => onSelect(sector)}
            data-testid={`button-sector-${sector.id}`}
          >
            <span className="font-editorial text-[clamp(1.65rem,2.5vw,2.75rem)] leading-none">{sector.title}</span>
            <ArrowUpRight className="sector-item-arrow shrink-0 text-[var(--gold)]" size={21} strokeWidth={1.15} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="flex min-h-[690px] flex-col justify-between">
        <div className="sector-visual relative min-h-[460px] overflow-hidden bg-[var(--navy-soft)]" data-changing={changing}>
          <img
            key={activeSector.id}
            src={activeSector.image}
            alt={activeSector.imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,14,22,.9),rgba(7,14,22,.08)_72%)]" aria-hidden="true" />
          <div className="relative flex h-full min-h-[460px] flex-col justify-end p-7 md:p-10">
            <span className="font-technical text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">{activeSector.detail}</span>
            <h3 className="mt-4 max-w-[620px] font-editorial text-[clamp(2.24rem,4vw,4.64rem)] leading-[.86] tracking-[-.04em] text-[var(--ivory)]">
              {activeSector.title}
            </h3>
          </div>
        </div>
        <div className="grid gap-8 border-b border-[var(--line-dark)] py-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-[540px] font-sans text-[16px] leading-[1.7] text-[rgba(244,239,230,.68)]">{activeSector.description}</p>
          <a
            href="mailto:contact@skylineholding.com"
            className="group inline-flex min-h-11 items-center gap-3 font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ivory)]"
            data-testid={`link-sector-contact-${activeSector.id}`}
          >
            Discuss this area
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] transition-colors group-hover:bg-[var(--gold)] group-hover:text-[var(--navy)]">
              <MoveRight size={15} strokeWidth={1.2} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function SectorMobileShowcase() {
  return (
    <div className="space-y-5 xl:hidden" aria-label="Investment sectors">
      {sectors.map((sector) => (
        <article key={sector.id} className="overflow-hidden border border-[var(--line-dark)] bg-[var(--navy-soft)]" data-testid={`panel-sector-${sector.id}`}>
          <div className="relative h-[250px] overflow-hidden sm:h-[290px]">
            <img src={sector.image} alt={sector.imageAlt} loading="lazy" decoding="async" className="image-drift h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,14,22,.9),transparent_70%)]" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <span className="font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-light)]">{sector.detail}</span>
              <a
                href="mailto:contact@skylineholding.com"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold-light)]"
                aria-label={`Discuss ${sector.title} with Skyline`}
                data-testid={`link-mobile-sector-${sector.id}`}
              >
                <ArrowUpRight size={17} strokeWidth={1.2} />
              </a>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-editorial text-[clamp(1.6rem,7.2vw,2.56rem)] leading-[.9] text-[var(--ivory)]">{sector.title}</h3>
            <p className="mt-4 font-sans text-[16px] leading-[1.65] text-[rgba(244,239,230,.66)]">{sector.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function PartnershipsSection() {
  return (
    <section id="partnerships" className="partnerships-section bg-[var(--ivory)] py-24 md:py-36 lg:py-48" aria-labelledby="partnerships-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <div className="reveal"><SectionLabel>Strategic partnerships</SectionLabel></div>
            <h2 id="partnerships-title" className="reveal reveal-delay-1 mt-10 max-w-[620px] font-editorial text-[clamp(2.72rem,6.4vw,5.76rem)] leading-[.86] tracking-[-.05em]">Great opportunities are rarely built <em className="text-[var(--gold)]">alone.</em></h2>
            <p className="reveal reveal-delay-2 mt-10 max-w-[440px] font-sans text-[16px] leading-[1.8] text-[var(--muted-foreground)]">Our strongest work is built on long-term relationships — with investors, institutions, entrepreneurs, businesses, and strategic partners who share our appetite for meaningful progress.</p>
          </div>
          <PartnershipEcosystem />
        </div>
      </div>
    </section>
  );
}

function PartnershipEcosystem() {
  return (
    <div className="reveal reveal-delay-1 ecosystem-wrap relative min-h-[650px]" aria-label="Skyline Holding strategic partnership ecosystem">
      <svg className="ecosystem-lines pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 760 650" fill="none" aria-hidden="true">
        <path className="ecosystem-line" d="M380 325 C286 251 218 135 90 94" />
        <path className="ecosystem-line" d="M380 325 C310 278 208 240 52 242" />
        <path className="ecosystem-line" d="M380 325 C301 349 193 385 64 406" />
        <path className="ecosystem-line" d="M380 325 C459 252 540 151 676 97" />
        <path className="ecosystem-line" d="M380 325 C466 298 568 264 714 253" />
        <path className="ecosystem-line" d="M380 325 C461 365 570 406 691 438" />
        <circle className="ecosystem-orbit" cx="380" cy="325" r="145" />
        <circle className="ecosystem-orbit ecosystem-orbit-soft" cx="380" cy="325" r="206" />
      </svg>
      <div className="ecosystem-center absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[var(--gold)] bg-[var(--ivory)] text-center md:h-44 md:w-44">
        <div>
          <span className="font-technical text-[9px] font-bold uppercase tracking-[.2em] text-[var(--gold)]">Independent capital</span>
          <strong className="mt-3 block font-editorial text-[clamp(1.75rem,2.5vw,2rem)] leading-none text-[var(--navy)]">Skyline<br />Holding</strong>
        </div>
      </div>
      {partnershipNodes.map((node, index) => (
        <button
          key={node.id}
          type="button"
          className={`ecosystem-node ecosystem-node-${index} group absolute flex min-h-[58px] w-[155px] items-center gap-2 text-left ${index > 2 ? 'md:text-right' : ''}`}
          aria-label={`${node.title}: ${node.description}`}
          data-testid={`button-partnership-${node.id}`}
        >
          <span className="ecosystem-dot order-first shrink-0" aria-hidden="true" />
          <span>
            <strong className="block font-technical text-[10px] font-bold uppercase leading-[1.35] tracking-[.12em] text-[var(--navy)]">{node.title}</strong>
            <span className="ecosystem-description mt-2 block max-w-[190px] font-sans text-[12px] leading-[1.45] text-[var(--muted-foreground)]">{node.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function GlobalPresenceSection() {
  return (
    <section id="global-presence" className="global-section relative overflow-hidden bg-[var(--navy)] py-24 text-[var(--ivory)] md:py-36 lg:py-48" aria-labelledby="global-title">
      <div className="global-glow absolute -right-40 top-10 h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(185,148,89,.16),transparent_67%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <div className="reveal"><SectionLabel light>Global perspective</SectionLabel></div>
            <h2 id="global-title" className="reveal reveal-delay-1 mt-10 max-w-[700px] font-editorial text-[clamp(2.72rem,6.4vw,5.6rem)] leading-[.84] tracking-[-.05em]">Rooted in Andorra.<br /><em className="text-[var(--gold-light)]">Connected</em> to opportunity worldwide.</h2>
            <p className="reveal reveal-delay-2 mt-10 max-w-[510px] font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.65)]">From our European base in Andorra, we bring a global perspective to the decisions we make — staying close to the people, ideas, and markets shaping what comes next.</p>
          </div>
          <GlobalMap />
        </div>
      </div>
    </section>
  );
}

function GlobalMap() {
  return (
    <div className="reveal reveal-delay-1 global-map-wrap" aria-label="Abstract map showing Skyline Holding's global perspective">
      <div className="mb-7 flex flex-wrap gap-x-7 gap-y-3 font-technical text-[9px] uppercase tracking-[.19em] text-[rgba(244,239,230,.48)]">
        <span><i className="global-key global-key-gold" />Focus region</span>
        <span><i className="global-key global-key-line" />Investment perspective</span>
        <span><i className="global-key global-key-dot" />Global network</span>
      </div>
      <svg className="global-map h-auto w-full" viewBox="0 0 780 480" fill="none" role="img" aria-label="Abstract world map with Andorra highlighted">
        <g className="map-longitudes" opacity=".4">
          <path d="M113 44 C248 165 260 310 146 450" />
          <path d="M246 25 C333 157 344 307 292 462" />
          <path d="M388 18 C350 147 365 327 398 468" />
          <path d="M528 25 C448 151 474 317 576 454" />
          <path d="M662 53 C532 157 555 314 704 424" />
          <path d="M22 156 C224 100 550 102 762 160" />
          <path d="M11 272 C219 228 552 231 773 285" />
          <path d="M31 389 C247 339 552 353 744 392" />
        </g>
        <path className="map-continent" d="M62 157 L95 125 137 116 163 132 181 125 202 139 232 137 258 158 278 169 268 191 238 195 225 218 188 213 168 233 137 218 112 224 89 204 67 205 50 181Z" />
        <path className="map-continent" d="M287 164 L311 144 337 150 354 175 379 179 395 213 385 254 404 291 393 334 365 350 350 329 323 336 310 307 289 292 298 255 278 229 285 198Z" />
        <path className="map-continent" d="M404 165 L436 145 467 150 488 136 522 147 551 145 582 163 620 160 657 184 713 188 748 214 735 238 698 245 672 265 632 259 613 281 578 273 553 291 517 282 490 255 464 251 448 225 420 215Z" />
        <path className="map-continent" d="M574 308 L605 297 637 310 661 337 701 347 719 377 698 404 667 399 646 421 616 404 591 407 578 379 552 361 558 333Z" />
        <path className="map-route" d="M350 174 C430 136 585 165 686 210" />
        <path className="map-route map-route-alt" d="M350 174 C290 183 197 179 135 165" />
        <path className="map-route map-route-alt" d="M350 174 C421 226 508 240 622 351" />
        <circle className="map-marker map-marker-andorra" cx="350" cy="174" r="7" />
        <circle className="map-marker" cx="407" cy="166" r="4" />
        <circle className="map-marker" cx="686" cy="210" r="4" />
        <circle className="map-marker" cx="135" cy="165" r="4" />
        <circle className="map-marker" cx="622" cy="351" r="4" />
        <text className="map-label map-label-andorra" x="363" y="162">ANDORRA</text>
        <text className="map-label" x="405" y="151">EUROPE</text>
        <text className="map-label" x="675" y="197">ASIA-PACIFIC</text>
        <text className="map-label" x="94" y="151">NORTH AMERICA</text>
        <text className="map-label" x="600" y="374">MIDDLE EAST</text>
      </svg>
    </div>
  );
}

function ManagementServicesSection({ activeService, onSelect }: { activeService: number; onSelect: (index: number) => void }) {
  const service = services[activeService];
  return (
    <section id="management-services" className="services-section bg-[var(--ivory-deep)] py-24 md:py-36 lg:py-48" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <div className="reveal"><SectionLabel>Management services</SectionLabel></div>
            <h2 id="services-title" className="reveal reveal-delay-1 mt-10 max-w-[610px] font-editorial text-[clamp(2.68rem,6.4vw,5.6rem)] leading-[.85] tracking-[-.05em]">Managing capital with clarity, discipline and <em className="text-[var(--gold)]">purpose.</em></h2>
            <p className="reveal reveal-delay-2 mt-10 max-w-[455px] font-sans text-[16px] leading-[1.8] text-[var(--muted-foreground)]">We bring an integrated perspective to wealth and capital — combining rigorous management with the clarity to make decisions that remain sound as circumstances change.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="service-preview relative mb-8 hidden min-h-[245px] overflow-hidden md:block">
              <img src={activeService % 2 === 0 ? culturalStewardship : infrastructureCorridor} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,21,31,.94),rgba(12,21,31,.3))]" />
              <div className="relative flex min-h-[245px] flex-col justify-end p-7">
                <span className="font-technical text-[9px] uppercase tracking-[.2em] text-[var(--gold-light)]">Current perspective</span>
                <p className="mt-4 max-w-[440px] font-editorial text-[clamp(1.75rem,2.8vw,2.375rem)] leading-[.98] text-[var(--ivory)]">{service.description}</p>
              </div>
            </div>
            <div className="service-index border-t border-[var(--line-light)]" role="tablist" aria-label="Management services">
              {services.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={activeService === index}
                  aria-controls={`service-panel-${index}`}
                  className="service-row group flex min-h-[62px] w-full items-center justify-between gap-5 border-b border-[var(--line-light)] py-4 text-left"
                  data-active={activeService === index}
                  onMouseEnter={() => onSelect(index)}
                  onFocus={() => onSelect(index)}
                  onClick={() => onSelect(index)}
                  data-testid={`button-service-${index}`}
                >
                  <span className="font-editorial text-[clamp(1.55rem,3vw,2.45rem)] leading-none text-[var(--navy)]">{item.title}</span>
                  <ChevronDown className="service-chevron shrink-0 text-[var(--gold)] md:hidden" size={19} strokeWidth={1.25} aria-hidden="true" />
                  <ArrowUpRight className="service-arrow hidden shrink-0 text-[var(--gold)] md:block" size={19} strokeWidth={1.15} aria-hidden="true" />
                  <span id={`service-panel-${index}`} className="sr-only">{item.description}</span>
                </button>
              ))}
            </div>
            <div className="mt-7 md:hidden">
              <p className="font-sans text-[16px] leading-[1.7] text-[var(--muted-foreground)]">{service.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="research-section relative overflow-hidden bg-[var(--navy-soft)] py-24 text-[var(--ivory)] md:py-36 lg:py-48" aria-labelledby="research-title">
      <div className="research-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          <div>
            <div className="reveal"><SectionLabel light>Research &amp; market intelligence</SectionLabel></div>
            <h2 id="research-title" className="reveal reveal-delay-1 mt-10 max-w-[700px] font-editorial text-[clamp(3.04rem,7.2vw,6.4rem)] leading-[.82] tracking-[-.05em]">Insight before <em className="text-[var(--gold-light)]">action.</em></h2>
            <p className="reveal reveal-delay-2 mt-10 max-w-[530px] font-editorial text-[clamp(1.7rem,2.8vw,2.375rem)] leading-[1.12] text-[var(--ivory)]">Better decisions begin with a deeper understanding of change.</p>
            <p className="reveal reveal-delay-3 mt-8 max-w-[500px] font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.63)]">Our research connects macro perspective with sector-level intelligence, helping us distinguish lasting structural shifts from the noise of the moment.</p>
          </div>
          <ResearchVisual />
        </div>
      </div>
    </section>
  );
}

function ResearchVisual() {
  return (
    <div className="reveal reveal-delay-1 research-visual">
      <div className="research-keywords mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-technical text-[10px] uppercase tracking-[.18em] text-[rgba(244,239,230,.55)]">
        <span>Velocity</span><span>Resilience</span><span>Transition</span><span>Conviction</span>
      </div>
      <svg className="research-chart w-full" viewBox="0 0 660 290" fill="none" aria-label="Abstract trend lines representing research and structural change">
        <path className="research-axis" d="M10 250 H650 M10 250 V20" />
        <path className="research-trend research-trend-one" d="M10 221 C85 233 112 186 167 201 S250 151 296 172 S373 131 420 145 S505 81 555 104 S608 52 650 38" />
        <path className="research-trend research-trend-two" d="M10 181 C78 168 115 211 175 185 S249 190 300 137 S393 169 443 112 S535 132 593 77 S627 84 650 57" />
        <circle className="research-point" cx="296" cy="172" r="4" /><circle className="research-point" cx="420" cy="145" r="4" /><circle className="research-point" cx="555" cy="104" r="4" />
        <text className="research-label" x="18" y="274">PERSPECTIVE</text><text className="research-label" x="551" y="274">TIME</text>
        <text className="research-label research-label-highlight" x="455" y="73">STRUCTURAL SHIFT</text>
      </svg>
      <div className="research-index mt-12 border-t border-[var(--line-dark)]">
        {researchIndex.map((item) => (
          <div key={item.title} className="research-index-row flex min-h-[67px] items-center justify-between gap-5 border-b border-[var(--line-dark)]">
            <span className="font-editorial text-[clamp(1.35rem,2vw,1.5rem)] text-[var(--ivory)]">{item.title}</span>
            <span className="hidden max-w-[205px] text-right font-sans text-[12px] leading-[1.35] text-[rgba(244,239,230,.53)] sm:block">{item.detail}</span>
            <ArrowUpRight className="shrink-0 text-[var(--gold-light)]" size={17} strokeWidth={1.15} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BeyondCapitalPillars() {
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const pillarElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-pillar-index]'),
    );
    if (!pillarElements.length) return;

    const pillarObserver = new IntersectionObserver(
      (entries) => {
        const visiblePillar = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visiblePillar) {
          setActivePillar(Number(visiblePillar.target.getAttribute('data-pillar-index')));
        }
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    pillarElements.forEach((pillar) => pillarObserver.observe(pillar));
    return () => pillarObserver.disconnect();
  }, []);

  return (
    <div className="beyond-pillar-layout">
      <div className="beyond-intro">
        <div className="reveal"><SectionLabel>Beyond capital</SectionLabel></div>
        <h2 id="approach-title" className="reveal reveal-delay-1 mt-10 max-w-[660px] font-editorial text-[clamp(2.88rem,8vw,5.6rem)] leading-[.86] tracking-[-.05em]">
          More than capital.<br /><em className="text-[var(--gold)]">A platform for value creation.</em>
        </h2>
        <p className="reveal reveal-delay-2 mt-10 max-w-[500px] font-editorial text-[clamp(1.625rem,2.6vw,2.125rem)] leading-[1.15] text-[var(--navy)]">
          Capital is the beginning of the conversation — not the end of it.
        </p>
        <p className="reveal reveal-delay-3 mt-8 max-w-[510px] font-sans text-[16px] leading-[1.65] text-[var(--muted-foreground)]">
          Skyline brings together capital, strategy, technology, relationships and execution to help build stronger businesses and more durable long-term value.
        </p>
        <div className="beyond-intro-note mt-12 hidden items-center gap-3 font-technical text-[9px] font-bold uppercase tracking-[.2em] text-[var(--gold)] lg:flex">
          <span className="h-px w-10 bg-[var(--gold)]" aria-hidden="true" />
          Five ways we build alongside partners
        </div>
      </div>

      <div className="beyond-pillar-list relative" role="list" aria-label="Beyond capital value creation pillars">
        <div className="beyond-pillar-rail" aria-hidden="true">
          <span
            className="beyond-pillar-progress"
            style={{ height: `${((activePillar + 1) / beyondCapital.length) * 100}%` }}
          />
        </div>
        {beyondCapital.map((item, index) => (
          <article
            key={item.title}
            className={`beyond-pillar ${activePillar === index ? 'is-active' : ''}`}
            data-pillar-index={index}
            aria-current={activePillar === index ? 'step' : undefined}
            tabIndex={0}
            role="listitem"
            onMouseEnter={() => setActivePillar(index)}
            onFocus={() => setActivePillar(index)}
          >
            <div className="beyond-pillar-meta">
              <span className="beyond-pillar-number">0{index + 1}</span>
              <span className="beyond-pillar-line" aria-hidden="true" />
            </div>
            <div className="beyond-pillar-content">
              <div className="flex items-start justify-between gap-6">
                <h3 className="font-editorial text-[clamp(2rem,4vw,3.5rem)] leading-[.9] tracking-[-.035em] text-[var(--navy)]">
                  {item.title}
                </h3>
                <ArrowUpRight className="beyond-pillar-arrow mt-2 shrink-0 text-[var(--gold)]" size={21} strokeWidth={1.15} aria-hidden="true" />
              </div>
              <p className="beyond-pillar-description mt-5 max-w-[500px] font-sans text-[16px] leading-[1.65] text-[var(--muted-foreground)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function InvestorRelationsSection() {
  return (
    <section id="investor-relations" className="investor-section relative overflow-hidden bg-[#090f15] py-24 text-[var(--ivory)] md:py-36 lg:py-48" aria-labelledby="investor-title">
      <div className="investor-spotlight absolute -left-40 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(185,148,89,.13),transparent_67%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
          <div>
            <div className="reveal"><SectionLabel light>Investor relations</SectionLabel></div>
            <h2 id="investor-title" className="reveal reveal-delay-1 mt-10 max-w-[680px] font-editorial text-[clamp(2.96rem,7.2vw,6.4rem)] leading-[.81] tracking-[-.05em]">Built for aligned <em className="text-[var(--gold-light)]">long-term capital.</em></h2>
            <p className="reveal reveal-delay-2 mt-10 max-w-[475px] font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.63)]">We maintain thoughtful, direct relationships with the investors and partners who share our perspective. Clear communication, aligned expectations, and mutual trust are the foundation.</p>
          </div>
          <div className="reveal reveal-delay-1 investor-content">
            <div className="investor-relations-list border-t border-[var(--line-dark)]">
              {relations.map((relation) => (
                <div key={relation} className="investor-relation-row flex min-h-[83px] items-center justify-between border-b border-[var(--line-dark)]">
                  <span className="font-editorial text-[clamp(1.75rem,3vw,2.8rem)]">{relation}</span>
                  <ArrowUpRight className="text-[var(--gold-light)]" size={19} strokeWidth={1.15} aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="investor-access mt-12 border border-[var(--gold)] p-6 sm:p-8 md:mt-20 md:p-10">
              <span className="font-technical text-[10px] font-bold uppercase tracking-[.22em] text-[var(--gold-light)]">Private investor access</span>
              <p className="mt-7 max-w-[470px] font-editorial text-[clamp(2rem,4vw,3.2rem)] leading-[.98]">Restricted access for approved investors and strategic partners.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                <a href="mailto:investorrelations@skylineholding.com?subject=Request%20Investor%20Access" className="group inline-flex min-h-11 items-center gap-3 font-technical text-[10px] font-bold uppercase tracking-[.16em] text-[var(--ivory)]" data-testid="link-investor-access">
                  Request Investor Access <MoveRight className="transition-transform group-hover:translate-x-1" size={16} strokeWidth={1.2} />
                </a>
                <a href="mailto:investorrelations@skylineholding.com" className="inline-flex min-h-11 items-center gap-2 font-technical text-[10px] font-bold uppercase tracking-[.16em] text-[var(--gold-light)]" data-testid="link-investor-relations">
                  Investor Relations <ArrowUpRight size={15} strokeWidth={1.2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="conversation" className="final-cta relative flex min-h-[690px] items-center overflow-hidden bg-[var(--navy)] py-28 text-[var(--ivory)] md:min-h-[780px] md:py-36" aria-labelledby="final-title">
      <img src={cityAtTwilight} alt="" loading="lazy" className="final-cta-image absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,14,22,.92),rgba(7,14,22,.47),rgba(7,14,22,.78))]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,14,22,.8),transparent_50%,rgba(7,14,22,.6))]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1100px] px-5 text-center sm:px-6 md:px-12">
        <div className="reveal"><SectionLabel light>Start a conversation</SectionLabel></div>
        <h2 id="final-title" className="reveal reveal-delay-1 mx-auto mt-10 max-w-[980px] font-editorial text-[clamp(3.04rem,8vw,7.2rem)] leading-[.8] tracking-[-.06em]">Building what endures starts with <em className="text-[var(--gold-light)]">perspective.</em></h2>
        <p className="reveal reveal-delay-2 mx-auto mt-10 max-w-[560px] font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.7)]">If you are building something that deserves a longer view, we would welcome the opportunity to hear the story and explore what might be possible.</p>
        <div className="reveal reveal-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
          <a href="mailto:contact@skylineholding.com" className="group inline-flex min-h-[52px] items-center gap-4 bg-[var(--gold)] px-6 py-4 font-technical text-[10px] font-bold uppercase tracking-[.16em] text-[var(--navy)] transition-colors hover:bg-[var(--gold-light)]" data-testid="link-start-conversation">
            Start a Conversation <ArrowUpRight size={16} strokeWidth={1.3} />
          </a>
          <a href="mailto:contact@skylineholding.com" className="inline-flex min-h-[52px] items-center gap-3 border border-[rgba(244,239,230,.42)] px-6 py-4 font-technical text-[10px] font-bold uppercase tracking-[.16em] text-[var(--ivory)] transition-colors hover:border-[var(--gold-light)] hover:text-[var(--gold-light)]" data-testid="link-contact-skyline">
            Contact Skyline <MoveRight size={16} strokeWidth={1.2} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectorId, setActiveSectorId] = useState(sectors[0].id);
  const [sectorChanging, setSectorChanging] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const activeSector = sectors.find((sector) => sector.id === activeSectorId) ?? sectors[0];

  useEffect(() => {
    document.title = 'Skyline Holding — Strategic Capital for a Changing World';
    const description = 'Skyline Holding is an international investment holding and strategic capital company building enduring value across sectors, markets, and generations.';
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', description);

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, mobile, reduceMotion } = context.conditions as {
          desktop: boolean;
          mobile: boolean;
          reduceMotion: boolean;
        };
        const reveals = gsap.utils.toArray<HTMLElement>('.reveal');
        const headings = gsap.utils.toArray<HTMLElement>('main h1, main h2, main h3');
        const images = gsap.utils.toArray<HTMLElement>('.image-drift, .final-cta-image');

        if (reduceMotion) {
          gsap.set([...reveals, ...headings, ...images], {
            autoAlpha: 1,
            clearProps: 'transform,clipPath,scale',
          });
          reveals.forEach((element) => element.classList.add('is-visible'));
          gsap.utils.toArray<HTMLElement>('.ecosystem-wrap, .research-visual').forEach((element) => {
            element.classList.add('is-visible');
          });
          return;
        }

        const markVisible = (elements: Element[]) => {
          elements.forEach((element) => element.classList.add('is-visible'));
        };

        const heroElements = gsap.utils.toArray<HTMLElement>('.hero-reveal');
        const heroTitle = document.querySelector<HTMLElement>('#hero-title') ?? heroElements.find((element) => element.tagName === 'H1');
        const heroKicker = heroElements.find((element) => element !== heroTitle && element.tagName !== 'H1');
        const heroSupport = heroElements.find((element) => element !== heroTitle && element !== heroKicker);
        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => markVisible(heroElements),
        });

        if (heroKicker) {
          heroTimeline.fromTo(
            heroKicker,
            { autoAlpha: 0, x: -18 },
            { autoAlpha: 1, x: 0, duration: desktop ? 0.85 : 0.7 },
          );
          heroTimeline.fromTo(
            heroKicker.querySelector('span'),
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: desktop ? 0.7 : 0.55, ease: 'expo.out' },
            '<0.12',
          );
        }

        if (heroTitle) {
          heroTimeline.fromTo(
            heroTitle,
            { autoAlpha: 0, y: desktop ? 34 : 20, clipPath: 'inset(0 0 100% 0)' },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: desktop ? 1.15 : 0.85,
              ease: 'expo.out',
            },
            '<0.18',
          );
        }

        if (heroSupport) {
          heroTimeline.fromTo(
            heroSupport,
            { autoAlpha: 0, y: desktop ? 28 : 16 },
            { autoAlpha: 1, y: 0, duration: desktop ? 0.9 : 0.7 },
            '-=0.52',
          );
        }

        gsap.utils.toArray<HTMLElement>('main > section').forEach((section) => {
          const heading = section.querySelector<HTMLElement>('h2.reveal, h3.reveal');
          const content = Array.from(
            section.querySelectorAll<HTMLElement>('.reveal:not(.hero-reveal)'),
          ).filter((element) => element !== heading && !element.matches('h1, h2, h3'));
          const sectionImages = Array.from(section.querySelectorAll<HTMLElement>('img.image-drift'));
          const labelRules = Array.from(section.querySelectorAll<HTMLElement>('.section-label-rule'));
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: mobile ? 'top 91%' : 'top 84%',
              once: true,
            },
          });

          if (heading) {
            timeline.fromTo(
              heading,
              { autoAlpha: 0, y: mobile ? 18 : 28, clipPath: 'inset(0 0 100% 0)' },
              {
                autoAlpha: 1,
                y: 0,
                clipPath: 'inset(0 0 0% 0)',
                duration: desktop ? 1 : 0.78,
                ease: 'expo.out',
              },
              0,
            );
          }

          if (content.length) {
            timeline.fromTo(
              content,
              { autoAlpha: 0, y: mobile ? 14 : 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: desktop ? 0.82 : 0.68,
                stagger: desktop ? 0.1 : 0.06,
                ease: 'power3.out',
                onComplete: () => markVisible(content),
              },
              heading ? '-=0.42' : 0,
            );
          }

          if (sectionImages.length) {
            timeline.fromTo(
              sectionImages,
              { clipPath: 'inset(0 0 12% 0)' },
              {
                clipPath: 'inset(0 0 0% 0)',
                duration: desktop ? 1.2 : 0.9,
                ease: 'power4.out',
              },
              0.08,
            );
          }

          if (labelRules.length) {
            timeline.fromTo(
              labelRules,
              { scaleX: 0, transformOrigin: 'left center' },
              {
                scaleX: 1,
                duration: desktop ? 0.75 : 0.55,
                stagger: 0.08,
                ease: 'expo.out',
              },
              0.05,
            );
          }

          const ecosystem = section.querySelector<HTMLElement>('.ecosystem-wrap');
          const researchVisual = section.querySelector<HTMLElement>('.research-visual');
          timeline.call(() => {
            markVisible([...(heading ? [heading] : []), ...content]);
            ecosystem?.classList.add('is-visible');
            researchVisual?.classList.add('is-visible');
          }, [], '>-0.01');
        });

        gsap.utils.toArray<HTMLElement>('.image-drift, .final-cta-image').forEach((image) => {
          gsap.to(image, {
            yPercent: desktop ? -6 : -2,
            ease: 'none',
            scrollTrigger: {
              trigger: image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: desktop ? 1.15 : 1.6,
            },
          });
        });
      },
    );

    return () => media.revert();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
    });
    const handleLenisScroll = () => ScrollTrigger.update();
    const handleGsapTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', handleLenisScroll);
    gsap.ticker.add(handleGsapTick);
    gsap.ticker.lagSmoothing(0);

    const anchorLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const handleAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { duration: 1.1, offset: 0 });
      window.history.replaceState(null, '', href);
    };

    anchorLinks.forEach((link) => link.addEventListener('click', handleAnchorClick));

    return () => {
      anchorLinks.forEach((link) => link.removeEventListener('click', handleAnchorClick));
      lenis.off('scroll', handleLenisScroll);
      gsap.ticker.remove(handleGsapTick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const selectSector = (sector: Sector) => {
    if (sector.id === activeSectorId) return;
    setSectorChanging(true);
    setActiveSectorId(sector.id);
    window.setTimeout(() => setSectorChanging(false), 480);
  };

  return (
    <div id="top" className="skyline-noise min-h-[100dvh] overflow-x-hidden bg-[var(--ivory)] text-[var(--navy)]">
      <header className="absolute left-0 right-0 top-0 z-30" aria-label="Primary navigation">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-6 md:px-12 lg:px-20 lg:py-8">
          <Logo light />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="nav-link font-technical text-[10px] font-bold uppercase tracking-[0.2em]" data-testid={`link-nav-${item.label.toLowerCase()}`}>
                {item.label}
              </a>
            ))}
            <a href="mailto:contact@skylineholding.com" className="ml-3 inline-flex min-h-11 items-center gap-2 border border-[var(--gold)] px-4 py-3 font-technical text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ivory)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--navy)]" data-testid="link-contact">
              Contact <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </nav>
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center border border-[rgba(244,239,230,.4)] text-[var(--ivory)] md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
          </button>
        </div>
        <div id="mobile-navigation" className="mobile-panel fixed inset-0 z-40 bg-[var(--navy)] md:hidden" data-open={menuOpen}>
          <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 sm:px-8">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-[70px] items-center justify-between border-b border-[var(--line-dark)] py-5 font-editorial text-[clamp(2rem,9vw,3rem)] text-[var(--ivory)]"
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={20} strokeWidth={1.2} className="text-[var(--gold-light)]" />
                </a>
              ))}
            </nav>
            <div>
              <p className="max-w-[250px] font-editorial text-[clamp(1.35rem,1.9vw,1.5rem)] leading-tight text-[var(--ivory)]">Capital with a longer view.</p>
              <a href="mailto:contact@skylineholding.com" className="mt-6 inline-flex min-h-11 items-center gap-2 font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-light)]" data-testid="link-mobile-contact">
                Start a conversation <MoveRight size={15} strokeWidth={1.3} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--navy)] pb-12 pt-32 sm:pb-16 md:min-h-[820px] md:pb-28 lg:min-h-[880px]" aria-labelledby="hero-title">
          <img src={heroSkyline} alt="A monumental city tower emerging through dawn mist" fetchPriority="high" decoding="async" className="image-drift absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-65" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,14,22,.94)_0%,rgba(7,14,22,.62)_40%,rgba(7,14,22,.18)_100%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,14,22,.84)_0%,transparent_50%)]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
            <div className="max-w-[930px]">
              <div className="reveal hero-reveal mb-7 flex items-center gap-4 font-technical text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--gold-light)] sm:mb-8">
                <span className="h-px w-10 bg-[var(--gold)]" aria-hidden="true" />
                International investment holding
              </div>
              <h1 id="hero-title" className="reveal hero-reveal reveal-delay-1 max-w-[900px] font-editorial text-[clamp(3.04rem,12vw,7.84rem)] leading-[.82] tracking-[-.045em] text-[var(--ivory)]">
                Capital for<br /><em className="text-[var(--gold-light)]">what comes next.</em>
              </h1>
              <div className="reveal hero-reveal reveal-delay-2 mt-9 flex max-w-[570px] flex-col justify-between gap-7 border-t border-[var(--line-dark)] pt-6 sm:mt-10 sm:flex-row sm:items-end">
                <p className="max-w-[430px] font-sans text-[16px] leading-[1.65] text-[rgba(244,239,230,.72)]">We partner with exceptional people and enduring businesses to shape the future with clarity, conviction, and care.</p>
                <a href="#about" className="group flex min-h-11 shrink-0 items-center gap-3 font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ivory)]" data-testid="link-hero-discover">
                  Discover Skyline <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)] transition-colors group-hover:bg-[var(--gold)] group-hover:text-[var(--navy)]"><ArrowDown size={14} strokeWidth={1.2} /></span>
                </a>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between font-technical text-[9px] uppercase tracking-[0.2em] text-[rgba(244,239,230,.45)] sm:mt-16 md:mt-24">
              <span className="hidden sm:block">A longer view of value</span>
              <span className="ml-auto">Scroll to explore</span>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden bg-[var(--ivory)] py-24 md:py-36 lg:py-48" aria-labelledby="about-title">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
            <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-28">
              <div className="reveal">
                <SectionLabel>Skyline</SectionLabel>
                <p className="mt-9 max-w-[250px] font-technical text-[10px] font-bold uppercase leading-[1.7] tracking-[0.17em] text-[var(--muted-foreground)]">Independent capital.<br />International perspective.<br />Enduring ambition.</p>
              </div>
              <div>
                <h2 id="about-title" className="reveal max-w-[800px] font-editorial text-[clamp(2.56rem,8vw,5.84rem)] leading-[.9] tracking-[-.045em] text-[var(--navy)]">A clear view of<br /><em className="text-[var(--gold)]">the horizon.</em></h2>
                <div className="reveal reveal-delay-1 mt-12 grid gap-8 border-t border-[var(--line-light)] pt-8 md:grid-cols-[1.1fr_.9fr] md:gap-16">
                  <p className="font-editorial text-[clamp(1.6rem,2.3vw,1.875rem)] leading-[1.18] text-[var(--navy)]">Skyline Holding is an international investment holding and strategic capital company.</p>
                  <p className="font-sans text-[16px] leading-[1.8] text-[var(--muted-foreground)]">We invest with a long-term perspective across sectors, markets, and generations. Our approach combines the discipline of institutional capital with the imagination and agility of an entrepreneurial partner.</p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative mt-24 grid min-h-[410px] items-end overflow-hidden bg-[var(--navy)] md:mt-36 md:min-h-[550px]">
              <img src={cityAtTwilight} alt="An elevated view of a coastal city and harbor at twilight" loading="lazy" decoding="async" className="image-drift absolute inset-0 h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,14,22,.9),transparent_65%)]" aria-hidden="true" />
              <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-7 md:flex-row md:items-end md:p-12">
                <p className="max-w-[570px] font-editorial text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.05] text-[var(--ivory)]">“The best investments are not just made in markets. They are made in possibility.”</p>
                <span className="font-technical text-[9px] uppercase tracking-[0.2em] text-[var(--gold-light)]">Skyline perspective</span>
              </div>
            </div>
          </div>
        </section>

        <section id="sectors" className="bg-[var(--navy)] py-24 text-[var(--ivory)] md:py-36 lg:py-44" aria-labelledby="sectors-title">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
            <div className="mb-14 gap-10 lg:mb-20 xl:grid xl:grid-cols-[1.3fr_.7fr] xl:items-end xl:gap-24">
              <div className="reveal">
                <SectionLabel light>Where we invest</SectionLabel>
                <h2 id="sectors-title" className="mt-10 max-w-[860px] font-editorial text-[clamp(2.56rem,5.2vw,4.96rem)] leading-[.88] tracking-[-.04em]">Capital directed toward <em className="text-[var(--gold-light)]">enduring opportunity.</em></h2>
              </div>
              <p className="reveal reveal-delay-1 mt-8 max-w-[480px] font-sans text-[16px] leading-[1.75] text-[rgba(244,239,230,.62)] xl:mt-0">We invest selectively across established assets and transformative industries where long-term relevance, strategic insight and disciplined execution can create enduring value.</p>
            </div>
            <SectorDesktopShowcase activeSector={activeSector} onSelect={selectSector} changing={sectorChanging} />
            <SectorMobileShowcase />
          </div>
        </section>

        <section id="approach" className="beyond-section relative overflow-hidden py-24 md:py-36 lg:py-48" aria-labelledby="approach-title">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
            <BeyondCapitalPillars />
          </div>
        </section>

        <section id="philosophy" className="relative overflow-hidden bg-[var(--navy)] py-24 text-[var(--ivory)] md:py-36 lg:py-48" aria-labelledby="philosophy-title">
          <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full border border-[rgba(185,148,89,.18)] md:-right-32 md:h-[700px] md:w-[700px]" aria-hidden="true" />
          <div className="absolute -right-4 top-16 h-[360px] w-[360px] rounded-full border border-[rgba(185,148,89,.11)] md:right-12 md:top-32 md:h-[500px] md:w-[500px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
            <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
              <div className="reveal">
                <SectionLabel light>Our philosophy</SectionLabel>
                <p className="mt-9 max-w-[250px] font-technical text-[10px] font-bold uppercase leading-[1.7] tracking-[0.17em] text-[rgba(244,239,230,.47)]">Discernment over noise.<br />Substance over speed.<br />Long-term by design.</p>
              </div>
              <div>
                <h2 id="philosophy-title" className="reveal max-w-[880px] font-editorial text-[clamp(2.72rem,8vw,6.4rem)] leading-[.84] tracking-[-.05em]">The horizon is<br /><em className="text-[var(--gold-light)]">the measure.</em></h2>
                <p className="reveal reveal-delay-1 mt-12 max-w-[610px] font-editorial text-[clamp(1.7rem,2.8vw,2.375rem)] leading-[1.15] text-[var(--ivory)]">We believe enduring value is created by those willing to look further, think deeper, and act with intention.</p>
                <div className="reveal reveal-delay-2 mt-12 grid gap-8 border-t border-[var(--line-dark)] pt-8 sm:grid-cols-2">
                  <p className="font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.6)]">Our philosophy is simple: be selective in what we pursue, rigorous in how we decide, and unwavering in how we partner.</p>
                  <p className="font-sans text-[16px] leading-[1.8] text-[rgba(244,239,230,.6)]">The results we seek are not measured in quarters. They are measured in what remains, what grows, and what becomes possible.</p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-20 border-t border-[var(--line-dark)] pt-5 md:mt-36 md:pt-7">
              <div className="grid gap-0 md:grid-cols-1">
                {philosophy.map((item) => (
                  <article key={item.title} className="border-b border-[var(--line-dark)] py-7 md:grid md:grid-cols-[.35fr_1fr] md:items-baseline md:gap-10 md:pr-12">
                    <span className="font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-light)]">{item.title}</span>
                    <p className="mt-4 max-w-[620px] font-sans text-[16px] leading-[1.75] text-[rgba(244,239,230,.67)] md:mt-0">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-3 mt-20 flex flex-col justify-between gap-10 border-t border-[var(--line-dark)] pt-7 md:mt-28 md:flex-row md:items-end">
              <div>
                <span className="font-technical text-[10px] uppercase tracking-[0.2em] text-[var(--gold-light)]">A private capital house</span>
                <p className="mt-4 font-editorial text-[clamp(1.7rem,2.8vw,2.375rem)] text-[var(--ivory)]">Built for the long view.</p>
              </div>
              <a href="mailto:contact@skylineholding.com" className="group inline-flex min-h-11 items-center gap-4 self-start font-technical text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ivory)] md:self-auto" data-testid="link-philosophy-contact">
                Begin a conversation <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)] transition-colors group-hover:bg-[var(--gold)] group-hover:text-[var(--navy)]"><ArrowUpRight size={16} strokeWidth={1.2} /></span>
              </a>
            </div>
          </div>
        </section>
        <PartnershipsSection />
        <GlobalPresenceSection />
        <ManagementServicesSection activeService={activeService} onSelect={setActiveService} />
        <ResearchSection />
        <InvestorRelationsSection />
        <FinalCtaSection />
      </main>

      <footer className="bg-[var(--navy)] px-5 pb-10 pt-0 text-[var(--ivory)] sm:px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1440px] border-t border-[var(--line-dark)] pt-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <Logo light />
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-technical text-[9px] uppercase tracking-[0.17em] text-[rgba(244,239,230,.48)]">
              <a href="#about" className="min-h-11 inline-flex items-center transition-colors hover:text-[var(--gold-light)]" data-testid="link-footer-about">About</a>
              <a href="#sectors" className="min-h-11 inline-flex items-center transition-colors hover:text-[var(--gold-light)]" data-testid="link-footer-sectors">Sectors</a>
              <a href="mailto:contact@skylineholding.com" className="min-h-11 inline-flex items-center transition-colors hover:text-[var(--gold-light)]" data-testid="link-footer-contact">Contact</a>
              <span className="inline-flex min-h-11 items-center">Skyline Holding</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return window.location.pathname.replace(/\/+$/, '') === '/about' ? <AboutPage /> : <Home />;
}

export default App;