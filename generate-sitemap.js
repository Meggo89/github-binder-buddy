import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const baseUrl = 'https://mastellagroup.com';

// Keep in sync with src/content/insights/
const insightSlugs = [
  'human-employment-ai-era',
  'comprehensive-guide-business-exits',
  'ai-in-modern-ma-transactions',
  'future-of-ma-technology-sector',
  'sme-valuations-key-considerations',
  'post-merger-integration-success',
];

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/process', changefreq: 'monthly', priority: 0.7 },
  { url: '/team', changefreq: 'monthly', priority: 0.7 },
  { url: '/case-studies', changefreq: 'monthly', priority: 0.7 },
  { url: '/executive-search', changefreq: 'monthly', priority: 0.7 },
  { url: '/insights', changefreq: 'weekly', priority: 0.8 },
  ...insightSlugs.map((slug) => ({ url: `/insights/${slug}`, changefreq: 'monthly', priority: 0.6 })),
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
];

const stream = new SitemapStream({ hostname: baseUrl });
const data = Readable.from(routes).pipe(stream);

streamToPromise(data).then((sitemap) =>
  createWriteStream('./public/sitemap.xml').write(sitemap.toString())
);
