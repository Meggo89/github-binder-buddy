
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white page-enter">
      <SEO
        title="Privacy Policy"
        description="Mastella Advisory's privacy policy. Learn how we collect, use, and protect your personal data."
        canonical="https://mastellagroup.com/privacy-policy"
      />
      <header className="bg-gradient-to-r from-navy-dark to-navy text-white relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-navy/50 z-10"></div>
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
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/about" className="hover:text-sand-light transition">About</Link>
            <Link to="/services" className="hover:text-sand-light transition">Services</Link>
            <Link to="/case-studies" className="hover:text-sand-light transition">Our Work</Link>
            <Link to="/team" className="hover:text-sand-light transition">Team</Link>
            <Link to="/insights" className="hover:text-sand-light transition">Insights</Link>
            <Link to="/contact" className="bg-accent text-navy px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition-all duration-200">
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-navy-light">
              <p className="mb-6">
                Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Mastella Advisory ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect several types of information, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Contact information (name, email address, phone number)</li>
                <li>Company information</li>
                <li>Business financial information provided through our valuation tool</li>
                <li>Usage data and cookies</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and improve our services</li>
                <li>Communicate with you about our services</li>
                <li>Process your requests and transactions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">5. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">7. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our website and improve user experience. You can control cookies through your browser settings.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">8. Third-Party Links</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>

              <h2 className="text-2xl font-semibold text-navy mt-8 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <p className="mb-4">
                Mastella Advisory<br />
                International House<br />
                101 King's Cross Rd<br />
                London, WC1X 9LP<br />
                Email: leo@mastellagroup.com<br />
                Phone: +44 (0)20 7123 4567
              </p>
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
                <li>leo@mastellagroup.com</li>
                <li>+44 (0)20 7123 4567</li>
                <li>International House<br />101 King's Cross Rd<br />London, WC1X 9LP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
            <div className="mt-2">
              <Link to="/privacy-policy" className="text-sand hover:text-sand-light">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}