import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');
    const orderKey = searchParams.get('key');
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }
    
    console.log('[API Route] Checking order status for ID:', orderId);
    
    // Get order details
    const order = await woocommerce.getOrder(parseInt(orderId));
    
    // Verify order key if provided
    if (orderKey && order.order_key !== orderKey) {
      return NextResponse.json(
        { error: 'Invalid order key' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        total: order.total,
        currency: order.currency,
        payment_method: order.payment_method,
        payment_method_title: order.payment_method_title,
        date_created: order.date_created,
        billing: order.billing,
        shipping: order.shipping
      }
    });
  } catch (error: any) {
    console.error('[API Route] Order check error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to check order status'
      },
      { status: 500 }
    );
  }
}