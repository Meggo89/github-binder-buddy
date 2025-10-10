import { ArrowLeft, Users, Search, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import mastellaLogo from '../assets/mastella-logo.png';
import londonSkyline from '../assets/london-skyline.jpg';

export default function ExecutiveSearch() {
  return (
    <>
      <SEO 
        title="Executive Search & Interim Solutions"
        description="Expert executive search and interim management solutions for companies pre and post exit. Strategic leadership placement to maximize business value and ensure seamless transitions."
      />
      
      <div className="min-h-screen bg-white">
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
            <div className="hidden md:flex space-x-8">
              <Link to="/about" className="hover:text-sand-light">About</Link>
              <Link to="/services" className="hover:text-sand-light">Services</Link>
              <Link to="/process" className="hover:text-sand-light">Process</Link>
              <Link to="/team" className="hover:text-sand-light">Team</Link>
              <Link to="/executive-search" className="text-sand-light">Executive Search</Link>
              <Link to="/contact" className="bg-sand text-navy px-4 py-2 rounded-lg font-semibold hover:bg-sand-light transition">
                Contact Us
              </Link>
            </div>
          </nav>

          <div className="container mx-auto px-6 py-16 relative z-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Executive Search & Interim Solutions
            </h1>
            <p className="text-xl text-sand-light max-w-3xl">
              Strategic leadership placement and interim management solutions to maximize value pre and post exit
            </p>
          </div>
        </header>

        <main className="py-20">
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>

            {/* Overview Section */}
            <section className="mb-16">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-bold text-navy mb-6">Strategic Leadership for Critical Transitions</h2>
                <p className="text-lg text-navy-light mb-4">
                  The right leadership team can make or break an exit. Whether you're preparing for a sale, managing a transition, or building momentum post-acquisition, having experienced executives in key positions is crucial for maximizing value and ensuring success.
                </p>
                <p className="text-lg text-navy-light">
                  Our executive search and interim management services help you secure the talent needed to strengthen your business during these critical periods, ensuring continuity, driving growth, and positioning your company for optimal outcomes.
                </p>
              </div>
            </section>

            {/* Pre-Exit Solutions */}
            <section className="mb-16 bg-sand-light p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-navy mb-8">Pre-Exit Executive Solutions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start mb-4">
                    <Target className="h-8 w-8 text-navy mr-4 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-navy mb-3">Strategic Leadership Placement</h3>
                      <p className="text-navy-light">
                        Identify and place key executives who can enhance operational efficiency, strengthen financial performance, and make your business more attractive to potential buyers.
                      </p>
                    </div>
                  </div>
                  <ul className="ml-12 space-y-2 text-navy-light">
                    <li>• Chief Financial Officers (CFO)</li>
                    <li>• Chief Operating Officers (COO)</li>
                    <li>• Chief Revenue Officers (CRO)</li>
                    <li>• Heads of Sales & Marketing</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <Users className="h-8 w-8 text-navy mr-4 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-navy mb-3">Interim Management</h3>
                      <p className="text-navy-light">
                        Experienced interim executives who can step in quickly to address capability gaps, lead special projects, or provide stability during the pre-exit preparation phase.
                      </p>
                    </div>
                  </div>
                  <ul className="ml-12 space-y-2 text-navy-light">
                    <li>• Bridge leadership transitions</li>
                    <li>• Lead operational improvements</li>
                    <li>• Implement financial systems</li>
                    <li>• Drive growth initiatives</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Post-Exit Solutions */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-8">Post-Exit Integration Support</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <TrendingUp className="h-10 w-10 text-navy mb-4" />
                  <h3 className="text-xl font-semibold text-navy mb-3">Integration Leadership</h3>
                  <p className="text-navy-light">
                    Experienced executives who can manage the integration process, align teams, and ensure business continuity during ownership transitions.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <Search className="h-10 w-10 text-navy mb-4" />
                  <h3 className="text-xl font-semibold text-navy mb-3">Cultural Alignment</h3>
                  <p className="text-navy-light">
                    Leaders who can bridge organizational cultures, maintain employee morale, and drive the combined entity toward shared objectives.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <Users className="h-10 w-10 text-navy mb-4" />
                  <h3 className="text-xl font-semibold text-navy mb-3">Growth Acceleration</h3>
                  <p className="text-navy-light">
                    Strategic hires focused on capturing synergies, expanding market presence, and accelerating growth in the post-acquisition phase.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Approach */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-navy mb-8">Our Executive Search Approach</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Needs Assessment",
                    description: "Understand your strategic objectives, capability gaps, and timeline requirements"
                  },
                  {
                    step: "2",
                    title: "Market Mapping",
                    description: "Identify and approach top-tier executive talent aligned with your specific needs"
                  },
                  {
                    step: "3",
                    title: "Evaluation & Selection",
                    description: "Rigorous assessment process to ensure cultural fit and strategic alignment"
                  },
                  {
                    step: "4",
                    title: "Onboarding Support",
                    description: "Facilitate smooth integration and ensure rapid impact from day one"
                  }
                ].map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {phase.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-navy">{phase.title}</h3>
                    <p className="text-sm text-navy-light">{phase.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-navy text-white p-12 rounded-2xl mb-16">
              <h2 className="text-3xl font-bold mb-8">Why Choose Mastella Advisory</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-sand mb-3">M&A-Focused Expertise</h3>
                  <p className="text-sand-light mb-4">
                    We understand the unique leadership requirements during M&A transactions and can identify executives with proven track records in similar situations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sand mb-3">Extensive Network</h3>
                  <p className="text-sand-light mb-4">
                    Access to a curated network of senior executives with experience in SME growth, exits, and post-acquisition integration.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sand mb-3">Speed & Flexibility</h3>
                  <p className="text-sand-light mb-4">
                    Whether you need permanent hires or interim solutions, we can move quickly to place the right talent when timing is critical.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sand mb-3">Integrated Advisory</h3>
                  <p className="text-sand-light mb-4">
                    Our executive search services complement our M&A advisory, providing a holistic approach to preparing and executing successful exits.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <h2 className="text-3xl font-bold text-navy mb-6">
                Strengthen Your Leadership Team for Success
              </h2>
              <p className="text-xl text-navy-light mb-8 max-w-3xl mx-auto">
                Whether you're preparing for an exit or managing post-acquisition integration, we can help you secure the executive talent needed to maximize value and ensure success.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-light transition text-lg"
              >
                Discuss Your Leadership Needs
              </Link>
            </section>
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
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-sand-light">About Us</Link></li>
                  <li><Link to="/services" className="hover:text-sand-light">Services</Link></li>
                  <li><Link to="/executive-search" className="hover:text-sand-light">Executive Search</Link></li>
                  <li><Link to="/contact" className="hover:text-sand-light">Contact</Link></li>
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
                  <li><Link to="/privacy-policy" className="hover:text-sand-light">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-navy-light mt-12 pt-8 text-sm text-center">
              © {new Date().getFullYear()} Mastella Advisory. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
