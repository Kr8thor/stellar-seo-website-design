// Cart Functionality Test Component
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { seoServices, getServiceById } from '@/data/services';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CartTest = () => {
  const { addServiceToCart, items, getCartCount, isInCart } = useCart();

  const testAddToCart = (serviceId: string) => {
    console.log('Testing add to cart for service:', serviceId);
    try {
      const service = getServiceById(serviceId);
      console.log('Service found:', service);
      
      if (!service) {
        console.error('Service not found');
        return;
      }

      addServiceToCart(service);
      console.log('Successfully added to cart');
      console.log('Current cart items:', items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cart Functionality Test</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Cart Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Cart Count: {getCartCount()}</p>
            <p>Total Items: {items.length}</p>
            <h4 className="font-semibold mt-4 mb-2">Cart Contents:</h4>
            {items.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="mb-2">
                    {item.name} - Quantity: {item.quantity} - Price: ${(item.customPrice || item.price) / 100}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Test Services</h2>
          {seoServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {service.name}
                  <span className="text-lg">${service.basePrice / 100}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{service.description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => testAddToCart(service.id)}
                    disabled={isInCart(service.id)}
                  >
                    {isInCart(service.id) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => console.log('Service:', service)}
                  >
                    Log Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CartTest;
