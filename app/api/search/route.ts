import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ products: [] });
    }

    // Search products using WooCommerce API
    const products = await woocommerce.searchProducts(query, {
      per_page: 20,
      page: 1
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}