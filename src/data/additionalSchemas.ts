/**
 * Additional Schema Enhancements for Rich Snippets
 * Extends the existing schema system with more specific markup
 */

import { 
  FAQPageSchema, 
  HowToSchema,
  ServiceSchema,
  OrganizationSchema 
} from '@/types/schema';

// Enhanced Organization Schema with additional details
export const enhancedOrganizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marden SEO",
  "alternateName": "Marden SEO Services",
  "url": "https://mardenseo.com",
  "logo": {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": "https://mardenseo.com/favicon.png",
    "width": 512,
    "height": 512
  },
  "description": "Professional SEO services and custom application development specializing in React, n8n automation, and digital transformation solutions",
  "foundingDate": "2024",
  "address": {
    "@context": "https://schema.org",
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "United States"
  },
  "contactPoint": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://mardenseo.com/contact",
      "availableLanguage": ["English"]
    },
    {
      "@context": "https://schema.org", 
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://mardenseo.com/contact",
      "availableLanguage": ["English"]
    }
  ],
  "sameAs": [
    "https://twitter.com/marden_seo",
    "https://linkedin.com/company/marden-seo"
  ],
  "knowsAbout": [
    "Search Engine Optimization",
    "React Development", 
    "n8n Workflow Automation",
    "Technical SEO",
    "Web Application Development",
    "Digital Marketing"
  ],
  "areaServed": {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Worldwide"
  }
};

// Enhanced FAQ for SEO Services with more detailed answers
export const enhancedSEOServicesFAQ: FAQPageSchema = {
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
        "text": "SEO results typically begin showing within 3-6 months for most websites. Initial improvements in technical SEO and on-page optimization can be seen within weeks, while significant ranking and traffic increases usually occur between 6-12 months. The timeline depends on your website's current state, competition level, industry, and the consistency of SEO implementation."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "What's included in your SEO audit?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Our comprehensive SEO audit includes technical SEO analysis (site speed, mobile-friendliness, crawlability), on-page optimization review, keyword analysis, competitor research, backlink profile assessment, content evaluation, and local SEO factors. You'll receive a detailed report with prioritized recommendations and an action plan for implementation."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "Do you offer ongoing SEO management?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Yes, we provide ongoing SEO management services including monthly keyword monitoring, content optimization, technical maintenance, link building campaigns, performance reporting, and strategy adjustments based on algorithm updates and market changes."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "What makes your SEO approach different?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Our SEO approach combines technical expertise with custom development capabilities. We don't just optimize content - we can rebuild and enhance your website's technical foundation, implement advanced schema markup, optimize Core Web Vitals, and integrate with automation tools like n8n for scalable SEO processes."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "Can you help with local SEO?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Absolutely! Our local SEO services include Google Business Profile optimization, local keyword targeting, citation building, review management, local schema markup implementation, and geo-targeted content strategy to improve visibility in local search results."
      }
    }
  ]
};

// App Development FAQ with technical focus
export const enhancedAppDevelopmentFAQ: FAQPageSchema = {
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
        "text": "We specialize in modern React applications using TypeScript for type safety, Tailwind CSS for styling, Vite for fast development, and shadcn/ui for consistent components. We also integrate with databases like Supabase, implement GraphQL APIs, and ensure mobile-first responsive design."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "Do you build mobile apps or just web applications?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "We focus on progressive web applications (PWAs) that work seamlessly across all devices. These provide native app-like experiences while maintaining the advantages of web technologies - easier updates, better SEO, and cross-platform compatibility without separate app store deployments."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "How do you ensure app performance and SEO?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "We implement server-side rendering, optimize Core Web Vitals, use efficient code splitting, implement proper meta tags and schema markup, ensure fast loading times, and follow SEO best practices throughout development. Every app is built with search engine visibility in mind."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Question",
      "name": "What's your development process like?",
      "acceptedAnswer": {
        "@context": "https://schema.org",
        "@type": "Answer",
        "text": "Our process includes discovery and planning, UI/UX design, iterative development with regular client feedback, thorough testing, SEO optimization, performance tuning, and post-launch support. We use Git for version control and provide staging environments for review."
      }
    }
  ]
};

