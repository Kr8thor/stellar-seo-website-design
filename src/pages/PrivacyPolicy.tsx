import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy | Marden SEO, LLC',
    description: 'Privacy policy and data protection practices for Marden SEO, LLC services.',
    keywords: ['privacy policy', 'data protection', 'privacy', 'marden seo'],
    canonicalUrl: 'https://mardenseo.com/privacy-policy'
  });

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="p-8 prose prose-gray max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Marden SEO, LLC ("we", "our", or "us") respects your privacy and is committed to protecting 
            your personal information. This Privacy Policy explains how we collect, use, and safeguard 
            your information when you use our services.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>We may collect the following personal information:</p>
          <ul>
            <li>Name and contact information (email, phone number)</li>
            <li>Business information (company name, website, industry)</li>
            <li>Billing and payment information</li>
            <li>Communication preferences</li>
          </ul>

          <h3>2.2 Technical Information</h3>
          <p>We automatically collect certain technical information:</p>
          <ul>
            <li>Website analytics data (via Google Analytics)</li>
            <li>User behavior data (via Microsoft Clarity)</li>
            <li>IP addresses and browser information</li>
            <li>Cookie and tracking data</li>
          </ul>

          <h3>2.3 Service-Related Information</h3>
          <p>In the course of providing SEO services, we may access:</p>
          <ul>
            <li>Website analytics accounts (Google Analytics, Search Console)</li>
            <li>Social media account data (when authorized)</li>
            <li>Website content and structure information</li>
            <li>Competitor analysis data</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our SEO and development services</li>
            <li>Communicate with you about your projects</li>
            <li>Process payments and billing</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Comply with legal obligations</li>
            <li>Analyze and improve our website and services</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Stripe (payments), Google (analytics), Microsoft (user insights)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            <li><strong>With Your Consent:</strong> Any other sharing with your explicit permission</li>
          </ul>

          <h2>5. Third-Party Services</h2>
          <p>Our website and services integrate with third-party platforms:</p>
          <ul>
            <li><strong>Google Analytics:</strong> Website traffic analysis</li>
            <li><strong>Microsoft Clarity:</strong> User experience insights</li>
            <li><strong>Stripe:</strong> Secure payment processing</li>
            <li><strong>Calendly:</strong> Meeting scheduling</li>
          </ul>
          <p>
            These services have their own privacy policies. We encourage you to review them.
          </p>

          <h2>6. Data Security</h2>
          <p>We implement appropriate security measures to protect your information:</p>
          <ul>
            <li>SSL encryption for data transmission</li>
            <li>Secure payment processing through Stripe</li>
            <li>Limited access to personal information</li>
            <li>Regular security updates and monitoring</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to provide services and comply 
            with legal obligations. Business records are typically retained for 7 years for tax purposes.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability (where applicable)</li>
          </ul>

          <h2>9. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to improve your experience. You can control cookies 
            through your browser settings, though some features may not function properly if disabled.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 18 years of age. We do not knowingly 
            collect personal information from children.
          </p>

          <h2>11. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in the United States. By using our 
            services, you consent to such transfers.
          </p>

          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on our website with 
            an updated "Last Modified" date.
          </p>

          <h2>13. Contact Us</h2>
          <p>
            For questions about this Privacy Policy or to exercise your rights, contact us at:
            <br />
            Email: contact@mardenseo.com
            <br />
            Business: Marden SEO, LLC
            <br />
            Jurisdiction: Wyoming, United States
          </p>

          <p className="text-sm text-gray-600 mt-8">
            <em>
              This Privacy Policy is effective as of the date last updated above and applies to all 
              information collected by Marden SEO, LLC.
            </em>
          </p>
        </Card>
      </div>
    </main>
  );
};

export default PrivacyPolicy;