// Customer Billing Dashboard
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import { 
  CreditCard, 
  Calendar,
  Receipt,
  Settings,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Subscription, Invoice, PaymentMethod } from '../types/payment';

const Billing = () => {
  const { toast } = useToast();
  const { subscriptions, paymentMethods, setPaymentMethods } = useCart();
  
  useSEO({
    title: 'Billing & Subscriptions | Marden SEO, LLC',
    description: 'Manage your SEO service subscriptions, payment methods, and billing history.',
    keywords: ['billing', 'subscriptions', 'payment methods', 'invoices'],
    noIndex: true
  });

  const [activeTab, setActiveTab] = useState<'subscriptions' | 'invoices' | 'payments'>('subscriptions');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - in real implementation, this would come from your backend
  const [mockSubscriptions] = useState<Subscription[]>([
    {
      id: 'sub_1',
      stripeSubscriptionId: 'sub_stripe_123',
      customerId: 'cus_123',
      status: 'active',
      currentPeriodStart: new Date('2025-01-01'),
      currentPeriodEnd: new Date('2025-02-01'),
      cancelAtPeriodEnd: false,
      items: [],
      totalAmount: 150000, // $1500 in cents
      currency: 'usd',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01')
    }
  ]);

  const [mockInvoices] = useState<Invoice[]>([
    {
      id: 'inv_1',
      invoiceNumber: 'INV-2025-001',
      customerId: 'cus_123',
      customer: {
        id: 'cus_123',
        email: 'customer@example.com',
        name: 'John Doe'
      },
      items: [],
      subtotal: 150000,
      total: 150000,
      currency: 'usd',
      status: 'paid',
      dueDate: new Date('2025-02-01'),
      paidAt: new Date('2025-01-15'),
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-15')
    }
  ]);

  const [mockPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true,
      stripePaymentMethodId: 'pm_stripe_123'
    }
  ]);

  const formatPrice = (priceInCents: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(priceInCents / 100);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, color: 'green', label: 'Active' },
      past_due: { variant: 'destructive' as const, color: 'red', label: 'Past Due' },
      canceled: { variant: 'secondary' as const, color: 'gray', label: 'Canceled' },
      unpaid: { variant: 'destructive' as const, color: 'red', label: 'Unpaid' },
      paid: { variant: 'default' as const, color: 'green', label: 'Paid' },
      pending: { variant: 'secondary' as const, color: 'yellow', label: 'Pending' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription? It will remain active until the end of your current billing period.')) {
      return;
    }

    setIsLoading(true);
    try {
      // In real implementation, call your API
      // await cancelSubscription(subscriptionId);
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled and will end at the current billing period.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openStripeCustomerPortal = async () => {
    setIsLoading(true);
    try {
      // In real implementation, this would create a Stripe customer portal session
      // const { url } = await createCustomerPortalSession();
      // window.location.href = url;
      
      toast({
        title: "Feature Coming Soon",
        description: "Stripe Customer Portal integration will be available soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your subscriptions, payment methods, and billing history</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={openStripeCustomerPortal} disabled={isLoading}>
              <Settings className="h-4 w-4 mr-2" />
              Manage in Stripe
            </Button>
            
            <Button asChild>
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'subscriptions'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="h-4 w-4 mr-2 inline" />
            Subscriptions
          </button>
          
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'invoices'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Receipt className="h-4 w-4 mr-2 inline" />
            Invoices
          </button>
          
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'payments'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <CreditCard className="h-4 w-4 mr-2 inline" />
            Payment Methods
          </button>
        </div>

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {mockSubscriptions.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Subscriptions</h3>
                <p className="text-gray-600 mb-6">You don't have any active subscriptions at the moment.</p>
                <Button asChild>
                  <Link to="/services-pricing">
                    Browse Services
                  </Link>
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {mockSubscriptions.map(subscription => (
                  <Card key={subscription.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">Advanced SEO Package</h3>
                          {getStatusBadge(subscription.status)}
                          {subscription.cancelAtPeriodEnd && (
                            <Badge variant="outline">Cancelling</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">
                          Monthly subscription • Started {subscription.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{formatPrice(subscription.totalAmount)}</p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Period</p>
                        <p className="font-medium">
                          {subscription.currentPeriodStart.toLocaleDateString()} - {subscription.currentPeriodEnd.toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Billing Date</p>
                        <p className="font-medium">{subscription.currentPeriodEnd.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Modify
                        </Button>
                        <Button variant="outline" size="sm">
                          <Receipt className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                      
                      {!subscription.cancelAtPeriodEnd && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleCancelSubscription(subscription.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>

                    {subscription.cancelAtPeriodEnd && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                          <p className="text-sm text-yellow-800">
                            This subscription will cancel on {subscription.currentPeriodEnd.toLocaleDateString()}.
                            You can reactivate it before then.
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            {mockInvoices.length === 0 ? (
              <Card className="p-12 text-center">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Invoices</h3>
                <p className="text-gray-600">You don't have any invoices yet.</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {mockInvoices.map(invoice => (
                  <Card key={invoice.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                          {getStatusBadge(invoice.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Issue Date</p>
                            <p className="font-medium">{invoice.createdAt.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Due Date</p>
                            <p className="font-medium">{invoice.dueDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              {invoice.paidAt ? 'Paid Date' : 'Amount Due'}
                            </p>
                            <p className="font-medium">
                              {invoice.paidAt ? invoice.paidAt.toLocaleDateString() : formatPrice(invoice.total)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <p className="text-xl font-bold">{formatPrice(invoice.total)}</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                          {invoice.status !== 'paid' && (
                            <Button size="sm">
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            {mockPaymentMethods.length === 0 ? (
              <Card className="p-12 text-center">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Payment Methods</h3>
                <p className="text-gray-600 mb-6">Add a payment method to manage your subscriptions.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {mockPaymentMethods.map(method => (
                  <Card key={method.id} className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-4">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {method.brand} ending in {method.last4}
                            </p>
                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button variant="outline" size="sm">
                            Set Default
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Security Notice */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Payment Processing</p>
                  <p className="text-xs text-blue-700">
                    All payment methods are securely stored and processed by Stripe. We never store your complete card details.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
};

export default Billing;
