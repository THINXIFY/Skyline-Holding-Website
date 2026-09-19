export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Skyline", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Governance", href: "/governance" },
    ],
  },
  {
    label: "Investments",
    children: [
      { label: "Investment Strategy", href: "/investment-strategy" },
      { label: "Investment Opportunities", href: "/investment-opportunities" },
      { label: "Investment Sectors", href: "/investment-sectors" },
      { label: "Strategic Partnerships", href: "/strategic-partnerships" },
      { label: "Investor Relations", href: "/investor-relations" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Management Services", href: "/management-services" },
      { label: "Strategic Advisory", href: "/strategic-advisory" },
    ],
  },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/contact" },
];

export const whoWeArePrinciples = [
  {
    title: "Global Perspective",
    body: "A broader view of markets, industries and opportunity.",
  },
  {
    title: "Enduring Partnerships",
    body: "Relationships built on trust, alignment and long-term value.",
  },
  {
    title: "Active Value Creation",
    body: "More than capital, strategic support designed to strengthen businesses and assets.",
  },
] as const;

export interface Sector {
  title: string;
  description: string;
  image: string;
  /** Grid span hint used to build the asymmetric mosaic. */
  span: "wide" | "tall" | "regular";
}

export const sectors: Sector[] = [
  {
    title: "Real Estate & Infrastructure",
    description:
      "Strategic investments across property, development, hospitality and essential real assets.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1400&auto=format&fit=crop",
    span: "wide",
  },
  {
    title: "Private Equity & Growth Capital",
    description:
      "Partnering with ambitious businesses where capital, strategy and active support can accelerate sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
    span: "regular",
  },
  {
    title: "Technology & AI",
    description:
      "Investing in technologies reshaping industries, productivity, infrastructure and the future of business.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop",
    span: "tall",
  },
  {
    title: "Healthcare & Life Sciences",
    description:
      "Backing healthcare, pharmaceutical and life-science opportunities driven by innovation and long-term demand.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1400&auto=format&fit=crop",
    span: "regular",
  },
  {
    title: "Financial Services & Fintech",
    description:
      "Investing across modern financial infrastructure, fintech platforms, payments and evolving financial services.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1400&auto=format&fit=crop",
    span: "regular",
  },
  {
    title: "Energy & Strategic Resources",
    description:
      "Selective exposure to energy, commodities, infrastructure and resources essential to the global economy.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1400&auto=format&fit=crop",
    span: "wide",
  },
  {
    title: "Consumer & Luxury",
    description:
      "Backing differentiated brands and premium consumer businesses with strong positioning and expansion potential.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop",
    span: "regular",
  },
  {
    title: "Special Situations",
    description:
      "Flexible capital for complex, unconventional or time-sensitive opportunities where disciplined execution can unlock value.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop",
    span: "regular",
  },
];

export const philosophyPrinciples = [
  {
    title: "Long-Term Perspective",
    body: "We look beyond short-term cycles and focus on durable fundamentals.",
  },
  {
    title: "Selective Conviction",
    body: "We focus capital where insight, quality and opportunity align.",
  },
  {
    title: "Disciplined Risk",
    body: "We seek attractive opportunities while maintaining a strong focus on protecting capital.",
  },
  {
    title: "Active Ownership",
    body: "We partner with businesses and management teams to create lasting value.",
  },
] as const;

export interface ManagementService {
  title: string;
  description: string;
  image: string;
}

export const managementServices: ManagementService[] = [
  {
    title: "Wealth Management",
    description: "Tailored wealth strategies for lasting financial confidence.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Asset Management",
    description: "Active oversight of assets across markets and cycles.",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Investment Management",
    description: "Disciplined decisions shaped by research and conviction.",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Portfolio Management",
    description: "A coherent view that balances opportunity and resilience.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Family Office Services",
    description: "Integrated support for multi-generational capital.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Private Wealth Advisory",
    description: "Independent perspective for consequential decisions.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Capital Allocation & Strategy",
    description: "Directing capital where it can compound with purpose.",
    image:
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Risk Management",
    description: "Clear-eyed assessment of exposure and downside.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1600&auto=format&fit=crop",
  },
];

