'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { woocommerce } from '@/lib/woocommerce';
import CouponInput from '../components/CouponInput';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    items, 
    getTotalPrice, 
    getTotalPriceAfterDiscount, 
    getDiscountAmount, 
    appliedCoupon, 
    clearCart,
    shipping,
    setShippingCountry,
    setShippingPostcode,
    setSelectedShippingRate,
    getShippingCost,
    getFinalTotal,
    allowedCountries
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [countryNames, setCountryNames] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'NL',
  });

  // Country names mapping
  useEffect(() => {
    // Extended country codes to names mapping
    const names: { [key: string]: string } = {
      'NL': 'Nederland',
      'BE': 'België',
      'DE': 'Duitsland',
      'FR': 'Frankrijk',
      'LU': 'Luxemburg',
      'AT': 'Oostenrijk',
      'ES': 'Spanje',
      'IT': 'Italië',
      'GB': 'Verenigd Koninkrijk',
      'US': 'Verenigde Staten',
      'PL': 'Polen',
      'CZ': 'Tsjechië',
      'SK': 'Slowakije',
      'HU': 'Hongarije',
      'RO': 'Roemenië',
      'BG': 'Bulgarije',
      'GR': 'Griekenland',
      'PT': 'Portugal',
      'SE': 'Zweden',
      'DK': 'Denemarken',
      'NO': 'Noorwegen',
      'FI': 'Finland',
      'IE': 'Ierland',
      'CH': 'Zwitserland',
      'CA': 'Canada',
      'AU': 'Australië',
      'NZ': 'Nieuw-Zeeland',
    };
    setCountryNames(names);
  }, []);

  // Update shipping country when form country changes
  useEffect(() => {
    if (formData.country && formData.country !== shipping.country) {
      setShippingCountry(formData.country);
    }
  }, [formData.country]);

  // Update shipping postcode when form postcode changes
  useEffect(() => {
    if (formData.postcode && formData.postcode !== shipping.postcode) {
      setShippingPostcode(formData.postcode);
    }
  }, [formData.postcode]);

  // Calculate pricing details
  const subtotal = getTotalPrice();
  const discountAmount = getDiscountAmount();
  const subtotalAfterDiscount = getTotalPriceAfterDiscount();
  const shippingCost = getShippingCost();
  const total = getFinalTotal(); // Total without VAT since prices already include VAT

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, validate stock availability
      const stockResponse = await fetch('/api/validate-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const stockValidation = await stockResponse.json();

      if (!stockValidation.valid) {
        // Build error message
        let errorMessage = 'Er zijn problemen met de voorraad:\n\n';
        stockValidation.issues.forEach((issue: any) => {
          if (issue.issue === 'out_of_stock') {
            errorMessage += `• ${issue.productName} is uitverkocht\n`;
          } else if (issue.issue === 'insufficient_stock') {
            errorMessage += `• ${issue.productName}: slechts ${issue.available} beschikbaar (${issue.requested} gevraagd)\n`;
          }
        });
        errorMessage += '\nPas je winkelwagen aan en probeer het opnieuw.';
        
        setError(errorMessage);
        setLoading(false);
        // Scroll to top to show error
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const orderData = {
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.address2,
          city: formData.city,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          address_2: formData.address2,
          city: formData.city,
          postcode: formData.postcode,
          country: formData.country,
        },
        line_items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        ...(appliedCoupon && {
          coupon_lines: [{
            code: appliedCoupon.code
          }]
        })
      };

      const order = await woocommerce.createOrder(orderData);
      
      // Clear cart and redirect to success page
      clearCart();
      router.push(`/checkout/success?order=${order.id}`);
    } catch (err) {
      setError('Bestelling mislukt. Probeer het opnieuw.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Je winkelwagen is leeg</h1>
            <p className="text-steel-gray mb-8">Voeg enkele producten toe voordat je afrekent.</p>
            <a href="/producten" className="inline-block bg-amber-orange text-white px-6 py-3 rounded-md hover:bg-amber-orange/90 transition-colors">
              Bekijk Producten
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile order summary toggle */}
        <button
          type="button"
          className="w-full bg-gray-50 p-4 flex items-center justify-center font-medium text-base text-gray-900 mb-4 lg:hidden rounded-lg"
          onClick={() => setShowOrderSummary(!showOrderSummary)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.38 18" className="mr-2" width="27" height="25" role="img">
            <path d="M14 16.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-10 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S6.33 18 5.5 18 4 17.33 4 16.5zM6 13c-.45 0-.85-.3-.97-.74L2.23 2H1c-.55 0-1-.45-1-1s.45-1 1-1h2c.45 0 .85.3.97.74L4.59 3h12.8c1.1 0 2 .9 2 2 0 .31-.07.62-.21.89l-3.28 6.55a1 1 0 0 1-.89.55H6z" fill="currentColor"/>
            <title>cart-filled</title>
          </svg>
          <span>Toon besteloverzicht</span>
          <span className="ml-2 font-semibold text-amber-orange">€{total.toFixed(2)}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 10 6" 
            className={`ml-2 transition-transform ${showOrderSummary ? 'rotate-180' : ''}`} 
            width="10" 
            height="6" 
            role="img"
          >
            <path d="M0 1c0-.6.4-1 1-1 .3 0 .5.1.7.3L5 3.6 8.3.4c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4 3.9c-.4.4-1 .4-1.4 0l-4-4C.1 1.5 0 1.3 0 1" fill="currentColor"/>
            <title>chevron-down</title>
          </svg>
        </button>
        
        {/* Mobile order summary content */}
        {showOrderSummary && (
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Besteloverzicht</h2>
              
              {/* Products list */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3 text-sm">
                    {/* Product image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded overflow-hidden">
                      {item.product.images?.[0]?.src ? (
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-steel-gray">Aantal: {item.quantity}</p>
                    </div>
                    
                    {/* Price */}
                    <span className="font-medium text-gray-900 text-right">€{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Price breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-steel-gray">Subtotaal</span>
                  <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Korting
                      {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
                    </span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-steel-gray">
                    Verzending naar {countryNames[formData.country] || formData.country}
                  </span>
                  {shipping.loading ? (
                    <span className="text-gray-400">Berekenen...</span>
                  ) : (
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                      {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  )}
                </div>
                
                {/* Shipping error message - Mobile */}
                {shipping.error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {shipping.error}
                    </p>
                  </div>
                )}
                
                {/* Free shipping progress or notice - Mobile */}
                {(() => {
                  const currentRate = shipping.selectedRate || shipping.rates[0];
                  
                  if (currentRate?.free_shipping_remaining && currentRate.free_shipping_remaining > 0) {
                    const progressPercentage = Math.min(
                      (subtotalAfterDiscount / (subtotalAfterDiscount + currentRate.free_shipping_remaining)) * 100,
                      100
                    );
                    
                    return (
                      <div className="my-2 p-2 bg-amber-50 rounded border border-amber-200">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-medium text-amber-800">
                            Nog €{currentRate.free_shipping_remaining.toFixed(2)} tot gratis verzending!
                          </span>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-1">
                          <div 
                            className="bg-amber-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  } else if (currentRate?.free && currentRate?.free_shipping_eligible) {
                    return (
                      <div className="my-2 p-2 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs font-medium text-green-800">
                          🎉 Je komt in aanmerking voor gratis verzending!
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
                
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span className="text-gray-900">Totaal</span>
                  <span className="text-amber-orange">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Discount code section */}
              <div className="mt-4 pt-4 border-t">
                <CouponInput variant="compact" />
              </div>
            </div>
          </div>
        )}
        
        {/* Progress indicator */}
        <nav className="mb-8 w-full">
          <div className="flex items-start justify-evenly">
            {/* Step 1: Winkelwagen - Completed */}
            <a href="/cart" className="relative flex flex-col items-center justify-start flex-1 group">
              <span className="absolute w-full h-1 lg:h-[7px] bg-green-600 rounded-l-full top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-green-600 flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.01 9.5" className="text-green-600" width="16" height="13" role="img">
                  <path d="M10.15 0 4.5 5.78l-2.64-2.5L0 5.14 4.5 9.5l7.51-7.64L10.15 0z" fill="currentColor"/>
                  <title>check</title>
                </svg>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm text-steel-gray group-hover:text-medical-green transition-colors">
                Jouw winkelwagen
              </span>
            </a>
            
            {/* Step 2: Bezorging - Active */}
            <div className="relative flex flex-col items-center justify-start flex-1">
              <span className="absolute w-full h-1 lg:h-[7px] bg-amber-orange top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-amber-orange flex items-center justify-center relative z-10">
                <span className="font-bold text-lg lg:text-base text-amber-orange">2</span>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm font-semibold text-navy-blue">
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

        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Veilig Afrekenen</h1>
        <p className="text-center text-steel-gray mb-8">Je gegevens zijn veilig en versleuteld</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Factuurgegevens</h2>
                <div className="ml-auto flex items-center text-sm text-steel-gray">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  SSL Versleuteld
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Straatnaam en huisnummer *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Huisnummer en straatnaam"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Appartement, suite, etc. (optioneel)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Stad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-steel-gray mb-1">
                    Land *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  >
                    {allowedCountries.length === 0 ? (
                      // Fallback to common countries if API hasn't loaded
                      <>
                        <option value="NL">Nederland</option>
                        <option value="BE">België</option>
                      </>
                    ) : (
                      allowedCountries.map(code => (
                        <option key={code} value={code}>
                          {countryNames[code] || code}
                        </option>
                      ))
                    )}
                  </select>
                  {!allowedCountries.includes(formData.country) && allowedCountries.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      We verzenden momenteel alleen naar geselecteerde landen.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Payment info notice */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Veilige Betalingsverwerking</p>
                    <p>Je betalingsgegevens worden veilig verwerkt via onze betalingsprovider. We slaan nooit je creditcardgegevens op.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !!shipping.error}
                className="w-full mt-6 bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Je bestelling wordt verwerkt...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Veilig Afrekenen - €{total.toFixed(2)}
                  </>
                )}
              </button>

              {/* Money-back guarantee */}
              <div className="mt-4 text-center">
                <p className="text-xs text-steel-gray">
                  <svg className="w-4 h-4 inline mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  30 Dagen Geld-terug-garantie • Gratis Retourneren
                </p>
              </div>
            </form>

            {/* Customer testimonial */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-orange rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900 italic">"Uitstekende service! Mijn bestelling kwam snel aan en het afrekenproces was soepel en veilig."</p>
                  <p className="text-xs text-steel-gray mt-1">- Jan de Vries, geverifieerde klant</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order summary - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Besteloverzicht</h2>
              
              {/* Products list */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-3 text-sm">
                    {/* Product image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded overflow-hidden">
                      {item.product.images?.[0]?.src ? (
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-steel-gray">Aantal: {item.quantity}</p>
                    </div>
                    
                    {/* Price */}
                    <span className="font-medium text-gray-900 text-right">€{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Price breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-steel-gray">Subtotaal</span>
                  <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Korting
                      {appliedCoupon.discount_type === 'percent' && ` (${appliedCoupon.amount}%)`}
                    </span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                {/* Discount code section */}
                <div className="my-3 py-3 border-y">
                  <CouponInput variant="compact" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-steel-gray">
                    Verzending naar {countryNames[formData.country] || formData.country}
                  </span>
                  {shipping.loading ? (
                    <span className="text-gray-400">Berekenen...</span>
                  ) : (
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                      {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  )}
                </div>
                
                {/* Shipping error message */}
                {shipping.error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {shipping.error}
                    </p>
                  </div>
                )}
                
                {/* Shipping method selection if multiple options */}
                {shipping.rates.length > 1 && (
                  <div className="mt-2">
                    <select
                      value={shipping.selectedRate?.method_id || ''}
                      onChange={(e) => {
                        const rate = shipping.rates.find(r => r.method_id === e.target.value);
                        if (rate) setSelectedShippingRate(rate);
                      }}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md text-gray-900"
                    >
                      {shipping.rates.map(rate => (
                        <option key={rate.method_id} value={rate.method_id}>
                          {rate.method_title} - {rate.free ? 'Gratis' : `€${rate.cost.toFixed(2)}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Free shipping progress or notice */}
                {(() => {
                  const currentRate = shipping.selectedRate || shipping.rates[0];
                  
                  if (currentRate?.free_shipping_remaining && currentRate.free_shipping_remaining > 0) {
                    const progressPercentage = Math.min(
                      (subtotalAfterDiscount / (subtotalAfterDiscount + currentRate.free_shipping_remaining)) * 100,
                      100
                    );
                    
                    return (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-medium text-amber-800">
                              Nog €{currentRate.free_shipping_remaining.toFixed(2)} tot gratis verzending!
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-1.5">
                          <div 
                            className="bg-amber-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  } else if (currentRate?.free && currentRate?.free_shipping_eligible) {
                    return (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-green-800">
                          🎉 Je komt in aanmerking voor gratis verzending!
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span className="text-gray-900">Totaal</span>
                  <span className="text-amber-orange">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}