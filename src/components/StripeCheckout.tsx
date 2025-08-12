import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { createPaymentIntent } from '@/services/stripe';

// Initialize Stripe
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE'
);

// Card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '10px 12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

interface CheckoutFormProps {
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: string) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { getFinalTotal, items, clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  const finalTotal = getFinalTotal();

  useEffect(() => {
    // Create payment intent when component mounts
    if (finalTotal > 0) {
      createPaymentIntent(finalTotal)
        .then(secret => setClientSecret(secret))
        .catch(err => {
          setError('Failed to initialize payment. Please try again.');
          onError?.('Failed to initialize payment');
        });
    }
  }, [finalTotal, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    // Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      onError?.(result.error.message || 'Payment failed');
      setIsProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        clearCart();
        onSuccess?.(result.paymentIntent);
      }
    }
    
    setIsProcessing(false);
  };

  if (succeeded) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your purchase. You will receive a confirmation email shortly.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          Enter your card details to complete the purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="border rounded-lg p-4">
            <CardElement options={cardElementOptions} />
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Your payment information is encrypted and secure
          </div>
          
          <Button
            type="submit"
            disabled={!stripe || isProcessing || finalTotal <= 0}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${finalTotal.toFixed(2)}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Main component wrapped with Stripe Elements
const StripeCheckout: React.FC<CheckoutFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default StripeCheckout;