// The areas the free Exit Readiness Score reports under.
//
// The free score is separate from the full Exit Readiness Assessment, which runs on Scalexit and
// scores five areas. The free score covers four of them: financial health, operational maturity,
// market attractiveness and diligence readiness. It has no strategic position and growth score.
//
// The scoring model (model.ts, generated from the Review config) is unchanged: the same questions,
// thresholds, bands, measure weights and overall score. Each area here is made of one or two of the
// model's modules, so an area's weight is the sum of its modules' weights and the overall score is
// exactly the weighted average of the areas whenever every area is scored.

import { MODEL } from './model';
import type { ModuleId, ReadinessIndicator } from './types';
import { rating, round1, type ReadinessResult } from './score';

export type AreaId = 'financial' | 'operational' | 'market' | 'diligence';

export type ReadinessArea = {
  id: AreaId;
  name: string;
  modules: ModuleId[];
  // Replaces the modules' own purpose text where the module was written for a different heading.
  purpose?: string;
};

export const SCORED_AREAS: ReadinessArea[] = [
  { id: 'financial', name: 'Financial health', modules: ['EQ'] },
  { id: 'operational', name: 'Operational maturity', modules: ['FD', 'MD'] },
  {
    id: 'market',
    name: 'Market attractiveness',
    modules: ['GE'],
    purpose:
      'Whether customers stay and accept price rises. Buyers read retention and pricing as evidence of demand for what you sell, and pay more where both hold up.',
  },
  { id: 'diligence', name: 'Diligence readiness', modules: ['DD'] },
];

const moduleOf = (id: ModuleId) => MODEL.modules.find((m) => m.id === id);

export const areaWeight = (a: ReadinessArea) => a.modules.reduce((s, id) => s + (moduleOf(id)?.weight ?? 0), 0);
export const areaPurpose = (a: ReadinessArea) =>
  a.purpose ? [a.purpose] : a.modules.map((id) => moduleOf(id)?.purpose ?? '').filter(Boolean);
export const areaIndicators = (a: ReadinessArea): ReadinessIndicator[] =>
  MODEL.indicators.filter((i) => a.modules.includes(i.module));

export type AreaResult = {
  id: AreaId;
  name: string;
  weight: number;
  score: number | null;
  rating: string;
  answered: number;
  total: number;
};

// Area score: the module scores in the area, weighted by module weight (the same rule the overall
// score uses across modules).
export function areaResults(result: ReadinessResult): AreaResult[] {
  return SCORED_AREAS.map((a) => {
    const mods = result.modules.filter((m) => a.modules.includes(m.id));
    const scored = mods.filter((m) => m.score !== null);
    const w = scored.reduce((s, m) => s + m.weight, 0);
    const sc = w ? scored.reduce((s, m) => s + (m.score as number) * m.weight, 0) / w : null;
    return {
      id: a.id,
      name: a.name,
      weight: areaWeight(a),
      score: sc === null ? null : round1(sc),
      rating: rating(sc),
      answered: mods.reduce((s, m) => s + m.answered, 0),
      total: mods.reduce((s, m) => s + m.total, 0),
    };
  });
}
