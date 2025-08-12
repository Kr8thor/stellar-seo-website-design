// Stripe Configuration and Service
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe - Use environment variable or fallback to test key
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE';

// Load Stripe instance
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// API endpoints (update these to match your backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.mardenseo.com';

// Payment Intent creation
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Create subscription
export const createSubscription = async (customerId: string, priceId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        priceId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Create customer
export const createCustomer = async (email: string, name: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    const customer = await response.json();
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};
// Service pricing configuration
export const STRIPE_PRICE_IDS = {
  // SEO Packages (Monthly Subscriptions)
  seo_starter: 'price_seo_starter_monthly', // $500/month
  seo_professional: 'price_seo_professional_monthly', // $1500/month
  seo_enterprise: 'price_seo_enterprise_monthly', // $3000/month
  
  // One-time Services
  seo_audit: 'price_seo_audit_onetime', // $500
  consultation: 'price_consultation_hourly', // $200/hour
  
  // App Development (Custom pricing)
  app_basic: 'price_app_basic_onetime', // $5000
  app_standard: 'price_app_standard_onetime', // $15000
  app_enterprise: 'price_app_enterprise_custom', // $50000+
  
  // Workflow Automation
  workflow_basic: 'price_workflow_basic_onetime', // $2000
  workflow_advanced: 'price_workflow_advanced_onetime', // $5000
  workflow_enterprise: 'price_workflow_enterprise_onetime', // $10000
};
// Price mapping for display
export const SERVICE_PRICES = {
  // SEO Packages
  seo_starter: {
    name: 'SEO Starter Package',
    price: 500,
    interval: 'month',
    features: [
      'Technical SEO Audit',
      'On-page Optimization',
      '5 Target Keywords',
      'Monthly Reporting',
      'Google Analytics Setup',
    ],
  },
  seo_professional: {
    name: 'SEO Professional Package',
    price: 1500,
    interval: 'month',
    features: [
      'Everything in Starter',
      'Content Strategy',
      '20 Target Keywords',
      'Link Building Campaign',
      'Competitor Analysis',
      'Bi-weekly Reporting',
    ],
  },
  seo_enterprise: {
    name: 'SEO Enterprise Package',
    price: 3000,
    interval: 'month',    features: [
      'Everything in Professional',
      'Unlimited Keywords',
      'Advanced Link Building',
      'Custom Content Creation',
      'Dedicated Account Manager',
      'Weekly Reporting & Calls',
    ],
  },
  
  // One-time Services
  seo_audit: {
    name: 'Comprehensive SEO Audit',
    price: 500,
    interval: 'one-time',
    features: [
      'Technical SEO Analysis',
      'Content Gap Analysis',
      'Competitor Research',
      'Actionable Recommendations',
      '30-minute Consultation Call',
    ],
  },
  
  consultation: {
    name: 'SEO Consultation',
    price: 200,
    interval: 'hour',
    features: [
      'Expert SEO Advice',      'Strategy Planning',
      'Q&A Session',
      'Follow-up Email Summary',
    ],
  },
};

export default {
  getStripe,
  createPaymentIntent,
  createSubscription,
  createCustomer,
  STRIPE_PRICE_IDS,
  SERVICE_PRICES,
};