/**
 * Dynamic Sitemap Generator
 * Automatically generates sitemap with blog posts and dynamic content
 */

import { blogPosts } from '@/data/blogPosts';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const staticPages: SitemapEntry[] = [
  {
    url: 'https://mardenseo.com/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: 'https://mardenseo.com/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'https://mardenseo.com/services',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: 'https://mardenseo.com/services-pricing',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: 'https://mardenseo.com/app-building',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'https://mardenseo.com/workflow-automation',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: 'https://mardenseo.com/portfolio',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: 'https://mardenseo.com/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: 'https://mardenseo.com/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  }
];

const caseStudyPages: SitemapEntry[] = [
  {
    url: 'https://mardenseo.com/case-study/1',
    lastmod: '2024-01-01',
    changefreq: 'yearly',
    priority: '0.6'
  }
];

export const generateSitemap = (): string => {
  // Generate blog post entries
  const blogEntries: SitemapEntry[] = blogPosts.map(post => ({
    url: `https://mardenseo.com/blog/${post.id}`,
    lastmod: post.lastModified || post.date || new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.6'
  }));

  // Combine all entries
  const allEntries = [...staticPages, ...blogEntries, ...caseStudyPages];

  // Generate XML sitemap
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export const saveSitemapToFile = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default generateSitemap;