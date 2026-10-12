import type { Answer, IndicatorResult, ReadinessResult } from '../../content/readiness/score';
import { MODEL } from '../../content/readiness/model';

export function describeAnswer(r: IndicatorResult, a: Answer | undefined): string {
  const ind = r.indicator;
  if (!a) return 'Not answered';
  if (a.unsure) return 'Not sure';
  if (ind.type === 'category') return ind.options?.find((o) => o.key === a.option)?.label ?? 'Not answered';
  if (ind.type === 'checklist') {
    if (a.none) return 'None';
    const items = a.items ?? [];
    return `${items.length}: ${items.join('; ')}`;
  }
  if (ind.noneOption && a.value === ind.noneOption.value) return ind.noneOption.label;
  if (a.value === undefined) return 'Not answered';
  const unit = ind.unit === '%' || ind.unit === 'pp' ? ind.unit : ` ${ind.unit}`;
  return `${a.value}${unit}`;
}

// Plain-text summary for Leo (the enquiry email and the Netlify form record). Scores are rounded
// the same way the results panel shows them, so it matches what the owner saw.
export function summarise(result: ReadinessResult, answers: Record<string, Answer | undefined>): string {
  const shown = (x: number | null) => (x === null ? 'not scored' : String(Math.round(x)));
  const lines = [
    `Overall: ${shown(result.overall)} out of 100 (${result.rating}). ${result.answered} of ${MODEL.indicators.length} questions answered.`,
    '',
    'Area scores:',
    ...result.modules.map((m) => `- ${m.name}: ${shown(m.score)}${m.score === null ? '' : ` (${m.rating})`}`),
  ];
  if (result.blockers.length) {
    lines.push('', `Deal issues (critical on a measure buyers treat as a blocker): ${result.blockers.map((b) => b.indicator.name).join(', ')}`);
  }
  if (result.gaps.length) {
    lines.push('', 'Gaps, most costly first:');
    for (const g of result.gaps) {
      const band = MODEL.scale[String(g.score)].toLowerCase();
      lines.push(`- ${g.indicator.name}: ${band}. Answer: ${describeAnswer(g, answers[g.indicator.id])}`);
    }
  }
  if (result.unsure.length) lines.push('', `Not sure: ${result.unsure.map((u) => u.indicator.name).join(', ')}`);
  return lines.join('\n').slice(0, 4000);
}

// Lower-case the first letter of a measure name for use mid-sentence, leaving acronyms alone
// ("Largest customer" -> "largest customer", "IP and assets" stays as it is).
export function lcFirst(s: string): string {
  return /^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
