// build-seo-optimized.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

// Define routes with SEO metadata
const routes = [
  { 
    path: '/', 
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    priority: '1.0' 
  },
  { 
    path: '/about', 
    title: 'About Our Expert SEO Team | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    priority: '0.9' 
  },
  { 
    path: '/services', 
    title: 'SEO Services & Digital Marketing Solutions | Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, link building, and local SEO. Get a custom strategy that delivers measurable results.',
    priority: '0.9' 
  },
  { 
    path: '/services-pricing', 
    title: 'SEO Packages & Pricing | Transparent SEO Costs - Marden SEO',
    description: 'Clear, transparent SEO pricing packages for businesses of all sizes. From starter to enterprise SEO solutions. No hidden fees, proven ROI.',
    priority: '0.8' 
  },
  { 
    path: '/contact', 
    title: 'Contact SEO Experts | Get Your Free SEO Audit - Marden SEO',
    description: 'Contact our SEO experts for a free website audit and consultation. Fast response times, proven results, and customized strategies for your business growth.',
    priority: '0.8' 
  },
  { 
    path: '/portfolio', 
    title: 'SEO Portfolio & Case Studies | Proven Results - Marden SEO',
    description: 'View our SEO success stories and case studies. Real results including 300% traffic increases, #1 rankings, and significant ROI improvements for our clients.',
    priority: '0.8' 
  },
  { 
    path: '/app-building', 
    title: 'Custom App Development Services | React & Mobile Apps - Marden SEO',
    description: 'Professional app development services specializing in React, mobile apps, and custom web applications. Modern, scalable solutions that drive business growth.',
    priority: '0.8' 
  },
  { 
    path: '/workflow-automation', 
    title: 'Workflow Automation with n8n | Business Process Automation - Marden SEO',
    description: 'Streamline your business with n8n workflow automation. Custom integrations, automated processes, and efficiency improvements that save time and reduce costs.',
    priority: '0.8' 
  },
  { 
    path: '/blog', 
    title: 'SEO Blog & Digital Marketing Insights | Marden SEO',
    description: 'Expert SEO tips, digital marketing strategies, and industry insights. Stay updated with algorithm changes, best practices, and proven optimization techniques.',
    priority: '0.7' 
  },
];

// Blog posts to generate
const blogPosts = [
  { slug: 'local-seo-2025', title: 'Local SEO Checklist 2025: Absolutely Dominate Your Map Pack', priority: '0.7' },
  { slug: 'ai-midlife-crisis', title: 'Google is Having an AI Midlife Crisis', priority: '0.7' },
  { slug: 'on-page-seo-tactics-2025', title: '10 On-Page SEO Tactics That Still Work in 2025', priority: '0.7' },
  { slug: 'core-web-vitals-seo-2025', title: 'Why Core Web Vitals Are Still Running Your SEO Life in 2025', priority: '0.7' },
  { slug: 'technical-seo-fundamentals', title: 'Technical SEO Fundamentals: The Foundation of Rankings', priority: '0.6' },
  { slug: 'content-strategy-beyond-keywords', title: 'Content Strategy for SEO: Beyond Keywords', priority: '0.6' },
  { slug: 'link-building-2025-quality', title: 'Link Building in 2025: Quality Over Quantity', priority: '0.6' },
  { slug: 'mobile-first-indexing-ready', title: 'Mobile-First Indexing: Is Your Site Truly Ready?', priority: '0.6' },
  { slug: 'ai-revolution-seo-strategy', title: 'The AI Revolution in SEO: How to Adapt Your Strategy', priority: '0.6' },
];

// Routes that should not be indexed
const noIndexRoutes = ['/admin', '/cart', '/analytics-test', '/debug'];

// Function to generate proper canonical URL (no trailing slashes except home)
const generateCanonicalUrl = (path) => {
  const base = 'https://mardenseo.com';
  if (path === '/') return base + '/';
  return base + path;
};

// Generate clean sitemap with proper URLs
const generateSitemap = () => {
  console.log('📄 Generating SEO-optimized sitemap...');
  
  // Combine main routes and blog posts
  const allUrls = [
    ...routes.map(route => ({
      loc: generateCanonicalUrl(route.path),
      priority: route.priority,
      changefreq: route.priority === '1.0' ? 'daily' : 'weekly'
    })),
    ...blogPosts.map(post => ({
      loc: `https://mardenseo.com/blog/${post.slug}`,
      priority: post.priority,
      changefreq: 'monthly'
    }))
  ];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated with canonical URLs');
  console.log(`   Total URLs in sitemap: ${allUrls.length}`);
};

