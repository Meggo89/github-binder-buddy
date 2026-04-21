import { CapabilityBadge, Connector, IllustrationFrame, Label, Node, ILLUSTRATION_TOKENS } from './primitives';

export function ValuationIllustration() {
  // Three methodology streams converge on a final valuation node
  const streamY = [130, 250, 370];
  const streamStartX = 90;
  const midX = 380;
  const convergenceX = 620;
  const convergenceY = 250;

  return (
    <IllustrationFrame ariaLabel="Valuation: three parallel methodologies run against thousands of comparable deals converge on a defensible value">
      {/* Comparable-transaction dot field */}
      {Array.from({ length: 40 }).map((_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const alpha = 0.25 + ((i * 7) % 50) / 100;
        return (
          <circle
            key={i}
            cx={180 + col * 22 + (row % 2) * 10}
            cy={60 + row * 14}
            r={1.8}
            fill={`rgba(201, 162, 39, ${alpha})`}
          />
        );
      })}

      {/* Three methodology streams */}
      {streamY.map((y, idx) => {
        const labels = ['DCF', 'COMPS', 'PRECEDENT'];
        return (
          <g key={idx}>
            <Connector x1={streamStartX} y1={y} x2={midX - 30} y2={y} tone="ai" />
            <Node cx={streamStartX - 8} cy={y} r={18} label={labels[idx]} tone="ai" filled />
            <Connector x1={midX + 30} y1={y} x2={convergenceX - 30} y2={convergenceY} tone="ai" dashed />
          </g>
        );
      })}

      {/* Middle normalization band */}
      <rect
        x={midX - 30}
        y={110}
        width={60}
        height={280}
        rx={8}
        stroke={ILLUSTRATION_TOKENS.colors.ai}
        strokeWidth={1.5}
        fill={ILLUSTRATION_TOKENS.colors.aiSoft}
      />
      <Label x={midX} y={102} anchor="middle" tone="ai" size={9}>
        NORMALISE · ADJUST
      </Label>

      {/* Final value */}
      <Node cx={convergenceX} cy={convergenceY} r={54} tone="ai" filled />
      <text
        x={convergenceX}
        y={convergenceY - 4}
        textAnchor="middle"
        fill={ILLUSTRATION_TOKENS.colors.ai}
        fontSize="22"
        fontFamily="'Playfair Display', serif"
        fontWeight="600"
      >
        £XXm
      </text>
      <Label x={convergenceX} y={convergenceY + 14} anchor="middle" tone="muted" size={9}>
        DEFENSIBLE RANGE
      </Label>

      {/* Human adjustment node */}
      <Connector x1={convergenceX} y1={convergenceY + 54} x2={convergenceX} y2={convergenceY + 120} tone="human" />
      <Node cx={convergenceX} cy={convergenceY + 140} r={20} tone="human" filled />
      <Label x={convergenceX} y={convergenceY + 144} anchor="middle" tone="human" size={9}>
        ADDBACKS
      </Label>

      {/* Badges */}
      <CapabilityBadge x={60} y={440} kind="ai" />
      <Label x={102} y={453} tone="muted" size={10}>
        thousands of comparables, minutes
      </Label>
      <CapabilityBadge x={440} y={440} kind="human" />
      <Label x={502} y={453} tone="muted" size={10}>
        defensibility &amp; positioning
      </Label>
    </IllustrationFrame>
  );
}
