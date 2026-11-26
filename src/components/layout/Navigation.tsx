import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import mastellaLogo from '../../assets/mastella-logo-mark.png';

type NavLink = { to: string; label: string; children?: { to: string; label: string }[] };

const NAV_LINKS: NavLink[] = [
  { to: '/services/', label: 'Services' },
  { to: '/sectors/', label: 'Sectors' },
  { to: '/case-studies/', label: 'Our Work' },
  { to: '/insights/', label: 'Insights' },
  {
    to: '/about/',
    label: 'About',
    children: [
      { to: '/process/', label: 'Process' },
      { to: '/team/', label: 'Team' },
    ],
  },
];

const CTA_LABEL = 'Arrange a confidential conversation';

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-ink/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`keep-dark fixed inset-y-0 right-0 w-full max-w-sm bg-[#1F2226] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="text-[#FAF7F2] hover:text-[#FF87B7] transition p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 p-6 pt-4">
          {[{ to: '/', label: 'Home' } as NavLink, ...NAV_LINKS].map((link) => (
            <div key={link.to} className="flex flex-col items-center space-y-3">
              <Link
                to={link.to}
                className="text-[#FAF7F2] text-xl font-serif hover:text-[#FF87B7] transition-colors duration-200"
                onClick={onClose}
              >
                {link.label}
              </Link>
              {link.children?.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="text-[#FAF7F2]/75 text-base hover:text-[#FF87B7] transition-colors duration-200"
                  onClick={onClose}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-4 w-full">
            <Link
              to="/contact/"
              className="block w-full text-center bg-[#B42D63] text-[#FFFFFF] px-6 py-3 rounded-[4px] font-medium hover:bg-[#9E2756] transition-colors"
              onClick={onClose}
            >
              {CTA_LABEL}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Netlify serves every page with a trailing slash (/contact/) while the prerender renders the
  // bare path (/contact). Compare without the slash so the server HTML and the browser agree;
  // a mismatch here made React discard the prerendered contact page on every load.
  const path = location.pathname.length > 1 ? location.pathname.replace(/\/+$/, '') : location.pathname;
  const onContactPage = path === '/contact';

  return (
    <>
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between relative z-20">
        <Link to="/" className="flex items-center" aria-label="Mastella Advisory: home">
          <img src={mastellaLogo} alt="Mastella Advisory" className="h-16 md:h-20 w-auto" />
        </Link>
        <div className="hidden lg:flex space-x-5 xl:space-x-7 items-center">
          {NAV_LINKS.map((link) => {
            const active =
              path === link.to.replace(/\/$/, '') || (link.children ?? []).some((c) => path === c.to.replace(/\/$/, ''));
            const cls = `text-sm tracking-wide whitespace-nowrap transition-colors ${
              active ? 'text-[#B42D63]' : 'text-[#1F2226] hover:text-[#B42D63]'
            }`;
            if (!link.children) {
              return (
                <Link key={link.to} to={link.to} className={cls}>
                  {link.label}
                </Link>
              );
            }
            // The sub-links stay in the page (for keyboard users and crawlers) and show on hover or focus.
            return (
              <div key={link.to} className="relative group">
                <Link to={link.to} className={`${cls} inline-flex items-center gap-1`} aria-haspopup="true">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block group-focus-within:block min-w-[10rem]">
                  <ul className="rounded-[6px] border border-[#E6E0D6] bg-[#FFFFFF] py-2">
                    {link.children.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          className="block px-4 py-2 text-sm text-[#1F2226] hover:bg-[#FAF7F2] hover:text-[#B42D63] transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          {!onContactPage && (
            <Link
              to="/contact/"
              className="bg-[#B42D63] text-[#FFFFFF] px-5 py-2.5 rounded-[4px] text-sm font-medium whitespace-nowrap hover:bg-[#9E2756] transition-colors"
            >
              {CTA_LABEL}
            </Link>
          )}
        </div>
        <button
          className="lg:hidden text-[#1F2226] hover:text-[#B42D63] transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
