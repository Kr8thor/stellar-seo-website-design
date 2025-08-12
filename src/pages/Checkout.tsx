// Enhanced Checkout Page with Stripe Integration
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import StripeCheckout from '@/components/StripeCheckout';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  useSEO({
    title: 'Secure Checkout | Marden SEO',
    description: 'Complete your secure purchase of professional SEO services. Fast, secure payment processing with Stripe.',
    keywords: ['secure checkout', 'payment', 'seo services payment', 'stripe payment'],
    noIndex: true
  });

  const { 
    items, 
    getCartTotal, 
    appliedCoupon,
    couponDiscount,
    getFinalTotal,
    clearCart,
    hasSubscriptionItems,
    hasOneTimeItems,
    getSubscriptionItems,
    getOneTimeItems
  } = useCart();
  const subtotal = getCartTotal();
  const finalTotal = getFinalTotal();

  const handlePaymentSuccess = (paymentIntent: any) => {
    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
    });
    
    // Track conversion in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: paymentIntent.id,
          value: finalTotal,
          currency: 'USD',
          items: items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });
    }

    // Redirect to success page
    navigate('/payment-success', { 
      state: { 
        paymentIntent,
        items: [...items] 
      } 
    });
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add services to your cart to proceed with checkout.</p>
            <Link to="/services-pricing">
              <Button>Browse Services</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely with Stripe</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                        {item.recurring && item.recurring !== 'one-time' && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {item.recurring}
                          </Badge>
                        )}
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      ${((item.customPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Subscription Notice */}
              {hasSubscriptionItems() && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-blue-900">Subscription Items</p>
                      <p className="text-blue-700 mt-1">
                        You have {getSubscriptionItems().length} recurring subscription(s) that will be billed monthly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4" />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
                <p className="text-sm text-gray-600">
                  All transactions are secure and encrypted. Your payment information is never stored on our servers.
                </p>
              </div>

              <StripeCheckout 
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  By completing this purchase, you agree to our{' '}
                  <Link to="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . For subscription services, you will be charged monthly until you cancel.
                </p>
              </div>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-sm">Money Back Guarantee</p>
                    <p className="text-xs text-gray-600">30-day satisfaction guarantee</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-sm">Secure Payments</p>
                    <p className="text-xs text-gray-600">Processed by Stripe</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;