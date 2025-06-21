
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { getPostContent, getPostMeta } from '@/data/blogPostRegistry';

export type BlogPostProps = {
  id: number | string;
  title: string;
  category: string;
  image: string;
  content: React.ReactNode;
  date: string;
  readTime: string;
  author?: string;
  excerpt?: string;
};

const BlogPost = ({ post }: { post: BlogPostProps }) => {
  // Check if this post exists in the new registry system
  const postMeta = getPostMeta(post.id);
  const postContent = getPostContent(post.id);
  
  // Use registry data if available, otherwise fall back to legacy props
  const displayPost = postMeta ? { ...postMeta, content: postContent } : post;
  const isFeaturedArticle = displayPost.id === 'featured';
  
  return (
    <>
      <Helmet>
        <title>{displayPost.title} | Marden SEO Blog</title>
        <meta name="description" content={typeof displayPost.excerpt === 'string' ? displayPost.excerpt.substring(0, 160) : 'Blog post by Marden SEO'} />
      </Helmet>
      
      {/* Back button */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="pl-0 hover:pl-2 transition-all group">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:mr-3 transition-all" />
            Back to all articles
          </Link>
        </Button>
      </div>
      
      {/* Render the component-based content or legacy content */}
      {postContent || displayPost.content}
    </>
  );
};

export default BlogPost;
