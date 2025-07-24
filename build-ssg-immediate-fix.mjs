#!/usr/bin/env node

/**
 * 🚀 IMMEDIATE SSG FIX - PURE STATIC HTML GENERATOR
 * Marden SEO Website - Overwrite All Files with Proper SSG Content
 * 
 * CRITICAL: This script immediately fixes the SSG issue by generating
 * proper static HTML files that replace the React-only versions
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// IMMEDIATE ROUTE DEFINITIONS WITH CONTENT
// =============================================================================

const routes = [
  // Core Business Pages (HIGH PRIORITY - INDEX ALL)
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/services-pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
  { path: '/app-building', priority: 0.7, changefreq: 'monthly' },
  { path: '/workflow-automation', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.7, changefreq: 'daily' },
];

// =============================================================================
// IMMEDIATE META DATA FOR EACH ROUTE
// =============================================================================

const routeMeta = {
  '/': {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    h1: 'Professional SEO Services That Drive Results',
    h2: 'Boost your search rankings with data-driven strategies that increase organic traffic and conversions',
    keywords: ['SEO services', 'search engine optimization', 'digital marketing', 'app development', 'workflow automation'],
    content: `
      <section class="hero-section">
        <p>Transform your online presence with expert SEO services that deliver measurable results. We help businesses increase organic traffic, improve search rankings, and drive sustainable growth through data-driven strategies.</p>
        
        <h3>Our Core Services</h3>
        <ul class="services-list">
          <li><a href="/services">Technical SEO Optimization</a> - Complete website optimization including Core Web Vitals and structured data</li>
          <li><a href="/services">Content Strategy & Creation</a> - Data-driven content that targets high-value keywords</li>
          <li><a href="/services-pricing">SEO Packages & Pricing</a> - Transparent pricing for measurable results</li>
          <li><a href="/app-building">Custom App Development</a> - React and modern web applications</li>
          <li><a href="/workflow-automation">Workflow Automation</a> - n8n automation solutions for business efficiency</li>
        </ul>
        
        <h3>Proven Results</h3>
        <p>Our clients see an average 150% increase in organic traffic within 6 months. We focus on sustainable, white-hat SEO strategies that deliver long-term results.</p>
        <p><a href="/portfolio">View Our Case Studies</a> to see real client success stories and measurable results.</p>
        
        <h3>Ready to Get Started?</h3>
        <p><a href="/contact">Contact us today</a> for a free SEO consultation and discover how we can help your business dominate search rankings.</p>
      </section>
    `
  },
  
  '/about': {
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    h1: 'Expert SEO Team & Proven Methodology',
    h2: 'Meet the professionals behind successful SEO campaigns and app development projects',
    keywords: ['SEO experts', 'SEO team', 'digital marketing professionals', 'SEO methodology'],
    content: `
      <section class="team-section">
        <h3>Our SEO Expertise</h3>
        <p>With over 10 years of experience in search engine optimization, our team has helped hundreds of businesses achieve top rankings and sustainable organic growth.</p>
        <p>We specialize in technical SEO, content strategy, local SEO, and custom app development that supports your digital marketing goals.</p>
        
        <h3>Our Proven Methodology</h3>
        <ul>
          <li><strong>SEO Audit & Analysis:</strong> Comprehensive website analysis and competitive research</li>
          <li><strong>Strategy Development:</strong> Custom SEO strategy based on your business goals</li>
          <li><strong>Implementation:</strong> Technical optimization and content creation</li>
          <li><strong>Monitoring & Optimization:</strong> Continuous improvement and performance tracking</li>
        </ul>
        
        <h3>Our Commitment to Excellence</h3>
        <p>We believe in transparent communication, data-driven decisions, and sustainable SEO practices that deliver long-term results for our clients.</p>
        <p>Ready to work with our expert team? <a href="/contact">Contact us today</a> for a free SEO consultation.</p>
      </section>
    `
  },
  
  '/services': {
    title: 'Professional SEO Services & Solutions | Comprehensive SEO Packages - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and link building. Custom packages for businesses of all sizes.',
    h1: 'Professional SEO Services & Solutions',
    h2: 'Comprehensive optimization strategies for businesses of all sizes',
    keywords: ['SEO services', 'technical SEO', 'content strategy', 'local SEO', 'link building'],
    content: `
      <section class="technical-seo">
        <h3>Technical SEO Services</h3>
        <p>Complete website optimization including Core Web Vitals improvement, structured data implementation, crawlability enhancements, and mobile optimization.</p>
        <ul>
          <li>Core Web Vitals optimization for better user experience and rankings</li>
          <li>Structured data markup for rich snippets</li>
          <li>Website speed optimization and performance tuning</li>
          <li>Mobile-first indexing optimization</li>
        </ul>
        
        <h3>Content Strategy & Creation</h3>
        <p>Data-driven content creation that targets high-value keywords and drives qualified traffic to your website.</p>
        <ul>
          <li>Keyword research and content planning</li>
          <li>SEO-optimized blog content and landing pages</li>
          <li>Content optimization for existing pages</li>
          <li>Topic cluster development for authority building</li>
        </ul>
        
        <h3>Local SEO Optimization</h3>
        <p>Dominate local search results with Google Business Profile optimization, local citations, and geo-targeted content strategies.</p>
        
        <h3>Ready to Get Started?</h3>
        <p><a href="/services-pricing">View Our Pricing Packages</a> or <a href="/contact">Contact us</a> for a custom quote.</p>
      </section>
    `
  },
  
  '/services-pricing': {
    title: 'SEO Services & Pricing Packages | Transparent SEO Pricing - Marden SEO',
    description: 'Transparent SEO pricing packages for businesses of all sizes. From starter SEO to enterprise solutions. Get measurable results with our proven SEO strategies.',
    h1: 'SEO Services & Pricing Packages',
    h2: 'Transparent pricing for measurable SEO results',
    keywords: ['SEO pricing', 'SEO packages', 'SEO cost', 'affordable SEO services'],
    content: `
      <section class="pricing-packages">
        <h3>Starter SEO Package</h3>
        <p><strong>Perfect for small businesses looking to establish their online presence.</strong></p>
        <ul>
          <li>Comprehensive SEO audit and analysis</li>
          <li>Keyword research and strategy development</li>
          <li>On-page optimization for up to 10 pages</li>
          <li>Basic technical SEO improvements</li>
          <li>Monthly performance reporting</li>
        </ul>
        
        <h3>Professional SEO Package</h3>
        <p><strong>Comprehensive SEO solution for growing businesses.</strong></p>
        <ul>
          <li>Advanced technical SEO optimization</li>
          <li>Content strategy and creation (4-6 pieces monthly)</li>
          <li>Local SEO optimization and management</li>
          <li>Link building and authority development</li>
          <li>Competitor analysis and strategy refinement</li>
        </ul>
        
        <h3>Enterprise SEO Package</h3>
        <p><strong>Advanced SEO strategies for large-scale websites and competitive industries.</strong></p>
        <ul>
          <li>Enterprise-level technical SEO audits</li>
          <li>Advanced content strategy and production</li>
          <li>Multi-location and international SEO</li>
          <li>Advanced analytics and conversion tracking</li>
          <li>Dedicated account management and support</li>
        </ul>
        
        <h3>Custom SEO Solutions</h3>
        <p>Need something specific? We create custom SEO packages tailored to your unique business requirements.</p>
        <p><strong><a href="/contact">Get a Custom Quote</a></strong> - Free consultation to discuss your specific needs.</p>
      </section>
    `
  },
  
  '/contact': {
    title: 'Contact Marden SEO | Free SEO Consultation & Custom Quotes',
    description: 'Contact Marden SEO for a free consultation, custom SEO quote, or app development project. Get expert advice on improving your search rankings and online presence.',
    h1: 'Contact Marden SEO',
    h2: 'Get your free SEO consultation and custom quote',
    keywords: ['contact SEO company', 'SEO consultation', 'SEO quote', 'hire SEO expert'],
    content: `
      <section class="contact-info">
        <h3>Get Started with Professional SEO Services</h3>
        <p>Ready to improve your search rankings and drive more organic traffic? Contact our SEO experts today for a free consultation and custom strategy proposal.</p>
        
        <h3>Free SEO Consultation</h3>
        <p>During your free consultation, we'll:</p>
        <ul>
          <li>Analyze your current website and SEO performance</li>
          <li>Identify opportunities for improvement and growth</li>
          <li>Discuss your business goals and target audience</li>
          <li>Provide recommendations for SEO strategy</li>
          <li>Create a custom proposal tailored to your needs</li>
        </ul>
        
        <h3>Multiple Ways to Reach Us</h3>
        <ul>
          <li><strong>Contact Form:</strong> Fill out our form for the fastest response</li>
          <li><strong>Direct Email:</strong> Send us your questions and project details</li>
          <li><strong>Phone Consultation:</strong> Schedule a call to discuss your SEO needs</li>
        </ul>
        
        <h3>Quick Response Guarantee</h3>
        <p>We respond to all inquiries within 24 hours. Our team is ready to help you achieve your SEO goals.</p>
        <p><strong>Services Available:</strong> <a href="/services">SEO Optimization</a>, <a href="/app-building">App Development</a>, <a href="/workflow-automation">Workflow Automation</a></p>
      </section>
    `
  },
  
  '/portfolio': {
    title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
    description: 'View our SEO portfolio featuring real client results, case studies, and success stories. See how we help businesses achieve top search rankings and increased traffic.',
    h1: 'SEO Portfolio & Case Studies',
    h2: 'Proven results and client success stories',
    keywords: ['SEO portfolio', 'SEO case studies', 'SEO results', 'client success stories'],
    content: `
      <section class="portfolio-overview">
        <h3>Real Results from Real Clients</h3>
        <p>Our portfolio showcases the tangible results we've achieved for clients across various industries. From small local businesses to large e-commerce sites, we deliver measurable SEO success.</p>
        
        <h3>Featured Case Studies</h3>
        <div class="case-study">
          <h4>E-commerce SEO Success: 300% Traffic Increase</h4>
          <p><strong>Industry:</strong> E-commerce Retail | <strong>Results:</strong> 300% organic traffic increase in 8 months</p>
          <ul>
            <li>300% increase in organic traffic</li>
            <li>250% increase in online revenue</li>
            <li>Top 3 rankings for 50+ target keywords</li>
            <li>Improved Core Web Vitals scores by 85%</li>
          </ul>
        </div>
        
        <div class="case-study">
          <h4>Local Business SEO: #1 Rankings Achieved</h4>
          <p><strong>Industry:</strong> Local Services | <strong>Results:</strong> #1 local rankings for all target keywords</p>
          <ul>
            <li>#1 rankings for all target local keywords</li>
            <li>500% increase in Google Business Profile views</li>
            <li>200% increase in phone calls and inquiries</li>
            <li>Improved online reputation and review scores</li>
          </ul>
        </div>
        
        <h3>Portfolio Statistics</h3>
        <ul>
          <li><strong>100+ Successful Projects:</strong> Completed across various industries</li>
          <li><strong>Average 150% Traffic Increase:</strong> Within 6 months of engagement</li>
          <li><strong>95% Client Retention Rate:</strong> Long-term partnerships and ongoing success</li>
        </ul>
        
        <h3>Ready for Similar Results?</h3>
        <p><a href="/contact">Contact us today</a> to discuss how we can help your business achieve similar success.</p>
      </section>
    `
  },
  
  '/app-building': {
    title: 'Custom App Development | React & Modern Web Applications - Marden SEO',
    description: 'Professional custom app development services using React, TypeScript, and modern web technologies. Build scalable applications that support your business growth.',
    h1: 'Custom App Development Services',
    h2: 'Build powerful applications with React and modern web technologies',
    keywords: ['custom app development', 'React development', 'web application development', 'TypeScript development'],
    content: `
      <section class="app-development-overview">
        <h3>Professional App Development</h3>
        <p>We build custom web applications using the latest technologies including React, TypeScript, and modern development frameworks. Our applications are designed for performance, scalability, and user experience.</p>
        
        <h3>Technologies We Use</h3>
        <ul>
          <li><strong>Frontend:</strong> React 18+, TypeScript, Next.js, Vite</li>
          <li><strong>Styling:</strong> Tailwind CSS, Styled Components, Material-UI</li>
          <li><strong>Backend:</strong> Node.js, Express, GraphQL, REST APIs</li>
          <li><strong>Database:</strong> PostgreSQL, MongoDB, Supabase, Firebase</li>
        </ul>
        
        <h3>Types of Applications We Build</h3>
        <ul>
          <li>Business Management Applications</li>
          <li>E-commerce Platforms</li>
          <li>Content Management Systems</li>
          <li>Analytics & Reporting Dashboards</li>
        </ul>
        
        <h3>SEO-Optimized Applications</h3>
        <p>All our applications are built with SEO in mind, featuring server-side rendering, optimized meta tags, and fast loading times.</p>
        <p>Combine custom app development with our <a href="/services">SEO services</a> for a complete digital solution.</p>
        
        <h3>Ready to Build Your Custom Application?</h3>
        <p><a href="/contact">Contact us today</a> to discuss your app development project and get a custom quote.</p>
      </section>
    `
  },
  
  '/workflow-automation': {
    title: 'Workflow Automation Services | n8n & Business Process Optimization - Marden SEO',
    description: 'Professional workflow automation services using n8n and custom solutions. Streamline business processes, integrate systems, and improve efficiency with automated workflows.',
    h1: 'Workflow Automation Services',
    h2: 'Streamline your business processes with n8n automation and custom workflow solutions',
    keywords: ['workflow automation', 'n8n automation', 'business process automation', 'system integration'],
    content: `
      <section class="automation-overview">
        <h3>Professional Workflow Automation</h3>
        <p>We help businesses streamline operations and improve efficiency through custom workflow automation solutions. Using tools like n8n and custom development, we automate repetitive tasks and integrate systems for seamless business operations.</p>
        
        <h3>Benefits of Workflow Automation</h3>
        <ul>
          <li><strong>Increased Efficiency:</strong> Automate repetitive tasks and free up valuable time</li>
          <li><strong>Reduced Errors:</strong> Eliminate human error in routine processes</li>
          <li><strong>Cost Savings:</strong> Reduce operational costs through automation</li>
          <li><strong>Better Data Flow:</strong> Seamless integration between different systems</li>
        </ul>
        
        <h3>Types of Workflow Automation</h3>
        <ul>
          <li>Marketing Automation</li>
          <li>Sales Process Automation</li>
          <li>Data Integration Workflows</li>
          <li>Customer Service Automation</li>
        </ul>
        
        <h3>n8n Automation Expertise</h3>
        <p>We specialize in n8n workflow automation, a powerful open-source platform that allows for complex workflow creation and system integration.</p>
        
        <h3>Complete Digital Solution</h3>
        <p>Combine workflow automation with our <a href="/services">SEO services</a> and <a href="/app-building">custom app development</a> for comprehensive digital transformation.</p>
        
        <h3>Ready to Automate Your Business Processes?</h3>
        <p><a href="/contact">Contact us today</a> to discuss your workflow automation needs.</p>
      </section>
    `
  },
  
  '/blog': {
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Expert SEO tips, digital marketing strategies, and industry insights from Marden SEO professionals. Stay updated with the latest SEO trends and best practices.',
    h1: 'SEO Blog & Digital Marketing Insights',
    h2: 'Expert tips, strategies, and industry insights from our SEO professionals',
    keywords: ['SEO blog', 'digital marketing insights', 'SEO tips', 'search engine optimization articles'],
    content: `
      <section class="blog-overview">
        <h3>Stay Ahead with Expert SEO Content</h3>
        <p>Our blog features the latest SEO strategies, algorithm updates, and digital marketing insights to help you stay competitive in search rankings and drive more organic traffic to your website.</p>
        
        <h3>Featured SEO Articles</h3>
        <div class="article">
          <h4>Complete Guide to E-E-A-T: Experience, Expertise, Authoritativeness, Trust</h4>
          <p><strong>Read Time:</strong> 10 minutes | <strong>Category:</strong> SEO Strategy</p>
          <p>Master Google's E-E-A-T framework with this comprehensive guide covering experience, expertise, authoritativeness, and trust signals for better search rankings.</p>
        </div>
        
        <div class="article">
          <h4>10 On-Page SEO Tactics That Still Work in 2025</h4>
          <p><strong>Read Time:</strong> 8 minutes | <strong>Category:</strong> Technical SEO</p>
          <p>Discover the most effective on-page optimization strategies for modern search engines, including advanced techniques and practical implementation tips.</p>
        </div>
        
        <div class="article">
          <h4>Why Core Web Vitals Are Still Running Your SEO Life in 2025</h4>
          <p><strong>Read Time:</strong> 12 minutes | <strong>Category:</strong> Technical SEO</p>
          <p>Everything you need to know about Core Web Vitals and their continuing impact on search rankings, user experience, and website performance.</p>
        </div>
        
        <h3>SEO Content Categories</h3>
        <ul>
          <li>Technical SEO - Site optimization, Core Web Vitals, structured data</li>
          <li>Content Strategy - Content creation, keyword research, user intent</li>
          <li>Local SEO - Local optimization, Google Business Profile, citations</li>
          <li>SEO Tools - Tool reviews, automation, workflow optimization</li>
          <li>Algorithm Updates - Google updates, ranking factor analysis</li>
        </ul>
        
        <h3>Stay Updated with SEO Insights</h3>
        <p>Subscribe to our newsletter for weekly SEO tips, algorithm updates, and exclusive insights delivered directly to your inbox.</p>
        <p><a href="/contact">Contact us</a> to subscribe or learn more about our <a href="/services">SEO services</a>.</p>
      </section>
    `
  }
};

// =============================================================================
// NAVIGATION BAR (ALL PAGES)
// =============================================================================

const generateNavigation = () => `
<nav class="main-navigation" style="background: #1a1a1a; padding: 1rem; margin-bottom: 2rem;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
    <a href="/" style="color: #3b82f6; text-decoration: none; font-weight: bold; margin-right: 2rem;">Marden SEO</a>
    <a href="/" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Home</a>
    <a href="/about" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">About</a>
    <a href="/services" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Services</a>
    <a href="/services-pricing" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Pricing</a>
    <a href="/portfolio" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Portfolio</a>
    <a href="/blog" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Blog</a>
    <a href="/contact" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Contact</a>
    <a href="/app-building" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">App Development</a>
    <a href="/workflow-automation" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Automation</a>
  </div>
</nav>
`;

// =============================================================================
// STATIC HTML GENERATION
// =============================================================================

function generateStaticHTML(route, meta) {
  const canonical = `<link rel="canonical" href="https://mardenseo.com${route.path === '/' ? '' : route.path}">`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  ${meta.keywords && meta.keywords.length > 0 ? `<meta name="keywords" content="${meta.keywords.join(', ')}">` : ''}
  <meta name="robots" content="index, follow">
  ${canonical}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mardenseo.com${route.path === '/' ? '' : route.path}">
  <meta property="og:image" content="https://mardenseo.com/og-image.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="https://mardenseo.com/og-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5R45LHS7');</script>
  <!-- End Google Tag Manager -->
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "description": "Professional SEO and app development services",
    "url": "https://mardenseo.com",
    "serviceType": ["SEO Services", "App Development", "Workflow Automation"],
    "areaServed": "Worldwide"
  }
  </script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #1f2937;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .main-navigation a:hover {
      background-color: #374151 !important;
    }
    
    .static-content {
      min-height: 500px;
      padding: 2rem 0;
    }
    
    .static-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }
    
    .static-content h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: #6b7280;
      margin-bottom: 2rem;
    }
    
    .static-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin: 2rem 0 1rem 0;
    }
    
    .static-content h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 1.5rem 0 0.5rem 0;
    }
    
    .static-content p {
      margin-bottom: 1.5rem;
      color: #374151;
    }
    
    .static-content ul, .static-content ol {
      margin-bottom: 1.5rem;
      color: #374151;
    }
    
    .static-content li {
      margin-bottom: 0.5rem;
    }
    
    .static-content a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    .static-content a:hover {
      text-decoration: underline;
    }
    
    .footer {
      background: #1a1a1a;
      color: #e5e7eb;
      padding: 2rem 0;
      margin-top: 4rem;
    }
    
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .main-navigation {
        padding: 0.5rem !important;
      }
      
      .main-navigation div {
        flex-direction: column !important;
        gap: 0.5rem !important;
      }
      
      .static-content h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5R45LHS7"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  
  <!-- STATIC CONTENT: Visible immediately for search engines -->
  <div id="static-content">
    ${generateNavigation()}
    
    <div class="container">
      <main class="static-content">
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        
        ${meta.content || ''}
      </main>
    </div>
    
    <footer class="footer">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Marden SEO</h4>
            <p style="color: #9ca3af;">Professional SEO services, app development, and workflow automation solutions.</p>
            <p style="color: #9ca3af;"><a href="/contact">Contact us today</a> for a free consultation.</p>
          </div>
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Services</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="/services">SEO Optimization</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/services-pricing">SEO Packages</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/app-building">App Development</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/workflow-automation">Workflow Automation</a></li>
            </ul>
          </div>
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Resources</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="/blog">SEO Blog</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/portfolio">Case Studies</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/about">About Us</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid #374151; margin-top: 2rem; padding-top: 2rem; text-align: center; color: #9ca3af;">
          <p>&copy; 2025 Marden SEO. All rights reserved. Professional SEO services and app development.</p>
        </div>
      </div>
    </footer>
  </div>
  
  <!-- REACT HYDRATION TARGET -->
  <div id="root"></div>
  
  <!-- LOAD REACT APP FOR INTERACTIVE FEATURES -->
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`;
}

// =============================================================================
// SITEMAP GENERATION
// =============================================================================

function generateSitemap(allRoutes) {
  const sitemapEntries = allRoutes
    .map(route => {
      return `  <url>
    <loc>https://mardenseo.com${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}

// =============================================================================
// MAIN BUILD PROCESS
// =============================================================================

async function buildImmediateSSGFix() {
  console.log('🚀 IMMEDIATE SSG FIX - Generating Pure Static HTML...\n');
  
  try {
    // Step 1: Generate static HTML for each route
    console.log('🔧 Generating static HTML files...');
    
    for (const route of routes) {
      console.log(`  ⚡ Generating: ${route.path}`);
      
      // Get metadata for this route
      const meta = routeMeta[route.path];
      
      if (!meta) {
        console.log(`    ⚠️ No metadata found for ${route.path}, skipping`);
        continue;
      }
      
      // Generate static HTML
      const html = generateStaticHTML(route, meta);
      
      // Determine output path
      let outputPath;
      if (route.path === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html');
      } else {
        const routePath = route.path.replace(/^\//, '');
        outputPath = path.join(__dirname, 'dist', routePath, 'index.html');
      }
      
      // Ensure directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      // Write static HTML file
      await fs.writeFile(outputPath, html, 'utf8');
      console.log(`    ✅ Generated: ${outputPath}`);
    }
    
    // Step 2: Generate sitemap
    console.log('\n🗺️ Generating sitemap.xml...');
    const sitemap = generateSitemap(routes);
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap, 'utf8');
    console.log('✅ Sitemap generated\n');
    
    // Step 3: Generate robots.txt
    console.log('🤖 Generating robots.txt...');
    const robotsTxt = `User-agent: *
Allow: /

# Important SEO pages
Allow: /services
Allow: /about
Allow: /portfolio
Allow: /blog
Allow: /contact
Allow: /app-building
Allow: /workflow-automation

# Block admin and system pages
Disallow: /admin
Disallow: /debug
Disallow: /analytics-test
Disallow: /cart

# Sitemap location
Sitemap: https://mardenseo.com/sitemap.xml
`;
    await fs.writeFile(path.join(__dirname, 'dist', 'robots.txt'), robotsTxt, 'utf8');
    console.log('✅ Robots.txt generated\n');
    
    // Step 4: Success summary
    console.log('🎉 IMMEDIATE SSG FIX COMPLETED SUCCESSFULLY!\n');
    console.log('📊 BUILD SUMMARY:');
    console.log(`   📄 Total static pages generated: ${routes.length}`);
    console.log(`   🗺️ Sitemap entries: ${routes.length}`);
    console.log(`   ✅ All files now have proper SSG content\n`);
    
    console.log('✅ READY FOR DEPLOYMENT:');
    console.log('   • Pure static HTML files generated in /dist');
    console.log('   • Complete navigation on every page');
    console.log('   • Unique meta tags for each route');
    console.log('   • Clean sitemap.xml and robots.txt');
    console.log('   • NO content switching - visible immediately');
    console.log('   • React app still loads for interactivity\n');
    
    console.log('🚀 Test with: npm run test:comprehensive');
    console.log('🌐 Deploy to: Production hosting immediately');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
  buildImmediateSSGFix();
}

export default buildImmediateSSGFix;