// Homepage hero ledger: "What buyers paid". Edit the rows here.
// Every figure is taken from the executive summary of the linked sector report,
// so if a report changes, change its row to match.
export type EvidenceRow = {
  slug: string; // sector report the row links to
  sector: string;
  deals: number; // deals logged in the report, January 2024 to mid-November 2026
  multiple: string;
  basis: string;
};

export const HOME_EVIDENCE: EvidenceRow[] = [
  { slug: 'commercial-insurance-brokers-ma-2026', sector: 'Insurance brokers', deals: 157, multiple: '4x to 6x', basis: 'annual income, our estimate' },
  { slug: 'fire-security-life-safety-ma-2026', sector: 'Fire and security', deals: 93, multiple: '4x to 6x', basis: 'EBITDA, small security deals' },
  { slug: 'test-measurement-instruments-ma-2026', sector: 'Test and measurement', deals: 57, multiple: '4.5x to 7.3x', basis: 'EBIT, deals under £15m' },
  { slug: 'plant-hire-equipment-rental-ma-2026', sector: 'Plant hire', deals: 35, multiple: '5.9x', basis: 'EBITDA, clearest specialist price' },
  { slug: 'packaging-ma-2026', sector: 'Packaging', deals: 33, multiple: '5.4x to 7.7x', basis: 'EBITDA, with full earn-out' },
];
