
import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import BlogPost from '@/components/blog/BlogPost';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Find the post in our static data
  const post = blogPosts.find(post => post.id.toString() === id);
  
  // If no post is found, redirect to the blog page
  if (!post) {
    return <Navigate to="/blog" />;
  }
  
  return (
    <main className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
      <BlogPost post={post} />
    </main>
  );
};

export default BlogPostDetail;
