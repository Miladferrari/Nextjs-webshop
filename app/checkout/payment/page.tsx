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

interface PaymentFormData {
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

export default function PaymentPage() {
  const router = useRouter();
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    loading: true,
    error: null,
    processing: false
  });
  
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ideal'>('card');
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'cardExpiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Format CVC
    if (name === 'cardCvc') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = (): string | null => {
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        return 'Voer een geldig kaartnummer van 16 cijfers in';
      }
      if (!formData.cardExpiry || formData.cardExpiry.length !== 5) {
        return 'Voer een geldige vervaldatum in (MM/JJ)';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        return 'Voer een geldige CVC-code in';
      }
      if (!formData.cardName || formData.cardName.trim().length < 3) {
        return 'Voer de naam van de kaarthouder in';
      }
    }
    return null;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData) return;

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setPaymentStatus({
        loading: false,
        error: validationError,
        processing: false
      });
      return;
    }
    
    setPaymentStatus({ ...paymentStatus, processing: true, error: null });
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process payment through WooCommerce
      const response = await fetch('/api/payment/wc-process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.id,
          paymentMethod: paymentMethod,
          paymentData: {
            paymentIntentId: `pi_${Date.now()}_${orderData.id}`,
            customerId: orderData.customer.email,
            cardLast4: paymentMethod === 'card' ? formData.cardNumber.slice(-4) : '****'
          }
        })
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Betaling mislukt');
      }
      
      // Clear session storage
      sessionStorage.removeItem('orderData');
      sessionStorage.removeItem('pendingOrderId');
      sessionStorage.setItem('completedOrderId', orderData.id.toString());
      
      // Redirect to success page
      router.push(`/checkout/success?order_id=${orderData.id}`);
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus({
        loading: false,
        error: error.message || 'Er is een fout opgetreden tijdens de betaling. Probeer het opnieuw.',
        processing: false
      });
    }
  };

  const retryPayment = () => {
    setPaymentStatus({
      loading: false,
      error: null,
      processing: false
    });
  };
  
  // Calculate totals
  const subtotal = orderData?.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0) || 0;
  const discountAmount = orderData?.coupon ? 
    (orderData.coupon.discount_type === 'percent' 
      ? subtotal * (parseFloat(orderData.coupon.amount) / 100)
      : parseFloat(orderData.coupon.amount)) : 0;
  const shippingCost = parseFloat(orderData?.shipping_total || '0');
  const total = parseFloat(orderData?.total || '0');
  
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Betaling voltooien</h1>
              
              {paymentStatus.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-red-800 text-sm">{paymentStatus.error}</p>
                      {!paymentStatus.processing && (
                        <button
                          onClick={retryPayment}
                          className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Probeer opnieuw →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Betaalmethode</h3>
                  
                  {/* Payment method selector */}
                  <div className="space-y-3">
                    <label className={`relative flex items-center p-4 bg-white border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-medical-green' : 'border-gray-200'
                    }`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="sr-only" 
                      />
                      <div className="flex items-center flex-1">
                        <div className="flex items-center gap-2 mr-4">
                          <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none">
                            <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                            <path d="M18.5 12L13.5 20H10.5L8 12H10.5L12 17.5L13.5 12H15.5L17 17.5L18.5 12H21L18.5 20H15.5" fill="white"/>
                            <circle cx="28" cy="16" r="5" fill="#EB001B"/>
                            <circle cx="34" cy="16" r="5" fill="#F79E1B" opacity="0.8"/>
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">Creditcard / Debitcard</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-medical-green' : 'border-gray-200'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-medical-green"></div>}
                      </div>
                    </label>
                    
                    <label className={`relative flex items-center p-4 bg-white border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'ideal' ? 'border-medical-green' : 'border-gray-200'
                    }`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="ideal"
                        checked={paymentMethod === 'ideal'}
                        onChange={() => setPaymentMethod('ideal')}
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
                        <span className="font-medium text-gray-900">iDEAL</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'ideal' ? 'border-medical-green' : 'border-gray-200'
                      }`}>
                        {paymentMethod === 'ideal' && <div className="w-3 h-3 rounded-full bg-medical-green"></div>}
                      </div>
                    </label>
                  </div>
                  
                  {/* Card details form */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Naam op kaart
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder={orderData?.customer?.first_name + ' ' + orderData?.customer?.last_name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Kaartnummer
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Vervaldatum
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/JJ"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* iDEAL bank selection */}
                  {paymentMethod === 'ideal' && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Selecteer uw bank
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent text-gray-900" required>
                        <option value="">Kies uw bank</option>
                        <option value="abn">ABN AMRO</option>
                        <option value="rabo">Rabobank</option>
                        <option value="ing">ING</option>
                        <option value="sns">SNS Bank</option>
                        <option value="asn">ASN Bank</option>
                        <option value="knab">Knab</option>
                        <option value="bunq">Bunq</option>
                        <option value="triodos">Triodos Bank</option>
                      </select>
                    </div>
                  )}
                </div>
                
                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Beveiligde betaling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>SSL versleuteld</span>
                  </div>
                </div>
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={paymentStatus.processing}
                  className="w-full mt-6 bg-amber-orange text-white py-4 px-6 rounded-md font-semibold hover:bg-amber-orange/90 transition-all transform hover:scale-[1.02] disabled:bg-gray-300 disabled:transform-none flex items-center justify-center"
                >
                  {paymentStatus.processing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Je betaling wordt verwerkt...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Veilig Betalen - €{total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Money-back guarantee */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-steel-gray">
                    <svg className="w-4 h-4 inline mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    14 Dagen Bedenktijd • Wettelijke Garantie • Verzekerde Verzending
                  </p>
                </div>
                
                <p className="text-center text-xs text-steel-gray mt-3">
                  Door te betalen gaat u akkoord met onze{' '}
                  <Link href="/terms" className="text-medical-green hover:underline">algemene voorwaarden</Link>
                </p>
              </form>
            </div>

            {/* Customer testimonial */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-orange rounded-full flex items-center justify-center text-white font-semibold">
                    MV
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900 italic">"Perfect! Betaling ging heel makkelijk en snel. Binnen 2 dagen had ik mijn bestelling al in huis."</p>
                  <p className="text-xs text-steel-gray mt-1">- Maria van der Berg, geverifieerde klant</p>
                </div>
              </div>
            </div>

            {/* Payment security badges */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <img src="/images/ideal-logo.png" alt="iDEAL" className="h-8 opacity-60" />
              <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-8 opacity-60" />
              <img src="/images/visa-logo.png" alt="Visa" className="h-8 opacity-60" />
              <div className="flex items-center gap-2 text-xs text-steel-gray">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>256-bit SSL Encryptie</span>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Overzicht bestelling</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {orderData?.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
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
                      <p className="text-sm text-gray-900">Aantal: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Subtotaal</span>
                  <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
                </div>
                
                {orderData?.coupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Korting ({orderData.coupon.code})</span>
                    <span>-€{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">Verzending</span>
                  <span className="text-gray-900">€{shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span className="text-gray-900">Totaal</span>
                  <span className="text-medical-green">€{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Trust badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-900">
                  <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Veilig betalen met SSL</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-900">
                  <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  <span>14 dagen bedenktijd</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-900">
                  <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Verzending binnen 2 dagen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}