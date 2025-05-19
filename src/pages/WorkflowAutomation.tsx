import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Users, Lightbulb, Workflow, CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ToolIconsFlow from '../components/workflow/ToolIconsFlow';
import WorkflowContactForm from '../components/workflow/ContactForm';
import WorkflowImage from '../components/workflow/WorkflowImage';
const WorkflowAutomation = () => {
  // Define image paths for each workflow type with meaningful stock images
  const workflowImages = {
    crm: "/images/workflow-samples/crm-workflow.jpg",
    // CRM automation
    invoice: "/images/workflow-samples/invoice-workflow.jpg",
    // Invoice processing
    social: "/images/workflow-samples/social-media-workflow.jpg",
    // Social media management
    support: "/images/workflow-samples/support-workflow.jpg",
    // Support ticketing
    inventory: "/images/workflow-samples/inventory-workflow.jpg",
    // Inventory management
    reporting: "/images/workflow-samples/reporting-workflow.jpg",
    // Data reporting
    chatbot: "/images/workflow-samples/chatbot-workflow.jpg" // AI chatbot integration
  };
  return <main className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
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
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-6">
              <Workflow className="h-8 w-8 text-purple-700" />
            </div>
            <h1 className="heading-xl mb-6 text-gradient-purple">
              Custom n8n Workflow Automation
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
              Reduce costs, minimize hiring needs, and solve business challenges with custom automation solutions
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:opacity-90">
              <a href="#contact" className="group flex items-center gap-2">
                Get Your Custom Workflow
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Technology Partners Section - REPLACED with the component from Home page */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Powered by Industry-Leading Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We leverage cutting-edge automation platforms to build seamless, reliable workflows 
              that integrate with your existing tech stack
            </p>
          </div>
          
          <ToolIconsFlow />

          <p className="text-center text-gray-600 max-w-3xl mx-auto mt-8">
            As certified n8n Partners and automation specialists, we create custom workflows that connect your entire
            digital ecosystem — from Google Workspace and Microsoft 365 to CRMs, databases, and custom applications.
          </p>
        </div>
      </section>
      
      {/* Business Benefits Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Transform Your Business Operations</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Custom automation delivers measurable improvements to your bottom line and team efficiency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Cost Reduction */}
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Cost Reduction</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">Save 15+ hours weekly on manual data entry and repetitive tasks.</p>
                <p className="mb-4">Businesses leveraging automation see an average 30% reduction in operational costs.</p>
                <p className="font-semibold text-purple-700">ROI typically achieved within 3-6 months</p>
              </CardContent>
            </Card>
            
            {/* Hiring Alternative */}
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-pink-600 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Hiring Alternative</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">One well-designed workflow can replace an administrative assistant for routine tasks.</p>
                <p className="mb-4">Scale your operations without proportionally scaling your team.</p>
                <p className="font-semibold text-pink-700">Save $40,000+ annually per automated role</p>
              </CardContent>
            </Card>
            
            {/* Problem Solving */}
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Problem Solving</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">Eliminate data silos by connecting previously isolated business tools.</p>
                <p className="mb-4">Reduce human error by 95% in critical business processes.</p>
                <p className="font-semibold text-amber-700">Improve customer response time by up to 80%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Sample Workflows Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Sample Workflow Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real n8n workflows we've built that deliver measurable business impact
            </p>
          </div>
          
          <Tabs defaultValue="crm" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 max-w-5xl mx-auto mb-8">
              <TabsTrigger value="crm">CRM Integration</TabsTrigger>
              <TabsTrigger value="invoice">Invoice Processing</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="support">Support Tickets</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
              <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
            </TabsList>
            
            <div className="bg-accent/10 p-6 rounded-lg">
              <TabsContent value="crm" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Lead Nurturing Automation</h3>
                    <p className="mb-4">
                      This workflow automatically nurtures leads through your sales pipeline, from initial contact form 
                      submission to qualified sales opportunity.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Automatically routes leads to appropriate team members based on criteria</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Triggers personalized email sequences based on lead behavior</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Schedules follow-up tasks for sales team in your CRM</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>30% increase in qualified leads with 10 hours saved weekly per sales rep</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.crm} alt="n8n CRM workflow for lead automation" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="invoice" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Invoice Processing Automation</h3>
                    <p className="mb-4">
                      This workflow handles the entire lifecycle of invoices, from receipt to payment processing
                      and accounting system integration.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Extracts data from invoices using OCR and machine learning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Routes for approval based on amount, department, and vendor</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Syncs with accounting software and payment systems</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>80% reduction in processing time with 99.5% accuracy</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.invoice} alt="n8n invoice processing automation workflow" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Social Media Content Automation</h3>
                    <p className="mb-4">
                      This workflow streamlines content creation, scheduling, and performance tracking
                      across multiple social platforms.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Creates platform-specific versions of each content piece</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Schedules posts at optimal engagement times</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Collects and analyzes performance metrics automatically</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>40% increase in engagement with 15 hours saved weekly</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.social} alt="n8n social media scheduling and analytics workflow" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Support Ticket Routing</h3>
                    <p className="mb-4">
                      This workflow intelligently categorizes, prioritizes, and routes customer support tickets
                      to the right team members.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Analyzes ticket content to determine category and priority</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Assigns to appropriate team member based on expertise and workload</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Provides automated responses for common questions</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>60% faster response time with 25% increase in first-contact resolution</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.support} alt="n8n support ticket routing and automation workflow" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Inventory Management</h3>
                    <p className="mb-4">
                      This workflow monitors inventory levels, predicts shortages, and automates 
                      the reordering process.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Monitors stock levels across multiple warehouses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Sends alerts when inventory reaches reorder points</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Generates and sends purchase orders to suppliers</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>90% reduction in stockouts with 20% decrease in carrying costs</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.inventory} alt="n8n inventory management and reordering workflow" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reporting" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">Automated Reporting</h3>
                    <p className="mb-4">
                      This workflow gathers data from multiple sources, generates custom reports, 
                      and distributes them to stakeholders.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Extracts data from multiple systems and databases</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Transforms and analyzes data to generate insights</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Creates and distributes personalized reports on schedule</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>8 hours saved weekly per department with 100% accuracy</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.reporting} alt="n8n automated data reporting workflow" />
                  </div>
                </div>
              </TabsContent>
              
              {/* New Chatbots Section */}
              <TabsContent value="chatbots" className="mt-0">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-bold mb-4">AI Chatbot Integration</h3>
                    <p className="mb-4">
                      This workflow creates intelligent chatbots that can handle customer inquiries,
                      provide product recommendations, and escalate complex issues to human agents.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Integrates with AI platforms for natural language processing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Connects to your knowledge base to provide accurate answers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Learns from interactions to continuously improve responses</span>
                      </li>
                    </ul>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-medium text-purple-800">Business Impact:</p>
                      <p>75% reduction in basic support queries with 24/7 customer service coverage</p>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <WorkflowImage src={workflowImages.chatbot} alt="n8n AI chatbot integration workflow" />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Service Packages Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Service Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible solutions designed to match your business needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Card className="border-0 shadow-lg relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Basic Automation</CardTitle>
                <CardDescription>Perfect for small businesses and startups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-bold">$99 </p>
                <p className="text-sm text-muted-foreground">Starting price</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>1 simple workflow automation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Up to 3 integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Basic testing and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>30-day support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#contact">Request Quote</a>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Standard Package */}
            <Card className="border-0 shadow-xl relative overflow-hidden scale-105 z-10">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Standard Workflow Solution</CardTitle>
                <CardDescription>For established businesses with complex needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-bold">$249</p>
                <p className="text-sm text-muted-foreground">Starting price</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>3 integrated workflows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Up to 8 integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Comprehensive testing and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>90-day support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>User training session</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  <a href="#contact">Request Quote</a>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Enterprise Package */}
            <Card className="border-0 shadow-lg relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-500 to-red-500"></div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Enterprise Automation Suite</CardTitle>
                <CardDescription>Complete automation ecosystem for large operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-bold">Custom</p>
                <p className="text-sm text-muted-foreground">Tailored pricing</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Unlimited workflows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Unlimited integrations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Advanced system architecture</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>12-month dedicated support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>Comprehensive team training</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#contact">Request Quote</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to delivering successful automation solutions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-12 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600 hidden md:block"></div>
              
              {/* Steps */}
              <div className="space-y-8 md:space-y-24">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex items-center justify-center md:justify-start mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white relative z-10">
                      1
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Discovery and Requirements</h3>
                    <p>
                      We begin by thoroughly understanding your business processes, pain points, and goals.
                      This phase includes stakeholder interviews, process mapping, and identifying automation opportunities
                      with the highest ROI potential.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex items-center justify-center md:justify-start mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white relative z-10">
                      2
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Workflow Design</h3>
                    <p>
                      Our team creates detailed workflow diagrams and technical specifications that outline
                      exactly how your automation will function. This blueprint is reviewed and refined
                      collaboratively before any development begins.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex items-center justify-center md:justify-start mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white relative z-10">
                      3
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Building and Integration</h3>
                    <p>
                      Our experienced developers build your custom n8n workflows, connecting all required
                      systems and services. We implement error handling, logging, and monitoring to ensure
                      reliable operation even in unexpected scenarios.
                    </p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex items-center justify-center md:justify-start mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white relative z-10">
                      4
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Testing and Optimization</h3>
                    <p>
                      We rigorously test each workflow component and the entire system under various
                      conditions, refining and optimizing for performance, reliability, and efficiency
                      before deployment to your production environment.
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 flex items-center justify-center md:justify-start mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold text-white relative z-10">
                      5
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Handover and Support</h3>
                    <p>
                      We provide comprehensive documentation and training to ensure your team understands
                      how to use and manage the automation. Our support package includes monitoring,
                      troubleshooting, and continuous improvement recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our workflow automation services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-md border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/10 rounded-t-lg">
                  What is n8n and why should I use it for automation?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  n8n is a powerful, flexible workflow automation platform that connects any API with a visual
                  interface. It's ideal for businesses because it's highly customizable, can be hosted on your
                  own infrastructure for data security, supports complex conditional logic, and integrates with
                  virtually any service or application. Unlike some alternatives, n8n gives you full control and
                  ownership of your automation infrastructure.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-md border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/10 rounded-t-lg">
                  How long does it take to implement a typical automation?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Implementation time varies based on complexity, but typically:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Simple workflows: 1-2 weeks</li>
                    <li>Moderate workflows with multiple integrations: 3-4 weeks</li>
                    <li>Complex enterprise automation ecosystems: 6-12 weeks</li>
                  </ul>
                  During our initial consultation, we'll provide a more accurate timeline based on your specific requirements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-md border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/10 rounded-t-lg">
                  Do I need technical knowledge to maintain the workflows?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  No, we design our automation solutions with user-friendliness in mind. While n8n itself is a
                  technical tool, we provide:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Comprehensive documentation for all workflows</li>
                    <li>Training sessions for your team</li>
                    <li>User-friendly monitoring dashboards</li>
                    <li>Ongoing support packages for technical assistance</li>
                  </ul>
                  Most clients can monitor their workflows with minimal technical knowledge, while we handle
                  complex maintenance and updates.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-md border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/10 rounded-t-lg">
                  Where will my automation be hosted?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  You have several hosting options:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Self-hosted on your own servers (maximum control and privacy)</li>
                    <li>Hosted on n8n.cloud (convenient, managed service)</li>
                    <li>Our managed hosting service with monitoring and maintenance</li>
                    <li>Cloud provider of your choice (AWS, Azure, GCP, etc.)</li>
                  </ul>
                  We'll help you select the best option based on your security requirements, budget, and
                  technical capabilities.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-md border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/10 rounded-t-lg">
                  What happens if an automation breaks or encounters errors?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  We build robust error handling into every automation:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Automated error detection and alerts</li>
                    <li>Detailed logging for troubleshooting</li>
                    <li>Fallback procedures for critical processes</li>
                    <li>Regular monitoring and health checks</li>
                  </ul>
                  Our support packages include rapid response times for critical issues, and we provide 
                  preventative maintenance to minimize disruptions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Call-to-Action Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="heading-lg mb-6">Ready to Automate Your Business?</h2>
              <p className="text-xl mb-8 text-purple-100">
                Let's discuss how custom n8n workflows can transform your operations, 
                reduce costs, and solve your business challenges.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild size="lg" variant="secondary" className="group">
                  <a href="/contact" className="flex items-center gap-2">
                    Get Your Custom Workflow
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <a href="#" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule a Demo
                  </a>
                </Button>
              </div>
              
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
                <h3 className="text-xl font-bold mb-4">What to expect:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-1" />
                    <span>Free 30-minute consultation to discuss your needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-1" />
                    <span>Customized proposal with timeline and pricing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-1" />
                    <span>Example workflows similar to your requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-1" />
                    <span>No obligation to proceed - valuable insights guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h3>
                <WorkflowContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>;
};
export default WorkflowAutomation;