export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  description: string;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usageCount: number;
  minimumPurchase?: number;
  applicableCategories?: string[];
  applicableServices?: string[];
}

// Sample coupons for testing - In production, these would come from a database
export const availableCoupons: Coupon[] = [
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% off your first purchase',
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 1000,
    usageCount: 0,
    minimumPurchase: 500
  },
  {
    code: 'SEO2024',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% off all SEO services',
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageCount: 0,
    applicableCategories: ['SEO Services']
  },
  {
    code: 'BUNDLE500',
    discountType: 'fixed',
    discountValue: 500,
    description: '$500 off when you spend $5000 or more',
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageCount: 0,
    minimumPurchase: 5000
  },
  {
    code: 'EDUCATION10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off educational services',
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageCount: 0,
    applicableCategories: ['Educational Services']
  },
  {
    code: 'NEWAPP25',
    discountType: 'percentage',
    discountValue: 25,
    description: '25% off app development for new clients',
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31'),
    usageLimit: 50,
    usageCount: 0,
    applicableCategories: ['App Development'],
    minimumPurchase: 2000
  }
];

export const validateCoupon = (code: string, cartItems: any[], cartTotal: number): {
  valid: boolean;
  discount: number;
  message: string;
  coupon?: Coupon;
} => {
  const coupon = availableCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  
  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid coupon code' };
  }

  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validUntil) {
    return { valid: false, discount: 0, message: 'Coupon has expired' };
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, discount: 0, message: 'Coupon usage limit exceeded' };
  }

  if (coupon.minimumPurchase && cartTotal < coupon.minimumPurchase) {
    return { 
      valid: false, 
      discount: 0, 
      message: `Minimum purchase of $${coupon.minimumPurchase} required` 
    };
  }

  // Check category restrictions
  if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
    const hasApplicableItem = cartItems.some(item => 
      coupon.applicableCategories?.includes(item.category)
    );
    if (!hasApplicableItem) {
      return { 
        valid: false, 
        discount: 0, 
        message: 'Coupon not valid for items in your cart' 
      };
    }
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discountType === 'percentage') {
    if (coupon.applicableCategories) {
      // Apply discount only to applicable items
      const applicableTotal = cartItems
        .filter(item => coupon.applicableCategories?.includes(item.category))
        .reduce((sum, item) => sum + (item.price * item.quantity), 0);
      discount = (applicableTotal * coupon.discountValue) / 100;
    } else {
      // Apply to entire cart
      discount = (cartTotal * coupon.discountValue) / 100;
    }
  } else {
    // Fixed discount
    discount = Math.min(coupon.discountValue, cartTotal);
  }

  return {
    valid: true,
    discount,
    message: coupon.description,
    coupon
  };
};