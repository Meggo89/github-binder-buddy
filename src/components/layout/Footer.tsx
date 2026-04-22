import { Link } from 'react-router-dom';
import mastellaLogo from '../../assets/mastella-logo.png';

export function Footer() {
  return (
    <footer className="bg-ink text-sand-light border-t border-white/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <img src={mastellaLogo} alt="Mastella Advisory" className="h-24 w-auto mb-6" />
            <p className="text-sm leading-relaxed max-w-xs">
              Strategic exit and M&amp;A advisory for founders building companies worth £5M to £50M - rebuilt for the AI era.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors">Process</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Our Work</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/insights" className="hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:leo@mastellagroup.com" className="hover:text-white transition-colors">
                  leo@mastellagroup.com
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                International House<br />
                101 King's Cross Rd<br />
                London, WC1X 9LP
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-widest uppercase">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sand-dark">
          <p>© {new Date().getFullYear()} Mastella Advisory. All rights reserved.</p>
          <p className="font-mono tracking-wider">
            <span className="text-accent/80">●</span> Bespoke M&amp;A agents + matched specialists
          </p>
        </div>
      </div>
    </footer>
  );
}