// Workflow Automation HowTo with more detailed steps
export const enhancedWorkflowAutomationHowTo: HowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Implement n8n Workflow Automation for Business Efficiency",
  "description": "Complete guide to setting up automated business workflows using n8n platform to eliminate manual tasks, integrate systems, and improve operational efficiency",
  "image": "https://mardenseo.com/images/n8n-workflow-automation.jpg",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@context": "https://schema.org",
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": 0
  },
  "step": [
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Audit Current Business Processes",
      "text": "Document all manual, repetitive tasks in your business. Identify processes that involve data entry, file transfers, notifications, or routine communications. Map out the current workflow including inputs, outputs, timing, and responsible parties.",
      "url": "https://mardenseo.com/workflow-automation#audit",
      "image": "https://mardenseo.com/images/process-audit.jpg"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep", 
      "name": "Prioritize Automation Opportunities",
      "text": "Rank processes by time saved, frequency, error reduction potential, and implementation complexity. Focus on high-impact, low-complexity automations first to build momentum and demonstrate ROI quickly.",
      "url": "https://mardenseo.com/workflow-automation#prioritize",
      "image": "https://mardenseo.com/images/automation-priority.jpg"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Set Up n8n Environment",
      "text": "Install n8n locally or use the cloud version. Configure authentication for your business tools (Gmail, Slack, CRM, databases). Set up proper security credentials and API access tokens for all integrated services.",
      "url": "https://mardenseo.com/workflow-automation#setup",
      "image": "https://mardenseo.com/images/n8n-setup.jpg"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Design and Build Workflows",
      "text": "Create n8n workflows using the visual editor. Connect trigger nodes (webhooks, schedules, email) with action nodes (database updates, notifications, file operations). Include error handling and conditional logic for robust automation.",
      "url": "https://mardenseo.com/workflow-automation#build",
      "image": "https://mardenseo.com/images/workflow-design.jpg"
    },
    {
      "@context": "https://schema.org",
      "@type": "HowToStep",
      "name": "Test and Deploy Automation",
      "text": "Test workflows with sample data and edge cases. Monitor execution logs and performance. Deploy to production with proper monitoring, alerts, and backup procedures. Train team members on new automated processes.",
      "url": "https://mardenseo.com/workflow-automation#deploy",
      "image": "https://mardenseo.com/images/workflow-testing.jpg"
    }
  ],
  "tool": [
    "n8n workflow automation platform",
    "Business application APIs",
    "Webhook endpoints", 
    "Database connections",
    "Email services",
    "Cloud storage platforms"
  ],
  "supply": [
    "Business process documentation",
    "API credentials and access tokens",
    "System administrator permissions",
    "Test data for workflow validation"
  ]
};

// Price Range Schema for Services (helps with local SEO)
export const servicePriceRanges = {
  seoAudit: {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Professional SEO Audit",
    "description": "Comprehensive website SEO analysis and recommendations",
    "priceRange": "$500-$1500",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://mardenseo.com/contact",
    "validFrom": "2025-01-01"
  },
  seoManagement: {
    "@context": "https://schema.org", 
    "@type": "Offer",
    "name": "Ongoing SEO Management",
    "description": "Monthly SEO optimization and monitoring services",
    "priceRange": "$1000-$5000",
    "priceCurrency": "USD", 
    "availability": "https://schema.org/InStock",
    "url": "https://mardenseo.com/contact",
    "validFrom": "2025-01-01"
  },
  appDevelopment: {
    "@context": "https://schema.org",
    "@type": "Offer", 
    "name": "Custom App Development",
    "description": "React application development and deployment",
    "priceRange": "$5000-$25000",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock", 
    "url": "https://mardenseo.com/contact",
    "validFrom": "2025-01-01"
  }
};

export {
  enhancedOrganizationSchema,
  enhancedSEOServicesFAQ,
  enhancedAppDevelopmentFAQ,
  enhancedWorkflowAutomationHowTo,
  servicePriceRanges
};