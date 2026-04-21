import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import mastellaLogo from '../../assets/mastella-logo.png';

type NavLink = { to: string; label: string };

const NAV_LINKS: NavLink[] = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Our Work' },
  { to: '/team', label: 'Team' },
  { to: '/insights', label: 'Insights' },
];

function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-navy-dark z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="text-white hover:text-sand transition p-2 -mr-2"
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
              className="text-white text-xl font-medium hover:text-accent transition-colors duration-200"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 w-full">
            <Link
              to="/contact"
              className="block w-full text-center bg-accent text-navy px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200"
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
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
        <Link to="/" className="flex items-center space-x-2">
          <img src={mastellaLogo} alt="Mastella Advisory" className="h-48 w-auto" />
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-sand-light transition ${
                location.pathname === link.to ? 'border-b-2 border-sand' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!onContactPage && (
            <Link
              to="/contact"
              className="bg-accent text-navy px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200"
            >
              Contact Us
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-white"
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
