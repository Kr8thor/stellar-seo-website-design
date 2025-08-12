// Enhanced Cart Context with Payment Integration
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateCoupon, Coupon } from '@/data/coupons';
import { 
  PaymentIntent, 
  Subscription, 
  PaymentMethod, 
  Customer,
  PaymentService
} from '../types/payment';

// Cart Item interface for internal cart operations
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  recurring?: 'monthly' | 'yearly' | 'one-time';
  features?: string[];
  customOptions?: Record<string, any>;
  // Payment-related fields
  stripePriceId?: string;
  paymentType?: 'subscription' | 'one-time' | 'custom' | 'hourly';
  customPrice?: number;
  duration?: number;
  serviceData?: PaymentService;
}

// Payment Cart Item for payment processing
export interface PaymentCartItem {
  service: PaymentService;
  quantity: number;
  customPrice?: number;
  duration?: number;
  selectedFeatures?: string[];
  notes?: string;
}

interface CartContextType {
  // Existing cart functionality
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (id: string) => boolean;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getFinalTotal: () => number;
  
  // New payment functionality
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  currentPaymentIntent: PaymentIntent | null;
  setCurrentPaymentIntent: (intent: PaymentIntent | null) => void;
  subscriptions: Subscription[];
  setSubscriptions: (subscriptions: Subscription[]) => void;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
  isProcessingPayment: boolean;
  setIsProcessingPayment: (isProcessing: boolean) => void;
  
  // Cart analysis for payments
  getSubscriptionItems: () => CartItem[];
  getOneTimeItems: () => CartItem[];
  hasSubscriptionItems: () => boolean;
  hasOneTimeItems: () => boolean;
  getPaymentCartItems: () => PaymentCartItem[];
  
  // Utility functions
  convertToPaymentService: (cartItem: CartItem) => PaymentService;
  addServiceToCart: (service: PaymentService, customPrice?: number, duration?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Existing state with price correction for legacy cart items
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('marden-seo-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Fix any legacy cart items with incorrect pricing (cents instead of dollars)
        const correctedCart = parsedCart.map((item: CartItem) => {
          // If price is suspiciously high (likely in cents), convert to dollars
          if (item.price > 10000) {
            return {
              ...item,
              price: Math.round(item.price / 100),
              customPrice: item.customPrice && item.customPrice > 10000 ? Math.round(item.customPrice / 100) : item.customPrice
            };
          }
          return item;
        });
        return correctedCart;
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        return [];
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const savedCoupon = localStorage.getItem('marden-seo-coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  
  // New payment state
  const [customer, setCustomer] = useState<Customer | null>(() => {
    const savedCustomer = localStorage.getItem('marden-seo-customer');
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });
  
  const [currentPaymentIntent, setCurrentPaymentIntent] = useState<PaymentIntent | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Existing helper functions
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.customPrice || item.price;
      const itemTotal = itemPrice * item.quantity * (item.duration || 1);
      return total + itemTotal;
    }, 0);
  };

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('marden-seo-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('marden-seo-coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('marden-seo-coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('marden-seo-customer', JSON.stringify(customer));
    } else {
      localStorage.removeItem('marden-seo-customer');
    }
  }, [customer]);

  // Recalculate discount when cart or coupon changes
  useEffect(() => {
    if (appliedCoupon) {
      const cartTotal = getCartTotal();
      const validation = validateCoupon(appliedCoupon.code, items, cartTotal);
      if (validation.valid) {
        setCouponDiscount(validation.discount);
      } else {
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    }
  }, [items, appliedCoupon]);

  // Existing cart functions
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCurrentPaymentIntent(null);
    setPaymentError(null);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (id: string) => {
    return items.some(item => item.id === id);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cartTotal = getCartTotal();
    const validation = validateCoupon(code, items, cartTotal);
    
    if (validation.valid && validation.coupon) {
      setAppliedCoupon(validation.coupon);
      setCouponDiscount(validation.discount);
      return { success: true, message: validation.message };
    }
    
    return { success: false, message: validation.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    return Math.max(0, subtotal - couponDiscount);
  };

  // New payment-related functions
  const getSubscriptionItems = (): CartItem[] => {
    return items.filter(item => 
      item.paymentType === 'subscription' || 
      item.recurring === 'monthly' || 
      item.recurring === 'yearly'
    );
  };

  const getOneTimeItems = (): CartItem[] => {
    return items.filter(item => 
      item.paymentType === 'one-time' || 
      item.paymentType === 'custom' || 
      item.paymentType === 'hourly' ||
      item.recurring === 'one-time' ||
      !item.recurring
    );
  };

  const hasSubscriptionItems = (): boolean => {
    return getSubscriptionItems().length > 0;
  };

  const hasOneTimeItems = (): boolean => {
    return getOneTimeItems().length > 0;
  };

  const convertToPaymentService = (cartItem: CartItem): PaymentService => {
    return {
      id: cartItem.id,
      name: cartItem.name,
      description: cartItem.description,
      type: cartItem.paymentType || 'one-time',
      basePrice: (cartItem.customPrice || cartItem.price) * 100, // Convert dollars to cents
      billingPeriod: cartItem.recurring === 'monthly' ? 'monthly' : cartItem.recurring === 'yearly' ? 'yearly' : undefined,
      category: cartItem.category as any,
      features: cartItem.features || [],
      stripePriceId: cartItem.stripePriceId,
      customPricing: cartItem.paymentType === 'custom' ? {
        min: cartItem.price * 100, // Convert to cents
        max: (cartItem.customPrice || cartItem.price) * 100, // Convert to cents
        description: 'Custom pricing based on requirements'
      } : undefined
    };
  };

  const getPaymentCartItems = (): PaymentCartItem[] => {
    return items.map(item => ({
      service: convertToPaymentService(item),
      quantity: item.quantity,
      customPrice: item.customPrice,
      duration: item.duration,
      selectedFeatures: item.features,
      notes: item.customOptions?.notes
    }));
  };

  const addServiceToCart = (service: PaymentService, customPrice?: number, duration?: number) => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: service.id,
      name: service.name,
      description: service.description,
      price: Math.round(service.basePrice / 100), // Convert cents to dollars
      category: service.category,
      recurring: service.type === 'subscription' ? (service.billingPeriod || 'monthly') : 'one-time',
      features: service.features,
      stripePriceId: service.stripePriceId,
      paymentType: service.type,
      customPrice: customPrice ? Math.round(customPrice / 100) : undefined, // Convert if provided
      duration,
      serviceData: service,
      customOptions: duration ? { duration } : undefined
    };
    
    addToCart(cartItem);
  };

  const value = {
    // Existing cart functionality
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    getFinalTotal,
    
    // New payment functionality
    customer,
    setCustomer,
    currentPaymentIntent,
    setCurrentPaymentIntent,
    subscriptions,
    setSubscriptions,
    paymentMethods,
    setPaymentMethods,
    paymentError,
    setPaymentError,
    isProcessingPayment,
    setIsProcessingPayment,
    
    // Cart analysis for payments
    getSubscriptionItems,
    getOneTimeItems,
    hasSubscriptionItems,
    hasOneTimeItems,
    getPaymentCartItems,
    
    // Utility functions
    convertToPaymentService,
    addServiceToCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
