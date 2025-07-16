import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, CalendarDays, Award, Target } from 'lucide-react';
import { useCaseStudySEO, CASE_STUDY_KEYS } from '@/hooks/useSEO';
import { handleAnchorClick } from '@/utils/scrollUtils';

// Case study data
const caseStudies = [{
  id: '1',
  title: "300% Traffic Growth for B2B SaaS",
  category: "SaaS",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  description: "Increased organic traffic by 300% in 6 months for a B2B SaaS company, resulting in a 85% increase in qualified leads.",
  challenge: "The client, a growing B2B SaaS platform in the project management space, was struggling to gain visibility in search results against established competitors. Despite having an innovative product, they were missing out on organic traffic and lead generation opportunities.",
  solution: "We implemented a comprehensive SEO strategy focused on technical optimization, content development, and strategic link building. The approach included:",
  solutionItems: ["Technical SEO audit and implementation of fixes", "Keyword research targeting high-intent product and feature keywords", "Development of SEO-optimized landing pages for core features", "Creation of educational content addressing customer pain points", "Strategic internal linking structure", "Acquisition of high-quality backlinks from industry publications"],
  results: "Within 6 months of implementing our strategy, the client achieved:",
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
  }],
  testimonial: "The SEO strategy completely transformed our online presence. We're now ranking for keywords we never thought possible, and the quality of leads coming through organic search has been exceptional.",
  clientName: "David Reynolds",
  clientTitle: "Marketing Director, SaaSMaster"
}, {
  id: '2',
  title: "E-commerce Revenue Increase",
  category: "E-commerce",
  image: "https://images.unsplash.com/photo-1555421689-491a97ff2040",
  description: "Helped an online retailer increase organic search revenue by 150% through technical SEO and content optimization.",
  challenge: "An established e-commerce retailer was experiencing declining organic traffic and revenue despite having a robust product catalog. Their site suffered from technical issues, poor content quality, and increasing competition.",
  solution: "We developed a comprehensive e-commerce SEO strategy focusing on:",
  solutionItems: ["Technical SEO enhancements including site speed improvements", "Product page optimization with enhanced schema markup", "Category page restructuring and content enhancement", "Creation of buying guides and informational content", "Implementation of user-generated content strategy", "Mobile optimization for improved user experience"],
  results: "The implementation of our strategy led to significant improvements:",
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
  }],
  testimonial: "The strategic approach to SEO and the depth of knowledge is impressive. We've seen our e-commerce revenue increase significantly since implementing the recommended strategies.",
  clientName: "Sarah Williams",
  clientTitle: "E-commerce Manager, StyleHub"
}, {
  id: '3',
  title: "Local Business Map Pack Domination",
  category: "Local Business",
  image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
  description: "Helped a local service business achieve top 3 Map Pack rankings for 45 high-value keywords in their city.",
  challenge: "A local service business was struggling to appear in Google's Map Pack results, despite having excellent reviews and a quality website. They were losing potential leads to competitors with stronger local SEO.",
  solution: "We implemented a targeted local SEO strategy including:",
  solutionItems: ["Comprehensive Google Business Profile optimization", "Citation building and cleanup across local directories", "Location-specific content creation and on-page optimization", "Review acquisition strategy and management", "Local link building from community organizations", "Localized schema markup implementation"],
  results: "The local SEO campaign delivered outstanding results:",
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
  }],
  testimonial: "Our business has completely transformed since working with this SEO specialist. We're now the first choice for many local customers searching for our services online.",
  clientName: "Michael Johnson",
  clientTitle: "Owner, City Services Pro"
}, {
  id: '4',
  title: "B2B Lead Generation Growth",
  category: "B2B",
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  description: "Increased qualified leads by 120% for a B2B manufacturing firm through targeted SEO strategy.",
  challenge: "A well-established B2B manufacturing company was struggling to generate quality leads through their website. Despite industry expertise, they weren't effectively reaching potential clients through search engines.",
  solution: "We created a specialized B2B SEO and content strategy focused on:",
  solutionItems: ["Industry-specific keyword research targeting decision-makers", "Technical optimization for improved crawling and indexing", "Development of in-depth industry resources and case studies", "Creation of optimized service pages targeting key offerings", "Implementation of lead magnet strategy with downloadable resources", "Thought leadership content placement on industry publications"],
  results: "The strategic approach delivered significant business impact:",
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
  }],
  testimonial: "The SEO strategy completely transformed our lead generation process. We're now reaching the right decision-makers at the right time, and our sales team has a steady stream of qualified leads.",
  clientName: "Robert Chen",
  clientTitle: "Marketing Manager, IndustryTech Manufacturing"
}, {
  id: '5',
  title: "SaaS Product Page Optimization",
  category: "SaaS",
  image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
  description: "Improved product page rankings, resulting in a 95% increase in trial signups for a SaaS platform.",
  challenge: "A SaaS company had created excellent product features but struggled to effectively communicate their value through search engines. Their product pages weren't ranking well, resulting in low organic traffic and trial signups.",
  solution: "We implemented a comprehensive product page optimization strategy:",
  solutionItems: ["Competitive analysis of high-ranking product pages", "Restructuring of page architecture for improved user experience", "Strategic keyword integration targeting user pain points", "Enhanced feature descriptions with benefit-focused content", "Implementation of social proof elements", "A/B testing of call-to-action elements"],
  results: "The optimization efforts delivered impressive results:",
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
  }],
  testimonial: "The product page optimization strategy completely changed our customer acquisition model. We're now signing up new trial users every day directly from organic search traffic.",
  clientName: "Jennifer Park",
  clientTitle: "Product Marketing Lead, CloudTools"
}, {
  id: '6',
  title: "E-commerce Category Page Revamp",
  category: "E-commerce",
  image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
  description: "Restructured category pages for an e-commerce site, resulting in a 200% increase in organic traffic.",
  challenge: "An e-commerce retailer with thousands of products was struggling with poor visibility for their category pages. This resulted in low organic traffic and missed sales opportunities for high-margin product categories.",
  solution: "We developed a strategic category page enhancement plan:",
  solutionItems: ["Category page architecture restructuring", "Implementation of enhanced filtering and navigation options", "Creation of unique, informative category descriptions", "Strategic internal linking between related categories", "Product placement optimization based on conversion data", "Mobile-first design improvements for better user experience"],
  results: "The category page revamp delivered exceptional results:",
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
  }],
  testimonial: "The category page revamp completely transformed how customers find and purchase our products. We've seen dramatic improvements in both traffic and conversion rates.",
  clientName: "Thomas Wu",
  clientTitle: "Digital Director, FashionMart"
}];
const CaseStudy = () => {
  const { id } = useParams();
  const caseStudy = caseStudies.find(study => study.id === id);
  
  // 🎯 COMPREHENSIVE SEO IMPLEMENTATION - Enhanced meta descriptions and keywords
  // Try to use specific case study SEO config, fallback to dynamic generation
  const getCaseStudyKey = (caseId: string) => {
    const keyMap: Record<string, string> = {
      '1': CASE_STUDY_KEYS.saasGrowth,
      '2': CASE_STUDY_KEYS.ecommerceSEO,
      '3': CASE_STUDY_KEYS.localBusiness,
      'ecommerce-seo': CASE_STUDY_KEYS.ecommerceSEO,
      'saas-growth': CASE_STUDY_KEYS.saasGrowth,
      'local-business': CASE_STUDY_KEYS.localBusiness
    };
    return keyMap[caseId] || null;
  };

  const caseStudyKey = getCaseStudyKey(id || '');
  
  // Use comprehensive SEO config if available, otherwise dynamic SEO
  if (caseStudyKey) {
    useCaseStudySEO(caseStudyKey);
  } else {
    // Fallback to dynamic SEO for case studies not in comprehensive config
    useCaseStudySEO('', caseStudy ? {
      title: `${caseStudy.title} | Case Study | Marden SEO`,
      description: caseStudy.description || `Learn how Marden SEO helped achieve ${caseStudy.title}. Detailed case study with results and methodology.`,
      keywords: `${caseStudy.title}, SEO case study, ${caseStudy.category}, search engine optimization results, digital marketing success`,
      image: caseStudy.image || 'https://mardenseo.com/opengraph-image.png',
      type: 'article'
    } : {
      title: "Case Study Not Found | Marden SEO",
      description: "Explore our SEO case studies and proven results in organic traffic growth and digital marketing success.",
      keywords: "SEO case studies, digital marketing results, organic traffic growth",
      type: "website"
    });
  }
  
  if (!caseStudy) {
    return <main className="pt-24 pb-16 section-container">
        <div className="text-center">
          <h1 className="heading-md mb-6">Case Study Not Found</h1>
          <p className="mb-8">The case study you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </main>;
  }
  return <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 mb-12">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link to="/portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
          <span className="text-sm bg-accent/50 text-accent-foreground px-2 py-1 rounded">
            {caseStudy.category}
          </span>
        </div>

        <h1 className="heading-lg mb-6">{caseStudy.title}</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          {caseStudy.description}
        </p>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <div className="rounded-lg overflow-hidden">
          <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-12 mb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {caseStudy.stats.map((stat, index) => <div key={index} className="bg-card p-6 rounded-lg text-center border border-border">
                <div className="flex items-center justify-center text-primary mb-3">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <p className="text-3xl font-heading font-medium">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center mb-4 text-primary">
              <Target className="h-6 w-6 mr-2" />
              <h2 className="font-heading text-2xl">The Challenge</h2>
            </div>
            <p className="mb-4">{caseStudy.challenge}</p>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4 text-primary">
              <Award className="h-6 w-6 mr-2" />
              <h2 className="font-heading text-2xl">The Solution</h2>
            </div>
            <p className="mb-6">{caseStudy.solution}</p>
            <ul className="space-y-2 mb-6">
              {caseStudy.solutionItems.map((item, index) => <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{item}</span>
                </li>)}
            </ul>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-4 text-primary">
              <BarChart3 className="h-6 w-6 mr-2" />
              <h2 className="font-heading text-2xl">The Results</h2>
            </div>
            <p className="mb-6">{caseStudy.results}</p>
          </div>

          {/* Testimonial */}
          
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 mt-16">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="heading-sm mb-4">Ready to Achieve Similar Results?</h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss how we can apply these proven strategies to improve your search visibility and grow your business.
          </p>
          <Button asChild size="lg">
            <a href="/contact#top" onClick={(e) => handleAnchorClick('/contact#top', e)}>Get in Touch</a>
          </Button>
        </div>
      </section>
    </main>;
};
export default CaseStudy;