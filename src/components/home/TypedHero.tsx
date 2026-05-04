import { useEffect, useState } from 'react';

const PHRASES = [
  'found off-market.',
  'led by senior advisors.',
  'confidential from first conversation.',
  'rebuilt for the AI era.',
];

// The phrase that wraps to the most lines at the smallest viewport.
// Used as an invisible sizer so the H1 reserves its maximum height
// up-front and surrounding sections never shunt up and down as the
// typed text rotates.
const LONGEST_PHRASE = PHRASES.reduce((a, b) => (b.length > a.length ? b : a), '');

export function TypedHeroTagline() {
  const [pi, setPi] = useState(0);
  const [cc, setCc] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const cur = PHRASES[pi];
    if (phase === 'typing' && cc < cur.length) {
      const t = setTimeout(() => setCc((c) => c + 1), 55);
      return () => clearTimeout(t);
    }
    if (phase === 'typing' && cc >= cur.length) {
      const t = setTimeout(() => setPhase('deleting'), 2200);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting' && cc > 0) {
      const t = setTimeout(() => setCc((c) => c - 1), 25);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting' && cc === 0) {
      setPi((i) => (i + 1) % PHRASES.length);
      setPhase('typing');
    }
  }, [cc, phase, pi, reduced]);

  if (reduced) {
    return <span className="italic text-accent">found off-market.</span>;
  }

  // Stack visible + invisible sizer in the same grid cell so the
  // container's height is always the height of the LONGEST_PHRASE
  // at the current viewport. No layout shift as phrases rotate.
  return (
    <span className="inline-grid align-top">
      <span
        aria-hidden="true"
        className="invisible italic col-start-1 row-start-1"
      >
        {LONGEST_PHRASE}
      </span>
      <span className="italic text-accent col-start-1 row-start-1">
        {PHRASES[pi].slice(0, cc)}
        <span
          aria-hidden="true"
          className="inline-block w-[4px] align-text-bottom ml-1 bg-accent animate-pulse"
          style={{ height: '0.85em' }}
        />
      </span>
    </span>
  );
}
