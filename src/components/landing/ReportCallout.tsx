import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { evidenceForHref } from '../../content/evidence';

// Sector report callout for sector and niche pages. Where the report has a headline
// price in content/evidence.ts, the figure is shown beside the link.
export function ReportCallout({ label, href, className = '' }: { label: string; href: string; className?: string }) {
  const ev = evidenceForHref(href);
  return (
    <aside className={`p-6 rounded-xl border border-accent/40 bg-sand-light ${className}`}>
      <div className={ev ? 'grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 sm:items-center' : ''}>
        {ev && (
          <div className="sm:border-r sm:border-navy/10 sm:pr-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-dark mb-1">What buyers paid</p>
            <p className="font-serif text-4xl text-navy leading-none whitespace-nowrap tabular-nums">{ev.multiple}</p>
            <p className="text-sm text-navy-light mt-2 max-w-[14rem] leading-snug">
              {ev.basis}. {ev.deals} deals logged.
            </p>
          </div>
        )}
        <Link
          to={href}
          className="inline-flex items-center gap-2 font-serif text-xl text-navy leading-snug hover:text-accent-dark"
        >
          {label}
          <ArrowRight className="h-4 w-4 flex-shrink-0" />
        </Link>
      </div>
    </aside>
  );
}
