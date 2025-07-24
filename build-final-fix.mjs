#!/usr/bin/env node

/**
 * 🚀 FINAL FIX IMPLEMENTATION - React SPA with Dynamic Sitemap
 * Based on the "Final fix" document requirements
 * 
 * This implements the CORRECT approach:
 * 1. Single React app (no static HTML generation)
 * 2. Dynamic sitemap for SEO
 * 3. JavaScript-based crawler detection in React app
 * 4. No content switching via .htaccess
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// ROUTE DEFINITIONS FOR SITEMAP ONLY
// =============================================================================

const routes = [
  // Core Business Pages
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about/', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/', priority: 0.9, changefreq: 'weekly' },
  { path: '/services-pricing/', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact/', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio/', priority: 0.8, changefreq: 'weekly' },
  { path: '/app-building/', priority: 0.7, changefreq: 'monthly' },
  { path: '/workflow-automation/', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/', priority: 0.7, changefreq: 'daily' },
];

// =============================================================================
// BLOG POST DISCOVERY
// =============================================================================

async function discoverBlogPosts() {
  try {
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.tsx');
    const blogContent = await fs.readFile(blogDataPath, 'utf8');
    
    const blogPosts = [];
    const matches = blogContent.match(/id:\s*[\"'`]([^\"'`]+)[\"'`][\s\S]*?title:\s*[\"'`]([^\"'`]+)[\"'`]/g);
    
    if (matches) {
      matches.forEach(match => {
        const idMatch = match.match(/id:\s*[\"'`]([^\"'`]+)[\"'`]/);
        const titleMatch = match.match(/title:\s*[\"'`]([^\"'`]+)[\"'`]/);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          blogPosts.push({
            id,
            slug: id,
            title,
            path: `/blog/${id}/`,
            priority: 0.8,
            changefreq: 'monthly'
          });
        }
      });
    }
    
    console.log(`✅ Discovered ${blogPosts.length} blog posts for sitemap`);
    return blogPosts;
  } catch (error) {
    console.log('ℹ️ Using fallback blog posts');
    return [
      { id: 'local-seo-2025', path: '/blog/local-seo-2025/', priority: 0.8, changefreq: 'monthly' },
      { id: 'ai-midlife-crisis', path: '/blog/ai-midlife-crisis/', priority: 0.8, changefreq: 'monthly' },
      { id: 'eat-guide', path: '/blog/eat-guide/', priority: 0.8, changefreq: 'monthly' }
    ];
  }
}

// =============================================================================
// FINAL FIX BUILD PROCESS
// =============================================================================

async function buildFinalFix() {
  console.log('🚀 Building Final Fix Implementation (React SPA + Dynamic Sitemap)\\n');
  
  try {
    // Step 1: Build React application only
    console.log('📦 Building React client application...');
    const { execSync } = await import('child_process');
    execSync('npm run build:client', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React client build completed\\n');
    
    // Step 2: Copy React build to root dist (overwrite any existing)
    console.log('📋 Setting up React SPA...');
    const clientDistPath = path.join(__dirname, 'dist', 'client');
    const rootDistPath = path.join(__dirname, 'dist');
    
    // Copy all client files to root dist
    await fs.cp(clientDistPath, rootDistPath, { recursive: true, force: true });
    console.log('✅ React SPA ready\\n');
    
    // Step 3: Create correct .htaccess for React SPA
    console.log('🔧 Creating React SPA .htaccess...');
    await createReactSPAHtaccess();
    console.log('✅ React SPA .htaccess created\\n');
    
    // Step 4: Discover blog posts for sitemap
    console.log('🔍 Discovering blog posts...');
    const blogPosts = await discoverBlogPosts();
    
    // Step 5: Generate dynamic sitemap (no static HTML files)
    console.log('🗺️ Generating dynamic sitemap...');
    const allRoutes = [...routes, ...blogPosts];
    await generateDynamicSitemap(allRoutes);
    console.log('✅ Dynamic sitemap generated\\n');
    
    // Step 6: Generate robots.txt
    console.log('🤖 Generating robots.txt...');
    await generateRobotsTxt();
    console.log('✅ Robots.txt generated\\n');
    
    // Success summary
    console.log('🎉 FINAL FIX BUILD COMPLETED!\\n');
    console.log('📊 BUILD SUMMARY:');
    console.log(`   📄 React SPA: Ready for all users`);
    console.log(`   🗺️ Dynamic sitemap: ${allRoutes.length} URLs`);
    console.log(`   📝 Blog posts: ${blogPosts.length} discovered`);
    console.log(`   🎯 Approach: Single React app with JavaScript crawler detection`);
    
    console.log('\\n✅ FINAL FIX READY:');
    console.log('   • React app serves all users');
    console.log('   • JavaScript handles crawler detection');
    console.log('   • Dynamic sitemap for SEO');
    console.log('   • No static HTML route conflicts');
    console.log('   • Page refresh works perfectly');
    
    console.log('\\n🚀 Test with: npm run test:final-fix');
    console.log('🌐 Deploy to: Production hosting');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// =============================================================================
// REACT SPA HTACCESS GENERATION
// =============================================================================

async function createReactSPAHtaccess() {
  const htaccessContent = `# Marden SEO - Final Fix .htaccess (React SPA Only)
# Purpose: Serve React app to everyone, no static HTML conflicts

<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Force HTTPS only (essential security)  
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  
  # Serve static assets directly (js, css, images, sitemap, robots)
  RewriteCond %{REQUEST_URI} ^/assets/ [OR]
  RewriteCond %{REQUEST_URI} \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp4|webm|pdf|zip)$ [OR]
  RewriteCond %{REQUEST_URI} ^/(sitemap\\.xml|robots\\.txt|favicon\\.ico|site\\.webmanifest)$
  RewriteRule ^(.*)$ $1 [L]
  
  # All other requests go to React app (SPA routing)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Handle root directory
  DirectoryIndex index.html
  
  # Prevent directory listing
  Options -Indexes
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN" 
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE application/xml
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # Web fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  
  # HTML (no cache for SPA)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>`;

  const htaccessPath = path.join(__dirname, 'dist', '.htaccess');
  await fs.writeFile(htaccessPath, htaccessContent, 'utf8');
}

// =============================================================================
// DYNAMIC SITEMAP GENERATION (NO STATIC HTML REQUIRED)
// =============================================================================

async function generateDynamicSitemap(allRoutes) {
  const uniqueRoutes = allRoutes.filter((route, index, self) => 
    index === self.findIndex(r => r.path === route.path)
  );
  
  const sitemapEntries = uniqueRoutes
    .map(route => {
      const url = `https://mardenseo.com${route.path}`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
    })
    .join('\\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  await fs.writeFile(sitemapPath, sitemap, 'utf8');
  
  console.log(`   📍 Sitemap: ${sitemapPath}`);
  console.log(`   📊 URLs: ${uniqueRoutes.length}`);
}

// =============================================================================
// ROBOTS.TXT GENERATION
// =============================================================================

async function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://mardenseo.com/sitemap.xml

# SEO-optimized crawling directives
Crawl-delay: 1`;

  const robotsPath = path.join(__dirname, 'dist', 'robots.txt');
  await fs.writeFile(robotsPath, robots, 'utf8');
  
  console.log(`   📍 Robots.txt: ${robotsPath}`);
}

// =============================================================================
// EXPORT
// =============================================================================

export default buildFinalFix;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildFinalFix();
}
