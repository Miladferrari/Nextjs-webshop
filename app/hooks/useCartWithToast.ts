'use client';

import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { Product } from '@/lib/woocommerce';

export function useCartWithToast() {
  const cart = useCart();
  const { showToast } = useToast();

  const addToCart = (product: Product, quantity: number = 1) => {
    // Check if out of stock
    if (product.stock_status !== 'instock' || product.stock_quantity === 0) {
      showToast('Dit product is uitverkocht', 'error');
      return;
    }

    // Check if product has stock management
    const hasStockLimit = product.stock_quantity !== null && product.stock_quantity > 0;
    
    // Get current quantity in cart
    const existingItem = cart.items.find(item => item.product.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + quantity;

    // Check stock limit
    if (hasStockLimit && newTotalQuantity > product.stock_quantity!) {
      showToast(
        `Er is niet genoeg voorraad van dit product beschikbaar. Maximum beschikbaar: ${product.stock_quantity}`,
        'error'
      );
      return;
    }

    // If all checks pass, add to cart
    cart.addToCart(product, quantity);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      cart.removeFromCart(productId);
      return;
    }

    // Find the item
    const item = cart.items.find(item => item.product.id === productId);
    if (!item) return;

    // Check if product has stock management
    const hasStockLimit = item.product.stock_quantity !== null && item.product.stock_quantity > 0;

    // Check stock limit
    if (hasStockLimit && newQuantity > item.product.stock_quantity!) {
      showToast(
        `Er is niet genoeg voorraad van dit product beschikbaar. Maximum beschikbaar: ${item.product.stock_quantity}`,
        'error'
      );
      return;
    }

    // If all checks pass, update quantity
    cart.updateQuantity(productId, newQuantity);
  };

  return {
    ...cart,
    addToCart,
    updateQuantity,
  };
}