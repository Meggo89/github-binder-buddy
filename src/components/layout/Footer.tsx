import { Link } from 'react-router-dom';
import mastellaLogo from '../../assets/mastella-logo.png';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-sand py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={mastellaLogo} alt="Mastella Advisory" className="h-32 w-auto" />
            </div>
            <p className="text-sm">
              Strategic exit and M&amp;A advisory for founders building companies worth £5M to £50M.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-sand-light transition">About Us</Link></li>
              <li><Link to="/services" className="hover:text-sand-light transition">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-sand-light transition">Our Work</Link></li>
              <li><Link to="/team" className="hover:text-sand-light transition">Our Team</Link></li>
              <li><Link to="/insights" className="hover:text-sand-light transition">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>leo@mastellagroup.com</li>
              <li>+44 (0)20 7123 4567</li>
              <li>International House<br />101 King's Cross Rd<br />London, WC1X 9LP</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-sand-light transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
