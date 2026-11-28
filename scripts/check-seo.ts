// SEO and AEO checks on the built site (dist/). Runs as the last build step and fails the build on
// any error. `npx tsx scripts/check-seo.ts --report` also prints a table of every indexable page.
//
// Checks, for every prerendered page that is not noindex:
//   title present and 70 characters or fewer; meta description 70 to 165 characters (warnings only);
//   exactly one <h1>; a self-referencing canonical on https://mastellagroup.com with a trailing slash;
//   og:title, og:description, og:url (= canonical), og:image and og:type;
//   every JSON-LD block parses; Organization and Person on every page; BreadcrumbList on every page
//   below the home page; Article with author Leo Meggitt, datePublished and dateModified on insight
//   pages; FAQPage questions match the visible FAQ.
// Sitemap: every indexable page is listed, nothing else (no .md, no PDFs, no noindex pages), and
//   every sector report and the hub are present.
// Internal links: every internal link resolves to a built page or file without a redirect; every
//   sector report is linked from the hub and from at least two other pages; no orphan pages.
// 404: dist/404.html exists and is noindex.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { articles } from '../src/content/insights';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const HOST = 'https://mastellagroup.com';
const REPORT = process.argv.includes('--report');

const errors: string[] = [];
const warnings: string[] = [];

function walk(dir: string, out: string[] = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const htmlPages = files.filter((f) => f.endsWith('index.html'));
const routeOf = (f: string) => {
  const rel = path.relative(DIST, path.dirname(f)).split(path.sep).join('/');
  return rel ? `/${rel}/` : '/';
};
const fileSet = new Set(files.map((f) => '/' + path.relative(DIST, f).split(path.sep).join('/')));
const routeSet = new Set(htmlPages.map(routeOf));

type JsonLd = Record<string, unknown>;
const flatten = (d: JsonLd): JsonLd[] => (Array.isArray(d['@graph']) ? (d['@graph'] as JsonLd[]) : [d]);
const types = (x: JsonLd) => ([] as unknown[]).concat(x['@type'] ?? []).map(String);
const text = (n: Element | null | undefined) => (n?.textContent ?? '').replace(/\s+/g, ' ').trim();

type Row = {
  route: string;
  title: number;
  desc: number;
  h1: number;
  canonical: string;
  og: string;
  jsonld: string;
};
const rows: Row[] = [];
const indexable: string[] = [];
const linksFrom = new Map<string, Set<string>>();
const reportRoutes = new Set(articles.filter((a) => a.category === 'Sector Report').map((a) => `/insights/${a.slug}/`));
const insightRoutes = new Set(articles.map((a) => `/insights/${a.slug}/`));

for (const f of htmlPages) {
  const route = routeOf(f);
  const html = fs.readFileSync(f, 'utf8');
  const { document } = parseHTML(html);
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (/noindex/i.test(robots)) continue;
  indexable.push(route);
  const err = (m: string) => errors.push(`${route}: ${m}`);
  const warn = (m: string) => warnings.push(`${route}: ${m}`);

  const title = text(document.querySelector('title'));
  const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (!title) err('no <title>');
  else if (title.length > 70) warn(`title ${title.length} characters`);
  if (!desc) err('no meta description');
  else if (desc.length < 70 || desc.length > 165) warn(`meta description ${desc.length} characters`);

  const h1s = document.querySelectorAll('h1').length;
  if (h1s !== 1) err(`${h1s} <h1> elements`);

  const canonicals = [...document.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute('href'));
  const expected = HOST + route;
  if (canonicals.length !== 1) err(`${canonicals.length} canonical tags`);
  else if (canonicals[0] !== expected) err(`canonical ${canonicals[0]} (expected ${expected})`);

  const og = (p: string) => document.querySelector(`meta[property="og:${p}"]`)?.getAttribute('content') ?? '';
  const missingOg = ['title', 'description', 'url', 'image', 'type'].filter((p) => !og(p));
  if (missingOg.length) err(`missing og:${missingOg.join(', og:')}`);
  if (og('url') && og('url') !== expected) err(`og:url ${og('url')} (expected ${expected})`);

  const blocks: JsonLd[] = [];
  for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      blocks.push(...flatten(JSON.parse(s.textContent ?? '')));
    } catch {
      err('JSON-LD does not parse');
    }
  }
  const has = (t: string) => blocks.filter((b) => types(b).includes(t));
  if (!has('Organization').length) err('no Organization JSON-LD');
  if (!has('Person').length) err('no Person JSON-LD');
  if (route !== '/' && !has('BreadcrumbList').length) err('no BreadcrumbList JSON-LD');
  const found = ['Organization', 'Person', 'WebSite', 'BreadcrumbList', 'Article', 'FAQPage', 'Service', 'WebApplication', 'ProfessionalService'].filter((t) => has(t).length);

  if (insightRoutes.has(route)) {
    const art = has('Article')[0];
    if (!art) err('no Article JSON-LD');
    else {
      const author = ([] as JsonLd[]).concat((art.author as JsonLd) ?? []);
      if (!author.some((a) => a.name === 'Leo Meggitt')) err('Article author is not Leo Meggitt');
      if (!art.datePublished) err('Article has no datePublished');
      if (!art.dateModified) err('Article has no dateModified');
    }
  }

  // FAQPage must match the visible FAQ: every question is on the page, and every answer's opening.
  for (const faq of has('FAQPage')) {
    const body = text(document.querySelector('#root'));
    for (const q of (faq.mainEntity as JsonLd[]) ?? []) {
      const name = String(q.name ?? '');
      const answer = text(parseHTML(`<p>${String((q.acceptedAnswer as JsonLd)?.text ?? '')}</p>`).document.querySelector('p'));
      if (!body.includes(name)) err(`FAQ question not visible: "${name.slice(0, 60)}"`);
      else if (!body.includes(answer.slice(0, 60))) err(`FAQ answer not visible: "${name.slice(0, 60)}"`);
    }
  }

  // Internal links.
  const out = new Set<string>();
  for (const a of document.querySelectorAll('#root a[href]')) {
    let href = a.getAttribute('href') ?? '';
    if (href.startsWith(HOST)) href = href.slice(HOST.length) || '/';
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const p = href.split(/[?#]/)[0];
    if (!p) continue;
    if (fileSet.has(p) && !p.endsWith('/index.html')) continue; // a real file (PDF, .md, image)
    if (routeSet.has(p)) {
      if (p !== route) out.add(p);
      continue;
    }
    if (routeSet.has(p + '/')) err(`links to ${p} (redirects to ${p}/)`);
    else if (/^\/(leomeg)$/.test(p)) continue; // _redirects short link
    else err(`broken internal link ${p}`);
  }
  linksFrom.set(route, out);

  rows.push({
    route,
    title: title.length,
    desc: desc.length,
    h1: h1s,
    canonical: canonicals[0] === expected ? 'ok' : 'WRONG',
    og: missingOg.length ? `missing ${missingOg.join(',')}` : 'ok',
    jsonld: found.join(', '),
  });
}

// Inbound links, reports and orphans.
const inbound = new Map<string, Set<string>>();
for (const [from, tos] of linksFrom) for (const to of tos) inbound.set(to, (inbound.get(to) ?? new Set()).add(from));
for (const r of reportRoutes) {
  if (!routeSet.has(r)) errors.push(`${r}: report route not built`);
  const from = inbound.get(r) ?? new Set();
  if (!from.has('/insights/sector-reports/')) errors.push(`${r}: not linked from the hub`);
  const others = [...from].filter((f) => f !== '/insights/sector-reports/');
  if (others.length < 2) errors.push(`${r}: linked from ${others.length} page(s) besides the hub`);
}
for (const r of indexable) if (r !== '/' && !(inbound.get(r)?.size)) errors.push(`${r}: orphan, no internal links to it`);

// Sitemap.
const sitemapFile = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemapFile)) errors.push('dist/sitemap.xml missing');
else {
  const xml = fs.readFileSync(sitemapFile, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].length;
  const paths = new Set(locs.map((l) => l.replace(HOST, '')));
  for (const r of indexable) if (!paths.has(r)) errors.push(`sitemap: missing ${r}`);
  for (const p of paths) {
    if (/\.(md|pdf)$/i.test(p)) errors.push(`sitemap: lists a file ${p}`);
    else if (!routeSet.has(p)) errors.push(`sitemap: lists ${p}, which is not a built page`);
    else if (!indexable.includes(p)) errors.push(`sitemap: lists noindex page ${p}`);
  }
  if (!paths.has('/insights/sector-reports/')) errors.push('sitemap: hub missing');
  if (lastmods !== locs.length) errors.push(`sitemap: ${locs.length - lastmods} URLs without lastmod`);
}

