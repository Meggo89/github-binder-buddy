// Sector reports: short name, one-line descriptor and hub group for each report.
// Used by the /insights/ tiles, the /insights/sector-reports/ hub and the report breadcrumbs.
// To add a report, give it an entry here; a report without one still appears, under "Other".

export const SECTOR_GROUPS = [
  'Industrial and manufacturing',
  'Business services',
  'Property, construction and building services',
  'Health, care and education',
  'Technology and telecoms',
  'Consumer, leisure and travel',
  'Financial and professional services',
] as const;

export type SectorGroup = (typeof SECTOR_GROUPS)[number];

export type SectorReportMeta = { label: string; descriptor: string; group: SectorGroup };

export const SECTOR_REPORTS: Record<string, SectorReportMeta> = {
  'accountancy-practices-ma-2026': { label: 'Accountancy practices', descriptor: 'Accountancy, tax, bookkeeping and payroll practices', group: 'Financial and professional services' },
  'building-services-compliance-ma-2026': { label: 'Building services and compliance', descriptor: 'M&E contractors, HVAC businesses and compliance and testing firms', group: 'Property, construction and building services' },
  'care-complex-care-ma-2026': { label: 'Care and complex care', descriptor: "Home care, complex care, supported living and children's services", group: 'Health, care and education' },
  'commercial-insurance-brokers-ma-2026': { label: 'Commercial insurance brokers', descriptor: 'Independent commercial brokers, MGAs and wholesale brokers', group: 'Financial and professional services' },
  'construction-products-specialist-contractors-ma-2026': { label: 'Construction products and specialist contractors', descriptor: 'Building products makers, merchants and specialist contractors', group: 'Property, construction and building services' },
  'education-training-ma-2026': { label: 'Education and training', descriptor: 'Nurseries, training providers, e-learning and independent schools', group: 'Health, care and education' },
  'energy-services-renewables-ma-2026': { label: 'Energy services and renewables', descriptor: 'Solar, heat pump, EV charging, insulation and energy consultancy businesses', group: 'Property, construction and building services' },
  'engineering-technical-services-ma-2026': { label: 'Engineering and technical services', descriptor: 'Engineering consultancy, testing, inspection and certification', group: 'Industrial and manufacturing' },
  'estate-agency-lettings-property-ma-2026': { label: 'Estate agency, lettings and property management', descriptor: 'Estate agencies, lettings agencies, block managers and commercial property firms', group: 'Property, construction and building services' },
  'events-exhibitions-venues-ma-2026': { label: 'Events, exhibitions and venues', descriptor: 'Exhibition organisers, event agencies, production, hospitality and venues', group: 'Consumer, leisure and travel' },
  'facilities-management-cleaning-ma-2026': { label: 'Facilities management and cleaning', descriptor: 'Contract cleaning, soft and hard FM, guarding and washroom services', group: 'Business services' },
  'fire-security-life-safety-ma-2026': { label: 'Fire and security', descriptor: 'Fire alarm, sprinkler, passive fire and electronic security services', group: 'Property, construction and building services' },
  'food-drink-producers-ma-2026': { label: 'Food and drink producers', descriptor: 'Food and drink manufacturers, bakeries and co-packers', group: 'Consumer, leisure and travel' },
  'healthcare-services-ma-2026': { label: 'Healthcare services', descriptor: 'Dental, veterinary, pharmacy, diagnostics and specialist clinics', group: 'Health, care and education' },
  'insurance-broking-ma-2026': { label: 'Insurance broking', descriptor: 'Insurance brokers and MGAs: deal flow and what buyers look for', group: 'Financial and professional services' },
  'it-msp-cyber-ma-2026': { label: 'IT, MSP and cyber', descriptor: 'Managed service providers, cyber security and cloud services', group: 'Technology and telecoms' },
  'legal-services-ma-2026': { label: 'Legal services', descriptor: 'Law firms, from conveyancing and personal injury to commercial practices', group: 'Financial and professional services' },
  'logistics-distribution-ma-2026': { label: 'Logistics and distribution', descriptor: 'Haulage, warehousing, freight forwarding and final mile', group: 'Industrial and manufacturing' },
  'marketing-digital-agencies-ma-2026': { label: 'Marketing and digital agencies', descriptor: 'Creative, digital, PR, performance, research and experiential agencies', group: 'Business services' },
  'nurseries-childcare-ma-2026': { label: 'Nurseries and childcare', descriptor: 'Day nurseries, pre-schools and childcare groups', group: 'Health, care and education' },
  'occupational-health-wellbeing-ma-2026': { label: 'Occupational health and wellbeing', descriptor: 'Occupational health, employee assistance and workplace wellbeing businesses', group: 'Health, care and education' },
  'packaging-ma-2026': { label: 'Packaging', descriptor: 'Packaging manufacturers, converters and distributors', group: 'Industrial and manufacturing' },
  'pet-care-animal-health-ma-2026': { label: 'Pet care and animal health', descriptor: 'Pet food, pet products and distribution, vets, animal health and services', group: 'Consumer, leisure and travel' },
  'plant-hire-equipment-rental-ma-2026': { label: 'Plant hire and equipment rental', descriptor: 'Plant, tool, access, crane, welfare and specialist rental', group: 'Property, construction and building services' },
  'print-signage-promotional-ma-2026': { label: 'Print, signage and promotional merchandise', descriptor: 'Commercial printers, direct mail, signage and promotional merchandise', group: 'Industrial and manufacturing' },
  'recruitment-staffing-ma-2026': { label: 'Recruitment', descriptor: 'Recruitment agencies, staffing businesses and executive search', group: 'Business services' },
  'software-tech-enabled-ma-2026': { label: 'Software and tech-enabled services', descriptor: 'B2B software, SaaS and data businesses', group: 'Technology and telecoms' },
  'specialist-distribution-ma-2026': { label: 'Specialist distribution', descriptor: 'Builders merchants and electrical, plumbing and industrial distributors', group: 'Industrial and manufacturing' },
  'specialist-manufacturing-ma-2026': { label: 'Specialist manufacturing', descriptor: 'Owner-managed precision, electronics and industrial manufacturers', group: 'Industrial and manufacturing' },
  'telecoms-unified-comms-ma-2026': { label: 'Business telecoms and unified comms', descriptor: 'Telecoms resellers, hosted voice, unified comms, business mobile and ISPs', group: 'Technology and telecoms' },
  'test-measurement-instruments-ma-2026': { label: 'Test and measurement', descriptor: 'Analysers, sensors, test equipment and scientific instruments', group: 'Industrial and manufacturing' },
  'travel-tour-operators-ma-2026': { label: 'Tour operators and travel management', descriptor: 'Specialist tour operators, travel agencies and business travel management', group: 'Consumer, leisure and travel' },
  'vehicle-fleet-automotive-ma-2026': { label: 'Vehicle, fleet and automotive services', descriptor: 'Accident repair, tyres and servicing, motor factors and fleet services', group: 'Industrial and manufacturing' },
  'waste-environmental-services-ma-2026': { label: 'Waste and environmental services', descriptor: 'Skip hire, commercial collection, recycling, hazardous waste and remediation', group: 'Business services' },
  'wealth-management-ifa-ma-2026': { label: 'Wealth management and IFAs', descriptor: 'IFAs, financial planners and discretionary wealth managers', group: 'Financial and professional services' },
};

// Tiles shown on /insights/ (8 to 12). The full list is on /insights/sector-reports/.
export const INSIGHTS_PAGE_REPORTS: string[] = [
  'commercial-insurance-brokers-ma-2026',
  'engineering-technical-services-ma-2026',
  'fire-security-life-safety-ma-2026',
  'food-drink-producers-ma-2026',
  'healthcare-services-ma-2026',
  'it-msp-cyber-ma-2026',
  'packaging-ma-2026',
  'plant-hire-equipment-rental-ma-2026',
  'recruitment-staffing-ma-2026',
  'specialist-manufacturing-ma-2026',
  'test-measurement-instruments-ma-2026',
  'wealth-management-ifa-ma-2026',
];

export const SECTOR_REPORTS_PATH = '/insights/sector-reports/';
