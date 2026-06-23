// Full SSR step. For every known route (static + dynamic article slugs +
// 47 landing pages), render the React tree via the SSR entry, patch the
// route-specific head meta into the shell, inject the rendered body HTML
// into the #root div, and write the resulting per-route index.html.
//
// Replaces the previous head-only prerender. Body content (H1, prose,
// nav, footer, JSON-LD from per-page components) is now present in the
// initial HTML response, which is what JS-blind crawlers (LinkedIn,
// Bing, Slack, Twitter) and AEO indexers actually consume.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ROUTES, SITE, fullTitle, canonicalFor, type RouteMeta } from '../src/seo/site-meta';
import { articles } from '../src/content/insights';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const DIST_SSR = path.resolve(__dirname, '..', 'dist-ssr');
const TEMPLATE = path.join(DIST, 'index.html');
const SSR_ENTRY = path.join(DIST_SSR, 'entry-server.js');

type PatchInput = {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  ogImage?: string;
  articleSchema?: string;
};

type RenderFn = (url: string) => { html: string; helmet: unknown };

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function patchHead(shell: string, m: PatchInput): string {
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

function injectBody(html: string, ssrBody: string): string {
  // Replace empty <div id="root"></div> with the SSR'd content. Match any
  // amount of inner whitespace so the swap is robust against future shell
  // formatting changes.
  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${ssrBody}</div>`);
}

function writeRoute(m: PatchInput, headPatched: string, ssrBody: string) {
  const html = injectBody(headPatched, ssrBody);
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
  if (!fs.existsSync(SSR_ENTRY)) {
    console.error(`prerender: dist-ssr/entry-server.js missing. Run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first.`);
    process.exit(1);
  }

  const shell = fs.readFileSync(TEMPLATE, 'utf8');
  const ssrModule = (await import(pathToFileURL(SSR_ENTRY).href)) as { render: RenderFn };
  const { render } = ssrModule;

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
  let ok = 0;
  let bytes = 0;
  for (const m of all) {
    const headPatched = patchHead(shell, m);
    try {
      const { html: ssrBody } = render(m.path);
      writeRoute(m, headPatched, ssrBody);
      ok++;
      bytes += ssrBody.length;
    } catch (e) {
      console.error(`prerender: render failed for ${m.path}:`, e);
      // Fall back to empty body so the route still exists with correct head meta.
      writeRoute(m, headPatched, '');
    }
  }
  console.log(
    `prerender: SSR'd ${ok}/${all.length} routes; avg body size ${Math.round(bytes / ok)} bytes; written to dist/`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
