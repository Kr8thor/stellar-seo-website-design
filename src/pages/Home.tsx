
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Zap, Award, Globe2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="SEO optimization workspace" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="heading-xl mb-6">
              Strategic SEO Solutions for Digital Success
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
              Elevate your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Get a Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="h-8 w-8 border-b-2 border-r-2 border-primary rotate-45"></div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24 animate-fade-in">
          <h2 className="heading-lg mb-4">Services That Deliver Results</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive SEO strategies tailored to your specific business needs to achieve sustainable growth and increased visibility.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: <Search className="h-10 w-10" />,
              title: "On-Page SEO",
              description: "Optimize your content, meta tags, URLs, and internal linking for maximum search engine visibility."
            },
            {
              icon: <Globe2 className="h-10 w-10" />,
              title: "Off-Page SEO",
              description: "Build authoritative backlinks and enhance your online reputation through strategic outreach."
            },
            {
              icon: <Zap className="h-10 w-10" />,
              title: "Technical SEO",
              description: "Ensure your website's technical foundation is solid for improved crawling and indexing."
            },
            {
              icon: <BarChart3 className="h-10 w-10" />,
              title: "SEO Audit & Analysis",
              description: "Comprehensive assessment of your website's current SEO performance and areas for improvement."
            },
            {
              icon: <Users className="h-10 w-10" />,
              title: "Local SEO",
              description: "Boost your local visibility to attract more customers from your geographic target areas."
            },
            {
              icon: <Award className="h-10 w-10" />,
              title: "Content Strategy",
              description: "Develop SEO-optimized content that engages readers and ranks well in search results."
            },
          ].map((service, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-6 text-primary">{service.icon}</div>
              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link 
                to="/services" 
                className="inline-flex items-center text-sm font-medium hover-underline"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section className="bg-accent/30 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                alt="SEO case study results" 
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="heading-lg mb-6">Case Study: 300% Traffic Growth</h2>
              <p className="text-lg mb-6">
                Discover how a targeted SEO strategy helped a B2B SaaS company triple their organic traffic in just 6 months, leading to a significant boost in qualified leads and conversions.
              </p>
              <div className="flex flex-wrap gap-y-6 gap-x-12 mb-8">
                <div>
                  <p className="text-3xl font-heading font-medium">300%</p>
                  <p className="text-muted-foreground">Traffic Increase</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-medium">+205</p>
                  <p className="text-muted-foreground">Keyword Rankings</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-medium">4.5x</p>
                  <p className="text-muted-foreground">ROI</p>
                </div>
              </div>
              <Button asChild>
                <Link to="/portfolio">Read Case Study</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="heading-lg mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about my SEO services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "Working with this SEO expert has completely transformed our online presence. Our site now ranks on the first page for multiple competitive keywords.",
              name: "Sarah Johnson",
              title: "Marketing Director, TechCorp"
            },
            {
              quote: "The level of expertise and attention to detail is outstanding. We've seen a 250% increase in organic traffic within 4 months of implementing the recommended strategies.",
              name: "Michael Zhang",
              title: "CEO, Growth Ventures"
            },
            {
              quote: "Not only did we achieve better rankings, but the quality of traffic has improved significantly, resulting in higher conversion rates and better ROI.",
              name: "Amanda Peters",
              title: "Founder, Creative Solutions"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-6 text-accent-foreground">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12H8.1C7.0401 12 6 13.0401 6 14.1V21C6 22.0599 7.0401 23.1 8.1 23.1H12.9C14.0057 23.1 14.9 24.0486 14.9 25.2C14.9 26.3514 14.0057 27.3 12.9 27.3H12M30 12H23.1C22.0401 12 21 13.0401 21 14.1V21C21 22.0599 22.0401 23.1 23.1 23.1H27.9C29.0057 23.1 29.9 24.0486 29.9 25.2C29.9 26.3514 29.0057 27.3 27.9 27.3H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-lg mb-8 italic">{testimonial.quote}</p>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-lg mb-6">Ready to Improve Your Search Rankings?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Let's work together to create an SEO strategy that drives real business results.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get Your Free SEO Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
