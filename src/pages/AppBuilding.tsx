import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const AppBuilding = () => {
  const { SEOHelmet } = usePageSEO('app-building');
  
  const services = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "React Web Applications",
      description: "Custom React applications built with modern technologies for optimal performance and user experience.",
      features: ["React 18+", "TypeScript", "Responsive Design", "SEO Optimized"]
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["React Native", "iOS & Android", "App Store Optimization", "Push Notifications"]
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Progressive Web Apps",
      description: "Fast, reliable web applications that work offline and provide app-like experiences.",
      features: ["Offline Functionality", "App-like Experience", "Fast Loading", "Cross-Platform"]
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: "Full-Stack Development",
      description: "Complete application development from frontend to backend with modern technologies.",
      features: ["Node.js Backend", "Database Design", "API Development", "Cloud Deployment"]
    }
  ];
  
  const technologies = [
    "React", "TypeScript", "Next.js", "Node.js", "Express", "MongoDB", 
    "PostgreSQL", "AWS", "Docker", "GraphQL", "REST APIs", "Firebase"
  ];
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Custom App Development</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                Professional React and mobile app development services to bring your ideas to life with modern, scalable solutions.
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
                      Get Started <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-lg text-center mb-12">Technologies We Use</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="bg-background border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg mb-6">Why Choose Our App Development?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Modern Technologies</h3>
                      <p className="text-muted-foreground">Built with the latest frameworks and best practices for optimal performance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">SEO Optimized</h3>
                      <p className="text-muted-foreground">Every app is built with SEO in mind to maximize search visibility.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Scalable Architecture</h3>
                      <p className="text-muted-foreground">Designed to grow with your business and handle increased traffic.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Ongoing Support</h3>
                      <p className="text-muted-foreground">Continuous maintenance and updates to keep your app running smoothly.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" 
                  alt="Modern app development workspace" 
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="heading-lg mb-6">Ready to Build Your App?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your app idea and create a custom solution that drives results for your business.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AppBuilding;