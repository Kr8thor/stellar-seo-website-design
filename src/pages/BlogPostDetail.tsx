
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import BlogPost from '@/components/blog/BlogPost';
import { Helmet } from 'react-helmet';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the blog post with the matching ID (handling both number and string IDs)
  const post = blogPosts.find(post => 
    typeof post.id === 'number' 
      ? post.id.toString() === id 
      : post.id === id
  );
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // If no post is found, redirect to the blog page
  if (!post) {
    return <Navigate to="/blog" />;
  }
  
  return (
    <main className="pt-24 pb-16 px-4 md:px-8">
      <Helmet>
        <title>{post.title} | Marden SEO</title>
      </Helmet>
      <BlogPost post={post} />
    </main>
  );
};

export default BlogPostDetail;
