#!/usr/bin/env node
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const execPromise = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MARDEN SEO WEBSITE ROUTES - Complete route structure matching current site
const routes = [
  '/',
  '/about',
  '/services',
  '/services-pricing', 
  '/portfolio',
  '/blog',
  '/contact',
  '/app-building',
  '/workflow-automation',
  '/admin',
  '/cart',
  '/analytics-test'
]

// MARDEN SEO WEBSITE METADATA - Optimized for current GitHub version
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
  '/services-pricing': {
    title: 'SEO Services Pricing & Packages | Transparent SEO Costs - Marden SEO',
    description: 'Clear, transparent pricing for professional SEO services. Choose from starter, professional, or enterprise packages. Custom solutions available.',
    keywords: 'SEO pricing, SEO packages, SEO costs, transparent pricing, SEO investment, professional SEO rates',
    canonical: 'https://mardenseo.com/services-pricing',
    h1: 'SEO Services Pricing & Packages',
    h2: 'Transparent pricing for professional SEO solutions',
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
  '/contact': {
    title: 'Contact Marden SEO | Get Your Free SEO Consultation & Quote Today',
    description: 'Ready to boost your search rankings? Contact Marden SEO for a free consultation and custom SEO strategy. Get your quote today and start growing.',
    keywords: 'contact Marden SEO, SEO consultation, free SEO audit, SEO quote, get started with SEO, SEO help',
    canonical: 'https://mardenseo.com/contact',
    h1: 'Contact Marden SEO',
    h2: 'Get your free SEO consultation and custom strategy',
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
    title: 'Workflow Automation & n8n Integration Services | Business Process Optimization',
    description: 'Streamline your business with custom workflow automation using n8n, Zapier, and other tools. Increase efficiency and reduce manual tasks.',
    keywords: 'workflow automation, n8n automation, business process automation, Zapier integration, workflow optimization, automation services',
    canonical: 'https://mardenseo.com/workflow-automation',
    h1: 'Workflow Automation & n8n Integration',
    h2: 'Streamline business processes with intelligent automation',
    robots: 'index, follow'
  },
  '/admin': {
    title: 'Admin Dashboard | Marden SEO Management Portal',
    description: 'Administrative access for Marden SEO management and analytics. Internal use only.',
    keywords: 'admin, dashboard, management, analytics',
    canonical: 'https://mardenseo.com/admin',
    h1: 'Admin Dashboard',
    h2: 'Management portal and analytics',
    robots: 'noindex, nofollow'
  },
  '/cart': {
    title: 'Shopping Cart | Marden SEO Services',
    description: 'Review your selected SEO services and packages before checkout. Secure payment processing available.',
    keywords: 'cart, checkout, SEO services, payment',
    canonical: 'https://mardenseo.com/cart',
    h1: 'Shopping Cart',
    h2: 'Review your selected services',
    robots: 'noindex, follow'
  },
  '/analytics-test': {
    title: 'Analytics Testing | Marden SEO',
    description: 'Internal analytics and tracking testing page.',
    keywords: 'analytics, testing, tracking',
    canonical: 'https://mardenseo.com/analytics-test',
    h1: 'Analytics Testing',
    h2: 'Internal testing page',
    robots: 'noindex, nofollow'
  }
}

