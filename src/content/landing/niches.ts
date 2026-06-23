import type { NicheLanding } from "./types";
import { BUSINESS_SERVICES_NICHES } from "./niches-business-services";
import { HEALTHCARE_NICHES } from "./niches-healthcare";
import { LIGHT_INDUSTRIALS_NICHES } from "./niches-light-industrials";
import { LOGISTICS_NICHES } from "./niches-logistics";
import { PROFESSIONAL_SERVICES_NICHES } from "./niches-professional-services";
import { TECH_ENABLED_NICHES } from "./niches-tech-enabled";

// Aggregator. The 33 niche entries are split across one file per pillar to
// keep each file editable in a single review pass. Imports + getters below
// keep the existing call sites in site-meta.ts and the page components
// unchanged.
export const NICHES: NicheLanding[] = [
  ...BUSINESS_SERVICES_NICHES,
  ...HEALTHCARE_NICHES,
  ...LIGHT_INDUSTRIALS_NICHES,
  ...LOGISTICS_NICHES,
  ...PROFESSIONAL_SERVICES_NICHES,
  ...TECH_ENABLED_NICHES,
];

export const NICHES_BY_PILLAR_SLUG = new Map<string, NicheLanding[]>();
for (const n of NICHES) {
  const existing = NICHES_BY_PILLAR_SLUG.get(n.pillarSlug) ?? [];
  existing.push(n);
  NICHES_BY_PILLAR_SLUG.set(n.pillarSlug, existing);
}

const NICHE_KEY_BY_PILLAR_AND_SLUG = new Map<string, NicheLanding>();
for (const n of NICHES) {
  NICHE_KEY_BY_PILLAR_AND_SLUG.set(`${n.pillarSlug}/${n.slug}`, n);
}

export function getNiche(
  pillarSlug: string,
  slug: string,
): NicheLanding | undefined {
  return NICHE_KEY_BY_PILLAR_AND_SLUG.get(`${pillarSlug}/${slug}`);
}

export function getNichesForPillar(pillarSlug: string): NicheLanding[] {
  return NICHES_BY_PILLAR_SLUG.get(pillarSlug) ?? [];
}
