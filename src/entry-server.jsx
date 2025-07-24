import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.tsx';

export async function render(url) {
  // Create a context object for collecting data during render
  const context = {};
  
  // Render the app to string
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );

  // Generate head tags manually without react-helmet-async
  const head = generateHeadTags(url);

  return { html, head };
}

// Helper function to generate appropriate meta tags for each route
function generateHeadTags(url) {
  const baseTitle = ' | Marden SEO';
  const titles = {
    '/': 'Expert SEO Services - Drive Organic Growth',
    '/about': 'About Us - SEO Experts & Digital Marketing Team',
    '/services': 'Professional SEO Services - Boost Your Rankings',
    '/services-pricing': 'SEO Pricing & Packages - Transparent Pricing',
    '/contact': 'Contact Us - Get Your Free SEO Consultation',
    '/portfolio': 'SEO Portfolio - Client Success Stories',
    '/blog': 'SEO Blog - Latest Tips & Industry Insights',
    '/app-building': 'Custom App Development Services',
    '/workflow-automation': 'Workflow Automation with n8n',
    '/admin': 'Admin Dashboard',
    '/cart': 'Shopping Cart',
    '/analytics-test': 'Analytics Testing',
    // Blog posts
    '/blog/local-seo-2025': 'Local SEO in 2025: Complete Domination Guide',
    '/blog/ai-midlife-crisis': 'AI\'s Midlife Crisis: Why Search Engines Still Matter',
    '/blog/on-page-seo-tactics-2025': 'On-Page SEO Tactics for 2025',
    '/blog/core-web-vitals-seo-2025': 'Core Web Vitals & SEO in 2025',
    '/blog/technical-seo-fundamentals': 'Technical SEO Fundamentals',
    '/blog/content-strategy-beyond-keywords': 'Content Strategy Beyond Keywords',
    '/blog/link-building-2025-quality': 'Link Building in 2025: Quality Over Quantity',
    '/blog/mobile-first-indexing-ready': 'Mobile-First Indexing: Is Your Site Ready?',
    '/blog/ai-revolution-seo-strategy': 'The AI Revolution in SEO Strategy'
  };

  const descriptions = {
    '/': 'Transform your online presence with expert SEO services. We help businesses increase organic traffic, improve rankings, and drive sustainable growth.',
    '/about': 'Meet the Marden SEO team. We are passionate SEO experts dedicated to helping businesses succeed online through data-driven strategies.',
    '/services': 'Comprehensive SEO services including technical SEO, content optimization, link building, and local SEO. Customized strategies for your business.',
    '/services-pricing': 'Transparent SEO pricing packages to fit your budget. From small businesses to enterprises, we have the right solution for you.',
    '/contact': 'Ready to grow your online presence? Contact Marden SEO for a free consultation and discover how we can help your business succeed.',
    '/portfolio': 'View our SEO success stories and case studies. See how we have helped businesses achieve significant growth in organic traffic and rankings.',
    '/blog': 'Stay updated with the latest SEO trends, tips, and best practices. Our blog covers everything from technical SEO to content marketing.',
    '/app-building': 'Custom web and mobile application development services. We build scalable, user-friendly apps that drive business growth.',
    '/workflow-automation': 'Streamline your business processes with n8n workflow automation. Save time and reduce errors with custom automation solutions.',
    '/admin': 'Admin dashboard for managing your SEO services account.',
    '/cart': 'Review and complete your SEO service package purchase.',
    '/analytics-test': 'Test page for analytics implementation.',
    // Blog posts
    '/blog/local-seo-2025': 'Master local SEO in 2025 with our complete guide. Learn proven strategies to dominate local search results and attract more customers.',
    '/blog/ai-midlife-crisis': 'Explore why traditional search engines remain crucial despite AI advancements. Understanding the balance between AI and SEO.',
    '/blog/on-page-seo-tactics-2025': 'Discover the most effective on-page SEO tactics for 2025. Optimize your content for better rankings and user experience.',
    '/blog/core-web-vitals-seo-2025': 'Learn how Core Web Vitals impact SEO in 2025. Improve your site performance for better rankings.',
    '/blog/technical-seo-fundamentals': 'Master the technical SEO fundamentals that form the foundation of successful optimization.',
    '/blog/content-strategy-beyond-keywords': 'Build a content strategy that goes beyond keywords. Create valuable content that drives results.',
    '/blog/link-building-2025-quality': 'Quality over quantity: Learn modern link building strategies that work in 2025.',
    '/blog/mobile-first-indexing-ready': 'Ensure your site is ready for mobile-first indexing. Optimization tips and best practices.',
    '/blog/ai-revolution-seo-strategy': 'How AI is revolutionizing SEO strategy. Stay ahead with cutting-edge optimization techniques.'
  };

  const title = titles[url] ? `${titles[url]}${baseTitle}` : `Marden SEO`;
  const description = descriptions[url] || 'Expert SEO services to help your business grow online. Get more traffic, better rankings, and increased conversions.';

  // Determine if this is a noindex page
  const noindexPages = ['/admin', '/cart', '/analytics-test'];
  const noindex = noindexPages.includes(url) ? '<meta name="robots" content="noindex, nofollow" />' : '';

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    ${noindex}
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="https://mardenseo.com${url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <link rel="canonical" href="https://mardenseo.com${url}" />
  `;
}
