/**
 * SEO Optimized Image Component
 * Handles alt text, lazy loading, and structured data
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  schema?: {
    name?: string;
    description?: string;
    author?: string;
    copyrightHolder?: string;
  };
}

export const SEOImage: React.FC<SEOImageProps> = ({
  src,
  alt,
  title,
  className,
  width,
  height,
  loading = 'lazy',
  sizes,
  srcSet,
  priority = false,
  schema
}) => {
  // Generate structured data for the image if schema is provided
  const imageSchema = schema ? {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": src,
    "name": schema.name || alt,
    "description": schema.description || alt,
    "author": schema.author || "Marden SEO",
    "copyrightHolder": schema.copyrightHolder || "Marden SEO"
  } : null;

  return (
    <>
      {imageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(imageSchema)}
        </script>
      )}
      <img
        src={src}
        alt={alt}
        title={title}
        className={cn("transition-opacity duration-300", className)}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        srcSet={srcSet}
        decoding="async"
      />
    </>
  );
};

// Pre-configured SEO images for common use cases
export const SEOImages = {
  hero: (src: string, alt: string) => (
    <SEOImage
      src={src}
      alt={alt}
      loading="eager"
      priority={true}
      className="w-full h-auto"
      schema={{
        name: alt,
        description: `Hero image for ${alt}`,
        author: "Marden SEO",
        copyrightHolder: "Marden SEO"
      }}
    />
  ),
  service: (src: string, serviceName: string) => (
    <SEOImage
      src={src}
      alt={`${serviceName} service illustration`}
      className="w-full h-auto rounded-lg"
      schema={{
        name: `${serviceName} Service`,
        description: `Professional ${serviceName.toLowerCase()} services by Marden SEO`,
        author: "Marden SEO"
      }}
    />
  ),
  portfolio: (src: string, projectName: string, description: string) => (
    <SEOImage
      src={src}
      alt={`${projectName} - ${description}`}
      className="w-full h-auto rounded-lg shadow-lg"
      schema={{
        name: projectName,
        description: description,
        author: "Marden SEO"
      }}
    />
  )
};

export default SEOImage;