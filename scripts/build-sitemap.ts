// Generate public/sitemap.xml from the central SEO config + insight articles.
// Run during build before vite so the sitemap ends up in dist/ via public/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'node:stream';
import { SITE, ROUTES, type RouteMeta } from '../src/seo/site-meta';
import { articles } from '../src/content/insights';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

type Entry = {
  url: string;
  changefreq?: RouteMeta['changefreq'];
  priority?: number;
  lastmod?: string;
};

function parseDate(input: string): string {
  // Input dates are human-readable like "15 January 2026" - normalise to ISO.
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return SITE.lastmod;
  return d.toISOString().slice(0, 10);
}

async function run() {
  const entries: Entry[] = ROUTES.map((r) => ({
    url: r.path,
    changefreq: r.changefreq,
    priority: r.priority,
    lastmod: SITE.lastmod,
  }));

  for (const a of articles) {
    entries.push({
      url: `/insights/${a.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: parseDate(a.date),
    });
  }

  const stream = new SitemapStream({ hostname: SITE.domain });
  const xml = await streamToPromise(Readable.from(entries).pipe(stream));
  fs.writeFileSync(OUTPUT, xml.toString());
  console.log(`sitemap: wrote ${entries.length} URLs to ${path.relative(process.cwd(), OUTPUT)}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
