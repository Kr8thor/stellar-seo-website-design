
import { useEffect } from 'react';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SitemapGenerator = () => {
  useEffect(() => {
    const generateSitemap = () => {
      const baseUrl = 'https://mardenseo.com';
      const urls: SitemapUrl[] = [
        {
          loc: baseUrl,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 1.0
        },
        {
          loc: `${baseUrl}/about`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          loc: `${baseUrl}/services`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.9
        },
        {
          loc: `${baseUrl}/portfolio`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.7
        },
        {
          loc: `${baseUrl}/blog`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          loc: `${baseUrl}/contact`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          loc: `${baseUrl}/app-building`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          loc: `${baseUrl}/workflow-automation`,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: 0.8
        }
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

      // In a real implementation, you would send this to your server
      console.log('Generated sitemap:', sitemap);
    };

    // Generate sitemap on component mount
    generateSitemap();
  }, []);

  return null; // This component doesn't render anything
};

export default SitemapGenerator;
