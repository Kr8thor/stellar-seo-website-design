
/**
 * CMS Configuration
 * Centralized configuration for cms.mardenseo.com integration
 */

export const CMS_CONFIG = {
  // Main GraphQL endpoint
  graphqlEndpoint: 'https://cms.mardenseo.com/graphql',
  
  // REST API endpoint (if needed)
  restEndpoint: 'https://cms.mardenseo.com/wp-json/wp/v2',
  
  // Preview configuration
  preview: {
    enabled: true,
    secret: 'your-preview-secret', // Set this in your CMS
  },
  
  // Caching configuration
  cache: {
    defaultMaxAge: 300, // 5 minutes
    postsMaxAge: 600,   // 10 minutes
    pagesMaxAge: 3600,  // 1 hour
  },
  
  // Image optimization
  images: {
    domains: ['cms.mardenseo.com'],
    defaultSize: 'medium_large',
    sizes: {
      thumbnail: { width: 150, height: 150 },
      medium: { width: 300, height: 300 },
      large: { width: 1024, height: 1024 },
      featured: { width: 1200, height: 630 },
    }
  },
  
  // Content settings
  content: {
    postsPerPage: 12,
    excerptLength: 155,
    readingSpeed: 200, // words per minute
  },
  
  // SEO defaults
  seo: {
    defaultTitle: 'Marden SEO - AI-Powered SEO & Automation Services',
    defaultDescription: 'Transform your business with AI-first SEO strategies and automation solutions that scale efficiently.',
    defaultImage: '/opengraph-image.png',
    siteName: 'Marden SEO',
  },
  
  // Feature flags
  features: {
    search: true,
    categories: true,
    tags: true,
    comments: false,
    relatedPosts: true,
    socialSharing: true,
    newsletter: true,
  },
  
  // Authentication (if needed for preview/admin features)
  auth: {
    enabled: false, // Set to true if you need authentication
    loginUrl: 'https://cms.mardenseo.com/wp-admin',
  }
};

// Helper function to get image URL with optimization
export const getOptimizedImageUrl = (imageUrl, size = 'medium_large') => {
  if (!imageUrl) return '/assets/blog/default.jpg';
  
  // If it's already a WordPress generated size URL, return as is
  if (imageUrl.includes('-' + size + '.')) {
    return imageUrl;
  }
  
  // Try to construct optimized URL
  const config = CMS_CONFIG.images.sizes[size];
  if (config && imageUrl.includes('cms.mardenseo.com')) {
    // WordPress automatically generates these sizes
    const extension = imageUrl.split('.').pop();
    const baseUrl = imageUrl.replace(`.${extension}`, '');
    return `${baseUrl}-${config.width}x${config.height}.${extension}`;
  }
  
  return imageUrl;
};

// Helper to check if we're in preview mode
export const isPreviewMode = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('preview');
};

// Helper to get preview token
export const getPreviewToken = () => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('token');
};

export default CMS_CONFIG;
