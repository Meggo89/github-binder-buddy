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

// Display order: newest first. Five new pillar articles published August 2026
// sit ahead of the earlier long-form pieces.
export const articles: Article[] = [
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
