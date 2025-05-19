
import React, { useState, useEffect } from 'react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  fallbackSrc = '/images/workflow-placeholder.svg',
  alt,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(true);

  useEffect(() => {
    // Reset error state when the source changes
    setHasError(false);
    
    // Only attempt to load the image if it's a valid URL
    if (src && !src.startsWith('http')) {
      setImgSrc(src);
    } else {
      // Handle placeholder URLs by setting the fallback
      setImgSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      console.error(`Image failed to load: ${src}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Image'}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default FallbackImage;
