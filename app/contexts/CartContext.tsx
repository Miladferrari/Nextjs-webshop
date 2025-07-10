'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon } from '@/lib/woocommerce';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  appliedCoupon: any | null;
  applyDiscount: (coupon: any) => void;
  removeDiscount: () => void;
  getDiscountAmount: () => number;
  getTotalPriceAfterDiscount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem('noodklaar-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    
    // Load saved coupon
    const savedCoupon = localStorage.getItem('noodklaar-coupon');
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (error) {
        console.error('Failed to parse coupon from localStorage:', error);
      }
    }
    
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('noodklaar-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { product, quantity }];
    });
    // Open the slide-in cart when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('noodklaar-coupon');
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const applyDiscount = (coupon: any) => {
    setAppliedCoupon(coupon);
    localStorage.setItem('noodklaar-coupon', JSON.stringify(coupon));
  };

  const removeDiscount = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('noodklaar-coupon');
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = getTotalPrice();
    
    if (appliedCoupon.discount_type === 'percent') {
      return (subtotal * parseFloat(appliedCoupon.amount)) / 100;
    } else if (appliedCoupon.discount_type === 'fixed_cart') {
      return Math.min(parseFloat(appliedCoupon.amount), subtotal);
    }
    
    return 0;
  };

  const getTotalPriceAfterDiscount = () => {
    const subtotal = getTotalPrice();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal - discount);
  };

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      appliedCoupon,
      applyDiscount,
      removeDiscount,
      getDiscountAmount,
      getTotalPriceAfterDiscount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}