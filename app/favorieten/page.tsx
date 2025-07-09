'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/lib/woocommerce';

export default function FavorietenPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    try {
      const savedFavorites = localStorage.getItem('wishlist');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Ensure we have an array of products
        if (Array.isArray(parsedFavorites)) {
          // Remove any duplicates based on product ID
          const uniqueFavorites = parsedFavorites.filter((product, index, self) => 
            product && product.id && index === self.findIndex((p) => p && p.id === product.id)
          );
          setFavorites(uniqueFavorites);
          
          // Update localStorage if we removed duplicates
          if (uniqueFavorites.length !== parsedFavorites.length) {
            localStorage.setItem('wishlist', JSON.stringify(uniqueFavorites));
          }
        }
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      // Clear corrupted data
      localStorage.removeItem('wishlist');
    }
    setLoading(false);
  }, []);

  const removeFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter(product => product.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('wishlist', JSON.stringify(updatedFavorites));
    
    // Dispatch custom event to update wishlist count in header
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  if (loading) {
    return (
      <div className="bg-off-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center justify-center">
          <p className="text-center text-steel-gray">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-off-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh]">
        <h1 className="text-4xl font-bold text-navy-blue mb-8 text-center">Mijn Favorieten</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-navy-blue mb-2">Nog geen favorieten</h2>
            <p className="text-steel-gray mb-6">
              Voeg producten toe aan je favorieten door op het hartje te klikken
            </p>
            <Link
              href="/noodpakketten"
              className="inline-flex items-center gap-2 bg-medical-green text-white px-6 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors"
            >
              Bekijk producten
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-steel-gray mb-8">
              Je hebt {favorites.length} product{favorites.length === 1 ? '' : 'en'} in je favorieten
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product, index) => (
                <div key={`favorite-${product.id || index}`} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
                    aria-label="Verwijder uit favorieten"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}