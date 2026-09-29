import type { Answer, IndicatorResult, ReadinessResult } from '../../content/readiness/score';
import { MODEL } from '../../content/readiness/model';

export const BOOKING_URL = 'https://www.mastellagroup.com/leomeg';

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

export function summarise(result: ReadinessResult, answers: Record<string, Answer | undefined>): string {
  const lines = [
    `Overall ${result.overall ?? 'n/a'} (${result.rating}), ${result.answered} of ${MODEL.indicators.length} answered (free score).`,
    ...result.modules.map((m) => `${m.name}: ${m.score ?? 'n/a'} (${m.rating})`),
  ];
  if (result.blockers.length) lines.push(`Blockers: ${result.blockers.map((b) => b.indicator.name).join(', ')}`);
  if (result.gaps.length) {
    lines.push('Weak measures:');
    for (const g of result.gaps) lines.push(`- ${g.indicator.id} ${g.indicator.name} (${g.score}): ${describeAnswer(g, answers[g.indicator.id])}`);
  }
  if (result.unsure.length) lines.push(`Not sure: ${result.unsure.map((u) => u.indicator.name).join(', ')}`);
  return lines.join('\n').slice(0, 4000);
}

// Lower-case the first letter of a measure name for use mid-sentence, leaving acronyms alone
// ("Largest customer" -> "largest customer", "IP and assets" stays as it is).
export function lcFirst(s: string): string {
  return /^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
