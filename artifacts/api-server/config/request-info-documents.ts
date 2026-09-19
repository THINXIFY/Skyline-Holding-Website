export interface RequestInfoDocument {
  id: string;
  /** Human-readable filename the recipient sees as the email attachment. */
  filename: string;
  /** Path relative to artifacts/api-server/private/documents/. */
  filePath: string;
  enabled: boolean;
}

export const requestInfoDocuments: RequestInfoDocument[] = [
  {
    id: "andorra-company-registry",
    filename: "SKYLINE_HOLDING_Andorra_Company_Registry.pdf",
    filePath: "SKYLINE_HOLDING_Andorra_Company_Registry.pdf",
    enabled: true,
  },
];