export const researchCapabilities = [
  { title: "Market Analysis", detail: "Data. Context. Opportunity." },
  { title: "Economic Intelligence", detail: "Macro trends. Real impact." },
  { title: "Sector Research", detail: "Industries in focus." },
  { title: "Risk Assessment", detail: "A clearer view ahead." },
  { title: "Technology & Structural Trends", detail: "What shapes tomorrow." },
] as const;

export const responsiblePrinciples = [
  {
    title: "Responsible Ownership",
    body: "Creating sustainable long-term value.",
  },
  {
    title: "Strong Governance",
    body: "Integrity in every decision.",
  },
  {
    title: "Long-Term Thinking",
    body: "A disciplined, multi-generational view.",
  },
  {
    title: "Ethical Decision-Making",
    body: "Doing what's right, always.",
  },
] as const;

export const investorTypes = [
  "Private Investors",
  "Family Offices",
  "Institutional Partners",
  "Co-Investment Partners",
] as const;

export const capabilities = [
  {
    title: "Capital",
    body: "Patient resources aligned with long-term opportunity and sustainable growth.",
  },
  {
    title: "Strategy",
    body: "Clear direction built around strong positioning, resilience and competitive advantage.",
  },
  {
    title: "Technology",
    body: "Modern technology, AI and digital transformation that improve efficiency and strengthen decision-making.",
  },
  {
    title: "Networks",
    body: "International relationships that create access to markets, knowledge, partnerships and opportunity.",
  },
  {
    title: "Execution",
    body: "Hands-on support that turns strategic direction into measurable long-term progress.",
  },
] as const;

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export const storyMilestones = [
  {
    label: "Foundation",
    title: "Foundations",
    body: "Skyline Holding is established with a long-term vision.",
  },
  {
    label: "Expansion",
    title: "Expansion",
    body: "Growing across new sectors and markets.",
  },
  {
    label: "Diversification",
    title: "Diversification",
    body: "Building a more resilient and balanced portfolio.",
  },
  {
    label: "Today",
    title: "A Brighter Tomorrow",
    body: "Continuing to create value through people, partnerships and opportunity.",
  },
] as const;

export const aboutValues = [
  {
    title: "Integrity",
    body: "We act responsibly, communicate clearly and build trust through consistent actions.",
  },
  {
    title: "Discipline",
    body: "We make decisions based on research, patience and a clear understanding of risk.",
  },
  {
    title: "Partnership",
    body: "We believe the strongest outcomes are created through aligned, long-term relationships.",
  },
  {
    title: "Perspective",
    body: "We look beyond short-term market movements and focus on what can create lasting value.",
  },
  {
    title: "Responsibility",
    body: "We approach capital, ownership and relationships with a long-term sense of accountability.",
  },
  {
    title: "Progress",
    body: "We remain open to new ideas, technologies and better ways of building and growing businesses.",
  },
] as const;

// ---------------------------------------------------------------------------
// Investment Strategy page
// ---------------------------------------------------------------------------

export const investmentApproachPrinciples = [
  {
    title: "Research-Led Decisions",
    body: "We assess market dynamics, structural trends and downside risk before capital is deployed.",
  },
  {
    title: "Selective Conviction",
    body: "We prefer fewer, stronger opportunities where insight and alignment are clear.",
  },
  {
    title: "Active Value Creation",
    body: "Where appropriate, we support strategy, operations, partnerships and growth beyond capital alone.",
  },
] as const;

export const investmentCriteria = [
  {
    title: "Long-Term Relevance",
    body: "We focus on sectors and businesses with durable demand and future resilience.",
  },
  {
    title: "Clear Value Proposition",
    body: "We look for opportunities where the path to value creation is tangible and well supported.",
  },
  {
    title: "Risk Discipline",
    body: "We evaluate downside carefully and avoid complexity without conviction.",
  },
  {
    title: "Alignment of Interests",
    body: "We value strong partnerships, incentives and shared long-term objectives.",
  },
  {
    title: "Scalable Potential",
    body: "We favour opportunities with room to strengthen, expand or diversify over time.",
  },
] as const;

