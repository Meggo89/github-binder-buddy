// Pages that also have a plain-text Markdown copy. The copies are written at build time by
// scripts/build-markdown.ts from the prerendered HTML of each page, so they carry the same text.
import { articles } from '../content/insights';

const STATIC_MARKDOWN_PAGES = ['/', '/services', '/team', '/insights', '/insights/sector-reports'];

function normalise(path: string): string {
  const p = path.replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0];
  return p === '/' ? '/' : p.replace(/\/+$/, '');
}

export function markdownPages(): string[] {
  const reports = articles.filter((a) => a.category === 'Sector Report').map((a) => `/insights/${a.slug}`);
  return [...STATIC_MARKDOWN_PAGES, ...reports];
}

// '/' -> '/index.md', '/insights/foo' -> '/insights/foo.md'. Null for pages without a copy.
export function markdownPathFor(path: string): string | null {
  const p = normalise(path);
  if (!markdownPages().includes(p)) return null;
  return p === '/' ? '/index.md' : `${p}.md`;
}

export const MARKDOWN_LINK_LABEL = 'Read as plain text (Markdown)';
