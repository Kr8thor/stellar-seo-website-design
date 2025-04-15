
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      service: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create email content
      const emailContent = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone || 'Not provided'}
        Website: ${data.website}
        Service: ${data.service}
        Message: ${data.message}
      `;
      
      // Using mailto link as a simple solution
      const mailtoLink = `mailto:hello@mardenseo.com?subject=Contact Form Submission from ${data.name}&body=${encodeURIComponent(emailContent)}`;
      window.location.href = mailtoLink;
      
      // Show success message
      toast({
        title: "Message Ready to Send!",
        description: "Your email client will open with the message. Please send it to complete.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "There was an error preparing your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Website URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourwebsite.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Service You're Interested In</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                              {...field}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project and your goals..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy. Your information will never be shared with third parties.
                    </p>
                  </form>
                </Form>
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
