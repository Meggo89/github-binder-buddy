// First-touch attribution for enquiry forms, held in memory only.
//
// Captured once when the app boots (the landing page), before any client-side navigation, so an
// enquiry sent from /contact/ can still say the visitor originally arrived from ChatGPT, Perplexity
// or a search engine. Nothing is written to cookies or storage: a full page reload starts again.
// The value is only sent to us if the visitor submits a form.

const AI_SOURCES: Array<[RegExp, string]> = [
  [/(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$|(^|\.)openai\.com$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/(^|\.)claude\.ai$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$|(^|\.)bard\.google\.com$/, 'Gemini'],
  [/(^|\.)copilot\.microsoft\.com$/, 'Microsoft Copilot'],
  [/(^|\.)meta\.ai$/, 'Meta AI'],
  [/(^|\.)you\.com$/, 'You.com'],
  [/(^|\.)phind\.com$/, 'Phind'],
];

let captured: string | null = null;
let aiSource: string | null = null;

function classify(host: string): string | null {
  const h = host.toLowerCase();
  for (const [re, label] of AI_SOURCES) if (re.test(h)) return label;
  return null;
}

export function captureFirstTouch(): void {
  if (typeof window === 'undefined' || captured !== null) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') ?? '';
    const utmMedium = params.get('utm_medium') ?? '';
    let refHost = '';
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.hostname !== window.location.hostname) refHost = ref.hostname;
    }
    aiSource = classify(utmSource) ?? (refHost ? classify(refHost) : null);
    const parts = [
      aiSource ? `AI assistant: ${aiSource}` : null,
      refHost ? `referrer ${refHost}` : 'no referrer',
      utmSource ? `utm_source ${utmSource}` : null,
      utmMedium ? `utm_medium ${utmMedium}` : null,
      `landed on ${window.location.pathname}`,
    ].filter(Boolean);
    captured = parts.join('; ').slice(0, 300);
  } catch {
    captured = 'unknown';
  }
}

export function getFirstTouch(): string {
  return captured ?? '';
}

export function getAiSource(): string | null {
  return aiSource;
}
