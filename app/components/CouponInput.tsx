'use client';

import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface CouponInputProps {
  variant?: 'default' | 'compact';
  onSuccess?: () => void;
}

export default function CouponInput({ variant = 'default', onSuccess }: CouponInputProps) {
  const { appliedCoupon, applyDiscount, removeDiscount, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setError('');
    setIsValidating(true);

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: couponCode.trim(),
          cartTotal: getTotalPrice(),
        }),
      });

      const data = await response.json();

      if (data.valid && data.coupon) {
        applyDiscount(data.coupon);
        setCouponCode('');
        setShowInput(false);
        onSuccess?.();
      } else {
        setError(data.error || 'Ongeldige kortingscode');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      setError('Er is een fout opgetreden bij het valideren van de kortingscode');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeDiscount();
    setError('');
    setCouponCode('');
  };

  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-medical-green/10 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-medical-green">
                Kortingscode "{appliedCoupon.code}" toegepast
              </span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-500 hover:text-red-600 transition-colors"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            {!showInput ? (
              <button
                onClick={() => setShowInput(true)}
                className="text-steel-gray hover:text-medical-green underline text-sm w-full text-left"
                type="button"
              >
                Kortingscode toepassen?
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Voer kortingscode in"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-green text-sm text-black placeholder-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    disabled={isValidating}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isValidating || !couponCode.trim()}
                    className="px-4 py-2 bg-medical-green text-white rounded-md hover:bg-medical-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                    type="button"
                  >
                    {isValidating ? 'Valideren...' : 'Toepassen'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  onClick={() => {
                    setShowInput(false);
                    setCouponCode('');
                    setError('');
                  }}
                  className="text-steel-gray text-xs underline"
                  type="button"
                >
                  Annuleren
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => !appliedCoupon && setShowInput(!showInput)}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="font-medium text-navy-blue">Kortingscode toevoegen</span>
        </div>
        {!appliedCoupon && (
          <svg 
            className={`w-5 h-5 text-steel-gray transform transition-transform ${showInput ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      
      {(showInput || appliedCoupon) && (
        <div className="mt-4 space-y-3">
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-medical-green/10 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-medical-green font-medium">
                  Code "{appliedCoupon.code}" toegepast
                  {appliedCoupon.discount_type === 'percent' && `: ${appliedCoupon.amount}% korting`}
                  {appliedCoupon.discount_type === 'fixed_cart' && `: €${appliedCoupon.amount} korting`}
                </span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-red-500 hover:text-red-600 transition-colors"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Voer kortingscode in"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent text-black placeholder-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  disabled={isValidating}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={isValidating || !couponCode.trim()}
                  className="px-6 py-2 bg-medical-green text-white rounded-lg font-medium hover:bg-medical-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  type="button"
                >
                  {isValidating ? 'Valideren...' : 'Toepassen'}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}