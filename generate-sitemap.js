import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const baseUrl = 'https://mastellagroup.com';

// Define your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/process', changefreq: 'monthly', priority: 0.7 },
  { url: '/team', changefreq: 'monthly', priority: 0.7 },
  { url: '/insights', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.4 },
];

// Create sitemap
const stream = new SitemapStream({ hostname: baseUrl });
const data = Readable.from(routes).pipe(stream);

// Write sitemap to file
streamToPromise(data).then((sitemap) => 
  createWriteStream('./public/sitemap.xml').write(sitemap.toString())
);