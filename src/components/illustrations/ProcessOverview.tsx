import { CapabilityBadge, Connector, IllustrationFrame, Label } from './primitives';
import { ILLUSTRATION_TOKENS } from './tokens';

type StageDetail = {
  short: string;
  label: string;
  human: [string, string];
  ai: [string, string];
};

const stages: StageDetail[] = [
  {
    short: '01',
    label: 'READINESS',
    human: ['Team strength', 'Founder motivation'],
    ai: ['Sector benchmarks', 'Financial gaps'],
  },
  {
    short: '02',
    label: 'VALUATION',
    human: ['Defensible frame', 'Buyer-specific value'],
    ai: ['1000s of comparables', 'Addback detection'],
  },
  {
    short: '03',
    label: 'IM',
    human: ['Narrative', 'Founder voice'],
    ai: ['First draft', 'Market sizing'],
  },
  {
    short: '04',
    label: 'BUYERS',
    human: ['Warm intros', 'Priority relationships'],
    ai: ['Systematic mapping', 'Outreach at scale'],
  },
  {
    short: '05',
    label: 'DILIGENCE',
    human: ['Competitive tension', 'Advance / hold calls'],
    ai: ['Data-room', 'Q&A tracking'],
  },
  {
    short: '06',
    label: 'COMPLETION',
    human: ['Negotiation lead', 'Pushback judgment'],
    ai: ['Term benchmarks', 'Scenario models'],
  },
];

