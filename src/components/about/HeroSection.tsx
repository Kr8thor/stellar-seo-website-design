
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { handleAnchorClick } from '@/utils/scrollUtils';
import { useSEOWithKey, PAGE_KEYS } from '@/hooks/useSEO';

const HeroSection = () => {
  // 🎯 COMPREHENSIVE SEO IMPLEMENTATION - Enhanced meta descriptions and keywords
  useSEOWithKey(PAGE_KEYS.about);
  
  return (
    <section className="section-container">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2 animate-fade-in">
          <h1 className="heading-lg mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground mb-6">
            I'm a data-driven SEO specialist with half a decade of experience helping businesses achieve sustainable growth through strategic search engine optimization and AI-powered solutions.
          </p>
          <p className="mb-8">
            My approach combines technical SEO expertise with AI strategy and user experience optimization to deliver measurable improvements in search visibility and organic traffic, leveraging cutting-edge artificial intelligence techniques.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Work With Me</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/portfolio">See My Results</Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img 
            src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" 
            alt="SEO Specialist" 
            className="w-full h-auto rounded-lg object-cover" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
