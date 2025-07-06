import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyLoadSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

export const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  fallback = <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
};
