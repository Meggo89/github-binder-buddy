import { useEffect, useState } from 'react';

const TICKER = [
  { label: 'UK SME M&A volume', val: '+12%', delta: 'QoQ' },
  { label: 'Median EBITDA multiple', val: '6.8×', delta: 'Lower mid' },
  { label: 'PE dry powder', val: '$2.6T', delta: '2025' },
  { label: 'Avg time to close', val: '142d', delta: '-18d YoY' },
];

export function MarketPulse() {
  const [t, setT] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setT((x) => x + 1), 80);
    return () => clearInterval(id);
  }, [reduced]);

  const path =
    'M 0 40 ' +
    Array.from({ length: 60 }, (_, i) => {
      const x = i * 5;
      const y = 40 + Math.sin((i + t * 0.3) * 0.3) * 15 + Math.sin((i + t * 0.3) * 0.1) * 8;
      return `L ${x} ${y}`;
    }).join(' ');

  return (
    <section className="bg-navy-deepest text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-center">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase mb-4">
              ● Live · Market pulse
            </p>
            <h3 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              The lower mid-market,
              <br />
              <span className="italic text-accent">quarter by quarter.</span>
            </h3>
            <svg viewBox="0 0 300 80" className="w-full h-14 mt-6">
              <defs>
                <linearGradient id="mp-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#C9A227" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={path} stroke="#C9A227" strokeWidth="1.5" fill="none" />
              <path d={`${path} L 300 80 L 0 80 Z`} fill="url(#mp-fade)" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-x-12">
            {TICKER.map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline py-4 border-b border-white/10"
                style={{
                  opacity: reduced ? 1 : 0.6 + 0.4 * Math.abs(Math.sin(t * 0.05 + i * 0.7)),
                }}
              >
                <span className="text-sm text-sand flex-1">{row.label}</span>
                <span className="font-serif text-2xl text-white mr-4">{row.val}</span>
                <span className="text-[9px] text-accent font-mono tracking-widest uppercase">
                  {row.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