// ---------------------------------------------------------------------------
// Management Services page
// ---------------------------------------------------------------------------

export interface ServiceCard {
  title: string;
  body: string;
  image: string;
  anchor: string;
}

export const serviceOverviewCards: ServiceCard[] = [
  {
    title: "Wealth Management",
    body: "Personalized wealth strategies to preserve and grow what matters most.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    anchor: "#wealth-management",
  },
  {
    title: "Asset Management",
    body: "Active management across diverse asset classes and strategies.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
    anchor: "#asset-management",
  },
  {
    title: "Investment Management",
    body: "Disciplined investment solutions for long-term performance.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
    anchor: "#investment-management",
  },
  {
    title: "Portfolio Management",
    body: "Diversified, risk-adjusted portfolios tailored to your objectives.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
    anchor: "#portfolio-management",
  },
  {
    title: "Family Office Services",
    body: "Comprehensive solutions for multi-generational wealth and legacy planning.",
    image: "/images/slide-3.webp",
    anchor: "#family-office",
  },
  {
    title: "Private Wealth Advisory",
    body: "Trusted guidance for high-net-worth individuals and families.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    anchor: "#private-wealth-advisory",
  },
  {
    title: "Capital Allocation & Strategy",
    body: "Strategic capital deployment across opportunities and markets.",
    image:
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1200&auto=format&fit=crop",
    anchor: "#capital-allocation",
  },
  {
    title: "Risk Management",
    body: "Proactive risk management to protect and strengthen your portfolio.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
    anchor: "#risk-management",
  },
];

// ---------------------------------------------------------------------------
// Strategic Advisory page
// ---------------------------------------------------------------------------

export interface AdvisoryCard {
  title: string;
  body: string;
  image: string;
  anchor: string;
}

export const advisoryOverviewCards: AdvisoryCard[] = [
  {
    title: "Corporate Strategy",
    body: "Defining clear strategies for sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop",
    anchor: "#corporate-strategy",
  },
  {
    title: "Mergers & Acquisitions",
    body: "Advising on transactions that create lasting value.",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop",
    anchor: "#mergers-acquisitions",
  },
  {
    title: "Corporate Finance",
    body: "Strategic capital solutions for key business objectives.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    anchor: "#corporate-finance",
  },
  {
    title: "Growth Strategy",
    body: "Identifying and capturing new opportunities.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    anchor: "#growth-strategy",
  },
  {
    title: "Market Expansion",
    body: "Supporting entry into new markets globally.",
    image: "/images/slide-1.webp",
    anchor: "#market-expansion",
  },
  {
    title: "Digital Transformation",
    body: "Enabling smarter, more resilient businesses.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    anchor: "#digital-transformation",
  },
  {
    title: "AI & Technology Advisory",
    body: "Leveraging innovation for competitive advantage.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    anchor: "#ai-technology-advisory",
  },
];

export const advisoryProcessSteps = [
  {
    number: "01",
    title: "Understand",
    body: "Deep analysis of your objectives and context.",
  },
  {
    number: "02",
    title: "Develop",
    body: "Tailored strategies and solutions.",
  },
  {
    number: "03",
    title: "Execute",
    body: "Hands-on support through implementation.",
  },
  {
    number: "04",
    title: "Deliver",
    body: "Measurable, long-term value.",
  },
] as const;

export const growthJourneyStages = [
  {
    label: "Discover",
    body: "Understanding markets, capabilities and where real opportunity lies.",
  },
  {
    label: "Prioritize",
    body: "Focusing effort on the opportunities with the clearest path to value.",
  },
  {
    label: "Build",
    body: "Developing the business model and capabilities growth requires.",
  },
  {
    label: "Scale",
    body: "Executing with discipline to turn potential into results.",
  },
] as const;

