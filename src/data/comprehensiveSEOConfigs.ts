// 🎯 COMPREHENSIVE SEO CONFIGURATIONS
// Enhanced meta descriptions and keywords for all pages
// Updated: July 2025 - Full Implementation

import { EnhancedSchema, SchemaConfig } from '@/types/schema';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  type: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  schemaConfig?: SchemaConfig;
}

// 📄 CORE BUSINESS PAGES
export const comprehensiveSEOConfigs: Record<string, SEOConfig> = {
  
  // 🏠 HOMEPAGE - Brand Authority & Core Services
  home: {
    title: "Marden SEO - Expert SEO Services & App Development | Professional Digital Marketing",
    description: "Get expert SEO services that boost organic traffic and rankings. Marden SEO delivers proven strategies for businesses ready to dominate search results.",
    keywords: "Marden SEO, SEO services, search engine optimization, app development, n8n automation, React development, digital marketing, web development, SEO consultant, professional SEO, organic traffic, search rankings",
    type: "website",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 👥 ABOUT PAGE - Team Expertise & Credibility
  about: {
    title: "About Marden SEO | Expert SEO & Development Team | Professional Background",
    description: "Meet the SEO expert behind Marden SEO. Learn about proven experience in search engine optimization, app development, and digital marketing success stories.",
    keywords: "SEO expert, app developer, digital marketing team, SEO consultant, web development team, professional experience, SEO specialist, development expertise, client success stories",
    type: "website",
    author: "Marden SEO Team"
  },

  // 🛠️ SERVICES PAGE - Core Service Offerings
  services: {
    title: "Professional SEO & App Development Services | Marden SEO | Proven Results",
    description: "Discover comprehensive SEO services including technical optimization, content strategy, and link building. Proven results for businesses seeking higher rankings.",
    keywords: "SEO services, technical SEO, app development, React development, n8n automation, content optimization, link building, digital transformation, SEO packages, professional services",
    type: "service",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 💰 SERVICES & PRICING PAGE - Educational & Development Services
  servicesPricing: {
    title: "Web Development & Educational Services | Transparent Pricing | Marden SEO",
    description: "Exceptional web development and educational services. Choose from done-for-you sites, self-paced learning, or personalized coaching. Transparent pricing available.",
    keywords: "web development services, website pricing, web development education, done-for-you websites, web development coaching, website training, Lovable development, AI-powered websites, transparent pricing",
    type: "service",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 📱 APP BUILDING PAGE - Custom Development Services
  appBuilding: {
    title: "Custom App Development | React & Modern Solutions | Marden SEO",
    description: "Professional custom application development using React, modern frameworks, and cutting-edge technologies. Scalable solutions for your business needs and growth.",
    keywords: "custom app development, React development, web applications, mobile-first development, modern web apps, JavaScript development, frontend development, scalable applications, custom solutions",
    type: "service",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 🔄 WORKFLOW AUTOMATION PAGE - n8n & Process Optimization
  workflowAutomation: {
    title: "Workflow Automation Services | n8n & Custom Solutions | Marden SEO",
    description: "Streamline your business processes with custom workflow automation using n8n, Zapier alternatives, and bespoke solutions. Increase efficiency and reduce manual work.",
    keywords: "workflow automation, n8n automation, business process automation, custom automation, Zapier alternative, process optimization, workflow integration, business efficiency, automated workflows",
    type: "service",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 🎯 PORTFOLIO PAGE - Case Studies & Results
  portfolio: {
    title: "Portfolio & Case Studies | Proven SEO Results | Client Success Stories",
    description: "Explore successful SEO campaigns and app development projects. Real results, measurable improvements, and satisfied clients across various industries.",
    keywords: "SEO portfolio, case studies, SEO results, client success stories, proven SEO campaigns, app development portfolio, client testimonials, video reviews, project results, industry experience",
    type: "website",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 📞 CONTACT PAGE - Conversion-Focused
  contact: {
    title: "Contact Marden SEO | Get Your Free SEO Consultation | Professional Services",
    description: "Ready to boost your online presence? Contact Marden SEO for a free consultation. Get expert SEO and app development services tailored to your business needs.",
    keywords: "SEO consultation, contact SEO expert, SEO services quote, app development consultation, free consultation, professional SEO, business consultation, digital marketing consultation",
    type: "website",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 📝 BLOG HUB PAGE - Content Marketing Center
  blog: {
    title: "SEO Insights & Strategy Blog | Latest Tips & Trends | Marden SEO",
    description: "Expert SEO tips, strategies, and insights to help you improve search visibility and stay ahead of the competition. Latest trends and best practices available.",
    keywords: "SEO blog, SEO tips, search engine optimization, digital marketing blog, SEO strategies, SEO best practices, content marketing, SEO insights, industry trends, optimization techniques",
    type: "blog",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 📊 ADMIN PAGE - Internal Management
  admin: {
    title: "Admin Dashboard | Marden SEO | Content Management",
    description: "Internal administration dashboard for managing Marden SEO website content, analytics, and system settings. Authorized access required.",
    keywords: "admin dashboard, content management, website administration, internal tools, system management",
    type: "website",
    noIndex: true
  },

  // 🛒 CART PAGE - E-commerce Integration
  cart: {
    title: "Shopping Cart | Marden SEO Services | Secure Checkout",
    description: "Review your selected SEO services and development packages. Secure checkout process with transparent pricing and instant confirmation.",
    keywords: "shopping cart, SEO packages, service checkout, secure payment, SEO services purchase, development packages, digital services cart",
    type: "website",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 🔍 CASE STUDY PAGE - Project Deep Dives
  caseStudy: {
    title: "SEO Case Studies | Detailed Project Results | Marden SEO Success Stories",
    description: "In-depth analysis of successful SEO campaigns and app development projects. Detailed methodology, challenges overcome, and measurable results achieved.",
    keywords: "SEO case studies, project analysis, campaign results, client success, SEO methodology, project management, results analysis, performance metrics, success stories",
    type: "article",
    image: "https://mardenseo.com/opengraph-image.png"
  },

  // 🐛 DEBUG PAGE - Development Tools
  debug: {
    title: "Debug Tools | Marden SEO | Development Testing",
    description: "Internal debugging and testing tools for Marden SEO website development. WordPress integration testing and system diagnostics.",
    keywords: "debug tools, website testing, development tools, system diagnostics, WordPress integration",
    type: "website",
    noIndex: true
  },

  // 📋 INDEX PAGE - Site Directory
  index: {
    title: "Site Index | Marden SEO | Website Directory",
    description: "Complete directory of all Marden SEO website pages and resources. Easy navigation to all services, content, and information.",
    keywords: "site index, website directory, page directory, site navigation, website map, page listing",
    type: "website"
  },

  // 404 NOT FOUND PAGE - Error Handling
  notFound: {
    title: "Page Not Found | Marden SEO | Professional SEO Services",
    description: "The page you're looking for doesn't exist. Explore our SEO services, app development solutions, or contact us for assistance with your digital marketing needs.",
    keywords: "404 error, page not found, SEO services, app development, digital marketing, professional services",
    type: "website",
    noIndex: true
  },

  // 🗺️ SITEMAP PAGE - Site Structure
  sitemap: {
    title: "Website Sitemap | Marden SEO | Site Structure",
    description: "Complete sitemap of the Marden SEO website. Easy navigation to all pages, services, blog posts, and resources for optimal user experience.",
    keywords: "website sitemap, site structure, page navigation, website organization, site map, page directory",
    type: "website"
  },

  // 📊 ANALYTICS TEST PAGE - Performance Monitoring
  analyticsTest: {
    title: "Analytics Testing | Marden SEO | Performance Monitoring",
    description: "Internal analytics testing and performance monitoring tools for Marden SEO website optimization and tracking system validation.",
    keywords: "analytics testing, performance monitoring, website analytics, tracking validation, optimization tools",
    type: "website",
    noIndex: true
  }
};

// 📝 BLOG POST SPECIFIC CONFIGURATIONS
export const blogPostSEOConfigs: Record<string, SEOConfig> = {
  
  // E-E-A-T Complete Guide
  eatGuide: {
    title: "E-E-A-T Complete Guide | Expertise Authority Trust | Marden SEO",
    description: "Master Google's E-E-A-T signals with our comprehensive guide. Learn how Experience, Expertise, Authoritativeness, and Trustworthiness impact SEO rankings.",
    keywords: "E-E-A-T, expertise authority trust, Google ranking factors, SEO guidelines, content quality, YMYL pages, authoritativeness, trustworthiness signals, experience factors",
    type: "article",
    author: "Leo Corbett"
  },

  // On-Page SEO Tactics
  onPageSEO: {
    title: "10 On-Page SEO Tactics That Still Work in 2025 | Marden SEO",
    description: "Discover 10 proven on-page SEO tactics that continue to drive results in 2025. Practical strategies for title tags, meta descriptions, and content optimization.",
    keywords: "on-page SEO, SEO tactics 2025, title tag optimization, meta descriptions, content optimization, internal linking, header tags, keyword optimization, page optimization",
    type: "article",
    author: "Leo Corbett"
  },

  // Core Web Vitals
  coreWebVitals: {
    title: "Core Web Vitals Still Running Your SEO Life in 2025 | Marden SEO",
    description: "Understanding Core Web Vitals impact on SEO in 2025. Complete guide to LCP, FID, CLS optimization for better search rankings and user experience.",
    keywords: "Core Web Vitals, LCP optimization, FID improvement, CLS fixes, page speed, user experience, SEO performance, web vitals 2025, site speed optimization",
    type: "article",
    author: "Leo Corbett"
  },

  // AI Revolution in SEO
  aiSEO: {
    title: "AI Revolution in SEO: How to Adapt Your Strategy | Marden SEO",
    description: "Navigate the AI revolution in SEO with strategic adaptation techniques. Learn how artificial intelligence is changing search and content optimization.",
    keywords: "AI SEO, artificial intelligence marketing, SEO strategy 2025, AI content optimization, machine learning SEO, search algorithm changes, AI adaptation, future SEO",
    type: "article",
    author: "Leo Corbett"
  },

  // Local SEO Mastery
  localSEO: {
    title: "Local SEO Mastery: Dominate Your Geographic Market | Marden SEO",
    description: "Master local SEO strategies to dominate your geographic market. Complete guide to Google Business Profile optimization and local search rankings.",
    keywords: "local SEO, Google Business Profile, local search optimization, geographic SEO, local citations, map pack optimization, local rankings, business listings",
    type: "article",
    author: "Leo Corbett"
  },

  // Mobile-First Indexing
  mobileFirst: {
    title: "Mobile-First Indexing: Is Your Site Truly Ready? | Marden SEO",
    description: "Ensure your website is mobile-first indexing ready with our comprehensive checklist. Mobile optimization strategies for better search performance.",
    keywords: "mobile-first indexing, mobile optimization, responsive design, mobile SEO, mobile-friendly testing, mobile usability, mobile search rankings",
    type: "article",
    author: "Leo Corbett"
  },

  // Content Strategy Beyond Keywords
  contentStrategy: {
    title: "Content Strategy for SEO: Beyond Keywords | Marden SEO",
    description: "Develop winning content strategies that go beyond keywords. Topic clusters, user intent, and content depth for modern SEO success.",
    keywords: "content strategy, SEO content, topic clusters, user intent, content marketing, editorial calendar, content depth, semantic SEO, content optimization",
    type: "article",
    author: "Leo Corbett"
  },

  // Technical SEO Fundamentals
  technicalSEO: {
    title: "Technical SEO Fundamentals: Foundation of Rankings | Marden SEO",
    description: "Master technical SEO fundamentals with our comprehensive guide. Site architecture, Core Web Vitals, and structured data for better search performance.",
    keywords: "technical SEO, site architecture, structured data, crawlability, indexability, XML sitemaps, robots.txt, canonical URLs, technical optimization",
    type: "article",
    author: "Leo Corbett"
  },

  // Link Building in 2025
  linkBuilding: {
    title: "Link Building in 2025: Quality Over Quantity | Marden SEO",
    description: "Modern link building strategies focused on quality over quantity. Content-first approaches and relationship building for sustainable SEO growth.",
    keywords: "link building, quality backlinks, content marketing, relationship building, digital PR, link earning, authority building, sustainable SEO, link acquisition",
    type: "article",
    author: "Leo Corbett"
  }
};

// 📊 CASE STUDY SPECIFIC CONFIGURATIONS
export const caseStudySEOConfigs: Record<string, SEOConfig> = {
  
  // E-commerce SEO Case Study
  ecommerceSEO: {
    title: "E-commerce SEO Case Study | 300% Traffic Growth | Marden SEO",
    description: "Detailed e-commerce SEO case study showing 300% organic traffic growth. Strategy, implementation, and measurable results for online retail success.",
    keywords: "e-commerce SEO, case study, organic traffic growth, online retail SEO, product optimization, category pages, e-commerce strategy, conversion optimization",
    type: "article",
    author: "Leo Corbett"
  },

  // SaaS Growth Case Study
  saasGrowth: {
    title: "SaaS Growth SEO Case Study | B2B Lead Generation | Marden SEO",
    description: "B2B SaaS SEO case study demonstrating lead generation growth through strategic content marketing and technical optimization. Real results and methodology.",
    keywords: "SaaS SEO, B2B lead generation, software marketing, case study, content marketing, technical SEO, SaaS growth, lead generation strategy",
    type: "article",
    author: "Leo Corbett"
  },

  // Local Business Case Study
  localBusiness: {
    title: "Local Business SEO Case Study | Map Pack Domination | Marden SEO",
    description: "Local business SEO case study showing map pack domination and local search growth. Complete strategy and implementation for geographic success.",
    keywords: "local business SEO, map pack optimization, local case study, Google Business Profile, local citations, geographic SEO, local search results",
    type: "article",
    author: "Leo Corbett"
  }
};

// 🎯 UNIFIED EXPORT FOR EASY ACCESS
export const allSEOConfigs = {
  ...comprehensiveSEOConfigs,
  ...blogPostSEOConfigs,
  ...caseStudySEOConfigs
};

// 🔍 HELPER FUNCTIONS
export const getSEOConfig = (pageKey: string): SEOConfig => {
  return allSEOConfigs[pageKey] || comprehensiveSEOConfigs.notFound;
};

export const validateSEOConfig = (config: SEOConfig): boolean => {
  // Validate meta description length
  if (config.description.length < 120 || config.description.length > 165) {
    console.warn(`Meta description length issue: ${config.description.length} characters`);
    return false;
  }
  
  // Validate keywords count
  const keywordCount = config.keywords.split(',').length;
  if (keywordCount > 15) {
    console.warn(`Too many keywords: ${keywordCount} keywords`);
    return false;
  }
  
  return true;
};

// 📊 ANALYTICS TRACKING
export const trackSEOPerformance = (pageKey: string, config: SEOConfig) => {
  // Add analytics tracking for SEO performance
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'seo_config_loaded', {
      page_key: pageKey,
      title_length: config.title.length,
      description_length: config.description.length,
      keywords_count: config.keywords.split(',').length
    });
  }
};

export default allSEOConfigs;