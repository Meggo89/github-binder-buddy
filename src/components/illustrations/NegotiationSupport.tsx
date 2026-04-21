import { CapabilityBadge, Connector, IllustrationFrame, Label } from './primitives';
import { ILLUSTRATION_TOKENS } from './tokens';

const terms = [
  { label: 'HEADLINE PRICE', offerValue: 0.78, marketMin: 0.55, marketMax: 0.85, flag: false },
  { label: 'EARN-OUT', offerValue: 0.62, marketMin: 0.3, marketMax: 0.55, flag: true },
  { label: 'ESCROW', offerValue: 0.45, marketMin: 0.15, marketMax: 0.35, flag: true },
  { label: 'WARRANTIES', offerValue: 0.5, marketMin: 0.4, marketMax: 0.7, flag: false },
  { label: 'RESTRICTIVE COV.', offerValue: 0.72, marketMin: 0.5, marketMax: 0.75, flag: false },
  { label: 'MANAGEMENT ROLL', offerValue: 0.3, marketMin: 0.25, marketMax: 0.5, flag: false },
];

export function NegotiationSupportIllustration() {
  const barStartX = 220;
  const barEndX = 720;
  const barY0 = 80;
  const barGap = 56;

  return (
    <IllustrationFrame ariaLabel="Negotiation support: term sheet benchmarked against market norms, outliers flagged for human judgment">
      {/* X-axis market range header */}
      <Label x={barStartX} y={50} tone="muted" size={9}>
        FOUNDER-FRIENDLY
      </Label>
      <Label x={barEndX} y={50} tone="muted" size={9} anchor="end">
        BUYER-FRIENDLY
      </Label>

      {terms.map((t, i) => {
        const y = barY0 + i * barGap;
        const rangeStart = barStartX + (barEndX - barStartX) * t.marketMin;
        const rangeEnd = barStartX + (barEndX - barStartX) * t.marketMax;
        const offerX = barStartX + (barEndX - barStartX) * t.offerValue;
        return (
          <g key={t.label}>
            <Label x={40} y={y + 4} tone="default" size={10}>
              {t.label}
            </Label>

            {/* Base line */}
            <Connector x1={barStartX} y1={y} x2={barEndX} y2={y} tone="neutral" />

            {/* Market range band */}
            <rect
              x={rangeStart}
              y={y - 6}
              width={rangeEnd - rangeStart}
              height={12}
              rx={3}
              fill={ILLUSTRATION_TOKENS.colors.humanSoft}
              stroke={ILLUSTRATION_TOKENS.colors.human}
              strokeWidth={1}
            />

            {/* Offer marker */}
            <circle
              cx={offerX}
              cy={y}
              r={6}
              fill={t.flag ? ILLUSTRATION_TOKENS.colors.ai : ILLUSTRATION_TOKENS.colors.lineStrong}
              stroke={ILLUSTRATION_TOKENS.colors.ink}
              strokeWidth={2}
            />

            {/* Flag marker */}
            {t.flag && (
              <g>
                <circle cx={offerX} cy={y - 22} r={9} fill={ILLUSTRATION_TOKENS.colors.aiSoft} stroke={ILLUSTRATION_TOKENS.colors.ai} strokeWidth={1.5} />
                <text x={offerX} y={y - 18} textAnchor="middle" fill={ILLUSTRATION_TOKENS.colors.ai} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                  !
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <rect x={40} y={430} width={12} height={10} rx={2} fill={ILLUSTRATION_TOKENS.colors.humanSoft} stroke={ILLUSTRATION_TOKENS.colors.human} strokeWidth={1} />
      <Label x={60} y={439} tone="muted" size={9}>
        MARKET RANGE
      </Label>
      <circle cx={220} cy={435} r={5} fill={ILLUSTRATION_TOKENS.colors.ai} />
      <Label x={232} y={439} tone="muted" size={9}>
        OUTLIER · PUSH BACK
      </Label>
      <circle cx={400} cy={435} r={5} fill={ILLUSTRATION_TOKENS.colors.lineStrong} />
      <Label x={412} y={439} tone="muted" size={9}>
        IN-RANGE · ACCEPT
      </Label>

      {/* Badges */}
      <CapabilityBadge x={500} y={430} kind="ai" />
      <CapabilityBadge x={540} y={430} kind="human" />
    </IllustrationFrame>
  );
}
