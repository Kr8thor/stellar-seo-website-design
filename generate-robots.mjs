import fs from 'fs';
import path from 'path';

// Site configuration
const SITE_URL = 'https://mardenseo.com';
const OUTPUT_PATH = './dist/robots.txt';

// Function to generate robots.txt content
function generateRobotsTxt() {
  const robotsContent = `# Robots.txt for Marden SEO
# Updated: ${new Date().toISOString().split('T')[0]}

# Allow all crawlers to access the site
User-agent: *
Allow: /

# Block access to admin and system pages
Disallow: /admin/
Disallow: /cart/
Disallow: /analytics-test/

# Block access to build assets and config files
Disallow: /assets/
Disallow: /*.json
Disallow: /*.js.map
Disallow: /*.css.map

# Allow access to important SEO files
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Block common bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;

  return robotsContent;
}

// Function to write robots.txt to file
function writeRobotsTxt() {
  try {
    const robotsContent = generateRobotsTxt();
    
    // Ensure dist directory exists
    const distDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Write robots.txt
    fs.writeFileSync(OUTPUT_PATH, robotsContent, 'utf8');
    
    console.log('✅ Robots.txt generated successfully!');
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log('🤖 Configured for optimal SEO crawling');
    
    return true;
  } catch (error) {
    console.error('❌ Error generating robots.txt:', error);
    return false;
  }
}

// Function to validate robots.txt
function validateRobotsTxt() {
  try {
    if (!fs.existsSync(OUTPUT_PATH)) {
      console.error('❌ Robots.txt file not found');
      return false;
    }
    
    const content = fs.readFileSync(OUTPUT_PATH, 'utf8');
    
    // Check for required elements
    const hasUserAgent = content.includes('User-agent:');
    const hasSitemap = content.includes('Sitemap:');
    const hasDisallowRules = content.includes('Disallow:');
    
    if (!hasUserAgent || !hasSitemap || !hasDisallowRules) {
      console.error('❌ Missing required robots.txt elements');
      return false;
    }
    
    console.log('✅ Robots.txt validation passed');
    console.log('📋 Contains proper crawling directives');
    
    return true;
  } catch (error) {
    console.error('❌ Error validating robots.txt:', error);
    return false;
  }
}

// Main execution
function main() {
  console.log('🤖 Generating robots.txt...');
  
  const success = writeRobotsTxt();
  
  if (success) {
    validateRobotsTxt();
    console.log('');
    console.log('📋 Robots.txt configuration:');
    console.log('  • Allows all major search engines');
    console.log('  • Blocks admin and system pages');
    console.log('  • Points to sitemap.xml');
    console.log('  • Includes crawl-delay for respectful crawling');
    console.log('  • Blocks common bad bots');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateRobotsTxt, writeRobotsTxt, validateRobotsTxt };
