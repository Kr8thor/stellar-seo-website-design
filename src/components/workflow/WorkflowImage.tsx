import React from 'react';
import FallbackImage from '../ui/fallback-image';
interface WorkflowImageProps {
  src: string;
  alt: string;
  className?: string;
}
const WorkflowImage: React.FC<WorkflowImageProps> = ({
  src,
  alt,
  className
}) => {
  // Stock images mapping for each workflow type
  const stockImageMap: Record<string, string> = {
    'crm': '/images/workflow-samples/crm-workflow.jpg',
    'invoice': '/images/workflow-samples/invoice-workflow.jpg',
    'social': '/images/workflow-samples/social-media-workflow.jpg',
    'support': '/images/workflow-samples/support-workflow.jpg',
    'inventory': '/images/workflow-samples/inventory-workflow.jpg',
    'reporting': '/images/workflow-samples/reporting-workflow.jpg',
    'chatbot': '/images/workflow-samples/chatbot-workflow.jpg'
  };

  // Extract workflow type from the src path if it exists
  const getWorkflowType = (srcPath: string): string | null => {
    const match = srcPath.match(/workflow-samples\/(\w+)-workflow\.jpg/);
    return match ? match[1] : null;
  };

  // Determine image source - use stock image paths
  const workflowType = getWorkflowType(src);
  const actualImagePath = workflowType ? stockImageMap[workflowType] : src;
  return <div className="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80">
      <FallbackImage src={actualImagePath} alt={alt} fallbackSrc="/images/workflow-placeholder.svg" loading="lazy" className="object-fill" />
    </div>;
};
export default WorkflowImage;