
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 animate-fade-in">
            <h1 className="heading-lg mb-6">About Me</h1>
            <p className="text-xl text-muted-foreground mb-6">
              I'm a data-driven SEO specialist with half a decade of experience helping businesses achieve sustainable growth through strategic search engine optimization and AI-powered solutions.
            </p>
            <p className="mb-8">
              My approach combines technical SEO expertise with AI strategy and user experience optimization to deliver measurable improvements in search visibility and organic traffic, leveraging cutting-edge artificial intelligence techniques.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/contact">Work With Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/portfolio">See My Results</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
              alt="SEO Specialist" 
              className="w-full h-auto rounded-lg object-cover" 
            />
          </div>
        </div>
      </section>
      
      {/* Expertise Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4">My Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With half a decade of experience and continuous learning in SEO and AI technologies, I bring specialized knowledge across multiple cutting-edge areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "AI-Enhanced SEO",
                description: "Implementing advanced AI models to analyze search patterns, optimize content, and boost rankings through machine learning insights."
              },
              {
                title: "Technical SEO",
                description: "Site architecture, speed optimization, mobile-friendliness, structured data implementation, and crawlability improvements."
              },
              {
                title: "Content Strategy",
                description: "AI-powered keyword research, content gap analysis, topic clustering, and creating search-optimized content that converts."
              },
              {
                title: "AI Integration",
                description: "Custom AI solutions to enhance your business workflows, automate processes, and gain competitive insights from your data."
              },
              {
                title: "Analytics & Reporting",
                description: "AI-powered dashboard creation, predictive analytics, conversion tracking, and actionable insights for continuous improvement."
              },
              {
                title: "E-E-A-T Optimization",
                description: "Enhancing your site's Experience, Expertise, Authoritativeness, and Trustworthiness signals using data-driven AI techniques."
              }
            ].map((expertise, index) => (
              <div 
                key={index} 
                className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-heading text-xl mb-3">{expertise.title}</h3>
                <p className="text-muted-foreground">{expertise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="heading-md mb-6">My Story</h2>
            <p className="mb-4">
              My journey in SEO and AI began five years ago with a fascination for how these technologies could dramatically impact business visibility and efficiency in the digital landscape.
            </p>
            <p className="mb-4">
              After mastering the fundamentals, I specialized in combining technical SEO with advanced AI solutions, working with clients across various industries to transform their digital presence.
            </p>
            <p className="mb-4">
              I'm passionate about staying at the cutting edge of AI advancements, continuously testing and implementing new technologies like large language models, predictive analytics, and automation tools to give my clients the competitive edge.
            </p>
            <p>
              Today, I work with select clients who are serious about leveraging both SEO and artificial intelligence to drive sustainable organic growth through innovative, future-proof strategies.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
              alt="SEO Strategy Meeting" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
        </div>
      </section>
      
      {/* Approach Section */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="heading-md mb-6">My Approach</h2>
              <p className="mb-6">
                I believe in combining ethical SEO strategies with powerful AI technologies to create solutions that align with search engine guidelines while delivering exceptional value to users. My approach focuses on sustainable growth and measurable results.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "In-depth AI-powered analysis of your current SEO performance",
                  "Custom strategies based on your specific business goals and market position",
                  "Focus on both quick wins and long-term sustainable growth through automation",
                  "Advanced predictive analytics that guide decisions before competitors catch on",
                  "Transparent communication throughout our partnership",
                  "Continuous optimization using AI-driven insights and performance data"
                ].map((item, index) => (
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
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">5+</p>
                  <p className="text-muted-foreground">Years of Expertise</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">99%</p>
                  <p className="text-muted-foreground">Client Satisfaction</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">200+</p>
                  <p className="text-muted-foreground">Projects Completed</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">85%</p>
                  <p className="text-muted-foreground">Results Above Target</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Teasers Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">Transform Your Digital Presence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exclusive AI-powered SEO solutions designed for businesses seeking exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-lg border border-border/50">
            <h3 className="font-heading text-xl mb-4">SEO Transformation Package</h3>
            <p className="text-muted-foreground mb-6">
              A comprehensive SEO strategy enhanced by AI analysis that identifies untapped opportunities your competitors are missing. Includes proprietary ranking techniques refined over half a decade.
            </p>
            <Button asChild variant="outline">
              <Link to="/services">Learn More</Link>
            </Button>
          </div>
          
          <div className="bg-card p-8 rounded-lg border border-border/50">
            <h3 className="font-heading text-xl mb-4">AI Business Automation</h3>
            <p className="text-muted-foreground mb-6">
              Custom AI solutions that integrate with your business processes, automating repetitive tasks and uncovering insights that drive growth. Future-proof your operations with cutting-edge technology.
            </p>
            <Button asChild variant="outline">
              <Link to="/app-building">Discover Possibilities</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-md mb-6">Ready to Elevate Your Digital Strategy?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Let's discuss how AI-powered SEO can transform your business visibility and results.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Schedule a Strategy Session</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;
