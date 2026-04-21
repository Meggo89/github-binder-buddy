import { CapabilityBadge, Connector, DataGrid, IllustrationFrame, Label, Node, ILLUSTRATION_TOKENS } from './primitives';

export function DiligenceCoordinationIllustration() {
  // Data room matrix: some cells marked "resolved" (ai-owned) vs others pending
  const resolvedCells = [
    0, 1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 20, 21, 23, 25, 27, 28, 30, 32, 34, 37, 40, 41, 42,
  ];

  return (
    <IllustrationFrame ariaLabel="Diligence coordination: a structured data room with automated status tracking, human judgment layered on process orchestration">
      <Label x={80} y={40} tone="ai" size={9}>
        DATA ROOM · AUTO-ORGANISED
      </Label>

      {/* Grid - 9 cols x 6 rows */}
      <DataGrid x={80} y={60} cols={9} rows={6} cellSize={28} gap={6} filledCells={resolvedCells} />

      {/* Progress bar along bottom of grid */}
      <rect
        x={80}
        y={280}
        width={300}
        height={6}
        rx={3}
        fill={ILLUSTRATION_TOKENS.colors.surface}
        stroke={ILLUSTRATION_TOKENS.colors.line}
        strokeWidth={1}
      />
      <rect x={80} y={280} width={210} height={6} rx={3} fill={ILLUSTRATION_TOKENS.colors.ai} />
      <Label x={80} y={305} tone="muted" size={9}>
        70% RESPONSES AUTO-ROUTED
      </Label>

      {/* Right-side orchestration panel */}
      <g transform="translate(480, 60)">
        <rect
          x={0}
          y={0}
          width={280}
          height={260}
          rx={8}
          stroke={ILLUSTRATION_TOKENS.colors.lineStrong}
          strokeWidth={1.5}
          fill={ILLUSTRATION_TOKENS.colors.surface}
        />
        <Label x={140} y={22} anchor="middle" tone="default" size={10}>
          COMPETITIVE TENSION
        </Label>

        {/* Three buyer lanes */}
        {[60, 120, 180].map((y, i) => {
          const names = ['BUYER A', 'BUYER B', 'BUYER C'];
          const progress = [0.85, 0.6, 0.35];
          return (
            <g key={i}>
              <Label x={18} y={y - 6} tone="muted" size={9}>
                {names[i]}
              </Label>
              <rect x={18} y={y} width={244} height={4} rx={2} fill={ILLUSTRATION_TOKENS.colors.surface} />
              <rect
                x={18}
                y={y}
                width={244 * progress[i]}
                height={4}
                rx={2}
                fill={ILLUSTRATION_TOKENS.colors.human}
              />
            </g>
          );
        })}

        <Node cx={240} cy={220} r={16} tone="human" filled />
        <Label x={30} y={230} tone="human" size={9}>
          ADVANCE / HOLD · ADVISOR CALL
        </Label>
      </g>

      <Connector x1={380} y1={170} x2={480} y2={170} tone="neutral" dashed />

      {/* Badges */}
      <CapabilityBadge x={40} y={350} kind="ai" />
      <Label x={82} y={363} tone="muted" size={10}>
        tracking · routing · reporting
      </Label>
      <CapabilityBadge x={420} y={350} kind="human" />
      <Label x={482} y={363} tone="muted" size={10}>
        tension &amp; buyer advancement
      </Label>
    </IllustrationFrame>
  );
}
