import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import mastellaLogo from '../../assets/mastella-logo.png';

type NavLink = { to: string; label: string };

const NAV_LINKS: NavLink[] = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/case-studies', label: 'Our Work' },
  { to: '/team', label: 'Team' },
  { to: '/insights', label: 'Insights' },
];

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
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-navy-deepest z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="text-white hover:text-accent transition p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 p-6 pt-4">
          {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-xl font-serif hover:text-accent transition-colors duration-200"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 w-full">
            <Link
              to="/contact"
              className="block w-full text-center bg-accent text-navy-deepest px-6 py-3 rounded-md font-semibold tracking-wide hover:bg-accent-light transition-all duration-200"
              onClick={onClose}
            >
              Book a Consultation
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
  const onContactPage = location.pathname === '/contact';

  return (
    <>
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between relative z-20">
        <Link to="/" className="flex items-center" aria-label="Mastella Advisory - home">
          <img src={mastellaLogo} alt="Mastella Advisory" className="h-24 md:h-28 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-7 items-center">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-wide transition-colors ${
                  active ? 'text-accent' : 'text-sand-light hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {!onContactPage && (
            <Link
              to="/contact"
              className="bg-accent text-navy-deepest px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide hover:bg-accent-light transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20"
            >
              Book a Call
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-white hover:text-accent transition-colors"
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
