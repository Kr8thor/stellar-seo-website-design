
import { useEffect } from 'react';
import { useSEO as useSEOContext } from '@/components/seo/SEOProvider';
import { useLocation } from 'react-router-dom';

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
}

export const useSEO = (options: SEOOptions = {}) => {
  const { setSEO } = useSEOContext();
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://mardenseo.com';
    const currentUrl = `${baseUrl}${location.pathname}`;

    setSEO({
      ...options,
      url: currentUrl
    });

    // Add noindex meta tag if specified
    if (options.noIndex) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);

      return () => {
        document.head.removeChild(meta);
      };
    }
  }, [setSEO, location.pathname, options]);
};

// Predefined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: "Marden SEO | Professional Search Engine Optimization & App Development Services",
    description: "Elevate your online presence with data-driven SEO strategies and custom application development using n8n, MCPs, and React. Expert services tailored to improve your rankings and drive growth.",
    keywords: "SEO services, search engine optimization, app development, n8n automation, React development, digital marketing, web development, SEO consultant",
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
  }
};
