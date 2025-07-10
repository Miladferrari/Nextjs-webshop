'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, memo, useEffect } from 'react';
import { useCartWithToast } from '../hooks/useCartWithToast';
import type { Product } from '@/lib/woocommerce';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartWithToast();
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const mainImage = product.images[0];
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  
  // Check if product is out of stock
  const isOutOfStock = product.stock_status !== 'instock' || product.stock_quantity === 0;
  
  // Mock rating data - in production this would come from the API
  const rating = 4.7;
  // Use a deterministic value based on product ID to avoid hydration mismatch
  const reviewCount = (product.id % 45) + 5;
  
  // Initialize wishlist state from localStorage
  useEffect(() => {
    const checkWishlistStatus = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          const wishlist = JSON.parse(savedWishlist);
          if (Array.isArray(wishlist)) {
            const isInWishlist = wishlist.some((item: Product) => item.id === product.id);
            setIsWishlisted(isInWishlist);
          }
        }
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };
    
    checkWishlistStatus();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', checkWishlistStatus);
    
    return () => {
      window.removeEventListener('wishlistUpdated', checkWishlistStatus);
    };
  }, [product.id]);
  
  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't add to cart if out of stock
    if (isOutOfStock) return;
    
    setIsAdding(true);
    addToCart(product, 1);
    
    // Show animation
    setTimeout(() => {
      setIsAdding(false);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }, 500);
  }, [product, addToCart, isOutOfStock]);

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      let wishlist: Product[] = [];
      
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          wishlist = parsed;
        }
      }
      
      if (!isWishlisted) {
        // Add product to wishlist
        wishlist.push(product);
      } else {
        // Remove product from wishlist
        wishlist = wishlist.filter((item: Product) => item.id !== product.id);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(!isWishlisted);
      
      // Dispatch event for other components
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  }, [isWishlisted, product]);

  return (
    <div className={`product-item bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden relative flex flex-col h-full pb-[200px] ${isOutOfStock ? 'opacity-75' : ''}`}>
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
            {mainImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt || product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </Link>
        
        {isOnSale && discount > 0 && !isOutOfStock && (
          <div className="absolute top-0 left-0 bg-amber-orange text-white text-sm font-bold px-3 py-2 rounded-br-lg">
            <span className="block leading-none">-{discount}%</span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
              UITVERKOCHT
            </div>
          </div>
        )}
        
        <button
          type="button"
          onClick={handleWishlistClick}
          title="Opslaan in wensenlijst"
          aria-label="Opslaan in wensenlijst"
          className="absolute top-2 right-2 lg:top-3 lg:right-3 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} 
            fill={isWishlisted ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/product/${product.id}`} className="block mb-3">
          <h3 className="text-lg font-medium text-navy-blue leading-tight line-clamp-2 hover:text-medical-green transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={`star-${product.id}-${i}`} 
                className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'} fill-current`} 
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <span className="text-sm text-steel-gray">({reviewCount})</span>
        </div>
      </div>
      
      <div className="absolute w-full bottom-0 left-0 px-3 pb-3">
        <div className="relative flex justify-between items-end pb-2 mb-3 border-b border-gray-100">
          <div className="flex flex-col justify-end">
            <div className="price-box">
              {isOnSale && (
                <span className="block">
                  <span className="text-xs text-steel-gray">Adviesprijs:</span>
                  <span className="text-sm text-steel-gray line-through ml-1">€&nbsp;{regularPrice.toFixed(2).replace('.', ',')}</span>
                </span>
              )}
              <span className="block mt-1">
                <span className="block text-xl font-bold text-amber-orange">
                  €&nbsp;{isNaN(price) ? 'NaN' : price.toFixed(2).replace('.', ',')}
                </span>
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding || showAdded || isOutOfStock}
          className={`w-full py-2.5 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden mb-2 ${
            isOutOfStock 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-medical-green text-white hover:bg-medical-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed'
          }`}
        >
          {isOutOfStock ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Uitverkocht</span>
            </span>
          ) : (
            <>
              <span className={`flex items-center justify-center transition-all duration-300 ${!isAdding && !showAdded ? 'opacity-100' : 'opacity-0'}`}>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 19.38 18" fill="currentColor">
                    <path d="M14 16.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-10 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S6.33 18 5.5 18 4 17.33 4 16.5zM6 13c-.45 0-.85-.3-.97-.74L2.23 2H1c-.55 0-1-.45-1-1s.45-1 1-1h2c.45 0 .85.3.97.74L4.59 3h12.8c1.1 0 2 .9 2 2 0 .31-.07.62-.21.89l-3.28 6.55a1 1 0 0 1-.89.55H6z"/>
                  </svg>
                  <svg className="w-3 h-3 -ml-1" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M15 7H9V1c0-.55-.45-1-1-1S7 .45 7 1v6H1c-.55 0-1 .45-1 1s.45 1 1 1h6v6c0 .55.45 1 1 1s1-.45 1-1V9h6c.55 0 1-.45 1-1s-.45-1-1-1"/>
                  </svg>
                </span>
                <span className="ml-2">In winkelwagen</span>
              </span>
              
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAdding ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${showAdded ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="ml-2">Toegevoegd</span>
              </span>
            </>
          )}
        </button>
        
        <Link 
          href={`/product/${product.id}`}
          className="block w-full bg-gray-100 hover:bg-gray-200 text-navy-blue py-2 px-4 rounded-md text-sm font-medium text-center transition-colors"
        >
          Meer informatie
        </Link>
        
        <div className="mt-2">
          {product.stock_status === 'instock' ? (
            <p className="flex items-center justify-start gap-1 text-sm text-medical-green">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 20C4.48 20 0 15.52 0 10S4.48 0 10 0s10 4.48 10 10c-.01 5.52-4.48 9.99-10 10zM6.5 8.89a1.003 1.003 0 0 0-.79 1.62l2.43 3.11c.19.24.48.38.79.38h.01c.31 0 .6-.15.79-.4l4.57-6c.34-.43.27-1.06-.17-1.4s-1.06-.27-1.4.17c-.01.01-.02.02-.02.03l-3.78 4.97L7.3 9.28c-.2-.25-.49-.39-.8-.39z"/>
              </svg>
              <span>Op voorraad</span>
            </p>
          ) : (
            <p className="flex items-center justify-start gap-1 text-sm text-red-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Uitverkocht</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;