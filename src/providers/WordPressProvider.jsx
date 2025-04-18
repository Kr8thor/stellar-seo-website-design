
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_FEATURED_POST } from '../graphql/queries';
import { adaptPosts, adaptPost } from '../adapters/wordpressAdapter';
import { blogPosts as fallbackPosts } from '../data/blogPosts';

// Create a context for WordPress data
const WordPressContext = createContext();

// Hook to use WordPress data
export const useWordPress = () => useContext(WordPressContext);

// Provider component to fetch and provide WordPress data
export const WordPressProvider = ({ children }) => {
  const [usingWP, setUsingWP] = useState(false);
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Configure WordPress integration flag
  useEffect(() => {
    const wpEnabled = import.meta.env.VITE_USE_WORDPRESS === 'true';
    setUsingWP(wpEnabled);
    
    // If not using WordPress, use fallback data
    if (!wpEnabled) {
      setPosts(fallbackPosts.filter(post => post.id !== 'featured'));
      setFeaturedPost(fallbackPosts.find(post => post.id === 'featured'));
      setLoading(false);
    }
  }, []);
  
  // Fetch WordPress posts if WordPress is enabled
  const { data: postsData, loading: postsLoading } = useQuery(GET_ALL_POSTS, {
    variables: { first: 100 },
    skip: !usingWP
  });
  
  // Fetch featured post if WordPress is enabled
  const { data: featuredData, loading: featuredLoading } = useQuery(GET_FEATURED_POST, {
    skip: !usingWP
  });
  
  // Process WordPress data when it arrives
  useEffect(() => {
    if (usingWP && postsData?.posts?.nodes) {
      setPosts(adaptPosts(postsData.posts.nodes));
    }
    
    if (usingWP && featuredData?.posts?.nodes?.[0]) {
      setFeaturedPost(adaptPost(featuredData.posts.nodes[0]));
    }
    
    if (usingWP && !postsLoading && !featuredLoading) {
      setLoading(false);
    }
  }, [usingWP, postsData, featuredData, postsLoading, featuredLoading]);
  
  // Get a specific post by ID
  const getPostById = (id) => {
    if (id === 'featured') return featuredPost;
    return posts.find(post => String(post.id) === String(id));
  };
  
  return (
    <WordPressContext.Provider value={{
      posts,
      featuredPost,
      loading,
      getPostById,
      usingWordPress: usingWP,
    }}>
      {children}
    </WordPressContext.Provider>
  );
};

export default WordPressProvider;
