// Shared by the sitemap and lastmod scripts: the indexable pages in dist/ and a hash of the text a
// reader sees on each (the hero and <main>, without the navigation, footer or cookie banner), so a
// page's lastmod moves only when its own content changes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DIST = path.resolve(__dirname, '..', 'dist');
export const LEDGER = path.resolve(__dirname, '..', 'src', 'seo', 'lastmod.json');

export type Ledger = Record<string, { hash: string; lastmod: string }>;

function walk(dir: string, out: string[] = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

// Every prerendered page that is not noindex, as { route: '/about/', hash }.
export function indexablePages(): { route: string; hash: string }[] {
  const pages: { route: string; hash: string }[] = [];
  for (const f of walk(DIST)) {
    const rel = path.relative(DIST, path.dirname(f)).split(path.sep).join('/');
    const route = rel ? `/${rel}/` : '/';
    const { document } = parseHTML(fs.readFileSync(f, 'utf8'));
    if (/noindex/i.test(document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '')) continue;
    const root = document.querySelector('#root');
    if (!root) continue;
    const parts: string[] = [];
    const header = root.querySelector(':scope > div > header');
    if (header) {
      const h = header.cloneNode(true) as Element;
      h.querySelectorAll('nav').forEach((n) => n.remove());
      parts.push(h.textContent ?? '');
    }
    parts.push(root.querySelector('main')?.textContent ?? '');
    const text = parts.join(' ').replace(/\s+/g, ' ').trim();
    pages.push({ route, hash: crypto.createHash('sha256').update(text).digest('hex').slice(0, 16) });
  }
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

export function readLedger(): Ledger {
  try {
    return JSON.parse(fs.readFileSync(LEDGER, 'utf8')) as Ledger;
  } catch {
    return {};
  }
}

export const today = () => new Date().toISOString().slice(0, 10);
