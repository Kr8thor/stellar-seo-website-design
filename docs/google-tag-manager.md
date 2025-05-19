# Google Tag Manager Integration

This project uses Google Tag Manager (GTM) for analytics and tracking.

## Container ID

GTM-P4KGF926

## Implementation Details

Google Tag Manager is implemented in two ways:

1. **HTML Implementation**: GTM scripts are directly added to `index.html`
   - The main GTM script is in the `<head>` section
   - The noscript fallback is at the beginning of the `<body>` section

2. **React Component**: `GoogleTagManager.tsx` provides a React interface
   - This component is optional since GTM is already loaded in index.html
   - It can be used for additional dynamic configuration

## Using the Data Layer

The data layer allows you to send custom events to GTM.

### Utility Functions

We provide utility functions in `src/lib/gtm.ts`:

```typescript
// Track a page view
trackPageView('/path', 'Page Title');

// Track an interaction
trackEvent('Category', 'Action', 'Label', 123);

// Custom event
pushEvent('custom_event', { property1: 'value1' });
```

### Direct Usage

You can also use the data layer directly:

```typescript
// Initialize data layer
window.dataLayer = window.dataLayer || [];

// Push an event
window.dataLayer.push({
  event: 'custom_event',
  event_category: 'User Interaction',
  event_action: 'Button Click',
  event_label: 'Sign Up Button'
});
```

## Common Use Cases

### Page View Tracking

```typescript
import { trackPageView } from '../lib/gtm';

// In a page component
useEffect(() => {
  trackPageView(location.pathname, document.title);
}, [location.pathname]);
```

### Form Submission Tracking

```typescript
import { trackEvent } from '../lib/gtm';

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Form submission logic
  
  // Track the event
  trackEvent('Form', 'Submit', 'Contact Form');
};
```

## Testing

1. Open the website in a browser
2. Open Developer Tools (F12)
3. Go to the Network tab
4. Filter for requests to "googletagmanager.com"
5. Verify that GTM is loading correctly

## GTM Configuration

All tag configuration should be done through the Google Tag Manager interface.
