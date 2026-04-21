import { SEO } from '../components/SEO';
import { PageLayout } from '../components/layout';

function Hero() {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-6">Privacy</p>
      <h1 className="font-serif text-display-lg text-white leading-[1.05] mb-8 text-balance">
        How we handle your personal data.
      </h1>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <PageLayout hero={<Hero />} heroTone="solid" mainClassName="">
      <SEO
        title="Privacy Policy"
        description="Mastella Advisory's privacy policy. How we collect, use, and protect your personal data."
        canonical="https://mastellagroup.com/privacy-policy"
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono text-navy-light tracking-wider mb-10">
              LAST UPDATED {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
            </p>

            <div className="prose-article">
              <h2>1. Introduction</h2>
              <p>
                Mastella Advisory (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your
                personal data. This privacy policy explains how we collect, use, and safeguard your information when
                you visit our website or use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>We collect several types of information, including:</p>
              <ul>
                <li>Contact information (name, email address, phone number)</li>
                <li>Company information</li>
                <li>Business information provided via our contact and lead magnet forms</li>
                <li>Usage data and cookies</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Communicate with you about our services</li>
                <li>Process your requests and transactions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfil the purposes outlined in this
                privacy policy, unless a longer retention period is required by law.
              </p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and improve user
                experience. You can control cookies through your browser settings.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                or content of these websites.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page.
              </p>

              <h2>10. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at:</p>
              <p>
                Mastella Advisory<br />
                International House<br />
                101 King&apos;s Cross Rd<br />
                London, WC1X 9LP<br />
                Email: leo@mastellagroup.com<br />
                Phone: +44 (0)20 7123 4567
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
