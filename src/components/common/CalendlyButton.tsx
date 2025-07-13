import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendlyButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  calendlyUrl?: string;
}

const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  showIcon = true,
  calendlyUrl = 'https://calendly.com/your-calendly-username' // Default placeholder
}) => {
  const handleClick = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calendly_click', {
        event_category: 'engagement',
        event_label: 'Schedule Meeting',
        value: 1
      });
    }

    // Open Calendly in new tab
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      type="button"
    >
      {showIcon && <Calendar className="h-4 w-4 mr-2" />}
      {children || 'Schedule Meeting'}
    </Button>
  );
};

export default CalendlyButton;
