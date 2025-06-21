
import React from 'react';

interface BlogHeaderProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  author?: string;
  isFeatured?: boolean;
}

const BlogHeader = ({ title, category, date, readTime, author, isFeatured }: BlogHeaderProps) => {
  return (
    <header className={`mb-8 ${isFeatured ? 'text-center' : ''}`}>
      {isFeatured && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-amber-500 font-medium">Featured Article</span>
        </div>
      )}
      
      <div className={`flex items-center gap-4 mb-4 text-sm text-muted-foreground ${isFeatured ? 'justify-center' : ''}`}>
        <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded">
          {category}
        </span>
        <div className="flex items-center">
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <span>{readTime}</span>
        </div>
      </div>
      
      <h1 className={`heading-lg mb-6 ${isFeatured ? 'max-w-3xl mx-auto' : ''}`}>{title}</h1>
      
      {author && (
        <div className={`flex items-center ${isFeatured ? 'justify-center' : ''} gap-3`}>
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg uppercase font-medium">
            {author[0]}
          </div>
          <span>By {author}</span>
        </div>
      )}
    </header>
  );
};

export default BlogHeader;
