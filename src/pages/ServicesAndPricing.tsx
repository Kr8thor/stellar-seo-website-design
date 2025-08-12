// Enhanced Services & Pricing Page with Cart Integration
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { seoServices, oneTimeServices, developmentServices, educationalServices, supportServices, getServiceById, formatPrice } from '@/data/services';
import { useToast } from '@/hooks/use-toast';

const ServicesAndPricing = () => {
  useSEO({
    title: "Professional SEO Services & Pricing | Marden SEO, LLC",
    description: "Transparent pricing for professional SEO services, app development, and workflow automation. Premium packages starting at $1,500/month.",
    keywords: "SEO services pricing, professional SEO packages, premium SEO services, app development pricing"
  });

  const { addServiceToCart, isInCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (serviceId: string) => {
    const service = getServiceById(serviceId);
    if (!service) {
      toast({
        title: "Error",
        description: "Service not found",
        variant: "destructive"
      });
      return;
    }

    try {
      addServiceToCart(service);
      toast({
        title: "Added to Cart!",
        description: `${service.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const handleBuyNow = (serviceId: string) => {
    handleAddToCart(serviceId);
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Professional SEO Services & Solutions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Premium SEO packages designed to deliver exceptional results. All plans include expert support and proven strategies.
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            🚀 Premium Pricing • Premium Results
          </Badge>
        </div>
      </div>

      {/* SEO Packages */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Monthly SEO Packages</h2>
          <p className="text-gray-600 text-lg">
            Comprehensive SEO services with monthly billing. Premium results guaranteed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {seoServices.map((service, index) => (
            <Card key={service.id} className={`relative ${service.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{service.name}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{formatPrice(service.basePrice)}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBuyNow(service.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddToCart(service.id)}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Cancel anytime • No long-term contracts
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* One-Time Services */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">One-Time SEO Services</h2>
          <p className="text-gray-600 text-lg">
            Individual services and comprehensive audits. No recurring charges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {oneTimeServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">{formatPrice(service.basePrice)}</span>
                  {service.type === 'hourly' && <span className="text-gray-600">/hour</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBuyNow(service.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddToCart(service.id)}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Development Services */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">App Development Services</h2>
          <p className="text-gray-600 text-lg">
            Custom web applications and modern development solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {developmentServices.map((service) => (
            <Card key={service.id} className={service.popular ? 'ring-2 ring-blue-500' : ''}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">{formatPrice(service.basePrice)}</span>
                  {service.customPricing && (
                    <p className="text-sm text-gray-600 mt-2">
                      Starting from • {service.customPricing.description}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBuyNow(service.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {service.customPricing ? 'Get Quote' : 'Buy Now'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddToCart(service.id)}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Educational Services */}
      <section className="max-w-6xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Services</h2>
          <p className="text-gray-600 text-lg">
            Learn to build websites with expert guidance and comprehensive training.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {educationalServices.map((service) => (
            <Card key={service.id} className={service.popular ? 'ring-2 ring-blue-500' : ''}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-primary">{formatPrice(service.basePrice)}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => handleBuyNow(service.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleAddToCart(service.id)}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto text-center">
        <Card className="p-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Dominate Your Market?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Choose premium SEO services that deliver exceptional results, or get a custom quote for your unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Get Custom Quote</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/cart">View Cart</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✨ Premium pricing for premium results • Expert support included
          </p>
        </Card>
      </section>
    </main>
  );
};

export default ServicesAndPricing;