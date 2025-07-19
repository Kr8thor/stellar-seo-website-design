import React from 'react';
import { Link } from 'react-router-dom';
import { Workflow, Zap, Clock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageSEO } from '@/hooks/useSEO';

const WorkflowAutomation = () => {
  const { SEOHelmet } = usePageSEO('workflow-automation');
  
  const automationServices = [
    {
      icon: <Workflow className="h-12 w-12" />,
      title: "Custom n8n Workflows",
      description: "Build powerful automation workflows that connect your favorite tools and streamline business processes.",
      features: ["Custom Workflow Design", "API Integrations", "Data Processing", "Error Handling"]
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Business Process Automation",
      description: "Automate repetitive tasks and eliminate manual work to increase efficiency and reduce errors.",
      features: ["Task Automation", "Data Synchronization", "Notification Systems", "Report Generation"]
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Scheduled Automation",
      description: "Set up time-based automations that run on schedule to keep your business running 24/7.",
      features: ["Cron Jobs", "Recurring Tasks", "Data Backups", "System Monitoring"]
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Analytics & Reporting",
      description: "Automate data collection and reporting to get insights into your business performance.",
      features: ["Data Collection", "Dashboard Creation", "Automated Reports", "Performance Metrics"]
    }
  ];
  
  const integrations = [
    "Google Workspace", "Slack", "Trello", "Asana", "HubSpot", "Mailchimp",
    "Shopify", "WordPress", "Airtable", "Zapier", "Webhook", "REST APIs"
  ];
  
  const benefits = [
    {
      title: "Save Time",
      description: "Automate repetitive tasks and focus on what matters most for your business growth.",
      stat: "80%"
    },
    {
      title: "Reduce Errors",
      description: "Eliminate human error with automated processes that run consistently every time.",
      stat: "95%"
    },
    {
      title: "Increase Productivity",
      description: "Get more done with less effort by automating your most time-consuming processes.",
      stat: "3x"
    }
  ];
  
  return (
    <>
      {SEOHelmet()}
      <main>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">n8n Workflow Automation</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12">
                Streamline your business with custom n8n workflow automation. Automate repetitive tasks, integrate systems, and boost productivity.
              </p>
            </div>
          </div>
        </section>
        
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {automationServices.map((service, index) => (
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
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Popular Integrations</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect all your favorite tools and services with powerful n8n automation workflows.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <span className="font-medium">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">The Power of Automation</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how workflow automation can transform your business operations and productivity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-4">{benefit.stat}</div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692" 
                  alt="Workflow automation dashboard" 
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="heading-lg mb-6">Why Choose n8n Automation?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Open Source Flexibility</h3>
                      <p className="text-muted-foreground">n8n's open-source nature provides unlimited customization possibilities.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Cost-Effective Solution</h3>
                      <p className="text-muted-foreground">More affordable than proprietary automation tools with better features.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Visual Workflow Builder</h3>
                      <p className="text-muted-foreground">Easy-to-understand visual interface for building complex workflows.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Unlimited Integrations</h3>
                      <p className="text-muted-foreground">Connect to any service with REST APIs, webhooks, or custom nodes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="heading-lg mb-6">Ready to Automate Your Business?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your automation needs and create custom workflows that save time and increase productivity.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Start Automating Today</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default WorkflowAutomation;