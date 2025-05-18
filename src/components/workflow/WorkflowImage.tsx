
import React from 'react';
import FallbackImage from '../ui/fallback-image';

interface WorkflowImageProps {
  src: string;
  alt: string;
  className?: string;
}

const WorkflowImage: React.FC<WorkflowImageProps> = ({ src, alt, className }) => {
  return (
    <FallbackImage 
      src={src}
      alt={alt}
      className={`rounded-lg shadow-lg w-full h-64 object-cover object-center border border-gray-200 ${className || ''}`}
      fallbackSrc="/images/workflow-placeholder.svg"
    />
  );
};

export default WorkflowImage;
