import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function About() {
  const handleTeamClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/#team';
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80 z-10"></div>
          <img 
            src={londonSkyline} 
            alt="London skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={mastellaLogo} alt="Mastella Advisory" className="h-48 w-auto" />
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-sand-light">Home</Link>
            <Link to="/about" className="hover:text-sand-light">About</Link>
            <Link to="/services" className="hover:text-sand-light">Services</Link>
            <Link to="/process" className="hover:text-sand-light">Process</Link>
            <a href="/#team" onClick={handleTeamClick} className="hover:text-sand-light">Team</a>
            <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-navy mb-12">About Mastella Advisory</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-4">Our Story</h2>
              <p className="text-navy-light mb-6">
                Founded with a vision to revolutionise M&A advisory services for SMEs, Mastella Advisory combines decades of traditional M&A expertise with cutting-edge technology. Our approach makes world-class M&A advisory services accessible to small and medium-sized enterprises, ensuring they receive the same level of expertise typically reserved for larger corporations.
              </p>
              <p className="text-navy-light mb-6">
                Our team of seasoned professionals brings together experience from leading financial institutions, consulting firms, and successful entrepreneurs. This diverse expertise allows us to understand the unique challenges and opportunities faced by SME owners in today's dynamic business environment.
              </p>
              <p className="text-navy-light mb-6">
                Rather than 'out with the old, in with the new', we are combining expert hands-on advice with technology to deliver outcomes for greater value and lower costs.
              </p>
              <div className="mt-8">
                <Link to="/contact" className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition inline-block">
                  Get in Touch
                </Link>
              </div>
            </div>
            
            <div className="bg-sand-light p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-navy mb-4">Our Mission</h2>
              <p className="text-navy-light mb-6">
                To empower SME owners in achieving optimal exit outcomes through innovative technology and expert guidance, making professional M&A advisory services more accessible, efficient, and cost-effective.
              </p>
              
              <h3 className="text-xl font-semibold text-navy mb-3">Core Values</h3>
              <ul className="space-y-3 text-navy-light">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Innovation:</span>
                  Leveraging technology to streamline and enhance the M&A process
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Excellence:</span>
                  Delivering exceptional service and results for every client
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Integrity:</span>
                  Maintaining the highest standards of professional ethics
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Client Focus:</span>
                  Prioritizing our clients' goals and success above all else
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-navy mb-6">Our Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-3">Technology-Driven</h3>
                <p className="text-navy-light">
                  We utilise advanced analytics and proprietary tools to streamline the M&A process, providing deeper insights and faster execution.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-3">Client-Centric</h3>
                <p className="text-navy-light">
                  Every engagement is tailored to meet the specific needs and objectives of our clients, ensuring optimal outcomes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-navy mb-3">Results-Focused</h3>
                <p className="text-navy-light">
                  Our success is measured by the value we create for our clients through successful transactions and strategic outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-navy-dark text-sand py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={mastellaLogo} alt="Mastella Advisory" className="h-32 w-auto" />
              </div>
              <p className="text-sm">
                Specialised M&A advisory for small to medium companies, combining expert guidance with advanced technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>info@mastellagroup.com</li>
                <li>+44 (0)20 7123 4567</li>
                <li>International House<br />101 King's Cross Rd<br />London, WC1X 9LP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}