// Scoring for the free Exit Readiness Score. Question scoring (bands, thresholds, options) follows
// boycie/score.py (the Review engine). The overall score is the free score's own: the four areas in
// free-score.ts at fixed weights, each area the share-weighted average of its answered questions.
// With every question answered this equals the share-weighted average of all questions. The free
// score asks one website-only question (MA1), so it no longer matches the Review engine's overall.

import { MODEL } from './model';
import { FREE_INDICATORS, QUESTION_SHARE, SCORED_AREAS, areaWeightRaw } from './free-score';
import type { ModuleId, ReadinessIndicator } from './types';

export type Answer = {
  value?: number;     // numeric answers, and checklist counts
  option?: string;    // category answers
  items?: string[];   // checklist items that apply
  none?: boolean;     // checklist: "none of these"
  unsure?: boolean;   // "not sure" on any question
};

export type Answers = Record<string, Answer | undefined>;

export type IndicatorResult = {
  indicator: ReadinessIndicator;
  score: number | null; // 1 to 4, null when unanswered or unsure
  unsure: boolean;
};

export type ModuleResult = {
  id: ModuleId;
  name: string;
  weight: number;
  score: number | null; // 0 to 100
  rating: string;
  answered: number;
  total: number;
};

export type ReadinessResult = {
  overall: number | null;
  rating: string;
  modules: ModuleResult[];
  indicators: IndicatorResult[];
  gaps: IndicatorResult[];    // scored 2 or below, most costly first
  blockers: IndicatorResult[]; // blocker indicators scoring 1
  unsure: IndicatorResult[];
  answered: number;
};

export function to100(s: number | null): number | null {
  return s === null ? null : ((s - 1) / 3) * 100;
}

export function rating(x: number | null): string {
  if (x === null) return 'Not scored';
  if (x >= 75) return 'Strong';
  if (x >= 50) return 'Adequate';
  if (x >= 25) return 'Weak';
  return 'Critical';
}

export function scoreValue(ind: ReadinessIndicator, value?: number, option?: string): number | null {
  if (ind.type === 'category') {
    const o = ind.options?.find((x) => x.key === option);
    return o ? o.score : null;
  }
  if (value === undefined || value === null || Number.isNaN(value)) return null;
  const t = ind.thresholds as number[];
  if (ind.direction === 'lower_better') {
    return value <= t[0] ? 4 : value <= t[1] ? 3 : value <= t[2] ? 2 : 1;
  }
  return value >= t[0] ? 4 : value >= t[1] ? 3 : value >= t[2] ? 2 : 1;
}

export function answerValue(ind: ReadinessIndicator, a: Answer | undefined): { value?: number; option?: string } | null {
  if (!a || a.unsure) return null;
  if (ind.type === 'category') return a.option ? { option: a.option } : null;
  if (ind.type === 'checklist') {
    if (a.none) return { value: 0 };
    if (a.items && a.items.length > 0) return { value: a.items.length };
    return null;
  }
  return a.value === undefined || a.value === null || Number.isNaN(a.value) ? null : { value: a.value };
}

// Round to one decimal place the way Python's round(x, 1) does: correctly rounded on the exact
// binary value, with exact halves going to the even digit. Keeps parity with the Review engine.
export function round1(x: number): number {
  // Only values ending in .25 or .75 are exact halves at one decimal place in binary floating point.
  if (Number.isInteger(x * 4) && !Number.isInteger(x * 10)) {
    const floor = Math.floor(x * 10);
    return (floor % 2 === 0 ? floor : floor + 1) / 10;
  }
  return parseFloat(x.toFixed(1));
}

export function scoreAnswers(answers: Answers): ReadinessResult {
  const moduleWeight: Record<string, number> = {};
  MODEL.modules.forEach((m) => (moduleWeight[m.id] = m.weight));

  const indicators: IndicatorResult[] = FREE_INDICATORS.map((ind) => {
    const a = answers[ind.id];
    const v = answerValue(ind, a);
    const score = v ? scoreValue(ind, v.value, v.option) : null;
    return { indicator: ind, score, unsure: !!a?.unsure };
  });

  const modules: ModuleResult[] = MODEL.modules.map((m) => {
    const rows = indicators.filter((r) => r.indicator.module === m.id);
    const scored = rows.filter((r) => r.score !== null);
    const sw = scored.reduce((s, r) => s + r.indicator.weight, 0);
    const sc = sw ? scored.reduce((s, r) => s + r.indicator.weight * (to100(r.score) as number), 0) / sw : null;
    return {
      id: m.id,
      name: m.name,
      weight: m.weight,
      score: sc === null ? null : round1(sc),
      rating: rating(sc),
      answered: scored.length,
      total: rows.length,
    };
  });

  // Overall: the areas with at least one answer, weighted by area weight.
  let aw = 0;
  let asum = 0;
  for (const area of SCORED_AREAS) {
    const scored = indicators.filter((r) => area.indicators.includes(r.indicator.id) && r.score !== null);
    const w = scored.reduce((s, r) => s + QUESTION_SHARE[r.indicator.id], 0);
    if (!w) continue;
    const sc = scored.reduce((s, r) => s + QUESTION_SHARE[r.indicator.id] * (to100(r.score) as number), 0) / w;
    aw += areaWeightRaw(area);
    asum += areaWeightRaw(area) * sc;
  }
  const overall = aw ? round1(asum / aw) : null;

  const cost = (r: IndicatorResult) => r.indicator.weight * moduleWeight[r.indicator.module] * (4 - (r.score as number));
  const gaps = indicators
    .filter((r) => r.score !== null && (r.score as number) <= 2)
    .sort((a, b) => cost(b) - cost(a));
  const blockers = indicators.filter((r) => r.indicator.blocker && r.score === 1);

  return {
    overall,
    rating: rating(overall),
    modules,
    indicators,
    gaps,
    blockers,
    unsure: indicators.filter((r) => r.unsure),
    answered: indicators.filter((r) => r.score !== null).length,
  };
}
