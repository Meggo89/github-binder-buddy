import { useEffect, useState } from 'react';

const PHRASES = [
  'found off-market.',
  'led by senior advisors.',
  'confidential from first conversation.',
  'rebuilt for the AI era.',
];

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

  return (
    <span className="italic text-accent">
      {PHRASES[pi].slice(0, cc)}
      <span
        aria-hidden="true"
        className="inline-block w-[4px] align-text-bottom ml-1 bg-accent animate-pulse"
        style={{ height: '0.85em' }}
      />
    </span>
  );
}
