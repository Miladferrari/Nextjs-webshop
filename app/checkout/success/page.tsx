'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface OrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || '2024001';
  
  // Mock order data - in real app, fetch from backend using order ID
  const [orderData] = useState<OrderData>({
    orderId: orderId,
    customerName: 'Jan de Vries',
    email: 'jan@example.com',
    phone: '+31 6 12345678',
    address: 'Kalverstraat 92',
    city: 'Amsterdam',
    postcode: '1012 PH',
    country: 'Nederland',
    items: [
      { name: 'Premium Noodpakket', quantity: 1, price: 44.99 },
      { name: 'Basis Voedselpakket', quantity: 2, price: 24.99 }
    ],
    subtotal: 94.97,
    shipping: 0,
    vat: 19.94,
    total: 114.91
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success header with animation */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-4 inline-flex">
              <div className="relative">
                <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-green-600 rounded-full opacity-25 animate-ping"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bedankt voor je bestelling!</h1>
            <p className="text-lg text-gray-600">Je bestelling is succesvol ontvangen</p>
            <p className="text-sm text-gray-500 mt-2">Bestelnummer: <span className="font-mono font-semibold">#{orderData.orderId}</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order progress tracker */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bestelstatus</h2>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  ✓
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center">Bestelling<br/>ontvangen</span>
                <span className="text-xs text-gray-500 mt-1">{currentTime.toLocaleTimeString('nl-NL')}</span>
              </div>
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center">In<br/>verwerking</span>
                <span className="text-xs text-gray-500 mt-1">Binnen 30 min</span>
              </div>
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center">Onderweg</span>
                <span className="text-xs text-gray-500 mt-1">2-3 dagen</span>
              </div>
              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center">Bezorgd</span>
                <span className="text-xs text-gray-500 mt-1">Verwacht</span>
              </div>
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div className="h-full bg-green-600 animate-pulse" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order details */}
          <div className="lg:col-span-2 space-y-6">
            {/* What happens next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Wat gebeurt er nu?
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Je ontvangt binnen enkele minuten een bevestigingsmail
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  We gaan direct aan de slag met het samenstellen van je pakket
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Je ontvangt een track & trace code zodra je pakket onderweg is
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Binnen 2-3 werkdagen wordt je bestelling bezorgd
                </li>
              </ul>
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Afleveradres</h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{orderData.customerName}</p>
                <p>{orderData.address}</p>
                <p>{orderData.postcode} {orderData.city}</p>
                <p>{orderData.country}</p>
                <p className="mt-3">{orderData.phone}</p>
                <p>{orderData.email}</p>
              </div>
            </div>

            {/* Contact support */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Vragen over je bestelling?</h3>
              <p className="text-sm text-gray-600 mb-4">Ons klantenservice team staat voor je klaar</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@webshop.nl" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@webshop.nl
                </a>
                <a href="tel:+31201234567" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  020 - 123 4567
                </a>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-4">Besteloverzicht</h3>
              
              <div className="space-y-3 mb-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-500">Aantal: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotaal</span>
                  <span className="text-gray-900">€{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verzending</span>
                  <span className="text-green-600 font-medium">GRATIS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">BTW (21%)</span>
                  <span className="text-gray-900">€{orderData.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span className="text-gray-900">Totaal betaald</span>
                  <span className="text-green-600">€{orderData.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/producten" className="block w-full bg-amber-orange text-white text-center py-3 px-4 rounded-md font-semibold hover:bg-amber-orange/90 transition-colors">
                  Verder winkelen
                </Link>
                <Link href="/" className="block w-full bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                  Terug naar home
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Veilig betaald</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Zorgvuldig verpakt</span>
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}