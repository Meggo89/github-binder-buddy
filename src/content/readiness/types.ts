// Types for the public exit readiness model (see model.ts, generated from the Review config).

export type ModuleId = 'FD' | 'MD' | 'EQ' | 'GE' | 'DD';

export type ReadinessModule = {
  id: ModuleId;
  name: string;
  weight: number;
  purpose: string;
  // Measures in the full Assessment for this area (the free score asks fewer).
  totalMeasures: number;
};

export type ReadinessOption = { key: string; label: string; score: number };

export type ReadinessIndicator = {
  id: string;
  module: ModuleId;
  name: string;
  measures: string;
  type: 'numeric' | 'category' | 'checklist';
  unit: string;
  question: string;
  weight: number;
  blocker: boolean;
  bands: Record<'1' | '2' | '3' | '4', string>;
  buyerView: { trade: string; pe: string };
  actions: string[];
  direction?: 'lower_better' | 'higher_better';
  thresholds?: number[];
  options?: ReadinessOption[];
  checklist?: string[];
  noneOption?: { label: string; value: number };
  // Largest valid answer (shares of revenue). Negative answers are always rejected.
  max?: number;
};

export type ReadinessModel = {
  version: string;
  scale: Record<string, string>;
  // Measures in the full Assessment (the free score asks `indicators.length` of them).
  totalMeasures: number;
  modules: ReadinessModule[];
  // The measures the free score asks, with thresholds. Exported from the Review config.
  indicators: ReadinessIndicator[];
  // The Assessment's other measures, by name only. No thresholds are published for these.
  otherMeasures: { module: ModuleId; name: string }[];
};
