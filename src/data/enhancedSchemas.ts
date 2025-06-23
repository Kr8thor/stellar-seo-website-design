/**
 * Enhanced Schema Data Repository - Phase 2
 * Service-specific and enhanced schema configurations
 */

import { 
  ServiceSchema, 
  ArticleSchema, 
  FAQPageSchema, 
  HowToSchema,
  BreadcrumbListSchema,
  OrganizationSchema,
  PersonSchema 
} from '@/types/schema';

// Base organization data (reusable)
export const mardenSEOOrganization: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marden SEO",
  "url": "https://mardenseo.com",
  "logo": "https://mardenseo.com/favicon.png",
  "description": "Professional SEO and custom application development services",
  "address": {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://mardenseo.com/contact"
  },
  "sameAs": [
    "https://twitter.com/marden_seo"
  ]
};

// Author information
export const mardenSEOAuthor: PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marden SEO Team",
  "url": "https://mardenseo.com/about",
  "jobTitle": "SEO Specialists & Developers"
};

// SERVICE SCHEMAS - Phase 2 Enhancement

// SEO Services Schema
export const seoServiceSchema: ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional SEO Services",
  "description": "Comprehensive search engine optimization services including technical SEO, content optimization, and ranking improvements",
  "provider": mardenSEOOrganization,
  "areaServed": "Worldwide",
  "serviceType": [
    "Search Engine Optimization",
    "Technical SEO Audit",
    "Content Optimization",
    "Local SEO",
    "SEO Consulting"
  ],
  "url": "https://mardenseo.com/services",
  "offers": [
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "SEO Audit & Strategy",
      "description": "Comprehensive website analysis and SEO strategy development",
      "availability": "https://schema.org/InStock",
      "url": "https://mardenseo.com/contact"
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer", 
      "name": "Ongoing SEO Management",
      "description": "Monthly SEO services with ranking monitoring and optimization",
      "availability": "https://schema.org/InStock",
      "url": "https://mardenseo.com/contact"
    }
  ]
};

// App Development Service Schema
export const appDevelopmentServiceSchema: ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Application Development",
  "description": "Professional React application development, mobile-first solutions, and modern web applications tailored to business needs",
  "provider": mardenSEOOrganization,
  "areaServed": "Worldwide",
  "serviceType": [
    "React Development",
    "Web Application Development", 
    "Mobile-First Development",
    "Custom Software Development",
    "Frontend Development"
  ],
  "url": "https://mardenseo.com/app-building",
  "offers": [
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Custom React Applications",
      "description": "Modern, scalable React applications with TypeScript and best practices",
      "availability": "https://schema.org/InStock",
      "url": "https://mardenseo.com/contact"
    },
    {
      "@context": "https://schema.org", 
      "@type": "Offer",
      "name": "Mobile-First Web Apps",
      "description": "Responsive, fast-loading web applications optimized for all devices",
      "availability": "https://schema.org/InStock",
      "url": "https://mardenseo.com/contact"
    }
  ]
};

// Workflow Automation Service Schema
export const workflowAutomationServiceSchema: ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Workflow Automation Services",
  "description": "Custom workflow automation using n8n, business process optimization, and automated solution development to increase efficiency",
  "provider": mardenSEOOrganization,
  "areaServed": "Worldwide",
  "serviceType": [
    "Workflow Automation",
    "Business Process Automation",
    "n8n Development",
    "Process Optimization",
    "Custom Automation Solutions"
  ],
  "url": "https://mardenseo.com/workflow-automation",
  "offers": [
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "n8n Workflow Development",
      "description": "Custom n8n workflows to automate business processes and integrate systems",
      "availability": "https://schema.org/InStock",
      "url": "https://mardenseo.com/contact"
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": "Process Automation Consulting",
      "description": "Analysis and automation of manual business processes for efficiency gains",
      "availability": "https://schema.org/InStock", 
      "url": "https://mardenseo.com/contact"
    }
  ]
};

// FAQ SCHEMAS for Rich Snippets

