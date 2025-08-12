import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card } from '@/components/ui/card';

const RefundPolicy = () => {
  useSEO({
    title: 'Refund Policy | Marden SEO, LLC',
    description: 'Refund and cancellation policy for Marden SEO, LLC professional services.',
    keywords: ['refund policy', 'cancellation', 'money back guarantee', 'marden seo'],
    canonicalUrl: 'https://mardenseo.com/refund-policy'
  });

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="p-8 prose prose-gray max-w-none">
          <h2>1. Overview</h2>
          <p>
            At Marden SEO, LLC, we strive to provide exceptional service and value. This Refund Policy 
            outlines our practices regarding refunds and cancellations for our various service offerings.
          </p>

          <h2>2. Service Categories</h2>
          
          <h3>2.1 Recurring SEO Services (Monthly/Yearly)</h3>
          <ul>
            <li><strong>Trial Period:</strong> 30-day satisfaction guarantee for new clients</li>
            <li><strong>Cancellation:</strong> Cancel anytime with 30 days written notice</li>
            <li><strong>Prorated Refunds:</strong> Unused portions will be refunded within the first 30 days</li>
            <li><strong>No Refund After 30 Days:</strong> Services rendered are non-refundable after the trial period</li>
          </ul>

          <h3>2.2 One-Time SEO Projects</h3>
          <ul>
            <li><strong>Initial Consultation:</strong> Free of charge - no refund needed</li>
            <li><strong>Project Deposits:</strong> 50% deposit required to begin work</li>
            <li><strong>Refund Window:</strong> 7 days after project start for deposit refund</li>
            <li><strong>Completed Work:</strong> Non-refundable once deliverables are provided</li>
          </ul>

          <h3>2.3 Custom App Development</h3>
          <ul>
            <li><strong>Milestone-Based:</strong> Payments tied to specific project milestones</li>
            <li><strong>Refund Policy:</strong> Refunds available for incomplete milestones only</li>
            <li><strong>Completed Milestones:</strong> Non-refundable once delivered and approved</li>
            <li><strong>Source Code:</strong> Delivered upon final payment completion</li>
          </ul>

          <h3>2.4 Workflow Automation Services</h3>
          <ul>
            <li><strong>Setup Fee:</strong> One-time setup fees are non-refundable once work begins</li>
            <li><strong>Monthly Management:</strong> Subject to 30-day satisfaction guarantee</li>
            <li><strong>Custom Automations:</strong> Refundable within 7 days if non-functional</li>
          </ul>

          <h2>3. Refund Eligibility</h2>
          
          <h3>3.1 Eligible for Full Refund</h3>
          <ul>
            <li>Service failure to meet agreed specifications within trial period</li>
            <li>Technical inability to deliver promised functionality</li>
            <li>Mutual agreement to terminate services early</li>
            <li>Our failure to communicate or provide access within 7 business days</li>
          </ul>

          <h3>3.2 Eligible for Partial Refund</h3>
          <ul>
            <li>Early termination of recurring services (prorated)</li>
            <li>Partially completed project milestones</li>
            <li>Scope reduction by client request</li>
          </ul>

          <h3>3.3 Not Eligible for Refund</h3>
          <ul>
            <li>Change of mind after work has commenced</li>
            <li>Failure to provide necessary access or cooperation</li>
            <li>External factors affecting SEO results (algorithm changes, competition)</li>
            <li>Services rendered in good faith according to agreed specifications</li>
            <li>Requests made after the applicable refund period</li>
          </ul>

          <h2>4. Refund Process</h2>
          
          <h3>4.1 How to Request a Refund</h3>
          <ol>
            <li>Email your refund request to contact@mardenseo.com</li>
            <li>Include your name, service details, and reason for refund</li>
            <li>Provide any relevant documentation or correspondence</li>
            <li>Allow 5-7 business days for review and response</li>
          </ol>

          <h3>4.2 Processing Timeline</h3>
          <ul>
            <li><strong>Review Period:</strong> 5-7 business days to assess request</li>
            <li><strong>Approval Notification:</strong> Written confirmation of refund decision</li>
            <li><strong>Processing Time:</strong> 3-5 business days to process approved refunds</li>
            <li><strong>Bank Processing:</strong> Additional 3-7 business days for funds to appear</li>
          </ul>

          <h2>5. Special Circumstances</h2>
          
          <h3>5.1 Force Majeure</h3>
          <p>
            In cases of events beyond our control (natural disasters, pandemics, etc.), we will work 
            with clients to reschedule or provide appropriate compensation.
          </p>

          <h3>5.2 Client-Caused Delays</h3>
          <p>
            Delays caused by client unavailability, lack of access, or slow response times do not 
            qualify for refunds and may result in additional charges.
          </p>

          <h3>5.3 Third-Party Service Issues</h3>
          <p>
            Issues with third-party platforms (Google, social media, hosting providers) that affect 
            our ability to deliver services may result in service credits rather than refunds.
          </p>

          <h2>6. Dispute Resolution</h2>
          <p>
            If you're unsatisfied with our refund decision, we encourage direct communication to resolve 
            the matter. As a Wyoming LLC, any legal disputes will be subject to Wyoming state law and 
            jurisdiction.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            For refund requests or questions about this policy:
            <br />
            Email: contact@mardenseo.com
            <br />
            Subject Line: "Refund Request - [Your Name]"
            <br />
            Business: Marden SEO, LLC
            <br />
            Response Time: Within 24-48 hours
          </p>

          <h2>8. Policy Updates</h2>
          <p>
            This Refund Policy may be updated periodically. Changes will be posted on our website and 
            take effect immediately. Existing service agreements will honor the policy in effect at 
            the time of purchase.
          </p>

          <p className="text-sm text-gray-600 mt-8">
            <em>
              This Refund Policy is designed to be fair to both our clients and our business. We're 
              committed to providing value and maintaining positive relationships with all our clients.
            </em>
          </p>
        </Card>
      </div>
    </main>
  );
};

export default RefundPolicy;