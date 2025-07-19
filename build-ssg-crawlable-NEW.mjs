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

// MARDEN SEO WEBSITE METADATA - ALL PAGES SET TO INDEXABLE FOR TESTING
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
    description: 'Administrative access for Marden SEO management and analytics. Comprehensive dashboard for monitoring SEO performance and client progress.',
    keywords: 'admin, dashboard, management, analytics, SEO monitoring, client progress, performance tracking',
    canonical: 'https://mardenseo.com/admin',
    h1: 'Admin Dashboard',
    h2: 'Comprehensive SEO management and analytics portal',
    robots: 'index, follow'
  },
  '/cart': {
    title: 'Shopping Cart | Marden SEO Services & Packages',
    description: 'Review your selected SEO services and packages before checkout. Secure payment processing and flexible service options available.',
    keywords: 'cart, checkout, SEO services, payment, service packages, secure checkout, SEO pricing',
    canonical: 'https://mardenseo.com/cart',
    h1: 'Shopping Cart',
    h2: 'Review and customize your selected SEO services',
    robots: 'index, follow'
  },
  '/analytics-test': {
    title: 'Analytics & Performance Testing | Marden SEO Tools',
    description: 'Advanced analytics and performance testing tools for SEO optimization. Monitor website performance, track improvements, and analyze SEO metrics.',
    keywords: 'analytics, testing, tracking, performance monitoring, SEO tools, website analysis, metrics tracking',
    canonical: 'https://mardenseo.com/analytics-test',
    h1: 'Analytics & Performance Testing',
    h2: 'Advanced tools for SEO optimization and monitoring',
    robots: 'index, follow'
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
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center text-white">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              ${meta.h1}
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              ${meta.h2}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="/contact" class="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                Get Free SEO Audit
              </a>
              <a href="/services" class="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors">
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-20 bg-background">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Marden SEO?</h2>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">We deliver measurable results through data-driven SEO strategies that increase organic traffic, improve search rankings, and drive business growth.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Fast Results</h3>
              <p class="text-muted-foreground">See ranking improvements within 30-90 days with our proven optimization strategies.</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Data-Driven</h3>
              <p class="text-muted-foreground">Every decision backed by comprehensive analytics and performance tracking.</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">White Hat</h3>
              <p class="text-muted-foreground">Only ethical, Google-approved techniques that ensure long-term success.</p>
            </div>
          </div>
        </div>
      </section>
    `
  }
  
  // About page
  if (normalizedRoute === '/about') {
    return `
      <section class="py-20 bg-background">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">${meta.h1}</h1>
            <p class="text-xl text-muted-foreground mb-12">${meta.h2}</p>
            
            <div class="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
                <p class="text-muted-foreground mb-6">At Marden SEO, we believe every business deserves to be found online. Our mission is to help companies of all sizes achieve sustainable growth through strategic search engine optimization and digital innovation.</p>
                
                <h3 class="text-xl font-semibold mb-3">What Sets Us Apart</h3>
                <ul class="space-y-2 text-muted-foreground">
                  <li>• 10+ years of proven SEO expertise</li>
                  <li>• Data-driven optimization strategies</li>
                  <li>• Custom solutions for every business</li>
                  <li>• Transparent reporting and communication</li>
                </ul>
              </div>
              
              <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="SEO team collaboration" class="w-full h-64 object-cover rounded-lg mb-4">
                <h3 class="text-xl font-semibold mb-3">Our Approach</h3>
                <p class="text-muted-foreground">We combine technical expertise with creative strategy to deliver SEO solutions that drive real business results. Every campaign is tailored to your unique goals and industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
  
  // Services page
  if (normalizedRoute === '/services') {
    return `
      <section class="py-20 bg-background">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">${meta.h1}</h1>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto">${meta.h2}</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-card p-6 rounded-lg border">
              <h3 class="text-xl font-semibold mb-3">Technical SEO</h3>
              <p class="text-muted-foreground mb-4">Complete technical optimization including site speed, mobile responsiveness, and Core Web Vitals.</p>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Site speed optimization</li>
                <li>• Mobile optimization</li>
                <li>• Core Web Vitals</li>
                <li>• Technical audits</li>
              </ul>
            </div>
            
            <div class="bg-card p-6 rounded-lg border">
              <h3 class="text-xl font-semibold mb-3">Content Strategy</h3>
              <p class="text-muted-foreground mb-4">Strategic content development that ranks well and converts visitors into customers.</p>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Keyword research</li>
                <li>• Content optimization</li>
                <li>• Blog content strategy</li>
                <li>• Content audits</li>
              </ul>
            </div>
            
            <div class="bg-card p-6 rounded-lg border">
              <h3 class="text-xl font-semibold mb-3">Link Building</h3>
              <p class="text-muted-foreground mb-4">High-quality backlink acquisition through ethical, white-hat link building strategies.</p>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Quality backlinks</li>
                <li>• Guest posting</li>
                <li>• Digital PR</li>
                <li>• Link analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `
  }
  
  // Generic content for other pages
  return `
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">${meta.h1}</h1>
          <p class="text-xl text-muted-foreground mb-8">${meta.h2}</p>
          <p class="text-muted-foreground mb-6">${meta.description}</p>
          
          <div class="flex gap-4">
            <a href="/contact" class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Get Started
            </a>
            <a href="/services" class="border border-input px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors">
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  `
}

