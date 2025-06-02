
import { useEffect } from 'react';

/**
 * Component to set security headers and enforce HTTPS
 */
const SecurityHeaders = () => {
  useEffect(() => {
    // Only enforce HTTPS in production, not during development
    if (process.env.NODE_ENV === 'production' && 
        window.location.protocol !== 'https:' && 
        !window.location.hostname.includes('localhost') &&
        !window.location.hostname.includes('127.0.0.1')) {
      window.location.replace(window.location.href.replace('http:', 'https:'));
      return;
    }

    // Set more permissive Content Security Policy for production
    const cspContent = [
      "default-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://cms.mardenseo.com https://*.supabase.co https://api.resend.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ');

    // Add CSP meta tag if it doesn't exist
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      document.head.appendChild(cspMeta);
    }
    cspMeta.content = cspContent;

    // Add other security meta tags
    const securityMetas = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      { httpEquiv: 'X-Frame-Options', content: 'DENY' },
      { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
    ];

    securityMetas.forEach(({ name, httpEquiv, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[http-equiv="${httpEquiv}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.name = name;
        if (httpEquiv) meta.httpEquiv = httpEquiv;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    // Log security status for monitoring
    console.log('[SECURITY] Security headers configured for production');

  }, []);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;
