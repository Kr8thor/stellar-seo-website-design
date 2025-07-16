import { useEffect, useMemo } from 'react';
import { useSEO as useSEOContext } from '@/components/seo/SEOProvider';
import { useLocation } from 'react-router-dom';
import { EnhancedSchema, SchemaConfig } from '@/types/schema';
import { 
  allSEOConfigs, 
  getSEOConfig, 
  validateSEOConfig, 
  trackSEOPerformance,
  SEOConfig 
} from '@/data/comprehensiveSEOConfigs';

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

export const useSEO = (options: SEOOptions = {}, pageKey?: string) => {
  const { setSEO } = useSEOContext();
  const location = useLocation();

  // Get comprehensive SEO config if pageKey is provided
  const comprehensiveConfig = useMemo(() => {
    if (pageKey) {
      const config = getSEOConfig(pageKey);
      // Validate the configuration
      if (!validateSEOConfig(config)) {
        console.warn(`SEO configuration validation failed for page: ${pageKey}`);
      }
      // Track performance
      trackSEOPerformance(pageKey, config);
      return config;
    }
    return null;
  }, [pageKey]);

  // Merge comprehensive config with manual options (manual options take precedence)
  const finalOptions = useMemo(() => {
    if (comprehensiveConfig) {
      return {
        ...comprehensiveConfig,
        ...options // Manual options override comprehensive config
      };
    }
    return options;
  }, [comprehensiveConfig, options]);

  // Memoize the final options to prevent infinite re-renders
  const memoizedOptions = useMemo(() => finalOptions, [
    finalOptions.title,
    finalOptions.description, 
    finalOptions.keywords,
    finalOptions.image,
    finalOptions.type,
    finalOptions.author,
    finalOptions.publishedTime,
    finalOptions.modifiedTime,
    finalOptions.noIndex,
    JSON.stringify(finalOptions.schemas),
    JSON.stringify(finalOptions.schemaConfig)
  ]);

  useEffect(() => {
    const baseUrl = 'https://mardenseo.com';
    const currentUrl = `${baseUrl}${location.pathname}`;

    // CRITICAL FIX: Ensure SEO data is set immediately and completely
    setSEO({
      ...memoizedOptions,
      url: currentUrl
    });

    // Handle noindex pages explicitly
    if (memoizedOptions.noIndex) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);

      return () => {
        if (document.head.contains(meta)) {
          document.head.removeChild(meta);
        }
      };
    } else {
      // CRITICAL FIX: Ensure indexable pages have explicit robots directive
      const existingRobotsMeta = document.querySelector('meta[name="robots"]');
      if (existingRobotsMeta && existingRobotsMeta.getAttribute('content')?.includes('noindex')) {
        existingRobotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      }
    }
  }, [setSEO, location.pathname, memoizedOptions]);
};
// 🔄 BACKWARD COMPATIBILITY - Legacy SEO Configurations
// These are kept for existing pages that haven't been updated yet
export const seoConfigs = {
  home: allSEOConfigs.home,
  about: allSEOConfigs.about,
  services: allSEOConfigs.services,
  servicesPricing: allSEOConfigs.servicesPricing,
  blog: allSEOConfigs.blog,
  contact: allSEOConfigs.contact,
  workflowAutomation: allSEOConfigs.workflowAutomation,
  appBuilding: allSEOConfigs.appBuilding,
  portfolio: allSEOConfigs.portfolio,
  notFound: allSEOConfigs.notFound
};

// Enhanced SEO configurations using Phase 2 schemas
import { 
  enhancedSchemaConfig,
  generateBreadcrumbs 
} from '@/data/enhancedSchemas';

// Enhanced service page configurations
export const enhancedSeoConfigs = {
  services: {
    ...allSEOConfigs.services,
    schemaConfig: {
      service: enhancedSchemaConfig.services.seo,
      faq: enhancedSchemaConfig.faq.seoServices,
      breadcrumbs: generateBreadcrumbs('/services')
    }
  },
  servicesPricing: {
    ...allSEOConfigs.servicesPricing,
    schemaConfig: {
      service: enhancedSchemaConfig.services.seo,
      faq: enhancedSchemaConfig.faq.seoServices,
      breadcrumbs: generateBreadcrumbs('/services-pricing')
    }
  },
  appBuilding: {
    ...allSEOConfigs.appBuilding,
    schemaConfig: {
      service: enhancedSchemaConfig.services.appDevelopment,
      faq: enhancedSchemaConfig.faq.appDevelopment,
      breadcrumbs: generateBreadcrumbs('/app-building')
    }
  },
  workflowAutomation: {
    ...allSEOConfigs.workflowAutomation,
    schemaConfig: {
      service: enhancedSchemaConfig.services.workflowAutomation,
      howTo: enhancedSchemaConfig.howTo.n8nAutomation,
      breadcrumbs: generateBreadcrumbs('/workflow-automation')
    }
  },
  // Enhanced configurations for other pages
  home: {
    ...allSEOConfigs.home,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/')
    }
  },
  about: {
    ...allSEOConfigs.about,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/about')
    }
  },
  portfolio: {
    ...allSEOConfigs.portfolio,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/portfolio')
    }
  },
  blog: {
    ...allSEOConfigs.blog,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/blog')
    }
  },
  contact: {
    ...allSEOConfigs.contact,
    schemaConfig: {
      breadcrumbs: generateBreadcrumbs('/contact')
    }
  }
};

// Helper function to get enhanced SEO config by page key
export const getEnhancedSEOConfig = (pageKey: keyof typeof enhancedSeoConfigs) => {
  return enhancedSeoConfigs[pageKey] || seoConfigs[pageKey];
};

// 🎯 SIMPLE PAGE KEY MAPPING
export const PAGE_KEYS = {
  home: 'home',
  about: 'about',
  services: 'services',
  servicesPricing: 'servicesPricing',
  appBuilding: 'appBuilding',
  workflowAutomation: 'workflowAutomation',
  portfolio: 'portfolio',
  blog: 'blog',
  contact: 'contact',
  cart: 'cart',
  admin: 'admin',
  debug: 'debug',
  notFound: 'notFound',
  caseStudy: 'caseStudy',
  analyticsTest: 'analyticsTest',
  sitemap: 'sitemap',
  index: 'index'
} as const;

// 📝 BLOG POST KEYS
export const BLOG_POST_KEYS = {
  eatGuide: 'eatGuide',
  onPageSEO: 'onPageSEO',
  coreWebVitals: 'coreWebVitals',
  aiSEO: 'aiSEO',
  localSEO: 'localSEO',
  mobileFirst: 'mobileFirst',
  contentStrategy: 'contentStrategy',
  technicalSEO: 'technicalSEO',
  linkBuilding: 'linkBuilding'
} as const;

// 📊 CASE STUDY KEYS
export const CASE_STUDY_KEYS = {
  ecommerceSEO: 'ecommerceSEO',
  saasGrowth: 'saasGrowth',
  localBusiness: 'localBusiness'
} as const;

// 🎯 CONVENIENCE FUNCTIONS
export const useSEOWithKey = (pageKey: string, overrides: SEOOptions = {}) => {
  return useSEO(overrides, pageKey);
};

export const useBlogPostSEO = (postKey: string, overrides: SEOOptions = {}) => {
  return useSEO(overrides, postKey);
};

export const useCaseStudySEO = (caseKey: string, overrides: SEOOptions = {}) => {
  return useSEO(overrides, caseKey);
};

export default useSEO;