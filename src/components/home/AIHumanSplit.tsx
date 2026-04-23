import { useEffect, useRef, useState } from 'react';

const TASKS = [
  { name: 'Financial normalisation', ai: 0.85 },
  { name: 'Buyer mapping', ai: 0.7 },
  { name: 'IM first draft', ai: 0.75 },
  { name: 'Positioning narrative', ai: 0.2 },
  { name: 'Term negotiation', ai: 0.1 },
  { name: 'Trust building', ai: 0.0 },
];

export function AIHumanSplit() {
  const [t, setT] = useState(0);
  const raf = useRef<number>();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    const loop = () => {
      setT((performance.now() - start) / 1000);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  const idx = reduced ? 0 : Math.floor(t * 0.5) % TASKS.length;
  const task = TASKS[idx];

  return (
    <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 md:p-10">
      <div className="flex items-start justify-between mb-6 gap-6 flex-wrap">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase mb-2">
            Who does what
          </p>
          <p className="font-serif text-2xl md:text-3xl text-white leading-tight min-h-[2.2em]">
            {task.name}
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40">
          Auto-cycling · {idx + 1}/{TASKS.length}
        </p>
      </div>
      <div className="flex justify-between mb-2.5 font-mono text-[10px] tracking-[0.14em] uppercase">
        <span className="text-accent">AI · {Math.round(task.ai * 100)}%</span>
        <span className="text-sand">Human · {Math.round((1 - task.ai) * 100)}%</span>
      </div>
      <div className="flex h-12 rounded overflow-hidden">
        <div
          className="flex items-center pl-3.5 font-mono text-[10px] tracking-[0.14em] text-navy-deepest transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{
            width: `${task.ai * 100}%`,
            background: 'linear-gradient(90deg, #C9A227, #A88A1F)',
          }}
        >
          {task.ai > 0.15 && 'AGENTS'}
        </div>
        <div className="flex-1 flex items-center justify-end pr-3.5 font-mono text-[10px] tracking-[0.14em] text-sand bg-navy-light transition-all duration-700">
          {1 - task.ai > 0.15 && 'SENIOR ADVISOR'}
        </div>
      </div>
      <p className="text-sm text-white/50 leading-relaxed mt-5">
        Every task has a ratio. AI does the machinable work at machine speed; the advisor does what
        still needs judgement.
      </p>
    </div>
  );
}
