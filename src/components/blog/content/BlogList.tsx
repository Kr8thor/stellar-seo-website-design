
import React from 'react';

interface BlogListProps {
  items: string[];
  variant?: 'bullet' | 'numbered' | 'checkmark';
  className?: string;
}

const BlogList = ({ items, variant = 'bullet', className = '' }: BlogListProps) => {
  const listClasses = variant === 'numbered' ? 'list-decimal' : 'list-disc';
  
  return (
    <ul className={`pl-6 mb-8 space-y-2 ${listClasses} ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="relative">
          {variant === 'checkmark' && (
            <span className="absolute -left-6 text-green-500">✓</span>
          )}
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
