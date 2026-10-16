/**
 * Copy and figures for the first five sections of the protected /portfolio page
 * (Investment Thesis). Everything here describes Skyline Holding's investment
 * criteria and targets - it does not claim any existing holdings, licences,
 * approvals or returns.
 */

export const HERO = {
  eyebrow: "Investment Thesis · Confidential",
  lines: ["Patient capital", "for the technologies"],
  emphasis: "that endure.",
  copy: "Skyline Holding deploys long-term capital into growth-stage companies across life sciences, healthcare technology, sustainable food systems and next-generation energy infrastructure — with a focus on the United States, the United Kingdom and Europe — and structures its investment activity from Andorra.",
  primaryCta: { label: "Read the thesis", href: "#conviction" },
  // The site's real contact route (the same destination the Investor Relations CTAs use).
  secondaryCta: { label: "Discuss a co-investment", href: "/contact" },
} as const;

export const HERO_METRICS = [
  { value: "4", label: "Conviction sectors" },
  { value: "3", label: "Core markets · US · UK · EU" },
  { value: "$2–15", unit: "M", label: "Initial ticket" },
  { value: "5–8", unit: "YRS", label: "Holding horizon" },
] as const;

export const CONVICTION = {
  eyebrow: "01 — Conviction",
  headingLead: "We back what the world",
  headingEmphasis: "cannot do without.",
  copy: "Health, food and energy are not cycles; they are necessities. We focus on companies re-engineering essential systems through science, regulation and capital-intensive innovation — areas where durable barriers to entry can reward patient, disciplined investors.",
  principles: [
    {
      n: "01",
      title: "Science before narrative",
      body: "Every thesis begins with evidence, technical validation and independent expertise rather than market momentum.",
    },
    {
      n: "02",
      title: "Moats built by regulation",
      body: "Complex regulatory pathways can create durable barriers to entry for companies that successfully navigate them.",
    },
    {
      n: "03",
      title: "De-risked, not speculative",
      body: "We seek opportunities where key technical, commercial or regulatory risks have already been meaningfully reduced.",
    },
  ],
} as const;

export interface Sector {
  id: "biotech" | "medtech" | "agritech" | "nuclear";
  tab: string;
  share: number;
  eyebrow: string;
  caption: string;
  title: string;
  description: string;
  criteria: readonly string[];
  stage: string;
}

export const SECTORS_SECTION = {
  eyebrow: "02 — Target Sectors",
  headingLead: "Four sectors.",
  headingEmphasis: "One discipline.",
  copy: "Each sector is assessed through a dedicated investment thesis, specialist expertise and explicit entry criteria.",
} as const;

export const SECTORS: readonly Sector[] = [
  {
    id: "biotech",
    tab: "Biotech",
    share: 30,
    eyebrow: "01 · Programmable medicine",
    caption: "Programmable medicine",
    title: "Biotech",
    description:
      "Gene editing, AI-enabled drug discovery, biologics and next-generation manufacturing are reshaping development timelines. Skyline favours platform businesses with multiple opportunities for value creation rather than single-asset dependency.",
    criteria: [
      "Platform with two or more clinical or commercial programmes",
      "Partnering, licensing or strategic validation",
      "Credible path to scalable manufacturing",
    ],
    stage: "Series B → pre-IPO",
  },
  {
    id: "medtech",
    tab: "MedTech",
    share: 25,
    eyebrow: "02 · Care that moves to the patient",
    caption: "Care that moves to the patient",
    title: "MedTech",
    description:
      "Implantables, point-of-care diagnostics and surgical systems with clear regulatory and reimbursement pathways. We favour validated products with recurring revenue models over early concepts.",
    criteria: [
      "Regulatory clearance or equivalent pathway demonstrated",
      "Reimbursement or payer evidence",
      "Recurring consumables, software or service revenue",
    ],
    stage: "Series B → Growth",
  },
  {
    id: "agritech",
    tab: "AgriTech",
    share: 20,
    eyebrow: "03 · Yield without depletion",
    caption: "Yield without depletion",
    title: "AgriTech",
    description:
      "Biological inputs, precision robotics and resilient supply chains address a structural challenge: increasing food output while reducing land use, chemical intensity and waste.",
    criteria: ["Multi-season field data", "Paying growers or commercial users", "Positive unit economics at scale"],
    stage: "Series A → Series B",
  },
  {
    id: "nuclear",
    tab: "Nuclear · SMR",
    share: 25,
    eyebrow: "04 · Firm, carbon-free power",
    caption: "Firm, carbon-free power",
    title: "Nuclear · SMR",
    description:
      "Data centres, advanced industry and modern power grids require reliable baseload capacity. Small modular reactors, microreactors and the supporting fuel cycle are emerging as strategic infrastructure opportunities.",
    criteria: [
      "Active regulatory engagement",
      "Site, customer or offtake progress",
      "Credible fuel and supply-chain strategy",
    ],
    stage: "Growth → pre-IPO",
  },
];

export const HOW_WE_INVEST = {
  eyebrow: "03 — How We Invest",
  headingLead: "Sized to matter.",
  headingEmphasis: "Structured to protect.",
  intro:
    "We deploy meaningful capital into high-conviction opportunities, with a disciplined structure and a long-term perspective designed to protect and compound value.",
  parametersLabel: "Investment parameters",
  ticketLabel: "Ticket size · USD",
  ticketPoints: [
    { value: "$2M", label: "Entry" },
    { value: "$15M", label: "Core range" },
    { value: "$25M+", label: "With follow-ons" },
  ],
  ticketCopy:
    "Initial investments generally target USD 2–15 million, with total exposure potentially increasing through follow-on participation.",
  allocationLabel: "Target geographic allocation",
  allocation: [
    { code: "US", name: "United States", pct: 60 },
    { code: "UK", name: "United Kingdom", pct: 25 },
    { code: "EU", name: "Europe", pct: 15 },
  ],
  parameters: [
    { icon: "stage", label: "Stage", value: "Series A to pre-IPO" },
    { icon: "position", label: "Position", value: "Minority positions · lead or co-lead where appropriate" },
    { icon: "instruments", label: "Instruments", value: "Preferred equity, convertibles and structured secondaries" },
    { icon: "horizon", label: "Horizon", value: "5–8 years · patient capital approach" },
    { icon: "portfolio", label: "Portfolio", value: "8–12 concentrated positions" },
    { icon: "governance", label: "Governance", value: "Board or observer participation where appropriate" },
  ],
} as const;

export const WHAT_WE_BRING = {
  eyebrow: "04 — What We Bring",
  headingLead: "More than",
  headingEmphasis: "a cheque.",
  capabilities: [
    {
      icon: "patient",
      title: "Patient capital",
      body: "Long-term capital without the short investment horizon typically associated with conventional fund structures.",
    },
    {
      icon: "structuring",
      title: "Cross-border structuring",
      body: "Investment, holding and governance structures designed for international growth and cross-border ownership, coordinated from Andorra.",
    },
    {
      icon: "europe",
      title: "European gateway",
      body: "Introductions and strategic access across European markets, institutions, operators and commercial partners.",
    },
    {
      icon: "network",
      title: "Co-investment network",
      body: "Relationships with private investors, family offices and institutional counterparties that may participate in later financing rounds.",
    },
    {
      icon: "governance",
      title: "Board-level governance",
      body: "Disciplined reporting, governance and strategic oversight designed to support institutional-quality growth.",
    },
    {
      icon: "advisory",
      title: "Specialist advisory",
      body: "Independent scientific, technical and sector specialists incorporated into diligence where appropriate.",
    },
  ],
} as const;
