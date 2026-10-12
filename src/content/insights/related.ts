// Per-article internal links: the sector pillar most relevant to each piece, and three related
// insights. Chosen by hand so every article, including the older long-form pieces that nothing
// else links to, receives at least two links from other articles.

export type InsightLinks = {
  pillarSlug: string;
  related: [string, string, string];
};

export const INSIGHT_LINKS: Record<string, InsightLinks> = {
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
