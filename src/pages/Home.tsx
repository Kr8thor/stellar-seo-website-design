
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Zap, Award, Globe2, Users, FileSearch, TrendingUp, CheckCircle } from 'lucide-react';
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
      
      {/* Redesigned SEO Audit Teaser Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-16 md:py-20 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center bg-card/10 backdrop-blur-sm border border-border/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="inline-block bg-accent/20 text-accent-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Exclusive Offer
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Complete SEO Audit</h2>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  Discover exactly what's holding your website back from ranking higher and converting better.
                </p>
                
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Technical Analysis",
                    "Keyword Opportunities",
                    "Competitor Strategy",
                    "Content Assessment",
                    "Page Speed Insights",
                    "Mobile Optimization"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-accent/20 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Launch Date:</span>
                    <span>May 1st, 2025</span>
                  </div>
                  <div className="animate-pulse text-center font-semibold">
                    Limited Spots Available!
                  </div>
                </div>
                
                <Button asChild size="lg" variant="secondary" className="w-full">
                  <a href="/contact#top">Reserve Your Free Audit Now</a>
                </Button>
              </div>
              
              <div className="md:w-1/2 bg-gradient-to-br from-primary-foreground/5 to-primary-foreground/20 p-8 md:p-12 relative">
                <div className="absolute -top-6 -left-6 bg-accent/20 p-4 rounded-lg backdrop-blur-sm border border-accent/30 shadow-xl hidden md:block">
                  <FileSearch className="h-10 w-10" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent/20 p-4 rounded-lg backdrop-blur-sm border border-accent/30 shadow-xl hidden md:block">
                  <TrendingUp className="h-10 w-10" />
                </div>
                
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">What You'll Receive:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-accent/20 p-2 rounded-full mt-1">
                        <Search className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Comprehensive SEO Report</h4>
                        <p className="text-sm opacity-80">A detailed analysis of your website's current SEO performance with actionable recommendations.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-accent/20 p-2 rounded-full mt-1">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Competitor Insights</h4>
                        <p className="text-sm opacity-80">See what's working for your top competitors and how you can outperform them.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-accent/20 p-2 rounded-full mt-1">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">30-Minute Strategy Call</h4>
                        <p className="text-sm opacity-80">Discuss your results and next steps with an SEO expert to maximize your growth potential.</p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <p className="italic">"The insights from this audit completely transformed our approach to SEO."</p>
                    <p className="text-sm mt-2">— Previous Client</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <Button asChild>
                <Link to="/portfolio">Read Case Study</Link>
              </Button>
            </div>
          </div>
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
            <a href="/contact#top">Get Your Free SEO Consultation</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
