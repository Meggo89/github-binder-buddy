// Helpers for the areas the free Exit Readiness Score reports under. The areas, the questions and
// their weights are defined in free-score.ts.

import { MODEL } from './model';
import type { ReadinessIndicator } from './types';
import { rating, round1, to100, type ReadinessResult } from './score';
import { QUESTION_SHARE, SCORED_AREAS, areaWeightRaw, freeIndicator, type AreaId, type ReadinessArea } from './free-score';

export { SCORED_AREAS, type AreaId, type ReadinessArea };

export const areaIndicators = (a: ReadinessArea): ReadinessIndicator[] => a.indicators.map(freeIndicator);
export const areaWeight = (a: ReadinessArea) => round1(areaWeightRaw(a));
export const areaPurpose = (a: ReadinessArea): string[] => {
  if (a.purpose) return [a.purpose];
  return (a.purposeFrom ?? []).map((id) => MODEL.modules.find((m) => m.id === id)?.purpose ?? '').filter(Boolean);
};

export type AreaResult = {
  id: AreaId;
  name: string;
  weight: number;
  score: number | null;
  rating: string;
  answered: number;
  total: number;
};

// Area score: the answered questions in the area, each weighted by its share of the overall score.
export function areaResults(result: ReadinessResult): AreaResult[] {
  return SCORED_AREAS.map((a) => {
    const rows = result.indicators.filter((r) => a.indicators.includes(r.indicator.id));
    const scored = rows.filter((r) => r.score !== null);
    const w = scored.reduce((s, r) => s + QUESTION_SHARE[r.indicator.id], 0);
    const sc = w ? scored.reduce((s, r) => s + (to100(r.score) as number) * QUESTION_SHARE[r.indicator.id], 0) / w : null;
    return {
      id: a.id,
      name: a.name,
      weight: areaWeight(a),
      score: sc === null ? null : round1(sc),
      rating: rating(sc),
      answered: scored.length,
      total: rows.length,
    };
  });
}
