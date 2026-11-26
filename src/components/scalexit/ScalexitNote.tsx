// Scalexit note: shown in the home page Exit Readiness Score section, on the home page
// "Preparing for a sale" card and on the Exit planning service page.
// Copy is fixed by Leo; no link to scalexit.com and no further description of the platform.
//
// Logo: the official file from scalexit.com, unaltered and in its own colours.
// It is not in the repository yet. To add it, save it as src/assets/scalexit-logo.svg (or .png),
// import it below and set SCALEXIT_LOGO to the import.
const SCALEXIT_LOGO: string | null = null;

const SCALEXIT_COPY = [
  'Our exit preparation work runs on Scalexit, the exit readiness platform co-founded by Leo Meggitt.',
  "It combines sector deal data and buyer scoring with a senior adviser's judgement, so owners see their business as a buyer will and know what to fix first.",
];

export function ScalexitNote({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return (
    <aside
      aria-label="Scalexit"
      className={`border-t border-navy/10 ${compact ? 'pt-4' : 'pt-6'} ${className}`}
    >
      {SCALEXIT_LOGO && (
        <img
          src={SCALEXIT_LOGO}
          alt="Scalexit"
          className={`${compact ? 'h-4' : 'h-5'} w-auto mb-3`}
          loading="lazy"
        />
      )}
      <p className={`${compact ? 'text-xs' : 'text-sm'} text-navy-light leading-relaxed`}>{SCALEXIT_COPY.join(' ')}</p>
    </aside>
  );
}
