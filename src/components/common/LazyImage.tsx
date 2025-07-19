import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48L3N2Zz4=',
  className = '',
  loading = 'lazy',
  onLoad
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!imageRef || loading === 'eager') {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    if (imageRef) {
      observer.observe(imageRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [imageRef, src, loading]);

  useEffect(() => {
    if (isIntersecting && imageSrc === placeholder) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        if (onLoad) onLoad();
      };
    }
  }, [isIntersecting, src, imageSrc, placeholder, onLoad]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${imageSrc === placeholder ? 'blur-sm' : ''} transition-all duration-300`}
      loading={loading}
    />
  );
};
