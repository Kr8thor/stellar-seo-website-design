
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Zap, Award, Globe2, Users, FileSearch, TrendingUp, CheckCircle, Calendar, Gift, Clock, Workflow } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEOWithKey, PAGE_KEYS } from '@/hooks/useSEO';
import { handleAnchorClick } from '@/utils/scrollUtils';
import { ReviewSection } from '@/components';
import CalendlyButton from '@/components/common/CalendlyButton';

const Home = () => {
  // 🎯 COMPREHENSIVE SEO IMPLEMENTATION - Enhanced meta descriptions and keywords
  useSEOWithKey(PAGE_KEYS.home);
  return <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Professional SEO optimization workspace showing analytics dashboards and search engine results" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
        </div>
        
        {/* Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-5">
          <img 
            src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
            alt="" 
            className="w-96 h-96 object-contain"
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="heading-xl mb-6">
              Marden SEO - Strategic SEO Solutions for Digital Success
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
              Marden SEO elevates your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Get a Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:opacity-90">
                <Link to="/workflow-automation" className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  <span>Automate Your Business with n8n</span>
                </Link>
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
          {[{
          icon: <Search className="h-10 w-10" />,
          title: "On-Page SEO",
          description: "Optimize your content, meta tags, URLs, and internal linking for maximum search engine visibility."
        }, {
          icon: <Globe2 className="h-10 w-10" />,
          title: "Off-Page SEO",
          description: "Build authoritative backlinks and enhance your online reputation through strategic outreach."
        }, {
          icon: <Zap className="h-10 w-10" />,
          title: "Technical SEO",
          description: "Ensure your website's technical foundation is solid for improved crawling and indexing."
        }, {
          icon: <BarChart3 className="h-10 w-10" />,
          title: "SEO Audit & Analysis",
          description: "Comprehensive assessment of your website's current SEO performance and areas for improvement."
        }, {
          icon: <Users className="h-10 w-10" />,
          title: "Local SEO",
          description: "Boost your local visibility to attract more customers from your geographic target areas."
        }, {
          icon: <Award className="h-10 w-10" />,
          title: "Content Strategy",
          description: "Develop SEO-optimized content that engages readers and ranks well in search results."
        }].map((service, index) => <div key={index} className="bg-card p-8 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="mb-6 text-primary">{service.icon}</div>
              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Link to="/services" className="inline-flex items-center text-sm font-medium hover-underline">
                Learn more about {service.title} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>)}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>
      
      {/* Reviews Section */}
      <ReviewSection />
      
      {/* Redesigned SEO Audit Teaser Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Colorful Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-amber-50">
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(124, 58, 237, 0.5)" />
                  <stop offset="70%" stopColor="rgba(236, 72, 153, 0.3)" />
                  <stop offset="100%" stopColor="rgba(245, 158, 11, 0.2)" />
                </radialGradient>
              </defs>
              <path d="M0 0 Q50 100 100 0 L100 100 0 100" fill="url(#radialGradient)" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white inline-block mb-4 animate-pulse">
              Limited Time Opportunity
            </span>
            <h2 className="heading-lg font-bold text-gradient-purple mb-2">Free Complete SEO Audit</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover what's holding your website back from ranking higher and converting better.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden relative transform hover:scale-[1.01] transition-all duration-300">
              
              
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left Column */}
                  <div className="lg:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-xl shadow-lg">
                        <Gift className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Exclusive Offer</h3>
                        <p className="text-gray-600">For business owners serious about growth</p>
                      </div>
                    </div>
                    
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Technical Analysis", "Keyword Opportunities", "Competitor Strategy", "Content Assessment", "Page Speed Insights", "Mobile Optimization"].map((item, idx) => <div key={idx} className="flex items-center gap-2 group">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full group-hover:scale-110 transition-all duration-300">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>)}
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg mb-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-gray-700">Launch Date:</span>
                        </span>
                        <span className="font-semibold text-purple-800">June 1st, 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-gray-700">Status:</span>
                        </span>
                        <span className="font-semibold animate-pulse text-pink-600">Only 50 Spots Left</span>
                      </div>
                    </div>
                    
                    <Button asChild size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <a href="/contact" onClick={(e) => handleAnchorClick('/contact#top', e)}>
                        Reserve Your Free Audit Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                  
                  {/* Right Column */}
                  <div className="lg:w-1/2 bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 relative">
                    {/* Trust signal logo */}
                    <div className="absolute top-6 right-6 opacity-20">
                      <img 
                        src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
                        alt="" 
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    
                    <div className="bg-white/70 backdrop-blur-sm border border-purple-100 p-6 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-purple-100 pb-4">
                        What You'll Receive:
                      </h3>
                      <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full flex-shrink-0 shadow-md">
                            <Search className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Comprehensive SEO Report</h4>
                            <p className="text-gray-600">A detailed analysis of your website's current SEO performance with specific, actionable recommendations.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-pink-600 to-amber-500 p-3 rounded-full flex-shrink-0 shadow-md">
                            <BarChart3 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Competitor Insights</h4>
                            <p className="text-gray-600">See what's working for your top competitors and how you can strategically outperform them.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-amber-500 to-purple-600 p-3 rounded-full flex-shrink-0 shadow-md">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Action Plan</h4>
                            <p className="text-gray-600">Detailed advice on what you need to do next. </p>
                          </div>
                        </li>
                      </ul>
                      
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Case Study */}
      <section className="bg-accent/30 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 relative">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" alt="SEO case study results" className="w-full h-96 object-cover rounded-lg" />
              {/* Brand signature */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                <img 
                  src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
                  alt="Marden SEO" 
                  className="w-8 h-8 object-contain opacity-60"
                />
              </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary">
              <a href="/contact#top">Get Your Free SEO Consultation</a>
            </Button>
            <CalendlyButton 
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              calendlyUrl={import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/marden-seo/30min'}
            >
              Schedule a Call
            </CalendlyButton>
          </div>
        </div>
      </section>
    </main>;
};
export default Home;
