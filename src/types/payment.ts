// Payment Type Definitions

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret: string;
  paymentMethodId?: string;
  created: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  status: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid';
  currentPeriodEnd: number;
  currentPeriodStart: number;
  items: SubscriptionItem[];
  defaultPaymentMethod?: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionItem {
  id: string;
  priceId: string;
  quantity: number;
  productName: string;
  productDescription?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account' | 'paypal';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: Address;
  };
  isDefault?: boolean;
}

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: Address;
  metadata?: Record<string, string>;
  defaultPaymentMethodId?: string;
  subscriptions?: Subscription[];
  paymentMethods?: PaymentMethod[];
}

export interface PaymentService {
  id: string;
  name: string;
  description: string;
  type: 'subscription' | 'one-time' | 'custom' | 'hourly';
  basePrice: number; // in cents
  billingPeriod?: 'monthly' | 'yearly';
  category: 'seo' | 'app-development' | 'workflow-automation' | 'consultation';
  features: string[];
  stripePriceId?: string;
  customPricing?: {
    min: number;
    max: number;
    description: string;
  };
  metadata?: Record<string, any>;
}

export interface CheckoutSession {
  id: string;
  paymentIntentId?: string;
  subscriptionId?: string;
  customerId: string;
  lineItems: CheckoutLineItem[];
  successUrl: string;
  cancelUrl: string;
  mode: 'payment' | 'subscription' | 'setup';
  status: 'open' | 'complete' | 'expired';
  amountTotal: number;
  currency: string;
}

export interface CheckoutLineItem {
  priceId?: string;
  productName: string;
  quantity: number;
  amount: number; // in cents
  recurring?: {
    interval: 'month' | 'year';
    intervalCount: number;
  };
}

export interface Invoice {
  id: string;
  customerId: string;
  subscriptionId?: string;
  number: string;
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  amountDue: number;
  amountPaid: number;
  currency: string;
  dueDate?: number;
  paidAt?: number;
  lineItems: InvoiceLineItem[];
  pdfUrl?: string;
  hostedInvoiceUrl?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: number;
  quantity: number;
  priceId?: string;
  period?: {
    start: number;
    end: number;
  };
}

export interface PaymentError {
  code: string;
  message: string;
  type: 'card_error' | 'validation_error' | 'api_error' | 'authentication_error';
  declineCode?: string;
  param?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  customerId?: string;
  paymentMethodId?: string;
  savePaymentMethod?: boolean;
  metadata?: Record<string, string>;
  description?: string;
  receiptEmail?: string;
  setupFutureUsage?: 'on_session' | 'off_session';
}

export interface SubscriptionRequest {
  customerId: string;
  priceId: string;
  quantity?: number;
  paymentMethodId?: string;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
  cancelAtPeriodEnd?: boolean;
  prorationBehavior?: 'create_prorations' | 'none' | 'always_invoice';
}