export const whySkylineDifferentiators = [
  {
    title: "Global Perspective",
    body: "Access to international markets, ideas and opportunities.",
  },
  {
    title: "Sector Expertise",
    body: "Deep understanding across industries and growth markets.",
  },
  {
    title: "Practical Solutions",
    body: "Strategies designed to be implemented, not simply presented.",
  },
  {
    title: "Long-Term Partnership",
    body: "A commitment to value beyond the immediate engagement.",
  },
] as const;

// ---------------------------------------------------------------------------
// Strategic Partnerships page
// ---------------------------------------------------------------------------

export interface PartnerType {
  label: string;
  title: string;
  body: string;
  image: string;
}

export const partnerTypes: PartnerType[] = [
  {
    label: "01",
    title: "Investors",
    body: "Partnering with sophisticated investors to access compelling global opportunities.",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "02",
    title: "Founders & Entrepreneurs",
    body: "Supporting ambitious founders with capital, expertise and strategic guidance.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "03",
    title: "Family Offices",
    body: "Long-term collaboration with family offices to preserve and grow wealth across generations.",
    image: "/images/slide-3.webp",
  },
  {
    label: "04",
    title: "Institutions",
    body: "Working with institutional partners on strategic investments and initiatives.",
    image:
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "05",
    title: "Strategic Capital Partners",
    body: "Co-investing with aligned partners to pursue high-conviction opportunities.",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop",
  },
];

export const partnershipJourney = [
  { label: "Align", body: "Understand shared objectives and values." },
  { label: "Collaborate", body: "Structure the right partnership model." },
  { label: "Execute", body: "Combine capabilities to create value." },
  { label: "Grow", body: "Build a long-term relationship for the future." },
] as const;

export const partnershipPrinciples = [
  { title: "Selectivity", body: "We partner with those who share our vision and values." },
  { title: "Alignment", body: "Shared objectives create mutual success." },
  { title: "Integrity", body: "Transparency and responsible partnership." },
  { title: "Long-Term Perspective", body: "Commitment beyond the next deal." },
] as const;

export interface StrategicPartner {
  name: string;
  externalUrl: string;
  /** No verified photo exists yet — rendered with the shared initials treatment. */
  image: string | null;
}

// Only the two names the client supplied are used here. No deal history,
// ownership, board positions or partnership dates are stated anywhere, since
// none of that has been verified for public use.
export const strategicPartners: StrategicPartner[] = [
  {
    name: "Ayman Hariri",
    externalUrl: "https://en.wikipedia.org/wiki/Ayman_Hariri",
    image: null,
  },
  {
    name: "Naguib Sawiris",
    externalUrl: "https://fr.wikipedia.org/wiki/Naguib_Sawiris",
    image: null,
  },
];

// ---------------------------------------------------------------------------
// Investor Relations page
// ---------------------------------------------------------------------------

export interface ImagePanel {
  title: string;
  body: string;
  image: string;
}

export const irPartnerTypes: ImagePanel[] = [
  {
    title: "Private Investors",
    body: "Long-term investors seeking selective opportunities and strategic guidance.",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Family Offices",
    body: "Multi-generational capital focused on preservation, diversification and long-term growth.",
    image: "/images/slide-3.webp",
  },
  {
    title: "Institutional Partners",
    body: "Organizations looking for structured investment and co-investment relationships.",
    image:
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Strategic Capital Partners",
    body: "Partners seeking aligned opportunities where capital, expertise and networks can work together.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
  },
];

export const investorResources = [
  "Investment Briefs",
  "Market Insights",
  "Due Diligence Materials",
  "Portfolio Updates",
] as const;

// ---------------------------------------------------------------------------
// Governance page
// ---------------------------------------------------------------------------

export const governancePillars = [
  {
    title: "Investment Oversight",
    body: "Discipline before deployment. We evaluate strategic fit, risk, financial quality and long-term value creation.",
    link: "Our Investment Process",
  },
  {
    title: "Risk Management",
    body: "Understanding risk is part of creating value. We assess financial, operational, market and strategic risks throughout the investment lifecycle.",
    link: "Our Risk Approach",
  },
  {
    title: "Ethics & Compliance",
    body: "Integrity without compromise. We expect high standards of conduct, transparency and compliance with applicable legal and regulatory requirements.",
    link: "Our Standards",
  },
  {
    title: "Responsible Investment",
    body: "Ownership with a long-term perspective. We consider sustainability and broader impacts when evaluating opportunities.",
    link: "Our Commitment",
  },
] as const;

