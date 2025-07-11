import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const WOOCOMMERCE_URL = 'https://wordpress.restaurantmahzen.nl';
const WOOCOMMERCE_KEY = 'ck_6611c9935688b973c536fc2633565cdb1dda0262';
const WOOCOMMERCE_SECRET = 'cs_b4b55890e3a947bb72305f80e304690e835820e0';

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentMethod, paymentData } = await request.json();

    console.log('[Payment Process] Starting payment for order:', orderId);
    console.log('[Payment Process] Payment method:', paymentMethod);

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is vereist' },
        { status: 400 }
      );
    }


    // Map payment methods to WooCommerce format
    const paymentMethodMap: { [key: string]: string } = {
      'card': 'woocommerce_payments',
      'ideal': 'woocommerce_payments',
      'klarna': 'klarna_payments',
      'bancontact': 'woocommerce_payments'
    };

    const wcPaymentMethod = paymentMethodMap[paymentMethod] || 'woocommerce_payments';

    // Prepare the payment data for WooCommerce
    const wcPaymentData = {
      payment_method: wcPaymentMethod,
      payment_method_title: paymentMethod === 'ideal' ? 'iDEAL' : 
                           paymentMethod === 'klarna' ? 'Klarna' :
                           paymentMethod === 'bancontact' ? 'Bancontact' : 'Card Payment',
      set_paid: true,
      status: 'processing',
      transaction_id: `test_${Date.now()}_${orderId}`,
      date_paid: new Date().toISOString(),
      date_paid_gmt: new Date().toISOString(),
      meta_data: [
        {
          key: '_payment_method_id',
          value: paymentMethod
        },
        {
          key: '_wc_order_attribution_source_type',
          value: 'typein'
        },
        {
          key: '_payment_intent_id',
          value: paymentData.paymentIntentId || `pi_test_${Date.now()}_${orderId}`
        }
      ]
    };

    console.log('[Payment Process] Updating order with data:', JSON.stringify(wcPaymentData, null, 2));

    // Update the order with payment information
    const authString = Buffer.from(`${WOOCOMMERCE_KEY}:${WOOCOMMERCE_SECRET}`).toString('base64');
    
    const response = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`,
        'User-Agent': 'WooCommerce REST API'
      },
      body: JSON.stringify(wcPaymentData)
    });

    const responseText = await response.text();
    console.log('[Payment Process] WooCommerce response status:', response.status);
    console.log('[Payment Process] WooCommerce response:', responseText);

    if (!response.ok) {
      // Try to parse error message
      let errorMessage = 'Betaling kon niet worden verwerkt';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If not JSON, use the text as is
        errorMessage = responseText || errorMessage;
      }
      
      console.error('[Payment Process] WooCommerce payment update error:', errorMessage);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Je betaling is mislukt. Probeer het opnieuw of kies een andere betaalmethode.',
          details: errorMessage
        },
        { status: response.status }
      );
    }

    let updatedOrder;
    try {
      updatedOrder = JSON.parse(responseText);
    } catch (e) {
      console.error('[Payment Process] Failed to parse order response:', e);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Onverwachte fout bij het verwerken van de betaling. Probeer het opnieuw.'
        },
        { status: 500 }
      );
    }

    console.log('[Payment Process] Order updated successfully:', {
      id: updatedOrder.id,
      status: updatedOrder.status,
      payment_method: updatedOrder.payment_method
    });

    // For test mode, we can optionally send a confirmation email
    // This would be handled by WooCommerce automatically in production

    return NextResponse.json({
      success: true,
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        order_key: updatedOrder.order_key,
        total: updatedOrder.total,
        currency: updatedOrder.currency,
        payment_method: updatedOrder.payment_method,
        payment_method_title: updatedOrder.payment_method_title
      }
    });

  } catch (error: any) {
    console.error('[Payment Process] Unexpected error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Er is een technische fout opgetreden. Probeer het later opnieuw.',
        details: error.message || error.toString()
      },
      { status: 500 }
    );
  }
}