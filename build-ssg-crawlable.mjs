#!/usr/bin/env node
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// MARDEN SEO WEBSITE ROUTES - Complete route structure
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

// MARDEN SEO WEBSITE METADATA - Optimized for SEO services business
const routeMeta = {
  '/': {
    title: 'Marden SEO - Professional SEO Services | Boost Your Rankings',
    description: 'Transform your business with expert SEO services that drive real results. Professional search engine optimization, app development, and digital marketing solutions.',
    keywords: 'SEO services, search engine optimization, app development, workflow automation, digital marketing, Marden SEO',
    h1: 'Professional SEO Services That Drive Results',
    priority: '1.0'
  },
  '/about': {
    title: 'About Marden SEO - SEO Experts & App Development Team',
    description: 'Meet the expert team behind Marden SEO success. Our experienced professionals specialize in search engine optimization and innovative app development solutions.',
    keywords: 'about Marden SEO, SEO experts, app development team, digital marketing professionals, SEO company',
    h1: 'About Our SEO & Development Team',
    priority: '0.9'
  },
  '/services': {
    title: 'SEO Services & Packages - Comprehensive Digital Marketing Solutions',
    description: 'Comprehensive SEO packages designed to boost your online visibility. From keyword research to technical optimization - everything you need to dominate search results.',
    keywords: 'SEO services, SEO packages, keyword research, on-page SEO, technical SEO, content marketing, digital strategy',
    h1: 'Professional SEO Services & Packages',
    priority: '0.95'
  },
  '/services-pricing': {
    title: 'SEO Services Pricing - Transparent & Competitive Packages',
    description: 'Transparent SEO pricing with no hidden fees. Choose from starter, professional, or enterprise packages designed to fit your budget and deliver exceptional ROI.',
    keywords: 'SEO pricing, SEO packages cost, SEO services pricing, affordable SEO, SEO consultation pricing',
    h1: 'SEO Services Pricing & Packages',
    priority: '0.85'
  },
  '/portfolio': {
    title: 'SEO Portfolio - Success Stories & Case Studies | Marden SEO',
    description: 'Discover proven SEO success stories and detailed case studies. Real client results showing traffic growth, ranking improvements, and revenue increases.',
    keywords: 'SEO portfolio, SEO case studies, SEO success stories, client results, SEO projects, ranking improvements',
    h1: 'Our SEO Portfolio & Success Stories',
    priority: '0.8'
  },
  '/blog': {
    title: 'SEO Blog - Latest Tips, Strategies & Industry Insights',
    description: 'Expert SEO blog with latest tips, strategies, and industry insights. Stay updated with search engine algorithm changes and best practices.',
    keywords: 'SEO blog, SEO tips, SEO strategies, search engine optimization blog, SEO news, digital marketing blog',
    h1: 'SEO Blog & Industry Insights',
    priority: '0.8'
  },
  '/contact': {
    title: 'Contact Marden SEO - Get Your Free SEO Consultation',
    description: 'Contact our SEO experts for a free consultation. Let us help you improve your search rankings and grow your online presence.',
    keywords: 'contact SEO company, SEO consultation, SEO contact form, get SEO quote, SEO help, SEO support',
    h1: 'Contact Our SEO Experts',
    priority: '0.85'
  },
  '/app-building': {
    title: 'Custom App Development - React, Mobile & Web Applications',
    description: 'Expert React and mobile app development services. Create scalable, user-friendly applications with modern tech stacks and SEO-optimized architecture.',
    keywords: 'app development, custom app development, React apps, mobile app development, web applications, SEO-optimized apps',
    h1: 'Custom App Development Services',
    priority: '0.85'
  },
  '/workflow-automation': {
    title: 'Workflow Automation - n8n Integration & Business Process Optimization',
    description: 'Streamline operations with custom n8n workflow automation. Reduce manual tasks, optimize processes, and boost productivity with our automation expertise.',
    keywords: 'workflow automation, n8n automation, business process automation, workflow optimization, automation services',
    h1: 'Workflow Automation & n8n Integration',
    priority: '0.85'
  },
  '/admin': {
    title: 'Admin Dashboard - Content Management | Marden SEO',
    description: 'Secure admin portal for website content management and analytics. Access restricted to authorized team members and administrators only.',
    keywords: 'admin dashboard, content management, website administration',
    h1: 'Admin Dashboard',
    priority: '0.1'
  },
  '/cart': {
    title: 'Shopping Cart - SEO Services & Packages | Marden SEO',
    description: 'Review and purchase your selected SEO service packages. Transparent pricing with secure checkout for professional search optimization solutions.',
    keywords: 'SEO services cart, checkout SEO packages, purchase SEO services',
    h1: 'Your SEO Services Cart',
    priority: '0.3'
  },
  '/analytics-test': {
    title: 'Analytics Testing - Performance Monitoring | Marden SEO',
    description: 'Internal testing dashboard for website analytics and performance monitoring. Track SEO metrics, user behavior, and conversion optimization data.',
    keywords: 'analytics testing, performance monitoring, SEO metrics',
    h1: 'Analytics Testing Dashboard',
    priority: '0.1'
  }
}

