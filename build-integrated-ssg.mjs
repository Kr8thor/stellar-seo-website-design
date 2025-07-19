#!/usr/bin/env node
/**
 * INTEGRATED SSG BUILD: Creates a single website that serves both React and static HTML
 * 
 * This build creates:
 * 1. React SPA for users (interactive experience)
 * 2. Pre-rendered HTML for crawlers (SEO optimization) 
 * 3. Smart routing that serves the right version to the right visitor
 * 4. Single deployment - no separate systems needed
 */

import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Route definitions (copied from build-ssg-crawlable.mjs)
const routes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
  '/app-building',
  '/workflow-automation'
]

const routeMeta = {
  '/': {
    title: 'Marden SEO - Strategic SEO Solutions for Digital Success | Expert SEO Services',
    description: 'Marden SEO elevates your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions. Get expert SEO services.',
    keywords: 'SEO services, search engine optimization, digital marketing, organic traffic, SEO company, website optimization, search rankings',
    canonical: 'https://mardenseo.com/',
    h1: 'Marden SEO - Strategic SEO Solutions for Digital Success',
    h2: 'Data-driven strategies that drive organic traffic, improve rankings, and increase conversions',
    robots: 'index, follow'
  },
  '/about': {
    title: 'About Marden SEO - Expert SEO Team & Proven Methodology | 10+ Years Experience',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings.',
    keywords: 'about Marden SEO, SEO experts, app development team, digital marketing professionals, SEO experience, proven methodology',
    canonical: 'https://mardenseo.com/about',
    h1: 'About Our SEO & Development Team',
    h2: 'Expert professionals dedicated to your digital success',
    robots: 'index, follow'
  },
  '/services': {
    title: 'Professional SEO Services & Packages | Technical SEO, Content Strategy - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, link building, and performance tracking. Custom packages for all business sizes.',
    keywords: 'SEO services, technical SEO, content strategy, link building, SEO packages, search optimization, website audit',
    canonical: 'https://mardenseo.com/services',
    h1: 'Professional SEO Services & Packages',
    h2: 'Comprehensive optimization solutions for your business',
    robots: 'index, follow'
  },
  '/contact': {
    title: 'Contact Marden SEO | Get Your Free SEO Consultation & Quote Today',
    description: 'Ready to boost your search rankings? Contact Marden SEO for a free consultation and custom SEO strategy. Get your quote today and start growing.',
    keywords: 'contact Marden SEO, SEO consultation, free SEO audit, SEO quote, get started with SEO, SEO help',
    canonical: 'https://mardenseo.com/contact',
    h1: 'Contact Marden SEO',
    h2: 'Get your free SEO consultation and custom strategy',
    robots: 'index, follow'
  },
  '/portfolio': {
    title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
    description: 'View our SEO portfolio showcasing real results for clients. Case studies with traffic growth, ranking improvements, and conversion increases.',
    keywords: 'SEO portfolio, case studies, SEO results, client success, traffic growth, ranking improvements, SEO examples',
    canonical: 'https://mardenseo.com/portfolio',
    h1: 'SEO Portfolio & Case Studies',
    h2: 'Proven results and client success stories',
    robots: 'index, follow'
  },
  '/blog': {
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Stay updated with the latest SEO trends, algorithm changes, and digital marketing strategies. Expert insights from our SEO professionals.',
    keywords: 'SEO blog, digital marketing blog, SEO tips, algorithm updates, SEO strategies, content marketing, search optimization news',
    canonical: 'https://mardenseo.com/blog',
    h1: 'SEO Blog & Digital Marketing Insights',
    h2: 'Expert tips, strategies, and industry insights',
    robots: 'index, follow'
  },
  '/app-building': {
    title: 'Custom App Development Services | React, Mobile & Web Apps - Marden SEO',
    description: 'Professional app development services using React, TypeScript, and modern frameworks. Custom web and mobile applications built for performance and SEO.',
    keywords: 'app development, custom apps, React development, mobile apps, web applications, TypeScript, frontend development',
    canonical: 'https://mardenseo.com/app-building',
    h1: 'Custom App Development Services', 
    h2: 'Professional React, mobile & web application development',
    robots: 'index, follow'
  },
  '/workflow-automation': {
    title: 'Workflow Automation Services | n8n Integration & Business Process Optimization - Marden SEO',
    description: 'Streamline your business with custom workflow automation using n8n, Zapier, and custom solutions. Boost productivity and reduce manual tasks.',
    keywords: 'workflow automation, n8n automation, business process automation, productivity tools, custom integrations, workflow optimization',
    canonical: 'https://mardenseo.com/workflow-automation',
    h1: 'Workflow Automation Services',
    h2: 'Streamline your business with custom automation solutions',
    robots: 'index, follow'
  }
}

