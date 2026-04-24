import { ReactNode } from 'react';
import {
  ExitReadinessIllustration,
  ValuationIllustration,
  IMProductionIllustration,
  BuyerOutreachIllustration,
  DiligenceCoordinationIllustration,
  NegotiationSupportIllustration,
} from '../components/illustrations';

export type ProcessStage = {
  slug: string;
  number: string;
  title: string;
  lead: string;
  aiCapability: string;
  humanInput: string;
  benefit: string;
  benefitMetric: string;
  illustration: ReactNode;
};

export const processStages: ProcessStage[] = [
  {
    slug: 'exit-readiness',
    number: '01',
    title: 'Exit Readiness Assessment',
    lead: 'We establish where the business actually stands against acquirer expectations - months before due diligence would force the question.',
    aiCapability:
      'Automated analysis of financials, customer contracts, customer concentration, and operational structure. Pattern recognition against thousands of successful exits in similar sectors identifies the readiness gaps that cost founders the most at deal time.',
    humanInput:
      'Strategic interpretation of findings. Founder coaching on what to prioritise. Judgment on what genuinely matters to acquirers versus what merely looks important on paper.',
    benefit: 'Issues surface 6-12 months before market',
    benefitMetric: '6–12',
    illustration: <ExitReadinessIllustration />,
  },
  {
    slug: 'valuation',
    number: '02',
    title: 'Financial Analysis & Valuation',
    lead: 'A defensible valuation built on broader evidence than traditional methods allow, delivered in days rather than weeks.',
    aiCapability:
      'Rapid normalisation of financial statements. Identification of one-off items and addbacks. Multiple valuation methodologies run in parallel. Comparable transaction analysis across thousands of historical deals, not a handful of hand-picked comps.',
    humanInput:
      'Judgment on which addbacks are defensible to acquirers. Strategic positioning of the financial story. Understanding of buyer-specific value drivers that a methodology alone cannot see.',
    benefit: 'Valuation analysis completed in days, not weeks',
    benefitMetric: 'days',
    illustration: <ValuationIllustration />,
  },
  {
    slug: 'information-memorandum',
    number: '03',
    title: 'Investor Memorandum',
    lead: 'The document that frames the business for the market. Sharper first drafts, more iterations, higher production quality.',
    aiCapability:
      'First-draft IM generation from structured data and founder interviews. Market sizing and competitive landscape analysis. Investment thesis and growth narrative drafting.',
    humanInput:
      'Strategic positioning. Narrative judgement. Sense-checking against buyer perspectives. Founder collaboration on the story being told.',
    benefit: 'IM timeline compressed from 6–8 weeks to 2–3',
    benefitMetric: '2–3 wks',
    illustration: <IMProductionIllustration />,
  },
  {
    slug: 'buyer-outreach',
    number: '04',
    title: 'Buyer Identification & Outreach',
    lead: 'A broader, better-qualified buyer pool, with personalisation at scale and warm introductions where they matter most.',
    aiCapability:
      'Systematic identification of potential acquirers across strategic and financial categories. Analysis of buyer behaviour, recent acquisition activity, capital availability, and strategic fit. Outreach campaign management.',
    humanInput:
      'Relationship-led approach to priority buyers. Judgment on outreach timing and messaging. Leveraging personal networks for warm introductions to the buyers that matter most.',
    benefit: 'Buyer pool typically 3–5× broader than traditional coverage',
    benefitMetric: '3–5×',
    illustration: <BuyerOutreachIllustration />,
  },
  {
    slug: 'diligence',
    number: '05',
    title: 'Process Management & Diligence',
    lead: 'A well-run process protects value. Administrative burden off founders, cleaner competitive tension across bidders.',
    aiCapability:
      'Data room organisation. Diligence question tracking and response coordination. Document version management. Automated status reporting to all parties.',
    humanInput:
      'Strategic management of competitive tension. Negotiation of process terms. Judgment on which buyers to advance and when.',
    benefit: 'Fewer failure points, faster diligence cycles',
    benefitMetric: '↓ time',
    illustration: <DiligenceCoordinationIllustration />,
  },
  {
    slug: 'negotiation',
    number: '06',
    title: 'Negotiation & Completion',
    lead: 'Founders enter negotiations with comprehensive market context. Better outcomes on terms beyond the headline number.',
    aiCapability:
      'Term sheet analysis and benchmarking against market norms. Identification of unusual or unfavourable terms. Scenario modelling across different deal structures.',
    humanInput:
      'Negotiation leadership. Relationship management with buyers and lawyers. Judgment calls on what to push back on and what to concede.',
    benefit: 'Every term benchmarked against market, outliers flagged',
    benefitMetric: '100%',
    illustration: <NegotiationSupportIllustration />,
  },
];
