// Insights page configuration. Edit these lists to change what the /insights/ page shows.

// Featured row: three or four items, shown in this order.
// Use an article slug, or LATEST_ARTICLE for the newest article that is not a sector report.
export const LATEST_ARTICLE = 'latest-article';

export const FEATURED: string[] = [
  LATEST_ARTICLE,
  'recruitment-staffing-ma-2026',
  'fire-security-life-safety-ma-2026',
  'commercial-insurance-brokers-ma-2026',
];

// Short sector names for the sector report tiles. Tiles are sorted alphabetically by these labels.
// A sector report missing from this list falls back to its full title.
export const SECTOR_REPORT_LABELS: Record<string, string> = {
  'accountancy-practices-ma-2026': 'Accountancy practices',
  'care-complex-care-ma-2026': 'Care and complex care',
  'commercial-insurance-brokers-ma-2026': 'Commercial insurance brokers',
  'education-training-ma-2026': 'Education and training',
  'engineering-technical-services-ma-2026': 'Engineering and technical services',
  'facilities-management-cleaning-ma-2026': 'Facilities management and cleaning',
  'fire-security-life-safety-ma-2026': 'Fire and security',
  'food-drink-producers-ma-2026': 'Food and drink producers',
  'healthcare-services-ma-2026': 'Healthcare services',
  'insurance-broking-ma-2026': 'Insurance broking',
  'it-msp-cyber-ma-2026': 'IT, MSP and cyber',
  'legal-services-ma-2026': 'Legal services',
  'logistics-distribution-ma-2026': 'Logistics and distribution',
  'packaging-ma-2026': 'Packaging',
  'plant-hire-equipment-rental-ma-2026': 'Plant hire and equipment rental',
  'recruitment-staffing-ma-2026': 'Recruitment',
  'software-tech-enabled-ma-2026': 'Software and tech-enabled services',
  'specialist-distribution-ma-2026': 'Specialist distribution',
  'specialist-manufacturing-ma-2026': 'Specialist manufacturing',
  'test-measurement-instruments-ma-2026': 'Test and measurement',
  'wealth-management-ifa-ma-2026': 'Wealth management and IFAs',
};
