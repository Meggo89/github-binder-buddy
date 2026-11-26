// Write a plain-text Markdown copy of each page listed in src/seo/markdown.ts, generated from the
// page's own prerendered HTML in dist/, so the copy cannot say anything the page does not.
//
// What is left out: the site navigation and breadcrumbs (a report's contents list is kept), the footer, the cookie banner (rendered outside #root),
// forms (inputs and buttons have no text to carry over) and the "Read as plain text" link itself.
// Text that is hidden from readers (sr-only, aria-hidden, the hidden attribute) is left out too.
//
// Drift check: after converting, the headings and the figures (every number, with its £, %, x, m
// or bn) are read from the page and from the Markdown, and the build fails if they differ.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';
// @ts-expect-error: the plugin ships without types
import { gfm } from 'turndown-plugin-gfm';
import { markdownPages, markdownPathFor } from '../src/seo/markdown';
import { SITE, canonicalFor } from '../src/seo/site-meta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');

const SKIP = [
  'nav:not(.report-toc)',
  'footer',
  'form',
  'script',
  'style',
  'noscript',
  'svg',
  'input',
  'select',
  'textarea',
  '[data-md-skip]',
  '.sr-only',
  '[aria-hidden="true"]',
  '[hidden]',
].join(',');

function htmlFor(route: string): string {
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html');
  return fs.readFileSync(file, 'utf8');
}

// The page content: the hero inside the site header (without its navigation) and <main>.
function contentRoot(html: string) {
  const { document } = parseHTML(html);
  const root = document.querySelector('#root');
  if (!root) throw new Error('no #root');
  const wrap = document.createElement('div');
  const header = root.querySelector(':scope > div > header');
  const main = root.querySelector('main');
  if (!main) throw new Error('no <main>');
  if (header) wrap.appendChild(header.cloneNode(true));
  wrap.appendChild(main.cloneNode(true));
  wrap.querySelectorAll(SKIP).forEach((el: Element) => el.remove());
  // Keep visual separation that CSS provides: a space between the parts of a link or button and
  // after each link, so adjacent items do not run together in plain text.
  wrap.querySelectorAll('a, button').forEach((el: Element) => {
    el.querySelectorAll('span, div, p, strong, em, small').forEach((c: Element) => c.after(document.createTextNode(' ')));
    el.after(document.createTextNode(' '));
  });
  // Accordion questions are buttons; show them as bold lines.
  wrap.querySelectorAll('button').forEach((b: Element) => {
    const t = (b.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!t) return b.remove();
    const strong = document.createElement('p');
    strong.innerHTML = `<strong>${t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</strong>`;
    b.replaceWith(strong);
  });
  // Absolute links so the copy works on its own.
  wrap.querySelectorAll('a[href^="/"]').forEach((a: Element) => a.setAttribute('href', SITE.domain + a.getAttribute('href')));
  wrap.querySelectorAll('img[src^="/"]').forEach((i: Element) => i.setAttribute('src', SITE.domain + i.getAttribute('src')));
  return { document, wrap };
}

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
td.use(gfm);
// Headings that sit inside links (tiles, cards) would otherwise come out as broken Markdown.
td.addRule('blockLinks', {
  filter: (node) => node.nodeName === 'A' && Boolean((node as Element).querySelector('h1,h2,h3,h4,h5,h6,p,div')),
  replacement: (content, node) => {
    const href = (node as Element).getAttribute('href');
    const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);
    const heading = lines.find((l) => /^#{1,6} /.test(l));
    const title = heading ? heading.replace(/^#+ /, '') : lines.filter((l) => !l.startsWith('![')).join(' ');
    const images = lines.filter((l) => l.startsWith('!['));
    const rest = heading ? lines.filter((l) => l !== heading && !l.startsWith('![')) : [];
    return `\n\n${[...images, `[${title}](${href})`, ...rest].join('\n\n')}\n\n`;
  },
});

// Heading text and figures, for the drift check.
const FIGURE = /£?\d+(?:,\d{3})*(?:\.\d+)?(?:\s?(?:%|x|m|bn|k)\b)?/g;
function norm(t: string) {
  return t.replace(/\s+/g, ' ').trim();
}
function figures(t: string) {
  return (norm(t).match(FIGURE) ?? []).map((f) => f.replace(/\s/g, '')).sort();
}
function mdText(md: string) {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/^#+ /gm, '')
    .replace(/^\s*(\d+)\.\s/gm, '$1 ')
    .replace(/[*_|`\\]/g, ' ')
    .replace(/^\s*-{3,}\s*$/gm, '');
}
function htmlText(el: Element) {
  const c = el.cloneNode(true) as Element;
  c.querySelectorAll('a').forEach((a) => a.removeAttribute('href'));
  c.querySelectorAll('img').forEach((i) => i.replaceWith(c.ownerDocument.createTextNode(` ${i.getAttribute('alt') ?? ''} `)));
  // Numbered lists render their item numbers in Markdown; add them to the page text to match.
  c.querySelectorAll('ol').forEach((ol) => {
    const start = Number(ol.getAttribute('start') ?? 1);
    ol.querySelectorAll(':scope > li').forEach((li, i) => li.prepend(c.ownerDocument.createTextNode(`${start + i} `)));
  });
  c.querySelectorAll('p,div,li,h1,h2,h3,h4,h5,h6,td,th,tr,br').forEach((n) => n.append(c.ownerDocument.createTextNode(' ')));
  return c.textContent ?? '';
}

function build(route: string) {
  const html = htmlFor(route);
  const { wrap } = contentRoot(html);
  const body = td.turndown(wrap.innerHTML).replace(/\n{3,}/g, '\n\n').replace(/\) ([.,;:!?)])/g, ')$1').trim();
  const canonical = canonicalFor(route);
  const md = `${body}\n\n---\n\nSource page: ${canonical}\n`;

  const problems: string[] = [];
  const pageHeadings = [...wrap.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h: Element) => norm(h.textContent ?? '')).filter(Boolean);
  const mdPlain = norm(mdText(body));
  for (const h of pageHeadings) {
    if (!mdPlain.includes(norm(mdText(h)))) problems.push(`heading missing: "${h}"`);
  }
  const a = figures(htmlText(wrap));
  const b = figures(mdText(body));
  if (a.join('|') !== b.join('|')) {
    const count = (xs: string[]) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<string, number>());
    const ca = count(a);
    const cb = count(b);
    const diff = [...new Set([...a, ...b])].filter((x) => ca.get(x) !== cb.get(x)).map((x) => `${x} page ${ca.get(x) ?? 0} md ${cb.get(x) ?? 0}`);
    problems.push(`figures differ: ${diff.slice(0, 10).join('; ')}`);
  }
  return { md, problems };
}

let failed = 0;
let written = 0;
for (const route of markdownPages()) {
  const out = markdownPathFor(route)!;
  const { md, problems } = build(route);
  if (problems.length) {
    failed++;
    console.error(`markdown: ${route}\n  ${problems.join('\n  ')}`);
  }
  fs.mkdirSync(path.dirname(path.join(DIST, out)), { recursive: true });
  fs.writeFileSync(path.join(DIST, out), md);
  written++;
}
if (failed) {
  console.error(`markdown: drift check failed on ${failed} page(s)`);
  process.exit(1);
}
console.log(`markdown: wrote ${written} copies; headings and figures match their pages`);
