import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Search, Globe2, BarChart3, Zap, Users, FileText } from 'lucide-react';

const Services = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="heading-lg mb-6">SEO Services</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive search engine optimization services designed to improve your visibility, drive qualified traffic, and increase conversions.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* On-Page SEO */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="text-primary mb-4">
                  <Search className="h-12 w-12" />
                </div>
                <h2 className="heading-md mb-6">On-Page SEO</h2>
                <p className="mb-6">
                  Optimize your website's content and structure to improve relevance and visibility for your target keywords and provide a better user experience.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Comprehensive keyword research and mapping",
                    "Content optimization for target keywords",
                    "Meta title and description optimization",
                    "Heading structure improvements",
                    "Internal linking strategy",
                    "Image optimization with proper alt text",
                    "Schema markup implementation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a" 
                  alt="On-Page SEO" 
                  className="rounded-lg w-full h-auto" 
                />
              </div>
            </div>
          </div>
          
          {/* Off-Page SEO */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="md:w-1/2">
                <div className="text-primary mb-4">
                  <Globe2 className="h-12 w-12" />
                </div>
                <h2 className="heading-md mb-6">Off-Page SEO</h2>
                <p className="mb-6">
                  Build your website's authority and reputation through strategic outreach and high-quality backlink acquisition.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Competitor backlink analysis",
                    "Strategic link building outreach",
                    "Guest posting opportunities",
                    "Brand mention monitoring",
                    "Social media profile optimization",
                    "Local citation building",
                    "Online reputation management"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e" 
                  alt="Off-Page SEO" 
                  className="rounded-lg w-full h-auto" 
                />
              </div>
            </div>
          </div>
          
          {/* Technical SEO */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="text-primary mb-4">
                  <Zap className="h-12 w-12" />
                </div>
                <h2 className="heading-md mb-6">Technical SEO</h2>
                <p className="mb-6">
                  Ensure your website's technical foundation is solid to improve crawlability, indexation, and overall search performance.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Comprehensive technical SEO audit",
                    "Site architecture optimization",
                    "Page speed improvements",
                    "Mobile-friendliness enhancement",
                    "XML sitemap optimization",
                    "Robots.txt configuration",
                    "Structured data implementation",
                    "HTTP status code fixes",
                    "Duplicate content resolution",
                    "Canonical tag implementation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31" 
                  alt="Technical SEO" 
                  className="rounded-lg w-full h-auto" 
                />
              </div>
            </div>
          </div>
          
          {/* Other Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Local SEO */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-primary mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="font-heading text-xl mb-3">Local SEO</h3>
              <p className="text-muted-foreground mb-6">
                Improve your local search visibility to attract more customers from your target geographic areas.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Google Business Profile optimization",
                  "Local citation building and management",
                  "Local keyword research and targeting",
                  "Review acquisition strategy",
                  "Local link building"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
            
            {/* SEO Audit */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-primary mb-4">
                <BarChart3 className="h-10 w-10" />
              </div>
              <h3 className="font-heading text-xl mb-3">SEO Audit & Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Comprehensive assessment of your website's current SEO performance with actionable recommendations.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Full-site technical SEO audit",
                  "Content quality assessment",
                  "Backlink profile analysis",
                  "Competitor analysis",
                  "Detailed recommendations and priority list"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
            
            {/* Content Strategy */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-primary mb-4">
                <FileText className="h-10 w-10" />
              </div>
              <h3 className="font-heading text-xl mb-3">Content Strategy</h3>
              <p className="text-muted-foreground mb-6">
                Develop and implement a content strategy that attracts, engages, and converts your target audience.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Content gap analysis",
                  "Topic cluster development",
                  "Content calendar creation",
                  "SEO content briefs",
                  "Content performance tracking"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">My SEO Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A strategic, results-driven approach to improving your search visibility and driving organic growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Discovery & Analysis",
              description: "Comprehensive audit of your website, competitors, and target audience to identify opportunities."
            },
            {
              step: "02",
              title: "Strategy Development",
              description: "Creation of a customized SEO roadmap based on your specific goals and industry landscape."
            },
            {
              step: "03",
              title: "Implementation",
              description: "Execution of on-page, off-page, and technical SEO tactics according to strategic priorities."
            },
            {
              step: "04",
              title: "Monitoring & Refinement",
              description: "Continuous tracking, reporting, and optimization to ensure sustainable growth and ROI."
            }
          ].map((process, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-accent-foreground font-heading text-5xl mb-4">{process.step}</div>
              <h3 className="font-heading text-xl mb-3">{process.title}</h3>
              <p className="text-muted-foreground">{process.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4">Pricing Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible options designed to meet your specific needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              <h3 className="font-heading text-xl mb-2">SEO Essentials</h3>
              <p className="text-muted-foreground mb-6">Perfect for small businesses looking to improve their local visibility.</p>
              <div className="mb-6 relative">
                <span className="font-heading text-4xl relative">
                  <span className="relative">
                    <span className="line-through decoration-red-500 decoration-2">$1,200</span>
                  </span>
                </span>
                <span className="text-muted-foreground">/month</span>
                <div className="mt-2">
                  <span className="font-['Caveat'] text-2xl text-primary">Only $245 until July 31st!</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Keyword research and optimization",
                  "On-page SEO for up to 10 pages",
                  "Basic technical SEO audit",
                  "Google Business Profile optimization",
                  "Monthly performance reporting",
                  "One content piece per month"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-card p-8 rounded-lg border-2 border-primary shadow-lg relative transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="font-heading text-xl mb-2">SEO Professional</h3>
              <p className="text-muted-foreground mb-6">Comprehensive SEO for growing businesses seeking significant improvement.</p>
              <div className="mb-6 relative">
                <span className="font-heading text-4xl relative">
                  <span className="relative">
                    <span className="line-through decoration-red-500 decoration-2">$2,500</span>
                  </span>
                </span>
                <span className="text-muted-foreground">/month</span>
                <div className="mt-2">
                  <span className="font-['Caveat'] text-2xl text-primary">Only $395 until July 31st!</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Everything in SEO Essentials plus:",
                  "On-page SEO for up to 25 pages",
                  "Comprehensive technical SEO",
                  "Competitive backlink acquisition",
                  "Content strategy development",
                  "Three content pieces per month",
                  "Conversion rate optimization"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300">
              <h3 className="font-heading text-xl mb-2">SEO Enterprise</h3>
              <p className="text-muted-foreground mb-6">For larger businesses with complex needs and competitive industries.</p>
              <div className="mb-6">
                <span className="font-heading text-4xl">Custom</span>
                <span className="text-muted-foreground"> pricing</span>
              </div>
              <ul className="space-y-2 mb-8">
                {[
                  "Everything in SEO Professional plus:",
                  "Unlimited page optimization",
                  "Advanced technical SEO",
                  "International SEO strategy",
                  "Enterprise-level link building",
                  "Custom content strategy",
                  "Dedicated SEO consultant",
                  "Weekly reporting and strategy calls"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/contact">Contact for Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-md mb-6">Ready to Boost Your Search Rankings?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Schedule your free 30-minute consultation to discuss your SEO goals and how I can help you achieve them.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Book Your Free Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Services;
