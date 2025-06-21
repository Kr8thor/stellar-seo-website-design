
import React from 'react';

interface BlogQuoteProps {
  children: React.ReactNode;
  author?: string;
  variant?: 'default' | 'highlight' | 'warning';
}

const BlogQuote = ({ children, author, variant = 'default' }: BlogQuoteProps) => {
  const variantClasses = {
    default: 'border-blue-500 bg-blue-50 text-blue-800',
    highlight: 'border-amber-500 bg-amber-50 text-amber-800',
    warning: 'border-red-500 bg-red-50 text-red-800'
  };

  return (
    <div className={`border-l-4 p-4 my-8 rounded-r-md ${variantClasses[variant]}`}>
      <blockquote className="italic font-medium">
        {children}
      </blockquote>
      {author && (
        <cite className="block mt-2 text-sm not-italic">— {author}</cite>
      )}
    </div>
  );
};

export default BlogQuote;
