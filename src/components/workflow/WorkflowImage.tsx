
import React from 'react';
import FallbackImage from '../ui/fallback-image';

interface WorkflowImageProps {
  src: string;
  alt: string;
  className?: string;
}

const WorkflowImage: React.FC<WorkflowImageProps> = ({ src, alt, className }) => {
  // Stock images mapping for each workflow type
  const stockImageMap: Record<string, string> = {
    'crm': '/images/workflow-samples/crm-workflow.jpg',
    'invoice': '/images/workflow-samples/invoice-workflow.jpg',
    'social': '/images/workflow-samples/social-media-workflow.jpg',
    'support': '/images/workflow-samples/support-workflow.jpg',
    'inventory': '/images/workflow-samples/inventory-workflow.jpg',
    'reporting': '/images/workflow-samples/reporting-workflow.jpg',
    'chatbot': '/images/workflow-samples/chatbot-workflow.jpg',
  };
  
  // Extract workflow type from the src path if it exists
  const getWorkflowType = (srcPath: string): string | null => {
    const match = srcPath.match(/workflow-samples\/(\w+)-workflow\.jpg/);
    return match ? match[1] : null;
  };
  
  // Determine image source - use stock image paths
  const workflowType = getWorkflowType(src);
  const actualImagePath = workflowType ? stockImageMap[workflowType] : src;
  
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <FallbackImage 
        src={actualImagePath}
        alt={alt}
        className={`w-full h-64 object-cover object-center border border-gray-200 ${className || ''}`}
        fallbackSrc="/images/workflow-placeholder.svg"
        loading="lazy"
      />
    </div>
  );
};

export default WorkflowImage;
