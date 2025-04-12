
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ServiceTeasers = () => {
  const services = [
    {
      title: "SEO Transformation Package",
      description: "A comprehensive SEO strategy enhanced by AI analysis that identifies untapped opportunities your competitors are missing. Includes proprietary ranking techniques refined over half a decade.",
      link: "/services",
      linkText: "Learn More"
    },
    {
      title: "AI Business Automation",
      description: "Custom AI solutions that integrate with your business processes, automating repetitive tasks and uncovering insights that drive growth. Future-proof your operations with cutting-edge technology.",
      link: "/app-building",
      linkText: "Discover Possibilities"
    }
  ];

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h2 className="heading-md mb-4">Transform Your Digital Presence</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Exclusive AI-powered SEO solutions designed for businesses seeking exceptional results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-card p-8 rounded-lg border border-border/50">
            <h3 className="font-heading text-xl mb-4">{service.title}</h3>
            <p className="text-muted-foreground mb-6">
              {service.description}
            </p>
            <Button asChild variant="outline">
              <Link to={service.link}>{service.linkText}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceTeasers;
