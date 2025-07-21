#!/usr/bin/env node

/**
 * 🏗️ CREATE MISSING PAGES FOR MARDEN SEO WEBSITE
 * 
 * Creates the missing pages identified in the SEO fix:
 * - /services-pricing (business page)
 * - /blog/local-seo-2025 (blog post)
 * - /blog/ai-midlife-crisis (blog post)
 * - /blog/on-page-seo-tactics-2025 (blog post)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

console.log('🏗️ CREATING MISSING PAGES FOR MARDEN SEO WEBSITE');
console.log('================================================');

/**
 * Create services-pricing page
 */
function createServicesPricingPage() {
  const dir = path.join(DIST_DIR, 'services-pricing');
  const filePath = path.join(dir, 'index.html');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>SEO Services Pricing & Packages | Transparent SEO Pricing - Marden SEO</title>
  <meta name="description" content="Transparent SEO pricing with custom packages for every business size. View our SEO service packages, get instant quotes, and start improving rankings today.">
  <meta name="keywords" content="SEO pricing, SEO packages, SEO services cost, search engine optimization pricing, SEO plans">
  <link rel="canonical" href="https://mardenseo.com/services-pricing">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="SEO Services Pricing & Packages | Transparent SEO Pricing - Marden SEO">
  <meta property="og:description" content="Transparent SEO pricing with custom packages for every business size. View our SEO service packages, get instant quotes, and start improving rankings today.">
  <meta property="og:url" content="https://mardenseo.com/services-pricing">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="SEO Services Pricing & Packages | Transparent SEO Pricing - Marden SEO">
  <meta name="twitter:description" content="Transparent SEO pricing with custom packages for every business size. View our SEO service packages, get instant quotes, and start improving rankings today.">
  <meta name="twitter:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "description": "Professional SEO and app development services with transparent pricing",
    "url": "https://mardenseo.com",
    "areaServed": "Worldwide",
    "serviceType": ["SEO Services", "App Development", "Workflow Automation"]
  }
  </script>
  
  <!-- Favicon and Assets -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- React Assets -->
  <link rel="stylesheet" href="/assets/index-Kab0klor.css">
</head>
<body>
  <!-- Pre-rendered content for crawlers -->
  <div id="crawler-content">
    <header>
      <h1>SEO Services Pricing & Packages</h1>
      <h2>Transparent pricing for measurable SEO results</h2>
    </header>
    
    <main>
      <section>
        <h3>Our SEO Packages</h3>
        <p>We offer flexible SEO packages designed to meet different business needs and budgets. All packages include comprehensive SEO services with transparent reporting and measurable results.</p>
        
        <h4>Starter SEO Package</h4>
        <p>Perfect for small businesses and startups looking to establish their online presence with professional SEO optimization.</p>
        
        <h4>Professional SEO Package</h4>
        <p>Comprehensive SEO services for growing businesses that need competitive rankings and increased organic traffic.</p>
        
        <h4>Enterprise SEO Package</h4>
        <p>Complete SEO solutions for large businesses and competitive industries requiring advanced optimization strategies.</p>
      </section>
      
      <section>
        <h3>What's Included</h3>
        <ul>
          <li>Complete SEO audit and competitive analysis</li>
          <li>Technical SEO optimization and Core Web Vitals improvement</li>
          <li>Content strategy and keyword optimization</li>
          <li>Link building and authority development</li>
          <li>Monthly reporting and performance tracking</li>
          <li>Ongoing optimization and strategy refinement</li>
        </ul>
      </section>
      
      <section>
        <h3>Get Custom Pricing</h3>
        <p>Every business is unique, and so are their SEO needs. Contact us for a custom quote based on your specific requirements, competition level, and business goals.</p>
        <p><a href="/contact">Get Your Custom SEO Quote</a> - Free consultation included</p>
      </section>
    </main>
  </div>
  
  <!-- React App Mount Point -->
  <div id="root"></div>
  <script src="/assets/index-fey3q7Lz.js"></script>
</body>
</html>`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Created /services-pricing page`);
}

/**
 * Create blog post page
 */
function createBlogPost(slug, title, description, content) {
  const dir = path.join(DIST_DIR, 'blog', slug);
  const filePath = path.join(dir, 'index.html');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>${title} | Marden SEO Blog</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="SEO, search engine optimization, digital marketing, SEO tips, SEO strategy">
  <link rel="canonical" href="https://mardenseo.com/blog/${slug}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${title} | Marden SEO Blog">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://mardenseo.com/blog/${slug}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} | Marden SEO Blog">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://mardenseo.com/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "author": {
      "@type": "Person",
      "name": "Leo Corbett"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marden SEO"
    },
    "datePublished": "2025-07-21",
    "url": "https://mardenseo.com/blog/${slug}"
  }
  </script>
  
  <!-- Favicon and Assets -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- React Assets -->
  <link rel="stylesheet" href="/assets/index-Kab0klor.css">
