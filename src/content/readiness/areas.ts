// The areas the free Exit Readiness Score reports under.
//
// The free score is separate from the full Exit Readiness Assessment, which runs on Scalexit and
// scores five areas. The free score covers four of them: financial health, operational maturity,
// market attractiveness and diligence readiness. It has no strategic position and growth score.
//
// The scoring model (model.ts, generated from the Review config) is unchanged: the same questions,
// thresholds, bands, measure weights and overall score. Areas are built from questions. Each
// question carries its share of its module's weight (module weight x question weight / total
// question weight in the module), and an area's weight is the sum of those shares. When every
// question is answered, the overall score equals the weighted average of the areas.
//
// Leo's mapping: customer revenue retention (GE1) counts under financial health and pricing power
// (GE3) under market attractiveness, so the growth module's 15% is split between the two.

import { MODEL } from './model';
import type { ReadinessIndicator } from './types';
import { rating, round1, to100, type ReadinessResult } from './score';

export type AreaId = 'financial' | 'operational' | 'market' | 'diligence';

export type ReadinessArea = {
  id: AreaId;
  name: string;
  indicators: string[];
  // Area description shown on the form and the scoring page. Defaults to the modules' own text.
  purpose?: string;
};

export const SCORED_AREAS: ReadinessArea[] = [
  { id: 'financial', name: 'Financial health', indicators: ['EQ1', 'EQ2', 'EQ5', 'GE1'] },
  { id: 'operational', name: 'Operational maturity', indicators: ['FD1', 'FD3', 'MD1', 'MD3'] },
  {
    id: 'market',
    name: 'Market attractiveness',
    indicators: ['GE3'],
    purpose:
      'How attractive your market is to buyers: how fast it is growing, how active acquirers are in your sector and how your position in it compares.',
  },
  { id: 'diligence', name: 'Diligence readiness', indicators: ['DD1', 'DD2'] },
];

const byId = (id: string) => {
  const ind = MODEL.indicators.find((i) => i.id === id);
  if (!ind) throw new Error(`Unknown readiness question ${id}`);
  return ind;
};

// A question's share of the overall score, in percentage points.
export function indicatorShare(ind: ReadinessIndicator): number {
  const mod = MODEL.modules.find((m) => m.id === ind.module);
  const total = MODEL.indicators.filter((i) => i.module === ind.module).reduce((s, i) => s + i.weight, 0);
  return mod && total ? (mod.weight * ind.weight) / total : 0;
}

export const areaIndicators = (a: ReadinessArea): ReadinessIndicator[] => a.indicators.map(byId);
export const areaWeight = (a: ReadinessArea) => round1(areaIndicators(a).reduce((s, i) => s + indicatorShare(i), 0));
export const areaPurpose = (a: ReadinessArea) => {
  if (a.purpose) return [a.purpose];
  const mods = [...new Set(areaIndicators(a).map((i) => i.module))];
  return mods.map((id) => MODEL.modules.find((m) => m.id === id)?.purpose ?? '').filter(Boolean);
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
    const w = scored.reduce((s, r) => s + indicatorShare(r.indicator), 0);
    const sc = w ? scored.reduce((s, r) => s + (to100(r.score) as number) * indicatorShare(r.indicator), 0) / w : null;
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
