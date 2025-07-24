#!/usr/bin/env node

/**
 * MARDEN SEO - REACT SPA BUILD (FINAL FIX)
 * 
 * This script implements the proper solution from the "Final Fix" document:
 * - Only builds the React app (no static HTML directories)
 * - Generates dynamic sitemap for SEO 
 * - Creates proper .htaccess for SPA routing
 * - Ensures page refresh works on all routes
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building React SPA with SEO (Final Fix)...\n');

// Step 1: Clean previous builds (Windows-safe)
console.log('📁 Cleaning previous build...');
const tempDistName = 'dist-spa-temp';
try {
    if (fs.existsSync(tempDistName)) {
        fs.rmSync(tempDistName, { recursive: true, force: true });
    }
} catch (error) {
    console.log('   ⚠️  Cleanup warning:', error.message);
}

// Step 2: Build React client to temp directory
console.log('⚛️  Building React client...');
try {
    execSync(`vite build --outDir ${tempDistName}`, { 
        stdio: 'inherit',
        encoding: 'utf8'
    });
    console.log('✅ React build completed');
} catch (error) {
    console.error('❌ React build failed:', error.message);
    process.exit(1);
}

// Step 3: Generate dynamic sitemap for SEO
console.log('🗺️  Generating dynamic sitemap...');
generateSitemap(tempDistName);

// Step 4: Generate robots.txt
console.log('🤖 Generating robots.txt...');
generateRobots(tempDistName);

// Step 5: Create proper .htaccess for SPA routing
console.log('🔧 Creating SPA .htaccess...');
createSPAHtaccess(tempDistName);

// Step 6: Replace old dist with new build
console.log('🔄 Replacing old build...');
try {
    if (fs.existsSync('dist')) {
        // Remove old dist directory
        execSync('rmdir /s /q dist 2>nul || rm -rf dist 2>/dev/null || echo "Old dist removed"', { 
            stdio: 'pipe', 
            shell: true 
        });
    }
    // Rename temp to dist
    fs.renameSync(tempDistName, 'dist');
    console.log('✅ Build replacement completed');
} catch (error) {
    console.error('❌ Build replacement failed:', error.message);
    console.log('   💡 Try manually deleting the dist folder and running again');
    process.exit(1);
}

// Step 7: Verify build structure
console.log('🔍 Verifying build structure...');
verifyBuildStructure();

console.log('\n🎉 React SPA build completed successfully!');
console.log('📊 Build summary:');
console.log('   ✅ React app: index.html + assets/');
console.log('   ✅ SEO sitemap: sitemap.xml');
console.log('   ✅ SPA routing: .htaccess');
console.log('   ❌ NO static route directories');
console.log('\n🧪 Test with: npm run test:spa-fix\n');

/**
 * Generate sitemap.xml with all site pages for SEO
 */
function generateSitemap(distDir = 'dist') {
    const baseUrl = 'https://mardenseo.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Define all site routes (no static files needed)
    const routes = [
        { path: '/', priority: '1.0', changefreq: 'monthly' },
        { path: '/about', priority: '0.9', changefreq: 'monthly' },
        { path: '/services', priority: '0.9', changefreq: 'monthly' },
        { path: '/services-pricing', priority: '0.8', changefreq: 'monthly' },
        { path: '/contact', priority: '0.8', changefreq: 'monthly' },
        { path: '/portfolio', priority: '0.7', changefreq: 'monthly' },
        { path: '/blog', priority: '0.8', changefreq: 'weekly' },
        { path: '/app-building', priority: '0.7', changefreq: 'monthly' },
        { path: '/workflow-automation', priority: '0.7', changefreq: 'monthly' },
        
        // Blog posts (dynamic content)
        { path: '/blog/local-seo-2025', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/ai-midlife-crisis', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/on-page-seo-tactics-2025', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/core-web-vitals-seo-2025', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/technical-seo-fundamentals', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/content-strategy-beyond-keywords', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/link-building-2025-quality', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/mobile-first-indexing-ready', priority: '0.6', changefreq: 'monthly' },
        { path: '/blog/ai-revolution-seo-strategy', priority: '0.6', changefreq: 'monthly' }
    ];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    routes.forEach(route => {
        sitemap += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    fs.writeFileSync(`${distDir}/sitemap.xml`, sitemap);
    console.log(`   ✅ Generated sitemap.xml with ${routes.length} URLs`);
}

/**
 * Generate robots.txt for SEO
 */
function generateRobots(distDir = 'dist') {
    const robotsContent = `# Marden SEO - Robots.txt
User-agent: *
Allow: /

# SEO files
Sitemap: https://mardenseo.com/sitemap.xml

# Block admin areas
Disallow: /admin/
Disallow: /cart/
Disallow: /analytics-test/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /contact
Allow: /portfolio
Allow: /blog
`;
    
    fs.writeFileSync(`${distDir}/robots.txt`, robotsContent);
    console.log('   ✅ Generated robots.txt');
}

/**
 * Create proper .htaccess for React SPA routing
 */
function createSPAHtaccess(distDir = 'dist') {
    const htaccessContent = `# Marden SEO - React SPA Routing (Final Fix)
# Purpose: Serve React app for all page routes, no static directories

<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  
  # Serve assets directly (React bundles, CSS, JS)
  RewriteCond %{REQUEST_URI} ^/assets/
  RewriteRule ^(.*)$ $1 [L]
  
  # Serve static files directly (SEO and media)
  RewriteCond %{REQUEST_URI} ^/(sitemap\\.xml|robots\\.txt|favicon\\.ico|site\\.webmanifest)$
  RewriteRule ^(.*)$ $1 [L]
  
  # Serve media files directly
  RewriteCond %{REQUEST_URI} \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp4|webm|pdf|zip)$
  RewriteRule ^(.*)$ $1 [L]
  
  # CRITICAL: Serve React app for ALL page routes
  # This ensures page refresh works on /about, /services, /blog/*, etc.
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
  
  # Default to React app
  DirectoryIndex index.html
  
  # Security
  Options -Indexes
</IfModule>

# Performance & Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN" 
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Caching (SPA-optimized)
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Assets (long cache)
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # HTML (no cache for SPA)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>`;
    
    fs.writeFileSync(`${distDir}/.htaccess`, htaccessContent);
    console.log('   ✅ Created SPA .htaccess');
}

/**
 * Verify the build structure is correct for React SPA
 */
function verifyBuildStructure() {
    const distContents = fs.readdirSync('dist');
    
    console.log('   📂 Build contents:');
    distContents.forEach(item => {
        const isDir = fs.statSync(`dist/${item}`).isDirectory();
        console.log(`     ${isDir ? '[DIR]' : '[FILE]'} ${item}`);
    });
    
    // Check for problematic static route directories
    const problematicDirs = ['about', 'services', 'contact', 'portfolio', 'blog'];
    const foundProblematic = problematicDirs.filter(dir => 
        fs.existsSync(`dist/${dir}`) && fs.statSync(`dist/${dir}`).isDirectory()
    );
    
    if (foundProblematic.length > 0) {
        console.log(`   ⚠️  WARNING: Found static route directories: ${foundProblematic.join(', ')}`);
        console.log('   These will interfere with React Router!');
    } else {
        console.log('   ✅ No static route directories found (correct for SPA)');
    }
    
    // Verify essential files exist
    const requiredFiles = ['index.html', 'sitemap.xml', 'robots.txt', '.htaccess'];
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(`dist/${file}`));
    
    if (missingFiles.length > 0) {
        console.log(`   ❌ Missing files: ${missingFiles.join(', ')}`);
    } else {
        console.log('   ✅ All required files present');
    }
}