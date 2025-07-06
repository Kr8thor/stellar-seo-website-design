interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

declare global {
  interface Window {
    gtag: any;
    clarity: any;
  }
}

export const useAnalytics = () => {
  const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Microsoft Clarity Custom Events
    if (typeof window.clarity !== 'undefined') {
      window.clarity('set', category, action);
    }
  };

  const trackConversion = (type: string, value?: number) => {
    trackEvent({
      category: 'conversion',
      action: type,
      value: value
    });
  };

  const trackEngagement = (action: string, label?: string) => {
    trackEvent({
      category: 'engagement',
      action: action,
      label: label
    });
  };

  const trackFormSubmission = (formName: string) => {
    trackEvent({
      category: 'form',
      action: 'submit',
      label: formName
    });
  };

  const trackClick = (element: string, label?: string) => {
    trackEvent({
      category: 'click',
      action: element,
      label: label
    });
  };

  return { 
    trackEvent, 
    trackConversion, 
    trackEngagement, 
    trackFormSubmission,
    trackClick 
  };
};
