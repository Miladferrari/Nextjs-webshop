'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon, ShippingRate } from '@/lib/woocommerce';

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShippingInfo {
  country: string;
  postcode: string;
  rates: ShippingRate[];
  selectedRate: ShippingRate | null;
  loading: boolean;
  error: string | null;
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
  shipping: ShippingInfo;
  setShippingCountry: (country: string) => Promise<void>;
  setShippingPostcode: (postcode: string) => Promise<void>;
  setSelectedShippingRate: (rate: ShippingRate) => void;
  getShippingCost: () => number;
  getFinalTotal: () => number;
  allowedCountries: string[];
  loadAllowedCountries: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [allowedCountries, setAllowedCountries] = useState<string[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo>({
    country: 'NL', // Default to Netherlands
    postcode: '',
    rates: [],
    selectedRate: null,
    loading: false,
    error: null
  });

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
    // Don't add out of stock products
    if (product.stock_status !== 'instock' || product.stock_quantity === 0) {
      console.warn('Cannot add out of stock product to cart:', product.name);
      return;
    }
    
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

  // Load allowed countries
  const loadAllowedCountries = async () => {
    try {
      const response = await fetch('/api/shipping?action=countries', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      if (data.countries) {
        console.log('[Cart] Loaded allowed countries:', data.countries);
        setAllowedCountries(data.countries);
      }
    } catch (error) {
      console.error('Failed to load allowed countries:', error);
    }
  };

  // Load allowed countries on mount
  useEffect(() => {
    loadAllowedCountries();
  }, []);

  // Set shipping country and calculate rates
  const calculateShipping = async (country: string, postcode: string) => {
    setShipping(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const total = getTotalPriceAfterDiscount();
      const couponParam = appliedCoupon ? `&coupon=${encodeURIComponent(appliedCoupon.code)}` : '';
      const postcodeParam = postcode ? `&postcode=${encodeURIComponent(postcode)}` : '';
      const response = await fetch(`/api/shipping?action=calculate&country=${country}&total=${total}${couponParam}${postcodeParam}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      
      if (data.rates && data.rates.length > 0) {
        setShipping(prev => ({
          ...prev,
          rates: data.rates,
          selectedRate: data.rates.length > 0 ? data.rates[0] : null,
          loading: false,
          error: null
        }));
      } else {
        // No shipping methods available
        setShipping(prev => ({
          ...prev,
          rates: [],
          selectedRate: null,
          loading: false,
          error: 'Er zijn geen verzendmethodes beschikbaar voor dit adres. Controleer je postcode en land of neem contact met ons op.'
        }));
      }
    } catch (error) {
      console.error('Failed to calculate shipping:', error);
      setShipping(prev => ({ 
        ...prev, 
        loading: false,
        error: 'Er is een fout opgetreden bij het berekenen van de verzendkosten.'
      }));
    }
  };

  const setShippingCountry = async (country: string) => {
    setShipping(prev => ({ ...prev, country }));
    // Refresh countries list to pick up any new zones
    await loadAllowedCountries();
    await calculateShipping(country, shipping.postcode);
  };

  const setShippingPostcode = async (postcode: string) => {
    setShipping(prev => ({ ...prev, postcode }));
    await calculateShipping(shipping.country, postcode);
  };

  // Update shipping rates when total or coupon changes
  useEffect(() => {
    if (shipping.country && isHydrated && items.length > 0) {
      calculateShipping(shipping.country, shipping.postcode);
    }
  }, [items, appliedCoupon]);

  const setSelectedShippingRate = (rate: ShippingRate) => {
    setShipping(prev => ({ ...prev, selectedRate: rate }));
  };

  const getShippingCost = () => {
    return shipping.selectedRate?.cost || 0;
  };

  const getFinalTotal = () => {
    return getTotalPriceAfterDiscount() + getShippingCost();
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
      getTotalPriceAfterDiscount,
      shipping,
      setShippingCountry,
      setShippingPostcode,
      setSelectedShippingRate,
      getShippingCost,
      getFinalTotal,
      allowedCountries,
      loadAllowedCountries
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