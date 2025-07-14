import { useEffect, useMemo } from 'react';
import { useSEO as useSEOContext } from '@/components/seo/SEOProvider';
import { useLocation } from 'react-router-dom';
import { EnhancedSchema, SchemaConfig } from '@/types/schema';

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  // Phase 2 Enhanced Schema Support
  schemas?: EnhancedSchema[];
  schemaConfig?: SchemaConfig;
}

export const useSEO = (options: SEOOptions = {}) => {
  const { setSEO } = useSEOContext();
  const location = useLocation();

  // Memoize the options to prevent infinite re-renders
  const memoizedOptions = useMemo(() => options, [
    options.title,
    options.description, 
    options.keywords,
    options.image,
    options.type,
    options.author,
    options.publishedTime,
    options.modifiedTime,
    options.noIndex,
    JSON.stringify(options.schemas),
    JSON.stringify(options.schemaConfig)
  ]);

  useEffect(() => {
    const baseUrl = 'https://mardenseo.com';
    const currentUrl = `${baseUrl}${location.pathname}`;

    setSEO({
      ...memoizedOptions,
      url: currentUrl
    });

    // Add noindex meta tag if specified
    if (memoizedOptions.noIndex) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);

      return () => {
        document.head.removeChild(meta);
      };
    }
  }, [setSEO, location.pathname, memoizedOptions]);
};

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: "Marden SEO - Expert SEO Services & App Development | Professional Digital Marketing",
    description: "Marden SEO provides professional search engine optimization, custom app development, and workflow automation services. Boost your online presence with expert Marden SEO solutions.",
    keywords: "Marden SEO, SEO services, search engine optimization, app development, n8n automation, React development, digital marketing, web development, SEO consultant, professional SEO",
    type: "website"
  },
  about: {
    title: "About Marden SEO | Expert SEO & Development Team",
    description: "Meet the expert team behind Marden SEO. Learn about our experience in search engine optimization, app development, and digital transformation services.",
    keywords: "SEO expert, app developer, digital marketing team, SEO consultant, web development team",
    type: "website"
  },
  services: {
    title: "SEO & App Development Services | Marden SEO",
    description: "Comprehensive SEO and app development services including technical SEO, content optimization, React development, n8n automation, and digital transformation.",
    keywords: "SEO services, technical SEO, app development, React development, n8n automation, content optimization, digital transformation",
    type: "service"
  },
  servicesPricing: {
    title: "Web Development & Educational Services | Pricing | Marden SEO",
    description: "Exceptional websites and web development education. Choose from done-for-you sites, self-paced learning, or personalized coaching. Transparent pricing, expert guidance.",
    keywords: "web development services, website pricing, web development education, done-for-you websites, web development coaching, website training, Lovable development, AI-powered websites",
    type: "service"
  },
  blog: {
    title: "SEO Insights & Blog | Marden SEO",
    description: "Expert tips, strategies, and insights to help you improve your search visibility and stay ahead of the competition. Latest SEO trends and best practices.",
    keywords: "SEO blog, SEO tips, search engine optimization, digital marketing blog, SEO strategies, SEO best practices",
    type: "blog"
  },
  contact: {
    title: "Contact Marden SEO | Get Your Free SEO Consultation",
    description: "Ready to boost your online presence? Contact Marden SEO for a free consultation. Get expert SEO and app development services tailored to your business needs.",
    keywords: "SEO consultation, contact SEO expert, SEO services quote, app development consultation",
    type: "website"
  },
  workflowAutomation: {
    title: "Workflow Automation Services | n8n & Custom Solutions | Marden SEO",
    description: "Streamline your business processes with custom workflow automation using n8n, Zapier alternatives, and bespoke solutions. Increase efficiency and reduce manual work.",
    keywords: "workflow automation, n8n, business process automation, custom automation, Zapier alternative, process optimization",
    type: "service"
  },
  appBuilding: {
    title: "Custom App Development | React & Modern Solutions | Marden SEO",
    description: "Professional custom application development using React, modern frameworks, and cutting-edge technologies. Scalable solutions for your business needs.",
    keywords: "custom app development, React development, web applications, mobile-first development, modern web apps",
    type: "service"
  },
  portfolio: {
    title: "Portfolio & Case Studies | Proven SEO Results | Marden SEO",
    description: "Explore our successful SEO campaigns and app development projects. Real results, measurable improvements, and satisfied clients including video testimonials across various industries.",
    keywords: "SEO portfolio, case studies, SEO results, client success stories, proven SEO campaigns, app development portfolio, client testimonials, video reviews",
    type: "website"
  },
  notFound: {
    title: "Page Not Found | Marden SEO",
    description: "The page you're looking for doesn't exist. Explore our SEO services, app development solutions, or contact us for assistance.",
    keywords: "404 error, page not found, SEO services, app development",
    type: "website",
    noIndex: true
  }
};

// Enhanced SEO configurations using Phase 2 schemas
import { 
  enhancedSchemaConfig,
  generateBreadcrumbs 
} from '@/data/enhancedSchemas';

// Enhanced service page configurations
export const enhancedSeoConfigs = {
  services: {
    ...seoConfigs.services,
    schemaConfig: {
      service: enhancedSchemaConfig.services.seo,
      faq: enhancedSchemaConfig.faq.seoServices,
      breadcrumbs: generateBreadcrumbs('/services')
    }
  },
  servicesPricing: {
    ...seoConfigs.servicesPricing,
    schemaConfig: {
      service: enhancedSchemaConfig.services.seo,
      faq: enhancedSchemaConfig.faq.seoServices,
      breadcrumbs: generateBreadcrumbs('/services-pricing')
    }
  },
  appBuilding: {
    ...seoConfigs.appBuilding,
    schemaConfig: {
      service: enhancedSchemaConfig.services.appDevelopment,
      faq: enhancedSchemaConfig.faq.appDevelopment,
      breadcrumbs: generateBreadcrumbs('/app-building')
    }
  },
  workflowAutomation: {
    ...seoConfigs.workflowAutomation,
    schemaConfig: {
      service: enhancedSchemaConfig.services.workflowAutomation,
      howTo: enhancedSchemaConfig.howTo.n8nAutomation,
      breadcrumbs: generateBreadcrumbs('/workflow-automation')
    }
  },
  // Enhanced configurations for other pages
  home: {
    ...seoConfigs.home,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/')
    }
  },
  about: {
    ...seoConfigs.about,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/about')
    }
  },
  portfolio: {
    ...seoConfigs.portfolio,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/portfolio')
    }
  },
  blog: {
    ...seoConfigs.blog,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/blog')
    }
  },
  contact: {
    ...seoConfigs.contact,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/contact')
    }
  }
};

// Helper function to get enhanced SEO config by page key
export const getEnhancedSEOConfig = (pageKey: keyof typeof enhancedSeoConfigs) => {
  return enhancedSeoConfigs[pageKey] || seoConfigs[pageKey];
};
