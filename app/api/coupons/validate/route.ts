import { NextResponse } from 'next/server';

const WOOCOMMERCE_URL = 'https://wordpress.restaurantmahzen.nl/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_5c05d4b7c9fe3113dc376453e4b39e14aba065d2';
const CONSUMER_SECRET = 'cs_8bb20ca6b085a45b859eddb6217e8c2edc4cc3ed';

export async function POST(request: Request) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: 'Geen kortingscode opgegeven' },
        { status: 400 }
      );
    }

    console.log('Validating coupon:', code, 'Cart total:', cartTotal);

    // Fetch coupon from WooCommerce using query params for authentication
    const apiUrl = `${WOOCOMMERCE_URL}/coupons?code=${encodeURIComponent(code)}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
    
    console.log('Fetching from WooCommerce API...');
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('WooCommerce response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WooCommerce API error:', response.status, errorText);
      return NextResponse.json(
        { valid: false, error: 'Fout bij het valideren van de kortingscode' },
        { status: response.status }
      );
    }

    const coupons = await response.json();
    console.log('Coupons found:', coupons.length);

    if (!coupons || coupons.length === 0) {
      return NextResponse.json(
        { valid: false, error: 'Ongeldige kortingscode' },
        { status: 404 }
      );
    }

    const coupon = coupons[0];
    console.log('Coupon details:', {
      id: coupon.id,
      code: coupon.code,
      discount_type: coupon.discount_type,
      amount: coupon.amount,
      minimum_amount: coupon.minimum_amount,
      maximum_amount: coupon.maximum_amount,
      usage_limit: coupon.usage_limit,
      usage_count: coupon.usage_count,
      date_expires: coupon.date_expires
    });

    // Validate coupon conditions
    const now = new Date();
    
    // Check if coupon is expired
    if (coupon.date_expires && new Date(coupon.date_expires) < now) {
      return NextResponse.json(
        { valid: false, error: 'Deze kortingscode is verlopen' },
        { status: 400 }
      );
    }

    // Check minimum amount
    if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
      return NextResponse.json(
        { 
          valid: false, 
          error: `Minimaal bestelbedrag van €${coupon.minimum_amount} vereist` 
        },
        { status: 400 }
      );
    }

    // Check maximum amount
    if (coupon.maximum_amount && cartTotal > parseFloat(coupon.maximum_amount)) {
      return NextResponse.json(
        { 
          valid: false, 
          error: `Maximaal bestelbedrag van €${coupon.maximum_amount} overschreden` 
        },
        { status: 400 }
      );
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json(
        { valid: false, error: 'Deze kortingscode is niet meer geldig' },
        { status: 400 }
      );
    }

    // Return valid coupon data
    return NextResponse.json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        description: coupon.description || '',
      }
    });

  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Er is een fout opgetreden bij het valideren van de kortingscode' },
      { status: 500 }
    );
  }
}