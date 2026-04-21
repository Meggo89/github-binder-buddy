import humanEmployment from './human-employment-ai-era';
import comprehensiveGuide from './comprehensive-guide-business-exits';
import aiInMa from './ai-in-modern-ma-transactions';
import futureOfMaTech from './future-of-ma-technology-sector';
import smeValuations from './sme-valuations-key-considerations';
import postMergerIntegration from './post-merger-integration-success';
import type { Article } from './types';

export type { Article };

// Display order matches prior site: newest first
export const articles: Article[] = [
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
