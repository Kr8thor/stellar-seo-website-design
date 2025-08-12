// Payment Processing Hook
import { useState, useCallback } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { 
  PaymentIntent, 
  PaymentFormData, 
  CartItem, 
  Customer,
  ApiResponse 
} from '../types/payment';
import { formatStripeError } from '../lib/stripe';

interface UsePaymentOptions {
  onSuccess?: (paymentIntent: PaymentIntent) => void;
  onError?: (error: string) => void;
}

export const usePayment = (options: UsePaymentOptions = {}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);

  // Create payment intent for one-time payments
  const createPaymentIntent = useCallback(async (
    items: CartItem[],
    customer: Customer
  ): Promise<PaymentIntent | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customer,
          currency: 'usd'
        }),
      });

      const result: ApiResponse<PaymentIntent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error?.message || 'Failed to create payment intent');
      }

      setPaymentIntent(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment setup failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  // Process payment with payment method
  const processPayment = useCallback(async (
    formData: PaymentFormData,
    paymentIntentId?: string
  ): Promise<boolean> => {
    if (!stripe || !elements) {
      setError('Payment system not ready');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Use existing payment intent or the current one
      const intentId = paymentIntentId || paymentIntent?.id;
      if (!intentId) {
        throw new Error('No payment intent available');
      }

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(
        paymentIntent?.clientSecret || '',
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.customer.name,
              email: formData.customer.email,
              phone: formData.customer.phone,
              address: formData.customer.address
            }
          },
          setup_future_usage: formData.savePaymentMethod ? 'off_session' : undefined
        }
      );

      if (stripeError) {
        throw new Error(formatStripeError(stripeError));
      }

      if (confirmedIntent?.status === 'succeeded') {
        options.onSuccess?.(paymentIntent!);
        return true;
      } else {
        throw new Error('Payment was not completed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [stripe, elements, paymentIntent, options]);
  // Create subscription for recurring services
  const createSubscription = useCallback(async (
    items: CartItem[],
    customer: Customer,
    paymentMethodId: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customer,
          paymentMethodId,
          currency: 'usd'
        }),
      });

      const result: ApiResponse<any> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to create subscription');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Subscription creation failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  // Get customer payment methods
  const getPaymentMethods = useCallback(async (customerId: string) => {
    try {
      const response = await fetch(`/api/customers/${customerId}/payment-methods`);
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (err) {
      console.error('Failed to fetch payment methods:', err);
      return [];
    }
  }, []);

  // Cancel subscription
  const cancelSubscription = useCallback(async (subscriptionId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result: ApiResponse<any> = await response.json();
      return result.success;
    } catch (err) {
      console.error('Failed to cancel subscription:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isLoading,
    error,
    paymentIntent,
    
    // Actions
    createPaymentIntent,
    processPayment,
    createSubscription,
    getPaymentMethods,
    cancelSubscription,
    
    // Utilities
    clearError: () => setError(null),
    resetPayment: () => {
      setPaymentIntent(null);
      setError(null);
    }
  };
};
