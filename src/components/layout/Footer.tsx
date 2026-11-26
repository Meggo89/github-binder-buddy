import { Link } from 'react-router-dom';
import mastellaLogo from '../../assets/mastella-logo.png';
import { SECTORS } from '../../content/landing';

export function Footer() {
  return (
    <footer className="bg-[#1F2226] text-[#FAF7F2]/75 border-t border-[#FFFFFF]/5">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={mastellaLogo} alt="Mastella Advisory" className="h-24 w-auto mb-6" />
            <p className="text-sm leading-relaxed max-w-xs">
              M&amp;A advice for UK business owners. Strategic exit advisory for founder-led businesses worth £5M to £50M across the UK and internationally.
            </p>
          </div>
          <div>
            <h4 className="text-[#FAF7F2] font-semibold mb-4 text-xs tracking-[0.08em] uppercase">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about/" className="hover:text-[#FF87B7] transition-colors">About</Link></li>
              <li><Link to="/services/" className="hover:text-[#FF87B7] transition-colors">Services</Link></li>
              <li><Link to="/services/m-and-a-advisor-uk/" className="hover:text-[#FF87B7] transition-colors">M&amp;A adviser for UK founder-led businesses</Link></li>
              <li><Link to="/process/" className="hover:text-[#FF87B7] transition-colors">Process</Link></li>
              <li><Link to="/case-studies/" className="hover:text-[#FF87B7] transition-colors">Our Work</Link></li>
              <li><Link to="/team/" className="hover:text-[#FF87B7] transition-colors">Team</Link></li>
              <li><Link to="/insights/" className="hover:text-[#FF87B7] transition-colors">Insights</Link></li>
              <li><Link to="/exit-readiness-score/" className="hover:text-[#FF87B7] transition-colors">Free Exit Readiness Score</Link></li>
              <li><Link to="/resources/exit-readiness-scoring/" className="hover:text-[#FF87B7] transition-colors">How we score exit readiness</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#FAF7F2] font-semibold mb-4 text-xs tracking-[0.08em] uppercase">Sectors</h4>
            <ul className="space-y-2.5 text-sm">
              {SECTORS.map((s) => (
                <li key={s.slug}>
                  <Link to={`/sectors/${s.slug}/`} className="hover:text-[#FF87B7] transition-colors">{s.name}</Link>
                </li>
              ))}
              <li><Link to="/sectors/" className="hover:text-[#FF87B7] transition-colors">All sectors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#FAF7F2] font-semibold mb-4 text-xs tracking-[0.08em] uppercase">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:leo@mastellagroup.com" className="hover:text-[#FF87B7] transition-colors">
                  leo@mastellagroup.com
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                International House<br />
                101 King's Cross Rd<br />
                London, WC1X 9LP
              </li>
            </ul>
            <h4 className="text-[#FAF7F2] font-semibold mt-10 mb-4 text-xs tracking-[0.08em] uppercase">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy-policy/" className="hover:text-[#FF87B7] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#FFFFFF]/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} Mastella Advisory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
