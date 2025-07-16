import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, X, CreditCard, Filter, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { servicesCatalog } from '@/data/servicesCatalog';
import { useSEOWithKey, PAGE_KEYS } from '@/hooks/useSEO';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  // 🎯 COMPREHENSIVE SEO IMPLEMENTATION - Enhanced meta descriptions and keywords
  useSEOWithKey(PAGE_KEYS.cart);

  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    addToCart, 
    isInCart,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    getFinalTotal
  } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { toast } = useToast();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(servicesCatalog.map(item => item.category)))];

  // Filter services
  const filteredServices = servicesCatalog.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getRecurringLabel = (recurring?: string) => {
    switch (recurring) {
      case 'monthly': return '/month';
      case 'yearly': return '/year';
      default: return '';
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    setIsApplyingCoupon(true);
    const result = applyCoupon(couponCode);
    
    if (result.success) {
      toast({
        title: "Coupon applied!",
        description: result.message,
      });
      setCouponCode('');
    } else {
      toast({
        title: "Invalid coupon",
        description: result.message,
        variant: "destructive",
      });
    }
    
    setIsApplyingCoupon(false);
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Service Selection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of SEO, development, and automation services
          </p>
        </div>
        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Catalog */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Filter className="h-5 w-5 text-gray-400" />
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600 mt-1">{service.description}</p>
                    </div>
                    {service.popular && (
                      <Badge className="bg-primary text-white">Popular</Badge>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(service.price)}
                    </span>
                    <span className="text-gray-600">{getRecurringLabel(service.recurring)}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-sm text-gray-500 italic">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>
                  {service.timeline && (
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Timeline:</strong> {service.timeline}
                    </p>
                  )}

                  <Button
                    className="w-full"
                    variant={isInCart(service.id) ? "secondary" : "default"}
                    onClick={() => {
                      if (!isInCart(service.id)) {
                        addToCart({
                          id: service.id,
                          name: service.name,
                          description: service.description,
                          price: service.price,
                          category: service.category,
                          recurring: service.recurring,
                          features: service.features,
                        });
                      }
                    }}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No services found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2" />
                Your Cart
              </h2>

              {items.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {formatPrice(item.price)}{getRecurringLabel(item.recurring)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {item.quantity > 1 && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">{formatPrice(getCartTotal())}</span>
                    </div>
                    
                    {/* Coupon Code Section */}
                    {!appliedCoupon ? (
                      <div className="mb-4">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleApplyCoupon}
                            disabled={isApplyingCoupon}
                          >
                            <Tag className="h-4 w-4 mr-1" />
                            Apply
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              Coupon Applied: {appliedCoupon.code}
                            </p>
                            <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Discount:</span>
                          <span className="text-sm font-semibold text-green-600">
                            -{formatPrice(couponDiscount)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{formatPrice(getFinalTotal())}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      * Monthly services will be billed recurring
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        // Stripe checkout will be integrated here
                        alert('Stripe checkout integration coming soon!');
                      }}
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        clearCart();
                        removeCoupon();
                      }}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Not sure which services are right for you? Let's discuss your needs.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/contact">Schedule Consultation</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;