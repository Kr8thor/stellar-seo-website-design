
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form submission would go here
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
    });
  };
  
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="heading-lg mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions about my SEO or app building services? Ready to improve your search rankings or build your next application? Let's talk.
          </p>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <h2 className="font-heading text-2xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number (Optional)
                      </label>
                      <Input
                        id="phone"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="website" className="text-sm font-medium">
                        Website URL
                      </label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">
                      Service You're Interested In
                    </label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    >
                      <option value="">Select a Service</option>
                      <option value="On-Page SEO">On-Page SEO</option>
                      <option value="Off-Page SEO">Off-Page SEO</option>
                      <option value="Technical SEO">Technical SEO</option>
                      <option value="Local SEO">Local SEO</option>
                      <option value="SEO Audit">SEO Audit</option>
                      <option value="Content Strategy">Content Strategy</option>
                      <option value="n8n Automation">n8n Automation</option>
                      <option value="React Development">React Development</option>
                      <option value="MCP Solutions">MCP Solutions</option>
                      <option value="Custom Package">Custom Package</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project and your goals..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. Your information will never be shared with third parties.
                  </p>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="lg:w-1/3">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-heading text-2xl mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email Address</p>
                      <a href="mailto:hello@mardenseo.com" className="text-muted-foreground hover:text-primary transition-colors">
                        hello@mardenseo.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Number</p>
                      <a href="tel:+821077741401" className="text-muted-foreground hover:text-primary transition-colors">
                        +821077741401
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mr-4">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a href="https://github.com/Kr8thor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        github.com/Kr8thor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8 mt-8">
                <h3 className="font-heading text-xl mb-4">Book a Quick Call</h3>
                <p className="text-muted-foreground mb-6">
                  Prefer a quick chat? Send an email to schedule a call to discuss your needs.
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:hello@mardenseo.com">
                    Email to Schedule
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions before reaching out? Here are answers to some common questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: "How long does it take to see SEO results?",
              answer: "SEO is a long-term strategy. While some improvements can be seen within the first few months (especially from technical fixes), significant results typically take 4-6 months to materialize. The timeline can vary based on your industry competition, website history, and the strategies implemented."
            },
            {
              question: "What app development services do you offer?",
              answer: "I specialize in building custom applications using n8n automation, React, MCPs, and similar technologies. Services include workflow automation, data integration, custom web applications, and full-stack development tailored to your specific business needs."
            },
            {
              question: "Do you guarantee first-page rankings?",
              answer: "No legitimate SEO professional can guarantee specific rankings as search algorithms are complex and constantly changing. What I do guarantee is implementing proven strategies, transparent reporting, and continuous optimization based on performance data."
            },
            {
              question: "What makes your services different?",
              answer: "My approach combines technical expertise with strategic content development and a focus on user experience. I stay updated with the latest technologies and algorithm changes, providing tailored solutions that address your specific business goals."
            },
            {
              question: "Do you require long-term contracts?",
              answer: "While SEO works best as a long-term strategy, I typically offer month-to-month agreements after an initial 3-month commitment. For app development projects, we'll define the scope and timeline based on your specific requirements."
            },
            {
              question: "What information do you need to get started?",
              answer: "To prepare a proposal for SEO, I'll need your website URL, business goals, target audience information, and access to any existing analytics. For app development projects, we'll need to discuss your requirements, existing systems, and desired functionality."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-lg mb-3">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-md mb-6">Ready to Boost Your Online Presence?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Take the first step toward improving your visibility and growing your business through strategic SEO and custom application development.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="#top">Contact Me Today</a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Contact;
