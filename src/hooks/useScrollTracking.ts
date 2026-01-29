import { useEffect, useRef } from 'react';

const THRESHOLDS = [25, 50, 75, 100];

export function useScrollTracking() {
  const firedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedThresholds.current.clear();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !firedThresholds.current.has(threshold)) {
          firedThresholds.current.add(threshold);

          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${threshold}%`,
              value: threshold,
              page_path: window.location.pathname,
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
