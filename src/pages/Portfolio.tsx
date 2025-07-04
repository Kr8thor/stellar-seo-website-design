import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, FileSearch, TrendingUp, CheckCircle } from 'lucide-react';
import { useSEO, getEnhancedSEOConfig } from '@/hooks/useSEO';
import { handleAnchorClick } from '@/utils/scrollUtils';

// Portfolio filter categories
const categories = ["All", "E-commerce", "SaaS", "Local Business", "B2B"];
const Portfolio = () => {
  // Add enhanced SEO for portfolio page with breadcrumb schema
  useSEO(getEnhancedSEOConfig('portfolio'));
  
  const [activeFilter, setActiveFilter] = useState("All");
  const caseStudies = [{
    id: 1,
    title: "300% Traffic Growth for B2B SaaS",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    description: "Increased organic traffic by 300% in 6 months, resulting in a 85% increase in qualified leads.",
    stats: [{
      label: "Organic Traffic",
      value: "+300%"
    }, {
      label: "Keyword Rankings",
      value: "+205"
    }, {
      label: "Conversion Rate",
      value: "+40%"
    }, {
      label: "ROI",
      value: "4.5x"
    }]
  }, {
    id: 2,
    title: "E-commerce Revenue Increase",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040",
    description: "Helped an online retailer increase organic search revenue by 150% through technical SEO and content optimization.",
    stats: [{
      label: "Organic Revenue",
      value: "+150%"
    }, {
      label: "Organic Traffic",
      value: "+210%"
    }, {
      label: "Conversion Rate",
      value: "+25%"
    }, {
      label: "ROI",
      value: "3.8x"
    }]
  }, {
    id: 3,
    title: "Local Business Map Pack Domination",
    category: "Local Business",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
    description: "Helped a local service business achieve top 3 Map Pack rankings for 45 high-value keywords in their city.",
    stats: [{
      label: "Local Visibility",
      value: "+250%"
    }, {
      label: "Website Traffic",
      value: "+180%"
    }, {
      label: "In-store Visits",
      value: "+65%"
    }, {
      label: "ROI",
      value: "3.2x"
    }]
  }, {
    id: 4,
    title: "B2B Lead Generation Growth",
    category: "B2B",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    description: "Increased qualified leads by 120% for a B2B manufacturing firm through targeted SEO strategy.",
    stats: [{
      label: "Organic Traffic",
      value: "+175%"
    }, {
      label: "Qualified Leads",
      value: "+120%"
    }, {
      label: "Conversion Rate",
      value: "+32%"
    }, {
      label: "ROI",
      value: "4.1x"
    }]
  }, {
    id: 5,
    title: "SaaS Product Page Optimization",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
    description: "Improved product page rankings, resulting in a 95% increase in trial signups for a SaaS platform.",
    stats: [{
      label: "Organic Traffic",
      value: "+240%"
    }, {
      label: "Trial Signups",
      value: "+95%"
    }, {
      label: "Conversion Rate",
      value: "+28%"
    }, {
      label: "ROI",
      value: "3.6x"
    }]
  }, {
    id: 6,
    title: "E-commerce Category Page Revamp",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
    description: "Restructured category pages for an e-commerce site, resulting in a 200% increase in organic traffic.",
    stats: [{
      label: "Organic Traffic",
      value: "+200%"
    }, {
      label: "Revenue",
      value: "+135%"
    }, {
      label: "Conversion Rate",
      value: "+22%"
    }, {
      label: "ROI",
      value: "3.9x"
    }]
  }];
  const filteredCaseStudies = activeFilter === "All" ? caseStudies : caseStudies.filter(study => study.category === activeFilter);
  return <main className="pt-24">
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="heading-lg mb-6">Portfolio & Case Studies</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore real results achieved for clients across different industries through strategic SEO implementation.
          </p>
        </div>
      </section>
      
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => <Button key={index} variant={activeFilter === category ? "default" : "outline"} onClick={() => setActiveFilter(category)}>
                {category}
              </Button>)}
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map(study => <div key={study.id} className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-56 overflow-hidden">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading text-xl">{study.title}</h3>
                  <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded">
                    {study.category}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">{study.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {study.stats.slice(0, 4).map((stat, idx) => <div key={idx} className="text-center p-2 bg-secondary/50 rounded">
                      <p className="text-lg font-medium">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>)}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/case-study/${study.id}`}>
                    View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>)}
        </div>
      </section>
      
      {/* NEW SEO Audit Teaser Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent/20 mb-4">
              <FileSearch className="h-10 w-10" />
            </div>
            <h2 className="heading-lg mb-4">Free SEO Audit Launch</h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Starting May 1st, 2025 — Unlock your website's full potential with our complimentary in-depth SEO analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-accent/50 transition-all hover:-translate-y-1 duration-300">
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading mb-3">Performance Insights</h3>
              <p className="opacity-80 mb-6">
                Get detailed metrics on your site's current performance and benchmark against competitors.
              </p>
              <ul className="space-y-2">
                {["Speed analysis", "Mobile optimization", "Core Web Vitals"].map((item, idx) => <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-accent/50 transition-all hover:-translate-y-1 duration-300">
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <FileSearch className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading mb-3">Content Analysis</h3>
              <p className="opacity-80 mb-6">
                Discover untapped opportunities and optimize your existing content for maximum impact.
              </p>
              <ul className="space-y-2">
                {["Keyword opportunities", "Content gaps", "Semantic relevance"].map((item, idx) => <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:border-accent/50 transition-all hover:-translate-y-1 duration-300">
              <div className="bg-accent/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading mb-3">Action Plan</h3>
              <p className="opacity-80 mb-6">
                Receive a prioritized roadmap of improvements to boost your search visibility and traffic.
              </p>
              <ul className="space-y-2">
                {["Prioritized tasks", "Implementation guide", "Expected outcomes"].map((item, idx) => <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            
            <Button asChild size="lg" variant="secondary">
              <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Reserve Your Free SEO Audit</a>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="heading-md mb-6">Ready to Achieve Similar Results?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Let's discuss how we can apply these proven strategies to improve your search visibility and grow your business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Schedule Your Consultation</a>
          </Button>
        </div>
      </section>
    </main>;
};
export default Portfolio;