export function ProcessOverviewIllustration() {
  const viewW = 880;
  const viewH = 560;
  const startX = 80;
  const endX = viewW - 80;
  const timelineY = 280;
  const stepX = (endX - startX) / (stages.length - 1);
  const pillWidth = 118;
  const pillHeight = 22;
  const pillGap = 6;

  return (
    <IllustrationFrame
      ariaLabel="The six-stage AI-enabled M&A process, with specific human and AI tasks called out at each stage"
      viewBox={`0 0 ${viewW} ${viewH}`}
    >
      {/* Soft backdrop highlights for depth */}
      <defs>
        <linearGradient id="humanBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(212, 197, 178, 0)" />
          <stop offset="50%" stopColor="rgba(212, 197, 178, 0.08)" />
          <stop offset="100%" stopColor="rgba(212, 197, 178, 0)" />
        </linearGradient>
        <linearGradient id="aiBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(201, 162, 39, 0)" />
          <stop offset="50%" stopColor="rgba(201, 162, 39, 0.10)" />
          <stop offset="100%" stopColor="rgba(201, 162, 39, 0)" />
        </linearGradient>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
          <stop offset="25%" stopColor="rgba(201, 162, 39, 0.8)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="75%" stopColor="rgba(212, 197, 178, 0.8)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
        </linearGradient>
      </defs>

      {/* Lane bands */}
      <rect x={0} y={60} width={viewW} height={140} fill="url(#humanBand)" />
      <rect x={0} y={360} width={viewW} height={140} fill="url(#aiBand)" />

      {/* Lane section headers */}
      <g>
        <rect x={24} y={82} width={56} height={20} rx={10} fill={ILLUSTRATION_TOKENS.colors.humanSoft} stroke={ILLUSTRATION_TOKENS.colors.human} strokeWidth={1} />
        <text x={52} y={96} textAnchor="middle" fill={ILLUSTRATION_TOKENS.colors.human} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="0.15em">HUMAN</text>
      </g>
      <g>
        <rect x={24} y={462} width={56} height={20} rx={10} fill={ILLUSTRATION_TOKENS.colors.aiSoft} stroke={ILLUSTRATION_TOKENS.colors.ai} strokeWidth={1} />
        <text x={52} y={476} textAnchor="middle" fill={ILLUSTRATION_TOKENS.colors.ai} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="0.15em">AI</text>
      </g>

      {/* Main flow line with gradient for colour */}
      <line x1={startX} y1={timelineY} x2={endX} y2={timelineY} stroke="url(#flowLine)" strokeWidth={2} />

      {/* Subtle tick rule above and below each segment */}
      {stages.slice(0, -1).map((_, i) => {
        const midX = startX + stepX * i + stepX / 2;
        return (
          <g key={`tick-${i}`}>
            <line x1={midX} y1={timelineY - 4} x2={midX} y2={timelineY + 4} stroke={ILLUSTRATION_TOKENS.colors.line} strokeWidth={1} />
          </g>
        );
      })}

      {stages.map((stage, i) => {
        const x = startX + stepX * i;
        const pillX = x - pillWidth / 2;

        // Human pills stack above
        const humanPill2Y = timelineY - 80;
        const humanPill1Y = humanPill2Y - (pillHeight + pillGap);

        // AI pills stack below
        const aiPill1Y = timelineY + 80 - pillHeight;
        const aiPill2Y = aiPill1Y + pillHeight + pillGap;

        return (
          <g key={stage.short}>
            {/* Connector lines from center to lanes */}
            <Connector x1={x} y1={timelineY - 22} x2={x} y2={humanPill2Y + pillHeight} tone="human" />
            <Connector x1={x} y1={timelineY + 22} x2={x} y2={aiPill1Y} tone="ai" />

            {/* Stage central node — dual-ring for richer colour */}
            <circle cx={x} cy={timelineY} r={26} fill="rgba(255, 255, 255, 0.04)" stroke={ILLUSTRATION_TOKENS.colors.lineStrong} strokeWidth={1.5} />
            <circle cx={x} cy={timelineY} r={20} fill={i === 0 || i === stages.length - 1 ? 'rgba(201, 162, 39, 0.18)' : 'rgba(255, 255, 255, 0.03)'} stroke={ILLUSTRATION_TOKENS.colors.ai} strokeWidth={1} />
            <text x={x} y={timelineY + 3} textAnchor="middle" fill="white" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" letterSpacing="0.05em">
              {stage.short}
            </text>

            {/* Stage name above node (between node and pills) */}
            <text x={x} y={timelineY - 44} textAnchor="middle" fill={ILLUSTRATION_TOKENS.colors.text} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="0.12em">
              {stage.label}
            </text>

            {/* Human pills above */}
            {[
              { y: humanPill1Y, text: stage.human[0] },
              { y: humanPill2Y, text: stage.human[1] },
            ].map((pill, idx) => (
              <g key={`h-${idx}`}>
                <rect
                  x={pillX}
                  y={pill.y}
                  width={pillWidth}
                  height={pillHeight}
                  rx={4}
                  fill={ILLUSTRATION_TOKENS.colors.humanSoft}
                  stroke={ILLUSTRATION_TOKENS.colors.human}
                  strokeWidth={1}
                />
                <circle cx={pillX + 9} cy={pill.y + pillHeight / 2} r={2} fill={ILLUSTRATION_TOKENS.colors.human} />
                <text
                  x={pillX + 18}
                  y={pill.y + pillHeight / 2 + 3}
                  fill={ILLUSTRATION_TOKENS.colors.text}
                  fontSize="9"
                  fontFamily="'Inter', sans-serif"
                >
                  {pill.text}
                </text>
              </g>
            ))}

            {/* AI pills below */}
            {[
              { y: aiPill1Y, text: stage.ai[0] },
              { y: aiPill2Y, text: stage.ai[1] },
            ].map((pill, idx) => (
              <g key={`a-${idx}`}>
                <rect
                  x={pillX}
                  y={pill.y}
                  width={pillWidth}
                  height={pillHeight}
                  rx={4}
                  fill={ILLUSTRATION_TOKENS.colors.aiSoft}
                  stroke={ILLUSTRATION_TOKENS.colors.ai}
                  strokeWidth={1}
                />
                <circle cx={pillX + 9} cy={pill.y + pillHeight / 2} r={2} fill={ILLUSTRATION_TOKENS.colors.ai} />
                <text
                  x={pillX + 18}
                  y={pill.y + pillHeight / 2 + 3}
                  fill={ILLUSTRATION_TOKENS.colors.text}
                  fontSize="9"
                  fontFamily="'Inter', sans-serif"
                >
                  {pill.text}
                </text>
              </g>
            ))}
          </g>
        );
      })}

      {/* Footer legend */}
      <g transform={`translate(${viewW / 2 - 130}, 520)`}>
        <CapabilityBadge x={0} y={0} kind="human" />
        <Label x={64} y={13} tone="muted" size={9}>
          judgment &amp; relationships
        </Label>
        <CapabilityBadge x={170} y={0} kind="ai" />
        <Label x={214} y={13} tone="muted" size={9}>
          structured work at speed
        </Label>
      </g>
    </IllustrationFrame>
  );
}
