import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp, Globe2, Clock, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const About = () => {
  const { SEOHelmet } = usePageSEO('about');
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">About Marden SEO</h1>
              <p className="text-xl md:text-2xl mb-12 text-muted-foreground">
                Your trusted partner in SEO success with proven expertise and innovative strategies.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg mb-6">Expert SEO Team</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  With over 10 years of combined experience in search engine optimization, 
                  our team brings deep expertise in technical SEO, content strategy, and 
                  data-driven marketing approaches.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Proven track record with 500+ successful projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Google certified SEO professionals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Continuous education in latest SEO trends</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                  alt="SEO team collaboration and strategy planning" 
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Our Methodology</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Data-driven SEO strategies that deliver measurable results for businesses of all sizes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Analysis & Strategy</h3>
                  <p className="text-muted-foreground">
                    Comprehensive SEO audit and competitive analysis to identify opportunities and develop custom strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Implementation</h3>
                  <p className="text-muted-foreground">
                    Execute proven SEO tactics including technical optimization, content creation, and link building campaigns.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Results & Optimization</h3>
                  <p className="text-muted-foreground">
                    Monitor performance, analyze data, and continuously optimize strategies to maximize ROI and rankings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="heading-lg mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our proven SEO methodology can help your business achieve sustainable growth.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Get Your Free Consultation</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;