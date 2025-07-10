import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { orderData, returnUrl } = await request.json();
    
    console.log('[API Route] Creating order with data:', JSON.stringify(orderData, null, 2));
    
    // Validate required fields
    if (!orderData.billing?.email) {
      throw new Error('Email is required');
    }
    
    // Ensure shipping_lines have proper format - just convert total to string
    if (orderData.shipping_lines && orderData.shipping_lines.length > 0) {
      orderData.shipping_lines = orderData.shipping_lines.map((line: any) => ({
        ...line,
        total: String(line.total || '0.00')
      }));
    }
    
    // Add meta data for payment return URL
    const enhancedOrderData = {
      ...orderData,
      meta_data: [
        ...(orderData.meta_data || []),
        {
          key: '_payment_return_url',
          value: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`
        }
      ]
    };
    
    console.log('[API Route] Enhanced order data:', JSON.stringify(enhancedOrderData, null, 2));
    
    // Create the order using WooCommerce API
    const order = await woocommerce.createOrder(enhancedOrderData);
    
    console.log('[API Route] Order created successfully:', order.id);
    console.log('[API Route] Order key:', order.order_key);
    console.log('[API Route] Order status:', order.status);
    
    // Generate payment URL
    const paymentUrl = await woocommerce.getPaymentUrl(order.id, order.order_key);
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_key: order.order_key,
        status: order.status,
        total: order.total,
        currency: order.currency
      },
      paymentUrl: paymentUrl
    });
  } catch (error: any) {
    console.error('[API Route] Order creation error:', error);
    console.error('[API Route] Error stack:', error.stack);
    
    // Return more specific error information
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create order',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}