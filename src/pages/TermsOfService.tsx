import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  useSEO({
    title: 'Terms of Service | Marden SEO, LLC',
    description: 'Terms of service and conditions for using Marden SEO, LLC professional services.',
    keywords: ['terms of service', 'terms and conditions', 'legal', 'marden seo'],
    canonicalUrl: 'https://mardenseo.com/terms-of-service'
  });

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="p-8 prose prose-gray max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using the services provided by Marden SEO, LLC ("Company", "we", "our", or "us"), 
            you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
            please do not use our services.
          </p>

          <h2>2. Company Information</h2>
          <p>
            Marden SEO, LLC is a Wyoming registered limited liability company providing professional SEO services, 
            custom application development, and workflow automation solutions.
          </p>

          <h2>3. Services Provided</h2>
          <p>We offer the following services:</p>
          <ul>
            <li>Search Engine Optimization (SEO) consulting and implementation</li>
            <li>Custom web application development</li>
            <li>Workflow automation solutions</li>
            <li>Digital marketing consultation</li>
            <li>Website analytics and reporting</li>
          </ul>

          <h2>4. Payment Terms</h2>
          <ul>
            <li><strong>Payment Processing:</strong> All payments are processed securely through Stripe</li>
            <li><strong>Recurring Services:</strong> Monthly services will automatically renew unless cancelled</li>
            <li><strong>One-time Services:</strong> Payment is due in full before work begins</li>
            <li><strong>Refunds:</strong> Subject to our Refund Policy</li>
            <li><strong>Taxes:</strong> You are responsible for any applicable taxes</li>
          </ul>

          <h2>5. Service Delivery</h2>
          <ul>
            <li>Project timelines are estimates and may vary based on complexity</li>
            <li>We require reasonable access to your website and relevant accounts</li>
            <li>Client cooperation is essential for successful project completion</li>
            <li>We reserve the right to refuse service for any reason</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            Upon full payment, you retain ownership of custom work product created specifically for you. 
            We retain rights to our methodologies, tools, and general know-how. Any pre-existing intellectual 
            property remains our property.
          </p>

          <h2>7. Confidentiality</h2>
          <p>
            We respect your confidentiality and will not share your business information with third parties 
            except as necessary to provide services or as required by law.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Our total liability for any claims arising from our services is limited to the amount paid for 
            the specific service. We are not liable for indirect, incidental, or consequential damages.
          </p>

          <h2>9. Service Guarantees</h2>
          <p>
            While we employ best practices and industry standards, we cannot guarantee specific SEO rankings 
            or traffic increases as these depend on many factors beyond our control, including search engine 
            algorithm changes.
          </p>

          <h2>10. Termination</h2>
          <p>
            Either party may terminate services with 30 days written notice. Upon termination, you will 
            receive all work product completed to date, and fees will be prorated accordingly.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Wyoming, United States. Any disputes will 
            be resolved in Wyoming courts.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on our website 
            and take effect immediately. Continued use of our services constitutes acceptance of updated Terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
            <br />
            Email: contact@mardenseo.com
            <br />
            Business: Marden SEO, LLC
            <br />
            Jurisdiction: Wyoming, United States
          </p>

          <p className="text-sm text-gray-600 mt-8">
            <em>
              These Terms of Service are effective as of the date last updated above and apply to all 
              services provided by Marden SEO, LLC.
            </em>
          </p>
        </Card>
      </div>
    </main>
  );
};

export default TermsOfService;