// Generate crawlable content for each route that matches the React version
function generateCrawlableContent(route, meta) {
  const normalizedRoute = route.trim()
  
  // Home page - Hero section with main content
  if (normalizedRoute === '/') {
    return `
      <section class="relative min-h-screen flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Professional SEO optimization workspace" class="w-full h-full object-cover opacity-20">
          <div class="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
        </div>
        <div class="container mx-auto px-4 md:px-8 relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 text-foreground">${meta.h1}</h1>
            <p class="text-xl md:text-2xl mb-10 text-muted-foreground">${meta.h2}</p>
            <div class="flex flex-wrap gap-4">
              <a href="/contact" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">Get a Free Consultation</a>
              <a href="/services" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">View Our Services</a>
            </div>
          </div>
        </div>
      </section>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // About page - Team and company info
  if (normalizedRoute === '/about') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-12 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 class="text-2xl font-semibold mb-6">Our Mission</h2>
              <p class="text-muted-foreground mb-6">At Marden SEO, we're dedicated to helping businesses achieve sustainable growth through strategic search engine optimization and innovative digital solutions.</p>
              <p class="text-muted-foreground">Our team combines technical expertise with creative strategy to deliver measurable results that drive real business impact.</p>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-6">Our Approach</h2>
              <p class="text-muted-foreground mb-6">We believe in data-driven strategies that are tailored to each client's unique goals and industry challenges.</p>
              <p class="text-muted-foreground">From technical SEO audits to content strategy and custom app development, we provide comprehensive solutions for digital success.</p>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Services page - Service listings
  if (normalizedRoute === '/services') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-16 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">Technical SEO</h3>
              <p class="text-muted-foreground">Comprehensive technical optimization including site speed, mobile responsiveness, and crawlability improvements.</p>
            </div>
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">Content Strategy</h3>
              <p class="text-muted-foreground">Data-driven content planning and optimization to target high-value keywords and engage your audience.</p>
            </div>
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">Link Building</h3>
              <p class="text-muted-foreground">High-quality backlink acquisition through strategic outreach and content marketing initiatives.</p>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Contact page - Contact form and info
  if (normalizedRoute === '/contact') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-12 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <h2 class="text-2xl font-semibold mb-6">Get In Touch</h2>
              <form class="space-y-4">
                <input type="text" placeholder="Your Name" class="w-full px-3 py-2 border border-input rounded-md">
                <input type="email" placeholder="Your Email" class="w-full px-3 py-2 border border-input rounded-md">
                <textarea placeholder="Your Message" rows="4" class="w-full px-3 py-2 border border-input rounded-md"></textarea>
                <button type="submit" class="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">Send Message</button>
              </form>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>
              <div class="space-y-4">
                <p class="text-muted-foreground">Ready to boost your search rankings? Get in touch for a free consultation and custom SEO strategy.</p>
                <p class="text-muted-foreground">We respond to all inquiries within 24 hours and provide detailed proposals within 48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Portfolio page - Case studies and work examples
  if (normalizedRoute === '/portfolio') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-16 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">E-commerce SEO Success</h3>
              <p class="text-muted-foreground mb-4">Increased organic traffic by 300% and revenue by 250% for an online retailer.</p>
              <div class="text-sm text-muted-foreground">Results: +300% Traffic, +250% Revenue</div>
            </div>
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">SaaS Growth Strategy</h3>
              <p class="text-muted-foreground mb-4">Helped a SaaS company achieve #1 rankings for competitive keywords.</p>
              <div class="text-sm text-muted-foreground">Results: #1 Rankings, +180% Leads</div>
            </div>
            <div class="bg-card text-card-foreground rounded-lg border p-6">
              <h3 class="text-xl font-semibold mb-4">Local Business Domination</h3>
              <p class="text-muted-foreground mb-4">Dominated local search results for a professional services firm.</p>
              <div class="text-sm text-muted-foreground">Results: #1 Local Rankings, +220% Calls</div>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Blog page - Article listings
  if (normalizedRoute === '/blog') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-16 text-center">${meta.h2}</p>
          
          <div class="space-y-8">
            <article class="bg-card text-card-foreground rounded-lg border p-6">
              <h2 class="text-2xl font-semibold mb-4">The Complete Guide to Technical SEO</h2>
              <p class="text-muted-foreground mb-4">Learn the fundamentals of technical SEO including site speed optimization, mobile responsiveness, and crawlability improvements.</p>
              <div class="text-sm text-muted-foreground">Published: Recent • Read time: 8 min</div>
            </article>
            <article class="bg-card text-card-foreground rounded-lg border p-6">
              <h2 class="text-2xl font-semibold mb-4">Content Strategy for SEO Success</h2>
              <p class="text-muted-foreground mb-4">Discover how to create content that ranks well and drives conversions with our proven content strategy framework.</p>
              <div class="text-sm text-muted-foreground">Published: Recent • Read time: 10 min</div>
            </article>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // App Building page
  if (normalizedRoute === '/app-building') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-12 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <h2 class="text-2xl font-semibold mb-6">Modern Technologies</h2>
              <p class="text-muted-foreground mb-6">We build applications using React, TypeScript, and modern frameworks that ensure performance, scalability, and SEO optimization.</p>
              <ul class="space-y-2 text-muted-foreground">
                <li>• React & TypeScript Development</li>
                <li>• Mobile-Responsive Design</li>
                <li>• SEO-Optimized Applications</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-6">Development Process</h2>
              <p class="text-muted-foreground mb-6">Our structured approach ensures your application meets business goals while providing exceptional user experience.</p>
              <ul class="space-y-2 text-muted-foreground">
                <li>• Requirements Analysis</li>
                <li>• UI/UX Design</li>
                <li>• Development & Testing</li>
                <li>• Deployment & Support</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Workflow Automation page
  if (normalizedRoute === '/workflow-automation') {
    return `
      <main class="container mx-auto px-4 py-16">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-12 text-center">${meta.h2}</p>
          
          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <h2 class="text-2xl font-semibold mb-6">Automation Solutions</h2>
              <p class="text-muted-foreground mb-6">We implement custom workflow automation using n8n, Zapier, and other tools to streamline your business processes.</p>
              <ul class="space-y-2 text-muted-foreground">
                <li>• n8n Workflow Design</li>
                <li>• API Integrations</li>
                <li>• Data Processing Automation</li>
                <li>• Custom Triggers & Actions</li>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl font-semibold mb-6">Benefits</h2>
              <p class="text-muted-foreground mb-6">Reduce manual tasks, improve efficiency, and ensure consistent processes across your organization.</p>
              <ul class="space-y-2 text-muted-foreground">
                <li>• Save Time & Resources</li>
                <li>• Reduce Human Error</li>
                <li>• Improve Consistency</li>
                <li>• Scale Operations</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <div class="hidden">Route: ${route} | Generated by SSG</div>
    `
  }
  
  // Default content for other pages
  return `
    <main class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-8">${meta.h1}</h1>
        <p class="text-xl text-muted-foreground mb-12">${meta.h2}</p>
        <p class="text-muted-foreground">This page is under development. Please check back soon or contact us for more information.</p>
      </div>
    </main>
    <div class="hidden">Route: ${route} | Generated by SSG</div>
  `
}

// Generate crawlable navigation that matches the React navigation
function generateNavigation() {
  return `
    <nav class="hidden" aria-label="Search Engine Navigation">
      <ul>
        <li><a href="/">Home - Marden SEO Strategic Solutions</a></li>
        <li><a href="/about">About - Expert SEO Team</a></li>
        <li><a href="/services">Services - Professional SEO Services</a></li>
        <li><a href="/services-pricing">Pricing - SEO Service Packages</a></li>
        <li><a href="/portfolio">Portfolio - SEO Case Studies</a></li>
        <li><a href="/blog">Blog - SEO Insights & Tips</a></li>
        <li><a href="/contact">Contact - Get SEO Consultation</a></li>
        <li><a href="/app-building">App Development - Custom Applications</a></li>
        <li><a href="/workflow-automation">Automation - Business Process Optimization</a></li>
      </ul>
    </nav>
  `
}

// Get the actual built asset filenames
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

// Generate the HTML template for a route
async function generateRouteHTML(route, meta, assets) {
  const crawlableContent = generateCrawlableContent(route, meta)
  const crawlableNavigation = generateNavigation()
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  
  <!-- Structured Data - Organization -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "description": "Professional SEO and app development services",
    "url": "https://mardenseo.com",
    "areaServed": "Worldwide",
    "serviceType": ["SEO Services", "App Development", "Workflow Automation"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Search Engine Optimization",
            "description": "Professional SEO services to improve search rankings"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "App Development",
            "description": "Custom application development with React and TypeScript"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Workflow Automation",
            "description": "Business process automation with n8n and custom tools"
          }
        }
      ]
    }
  }
  </script>
  
  <!-- Favicon and Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Preload critical resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://images.unsplash.com">
  ${assets.css ? `<link rel="stylesheet" href="${assets.css}">` : ''}
</head>
<body class="min-h-screen bg-background font-sans antialiased">
  ${crawlableNavigation}
  ${crawlableContent}
  <div id="root"></div>
  
  <!-- React hydration will happen here -->
  ${assets.js ? `<script type="module" crossorigin src="${assets.js}"></script>` : ''}
</body>
</html>`
}

// Main SSG build function
async function buildSSG() {
  console.log('🚀 Starting Marden SEO Website SSG Build...')
  
  try {
    // Step 1: Run regular Vite build
    console.log('📦 Building React application...')
    await execPromise('npm run build')
    console.log('✅ React build completed')
    
    // Step 1.5: Get the actual built asset filenames
    console.log('🔍 Detecting built asset filenames...')
    const assets = await getBuiltAssets()
    console.log(`✅ Found assets: JS=${assets.js}, CSS=${assets.css}`)
    
    // Step 2: Generate static HTML files for each route
    console.log('🔄 Generating static HTML files...')
    
    for (const route of routes) {
      const meta = routeMeta[route]
      if (!meta) {
        console.warn(`⚠️ No metadata found for route: ${route}`)
        continue
      }
      
      const html = await generateRouteHTML(route, meta, assets)
      
      // Determine the output path
      let outputPath
      if (route === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html')
      } else {
        const routePath = route.slice(1) // Remove leading slash
        const dirPath = path.join(__dirname, 'dist', routePath)
        await fs.mkdir(dirPath, { recursive: true })
        outputPath = path.join(dirPath, 'index.html')
      }
      
      await fs.writeFile(outputPath, html, 'utf8')
      console.log(`✅ Generated: ${route} -> ${outputPath}`)
    }
    
    // Step 3: Generate sitemap.xml
    console.log('🗺️ Generating sitemap...')
    const sitemap = generateSitemap()
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap, 'utf8')
    console.log('✅ Sitemap generated')
    
    // Step 4: Generate robots.txt
    console.log('🤖 Generating robots.txt...')
    const robots = generateRobots()
    await fs.writeFile(path.join(__dirname, 'dist', 'robots.txt'), robots, 'utf8')
    console.log('✅ Robots.txt generated')
    
    console.log('🎉 SSG Build Complete! All routes generated with proper SEO optimization.')
    console.log(`📊 Generated ${routes.length} static HTML files`)
    console.log('🔍 Each page includes unique meta tags, structured data, and crawlable content')
    
  } catch (error) {
    console.error('❌ SSG Build Failed:', error.message)
    process.exit(1)
  }
}

// Generate sitemap.xml
function generateSitemap() {
  const urlEntries = routes.map(route => {
    const meta = routeMeta[route]
    const priority = route === '/' ? '1.0' : '0.8'
    const changefreq = route === '/blog' ? 'weekly' : 'monthly'
    
    return `  <url>
    <loc>${meta.canonical}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  }).join('\n')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

// Generate robots.txt
function generateRobots() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://mardenseo.com/sitemap.xml

# Block admin areas
Disallow: /admin/
Disallow: /analytics-test/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /contact
Allow: /portfolio
Allow: /blog
Allow: /app-building
Allow: /workflow-automation`
}

// Run the SSG build
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSSG()
}

export { buildSSG, routes, routeMeta }