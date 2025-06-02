
/**
 * Token security utilities for encrypted storage
 */

// Simple encryption/decryption for localStorage tokens
const ENCRYPTION_KEY = 'cms-auth-key-v1';

/**
 * Encrypt a token for secure storage
 */
export function encryptToken(token: string): string {
  if (!token) return '';
  
  try {
    // Simple XOR encryption for demo - in production use proper encryption
    let encrypted = '';
    for (let i = 0; i < token.length; i++) {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const tokenChar = token.charCodeAt(i);
      encrypted += String.fromCharCode(tokenChar ^ keyChar);
    }
    return btoa(encrypted); // Base64 encode
  } catch (error) {
    console.error('Token encryption failed:', error);
    return token; // Fallback to plain text
  }
}

/**
 * Decrypt a token from storage
 */
export function decryptToken(encryptedToken: string): string {
  if (!encryptedToken) return '';
  
  try {
    const encrypted = atob(encryptedToken); // Base64 decode
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const encryptedChar = encrypted.charCodeAt(i);
      decrypted += String.fromCharCode(encryptedChar ^ keyChar);
    }
    return decrypted;
  } catch (error) {
    console.error('Token decryption failed:', error);
    return encryptedToken; // Fallback to original
  }
}

/**
 * Securely store authentication token
 */
export function setSecureAuthToken(token: string | null): void {
  if (token) {
    const encrypted = encryptToken(token);
    localStorage.setItem('cmsAuthToken', encrypted);
    // Set expiration (24 hours)
    const expiration = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('cmsAuthTokenExpiry', expiration.toString());
  } else {
    localStorage.removeItem('cmsAuthToken');
    localStorage.removeItem('cmsAuthTokenExpiry');
  }
}

/**
 * Securely retrieve authentication token
 */
export function getSecureAuthToken(): string | null {
  try {
    const expiry = localStorage.getItem('cmsAuthTokenExpiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      // Token expired, remove it
      setSecureAuthToken(null);
      return null;
    }
    
    const encryptedToken = localStorage.getItem('cmsAuthToken');
    if (!encryptedToken) return null;
    
    return decryptToken(encryptedToken);
  } catch (error) {
    console.error('Token retrieval failed:', error);
    return null;
  }
}
