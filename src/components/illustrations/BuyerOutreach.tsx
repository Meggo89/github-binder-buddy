import { CapabilityBadge, Connector, IllustrationFrame, Label, Node } from './primitives';
import { ILLUSTRATION_TOKENS } from './tokens';

export function BuyerOutreachIllustration() {
  const hubX = 200;
  const hubY = 250;

  // Radial buyer nodes - mix of strategic (inner ring) and financial (outer ring)
  const buyers = [
    // inner ring - strategic / priority
    { x: 380, y: 130, r: 14, priority: true },
    { x: 420, y: 200, r: 14, priority: true },
    { x: 440, y: 280, r: 14, priority: true },
    { x: 400, y: 360, r: 14, priority: true },
    { x: 360, y: 420, r: 14, priority: true },
    // outer ring - broader financial / PE / strategic
    { x: 560, y: 80, r: 10, priority: false },
    { x: 620, y: 150, r: 10, priority: false },
    { x: 660, y: 220, r: 10, priority: false },
    { x: 690, y: 280, r: 10, priority: false },
    { x: 660, y: 340, r: 10, priority: false },
    { x: 600, y: 400, r: 10, priority: false },
    { x: 520, y: 440, r: 10, priority: false },
    { x: 540, y: 110, r: 10, priority: false },
    { x: 580, y: 280, r: 10, priority: false },
    { x: 470, y: 90, r: 10, priority: false },
    { x: 490, y: 440, r: 10, priority: false },
  ];

  return (
    <IllustrationFrame ariaLabel="Buyer identification and outreach: central hub connects to priority buyers through warm introductions and a broader systematic pool">
      {/* Hub */}
      <Node cx={hubX} cy={hubY} r={48} tone="ai" filled />
      <Label x={hubX} y={hubY - 4} anchor="middle" tone="ai" size={10}>
        SYSTEMATIC
      </Label>
      <Label x={hubX} y={hubY + 10} anchor="middle" tone="ai" size={10}>
        OUTREACH
      </Label>

      {/* Connectors to inner ring (priority - human-led, solid) */}
      {buyers
        .filter((b) => b.priority)
        .map((b, i) => (
          <Connector key={`p${i}`} x1={hubX + 48} y1={hubY} x2={b.x - b.r} y2={b.y} tone="human" />
        ))}

      {/* Connectors to outer ring (systematic - AI-led, dashed) */}
      {buyers
        .filter((b) => !b.priority)
        .map((b, i) => (
          <Connector
            key={`s${i}`}
            x1={hubX + 40}
            y1={hubY}
            x2={b.x - b.r}
            y2={b.y}
            tone="ai"
            dashed
          />
        ))}

      {/* Buyer nodes */}
      {buyers.map((b, i) => (
        <circle
          key={`b${i}`}
          cx={b.x}
          cy={b.y}
          r={b.r}
          stroke={b.priority ? ILLUSTRATION_TOKENS.colors.human : ILLUSTRATION_TOKENS.colors.ai}
          strokeWidth={1.5}
          fill={b.priority ? ILLUSTRATION_TOKENS.colors.humanSoft : ILLUSTRATION_TOKENS.colors.surface}
        />
      ))}

      {/* Segmentation labels */}
      <Label x={400} y={40} tone="human" size={9}>
        ◆ PRIORITY · WARM INTRO
      </Label>
      <Label x={540} y={470} tone="ai" size={9}>
        ◇ SYSTEMATIC POOL · 3-5X SCALE
      </Label>

      {/* Badges */}
      <CapabilityBadge x={40} y={40} kind="ai" />
      <Label x={82} y={53} tone="muted" size={10}>
        identification &amp; personalisation
      </Label>
      <CapabilityBadge x={40} y={70} kind="human" />
      <Label x={102} y={83} tone="muted" size={10}>
        relationships &amp; judgment
      </Label>
    </IllustrationFrame>
  );
}