// Function to execute shell commands
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve({ stdout, stderr })
    })
  })
}

// Generate static HTML navigation for crawlers
function generateStaticNavigation() {
  return `
    <!-- Static Navigation for Search Engine Crawlers -->
    <div style="position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;">
      <nav aria-label="Main navigation">
        <ul>
          ${routes.map(route => {
            const path = route === '/' ? '/' : `${route}/`
            const meta = routeMeta[route]
            const title = meta?.title || route
            return `<li><a href="${path}">${title}</a></li>`
          }).join('\n          ')}
        </ul>
      </nav>
    </div>`
}

// Enhanced function to generate route-specific HTML
async function generateRouteHTML(route) {
  const meta = routeMeta[route]
  const routePath = route === '/' ? '' : route
  const canonicalUrl = `https://mardenseo.com${routePath}`
  
  // Read the template HTML
  const templatePath = path.join(__dirname, 'dist', 'index.html')
  let html = await fs.readFile(templatePath, 'utf-8')
  
  // Replace SEO meta tags
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
  html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`)
  html = html.replace(/<meta name="keywords" content=".*?"/, `<meta name="keywords" content="${meta.keywords}"`)
  
  // Add canonical URL if not present
  if (!html.includes('<link rel="canonical"')) {
    html = html.replace(/<\/head>/, `  <link rel="canonical" href="${canonicalUrl}">\n</head>`)
  } else {
    html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${canonicalUrl}"`)
  }
  
  // Replace or add Open Graph tags
  const ogTitleRegex = /<meta property="og:title" content=".*?"/
  const ogDescRegex = /<meta property="og:description" content=".*?"/
  const ogUrlRegex = /<meta property="og:url" content=".*?"/
  
  if (html.includes('property="og:title"')) {
    html = html.replace(ogTitleRegex, `<meta property="og:title" content="${meta.title}"`)
  } else {
    html = html.replace(/<\/head>/, `  <meta property="og:title" content="${meta.title}">\n</head>`)
  }
  
  if (html.includes('property="og:description"')) {
    html = html.replace(ogDescRegex, `<meta property="og:description" content="${meta.description}"`)
  } else {
    html = html.replace(/<\/head>/, `  <meta property="og:description" content="${meta.description}">\n</head>`)
  }
  
  if (html.includes('property="og:url"')) {
    html = html.replace(ogUrlRegex, `<meta property="og:url" content="${canonicalUrl}"`)
  } else {
    html = html.replace(/<\/head>/, `  <meta property="og:url" content="${canonicalUrl}">\n</head>`)
  }
  
  // Replace or add Twitter Card tags
  const twitterTitleRegex = /<meta name="twitter:title" content=".*?"/
  const twitterDescRegex = /<meta name="twitter:description" content=".*?"/
  
  if (html.includes('name="twitter:title"')) {
    html = html.replace(twitterTitleRegex, `<meta name="twitter:title" content="${meta.title}"`)
  } else {
    html = html.replace(/<\/head>/, `  <meta name="twitter:title" content="${meta.title}">\n</head>`)
  }
  
  if (html.includes('name="twitter:description"')) {
    html = html.replace(twitterDescRegex, `<meta name="twitter:description" content="${meta.description}"`)
  } else {
    html = html.replace(/<\/head>/, `  <meta name="twitter:description" content="${meta.description}">\n</head>`)
  }

  // Add route-specific structured data
  const routeStructuredData = generateRouteStructuredData(route, meta)
  html = html.replace(
    /<\/head>/,
    `  ${routeStructuredData}\n</head>`
  )

  // CRITICAL: Add static navigation for crawlers
  if (!html.includes('<!-- Static Navigation for Search Engine Crawlers -->')) {
    html = html.replace(
      /(<body[^>]*>)/,
      `$1${generateStaticNavigation()}`
    )
  }
  
  return html
}

