import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { 
  GET_ALL_POSTS, 
  GET_FEATURED_POSTS, 
  GET_CATEGORIES,
  GET_SITE_SETTINGS 
} from '../graphql/queries';
import { 
  adaptPosts, 
  adaptPost, 
  adaptCategories,
  adaptMenuItems 
} from '../adapters/wordpressAdapter';
import { blogPosts as fallbackPosts } from '../data/blogPosts';

// Create a context for WordPress data
const WordPressContext = createContext();

// Hook to use WordPress data
export const useWordPress = () => useContext(WordPressContext);

// Provider component to fetch and provide WordPress data
export const WordPressProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingCMS, setUsingCMS] = useState(false); // Force static data
  
  // Force fallback to static data immediately
  useEffect(() => {
    console.log('WordPress Provider: Using static fallback data');
    console.log('Fallback posts count:', fallbackPosts.length);
    
    // Use fallback data immediately
    setUsingCMS(false);
    setError(null);
    
    // Set posts (excluding featured)
    const regularPosts = fallbackPosts.filter(post => post.id !== 'featured');
    setPosts(regularPosts);
    console.log('Regular posts set:', regularPosts.length);
    
    // Set featured post
    const featured = fallbackPosts.find(post => post.id === 'featured');
    setFeaturedPost(featured);
    console.log('Featured post set:', featured?.title);
    
    // Set categories
    setCategories([
      { id: 1, name: 'SEO Tips', slug: 'seo-tips', count: 5 },
      { id: 2, name: 'Technical SEO', slug: 'technical-seo', count: 3 },
      { id: 3, name: 'Content Strategy', slug: 'content-strategy', count: 2 },
      { id: 4, name: 'AI & SEO', slug: 'ai-seo', count: 1 },
      { id: 5, name: 'Local SEO', slug: 'local-seo', count: 1 },
      { id: 6, name: 'SEO Trends', slug: 'seo-trends', count: 1 },
      { id: 7, name: 'Link Building', slug: 'link-building', count: 1 },
    ]);
    
    setLoading(false);
  }, []); // Run once on mount
  
  // Get a specific post by ID or slug
  const getPostById = (id) => {
    if (id === 'featured') return featuredPost;
    return posts.find(post => 
      String(post.id) === String(id) || 
      post.slug === id
    );
  };
  
  // Get posts by category
  const getPostsByCategory = (categorySlug) => {
    if (categorySlug === 'all' || !categorySlug) return posts;
    return posts.filter(post => 
      post.categorySlug === categorySlug || 
      post.category.toLowerCase() === categorySlug.toLowerCase()
    );
  };
  
  // Search posts
  const searchPosts = (query) => {
    if (!query.trim()) return posts;
    
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery) ||
      (post.tags || []).some(tag => tag.name.toLowerCase().includes(lowercaseQuery))
    );
  };
  
  // Refresh data manually
  const refreshData = () => {
    setLoading(true);
    // Just reload static data
    window.location.reload();
  };
  
  const contextValue = {
    // Data
    posts,
    featuredPost,
    categories,
    siteSettings,
    
    // State
    loading,
    error,
    usingCMS: false, // Always false for static data
    
    // Methods
    getPostById,
    getPostsByCategory,
    searchPosts,
    refreshData,
    
    // Metadata
    totalPosts: posts.length,
    isConnected: false, // Always false for static data
  };
  
  return (
    <WordPressContext.Provider value={contextValue}>
      {children}
    </WordPressContext.Provider>
  );
};

export default WordPressProvider;