
import React from 'react';
import { useSEOWithKey, PAGE_KEYS } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Globe, Zap, BookOpen, Users, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { handleAnchorClick } from '@/utils/scrollUtils';
import { Helmet } from 'react-helmet-async';

const ServicesAndPricing = () => {
  // 🎯 COMPREHENSIVE SEO IMPLEMENTATION - Enhanced meta descriptions and keywords
  useSEOWithKey(PAGE_KEYS.servicesPricing);

  const webDevelopmentPackages = [
    {
      name: "Starter Showcase",
      price: "€500-€900",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      description: "Perfect single-page presence for new businesses",
      features: [
        "Single-page, mobile-optimized design",
        "Lovable platform development",
        "Claude AI copywriting assistance",
        "Basic SEO optimization",
        "Contact form integration",
        "7-day delivery timeline"
      ],
      popular: false
    },
    {
      name: "Professional Presence",
      price: "€1,200-€2,000",
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      description: "Complete business website with multiple pages",
      features: [
        "Up to 5 custom pages",
        "SEO-ready content structure",
        "Contact & booking forms",
        "Mobile-first responsive design",
        "Social media integration",
        "Analytics setup",
        "14-day delivery timeline"
      ],
      popular: true
    },
    {
      name: "Premium Brand Builder",
      price: "€2,500-€5,000+",
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      description: "Enterprise-level website with advanced features",
      features: [
        "Up to 10 premium pages",
        "Multilingual support",
        "Advanced Cursor animations",
        "Custom integrations",
        "Blog setup & content strategy",
        "Detailed SEO implementation",
        "Priority support",
        "21-day delivery timeline"
      ],
      popular: false,
      enterprise: true
    }
  ];

  const educationalOfferings = [
    {
      name: "1:1 Website in a Weekend",
      price: "€600",
      icon: <Award className="h-6 w-6 text-amber-600" />,
      description: "Intensive personal coaching to build your site together",
      features: [
        "Intensive 1:1 mentoring sessions",
        "Weekend intensive format",
        "Live website building",
        "Personalized guidance",
        "Lifetime access to recordings"
      ]
    },
    {
      name: "Self-Paced Creator Bundle",
      price: "€199",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      description: "Complete course with all tools and templates",
      features: [
        "Comprehensive video content library",
        "Step-by-step tutorials",
        "Template library access",
        "Community forum access",
        "6-month email support"
      ]
    },
    {
      name: "VIP Web Creator Mentorship",
      price: "€1,000",
      icon: <Star className="h-6 w-6 text-purple-600" />,
      description: "Premium mentorship with ongoing support",
      features: [
        "Monthly 1:1 strategy calls",
        "Unlimited email support",
        "Priority access to new content",
        "Personal project reviews",
        "3-month program duration"
      ]
    },
    {
      name: "Group Workshop",
      price: "€300/person",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      description: "Interactive group learning experience",
      features: [
        "Full-day interactive workshop",
        "Small group (max 8 people)",
        "Hands-on practice",
        "Group project collaboration",
        "Follow-up Q&A session"
      ]
    }
  ];

  const addOns = [
    { name: "SEO Setup & Optimization", price: "€300-€500" },
    { name: "Custom Branding Kit", price: "€200-€400" },
    { name: "Advanced Animations", price: "€150-€300" },
    { name: "Multilingual Implementation", price: "€250-€450" },
    { name: "Monthly Maintenance", price: "€100-€200/month" },
    { name: "E-commerce Integration", price: "€400-€800" }
  ];

  const faqs = [
    {
      question: "What tools and technologies do you use?",
      answer: "We specialize in modern development tools including Lovable for rapid prototyping, Claude AI for intelligent copywriting, and Cursor for advanced development workflows. All websites are built with React, TypeScript, and modern web standards."
    },
    {
      question: "Can I edit my website after it's completed?",
      answer: "Absolutely! All our websites are built on user-friendly platforms. We provide training and documentation so you can make updates yourself. We also offer ongoing support packages if you prefer professional assistance."
    },
    {
      question: "What's your typical turnaround time?",
      answer: "Starter Showcase: 7 days, Professional Presence: 14 days, Premium Brand Builder: 21 days. Educational programs start immediately upon enrollment, with self-paced options available 24/7."
    },
    {
      question: "Can I switch from DIY learning to done-for-me later?",
      answer: "Yes! Many clients start with our educational offerings and later hire us for implementation. We offer credit towards done-for-you services for educational program graduates."
    },
    {
      question: "Do you offer ongoing support and maintenance?",
      answer: "Yes, we offer various maintenance packages starting at €100/month. This includes security updates, content updates, performance monitoring, and technical support."
    },
    {
      question: "What makes your approach different?",
      answer: "We combine cutting-edge AI tools with personalized human expertise. Our educational approach means you understand your website, not just own it. Plus, our transparent pricing and collaborative process ensures no surprises."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-container bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="heading-xl mb-8 pb-4 text-gradient-purple">
            Exceptional Websites. Clear Pricing.<br />
            Empowering Education.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
            Transform your online presence with our done-for-you websites or master our proven methods through personalized education. Choose your path to digital success.
          </p>
          <Button size="lg" className="animate-fade-in bg-purple-600 hover:bg-purple-700 text-white mb-8">
            <a href="#pricing-options">Choose Your Path</a>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Three Paths to Digital Excellence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you want us to build for you, learn to build yourself, or combine both approaches, we have the perfect solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardHeader>
              <CardTitle>Done-For-You Websites</CardTitle>
              <CardDescription>Beautiful, responsive, SEO-rich websites delivered fast</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sit back and relax while we create your perfect online presence using cutting-edge AI and modern development practices.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow border-purple-200">
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardHeader>
              <CardTitle>Educational & DIY Training</CardTitle>
              <CardDescription>Learn our exact methods and build with confidence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Master the art of modern web development with our comprehensive courses, templates, and mentorship programs.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardHeader>
              <CardTitle>Hybrid Coaching Solutions</CardTitle>
              <CardDescription>Build with us and learn as you go</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get the best of both worlds with collaborative building sessions where you learn while we create together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-options" className="section-container bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">Transparent Pricing, No Surprises</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully crafted packages designed to meet every need and budget.
          </p>
        </div>

        <Tabs defaultValue="websites" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="websites">Website Packages</TabsTrigger>
            <TabsTrigger value="education">Education Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="websites">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {webDevelopmentPackages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-purple-500 shadow-lg scale-105' : ''} ${pkg.enterprise ? 'border-amber-500' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                      Most Popular
                    </Badge>
                  )}
                  {pkg.enterprise && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600">
                      Enterprise
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">{pkg.icon}</div>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">{pkg.price}</div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={pkg.popular ? "default" : "outline"}
                      style={pkg.popular ? {} : {
                        backgroundColor: '#6366f1',
                        color: 'white',
                        border: '1px solid #6366f1'
                      }}
                      asChild
                    >
                      <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Request Consultation</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {educationalOfferings.map((offering, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {offering.icon}
                      <div>
                        <CardTitle className="text-xl">{offering.name}</CardTitle>
                        <div className="text-2xl font-bold text-purple-600">{offering.price}</div>
                      </div>
                    </div>
                    <CardDescription>{offering.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {offering.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      asChild
                    >
                      <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Learn More</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Add-ons Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-md mb-4">Enhance Your Package</h2>
          <p className="text-muted-foreground">Additional services to make your website even better</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium">{addon.name}</span>
                <span className="text-purple-600 font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about our services</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <h2 className="heading-md mb-4 text-white">Ready to Elevate Your Digital Presence?</h2>
        <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
          Whether you want us to build your dream website or learn to create amazing sites yourself, we're here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Book Your Consultation</a>
          </Button>
          <Button size="lg" style={{ backgroundColor: 'white', color: '#9333ea', borderColor: 'white' }} className="hover:bg-purple-50" asChild>
            <a 
              href="/contact#top" 
              onClick={(e) => handleAnchorClick('/contact#top', e)}
              style={{ color: '#9333ea' }}
              className="hover:!text-purple-700"
            >
              Start Learning Today
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesAndPricing;
