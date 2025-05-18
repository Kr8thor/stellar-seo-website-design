
import React, { useState } from 'react';

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
  const [imgSrc, setImgSrc] = useState<string>(src || '');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    console.error(`Image failed to load: ${src}`);
    if (!hasError) {
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
