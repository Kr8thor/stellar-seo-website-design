
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet';

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
  return (
    <article className="max-w-4xl mx-auto">
      <Helmet>
        <title>{post.title} | Marden SEO Blog</title>
        <meta name="description" content={typeof post.content === 'string' ? post.content.substring(0, 160) : 'Blog post by Marden SEO'} />
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
      
      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded">
            {post.category}
          </span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </div>
        </div>
        <h1 className="heading-lg mb-6">{post.title}</h1>
        {post.author && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg uppercase font-medium">
              {post.author[0]}
            </div>
            <span>By {post.author}</span>
          </div>
        )}
      </header>
      
      {/* Featured Image */}
      <div className="mb-10">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-auto rounded-lg shadow-md object-cover aspect-video" 
        />
      </div>
      
      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
    </article>
  );
};

export default BlogPost;
