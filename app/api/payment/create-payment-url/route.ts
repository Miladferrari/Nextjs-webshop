import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentMethod } = await request.json();

    console.log('[Payment URL] Creating payment URL for order:', orderId);
    console.log('[Payment URL] Payment method:', paymentMethod);

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Map onze payment methods naar WooCommerce format
    const paymentMethodMap: { [key: string]: string } = {
      'card': 'woocommerce_payments',
      'ideal': 'woocommerce_payments:ideal',
      'klarna': 'klarna_payments',
      'bancontact': 'woocommerce_payments:bancontact'
    };

    const wcPaymentMethod = paymentMethodMap[paymentMethod] || 'woocommerce_payments';

    // Haal de order op om de order_key te krijgen
    const order = await woocommerce.getOrder(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    // Update de order met de gekozen payment method
    const updateData = {
      payment_method: wcPaymentMethod.split(':')[0], // Base method zonder subtype
      payment_method_title: paymentMethod === 'ideal' ? 'iDEAL' : 
                           paymentMethod === 'klarna' ? 'Klarna' :
                           paymentMethod === 'bancontact' ? 'Bancontact' : 
                           'Card Payment',
      meta_data: [
        {
          key: '_payment_method_selected',
          value: paymentMethod
        }
      ]
    };

    await woocommerce.updateOrder(orderId, updateData);

    // Genereer de WooCommerce payment URL
    const baseUrl = 'https://wordpress.restaurantmahzen.nl';
    
    // Voor WooCommerce Payments met specifieke methodes
    let paymentUrl = `${baseUrl}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${order.order_key}`;
    
    // Voeg payment method toe aan URL voor directe selectie
    if (paymentMethod === 'ideal') {
      paymentUrl += '&payment_method=woocommerce_payments&payment_method_type=ideal';
    } else if (paymentMethod === 'bancontact') {
      paymentUrl += '&payment_method=woocommerce_payments&payment_method_type=bancontact';
    } else if (paymentMethod === 'klarna') {
      paymentUrl += '&payment_method=klarna_payments';
    } else {
      paymentUrl += '&payment_method=woocommerce_payments';
    }

    console.log('[Payment URL] Generated payment URL:', paymentUrl);

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl,
      orderId: orderId,
      orderKey: order.order_key
    });

  } catch (error: any) {
    console.error('[Payment URL] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create payment URL',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}