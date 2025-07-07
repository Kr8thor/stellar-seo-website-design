
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from 'lucide-react';
import BlogListItem from '@/components/blog/BlogListItem';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { Helmet } from 'react-helmet-async';
import { useSEO, getEnhancedSEOConfig } from '@/hooks/useSEO';
import { useWordPress } from '@/providers/WordPressProvider';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';

// Blog categories
const categories = ["All", "SEO Tips", "Technical SEO", "Content Strategy", "Local SEO", "E-commerce SEO"];

const Blog = () => {
  // Add enhanced SEO for blog page with breadcrumb schema
  useSEO(getEnhancedSEOConfig('blog'));
  
  const { posts: wpPosts, featuredPost: wpFeaturedPost, loading, usingCMS, error } = useWordPress();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Use WordPress posts if available and CMS is working, otherwise fall back to static posts
  const posts = (usingCMS && wpPosts?.length > 0) ? wpPosts : staticBlogPosts.filter(post => post.id !== 'featured');
  const featuredPost = (usingCMS && wpFeaturedPost) ? wpFeaturedPost : staticBlogPosts.find(post => post.id === 'featured');
  
  // Debug logging
  useEffect(() => {
    console.log('Blog Debug Info:', {
      usingCMS,
      error: error?.message,
      wpPostsLength: wpPosts?.length || 0,
      staticPostsLength: staticBlogPosts.length,
      finalPostsLength: posts.length,
      hasFeaturedPost: !!featuredPost,
      loading
    });
  }, [usingCMS, error, wpPosts, posts, featuredPost, loading]);
  
  // Filter blog posts based on active filter and search term
  const filteredPosts = posts
    .filter(post => 
      (activeFilter === "All" || post.category === activeFilter) &&
      (searchTerm === "" || 
       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <main className="pt-24">
      <Helmet>
        <title>SEO Insights & Blog | Marden SEO</title>
        <meta 
          name="description" 
          content="Expert tips, strategies, and insights to help you improve your search visibility and stay ahead of the competition." 
        />
      </Helmet>
      
      {/* Debug info - only show in development */}
      {/* Featured Post */}
      {featuredPost && (
        <section className="bg-accent/30 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            {loading ? (
              <div className="animate-pulse flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2 h-80 bg-slate-200 rounded-lg"></div>
                <div className="lg:w-1/2">
                  <div className="h-6 bg-slate-200 rounded w-24 mb-4"></div>
                  <div className="h-10 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mb-6"></div>
                  <div className="h-10 bg-slate-200 rounded w-40"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="rounded-lg w-full h-auto shadow-lg" 
                  />
                </div>
                
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <span className="text-sm bg-accent/70 text-accent-foreground px-3 py-1 rounded inline-block mb-4 w-fit">
                    Featured Article
                  </span>
                  <h2 className="font-heading text-3xl mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    {featuredPost.date} · {featuredPost.readTime}
                  </p>
                  <p className="mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <Button asChild>
                    <Link to={`/blog/${featuredPost.id}`}>
                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        {loading && usingCMS ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-card rounded-lg border border-border p-6">
                <div className="h-48 bg-slate-200 rounded mb-6"></div>
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 bg-slate-200 rounded w-16"></div>
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded mb-6"></div>
                <div className="h-8 bg-slate-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <BlogListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl mb-4">No posts found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchTerm(""); setActiveFilter("All");}}>
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink 
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
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
