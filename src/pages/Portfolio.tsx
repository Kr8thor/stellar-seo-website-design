import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Globe2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const Portfolio = () => {
  const { SEOHelmet } = usePageSEO('portfolio');
  
  const caseStudies = [
    {
      title: "E-commerce SEO Success",
      client: "Fashion Retailer",
      industry: "E-commerce",
      results: {
        traffic: "+300%",
        rankings: "#1 for 25 keywords",
        revenue: "+150%"
      },
      description: "Transformed an online fashion retailer's SEO strategy, resulting in triple the organic traffic and significant revenue growth.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc"
    },
    {
      title: "Local SEO Domination",
      client: "Dental Practice",
      industry: "Healthcare",
      results: {
        traffic: "+250%",
        rankings: "#1 local results",
        leads: "+180%"
      },
      description: "Helped a dental practice dominate local search results and significantly increase patient appointments.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
    },
    {
      title: "B2B SaaS Growth",
      client: "Software Company",
      industry: "Technology",
      results: {
        traffic: "+400%",
        rankings: "Top 3 for target keywords",
        leads: "+220%"
      },
      description: "Implemented comprehensive SEO strategy for a B2B SaaS company, dramatically increasing qualified leads.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    }
  ];
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">SEO Success Stories</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                Real results from real clients - see how our proven SEO strategies drive measurable business growth.
              </p>
            </div>
          </div>
        </section>
        
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img 
                        src={study.image} 
                        alt={`${study.title} case study results`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 lg:p-12">
                      <div className="mb-4">
                        <span className="text-sm text-primary font-medium">{study.industry}</span>
                        <h3 className="text-2xl font-bold mt-2 mb-3">{study.title}</h3>
                        <p className="text-muted-foreground mb-6">{study.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{study.results.traffic}</div>
                          <div className="text-sm text-muted-foreground">Traffic Growth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{study.results.rankings}</div>
                          <div className="text-sm text-muted-foreground">Rankings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{study.results.revenue || study.results.leads}</div>
                          <div className="text-sm text-muted-foreground">{study.results.revenue ? 'Revenue Growth' : 'Lead Growth'}</div>
                        </div>
                      </div>
                      
                      <Button asChild variant="outline">
                        <Link to="/contact">
                          Get Similar Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-6">Success by the Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">300%</div>
                  <p className="text-sm text-muted-foreground">Average Traffic Increase</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center">
                  <Globe2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">#1</div>
                  <p className="text-sm text-muted-foreground">Rankings Achieved</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="heading-lg mb-6">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create the next SEO success story together. Get your free consultation today.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Start Your Success Story</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Portfolio;