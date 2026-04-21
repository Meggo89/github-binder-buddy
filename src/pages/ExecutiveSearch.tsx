import { ArrowLeft, Users, Search, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

function Hero() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Executive Search &amp; Interim Solutions</h1>
      <p className="text-xl text-sand-light max-w-3xl">
        Strategic leadership placement and interim management solutions to maximize value pre and post exit
      </p>
    </>
  );
}

export default function ExecutiveSearch() {
  return (
    <PageLayout hero={<Hero />}>
      <SEO
        title="Executive Search & Interim Solutions"
        description="Expert executive search and interim management solutions for companies pre and post exit. Strategic leadership placement to maximize business value and ensure seamless transitions."
      />
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

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
                <li>• Heads of Sales &amp; Marketing</li>
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

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-8">Our Executive Search Approach</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Needs Assessment', description: 'Understand your strategic objectives, capability gaps, and timeline requirements' },
              { step: '2', title: 'Market Mapping', description: 'Identify and approach top-tier executive talent aligned with your specific needs' },
              { step: '3', title: 'Evaluation & Selection', description: 'Rigorous assessment process to ensure cultural fit and strategic alignment' },
              { step: '4', title: 'Onboarding Support', description: 'Facilitate smooth integration and ensure rapid impact from day one' },
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

        <section className="bg-navy text-white p-12 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Mastella Advisory</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-sand mb-3">M&amp;A-Focused Expertise</h3>
              <p className="text-sand-light mb-4">
                We understand the unique leadership requirements during M&amp;A transactions and can identify executives with proven track records in similar situations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sand mb-3">Extensive Network</h3>
              <p className="text-sand-light mb-4">
                Access to a curated network of senior executives with experience in SME growth, exits, and post-acquisition integration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sand mb-3">Speed &amp; Flexibility</h3>
              <p className="text-sand-light mb-4">
                Whether you need permanent hires or interim solutions, we can move quickly to place the right talent when timing is critical.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sand mb-3">Integrated Advisory</h3>
              <p className="text-sand-light mb-4">
                Our executive search services complement our M&amp;A advisory, providing a holistic approach to preparing and executing successful exits.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">Strengthen Your Leadership Team for Success</h2>
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
    </PageLayout>
  );
}
