#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static content for each page
const pageContent = {
  '/': {
    title: 'Expert SEO Services - Drive Organic Growth | Marden SEO',
    description: 'Transform your online presence with expert SEO services. We help businesses increase organic traffic, improve rankings, and drive sustainable growth.',
    h1: 'Expert SEO Services That Drive Results',
    content: `
      <p>Welcome to Marden SEO, your trusted partner for professional SEO services. We specialize in helping businesses improve their online visibility, attract more organic traffic, and achieve sustainable growth through data-driven SEO strategies.</p>
      <h2>Our SEO Services</h2>
      <ul>
        <li>Technical SEO Optimization</li>
        <li>On-Page SEO</li>
        <li>Content Strategy & Creation</li>
        <li>Link Building</li>
        <li>Local SEO</li>
        <li>E-commerce SEO</li>
      </ul>
      <p>Contact us today for a free SEO consultation and discover how we can help your business succeed online.</p>
    `
  },
  '/about': {
    title: 'About Us - SEO Experts & Digital Marketing Team | Marden SEO',
    description: 'Meet the Marden SEO team. We are passionate SEO experts dedicated to helping businesses succeed online through data-driven strategies.',
    h1: 'About Marden SEO',
    content: `
      <p>Marden SEO is a team of passionate digital marketing experts dedicated to helping businesses succeed online. With years of experience in SEO, web development, and digital strategy, we deliver results that matter.</p>
      <h2>Our Mission</h2>
      <p>To provide transparent, effective SEO services that help businesses grow their online presence and achieve their digital marketing goals.</p>
      <h2>Why Choose Us</h2>
      <ul>
        <li>Proven track record of success</li>
        <li>Data-driven approach</li>
        <li>Transparent reporting</li>
        <li>Customized strategies</li>
        <li>Dedicated support</li>
      </ul>
    `
  },
  '/services': {
    title: 'Professional SEO Services - Boost Your Rankings | Marden SEO',
    description: 'Comprehensive SEO services including technical SEO, content optimization, link building, and local SEO. Customized strategies for your business.',
    h1: 'Professional SEO Services',
    content: `
      <p>Our comprehensive SEO services are designed to improve your website's visibility, drive organic traffic, and increase conversions. We offer customized solutions tailored to your business needs.</p>
      <h2>Technical SEO</h2>
      <p>Optimize your website's technical foundation for better crawlability and indexation.</p>
      <h2>Content Optimization</h2>
      <p>Create and optimize content that ranks well and engages your audience.</p>
      <h2>Link Building</h2>
      <p>Build high-quality backlinks that improve your domain authority.</p>
      <h2>Local SEO</h2>
      <p>Dominate local search results and attract customers in your area.</p>
    `
  },
  '/services-pricing': {
    title: 'SEO Pricing & Packages - Transparent Pricing | Marden SEO',
    description: 'Transparent SEO pricing packages to fit your budget. From small businesses to enterprises, we have the right solution for you.',
    h1: 'SEO Services & Pricing',
    content: `
      <p>We offer transparent, competitive pricing for all our SEO services. Choose from our packages or get a custom quote.</p>
      <h2>Starter Package</h2>
      <p>Perfect for small businesses just starting with SEO. Includes basic optimization and monthly reporting.</p>
      <h2>Professional Package</h2>
      <p>Ideal for growing businesses. Comprehensive SEO with content creation and link building.</p>
      <h2>Enterprise Package</h2>
      <p>Full-service SEO for large businesses. Custom strategies and dedicated account management.</p>
    `
  },
  '/portfolio': {
    title: 'SEO Portfolio - Client Success Stories | Marden SEO',
    description: 'View our SEO success stories and case studies. See how we have helped businesses achieve significant growth in organic traffic and rankings.',
    h1: 'Our SEO Success Stories',
    content: `
      <p>Discover how we've helped businesses across various industries improve their search rankings and drive organic growth.</p>
      <h2>Case Studies</h2>
      <ul>
        <li>E-commerce client: 300% increase in organic traffic</li>
        <li>Local service business: #1 rankings for all target keywords</li>
        <li>SaaS company: 150% increase in qualified leads</li>
        <li>Healthcare provider: Dominated local search results</li>
      </ul>
    `
  },
  '/blog': {
    title: 'SEO Blog - Latest Tips & Industry Insights | Marden SEO',
    description: 'Stay updated with the latest SEO trends, tips, and best practices. Our blog covers everything from technical SEO to content marketing.',
    h1: 'SEO Blog & Resources',
    content: `
      <p>Stay ahead of the curve with our latest SEO insights, tips, and industry updates.</p>
      <h2>Recent Posts</h2>
      <ul>
        <li>Local SEO in 2025: Complete Domination Guide</li>
        <li>AI's Impact on Search: What You Need to Know</li>
        <li>Core Web Vitals: The Ultimate Guide</li>
        <li>Link Building Strategies That Actually Work</li>
      </ul>
    `
  },
  '/contact': {
    title: 'Contact Us - Get Your Free SEO Consultation | Marden SEO',
    description: 'Ready to grow your online presence? Contact Marden SEO for a free consultation and discover how we can help your business succeed.',
    h1: 'Contact Marden SEO',
    content: `
      <p>Ready to take your online presence to the next level? Get in touch with us today for a free SEO consultation.</p>
      <h2>Get Your Free SEO Audit</h2>
      <p>We'll analyze your website and provide actionable recommendations to improve your search rankings.</p>
      <h2>Contact Information</h2>
      <p>Email: info@mardenseo.com</p>
      <p>Phone: (555) 123-4567</p>
      <p>Hours: Monday-Friday, 9 AM - 6 PM EST</p>
    `
  },
  '/app-building': {
    title: 'Custom App Development Services | Marden SEO',
    description: 'Custom web and mobile application development services. We build scalable, user-friendly apps that drive business growth.',
    h1: 'Custom App Development',
    content: `
      <p>Beyond SEO, we build custom applications that help your business operate more efficiently and serve customers better.</p>
      <h2>Our Development Services</h2>
      <ul>
        <li>Web Application Development</li>
        <li>Mobile App Development</li>
        <li>Progressive Web Apps (PWA)</li>
        <li>API Development & Integration</li>
      </ul>
    `
  },
  '/workflow-automation': {
    title: 'Workflow Automation with n8n | Marden SEO',
    description: 'Streamline your business processes with n8n workflow automation. Save time and reduce errors with custom automation solutions.',
    h1: 'Workflow Automation Services',
    content: `
      <p>Automate repetitive tasks and streamline your business processes with our n8n workflow automation services.</p>
      <h2>Automation Solutions</h2>
      <ul>
        <li>Marketing Automation</li>
        <li>Sales Process Automation</li>
        <li>Data Synchronization</li>
        <li>Report Generation</li>
      </ul>
    `
  }
};

