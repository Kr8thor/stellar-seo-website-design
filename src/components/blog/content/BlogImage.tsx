
import React from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

const BlogImage = ({ src, alt, caption, className = '' }: BlogImageProps) => {
  return (
    <div className={`my-8 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="rounded-lg shadow-md w-full object-cover"
      />
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
};

export default BlogImage;