// SEO Services FAQ
export const seoServicesFAQ: FAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "How long does it take to see SEO results?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "SEO results typically begin showing within 3-6 months, with significant improvements visible by 6-12 months. The timeline depends on competition, current site health, and implementation quality."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question", 
      "name": "What's included in your SEO services?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Our SEO services include technical audits, keyword research, content optimization, on-page SEO, link building, performance monitoring, and monthly reporting with actionable insights."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "Do you guarantee first page rankings?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "We focus on sustainable, long-term improvements rather than guarantees. Our data-driven approach significantly improves rankings and organic traffic through proven SEO methodologies."
      }
    }
  ]
};

// App Development FAQ  
export const appDevelopmentFAQ: FAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "What technologies do you use for app development?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "We primarily use React with TypeScript, modern CSS frameworks like Tailwind, and cutting-edge tools for optimal performance and maintainability."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "How long does it take to build a custom application?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer", 
        "text": "Development timelines vary based on complexity, typically ranging from 4-12 weeks for most projects. We provide detailed project timelines during consultation."
      }
    }
  ]
};

// HOWTO SCHEMAS for Workflow Automation Rich Snippets

export const n8nAutomationHowTo: HowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Automate Business Workflows with n8n",
  "description": "Step-by-step guide to implementing automated workflows that save time and reduce manual work using n8n platform",
  "image": "https://mardenseo.com/workflow-automation-guide.jpg",
  "step": [
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Identify Repetitive Processes",
      "text": "Analyze your current business processes to identify repetitive, time-consuming tasks that can be automated.",
      "url": "https://mardenseo.com/workflow-automation#step-1"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Map the Workflow",
      "text": "Create a detailed flowchart of the process, including all inputs, outputs, and decision points.",
      "url": "https://mardenseo.com/workflow-automation#step-2"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Design n8n Automation",
      "text": "Build the automated workflow in n8n, connecting all necessary services and applications.",
      "url": "https://mardenseo.com/workflow-automation#step-3"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Test and Optimize",
      "text": "Thoroughly test the automation with real data and optimize for performance and reliability.",
      "url": "https://mardenseo.com/workflow-automation#step-4"
    }
  ],
  "tool": ["n8n", "APIs", "Webhooks", "Database Connections"],
  "supply": ["Business Process Documentation", "API Access", "System Credentials"]
};

// BREADCRUMB UTILITY FUNCTIONS

export const generateBreadcrumbs = (pathname: string): BreadcrumbListSchema => {
  const pathSegments = pathname.split('/').filter(segment => segment);
  const breadcrumbs: BreadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@context": "https://schema.org",
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mardenseo.com"
      }
    ]
  };

  // Generate breadcrumbs based on path
  pathSegments.forEach((segment, index) => {
    const position = index + 2;
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = getBreadcrumbName(segment);
    
    breadcrumbs.itemListElement.push({
      "@context": "https://schema.org",
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": `https://mardenseo.com${path}`
    });
  });

  return breadcrumbs;
};

// Helper function to get human-readable breadcrumb names
const getBreadcrumbName = (segment: string): string => {
  const nameMap: Record<string, string> = {
    'services': 'SEO Services',
    'app-building': 'App Development',
    'workflow-automation': 'Workflow Automation',
    'about': 'About Us',
    'portfolio': 'Portfolio',
    'blog': 'Blog',
    'contact': 'Contact',
    'case-study': 'Case Studies'
  };

  return nameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// ARTICLE SCHEMA GENERATOR for Blog Posts
export const generateArticleSchema = (
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  imageUrl?: string,
  articleUrl?: string
): ArticleSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": mardenSEOAuthor,
    "publisher": mardenSEOOrganization,
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "image": imageUrl || "https://mardenseo.com/blog-default.jpg",
    "url": articleUrl,
    "mainEntityOfPage": articleUrl,
    "articleSection": "SEO & Development"
  };
};

// Export all schema configurations
export const enhancedSchemaConfig = {
  services: {
    seo: seoServiceSchema,
    appDevelopment: appDevelopmentServiceSchema,
    workflowAutomation: workflowAutomationServiceSchema
  },
  faq: {
    seoServices: seoServicesFAQ,
    appDevelopment: appDevelopmentFAQ
  },
  howTo: {
    n8nAutomation: n8nAutomationHowTo
  },
  generators: {
    breadcrumbs: generateBreadcrumbs,
    article: generateArticleSchema
  }
};