// Generate HTML template with proper SEO meta tags
function generateHTMLTemplate(route, meta, jsFile, cssFile) {
  const content = generateCrawlableContent(route, meta)
  
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
  <link rel="stylesheet" href="${cssFile}">
</head>
<body class="min-h-screen bg-background font-sans antialiased">
  <!-- Crawlable Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <a href="/" class="text-xl font-bold">Marden SEO</a>
        <div class="hidden md:flex items-center space-x-6">
          <a href="/" class="text-sm font-medium hover:text-primary">Home</a>
          <a href="/about" class="text-sm font-medium hover:text-primary">About</a>
          <a href="/services" class="text-sm font-medium hover:text-primary">Services</a>
          <a href="/portfolio" class="text-sm font-medium hover:text-primary">Portfolio</a>
          <a href="/blog" class="text-sm font-medium hover:text-primary">Blog</a>
          <a href="/contact" class="text-sm font-medium hover:text-primary">Contact</a>
          <a href="/app-building" class="text-sm font-medium hover:text-primary">App Building</a>
          <a href="/workflow-automation" class="text-sm font-medium hover:text-primary">Automation</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content (Crawlable) -->
  <main class="pt-16">
    ${content}
  </main>

  <!-- Footer (Crawlable) -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Marden SEO</h3>
          <p class="text-gray-400 mb-4">Professional SEO and app development services that drive results.</p>
          <a href="/contact" class="text-primary hover:text-primary/80">Get Started Today</a>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Services</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/services" class="hover:text-white">SEO Services</a></li>
            <li><a href="/app-building" class="hover:text-white">App Development</a></li>
            <li><a href="/workflow-automation" class="hover:text-white">Workflow Automation</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Company</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/about" class="hover:text-white">About Us</a></li>
            <li><a href="/portfolio" class="hover:text-white">Portfolio</a></li>
            <li><a href="/blog" class="hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-md font-semibold mb-4">Connect</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/contact" class="hover:text-white">Contact Us</a></li>
            <li><a href="/services-pricing" class="hover:text-white">Pricing</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2025 Marden SEO. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- React App Hydration -->
  <div id="root"></div>
  <script src="${jsFile}"></script>
</body>
</html>`
}

// Main SSG generation function
async function generateSSG() {
  try {
    console.log('🚀 Starting SSG generation for Marden SEO...')
    
    // Step 1: Build the React app
    console.log('📦 Building React app...')
    await execPromise('npm run build')
    console.log('✅ React build complete')
    
    // Step 2: Read the built assets to get correct filenames
    const distPath = path.join(__dirname, 'dist')
    const assetsPath = path.join(distPath, 'assets')
    
    let jsFile = '/assets/index.js'
    let cssFile = '/assets/index.css'
    
    try {
      const assetFiles = await fs.readdir(assetsPath)
      console.log('📂 Asset files found:', assetFiles)
      
      // Find the correct JS and CSS files
      const jsFiles = assetFiles.filter(file => file.startsWith('index-') && file.endsWith('.js'))
      const cssFiles = assetFiles.filter(file => file.startsWith('index-') && file.endsWith('.css'))
      
      if (jsFiles.length > 0) {
        jsFile = `/assets/${jsFiles[0]}`
        console.log('✅ Found JS file:', jsFile)
      }
      
      if (cssFiles.length > 0) {
        cssFile = `/assets/${cssFiles[0]}`
        console.log('✅ Found CSS file:', cssFile)
      }
    } catch (error) {
      console.log('⚠️  Using default asset filenames')
    }
    
    // Step 3: Generate static HTML for each route
    console.log('🏗️  Generating static HTML files...')
    
    for (const route of routes) {
      const meta = routeMeta[route]
      if (!meta) {
        console.warn(`⚠️  No metadata found for route: ${route}`)
        continue
      }
      
      const html = generateHTMLTemplate(route, meta, jsFile, cssFile)
      
      // Create directory structure
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
      const fullPath = path.join(distPath, routePath)
      const dirPath = path.dirname(fullPath)
      
      await fs.mkdir(dirPath, { recursive: true })
      await fs.writeFile(fullPath, html, 'utf8')
      
      console.log(`✅ Generated: ${routePath}`)
    }
    
    // Step 4: Generate sitemap.xml
    const sitemap = generateSitemap()
    await fs.writeFile(path.join(__dirname, 'dist', 'sitemap.xml'), sitemap, 'utf8')
    console.log('✅ Sitemap.xml generated')
    
    // Step 5: Generate robots.txt
    const robots = generateRobots()
    await fs.writeFile(path.join(__dirname, 'dist', 'robots.txt'), robots, 'utf8')
    console.log('✅ Robots.txt generated')
    
    console.log('🎉 SSG Build Complete! All routes generated with 100% indexable pages.')
    console.log(`📊 Generated ${routes.length} static HTML files`)
    console.log('🔍 ALL pages are now indexable with unique meta tags and crawlable content')
    
  } catch (error) {
    console.error('❌ SSG Build Failed:', error.message)
    process.exit(1)
  }
}

// Generate sitemap.xml - ALL PAGES INCLUDED
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

// Generate robots.txt - ALLOW ALL PAGES FOR TESTING
function generateRobots() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://mardenseo.com/sitemap.xml

# All pages allowed for indexing and testing
Allow: /
Allow: /about
Allow: /services
Allow: /portfolio
Allow: /blog
Allow: /contact
Allow: /app-building
Allow: /workflow-automation
Allow: /admin
Allow: /cart
Allow: /analytics-test`
}

// Run the SSG generation
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSSG()
}

export { generateSSG, routes, routeMeta }
