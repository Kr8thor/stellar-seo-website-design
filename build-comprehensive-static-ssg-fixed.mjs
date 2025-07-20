#!/usr/bin/env node

/**
 * 🚀 COMPREHENSIVE STATIC SSG BUILD - FIXED VERSION
 * Generates complete static HTML for ALL routes including blog posts with proper slugs
 * Eliminates script injection concerns and ensures perfect SEO crawlability
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract blog posts from the data file (simulate reading the actual data)
const blogPosts = [
  {
    id: 'local-seo-2025',
    title: "Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack",
    category: "Local SEO",
    readTime: "15 min read",
    date: "July 14, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'ai-midlife-crisis',
    title: "The AI Midlife Crisis: When Your SEO Strategy Needs Therapy",
    category: "AI & SEO",
    readTime: "12 min read", 
    date: "July 12, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'on-page-seo-tactics-2025',
    title: "10 On-Page SEO Tactics That Still Work in 2025",
    category: "Technical SEO",
    readTime: "8 min read",
    date: "July 10, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'core-web-vitals-seo-2025',
    title: "Why Core Web Vitals Are Still Running Your SEO Life in 2025",
    category: "Technical SEO",
    readTime: "12 min read",
    date: "July 8, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'ai-revolution-seo-strategy',
    title: "The AI Revolution in SEO: How to Adapt Your Strategy",
    category: "AI & SEO",
    readTime: "9 min read",
    date: "July 6, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'local-seo-mastery-geographic-market',
    title: "Local SEO Mastery: How to Dominate Your Geographic Market",
    category: "Local SEO",
    readTime: "5 min read",
    date: "July 4, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'mobile-first-indexing-ready',
    title: "Mobile-First Indexing: Is Your Site Truly Ready?",
    category: "Technical SEO",
    readTime: "6 min read",
    date: "July 2, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'content-strategy-beyond-keywords',
    title: "Content Strategy for SEO: Beyond Keywords",
    category: "Content Strategy",
    readTime: "8 min read",
    date: "June 30, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'technical-seo-fundamentals',
    title: "Technical SEO Fundamentals: The Foundation of Rankings",
    category: "Technical SEO",
    readTime: "11 min read",
    date: "June 28, 2025",
    author: "Leo Corbett"
  },
  {
    id: 'link-building-2025-quality',
    title: "Link Building in 2025: Quality Over Quantity",
    category: "Link Building",
    readTime: "9 min read",
    date: "June 26, 2025",
    author: "Leo Corbett"
  }
];

// Core page routes with metadata
const routes = [
  '/', '/about', '/services', '/services-pricing', '/contact', 
  '/portfolio', '/app-building', '/workflow-automation', '/blog'
];

// System pages (noindex)
const systemRoutes = [
  '/admin', '/cart', '/analytics-test', '/debug'
];

// Route metadata for unique SEO tags
const routeMeta = {
  '/': {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    canonical: 'https://mardenseo.com/',
    robots: 'index, follow'
  },
  '/about': {
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    canonical: 'https://mardenseo.com/about',
    robots: 'index, follow'
  },
  '/services': {
    title: 'Professional SEO Services & Solutions | Technical + Content Strategy - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and Core Web Vitals. Get measurable results with our proven SEO methodology.',
    canonical: 'https://mardenseo.com/services',
    robots: 'index, follow'
  },
  '/services-pricing': {
    title: 'SEO Services Pricing & Packages | Transparent Rates & Custom Solutions - Marden SEO',
    description: 'View our transparent SEO pricing packages for small business to enterprise. Custom SEO solutions, monthly retainers, and project-based pricing. Free consultation included.',
    canonical: 'https://mardenseo.com/services-pricing',
    robots: 'index, follow'
  },
  '/contact': {
    title: 'Contact SEO Experts | Free Consultation & Custom Strategy - Marden SEO',
    description: 'Get your free SEO consultation and custom strategy. Contact our SEO experts to discuss your project, get pricing, and start improving your search rankings today.',
    canonical: 'https://mardenseo.com/contact',
    robots: 'index, follow'
  },
  '/portfolio': {
    title: 'SEO Portfolio & Case Studies | Proven Client Results & Success Stories - Marden SEO',
    description: 'See real SEO results from our clients: 300% traffic increases, #1 rankings, and measurable ROI. View detailed case studies and portfolio of successful SEO campaigns.',
    canonical: 'https://mardenseo.com/portfolio',
    robots: 'index, follow'
  },
  '/app-building': {
    title: 'Custom App Development Services | React, Node.js & Full-Stack - Marden SEO',
    description: 'Professional custom app development with React, Node.js, and modern frameworks. Fast, scalable applications with SEO optimization built-in. Free project consultation.',
    canonical: 'https://mardenseo.com/app-building',
    robots: 'index, follow'
  },
  '/workflow-automation': {
    title: 'Workflow Automation Services | n8n, Zapier & Custom Solutions - Marden SEO',
    description: 'Streamline your business with custom workflow automation. Expert n8n development, Zapier integration, and bespoke automation solutions. Boost efficiency and save time.',
    canonical: 'https://mardenseo.com/workflow-automation',
    robots: 'index, follow'
  },
  '/blog': {
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Expert SEO tips, digital marketing insights, and proven strategies from our team. Stay updated with the latest algorithm changes, tactics, and industry best practices.',
    canonical: 'https://mardenseo.com/blog',
    robots: 'index, follow'
  },
  // System pages (noindex)
  '/admin': {
    title: 'Admin Panel | Marden SEO',
    description: 'Administrative interface for authorized users.',
    canonical: 'https://mardenseo.com/admin',
    robots: 'noindex, nofollow'
  },
  '/cart': {
    title: 'Shopping Cart | Marden SEO',
    description: 'Review your selected services and packages.',
    canonical: 'https://mardenseo.com/cart',
    robots: 'noindex, nofollow'
  },
  '/analytics-test': {
    title: 'Analytics Testing | Marden SEO',
    description: 'Analytics testing interface for development.',
    canonical: 'https://mardenseo.com/analytics-test',
    robots: 'noindex, nofollow'
  },
  '/debug': {
    title: 'Debug Panel | Marden SEO',
    description: 'Debug interface for development purposes.',
    canonical: 'https://mardenseo.com/debug',
    robots: 'noindex, nofollow'
  }
};

// Generate blog post metadata
function generateBlogPostMeta(post) {
  return {
    title: `${post.title} | Expert SEO Insights - Marden SEO`,
    description: `${post.title} - Expert insights and proven strategies for modern SEO. Read our ${post.readTime} guide with actionable tips and techniques.`,
    canonical: `https://mardenseo.com/blog/${post.id}`,
    robots: 'index, follow'
  };
}

// Generate static HTML for each route
function generateStaticHTML(route, meta) {
  const baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <link rel="canonical" href="${meta.canonical}">
  <meta name="robots" content="${meta.robots}">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:image" content="https://mardenseo.com/opengraph-image.png">
  <meta property="og:site_name" content="Marden SEO">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="https://mardenseo.com/opengraph-image.png">
  
  <!-- Favicon and Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  <link rel="apple-touch-icon" href="/favicon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/assets/index-bT0T0QyP.css">
</head>
<body class="min-h-screen bg-white">
  <!-- Static content for crawlers -->
  <div id="static-seo-content">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a href="/" class="text-2xl font-bold text-blue-600">Marden SEO</a>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
            <a href="/services" class="text-gray-700 hover:text-blue-600">Services</a>
            <a href="/services-pricing" class="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="/portfolio" class="text-gray-700 hover:text-blue-600">Portfolio</a>
            <a href="/blog" class="text-gray-700 hover:text-blue-600">Blog</a>
            <a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a>
            <a href="/app-building" class="text-gray-700 hover:text-blue-600">App Development</a>
            <a href="/workflow-automation" class="text-gray-700 hover:text-blue-600">Automation</a>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      ${generatePageContent(route)}
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Marden SEO</h3>
            <p class="text-gray-300">Professional SEO services and app development for businesses that want to dominate search rankings.</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="/services" class="hover:text-white">SEO Optimization</a></li>
              <li><a href="/app-building" class="hover:text-white">App Development</a></li>
              <li><a href="/workflow-automation" class="hover:text-white">Workflow Automation</a></li>
              <li><a href="/services-pricing" class="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="/about" class="hover:text-white">About Us</a></li>
              <li><a href="/portfolio" class="hover:text-white">Portfolio</a></li>
              <li><a href="/blog" class="hover:text-white">Blog</a></li>
              <li><a href="/contact" class="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Contact</h4>
            <p class="text-gray-300">Ready to boost your rankings?</p>
            <a href="/contact" class="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Get Free Consultation</a>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Marden SEO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
  
  <!-- React app root -->
  <div id="root"></div>
  
  <!-- Scripts -->
  <script src="/assets/index-DHgNQw9l.js"></script>
</body>
</html>`;

  return baseHTML;
}

// Generate page-specific content
function generatePageContent(route) {
  const routePath = route.path || route;
  
  switch (routePath) {
    case '/':
      return `
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Professional SEO Services That Drive Results</h1>
          <h2 class="text-xl md:text-2xl text-gray-600 mb-8">Boost your search rankings with data-driven strategies that increase organic traffic and conversions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">SEO Optimization</h3>
              <p class="text-gray-600">Complete technical SEO, content strategy, and ranking optimization.</p>
              <a href="/services" class="text-blue-600 hover:text-blue-800 font-medium">Learn More →</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">App Development</h3>
              <p class="text-gray-600">Custom React applications with SEO optimization built-in.</p>
              <a href="/app-building" class="text-blue-600 hover:text-blue-800 font-medium">Learn More →</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">Workflow Automation</h3>
              <p class="text-gray-600">Streamline your business processes with custom automation.</p>
              <a href="/workflow-automation" class="text-blue-600 hover:text-blue-800 font-medium">Learn More →</a>
            </div>
          </div>
          <div class="mt-12">
            <a href="/contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Get Free SEO Audit</a>
          </div>
        </div>
      `;
      
    case '/about':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Expert SEO Team & Proven Methodology</h1>
        <h2 class="text-xl text-gray-600 mb-8">10+ years of proven results helping businesses dominate search rankings and grow revenue</h2>
        <div class="prose max-w-none">
          <p class="text-lg mb-6">At Marden SEO, we combine technical expertise with data-driven strategies to deliver measurable results for our clients.</p>
          <p class="mb-6">Our team specializes in:</p>
          <ul class="list-disc list-inside mb-6">
            <li>Technical SEO optimization and Core Web Vitals</li>
            <li>Content strategy and keyword research</li>
            <li>Local SEO and Google Business Profile optimization</li>
            <li>Custom app development with SEO integration</li>
            <li>Workflow automation and business optimization</li>
          </ul>
          <p class="mb-6">Ready to see what we can do for your business? <a href="/contact" class="text-blue-600 hover:text-blue-800">Contact us for a free consultation</a>.</p>
        </div>
      `;
      
    case '/services':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Professional SEO Services & Solutions</h1>
        <h2 class="text-xl text-gray-600 mb-8">Comprehensive optimization strategies for businesses of all sizes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Technical SEO Services</h3>
            <p class="text-gray-600 mb-4">Complete website optimization including Core Web Vitals, structured data, and crawlability improvements.</p>
            <ul class="list-disc list-inside text-gray-600">
              <li>Site speed optimization</li>
              <li>Mobile-first indexing</li>
              <li>Schema markup implementation</li>
              <li>Internal linking optimization</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Content Strategy & Creation</h3>
            <p class="text-gray-600 mb-4">Data-driven content creation that targets high-value keywords and drives qualified traffic.</p>
            <ul class="list-disc list-inside text-gray-600">
              <li>Keyword research and analysis</li>
              <li>Content gap analysis</li>
              <li>Topic cluster development</li>
              <li>Content optimization</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Local SEO Optimization</h3>
            <p class="text-gray-600 mb-4">Dominate local search results with Google Business Profile optimization and local citations.</p>
            <ul class="list-disc list-inside text-gray-600">
              <li>Google Business Profile setup</li>
              <li>Local citation building</li>
              <li>Review management</li>
              <li>Local keyword optimization</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">SEO Audits & Analysis</h3>
            <p class="text-gray-600 mb-4">Comprehensive website analysis to identify opportunities and technical issues.</p>
            <ul class="list-disc list-inside text-gray-600">
              <li>Complete SEO audit</li>
              <li>Competitor analysis</li>
              <li>Performance tracking</li>
              <li>ROI reporting</li>
            </ul>
          </div>
        </div>
        <div class="text-center mt-12">
          <p class="text-lg mb-6">Ready to get started? <a href="/services-pricing" class="text-blue-600 hover:text-blue-800">View our pricing packages</a> or <a href="/contact" class="text-blue-600 hover:text-blue-800">contact us for a custom quote</a>.</p>
        </div>
      `;
      
    case '/services-pricing':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">SEO Services Pricing & Packages</h1>
        <h2 class="text-xl text-gray-600 mb-8">Transparent pricing for measurable SEO results</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200">
            <h3 class="text-2xl font-semibold mb-4">Starter SEO</h3>
            <p class="text-3xl font-bold text-blue-600 mb-4">$1,500<span class="text-lg text-gray-600">/month</span></p>
            <p class="text-gray-600 mb-6">Perfect for small businesses looking to establish their online presence.</p>
            <ul class="list-disc list-inside mb-6 text-gray-600">
              <li>Technical SEO audit and optimization</li>
              <li>Keyword research and strategy</li>
              <li>Content optimization (up to 10 pages)</li>
              <li>Monthly reporting and recommendations</li>
              <li>Google Business Profile optimization</li>
            </ul>
            <a href="/contact" class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700">Get Started</a>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md border-2 border-blue-500">
            <div class="bg-blue-500 text-white text-center py-2 px-4 rounded-md mb-4">Most Popular</div>
            <h3 class="text-2xl font-semibold mb-4">Professional SEO</h3>
            <p class="text-3xl font-bold text-blue-600 mb-4">$3,000<span class="text-lg text-gray-600">/month</span></p>
            <p class="text-gray-600 mb-6">Comprehensive SEO solution for growing businesses.</p>
            <ul class="list-disc list-inside mb-6 text-gray-600">
              <li>Everything in Starter package</li>
              <li>Content creation (4 blog posts/month)</li>
              <li>Local SEO optimization</li>
              <li>Link building campaign</li>
              <li>Competitor analysis</li>
              <li>Weekly progress calls</li>
            </ul>
            <a href="/contact" class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700">Get Started</a>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200">
            <h3 class="text-2xl font-semibold mb-4">Enterprise SEO</h3>
            <p class="text-3xl font-bold text-blue-600 mb-4">$5,000+<span class="text-lg text-gray-600">/month</span></p>
            <p class="text-gray-600 mb-6">Advanced SEO strategies for large-scale websites.</p>
            <ul class="list-disc list-inside mb-6 text-gray-600">
              <li>Everything in Professional package</li>
              <li>Advanced technical SEO</li>
              <li>Enterprise-level reporting</li>
              <li>Dedicated account manager</li>
              <li>Custom automation workflows</li>
              <li>Priority support</li>
            </ul>
            <a href="/contact" class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700">Contact for Quote</a>
          </div>
        </div>
        <div class="text-center mt-12">
          <p class="text-lg mb-6">All packages include a free initial SEO audit and strategy session.</p>
          <a href="/contact" class="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700">Get Free Consultation</a>
        </div>
      `;
      
    case '/blog':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">SEO Blog & Digital Marketing Insights</h1>
        <h2 class="text-xl text-gray-600 mb-8">Expert tips, strategies, and industry insights from our SEO professionals</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${blogPosts.map(post => `
            <article class="bg-white p-6 rounded-lg shadow-md">
              <div class="text-sm text-blue-600 mb-2">${post.category}</div>
              <h3 class="text-xl font-semibold mb-3">
                <a href="/blog/${post.id}" class="hover:text-blue-600">${post.title}</a>
              </h3>
              <p class="text-gray-600 mb-4">Expert insights and proven strategies for modern SEO. ${post.readTime} of actionable tips and techniques.</p>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <span>By ${post.author}</span>
                <span>${post.readTime}</span>
              </div>
              <a href="/blog/${post.id}" class="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block">Read More →</a>
            </article>
          `).join('')}
        </div>
        <div class="mt-12">
          <h3 class="text-2xl font-semibold mb-6">Browse by Category</h3>
          <div class="flex flex-wrap gap-4">
            <a href="/blog?category=technical-seo" class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200">Technical SEO</a>
            <a href="/blog?category=content-strategy" class="bg-green-100 text-green-800 px-4 py-2 rounded-full hover:bg-green-200">Content Strategy</a>
            <a href="/blog?category=local-seo" class="bg-purple-100 text-purple-800 px-4 py-2 rounded-full hover:bg-purple-200">Local SEO</a>
            <a href="/blog?category=ai-seo" class="bg-orange-100 text-orange-800 px-4 py-2 rounded-full hover:bg-orange-200">AI & SEO</a>
            <a href="/blog?category=link-building" class="bg-red-100 text-red-800 px-4 py-2 rounded-full hover:bg-red-200">Link Building</a>
          </div>
        </div>
      `;
      
    case '/contact':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Contact SEO Experts</h1>
        <h2 class="text-xl text-gray-600 mb-8">Get your free SEO consultation and custom strategy</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6">Ready to Boost Your Rankings?</h3>
            <p class="text-lg mb-6">Contact our SEO experts to discuss your project, get pricing, and start improving your search rankings today.</p>
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-blue-600 text-xl">📧</span>
                </div>
                <div>
                  <p class="font-semibold">Email Us</p>
                  <p class="text-gray-600">hello@mardenseo.com</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-blue-600 text-xl">📞</span>
                </div>
                <div>
                  <p class="font-semibold">Call Us</p>
                  <p class="text-gray-600">Available for consultation calls</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span class="text-blue-600 text-xl">🚀</span>
                </div>
                <div>
                  <p class="font-semibold">Free SEO Audit</p>
                  <p class="text-gray-600">Get a comprehensive analysis of your website</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-8 rounded-lg">
            <h3 class="text-xl font-semibold mb-6">Get Your Free Consultation</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input type="url" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">How can we help?</label>
                <textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Tell us about your SEO goals and challenges..."></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">Send Message</button>
            </form>
          </div>
        </div>
      `;
      
    case '/portfolio':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">SEO Portfolio & Case Studies</h1>
        <h2 class="text-xl text-gray-600 mb-8">Proven results and client success stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">E-commerce SEO Success: 300% Traffic Increase</h3>
            <p class="text-gray-600 mb-4">How we helped an online retailer triple their organic traffic in 8 months.</p>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">300%</div>
                <div class="text-sm text-gray-600">Traffic Increase</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">250%</div>
                <div class="text-sm text-gray-600">Revenue Growth</div>
              </div>
            </div>
            <a href="/case-study/ecommerce-seo-success" class="text-blue-600 hover:text-blue-800 font-medium">Read Full Case Study →</a>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Local Business SEO: #1 Rankings Achieved</h3>
            <p class="text-gray-600 mb-4">Local service business achieves top rankings for all target keywords.</p>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">#1</div>
                <div class="text-sm text-gray-600">Local Rankings</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">150%</div>
                <div class="text-sm text-gray-600">Lead Increase</div>
              </div>
            </div>
            <a href="/case-study/local-business-rankings" class="text-blue-600 hover:text-blue-800 font-medium">Read Full Case Study →</a>
          </div>
        </div>
        <div class="text-center mt-12">
          <p class="text-lg mb-6">Ready for similar results? <a href="/contact" class="text-blue-600 hover:text-blue-800">Contact us</a> to discuss how we can help your business achieve success.</p>
        </div>
      `;
      
    case '/app-building':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Custom App Development Services</h1>
        <h2 class="text-xl text-gray-600 mb-8">Professional React, Node.js & full-stack development with SEO optimization built-in</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-semibold mb-4">Modern Web Applications</h3>
            <p class="text-gray-600 mb-4">We build fast, scalable applications using the latest technologies and frameworks.</p>
            <ul class="list-disc list-inside text-gray-600 mb-6">
              <li>React and TypeScript development</li>
              <li>Node.js backend and APIs</li>
              <li>Database design and optimization</li>
              <li>SEO-optimized architecture</li>
              <li>Performance optimization</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-4">SEO-First Development</h3>
            <p class="text-gray-600 mb-4">Every application we build is optimized for search engines from day one.</p>
            <ul class="list-disc list-inside text-gray-600 mb-6">
              <li>Server-side rendering (SSR)</li>
              <li>Static site generation (SSG)</li>
              <li>Meta tag optimization</li>
              <li>Structured data implementation</li>
              <li>Core Web Vitals optimization</li>
              <li>Crawlable navigation</li>
            </ul>
          </div>
        </div>
        <div class="text-center mt-12">
          <a href="/contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Get Project Quote</a>
        </div>
      `;
      
    case '/workflow-automation':
      return `
        <h1 class="text-4xl font-bold text-gray-900 mb-6">Workflow Automation Services</h1>
        <h2 class="text-xl text-gray-600 mb-8">Streamline your business with n8n, Zapier & custom automation solutions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-semibold mb-4">n8n Automation Expert</h3>
            <p class="text-gray-600 mb-4">Custom n8n workflows that automate your repetitive tasks and connect your tools.</p>
            <ul class="list-disc list-inside text-gray-600 mb-6">
              <li>Custom n8n workflow development</li>
              <li>API integrations and data sync</li>
              <li>Email and notification automation</li>
              <li>Lead processing and CRM updates</li>
              <li>Social media automation</li>
              <li>Report generation and analytics</li>
            </ul>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-4">Business Process Optimization</h3>
            <p class="text-gray-600 mb-4">We analyze your workflows and create custom automation solutions.</p>
            <ul class="list-disc list-inside text-gray-600 mb-6">
              <li>Process analysis and optimization</li>
              <li>Custom automation development</li>
              <li>Integration with existing tools</li>
              <li>Training and documentation</li>
              <li>Ongoing support and maintenance</li>
              <li>ROI tracking and optimization</li>
            </ul>
          </div>
        </div>
        <div class="bg-blue-50 p-8 rounded-lg mt-8">
          <h3 class="text-xl font-semibold mb-4">Popular Automation Use Cases</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl mb-2">📧</div>
              <h4 class="font-semibold">Email Marketing</h4>
              <p class="text-sm text-gray-600">Automated email sequences and campaigns</p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">📊</div>
              <h4 class="font-semibold">Data Processing</h4>
              <p class="text-sm text-gray-600">Automated reporting and analytics</p>
            </div>
            <div class="text-center">
              <div class="text-3xl mb-2">🔗</div>
              <h4 class="font-semibold">Tool Integration</h4>
              <p class="text-sm text-gray-600">Connect your favorite business tools</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <a href="/contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Automate Your Workflow</a>
        </div>
      `;
      
    default:
      if (routePath.startsWith('/blog/')) {
        const postId = routePath.replace('/blog/', '');
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
          return `
            <article class="max-w-4xl mx-auto">
              <div class="text-center mb-8">
                <div class="text-sm text-blue-600 mb-2">${post.category}</div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
                <div class="flex justify-center items-center space-x-6 text-gray-600">
                  <span>By ${post.author}</span>
                  <span>•</span>
                  <span>${post.date}</span>
                  <span>•</span>
                  <span>${post.readTime}</span>
                </div>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-xl leading-relaxed mb-8">Expert insights and proven strategies for modern SEO. This comprehensive guide provides actionable tips and techniques you can implement immediately.</p>
                
                <h2 class="text-2xl font-semibold text-gray-800 mt-10 mb-4">Key Takeaways</h2>
                <ul class="list-disc list-inside mb-6">
                  <li>Learn the latest ${post.category.toLowerCase()} strategies</li>
                  <li>Implement proven techniques that drive results</li>
                  <li>Stay ahead of algorithm changes and industry trends</li>
                  <li>Get actionable insights from real-world examples</li>
                </ul>
                
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-md">
                  <p class="italic font-medium text-blue-800">This article contains advanced strategies and techniques. For personalized SEO advice, <a href="/contact" class="underline">contact our experts</a>.</p>
                </div>
                
                <h2 class="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ready to Implement These Strategies?</h2>
                <p class="mb-6">Our SEO experts can help you implement these strategies for your specific business. Get a free consultation and custom strategy tailored to your goals.</p>
                
                <div class="text-center bg-gray-50 p-6 rounded-lg my-8">
                  <h3 class="text-xl font-semibold mb-4">Get Professional SEO Help</h3>
                  <p class="text-gray-600 mb-4">Don't implement these strategies alone. Get expert guidance and proven results.</p>
                  <a href="/contact" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Free Consultation</a>
                </div>
              </div>
              
              <div class="mt-12 border-t pt-8">
                <h3 class="text-xl font-semibold mb-4">Related Articles</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  ${blogPosts.filter(p => p.id !== postId && p.category === post.category).slice(0, 2).map(relatedPost => `
                    <div class="bg-gray-50 p-4 rounded-lg">
                      <h4 class="font-semibold mb-2">
                        <a href="/blog/${relatedPost.id}" class="hover:text-blue-600">${relatedPost.title}</a>
                      </h4>
                      <p class="text-sm text-gray-600">${relatedPost.readTime}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </article>
          `;
        }
      }
      
      // System pages
      if (['/admin', '/cart', '/analytics-test', '/debug'].includes(routePath)) {
        return `
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">${routePath === '/admin' ? 'Admin Panel' : routePath === '/cart' ? 'Shopping Cart' : routePath === '/analytics-test' ? 'Analytics Testing' : 'Debug Panel'}</h1>
            <p class="text-gray-600 mb-8">${routePath === '/admin' ? 'Administrative interface for authorized users.' : routePath === '/cart' ? 'Review your selected services and packages.' : routePath === '/analytics-test' ? 'Analytics testing interface for development.' : 'Debug interface for development purposes.'}</p>
            <a href="/" class="text-blue-600 hover:text-blue-800">← Return to Homepage</a>
          </div>
        `;
      }
      
      return `
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Page Content</h1>
          <p class="text-gray-600 mb-8">Static content for ${routePath}</p>
          <a href="/" class="text-blue-600 hover:text-blue-800">← Return to Homepage</a>
        </div>
      `;
  }
}

// Generate clean sitemap without script injection
function generateSitemap(allRoutes) {
  const baseUrl = 'https://mardenseo.com';
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main routes (exclude noindex routes)
  allRoutes.forEach(route => {
    const routePath = route.path || route;
    const meta = routeMeta[routePath] || (route.slug ? generateBlogPostMeta(route) : null);
    
    if (meta && meta.robots !== 'noindex, nofollow') {
      sitemap += `
  <url>
    <loc>${baseUrl}${routePath}</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>${routePath === '/' ? 'weekly' : routePath.includes('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${routePath === '/' ? '1.0' : routePath.includes('/services') ? '0.9' : routePath.includes('/blog/') ? '0.7' : '0.8'}</priority>
  </url>`;
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

async function buildComprehensiveStaticSSG() {
  try {
    console.log('🚀 STARTING COMPREHENSIVE STATIC SSG BUILD (FIXED VERSION)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Step 1: Build React app first
    console.log('\n📦 Step 1: Building React application...');
    const { execSync } = await import('child_process');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ React build completed');
    
    // Step 2: Prepare all routes
    console.log('\n🗺️ Step 2: Preparing route structure...');
    const allRoutes = [
      ...routes.map(path => ({ path })),
      ...systemRoutes.map(path => ({ path, noindex: true })),
      ...blogPosts.map(post => ({ path: `/blog/${post.id}`, slug: post.id }))
    ];
    
    console.log(`   📄 Main business pages: ${routes.length}`);
    console.log(`   📝 Blog posts: ${blogPosts.length}`);  
    console.log(`   🔒 System pages: ${systemRoutes.length}`);
    console.log(`   📊 Total routes: ${allRoutes.length}`);
    
    // Step 3: Generate static HTML for each route
    console.log('\n🏗️ Step 3: Generating static HTML files...');
    
    for (const route of allRoutes) {
      console.log(`  ⚡ Generating: ${route.path}`);
      
      // Get metadata for this route
      let meta = routeMeta[route.path];
      
      // Generate blog post metadata if needed
      if (route.slug && !meta) {
        const post = blogPosts.find(p => p.id === route.slug);
        if (post) {
          meta = generateBlogPostMeta(post);
        }
      }
      
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
    
    // Step 4: Generate clean sitemap (NO SCRIPT INJECTION)
    console.log('\n🗺️ Step 4: Generating clean sitemap.xml...');
    const sitemap = generateSitemap(allRoutes);
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap, 'utf8');
    console.log('✅ Clean sitemap generated (no scripts)');
    
    // Step 5: Generate robots.txt
    console.log('\n🤖 Step 5: Generating robots.txt...');
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
    console.log('✅ Robots.txt generated');
    
    // Step 6: Success summary
    console.log('\n🎉 COMPREHENSIVE SSG BUILD COMPLETED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📊 BUILD SUMMARY:');
    console.log(`   📄 Total static pages generated: ${allRoutes.length}`);
    console.log(`   🏠 Main business pages: ${routes.length}`);
    console.log(`   📝 Blog posts: ${blogPosts.length}`);
    console.log(`   🗺️ Sitemap entries: ${allRoutes.filter(r => !r.noindex && !routeMeta[r.path]?.robots?.includes('noindex')).length}`);
    console.log(`   🚫 Noindex pages: ${allRoutes.filter(r => r.noindex || routeMeta[r.path]?.robots?.includes('noindex')).length}`);
    
    console.log('\n✅ READY FOR DEPLOYMENT:');
    console.log('   • All static HTML files generated in /dist');
    console.log('   • Complete navigation on every page');
    console.log('   • Unique meta tags for each route');
    console.log('   • Proper noindex for system pages');
    console.log('   • Clean sitemap.xml (NO SCRIPT INJECTION)');
    console.log('   • Proper blog post slugs in sitemap');
    console.log('   • Zero content switching - pure static HTML');
    console.log('   • Beautiful React frontend preserved 100%');
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('   1. Test with: npx serve dist -p 8099');
    console.log('   2. Verify sitemap: http://localhost:8099/sitemap.xml');
    console.log('   3. Check no script injection in sitemap');
    console.log('   4. Deploy to production hosting');
    console.log('   5. Submit clean sitemap to Google Search Console');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
  buildComprehensiveStaticSSG();
}

export default buildComprehensiveStaticSSG;