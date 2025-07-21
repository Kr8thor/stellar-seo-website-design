#!/usr/bin/env node

/**
 * 🚀 GENERATE MISSING PAGES FOR MARDEN SEO WEBSITE
 * Creates the 4 missing pages identified by the SEO fix script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎯 GENERATING MISSING PAGES FOR MARDEN SEO WEBSITE');
console.log('=====================================================');

const DIST_DIR = path.join(__dirname, 'dist');

// Missing pages to generate
const missingPages = [
  {
    route: '/services-pricing',
    title: 'SEO Services & Pricing Packages | Transparent Pricing, Measurable Results - Marden SEO',
    description: 'View our transparent SEO pricing packages. Choose from Starter, Professional, or Enterprise plans. All packages include technical SEO, content optimization, and performance tracking.',
    h1: 'SEO Services & Pricing Packages',
    content: `
      <section class="pricing-intro">
        <h2>Transparent Pricing, Measurable Results</h2>
        <p>Choose the SEO package that fits your business goals. All plans include comprehensive optimization, monthly reporting, and dedicated support.</p>
      </section>
      
      <section class="pricing-packages">
        <h3>SEO Service Packages</h3>
        
        <div class="package starter">
          <h4>Starter SEO Package</h4>
          <p><strong>Perfect for small businesses</strong></p>
          <ul>
            <li>Technical SEO audit and optimization</li>
            <li>Keyword research and strategy</li>
            <li>On-page optimization (up to 10 pages)</li>
            <li>Google Business Profile optimization</li>
            <li>Monthly performance report</li>
          </ul>
          <p><a href="/contact">Get Started with Starter Package</a></p>
        </div>
        
        <div class="package professional">
          <h4>Professional SEO Package</h4>
          <p><strong>Most popular for growing businesses</strong></p>
          <ul>
            <li>Everything in Starter package</li>
            <li>Content strategy and creation</li>
            <li>Link building and outreach</li>
            <li>Competitor analysis</li>
            <li>Advanced schema markup</li>
            <li>Bi-weekly performance reports</li>
          </ul>
          <p><a href="/contact">Choose Professional Package</a></p>
        </div>
        
        <div class="package enterprise">
          <h4>Enterprise SEO Package</h4>
          <p><strong>For businesses requiring comprehensive SEO</strong></p>
          <ul>
            <li>Everything in Professional package</li>
            <li>Custom app development integration</li>
            <li>Workflow automation setup</li>
            <li>Advanced analytics and tracking</li>
            <li>Priority support</li>
            <li>Weekly strategy calls</li>
          </ul>
          <p><a href="/contact">Contact for Enterprise Pricing</a></p>
        </div>
      </section>
      
      <section class="additional-services">
        <h3>Additional Services</h3>
        <ul>
          <li><a href="/app-building">Custom App Development</a> - React applications that support your SEO goals</li>
          <li><a href="/workflow-automation">Workflow Automation</a> - n8n automation to streamline your business processes</li>
          <li><a href="/services">Complete SEO Services</a> - Learn more about our comprehensive approach</li>
        </ul>
      </section>
    `
  },
  {
    route: '/blog/local-seo-2025',
    title: 'Local SEO in 2025: How to Dominate the Map Pack | Marden SEO Blog',
    description: 'Master local SEO in 2025 with our comprehensive guide. Learn proven strategies to dominate Google Map Pack, increase local visibility, and drive more customers to your business.',
    h1: 'Local SEO in 2025: How to Dominate the Map Pack',
    content: `
      <article class="blog-post">
        <div class="post-meta">
          <span class="category">Local SEO</span>
          <span class="read-time">15 min read</span>
          <span class="date">July 14, 2025</span>
        </div>
        
        <div class="post-excerpt">
          <p><strong>In 2025, dominating the Map Pack isn't optional. It's survival.</strong> The top 3 spots on Google's local results are the modern storefront—where clicks become calls, and calls become money.</p>
        </div>
        
        <section class="post-content">
          <h2>What Is the Map Pack?</h2>
          <p>The Map Pack is that crucial box at the top of Google search results showing a map with the top 3 local businesses. It's above the fold, above organic results, and where your future customers look when they want something right now.</p>
          
          <div class="callout important">
            <p><strong>Critical Insight:</strong> If your business isn't in the Map Pack, you're not just losing traffic—you're losing revenue to competitors who understand local SEO.</p>
          </div>
          
          <h2>The Local SEO Landscape in 2025</h2>
          <p>Local SEO has evolved beyond just "who's closest." It's now about who's trusted, relevant, and locally famous online. AI-driven search and hyper-personalized results are changing the game.</p>
          
          <h3>Key Ranking Factors for 2025:</h3>
          <ul>
            <li><strong>Google Business Profile Optimization:</strong> Complete, accurate, and regularly updated profiles</li>
            <li><strong>Review Quality and Quantity:</strong> Recent, authentic reviews with business responses</li>
            <li><strong>Local Content Authority:</strong> Location-specific content that demonstrates local expertise</li>
            <li><strong>Technical Local SEO:</strong> Structured data, local schema markup, and site performance</li>
            <li><strong>Citation Consistency:</strong> NAP (Name, Address, Phone) consistency across all platforms</li>
          </ul>
          
          <h2>Actionable Local SEO Strategies</h2>
          
          <h3>1. Google Business Profile Mastery</h3>
          <p>Your Google Business Profile is your local SEO foundation. Optimize every section:</p>
          <ul>
            <li>Complete all profile sections with accurate information</li>
            <li>Add high-quality photos regularly</li>
            <li>Post updates, offers, and events weekly</li>
            <li>Respond to all reviews within 24 hours</li>
            <li>Use relevant keywords in your business description</li>
          </ul>
          
          <h3>2. Local Content Strategy</h3>
          <p>Create content that demonstrates local expertise and serves your community:</p>
          <ul>
            <li>Local industry guides and resources</li>
            <li>Community event coverage</li>
            <li>Local customer success stories</li>
            <li>Area-specific service pages</li>
          </ul>
          
          <h3>3. Review Management System</h3>
          <p>Implement a systematic approach to gathering and managing reviews:</p>
          <ul>
            <li>Follow up with customers 3-5 days after service</li>
            <li>Make leaving reviews easy with direct links</li>
            <li>Respond professionally to all reviews</li>
            <li>Address negative reviews promptly and publicly</li>
          </ul>
          
          <div class="callout tip">
            <p><strong>Pro Tip:</strong> The businesses that dominate local search in 2025 are those that treat their Google Business Profile like a social media account—posting regularly, engaging with customers, and staying active.</p>
          </div>
          
          <h2>Measuring Local SEO Success</h2>
          <p>Track these key metrics to measure your local SEO performance:</p>
          <ul>
            <li>Map Pack ranking positions for target keywords</li>
            <li>Google Business Profile views and actions</li>
            <li>Direction requests and phone calls</li>
            <li>Website traffic from local searches</li>
            <li>Review acquisition rate and average rating</li>
          </ul>
          
          <h2>Common Local SEO Mistakes to Avoid</h2>
          <ul>
            <li>Inconsistent NAP information across platforms</li>
            <li>Ignoring customer reviews and questions</li>
            <li>Keyword stuffing in business descriptions</li>
            <li>Neglecting local content creation</li>
            <li>Not tracking local search performance</li>
          </ul>
          
          <h2>Ready to Dominate Local Search?</h2>
          <p>Local SEO in 2025 requires a strategic, consistent approach. If you're ready to take your local visibility to the next level, we can help you develop and implement a comprehensive local SEO strategy.</p>
          <p><a href="/contact">Contact us for a free local SEO audit</a> and discover how to outrank your competitors in the Map Pack.</p>
        </section>
        
        <div class="author-bio">
          <h3>About the Author</h3>
          <p><strong>Leo Corbett</strong> is an SEO expert specializing in local search optimization and helping businesses dominate their local markets. With over 10 years of experience, Leo has helped hundreds of businesses achieve top rankings in Google's Map Pack.</p>
        </div>
      </article>
    `
  },
  {
    route: '/blog/ai-midlife-crisis',
    title: 'AI & SEO: How AI is Reshaping Search in 2025 | Marden SEO Blog',
    description: 'Discover how AI is transforming SEO in 2025. Learn about SGE, ChatGPT, and how to optimize your content for AI-powered search engines and voice assistants.',
    h1: 'AI & SEO: How Artificial Intelligence is Reshaping Search',
    content: `
      <article class="blog-post">
        <div class="post-meta">
          <span class="category">AI & Technology</span>
          <span class="read-time">12 min read</span>
          <span class="date">July 10, 2025</span>
        </div>
        
        <div class="post-excerpt">
          <p><strong>AI isn't just changing SEO—it's rewriting the entire playbook.</strong> From Google's SGE to ChatGPT integration, the search landscape is evolving faster than ever before.</p>
        </div>
        
        <section class="post-content">
          <h2>The AI Revolution in Search</h2>
          <p>We're in the midst of the biggest shift in search since Google launched. AI-powered search engines are changing how users find information and how businesses need to optimize their content.</p>
          
          <h3>Key AI Developments Affecting SEO:</h3>
          <ul>
            <li><strong>Google's Search Generative Experience (SGE):</strong> AI-generated answers appear above traditional results</li>
            <li><strong>ChatGPT Integration:</strong> Conversational search becoming mainstream</li>
            <li><strong>Voice Search Evolution:</strong> More natural language queries</li>
            <li><strong>Visual Search Advancement:</strong> AI-powered image and video search</li>
          </ul>
          
          <h2>How AI is Changing User Search Behavior</h2>
          <p>Users are shifting from simple keyword searches to complex, conversational queries. They expect immediate, comprehensive answers rather than a list of links to explore.</p>
          
          <div class="callout insight">
            <p><strong>Key Insight:</strong> The goal is no longer to rank #1 in traditional search results—it's to be the source that AI systems trust and cite when generating answers.</p>
          </div>
          
          <h2>Optimizing for AI-Powered Search</h2>
          
          <h3>1. Create Comprehensive, Authoritative Content</h3>
          <p>AI systems favor content that thoroughly covers topics from multiple angles:</p>
          <ul>
            <li>Answer related questions within your content</li>
            <li>Provide step-by-step instructions</li>
            <li>Include relevant examples and case studies</li>
            <li>Cover topic clusters, not just individual keywords</li>
          </ul>
          
          <h3>2. Structure Content for AI Understanding</h3>
          <p>Make it easy for AI to parse and understand your content:</p>
          <ul>
            <li>Use clear headings and subheadings</li>
            <li>Implement proper schema markup</li>
            <li>Create FAQ sections for common questions</li>
            <li>Use bullet points and numbered lists</li>
          </ul>
          
          <h3>3. Focus on E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness)</h3>
          <p>AI systems prioritize content from trusted, authoritative sources:</p>
          <ul>
            <li>Establish clear author credentials</li>
            <li>Include citations and references</li>
            <li>Build topical authority in your niche</li>
            <li>Maintain consistent, accurate information</li>
          </ul>
          
          <h2>Optimizing for Voice and Conversational Search</h2>
          <p>As AI makes search more conversational, optimize for natural language queries:</p>
          <ul>
            <li>Target long-tail, question-based keywords</li>
            <li>Create content that answers "who," "what," "where," "when," "why," and "how" questions</li>
            <li>Optimize for local voice searches</li>
            <li>Ensure fast page load times for voice search results</li>
          </ul>
          
          <h2>The Future of SEO in an AI World</h2>
          
          <h3>What's Changing:</h3>
          <ul>
            <li>Traditional keyword optimization becoming less important</li>
            <li>Content quality and comprehensiveness more critical</li>
            <li>User intent understanding paramount</li>
            <li>Real-time content freshness increasingly valued</li>
          </ul>
          
          <h3>What Remains Important:</h3>
          <ul>
            <li>Technical SEO fundamentals</li>
            <li>Page speed and user experience</li>
            <li>Mobile optimization</li>
            <li>Building authoritative backlinks</li>
          </ul>
          
          <div class="callout warning">
            <p><strong>Important:</strong> Don't abandon traditional SEO practices entirely. AI-powered search still relies on many fundamental SEO principles, but the emphasis and implementation are evolving.</p>
          </div>
          
          <h2>Practical Steps for AI-Ready SEO</h2>
          
          <h3>Immediate Actions:</h3>
          <ol>
            <li>Audit your content for comprehensiveness and accuracy</li>
            <li>Implement structured data markup across your site</li>
            <li>Create detailed FAQ sections for your services</li>
            <li>Optimize for featured snippets and answer boxes</li>
            <li>Monitor AI search results for your target keywords</li>
          </ol>
          
          <h3>Long-term Strategy:</h3>
          <ol>
            <li>Develop topical authority in your industry</li>
            <li>Create content that serves as definitive resources</li>
            <li>Build relationships with other authoritative sites</li>
            <li>Stay updated on AI search developments</li>
            <li>Test and iterate based on AI search performance</li>
          </ol>
          
          <h2>Tools for AI-Era SEO</h2>
          <p>Leverage these tools to optimize for AI-powered search:</p>
          <ul>
            <li><strong>Google's AI Test Kitchen:</strong> Experiment with SGE features</li>
            <li><strong>ChatGPT and Claude:</strong> Test how AI interprets your content</li>
            <li><strong>Answer The Public:</strong> Find question-based keywords</li>
            <li><strong>Schema.org Validator:</strong> Ensure proper structured data</li>
            <li><strong>Google Search Console:</strong> Monitor performance changes</li>
          </ul>
          
          <h2>Preparing for the AI Future</h2>
          <p>The intersection of AI and SEO will continue evolving rapidly. Success requires staying informed, testing continuously, and focusing on creating genuinely valuable content that serves user intent.</p>
          
          <p>Remember: AI doesn't replace the need for great SEO—it amplifies the importance of doing SEO right.</p>
          
          <p><a href="/contact">Need help adapting your SEO strategy for the AI era?</a> We specialize in creating AI-ready SEO strategies that future-proof your search visibility.</p>
        </section>
        
        <div class="author-bio">
          <h3>About the Author</h3>
          <p><strong>Leo Corbett</strong> specializes in cutting-edge SEO strategies and AI integration. With extensive experience in technical SEO and emerging search technologies, Leo helps businesses adapt to the evolving search landscape.</p>
        </div>
      </article>
    `
  },
  {
    route: '/blog/on-page-seo-tactics-2025',
    title: '10 On-Page SEO Tactics That Still Work in 2025 | Marden SEO Blog',
    description: 'Discover the most effective on-page SEO tactics for 2025. Learn proven strategies for title tags, meta descriptions, internal linking, and content optimization that drive rankings.',
    h1: '10 On-Page SEO Tactics That Still Work in 2025',
    content: `
      <article class="blog-post">
        <div class="post-meta">
          <span class="category">On-Page SEO</span>
          <span class="read-time">8 min read</span>
          <span class="date">July 8, 2025</span>
        </div>
        
        <div class="post-excerpt">
          <p><strong>While SEO tactics come and go, these 10 on-page optimization strategies have proven their staying power.</strong> Master these fundamentals to build a solid foundation for search success in 2025.</p>
        </div>
        
        <section class="post-content">
          <h2>Why On-Page SEO Still Matters</h2>
          <p>Despite all the algorithm changes and AI advancements, on-page SEO remains the foundation of search optimization. These tactics help search engines understand your content and improve user experience.</p>
          
          <h2>1. Strategic Title Tag Optimization</h2>
          <p>Your title tag is still one of the most important ranking factors. Here's how to optimize it for 2025:</p>
          <ul>
            <li><strong>Length:</strong> Keep titles between 50-60 characters</li>
            <li><strong>Keywords:</strong> Include your primary keyword near the beginning</li>
            <li><strong>Uniqueness:</strong> Every page should have a unique title</li>
            <li><strong>Branding:</strong> Include your brand name when space allows</li>
            <li><strong>Intent:</strong> Match the searcher's intent with your title</li>
          </ul>
          
          <div class="example">
            <p><strong>Example:</strong> Instead of "SEO Services - Marden SEO" use "Professional SEO Services That Boost Rankings & Traffic | Marden SEO"</p>
          </div>
          
          <h2>2. Compelling Meta Descriptions</h2>
          <p>While not a direct ranking factor, meta descriptions significantly impact click-through rates:</p>
          <ul>
            <li>Write 150-160 characters maximum</li>
            <li>Include a clear call-to-action</li>
            <li>Use active voice and action words</li>
            <li>Include your target keyword naturally</li>
            <li>Highlight unique value propositions</li>
          </ul>
          
          <h2>3. Header Tag Hierarchy (H1-H6)</h2>
          <p>Proper header structure helps both users and search engines understand your content:</p>
          <ul>
            <li><strong>H1:</strong> One per page, contains primary keyword</li>
            <li><strong>H2:</strong> Main section headers, include secondary keywords</li>
            <li><strong>H3-H6:</strong> Subsections, maintain logical hierarchy</li>
            <li>Use headers to break up long content</li>
            <li>Include relevant keywords naturally</li>
          </ul>
          
          <h2>4. Internal Linking Strategy</h2>
          <p>Strategic internal linking distributes page authority and helps users navigate:</p>
          <ul>
            <li>Link to relevant, related content</li>
            <li>Use descriptive anchor text</li>
            <li>Link deep into your site, not just to the homepage</li>
            <li>Create topic clusters with pillar pages</li>
            <li>Ensure every page is reachable within 3 clicks</li>
          </ul>
          
          <div class="callout tip">
            <p><strong>Pro Tip:</strong> Create content hubs around your main topics and link related articles together to build topical authority.</p>
          </div>
          
          <h2>5. Image Optimization</h2>
          <p>Optimize images for both search engines and user experience:</p>
          <ul>
            <li><strong>Alt Text:</strong> Descriptive, keyword-relevant alt attributes</li>
            <li><strong>File Names:</strong> Use descriptive file names with keywords</li>
            <li><strong>File Size:</strong> Compress images for faster loading</li>
            <li><strong>Format:</strong> Use modern formats like WebP when possible</li>
            <li><strong>Captions:</strong> Add captions when they provide value</li>
          </ul>
          
          <h2>6. URL Structure Optimization</h2>
          <p>Clean, descriptive URLs help with both SEO and user experience:</p>
          <ul>
            <li>Keep URLs short and descriptive</li>
            <li>Use hyphens to separate words</li>
            <li>Include target keywords in the URL</li>
            <li>Avoid unnecessary parameters and numbers</li>
            <li>Use lowercase letters only</li>
          </ul>
          
          <h2>7. Content Depth and Quality</h2>
          <p>In 2025, content quality matters more than ever:</p>
          <ul>
            <li>Cover topics comprehensively</li>
            <li>Answer related questions within your content</li>
            <li>Use data and examples to support your points</li>
            <li>Update content regularly to maintain freshness</li>
            <li>Write for your audience, not just search engines</li>
          </ul>
          
          <h2>8. Schema Markup Implementation</h2>
          <p>Structured data helps search engines understand your content better:</p>
          <ul>
            <li>Implement relevant schema types for your content</li>
            <li>Use JSON-LD format when possible</li>
            <li>Test your markup with Google's Rich Results Test</li>
            <li>Focus on Article, Organization, and LocalBusiness schemas</li>
            <li>Include review and FAQ schemas when applicable</li>
          </ul>
          
          <h2>9. Page Speed Optimization</h2>
          <p>Core Web Vitals are crucial ranking factors:</p>
          <ul>
            <li><strong>Largest Contentful Paint (LCP):</strong> Optimize images and server response times</li>
            <li><strong>First Input Delay (FID):</strong> Minimize JavaScript execution time</li>
            <li><strong>Cumulative Layout Shift (CLS):</strong> Prevent unexpected layout shifts</li>
            <li>Use lazy loading for images</li>
            <li>Minimize CSS and JavaScript files</li>
          </ul>
          
          <h2>10. Mobile-First Optimization</h2>
          <p>With mobile-first indexing, mobile optimization is non-negotiable:</p>
          <ul>
            <li>Ensure responsive design across all devices</li>
            <li>Test touch functionality and button sizes</li>
            <li>Optimize for mobile page speed</li>
            <li>Make content easily readable on small screens</li>
            <li>Ensure forms work well on mobile devices</li>
          </ul>
          
          <h2>Measuring On-Page SEO Success</h2>
          <p>Track these metrics to measure your on-page optimization efforts:</p>
          <ul>
            <li>Organic search rankings for target keywords</li>
            <li>Click-through rates from search results</li>
            <li>Page load speeds and Core Web Vitals</li>
            <li>Time on page and bounce rate</li>
            <li>Internal link click-through rates</li>
          </ul>
          
          <h2>Common On-Page SEO Mistakes</h2>
          <ul>
            <li>Keyword stuffing in titles and content</li>
            <li>Duplicate or missing meta descriptions</li>
            <li>Poor internal linking structure</li>
            <li>Ignoring image optimization</li>
            <li>Neglecting mobile optimization</li>
          </ul>
          
          <div class="callout important">
            <p><strong>Remember:</strong> On-page SEO is about creating the best possible experience for your users while making it easy for search engines to understand and rank your content.</p>
          </div>
          
          <h2>Ready to Optimize Your On-Page SEO?</h2>
          <p>These 10 tactics form the foundation of effective on-page optimization in 2025. Implement them systematically, and you'll see improvements in both search rankings and user engagement.</p>
          
          <p><a href="/contact">Need help implementing these on-page SEO tactics?</a> We can audit your site and create a comprehensive optimization plan.</p>
        </section>
        
        <div class="author-bio">
          <h3>About the Author</h3>
          <p><strong>Leo Corbett</strong> is an SEO specialist with expertise in on-page optimization and technical SEO. He has helped numerous businesses improve their search rankings through strategic on-page improvements.</p>
        </div>
      </article>
    `
  }
];

/**
 * Generate HTML template for a page
 */
