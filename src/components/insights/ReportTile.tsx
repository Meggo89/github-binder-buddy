import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SECTOR_REPORTS } from '../../content/insights/sector-reports';

// Compact tile: sector name and one-line descriptor. Also used on the sector reports hub.
export function ReportTile({ slug }: { slug: string }) {
  const meta = SECTOR_REPORTS[slug];
  return (
    <Link
      to={`/insights/${slug}/`}
      className="group flex items-start justify-between gap-3 h-full bg-white rounded-lg border border-navy/10 px-4 py-3.5 hover:border-accent/40 transition-colors"
    >
      <span>
        <span className="block text-navy font-medium leading-snug group-hover:text-accent-dark transition-colors">{meta?.label ?? slug}</span>
        {meta && <span className="block text-sm text-navy-light leading-snug mt-1">{meta.descriptor}</span>}
      </span>
      <ArrowUpRight className="h-4 w-4 mt-1 shrink-0 text-navy-light group-hover:text-accent-dark transition-colors" aria-hidden="true" />
    </Link>
  );
}
