/**
 * SEO Monitoring and Validation
 * Tools for tracking SEO performance and validating implementation
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  recommendation?: string;
}

export const SEOValidator: React.FC = () => {
  const [checks, setChecks] = useState<SEOCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performSEOChecks();
  }, []);

  const performSEOChecks = async () => {
    setLoading(true);
    const seoChecks: SEOCheck[] = [];

    // Check page title
    const title = document.title;
    seoChecks.push({
      name: 'Page Title',
      status: title && title.length >= 30 && title.length <= 60 ? 'pass' : 'warning',
      message: title ? `Title length: ${title.length} characters` : 'No title found',
      recommendation: 'Keep titles between 30-60 characters for optimal display in search results'
    });

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    seoChecks.push({
      name: 'Meta Description',
      status: metaDescription && metaDescription.length >= 120 && metaDescription.length <= 160 ? 'pass' : 'warning',
      message: metaDescription ? `Description length: ${metaDescription.length} characters` : 'No meta description found',
      recommendation: 'Keep meta descriptions between 120-160 characters'
    });

    // Check canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    seoChecks.push({
      name: 'Canonical URL',
      status: canonical ? 'pass' : 'fail',
      message: canonical ? 'Canonical URL present' : 'No canonical URL found',
      recommendation: 'Add canonical URLs to prevent duplicate content issues'
    });

    // Check Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    
    seoChecks.push({
      name: 'Open Graph Tags',
      status: ogTitle && ogDescription && ogImage ? 'pass' : 'warning',
      message: `OG tags found: ${[ogTitle, ogDescription, ogImage].filter(Boolean).length}/3`,
      recommendation: 'Implement all Open Graph tags for better social media sharing'
    });

    // Check structured data
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    seoChecks.push({
      name: 'Structured Data',
      status: structuredData.length > 0 ? 'pass' : 'warning',
      message: `${structuredData.length} structured data scripts found`,
      recommendation: 'Add structured data for rich snippets in search results'
    });

    // Check image alt attributes
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
    seoChecks.push({
      name: 'Image Alt Text',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'warning',
      message: `${imagesWithoutAlt.length} images without alt text`,
      recommendation: 'Add descriptive alt text to all images for accessibility and SEO'
    });

    // Check heading structure
    const h1s = document.querySelectorAll('h1');
    seoChecks.push({
      name: 'Heading Structure',
      status: h1s.length === 1 ? 'pass' : 'warning',
      message: `${h1s.length} H1 tags found`,
      recommendation: 'Use exactly one H1 tag per page for optimal SEO'
    });

    setChecks(seoChecks);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pass: 'bg-green-100 text-green-800',
      fail: 'bg-red-100 text-red-800', 
      warning: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">Analyzing SEO implementation...</div>
        </CardContent>
      </Card>
    );
  }

  const passCount = checks.filter(check => check.status === 'pass').length;
  const totalChecks = checks.length;
  const score = Math.round((passCount / totalChecks) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          SEO Analysis
          <Badge className={score >= 80 ? 'bg-green-100 text-green-800' : score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
            Score: {score}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checks.map((check, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
              {getStatusIcon(check.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{check.name}</h4>
                  {getStatusBadge(check.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{check.message}</p>
                {check.recommendation && (
                  <p className="text-xs text-gray-500 italic">{check.recommendation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex space-x-2">
          <Button onClick={performSEOChecks} variant="outline" size="sm">
            Recheck
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Test Rich Results
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOValidator;