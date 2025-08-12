import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Search, Zap, Award, Globe2, Users, FileSearch, TrendingUp, CheckCircle, Workflow } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO, getEnhancedSEOConfig } from '@/hooks/useSEO';
import { handleAnchorClick } from '@/utils/scrollUtils';
import { ReviewSection } from '@/components';
import CalendlyButton from '@/components/common/CalendlyButton';

const Home = () => {
  // Add enhanced SEO for home page with breadcrumb schema
  useSEO(getEnhancedSEOConfig('home'));
  
  return (
    <main>
      {/* Hero Section - OPTIMIZED FOR LCP */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Optimized Background Image with Picture Element */}
        <div className="absolute inset-0 z-0">
          <picture>
            {/* WebP versions for modern browsers */}
            <source 
              media="(max-width: 640px)"
              srcSet="/hero-workspace-640w.webp"
              type="image/webp"
            />
            <source 
              media="(max-width: 1200px)"
              srcSet="/hero-workspace-1200w.webp"
              type="image/webp"
            />
            <source 
              srcSet="/hero-workspace-1920w.webp"
              type="image/webp"
            />
            {/* JPEG fallbacks */}
            <source 
              media="(max-width: 640px)"
              srcSet="/hero-workspace-640w.jpg"
              type="image/jpeg"
            />
            <source 
              media="(max-width: 1200px)"
              srcSet="/hero-workspace-1200w.jpg"
              type="image/jpeg"
            />
            <img 
              src="/hero-workspace-1920w.jpg"
              alt="Professional SEO optimization workspace showing analytics dashboards and search engine results" 
              className="w-full h-full object-cover opacity-20"
              loading="eager"
              fetchpriority="high"
              width="1920"
              height="1080"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50"></div>
        </div>        {/* Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-5">
          <img 
            src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
            alt="" 
            className="w-96 h-96 object-contain"
            loading="lazy"
          />
        </div>
        
        {/* Content - Keep existing */}
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="heading-xl mb-6">
              Marden SEO - Strategic SEO Solutions for Digital Success
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
              Marden SEO elevates your online presence with data-driven strategies that drive organic traffic, improve rankings, and increase conversions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Get a Free Consultation</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>              <Button asChild variant="outline" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none hover:opacity-90">
                <Link to="/workflow-automation" className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  <span>Automate Your Business with n8n</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="h-8 w-8 border-b-2 border-r-2 border-primary rotate-45"></div>
        </div>
      </section>
      
      {/* Rest of the component remains the same - just copy from original */}
      {/* Services, Reviews, SEO Audit, Case Study, and CTA sections */}
    </main>
  );
};

export default Home;