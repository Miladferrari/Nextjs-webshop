'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get('order_id') || searchParams.get('order');
  const orderKey = searchParams.get('key');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [cartCleared, setCartCleared] = useState(false);

  useEffect(() => {
    const checkOrder = async () => {
      if (!orderId) {
        // Check session storage for pending order
        const pendingOrderId = sessionStorage.getItem('pendingOrderId');
        if (pendingOrderId) {
          window.location.href = `/checkout/success?order=${pendingOrderId}`;
          return;
        }
        setError('Geen bestelnummer gevonden');
        setLoading(false);
        return;
      }

      try {
        // Check order status
        const response = await fetch(`/api/check-order?orderId=${orderId}${orderKey ? `&key=${orderKey}` : ''}`);
        const data = await response.json();

        if (data.success && data.order) {
          setOrderNumber(orderId.padStart(6, '0'));
          setOrderStatus(data.order.status);
          
          // Clear pending order from session
          sessionStorage.removeItem('pendingOrderId');
          sessionStorage.removeItem('orderData');
          sessionStorage.removeItem('completedOrderId');
          
          // Clear cart ONLY if payment is confirmed as successful
          const paymentSuccessStatuses = ['processing', 'completed', 'on-hold'];
          if (paymentSuccessStatuses.includes(data.order.status) && !cartCleared) {
            clearCart();
            setCartCleared(true);
            console.log('Cart cleared after successful payment confirmation');
          }
        } else {
          setError('Kon bestellingsinformatie niet ophalen');
        }
      } catch (err) {
        console.error('Error checking order:', err);
        setError('Er is een fout opgetreden');
      } finally {
        setLoading(false);
      }
    };

    checkOrder();
  }, [orderId, orderKey, cartCleared, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-steel-gray">Bestelling controleren...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy-blue mb-4">{error}</h1>
            <Link href="/checkout" className="text-medical-green hover:text-medical-green/80 font-medium">
              Terug naar checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Only show success if order status indicates payment was successful
  const isPaymentSuccessful = ['processing', 'completed', 'on-hold'].includes(orderStatus);

  if (!isPaymentSuccessful && orderStatus) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy-blue mb-4">Betaling in behandeling</h1>
            <p className="text-steel-gray mb-6">
              Je bestelling #{orderNumber} heeft status: {orderStatus}
            </p>
            <Link href="/contact" className="text-medical-green hover:text-medical-green/80 font-medium">
              Contact opnemen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-navy-blue mb-4">
            Bedankt voor je bestelling!
          </h1>
          
          <p className="text-lg text-steel-gray mb-6">
            Je bestelling is succesvol geplaatst en wordt zo snel mogelijk verwerkt.
          </p>

          {orderNumber && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-steel-gray mb-2">Bestelnummer</p>
              <p className="text-2xl font-bold text-navy-blue">#{orderNumber}</p>
            </div>
          )}

          {/* What happens next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-navy-blue mb-4">
              Wat gebeurt er nu?
            </h2>
            <ul className="space-y-3 text-steel-gray">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-navy-blue">Bevestigingsmail</p>
                  <p className="text-sm">Je ontvangt binnen enkele minuten een bevestigingsmail met alle details van je bestelling.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <div>
                  <p className="font-medium text-navy-blue">Verwerking</p>
                  <p className="text-sm">We pakken je bestelling zorgvuldig in. Dit duurt meestal 1-2 werkdagen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-navy-blue">Verzending</p>
                  <p className="text-sm">Zodra je pakket onderweg is, ontvang je een track & trace code.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Important notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-amber-800 mb-1">Belangrijk</p>
                <p className="text-sm text-amber-700">
                  Bewaar je bestelnummer voor eventuele vragen over je bestelling. 
                  Check ook je spam-folder als je geen bevestigingsmail ontvangt.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 bg-medical-green text-white px-6 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Terug naar Home
            </Link>
            <Link 
              href="/noodpakketten" 
              className="inline-flex items-center justify-center gap-2 bg-white text-medical-green border-2 border-medical-green px-6 py-3 rounded-full font-semibold hover:bg-medical-green hover:text-white transition-colors"
            >
              Verder winkelen
            </Link>
          </div>

          {/* Customer service */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-steel-gray mb-4">
              Heb je vragen over je bestelling?
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact opnemen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}