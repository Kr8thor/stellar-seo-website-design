
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from 'lucide-react';

// Blog categories
const categories = ["All", "SEO Tips", "Technical SEO", "Content Strategy", "Local SEO", "E-commerce SEO"];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const blogPosts = [
    {
      id: 1,
      title: "10 On-Page SEO Tactics That Still Work in 2025",
      category: "SEO Tips",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      excerpt: "Discover the most effective on-page SEO techniques that are still delivering results in 2025 despite algorithm changes.",
      date: "April 05, 2025",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "How Core Web Vitals Impact Your SEO Performance",
      category: "Technical SEO",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      excerpt: "Learn why page experience signals are crucial for your rankings and how to optimize your site for Core Web Vitals.",
      date: "March 22, 2025",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Building an Effective Content Strategy for E-commerce",
      category: "Content Strategy",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a",
      excerpt: "Learn how to develop content that attracts, engages, and converts customers for your e-commerce store.",
      date: "March 15, 2025",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Local SEO: How to Dominate the Map Pack in 2025",
      category: "Local SEO",
      image: "https://images.unsplash.com/photo-1459257831348-f0cdd359235f",
      excerpt: "Step-by-step strategies to improve your local visibility and secure top positions in Google's Local Pack.",
      date: "February 28, 2025",
      readTime: "9 min read"
    },
    {
      id: 5,
      title: "The Ultimate Guide to E-commerce Product Page Optimization",
      category: "E-commerce SEO",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      excerpt: "Comprehensive tips to optimize your product pages for both search engines and conversions.",
      date: "February 15, 2025",
      readTime: "14 min read"
    },
    {
      id: 6,
      title: "How to Perform a Comprehensive Technical SEO Audit",
      category: "Technical SEO",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      excerpt: "A step-by-step guide to identifying and fixing technical SEO issues that could be holding your site back.",
      date: "January 30, 2025",
      readTime: "15 min read"
    },
    {
      id: 7,
      title: "5 Proven Content Frameworks for Higher Rankings",
      category: "Content Strategy",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      excerpt: "Content structures that help your pages rank better and keep users engaged longer.",
      date: "January 18, 2025",
      readTime: "11 min read"
    },
    {
      id: 8,
      title: "SEO for Voice Search: Optimizing for the Conversational Web",
      category: "SEO Tips",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      excerpt: "How to adapt your SEO strategy for voice search queries and maintain visibility as search behavior evolves.",
      date: "January 05, 2025",
      readTime: "10 min read"
    }
  ];
  
  // Filter blog posts based on active filter
  const filteredPosts = activeFilter === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);
  
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="heading-lg mb-6">SEO Insights & Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Expert tips, strategies, and insights to help you improve your search visibility and stay ahead of the competition.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>
      
      {/* Filter Categories */}
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
      
      {/* Blog Posts */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {post.date} · {post.readTime}
                  </div>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                <Button asChild variant="ghost" className="px-0 hover:bg-transparent hover:text-primary">
                  <Link to={`/blog/${post.id}`} className="flex items-center">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1504639725590-34d0984388bd" 
                alt="Featured post" 
                className="rounded-lg w-full h-auto shadow-lg" 
              />
            </div>
            
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="text-sm bg-accent/70 text-accent-foreground px-3 py-1 rounded inline-block mb-4 w-fit">
                Featured Article
              </span>
              <h2 className="font-heading text-3xl mb-4">
                The Complete Guide to E-E-A-T: How Experience, Expertise, Authoritativeness, and Trustworthiness Impact SEO
              </h2>
              <p className="text-muted-foreground mb-3">
                April 10, 2025 · 20 min read
              </p>
              <p className="mb-6">
                Search engines are increasingly prioritizing content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness. In this comprehensive guide, we break down each component of E-E-A-T and provide actionable strategies to improve your site's quality signals.
              </p>
              <Button asChild>
                <Link to="/blog/featured">
                  Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="section-container">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl mb-4">Stay Updated with SEO Insights</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive the latest SEO tips, strategies, and industry updates directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Blog;
