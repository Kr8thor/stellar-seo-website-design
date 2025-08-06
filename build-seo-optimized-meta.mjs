import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = __dirname;

const distPath = join(projectRoot, 'dist-seo-fixed');

console.log('🚀 Building Marden SEO with Proper SEO Meta Tags...\n');

// Clean and create directories
console.log('📁 Cleaning previous build...');
if (existsSync(distPath)) {
  await fs.rm(distPath, { recursive: true, force: true });
}
mkdirSync(distPath, { recursive: true });

// Build React app
console.log('⚛️  Building React app...');
execSync('npm run build:client', { 
  stdio: 'inherit',
  env: { ...process.env, VITE_BUILD_OUTPUT_DIR: distPath }
});

// Copy built files to our dist directory
const copyDir = async (src, dest) => {
  mkdirSync(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copyDir(join(projectRoot, 'dist/client'), distPath);

// Meta tag configurations for each page
const pageMeta = {
  '/': {
    title: 'Marden SEO - Professional SEO Services & Digital Marketing',
    description: 'Boost your online presence with Marden SEO. Expert SEO services, digital marketing solutions, and proven strategies to drive organic traffic and grow your business.',
    keywords: 'SEO services, digital marketing, search engine optimization, local SEO, technical SEO, SEO agency',
    canonical: 'https://mardenseo.com/'
  },
  '/about': {
    title: 'About Marden SEO - Your Trusted SEO Partner',
    description: 'Learn about Marden SEO\'s mission, team, and approach to delivering exceptional SEO results. Discover why businesses trust us with their digital growth.',
    keywords: 'about Marden SEO, SEO experts, digital marketing team, SEO company',
    canonical: 'https://mardenseo.com/about/'
  },
  '/services': {
    title: 'SEO Services - Technical, Local & Content Optimization',
    description: 'Comprehensive SEO services including technical SEO audits, local SEO optimization, content strategy, and link building. Get a custom SEO strategy for your business.',
    keywords: 'SEO services, technical SEO, local SEO, content optimization, link building, SEO audit',
    canonical: 'https://mardenseo.com/services/'
  },
  '/services-pricing': {
    title: 'SEO Pricing & Packages - Transparent SEO Service Costs',
    description: 'Transparent SEO pricing and packages tailored to your business needs. From startup to enterprise solutions, find the perfect SEO package for your budget.',
    keywords: 'SEO pricing, SEO packages, SEO costs, affordable SEO, SEO service pricing',
    canonical: 'https://mardenseo.com/services-pricing/'
  },
  '/portfolio': {
    title: 'SEO Case Studies & Portfolio - Proven Results',
    description: 'Explore our SEO success stories and case studies. See real results we\'ve achieved for clients across various industries with data-driven SEO strategies.',
    keywords: 'SEO case studies, SEO portfolio, SEO results, client success stories, SEO examples',
    canonical: 'https://mardenseo.com/portfolio/'
  },
  '/contact': {
    title: 'Contact Marden SEO - Get Your Free SEO Consultation',
    description: 'Ready to improve your search rankings? Contact Marden SEO for a free consultation. Let\'s discuss how we can help grow your online presence.',
    keywords: 'contact SEO agency, free SEO consultation, SEO quote, hire SEO expert',
    canonical: 'https://mardenseo.com/contact/'
  },
  '/blog': {
    title: 'SEO Blog - Latest SEO Tips, Trends & Best Practices',
    description: 'Stay updated with the latest SEO trends, tips, and best practices. Our SEO blog covers technical SEO, content marketing, and digital marketing strategies.',
    keywords: 'SEO blog, SEO tips, SEO trends, digital marketing blog, SEO best practices',
    canonical: 'https://mardenseo.com/blog/'
  },
  '/app-building': {
    title: 'App Development Services - Web & Mobile Applications',
    description: 'Custom app development services for web and mobile. We build scalable, user-friendly applications that drive business growth and enhance user experience.',
    keywords: 'app development, web applications, mobile apps, custom software development',
    canonical: 'https://mardenseo.com/app-building/'
  },
  '/workflow-automation': {
    title: 'Workflow Automation Services - n8n Integration Experts',
    description: 'Streamline your business with workflow automation. Expert n8n integration services to automate repetitive tasks and improve operational efficiency.',
    keywords: 'workflow automation, n8n integration, business automation, process automation',
    canonical: 'https://mardenseo.com/workflow-automation/'
  }
};

// Function to update meta tags in HTML
function updateMetaTags(html, meta) {
  // Update title
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  
  // Update meta description
  html = html.replace(
    /<meta name="description" content=".*?".*?\/>/,
    `<meta name="description" content="${meta.description}" />`
  );
  
  // Add keywords meta tag if not present
  if (!html.includes('name="keywords"')) {
    html = html.replace(
      '<meta name="description"',
      `<meta name="keywords" content="${meta.keywords}" />\n    <meta name="description"`
    );
  }
  
  // Add canonical URL
  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      '</title>',
      `</title>\n    <link rel="canonical" href="${meta.canonical}" />`
    );
  }
  
  // Update Open Graph tags
  html = html.replace(
    /<meta property="og:title" content=".*?".*?\/>/,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?".*?\/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?".*?\/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  );
  
  // Update Twitter tags
  html = html.replace(
    /<meta property="twitter:title" content=".*?".*?\/>/,
    `<meta property="twitter:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="twitter:description" content=".*?".*?\/>/,
    `<meta property="twitter:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="twitter:url" content=".*?".*?\/>/,
    `<meta property="twitter:url" content="${meta.canonical}" />`
  );
  
  return html;
}

