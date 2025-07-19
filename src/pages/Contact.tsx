import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const Contact = () => {
  const { SEOHelmet } = usePageSEO('contact');
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">Contact Marden SEO</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                Ready to boost your rankings? Get your free SEO consultation and website audit today.
              </p>
            </div>
          </div>
        </section>
        
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get Your Free SEO Audit</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover what's holding your website back from ranking higher. Our comprehensive SEO audit includes technical analysis, keyword opportunities, and a custom action plan.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-muted-foreground">hello@mardenseo.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Service Areas</h3>
                      <p className="text-muted-foreground">Worldwide - Remote SEO Services</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Request Your Free Audit</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-2">Website URL *</label>
                      <input 
                        type="url" 
                        id="website" 
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="goals" className="block text-sm font-medium mb-2">SEO Goals</label>
                      <textarea 
                        id="goals" 
                        rows={4}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="What are your main SEO goals? (e.g., increase traffic, improve rankings, generate leads)"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full">
                      Get My Free SEO Audit
                    </Button>
                  </form>
                  
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    We'll send you a comprehensive SEO report within 48 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg mb-6">What Happens Next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Free SEO Audit</h3>
                  <p className="text-muted-foreground">We analyze your website and identify optimization opportunities.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Strategy Session</h3>
                  <p className="text-muted-foreground">We discuss your goals and create a custom SEO strategy.</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Start Growing</h3>
                  <p className="text-muted-foreground">Begin implementing proven SEO tactics that drive results.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;