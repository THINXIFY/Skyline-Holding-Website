/**
 * Copy for sections 6-10 of the protected /portfolio page: Portfolio Profiles, Process,
 * Guardrails, Closing CTA and the confidential note.
 *
 * The nine company cards below are the profiles supplied by Skyline Holding for this page
 * (names, descriptions, sectors, stages, locations and marks exactly as provided). The content
 * owner is responsible for their accuracy: they are presented as portfolio companies.
 */

export const PROFILES_SECTION = {
  eyebrow: "05 — Portfolio Profiles",
  headingLead: "The companies",
  headingEmphasis: "we look for.",
  copy: "Selected company profiles representing the sectors, stages and markets aligned with Skyline Holding\u2019s investment thesis.",
  // Pill shown on every card.
  cardLabel: "Portfolio",
} as const;

export type NameStyle = "sans" | "caps" | "light" | "italic" | "serif" | "serifBold" | "lower";

export interface CompanyProfile {
  name: string;
  nameStyle: NameStyle;
  /** File name in public/icons/companies-logos (marks supplied by Skyline Holding). */
  logo: string;
  category: string;
  description: string;
  /** Sector terms then stage, e.g. "Nuclear · SMR · Growth" (the last term is the stage). */
  profile: string;
  location: string;
}

/** URL for a supplied mark (file names contain spaces/brackets, so encode). */
export const logoUrl = (file: string): string => encodeURI(`/icons/companies-logos/${file}`);

export const PROFILES: readonly CompanyProfile[] = [
  {
    name: "Quivaris",
    nameStyle: "sans",
    logo: "download (8).svg",
    category: "Therapeutics",
    description: "In vivo gene editing for rare liver disorders; two programmes in the clinic.",
    profile: "Biotech · Series B",
    location: "Boston, MA — United States",
  },
  {
    name: "KESTRELCORE",
    nameStyle: "caps",
    logo: "download (7).svg",
    category: "Energy",
    description: "Transportable microreactors for data centres and remote industrial sites.",
    profile: "Nuclear · SMR · Growth",
    location: "Idaho Falls, ID — United States",
  },
  {
    name: "Ostrevo",
    nameStyle: "light",
    logo: "download (6).svg",
    category: "Diagnostics",
    description: "Point-of-care molecular diagnostics delivering lab-grade results in 20 minutes.",
    profile: "MedTech · Series B",
    location: "Oxford — United Kingdom",
  },
  {
    name: "Sowarden",
    nameStyle: "italic",
    logo: "download (5).svg",
    category: "Agronomics",
    description: "Microbial nitrogen inputs replacing synthetic fertiliser, sold across three seasons.",
    profile: "AgriTech · Series B",
    location: "Des Moines, IA — United States",
  },
  {
    name: "Elbrion",
    nameStyle: "serif",
    logo: "download (4).svg",
    category: "Biologics",
    description: "Continuous manufacturing of mRNA and biologics at a fraction of batch cost.",
    profile: "Biotech · Growth",
    location: "Hamburg — Europe",
  },
  {
    name: "Sorrendel",
    nameStyle: "serifBold",
    logo: "download (3).svg",
    category: "Medical",
    description: "Closed-loop neurostimulation implant, FDA-cleared, with recurring software revenue.",
    profile: "MedTech · Series C",
    location: "Minneapolis, MN — United States",
  },
  {
    name: "THORVANE",
    nameStyle: "caps",
    logo: "download (2).svg",
    category: "Fuel Systems",
    description: "Advanced fuel fabrication for the next generation of small modular reactors.",
    profile: "Nuclear · SMR · Series B",
    location: "Warrington — United Kingdom",
  },
  {
    name: "heliomyx",
    nameStyle: "lower",
    logo: "download (1).svg",
    category: "Bio",
    description: "AI-designed antibodies with a licensing deal already signed with a top-20 pharma group.",
    profile: "Biotech · Series A",
    location: "San Diego, CA — United States",
  },
  {
    name: "Feldkeim",
    nameStyle: "serifBold",
    logo: "download.svg",
    category: "Robotics",
    description: "Autonomous precision-weeding robots cutting herbicide use by up to 90%.",
    profile: "AgriTech · Series A",
    location: "Munich — Europe",
  },
];

export const PROCESS = {
  eyebrow: "06 — Process",
  headingLead: "From first conversation to closing,",
  headingEmphasis: "with rigour.",
  copy: "A disciplined, research-driven investment process supported by specialist expertise at every stage.",
  stages: [
    {
      icon: "sourcing",
      weeks: "Weeks 0–2",
      title: "Sourcing",
      body: "Opportunities are identified through direct relationships, co-investors, specialist networks, founders, advisers and selected intermediaries.",
    },
    {
      icon: "screening",
      weeks: "Weeks 2–4",
      title: "Screening",
      body: "Initial assessment of thesis fit, management quality, technical maturity, market position and strategic relevance.",
    },
    {
      icon: "diligence",
      weeks: "Weeks 4–10",
      title: "Diligence",
      body: "Scientific, technical, regulatory, commercial, financial and legal diligence supported by independent specialists where appropriate.",
    },
    {
      icon: "committee",
      weeks: "Weeks 10–14",
      title: "Committee & Structuring",
      body: "Investment committee review, valuation, terms, documentation and cross-border structuring coordinated through Skyline Holding in Andorra.",
    },
    {
      icon: "value",
      weeks: "Ongoing",
      title: "Value Creation",
      body: "Governance support, strategic introductions, commercial development, follow-on capital planning and preparation for future liquidity events.",
    },
  ],
} as const;

export const GUARDRAILS = {
  eyebrow: "Our Guardrails",
  headingLead: "What we will",
  headingEmphasis: "not do.",
  items: [
    {
      icon: "binary",
      title: "No single-asset, single-event binary bets",
      body: "We avoid investment cases where the entire outcome depends on one unresolved technical or regulatory event.",
    },
    {
      icon: "leverage",
      title: "No excessive leverage at holding-company level",
      body: "Capital structures should preserve flexibility rather than force outcomes.",
    },
    {
      icon: "review",
      title: "No investment without appropriate independent review",
      body: "Scientific, technical or sector expertise is incorporated into diligence where the opportunity requires it.",
    },
    {
      icon: "pathway",
      title: "No infrastructure or hardware investment without a credible pathway",
      body: "Regulatory, commercial, supply-chain and deployment risks must be understood before capital is committed.",
    },
  ],
} as const;

export const CLOSING_CTA = {
  headingLead: "Building in one of our sectors,",
  headingEmphasis: "or looking to co-invest?",
  copy: "We welcome qualified opportunities and co-investment conversations across the sectors and markets defined by our investment thesis.",
  // The introduction request goes to the site's real contact route.
  primary: { label: "Request an introduction", href: "/contact" },
  // The real pitch deck already published with the site (public/documents).
  deck: { label: "Read pitch deck", href: "/documents/Skyline-Holding-slu-pitch-deck.pdf" },
} as const;

export const CONFIDENTIAL_NOTE = {
  main: "For qualified investors and professional counterparties. Investment parameters reflect Skyline Holding\u2019s current approach and are tailored to each opportunity.",
} as const;