console.log('🔧 Updating SEO meta tags for all pages...');

// Update index.html
let indexHtml = await fs.readFile(join(distPath, 'index.html'), 'utf-8');
indexHtml = updateMetaTags(indexHtml, pageMeta['/']);
await fs.writeFile(join(distPath, 'index.html'), indexHtml);

// Create and update all other pages
for (const [path, meta] of Object.entries(pageMeta)) {
  if (path === '/') continue;
  
  const pagePath = join(distPath, path.slice(1));
  mkdirSync(pagePath, { recursive: true });
  
  // Copy index.html as base
  let pageHtml = await fs.readFile(join(distPath, 'index.html'), 'utf-8');
  
  // Update meta tags for this specific page
  pageHtml = updateMetaTags(pageHtml, meta);
  
  await fs.writeFile(join(pagePath, 'index.html'), pageHtml);
  console.log(`✅ Created ${path} with proper SEO tags`);
}

// Generate sitemap
console.log('🗺️  Generating sitemap...');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.entries(pageMeta).map(([path, meta]) => `  <url>
    <loc>${meta.canonical}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : path.includes('blog') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

await fs.writeFile(join(distPath, 'sitemap.xml'), sitemapContent);

// Generate robots.txt
console.log('🤖 Generating robots.txt...');
const robotsContent = `# Robots.txt for Marden SEO
# https://mardenseo.com

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: *.pdf$

# Sitemap location
Sitemap: https://mardenseo.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Popular search engine bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /`;

await fs.writeFile(join(distPath, 'robots.txt'), robotsContent);

// Update .htaccess for proper trailing slash handling
console.log('📝 Creating .htaccess for proper URL handling...');
const htaccessContent = `# Enable RewriteEngine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Remove trailing slash from URLs (except directories)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Serve .html files without extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L]

# Handle SPA routing - serve index.html for non-existent paths
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\.(?:css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|mp4|webm)$ [NC]
RewriteRule ^([^/]+)/?$ /$1/index.html [L]

# Set proper MIME types
AddType application/javascript .js
AddType text/css .css
AddType image/svg+xml .svg

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`;

await fs.writeFile(join(distPath, '.htaccess'), htaccessContent);

console.log('\n✨ Build complete! SEO-optimized site ready.');
console.log('📁 Output directory: dist-seo-fixed');
console.log('\n🎯 SEO Optimizations Applied:');
console.log('  ✅ Unique title tags for each page');
console.log('  ✅ Unique meta descriptions');
console.log('  ✅ Canonical URLs');
console.log('  ✅ Open Graph tags');
console.log('  ✅ Twitter Card tags');
console.log('  ✅ Keywords meta tags');
console.log('  ✅ Proper sitemap.xml');
console.log('  ✅ SEO-friendly robots.txt');
console.log('  ✅ .htaccess for clean URLs');
