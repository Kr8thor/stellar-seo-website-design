
import React from 'react';
import FeaturedAIPost from '@/components/blog/posts/FeaturedAIPost';
import LocalSEOPost from '@/components/blog/posts/LocalSEOPost';
import type { BlogPostProps } from '@/components/blog/BlogPost';

// Blog post metadata and components registry
export interface BlogPostData {
  id: string | number;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author?: string;
  excerpt?: string;
  component: React.ComponentType;
}

export const blogPostsRegistry: BlogPostData[] = [
  {
    id: 'local-seo-2025',
    title: "Local SEO in 2025: How to Slap Your Competitors Out of the Map Pack",
    category: "Local SEO",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    date: "July 14, 2025",
    readTime: "15 min read",
    author: "Leo Corbett",
    excerpt: "In 2025, dominating the Map Pack isn't optional. It's survival. The top 3 spots on Google's local results are the modern storefront—where clicks become calls, and calls become money.",
    component: LocalSEOPost
  },
  {
    id: 'ai-midlife-crisis',
    title: "From Google Whisperer to AI Prophet: An SEO's Midlife Crisis",
    category: "AI & SEO",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "June 21, 2025",
    readTime: "12 min read",
    author: "Leo Corbett",
    excerpt: "The era of traditional SEO is officially over. ChatGPT and AI have fundamentally changed how people find information, and your old playbook won't save you.",
    component: FeaturedAIPost
  }
];

// Convert registry format to legacy BlogPostProps format for compatibility
export const getPostContent = (id: string | number): React.ReactNode => {
  const post = blogPostsRegistry.find(p => p.id === id);
  if (!post) return null;
  
  const Component = post.component;
  return <Component />;
};

// Get post metadata without component
export const getPostMeta = (id: string | number) => {
  const post = blogPostsRegistry.find(p => p.id === id);
  if (!post) return null;
  
  const { component, ...meta } = post;
  return meta;
};

// Get all posts metadata for listing
export const getAllPostsMeta = () => {
  return blogPostsRegistry.map(({ component, ...meta }) => meta);
};
