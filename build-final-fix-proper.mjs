#!/usr/bin/env node

/**
 * FINAL FIX IMPLEMENTATION - TRUE SSG BUILD
 * 
 * This implements the exact approach from the Final Fix document:
 * 1. Build React client
 * 2. Build React server bundle  
 * 3. Pre-render React content into HTML
 * 4. No content switching - same HTML for everyone
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function implementFinalFix() {
  console.log('🚀 Implementing Final Fix SSG Build...\n');
  
  try {
    // Step 1: Build React client
    console.log('📦 Step 1: Building React client...');
    execSync('npm run build:client', { stdio: 'inherit' });
    console.log('✅ Client build complete\n');
    
    // Step 2: Build React server bundle
    console.log('📦 Step 2: Building React server bundle...');
    execSync('npm run build:server', { stdio: 'inherit' });
    console.log('✅ Server build complete\n');
    
    // Step 3: Copy client files to root dist
    console.log('📋 Step 3: Preparing dist directory...');
    const clientPath = path.join(__dirname, 'dist', 'client');
    const distPath = path.join(__dirname, 'dist');
    
    // Copy index.html
    await fs.copyFile(
      path.join(clientPath, 'index.html'),
      path.join(distPath, 'index.html')
    );
    
    // Copy assets
    await fs.cp(
      path.join(clientPath, 'assets'),
      path.join(distPath, 'assets'),
      { recursive: true }
    );
    
    // Copy static files
    const staticFiles = ['favicon.ico', 'robots.txt', 'sitemap.xml'];
    for (const file of staticFiles) {
      try {
        await fs.copyFile(
          path.join(clientPath, file),
          path.join(distPath, file)
        );
      } catch (e) {
        // File might not exist yet
      }
    }
    
    console.log('✅ Dist directory prepared\n');
    
    // Step 4: Run prerender script
    console.log('🔧 Step 4: Pre-rendering React content...');
    execSync('node prerender.js', { stdio: 'inherit' });
    console.log('✅ Pre-rendering complete\n');
    
    // Step 5: Generate additional routes
    console.log('📄 Step 5: Generating additional routes...');
    const routes = [
      '/about',
      '/services', 
      '/services-pricing',
      '/contact',
      '/portfolio',
      '/app-building',
      '/workflow-automation',
      '/blog',
      '/blog/local-seo-2025',
      '/blog/ai-midlife-crisis', 
      '/blog/eat-guide'
    ];
    
    // Read the pre-rendered index.html
    const indexPath = path.join(distPath, 'index.html');
    const indexHtml = await fs.readFile(indexPath, 'utf-8');
    
    // Import the render function
    const { render } = await import('./dist/server/entry-server.js');
    
    for (const route of routes) {
      console.log(`  ⚡ Generating ${route}...`);
      
      // Render the route
      const { html } = await render(route);
      
      // Replace the root content
      const preRendered = indexHtml.replace(
        /<div id="root">.*?<\/div>/s,
        `<div id="root">${html}</div>`
      );
      
      // Update meta tags
      const finalHtml = updateMetaTags(preRendered, route);
      
      // Create directory and write file
      const routePath = path.join(distPath, route.substring(1), 'index.html');
      await fs.mkdir(path.dirname(routePath), { recursive: true });
      await fs.writeFile(routePath, finalHtml, 'utf-8');
      
      console.log(`    ✅ Generated ${routePath}`);
    }
    
    // Step 6: Generate sitemap.xml
    console.log('\n🗺️ Step 6: Generating sitemap.xml...');
    await generateSitemap();
    console.log('✅ Sitemap generated\n');
    
    // Step 7: Generate robots.txt
    console.log('🤖 Step 7: Generating robots.txt...');
    await generateRobotsTxt();
    console.log('✅ Robots.txt generated\n');
    
    console.log('🎉 FINAL FIX IMPLEMENTATION COMPLETE!');
    console.log('\n✅ What was achieved:');
    console.log('   • React content pre-rendered into HTML');
    console.log('   • No content switching or cloaking');
    console.log('   • Same HTML served to everyone');
    console.log('   • All pages fully crawlable');
    console.log('   • React app remains interactive');
    console.log('\n🚀 Test with: npm run test:final-fix');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

function updateMetaTags(html, route) {
  const metaData = {
    '/': {
      title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
      description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.'
    },
    '/about': {
      title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
      description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.'
    },
    '/services': {
      title: 'Professional SEO Services & Solutions | Comprehensive SEO Packages - Marden SEO',
      description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and link building. Custom packages for businesses of all sizes.'
    },
    '/services-pricing': {
      title: 'SEO Services & Pricing Packages | Transparent SEO Pricing - Marden SEO',
      description: 'Transparent SEO pricing packages for businesses of all sizes. From starter SEO to enterprise solutions. Get measurable results with our proven SEO strategies.'
    },
    '/contact': {
      title: 'Contact Marden SEO | Free SEO Consultation & Custom Quotes',
      description: 'Contact Marden SEO for a free consultation, custom SEO quote, or app development project. Get expert advice on improving your search rankings and online presence.'
    },
    '/portfolio': {
      title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
      description: 'View our SEO portfolio featuring real client results, case studies, and success stories. See how we help businesses achieve top search rankings and increased traffic.'
    },
    '/app-building': {
      title: 'Custom App Development | React & Modern Web Applications - Marden SEO',
      description: 'Professional custom app development services using React, TypeScript, and modern web technologies. Build scalable applications that support your business growth.'
    },
    '/workflow-automation': {
      title: 'Workflow Automation Services | n8n & Business Process Optimization - Marden SEO',
      description: 'Professional workflow automation services using n8n and custom solutions. Streamline business processes, integrate systems, and improve efficiency with automated workflows.'
    },
    '/blog': {
      title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
      description: 'Expert SEO tips, digital marketing strategies, and industry insights from Marden SEO professionals. Stay updated with the latest SEO trends and best practices.'
    },
    '/blog/local-seo-2025': {
      title: 'Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack | Marden SEO',
      description: 'Master local SEO in 2025 with this comprehensive guide. Learn proven strategies to dominate the Google Map Pack and outrank your local competitors.'
    },
    '/blog/ai-midlife-crisis': {
      title: 'From Google Whisperer to AI Prophet: An SEO\'s Midlife Crisis | Marden SEO',
      description: 'Explore the evolution of SEO in the age of AI. Discover how search professionals are adapting to artificial intelligence and what it means for the future of SEO.'
    },
    '/blog/eat-guide': {
      title: 'The Complete Guide to E-E-A-T | Expert SEO Strategy - Marden SEO',
      description: 'Master Google\'s E-E-A-T framework with this comprehensive guide covering experience, expertise, authoritativeness, and trust signals for better search rankings.'
    }
  };
  
  const meta = metaData[route] || metaData['/'];
  
  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );
  
  // Update description
  html = html.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${meta.description}">`
  );
  
  // Update canonical
  const canonical = `https://mardenseo.com${route === '/' ? '' : route}`;
  if (!html.includes('<link rel="canonical"')) {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonical}">\n</head>`
    );
  }
  
  // Update Open Graph
  html = html.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${meta.title}">`
  );
  
  html = html.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${meta.description}">`
  );
  
  html = html.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${canonical}">`
  );
  
  return html;
}

async function generateSitemap() {
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/services-pricing', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { path: '/app-building', priority: '0.7', changefreq: 'monthly' },
    { path: '/workflow-automation', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.7', changefreq: 'daily' },
    { path: '/blog/local-seo-2025', priority: '0.6', changefreq: 'monthly' },
    { path: '/blog/ai-midlife-crisis', priority: '0.6', changefreq: 'monthly' },
    { path: '/blog/eat-guide', priority: '0.6', changefreq: 'monthly' }
  ];
  
  const entries = routes.map(route => `  <url>
    <loc>https://mardenseo.com${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
  
  await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap);
}

async function generateRobotsTxt() {
  const robots = `# Robots.txt for Marden SEO
User-agent: *
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /analytics-test

Sitemap: https://mardenseo.com/sitemap.xml
`;
  
  await fs.writeFile(path.join(__dirname, 'dist', 'robots.txt'), robots);
}

// Run the build
implementFinalFix();
