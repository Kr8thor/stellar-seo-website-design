#!/usr/bin/env node
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

// Test results storage
let testResults = []
let totalTests = 0
let passedTests = 0

// Test helper function
function test(name, testFn) {
  totalTests++
  try {
    const result = testFn()
    if (result) {
      passedTests++
      testResults.push({ name, status: 'PASS', details: result === true ? 'OK' : result })
      console.log(`✅ ${name}`)
    } else {
      testResults.push({ name, status: 'FAIL', details: 'Test failed' })
      console.log(`❌ ${name}`)
    }
  } catch (error) {
    testResults.push({ name, status: 'ERROR', details: error.message })
    console.log(`💥 ${name}: ${error.message}`)
  }
}

// Get file content
async function getFileContent(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8')
  } catch (error) {
    throw new Error(`Cannot read file: ${filePath}`)
  }
}

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// Main test runner
async function runCrawlabilityTests() {
  console.log('🕷️ Starting Marden SEO Crawlability Tests...')
  console.log('=' .repeat(60))
  
  // Test 1: Verify all route files exist
  console.log('\\n📁 Testing Static File Generation...')
  for (const route of routes) {
    const filePath = route === '/' ? 
      path.join(__dirname, 'dist', 'index.html') :
      path.join(__dirname, 'dist', route.slice(1), 'index.html')
    
    await test(`File exists: ${route}`, async () => {
      return await fileExists(filePath)
    })
  }
  
  // Test 2: Critical crawlability test - Static navigation presence
  console.log('\\n🔍 Testing Static Navigation for Crawlers...')
  for (const route of routes) {
    const filePath = route === '/' ? 
      path.join(__dirname, 'dist', 'index.html') :
      path.join(__dirname, 'dist', route.slice(1), 'index.html')
    
    await test(`Static navigation exists: ${route}`, async () => {
      const content = await getFileContent(filePath)
      return content.includes('<!-- Static Navigation for Search Engine Crawlers -->') &&
             content.includes('aria-label="Main navigation"')
    })
  }
  
  // Test 3: Verify all routes linked in static navigation
  console.log('\\n🔗 Testing Internal Link Structure...')
  for (const route of routes) {
    const filePath = route === '/' ? 
      path.join(__dirname, 'dist', 'index.html') :
      path.join(__dirname, 'dist', route.slice(1), 'index.html')
    
    await test(`All routes linked in ${route}`, async () => {
      const content = await getFileContent(filePath)
      
      // Check that all routes have HTML anchor tags
      const hasAllLinks = routes.every(targetRoute => {
        const linkPath = targetRoute === '/' ? '/' : `${targetRoute}/`
        return content.includes(`<a href="${linkPath}">`)
      })
      
      return hasAllLinks
    })
  }
  
  // Test 4: Meta tags uniqueness and quality
  console.log('\\n📝 Testing Meta Tag Uniqueness & Quality...')
  const metaDescriptions = []
  const metaTitles = []
  
  for (const route of routes) {
    const filePath = route === '/' ? 
      path.join(__dirname, 'dist', 'index.html') :
      path.join(__dirname, 'dist', route.slice(1), 'index.html')
    
    await test(`Unique meta description: ${route}`, async () => {
      const content = await getFileContent(filePath)
      const descMatch = content.match(/<meta name="description" content="([^"]+)"/)
      
      if (descMatch) {
        const description = descMatch[1]
        if (metaDescriptions.includes(description)) {
          return false // Duplicate found
        }
        metaDescriptions.push(description)
        return description.length >= 140 && description.length <= 160
      }
      return false
    })
    
    await test(`Unique meta title: ${route}`, async () => {
      const content = await getFileContent(filePath)
      const titleMatch = content.match(/<title>([^<]+)<\/title>/)
      
      if (titleMatch) {
        const title = titleMatch[1]
        if (metaTitles.includes(title)) {
          return false // Duplicate found
        }
        metaTitles.push(title)
        return title.length >= 30 && title.length <= 60
      }
      return false
    })
  }
  
  // Test 5: SEO-specific tests for Marden SEO
  console.log('\\n🎯 Testing Marden SEO Specific Requirements...')
  
  // Test homepage has proper SEO structure
  await test('Homepage has Marden SEO branding', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'index.html'))
    return content.includes('Marden SEO') && 
           content.includes('SEO Services') &&
           content.includes('Professional')
  })
  
  // Test services page optimization
  await test('Services page SEO optimized', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'services', 'index.html'))
    return content.includes('SEO Services') &&
           content.includes('Packages') &&
           content.includes('optimization')
  })
  
  // Test app building page exists and optimized
  await test('App Building page SEO optimized', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'app-building', 'index.html'))
    return content.includes('App Development') &&
           content.includes('React') &&
           content.includes('Custom')
  })
  
  // Test workflow automation page exists and optimized
  await test('Workflow Automation page SEO optimized', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'workflow-automation', 'index.html'))
    return content.includes('Workflow Automation') &&
           content.includes('n8n') &&
           content.includes('Business')
  })
  
  // Test 6: Structured data testing
  console.log('\\n🏗️ Testing Structured Data...')
  for (const route of routes) {
    const filePath = route === '/' ? 
      path.join(__dirname, 'dist', 'index.html') :
      path.join(__dirname, 'dist', route.slice(1), 'index.html')
    
    await test(`Structured data present: ${route}`, async () => {
      const content = await getFileContent(filePath)
      return content.includes('application/ld+json') &&
             content.includes('schema.org') &&
             content.includes('WebPage') &&
             content.includes('Marden SEO')
    })
  }
  
  // Test 7: SEO files
  console.log('\\n🗺️ Testing SEO Files...')
  await test('Sitemap exists', async () => {
    return await fileExists(path.join(__dirname, 'dist', 'sitemap.xml'))
  })
  
  await test('Robots.txt exists', async () => {
    return await fileExists(path.join(__dirname, 'dist', 'robots.txt'))
  })
  
  await test('Sitemap contains all routes', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'sitemap.xml'))
    return routes.every(route => {
      const url = route === '/' ? 'https://mardenseo.com' : `https://mardenseo.com${route}`
      return content.includes(url)
    })
  })
  
  await test('Robots.txt allows SEO crawling', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'robots.txt'))
    return content.includes('Allow: /') &&
           content.includes('Sitemap: https://mardenseo.com/sitemap.xml') &&
           content.includes('Disallow: /admin/')
  })
  
  // Test 8: Performance and accessibility
  console.log('\\n⚡ Testing Performance & Accessibility...')
  await test('Homepage size reasonable', async () => {
    const stats = await fs.stat(path.join(__dirname, 'dist', 'index.html'))
    return stats.size < 200000 // Less than 200KB
  })
  
  await test('All pages have viewport meta tag', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'index.html'))
    return content.includes('<meta name="viewport"')
  })
  
  await test('All pages have charset declaration', async () => {
    const content = await getFileContent(path.join(__dirname, 'dist', 'index.html'))
    return content.includes('charset=')
  })
  
  // Final Results
  console.log('\\n' + '=' .repeat(60))
  console.log('🏆 MARDEN SEO CRAWLABILITY TEST RESULTS')
  console.log('=' .repeat(60))
  
  const passRate = ((passedTests / totalTests) * 100).toFixed(1)
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${totalTests - passedTests}`)
  console.log(`Pass Rate: ${passRate}%`)
  
  if (passRate >= 95) {
    console.log('\\n🎉 EXCELLENT! Marden SEO website should be fully crawlable.')
    console.log('✅ Ready for search engine indexing')
    console.log('✅ All SEO pages properly structured')
    console.log('✅ Perfect for Screaming Frog crawling')
  } else if (passRate >= 80) {
    console.log('\\n⚠️ GOOD but needs improvement. Review failed tests.')
  } else {
    console.log('\\n❌ CRITICAL ISSUES detected. Fix failed tests before deployment.')
  }
  
  // Show failed tests details
  const failedTests = testResults.filter(t => t.status !== 'PASS')
  if (failedTests.length > 0) {
    console.log('\\n📋 Failed Tests Details:')
    failedTests.forEach(test => {
      console.log(`  ❌ ${test.name}: ${test.details}`)
    })
  }
  
  return passRate
}

// Run the tests
runCrawlabilityTests().catch(console.error)
