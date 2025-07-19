import React from 'react';
import { usePageSEO } from '@/hooks/useSEO';

const ServicesAndPricing = () => {
  const { SEOHelmet } = usePageSEO('services-pricing');
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="heading-xl mb-6">SEO Services & Pricing</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Transparent SEO pricing with clear deliverables and guaranteed results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg border">
                <h3 className="text-2xl font-bold mb-4">SEO Audit</h3>
                <p className="text-3xl font-bold text-primary mb-4">$497</p>
                <p className="text-muted-foreground mb-6">
                  Comprehensive website analysis with actionable recommendations.
                </p>
                <ul className="space-y-2 mb-8">
                  <li>✓ Technical SEO analysis</li>
                  <li>✓ Keyword research</li>
                  <li>✓ Competitor analysis</li>
                  <li>✓ Action plan</li>
                </ul>
              </div>
              
              <div className="bg-card p-8 rounded-lg border border-primary">
                <h3 className="text-2xl font-bold mb-4">Monthly SEO</h3>
                <p className="text-3xl font-bold text-primary mb-4">$1,997/mo</p>
                <p className="text-muted-foreground mb-6">
                  Ongoing SEO optimization and content strategy.
                </p>
                <ul className="space-y-2 mb-8">
                  <li>✓ On-page optimization</li>
                  <li>✓ Content creation</li>
                  <li>✓ Link building</li>
                  <li>✓ Monthly reporting</li>
                </ul>
              </div>
              
              <div className="bg-card p-8 rounded-lg border">
                <h3 className="text-2xl font-bold mb-4">Enterprise SEO</h3>
                <p className="text-3xl font-bold text-primary mb-4">Custom</p>
                <p className="text-muted-foreground mb-6">
                  Custom SEO solutions for large organizations.
                </p>
                <ul className="space-y-2 mb-8">
                  <li>✓ Custom strategy</li>
                  <li>✓ Dedicated team</li>
                  <li>✓ Advanced reporting</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesAndPricing;