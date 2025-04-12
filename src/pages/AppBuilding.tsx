
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Code, Database, Server, Box, Settings, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppBuilding = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="heading-lg mb-6">App Building Services</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Custom SaaS application development with modern tools and technologies
          </p>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 transition-all hover:shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-6">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl mb-4">n8n Automation</h3>
              <p className="text-muted-foreground">
                Powerful workflow automation solutions using n8n to connect your systems and automate business processes without writing code.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-8 transition-all hover:shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-6">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl mb-4">MCP Solutions</h3>
              <p className="text-muted-foreground">
                Custom Model Context Protocol solutions integrated with builders like Claude and Cursor, tailored to enhance your AI-powered applications.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-8 transition-all hover:shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-6">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl mb-4">React Development</h3>
              <p className="text-muted-foreground">
                Modern, responsive SaaS web applications built with React and related technologies, focusing on performance and user experience.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 transition-all hover:shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-6">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl mb-4">API Development</h3>
              <p className="text-muted-foreground">
                Custom API solutions that connect your SaaS applications and services, enabling seamless data flow and integration.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-8 transition-all hover:shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary mb-6">
                <Cloud className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl mb-4">SaaS Solutions</h3>
              <p className="text-muted-foreground">
                End-to-end SaaS application development with subscription management, multi-tenancy architecture, and scalable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">Technology Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building modern applications with proven technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading text-lg mb-3">Frontend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>React & React Native</li>
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Redux / Context API</li>
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading text-lg mb-3">Backend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Node.js</li>
              <li>Express</li>
              <li>n8n</li>
              <li>GraphQL</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading text-lg mb-3">Tools & Infrastructure</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Docker</li>
              <li>AWS / Azure</li>
              <li>CI/CD Pipelines</li>
              <li>MongoDB / SQL</li>
              <li>Git / GitHub</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* GitHub Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-md mb-6">Check Out My Work</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            View my projects and contributions on GitHub
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="https://github.com/Kr8thor" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Github className="mr-2 h-5 w-5" /> Visit My GitHub
            </a>
          </Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-container">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="heading-sm mb-4">Ready to Build Your Next Application?</h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss your project requirements and create a custom solution that meets your needs.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default AppBuilding;
