import { ScoreBlock } from './ScoreBlock';

// Lower-friction secondary CTA rendered above the primary "Arrange a confidential conversation"
// CTA on every landing page. Visitors who arrive top-of-funnel (from an AI assistant answer, a
// query-only impression or a broad search) need an off-ramp that is not a meeting request: the free
// Exit Readiness Score, plus the Exit Readiness Checklist download.
export function LeadMagnetCta() {
  return <ScoreBlock showChecklist />;
}
