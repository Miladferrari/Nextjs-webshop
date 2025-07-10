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

    console.log('=== COUPON VALIDATION START ===');
    console.log('Validating coupon:', code);
    console.log('Cart total:', cartTotal);

    // Fetch coupon from WooCommerce using query params for authentication
    // Try with search parameter instead of code parameter
    const apiUrl = `${WOOCOMMERCE_URL}/coupons?search=${encodeURIComponent(code)}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
    
    console.log('Fetching from WooCommerce API...');
    console.log('Using search parameter for coupon code:', code);
    console.log('API URL:', apiUrl.replace(CONSUMER_SECRET, 'HIDDEN'));
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
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
    console.log('Response from WooCommerce:', JSON.stringify(coupons, null, 2));
    console.log('Number of coupons found:', coupons.length);

    if (!coupons || coupons.length === 0) {
      console.log('No coupons found with code:', code);
      return NextResponse.json(
        { valid: false, error: 'Ongeldige kortingscode' },
        { status: 404 }
      );
    }

    // Find the exact coupon by code (in case search returns multiple)
    let coupon = coupons.find((c: any) => c.code.toLowerCase() === code.toLowerCase());
    
    if (!coupon) {
      console.log('Exact match not found, using first result');
      coupon = coupons[0];
    }
    
    console.log('Selected coupon details:', JSON.stringify(coupon, null, 2));
    console.log('Coupon validation checks:');
    console.log('- ID:', coupon.id);
    console.log('- Code:', coupon.code);
    console.log('- Code matches request:', coupon.code.toLowerCase() === code.toLowerCase());
    console.log('- Discount type:', coupon.discount_type);
    console.log('- Amount:', coupon.amount);
    console.log('- Minimum amount:', coupon.minimum_amount);
    console.log('- Maximum amount:', coupon.maximum_amount);
    console.log('- Usage limit:', coupon.usage_limit);
    console.log('- Usage count:', coupon.usage_count);
    console.log('- Date expires:', coupon.date_expires);

    // Validate coupon conditions
    const now = new Date();
    
    console.log('Starting validation checks...');
    
    // Check if coupon is expired
    if (coupon.date_expires) {
      const expiryDate = new Date(coupon.date_expires);
      console.log('Expiry check:', {
        expires: coupon.date_expires,
        expiryDate: expiryDate.toISOString(),
        now: now.toISOString(),
        isExpired: expiryDate < now
      });
      
      if (expiryDate < now) {
        console.log('FAILED: Coupon is expired');
        return NextResponse.json(
          { valid: false, error: 'Deze kortingscode is verlopen' },
          { status: 400 }
        );
      }
    }

    // Check minimum amount
    if (coupon.minimum_amount) {
      const minAmount = parseFloat(coupon.minimum_amount);
      console.log('Minimum amount check:', {
        minimum: minAmount,
        cartTotal: cartTotal,
        passes: cartTotal >= minAmount
      });
      
      if (cartTotal < minAmount) {
        console.log('FAILED: Cart total below minimum');
        return NextResponse.json(
          { 
            valid: false, 
            error: `Minimaal bestelbedrag van €${coupon.minimum_amount} vereist` 
          },
          { status: 400 }
        );
      }
    }

    // Check maximum amount
    if (coupon.maximum_amount) {
      const maxAmount = parseFloat(coupon.maximum_amount);
      console.log('Maximum amount check:', {
        maximum: maxAmount,
        cartTotal: cartTotal,
        passes: cartTotal <= maxAmount
      });
      
      if (cartTotal > maxAmount) {
        console.log('FAILED: Cart total above maximum');
        return NextResponse.json(
          { 
            valid: false, 
            error: `Maximaal bestelbedrag van €${coupon.maximum_amount} overschreden` 
          },
          { status: 400 }
        );
      }
    }

    // Check usage limit - only if limit is set and greater than 0
    console.log('Usage limit check:', {
      usage_limit: coupon.usage_limit,
      usage_count: coupon.usage_count,
      has_limit: coupon.usage_limit !== null && coupon.usage_limit !== undefined,
      limit_value: coupon.usage_limit,
      count_value: coupon.usage_count || 0
    });
    
    if (coupon.usage_limit !== null && coupon.usage_limit !== undefined && coupon.usage_limit > 0) {
      const usageCount = coupon.usage_count || 0;
      if (usageCount >= coupon.usage_limit) {
        console.log('FAILED: Usage limit exceeded');
        return NextResponse.json(
          { valid: false, error: 'Deze kortingscode is niet meer geldig' },
          { status: 400 }
        );
      }
    }

    console.log('All validation checks passed!');
    console.log('=== COUPON VALIDATION SUCCESS ===');
    
    // Return valid coupon data
    const validResponse = {
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        discount_type: coupon.discount_type,
        description: coupon.description || '',
      }
    };
    
    console.log('Returning valid response:', JSON.stringify(validResponse, null, 2));
    return NextResponse.json(validResponse);

  } catch (error) {
    console.error('=== COUPON VALIDATION ERROR ===');
    console.error('Error details:', error);
    return NextResponse.json(
      { valid: false, error: 'Er is een fout opgetreden bij het valideren van de kortingscode' },
      { status: 500 }
    );
  }
}