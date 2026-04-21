import { ReactNode, SVGProps } from 'react';
import { ILLUSTRATION_TOKENS } from './tokens';

interface FrameProps {
  children: ReactNode;
  viewBox?: string;
  ariaLabel: string;
  className?: string;
}

export function IllustrationFrame({
  children,
  viewBox = '0 0 800 500',
  ariaLabel,
  className = '',
}: FrameProps) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      fill="none"
    >
      <title>{ariaLabel}</title>
      {children}
    </svg>
  );
}

interface NodeProps {
  cx: number;
  cy: number;
  r?: number;
  label?: string;
  sublabel?: string;
  tone?: 'neutral' | 'ai' | 'human' | 'strong';
  filled?: boolean;
}

export function Node({
  cx,
  cy,
  r = 28,
  label,
  sublabel,
  tone = 'neutral',
  filled = false,
}: NodeProps) {
  const toneColor = {
    neutral: ILLUSTRATION_TOKENS.colors.line,
    ai: ILLUSTRATION_TOKENS.colors.ai,
    human: ILLUSTRATION_TOKENS.colors.human,
    strong: ILLUSTRATION_TOKENS.colors.lineStrong,
  }[tone];

  const fillColor = filled
    ? tone === 'ai'
      ? ILLUSTRATION_TOKENS.colors.aiSoft
      : tone === 'human'
      ? ILLUSTRATION_TOKENS.colors.humanSoft
      : ILLUSTRATION_TOKENS.colors.surface
    : 'transparent';

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={toneColor}
        strokeWidth={ILLUSTRATION_TOKENS.stroke}
        fill={fillColor}
      />
      {label && (
        <text
          x={cx}
          y={cy + (sublabel ? -2 : 4)}
          textAnchor="middle"
          fill={ILLUSTRATION_TOKENS.colors.text}
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
          letterSpacing="0.04em"
        >
          {label}
        </text>
      )}
      {sublabel && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill={ILLUSTRATION_TOKENS.colors.textMuted}
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.06em"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

interface ConnectorProps extends Omit<SVGProps<SVGLineElement>, 'stroke'> {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: 'neutral' | 'ai' | 'human' | 'strong';
  dashed?: boolean;
}

export function Connector({
  x1,
  y1,
  x2,
  y2,
  tone = 'neutral',
  dashed = false,
  ...rest
}: ConnectorProps) {
  const toneColor = {
    neutral: ILLUSTRATION_TOKENS.colors.line,
    ai: ILLUSTRATION_TOKENS.colors.ai,
    human: ILLUSTRATION_TOKENS.colors.human,
    strong: ILLUSTRATION_TOKENS.colors.lineStrong,
  }[tone];

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={toneColor}
      strokeWidth={ILLUSTRATION_TOKENS.stroke}
      strokeDasharray={dashed ? ILLUSTRATION_TOKENS.strokeDashed : undefined}
      {...rest}
    />
  );
}

interface BadgeProps {
  x: number;
  y: number;
  kind: 'ai' | 'human';
}

export function CapabilityBadge({ x, y, kind }: BadgeProps) {
  const label = kind === 'ai' ? 'AI' : 'HUMAN';
  const color = kind === 'ai' ? ILLUSTRATION_TOKENS.colors.ai : ILLUSTRATION_TOKENS.colors.human;
  const width = kind === 'ai' ? 36 : 56;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={18}
        rx={9}
        stroke={color}
        strokeWidth={ILLUSTRATION_TOKENS.stroke}
        fill={kind === 'ai' ? ILLUSTRATION_TOKENS.colors.aiSoft : ILLUSTRATION_TOKENS.colors.humanSoft}
      />
      <text
        x={x + width / 2}
        y={y + 12}
        textAnchor="middle"
        fill={color}
        fontSize="9"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="600"
        letterSpacing="0.15em"
      >
        {label}
      </text>
    </g>
  );
}

interface GridProps {
  x: number;
  y: number;
  cols: number;
  rows: number;
  cellSize?: number;
  gap?: number;
  filledCells?: number[];
}

export function DataGrid({ x, y, cols, rows, cellSize = 16, gap = 4, filledCells = [] }: GridProps) {
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cellIndex = row * cols + col;
      const filled = filledCells.includes(cellIndex);
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={x + col * (cellSize + gap)}
          y={y + row * (cellSize + gap)}
          width={cellSize}
          height={cellSize}
          rx={2}
          stroke={
            filled
              ? ILLUSTRATION_TOKENS.colors.ai
              : ILLUSTRATION_TOKENS.colors.line
          }
          strokeWidth={ILLUSTRATION_TOKENS.stroke}
          fill={filled ? ILLUSTRATION_TOKENS.colors.aiSoft : ILLUSTRATION_TOKENS.colors.surface}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

interface LabelProps {
  x: number;
  y: number;
  children: string;
  tone?: 'default' | 'muted' | 'ai' | 'human';
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  mono?: boolean;
}

export function Label({
  x,
  y,
  children,
  tone = 'default',
  size = 11,
  anchor = 'start',
  mono = true,
}: LabelProps) {
  const color = {
    default: ILLUSTRATION_TOKENS.colors.text,
    muted: ILLUSTRATION_TOKENS.colors.textMuted,
    ai: ILLUSTRATION_TOKENS.colors.ai,
    human: ILLUSTRATION_TOKENS.colors.human,
  }[tone];

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={color}
      fontSize={size}
      fontFamily={mono ? "'JetBrains Mono', monospace" : "'Inter', sans-serif"}
      letterSpacing={mono ? '0.06em' : '0'}
    >
      {children}
    </text>
  );
}
