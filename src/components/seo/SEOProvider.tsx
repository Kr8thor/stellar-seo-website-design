
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
    setSeoData(prevData => {
      // Only update if data is actually different to prevent unnecessary re-renders
      const newData = { ...prevData, ...data };
      const hasChanged = JSON.stringify(prevData) !== JSON.stringify(newData);
      return hasChanged ? newData : prevData;
    });
  }, []);

  const defaultTitle = "Strategic SEO Solutions for Digital Success | Marden SEO";
  const defaultDescription = "Elevate your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions.";
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
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData.url || defaultUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title || defaultTitle} />
        <meta property="og:description" content={seoData.description || defaultDescription} />
        <meta property="og:type" content={seoData.type || "website"} />
        <meta property="og:url" content={seoData.url || defaultUrl} />
        <meta property="og:image" content={seoData.image || defaultImage} />
        <meta property="og:site_name" content="Marden SEO" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@marden_seo" />
        <meta name="twitter:title" content={seoData.title || defaultTitle} />
        <meta name="twitter:description" content={seoData.description || defaultDescription} />
        <meta name="twitter:image" content={seoData.image || defaultImage} />
        
        {/* Article specific */}
        {seoData.publishedTime && <meta property="article:published_time" content={seoData.publishedTime} />}
        {seoData.modifiedTime && <meta property="article:modified_time" content={seoData.modifiedTime} />}
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Marden SEO",
            "url": "https://mardenseo.com",
            "logo": "https://mardenseo.com/favicon.png",
            "description": "Professional SEO and app development services",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://mardenseo.com/contact"
            },
            "sameAs": [
              "https://twitter.com/marden_seo"
            ]
          })}
        </script>
        
        {/* Structured Data - Website */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Marden SEO",
            "url": "https://mardenseo.com",
            "description": defaultDescription,
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