// ---------------------------------------------------------------------------
// Leadership page
// ---------------------------------------------------------------------------

export interface LeadershipMember {
  name: string;
  role: string;
  /** Short display form used on the gallery card, e.g. "CEO". */
  shortRole: string;
  shortBio: string;
  /** Local path when a verified photo exists; null falls back to the shared initials treatment. */
  image: string | null;
}

// Only the six confirmed Skyline team members are listed here — no invented
// biographies, tenure, prior employers or qualifications.
export const leadershipTeam: LeadershipMember[] = [
  {
    name: "Marc Torres",
    role: "Chief Executive Officer",
    shortRole: "CEO",
    shortBio: "Leading Skyline Holding's long-term strategy, investment direction and global development.",
    image: null,
  },
  {
    name: "Dave Mora",
    role: "Chief Financial Officer",
    shortRole: "CFO",
    shortBio: "Responsible for financial strategy, capital planning and financial oversight.",
    image: null,
  },
  {
    name: "Harry Roch",
    role: "Asset Manager",
    shortRole: "Asset Manager",
    shortBio: "Focused on asset management, portfolio oversight and long-term value creation.",
    image: "/images/Asset-manager-Harry-Roch.jpeg",
  },
  {
    name: "George Sánchez",
    role: "International Broker",
    shortRole: "International Broker",
    shortBio: "Supporting international opportunities, relationships and cross-border transactions.",
    image: "/images/George-Sánchez.jpeg",
  },
  {
    name: "Andrea Ruiz",
    role: "International Broker",
    shortRole: "International Broker",
    shortBio: "Connecting international opportunities with strategic relationships across markets.",
    image: "/images/Andrea-Ruiz.jpeg",
  },
  {
    name: "Franck Lemann",
    role: "Investor Relations",
    shortRole: "Investor Relations",
    shortBio: "Supporting Skyline's relationships with investors and strategic capital partners.",
    image: "/images/Franck-Lemann.jpeg",
  },
];

export const leadershipStats = [
  { value: "6", label: "Leadership Team Members" },
  { value: "1", label: "Long-Term Vision" },
  { value: "A Global", label: "Perspective" },
] as const;

export const leadershipValues = [
  { title: "Integrity", body: "Doing what is right, always." },
  { title: "Long-Term Perspective", body: "Creating value for generations." },
  { title: "Collaboration", body: "Stronger outcomes together." },
  { title: "Responsible Growth", body: "Progress with purpose." },
] as const;

// ---------------------------------------------------------------------------
// Shared company data — single source of truth for legal/registration
// details. Every page and component that displays this information must
// read from here — never hardcode these values separately.
// ---------------------------------------------------------------------------

export const companyInfo = {
  legalName: "SKYLINE HOLDING, SLU",
  displayName: "Skyline Holding",
  ceo: "Marc Torres",
  registeredAddress: "Plaça Guillemó, 3, AD500 Andorra la Vella, Andorra",
  registryId: "16535",
  commercialRegister: "16535",
  lei: "21380015GF7FFCSMRL38",
  entityStatus: "ACTIVE",
  registrationDate: "11.12.2016",
  shareCapital: "€32,464,255",
} as const;

export const registryDocument = {
  title: "Company Register",
  subtitle: "Registre de Societats Mercantils",
  path: "/documents/SKYLINE_HOLDING_Andorra_Company_Registry.pdf",
  registryBook: "S-207",
  externalCertificateUrl:
    "https://www.e-tramits.ad/tramits/ca/certificat-de-societat-mercantil-andorrana/p/GV000900",
} as const;

// ---------------------------------------------------------------------------
// Contact page
// ---------------------------------------------------------------------------

export interface ContactChannel {
  label: string;
  title: string;
  body: string;
  cta?: string;
  href?: string;
}

