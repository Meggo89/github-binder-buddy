// Single source of truth for site metadata, consumed by:
//   - src/components/SEO.tsx (React Helmet, at runtime)
//   - scripts/prerender.ts (per-route static HTML, at build time)
//   - scripts/build-sitemap.ts (sitemap.xml generation)

export const SITE = {
  name: 'Mastella Advisory',
  domain: 'https://mastellagroup.com',
  defaultTitle: 'Business Exits Rebuilt for the AI Era | Mastella Advisory',
  defaultDescription:
    'AI-enabled M&A advisory for UK SMEs with £2–50M turnover. Sharper analysis, broader buyer reach, faster outcomes than traditional advisors.',
  defaultOgImage: 'https://mastellagroup.com/og-image.jpg',
  locale: 'en_GB',
  lastmod: '2026-04-23',
} as const;

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

// Static routes (everything except /insights/:slug which is generated from article data)
export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Business Exits Rebuilt for the AI Era',
    description:
      'AI-enabled M&A advisory for UK SMEs with £2–50M turnover. Sharper analysis, broader buyer reach, faster outcomes than traditional advisors.',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/about',
    title: 'About Mastella Advisory | M&A for UK SMEs £2–50M Turnover',
    description:
      'Off-market M&A advisory for UK owner-managed SMEs with £2–50M turnover. Confidential sell-side, fundraising and exit readiness, led by senior advisors.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/services',
    title: 'Services - Sell-side, Fundraising, Exit Readiness, Executive Search',
    description:
      'Sell-side M&A advisory, fundraising, exit readiness consulting, and executive search, delivered through an AI-enabled model that combines machine speed with senior judgement.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/process',
    title: 'Our AI-Enabled M&A Process',
    description:
      'Six stages from readiness to completion. Explicit at every stage about what AI does and what senior advisors do, from automated financial normalisation to human-led negotiation.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/team',
    title: 'Our Team - Senior M&A Advisors',
    description:
      'Meet the Mastella leadership team. Over 50 years of combined experience in M&A, fundraising, executive search, and strategic consulting.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/case-studies',
    title: 'Our Work - Successful Exit and M&A Transactions',
    description:
      'Exit advisory, M&A transactions, and capital raises delivered for founders across ten sectors. Real outcomes from real transactions.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/executive-search',
    title: 'Executive Search & Interim Solutions',
    description:
      'Strategic leadership placement and interim management for companies pre and post exit. Executives with proven track records in M&A transitions.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/insights',
    title: 'Insights - M&A Analysis from Mastella',
    description:
      'Long-form analysis on exits, fundraising, valuation, and how AI is reshaping M&A advisory. Written by the Mastella team.',
    priority: 0.8,
    changefreq: 'weekly',
  },
  {
    path: '/contact',
    title: 'Contact - Book a Confidential Conversation',
    description:
      'Schedule a confidential, no-obligation conversation with Mastella Advisory. Discuss your exit strategy, valuation, or fundraising needs.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: "Mastella Advisory's privacy policy. How we collect, use, and protect your personal data.",
    priority: 0.3,
    changefreq: 'yearly',
  },
];

export const STATIC_ROUTES_BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));

export function getRouteMeta(path: string): RouteMeta | undefined {
  return STATIC_ROUTES_BY_PATH.get(path);
}

// Suffix " | Mastella Advisory" to a title unless already branded.
export function fullTitle(title: string): string {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
}

export function canonicalFor(path: string): string {
  if (path === '/') return SITE.domain;
  return `${SITE.domain}${path}`;
}
