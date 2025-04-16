import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from 'lucide-react';

// Portfolio filter categories
const categories = ["All", "E-commerce", "SaaS", "Local Business", "B2B"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const caseStudies = [
    {
      id: 1,
      title: "300% Traffic Growth for B2B SaaS",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      description: "Increased organic traffic by 300% in 6 months, resulting in a 85% increase in qualified leads.",
      stats: [
        { label: "Organic Traffic", value: "+300%" },
        { label: "Keyword Rankings", value: "+205" },
        { label: "Conversion Rate", value: "+40%" },
        { label: "ROI", value: "4.5x" }
      ]
    },
    {
      id: 2,
      title: "E-commerce Revenue Increase",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040",
      description: "Helped an online retailer increase organic search revenue by 150% through technical SEO and content optimization.",
      stats: [
        { label: "Organic Revenue", value: "+150%" },
        { label: "Organic Traffic", value: "+210%" },
        { label: "Conversion Rate", value: "+25%" },
        { label: "ROI", value: "3.8x" }
      ]
    },
    {
      id: 3,
      title: "Local Business Map Pack Domination",
      category: "Local Business",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
      description: "Helped a local service business achieve top 3 Map Pack rankings for 45 high-value keywords in their city.",
      stats: [
        { label: "Local Visibility", value: "+250%" },
        { label: "Website Traffic", value: "+180%" },
        { label: "In-store Visits", value: "+65%" },
        { label: "ROI", value: "3.2x" }
      ]
    },
    {
      id: 4,
      title: "B2B Lead Generation Growth",
      category: "B2B",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      description: "Increased qualified leads by 120% for a B2B manufacturing firm through targeted SEO strategy.",
      stats: [
        { label: "Organic Traffic", value: "+175%" },
        { label: "Qualified Leads", value: "+120%" },
        { label: "Conversion Rate", value: "+32%" },
        { label: "ROI", value: "4.1x" }
      ]
    },
    {
      id: 5,
      title: "SaaS Product Page Optimization",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
      description: "Improved product page rankings, resulting in a 95% increase in trial signups for a SaaS platform.",
      stats: [
        { label: "Organic Traffic", value: "+240%" },
        { label: "Trial Signups", value: "+95%" },
        { label: "Conversion Rate", value: "+28%" },
        { label: "ROI", value: "3.6x" }
      ]
    },
    {
      id: 6,
      title: "E-commerce Category Page Revamp",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
      description: "Restructured category pages for an e-commerce site, resulting in a 200% increase in organic traffic.",
      stats: [
        { label: "Organic Traffic", value: "+200%" },
        { label: "Revenue", value: "+135%" },
        { label: "Conversion Rate", value: "+22%" },
        { label: "ROI", value: "3.9x" }
      ]
    }
  ];
  
  const filteredCaseStudies = activeFilter === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);
  
  return (
    <main className="pt-24">
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
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaseStudies.map((study) => (
            <div 
              key={study.id} 
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
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
                  {study.stats.slice(0, 4).map((stat, idx) => (
                    <div key={idx} className="text-center p-2 bg-secondary/50 rounded">
                      <p className="text-lg font-medium">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/case-study/${study.id}`}>
                    View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
                alt="Featured case study" 
                className="rounded-lg w-full h-auto shadow-lg" 
              />
            </div>
            
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="font-heading text-2xl mb-4">
                SaaS Company Increases Market Share Through Strategic SEO
              </h3>
              <p className="mb-6">
                A rapidly growing SaaS company in the project management space was struggling to compete with established players despite having a superior product. Through comprehensive keyword research, technical optimization, and strategic content development, we helped them significantly improve their organic visibility.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href="#">
                    Read Full Case Study <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </div>
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
            <Link to="/contact">Schedule Your Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
