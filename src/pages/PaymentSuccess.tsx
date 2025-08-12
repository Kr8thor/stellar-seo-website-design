import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntent, items } = location.state || {};

  useSEO({
    title: 'Payment Successful | Marden SEO',
    description: 'Thank you for your purchase. Your payment has been processed successfully.',
    noIndex: true
  });

  useEffect(() => {
    // If no payment data, redirect to home
    if (!paymentIntent) {
      navigate('/');
      return;
    }

    // Track successful conversion
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'conversion',
        conversion_type: 'purchase_complete',
        transaction_id: paymentIntent.id,
        value: paymentIntent.amount / 100, // Convert from cents
      });
    }
  }, [paymentIntent, navigate]);

  if (!paymentIntent) {
    return null;
  }

  const orderNumber = paymentIntent.id.slice(-8).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order Number</div>
            <div className="text-2xl font-mono font-bold text-gray-900">
              #{orderNumber}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              A confirmation email has been sent to your email address
            </div>
          </div>

          {items && items.length > 0 && (
            <div className="text-left mb-8">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                        {item.recurring && item.recurring !== 'one-time' && (
                          <span className="ml-2">({item.recurring})</span>
                        )}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${((item.customPrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <Mail className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-semibold mb-1">Check Your Email</h3>
              <p className="text-sm text-gray-600">
                We've sent a receipt and order details to your email address.
              </p>
            </Card>
            <Card className="p-4 bg-purple-50 border-purple-200">
              <Download className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">Invoice Available</h3>
              <p className="text-sm text-gray-600">
                Download your invoice from your account dashboard.
              </p>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
            <p className="text-gray-600 mb-4">
              Our team will reach out within 24 hours to begin your project. 
              In the meantime, feel free to explore our resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/blog">
                <Button variant="outline">
                  Read Our Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button>
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:hello@mardenseo.com" className="text-blue-600 hover:underline">
              hello@mardenseo.com
            </a>{' '}
            or call us at{' '}
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              (123) 456-7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;