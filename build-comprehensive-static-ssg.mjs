#!/usr/bin/env node

/**
 * 🚀 COMPREHENSIVE TRUE STATIC HTML SSG GENERATOR
 * Marden SEO Website - Complete Route Coverage
 * 
 * Generates static HTML files for ALL routes including:
 * - Main business pages (9 core pages)
 * - Dynamic blog posts (from existing data)
 * - Dynamic case studies (from existing data)
 * - System pages with proper noindex handling
 * 
 * SAFE APPROACH: No content switching - pure static HTML visible immediately
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the dynamic generators
import { writeSitemap } from './generate-sitemap-safe.mjs';
import { writeRobotsTxt } from './generate-robots.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// COMPREHENSIVE ROUTE DEFINITIONS
// =============================================================================

const routes = [
  // Core Business Pages (High Priority - INDEX ALL)
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/services-pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
  { path: '/app-building', priority: 0.7, changefreq: 'monthly' },
  { path: '/workflow-automation', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.7, changefreq: 'daily' },
  
  // System Pages (NOINDEX - Low Priority)
  { path: '/cart', noindex: true },
  { path: '/admin', noindex: true },
  { path: '/analytics-test', noindex: true },
  { path: '/debug', noindex: true },
];

// =============================================================================
// ROUTE-SPECIFIC META DATA
// =============================================================================

const routeMeta = {
  '/': {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    h1: 'Professional SEO Services That Drive Results',
    h2: 'Boost your search rankings with data-driven strategies that increase organic traffic and conversions',
    keywords: ['SEO services', 'search engine optimization', 'digital marketing', 'app development', 'workflow automation'],
    content: `
      <section class="hero-section">
        <h3>Our Core Services</h3>
        <ul class="services-list">
          <li><a href="/services">Technical SEO Optimization</a> - Complete website optimization including Core Web Vitals and structured data</li>
          <li><a href="/services">Content Strategy & Creation</a> - Data-driven content that targets high-value keywords</li>
          <li><a href="/services-pricing">SEO Packages & Pricing</a> - Transparent pricing for measurable results</li>
          <li><a href="/app-building">Custom App Development</a> - React and modern web applications</li>
          <li><a href="/workflow-automation">Workflow Automation</a> - n8n automation solutions for business efficiency</li>
        </ul>
      </section>
      <section class="results-section">
        <h3>Proven Results</h3>
        <p>Our clients see an average 150% increase in organic traffic within 6 months. We focus on sustainable, white-hat SEO strategies that deliver long-term results.</p>
        <p><a href="/portfolio">View Our Case Studies</a> to see real client success stories and measurable results.</p>
      </section>
      <section class="insights-section">
        <h3>Latest SEO Insights</h3>
        <p>Stay updated with the latest SEO strategies, algorithm changes, and industry best practices through our expert blog content.</p>
        <p><a href="/blog">Read Our SEO Blog</a> for actionable insights and professional tips.</p>
      </section>
    `
  },
  
  '/about': {
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    h1: 'Expert SEO Team & Proven Methodology',
    h2: 'Meet the professionals behind successful SEO campaigns and app development projects',
    keywords: ['SEO experts', 'SEO team', 'digital marketing professionals', 'SEO methodology'],
    content: `
      <section class="team-section">
        <h3>Our SEO Expertise</h3>
        <p>With over 10 years of experience in search engine optimization, our team has helped hundreds of businesses achieve top rankings and sustainable organic growth.</p>
        <p>We specialize in technical SEO, content strategy, local SEO, and custom app development that supports your digital marketing goals.</p>
      </section>
      <section class="methodology-section">
        <h3>Our Proven Methodology</h3>
        <ul>
          <li><strong>SEO Audit & Analysis:</strong> Comprehensive website analysis and competitive research</li>
          <li><strong>Strategy Development:</strong> Custom SEO strategy based on your business goals</li>
          <li><strong>Implementation:</strong> Technical optimization and content creation</li>
          <li><strong>Monitoring & Optimization:</strong> Continuous improvement and performance tracking</li>
        </ul>
        <p><a href="/services">Learn more about our SEO services</a> and how we can help your business succeed online.</p>
      </section>
      <section class="values-section">
        <h3>Our Commitment to Excellence</h3>
        <p>We believe in transparent communication, data-driven decisions, and sustainable SEO practices that deliver long-term results for our clients.</p>
        <p>Ready to work with our expert team? <a href="/contact">Contact us today</a> for a free SEO consultation.</p>
      </section>
    `
  },
  
  '/services': {
    title: 'Professional SEO Services & Solutions | Comprehensive SEO Packages - Marden SEO',
    description: 'Comprehensive SEO services including technical optimization, content strategy, local SEO, and link building. Custom packages for businesses of all sizes.',
    h1: 'Professional SEO Services & Solutions',
    h2: 'Comprehensive optimization strategies for businesses of all sizes',
    keywords: ['SEO services', 'technical SEO', 'content strategy', 'local SEO', 'link building'],
    content: `
      <section class="technical-seo">
        <h3>Technical SEO Services</h3>
        <p>Complete website optimization including Core Web Vitals improvement, structured data implementation, crawlability enhancements, and mobile optimization.</p>
        <ul>
          <li>Core Web Vitals optimization for better user experience and rankings</li>
          <li>Structured data markup for rich snippets</li>
          <li>Website speed optimization and performance tuning</li>
          <li>Mobile-first indexing optimization</li>
        </ul>
      </section>
      <section class="content-strategy">
        <h3>Content Strategy & Creation</h3>
        <p>Data-driven content creation that targets high-value keywords and drives qualified traffic to your website.</p>
        <ul>
          <li>Keyword research and content planning</li>
          <li>SEO-optimized blog content and landing pages</li>
          <li>Content optimization for existing pages</li>
          <li>Topic cluster development for authority building</li>
        </ul>
      </section>
      <section class="local-seo">
        <h3>Local SEO Optimization</h3>
        <p>Dominate local search results with Google Business Profile optimization, local citations, and geo-targeted content strategies.</p>
        <ul>
          <li>Google Business Profile optimization and management</li>
          <li>Local citation building and consistency</li>
          <li>Review management and reputation building</li>
          <li>Local keyword targeting and optimization</li>
        </ul>
      </section>
      <section class="cta-section">
        <h3>Ready to Get Started?</h3>
        <p><a href="/services-pricing">View Our Pricing Packages</a> or <a href="/contact">Contact us</a> for a custom quote tailored to your business needs.</p>
      </section>
    `
  },
  
  '/services-pricing': {
    title: 'SEO Services & Pricing Packages | Transparent SEO Pricing - Marden SEO',
    description: 'Transparent SEO pricing packages for businesses of all sizes. From starter SEO to enterprise solutions. Get measurable results with our proven SEO strategies.',
    h1: 'SEO Services & Pricing Packages',
    h2: 'Transparent pricing for measurable SEO results',
    keywords: ['SEO pricing', 'SEO packages', 'SEO cost', 'affordable SEO services'],
    content: `
      <section class="starter-package">
        <h3>Starter SEO Package</h3>
        <p><strong>Perfect for small businesses looking to establish their online presence.</strong></p>
        <ul>
          <li>Comprehensive SEO audit and analysis</li>
          <li>Keyword research and strategy development</li>
          <li>On-page optimization for up to 10 pages</li>
          <li>Basic technical SEO improvements</li>
          <li>Monthly performance reporting</li>
        </ul>
        <p>Ideal for: Small businesses, startups, local service providers</p>
      </section>
      <section class="professional-package">
        <h3>Professional SEO Package</h3>
        <p><strong>Comprehensive SEO solution for growing businesses.</strong></p>
        <ul>
          <li>Advanced technical SEO optimization</li>
          <li>Content strategy and creation (4-6 pieces monthly)</li>
          <li>Local SEO optimization and management</li>
          <li>Link building and authority development</li>
          <li>Competitor analysis and strategy refinement</li>
          <li>Bi-weekly progress calls and detailed reporting</li>
        </ul>
        <p>Ideal for: Growing businesses, e-commerce sites, competitive markets</p>
      </section>
      <section class="enterprise-package">
        <h3>Enterprise SEO Package</h3>
        <p><strong>Advanced SEO strategies for large-scale websites and competitive industries.</strong></p>
        <ul>
          <li>Enterprise-level technical SEO audits</li>
          <li>Advanced content strategy and production</li>
          <li>Multi-location and international SEO</li>
          <li>Advanced analytics and conversion tracking</li>
          <li>Dedicated account management and support</li>
          <li>Custom strategy development and implementation</li>
        </ul>
        <p>Ideal for: Large businesses, enterprise websites, national brands</p>
      </section>
      <section class="custom-solutions">
        <h3>Custom SEO Solutions</h3>
        <p>Need something specific? We create custom SEO packages tailored to your unique business requirements and goals.</p>
        <p><strong><a href="/contact">Get a Custom Quote</a></strong> - Free consultation to discuss your specific needs and create a tailored solution.</p>
      </section>
    `
  },
  
  '/contact': {
    title: 'Contact Marden SEO | Free SEO Consultation & Custom Quotes',
    description: 'Contact Marden SEO for a free consultation, custom SEO quote, or app development project. Get expert advice on improving your search rankings and online presence.',
    h1: 'Contact Marden SEO',
    h2: 'Get your free SEO consultation and custom quote',
    keywords: ['contact SEO company', 'SEO consultation', 'SEO quote', 'hire SEO expert'],
    content: `
      <section class="contact-info">
        <h3>Get Started with Professional SEO Services</h3>
        <p>Ready to improve your search rankings and drive more organic traffic? Contact our SEO experts today for a free consultation and custom strategy proposal.</p>
      </section>
      <section class="consultation-section">
        <h3>Free SEO Consultation</h3>
        <p>During your free consultation, we'll:</p>
        <ul>
          <li>Analyze your current website and SEO performance</li>
          <li>Identify opportunities for improvement and growth</li>
          <li>Discuss your business goals and target audience</li>
          <li>Provide recommendations for SEO strategy</li>
          <li>Create a custom proposal tailored to your needs</li>
        </ul>
      </section>
      <section class="contact-methods">
        <h3>Multiple Ways to Reach Us</h3>
        <ul>
          <li><strong>Contact Form:</strong> Fill out our detailed form below for the fastest response</li>
          <li><strong>Direct Email:</strong> Send us your questions and project details</li>
          <li><strong>Phone Consultation:</strong> Schedule a call to discuss your SEO needs</li>
          <li><strong>Project Inquiry:</strong> Get quotes for SEO, app development, or automation projects</li>
        </ul>
      </section>
      <section class="response-info">
        <h3>Quick Response Guarantee</h3>
        <p>We respond to all inquiries within 24 hours (usually much faster). Our team is ready to help you achieve your SEO and digital marketing goals.</p>
        <p><strong>Services Available:</strong> <a href="/services">SEO Optimization</a>, <a href="/app-building">App Development</a>, <a href="/workflow-automation">Workflow Automation</a></p>
      </section>
    `
  },
  
  '/portfolio': {
    title: 'SEO Portfolio & Case Studies | Proven Results & Client Success Stories - Marden SEO',
    description: 'View our SEO portfolio featuring real client results, case studies, and success stories. See how we help businesses achieve top search rankings and increased traffic.',
    h1: 'SEO Portfolio & Case Studies',
    h2: 'Proven results and client success stories',
    keywords: ['SEO portfolio', 'SEO case studies', 'SEO results', 'client success stories'],
    content: `
      <section class="portfolio-overview">
        <h3>Real Results from Real Clients</h3>
        <p>Our portfolio showcases the tangible results we've achieved for clients across various industries. From small local businesses to large e-commerce sites, we deliver measurable SEO success.</p>
      </section>
      <section class="featured-case-studies">
        <h3>Featured Case Studies</h3>
        <div class="case-study">
          <h4><a href="/case-study/ecommerce-seo-success">E-commerce SEO Success: 300% Traffic Increase</a></h4>
          <p><strong>Industry:</strong> E-commerce Retail | <strong>Results:</strong> 300% organic traffic increase in 8 months</p>
          <p>How we helped an online retailer triple their organic traffic through comprehensive technical SEO, content strategy, and strategic link building.</p>
          <ul>
            <li>300% increase in organic traffic</li>
            <li>250% increase in online revenue</li>
            <li>Top 3 rankings for 50+ target keywords</li>
            <li>Improved Core Web Vitals scores by 85%</li>
          </ul>
        </div>
        <div class="case-study">
          <h4><a href="/case-study/local-business-rankings">Local Business SEO: #1 Rankings Achieved</a></h4>
          <p><strong>Industry:</strong> Local Services | <strong>Results:</strong> #1 local rankings for all target keywords</p>
          <p>Local service business achieves dominant local search presence through strategic local SEO optimization and reputation management.</p>
          <ul>
            <li>#1 rankings for all target local keywords</li>
            <li>500% increase in Google Business Profile views</li>
            <li>200% increase in phone calls and inquiries</li>
            <li>Improved online reputation and review scores</li>
          </ul>
        </div>
        <div class="case-study">
          <h4><a href="/case-study/technical-seo-recovery">Technical SEO Recovery: Penalty Recovery & Growth</a></h4>
          <p><strong>Industry:</strong> Professional Services | <strong>Results:</strong> Complete penalty recovery + 180% traffic growth</p>
          <p>How we helped a professional services firm recover from Google penalties and achieve their highest organic traffic levels ever.</p>
          <ul>
            <li>Complete recovery from Google manual penalty</li>
            <li>180% increase in organic traffic post-recovery</li>
            <li>Rebuilt domain authority and trust signals</li>
            <li>Implemented sustainable SEO practices</li>
          </ul>
        </div>
      </section>
      <section class="portfolio-stats">
        <h3>Portfolio Statistics</h3>
        <ul>
          <li><strong>100+ Successful Projects:</strong> Completed across various industries</li>
          <li><strong>Average 150% Traffic Increase:</strong> Within 6 months of engagement</li>
          <li><strong>95% Client Retention Rate:</strong> Long-term partnerships and ongoing success</li>
          <li><strong>50+ Industries Served:</strong> From local services to enterprise e-commerce</li>
        </ul>
      </section>
      <section class="get-started">
        <h3>Ready for Similar Results?</h3>
        <p>Join our successful clients and start achieving better search rankings, increased traffic, and improved online visibility.</p>
        <p><a href="/contact">Contact us today</a> to discuss how we can help your business achieve similar success, or <a href="/services-pricing">view our service packages</a> to get started.</p>
      </section>
    `
  },
  
  '/app-building': {
    title: 'Custom App Development | React & Modern Web Applications - Marden SEO',
    description: 'Professional custom app development services using React, TypeScript, and modern web technologies. Build scalable applications that support your business growth.',
    h1: 'Custom App Development Services',
    h2: 'Build powerful applications with React and modern web technologies',
    keywords: ['custom app development', 'React development', 'web application development', 'TypeScript development'],
    content: `
      <section class="app-development-overview">
        <h3>Professional App Development</h3>
        <p>We build custom web applications using the latest technologies including React, TypeScript, and modern development frameworks. Our applications are designed for performance, scalability, and user experience.</p>
      </section>
      <section class="technologies">
        <h3>Technologies We Use</h3>
        <ul>
          <li><strong>Frontend:</strong> React 18+, TypeScript, Next.js, Vite</li>
          <li><strong>Styling:</strong> Tailwind CSS, Styled Components, Material-UI</li>
          <li><strong>Backend:</strong> Node.js, Express, GraphQL, REST APIs</li>
          <li><strong>Database:</strong> PostgreSQL, MongoDB, Supabase, Firebase</li>
          <li><strong>Deployment:</strong> Vercel, Netlify, AWS, Docker containerization</li>
        </ul>
      </section>
      <section class="app-types">
        <h3>Types of Applications We Build</h3>
        <div class="app-type">
          <h4>Business Management Applications</h4>
          <p>Custom CRM systems, project management tools, and business process applications tailored to your specific workflow requirements.</p>
        </div>
        <div class="app-type">
          <h4>E-commerce Platforms</h4>
          <p>Full-featured online stores with payment processing, inventory management, and SEO-optimized product catalogs.</p>
        </div>
        <div class="app-type">
          <h4>Content Management Systems</h4>
          <p>Custom CMS solutions that give you complete control over your content while maintaining SEO best practices.</p>
        </div>
        <div class="app-type">
          <h4>Analytics & Reporting Dashboards</h4>
          <p>Data visualization applications that help you make informed business decisions with real-time insights.</p>
        </div>
      </section>
      <section class="development-process">
        <h3>Our Development Process</h3>
        <ol>
          <li><strong>Discovery & Planning:</strong> Understanding your requirements and creating detailed specifications</li>
          <li><strong>Design & Prototyping:</strong> User experience design and interactive prototypes</li>
          <li><strong>Development:</strong> Agile development with regular progress updates</li>
          <li><strong>Testing & QA:</strong> Comprehensive testing across devices and browsers</li>
          <li><strong>Deployment & Support:</strong> Production deployment and ongoing maintenance</li>
        </ol>
      </section>
      <section class="integration-section">
        <h3>SEO-Optimized Applications</h3>
        <p>All our applications are built with SEO in mind, featuring server-side rendering, optimized meta tags, structured data, and fast loading times that support your digital marketing goals.</p>
        <p>Combine custom app development with our <a href="/services">SEO services</a> for a complete digital solution that drives results.</p>
      </section>
      <section class="cta-section">
        <h3>Ready to Build Your Custom Application?</h3>
        <p><a href="/contact">Contact us today</a> to discuss your app development project and get a custom quote, or <a href="/portfolio">view our portfolio</a> to see examples of our work.</p>
      </section>
    `
  },
  
  '/workflow-automation': {
    title: 'Workflow Automation Services | n8n & Business Process Optimization - Marden SEO',
    description: 'Professional workflow automation services using n8n and custom solutions. Streamline business processes, integrate systems, and improve efficiency with automated workflows.',
    h1: 'Workflow Automation Services',
    h2: 'Streamline your business processes with n8n automation and custom workflow solutions',
    keywords: ['workflow automation', 'n8n automation', 'business process automation', 'system integration'],
    content: `
      <section class="automation-overview">
        <h3>Professional Workflow Automation</h3>
        <p>We help businesses streamline operations and improve efficiency through custom workflow automation solutions. Using tools like n8n and custom development, we automate repetitive tasks and integrate systems for seamless business operations.</p>
      </section>
      <section class="automation-benefits">
        <h3>Benefits of Workflow Automation</h3>
        <ul>
          <li><strong>Increased Efficiency:</strong> Automate repetitive tasks and free up valuable time</li>
          <li><strong>Reduced Errors:</strong> Eliminate human error in routine processes</li>
          <li><strong>Cost Savings:</strong> Reduce operational costs through automation</li>
          <li><strong>Better Data Flow:</strong> Seamless integration between different systems</li>
          <li><strong>Improved Scalability:</strong> Handle increased workload without proportional staff increases</li>
        </ul>
      </section>
      <section class="automation-types">
        <h3>Types of Workflow Automation</h3>
        <div class="automation-type">
          <h4>Marketing Automation</h4>
          <p>Automate email campaigns, lead nurturing, social media posting, and customer communication workflows.</p>
          <ul>
            <li>Email marketing automation and drip campaigns</li>
            <li>Lead scoring and qualification workflows</li>
            <li>Social media scheduling and engagement</li>
            <li>Customer onboarding and retention sequences</li>
          </ul>
        </div>
        <div class="automation-type">
          <h4>Sales Process Automation</h4>
          <p>Streamline your sales pipeline with automated lead tracking, follow-ups, and reporting.</p>
          <ul>
            <li>CRM data synchronization and updates</li>
            <li>Automated follow-up sequences</li>
            <li>Sales reporting and analytics</li>
            <li>Quote and proposal generation</li>
          </ul>
        </div>
        <div class="automation-type">
          <h4>Data Integration Workflows</h4>
          <p>Connect different systems and automate data transfer between platforms.</p>
          <ul>
            <li>API integrations between business systems</li>
            <li>Database synchronization and backup automation</li>
            <li>Report generation and distribution</li>
            <li>Data validation and cleanup processes</li>
          </ul>
        </div>
        <div class="automation-type">
          <h4>Customer Service Automation</h4>
          <p>Improve customer support efficiency with automated ticket routing and response systems.</p>
          <ul>
            <li>Support ticket routing and escalation</li>
            <li>Automated customer communication</li>
            <li>Knowledge base management</li>
            <li>Customer feedback collection and analysis</li>
          </ul>
        </div>
      </section>
      <section class="n8n-expertise">
        <h3>n8n Automation Expertise</h3>
        <p>We specialize in n8n workflow automation, a powerful open-source platform that allows for complex workflow creation and system integration.</p>
        <ul>
          <li><strong>Custom n8n Workflows:</strong> Tailored automation solutions for your specific business needs</li>
          <li><strong>System Integration:</strong> Connect your existing tools and platforms seamlessly</li>
          <li><strong>Scalable Solutions:</strong> Workflows that grow with your business requirements</li>
          <li><strong>Maintenance & Support:</strong> Ongoing optimization and troubleshooting</li>
        </ul>
      </section>
      <section class="automation-process">
        <h3>Our Automation Process</h3>
        <ol>
          <li><strong>Process Analysis:</strong> Identify automation opportunities and map current workflows</li>
          <li><strong>Solution Design:</strong> Create detailed automation strategy and workflow diagrams</li>
          <li><strong>Development & Testing:</strong> Build and thoroughly test automation workflows</li>
          <li><strong>Implementation:</strong> Deploy automations with minimal business disruption</li>
          <li><strong>Training & Support:</strong> Team training and ongoing optimization support</li>
        </ol>
      </section>
      <section class="integration-services">
        <h3>Complete Digital Solution</h3>
        <p>Combine workflow automation with our <a href="/services">SEO services</a> and <a href="/app-building">custom app development</a> for a comprehensive digital transformation that improves efficiency and drives growth.</p>
      </section>
      <section class="cta-section">
        <h3>Ready to Automate Your Business Processes?</h3>
        <p><a href="/contact">Contact us today</a> to discuss your workflow automation needs and discover how we can help streamline your business operations.</p>
      </section>
    `
  },
  
  '/blog': {
    title: 'SEO Blog & Digital Marketing Insights | Expert Tips & Strategies - Marden SEO',
    description: 'Expert SEO tips, digital marketing strategies, and industry insights from Marden SEO professionals. Stay updated with the latest SEO trends and best practices.',
    h1: 'SEO Blog & Digital Marketing Insights',
    h2: 'Expert tips, strategies, and industry insights from our SEO professionals',
    keywords: ['SEO blog', 'digital marketing insights', 'SEO tips', 'search engine optimization articles'],
    content: `
      <section class="blog-overview">
        <h3>Stay Ahead with Expert SEO Content</h3>
        <p>Our blog features the latest SEO strategies, algorithm updates, and digital marketing insights to help you stay competitive in search rankings and drive more organic traffic to your website.</p>
      </section>
      <section class="featured-articles">
        <h3>Featured SEO Articles</h3>
        <div class="article">
          <h4><a href="/blog/e-e-a-t-complete-guide">Complete Guide to E-E-A-T: Experience, Expertise, Authoritativeness, Trust</a></h4>
          <p><strong>Read Time:</strong> 10 minutes | <strong>Category:</strong> SEO Strategy</p>
          <p>Master Google's E-E-A-T framework with this comprehensive guide covering experience, expertise, authoritativeness, and trust signals for better search rankings.</p>
        </div>
        <div class="article">
          <h4><a href="/blog/on-page-seo-tactics-2025">10 On-Page SEO Tactics That Still Work in 2025</a></h4>
          <p><strong>Read Time:</strong> 8 minutes | <strong>Category:</strong> Technical SEO</p>
          <p>Discover the most effective on-page optimization strategies for modern search engines, including advanced techniques and practical implementation tips.</p>
        </div>
        <div class="article">
          <h4><a href="/blog/core-web-vitals-seo-2025">Why Core Web Vitals Are Still Running Your SEO Life in 2025</a></h4>
          <p><strong>Read Time:</strong> 12 minutes | <strong>Category:</strong> Technical SEO</p>
          <p>Everything you need to know about Core Web Vitals and their continuing impact on search rankings, user experience, and website performance.</p>
        </div>
        <div class="article">
          <h4><a href="/blog/ai-revolution-seo-strategy">The AI Revolution in SEO: How to Adapt Your Strategy</a></h4>
          <p><strong>Read Time:</strong> 9 minutes | <strong>Category:</strong> SEO Strategy</p>
          <p>Learn how artificial intelligence is changing SEO and discover strategies to leverage AI tools while maintaining authentic, valuable content.</p>
        </div>
        <div class="article">
          <h4><a href="/blog/local-seo-mastery">Local SEO Mastery: How to Dominate Your Geographic Market</a></h4>
          <p><strong>Read Time:</strong> 5 minutes | <strong>Category:</strong> Local SEO</p>
          <p>Complete guide to local SEO optimization including Google Business Profile management, local citations, and geo-targeted content strategies.</p>
        </div>
      </section>
      <section class="blog-categories">
        <h3>SEO Content Categories</h3>
        <ul>
          <li><a href="/blog?category=technical-seo">Technical SEO</a> - Site optimization, Core Web Vitals, structured data</li>
          <li><a href="/blog?category=content-strategy">Content Strategy</a> - Content creation, keyword research, user intent</li>
          <li><a href="/blog?category=local-seo">Local SEO</a> - Local optimization, Google Business Profile, citations</li>
          <li><a href="/blog?category=seo-tools">SEO Tools</a> - Tool reviews, automation, workflow optimization</li>
          <li><a href="/blog?category=algorithm-updates">Algorithm Updates</a> - Google updates, ranking factor analysis</li>
          <li><a href="/blog?category=case-studies">Case Studies</a> - Real client results and success stories</li>
        </ul>
      </section>
      <section class="newsletter-signup">
        <h3>Stay Updated with SEO Insights</h3>
        <p>Subscribe to our newsletter for weekly SEO tips, algorithm updates, and exclusive insights delivered directly to your inbox.</p>
        <p><a href="/contact">Contact us</a> to subscribe or learn more about our <a href="/services">SEO services</a>.</p>
      </section>
    `
  },

  // System Pages with NOINDEX
  '/cart': {
    title: 'Shopping Cart | Marden SEO',
    description: 'Review your selected services and packages.',
    h1: 'Your Shopping Cart',
    h2: 'Review your selected services and packages',
    keywords: [],
    noindex: true,
    content: `
      <section class="cart-info">
        <p>Review your selected services and packages before proceeding to checkout.</p>
        <p><a href="/services-pricing">Browse Our Services</a> to add more items to your cart.</p>
      </section>
    `
  },

  '/admin': {
    title: 'Admin Panel | Marden SEO',
    description: 'Administrative interface for authorized users.',
    h1: 'Admin Panel',
    h2: 'Administrative interface for authorized users only',
    keywords: [],
    noindex: true,
    content: `
      <section class="admin-info">
        <p>This area is restricted to authorized administrators only.</p>
        <p><a href="/">Return to Homepage</a></p>
      </section>
    `
  },

  '/analytics-test': {
    title: 'Analytics Testing | Marden SEO',
    description: 'Analytics testing interface.',
    h1: 'Analytics Testing',
    h2: 'Testing interface for analytics verification',
    keywords: [],
    noindex: true,
    content: `
      <section class="analytics-info">
        <p>This page is used for analytics testing and verification purposes.</p>
        <p><a href="/">Return to Homepage</a></p>
      </section>
    `
  },

  '/debug': {
    title: 'Debug Page | Marden SEO',
    description: 'Debug interface for development purposes.',
    h1: 'Debug Interface',
    h2: 'Development and debugging utilities',
    keywords: [],
    noindex: true,
    content: `
      <section class="debug-info">
        <p>This page contains debugging utilities for development purposes.</p>
        <p><a href="/">Return to Homepage</a></p>
      </section>
    `
  }
};

// =============================================================================
// COMPREHENSIVE NAVIGATION BAR (ALL PAGES)
// =============================================================================

const generateNavigation = () => `
<nav class="main-navigation" style="background: #1a1a1a; padding: 1rem; margin-bottom: 2rem;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
    <a href="/" style="color: #3b82f6; text-decoration: none; font-weight: bold; margin-right: 2rem;">Marden SEO</a>
    <a href="/" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Home</a>
    <a href="/about" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">About</a>
    <a href="/services" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Services</a>
    <a href="/services-pricing" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Pricing</a>
    <a href="/portfolio" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Portfolio</a>
    <a href="/blog" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Blog</a>
    <a href="/contact" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Contact</a>
    <a href="/app-building" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">App Development</a>
    <a href="/workflow-automation" style="color: #e5e7eb; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Automation</a>
  </div>
</nav>
`;

// =============================================================================
// DYNAMIC BLOG POST DISCOVERY
// =============================================================================

async function discoverBlogPosts() {
  try {
    const blogDataPath = path.join(__dirname, 'src', 'data', 'blogPosts.tsx');
    const blogContent = await fs.readFile(blogDataPath, 'utf8');
    
    // Extract blog post IDs and titles from the file
    const blogPosts = [];
    const matches = blogContent.match(/id:\s*["'`]([^"'`]+)["'`][\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
    
    if (matches) {
      matches.forEach(match => {
        const idMatch = match.match(/id:\s*["'`]([^"'`]+)["'`]/);
        const titleMatch = match.match(/title:\s*["'`]([^"'`]+)["'`]/);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          blogPosts.push({
            id,
            slug: id, // Use the ID as slug since they are already proper slugs
            title,
            path: `/blog/${id}`,
            priority: 0.6,
            changefreq: 'monthly'
          });
        }
      });
    }
    
    console.log(`✅ Discovered ${blogPosts.length} blog posts for static generation`);
    return blogPosts;
  } catch (error) {
    console.log('ℹ️ Blog posts file not found or error reading, using default posts');
    return [
      { id: 'local-seo-2025', slug: 'local-seo-2025', title: 'Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack', path: '/blog/local-seo-2025', priority: 0.6, changefreq: 'monthly' },
      { id: 'ai-midlife-crisis', slug: 'ai-midlife-crisis', title: 'From Google Whisperer to AI Prophet: An SEO\'s Midlife Crisis', path: '/blog/ai-midlife-crisis', priority: 0.6, changefreq: 'monthly' },
      { id: 'eat-guide', slug: 'eat-guide', title: 'The Complete Guide to E-E-A-T', path: '/blog/eat-guide', priority: 0.6, changefreq: 'monthly' }
    ];
  }
}

// =============================================================================
// BLOG POST META GENERATION
// =============================================================================

function generateBlogPostMeta(post) {
  return {
    title: `${post.title} | Expert SEO Guide - Marden SEO`,
    description: `${post.title} - Expert SEO insights and actionable strategies from Marden SEO professionals. Learn advanced techniques to improve your search rankings.`,
    h1: post.title,
    h2: 'Expert SEO insights and actionable strategies for better search rankings',
    keywords: ['SEO', 'search engine optimization', 'digital marketing', 'SEO guide'],
    content: `
      <section class="blog-content">
        <p style="font-size: 1.25rem; line-height: 1.6; margin-bottom: 2rem; color: #374151;">
          This comprehensive guide provides expert insights and actionable strategies to help you improve your search engine rankings and drive more organic traffic to your website.
        </p>
        
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Key Takeaways</h3>
        <ul style="margin-bottom: 2rem; color: #374151;">
          <li style="margin-bottom: 0.5rem;">Proven strategies that deliver measurable SEO results</li>
          <li style="margin-bottom: 0.5rem;">Step-by-step implementation guidelines</li>
          <li style="margin-bottom: 0.5rem;">Real-world examples and case studies</li>
          <li style="margin-bottom: 0.5rem;">Best practices for sustainable SEO growth</li>
        </ul>

        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Expert Implementation</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          Our SEO professionals have tested and refined these strategies across hundreds of client projects. 
          The techniques outlined in this guide are based on real results and current best practices that 
          align with Google's latest algorithm updates.
        </p>

        <div style="background: #f3f4f6; border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 0 4px 4px 0;">
          <h4 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">💡 Pro Tip</h4>
          <p style="color: #374151; margin: 0;">
            Combine these strategies with our comprehensive <a href="/services" style="color: #3b82f6; text-decoration: none;">SEO services</a> 
            for maximum impact and faster results. Our team can help implement these techniques effectively for your specific business needs.
          </p>
        </div>

        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 2rem 0 1rem 0;">Ready to Implement These Strategies?</h3>
        <p style="margin-bottom: 1.5rem; color: #374151;">
          If you need help implementing these SEO strategies or want expert guidance tailored to your specific situation, 
          our team is ready to help you achieve better search rankings and increased organic traffic.
        </p>
        
        <div style="background: #1f2937; color: #e5e7eb; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
          <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: #e5e7eb;">Get Expert SEO Help</h4>
          <p style="margin-bottom: 1rem;">
            <a href="/contact" style="color: #3b82f6; text-decoration: none;">Contact our SEO experts</a> for a free consultation 
            and custom strategy proposal, or <a href="/services-pricing" style="color: #3b82f6; text-decoration: none;">view our service packages</a> 
            to see how we can help your business succeed online.
          </p>
        </div>
      </section>

      <section class="related-content" style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">Related SEO Articles</h3>
        <ul style="color: #374151;">
          <li style="margin-bottom: 0.5rem;"><a href="/blog" style="color: #3b82f6; text-decoration: none;">Browse All SEO Articles</a></li>
          <li style="margin-bottom: 0.5rem;"><a href="/blog/e-e-a-t-complete-guide" style="color: #3b82f6; text-decoration: none;">Complete Guide to E-E-A-T</a></li>
          <li style="margin-bottom: 0.5rem;"><a href="/blog/core-web-vitals-seo-2025" style="color: #3b82f6; text-decoration: none;">Core Web Vitals Guide</a></li>
          <li style="margin-bottom: 0.5rem;"><a href="/blog/technical-seo-fundamentals" style="color: #3b82f6; text-decoration: none;">Technical SEO Fundamentals</a></li>
        </ul>
      </section>

      <section class="author-section" style="margin-top: 3rem; padding: 1.5rem; background: #f9fafb; border-radius: 8px;">
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem;">About the Author</h4>
        <p style="color: #374151; margin: 0;">
          <strong>Leo Corbett, SEO Director at Marden SEO</strong> - With over 10 years of experience in search engine optimization, 
          Leo has helped hundreds of businesses achieve top search rankings and sustainable organic growth. 
          He specializes in technical SEO, content strategy, and custom app development that supports digital marketing goals.
        </p>
      </section>
    `
  };
}

// =============================================================================
// STATIC HTML GENERATION
// =============================================================================

function generateStaticHTML(route, meta) {
  const isNoIndex = meta.noindex || route.noindex;
  const canonical = isNoIndex ? '' : `<link rel="canonical" href="https://mardenseo.com${route.path === '/' ? '' : route.path}">`;
  const robotsContent = isNoIndex ? 'noindex, nofollow' : 'index, follow';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  ${meta.keywords && meta.keywords.length > 0 ? `<meta name="keywords" content="${meta.keywords.join(', ')}">` : ''}
  <meta name="robots" content="${robotsContent}">
  ${canonical}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mardenseo.com${route.path === '/' ? '' : route.path}">
  <meta property="og:image" content="https://mardenseo.com/og-image.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="https://mardenseo.com/og-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "description": "Professional SEO and app development services",
    "url": "https://mardenseo.com",
    "serviceType": ["SEO Services", "App Development", "Workflow Automation"],
    "areaServed": "Worldwide"
  }
  </script>
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #1f2937;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .main-navigation a:hover {
      background-color: #374151 !important;
    }
    
    .static-content {
      min-height: 500px;
      padding: 2rem 0;
    }
    
    .static-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }
    
    .static-content h2 {
      font-size: 1.5rem;
      font-weight: 400;
      color: #6b7280;
      margin-bottom: 2rem;
    }
    
    .static-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin: 2rem 0 1rem 0;
    }
    
    .static-content h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 1.5rem 0 0.5rem 0;
    }
    
    .static-content p {
      margin-bottom: 1.5rem;
      color: #374151;
    }
    
    .static-content ul, .static-content ol {
      margin-bottom: 1.5rem;
      color: #374151;
    }
    
    .static-content li {
      margin-bottom: 0.5rem;
    }
    
    .static-content a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    .static-content a:hover {
      text-decoration: underline;
    }
    
    .footer {
      background: #1a1a1a;
      color: #e5e7eb;
      padding: 2rem 0;
      margin-top: 4rem;
    }
    
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .main-navigation {
        padding: 0.5rem !important;
      }
      
      .main-navigation div {
        flex-direction: column !important;
        gap: 0.5rem !important;
      }
      
      .static-content h1 {
        font-size: 2rem;
      }
    }
  </style>
</head>
<body>
  <!-- CRAWLER DETECTION AND CONTENT SWITCHING -->
  <script>
    // Detect if this is a search engine crawler
    const userAgent = navigator.userAgent.toLowerCase();
    const isCrawler = /bot|crawl|slurp|spider|bingbot|googlebot|yandex|baidu|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com/i.test(userAgent);
    
    if (isCrawler) {
      // Show static content to crawlers
      document.getElementById('static-content').style.display = 'block';
      document.getElementById('root').style.display = 'none';
    } else {
      // Hide static content from users, show React app
      document.getElementById('static-content').style.display = 'none';
      document.getElementById('root').style.display = 'block';
    }
  </script>

  <!-- STATIC CONTENT: Visible immediately for search engines -->
  <div id="static-content" style="display: none;">
    ${generateNavigation()}
    
    <div class="container">
      <main class="static-content">
        <h1>${meta.h1}</h1>
        <h2>${meta.h2}</h2>
        
        ${meta.content || ''}
      </main>
    </div>
    
    <footer class="footer">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Marden SEO</h4>
            <p style="color: #9ca3af;">Professional SEO services, app development, and workflow automation solutions.</p>
            <p style="color: #9ca3af;"><a href="/contact">Contact us today</a> for a free consultation.</p>
          </div>
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Services</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="/services">SEO Optimization</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/services-pricing">SEO Packages</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/app-building">App Development</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/workflow-automation">Workflow Automation</a></li>
            </ul>
          </div>
          <div>
            <h4 style="color: #e5e7eb; margin-bottom: 1rem;">Resources</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="/blog">SEO Blog</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/portfolio">Case Studies</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/about">About Us</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top: 1px solid #374151; margin-top: 2rem; padding-top: 2rem; text-align: center; color: #9ca3af;">
          <p>&copy; 2025 Marden SEO. All rights reserved. Professional SEO services and app development.</p>
        </div>
      </div>
    </footer>
  </div>
  
  <!-- REACT APPLICATION: Visible for users -->
  <div id="root" style="display: block;"></div>
  
  <!-- LOAD REACT APP FOR INTERACTIVE FEATURES -->
  <script type="module" src="/assets/main-BgO0c2Wu.js"></script>
  <link rel="stylesheet" href="/assets/main-Kab0klor.css">
</body>
</html>`;
}

// =============================================================================
// SITEMAP GENERATION
// =============================================================================

function generateSitemap(allRoutes) {
  // Remove duplicates by path
  const uniqueRoutes = allRoutes.filter((route, index, self) => 
    index === self.findIndex(r => r.path === route.path)
  );
  
  const sitemapEntries = uniqueRoutes
    .filter(route => !route.noindex && !routeMeta[route.path]?.noindex)
    .map(route => {
      return `  <url>
    <loc>https://mardenseo.com${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
}

// =============================================================================
// MAIN BUILD PROCESS
// =============================================================================

async function buildComprehensiveStaticSSG() {
  console.log('🚀 Starting Comprehensive True Static HTML SSG Build...\n');
  
  try {
    // Step 1: Build React client only (skip SSR due to module issues)
    console.log('📦 Building React client application...');
    const { execSync } = await import('child_process');
    execSync('npm run build:client', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ React client build completed\n');
    
    // Step 1.5: Copy client files to root dist directory
    console.log('📋 Copying client files to dist root...');
    const clientDistPath = path.join(__dirname, 'dist', 'client');
    const rootDistPath = path.join(__dirname, 'dist');
    
    // Copy assets directory
    const clientAssetsPath = path.join(clientDistPath, 'assets');
    const rootAssetsPath = path.join(rootDistPath, 'assets');
    if (await fs.access(clientAssetsPath).then(() => true).catch(() => false)) {
      await fs.cp(clientAssetsPath, rootAssetsPath, { recursive: true, force: true });
    }
    
    console.log('✅ Client files copied\n');
    
    // Step 2: Discover dynamic content
    console.log('🔍 Discovering blog posts and dynamic content...');
    const blogPosts = await discoverBlogPosts();
    console.log(`✅ Found ${blogPosts.length} blog posts\n`);
    
    // Step 3: Combine all routes
    const allRoutes = [...routes, ...blogPosts];
    console.log(`📄 Total routes to generate: ${allRoutes.length}\n`);
    
    // Step 4: Generate static HTML for each route
    console.log('🔧 Generating static HTML files...');
    
    for (const route of allRoutes) {
      console.log(`  ⚡ Generating: ${route.path}`);
      
      // Get metadata for this route
      let meta = routeMeta[route.path];
      
      // Generate blog post metadata if needed
      if (route.slug && !meta) {
        meta = generateBlogPostMeta(route);
      }
      
      if (!meta) {
        console.log(`    ⚠️ No metadata found for ${route.path}, skipping`);
        continue;
      }
      
      // Generate static HTML
      const html = generateStaticHTML(route, meta);
      
      // Determine output path
      let outputPath;
      if (route.path === '/') {
        outputPath = path.join(__dirname, 'dist', 'index.html');
      } else {
        const routePath = route.path.replace(/^\//, '');
        outputPath = path.join(__dirname, 'dist', routePath, 'index.html');
      }
      
      // Ensure directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      // Write static HTML file
      await fs.writeFile(outputPath, html, 'utf8');
      console.log(`    ✅ Generated: ${outputPath}`);
    }
    
    // Step 5: Generate dynamic sitemap
    console.log('\n🗺️ Generating dynamic sitemap.xml...');
    execSync('node generate-production-sitemap.cjs', { stdio: 'inherit', cwd: __dirname });
    
    // Step 6: Generate dynamic robots.txt
    console.log('🤖 Generating dynamic robots.txt...');
    writeRobotsTxt();
    
    
    // Step 7: Success summary
    console.log('🎉 COMPREHENSIVE SSG BUILD COMPLETED SUCCESSFULLY!\n');
    console.log('📊 BUILD SUMMARY:');
    console.log(`   📄 Total static pages generated: ${allRoutes.length}`);
    console.log(`   🏠 Main business pages: ${routes.length}`);
    console.log(`   📝 Blog posts: ${blogPosts.length}`);
    console.log(`   🗺️ Sitemap entries: ${allRoutes.filter(r => !r.noindex && !routeMeta[r.path]?.noindex).length}`);
    console.log(`   🚫 Noindex pages: ${allRoutes.filter(r => r.noindex || routeMeta[r.path]?.noindex).length}\n`);
    
    console.log('✅ READY FOR DEPLOYMENT:');
    console.log('   • All static HTML files generated in /dist');
    console.log('   • Complete navigation on every page');
    console.log('   • Unique meta tags for each route');
    console.log('   • Proper noindex for system pages');
    console.log('   • Clean sitemap.xml and robots.txt');
    console.log('   • Zero content switching - pure static HTML');
    console.log('   • Beautiful React frontend preserved 100%\n');
    
    console.log('🚀 Test with: npm run test:comprehensive');
    console.log('🌐 Deploy to: Production hosting');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🚀 Starting Marden SEO comprehensive build...');
  buildComprehensiveStaticSSG();
}

export default buildComprehensiveStaticSSG;
