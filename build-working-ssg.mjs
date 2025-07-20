#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting WORKING SSG Build Process...');

// Step 1: Build the React app first
console.log('📦 Building React app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ React build completed successfully');
} catch (error) {
  console.error('❌ React build failed:', error.message);
  process.exit(1);
}

console.log('📝 Starting Static HTML Generation...');

// Blog posts with proper slugs (from the current data)
const blogPosts = [
  {
    id: 'local-seo-2025',
    title: 'Local SEO Mastery: How to Dominate Your Geographic Market',
    description: 'Complete guide to local SEO optimization, Google Business Profile management, and geographic targeting strategies for 2025.',
    readTime: '15 min read'
  },
  {
    id: 'ai-midlife-crisis',
    title: 'Is AI Having a Midlife Crisis? The Current State of SEO Automation',
    description: 'Examining the current limitations and opportunities of AI in SEO, with practical insights for businesses navigating the transition.',
    readTime: '12 min read'
  },
  {
    id: 'on-page-seo-tactics-2025',
    title: '10 On-Page SEO Tactics That Still Work in 2025',
    description: 'Proven on-page optimization strategies that continue to drive results in modern search engines.',
    readTime: '8 min read'
  },
  {
    id: 'core-web-vitals-seo-2025',
    title: 'Why Core Web Vitals Are Still Running Your SEO Life in 2025',
    description: 'Everything you need to know about Core Web Vitals and their continued impact on search rankings.',
    readTime: '12 min read'
  },
  {
    id: 'technical-seo-fundamentals',
    title: 'Technical SEO Fundamentals: The Foundation of Rankings',
    description: 'Complete guide to technical SEO including site architecture, performance, and crawler optimization.',
    readTime: '11 min read'
  },
  {
    id: 'content-strategy-beyond-keywords',
    title: 'Content Strategy for SEO: Beyond Keywords',
    description: 'Modern content strategy approaches including topic clusters, user intent, and comprehensive content creation.',
    readTime: '8 min read'
  },
  {
    id: 'link-building-2025-quality',
    title: 'Link Building in 2025: Quality Over Quantity',
    description: 'Effective link building strategies focused on content-first approaches and relationship building.',
    readTime: '9 min read'
  },
  {
    id: 'mobile-first-indexing-ready',
    title: 'Mobile-First Indexing: Is Your Site Truly Ready?',
    description: 'Comprehensive checklist for mobile optimization and responsive design best practices.',
    readTime: '6 min read'
  },
  {
    id: 'ai-revolution-seo-strategy',
    title: 'The AI Revolution in SEO: How to Adapt Your Strategy',
    description: 'Strategic guidance for adapting SEO practices in the age of artificial intelligence.',
    readTime: '9 min read'
  }
];

