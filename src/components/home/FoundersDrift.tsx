import { useEffect, useRef, useState } from 'react';

// Vite glob import: picks up every jpg in src/assets/founders and fingerprints
// each URL at build time. Eager so the module resolves synchronously.
const modules = import.meta.glob<{ default: string }>('../../assets/founders/*.jpg', {
  eager: true,
});

const ALL_PHOTOS = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default);

// Hand-shuffled index order so diverse faces are spread throughout the strip,
// clamped to however many images actually exist.
const ORDER = [22, 3, 14, 0, 18, 9, 23, 5, 12, 20, 2, 16, 7, 21, 11, 4, 17, 8, 19, 1, 13, 6, 15, 10];

const PHOTOS = ORDER
  .map((i) => ALL_PHOTOS[i])
  .filter((url): url is string => Boolean(url));

function Row({ photos, speed, dir }: { photos: string[]; speed: number; dir: 1 | -1 }) {
  const [reduced, setReduced] = useState(false);
  const [t, setT] = useState(0);
  const raf = useRef<number>();

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

  const offset = reduced ? 0 : (t * speed * dir) % 180;
  const doubled = [...photos, ...photos];

  return (
    <div className="flex gap-3.5" style={{ transform: `translateX(${-offset}px)` }}>
      {doubled.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="flex-none w-[150px] aspect-[4/5] rounded-lg overflow-hidden bg-navy relative"
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(0.5) contrast(1.05) brightness(0.9)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(6,24,48,0.6))' }}
          />
        </div>
      ))}
    </div>
  );
}

export function FoundersDrift() {
  const rows: { photos: string[]; speed: number; dir: 1 | -1 }[] = [
    { photos: PHOTOS.slice(0, 12), speed: 30, dir: 1 },
    { photos: PHOTOS.slice(6, 18), speed: 40, dir: -1 },
    { photos: PHOTOS.slice(12, 24), speed: 35, dir: 1 },
  ];

  return (
    <section className="bg-navy-dark text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 mb-14 max-w-[1200px]">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase mb-6">
          The people behind the work
        </p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight">
          AI does the legwork.
          <br />
          <span className="italic text-accent">People do the deal.</span>
        </h2>
        <p className="text-lg text-sand-light mt-6 max-w-[640px] leading-relaxed">
          The technology is the leverage. Every mandate is a conversation between humans with
          something at stake. These are some of them.
        </p>
      </div>
      <div
        className="flex flex-col gap-3.5"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {rows.map((row, i) => (
          <Row key={i} {...row} />
        ))}
      </div>
    </section>
  );
}
