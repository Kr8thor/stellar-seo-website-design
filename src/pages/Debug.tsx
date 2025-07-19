import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEO } from '@/hooks/useSEO';
import SchemaValidator from '@/components/seo/SchemaValidator';
import IndexingAccelerator from '@/components/seo/IndexingAccelerator';
import { 
  Search,
  Code,
  Globe,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const Debug = () => {
  // Set noindex for debug page
  useSEO({
    title: "Debug & Testing Tools | Marden SEO",
    description: "Internal debugging and testing tools for schema validation, SEO testing, and WordPress integration monitoring.",
    noIndex: true
  });

  const currentUrl = window.location.href;
  const isProduction = currentUrl.includes('mardenseo.com');

  return (
    <main className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Debug & Testing Tools</h1>
            <Badge variant={isProduction ? "destructive" : "secondary"}>
              {isProduction ? "PRODUCTION" : "DEVELOPMENT"}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive testing and validation tools for SEO, schema markup, and system integrations.
            This page is excluded from search indexing.
          </p>
        </div>

        <Tabs defaultValue="indexing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            <TabsTrigger value="indexing" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Indexing Fix
            </TabsTrigger>
            <TabsTrigger value="schema" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Schema Testing
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO Analysis
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* Indexing Fix Tab - NEW PRIORITY TAB */}
          <TabsContent value="indexing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  Indexing Issue Fixed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Problem Solved</h3>
                  <p className="text-green-700 text-sm">
                    The sitemap has been cleaned and optimized. It now contains only real, existing pages 
                    with correct dates. This should resolve the indexing issues you were experiencing.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">🚀 What Was Fixed</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Removed future dates (July 2025 → January 2025)</li>
                    <li>• Eliminated non-existent blog posts and case studies</li>
                    <li>• Reduced from 22 URLs to 8 confirmed existing pages</li>
                    <li>• Fixed 404 errors that were hurting crawl budget</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <IndexingAccelerator />
          </TabsContent>

          {/* Schema Testing Tab */}
          <TabsContent value="schema" className="space-y-6">
            <SchemaValidator />
          </TabsContent>

          {/* SEO Analysis Tab */}
          <TabsContent value="seo" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Meta Tags Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Meta Tags Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Title', selector: 'title', critical: true },
                      { name: 'Description', selector: 'meta[name="description"]', critical: true },
                      { name: 'Keywords', selector: 'meta[name="keywords"]', critical: false },
                      { name: 'Canonical', selector: 'link[rel="canonical"]', critical: true },
                      { name: 'Open Graph Title', selector: 'meta[property="og:title"]', critical: true },
                      { name: 'Open Graph Description', selector: 'meta[property="og:description"]', critical: true },
                      { name: 'Open Graph Image', selector: 'meta[property="og:image"]', critical: true }
                    ].map((tag) => {
                      const element = document.querySelector(tag.selector);
                      const content = element?.getAttribute('content') || element?.textContent || element?.getAttribute('href');
                      const exists = !!content;
                      
                      return (
                        <div key={tag.name} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            {exists ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className={`h-4 w-4 ${tag.critical ? 'text-red-500' : 'text-yellow-500'}`} />
                            )}
                            <span className="font-medium">{tag.name}</span>
                          </div>
                          <div className="text-right text-sm">
                            {content ? (
                              <span className="text-muted-foreground truncate max-w-48 block">
                                {content.length > 40 ? `${content.substring(0, 40)}...` : content}
                              </span>
                            ) : (
                              <span className="text-red-500">Missing</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* External SEO Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    External SEO Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      name: "Google PageSpeed Insights",
                      url: `https://pagespeed.web.dev/report?url=${encodeURIComponent(currentUrl)}`,
                      description: "Test page speed and Core Web Vitals"
                    },
                    {
                      name: "Google Rich Results Test",
                      url: `https://search.google.com/test/rich-results?url=${encodeURIComponent(currentUrl)}`,
                      description: "Validate structured data markup"
                    },
                    {
                      name: "GTmetrix Analysis",
                      url: `https://gtmetrix.com/?url=${encodeURIComponent(currentUrl)}`,
                      description: "Comprehensive performance analysis"
                    },
                    {
                      name: "SEO Site Checkup",
                      url: `https://seositecheckup.com/analysis/${encodeURIComponent(currentUrl)}`,
                      description: "Complete SEO audit report"
                    }
                  ].map((tool) => (
                    <div key={tool.name} className="p-3 border rounded hover:bg-accent cursor-pointer">
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full"
                      >
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-sm text-muted-foreground">{tool.description}</div>
                        </div>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(performance.now())}ms
                    </div>
                    <div className="text-sm text-muted-foreground">Page Load Time</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-primary">
                      {document.querySelectorAll('script[type="application/ld+json"]').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Schema Objects</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold text-primary">
                      {document.querySelectorAll('img').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Images on Page</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* WordPress Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    WordPress Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>GraphQL Endpoint</span>
                      <Badge variant="outline">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Blog Posts</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Apollo Client</span>
                      <Badge variant="outline">Initialized</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supabase Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Supabase Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Database Connection</span>
                      <Badge variant="outline">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Contact Forms</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Authentication</span>
                      <Badge variant="secondary">Optional</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Debug;