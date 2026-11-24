// "What buyers paid" evidence, one entry per sector report. Edit the figures here.
// Every figure is taken from the executive summary of that sector report,
// so if a report changes, change its entry to match.
export type Evidence = {
  sector: string;
  deals: number; // deals logged in the report
  multiple: string;
  basis: string;
};

export const REPORT_EVIDENCE: Record<string, Evidence> = {
  'commercial-insurance-brokers-ma-2026': { sector: 'Insurance brokers', deals: 157, multiple: '4x to 6x', basis: 'annual income, profitable brokers, our estimate' },
  'fire-security-life-safety-ma-2026': { sector: 'Fire and security', deals: 93, multiple: '4x to 6x', basis: 'EBITDA, three small security deals' },
  'test-measurement-instruments-ma-2026': { sector: 'Test and measurement', deals: 57, multiple: '4.5x to 7.3x', basis: 'EBIT, listed buyers, deals under £15m' },
  'plant-hire-equipment-rental-ma-2026': { sector: 'Plant hire', deals: 35, multiple: '5.9x', basis: 'EBITDA (one specialist deal)' },
  'packaging-ma-2026': { sector: 'Packaging', deals: 33, multiple: '4.2x to 5.6x', basis: 'EBITDA up front' },
  'engineering-technical-services-ma-2026': { sector: 'Engineering and technical services', deals: 92, multiple: '6x to 10x', basis: 'EBITDA, lower mid-market testing and inspection' },
  'specialist-manufacturing-ma-2026': { sector: 'Specialist manufacturing', deals: 74, multiple: '4x to 7x', basis: 'EBITDA, broker planning range' },
  'care-complex-care-ma-2026': { sector: 'Care and complex care', deals: 56, multiple: '5x to 7x', basis: 'EBITDA, smaller specialist care platforms' },
};

// Rows shown in the homepage hero ledger, in this order.
export const HOME_EVIDENCE: string[] = [
  'commercial-insurance-brokers-ma-2026',
  'fire-security-life-safety-ma-2026',
  'test-measurement-instruments-ma-2026',
  'plant-hire-equipment-rental-ma-2026',
  'packaging-ma-2026',
];

export function evidenceForHref(href: string): Evidence | undefined {
  const m = href.match(/\/insights\/([^/]+)\/?$/);
  return m ? REPORT_EVIDENCE[m[1]] : undefined;
}
