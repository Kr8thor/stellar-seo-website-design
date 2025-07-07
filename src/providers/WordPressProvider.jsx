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
  const [usingCMS, setUsingCMS] = useState(false); // Start with false, enable only if CMS works
  
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
  
  // Initialize with fallback data immediately
  useEffect(() => {
    console.log('WordPressProvider: Initializing with fallback data');
    setPosts(fallbackPosts.filter(post => post.id !== 'featured'));
    setFeaturedPost(fallbackPosts.find(post => post.id === 'featured'));
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
  }, []);
  
  // Handle errors and determine if we should use CMS
  useEffect(() => {
    const hasErrors = postsError || featuredError || categoriesError || settingsError;
    const isAnyLoading = postsLoading || featuredLoading || categoriesLoading || settingsLoading;
    
    console.log('WordPressProvider status:', {
      hasErrors: !!hasErrors,
      isAnyLoading,
      postsError: postsError?.message,
      featuredError: featuredError?.message,
      categoriesError: categoriesError?.message,
      settingsError: settingsError?.message,
      postsData: !!postsData,
      featuredData: !!featuredData
    });
    
    if (hasErrors) {
      console.warn('CMS connection issues, using static data:', {
        postsError: postsError?.message,
        featuredError: featuredError?.message,
        categoriesError: categoriesError?.message,
        settingsError: settingsError?.message,
      });
      
      setUsingCMS(false);
      setError(hasErrors);
      setLoading(false);
      return;
    }
    
    // Check if we have successful data from CMS
    const hasValidData = postsData?.posts?.nodes || featuredData?.posts?.nodes;
    if (hasValidData && !isAnyLoading) {
      console.log('CMS data available, switching to CMS mode');
      setUsingCMS(true);
      setError(null);
    }
    
    setLoading(isAnyLoading);
  }, [postsError, featuredError, categoriesError, settingsError, postsLoading, featuredLoading, categoriesLoading, settingsLoading, postsData, featuredData]);
  
  // Process CMS data when it arrives and we're using CMS
  useEffect(() => {
    if (!usingCMS) return;
    
    console.log('Processing CMS data...');
    
    if (postsData?.posts?.nodes) {
      const adaptedPosts = adaptPosts(postsData.posts.nodes);
      console.log('Adapted posts from CMS:', adaptedPosts.length);
      setPosts(adaptedPosts);
    }
    
    if (featuredData?.posts?.nodes?.[0]) {
      const adaptedFeatured = adaptPost(featuredData.posts.nodes[0]);
      console.log('Adapted featured post from CMS:', adaptedFeatured?.title);
      setFeaturedPost(adaptedFeatured);
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
  }, [
    usingCMS,
    postsData, 
    featuredData, 
    categoriesData, 
    settingsData
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
