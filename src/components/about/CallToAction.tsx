
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="heading-md mb-6">Ready to Elevate Your Digital Strategy?</h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
          Let's discuss how AI-powered SEO can transform your business visibility and results.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/contact">Schedule a Strategy Session</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
