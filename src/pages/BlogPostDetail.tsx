
import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_SLUG } from '../graphql/queries';
import BlogPost from '@/components/blog/BlogPost';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug: id },
    skip: !id,
    fetchPolicy: "cache-and-network"
  });
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Show loading state
  if (loading) {
    return (
      <main className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading article...</p>
      </main>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <main className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl mb-4 text-destructive">Error loading article</p>
        <p className="text-muted-foreground mb-6">
          We're having trouble retrieving this article. It may not exist or there might be a connection issue.
        </p>
        <Button onClick={() => navigate('/blog')}>
          Back to Blog
        </Button>
      </main>
    );
  }
  
  // If no post is found, redirect to the blog page
  if (!data?.post) {
    return <Navigate to="/blog" />;
  }
  
  // Process post data for BlogPost component
  const post = {
    id: data.post.slug,
    title: data.post.title,
    category: data.post.categories.nodes[0]?.name || "Uncategorized",
    image: data.post.featuredImage?.node?.sourceUrl || "https://via.placeholder.com/1200x600",
    content: <div dangerouslySetInnerHTML={{ __html: data.post.content }} />,
    date: format(new Date(data.post.date), 'MMM d, yyyy'),
    readTime: `${Math.ceil(data.post.content.length / 1500)} min read`,
    author: data.post.author?.node?.name,
    excerpt: data.post.excerpt,
  };
  
  return (
    <main className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>{post.title} | Marden SEO</title>
        <meta name="description" content={post.excerpt.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
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

            .blog-content img {
              max-width: 100%;
              height: auto;
              border-radius: 0.375rem;
              margin: 1.5rem 0;
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
