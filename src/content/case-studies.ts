// Case studies shown on /case-studies/ and, for three of them, on the home page.

export type CaseStudy = {
  tag: string;
  value?: string;
  status?: string;
  title: string;
  sector: string;
  challenge: string;
  approach: string;
  outcome: string;
};

const ALL: CaseStudy[] = [
  {
    tag: 'Full Sale',
    title: 'Cold-chain Logistics & Container Leasing Operator',
    sector: 'Logistics & Transport',
    challenge:
      'A specialist cold-chain logistics business with a refrigerated container leasing arm sought a full exit after 20+ years of trading. Owners wanted continuity for long-standing customers and key staff alongside achieving strategic value.',
    approach:
      'Identified strategic acquirers across two adjacent buyer pools: refrigerated logistics groups looking for cold-chain capability, and container leasing platforms looking for fleet and customer book. Ran a structured competitive process and managed parallel diligence streams.',
    outcome:
      'Completed sale to a strategic acquirer at a premium to initial expectations, with continuity commitments on customer relationships and the operational team.',
  },
  {
    tag: 'Seed Funding',
    value: '£2m',
    title: 'HR Tech Platform',
    sector: 'Technology',
    challenge:
      'Early-stage HR technology company needed capital to scale its platform and expand into new markets, but lacked established revenue metrics typical investors require.',
    approach:
      'Structured a compelling investment narrative around product-market fit and user growth. Ran a targeted outreach to 40+ investors across VC, family office, and angel networks.',
    outcome:
      'Secured approximately £2m in seed funding from a diversified investor base, enabling the company to triple its engineering team and launch in two new verticals.',
  },
  {
    tag: 'Full Sale',
    value: 'Target achieved',
    title: 'Institutional Asset Manager',
    sector: 'Financial Services',
    challenge:
      "Founder-led asset management firm with £500m+ AUM sought a full exit after 15 years. The business was highly dependent on the founder's relationships and reputation.",
    approach:
      'Conducted a structured sale process, identifying 12 strategic buyers. Worked closely with the founder to document key relationships and create a robust transition plan.',
    outcome:
      "Completed a full sale to a strategic acquirer at the founder's target valuation, with a structured earn-out that protected long-term client relationships.",
  },
  {
    tag: 'Majority Sale',
    title: 'DFM Platform',
    sector: 'Wealth Management',
    challenge:
      'A discretionary fund manager with strong performance but limited distribution sought a partner to accelerate growth while preserving its investment philosophy.',
    approach:
      'Identified PE-backed consolidators in the wealth management space. Ran a competitive process that attracted four serious offers, enabling founders to negotiate from strength.',
    outcome:
      'Majority sale to a PE-backed asset manager at a premium multiple, with founders retaining a meaningful minority stake to participate in future upside.',
  },
  {
    tag: 'Seed Round',
    value: '£1.5m+',
    title: 'Food Manufacturer',
    sector: 'Consumer Goods',
    challenge:
      'Innovative food manufacturer with strong retail traction needed growth capital to expand production capacity and secure national supermarket listings.',
    approach:
      "Positioned the company's sustainability credentials and margin profile to attract impact-oriented investors. Structured the round to balance founder dilution with growth ambitions.",
    outcome:
      'Raised over £1.5m from family offices and HNW investors, funding a new production line and enabling listings with two major UK supermarket chains.',
  },
  {
    tag: 'Series A & Sale',
    status: 'Current',
    title: 'Human Capital AI',
    sector: 'Artificial Intelligence',
    challenge:
      'An AI-powered platform for relational intelligence required successive funding rounds to scale its technology while exploring strategic minority sale options.',
    approach:
      "Advised across multiple capital events, building a phased funding strategy that aligned investor expectations with the company's rapid growth trajectory.",
    outcome:
      'Successfully closed two funding rounds from institutional and individual investors, with ongoing advisory on a strategic minority sale to a corporate partner.',
  },
  {
    tag: 'Capital Raise',
    title: 'Alternative Fund Manager',
    sector: 'Infrastructure',
    challenge:
      'An alternative fund manager pursuing a buy-and-build strategy in infrastructure needed to raise institutional capital to fund its acquisition pipeline.',
    approach:
      "Acted as placement agent, structuring the fund narrative around the team's track record and the infrastructure sector's resilient return profile. Targeted pension funds and institutional allocators.",
    outcome:
      'Secured institutional commitments enabling the fund to execute on its first three acquisitions in the UK infrastructure sector.',
  },
  {
    tag: 'Majority Sale',
    title: 'Logistics Business',
    sector: 'Transport & Logistics',
    challenge:
      'A family-owned logistics company with 30+ years of trading history sought an exit. The founders wanted continuity for long-standing employees and customers.',
    approach:
      'Guided the family through a structured sale process, prioritising buyers who would invest in the business long-term. Managed complex family dynamics and succession planning.',
    outcome:
      "Completed a majority sale to a respected PE investor who committed to preserving the company's culture, retaining all employees, and investing in fleet modernisation.",
  },
  {
    tag: 'Buy-side Advisory',
    status: 'Ongoing',
    title: 'Agricultural Group',
    sector: 'Agriculture',
    challenge:
      'A global agricultural group needed to expand its UK and European footprint through targeted acquisitions but lacked local market knowledge and deal origination capability.',
    approach:
      "Embedded within the group's corporate development team, mapping the UK and European market, identifying acquisition targets, and managing the full deal pipeline.",
    outcome:
      'Supporting execution of targeted acquisitions, with two deals in advanced due diligence and a pipeline of 15+ qualified targets.',
  },
  {
    tag: 'Series A',
    value: '£1m',
    title: 'Edtech Platform',
    sector: 'Education Technology',
    challenge:
      'An education technology platform with strong user engagement needed Series A capital to expand its content library and enter the corporate training market.',
    approach:
      'Crafted a growth narrative combining B2C traction with B2B potential. Targeted VCs and HNW investors with sector expertise in education and workplace learning.',
    outcome:
      'Closed a £1m Series A round and continuing to advise on subsequent capital events as the company scales into corporate training.',
  },
  {
    tag: 'Series A',
    title: 'Neobank',
    sector: 'Fintech',
    challenge:
      'A challenger bank needed significant Series A funding to obtain regulatory approvals and build its technology platform ahead of a planned market launch.',
    approach:
      'Managed a complex fundraise involving VCs, family offices, and strategic investors, navigating regulatory requirements and structuring the round to meet FCA capital adequacy expectations.',
    outcome:
      'Secured a major Series A round, providing the capital needed for regulatory approval and platform build, positioning the neobank for a successful market entry.',
  },
];

const byTitle = (title: string): CaseStudy => {
  const found = ALL.find((c) => c.title === title);
  if (!found) throw new Error(`Unknown case study: ${title}`);
  return found;
};

// Display order on /case-studies/: sales first, then buy-side, then capital raising.
export const CASE_STUDY_GROUPS: { heading: string; studies: CaseStudy[] }[] = [
  {
    heading: 'Sales and acquisitions',
    studies: [
      byTitle('Cold-chain Logistics & Container Leasing Operator'),
      byTitle('Institutional Asset Manager'),
      byTitle('DFM Platform'),
      byTitle('Logistics Business'),
      byTitle('Agricultural Group'),
    ],
  },
  {
    heading: 'Capital raising',
    studies: [
      byTitle('HR Tech Platform'),
      byTitle('Food Manufacturer'),
      byTitle('Edtech Platform'),
      byTitle('Neobank'),
      byTitle('Human Capital AI'),
      byTitle('Alternative Fund Manager'),
    ],
  },
];

// The three sales shown on the home page, verbatim from the list above.
export const HOME_RECENT_WORK: CaseStudy[] = [
  byTitle('Cold-chain Logistics & Container Leasing Operator'),
  byTitle('Logistics Business'),
  byTitle('DFM Platform'),
];
