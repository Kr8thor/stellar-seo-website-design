/**
 * TypeScript declarations for Google Tag Manager dataLayer
 */

interface Window {
  dataLayer: Array<Record<string, any>>;
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

export {};
