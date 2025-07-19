
import { useEffect } from 'react';

/**
 * Component to set minimal security headers for production
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Only enforce HTTPS in production
    if (process.env.NODE_ENV === 'production' && 
        window.location.protocol !== 'https:' && 
        !window.location.hostname.includes('localhost') &&
        !window.location.hostname.includes('127.0.0.1')) {
      window.location.replace(window.location.href.replace('http:', 'https:'));
      return;
    }

    // Set minimal CSP that won't conflict with server
    const cspContent = [
      "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://cms.mardenseo.com https://*.supabase.co",
    ].join('; ');

    // Only set CSP if not already set by server
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      cspMeta.content = cspContent;
      document.head.appendChild(cspMeta);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[SECURITY] Minimal security headers configured');
    }
  }, []);

  return null;
};

export default SecurityHeaders;