</head>
<body>
  <!-- Pre-rendered content for crawlers -->
  <div id="crawler-content">
    <article>
      <header>
        <h1>${title}</h1>
        <p>By Leo Corbett | Published July 21, 2025</p>
      </header>
      
      <main>
        ${content}
      </main>
      
      <footer>
        <p><a href="/blog">← Back to SEO Blog</a></p>
        <p>Need professional SEO services? <a href="/contact">Contact Marden SEO</a> for expert optimization.</p>
      </footer>
    </article>
  </div>
  
  <!-- React App Mount Point -->
  <div id="root"></div>
  <script src="/assets/index-fey3q7Lz.js"></script>
</body>
</html>`;

  fs.writeFileSync(filePath, htmlContent);
  console.log(`✅ Created /blog/${slug} page`);
}

/**
 * Main execution
 */
function main() {
  console.log(`📁 Working directory: ${DIST_DIR}\n`);
  
  // Create services-pricing page
  createServicesPricingPage();
  
  // Create blog posts
  createBlogPost(
    'local-seo-2025',
    'Local SEO Mastery: How to Dominate Your Geographic Market in 2025',
    'Complete guide to local SEO optimization for 2025. Learn proven strategies to rank higher in local search results and attract more customers in your area.',
    `
      <section>
        <h2>Why Local SEO Matters More Than Ever</h2>
        <p>Local SEO has become increasingly important as more consumers search for businesses "near me" and use mobile devices to find local services. In 2025, local search optimization is crucial for any business serving specific geographic areas.</p>
      </section>
      
      <section>
        <h2>Google Business Profile Optimization</h2>
        <p>Your Google Business Profile is the foundation of local SEO success. Ensure your profile is complete, accurate, and regularly updated with photos, posts, and customer interactions.</p>
      </section>
      
      <section>
        <h2>Local Citation Building</h2>
        <p>Consistent NAP (Name, Address, Phone) citations across local directories, industry-specific platforms, and review sites help establish local authority and improve search rankings.</p>
      </section>
      
      <section>
        <h2>Review Management Strategy</h2>
        <p>Actively managing customer reviews across Google, Yelp, and industry-specific platforms is essential for local SEO success and building trust with potential customers.</p>
      </section>
    `
  );
  
  createBlogPost(
    'ai-midlife-crisis',
    'The AI Revolution in SEO: How to Adapt Your Strategy for 2025',
    'Discover how AI is transforming SEO and learn strategies to adapt your approach for success in the age of artificial intelligence and machine learning.',
    `
      <section>
        <h2>How AI is Changing Search</h2>
        <p>Artificial intelligence has fundamentally transformed how search engines understand and rank content. Google's AI algorithms now better understand user intent, context, and content quality.</p>
      </section>
      
      <section>
        <h2>Content Strategy in the AI Era</h2>
        <p>Creating high-quality, comprehensive content that demonstrates expertise and provides real value is more important than ever. AI can detect thin, duplicate, or low-quality content more effectively.</p>
      </section>
      
      <section>
        <h2>Technical SEO for AI</h2>
        <p>Structured data, Core Web Vitals, and technical optimization help AI systems better understand and rank your content. Focus on clean, semantic HTML and fast loading speeds.</p>
      </section>
      
      <section>
        <h2>Future-Proofing Your SEO</h2>
        <p>Building sustainable SEO strategies that focus on user experience, expertise, and value creation will ensure long-term success regardless of algorithm changes.</p>
      </section>
    `
  );
  
  createBlogPost(
    'on-page-seo-tactics-2025',
    '10 On-Page SEO Tactics That Still Work in 2025',
    'Master the fundamental on-page SEO techniques that drive results in 2025. Learn actionable tactics to optimize your content and improve search rankings.',
    `
      <section>
        <h2>1. Title Tag Optimization</h2>
        <p>Craft compelling, keyword-rich title tags that accurately describe your content while encouraging clicks. Keep titles under 60 characters for optimal display.</p>
      </section>
      
      <section>
        <h2>2. Meta Description Excellence</h2>
        <p>Write persuasive meta descriptions that summarize your content and include a clear call-to-action. Aim for 150-160 characters for best results.</p>
      </section>
      
      <section>
        <h2>3. Header Structure (H1-H6)</h2>
        <p>Use proper header hierarchy to organize content logically. Include target keywords naturally in headers while maintaining readability.</p>
      </section>
      
      <section>
        <h2>4. Internal Linking Strategy</h2>
        <p>Create a strong internal linking structure that helps users navigate your site and distributes page authority effectively throughout your domain.</p>
      </section>
      
      <section>
        <h2>5. Content Optimization</h2>
        <p>Create comprehensive, valuable content that thoroughly covers topics. Focus on user intent and provide actionable insights that solve problems.</p>
      </section>
    `
  );
  
  console.log('\n🎉 MISSING PAGES CREATION COMPLETE!');
  console.log('===================================');
  console.log('✅ Created services-pricing page with SEO optimization');
  console.log('✅ Created 3 blog post pages with proper meta tags');
  console.log('✅ All pages include structured data and social meta tags');
  console.log('✅ All canonical URLs follow proper format');
  console.log('\n📋 Next Steps:');
  console.log('1. Run the SEO fix script to verify all pages');
  console.log('2. Test locally: npm run test:fix');
  console.log('3. Deploy the complete /dist folder to production');
  console.log('\n🚀 Your sitemap now has 12 working pages!');
}

main();
