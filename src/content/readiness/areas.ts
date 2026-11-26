// The five Scalexit areas used to report the Exit Readiness Score.
//
// The scoring model (model.ts, generated from the Review config) is unchanged: the same questions,
// thresholds, bands, measure weights and overall score. Each area here is made of one or two of the
// model's modules, so an area's weight is the sum of its modules' weights and the overall score is
// exactly the weighted average of the areas whenever every area is scored.
//
// Market attractiveness has no question in the free score and no measure in the Assessment yet,
// so it is listed but not scored. See the pull request for Leo's decision.

import { MODEL } from './model';
import type { ModuleId, ReadinessIndicator } from './types';
import { rating, round1, type ReadinessResult } from './score';

export type AreaId = 'financial' | 'operational' | 'strategic' | 'market' | 'diligence';

export type ReadinessArea = {
  id: AreaId;
  name: string;
  modules: ModuleId[];
};

export const AREAS: ReadinessArea[] = [
  { id: 'financial', name: 'Financial health', modules: ['EQ'] },
  { id: 'operational', name: 'Operational maturity', modules: ['FD', 'MD'] },
  { id: 'strategic', name: 'Strategic position and growth', modules: ['GE'] },
  { id: 'market', name: 'Market attractiveness', modules: [] },
  { id: 'diligence', name: 'Diligence readiness', modules: ['DD'] },
];

const moduleOf = (id: ModuleId) => MODEL.modules.find((m) => m.id === id);

export const areaWeight = (a: ReadinessArea) => a.modules.reduce((s, id) => s + (moduleOf(id)?.weight ?? 0), 0);
export const areaPurpose = (a: ReadinessArea) => a.modules.map((id) => moduleOf(id)?.purpose ?? '').filter(Boolean);
export const areaTotalMeasures = (a: ReadinessArea) => a.modules.reduce((s, id) => s + (moduleOf(id)?.totalMeasures ?? 0), 0);
export const areaIndicators = (a: ReadinessArea): ReadinessIndicator[] =>
  MODEL.indicators.filter((i) => a.modules.includes(i.module));
export const areaOtherMeasures = (a: ReadinessArea) => MODEL.otherMeasures.filter((o) => a.modules.includes(o.module));

// Areas the score covers (Market attractiveness is left out until it has questions).
export const SCORED_AREAS = AREAS.filter((a) => a.modules.length > 0);

export type AreaResult = {
  id: AreaId;
  name: string;
  weight: number;
  score: number | null;
  rating: string;
  answered: number;
  total: number;
  totalMeasures: number;
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
      totalMeasures: areaTotalMeasures(a),
    };
  });
}
