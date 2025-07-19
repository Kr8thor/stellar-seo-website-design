#!/usr/bin/env node
import { exec } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

const execPromise = promisify(exec)
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
    keywords: 'SEO services cart, purchase SEO packages, SEO checkout, SEO services pricing',
    h1: 'Your SEO Services Cart',
    priority: '0.3'
  },
  '/analytics-test': {
    title: 'Analytics Test - Marden SEO',
    description: 'Internal analytics testing page for tracking and optimization verification.',
    keywords: 'analytics test, tracking verification',
    h1: 'Analytics Test Page',
    priority: '0.1'
  }
}

console.log('🚀 ENHANCED DEBUG: Starting Marden SEO SSG build...')

// Enhanced route HTML generation with better error handling
async function generateRouteHTML(route) {
  console.log(`🔧 ENHANCED DEBUG: Processing route "${route}"`)
  
  const meta = routeMeta[route]
  if (!meta) {
    throw new Error(`No metadata found for route: ${route}`)
  }
  
  const routePath = route === '/' ? '' : route
  const canonicalUrl = `https://mardenseo.com${routePath}`
  
  // Read the template HTML
  const templatePath = path.join(__dirname, 'dist', 'index.html')
  console.log(`📄 Reading template from: ${templatePath}`)
  
  let html
  try {
    html = await fs.readFile(templatePath, 'utf-8')
    console.log(`✅ Template read successfully, size: ${html.length} characters`)
  } catch (error) {
    console.error(`❌ Failed to read template: ${error.message}`)
    throw error
  }
  
  // Replace SEO meta tags with better debugging
  try {
    console.log(`🏷️ Replacing meta tags for: ${meta.title}`)
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    html = html.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`)
    html = html.replace(/<meta name="keywords" content=".*?"/, `<meta name="keywords" content="${meta.keywords}"`)
    console.log(`✅ Meta tags replaced successfully`)
  } catch (error) {
    console.error(`❌ Failed to replace meta tags: ${error.message}`)
    throw error
  }
  
  // Add/replace canonical URL
  try {
    if (!html.includes('<link rel="canonical"')) {
      html = html.replace(/<\/head>/, `  <link rel="canonical" href="${canonicalUrl}">\n</head>`)
    } else {
      html = html.replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${canonicalUrl}"`)
    }
    console.log(`✅ Canonical URL set: ${canonicalUrl}`)
  } catch (error) {
    console.error(`❌ Failed to set canonical URL: ${error.message}`)
  }
  
  // Inject basic content to prove SSG is working
  try {
    const basicContent = `
      <div style="padding: 20px; background: #f5f5f5; margin: 20px; border-radius: 8px;">
        <h1 style="color: #333; margin-bottom: 10px;">${meta.h1}</h1>
        <p style="color: #666; line-height: 1.5;">${meta.description}</p>
        <p style="color: #888; font-size: 14px;">Route: ${route} | Generated by SSG</p>
        <nav style="margin-top: 20px;">
          <a href="/" style="margin-right: 15px; color: #0066cc;">Home</a>
          <a href="/about" style="margin-right: 15px; color: #0066cc;">About</a>
          <a href="/services" style="margin-right: 15px; color: #0066cc;">Services</a>
          <a href="/contact" style="margin-right: 15px; color: #0066cc;">Contact</a>
        </nav>
      </div>
    `
    
    // Handle both empty and filled root div
    if (html.includes('<div id="root"></div>')) {
      html = html.replace(/<div id="root"><\/div>/, `<div id="root">${basicContent}</div>`)
    } else {
      // Replace existing content in root div
      html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<\/body>)/, `<div id="root">${basicContent}</div>$1`)
    }
    console.log(`✅ Basic content injected for route: ${route}`)
  } catch (error) {
    console.error(`❌ Failed to inject content: ${error.message}`)
  }
  
  console.log(`✅ Route HTML generated successfully for: ${route}`)
  return html
}

// Enhanced build function with comprehensive debugging
async function buildSSGEnhanced() {
  console.log('📍 Starting enhanced SSG build process...')
  
  // Step 1: Build the Vite app (optional, can use existing)
  console.log('📦 Checking if we need to build Vite app...')
  const distExists = await fs.access(path.join(__dirname, 'dist')).then(() => true).catch(() => false)
  
  if (!distExists) {
    console.log('📦 Running Vite build...')
    try {
      await execPromise('npm run build')
      console.log('✅ Vite build completed')
    } catch (error) {
      console.error('❌ Vite build failed:', error.message)
      return
    }
  } else {
    console.log('✅ Dist directory exists, proceeding with SSG generation')
  }
  
  // Step 2: Generate static HTML files with enhanced debugging
  console.log('📄 Generating static HTML files with enhanced debugging...')
  let successCount = 0
  let errorCount = 0
  
  for (const route of routes) {
    try {
      console.log(`\n🔄 Processing route: ${route}`)
      
      const html = await generateRouteHTML(route)
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
      const fullPath = path.join(__dirname, 'dist', routePath)
      
      console.log(`📁 Target path: ${fullPath}`)
      
      // Create directory if it doesn't exist
      const dir = path.dirname(fullPath)
      console.log(`📂 Ensuring directory exists: ${dir}`)
      await fs.mkdir(dir, { recursive: true })
      console.log(`✅ Directory ready: ${dir}`)
      
      // Write the HTML file
      console.log(`💾 Writing HTML file...`)
      await fs.writeFile(fullPath, html)
      console.log(`✅ File written: ${routePath}`)
      
      // Verify the file was written
      const fileExists = await fs.access(fullPath).then(() => true).catch(() => false)
      if (fileExists) {
        const content = await fs.readFile(fullPath, 'utf-8')
        console.log(`🔍 File verification: EXISTS (${content.length} characters)`)
        successCount++
      } else {
        console.error(`❌ File verification: MISSING`)
        errorCount++
      }
      
    } catch (error) {
      console.error(`❌ Failed to generate ${route}:`, error.message)
      console.error(`   Stack: ${error.stack}`)
      errorCount++
    }
  }
  
  console.log(`\n📊 Generation Summary:`)
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📈 Total routes: ${routes.length}`)
  
  // List final directory structure
  console.log('\n📂 Final directory structure:')
  try {
    const distPath = path.join(__dirname, 'dist')
    const items = await fs.readdir(distPath, { withFileTypes: true })
    
    for (const item of items) {
      if (item.isDirectory()) {
        console.log(`📁 ${item.name}/`)
        try {
          const subItems = await fs.readdir(path.join(distPath, item.name))
          for (const subItem of subItems) {
            console.log(`   📄 ${subItem}`)
          }
        } catch (e) {
          console.log(`   ❌ Could not read directory: ${e.message}`)
        }
      }
    }
  } catch (error) {
    console.error('❌ Error listing final structure:', error.message)
  }
  
  console.log('\n🎉 ENHANCED SSG BUILD COMPLETE!')
  console.log(`✅ Generated ${successCount} static HTML files`)
  console.log('🌐 Ready for deployment to production!')
}

// Run the enhanced build
buildSSGEnhanced().catch(error => {
  console.error('💥 CRITICAL ERROR:', error.message)
  console.error('Stack:', error.stack)
  process.exit(1)
})
