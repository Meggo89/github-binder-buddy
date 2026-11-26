// Exit preparation block (Scalexit). Shown in the home page Exit Readiness Score section, on the
// Exit Readiness Assessment service page and on the Exit planning service page.
// Copy is fixed by Leo. No link to scalexit.com and no further description of the platform.
//
// LOGO SLOT: add the official Scalexit logo, unaltered, as public/images/scalexit-logo.svg
// (or .png). The build picks it up automatically (see vite.config.ts) and shows it small beside
// the heading. Until then the block shows no logo.
const LOGO = __SCALEXIT_LOGO__;

export function ExitPreparationBlock({ className = '' }: { className?: string }) {
  return (
    <aside aria-labelledby="exit-preparation-heading" className={`rounded-xl border border-navy/10 bg-white p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        {LOGO && <img src={LOGO} alt="Scalexit" className="h-6 w-auto shrink-0" loading="lazy" />}
        <h2 id="exit-preparation-heading" className="font-serif text-2xl text-navy leading-snug">
          Know where you stand before you sell.
        </h2>
      </div>
      <p className="text-navy-light leading-relaxed mb-4">
        Our Exit Readiness Assessment runs on Scalexit, the platform we co-founded. It scores your business the way a
        buyer would, across five areas, and shows what to fix first and what each gap could cost you on price. It&apos;s
        a low-cost first step, months or years before a sale, and a senior adviser takes you through the results.
      </p>
      <p className="text-navy-light leading-relaxed">
        If you go on to sell, the same platform carries your preparation work straight into the sale process, so
        nothing is done twice.
      </p>
    </aside>
  );
}
