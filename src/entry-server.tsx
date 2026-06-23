import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// SSR entry. Called from scripts/prerender.ts for each route at build time.
// Returns the rendered React tree as a string plus the populated helmet
// context (currently unused — head meta still comes from the manual
// RouteMeta-based patching in prerender.ts, which is a well-tested
// single source of truth). Helmet is included anyway because the SEO
// component inside the tree uses it; without HelmetProvider it throws.
export function render(url: string): { html: string; helmet: unknown } {
  const helmetContext: { helmet?: unknown } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}
