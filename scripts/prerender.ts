// Post-build step. For every known route (static + dynamic article slugs),
// emit a per-route index.html in dist/ with route-specific meta patched in.
// Crawlers and social scrapers that request /about get /about/index.html with
// the right title/og/canonical, rather than the generic homepage shell.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, SITE, fullTitle, canonicalFor, type RouteMeta } from '../src/seo/site-meta';
import { articles } from '../src/content/insights';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const TEMPLATE = path.join(DIST, 'index.html');

type PatchInput = {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  articleSchema?: string; // optional JSON-LD string to inject
};

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function patchHtml(shell: string, m: PatchInput): string {
  const title = fullTitle(m.title);
  const canonical = canonicalFor(m.path);
  const description = m.description;
  const ogImage = m.ogImage || SITE.defaultOgImage;
  const ogType = m.ogType || 'website';

  let h = shell;
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  h = h.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );
  h = h.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`
  );

  // Open Graph
  h = h.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeAttr(ogType)}" />`
  );
  h = h.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`
  );
  h = h.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`
  );
  h = h.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`
  );
  h = h.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`
  );

  // Twitter
  h = h.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${escapeAttr(canonical)}" />`
  );
  h = h.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`
  );
  h = h.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`
  );
  h = h.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`
  );

  // Inject an Article JSON-LD block just before </head> if provided
  if (m.articleSchema) {
    const block = `    <script type="application/ld+json">${m.articleSchema}</script>\n  </head>`;
    h = h.replace(/\s*<\/head>/, `\n${block}`);
  }

  return h;
}

function writeRoute(m: PatchInput, shell: string) {
  const html = patchHtml(shell, m);
  if (m.path === '/') {
    fs.writeFileSync(TEMPLATE, html);
    return;
  }
  const dir = path.join(DIST, m.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

async function run() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error(`prerender: dist/index.html missing. Run vite build first.`);
    process.exit(1);
  }
  const shell = fs.readFileSync(TEMPLATE, 'utf8');

  // Static routes
  const staticInputs: PatchInput[] = ROUTES.map((r: RouteMeta) => ({
    path: r.path,
    title: r.title,
    description: r.description,
    ogType: r.ogType,
    ogImage: r.ogImage,
  }));

  // Article routes with per-article Article JSON-LD
  const articleInputs: PatchInput[] = articles.map((a) => {
    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.excerpt,
      image: a.image,
      author: { '@type': 'Person', name: a.author },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.domain,
      },
      datePublished: a.date,
      articleSection: a.category,
    });
    return {
      path: `/insights/${a.slug}`,
      title: a.title,
      description: a.excerpt,
      ogType: 'article',
      ogImage: a.image,
      articleSchema: schema,
    };
  });

  const all = [...staticInputs, ...articleInputs];
  for (const m of all) writeRoute(m, shell);
  console.log(`prerender: wrote ${all.length} per-route HTML files to dist/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
