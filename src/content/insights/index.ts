import badrChangesApril2027ShouldYouSellBefore from './badr-changes-april-2027-should-you-sell-before';
import foundersRelief2027WhoQualifies from './founders-relief-2027-who-qualifies';
import earnOutsExplainedUk from './earn-outs-explained-uk';
import headsOfTermsWhatIsBinding from './heads-of-terms-what-is-binding';
import ebitdaAddBacksBuyersAccept from './ebitda-add-backs-buyers-accept';
import warrantiesIndemnitiesBusinessSale from './warranties-indemnities-business-sale';
import ukSearchFundsExplained from './uk-search-funds-explained';
import searchFundVsPeVsStrategic from './search-fund-vs-private-equity-vs-strategic';
import rolloverEquityExplained from './rollover-equity-explained';
import twelveMonthsBeforeYouSell from './12-months-before-you-sell';
import accountantVsMarketValuation from './accountant-valuation-vs-market-valuation';
import humanEmployment from './human-employment-ai-era';
import comprehensiveGuide from './comprehensive-guide-business-exits';
import aiInMa from './ai-in-modern-ma-transactions';
import futureOfMaTech from './future-of-ma-technology-sector';
import smeValuations from './sme-valuations-key-considerations';
import postMergerIntegration from './post-merger-integration-success';
import type { Article } from './types';

export type { Article };
export { INSIGHT_LINKS } from './related';

// Display order: newest first. Six articles published November 2026 lead, then the five
// pillar articles from August 2026, then the earlier long-form pieces.
export const articles: Article[] = [
  badrChangesApril2027ShouldYouSellBefore,
  foundersRelief2027WhoQualifies,
  earnOutsExplainedUk,
  headsOfTermsWhatIsBinding,
  ebitdaAddBacksBuyersAccept,
  warrantiesIndemnitiesBusinessSale,
  ukSearchFundsExplained,
  searchFundVsPeVsStrategic,
  rolloverEquityExplained,
  twelveMonthsBeforeYouSell,
  accountantVsMarketValuation,
  humanEmployment,
  comprehensiveGuide,
  aiInMa,
  futureOfMaTech,
  smeValuations,
  postMergerIntegration,
];

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string | undefined): Article | undefined {
  if (!slug) return undefined;
  return bySlug.get(slug);
}
