'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface PaymentStatus {
  loading: boolean;
  error: string | null;
  processing: boolean;
}

interface OrderData {
  id: number;
  order_key: string;
  status: string;
  total: string;
  currency: string;
  customer: any;
  shipping_method: string;
  shipping_total: string;
  items: any[];
  coupon: any;
}

export default function PaymentPage() {
  const router = useRouter();
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    loading: true,
    error: null,
    processing: false
  });
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [billingAddressSame, setBillingAddressSame] = useState(true);

  // Get order data from session storage
  useEffect(() => {
    const storedOrderData = sessionStorage.getItem('orderData');
    const pendingOrderId = sessionStorage.getItem('pendingOrderId');
    
    if (!storedOrderData || !pendingOrderId) {
      router.push('/checkout');
      return;
    }
    
    try {
      const data = JSON.parse(storedOrderData);
      setOrderData(data);
      setPaymentStatus({ loading: false, error: null, processing: false });
    } catch (error) {
      console.error('Error parsing order data:', error);
      router.push('/checkout');
    }
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData || !paymentMethod) {
      setPaymentStatus({
        loading: false,
        error: 'Selecteer een betaalmethode',
        processing: false
      });
      return;
    }
    
    setPaymentStatus({ ...paymentStatus, processing: true, error: null });
    
    try {
      console.log('Creating payment URL for order:', orderData.id);
      
      // Get payment URL from WooCommerce
      const response = await fetch('/api/payment/create-payment-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.id,
          paymentMethod: paymentMethod
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Kon geen betaallink genereren');
      }
      
      console.log('Redirecting to WooCommerce payment page:', result.paymentUrl);
      
      // Store selected payment method for when user returns
      sessionStorage.setItem('selectedPaymentMethod', paymentMethod);
      
      // Redirect to WooCommerce payment page
      window.location.href = result.paymentUrl;
      
    } catch (error: any) {
      console.error('Payment error:', error);
      
      // Bepaal de juiste foutmelding
      let errorMessage = 'Er ging iets mis bij het doorsturen naar de betaalpagina. Probeer het opnieuw.';
      
      if (error.message?.includes('netwerk') || error.message?.includes('network')) {
        errorMessage = 'Netwerkfout: Controleer je internetverbinding en probeer het opnieuw.';
      } else if (error.message?.includes('config')) {
        errorMessage = 'Configuratiefout: Neem contact op met de klantenservice.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setPaymentStatus({
        loading: false,
        error: errorMessage,
        processing: false
      });
    }
  };
  
  // Calculate totals
  const subtotal = orderData?.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0) || 0;
  const discountAmount = orderData?.coupon ? 
    (orderData.coupon.discount_type === 'percent' 
      ? subtotal * (parseFloat(orderData.coupon.amount) / 100)
      : parseFloat(orderData.coupon.amount)) : 0;
  const shippingCost = parseFloat(orderData?.shipping_total || '0');
  const total = parseFloat(orderData?.total || '0');
  const btw = total * 0.21 / 1.21; // 21% BTW included in price
  
  if (paymentStatus.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-gray-900">Betaalpagina wordt geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-start justify-evenly">
            {/* Step 1: Winkelwagen - Completed */}
            <Link href="/cart" className="relative flex flex-col items-center justify-start flex-1 group">
              <span className="absolute w-full h-1 lg:h-[7px] bg-green-600 rounded-l-full top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-green-600 flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.01 9.5" className="text-green-600" width="16" height="13" role="img">
                  <path d="M10.15 0 4.5 5.78l-2.64-2.5L0 5.14 4.5 9.5l7.51-7.64L10.15 0z" fill="currentColor"></path>
                  <title>check</title>
                </svg>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm text-steel-gray group-hover:text-medical-green transition-colors">
                Jouw winkelwagen
              </span>
            </Link>

            {/* Step 2: Bezorging - Completed */}
            <Link href="/checkout" className="relative flex flex-col items-center justify-start flex-1 group">
              <span className="absolute w-full h-1 lg:h-[7px] bg-green-600 top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-green-600 flex items-center justify-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.01 9.5" className="text-green-600" width="16" height="13" role="img">
                  <path d="M10.15 0 4.5 5.78l-2.64-2.5L0 5.14 4.5 9.5l7.51-7.64L10.15 0z" fill="currentColor"></path>
                  <title>check</title>
                </svg>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm text-steel-gray group-hover:text-medical-green transition-colors">
                Bezorging
              </span>
            </Link>

            {/* Step 3: Betalen - Current */}
            <div className="relative flex flex-col items-center justify-start flex-1">
              <span className="absolute w-full h-1 lg:h-[7px] bg-amber-orange rounded-r-full top-4"></span>
              <span className="w-[38px] h-[38px] shrink-0 rounded-full bg-white border-[5px] lg:border-[7px] border-amber-orange flex items-center justify-center relative z-10">
                <span className="font-bold text-lg lg:text-base text-amber-orange">3</span>
              </span>
              <span className="block text-center relative pt-2 leading-5 text-xs sm:text-sm font-semibold text-navy-blue">
                Controleren en Betalen
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Controleren en Betalen */}
            <div className="lg:col-span-2 space-y-6">
              {/* Error Message */}
              {paymentStatus.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-red-800 text-sm font-medium">{paymentStatus.error}</p>
                      <button
                        type="button"
                        onClick={() => setPaymentStatus({ ...paymentStatus, error: null })}
                        className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
                      >
                        Probeer opnieuw →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Verzendadres</h3>
                  <Link href="/checkout" className="text-sm text-medical-green hover:text-medical-green/80 font-medium">
                    Bewerken
                  </Link>
                </div>
                <div className="text-gray-900">
                  <p className="font-medium">{orderData?.customer.first_name} {orderData?.customer.last_name}</p>
                  <p>{orderData?.customer.address_1}</p>
                  {orderData?.customer.address_2 && <p>{orderData?.customer.address_2}</p>}
                  <p>{orderData?.customer.postcode} {orderData?.customer.city}</p>
                  <p>{orderData?.customer.country === 'NL' ? 'Nederland' : orderData?.customer.country}</p>
                  {orderData?.customer.phone && <p className="mt-2">Tel: {orderData?.customer.phone}</p>}
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Factuuradres</h3>
                  <Link href="/checkout" className="text-sm text-medical-green hover:text-medical-green/80 font-medium">
                    Bewerken
                  </Link>
                </div>
                <div className="mb-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={billingAddressSame}
                      onChange={(e) => setBillingAddressSame(e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-medical-green focus:ring-medical-green"
                    />
                    <span className="text-gray-900">Gelijk aan verzendadres</span>
                  </label>
                </div>
                {billingAddressSame ? (
                  <p className="text-gray-500 text-sm italic">Factuuradres is gelijk aan verzendadres</p>
                ) : (
                  <div className="text-gray-900">
                    <p className="font-medium">{orderData?.customer.first_name} {orderData?.customer.last_name}</p>
                    <p>{orderData?.customer.address_1}</p>
                    {orderData?.customer.address_2 && <p>{orderData?.customer.address_2}</p>}
                    <p>{orderData?.customer.postcode} {orderData?.customer.city}</p>
                    <p>{orderData?.customer.country === 'NL' ? 'Nederland' : orderData?.customer.country}</p>
                  </div>
                )}
              </div>

              {/* Info Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-blue-800 text-sm">
                    Zodra je bestelling ons magazijn verlaat, ontvang je een track & trace van de vervoerder.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Betaalmethode kiezen</h3>
                
                <div className="space-y-3">
                  {/* Credit Card */}
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-medical-green bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                      <div className="mr-4 flex items-center gap-2">
                        <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none">
                          <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                          <path d="M18.5 12L13.5 20H10.5L8 12H10.5L12 17.5L13.5 12H15.5L17 17.5L18.5 12H21L18.5 20H15.5" fill="white"/>
                          <circle cx="28" cy="16" r="5" fill="#EB001B"/>
                          <circle cx="34" cy="16" r="5" fill="#F79E1B" opacity="0.8"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Creditcard</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>

                  {/* iDEAL */}
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'ideal' ? 'border-medical-green bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="ideal"
                      checked={paymentMethod === 'ideal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                      <div className="mr-4">
                        <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none">
                          <rect width="48" height="32" rx="4" fill="#CC0066"/>
                          <path d="M14 10H18V22H14V10Z" fill="white"/>
                          <path d="M20 10H26C28 10 30 12 30 14V18C30 20 28 22 26 22H20V10Z" fill="white"/>
                          <path d="M24 14H26C26.5 14 27 14.5 27 15V17C27 17.5 26.5 18 26 18H24V14Z" fill="#CC0066"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">iDEAL</p>
                        <p className="text-sm text-gray-500">Betaal met je eigen bank</p>
                      </div>
                    </div>
                    {paymentMethod === 'ideal' && (
                      <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>

                  {/* Klarna */}
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'klarna' ? 'border-medical-green bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="klarna"
                      checked={paymentMethod === 'klarna'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                      <div className="mr-4">
                        <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none">
                          <rect width="48" height="32" rx="4" fill="#FFB3C7"/>
                          <path d="M16 10H20V16L24 10H28L23 17L28 22H24L20 17V22H16V10Z" fill="black"/>
                          <circle cx="35" cy="20" r="2" fill="black"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Klarna</p>
                        <p className="text-sm text-gray-500">Achteraf betalen of in termijnen</p>
                      </div>
                    </div>
                    {paymentMethod === 'klarna' && (
                      <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>

                  {/* Bancontact */}
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'bancontact' ? 'border-medical-green bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bancontact"
                      checked={paymentMethod === 'bancontact'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                      <div className="mr-4">
                        <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none">
                          <rect width="48" height="32" rx="4" fill="#005498"/>
                          <path d="M10 16C10 12 12 10 16 10H20C22 10 24 12 24 14C24 16 22 18 20 18H16V22H12V10" fill="white"/>
                          <path d="M26 10H30V18C30 20 32 22 34 22H38V18H34V10H38V22C38 24 36 26 34 26H30C28 26 26 24 26 22V10Z" fill="#FFCC00"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Bancontact</p>
                        <p className="text-sm text-gray-500">Belgische betaalmethode</p>
                      </div>
                    </div>
                    {paymentMethod === 'bancontact' && (
                      <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={paymentStatus.processing || !paymentMethod}
                  className="w-full mt-6 bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center"
                >
                  {paymentStatus.processing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Doorsturen naar betaalpagina...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Bestelling Afronden - €{total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Security and Trust */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Beveiligde betaling</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>SSL versleuteld</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Door te betalen gaat u akkoord met onze{' '}
                    <Link href="/terms" className="text-medical-green hover:underline">algemene voorwaarden</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dit is je bestelling</h3>
                
                {/* Products */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {orderData?.items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.images?.[0] && (
                          <Image
                            src={item.images[0].src}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">Aantal: {item.quantity}</p>
                        <div className="flex items-center gap-2">
                          {item.regular_price && item.regular_price !== item.price && (
                            <span className="text-sm text-gray-400 line-through">
                              €{(parseFloat(item.regular_price) * item.quantity).toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotaal</span>
                    <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {orderData?.coupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Korting ({orderData.coupon.code})</span>
                      <span className="text-green-600">-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bezorgkosten</span>
                    <span className="text-gray-900">€{shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">BTW (21% incl.)</span>
                    <span className="text-gray-900">€{btw.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span className="text-gray-900">Totaal</span>
                    <span className="text-amber-orange">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <div>
                      <p className="font-medium">Verwachte levering</p>
                      <p className="text-xs text-gray-600">2-3 werkdagen</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Veilig betalen met SSL</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span>14 dagen bedenktijd</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}