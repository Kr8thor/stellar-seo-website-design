
import React from 'react';
import FallbackImage from '../ui/fallback-image';

interface WorkflowImageProps {
  src: string;
  alt: string;
  className?: string;
}

const WorkflowImage: React.FC<WorkflowImageProps> = ({ src, alt, className }) => {
  // Determine if we're using the placeholder or a real image
  const isPlaceholder = !src || src.includes('placeholder');
  
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <FallbackImage 
        src={src}
        alt={alt}
        className={`rounded-lg shadow-lg w-full h-64 object-cover object-center border border-gray-200 ${className || ''}`}
        fallbackSrc="/images/workflow-placeholder.svg"
        loading="lazy"
      />
      
      {/* Add an overlay with text when using placeholder */}
      {isPlaceholder && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <p className="text-white text-center px-4">
            {alt} visualization would appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowImage;
