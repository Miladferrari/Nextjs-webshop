import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://wordpress.restaurantmahzen.nl';
const WOOCOMMERCE_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentMethod, paymentData } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Prepare the payment data for WooCommerce
    const wcPaymentData = {
      payment_method: 'woocommerce_payments',
      payment_method_title: 'Card Payment',
      set_paid: true,
      transaction_id: `wc_${Date.now()}_${orderId}`,
      meta_data: [
        {
          key: '_payment_method_id',
          value: paymentMethod
        },
        {
          key: '_stripe_customer_id',
          value: paymentData.customerId || ''
        },
        {
          key: '_payment_intent_id',
          value: paymentData.paymentIntentId || `pi_${Date.now()}_${orderId}`
        }
      ]
    };

    // Update the order with payment information
    const authString = Buffer.from(`${WOOCOMMERCE_KEY}:${WOOCOMMERCE_SECRET}`).toString('base64');
    
    const response = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify(wcPaymentData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('WooCommerce payment update error:', errorData);
      throw new Error('Failed to update order payment status');
    }

    const updatedOrder = await response.json();

    // If payment was successful, update order status to processing
    if (updatedOrder.status === 'pending') {
      const statusUpdateResponse = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authString}`
        },
        body: JSON.stringify({
          status: 'processing'
        })
      });

      if (statusUpdateResponse.ok) {
        const finalOrder = await statusUpdateResponse.json();
        return NextResponse.json({
          success: true,
          order: {
            id: finalOrder.id,
            status: finalOrder.status,
            order_key: finalOrder.order_key,
            total: finalOrder.total,
            currency: finalOrder.currency
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        order_key: updatedOrder.order_key,
        total: updatedOrder.total,
        currency: updatedOrder.currency
      }
    });

  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Payment processing failed',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}