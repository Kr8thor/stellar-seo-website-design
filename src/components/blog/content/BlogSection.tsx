
import React from 'react';

interface BlogSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const BlogSection = ({ title, children, className = '' }: BlogSectionProps) => {
  return (
    <section className={`my-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4 border-b border-gray-200 pb-2">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default BlogSection;
