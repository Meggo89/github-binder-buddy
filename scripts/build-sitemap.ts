// Write dist/sitemap.xml from the prerendered pages. Runs after prerender, so the sitemap lists
// exactly the pages that were built: every indexable page (noindex pages such as the 404 are left
// out), and no PDFs or Markdown copies.
//
// lastmod comes from src/seo/lastmod.json, which records a hash of each page's visible text and
// the date it last changed. A page whose text no longer matches its hash gets today's date and a
// warning; run `npm run lastmod` and commit the ledger to record the change.

import fs from 'node:fs';
import path from 'node:path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'node:stream';
import { SITE } from '../src/seo/site-meta';
import { articles } from '../src/content/insights';
import { DIST, indexablePages, readLedger, today } from './page-text';

const ledger = readLedger();
const insightDates = new Map(
  articles.map((a) => {
    const d = new Date(a.dateModified ?? a.date);
    return [`/insights/${a.slug}/`, Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)];
  }),
);

const stale: string[] = [];
const entries = indexablePages().map(({ route, hash }) => {
  let lastmod = ledger[route]?.lastmod;
  if (!lastmod || ledger[route].hash !== hash) {
    lastmod = today();
    stale.push(route);
  }
  const published = insightDates.get(route);
  if (published && published > lastmod) lastmod = published;
  const depth = route === '/' ? 0 : route.split('/').filter(Boolean).length;
  return {
    url: route,
    lastmod,
    changefreq: route === '/' || route === '/insights/' || route === '/insights/sector-reports/' ? 'weekly' : 'monthly',
    priority: depth === 0 ? 1.0 : depth === 1 ? 0.8 : 0.6,
  };
});

const stream = new SitemapStream({ hostname: SITE.domain });
const xml = await streamToPromise(Readable.from(entries).pipe(stream));
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml.toString());
if (stale.length) {
  console.warn(`sitemap: ${stale.length} page(s) changed since src/seo/lastmod.json was written, dated today: ${stale.slice(0, 5).join(', ')}${stale.length > 5 ? ', ...' : ''}. Run npm run lastmod and commit the ledger.`);
}
console.log(`sitemap: wrote ${entries.length} URLs to dist/sitemap.xml`);
