#!/usr/bin/env node

/**
 * 🚀 COMPLETE SSG GENERATOR - All Routes & Blog Posts
 * Marden SEO Website - Full Implementation
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting COMPLETE Marden SEO Static Site Generation...');

// =============================================================================
// COMPLETE ROUTE DEFINITIONS
// =============================================================================

const routes = [
  // Core Business Pages
  { path: '/', name: 'home', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', name: 'about', priority: 0.9, changefreq: 'monthly' },
  { path: '/services', name: 'services', priority: 0.9, changefreq: 'weekly' },
  { path: '/services-pricing', name: 'services-pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', name: 'contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio', name: 'portfolio', priority: 0.8, changefreq: 'weekly' },
  { path: '/app-building', name: 'app-building', priority: 0.7, changefreq: 'monthly' },
  { path: '/workflow-automation', name: 'workflow-automation', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', name: 'blog', priority: 0.7, changefreq: 'daily' },
  
  // System Pages (NOINDEX)
  { path: '/cart', name: 'cart', noindex: true },
  { path: '/admin', name: 'admin', noindex: true },
  { path: '/analytics-test', name: 'analytics-test', noindex: true },
];

// Blog Posts (will be added dynamically)
const blogRoutes = [
  { path: '/blog/local-seo-2025', title: 'Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack', priority: 0.7 },
  { path: '/blog/on-page-seo-tactics-2025', title: '10 On-Page SEO Tactics That Still Work in 2025', priority: 0.7 },
  { path: '/blog/core-web-vitals-seo-2025', title: 'Why Core Web Vitals Are Still Running Your SEO Life in 2025', priority: 0.7 },
  { path: '/blog/ai-revolution-seo-strategy', title: 'The AI Revolution in SEO: How to Adapt Your Strategy', priority: 0.7 },
  { path: '/blog/local-seo-mastery', title: 'Local SEO Mastery: How to Dominate Your Geographic Market', priority: 0.7 },
  { path: '/blog/mobile-first-indexing-ready', title: 'Mobile-First Indexing: Is Your Site Truly Ready?', priority: 0.7 },
  { path: '/blog/content-strategy-beyond-keywords', title: 'Content Strategy for SEO: Beyond Keywords', priority: 0.7 },
  { path: '/blog/technical-seo-fundamentals', title: 'Technical SEO Fundamentals: The Foundation of Rankings', priority: 0.7 },
  { path: '/blog/link-building-2025-quality', title: 'Link Building in 2025: Quality Over Quantity', priority: 0.7 },
];

// =============================================================================
// COMPREHENSIVE META DATA
// =============================================================================

const routeMeta = {
  '/': {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    h1: 'Professional SEO Services That Drive Results',
    h2: 'Boost your search rankings with data-driven strategies that increase organic traffic',
  },
  '/about': {
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings.',
    h1: 'About Marden SEO',
    h2: 'Expert team delivering proven SEO results since 2015',
  },
  '/services': {
    title: 'Professional SEO Services & Solutions | Technical SEO & Content Strategy - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and link building. Get measurable results with our proven methodology.',
    h1: 'Professional SEO Services & Solutions',
    h2: 'Comprehensive optimization strategies for businesses of all sizes',
  },
  '/services-pricing': {
    title: 'SEO Services & Pricing Packages | Transparent Pricing & Custom Solutions - Marden SEO',
    description: 'View our SEO service packages and transparent pricing. From starter to enterprise solutions, find the perfect SEO package for your business needs.',
    h1: 'SEO Services & Pricing Packages',
    h2: 'Transparent pricing for measurable SEO results',
  },
  '/contact': {
    title: 'Contact Marden SEO | Free SEO Consultation & Custom Quotes',
    description: 'Contact Marden SEO for a free consultation, custom SEO quote, or app development project. Get expert advice on improving your search rankings.',
    h1: 'Contact Marden SEO',
    h2: 'Get your free SEO consultation and custom quote',
  },
  '/portfolio': {
    title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
    description: 'View our SEO portfolio featuring real client results, case studies, and success stories. See how we help businesses achieve top search rankings.',
    h1: 'SEO Portfolio & Case Studies',
    h2: 'Proven results and client success stories',
  },
  '/app-building': {
    title: 'Custom App Development Services | React & TypeScript Experts - Marden SEO',
    description: 'Professional app development services using React, TypeScript, and modern frameworks. Custom web applications built for performance and scalability.',
    h1: 'Custom App Development Services',
    h2: 'Build powerful applications with cutting-edge technology',
  },
  '/workflow-automation': {
    title: 'Workflow Automation Services | n8n & Custom Solutions - Marden SEO',
    description: 'Streamline your business processes with custom workflow automation. n8n implementation, API integrations, and productivity optimization.',
    h1: 'Workflow Automation Services',
    h2: 'Streamline operations with intelligent automation solutions',
  },
  '/blog': {
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Expert SEO blog featuring the latest strategies, algorithm updates, and digital marketing insights. Learn from our team of SEO professionals.',
    h1: 'SEO Blog & Digital Marketing Insights',
    h2: 'Expert tips, strategies, and industry insights from our SEO professionals',
  },
  '/cart': {
    title: 'Shopping Cart | Marden SEO',
    description: 'Review your selected services and packages.',
    h1: 'Your Shopping Cart',
    h2: 'Review your selected services and packages',
    noindex: true
  },
  '/admin': {
    title: 'Admin Panel | Marden SEO',
    description: 'Administrative interface for authorized users only.',
    h1: 'Admin Panel',
    h2: 'Administrative interface',
    noindex: true
  },
  '/analytics-test': {
    title: 'Analytics Test | Marden SEO',
    description: 'Analytics testing interface.',
    h1: 'Analytics Test',
    h2: 'Testing analytics integration',
    noindex: true
  }
};

// Blog post meta data
const blogMeta = {
  '/blog/local-seo-2025': {
    title: 'Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack - Marden SEO',
    description: 'Dominate local search in 2025 with advanced Map Pack strategies. Complete guide to local SEO dominance, Google Business Profile optimization, and competitive tactics.',
    h1: 'Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack',
    h2: 'Advanced strategies for local search domination',
  },
  '/blog/on-page-seo-tactics-2025': {
    title: '10 On-Page SEO Tactics That Still Work in 2025 - Marden SEO',
    description: 'Discover the most effective on-page SEO strategies for 2025. Proven tactics for title optimization, meta descriptions, content structure, and technical elements.',
    h1: '10 On-Page SEO Tactics That Still Work in 2025',
    h2: 'Proven strategies to optimize your web pages for better search rankings',
  },
  '/blog/core-web-vitals-seo-2025': {
    title: 'Why Core Web Vitals Are Still Running Your SEO Life in 2025 - Marden SEO',
    description: 'Complete guide to Core Web Vitals in 2025: LCP, FID, CLS optimization. Technical strategies to improve page speed and search rankings.',
    h1: 'Why Core Web Vitals Are Still Running Your SEO Life in 2025',
    h2: 'Everything you need to know about Core Web Vitals and their impact on rankings',
  },
  '/blog/ai-revolution-seo-strategy': {
    title: 'The AI Revolution in SEO: How to Adapt Your Strategy - Marden SEO',
    description: 'Learn how artificial intelligence is transforming SEO. Adapt your strategy for AI-powered search algorithms and content optimization.',
    h1: 'The AI Revolution in SEO: How to Adapt Your Strategy',
    h2: 'Navigate the future of search with AI-powered optimization strategies',
  },
  '/blog/local-seo-mastery': {
    title: 'Local SEO Mastery: How to Dominate Your Geographic Market - Marden SEO',
    description: 'Master local SEO with proven strategies for geographic market domination. Google Business Profile optimization, local citations, and ranking factors.',
    h1: 'Local SEO Mastery: How to Dominate Your Geographic Market',
    h2: 'Complete guide to local search optimization and market dominance',
  },
  '/blog/mobile-first-indexing-ready': {
    title: 'Mobile-First Indexing: Is Your Site Truly Ready? - Marden SEO',
    description: 'Ensure your website is optimized for mobile-first indexing. Complete checklist for mobile SEO, responsive design, and mobile user experience.',
    h1: 'Mobile-First Indexing: Is Your Site Truly Ready?',
    h2: 'Complete mobile optimization checklist for search success',
  },
  '/blog/content-strategy-beyond-keywords': {
    title: 'Content Strategy for SEO: Beyond Keywords - Marden SEO',
    description: 'Advanced content strategy that goes beyond keyword stuffing. Topic clusters, user intent, content depth, and topical authority development.',
    h1: 'Content Strategy for SEO: Beyond Keywords',
    h2: 'Build topical authority with strategic content planning',
  },
  '/blog/technical-seo-fundamentals': {
    title: 'Technical SEO Fundamentals: The Foundation of Rankings - Marden SEO',
    description: 'Master technical SEO fundamentals for better search rankings. Site architecture, Core Web Vitals, structured data, and crawlability optimization.',
    h1: 'Technical SEO Fundamentals: The Foundation of Rankings',
    h2: 'Build the technical foundation for SEO success',
  },
  '/blog/link-building-2025-quality': {
    title: 'Link Building in 2025: Quality Over Quantity - Marden SEO',
    description: 'Modern link building strategies focused on quality and relevance. Content-driven approaches, relationship building, and sustainable link acquisition.',
    h1: 'Link Building in 2025: Quality Over Quantity',
    h2: 'Build authority with strategic, high-quality link acquisition',
  }
};

// =============================================================================
// STATIC HTML TEMPLATE GENERATOR
// =============================================================================

function generateStaticHTML(route, meta) {
  const baseURL = 'https://mardenseo.com';
  const canonicalURL = `${baseURL}${route.path || route}`;
  const robotsContent = meta.noindex ? 'noindex, nofollow' : 'index, follow';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <link rel="canonical" href="${canonicalURL}">
  <meta name="robots" content="${robotsContent}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${canonicalURL}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${baseURL}/opengraph-image.png">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${baseURL}/opengraph-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/assets/index-bT0T0QyP.css">
</head>
<body>
  <!-- Static Content Visible Immediately -->
  <div id="static-content">
    <nav class="main-navigation">
      <a href="/">Home</a> |
      <a href="/about">About</a> |
      <a href="/services">Services</a> |
      <a href="/services-pricing">Pricing</a> |
      <a href="/portfolio">Portfolio</a> |
      <a href="/blog">Blog</a> |
      <a href="/contact">Contact</a> |
      <a href="/app-building">App Development</a> |
      <a href="/workflow-automation">Automation</a>
    </nav>
    
    <main>
      <h1>${meta.h1}</h1>
      <h2>${meta.h2}</h2>
      
      ${generatePageContent(route.path || route)}
      
    </main>
    
    <footer>
      <p>&copy; 2025 Marden SEO. Professional SEO services and app development.</p>
      <p><a href="/contact">Contact us</a> for a free consultation and custom quote.</p>
    </footer>
  </div>
  
  <!-- React App Hydration Target -->
  <div id="root"></div>
  
  <!-- JavaScript -->
  <script src="/assets/index-DHgNQw9l.js"></script>
</body>
</html>`;
}

// =============================================================================
// COMPREHENSIVE PAGE CONTENT GENERATOR
// =============================================================================

function generatePageContent(path) {
  switch (path) {
    case '/':
      return `
        <section class="hero-section">
          <p>Transform your online presence with data-driven SEO strategies that deliver measurable results and drive qualified organic traffic.</p>
        </section>
        
        <section class="services-overview">
          <h3>Our Core SEO Services</h3>
          <ul>
            <li><a href="/services">Technical SEO Optimization</a> - Core Web Vitals, structured data, crawlability</li>
            <li><a href="/services">Content Strategy & Creation</a> - Keyword research, content optimization, topic clusters</li>
            <li><a href="/services">Local SEO & Google Business Profile</a> - Map pack domination, local citations</li>
            <li><a href="/services-pricing">SEO Packages & Pricing</a> - Transparent pricing for measurable results</li>
            <li><a href="/app-building">Custom App Development</a> - React, TypeScript, modern frameworks</li>
            <li><a href="/workflow-automation">Workflow Automation</a> - n8n implementation, process optimization</li>
          </ul>
        </section>
        
        <section class="results-section">
          <h3>Proven SEO Results</h3>
          <p>Our clients see an average 150% increase in organic traffic within 6 months through our data-driven approach.</p>
          <ul>
            <li>200+ successful SEO projects completed</li>
            <li>Average 3x increase in qualified leads</li>
            <li>95% client retention rate</li>
            <li>Top 3 rankings achieved for 85% of target keywords</li>
          </ul>
          <a href="/portfolio">View Detailed Case Studies</a>
        </section>
        
        <section class="blog-preview">
          <h3>Latest SEO Insights & Strategies</h3>
          <p>Stay ahead of algorithm changes with our expert insights and proven strategies.</p>
          <ul>
            <li><a href="/blog/local-seo-2025">Local SEO in 2025: Map Pack Domination</a></li>
            <li><a href="/blog/on-page-seo-tactics-2025">10 On-Page SEO Tactics That Still Work</a></li>
            <li><a href="/blog/core-web-vitals-seo-2025">Core Web Vitals & SEO Performance</a></li>
          </ul>
          <a href="/blog">Read All SEO Articles</a>
        </section>
      `;
      
    case '/about':
      return `
        <section class="company-info">
          <h3>Leading SEO Agency Since 2015</h3>
          <p>Marden SEO is a team of dedicated SEO experts and developers who help businesses achieve sustainable growth through proven optimization strategies and cutting-edge technology.</p>
        </section>
        
        <section class="team-expertise">
          <h3>Our Expertise & Experience</h3>
          <ul>
            <li><strong>10+ years</strong> of SEO experience and algorithm tracking</li>
            <li><strong>200+ successful projects</strong> across diverse industries</li>
            <li><strong>Technical SEO specialists</strong> - Core Web Vitals, structured data, crawlability</li>
            <li><strong>Content strategy experts</strong> - Keyword research, content optimization, topical authority</li>
            <li><strong>App development team</strong> - React, TypeScript, modern frameworks</li>
            <li><strong>Automation specialists</strong> - n8n, workflow optimization, productivity tools</li>
          </ul>
        </section>
        
        <section class="methodology">
          <h3>Our Data-Driven SEO Methodology</h3>
          <p>We combine technical expertise with creative strategy to deliver SEO solutions that drive real business growth and sustainable results.</p>
          <ol>
            <li><strong>Comprehensive Audit</strong> - Technical analysis, competitor research, opportunity identification</li>
            <li><strong>Strategic Planning</strong> - Custom strategy development, keyword research, content planning</li>
            <li><strong>Implementation</strong> - Technical optimization, content creation, link building</li>
            <li><strong>Monitoring & Optimization</strong> - Performance tracking, continuous improvement, reporting</li>
          </ol>
        </section>
        
        <section class="get-started">
          <h3>Ready to Transform Your SEO?</h3>
          <p>Get started with a free consultation and discover how our proven methodology can drive measurable results for your business.</p>
          <a href="/contact">Schedule Your Free SEO Consultation</a>
        </section>
      `;
      
    case '/services':
      return `
        <section class="services-overview">
          <h3>Comprehensive SEO Services That Drive Results</h3>
          <p>We offer a complete range of SEO services designed to improve your search rankings, drive qualified traffic, and increase conversions.</p>
        </section>
        
        <section class="technical-seo">
          <h3>Technical SEO Optimization</h3>
          <p>Build a solid foundation for search success with comprehensive technical optimization.</p>
          <ul>
            <li>Core Web Vitals optimization (LCP, FID, CLS)</li>
            <li>Site speed and performance improvements</li>
            <li>Structured data and schema markup implementation</li>
            <li>XML sitemap optimization and robots.txt configuration</li>
            <li>Mobile-first indexing optimization</li>
            <li>Technical audit and crawlability improvements</li>
          </ul>
        </section>
        
        <section class="content-strategy">
          <h3>Content Strategy & SEO Content Creation</h3>
          <p>Drive organic traffic with data-driven content that targets high-value keywords and user intent.</p>
          <ul>
            <li>Comprehensive keyword research and competitor analysis</li>
            <li>Content gap analysis and opportunity identification</li>
            <li>Topic cluster development and content planning</li>
            <li>SEO-optimized content creation and optimization</li>
            <li>Content performance tracking and optimization</li>
            <li>Featured snippet optimization and SERP features</li>
          </ul>
        </section>
        
        <section class="local-seo">
          <h3>Local SEO & Google Business Profile Optimization</h3>
          <p>Dominate local search results and drive foot traffic with targeted local SEO strategies.</p>
          <ul>
            <li>Google Business Profile optimization and management</li>
            <li>Local citation building and NAP consistency</li>
            <li>Local keyword research and optimization</li>
            <li>Review management and reputation optimization</li>
            <li>Local link building and community engagement</li>
            <li>Local search ranking tracking and reporting</li>
          </ul>
        </section>
        
        <section class="link-building">
          <h3>Strategic Link Building & Authority Development</h3>
          <p>Build domain authority and search credibility with high-quality, relevant backlinks.</p>
          <ul>
            <li>Link audit and toxic link removal</li>
            <li>Competitor backlink analysis and gap identification</li>
            <li>Content-driven link building campaigns</li>
            <li>Guest posting and relationship building</li>
            <li>Resource page and broken link building</li>
            <li>Link performance tracking and analysis</li>
          </ul>
        </section>
        
        <section class="pricing-info">
          <h3>Flexible SEO Service Packages</h3>
          <p>Choose from our transparent pricing packages designed to meet your specific business needs and budget requirements.</p>
          <a href="/services-pricing">View Service Packages & Pricing</a> | <a href="/contact">Get Custom Quote</a>
        </section>
      `;
      
    case '/services-pricing':
      return `
        <section class="pricing-overview">
          <h3>Transparent SEO Pricing That Delivers Results</h3>
          <p>Our SEO packages are designed to provide maximum value and measurable results for businesses of all sizes.</p>
        </section>
        
        <section class="starter-package">
          <h3>Starter SEO Package - $1,500/month</h3>
          <p>Perfect for small businesses looking to establish their online presence and improve search visibility.</p>
          <ul>
            <li>Comprehensive SEO audit and strategy development</li>
            <li>Technical SEO optimization (Core Web Vitals, site speed)</li>
            <li>Keyword research and competitive analysis</li>
            <li>On-page optimization for up to 10 pages</li>
            <li>Content optimization and meta tag improvement</li>
            <li>Google Business Profile setup and optimization</li>
            <li>Monthly performance reports and strategy calls</li>
          </ul>
        </section>
        
        <section class="professional-package">
          <h3>Professional SEO Package - $2,500/month</h3>
          <p>Comprehensive SEO solution for growing businesses seeking significant search improvements.</p>
          <ul>
            <li>Everything in Starter Package PLUS:</li>
            <li>Advanced technical SEO and structured data implementation</li>
            <li>Content strategy development and creation (4 articles/month)</li>
            <li>Local SEO with citation building and review management</li>
            <li>Link building campaign (5-10 quality links/month)</li>
            <li>Competitor monitoring and analysis</li>
            <li>Advanced analytics setup and conversion tracking</li>
            <li>Bi-weekly strategy calls and priority support</li>
          </ul>
        </section>
        
        <section class="enterprise-package">
          <h3>Enterprise SEO Package - $4,000+/month</h3>
          <p>Advanced SEO strategies for large-scale websites and competitive markets.</p>
          <ul>
            <li>Everything in Professional Package PLUS:</li>
            <li>Enterprise technical SEO and site architecture optimization</li>
            <li>Advanced content strategy with topic clusters (8+ articles/month)</li>
            <li>Aggressive link building campaign (15+ quality links/month)</li>
            <li>Multi-location local SEO optimization</li>
            <li>Advanced analytics and custom reporting dashboards</li>
            <li>Dedicated account manager and weekly strategy sessions</li>
            <li>Custom integrations and automation setup</li>
          </ul>
        </section>
        
        <section class="custom-solutions">
          <h3>Custom SEO Solutions</h3>
          <p>Need something specific? We create custom SEO packages tailored to your unique business requirements and goals.</p>
          <ul>
            <li>Large enterprise websites with complex requirements</li>
            <li>E-commerce SEO with product optimization</li>
            <li>International SEO and multi-language optimization</li>
            <li>Industry-specific SEO strategies</li>
            <li>SEO consulting and training for in-house teams</li>
          </ul>
          <p><strong><a href="/contact">Get a Custom Quote</a></strong> - Free consultation to discuss your specific needs and create a tailored solution.</p>
        </section>
      `;
      
    case '/contact':
      return `
        <section class="contact-info">
          <h3>Get Started with Professional SEO Services</h3>
          <p>Ready to improve your search rankings and drive more organic traffic? Contact our SEO experts today for a free consultation and custom strategy proposal.</p>
        </section>
        
        <section class="consultation-section">
          <h3>Free SEO Consultation & Strategy Session</h3>
          <p>During your free consultation, our SEO experts will:</p>
          <ul>
            <li>Analyze your current website and SEO performance</li>
            <li>Identify immediate opportunities for improvement and growth</li>
            <li>Review your competitors' SEO strategies and positioning</li>
            <li>Discuss your business goals, target audience, and growth objectives</li>
            <li>Provide specific recommendations for SEO strategy and implementation</li>
            <li>Create a custom proposal tailored to your needs and budget</li>
          </ul>
        </section>
        
        <section class="contact-methods">
          <h3>Multiple Ways to Reach Our SEO Team</h3>
          <ul>
            <li><strong>Contact Form:</strong> Fill out our detailed form below for the fastest response</li>
            <li><strong>Direct Email:</strong> Send us your questions and project details</li>
            <li><strong>Phone Consultation:</strong> Schedule a call to discuss your SEO needs</li>
            <li><strong>Project Inquiry:</strong> Get quotes for SEO, app development, or automation projects</li>
            <li><strong>Emergency Support:</strong> Existing clients can reach us for urgent SEO issues</li>
          </ul>
        </section>
        
        <section class="response-info">
          <h3>Quick Response Guarantee</h3>
          <p>We respond to all inquiries within 24 hours (usually much faster). Our team is ready to help you achieve your SEO and digital marketing goals.</p>
          <p><strong>Services Available:</strong></p>
          <ul>
            <li><a href="/services">SEO Optimization & Strategy</a></li>
            <li><a href="/app-building">Custom App Development</a></li>
            <li><a href="/workflow-automation">Workflow Automation & n8n</a></li>
            <li><a href="/services-pricing">SEO Packages & Pricing</a></li>
          </ul>
        </section>
      `;
      
    case '/portfolio':
      return `
        <section class="portfolio-overview">
          <h3>SEO Success Stories & Proven Results</h3>
          <p>View our portfolio of successful SEO campaigns and the measurable results we've achieved for our clients across diverse industries.</p>
        </section>
        
        <section class="featured-case-studies">
          <h3>Featured Case Studies</h3>
          
          <div class="case-study">
            <h4>E-commerce SEO Success: 300% Traffic Increase</h4>
            <p>How we helped an online retailer triple their organic traffic and increase revenue by 250% in 8 months.</p>
            <ul>
              <li>300% increase in organic traffic</li>
              <li>250% increase in online revenue</li>
              <li>Top 3 rankings for 50+ target keywords</li>
              <li>Improved Core Web Vitals scores</li>
            </ul>
          </div>
          
          <div class="case-study">
            <h4>Local Business SEO: #1 Rankings Achieved</h4>
            <p>Local service business achieves top rankings for all target keywords and dominates the Google Map Pack.</p>
            <ul>
              <li>#1 rankings for 15+ local keywords</li>
              <li>500% increase in phone calls</li>
              <li>Google Map Pack domination</li>
              <li>150+ positive reviews generated</li>
            </ul>
          </div>
          
          <div class="case-study">
            <h4>SaaS Company SEO: 10x Lead Generation</h4>
            <p>B2B SaaS company achieves 1000% increase in qualified leads through strategic content and technical optimization.</p>
            <ul>
              <li>1000% increase in qualified leads</li>
              <li>Top 5 rankings for competitive SaaS keywords</li>
              <li>50+ high-quality backlinks acquired</li>
              <li>Featured snippet dominance in target niche</li>
            </ul>
          </div>
        </section>
        
        <section class="client-testimonials">
          <h3>What Our Clients Say</h3>
          <blockquote>
            <p>"Marden SEO transformed our online visibility. We went from page 2 to position #1 for our most important keywords in just 4 months."</p>
            <cite>- Sarah Johnson, CEO, TechStart Inc.</cite>
          </blockquote>
          
          <blockquote>
            <p>"The ROI from their SEO work has been incredible. We're getting 3x more leads and our cost per acquisition dropped by 60%."</p>
            <cite>- Mike Chen, Marketing Director, GrowthCorp</cite>
          </blockquote>
        </section>
        
        <section class="get-results">
          <h3>Ready for Similar Results?</h3>
          <p>Contact us today to discuss how we can help your business achieve similar SEO success and drive measurable growth.</p>
          <a href="/contact">Get Your Free SEO Consultation</a> | <a href="/services-pricing">View Our Packages</a>
        </section>
      `;
      
    case '/app-building':
      return `
        <section class="app-development-overview">
          <h3>Custom App Development That Powers Business Growth</h3>
          <p>Build powerful, scalable applications with modern technologies. From MVPs to enterprise solutions, we create apps that drive results.</p>
        </section>
        
        <section class="technology-stack">
          <h3>Modern Technology Stack</h3>
          <p>We use cutting-edge technologies to build fast, secure, and maintainable applications:</p>
          <ul>
            <li><strong>Frontend:</strong> React 18, TypeScript, Next.js, Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js, Python, GraphQL, REST APIs</li>
            <li><strong>Databases:</strong> PostgreSQL, MongoDB, Supabase, Firebase</li>
            <li><strong>Cloud:</strong> AWS, Vercel, Netlify, Digital Ocean</li>
            <li><strong>Mobile:</strong> React Native, Progressive Web Apps (PWAs)</li>
            <li><strong>Tools:</strong> Vite, Webpack, Docker, CI/CD pipelines</li>
          </ul>
        </section>
        
        <section class="app-types">
          <h3>Types of Applications We Build</h3>
          
          <div class="app-category">
            <h4>Business Applications</h4>
            <ul>
              <li>Customer relationship management (CRM) systems</li>
              <li>Project management and collaboration tools</li>
              <li>Inventory management and tracking systems</li>
              <li>Employee portals and HR management</li>
            </ul>
          </div>
          
          <div class="app-category">
            <h4>E-commerce Solutions</h4>
            <ul>
              <li>Custom online stores and marketplaces</li>
              <li>Payment processing and subscription management</li>
              <li>Product catalogs and inventory systems</li>
              <li>Customer analytics and reporting dashboards</li>
            </ul>
          </div>
          
          <div class="app-category">
            <h4>Data & Analytics Apps</h4>
            <ul>
              <li>Business intelligence dashboards</li>
              <li>Data visualization and reporting tools</li>
              <li>API integrations and data pipelines</li>
              <li>Real-time monitoring and alerting systems</li>
            </ul>
          </div>
        </section>
        
        <section class="development-process">
          <h3>Our Development Process</h3>
          <ol>
            <li><strong>Discovery & Planning</strong> - Requirements gathering, technical architecture, project timeline</li>
            <li><strong>Design & Prototyping</strong> - UI/UX design, wireframes, interactive prototypes</li>
            <li><strong>Development & Testing</strong> - Agile development, code reviews, quality assurance</li>
            <li><strong>Deployment & Launch</strong> - Production deployment, performance optimization, launch support</li>
            <li><strong>Maintenance & Support</strong> - Ongoing updates, bug fixes, feature enhancements</li>
          </ol>
        </section>
        
        <section class="app-cta">
          <h3>Ready to Build Your Custom Application?</h3>
          <p>Let's discuss your project requirements and create a development plan that brings your vision to life.</p>
          <a href="/contact">Get Your Free Project Consultation</a> | <a href="/portfolio">View App Development Portfolio</a>
        </section>
      `;
      
    case '/workflow-automation':
      return `
        <section class="automation-overview">
          <h3>Streamline Operations with Intelligent Workflow Automation</h3>
          <p>Eliminate repetitive tasks, reduce errors, and boost productivity with custom workflow automation solutions powered by n8n and modern integration tools.</p>
        </section>
        
        <section class="automation-benefits">
          <h3>Transform Your Business Operations</h3>
          <ul>
            <li><strong>Save Time:</strong> Automate repetitive tasks and focus on high-value work</li>
            <li><strong>Reduce Errors:</strong> Eliminate human error with consistent, automated processes</li>
            <li><strong>Improve Efficiency:</strong> Streamline workflows and accelerate task completion</li>
            <li><strong>Scale Operations:</strong> Handle increased volume without proportional resource growth</li>
            <li><strong>Better Insights:</strong> Track performance and identify optimization opportunities</li>
            <li><strong>Cost Savings:</strong> Reduce operational costs and improve profit margins</li>
          </ul>
        </section>
        
        <section class="n8n-expertise">
          <h3>n8n Workflow Automation Specialists</h3>
          <p>We're experts in n8n, the powerful open-source workflow automation tool that connects your apps and services seamlessly.</p>
          
          <div class="n8n-capabilities">
            <h4>What We Can Automate</h4>
            <ul>
              <li><strong>Data Synchronization:</strong> Keep data consistent across multiple platforms</li>
              <li><strong>Lead Management:</strong> Capture, qualify, and route leads automatically</li>
              <li><strong>Email Marketing:</strong> Trigger campaigns based on user behavior</li>
              <li><strong>Social Media:</strong> Schedule posts, monitor mentions, engage with followers</li>
              <li><strong>File Processing:</strong> Organize, convert, and distribute files automatically</li>
              <li><strong>Reporting:</strong> Generate and distribute reports on schedule</li>
              <li><strong>Customer Support:</strong> Route tickets, update statuses, send notifications</li>
            </ul>
          </div>
        </section>
        
        <section class="integration-examples">
          <h3>Popular Integration Examples</h3>
          
          <div class="integration-category">
            <h4>Marketing Automation</h4>
            <ul>
              <li>CRM ↔ Email Marketing (HubSpot + Mailchimp)</li>
              <li>Form Submissions → Lead Scoring → Sales Notifications</li>
              <li>Social Media Monitoring → Response Automation</li>
              <li>Event Tracking → Personalized Follow-up Sequences</li>
            </ul>
          </div>
          
          <div class="integration-category">
            <h4>Business Operations</h4>
            <ul>
              <li>Invoice Generation → Payment Processing → Accounting</li>
              <li>Inventory Updates → Order Management → Fulfillment</li>
              <li>Employee Onboarding → System Access → Training Schedules</li>
              <li>Project Management → Time Tracking → Client Reporting</li>
            </ul>
          </div>
          
          <div class="integration-category">
            <h4>Data & Analytics</h4>
            <ul>
              <li>API Data Collection → Database Updates → Dashboard Refresh</li>
              <li>Website Analytics → Report Generation → Stakeholder Distribution</li>
              <li>Sales Data → Forecasting → Performance Alerts</li>
              <li>Customer Feedback → Sentiment Analysis → Action Items</li>
            </ul>
          </div>
        </section>
        
        <section class="automation-process">
          <h3>Our Automation Implementation Process</h3>
          <ol>
            <li><strong>Process Analysis</strong> - Map current workflows and identify automation opportunities</li>
            <li><strong>Solution Design</strong> - Design optimal automation flows and integration architecture</li>
            <li><strong>Development & Testing</strong> - Build workflows, test thoroughly, handle edge cases</li>
            <li><strong>Deployment & Training</strong> - Deploy to production, train your team, provide documentation</li>
            <li><strong>Monitoring & Optimization</strong> - Monitor performance, optimize workflows, expand automation</li>
          </ol>
        </section>
        
        <section class="automation-cta">
          <h3>Ready to Automate Your Workflows?</h3>
          <p>Let's analyze your current processes and identify automation opportunities that will save time and improve efficiency.</p>
          <a href="/contact">Get Your Free Automation Consultation</a> | <a href="/services-pricing">View Automation Packages</a>
        </section>
      `;
      
    case '/blog':
      return `
        <section class="blog-overview">
          <h3>Stay Ahead with Expert SEO Insights</h3>
          <p>Get the latest SEO strategies, algorithm updates, and digital marketing insights from our team of optimization experts.</p>
        </section>
        
        <section class="featured-articles">
          <h3>Featured SEO Articles</h3>
          
          <article class="blog-preview">
            <h4><a href="/blog/local-seo-2025">Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack</a></h4>
            <p>Dominate local search results with advanced Map Pack strategies and Google Business Profile optimization techniques.</p>
            <span class="read-time">10 min read</span>
          </article>
          
          <article class="blog-preview">
            <h4><a href="/blog/on-page-seo-tactics-2025">10 On-Page SEO Tactics That Still Work in 2025</a></h4>
            <p>Discover proven on-page optimization strategies that continue to drive search rankings and organic traffic.</p>
            <span class="read-time">8 min read</span>
          </article>
          
          <article class="blog-preview">
            <h4><a href="/blog/core-web-vitals-seo-2025">Why Core Web Vitals Are Still Running Your SEO Life in 2025</a></h4>
            <p>Master Core Web Vitals optimization with technical strategies for LCP, FID, and CLS improvements.</p>
            <span class="read-time">12 min read</span>
          </article>
        </section>
        
        <section class="recent-articles">
          <h3>Recent SEO Articles</h3>
          <ul>
            <li><a href="/blog/ai-revolution-seo-strategy">The AI Revolution in SEO: How to Adapt Your Strategy</a> - 9 min read</li>
            <li><a href="/blog/local-seo-mastery">Local SEO Mastery: How to Dominate Your Geographic Market</a> - 5 min read</li>
            <li><a href="/blog/mobile-first-indexing-ready">Mobile-First Indexing: Is Your Site Truly Ready?</a> - 6 min read</li>
            <li><a href="/blog/content-strategy-beyond-keywords">Content Strategy for SEO: Beyond Keywords</a> - 8 min read</li>
            <li><a href="/blog/technical-seo-fundamentals">Technical SEO Fundamentals: The Foundation of Rankings</a> - 11 min read</li>
            <li><a href="/blog/link-building-2025-quality">Link Building in 2025: Quality Over Quantity</a> - 9 min read</li>
          </ul>
        </section>
        
        <section class="blog-categories">
          <h3>Browse by Category</h3>
          <ul>
            <li><strong>Technical SEO:</strong> Core Web Vitals, site speed, structured data, crawlability</li>
            <li><strong>Content Strategy:</strong> Keyword research, content optimization, topical authority</li>
            <li><strong>Local SEO:</strong> Google Business Profile, local citations, map pack optimization</li>
            <li><strong>Link Building:</strong> Authority development, relationship building, content promotion</li>
            <li><strong>Algorithm Updates:</strong> Google updates, ranking factor changes, adaptation strategies</li>
            <li><strong>SEO Tools:</strong> Software reviews, automation, productivity tips</li>
          </ul>
        </section>
        
        <section class="newsletter-signup">
          <h3>Get SEO Updates Delivered</h3>
          <p>Subscribe to our newsletter for weekly SEO insights, algorithm updates, and exclusive strategies.</p>
          <a href="/contact">Subscribe to SEO Newsletter</a>
        </section>
      `;
      
    // Blog post content (abbreviated for main posts)
    case '/blog/local-seo-2025':
      return `
        <article class="blog-post">
          <section class="post-intro">
            <p class="lead">Local SEO in 2025 isn't just about showing up in search results—it's about dominating your competition and claiming the top spots that drive real business results.</p>
          </section>
          
          <section class="post-content">
            <h3>1. Master Google Business Profile Optimization</h3>
            <p>Your Google Business Profile is your most powerful local SEO weapon. Optimize every field, upload high-quality photos, and maintain accurate information across all platforms.</p>
            
            <h3>2. Build Strategic Local Citations</h3>
            <p>Consistent NAP (Name, Address, Phone) information across authoritative local directories builds trust with search engines and improves local rankings.</p>
            
            <h3>3. Generate Authentic Customer Reviews</h3>
            <p>Implement systems to consistently generate positive reviews while professionally managing any negative feedback.</p>
            
            <h3>4. Create Location-Specific Content</h3>
            <p>Develop content that speaks directly to your local audience's needs, interests, and search behaviors.</p>
            
            <h3>5. Optimize for Mobile-First Local Search</h3>
            <p>Ensure your website provides an excellent mobile experience for local searchers on-the-go.</p>
          </section>
          
          <section class="post-conclusion">
            <h3>Ready to Dominate Local Search?</h3>
            <p>Local SEO success requires consistent effort and strategic implementation. Our team can help you develop and execute a winning local SEO strategy.</p>
            <a href="/contact">Get Your Free Local SEO Audit</a>
          </section>
          
          <section class="related-posts">
            <h3>Related Articles</h3>
            <ul>
              <li><a href="/blog/on-page-seo-tactics-2025">10 On-Page SEO Tactics That Still Work</a></li>
              <li><a href="/blog/content-strategy-beyond-keywords">Content Strategy for SEO: Beyond Keywords</a></li>
            </ul>
          </section>
        </article>
      `;
      
    // System pages with noindex
    case '/cart':
      return `
        <section class="cart-content">
          <h3>Review Your Selected Services</h3>
          <p>Your shopping cart for SEO services and packages. Review your selections and proceed to checkout.</p>
          <p><a href="/services-pricing">Browse Our Service Packages</a> | <a href="/contact">Get Custom Quote</a></p>
        </section>
      `;
      
    case '/admin':
      return `
        <section class="admin-content">
          <h3>Administrative Interface</h3>
          <p>This administrative interface is for authorized users only. Please log in with valid credentials.</p>
          <p><a href="/">Return to Homepage</a> | <a href="/contact">Contact Support</a></p>
        </section>
      `;
      
    case '/analytics-test':
      return `
        <section class="analytics-content">
          <h3>Analytics Testing Interface</h3>
          <p>This page is used for testing analytics integration and tracking implementation.</p>
          <p><a href="/">Return to Homepage</a> | <a href="/services">View Our Services</a></p>
        </section>
      `;
      
    default:
      return `
        <section class="default-content">
          <h3>Page Content</h3>
          <p>This is a static HTML page for ${path}. The React application will hydrate and provide dynamic functionality.</p>
          <p><a href="/">Return to Homepage</a> | <a href="/contact">Contact Us</a></p>
        </section>
      `;
  }
}

// =============================================================================
// SITEMAP GENERATOR
// =============================================================================

function generateSitemap(allRoutes) {
  const baseURL = 'https://mardenseo.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main routes (excluding noindex pages)
  allRoutes.forEach(route => {
    if (!route.noindex) {
      sitemap += `
  <url>
    <loc>${baseURL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
    }
  });

  // Add blog routes (excluding noindex)
  blogRoutes.forEach(blog => {
    sitemap += `
  <url>
    <loc>${baseURL}${blog.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${blog.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// =============================================================================
// MAIN GENERATION FUNCTION
// =============================================================================

async function generateStaticSite() {
  try {
    console.log('📁 Creating dist directory structure...');
    
    // Ensure dist exists and copy assets from regular build
    await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
    
    // Generate all main routes
    console.log('🏗️ Generating main pages...');
    for (const route of routes) {
      const meta = routeMeta[route.path];
      if (!meta) {
        console.log(`⚠️ Missing meta data for ${route.path}, skipping...`);
        continue;
      }
      
      const html = generateStaticHTML(route, meta);
      
      if (route.path === '/') {
        // Home page goes to index.html
        await fs.writeFile(path.join(__dirname, 'dist', 'index.html'), html);
        console.log(`✅ Generated: index.html`);
      } else {
        // Other pages get their own directory
        const dirPath = path.join(__dirname, 'dist', route.path.slice(1));
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(path.join(dirPath, 'index.html'), html);
        console.log(`✅ Generated: ${route.path}/index.html`);
      }
    }
    
    // Generate blog posts
    console.log('📝 Generating blog posts...');
    for (const blog of blogRoutes) {
      const meta = blogMeta[blog.path];
      if (!meta) {
        console.log(`⚠️ Missing meta data for ${blog.path}, skipping...`);
        continue;
      }
      
      const html = generateStaticHTML(blog, meta);
      const pathParts = blog.path.split('/').filter(part => part);
      
      let currentPath = path.join(__dirname, 'dist');
      for (const part of pathParts) {
        currentPath = path.join(currentPath, part);
        await fs.mkdir(currentPath, { recursive: true });
      }
      
      await fs.writeFile(path.join(currentPath, 'index.html'), html);
      console.log(`✅ Generated: ${blog.path}/index.html`);
    }
    
    // Generate sitemap
    console.log('🗺️ Generating sitemap...');
    const allRoutes = [...routes, ...blogRoutes];
    const sitemap = generateSitemap(allRoutes);
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap);
    console.log('✅ Generated: sitemap.xml');
    
    // Copy necessary assets (favicon, robots.txt, etc.)
    try {
      await fs.copyFile(
        path.join(__dirname, 'public', 'robots.txt'),
        path.join(__dirname, 'dist', 'robots.txt')
      );
      console.log('✅ Copied: robots.txt');
    } catch (e) {
      console.log('ℹ️ robots.txt not found, skipping...');
    }
    
    // Generate summary
    const totalPages = routes.length + blogRoutes.length;
    const indexablePages = routes.filter(r => !r.noindex).length + blogRoutes.length;
    
    console.log('\n🎉 COMPLETE SSG GENERATION SUCCESSFUL!');
    console.log(`📊 Generated ${totalPages} total pages:`);
    console.log(`   📝 ${indexablePages} indexable pages`);
    console.log(`   🚫 ${totalPages - indexablePages} noindex pages`);
    console.log(`   🗺️ 1 XML sitemap`);
    console.log('\n✅ All static HTML files ready for deployment!');
    console.log('🚀 Test with: npx serve dist -p 8099');
    
  } catch (error) {
    console.error('❌ Error generating static site:', error);
    process.exit(1);
  }
}

// Run the generator
generateStaticSite();