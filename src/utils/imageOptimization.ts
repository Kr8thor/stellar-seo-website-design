// Utility functions for image optimization and alt text generation

interface ImageInfo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

// Generate descriptive alt text based on image context
export const generateAltText = (
  imageName: string,
  context?: string,
  pageType?: string
): string => {
  // Remove file extension and replace hyphens/underscores with spaces
  const baseName = imageName
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  // Context-aware alt text generation
  const contextMap: Record<string, string> = {
    hero: `Hero image showing ${baseName}`,
    service: `${baseName} service illustration`,
    portfolio: `Portfolio project: ${baseName}`,
    team: `Team member photo: ${baseName}`,
    blog: `Blog post image: ${baseName}`,
    icon: `${baseName} icon`,
    logo: `${baseName} logo`,
    screenshot: `Screenshot of ${baseName}`,
    diagram: `Diagram illustrating ${baseName}`,
    infographic: `Infographic about ${baseName}`
  };

  if (context && contextMap[context]) {
    return contextMap[context];
  }

  // Page-specific alt text
  if (pageType) {
    return `${baseName} on ${pageType} page`;
  }

  return baseName;
};

// Get optimal image dimensions based on container
export const getOptimalImageSize = (
  containerWidth: number,
  aspectRatio: number = 16/9
): { width: number; height: number } => {
  // Standard breakpoints for responsive images
  const breakpoints = [320, 640, 768, 1024, 1280, 1536, 1920];
  
  // Find the smallest breakpoint that's larger than container
  const optimalWidth = breakpoints.find(bp => bp >= containerWidth) || breakpoints[breakpoints.length - 1];
  
  return {
    width: optimalWidth,
    height: Math.round(optimalWidth / aspectRatio)
  };
};

// Generate srcset for responsive images
export const generateSrcSet = (
  baseSrc: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string => {
  return sizes
    .map(size => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
};

// Check if image should be lazy loaded based on position
export const shouldLazyLoad = (position: 'above-fold' | 'below-fold' | 'auto'): boolean => {
  if (position === 'above-fold') return false;
  if (position === 'below-fold') return true;
  
  // Auto: lazy load if not in viewport
  return true;
};

// Get image loading priority
export const getImagePriority = (
  imageType: 'hero' | 'content' | 'thumbnail' | 'icon',
  position: 'above-fold' | 'below-fold'
): 'high' | 'low' | 'auto' => {
  if (imageType === 'hero' && position === 'above-fold') return 'high';
  if (imageType === 'icon') return 'auto';
  if (position === 'below-fold') return 'low';
  
  return 'auto';
};

// Enhanced image info with SEO optimization
export const optimizeImageInfo = (
  image: ImageInfo,
  context?: string,
  pageType?: string
): ImageInfo => {
  return {
    ...image,
    alt: image.alt || generateAltText(image.src, context, pageType),
    loading: image.loading || 'lazy'
  };
};
