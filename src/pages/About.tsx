import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

export default function About() {
  return (
    <PageLayout>
      <SEO
        title="About Us - Our Story & Mission"
        description="Mastella Advisory combines decades of M&A expertise with modern technology to deliver world-class exit advisory for SMEs worth £5M to £50M."
        canonical="https://mastellagroup.com/about"
      />
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
              Founded with a vision to revolutionise M&amp;A advisory services for SMEs, Mastella Advisory combines decades of traditional M&amp;A expertise with cutting-edge technology. Our approach makes world-class M&amp;A advisory services accessible to small and medium-sized enterprises, ensuring they receive the same level of expertise typically reserved for larger corporations.
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
              To empower SME owners in achieving optimal exit outcomes through innovative technology and expert guidance, making professional M&amp;A advisory services more accessible, efficient, and cost-effective.
            </p>

            <h3 className="text-xl font-semibold text-navy mb-3">Core Values</h3>
            <ul className="space-y-3 text-navy-light">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Innovation:</span>
                Leveraging technology to streamline and enhance the M&amp;A process
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
                We utilise advanced analytics and proprietary tools to streamline the M&amp;A process, providing deeper insights and faster execution.
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
    </PageLayout>
  );
}