// Navigation HTML that will be added to all pages
const navigationHtml = `
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About</a></li>
          <li><a href="/services/">Services</a></li>
          <li><a href="/services-pricing/">Pricing</a></li>
          <li><a href="/portfolio/">Portfolio</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/app-building/">App Development</a></li>
          <li><a href="/workflow-automation/">Automation</a></li>
        </ul>
      </nav>`;

async function addStaticContent() {
  console.log('🚀 Adding static content to pages...\n');

  try {
    // Read the original index.html to use as base template
    const indexPath = path.join(__dirname, 'index.html');
    let originalTemplate = await fs.readFile(indexPath, 'utf-8');

    // Process each page
    for (const [route, meta] of Object.entries(pageContent)) {
      console.log(`📄 Processing ${route}...`);

      // For homepage, read from dist, for others use the original template
      let template;
      if (route === '/') {
        template = await fs.readFile(path.join(__dirname, 'dist', 'index.html'), 'utf-8');
      } else {
        template = originalTemplate;
      }

      // Create a copy of the template
      let html = template;

      // Update title and meta tags
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${meta.title}</title>`
      );
      html = html.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${meta.description}" />`
      );

      // Update OG tags
      html = html.replace(
        /<meta property="og:title" content=".*?" \/>/,
        `<meta property="og:title" content="${meta.title}" />`
      );
      html = html.replace(
        /<meta property="og:description" content=".*?" \/>/,
        `<meta property="og:description" content="${meta.description}" />`
      );
      html = html.replace(
        /<meta property="og:url" content=".*?" \/>/,
        `<meta property="og:url" content="https://mardenseo.com${route === '/' ? '' : route}" />`
      );

      // Update Twitter tags  
      html = html.replace(
        /<meta property="twitter:title" content=".*?" \/>/,
        `<meta property="twitter:title" content="${meta.title}" />`
      );
      html = html.replace(
        /<meta property="twitter:description" content=".*?" \/>/,
        `<meta property="twitter:description" content="${meta.description}" />`
      );
      html = html.replace(
        /<meta property="twitter:url" content=".*?" \/>/,
        `<meta property="twitter:url" content="https://mardenseo.com${route === '/' ? '' : route}" />`
      );

      // Fix canonical URL - this is the critical fix!
      const canonicalUrl = `https://mardenseo.com${route === '/' ? '/' : route + '/'}`;
      
      // Check if canonical exists and update it
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(
          /<link rel="canonical" href=".*?" \/>/,
          `<link rel="canonical" href="${canonicalUrl}" />`
        );
      } else {
        // Add canonical if it doesn't exist
        html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
      }

      // Add robots meta tag to ensure pages are indexable
      if (!html.includes('name="robots"')) {
        html = html.replace(
          '<meta name="description"',
          '<meta name="robots" content="index, follow" />\n    <meta name="description"'
        );
      }

      // Add static content with navigation
      const staticHtml = `
    <!-- Static content for SEO -->
    <div id="static-seo-content" style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;">
      <h1>${meta.h1}</h1>
      ${navigationHtml}
      ${meta.content}
    </div>
    
    <div id="root"><!--ssr-outlet--></div>`;

      html = html.replace(
        /<div id="root">.*?<\/div>/s,
        staticHtml
      );

      // For Vite builds, we need to add the script and CSS tags
      if (!html.includes('/assets/main-')) {
        html = html.replace(
          '</head>',
          '    <script type="module" crossorigin src="/assets/main-BgO0c2Wu.js"></script>\n    <link rel="stylesheet" crossorigin href="/assets/main-Kab0klor.css">\n  </head>'
        );
      }

      // Write the file
      if (route === '/') {
        await fs.writeFile(path.join(__dirname, 'dist', 'index.html'), html, 'utf-8');
      } else {
        const routePath = path.join(__dirname, 'dist', route.slice(1));
        await fs.mkdir(routePath, { recursive: true });
        await fs.writeFile(path.join(routePath, 'index.html'), html, 'utf-8');
      }

      console.log(`✅ Created ${route}/index.html with canonical: ${canonicalUrl}`);
    }

    console.log('\n✨ Static content added successfully!');
    console.log('🔍 Each page now has its own canonical URL');
    console.log('📦 Run: npm run serve:static to test');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
addStaticContent();