// Routes to generate static pages for
const routes = [
  {
    path: '/',
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    content: `
      <h1>Professional SEO Services That Drive Results</h1>
      <h2>Boost your search rankings with data-driven strategies that increase organic traffic and conversions</h2>
      <section>
        <h3>Our Core Services</h3>
        <ul>
          <li><a href="/services">Technical SEO Optimization</a></li>
          <li><a href="/services">Content Strategy & Creation</a></li>
          <li><a href="/services-pricing">SEO Packages & Pricing</a></li>
          <li><a href="/app-building">Custom App Development</a></li>
          <li><a href="/workflow-automation">Workflow Automation</a></li>
        </ul>
      </section>
      <section>
        <h3>Proven Results</h3>
        <p>Our clients see an average 150% increase in organic traffic within 6 months.</p>
        <a href="/portfolio">View Case Studies</a>
      </section>
      <section>
        <h3>Latest SEO Insights</h3>
        <p>Stay updated with the latest SEO strategies and algorithm changes.</p>
        <a href="/blog">Read Our Blog</a>
      </section>
    `
  },
  {
    path: '/about',
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    content: `
      <h1>Expert SEO Team & Proven Methodology</h1>
      <h2>10+ years of experience helping businesses dominate search rankings</h2>
      <section>
        <h3>Our Expertise</h3>
        <p>With over a decade of experience in SEO and digital marketing, our team has helped hundreds of businesses achieve significant growth through search engine optimization.</p>
      </section>
      <section>
        <h3>Data-Driven Approach</h3>
        <p>We use advanced analytics and testing methodologies to ensure every SEO strategy delivers measurable results for your business.</p>
      </section>
      <section>
        <h3>Ready to Grow Your Business?</h3>
        <p><a href="/contact">Get started with a free SEO consultation</a></p>
      </section>
    `
  },
  {
    path: '/services',
    title: 'Professional SEO Services & Solutions | Technical, Content & Local SEO - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and performance tracking. Proven strategies for businesses of all sizes.',
    content: `
      <h1>Professional SEO Services & Solutions</h1>
      <h2>Comprehensive optimization strategies for businesses of all sizes</h2>
      <section>
        <h3>Technical SEO Services</h3>
        <p>Complete website optimization including Core Web Vitals, structured data, and crawlability improvements.</p>
      </section>
      <section>
        <h3>Content Strategy & Creation</h3>
        <p>Data-driven content creation that targets high-value keywords and drives qualified traffic.</p>
      </section>
      <section>
        <h3>Local SEO Optimization</h3>
        <p>Dominate local search results with Google Business Profile optimization and local citations.</p>
      </section>
      <p><a href="/services-pricing">View Our Pricing Packages</a></p>
    `
  },
  {
    path: '/services-pricing',
    title: 'SEO Services & Pricing Packages | Transparent Pricing for Measurable Results - Marden SEO',
    description: 'Transparent SEO pricing packages for businesses of all sizes. Compare our starter, professional, and enterprise SEO solutions with clear deliverables.',
    content: `
      <h1>SEO Services & Pricing Packages</h1>
      <h2>Transparent pricing for measurable SEO results</h2>
      <section>
        <h3>Starter SEO Package</h3>
        <p>Perfect for small businesses looking to establish their online presence.</p>
        <ul>
          <li>Technical SEO audit and optimization</li>
          <li>Keyword research and strategy</li>
          <li>Content optimization</li>
          <li>Monthly reporting</li>
        </ul>
      </section>
      <section>
        <h3>Professional SEO Package</h3>
        <p>Comprehensive SEO solution for growing businesses.</p>
      </section>
      <section>
        <h3>Enterprise SEO Package</h3>
        <p>Advanced SEO strategies for large-scale websites.</p>
      </section>
      <p><a href="/contact">Get Custom Quote</a></p>
    `
  },
  {
    path: '/contact',
    title: 'Contact Marden SEO | Free SEO Consultation & Custom Quotes',
    description: 'Contact our SEO experts for a free consultation. Get custom quotes for SEO services, app development, and workflow automation. Start growing your business today.',
    content: `
      <h1>Contact Marden SEO</h1>
      <h2>Get your free SEO consultation and custom quote</h2>
      <section>
        <h3>Free SEO Consultation</h3>
        <p>Ready to grow your business with professional SEO services? Contact our team for a free consultation and custom quote.</p>
      </section>
      <section>
        <h3>Our Services</h3>
        <ul>
          <li>Search Engine Optimization (SEO)</li>
          <li>Custom App Development</li>
          <li>Workflow Automation</li>
          <li>Technical SEO Audits</li>
        </ul>
      </section>
      <section>
        <h3>Get Started Today</h3>
        <p>Contact us to discuss your project and receive a custom quote tailored to your business needs.</p>
      </section>
    `
  },
  {
    path: '/portfolio',
    title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
    description: 'View our SEO portfolio featuring real client results, case studies, and success stories. See how we help businesses achieve significant growth through SEO.',
    content: `
      <h1>SEO Portfolio & Case Studies</h1>
      <h2>Proven results and client success stories</h2>
      <section>
        <h3>Client Success Stories</h3>
        <p>View real results from our SEO campaigns and app development projects.</p>
      </section>
      <section>
        <h3>Featured Case Studies</h3>
        <div class="case-studies">
          <div class="case-study">
            <h4>E-commerce SEO Success: 300% Traffic Increase</h4>
            <p>How we helped an online retailer triple their organic traffic in 8 months.</p>
          </div>
          <div class="case-study">
            <h4>Local Business SEO: #1 Rankings Achieved</h4>
            <p>Local service business achieves top rankings for all target keywords.</p>
          </div>
        </div>
      </section>
      <section>
        <h3>Ready for Similar Results?</h3>
        <p><a href="/contact">Contact us</a> to discuss how we can help your business achieve similar success.</p>
      </section>
    `
  },
  {
    path: '/app-building',
    title: 'Custom App Development Services | React, TypeScript & Modern Technologies - Marden SEO',
    description: 'Professional custom app development using React, TypeScript, and modern technologies. Create powerful applications that drive business growth and efficiency.',
    content: `
      <h1>Custom App Development Services</h1>
      <h2>Build powerful applications with React, TypeScript, and modern technologies</h2>
      <section>
        <h3>Modern Development Stack</h3>
        <p>We use cutting-edge technologies including React, TypeScript, and Vite to create fast, reliable applications.</p>
      </section>
      <section>
        <h3>Custom Solutions</h3>
        <p>Every application is tailored to your specific business needs and workflows.</p>
      </section>
      <section>
        <h3>Performance & SEO</h3>
        <p>Our applications are built with performance and search engine optimization in mind from day one.</p>
      </section>
      <p><a href="/contact">Discuss Your App Project</a></p>
    `
  },
  {
    path: '/workflow-automation',
    title: 'Workflow Automation Services | n8n, Process Optimization & Business Efficiency - Marden SEO',
    description: 'Streamline your business with custom workflow automation using n8n and modern tools. Increase efficiency and reduce manual tasks with smart automation.',
    content: `
      <h1>Workflow Automation Services</h1>
      <h2>Streamline your business processes with intelligent automation</h2>
      <section>
        <h3>n8n Automation</h3>
        <p>We specialize in n8n workflow automation to connect your tools and streamline repetitive tasks.</p>
      </section>
      <section>
        <h3>Process Optimization</h3>
        <p>Identify bottlenecks and optimize your business processes for maximum efficiency.</p>
      </section>
      <section>
        <h3>Custom Integrations</h3>
        <p>Connect your existing tools and create seamless workflows that save time and reduce errors.</p>
      </section>
      <p><a href="/contact">Start Automating Your Workflows</a></p>
    `
  },
  {
    path: '/blog',
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Expert SEO tips, digital marketing strategies, and industry insights from our professional team. Stay updated with the latest search engine optimization trends.',
    content: `
      <h1>SEO Blog & Digital Marketing Insights</h1>
      <h2>Expert tips, strategies, and industry insights from our SEO professionals</h2>
      <section>
        <h3>Latest SEO Articles</h3>
        <div class="blog-posts">
          ${blogPosts.map(post => `
            <article>
              <h4><a href="/blog/${post.id}">${post.title}</a></h4>
              <p>${post.description}</p>
              <small>${post.readTime}</small>
            </article>
          `).join('')}
        </div>
      </section>
      <section>
        <h3>SEO Categories</h3>
        <ul>
          <li>Technical SEO</li>
          <li>Content Strategy</li>
          <li>Local SEO</li>
          <li>SEO Tools & Analytics</li>
        </ul>
      </section>
    `
  }
];