// Only verified information is shown here. Email and phone are intentionally
// left as "not yet confirmed" rather than fabricated — see the codebase-wide
// rule against inventing contact details.
export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    title: "Contact by Email",
    body: "For general enquiries, partnerships and business communication, please use the contact form below.",
    cta: "Send a Message",
    href: "#contact-form",
  },
  {
    label: "Phone",
    title: "Telephone",
    body: "Direct telephone details can be added here once confirmed.",
  },
  {
    label: "Headquarters",
    title: "Andorra la Vella",
    body: companyInfo.registeredAddress,
  },
  {
    label: "General Enquiries",
    title: "General Enquiries",
    body: "Use our contact form and the appropriate team will respond.",
    cta: "Contact Form",
    href: "#contact-form",
  },
];

export const enquiryTypes = [
  "General Enquiry",
  "Investment Opportunity",
  "Investor Relations",
  "Strategic Partnership",
  "Management Services",
  "Strategic Advisory",
  "Media / Insights",
  "Other",
] as const;

// ---------------------------------------------------------------------------
// Legal / Company Information page
// ---------------------------------------------------------------------------

export interface LegalDocument {
  id: string;
  title: string;
  body: string;
  href?: string;
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "company-registration",
    title: "Company Register",
    body: "Official registration extract (Registre de Societats Mercantils).",
    href: "#company-register",
  },
  { id: "articles-of-association", title: "Articles of Association", body: "Constitution and statutes." },
  {
    id: "impressum",
    title: "Impressum",
    body: "Company and website information.",
    href: "/impressum",
  },
  { id: "legal-notice", title: "Legal Notice", body: "Website legal information." },
  { id: "privacy-policy", title: "Privacy Policy", body: "How we handle data.", href: "/privacy" },
  { id: "terms-of-use", title: "Terms of Use", body: "Terms governing use of the website.", href: "/terms" },
];

export const longTermDifferentiators = [
  "Long-Term Perspective",
  "Tailored Solutions",
  "Disciplined Process",
  "Global Outlook",
] as const;

export const thinkingPrinciples = [
  {
    title: "Think Long Term",
    body: "We focus on businesses, assets and trends that can remain relevant beyond short-term market cycles.",
  },
  {
    title: "Be Selective",
    body: "We prefer quality over quantity and pursue opportunities where the potential is clear and the risk can be understood.",
  },
  {
    title: "Understand Before Acting",
    body: "Research, market context and careful analysis come before investment decisions.",
  },
  {
    title: "Create Value Actively",
    body: "Where appropriate, we work alongside businesses and partners to strengthen strategy, operations, technology and growth.",
  },
  {
    title: "Protect Downside",
    body: "Capital preservation and risk awareness are central to how we evaluate opportunities.",
  },
  {
    title: "Stay Adaptable",
    body: "Markets change. Technology evolves. Our approach remains disciplined, but never static.",
  },
] as const;

// ---------------------------------------------------------------------------
// Investment Opportunities page
// ---------------------------------------------------------------------------

export const opportunityTypes = [
  { title: "Growth Capital", body: "Supporting ambitious businesses with long-term growth potential." },
  { title: "Private Equity", body: "Investing in established businesses to accelerate sustainable growth." },
  { title: "Real Assets", body: "Opportunities in real estate, infrastructure and tangible assets." },
  { title: "Strategic Investments", body: "Backing strategic initiatives and transformational opportunities." },
  { title: "Special Situations", body: "Complex opportunities where capital and expertise can unlock value." },
  { title: "Co-Investment", body: "Partnering with like-minded investors on attractive opportunities." },
] as const;

export const opportunityCriteria = [
  { title: "Strong Fundamentals", body: "A clear economic foundation." },
  { title: "Long-Term Relevance", body: "Positioned for sustainable demand." },
  { title: "Scalable Potential", body: "Clear pathways for growth." },
  { title: "Strategic Fit", body: "Alignment with our expertise." },
  { title: "Clear Risk Profile", body: "Risks that can be assessed and managed." },
  { title: "Aligned Partners", body: "Shared vision and objectives." },
] as const;

