import { CapabilityBadge, Connector, IllustrationFrame, Label } from './primitives';
import { ILLUSTRATION_TOKENS } from './tokens';

export function IMProductionIllustration() {
  const sheetLines = (offsetX: number, offsetY: number, tone: string, count = 10) =>
    Array.from({ length: count }).map((_, i) => (
      <line
        key={i}
        x1={offsetX + 16}
        y1={offsetY + 30 + i * 14}
        x2={offsetX + 16 + (i % 3 === 0 ? 180 : 200)}
        y2={offsetY + 30 + i * 14}
        stroke={tone}
        strokeWidth={1}
        opacity={0.6}
      />
    ));

  return (
    <IllustrationFrame ariaLabel="Information memorandum production: AI drafts from structured data, humans shape the investment narrative">
      {/* Draft stack (AI) */}
      <g transform="translate(40, 60)">
        {[0, 14, 28].map((offset, i) => (
          <rect
            key={i}
            x={offset}
            y={offset}
            width={240}
            height={320}
            rx={6}
            stroke={ILLUSTRATION_TOKENS.colors.ai}
            strokeWidth={1.5}
            fill="rgba(201, 162, 39, 0.06)"
          />
        ))}
        {sheetLines(28, 28, ILLUSTRATION_TOKENS.colors.ai, 16)}
        <Label x={156} y={22} anchor="middle" tone="ai" size={9}>
          AI FIRST DRAFT
        </Label>
      </g>

      {/* Connector */}
      <path
        d="M 340 230 C 400 230, 420 230, 460 230"
        stroke={ILLUSTRATION_TOKENS.colors.lineStrong}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        fill="none"
      />
      <polygon
        points="460,226 470,230 460,234"
        fill={ILLUSTRATION_TOKENS.colors.lineStrong}
      />

      {/* Review / edit layer (human) */}
      <g transform="translate(480, 70)">
        <rect
          x={0}
          y={0}
          width={240}
          height={320}
          rx={6}
          stroke={ILLUSTRATION_TOKENS.colors.human}
          strokeWidth={1.5}
          fill="rgba(212, 197, 178, 0.08)"
        />
        <Label x={120} y={22} anchor="middle" tone="human" size={9}>
          HUMAN NARRATIVE
        </Label>
        {sheetLines(0, 0, ILLUSTRATION_TOKENS.colors.human, 16)}

        {/* Edit marks */}
        <circle cx={32} cy={86} r={3} fill={ILLUSTRATION_TOKENS.colors.ai} />
        <circle cx={200} cy={128} r={3} fill={ILLUSTRATION_TOKENS.colors.ai} />
        <line x1={20} y1={170} x2={80} y2={170} stroke={ILLUSTRATION_TOKENS.colors.ai} strokeWidth={2} />
        <circle cx={60} cy={242} r={3} fill={ILLUSTRATION_TOKENS.colors.ai} />
      </g>

      {/* Timeline labels */}
      <Connector x1={40} y1={430} x2={760} y2={430} tone="neutral" />
      <Label x={130} y={455} anchor="middle" tone="muted" size={9}>
        WEEK 1
      </Label>
      <Label x={400} y={455} anchor="middle" tone="muted" size={9}>
        WEEK 2
      </Label>
      <Label x={640} y={455} anchor="middle" tone="ai" size={9}>
        WEEK 2-3 · SHIP
      </Label>

      {/* Badges */}
      <CapabilityBadge x={40} y={20} kind="ai" />
      <CapabilityBadge x={480} y={20} kind="human" />
    </IllustrationFrame>
  );
}
