import { CapabilityBadge, Connector, IllustrationFrame, Label, Node } from './primitives';
import { ILLUSTRATION_TOKENS } from './tokens';

const stages = [
  { short: '01', label: 'READINESS' },
  { short: '02', label: 'VALUATION' },
  { short: '03', label: 'IM' },
  { short: '04', label: 'BUYERS' },
  { short: '05', label: 'DILIGENCE' },
  { short: '06', label: 'COMPLETION' },
];

export function ProcessOverviewIllustration() {
  const startX = 80;
  const endX = 780;
  const y = 250;
  const stepX = (endX - startX) / (stages.length - 1);

  return (
    <IllustrationFrame ariaLabel="The six-stage AI-enabled M&A process: each stage combines automated analysis with human judgment">
      {/* Main flow line */}
      <Connector x1={startX} y1={y} x2={endX} y2={y} tone="strong" />

      {/* AI lane below */}
      <Connector x1={startX} y1={y + 90} x2={endX} y2={y + 90} tone="ai" dashed />
      <Label x={startX - 8} y={y + 94} tone="ai" size={9} anchor="end">
        AI
      </Label>

      {/* Human lane above */}
      <Connector x1={startX} y1={y - 90} x2={endX} y2={y - 90} tone="human" dashed />
      <Label x={startX - 8} y={y - 86} tone="human" size={9} anchor="end">
        HUMAN
      </Label>

      {stages.map((s, i) => {
        const x = startX + stepX * i;
        return (
          <g key={s.short}>
            {/* Vertical tick into human lane */}
            <Connector x1={x} y1={y - 12} x2={x} y2={y - 90} tone="human" />
            {/* Vertical tick into AI lane */}
            <Connector x1={x} y1={y + 12} x2={x} y2={y + 90} tone="ai" />

            {/* Lane markers */}
            <circle cx={x} cy={y - 90} r={4} fill={ILLUSTRATION_TOKENS.colors.human} />
            <circle cx={x} cy={y + 90} r={4} fill={ILLUSTRATION_TOKENS.colors.ai} />

            {/* Central stage node */}
            <Node cx={x} cy={y} r={28} tone="strong" filled />
            <text
              x={x}
              y={y + 3}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              {s.short}
            </text>

            {/* Label below */}
            <Label x={x} y={y + 130} anchor="middle" tone="muted" size={9}>
              {s.label}
            </Label>
          </g>
        );
      })}

      {/* Legend badges */}
      <CapabilityBadge x={endX - 110} y={40} kind="ai" />
      <CapabilityBadge x={endX - 70} y={40} kind="human" />
    </IllustrationFrame>
  );
}
