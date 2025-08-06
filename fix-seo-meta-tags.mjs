import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const distPath = 'C:\\Users\\Leo\\stellar-seo-website-design\\dist';

// Meta tag configurations for each page
const pageMeta = {
  'index.html': {
    title: 'Marden SEO - Professional SEO Services & Digital Marketing',
    description: 'Boost your online presence with Marden SEO. Expert SEO services, digital marketing solutions, and proven strategies to drive organic traffic and grow your business.',
    canonical: 'https://mardenseo.com/'
  },
  'about/index.html': {
    title: 'About Marden SEO - Your Trusted SEO Partner',
    description: 'Learn about Marden SEO\'s mission, team, and approach to delivering exceptional SEO results. Discover why businesses trust us with their digital growth.',
    canonical: 'https://mardenseo.com/about/'
  },
  'services/index.html': {
    title: 'SEO Services - Technical, Local & Content Optimization',
    description: 'Comprehensive SEO services including technical SEO audits, local SEO optimization, content strategy, and link building. Get a custom SEO strategy for your business.',
    canonical: 'https://mardenseo.com/services/'
  },
  'services-pricing/index.html': {
    title: 'SEO Pricing & Packages - Transparent SEO Service Costs',
    description: 'Transparent SEO pricing and packages tailored to your business needs. From startup to enterprise solutions, find the perfect SEO package for your budget.',
    canonical: 'https://mardenseo.com/services-pricing/'
  },
  'portfolio/index.html': {
    title: 'SEO Case Studies & Portfolio - Proven Results',
    description: 'Explore our SEO success stories and case studies. See real results we\'ve achieved for clients across various industries with data-driven SEO strategies.',
    canonical: 'https://mardenseo.com/portfolio/'
  },
  'contact/index.html': {
    title: 'Contact Marden SEO - Get Your Free SEO Consultation',
    description: 'Ready to improve your search rankings? Contact Marden SEO for a free consultation. Let\'s discuss how we can help grow your online presence.',
    canonical: 'https://mardenseo.com/contact/'
  },
  'blog/index.html': {
    title: 'SEO Blog - Latest SEO Tips, Trends & Best Practices',
    description: 'Stay updated with the latest SEO trends, tips, and best practices. Our SEO blog covers technical SEO, content marketing, and digital marketing strategies.',
    canonical: 'https://mardenseo.com/blog/'
  },
  'app-building/index.html': {
    title: 'App Development Services - Web & Mobile Applications',
    description: 'Custom app development services for web and mobile. We build scalable, user-friendly applications that drive business growth and enhance user experience.',
    canonical: 'https://mardenseo.com/app-building/'
  },
  'workflow-automation/index.html': {
    title: 'Workflow Automation Services - n8n Integration Experts',
    description: 'Streamline your business with workflow automation. Expert n8n integration services to automate repetitive tasks and improve operational efficiency.',
    canonical: 'https://mardenseo.com/workflow-automation/'
  }
};

console.log('🔧 Fixing SEO meta tags in existing dist folder...\n');

for (const [filePath, meta] of Object.entries(pageMeta)) {
  try {
    const fullPath = join(distPath, filePath);
    let html = await readFile(fullPath, 'utf-8');
    
    // Update title
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
    
    // Update meta description
    html = html.replace(
      /<meta name="description" content=".*?".*?\/>/,
      `<meta name="description" content="${meta.description}" />`
    );
    
    // Update canonical URL
    html = html.replace(
      /<meta property="og:url" content=".*?".*?\/>/,
      `<meta property="og:url" content="${meta.canonical}" />`
    );
    
    // Update Open Graph title
    html = html.replace(
      /<meta property="og:title" content=".*?".*?\/>/,
      `<meta property="og:title" content="${meta.title}" />`
    );
    
    // Update Open Graph description
    html = html.replace(
      /<meta property="og:description" content=".*?".*?\/>/,
      `<meta property="og:description" content="${meta.description}" />`
    );
    
    // Update Twitter URL
    html = html.replace(
      /<meta property="twitter:url" content=".*?".*?\/>/,
      `<meta property="twitter:url" content="${meta.canonical}" />`
    );
    
    // Update Twitter title
    html = html.replace(
      /<meta property="twitter:title" content=".*?".*?\/>/,
      `<meta property="twitter:title" content="${meta.title}" />`
    );
    
    // Update Twitter description
    html = html.replace(
      /<meta property="twitter:description" content=".*?".*?\/>/,
      `<meta property="twitter:description" content="${meta.description}" />`
    );
    
    await writeFile(fullPath, html, 'utf-8');
    console.log(`✅ Fixed SEO tags for: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

console.log('\n✨ SEO meta tags fixed! Now updating sitemap...\n');

// Update sitemap with all pages
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mardenseo.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/about/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/services/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/services-pricing/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/portfolio/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/contact/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/blog/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/app-building/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mardenseo.com/workflow-automation/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

await writeFile(join(distPath, 'sitemap.xml'), sitemapContent, 'utf-8');
console.log('✅ Updated sitemap.xml with proper URLs\n');

console.log('🎉 All SEO fixes complete!');
console.log('\n📊 What was fixed:');
console.log('  ✅ Unique title tags for each page');
console.log('  ✅ Unique meta descriptions for each page');
console.log('  ✅ Proper canonical URLs');
console.log('  ✅ Updated Open Graph tags');
console.log('  ✅ Updated Twitter Card tags');
console.log('  ✅ Complete sitemap with all pages');
