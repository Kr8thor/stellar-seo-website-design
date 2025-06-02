
/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags and decode HTML entities
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate and sanitize form inputs
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: ContactFormData;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: string[] = [];
  
  // Validate name
  if (!data.name?.trim()) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  // Validate email
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Validate message
  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Sanitize data
  const sanitizedData: ContactFormData = {
    name: sanitizeHtml(data.name!),
    email: sanitizeHtml(data.email!),
    message: sanitizeHtml(data.message!),
  };
  
  return { isValid: true, errors: [], sanitizedData };
}

/**
 * Rate limiting utility for client-side
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkClientRateLimit(key: string, maxRequests = 3, windowMs = 60000): boolean {
  const now = Date.now();
  const userRecord = rateLimitStore.get(key);
  
  if (!userRecord || now > userRecord.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userRecord.count >= maxRequests) {
    return false;
  }
  
  userRecord.count++;
  return true;
}