// Fix canonical tags and meta descriptions in generated HTML files
const fixMetaTags = () => {
  console.log('🔧 Fixing meta tags in all HTML files...');
  
  // Fix main routes
  routes.forEach(route => {
    const filePath = route.path === '/' 
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path, 'index.html');
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      const canonicalUrl = generateCanonicalUrl(route.path);
      
      // Update or add canonical tag
      if (content.includes('<link rel="canonical"')) {
        content = content.replace(
          /<link rel="canonical" href="[^"]*">/,
          `<link rel="canonical" href="${canonicalUrl}">`
        );
      } else {
        content = content.replace(
          '</head>',
          `  <link rel="canonical" href="${canonicalUrl}">\n</head>`
        );
      }
      
      // Update title tag
      if (route.title) {
        content = content.replace(
          /<title>[^<]*<\/title>/,
          `<title>${route.title}</title>`
        );
      }
      
      // Update meta description
      if (route.description) {
        if (content.includes('<meta name="description"')) {
          content = content.replace(
            /<meta name="description" content="[^"]*">/,
            `<meta name="description" content="${route.description}">`
          );
        } else {
          content = content.replace(
            '<meta charset="UTF-8">',
            `<meta charset="UTF-8">\n  <meta name="description" content="${route.description}">`
          );
        }
      }
      
      // Fix og:url tag
      content = content.replace(
        /<meta property="og:url" content="[^"]*">/,
        `<meta property="og:url" content="${canonicalUrl}">`
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed meta tags for ${route.path}`);
    }
  });
  
  // Fix blog post canonicals
  blogPosts.forEach(post => {
    const filePath = path.join(distDir, 'blog', post.slug, 'index.html');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      const canonicalUrl = `https://mardenseo.com/blog/${post.slug}`;
      
      // Update canonical
      if (content.includes('<link rel="canonical"')) {
        content = content.replace(
          /<link rel="canonical" href="[^"]*">/,
          `<link rel="canonical" href="${canonicalUrl}">`
        );
      }
      
      // Fix og:url
      content = content.replace(
        /<meta property="og:url" content="[^"]*">/,
        `<meta property="og:url" content="${canonicalUrl}">`
      );
      
      fs.writeFileSync(filePath, content);
    }
  });
  
  // Add robots meta tag to noindex pages
  noIndexRoutes.forEach(route => {
    const filePath = path.join(distDir, route, 'index.html');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      if (!content.includes('name="robots"')) {
        content = content.replace(
          '<meta charset="UTF-8">',
          '<meta charset="UTF-8">\n  <meta name="robots" content="noindex, nofollow">'
        );
        fs.writeFileSync(filePath, content);
        console.log(`✅ Added noindex to ${route}`);
      }
    }
  });
};

// Create optimized robots.txt
const createRobotsTxt = () => {
  console.log('🤖 Creating optimized robots.txt...');
  
  const robotsContent = `# Robots.txt for Marden SEO
# Updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://mardenseo.com/sitemap.xml

# Block admin and system areas
Disallow: /admin
Disallow: /cart
Disallow: /analytics-test
Disallow: /debug

# Block assets if needed
Disallow: /assets/*.map

# Crawl-delay for responsible crawling
Crawl-delay: 1

# Google specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
  console.log('✅ Robots.txt created');
};

// Main build process
const build = async () => {
  console.log('🚀 Starting SEO-optimized build process...\n');
  
  try {
    // Step 1: Clean dist directory
    console.log('🧹 Cleaning dist directory...');
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
    
    // Step 2: Build the React app
    console.log('\n📦 Building React application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Step 3: Run the comprehensive SSG build
    console.log('\n🏗️ Running comprehensive SSG build...');
    if (fs.existsSync('build-comprehensive-static-ssg.mjs')) {
      execSync('node build-comprehensive-static-ssg.mjs', { stdio: 'inherit' });
    }
    
    // Step 4: Fix all meta tags
    console.log('\n🔧 Optimizing SEO elements...');
    fixMetaTags();
    
    // Step 5: Generate clean sitemap
    generateSitemap();
    
    // Step 6: Create robots.txt
    createRobotsTxt();
    
    // Step 7: Copy .htaccess if exists
    const htaccessSource = path.join(__dirname, 'public', '.htaccess');
    const htaccessDest = path.join(distDir, '.htaccess');
    if (fs.existsSync(htaccessSource)) {
      fs.copyFileSync(htaccessSource, htaccessDest);
      console.log('✅ .htaccess copied');
    }
    
    console.log('\n✅ SEO-optimized build complete!');
    console.log('📊 Test with: npm run test:seo');
    console.log('🔍 Check SEO health with: npm run check:seo\n');
    
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
};

// Run the build
build().catch(console.error);
