
import React, { createContext, useContext, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedSchema, SchemaConfig } from '@/types/schema';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  // Phase 2 Enhanced Schema Support
  schemas?: EnhancedSchema[];
  schemaConfig?: SchemaConfig;
}

interface SEOContextType {
  setSEO: (data: SEOData) => void;
}

const SEOContext = createContext<SEOContextType | null>(null);

export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider');
  }
  return context;
};

const SEOProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seoData, setSeoData] = React.useState<SEOData>({});

  // Use useCallback to prevent setSEO from changing on every render
  const setSEO = useCallback((data: SEOData) => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log('[SEO DEBUG] setSEO called with data:', data);
    }
    setSeoData({ ...data }); // Always replace state to force update
  }, []);

  const defaultTitle = "Marden SEO | Professional SEO Services & App Development | Expert Digital Marketing Solutions";
  const defaultDescription = "Marden SEO provides professional search engine optimization, custom app development, and workflow automation services. Expert SEO solutions to boost your online presence and drive organic traffic growth.";
  const defaultImage = "https://mardenseo.com/opengraph-image.png";
  const defaultUrl = "https://mardenseo.com";

  return (
    <SEOContext.Provider value={{ setSEO }}>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoData.title || defaultTitle}</title>
        <meta name="description" content={seoData.description || defaultDescription} />
        <meta name="keywords" content={seoData.keywords || "SEO, search engine optimization, app development, n8n, React, digital marketing, web development"} />
        <meta name="author" content={seoData.author || "Marden SEO"} />
        
        {/* CRITICAL: Explicit robots meta tag for indexability */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Canonical URL - FIXED: Ensure each page has its own canonical */}
        <link rel="canonical" href={seoData.url || defaultUrl} />
        
        {/* Open Graph - Use page-specific data */}
        <meta property="og:title" content={seoData.title || defaultTitle} />
        <meta property="og:description" content={seoData.description || defaultDescription} />
        <meta property="og:type" content={seoData.type || "website"} />
        <meta property="og:url" content={seoData.url || defaultUrl} />
        <meta property="og:image" content={seoData.image || defaultImage} />
        <meta property="og:site_name" content="Marden SEO" />
        
        {/* Twitter Card - Use page-specific data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@marden_seo" />
        <meta name="twitter:title" content={seoData.title || defaultTitle} />
        <meta name="twitter:description" content={seoData.description || defaultDescription} />
        <meta name="twitter:image" content={seoData.image || defaultImage} />
        
        {/* Article specific */}
        {seoData.publishedTime && <meta property="article:published_time" content={seoData.publishedTime} />}
        {seoData.modifiedTime && <meta property="article:modified_time" content={seoData.modifiedTime} />}
        
        {/* Enhanced Structured Data - Professional Service Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Marden SEO",
            "alternateName": ["Marden SEO Services", "Marden SEO Company", "Marden SEO Professional"],
            "brand": {
              "@type": "Brand",
              "name": "Marden SEO"
            },
            "url": "https://mardenseo.com",
            "logo": "https://mardenseo.com/favicon.png",
            "description": "Marden SEO is a professional search engine optimization and app development company providing expert SEO services, custom React applications, and n8n workflow automation solutions.",
            "foundingDate": "2023",
            "serviceArea": "Worldwide",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://mardenseo.com",
              "https://mardenseo.com/about",
              "https://mardenseo.com/services",
              "https://twitter.com/marden_seo"
            ],
            "knowsAbout": [
              "Search Engine Optimization",
              "SEO Services", 
              "Digital Marketing",
              "App Development",
              "React Development",
              "n8n Workflow Automation",
              "Custom Web Applications"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://mardenseo.com/contact",
              "availableLanguage": "English"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "1",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "SEO and Development Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Search Engine Optimization",
                    "description": "Professional SEO services to improve search rankings and organic traffic"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "App Development",
                    "description": "Custom React application development and web solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Workflow Automation",
                    "description": "n8n workflow automation and business process optimization"
                  }
                }
              ]
            }
          })}
        </script>
        
        {/* Enhanced Structured Data - Website with Brand Focus */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Marden SEO",
            "alternateName": "Marden SEO Official Website",
            "url": "https://mardenseo.com",
            "description": "Official website of Marden SEO - Professional SEO and app development services for businesses worldwide",
            "inLanguage": "en-US",
            "publisher": {
              "@type": "Organization",
              "name": "Marden SEO"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mardenseo.com/blog?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Phase 2 Enhanced Schemas */}
        {seoData.schemas && seoData.schemas.map((schema, index) => (
          <script key={`enhanced-schema-${index}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
        
        {/* Individual Schema Config Support */}
        {seoData.schemaConfig?.service && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.schemaConfig.service)}
          </script>
        )}
        {seoData.schemaConfig?.article && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.schemaConfig.article)}
          </script>
        )}
        {seoData.schemaConfig?.breadcrumbs && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.schemaConfig.breadcrumbs)}
          </script>
        )}
        {seoData.schemaConfig?.faq && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.schemaConfig.faq)}
          </script>
        )}
        {seoData.schemaConfig?.howTo && (
          <script type="application/ld+json">
            {JSON.stringify(seoData.schemaConfig.howTo)}
          </script>
        )}
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
};

export default SEOProvider;
