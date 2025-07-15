import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  // Set no-cache headers to ensure fresh data
  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const country = searchParams.get('country');
    const total = searchParams.get('total');
    const couponCode = searchParams.get('coupon');
    const postcode = searchParams.get('postcode');

    // Fetch allowed countries
    if (action === 'countries') {
      const countries = await woocommerce.getAllowedCountries();
      return NextResponse.json({ countries }, { headers });
    }

    // Calculate shipping rates for a country
    if (action === 'calculate' && country && total) {
      const cartTotal = parseFloat(total);
      let appliedCoupon = null;

      // If coupon is provided, validate it
      if (couponCode) {
        const coupon = await woocommerce.getCouponByCode(couponCode);
        if (coupon) {
          appliedCoupon = coupon;
        }
      }

      const rates = await woocommerce.calculateShipping(country, cartTotal, appliedCoupon, postcode || undefined);
      
      return NextResponse.json({ 
        rates,
        country,
        postcode,
        cartTotal 
      }, { headers });
    }

    // Fetch all shipping zones
    if (action === 'zones') {
      const zones = await woocommerce.getShippingZones();
      const zonesWithDetails = [];

      for (const zone of zones) {
        const locations = await woocommerce.getShippingZoneLocations(zone.id);
        const methods = await woocommerce.getShippingZoneMethods(zone.id);
        
        zonesWithDetails.push({
          ...zone,
          locations,
          methods
        });
      }

      // Also include Rest of the World (zone 0)
      const zone0Locations = await woocommerce.getShippingZoneLocations(0);
      const zone0Methods = await woocommerce.getShippingZoneMethods(0);
      
      if (zone0Methods.length > 0) {
        zonesWithDetails.push({
          id: 0,
          name: 'Rest of the World',
          order: 999,
          locations: zone0Locations,
          methods: zone0Methods
        });
      }

      return NextResponse.json({ zones: zonesWithDetails }, { headers });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400, headers });
  } catch (error) {
    console.error('Shipping API error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van verzendgegevens' },
      { status: 500, headers }
    );
  }
}