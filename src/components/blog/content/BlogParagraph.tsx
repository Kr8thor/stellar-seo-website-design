
import React from 'react';

interface BlogParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'large';
}

const BlogParagraph = ({ children, className = '', size = 'normal' }: BlogParagraphProps) => {
  const sizeClasses = size === 'large' ? 'text-xl leading-relaxed' : '';
  
  return (
    <p className={`mb-6 ${sizeClasses} ${className}`}>
      {children}
    </p>
  );
};

export default BlogParagraph;
