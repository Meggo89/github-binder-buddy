// Refresh src/seo/lastmod.json after a build: `npm run build && npm run lastmod`, then commit it.
// A page whose visible text has changed since the ledger was written gets today's date; every
// other page keeps its date. Pages that no longer exist are dropped.
//
// `--seed` (one-off) dates every page from git history instead: the last commit that touched the
// page's own source files, or for an insight page the later of that and its published date.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { indexablePages, readLedger, today, LEDGER, type Ledger } from './page-text';
import { articles } from '../src/content/insights';

const SEED = process.argv.includes('--seed');

function gitDate(files: string[]): string | null {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { encoding: 'utf8' }).trim();
    return out || null;
  } catch {
    return null;
  }
}

const iso = (d: string) => {
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? null : t.toISOString().slice(0, 10);
};
const max = (...ds: (string | null | undefined)[]) => ds.filter(Boolean).sort().pop() ?? null;

const PAGE_FILES: Record<string, string[]> = {
  '/': ['src/pages/Home.tsx', 'src/content/evidence.ts', 'src/components/scalexit', 'src/content/insights/index.ts'],
  '/about/': ['src/pages/About.tsx'],
  '/services/': ['src/pages/Services.tsx'],
  '/process/': ['src/pages/Process.tsx'],
  '/team/': ['src/pages/Team.tsx'],
  '/case-studies/': ['src/pages/CaseStudies.tsx', 'src/content/case-studies.ts'],
  '/contact/': ['src/pages/Contact.tsx'],
  '/privacy-policy/': ['src/pages/PrivacyPolicy.tsx'],
  '/executive-search/': ['src/pages/ExecutiveSearch.tsx'],
  '/lead-magnet/': ['src/pages/LeadMagnet.tsx'],
  '/insights/': ['src/pages/Insights.tsx', 'src/content/insights/index.ts', 'src/content/insights/sector-reports.ts'],
  '/insights/sector-reports/': ['src/pages/SectorReports.tsx', 'src/content/insights/index.ts', 'src/content/insights/sector-reports.ts'],
  '/exit-readiness-score/': ['src/pages/ExitReadinessScore.tsx', 'src/content/readiness', 'src/components/readiness'],
  '/resources/exit-readiness-scoring/': ['src/pages/ExitReadinessScoring.tsx', 'src/content/readiness'],
  '/sectors/': ['src/pages/SectorsHub.tsx', 'src/content/landing/sectors.ts'],
};

function seedDate(route: string): string | null {
  if (PAGE_FILES[route]) return gitDate(PAGE_FILES[route]);
  const art = articles.find((a) => route === `/insights/${a.slug}/`);
  if (art) return max(gitDate([`src/content/insights/${art.slug}.ts`, 'src/pages/InsightArticle.tsx']), iso(art.dateModified ?? art.date));
  let m = route.match(/^\/sectors\/([^/]+)\/$/);
  if (m) return gitDate(['src/pages/SectorPillar.tsx', 'src/content/landing/sectors.ts']);
  m = route.match(/^\/sectors\/([^/]+)\/[^/]+\/$/);
  if (m) return gitDate(['src/pages/NicheLanding.tsx', `src/content/landing/niches-${m[1].replace('logistics-and-distribution', 'logistics').replace('tech-enabled-services', 'tech-enabled')}.ts`]);
  if (route.startsWith('/services/')) return gitDate(['src/pages/ServiceLanding.tsx', 'src/content/landing/services.ts', 'src/content/landing/service-exit-readiness-assessment.ts']);
  if (route.startsWith('/resources/')) return gitDate(['src/pages/ResourceLanding.tsx', 'src/content/landing/resources.ts']);
  return null;
}

const old = readLedger();
const next: Ledger = {};
let changed = 0;
for (const { route, hash } of indexablePages()) {
  if (SEED) {
    next[route] = { hash, lastmod: seedDate(route) ?? today() };
  } else if (old[route]?.hash === hash) {
    next[route] = old[route];
  } else {
    next[route] = { hash, lastmod: today() };
    changed++;
  }
}
fs.writeFileSync(LEDGER, JSON.stringify(next, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(next).length} pages, ${SEED ? 'seeded from git history' : `${changed} changed`}; wrote src/seo/lastmod.json`);
