#!/usr/bin/env node

/**
 * 🚀 SIMPLIFIED COMPREHENSIVE STATIC HTML GENERATOR
 * Marden SEO Website - Override with True Static HTML
 * 
 * SAFE APPROACH: Generate true static HTML without React build step
 * Works with existing dist/ folder and overwrites with proper static content
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// COMPREHENSIVE ROUTE DEFINITIONS
// =============================================================================

const routes = [
  // Core Business Pages (High Priority - INDEX ALL)
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/services-pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
  { path: '/app-building', priority: 0.7, changefreq: 'monthly' },
  { path: '/workflow-automation', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.7, changefreq: 'daily' },
  
  // System Pages (NOINDEX - Low Priority)
  { path: '/cart', noindex: true },
  { path: '/admin', noindex: true },
  { path: '/analytics-test', noindex: true },
  { path: '/debug', noindex: true },
];

// =============================================================================
// ROUTE-SPECIFIC META DATA
// =============================================================================

const routeMeta = {
  '/': {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    h1: 'Professional SEO Services That Drive Results',
    h2: 'Boost your search rankings with data-driven strategies that increase organic traffic and conversions',
    keywords: ['SEO services', 'search engine optimization', 'digital marketing', 'app development', 'workflow automation'],
    content: `
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Our Core Services</h3>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 1rem;"><a href="/services" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Technical SEO Optimization</a> - Complete website optimization including Core Web Vitals and structured data</li>
          <li style="margin-bottom: 1rem;"><a href="/services" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Content Strategy & Creation</a> - Data-driven content that targets high-value keywords</li>
          <li style="margin-bottom: 1rem;"><a href="/services-pricing" style="color: #3b82f6; text-decoration: none; font-weight: 500;">SEO Packages & Pricing</a> - Transparent pricing for measurable results</li>
          <li style="margin-bottom: 1rem;"><a href="/app-building" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Custom App Development</a> - React and modern web applications</li>
          <li style="margin-bottom: 1rem;"><a href="/workflow-automation" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Workflow Automation</a> - n8n automation solutions for business efficiency</li>
        </ul>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Proven Results</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Our clients see an average 150% increase in organic traffic within 6 months. We focus on sustainable, white-hat SEO strategies that deliver long-term results.
        </p>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          <a href="/portfolio" style="color: #3b82f6; text-decoration: none; font-weight: 500;">View Our Case Studies</a> to see real client success stories and measurable results.
        </p>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Latest SEO Insights</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Stay updated with the latest SEO strategies, algorithm changes, and industry best practices through our expert blog content.
        </p>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          <a href="/blog" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Read Our SEO Blog</a> for actionable insights and professional tips.
        </p>
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
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Our SEO Expertise</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          With over 10 years of experience in search engine optimization, our team has helped hundreds of businesses achieve top rankings and sustainable organic growth.
        </p>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          We specialize in technical SEO, content strategy, local SEO, and custom app development that supports your digital marketing goals.
        </p>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Our Proven Methodology</h3>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 1rem;"><strong>SEO Audit & Analysis:</strong> Comprehensive website analysis and competitive research</li>
          <li style="margin-bottom: 1rem;"><strong>Strategy Development:</strong> Custom SEO strategy based on your business goals</li>
          <li style="margin-bottom: 1rem;"><strong>Implementation:</strong> Technical optimization and content creation</li>
          <li style="margin-bottom: 1rem;"><strong>Monitoring & Optimization:</strong> Continuous improvement and performance tracking</li>
        </ul>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          <a href="/services" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Learn more about our SEO services</a> and how we can help your business succeed online.
        </p>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Our Commitment to Excellence</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          We believe in transparent communication, data-driven decisions, and sustainable SEO practices that deliver long-term results for our clients.
        </p>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Ready to work with our expert team? <a href="/contact" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Contact us today</a> for a free SEO consultation.
        </p>
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
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Technical SEO Services</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Complete website optimization including Core Web Vitals improvement, structured data implementation, crawlability enhancements, and mobile optimization.
        </p>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 0.5rem;">Core Web Vitals optimization for better user experience and rankings</li>
          <li style="margin-bottom: 0.5rem;">Structured data markup for rich snippets</li>
          <li style="margin-bottom: 0.5rem;">Website speed optimization and performance tuning</li>
          <li style="margin-bottom: 0.5rem;">Mobile-first indexing optimization</li>
        </ul>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Content Strategy & Creation</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Data-driven content creation that targets high-value keywords and drives qualified traffic to your website.
        </p>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 0.5rem;">Keyword research and content planning</li>
          <li style="margin-bottom: 0.5rem;">SEO-optimized blog content and landing pages</li>
          <li style="margin-bottom: 0.5rem;">Content optimization for existing pages</li>
          <li style="margin-bottom: 0.5rem;">Topic cluster development for authority building</li>
        </ul>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Local SEO Optimization</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Dominate local search results with Google Business Profile optimization, local citations, and geo-targeted content strategies.
        </p>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 0.5rem;">Google Business Profile optimization and management</li>
          <li style="margin-bottom: 0.5rem;">Local citation building and consistency</li>
          <li style="margin-bottom: 0.5rem;">Review management and reputation building</li>
          <li style="margin-bottom: 0.5rem;">Local keyword targeting and optimization</li>
        </ul>
      </section>
      <section style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Ready to Get Started?</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          <a href="/services-pricing" style="color: #3b82f6; text-decoration: none; font-weight: 500;">View Our Pricing Packages</a> or <a href="/contact" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Contact us</a> for a custom quote tailored to your business needs.
        </p>
      </section>
    `
  }
};

// =============================================================================
// COMPREHENSIVE NAVIGATION BAR (ALL PAGES)
// =============================================================================

const generateNavigation = () => `
<nav style="background: #1a1a1a; padding: 1rem; margin-bottom: 2rem;">
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
// STATIC HTML GENERATION (TRUE STATIC - NO HIDDEN CONTENT)
// =============================================================================

function generateTrueStaticHTML(route, meta) {
  const isNoIndex = meta.noindex || route.noindex;
  const canonical = isNoIndex ? '' : `<link rel="canonical" href="https://mardenseo.com${route.path === '/' ? '' : route.path}">`;
  const robotsContent = isNoIndex ? 'noindex, nofollow' : 'index, follow';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  ${meta.keywords && meta.keywords.length > 0 ? `<meta name="keywords" content="${meta.keywords.join(', ')}">` : ''}
  <meta name="robots" content="${robotsContent}">
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
    
    nav a:hover {
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
    
    .static-content p {
      margin-bottom: 1.5rem;
      color: #374151;
    }
    
    .static-content ul {
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
      nav {
        padding: 0.5rem !important;
      }
      
      nav div {
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
  <!-- STATIC CONTENT: Visible immediately for search engines (NO HIDDEN CONTENT) -->
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
// MAIN BUILD PROCESS (SIMPLIFIED - NO REACT BUILD)
// =============================================================================

async function buildTrueStaticSSG() {
  console.log('🚀 Starting TRUE Static HTML Generation (No Hidden Content)...\n');
  
  try {
    // Generate static HTML for core pages only (first 3 routes)
    const coreRoutes = routes.slice(0, 3); // Home, About, Services
    console.log(`📄 Generating ${coreRoutes.length} core pages with TRUE static HTML\n`);
    
    for (const route of coreRoutes) {
      console.log(`  ⚡ Generating TRUE static: ${route.path}`);
      
      // Get metadata for this route
      const meta = routeMeta[route.path];
      
      if (!meta) {
        console.log(`    ⚠️ No metadata found for ${route.path}, skipping`);
        continue;
      }
      
      // Generate TRUE static HTML (no hidden content)
      const html = generateTrueStaticHTML(route, meta);
      
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
      
      // Write TRUE static HTML file
      await fs.writeFile(outputPath, html, 'utf8');
      console.log(`    ✅ Generated TRUE static: ${outputPath}`);
    }
    
    console.log('\n🎉 TRUE STATIC HTML GENERATION COMPLETED!\n');
    console.log('📊 BUILD SUMMARY:');
    console.log(`   📄 TRUE static pages generated: ${coreRoutes.length}`);
    console.log('   ✅ ZERO hidden content - visible immediately');
    console.log('   ✅ Complete navigation on every page');
    console.log('   ✅ Unique meta tags for each route');
    console.log('   ✅ Ready for search engine crawling\n');
    
    console.log('🚀 Test with: npm run test:comprehensive');
    console.log('🌐 Deploy to: Production hosting');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTrueStaticSSG();
}

export default buildTrueStaticSSG;
