// Test route conditions
const routes = [
  '/',
  '/about',
  '/services',
  '/contact'
]

function testRouteConditions(route, meta) {
  const normalizedRoute = route.trim()
  
  console.log(`Testing route: "${normalizedRoute}" (length: ${normalizedRoute.length})`)
  
  if (normalizedRoute === '/') {
    console.log('✅ Matched HOME route')
    return 'HOME_CONTENT'
  } else if (normalizedRoute === '/about') {
    console.log('✅ Matched ABOUT route')
    return 'ABOUT_CONTENT'
  } else if (normalizedRoute === '/services') {
    console.log('✅ Matched SERVICES route')
    return 'SERVICES_CONTENT'
  } else if (normalizedRoute === '/contact') {
    console.log('✅ Matched CONTACT route')
    return 'CONTACT_CONTENT'
  } else {
    console.log('❌ No route matched - using DEFAULT')
    return 'DEFAULT_CONTENT'
  }
}

// Test all routes
routes.forEach(route => {
  console.log('\n' + '='.repeat(40))
  const result = testRouteConditions(route, {})
  console.log(`Result: ${result}`)
})
