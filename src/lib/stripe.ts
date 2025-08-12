// Stripe Configuration and Utilities
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { StripeConfig } from '../types/payment';

// Environment configuration
const config: StripeConfig = {
  publishableKey: import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
  apiVersion: '2023-10-16' // Latest Stripe API version
};

// Stripe instance - lazy loaded
let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    if (!config.publishableKey) {
      console.error('Stripe publishable key is missing. Please add REACT_APP_STRIPE_PUBLISHABLE_KEY to your environment variables.');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(config.publishableKey);
  }
  return stripePromise;
};

// Stripe configuration for server-side operations (when using MCP)
export const stripeConfig = {
  apiVersion: config.apiVersion,
  typescript: true,
};

// Helper function to format Stripe errors
export const formatStripeError = (error: any): string => {
  if (error?.type === 'card_error') {
    return error.message || 'Your card was declined.';
  }
  if (error?.type === 'validation_error') {
    return error.message || 'Please check your payment details.';
  }
  if (error?.type === 'api_error') {
    return 'Payment processing is temporarily unavailable. Please try again later.';
  }
  return error?.message || 'An unexpected error occurred. Please try again.';
};

// Convert amount to Stripe format (cents)
export const toStripeAmount = (dollarAmount: number): number => {
  return Math.round(dollarAmount * 100);
};

// Convert from Stripe format (cents) to dollars
export const fromStripeAmount = (centAmount: number): number => {
  return centAmount / 100;
};
// Additional Stripe Utilities

// Stripe webhook event types we handle
export const STRIPE_WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_FAILED: 'payment_intent.payment_failed',
  SUBSCRIPTION_CREATED: 'customer.subscription.created',
  SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  INVOICE_PAID: 'invoice.payment_succeeded',
  INVOICE_FAILED: 'invoice.payment_failed',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated'
} as const;

// Stripe metadata keys for tracking
export const STRIPE_METADATA_KEYS = {
  CUSTOMER_EMAIL: 'customer_email',
  SERVICE_IDS: 'service_ids',
  CART_ITEMS: 'cart_items',
  MERCURY_CUSTOMER_ID: 'mercury_customer_id',
  ORDER_NUMBER: 'order_number',
  BUSINESS_TYPE: 'business_type'
} as const;

// Payment method types we support
export const SUPPORTED_PAYMENT_METHODS = [
  'card',
  'us_bank_account'
] as const;

// Currency configuration
export const DEFAULT_CURRENCY = 'usd';
export const SUPPORTED_CURRENCIES = ['usd'] as const;

// Subscription intervals
export const SUBSCRIPTION_INTERVALS = {
  MONTHLY: 'month',
  YEARLY: 'year'
} as const;

// Helper to validate Stripe publishable key format
export const isValidStripeKey = (key: string): boolean => {
  return key.startsWith('pk_test_') || key.startsWith('pk_live_');
};

// Helper to check if we're in test mode
export const isTestMode = (): boolean => {
  return config.publishableKey.startsWith('pk_test_');
};

// Format card brand for display
export const formatCardBrand = (brand: string): string => {
  const brandMap: Record<string, string> = {
    'visa': 'Visa',
    'mastercard': 'Mastercard',
    'amex': 'American Express',
    'discover': 'Discover',
    'diners': 'Diners Club',
    'jcb': 'JCB',
    'unionpay': 'UnionPay'
  };
  return brandMap[brand.toLowerCase()] || brand.charAt(0).toUpperCase() + brand.slice(1);
};
