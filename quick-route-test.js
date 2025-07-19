// Quick test of the route content generation
function generateBasicPageContent(route, meta) {
  const baseClasses = 'min-h-screen bg-background text-foreground'
  const normalizedRoute = route.trim()
  
  console.log(`🔍 Testing route: "${normalizedRoute}"`)
  
  if (normalizedRoute === '/') {
    console.log('✅ HOME route matched')
    return 'HOME_CONTENT_WITH_HERO_SECTION'
  } else if (normalizedRoute === '/about') {
    console.log('✅ ABOUT route matched')
    return 'ABOUT_CONTENT_WITH_MAIN_CONTAINER'
  } else if (normalizedRoute === '/services') {
    console.log('✅ SERVICES route matched')  
    return 'SERVICES_CONTENT_WITH_GRID'
  } else {
    console.log('❌ DEFAULT route matched')
    return 'DEFAULT_CONTENT'
  }
}

// Test meta object
const testMeta = {
  title: 'About Marden SEO - SEO Experts & App Development Team',
  description: 'Meet the expert team behind Marden SEO success.',
  h1: 'About Our SEO & Development Team'
}

console.log('='.repeat(50))
console.log('Testing current route logic:')
console.log('='.repeat(50))

const homeResult = generateBasicPageContent('/', testMeta)
console.log(`Home result: ${homeResult}\n`)

const aboutResult = generateBasicPageContent('/about', testMeta)  
console.log(`About result: ${aboutResult}\n`)

const servicesResult = generateBasicPageContent('/services', testMeta)
console.log(`Services result: ${servicesResult}\n`)