// Navigation component
const navigation = `
  <nav style="margin-bottom: 2rem; padding: 1rem; border-bottom: 1px solid #e5e7eb;">
    <a href="/" style="margin-right: 1rem;">Home</a> |
    <a href="/about" style="margin: 0 1rem;">About</a> |
    <a href="/services" style="margin: 0 1rem;">Services</a> |
    <a href="/services-pricing" style="margin: 0 1rem;">Pricing</a> |
    <a href="/portfolio" style="margin: 0 1rem;">Portfolio</a> |
    <a href="/blog" style="margin: 0 1rem;">Blog</a> |
    <a href="/contact" style="margin: 0 1rem;">Contact</a> |
    <a href="/app-building" style="margin: 0 1rem;">App Development</a> |
    <a href="/workflow-automation" style="margin-left: 1rem;">Automation</a>
  </nav>
`;

// Function to generate static HTML
function generateStaticHTML(route) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <link rel="canonical" href="https://mardenseo.com${route.path}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.description}">
  <meta property="og:url" content="https://mardenseo.com${route.path}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://mardenseo.com/opengraph-image.png">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${route.title}">
  <meta name="twitter:description" content="${route.description}">
  <meta name="twitter:image" content="https://mardenseo.com/opengraph-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
</head>
<body>
  <!-- Static content for crawlers -->
  <div id="static-content" style="font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 2rem;">
    ${navigation}
    <main>
      ${route.content}
    </main>
    <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
      <p>&copy; 2025 Marden SEO. Professional SEO Services &amp; App Development.</p>
      <p><a href="/contact">Contact Us</a> | <a href="/services">Our Services</a> | <a href="/blog">SEO Blog</a></p>
    </footer>
  </div>
  
  <!-- React app mount point -->
  <div id="root"></div>
  
  <!-- React app scripts (will be injected by the build process) -->
  <script type="module" crossorigin src="/assets/index-DHgNQw9l.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-bT0T0QyP.css">