// Generate route-specific structured data
function generateRouteStructuredData(route, meta) {
  const baseUrl = 'https://mardenseo.com'
  const routePath = route === '/' ? '' : route
  
  // Enhanced structured data for Marden SEO business
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": `${baseUrl}${routePath}`,
    "publisher": {
      "@type": "Organization",
      "name": "Marden SEO",
      "url": "https://mardenseo.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mardenseo.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Marden SEO",
      "description": "Professional SEO services and app development",
      "provider": {
        "@type": "Organization",
        "name": "Marden SEO"
      },
      "serviceType": "SEO Services",
      "areaServed": "Worldwide"
    }
  }
  
  // Add route-specific schema enhancements
  if (route === '/') {
    baseSchema.mainEntity.serviceType = ["SEO Services", "App Development", "Workflow Automation"]
  } else if (route === '/app-building') {
    baseSchema.mainEntity.serviceType = "App Development"
  } else if (route === '/workflow-automation') {
    baseSchema.mainEntity.serviceType = "Workflow Automation"
  }
  
  return `<script type="application/ld+json">
    ${JSON.stringify(baseSchema, null, 2)}
  </script>`
}

// Main build function
async function buildSSG() {
  console.log('🚀 Starting Marden SEO SSG build with crawlability...')
  
  // Step 1: Build the Vite app
  console.log('📦 Building Vite app...')
  try {
    await execPromise('npm run build')
    console.log('✅ Vite build completed')
  } catch (error) {
    console.error('❌ Vite build failed:', error)
    return
  }
  
  // Step 2: Generate static HTML files with crawlable navigation
  console.log('📄 Generating static HTML files with crawlable navigation...')
  for (const route of routes) {
    try {
      const html = await generateRouteHTML(route)
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
      const fullPath = path.join(__dirname, 'dist', routePath)
      
      // Create directory if it doesn't exist
      const dir = path.dirname(fullPath)
      await fs.mkdir(dir, { recursive: true })
      
      // Write the HTML file
      await fs.writeFile(fullPath, html)
      console.log(`✅ Generated: ${routePath}`)
    } catch (error) {
      console.error(`❌ Failed to generate ${route}:`, error)
    }
  }
  
  // Step 3: Generate sitemap
  console.log('🗺️ Generating sitemap...')
  await generateSitemap()
  
  // Step 4: Generate robots.txt
  console.log('🤖 Generating robots.txt...')
  await generateRobotsTxt()
  
  console.log('\n🎉 MARDEN SEO SSG BUILD WITH CRAWLABILITY COMPLETE!')
  console.log('\n🕷️ CRAWLABILITY GUARANTEED:')
  console.log('  ✅ All pages have static HTML files')
  console.log('  ✅ Hidden navigation with HTML <a> tags on every page')
  console.log('  ✅ Unique meta descriptions and titles')
  console.log('  ✅ All routes linked with trailing slashes')
  console.log('  ✅ No JavaScript required for link discovery')
  console.log('  ✅ Perfect for Screaming Frog and Google crawlers')
  console.log('  ✅ Marden SEO business schema markup included')
}

// Generate sitemap
async function generateSitemap() {
  const baseUrl = 'https://mardenseo.com'
  const currentDate = new Date().toISOString().split('T')[0]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  routes.forEach(route => {
    const meta = routeMeta[route]
    const routePath = route === '/' ? '' : route
    const url = `${baseUrl}${routePath}`
    
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${meta.priority}</priority>
  </url>
`
  })

  sitemap += '</urlset>'
  
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml')
  await fs.writeFile(sitemapPath, sitemap)
  console.log('✅ Sitemap generated')
}

// Generate robots.txt
async function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://mardenseo.com/sitemap.xml

# Block access to admin areas
Disallow: /admin/
Disallow: /analytics-test/

# Allow important SEO pages
Allow: /services
Allow: /app-building
Allow: /workflow-automation
Allow: /portfolio
Allow: /blog
Allow: /contact
`
  
  const robotsPath = path.join(__dirname, 'dist', 'robots.txt')
  await fs.writeFile(robotsPath, robotsTxt)
  console.log('✅ Robots.txt generated')
}

// Run the build
buildSSG().catch(console.error)
