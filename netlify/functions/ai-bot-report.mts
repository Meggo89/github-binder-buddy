import type { Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { AI_BOT_STORE, parseVisitKey } from '../lib/ai-bots.ts';

// GET /api/ai-bot-report?days=7 with the token from the AI_REPORT_TOKEN environment variable, sent
// as "Authorization: Bearer <token>" or ?token=<token>. Returns AI crawler visits per day, by bot
// and by path. Without the token, or before the variable is set, it answers 404 as if it did not
// exist.

function notFound() {
  return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

function sameToken(a: string, b: string) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

type Counts = { total: number; byBot: Record<string, number>; byPath: Record<string, number> };
const empty = (): Counts => ({ total: 0, byBot: {}, byPath: {} });
const add = (c: Counts, bot: string, path: string) => {
  c.total++;
  c.byBot[bot] = (c.byBot[bot] ?? 0) + 1;
  c.byPath[path] = (c.byPath[path] ?? 0) + 1;
};

export default async (request: Request) => {
  const expected = process.env.AI_REPORT_TOKEN ?? '';
  const url = new URL(request.url);
  const auth = request.headers.get('authorization') ?? '';
  const given = auth.startsWith('Bearer ') ? auth.slice(7).trim() : (url.searchParams.get('token') ?? '');
  if (!sameToken(given, expected)) return notFound();

  const days = Math.min(90, Math.max(1, Math.floor(Number(url.searchParams.get('days') ?? '7')) || 7));
  // Strong consistency: a report should count every visit stored so far, and is not latency-critical.
  const store = getStore({ name: AI_BOT_STORE, consistency: 'strong' });
  const today = new Date();
  const daily: Record<string, Counts> = {};
  const all = empty();
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i)).toISOString().slice(0, 10);
    const counts = empty();
    const { blobs } = await store.list({ prefix: `${date}/` });
    for (const { key } of blobs) {
      const v = parseVisitKey(key);
      if (!v) continue;
      add(counts, v.bot, v.path);
      add(all, v.bot, v.path);
    }
    daily[date] = counts;
  }
  return Response.json(
    { days, generatedAt: new Date().toISOString(), totals: all, daily },
    { headers: { 'cache-control': 'no-store' } },
  );
};

export const config: Config = { path: '/api/ai-bot-report', method: 'GET' };