function generateHTMLTemplate(pageData) {
  const { route, title, description, h1, content } = pageData;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://mardenseo.com${route}">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://mardenseo.com${route}">
  <meta property="og:type" content="${route.startsWith('/blog/') ? 'article' : 'website'}">
  <meta property="og:image" content="https://mardenseo.com/opengraph-image.png">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@mardenseo">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://mardenseo.com/opengraph-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
  
  <!-- CSS Styles -->
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    h1 {
      color: #1f2937;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 0.5rem;
    }
    
    h2 {
      color: #374151;
      font-size: 1.8rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }
    
    h3 {
      color: #4b5563;
      font-size: 1.4rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    
    h4 {
      color: #6b7280;
      font-size: 1.2rem;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin-bottom: 1rem;
      text-align: justify;
    }
    
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    
    a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    
    .callout {
      padding: 1rem;
      margin: 1.5rem 0;
      border-radius: 6px;
      border-left: 4px solid;
    }
    
    .callout.important {
      background-color: #fef3c7;
      border-color: #f59e0b;
    }
    
    .callout.tip {
      background-color: #ecfdf5;
      border-color: #10b981;
    }
    
    .callout.warning {
      background-color: #fee2e2;
      border-color: #ef4444;
    }
    
    .callout.insight {
      background-color: #ede9fe;
      border-color: #8b5cf6;
    }
    
    .example {
      background-color: #f3f4f6;
      padding: 1rem;
      border-radius: 6px;
      margin: 1rem 0;
      border-left: 4px solid #6b7280;
    }
    
    .post-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    .post-meta span {
      background-color: #f3f4f6;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
    }
    
    .post-excerpt {
      background-color: #f8fafc;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border-left: 4px solid #3b82f6;
    }
    
    .author-bio {
      background-color: #f9fafb;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 3rem;
      border-top: 3px solid #3b82f6;
    }
    
    .package {
      background-color: #f8fafc;
      padding: 1.5rem;
      margin: 1rem 0;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .navigation {
      text-align: center;
      margin: 2rem 0;
    }
    
    .navigation a {
      display: inline-block;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border-radius: 4px;
      text-decoration: none;
    }
    
    .navigation a:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${h1}</h1>
    </header>
    
    <main>
      ${content}
    </main>
    
    <nav class="navigation">
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</body>
</html>`;
}

/**
 * Create directory if it doesn't exist
 */
function ensureDirectory(dirPath) {
  try {
    fs.accessSync(dirPath);
  } catch {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

/**
 * Generate all missing pages
 */
function generateMissingPages() {
  console.log(`📁 Working directory: ${DIST_DIR}`);
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Please run a React build first.');
    process.exit(1);
  }
  
  console.log('🚀 Generating missing pages...\n');
  
  for (const pageData of missingPages) {
    const { route } = pageData;
    
    console.log(`📄 Generating: ${route}`);
    
    // Determine file path
    let filePath;
    if (route === '/') {
      filePath = path.join(DIST_DIR, 'index.html');
    } else {
      const routePath = route.substring(1); // Remove leading slash
      const dirPath = path.join(DIST_DIR, routePath);
      filePath = path.join(dirPath, 'index.html');
      
      // Create directory
      ensureDirectory(dirPath);
    }
    
    // Generate HTML content
    const htmlContent = generateHTMLTemplate(pageData);
    
    // Write file
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`✅ Generated: ${filePath}`);
  }
  
  console.log('\n🎉 ALL MISSING PAGES GENERATED!');
  console.log('=================================');
  console.log(`✅ Created ${missingPages.length} missing pages:`);
  missingPages.forEach(page => {
    console.log(`   • ${page.route}`);
  });
  console.log('\n📋 Next Steps:');
  console.log('1. Run the SEO fix script: npm run fix:seo');
  console.log('2. Test the pages locally: npm run serve:static');
  console.log('3. Deploy to production when ready');
}

// Run the generator
generateMissingPages();
