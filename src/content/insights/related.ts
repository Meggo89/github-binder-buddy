// Per-article internal links: the sector pillar most relevant to each piece, and three related
// insights. Chosen by hand so every article, including the older long-form pieces that nothing
// else links to, receives at least two links from other articles.

export type InsightLinks = {
  pillarSlug: string;
  related: [string, string, string];
};

export const INSIGHT_LINKS: Record<string, InsightLinks> = {
  'software-tech-enabled-ma-2026': {
    pillarSlug: 'business-services',
    related: ['it-msp-cyber-ma-2026', 'telecoms-unified-comms-ma-2026', 'marketing-digital-agencies-ma-2026'],
  },
  'it-msp-cyber-ma-2026': {
    pillarSlug: 'business-services',
    related: ['software-tech-enabled-ma-2026', 'telecoms-unified-comms-ma-2026', 'marketing-digital-agencies-ma-2026'],
  },
  'recruitment-staffing-ma-2026': {
    pillarSlug: 'business-services',
    related: ['facilities-management-cleaning-ma-2026', 'marketing-digital-agencies-ma-2026', 'waste-environmental-services-ma-2026'],
  },
  'facilities-management-cleaning-ma-2026': {
    pillarSlug: 'business-services',
    related: ['waste-environmental-services-ma-2026', 'recruitment-staffing-ma-2026', 'marketing-digital-agencies-ma-2026'],
  },
  'food-drink-producers-ma-2026': {
    pillarSlug: 'business-services',
    related: ['pet-care-animal-health-ma-2026', 'events-exhibitions-venues-ma-2026', 'travel-tour-operators-ma-2026'],
  },
  'specialist-manufacturing-ma-2026': {
    pillarSlug: 'business-services',
    related: ['engineering-technical-services-ma-2026', 'test-measurement-instruments-ma-2026', 'packaging-ma-2026'],
  },
  'specialist-distribution-ma-2026': {
    pillarSlug: 'business-services',
    related: ['logistics-distribution-ma-2026', 'specialist-manufacturing-ma-2026', 'packaging-ma-2026'],
  },
  'logistics-distribution-ma-2026': {
    pillarSlug: 'business-services',
    related: ['specialist-distribution-ma-2026', 'vehicle-fleet-automotive-ma-2026', 'packaging-ma-2026'],
  },
  'healthcare-services-ma-2026': {
    pillarSlug: 'business-services',
    related: ['care-complex-care-ma-2026', 'occupational-health-wellbeing-ma-2026', 'nurseries-childcare-ma-2026'],
  },
  'care-complex-care-ma-2026': {
    pillarSlug: 'business-services',
    related: ['healthcare-services-ma-2026', 'occupational-health-wellbeing-ma-2026', 'nurseries-childcare-ma-2026'],
  },
  'wealth-management-ifa-ma-2026': {
    pillarSlug: 'business-services',
    related: ['accountancy-practices-ma-2026', 'insurance-broking-ma-2026', 'legal-services-ma-2026'],
  },
  'legal-services-ma-2026': {
    pillarSlug: 'business-services',
    related: ['accountancy-practices-ma-2026', 'wealth-management-ifa-ma-2026', 'insurance-broking-ma-2026'],
  },
  'insurance-broking-ma-2026': {
    pillarSlug: 'business-services',
    related: ['commercial-insurance-brokers-ma-2026', 'wealth-management-ifa-ma-2026', 'accountancy-practices-ma-2026'],
  },
  'accountancy-practices-ma-2026': {
    pillarSlug: 'business-services',
    related: ['legal-services-ma-2026', 'wealth-management-ifa-ma-2026', 'insurance-broking-ma-2026'],
  },
  'telecoms-unified-comms-ma-2026': {
    pillarSlug: 'tech-enabled-services',
    related: ['it-msp-cyber-ma-2026', 'software-tech-enabled-ma-2026', 'marketing-digital-agencies-ma-2026'],
  },
  'building-services-compliance-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['fire-security-life-safety-ma-2026', 'energy-services-renewables-ma-2026', 'construction-products-specialist-contractors-ma-2026'],
  },
  'energy-services-renewables-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['building-services-compliance-ma-2026', 'construction-products-specialist-contractors-ma-2026', 'fire-security-life-safety-ma-2026'],
  },
  'marketing-digital-agencies-ma-2026': {
    pillarSlug: 'business-services',
    related: ['recruitment-staffing-ma-2026', 'facilities-management-cleaning-ma-2026', 'waste-environmental-services-ma-2026'],
  },
  'pet-care-animal-health-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['food-drink-producers-ma-2026', 'events-exhibitions-venues-ma-2026', 'travel-tour-operators-ma-2026'],
  },
  'nurseries-childcare-ma-2026': {
    pillarSlug: 'healthcare-services',
    related: ['education-training-ma-2026', 'care-complex-care-ma-2026', 'healthcare-services-ma-2026'],
  },
  'education-training-ma-2026': {
    pillarSlug: 'business-services',
    related: ['nurseries-childcare-ma-2026', 'care-complex-care-ma-2026', 'healthcare-services-ma-2026'],
  },
  'waste-environmental-services-ma-2026': {
    pillarSlug: 'business-services',
    related: ['facilities-management-cleaning-ma-2026', 'recruitment-staffing-ma-2026', 'marketing-digital-agencies-ma-2026'],
  },
  'estate-agency-lettings-property-ma-2026': {
    pillarSlug: 'professional-services',
    related: ['building-services-compliance-ma-2026', 'fire-security-life-safety-ma-2026', 'construction-products-specialist-contractors-ma-2026'],
  },
  'occupational-health-wellbeing-ma-2026': {
    pillarSlug: 'healthcare-services',
    related: ['healthcare-services-ma-2026', 'care-complex-care-ma-2026', 'education-training-ma-2026'],
  },
  'vehicle-fleet-automotive-ma-2026': {
    pillarSlug: 'logistics-and-distribution',
    related: ['logistics-distribution-ma-2026', 'specialist-distribution-ma-2026', 'engineering-technical-services-ma-2026'],
  },
  'construction-products-specialist-contractors-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['building-services-compliance-ma-2026', 'plant-hire-equipment-rental-ma-2026', 'energy-services-renewables-ma-2026'],
  },
  'events-exhibitions-venues-ma-2026': {
    pillarSlug: 'business-services',
    related: ['travel-tour-operators-ma-2026', 'food-drink-producers-ma-2026', 'pet-care-animal-health-ma-2026'],
  },
  'travel-tour-operators-ma-2026': {
    pillarSlug: 'business-services',
    related: ['events-exhibitions-venues-ma-2026', 'food-drink-producers-ma-2026', 'pet-care-animal-health-ma-2026'],
  },
  'print-signage-promotional-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['packaging-ma-2026', 'specialist-manufacturing-ma-2026', 'specialist-distribution-ma-2026'],
  },
  'plant-hire-equipment-rental-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['construction-products-specialist-contractors-ma-2026', 'building-services-compliance-ma-2026', 'energy-services-renewables-ma-2026'],
  },
  'packaging-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['specialist-manufacturing-ma-2026', 'print-signage-promotional-ma-2026', 'specialist-distribution-ma-2026'],
  },
  'test-measurement-instruments-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['engineering-technical-services-ma-2026', 'specialist-manufacturing-ma-2026', 'specialist-distribution-ma-2026'],
  },
  'commercial-insurance-brokers-ma-2026': {
    pillarSlug: 'business-services',
    related: ['insurance-broking-ma-2026', 'wealth-management-ifa-ma-2026', 'accountancy-practices-ma-2026'],
  },
  'fire-security-life-safety-ma-2026': {
    pillarSlug: 'business-services',
    related: ['building-services-compliance-ma-2026', 'energy-services-renewables-ma-2026', 'construction-products-specialist-contractors-ma-2026'],
  },
  'engineering-technical-services-ma-2026': {
    pillarSlug: 'light-industrials',
    related: ['test-measurement-instruments-ma-2026', 'specialist-manufacturing-ma-2026', 'specialist-distribution-ma-2026'],
  },
  'badr-changes-april-2027-should-you-sell-before': {
    pillarSlug: 'business-services',
    related: ['founders-relief-2027-who-qualifies', '12-months-before-you-sell', 'accountant-valuation-vs-market-valuation'],
  },
  'founders-relief-2027-who-qualifies': {
    pillarSlug: 'tech-enabled-services',
    related: ['badr-changes-april-2027-should-you-sell-before', '12-months-before-you-sell', 'sme-valuations-key-considerations'],
  },
  'earn-outs-explained-uk': {
    pillarSlug: 'business-services',
    related: ['heads-of-terms-what-is-binding', 'rollover-equity-explained', 'warranties-indemnities-business-sale'],
  },
  'heads-of-terms-what-is-binding': {
    pillarSlug: 'business-services',
    related: ['earn-outs-explained-uk', 'rollover-equity-explained', 'warranties-indemnities-business-sale'],
  },
  'ebitda-add-backs-buyers-accept': {
    pillarSlug: 'business-services',
    related: ['accountant-valuation-vs-market-valuation', 'sme-valuations-key-considerations', '12-months-before-you-sell'],
  },
  'warranties-indemnities-business-sale': {
    pillarSlug: 'business-services',
    related: ['heads-of-terms-what-is-binding', 'earn-outs-explained-uk', '12-months-before-you-sell'],
  },
  'uk-search-funds-explained': {
    pillarSlug: 'business-services',
    related: ['search-fund-vs-private-equity-vs-strategic', 'rollover-equity-explained', 'comprehensive-guide-business-exits'],
  },
  'search-fund-vs-private-equity-vs-strategic': {
    pillarSlug: 'business-services',
    related: ['uk-search-funds-explained', 'rollover-equity-explained', 'comprehensive-guide-business-exits'],
  },
  'rollover-equity-explained': {
    pillarSlug: 'professional-services',
    related: ['search-fund-vs-private-equity-vs-strategic', 'post-merger-integration-success', 'sme-valuations-key-considerations'],
  },
  '12-months-before-you-sell': {
    pillarSlug: 'light-industrials',
    related: ['comprehensive-guide-business-exits', 'sme-valuations-key-considerations', 'accountant-valuation-vs-market-valuation'],
  },
  'accountant-valuation-vs-market-valuation': {
    pillarSlug: 'business-services',
    related: ['sme-valuations-key-considerations', '12-months-before-you-sell', 'post-merger-integration-success'],
  },
  'human-employment-ai-era': {
    pillarSlug: 'tech-enabled-services',
    related: ['ai-in-modern-ma-transactions', 'future-of-ma-technology-sector', 'post-merger-integration-success'],
  },
  'comprehensive-guide-business-exits': {
    pillarSlug: 'business-services',
    related: ['12-months-before-you-sell', 'post-merger-integration-success', 'human-employment-ai-era'],
  },
  'ai-in-modern-ma-transactions': {
    pillarSlug: 'tech-enabled-services',
    related: ['future-of-ma-technology-sector', 'human-employment-ai-era', 'accountant-valuation-vs-market-valuation'],
  },
  'future-of-ma-technology-sector': {
    pillarSlug: 'tech-enabled-services',
    related: ['ai-in-modern-ma-transactions', 'human-employment-ai-era', 'sme-valuations-key-considerations'],
  },
  'sme-valuations-key-considerations': {
    pillarSlug: 'tech-enabled-services',
    related: ['accountant-valuation-vs-market-valuation', 'ai-in-modern-ma-transactions', '12-months-before-you-sell'],
  },
  'post-merger-integration-success': {
    pillarSlug: 'business-services',
    related: ['comprehensive-guide-business-exits', 'future-of-ma-technology-sector', 'rollover-equity-explained'],
  },
};
