import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe2, Zap, BarChart3, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const Services = () => {
  const { SEOHelmet } = usePageSEO('services');
  
  const services = [
    {
      icon: <Search className="h-12 w-12" />,
      title: "Technical SEO",
      description: "Optimize your website's technical foundation for better crawling, indexing, and performance.",
      features: ["Site Speed Optimization", "Mobile Optimization", "Schema Markup", "XML Sitemaps"]
    },
    {
      icon: <Globe2 className="h-12 w-12" />,
      title: "On-Page SEO",
      description: "Optimize individual pages to rank higher and earn more relevant traffic from search engines.",
      features: ["Keyword Research", "Content Optimization", "Meta Tags", "Internal Linking"]
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Off-Page SEO",
      description: "Build authority and trust through strategic link building and brand mentions.",
      features: ["Link Building", "Digital PR", "Brand Mentions", "Citation Building"]
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "SEO Audits",
      description: "Comprehensive analysis of your website's SEO performance with actionable recommendations.",
      features: ["Technical Analysis", "Competitor Research", "Keyword Gaps", "Action Plans"]
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Local SEO",
      description: "Dominate local search results and attract more customers from your geographic area.",
      features: ["Google Business Profile", "Local Citations", "Review Management", "Local Content"]
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Content Strategy",
      description: "Create and optimize content that ranks well and engages your target audience.",
      features: ["Content Planning", "Topic Research", "Content Optimization", "Performance Tracking"]
    }
  ];
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Comprehensive SEO Services</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                Complete SEO solutions to boost your organic traffic, improve rankings, and drive measurable business results.
              </p>
            </div>
          </div>
        </section>
        
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="text-primary mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="inline-flex items-center text-primary font-medium hover:underline">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Why Choose Our SEO Services?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Successful Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">300%</div>
                  <p className="text-muted-foreground">Average Traffic Increase</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="heading-lg mb-6">Ready to Boost Your Rankings?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free SEO consultation and discover how we can help your business dominate search results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services-pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;