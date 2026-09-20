export interface RequestInfoDocument {
  id: string;
  /** Human-readable filename the recipient sees as the email attachment. */
  filename: string;
  /** Path relative to artifacts/api-server/private/documents/. */
  filePath: string;
  enabled: boolean;
}

// Every enabled document below is attached to the email a visitor receives
// after a successful OTP verification (all of them, in this order). To add a
// document: copy the PDF into artifacts/api-server/private/documents/, add an
// entry here, then redeploy (the list is compiled into the API).
// Set `enabled: false` to stop sending one without deleting the file.
//
// The company registration certificate is also published on the website
// (artifacts/mockup-sandbox/public/documents/); when it changes, replace BOTH
// copies - a test fails if they differ.
export const requestInfoDocuments: RequestInfoDocument[] = [
  {
    id: "company-registration-certificate",
    filename: "SKYLINE_HOLDING_Registry.pdf",
    filePath: "SKYLINE_HOLDING_Registry.pdf",
    enabled: true,
  },
  {
    id: "investment-portfolio-report-2026",
    filename: "Skyline_Holding_Investment_Portfolio_Report_2026.pdf",
    filePath: "Skyline_Holding_Investment_Portfolio_Report_2026.pdf",
    enabled: true,
  },
  {
    id: "investment-performance-portfolio-activity-report-2026",
    filename: "Skyline_Holding_Investment_Performance_Portfolio_Activity_Report_2026.pdf",
    filePath: "Skyline_Holding_Investment_Performance_Portfolio_Activity_Report_2026.pdf",
    enabled: true,
  },
  {
    id: "investment-portfolio-asset-allocation-report-2026",
    filename: "Skyline_Holding_Investment_Portfolio_Asset_Allocation_Report_2026.pdf",
    filePath: "Skyline_Holding_Investment_Portfolio_Asset_Allocation_Report_2026.pdf",
    enabled: true,
  },
  {
    id: "strategic-investment-partnerships-report",
    filename: "Skyline_Holding_Strategic_Investment_Partnerships_Report.pdf",
    filePath: "Skyline_Holding_Strategic_Investment_Partnerships_Report.pdf",
    enabled: true,
  },
  {
    id: "renewable-energy-investment-portfolio",
    filename: "Skyline_Holding_Renewable_Energy_Investment_Portfolio.pdf",
    filePath: "Skyline_Holding_Renewable_Energy_Investment_Portfolio.pdf",
    enabled: true,
  },
  {
    id: "solar-farm-investment-report",
    filename: "Skyline_Holding_Solar_Farm_Investment_Report.pdf",
    filePath: "Skyline_Holding_Solar_Farm_Investment_Report.pdf",
    enabled: true,
  },
  {
    id: "strategic-partnership-mercedes-benz",
    filename: "Skyline_Holding_Mercedes_Benz_Strategic_Partnership_Agreement.pdf",
    filePath: "Skyline_Holding_Mercedes_Benz_Strategic_Partnership_Agreement.pdf",
    enabled: true,
  },
  {
    id: "strategic-partnership-nafta-oil",
    filename: "Skyline_Holding_NAFTA_Oil_Strategic_Partnership_Agreement.pdf",
    filePath: "Skyline_Holding_NAFTA_Oil_Strategic_Partnership_Agreement.pdf",
    enabled: true,
  },
];
