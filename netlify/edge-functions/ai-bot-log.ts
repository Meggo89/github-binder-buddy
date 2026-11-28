// Records visits from AI crawlers to Netlify Blobs, for /api/ai-bot-report. Read-only measurement:
// it passes every request through untouched and returns the page response exactly as served.
// Logging happens after the response is handed back (context.waitUntil), inside try/catch, so it
// never delays or breaks a page; onError: 'bypass' means Netlify skips the function if it fails.
// No IP address is read or stored.
import type { Config, Context } from '@netlify/edge-functions';
import { getStore } from '@netlify/blobs';
import { AI_BOT_STORE, matchAiBot, visitKey } from '../lib/ai-bots.ts';

async function record(request: Request, response: Response, context: Context, bot: string) {
  const now = new Date().toISOString();
  const url = new URL(request.url);
  const visit = {
    date: now.slice(0, 10),
    time: now.slice(11, 19),
    bot,
    path: url.pathname,
    status: response.status,
    country: context.geo?.country?.code ?? '',
  };
  const key = visitKey(visit, crypto.randomUUID().slice(0, 8));
  await getStore(AI_BOT_STORE).set(key, JSON.stringify(visit));
}

export default async function aiBotLog(request: Request, context: Context) {
  const response = await context.next();
  try {
    const bot = matchAiBot(request.headers.get('user-agent'));
    const type = response.headers.get('content-type') ?? '';
    if (bot && /text\/(html|markdown)/i.test(type)) {
      // Start the write only after the response has been handed back.
      const later = new Promise((resolve) => setTimeout(resolve, 0));
      context.waitUntil(later.then(() => record(request, response, context, bot)).catch(() => {}));
    }
  } catch {
    // Fail open: measurement must never affect the page.
  }
  return response;
}

export const config: Config = {
  path: '/*',
  method: 'GET',
  // Pages and Markdown copies only: skip assets, downloads and functions.
  excludedPath: ['/assets/*', '/images/*', '/downloads/*', '/api/*', '/.netlify/*'],
  excludedPattern: '\\.(?:js|mjs|css|map|json|xml|txt|pdf|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|webmanifest)$',
  onError: 'bypass',
};
