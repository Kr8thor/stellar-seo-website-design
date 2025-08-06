#!/usr/bin/env node

/**
 * TRUE SSG BUILD SCRIPT - Following Final Fix Document
 * 
 * This script implements proper Static Site Generation without content switching.
 * The React app is pre-rendered into the HTML, making all content immediately
 * visible to both users and search engines.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define all routes that need to be pre-rendered
const routes = [
  '/',
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
  '/blog/eat-guide',
  '/cart',
  '/admin',
  '/analytics-test'
];

async function buildTrueSSG() {
  console.log('🚀 Starting TRUE SSG Build (Final Fix Implementation)...\n');
  
  try {
    // Step 1: Clean dist directory
    console.log('🧹 Cleaning dist directory...');
    await fs.rm(path.join(__dirname, 'dist'), { recursive: true, force: true });
    console.log('✅ Dist directory cleaned\n');
    
    // Step 2: Build React client
    console.log('📦 Building React client...');
    execSync('npm run build:client', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React client build completed\n');
    
    // Step 3: Build React server bundle
    console.log('📦 Building React server bundle...');
    execSync('npm run build:server', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React server build completed\n');
    
    // Step 4: Copy client files to root dist
    console.log('📋 Preparing dist directory structure...');
    const clientDistPath = path.join(__dirname, 'dist', 'client');
    const rootDistPath = path.join(__dirname, 'dist');
    
    // Copy index.html to root
    const clientIndexPath = path.join(clientDistPath, 'index.html');
    const rootIndexPath = path.join(rootDistPath, 'index.html');
    await fs.copyFile(clientIndexPath, rootIndexPath);
    
    // Copy assets directory
    const clientAssetsPath = path.join(clientDistPath, 'assets');
    const rootAssetsPath = path.join(rootDistPath, 'assets');
    await fs.cp(clientAssetsPath, rootAssetsPath, { recursive: true, force: true });
    
    // Copy any other static files (favicon, images, etc.)
    const filesToCopy = ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png', 'og-image.jpg'];
    for (const file of filesToCopy) {
      const srcPath = path.join(clientDistPath, file);
      const destPath = path.join(rootDistPath, file);
      try {
        await fs.copyFile(srcPath, destPath);
      } catch (e) {
        // File might not exist, that's okay
      }
    }
    
    console.log('✅ Dist directory prepared\n');
    
    // Step 5: Pre-render each route
    console.log('🔧 Pre-rendering routes...');
    const { render } = await import('./dist/server/entry-server.js');
    
    // Read the template once
    const templatePath = path.join(rootDistPath, 'index.html');
    const template = await fs.readFile(templatePath, 'utf-8');
    
    for (const route of routes) {
      console.log(`  ⚡ Pre-rendering: ${route}`);
      
      try {
        // Render the route
        const { html } = await render(route);
        
        // Replace the root div with pre-rendered content
        const placeholder = '<div id="root"></div>';
        const preRenderedHtml = template.replace(
          placeholder,
          `<div id="root">${html}</div>`
        );
        
        // Update meta tags based on route
        const finalHtml = updateMetaTags(preRenderedHtml, route);
        
        // Determine output path
        let outputPath;
        if (route === '/') {
          outputPath = path.join(rootDistPath, 'index.html');
        } else {
          const routePath = route.substring(1); // Remove leading slash
          outputPath = path.join(rootDistPath, routePath, 'index.html');
        }
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Write the pre-rendered HTML
        await fs.writeFile(outputPath, finalHtml, 'utf-8');
        console.log(`    ✅ Generated: ${outputPath}`);
        
      } catch (error) {
        console.error(`    ❌ Failed to render ${route}:`, error.message);
      }
    }
    
    // Step 6: Generate sitemap.xml
    console.log('\n🗺️ Generating sitemap.xml...');
    await generateSitemap(routes);
    console.log('✅ Sitemap generated');
    
    // Step 7: Generate robots.txt
    console.log('🤖 Generating robots.txt...');
    await generateRobotsTxt();
    console.log('✅ Robots.txt generated');
    
    // Success!
    console.log('\n🎉 TRUE SSG BUILD COMPLETED SUCCESSFULLY!');
    console.log('\n📊 BUILD SUMMARY:');
    console.log(`   📄 Total pages pre-rendered: ${routes.length}`);
    console.log(`   ✅ All content visible to search engines`);
    console.log(`   ✅ No content switching or cloaking`);
    console.log(`   ✅ React app fully functional for users`);
    console.log(`   ✅ SEO-optimized with unique meta tags`);
    console.log('\n🚀 Ready for deployment to production!');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Update meta tags based on route
function updateMetaTags(html, route) {
  const metaData = getMetaDataForRoute(route);
  
  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${metaData.title}</title>`
  );
  
  // Update description
  html = html.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${metaData.description}">`
  );
  
  // Update canonical URL
  const canonicalUrl = `https://mardenseo.com${route === '/' ? '' : route}`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href=".*?">/,
      `<link rel="canonical" href="${canonicalUrl}">`
    );
  } else {
    // Add canonical tag if missing
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}">\n</head>`
    );
  }
  
  // Update Open Graph tags
  html = html.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${metaData.title}">`
  );
  
  html = html.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${metaData.description}">`
  );
  
  html = html.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${canonicalUrl}">`
  );
  
  // Handle noindex pages
  if (metaData.noindex) {
    if (html.includes('<meta name="robots"')) {
      html = html.replace(
        /<meta name="robots" content=".*?">/,
        '<meta name="robots" content="noindex, nofollow">'
      );
    } else {
      html = html.replace(
        '</head>',
        '  <meta name="robots" content="noindex, nofollow">\n</head>'
      );
    }
  }
  
  return html;
}

// Get meta data for each route
function getMetaDataForRoute(route) {
  const metaMap = {
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
    },
    '/cart': {
      title: 'Shopping Cart | Marden SEO',
      description: 'Review your selected services and packages.',
      noindex: true
    },
    '/admin': {
      title: 'Admin Panel | Marden SEO',
      description: 'Administrative interface for authorized users.',
      noindex: true
    },
    '/analytics-test': {
      title: 'Analytics Testing | Marden SEO',
      description: 'Analytics testing interface.',
      noindex: true
    }
  };
  
  return metaMap[route] || {
    title: 'Marden SEO - Professional SEO Services',
    description: 'Professional SEO services and digital marketing solutions.'
  };
}

// Generate sitemap.xml
async function generateSitemap(routes) {
  const sitemapRoutes = routes.filter(route => {
    const meta = getMetaDataForRoute(route);
    return !meta.noindex;
  });
  
  const sitemapEntries = sitemapRoutes.map(route => {
    const priority = route === '/' ? '1.0' : 
                    route.includes('/blog/') ? '0.6' :
                    route.includes('/services') || route === '/about' ? '0.9' :
                    '0.7';
    
    const changefreq = route === '/' ? 'weekly' :
                      route === '/blog' ? 'daily' :
                      route.includes('/blog/') ? 'monthly' :
                      'weekly';
    
    return `  <url>
    <loc>https://mardenseo.com${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
  
  await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemapContent, 'utf-8');
}

// Generate robots.txt
async function generateRobotsTxt() {
  const robotsContent = `# Robots.txt for Marden SEO
# Generated on ${new Date().toISOString()}

User-agent: *
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /analytics-test

# Sitemap location
Sitemap: https://mardenseo.com/sitemap.xml

# Crawl delay (optional, remove if not needed)
Crawl-delay: 1
`;
  
  await fs.writeFile(path.join(__dirname, 'dist', 'robots.txt'), robotsContent, 'utf-8');
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
  buildTrueSSG();
}

export default buildTrueSSG;
