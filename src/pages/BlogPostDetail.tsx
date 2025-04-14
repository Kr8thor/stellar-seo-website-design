
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
  
  const isFeatured = id === 'featured';
  
  return (
    <main className={`pt-24 pb-16 px-4 md:px-8 ${isFeatured ? 'featured-post-page bg-gradient-to-b from-white to-slate-50' : ''}`}>
      <Helmet>
        <title>{post.title} | Marden SEO</title>
        <style>
          {`
            .featured-content h2 {
              color: #4a5568;
              font-size: 1.75rem;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              font-weight: 600;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 0.5rem;
            }
            
            .featured-content h3 {
              color: #4a5568;
              font-size: 1.25rem;
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
              font-weight: 600;
            }
            
            .featured-content p {
              margin-bottom: 1.5rem;
              line-height: 1.8;
            }
            
            .featured-content ul {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            
            .featured-content ul li {
              margin-bottom: 0.5rem;
              position: relative;
              padding-left: 1.5rem;
            }
            
            .featured-content ul li::before {
              content: "•";
              color: #8b5cf6;
              font-weight: bold;
              position: absolute;
              left: 0;
              top: 0;
            }
            
            .featured-content strong {
              color: #4a5568;
              font-weight: 600;
            }
            
            @media (max-width: 640px) {
              .featured-content h2 {
                font-size: 1.5rem;
              }
              
              .featured-content h3 {
                font-size: 1.25rem;
              }
            }
            
            .featured-article blockquote {
              border-left: 4px solid #8b5cf6;
              padding-left: 1rem;
              font-style: italic;
              color: #4a5568;
              margin: 1.5rem 0;
              background-color: #f8f7ff;
              padding: 1rem;
              border-radius: 0 0.375rem 0.375rem 0;
            }
          `}
        </style>
      </Helmet>
      <BlogPost post={post} />
    </main>
  );
};

export default BlogPostDetail;