export const investmentStructures = [
  "Direct Investments",
  "Equity Participation",
  "Growth Capital",
  "Co-Investments",
  "Joint Ventures",
  "Strategic Capital",
  "Selected Special Situations",
] as const;

export const opportunityProcessSteps = [
  { number: "01", title: "Introduce", body: "Opportunity presented for initial review." },
  { number: "02", title: "Evaluate", body: "Assess strategic fit, fundamentals and risk." },
  { number: "03", title: "Structure", body: "Explore the right investment structure." },
  { number: "04", title: "Execute", body: "Complete due diligence and deploy capital." },
  { number: "05", title: "Create Value", body: "Support long-term development and growth." },
] as const;

// ---------------------------------------------------------------------------
// Investment Sectors page
// ---------------------------------------------------------------------------

export const sectorPhilosophyThemes = [
  { title: "Real Assets", body: "Tangible value for tomorrow." },
  { title: "Innovation", body: "Backing transformational ideas." },
  { title: "Essential Industries", body: "Investing in what matters." },
  { title: "Private Markets", body: "Long-term capital. Greater potential." },
] as const;

export interface InvestmentSector {
  title: string;
  body: string;
  focus: string[];
  image: string;
}

export const investmentSectors: InvestmentSector[] = [
  {
    title: "Real Estate & Infrastructure",
    body: "Investing in strategically located real estate, development opportunities and infrastructure assets supported by long-term utility and resilient demand.",
    focus: ["Property", "Development", "Infrastructure", "Hospitality"],
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Private Equity & Growth Capital",
    body: "Partnering with ambitious businesses where capital, strategic guidance and operational support can accelerate sustainable growth.",
    focus: ["Growth Businesses", "Buyouts", "Expansion Capital", "Strategic Equity"],
    image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Technology & AI",
    body: "Investing in technologies reshaping productivity, business models and digital infrastructure, including artificial intelligence, automation and enterprise software.",
    focus: ["AI", "Automation", "Software", "Digital Infrastructure"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Healthcare & Life Sciences",
    body: "Supporting businesses operating in essential healthcare markets where innovation, demographic demand and scientific progress create long-term opportunity.",
    focus: ["Healthcare Services", "MedTech", "Pharmaceuticals", "Life Sciences"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Financial Services & Fintech",
    body: "Exploring businesses improving access, efficiency and infrastructure across financial services, payments and digital finance.",
    focus: ["Payments", "Fintech", "Wealth Technology", "Financial Infrastructure"],
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Energy & Strategic Resources",
    body: "Investing across energy systems, critical resources and infrastructure essential to economic development, resilience and the global energy transition.",
    focus: ["Renewables", "Traditional Energy", "Critical Minerals", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Consumer & Luxury",
    body: "Backing differentiated brands and businesses built around quality, customer loyalty, evolving lifestyles and premium experiences.",
    focus: ["Luxury", "Consumer Brands", "Hospitality", "Lifestyle"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Special Situations",
    body: "Evaluating opportunities created by complexity, transition, dislocation or underutilized potential where disciplined capital can unlock value.",
    focus: ["Turnarounds", "Distressed Assets", "Corporate Transitions", "Undervalued Opportunities"],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop",
  },
];

export const crossSectorThemes = [
  {
    theme: "AI × Healthcare",
    body: "Intelligence transforming care, diagnostics and healthcare delivery.",
  },
  {
    theme: "Technology × Financial Services",
    body: "Digital infrastructure reshaping payments, access and financial experiences.",
  },
  {
    theme: "Real Estate × Hospitality",
    body: "Physical assets enhanced by experience, destination and service.",
  },
  {
    theme: "Energy × Infrastructure",
    body: "Essential systems supporting resilience, transition and long-term growth.",
  },
  {
    theme: "Consumer × Technology",
    body: "Technology creating new products, experiences and ways to connect with customers.",
  },
] as const;

export const sectorPrinciples = [
  "Long-Term Relevance",
  "Quality Fundamentals",
  "Strategic Advantage",
  "Risk Awareness",
  "Scalable Potential",
  "Active Value Creation",
] as const;
