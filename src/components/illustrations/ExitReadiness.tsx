import { CapabilityBadge, Connector, IllustrationFrame, Label, Node, ILLUSTRATION_TOKENS } from './primitives';

const centerX = 400;
const centerY = 250;

const dataPoints = [
  { label: 'FIN', x: 220, y: 130 },
  { label: 'OPS', x: 580, y: 130 },
  { label: 'LEGAL', x: 140, y: 260 },
  { label: 'CUSTOMER', x: 660, y: 260 },
  { label: 'TEAM', x: 220, y: 380 },
  { label: 'IP', x: 580, y: 380 },
];

export function ExitReadinessIllustration() {
  return (
    <IllustrationFrame ariaLabel="Exit readiness assessment: AI analyzes six pillars of the business and feeds into a human interpretation node">
      {/* Outer orbit guideline */}
      <circle
        cx={centerX}
        cy={centerY}
        r={160}
        stroke={ILLUSTRATION_TOKENS.colors.line}
        strokeWidth={1}
        strokeDasharray="2 6"
        fill="none"
      />

      {/* Radial connectors from dimensions to center */}
      {dataPoints.map((p, i) => (
        <Connector key={i} x1={p.x} y1={p.y} x2={centerX} y2={centerY} tone="neutral" dashed />
      ))}

      {/* Center readiness score */}
      <Node cx={centerX} cy={centerY} r={56} tone="ai" filled />
      <text
        x={centerX}
        y={centerY - 2}
        textAnchor="middle"
        fill={ILLUSTRATION_TOKENS.colors.ai}
        fontSize="28"
        fontFamily="'Playfair Display', serif"
        fontWeight="600"
      >
        72
      </text>
      <Label x={centerX} y={centerY + 18} anchor="middle" tone="muted" size={9}>
        READINESS
      </Label>

      {/* Dimension nodes */}
      {dataPoints.map((p) => (
        <Node key={p.label} cx={p.x} cy={p.y} r={30} label={p.label} tone="neutral" filled />
      ))}

      {/* Human interpretation lane */}
      <Connector x1={centerX} y1={306} x2={centerX} y2={420} tone="human" />
      <Node cx={centerX} cy={440} r={24} tone="human" filled />
      <Label x={centerX} y={444} anchor="middle" tone="human" size={9}>
        ADVISOR
      </Label>

      {/* Badges */}
      <CapabilityBadge x={60} y={40} kind="ai" />
      <Label x={102} y={53} tone="muted" size={10}>
        pattern recognition · 1000+ exits
      </Label>

      <CapabilityBadge x={60} y={70} kind="human" />
      <Label x={122} y={83} tone="muted" size={10}>
        strategic interpretation
      </Label>
    </IllustrationFrame>
  );
}
