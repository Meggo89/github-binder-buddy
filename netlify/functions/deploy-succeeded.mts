import type { Handler } from '@netlify/functions';
import { submitToIndexNow, urlsFromSitemap, INDEXNOW_HOST } from '../../scripts/indexnow-core';

// Netlify runs a function named `deploy-succeeded` automatically after each successful deploy
// (an event-triggered function; it is not an HTTP endpoint for visitors). It tells IndexNow that
// every URL in the live sitemap may have changed, so Bing and the other IndexNow engines recrawl
// new and updated pages within hours rather than weeks.
//
// Only production deploys submit. Never throws: a failed ping must not affect anything else.
// If it ever stops firing, run `npx tsx scripts/indexnow.ts` after a deploy instead.
export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}') as { payload?: { context?: string } };
    const context = body.payload?.context;
    if (context && context !== 'production') {
      return { statusCode: 200, body: `skipped: ${context} deploy` };
    }
    const xml = await (await fetch(`https://${INDEXNOW_HOST}/sitemap.xml`)).text();
    const urls = urlsFromSitemap(xml);
    if (!urls.length) return { statusCode: 200, body: 'no URLs in sitemap' };
    const status = await submitToIndexNow(urls);
    console.log(`deploy-succeeded: IndexNow accepted ${urls.length} URLs with HTTP ${status}`);
    return { statusCode: 200, body: `submitted ${urls.length}` };
  } catch (err) {
    console.error('deploy-succeeded: IndexNow ping failed', err);
    return { statusCode: 200, body: 'error logged' };
  }
};
