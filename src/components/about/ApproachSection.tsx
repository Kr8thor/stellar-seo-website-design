
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const ApproachSection = () => {
  const approachItems = [
    "In-depth AI-powered analysis of your current SEO performance",
    "Custom strategies based on your specific business goals and market position",
    "Focus on both quick wins and long-term sustainable growth through automation",
    "Advanced predictive analytics that guide decisions before competitors catch on",
    "Transparent communication throughout our partnership",
    "Continuous optimization using AI-driven insights and performance data"
  ];

  const stats = [
    { value: "5+", label: "Years of Expertise" },
    { value: "200+", label: "Projects Completed" },
    { value: "85%", label: "Results Above Target" },
    { value: "24/7", label: "AI Automation" }
  ];

  return (
    <section className="bg-accent/30 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="heading-md mb-6">My Approach</h2>
            <p className="mb-6">
              I believe in combining ethical SEO strategies with powerful AI technologies to create solutions that align with search engine guidelines while delivering exceptional value to users. My approach focuses on sustainable growth and measurable results.
            </p>
            
            <ul className="space-y-4 mb-8">
              {approachItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild>
              <Link to="/services">Explore My Services</Link>
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