</body>
</html>`;
}

// Generate static pages
console.log('📄 Generating static HTML pages...');

// Ensure dist directory exists
const distDir = 'dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate main route pages
for (const route of routes) {
  const routePath = route.path === '/' ? '' : route.path;
  const dirPath = path.join(distDir, routePath);
  
  // Create directory if it doesn't exist
  if (routePath) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Generate HTML file
  const htmlPath = path.join(dirPath, 'index.html');
  const htmlContent = generateStaticHTML(route);
  
  // Write the file
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ Generated: ${htmlPath}`);
}

// Generate individual blog post pages
console.log('📝 Generating blog post pages...');
for (const post of blogPosts) {
  const blogPath = path.join(distDir, 'blog', post.id);
  fs.mkdirSync(blogPath, { recursive: true });
  
  const blogRoute = {
    path: `/blog/${post.id}`,
    title: `${post.title} - Marden SEO`,
    description: post.description,
    content: `
      <h1>${post.title}</h1>
      <p style="color: #666; margin-bottom: 2rem;">${post.readTime}</p>
      <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
        <p><strong>Article Summary:</strong> ${post.description}</p>
      </div>
      <section>
        <p>This comprehensive guide covers the essential strategies and tactics for modern SEO success. Our expert team has compiled the most effective approaches based on years of experience and proven results.</p>
        <p>For detailed implementation guidance and personalized SEO strategies, <a href="/contact">contact our team</a> for a free consultation.</p>
      </section>
      <section style="margin-top: 3rem;">
        <h3>Related Articles</h3>
        <ul>
          <li><a href="/blog">View All SEO Articles</a></li>
          <li><a href="/services">Our SEO Services</a></li>
          <li><a href="/contact">Get SEO Consultation</a></li>
        </ul>
      </section>
    `
  };
  
  const htmlContent = generateStaticHTML(blogRoute);
  const htmlPath = path.join(blogPath, 'index.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ Generated blog post: ${htmlPath}`);
}

// Generate updated sitemap with proper blog slugs
console.log('🗺️ Generating updated sitemap...');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://mardenseo.com/</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Business Pages - High Priority -->
  <url>
    <loc>https://mardenseo.com/services</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/services-pricing</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/about</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/contact</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Service Pages - High Priority -->
  <url>
    <loc>https://mardenseo.com/app-building</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/workflow-automation</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Portfolio and Content Pages -->
  <url>
    <loc>https://mardenseo.com/portfolio</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://mardenseo.com/blog</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog Posts with Proper Slugs -->
${blogPosts.map(post => `  <url>
    <loc>https://mardenseo.com/blog/${post.id}</loc>
    <lastmod>2025-07-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}

</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
console.log('✅ Generated updated sitemap.xml');

console.log('\n🎉 WORKING SSG BUILD COMPLETED SUCCESSFULLY!');
console.log('\n📊 Generated Files:');
console.log(`- ${routes.length} main pages`);
console.log(`- ${blogPosts.length} blog post pages`);
console.log('- Updated sitemap.xml with proper blog slugs');
console.log('- All pages include navigation and proper meta tags');
console.log('\n✅ Static HTML generation complete!');
console.log('🌐 Test with: npm run test:working');
