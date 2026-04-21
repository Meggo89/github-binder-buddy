import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SEO
        title="Privacy Policy"
        description="Mastella Advisory's privacy policy. Learn how we collect, use, and protect your personal data."
        canonical="https://mastellagroup.com/privacy-policy"
      />
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
            <p className="mb-4">If you have any questions about this privacy policy, please contact us at:</p>
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
    </PageLayout>
  );
}
