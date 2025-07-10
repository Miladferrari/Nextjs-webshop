'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import type { Product } from '@/lib/woocommerce';

// Real-time search using WooCommerce API
const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error('Search failed:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

export default function ZoekenPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      if (query) {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      }
      setLoading(false);
    };
    
    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen bg-off-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy-blue mb-4">Zoekresultaten</h1>
        
        {query && (
          <p className="text-steel-gray mb-8">
            Zoekresultaten voor: <span className="font-semibold">"{query}"</span>
          </p>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green"></div>
            <p className="mt-4 text-steel-gray">Zoeken...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-navy-blue mb-2">Geen resultaten gevonden</h2>
            <p className="text-steel-gray mb-6">
              Probeer een andere zoekterm of bekijk onze categorieën
            </p>
            <a
              href="/noodpakketten"
              className="inline-flex items-center gap-2 bg-medical-green text-white px-6 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors"
            >
              Bekijk alle producten
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        ) : (
          <>
            <p className="text-steel-gray mb-8">
              {results.length} product{results.length === 1 ? '' : 'en'} gevonden
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}