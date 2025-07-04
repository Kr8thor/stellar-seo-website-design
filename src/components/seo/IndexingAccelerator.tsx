/**
 * Indexing Status Checker and Accelerator
 * Helps diagnose and fix indexing issues
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw,
  Search,
  Globe,
  FileText,
  Clock
} from 'lucide-react';

interface PageStatus {
  url: string;
  exists: boolean;
  hasTitle: boolean;
  hasDescription: boolean;
  hasCanonical: boolean;
  hasSchema: boolean;
  responseTime?: number;
  status?: 'success' | 'error' | 'warning';
}

const IndexingAccelerator: React.FC = () => {
  const [pageStatuses, setPageStatuses] = useState<PageStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([]);

  // Core pages that should definitely exist
  const corePages = [
    'https://mardenseo.com/',
    'https://mardenseo.com/about',
    'https://mardenseo.com/services', 
    'https://mardenseo.com/portfolio',
    'https://mardenseo.com/blog',
    'https://mardenseo.com/contact',
    'https://mardenseo.com/app-building',
    'https://mardenseo.com/workflow-automation'
  ];

  const checkPageStatus = async (url: string): Promise<PageStatus> => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        // For pages that exist, check SEO elements
        const fullResponse = await fetch(url);
        const html = await fullResponse.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const hasTitle = !!doc.querySelector('title')?.textContent;
        const hasDescription = !!doc.querySelector('meta[name="description"]')?.getAttribute('content');
        const hasCanonical = !!doc.querySelector('link[rel="canonical"]');
        const hasSchema = !!doc.querySelector('script[type="application/ld+json"]');
        
        return {
          url,
          exists: true,
          hasTitle,
          hasDescription,
          hasCanonical,
          hasSchema,
          responseTime,
          status: 'success'
        };
      } else {
        return {
          url,
          exists: false,
          hasTitle: false,
          hasDescription: false,
          hasCanonical: false,
          hasSchema: false,
          responseTime,
          status: 'error'
        };
      }
    } catch (error) {
      return {
        url,
        exists: false,
        hasTitle: false,
        hasDescription: false,
        hasCanonical: false,
        hasSchema: false,
        status: 'error'
      };
    }
  };

  const checkAllPages = async () => {
    setIsChecking(true);
    const results = await Promise.all(
      corePages.map(url => checkPageStatus(url))
    );
    setPageStatuses(results);
    setIsChecking(false);
  };

  const requestIndexing = (url: string) => {
    // Open Google Search Console URL Inspection tool
    const gscUrl = `https://search.google.com/search-console/inspect?resource_id=https://mardenseo.com/&id=${encodeURIComponent(url)}`;
    window.open(gscUrl, '_blank');
  };

  const getSitemapStatus = () => {
    return {
      total: corePages.length,
      existing: pageStatuses.filter(p => p.exists).length,
      missing: pageStatuses.filter(p => !p.exists).length,
      seoComplete: pageStatuses.filter(p => p.hasTitle && p.hasDescription && p.hasCanonical && p.hasSchema).length
    };
  };

  useEffect(() => {
    checkAllPages();
  }, []);

  const status = getSitemapStatus();

  return (
    <div className="space-y-6">
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{status.existing}</div>
              <div className="text-sm text-muted-foreground">Pages Found</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{status.missing}</div>
              <div className="text-sm text-muted-foreground">Pages Missing</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{status.seoComplete}</div>
              <div className="text-sm text-muted-foreground">SEO Complete</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Button 
                onClick={checkAllPages} 
                disabled={isChecking}
                size="sm"
                className="w-full"
              >
                {isChecking ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                {isChecking ? 'Checking...' : 'Recheck'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Page Status Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Page Indexing Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pageStatuses.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {page.exists ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  
                  <div>
                    <div className="font-medium">
                      {page.url.replace('https://mardenseo.com', '') || '/'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {page.responseTime && `${page.responseTime}ms • `}
                      SEO: {[page.hasTitle && 'Title', page.hasDescription && 'Desc', page.hasCanonical && 'Canonical', page.hasSchema && 'Schema'].filter(Boolean).join(', ') || 'Incomplete'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {page.exists && (
                    <>
                      <Badge variant={page.hasTitle && page.hasDescription && page.hasCanonical ? 'default' : 'secondary'}>
                        {page.hasTitle && page.hasDescription && page.hasCanonical ? 'Ready' : 'Needs Work'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => requestIndexing(page.url)}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Index
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Immediate Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Immediate Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => window.open('https://search.google.com/search-console/sitemaps', '_blank')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Resubmit Sitemap in GSC
            </Button>
            
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => window.open('https://search.google.com/search-console/inspect', '_blank')}
            >
              <Search className="h-4 w-4 mr-2" />
              Request Indexing for Key Pages
            </Button>
            
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => window.open('https://mardenseo.com/sitemap.xml', '_blank')}
            >
              <Globe className="h-4 w-4 mr-2" />
              Check New Sitemap
            </Button>
          </CardContent>
        </Card>

        {/* Indexing Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Indexing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Clean sitemap now contains only real pages</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Fixed future dates that confused Google</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Removed non-existent URLs causing 404s</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Request indexing for each page individually</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span>Monitor GSC for crawl errors</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndexingAccelerator;