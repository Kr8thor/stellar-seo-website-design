// Mercury Banking API Configuration
import { MercuryConfig, MercuryAccount, MercuryTransaction } from '../types/payment';

// Mercury configuration
const mercuryConfig: MercuryConfig = {
  apiKey: import.meta.env.REACT_APP_MERCURY_API_KEY || '',
  environment: import.meta.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
  webhookSecret: import.meta.env.REACT_APP_MERCURY_WEBHOOK_SECRET
};

// Mercury API base URL
const MERCURY_API_BASE = 'https://api.mercury.com/api/v1';

// Mercury API endpoints
export const MERCURY_ENDPOINTS = {
  ACCOUNTS: '/accounts',
  TRANSACTIONS: '/transactions',
  WEBHOOKS: '/webhooks',
  RECIPIENTS: '/recipients',
  TRANSFERS: '/transfers'
} as const;

// Helper function to make Mercury API requests
export const mercuryRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  if (!mercuryConfig.apiKey) {
    throw new Error('Mercury API key is not configured');
  }

  const url = `${MERCURY_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${mercuryConfig.apiKey}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Mercury API error: ${response.status} - ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Mercury API request failed:', error);
    throw error;
  }
};

// Get Mercury account information
export const getMercuryAccounts = async (): Promise<MercuryAccount[]> => {
  try {
    const response = await mercuryRequest(MERCURY_ENDPOINTS.ACCOUNTS);
    return response.accounts || [];
  } catch (error) {
    console.error('Failed to fetch Mercury accounts:', error);
    return [];
  }
};
// Mercury Banking Utilities - Part 2

// Get Mercury transactions with filtering
export const getMercuryTransactions = async (
  accountId?: string,
  limit: number = 50,
  offset: number = 0
): Promise<MercuryTransaction[]> => {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    
    if (accountId) {
      params.append('account_id', accountId);
    }

    const response = await mercuryRequest(
      `${MERCURY_ENDPOINTS.TRANSACTIONS}?${params}`
    );
    return response.transactions || [];
  } catch (error) {
    console.error('Failed to fetch Mercury transactions:', error);
    return [];
  }
};

// Format Mercury transaction for display
export const formatMercuryTransaction = (transaction: MercuryTransaction): string => {
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: transaction.currency.toUpperCase()
  }).format(Math.abs(transaction.amount / 100));

  const type = transaction.type === 'credit' ? '+' : '-';
  return `${type}${amount}`;
};

// Helper to reconcile Stripe payment with Mercury transaction
export const reconcilePayment = async (
  stripePaymentId: string,
  mercuryTransactionId: string
): Promise<boolean> => {
  try {
    // This would typically involve updating your database
    // to link the Stripe payment with the Mercury transaction
    console.log(`Reconciling Stripe payment ${stripePaymentId} with Mercury transaction ${mercuryTransactionId}`);
    
    // In a real implementation, you'd:
    // 1. Update your database records
    // 2. Possibly call Mercury API to add metadata
    // 3. Update accounting records
    
    return true;
  } catch (error) {
    console.error('Failed to reconcile payment:', error);
    return false;
  }
};

// Mercury webhook event types
export const MERCURY_WEBHOOK_EVENTS = {
  TRANSACTION_CREATED: 'transaction.created',
  TRANSACTION_UPDATED: 'transaction.updated',
  ACCOUNT_UPDATED: 'account.updated'
} as const;

// Check if Mercury is properly configured
export const isMercuryConfigured = (): boolean => {
  return !!mercuryConfig.apiKey;
};

// Get primary business account (first active checking account)
export const getPrimaryBusinessAccount = async (): Promise<MercuryAccount | null> => {
  try {
    const accounts = await getMercuryAccounts();
    return accounts.find(account => 
      account.type === 'checking' && account.status === 'active'
    ) || null;
  } catch (error) {
    console.error('Failed to get primary business account:', error);
    return null;
  }
};
