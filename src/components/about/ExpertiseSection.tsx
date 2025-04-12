
import React from 'react';
import { Workflow, Bot, Cpu, Zap, Code, Database } from 'lucide-react';

const ExpertiseSection = () => {
  const expertiseItems = [
    {
      title: "AI Workflow Automation",
      description: "Building custom AI workflows that automate repetitive tasks, enhance decision-making, and create scalable business solutions with minimal human intervention.",
      icon: <Workflow className="h-8 w-8 mb-3 text-primary" />
    },
    {
      title: "Custom AI Solutions",
      description: "Developing tailored artificial intelligence applications that solve specific business challenges and create competitive advantages unique to your organization.",
      icon: <Bot className="h-8 w-8 mb-3 text-primary" />
    },
    {
      title: "AI Integration",
      description: "Seamlessly integrating AI models like Claude and GPT with existing business systems through Cursor and other AI builders to enhance productivity and insights.",
      icon: <Cpu className="h-8 w-8 mb-3 text-primary" />
    },
    {
      title: "AI-Enhanced SEO",
      description: "Implementing advanced AI models to analyze search patterns, optimize content, and boost rankings through machine learning insights.",
      icon: <Zap className="h-8 w-8 mb-3 text-primary" />
    },
    {
      title: "Technical SEO",
      description: "Site architecture, speed optimization, mobile-friendliness, structured data implementation, and crawlability improvements.",
      icon: <Code className="h-8 w-8 mb-3 text-primary" />
    },
    {
      title: "Data-Driven Strategy",
      description: "AI-powered dashboard creation, predictive analytics, conversion tracking, and actionable insights for continuous improvement.",
      icon: <Database className="h-8 w-8 mb-3 text-primary" />
    }
  ];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">My Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With half a decade of experience and continuous learning in AI technologies and SEO, I bring specialized knowledge across multiple cutting-edge areas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {expertiseItems.map((expertise, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
            >
              {expertise.icon}
              <h3 className="font-heading text-xl mb-3">{expertise.title}</h3>
              <p className="text-muted-foreground">{expertise.description}</p>
            </div>
          ))}
        </div>
        
        {/* Workflow Image */}
        <div className="mt-16">
          <img 
            src="/lovable-uploads/cc7235a6-db85-4f70-9150-b94aa9d837de.png" 
            alt="AI Workflow Automation Example" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
          <p className="text-center text-sm text-muted-foreground mt-3">
            Example of a custom AI workflow automation solution built for business process optimization
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
