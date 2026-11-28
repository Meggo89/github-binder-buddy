// Shared by the ai-bot-log edge function and the ai-bot-report function. No dependencies, so it
// bundles for both Deno (edge) and Node (functions).

export const AI_BOT_STORE = 'ai-bot-visits';

// Named AI crawlers and AI user agents, matched in this order. Google-Extended and
// Applebot-Extended are robots.txt tokens only (those companies crawl as Googlebot and Applebot),
// so they never appear in a user agent; Googlebot and Applebot are recorded as "other bot".
const NAMED: [string, RegExp][] = [
  ['GPTBot', /GPTBot/i],
  ['OAI-SearchBot', /OAI-SearchBot/i],
  ['ChatGPT-User', /ChatGPT-User/i],
  ['ClaudeBot', /ClaudeBot/i],
  ['Claude-User', /Claude-User/i],
  ['Claude-SearchBot', /Claude-SearchBot/i],
  ['PerplexityBot', /PerplexityBot/i],
  ['Perplexity-User', /Perplexity-User/i],
  ['Google-Extended', /Google-Extended/i],
  ['Applebot-Extended', /Applebot-Extended/i],
  ['Bingbot', /bingbot/i],
  ['Amazonbot', /Amazonbot/i],
  ['CCBot', /CCBot/i],
  ['meta-externalagent', /meta-externalagent/i],
  ['Bytespider', /Bytespider/i],
  ['DeepSeek', /DeepSeek/i],
  ['YouBot', /YouBot/i],
  ['Diffbot', /Diffbot/i],
];
const OTHER = /bot|crawler|spider/i;
export const OTHER_BOT = 'other bot';

export function matchAiBot(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  for (const [name, re] of NAMED) if (re.test(userAgent)) return name;
  return OTHER.test(userAgent) ? OTHER_BOT : null;
}

export type Visit = { date: string; time: string; bot: string; path: string; status: number; country: string };

// Each visit is its own key, under a prefix per day, so visits arriving at the same moment never
// overwrite each other. Everything the report needs is in the key, so it can count a day's visits
// from a listing alone: <date>/<time>~<random>~<bot>~<status>~<country>~<path, URI-encoded>.
export function visitKey(v: Visit, random: string): string {
  const path = encodeURIComponent(v.path.slice(0, 300));
  return [`${v.date}/${v.time}`, random, encodeURIComponent(v.bot), v.status, v.country || '-', path].join('~');
}

export function parseVisitKey(key: string): Visit | null {
  const [dayTime, , bot, status, country, path] = key.split('~');
  const [date, time] = (dayTime ?? '').split('/');
  if (!date || !time || !bot || !path) return null;
  return { date, time, bot: decodeURIComponent(bot), status: Number(status), country, path: decodeURIComponent(path) };
}
