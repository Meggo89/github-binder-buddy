// The free Exit Readiness Score: its questions, the areas it reports under and each question's
// share of the overall score.
//
// The free score is separate from the full Exit Readiness Assessment, which runs on Scalexit and
// scores five areas. The free score covers four of them: financial health, operational maturity,
// market attractiveness and diligence readiness. It has no strategic position and growth score.
//
// model.ts is generated from the Review config and is not edited here. This file adds one
// website-only question (market growth and buyer activity) in the same format, and fixes the area
// weights. Each Review question keeps the share of the overall score it has in the Review model
// (module weight x question weight / total question weight in the module). The market
// attractiveness weight is split equally between pricing power and the new question.

import { MODEL } from './model';
import type { ModuleId, ReadinessIndicator } from './types';

// Website-only question, Leo's wording. Same format and question weight as the Review questions.
export const MARKET_GROWTH: ReadinessIndicator = {
  id: 'MA1',
  module: 'GE',
  name: 'Market growth and buyer activity',
  measures: "How fast the company's market is growing and how active buyers are in the sector.",
  type: 'category',
  unit: '',
  question: 'How fast is your market growing, and are buyers active in it?',
  weight: 1.0,
  blocker: false,
  bands: {
    '4': 'Growing faster than the wider economy, with recent acquisitions in our sector',
    '3': 'Growing steadily, with some buyer interest in our sector',
    '2': 'Flat, or little sign of buyers in our sector',
    '1': 'Shrinking, or buyers are leaving our sector',
  },
  buyerView: {
    trade: 'Fewer bidders. Price leans on cost savings rather than growth.',
    pe: 'Lower entry multiple. The growth case has to come from taking market share.',
  },
  actions: ['Market and buyer mapping'],
  options: [
    { key: 'growing_active', label: 'Growing faster than the wider economy, with recent acquisitions in our sector', score: 4 },
    { key: 'steady', label: 'Growing steadily, with some buyer interest in our sector', score: 3 },
    { key: 'flat', label: 'Flat, or little sign of buyers in our sector', score: 2 },
    { key: 'shrinking', label: 'Shrinking, or buyers are leaving our sector', score: 1 },
  ],
};

// Every question the free score asks, in model order with the website-only question last.
export const FREE_INDICATORS: ReadinessIndicator[] = [...MODEL.indicators, MARKET_GROWTH];

export type AreaId = 'financial' | 'operational' | 'market' | 'diligence';

export type ReadinessArea = {
  id: AreaId;
  name: string;
  // Question ids, in the order they are asked.
  indicators: string[];
  // Description shown on the form and the scoring page: Leo's wording, or the named modules' own text.
  purpose?: string;
  purposeFrom?: ModuleId[];
};

// Leo's mapping: customer revenue retention (GE1) under financial health; pricing power (GE3) and
// market growth (MA1) under market attractiveness.
export const SCORED_AREAS: ReadinessArea[] = [
  { id: 'financial', name: 'Financial health', indicators: ['EQ1', 'EQ2', 'EQ5', 'GE1'], purposeFrom: ['EQ'] },
  { id: 'operational', name: 'Operational maturity', indicators: ['FD1', 'FD3', 'MD1', 'MD3'], purposeFrom: ['FD', 'MD'] },
  {
    id: 'market',
    name: 'Market attractiveness',
    indicators: ['GE3', 'MA1'],
    purpose:
      'How attractive your market is to buyers: how fast it is growing, how active acquirers are in your sector and how your position in it compares.',
  },
  { id: 'diligence', name: 'Diligence readiness', indicators: ['DD1', 'DD2'], purposeFrom: ['DD'] },
];

export function freeIndicator(id: string): ReadinessIndicator {
  const ind = FREE_INDICATORS.find((i) => i.id === id);
  if (!ind) throw new Error(`Unknown readiness question ${id}`);
  return ind;
}

// A Review question's share of the overall score in the Review model, in percentage points.
function reviewShare(ind: ReadinessIndicator): number {
  const mod = MODEL.modules.find((m) => m.id === ind.module);
  const total = MODEL.indicators.filter((i) => i.module === ind.module).reduce((s, i) => s + i.weight, 0);
  return mod && total ? (mod.weight * ind.weight) / total : 0;
}

// Each free-score question's share of the overall score, in percentage points. Adds up to 100.
export const QUESTION_SHARE: Record<string, number> = (() => {
  const share: Record<string, number> = {};
  for (const ind of MODEL.indicators) share[ind.id] = reviewShare(ind);
  const market = share.GE3; // market attractiveness weight before the new question
  share.GE3 = market / 2;
  share.MA1 = market / 2;
  return share;
})();

export const areaWeightRaw = (a: ReadinessArea) => a.indicators.reduce((s, id) => s + (QUESTION_SHARE[id] ?? 0), 0);
