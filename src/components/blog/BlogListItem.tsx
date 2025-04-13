
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { BlogPostProps } from './BlogPost';

type BlogListItemProps = {
  post: Omit<BlogPostProps, 'content'>;
};

const BlogListItem = ({ post }: BlogListItemProps) => {
  return (
    <article 
      className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded">
            {post.category}
          </span>
          <div className="text-xs text-muted-foreground">
            {post.date} · {post.readTime}
          </div>
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="font-heading text-xl mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-6">{post.excerpt || post.title}</p>
        <Button asChild variant="ghost" className="px-0 hover:bg-transparent hover:text-primary">
          <Link to={`/blog/${post.id}`} className="flex items-center">
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default BlogListItem;