// llms.txt: every mastellagroup.com URL in it is a built page or file, and every sector report is
// listed with its Markdown copy and its own meta description.
const llmsFile = path.join(DIST, 'llms.txt');
if (!fs.existsSync(llmsFile)) errors.push('dist/llms.txt missing');
else {
  const llms = fs.readFileSync(llmsFile, 'utf8');
  for (const m of llms.matchAll(/https:\/\/mastellagroup\.com(\/[^\s)]*)/g)) {
    const p = m[1].replace(/[.,]$/, '');
    if (!routeSet.has(p) && !fileSet.has(p)) errors.push(`llms.txt: ${HOST}${p} is not a built page or file`);
  }
  for (const a of articles.filter((x) => x.category === 'Sector Report')) {
    const line = llms.split('\n').find((l) => l.includes(`/insights/${a.slug}/ `));
    if (!line) errors.push(`llms.txt: report ${a.slug} not listed`);
    else {
      if (!line.includes(`/insights/${a.slug}.md`)) errors.push(`llms.txt: report ${a.slug} has no Markdown link`);
      if (a.metaDescription && !line.includes(a.metaDescription)) errors.push(`llms.txt: report ${a.slug} description differs from its meta description`);
    }
  }
}

// 404 page.
const notFound = path.join(DIST, '404.html');
if (!fs.existsSync(notFound)) errors.push('dist/404.html missing');
else if (!/<meta name="robots" content="noindex/.test(fs.readFileSync(notFound, 'utf8'))) errors.push('404.html is not noindex');

if (REPORT) {
  console.log('| URL | Title | Description | H1 | Canonical | Open Graph | JSON-LD |');
  console.log('|---|---|---|---|---|---|---|');
  for (const r of rows.sort((a, b) => a.route.localeCompare(b.route))) {
    console.log(`| ${r.route} | ${r.title} | ${r.desc} | ${r.h1} | ${r.canonical} | ${r.og} | ${r.jsonld} |`);
  }
  console.log('');
}
for (const w of warnings) console.warn(`seo warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`seo error: ${e}`);
  console.error(`seo: ${errors.length} error(s) on ${indexable.length} indexable pages`);
  process.exit(1);
}
console.log(`seo: ${indexable.length} indexable pages pass; sitemap matches; ${warnings.length} warning(s)`);