// Generate the integrated HTML template that works for both scenarios
async function generateIntegratedHTML(route, meta, assets) {
  const isRootRoute = route === '/'
  
  // Pre-rendered content that crawlers will see
  const prerenderedContent = generateCrawlableContent(route, meta)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags (visible to all) -->
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta name="keywords" content="${meta.keywords}">
  <link rel="canonical" href="${meta.canonical}">
  <meta name="robots" content="${meta.robots}">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${meta.canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "description": "Professional SEO and app development services",
    "url": "https://mardenseo.com",
    "areaServed": "Worldwide",
    "serviceType": ["SEO Services", "App Development", "Workflow Automation"]
  }
  </script>
  
  <!-- Favicon and Assets -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- React Assets (for user interactivity) -->
  <link rel="stylesheet" href="${assets.css}">
</head>
<body>
  <!-- Pre-rendered content for crawlers -->
  <div id="crawler-content" style="display: none;">
    ${prerenderedContent}
  </div>
  
  <!-- React root for users -->
  <div id="root"></div>
  
  <!-- Smart content switching script -->
  <script>
    // Detect if this is a crawler
    const userAgent = navigator.userAgent || '';
    const isCrawler = /bot|crawl|slurp|spider|facebookexternalhit|twitterbot|linkedinbot/i.test(userAgent);
    
    if (isCrawler) {
      // Show pre-rendered content for crawlers
      const crawlerContent = document.getElementById('crawler-content');
      const reactRoot = document.getElementById('root');
      if (crawlerContent && reactRoot) {
        crawlerContent.style.display = 'block';
        reactRoot.style.display = 'none';
        // Copy crawler content to root for full visibility
        reactRoot.innerHTML = crawlerContent.innerHTML;
        reactRoot.style.display = 'block';
      }
    }
  </script>
  
  <!-- React App (loads for users, ignored by most crawlers) -->
  <script type="module" src="${assets.js}"></script>
  
  <!-- Fallback for crawlers that execute JavaScript -->
  <noscript>
    <style>#root { display: none; } #crawler-content { display: block !important; }</style>
  </noscript>
</body>
</html>`
}

// Generate crawlable content for a route
function generateCrawlableContent(route, meta) {
  const routeContent = {
    '/': `
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | 
        <a href="/portfolio">Portfolio</a> | <a href="/blog">Blog</a> | <a href="/contact">Contact</a> |
        <a href="/app-building">App Development</a> | <a href="/workflow-automation">Automation</a>
      </nav>
      <main>
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        <p>Marden SEO elevates your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions.</p>
        <section>
          <h3>Our Services</h3>
          <ul>
            <li><a href="/services">Professional SEO Services</a></li>
            <li><a href="/app-building">Custom App Development</a></li>
            <li><a href="/workflow-automation">Workflow Automation</a></li>
          </ul>
        </section>
      </main>`,
    '/about': `
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | 
        <a href="/portfolio">Portfolio</a> | <a href="/blog">Blog</a> | <a href="/contact">Contact</a>
      </nav>
      <main>
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        <p>Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings.</p>
      </main>`,
    '/services': `
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | 
        <a href="/portfolio">Portfolio</a> | <a href="/blog">Blog</a> | <a href="/contact">Contact</a>
      </nav>
      <main>
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        <p>Comprehensive SEO services including technical optimization, content strategy, link building, and performance tracking.</p>
      </main>`,
    '/contact': `
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | 
        <a href="/portfolio">Portfolio</a> | <a href="/blog">Blog</a> | <a href="/contact">Contact</a>
      </nav>
      <main>
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        <p>Ready to boost your search rankings? Contact Marden SEO for a free consultation and custom SEO strategy.</p>
      </main>`
  }
  
  return routeContent[route] || `
    <nav>
      <a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | 
      <a href="/contact">Contact</a>
    </nav>
    <main>
      <h1>${meta.h1 || meta.title}</h1>
      <h2>${meta.h2 || meta.description}</h2>
    </main>`
}

// Get built asset filenames
async function getBuiltAssets() {
  try {
    const assetsDir = path.join(__dirname, 'dist', 'assets')
    const files = await fs.readdir(assetsDir)
    
    const jsFile = files.find(file => file.startsWith('index-') && file.endsWith('.js'))
    const cssFile = files.find(file => file.startsWith('index-') && file.endsWith('.css'))
    
    return {
      js: jsFile ? `/assets/${jsFile}` : '/assets/index.js',
      css: cssFile ? `/assets/${cssFile}` : '/assets/index.css'
    }
  } catch (error) {
    console.warn('Could not read assets directory, using fallback names')
    return {
      js: '/assets/index.js',
      css: '/assets/index.css'
    }
  }
}

// Main integrated build function
async function buildIntegratedSSG() {
  console.log('🎯 BUILDING INTEGRATED MARDEN SEO WEBSITE')
  console.log('   ✅ React SPA for users (interactive)')
  console.log('   ✅ Pre-rendered HTML for crawlers (SEO)')
  console.log('   ✅ Single deployment - no separate systems')
  console.log('')
  
  try {
    // Step 1: Build the React application
    console.log('📦 Building React application...')
    await execPromise('npm run build')
    console.log('✅ React build completed')
    
    // Step 2: Get asset filenames
    console.log('🔍 Detecting built assets...')
    const assets = await getBuiltAssets()
    console.log(`✅ Found assets: ${assets.js}, ${assets.css}`)
    
    // Step 3: Generate integrated HTML files for main routes
    console.log('🔄 Creating integrated HTML files...')
    
    const mainRoutes = ['/', '/about', '/services', '/contact', '/portfolio', '/blog', '/app-building', '/workflow-automation']
    
    for (const route of mainRoutes) {
      const meta = routeMeta[route]
      if (!meta) {
        console.warn(`⚠️ No metadata found for route: ${route}`)
        continue
      }
      
      const html = await generateIntegratedHTML(route, meta, assets)
      
      // Determine output path
      let outputPath
      if (route === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html')
      } else {
        const routePath = route.slice(1)
        const dirPath = path.join(__dirname, 'dist', routePath)
        await fs.mkdir(dirPath, { recursive: true })
        outputPath = path.join(dirPath, 'index.html')
      }
      
      await fs.writeFile(outputPath, html, 'utf8')
      console.log(`✅ Created integrated file: ${route}`)
    }
    
    console.log('')
    console.log('🎉 INTEGRATED BUILD COMPLETE!')
    console.log('')
    console.log('✅ Users get: Interactive React experience')
    console.log('✅ Crawlers get: Pre-rendered HTML content')
    console.log('✅ SEO benefit: All pages crawlable and indexable')
    console.log('✅ Deployment: Single /dist folder - no complexity')
    console.log('')
    console.log('🚀 Ready for production deployment!')
    
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

// Export for use in other scripts
export { buildIntegratedSSG, generateIntegratedHTML }

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildIntegratedSSG()
}
