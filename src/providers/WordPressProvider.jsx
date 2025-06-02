
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
  const [usingCMS, setUsingCMS] = useState(true);
  
  // Fetch all posts
  const { 
    data: postsData, 
    loading: postsLoading, 
    error: postsError 
  } = useQuery(GET_ALL_POSTS, {
    variables: { first: 50 },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });
  
  // Fetch featured posts
  const { 
    data: featuredData, 
    loading: featuredLoading,
    error: featuredError 
  } = useQuery(GET_FEATURED_POSTS, {
    variables: { first: 1 },
    errorPolicy: 'all',
  });
  
  // Fetch categories
  const { 
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError 
  } = useQuery(GET_CATEGORIES, {
    errorPolicy: 'all',
  });
  
  // Fetch site settings
  const { 
    data: settingsData,
    loading: settingsLoading,
    error: settingsError 
  } = useQuery(GET_SITE_SETTINGS, {
    errorPolicy: 'all',
  });
  
  // Handle errors and fallback to static data
  useEffect(() => {
    const hasErrors = postsError || featuredError || categoriesError || settingsError;
    
    if (hasErrors) {
      console.warn('CMS connection issues, falling back to static data:', {
        postsError: postsError?.message,
        featuredError: featuredError?.message,
        categoriesError: categoriesError?.message,
        settingsError: settingsError?.message,
      });
      
      setUsingCMS(false);
      setError(hasErrors);
      
      // Use fallback data
      setPosts(fallbackPosts.filter(post => post.id !== 'featured'));
      setFeaturedPost(fallbackPosts.find(post => post.id === 'featured'));
      setCategories([
        { id: 1, name: 'SEO Tips', slug: 'seo-tips', count: 5 },
        { id: 2, name: 'Technical SEO', slug: 'technical-seo', count: 3 },
        { id: 3, name: 'Content Strategy', slug: 'content-strategy', count: 2 },
      ]);
      setLoading(false);
      return;
    }
    
    setUsingCMS(true);
    setError(null);
  }, [postsError, featuredError, categoriesError, settingsError]);
  
  // Process CMS data when it arrives
  useEffect(() => {
    if (!usingCMS) return;
    
    if (postsData?.posts?.nodes) {
      const adaptedPosts = adaptPosts(postsData.posts.nodes);
      setPosts(adaptedPosts);
    }
    
    if (featuredData?.posts?.nodes?.[0]) {
      const adaptedFeatured = adaptPost(featuredData.posts.nodes[0]);
      setFeaturedPost(adaptedFeatured);
    }
    
    if (categoriesData?.categories?.nodes) {
      const adaptedCategories = adaptCategories(categoriesData.categories.nodes);
      setCategories(adaptedCategories);
    }
    
    if (settingsData) {
      setSiteSettings({
        title: settingsData.generalSettings?.title || 'Marden SEO',
        description: settingsData.generalSettings?.description || '',
        url: settingsData.generalSettings?.url || '',
        menus: (settingsData.menus?.nodes || []).map(menu => ({
          ...menu,
          items: adaptMenuItems(menu.menuItems?.nodes || [])
        }))
      });
    }
    
    // Update loading state
    const isLoading = postsLoading || featuredLoading || categoriesLoading || settingsLoading;
    setLoading(isLoading);
  }, [
    usingCMS,
    postsData, 
    featuredData, 
    categoriesData, 
    settingsData,
    postsLoading, 
    featuredLoading, 
    categoriesLoading, 
    settingsLoading
  ]);
  
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
    // Refetch all queries
    window.location.reload(); // Simple refresh for now
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
    usingCMS,
    
    // Methods
    getPostById,
    getPostsByCategory,
    searchPosts,
    refreshData,
    
    // Metadata
    totalPosts: posts.length,
    isConnected: usingCMS && !error,
  };
  
  return (
    <WordPressContext.Provider value={contextValue}>
      {children}
    </WordPressContext.Provider>
  );
};

export default WordPressProvider;
