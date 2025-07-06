
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import BlogPost from '@/components/blog/BlogPost';
import { Helmet } from 'react-helmet-async';
import { useWordPress } from '@/providers/WordPressProvider';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_SLUG } from '@/graphql/queries';
import { adaptPost } from '@/adapters/wordpressAdapter';
import { useSEO } from '@/hooks/useSEO';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { usingWordPress, getPostById, loading: wpLoading } = useWordPress();
  
  // If using WordPress and not in the provider's initial state, fetch the post by slug
  const { data: wpPostData, loading: wpPostLoading } = useQuery(
    GET_POST_BY_SLUG,
    {
      variables: { slug: id },
      skip: !usingWordPress || !id
    }
  );
  
  // Logic for handling posts from different sources
  let post = null;
  let loading = false;
  
  if (usingWordPress) {
    loading = wpPostLoading || wpLoading;
    
    // First check if we have the post in the WordPress provider
    post = getPostById(id || '');
    
    // If not found in provider but we have data from the direct query
    if (!post && wpPostData?.post) {
      post = adaptPost(wpPostData.post);
    }
  } else {
    // Use static data logic
    post = blogPosts.find(post => 
      typeof post.id === 'number' 
        ? post.id.toString() === id 
        : post.id === id
    );
  }
  
  // Dynamic SEO based on post content
  useSEO(post ? {
    title: `${post.title} | Marden SEO Blog`,
    description: post.excerpt || `Read about ${post.title} on the Marden SEO blog. Expert insights on SEO, app development, and digital marketing.`,
    keywords: `${post.title}, SEO blog, ${post.category || 'digital marketing'}, search engine optimization`,
    image: post.image || 'https://mardenseo.com/opengraph-image.png',
    type: 'article',
    author: post.author || 'Marden SEO',
    publishedTime: post.date,
    modifiedTime: post.lastModified || post.date
  } : {
    title: "Blog Post | Marden SEO",
    description: "Expert SEO and development insights from the Marden SEO team.",
    keywords: "SEO blog, digital marketing, app development",
    type: "article"
  });
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Show loading state
  if (loading) {
    return (
      <main className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-8"></div>
            <div className="h-64 bg-slate-200 rounded mb-8"></div>
            <div className="h-4 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 bg-slate-200 rounded mb-4"></div>
          </div>
        </div>
      </main>
    );
  }
  
  // If no post is found, redirect to the blog page
  if (!post) {
    return <Navigate to="/blog" />;
  }
  
  return (
    <main className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>{post.title} | Marden SEO</title>
        <style>
          {`
            .blog-content h2 {
              color: #4a5568;
              font-size: 1.75rem;
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              font-weight: 600;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 0.5rem;
            }
            
            .blog-content h3 {
              color: #4a5568;
              font-size: 1.25rem;
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
              font-weight: 600;
            }
            
            .blog-content p {
              margin-bottom: 1.5rem;
              line-height: 1.8;
            }
            
            .blog-content ul {
              margin-left: 1.5rem;
              margin-bottom: 1.5rem;
            }
            
            .blog-content ul li {
              margin-bottom: 0.5rem;
              position: relative;
              padding-left: 1.5rem;
            }
            
            .blog-content ul li::before {
              content: "•";
              color: #8b5cf6;
              font-weight: bold;
              position: absolute;
              left: 0;
              top: 0;
            }
            
            .blog-content strong {
              color: #4a5568;
              font-weight: 600;
            }
            
            .blog-post-article blockquote {
              border-left: 4px solid #8b5cf6;
              padding-left: 1rem;
              font-style: italic;
              color: #4a5568;
              margin: 1.5rem 0;
              background-color: #f8f7ff;
              padding: 1rem;
              border-radius: 0 0.375rem 0.375rem 0;
            }

            @media (max-width: 640px) {
              .blog-content h2 {
                font-size: 1.5rem;
              }
              
              .blog-content h3 {
                font-size: 1.25rem;
              }
            }
          `}
        </style>
      </Helmet>
      <BlogPost post={post} />
    </main>
  );
};

export default BlogPostDetail;
