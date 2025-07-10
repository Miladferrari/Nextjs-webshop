'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import CouponInput from '../components/CouponInput';

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalPriceAfterDiscount, 
    getDiscountAmount, 
    appliedCoupon,
    shipping
  } = useCart();
  const [removingItems, setRemovingItems] = useState<number[]>([]);

  const handleRemoveItem = (productId: number) => {
    setRemovingItems(prev => [...prev, productId]);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItems(prev => prev.filter(id => id !== productId));
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-navy-blue mb-8 text-center">Uw winkelwagen</h1>
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
              <div className="w-24 h-24 bg-off-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-navy-blue mb-3">Uw winkelwagen is leeg</h2>
              <p className="text-steel-gray mb-8 max-w-md mx-auto">
                Ontdek onze uitgebreide collectie noodpakketten en bereid u voor op elke situatie.
              </p>
              <Link href="/producten" className="inline-flex items-center gap-2 bg-medical-green text-white px-8 py-4 rounded-full font-semibold hover:bg-medical-green/90 transition-all hover:shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Start met winkelen
              </Link>
              
              {/* USPs */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <p className="text-sm text-steel-gray">Gratis verzending vanaf €50</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <p className="text-sm text-steel-gray">90 dagen bedenktijd</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-steel-gray">Veilig betalen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress indicator - matching checkout style */}
        <nav className="mb-8 w-full">
          <div className="flex items-start justify-evenly">
            {/* Step 1: Jouw winkelwagen - Active */}
            <div className="relative flex flex-col items-center justify-start flex-1">
              <span className="absolute w-full h-1 lg:h-[7px] bg-amber-orange rounded-l-full top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-amber-orange flex items-center justify-center relative z-10">
                <span className="font-bold text-lg lg:text-base text-amber-orange">1</span>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm font-semibold text-navy-blue">
                Jouw winkelwagen
              </span>
            </div>
            
            {/* Step 2: Bezorging - Locked */}
            <div className="relative flex flex-col items-center justify-start flex-1">
              <span className="absolute w-full h-1 lg:h-[7px] bg-gray-300 top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-gray-300 flex items-center justify-center relative z-10">
                <span className="font-bold text-lg lg:text-base text-gray-400">2</span>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm text-gray-400">
                Bezorging
              </span>
            </div>
            
            {/* Step 3: Controleren en Betalen - Locked */}
            <div className="relative flex flex-col items-center justify-start flex-1">
              <span className="absolute w-full h-1 lg:h-[7px] bg-gray-300 rounded-r-full top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-gray-300 flex items-center justify-center relative z-10">
                <span className="font-bold text-lg lg:text-base text-gray-400">3</span>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm text-gray-400">
                Controleren en Betalen
              </span>
            </div>
          </div>
        </nav>

        <h1 className="text-3xl font-bold text-navy-blue mb-2 text-center">Uw winkelwagen</h1>
        <p className="text-center text-steel-gray mb-8">
          {items.length} {items.length === 1 ? 'product' : 'producten'} in uw winkelwagen
        </p>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-navy-blue to-navy-blue/95 text-white">
                <h2 className="text-xl font-semibold">Uw producten</h2>
              </div>
              
              {items.map((item, index) => {
                const price = parseFloat(item.product.price);
                const regularPrice = parseFloat(item.product.regular_price);
                const isOnSale = item.product.on_sale && regularPrice > price;
                const mainImage = item.product.images[0];
                const isRemoving = removingItems.includes(item.product.id);
                
                return (
                  <div 
                    key={item.product.id} 
                    className={`p-6 ${index !== items.length - 1 ? 'border-b' : ''} transition-all duration-300 ${
                      isRemoving ? 'opacity-50 transform scale-95' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Product image */}
                      <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-2">
                          {mainImage ? (
                            <img
                              src={mainImage.src}
                              alt={mainImage.alt || item.product.name}
                              className="max-w-full max-h-full object-contain"
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-steel-gray">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Link>
                      
                      {/* Product details */}
                      <div className="flex-grow">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-navy-blue hover:text-medical-green transition-colors text-lg">
                            {item.product.name}
                          </h3>
                        </Link>
                        
                        {/* Stock status */}
                        {item.product.stock_status === 'instock' ? (
                          <p className="flex items-center gap-1 text-sm text-medical-green mt-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 20C4.48 20 0 15.52 0 10S4.48 0 10 0s10 4.48 10 10c-.01 5.52-4.48 9.99-10 10zM6.5 8.89a1.003 1.003 0 0 0-.79 1.62l2.43 3.11c.19.24.48.38.79.38h.01c.31 0 .6-.15.79-.4l4.57-6c.34-.43.27-1.06-.17-1.4s-1.06-.27-1.4.17c-.01.01-.02.02-.02.03l-3.78 4.97L7.3 9.28c-.2-.25-.49-.39-.8-.39z"/>
                            </svg>
                            Op voorraad
                          </p>
                        ) : (
                          <p className="flex items-center gap-1 text-sm text-red-500 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Uitverkocht
                          </p>
                        )}
                        
                        {/* Price */}
                        <div className="mt-2">
                          {isOnSale && (
                            <span className="text-sm text-steel-gray line-through mr-2">€{regularPrice.toFixed(2)}</span>
                          )}
                          <span className="text-xl font-bold text-amber-orange">€{price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-4 py-2 hover:bg-gray-200 transition-colors text-navy-blue"
                              disabled={isRemoving}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 font-semibold text-navy-blue min-w-[3rem] text-center bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-4 py-2 hover:bg-gray-200 transition-colors text-navy-blue"
                              disabled={isRemoving}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="flex items-center gap-1 text-amber-orange hover:text-amber-orange/80 transition-colors text-sm font-medium"
                            disabled={isRemoving}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Verwijderen
                          </button>
                        </div>
                      </div>
                      
                      {/* Item total */}
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-steel-gray mb-1">Totaal</p>
                        <p className="text-xl font-bold text-navy-blue">€{(price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    
                    {/* Mobile total */}
                    <div className="mt-4 pt-4 border-t sm:hidden flex justify-between items-center">
                      <span className="text-steel-gray">Totaal</span>
                      <span className="text-xl font-bold text-navy-blue">€{(price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Coupon code section */}
            <div className="mt-6">
              <CouponInput />
            </div>
            
            {/* Free shipping progress */}
            {shipping.rates.length > 0 && (() => {
              const freeShippingRate = shipping.rates.find(r => r.method_id.includes('free_shipping'));
              const flatRate = shipping.rates.find(r => r.method_id.includes('flat_rate'));
              const currentRate = freeShippingRate || flatRate || shipping.rates[0];
              
              if (currentRate?.free_shipping_remaining && currentRate.free_shipping_remaining > 0) {
                const progressPercentage = Math.min(
                  (getTotalPriceAfterDiscount() / (getTotalPriceAfterDiscount() + currentRate.free_shipping_remaining)) * 100,
                  100
                );
                
                return (
                  <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-amber-orange/10 to-amber-orange/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-amber-orange/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-navy-blue">Gratis verzending</h3>
                            <p className="text-sm text-amber-orange font-medium">
                              Nog €{currentRate.free_shipping_remaining.toFixed(2)} tot gratis verzending!
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-orange">{Math.round(progressPercentage)}%</p>
                          <p className="text-xs text-steel-gray">van het doel</p>
                        </div>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-amber-orange to-amber-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (currentRate?.free && currentRate?.free_shipping_eligible) {
                return (
                  <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-medical-green/10 to-medical-green/5 border border-medical-green/20">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-medical-green/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-blue text-lg">🎉 Je komt in aanmerking voor gratis verzending!</h3>
                          <p className="text-sm text-steel-gray">Je hebt de gratis verzenddrempel bereikt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
              <div className="p-6 bg-gradient-to-r from-navy-blue to-navy-blue/95 text-white">
                <h2 className="text-xl font-semibold">Overzicht bestelling</h2>
              </div>
              
              <div className="p-6">
                {/* Summary details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotaal</span>
                    <span className="font-medium text-gray-900">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-medical-green">
                      <span>Korting {appliedCoupon.discount_type === 'percent' && `(${appliedCoupon.amount}%)`}</span>
                      <span>-€{getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Verzending</span>
                    <span className="text-sm text-gray-500 italic">wordt berekend bij checkout</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">BTW (21%)</span>
                    <span className="text-gray-900">€{(getTotalPriceAfterDiscount() * 0.21).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-navy-blue">Totaal</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-medical-green">
                        €{(
                          getTotalPriceAfterDiscount() + 
                          (getTotalPriceAfterDiscount() * 0.21)
                        ).toFixed(2)}
                      </span>
                      <p className="text-xs text-steel-gray">Incl. BTW, excl. verzending</p>
                    </div>
                  </div>
                </div>
                
                {/* Checkout button */}
                <Link 
                  href="/checkout" 
                  className="block w-full bg-medical-green text-white text-center py-4 rounded-full font-semibold hover:bg-medical-green/90 transition-all hover:shadow-lg mb-3"
                >
                  Veilig afrekenen
                </Link>
                
                <Link 
                  href="/producten" 
                  className="block w-full text-center py-3 bg-gray-100 hover:bg-gray-200 text-navy-blue rounded-full font-medium transition-all"
                >
                  Verder winkelen
                </Link>
                
                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-xs text-steel-gray">
                      <svg className="w-4 h-4 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Veilig betalen</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-steel-gray">
                      <svg className="w-4 h-4 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Garantie</span>
                    </div>
                  </div>
                  
                  {/* Payment methods */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Image src="/images/ideal.png" alt="iDEAL" width={29} height={20} className="h-[16px] w-auto opacity-60" />
                    <Image src="/images/mastercard.png" alt="Mastercard" width={36} height={20} className="h-[16px] w-auto opacity-60" />
                    <Image src="/images/visa.png" alt="Visa" width={50} height={20} className="h-[16px] w-auto opacity-60" />
                    <Image src="/images/klarna.png" alt="Klarna" width={44} height={20} className="h-[16px] w-auto opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}