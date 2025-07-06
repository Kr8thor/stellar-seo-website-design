import { useEffect } from 'react';

declare global {
  interface Window {
    clarity: any;
  }
}

export const ClarityAnalytics = () => {
  useEffect(() => {
    // Microsoft Clarity initialization
    (function(c: any, l: any, a: string, r: string, i: string, t: any, y: any){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", import.meta.env.VITE_CLARITY_ID || "YOUR_CLARITY_ID");
  }, []);

  return null;
};
