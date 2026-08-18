// Extracts a hero subtitle from a landing page's own data — first sentence
// of the intro paragraph, then fall back to the first sentence of the meta
// description, then a sensible default. Enforces a ~25 word ceiling so the
// subtitle sits cleanly under the H1 without wrapping into a paragraph.

const MAX_WORDS = 25;
const DEFAULT_SUBTITLE =
  'Senior-led, off-market M&A advisory for founder-led businesses worth £5M–£50M.';

function firstSentence(text: string): string {
  // Split on sentence terminator (. ! ?) followed by whitespace. Preserves the
  // terminator by using a lookbehind so we can strip it cleanly below.
  const parts = text.split(/(?<=[.!?])\s+/);
  const raw = (parts[0] ?? text).trim();
  // Strip a trailing period so we can re-attach one consistently.
  return raw.replace(/[.!?]+$/, '');
}

function withinBudget(sentence: string): boolean {
  return sentence.split(/\s+/).filter(Boolean).length <= MAX_WORDS;
}

export function heroSubtitle(
  intro: string,
  metaDescription?: string,
  override?: string,
): string {
  // Hand-written overrides win outright. Trim only — don't apply the word budget
  // or force a trailing period; the override is the author's call.
  if (override && override.trim()) return override.trim();

  const primary = firstSentence(intro);
  if (withinBudget(primary)) return primary + '.';

  if (metaDescription) {
    const fallback = firstSentence(metaDescription);
    if (withinBudget(fallback)) return fallback + '.';
  }

  return DEFAULT_SUBTITLE;
}
