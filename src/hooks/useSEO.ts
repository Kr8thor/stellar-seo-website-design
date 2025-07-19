// src/hooks/useSEO.ts
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getSEOConfig, type SEOConfig } from '../data/comprehensiveSEOConfigs';

interface UseSEOProps {
  pageKey: string;
  dynamicData?: any;
}

export const useSEO = ({ pageKey, dynamicData }: UseSEOProps) => {
  const getSEOData = (): SEOConfig => {
    if (pageKey === 'blog-post' && dynamicData) {
      const baseURL = 'https://mardenseo.com';
      const title = `${dynamicData.title} | Marden SEO Blog`;
      const description = dynamicData.excerpt || dynamicData.description || 'Expert SEO insights and strategies from Marden SEO professionals.';
      
      return {
        title,
        description,
        keywords: dynamicData.tags || ['SEO', 'digital marketing', 'search optimization'],
        canonical: `${baseURL}/blog/${dynamicData.id}`,
        openGraph: {
          title,
          description,
          image: dynamicData.image || `${baseURL}/og-image.jpg`,
          type: 'article',
          url: `${baseURL}/blog/${dynamicData.id}`
        },
        twitterCard: {
          card: 'summary_large_image',
          site: '@mardenseo',
          image: dynamicData.image || `${baseURL}/og-image.jpg`,
          title,
          description
        },
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: dynamicData.title,
          description,
          author: {
            '@type': 'Person',
            name: dynamicData.author || 'Leo Corbett'
          },
          datePublished: dynamicData.date,
          image: dynamicData.image || `${baseURL}/og-image.jpg`,
          publisher: {
            '@type': 'Organization',
            name: 'Marden SEO'
          }
        }
      };
    }
    return getSEOConfig(pageKey);
  };

  const seoData = getSEOData();

  useEffect(() => {
    document.title = seoData.title;
  }, [seoData.title]);

  const SEOHelmet = () => (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <link rel="canonical" href={seoData.canonical} />
      
      {seoData.noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      <meta property="og:title" content={seoData.openGraph.title} />
      <meta property="og:description" content={seoData.openGraph.description} />
      <meta property="og:image" content={seoData.openGraph.image} />
      <meta property="og:type" content={seoData.openGraph.type} />
      <meta property="og:url" content={seoData.openGraph.url} />
      <meta property="og:site_name" content="Marden SEO" />
      
      <meta name="twitter:card" content={seoData.twitterCard.card} />
      <meta name="twitter:site" content={seoData.twitterCard.site} />
      <meta name="twitter:image" content={seoData.twitterCard.image} />
      <meta name="twitter:title" content={seoData.twitterCard.title} />
      <meta name="twitter:description" content={seoData.twitterCard.description} />
      
      <meta name="author" content="Marden SEO" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {Object.keys(seoData.schema).length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.schema)}
        </script>
      )}
      
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  );

  return {
    SEOHelmet,
    seoData
  };
};

export const usePageSEO = (pageKey: string) => {
  return useSEO({ pageKey });
};

export const useDynamicSEO = (pageKey: string, dynamicData: any) => {
  return useSEO({ pageKey, dynamicData });
};