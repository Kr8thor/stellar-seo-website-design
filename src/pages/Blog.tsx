
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ALL_CATEGORIES, GET_POSTS_BY_CATEGORY } from '../graphql/queries';
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import BlogListItem from '@/components/blog/BlogListItem';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from '@/components/ui/pagination';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Get all posts
  const { 
    loading: postsLoading, 
    error: postsError, 
    data: postsData 
  } = useQuery(activeFilter === "All" ? GET_ALL_POSTS : GET_POSTS_BY_CATEGORY, {
    variables: activeFilter !== "All" ? { category: activeFilter } : {},
    fetchPolicy: "cache-and-network"
  });

  // Get all categories
  const { 
    data: categoriesData,
    loading: categoriesLoading
  } = useQuery(GET_ALL_CATEGORIES);
  
  // Process posts data
  const processedPosts = React.useMemo(() => {
    if (!postsData) return [];
    
    return postsData.posts.nodes
      .filter(post => post.id !== "featured") // Exclude featured post from regular grid
      .filter(post => 
        searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.categories.nodes.some(cat => 
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
      .map(post => ({
        id: post.slug,
        title: post.title,
        category: post.categories.nodes[0]?.name || "Uncategorized",
        image: post.featuredImage?.node?.sourceUrl || "https://via.placeholder.com/800x500",
        excerpt: post.excerpt,
        date: format(new Date(post.date), 'MMM d, yyyy'),
        readTime: `${Math.ceil(post.content.length / 1500)} min read`,
        author: post.author?.node?.name || "Marden SEO"
      }));
  }, [postsData, searchTerm]);
  
  // Get categories for filter
  const categories = React.useMemo(() => {
    const defaultCategories = ["All"];
    
    if (categoriesData?.categories?.nodes) {
      const wpCategories = categoriesData.categories.nodes.map(cat => cat.name);
      return [...defaultCategories, ...wpCategories];
    }
    
    return defaultCategories;
  }, [categoriesData]);

  // Get featured post
  const featuredPost = React.useMemo(() => {
    if (!postsData) return null;
    
    const featuredPost = postsData.posts.nodes.find(post => post.id === "featured");
    if (!featuredPost && postsData.posts.nodes.length > 0) {
      // If there's no designated featured post, use the first one
      return {
        id: postsData.posts.nodes[0].slug,
        title: postsData.posts.nodes[0].title,
        image: postsData.posts.nodes[0].featuredImage?.node?.sourceUrl || "https://via.placeholder.com/800x500",
        date: format(new Date(postsData.posts.nodes[0].date), 'MMM d, yyyy'),
        readTime: `${Math.ceil(postsData.posts.nodes[0].content.length / 1500)} min read`,
      };
    }
    
    return null;
  }, [postsData]);
  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = processedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(processedPosts.length / postsPerPage);
  
  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm]);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (postsLoading && !postsData) {
    return (
      <main className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading blog posts...</p>
      </main>
    );
  }

  // Show error state
  if (postsError) {
    return (
      <main className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl mb-4 text-destructive">Error loading blog posts</p>
        <p className="text-muted-foreground mb-6">
          We're having trouble connecting to our content management system. 
          Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </main>
    );
  }
  
  return (
    <main className="pt-24">
      <Helmet>
        <title>SEO Insights & Blog | Marden SEO</title>
        <meta 
          name="description" 
          content="Expert tips, strategies, and insights to help you improve your search visibility and stay ahead of the competition." 
        />
      </Helmet>
      
      {/* Featured Post */}
      {featuredPost && (
        <section className="bg-accent/30 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
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
                  Search engines are increasingly prioritizing content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness. In this comprehensive guide, we break down each component of E-E-A-T and provide actionable strategies to improve your site's quality signals.
                </p>
                <Button asChild>
                  <Link to={`/blog/${featuredPost.id}`}>
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
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
            {categoriesLoading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Loading categories...</span>
              </div>
            ) : (
              categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeFilter === category ? "default" : "outline"}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="section-container">
        {processedPosts.length > 0 ? (
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
        {processedPosts.length > postsPerPage && (
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
