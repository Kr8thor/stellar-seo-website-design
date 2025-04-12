
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
              I'm a data-driven SEO specialist with over 10 years of experience helping businesses achieve sustainable growth through strategic search engine optimization.
            </p>
            <p className="mb-8">
              My approach combines deep technical expertise with content strategy and user experience optimization to deliver measurable improvements in search visibility and organic traffic.
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
              With a decade of experience and continuous learning in SEO, I bring specialized knowledge across multiple areas of search optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Technical SEO",
                description: "Site architecture, speed optimization, mobile-friendliness, structured data implementation, and crawlability improvements."
              },
              {
                title: "Content Strategy",
                description: "Keyword research, content gap analysis, topic clustering, and creating search-optimized content that converts."
              },
              {
                title: "Link Building",
                description: "Natural backlink acquisition through quality content and strategic outreach to relevant websites in your industry."
              },
              {
                title: "Local SEO",
                description: "Google Business Profile optimization, local citation building, and geo-targeted content strategies."
              },
              {
                title: "Analytics & Reporting",
                description: "Custom dashboard creation, conversion tracking, and actionable insights for continuous improvement."
              },
              {
                title: "E-E-A-T Optimization",
                description: "Enhancing your site's Experience, Expertise, Authoritativeness, and Trustworthiness signals."
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
              My journey in SEO began in 2012 when I was working for a digital marketing agency. I was fascinated by how small changes to websites could dramatically impact their visibility in search results.
            </p>
            <p className="mb-4">
              After mastering the fundamentals, I specialized in technical SEO and worked with clients ranging from small local businesses to Fortune 500 companies across various industries.
            </p>
            <p className="mb-4">
              In 2018, I decided to focus exclusively on helping businesses that truly needed strategic SEO expertise, launching my freelance practice to provide personalized solutions with measurable results.
            </p>
            <p>
              Today, I work with select clients who are serious about improving their search visibility and driving sustainable organic growth through white-hat, future-proof SEO strategies.
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
                I believe in sustainable SEO strategies that align with search engine guidelines and focus on providing real value to your users. No shortcuts, no black-hat techniques—just proven methods that deliver lasting results.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Thorough analysis of your current SEO performance",
                  "Customized strategy based on your specific business goals",
                  "Focus on both quick wins and long-term sustainable growth",
                  "Regular reporting with clear, actionable insights",
                  "Transparent communication throughout the process",
                  "Continuous optimization based on performance data"
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
                  <p className="text-3xl font-heading font-medium">10+</p>
                  <p className="text-muted-foreground">Years of Experience</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">100+</p>
                  <p className="text-muted-foreground">Satisfied Clients</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">500+</p>
                  <p className="text-muted-foreground">Projects Completed</p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <p className="text-3xl font-heading font-medium">85%</p>
                  <p className="text-muted-foreground">Client Retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">What My Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I pride myself on building long-term relationships with clients by delivering exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "Working with this SEO specialist was the best decision we made for our business. Our organic traffic has increased by 200% in just 6 months.",
              name: "David Reynolds",
              title: "Founder, Innovate Tech"
            },
            {
              quote: "The depth of knowledge and strategic approach to SEO is impressive. We're now ranking for keywords we never thought possible.",
              name: "Lisa Chen",
              title: "CMO, Global Solutions"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border border-border/50"
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
          <h2 className="heading-md mb-6">Ready to Start Your SEO Journey?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Let's discuss how I can help you achieve your business goals through strategic SEO.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Schedule a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;
