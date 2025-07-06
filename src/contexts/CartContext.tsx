import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateCoupon, Coupon } from '@/data/coupons';

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
}

interface CartContextType {
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
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('marden-seo-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const savedCoupon = localStorage.getItem('marden-seo-coupon');
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Define helper functions before useEffect
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marden-seo-cart', JSON.stringify(items));
  }, [items]);

  // Save coupon to localStorage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('marden-seo-coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('marden-seo-coupon');
    }
  }, [appliedCoupon]);

  // Recalculate discount when cart or coupon changes
  useEffect(() => {
    if (appliedCoupon) {
      const cartTotal = getCartTotal();
      const validation = validateCoupon(appliedCoupon.code, items, cartTotal);
      if (validation.valid) {
        setCouponDiscount(validation.discount);
      } else {
        // Remove invalid coupon
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    }
  }, [items, appliedCoupon]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return currentItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Add new item with quantity 1
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

  const value = {
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;