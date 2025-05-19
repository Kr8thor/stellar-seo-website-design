/**
 * Google Tag Manager utilities
 */

/**
 * Push an event to the dataLayer
 * @param event Event name
 * @param properties Event properties
 */
export const pushEvent = (event: string, properties: Record<string, any> = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...properties,
  });
};

/**
 * Track a page view
 * @param path Page path
 * @param title Page title
 */
export const trackPageView = (path: string, title: string) => {
  pushEvent('pageview', {
    page: {
      path,
      title,
    },
  });
};

/**
 * Track user interaction
 * @param category Event category
 * @param action Event action
 * @param label Event label (optional)
 * @param value Event value (optional)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  pushEvent('interaction', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  });
};
