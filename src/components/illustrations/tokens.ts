// Shared design tokens for all illustrations — extracted so HMR
// recognises primitives.tsx as a pure-component module.

export const ILLUSTRATION_TOKENS = {
  stroke: 1.5,
  strokeDashed: '4 4',
  colors: {
    line: 'rgba(255, 255, 255, 0.25)',
    lineStrong: 'rgba(255, 255, 255, 0.6)',
    ai: '#C9A227',
    aiSoft: 'rgba(201, 162, 39, 0.2)',
    human: '#D4C5B2',
    humanSoft: 'rgba(212, 197, 178, 0.2)',
    ink: '#050E1F',
    surface: 'rgba(255, 255, 255, 0.04)',
    text: 'rgba(255, 255, 255, 0.85)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
  },
};
