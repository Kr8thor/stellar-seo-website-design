import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const CartIcon: React.FC = () => {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <Link 
      to="/cart" 
      className="relative p-2 text-gray-600 hover:text-primary transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Link>
  );
};

export default CartIcon;