import { NextRequest, NextResponse } from 'next/server';
import { woocommerce } from '@/lib/woocommerce';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Check stock for each item
    const stockIssues = [];
    
    for (const item of items) {
      const product = await woocommerce.getProduct(item.product.id);
      
      // Check if product is out of stock
      if (product.stock_status !== 'instock' || product.stock_quantity === 0) {
        stockIssues.push({
          productId: product.id,
          productName: product.name,
          requested: item.quantity,
          available: 0,
          issue: 'out_of_stock'
        });
      }
      // Check if requested quantity exceeds available stock
      else if (product.stock_quantity !== null && item.quantity > product.stock_quantity) {
        stockIssues.push({
          productId: product.id,
          productName: product.name,
          requested: item.quantity,
          available: product.stock_quantity,
          issue: 'insufficient_stock'
        });
      }
    }

    if (stockIssues.length > 0) {
      return NextResponse.json({
        valid: false,
        issues: stockIssues
      });
    }

    return NextResponse.json({
      valid: true,
      issues: []
    });
  } catch (error) {
    console.error('Stock validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate stock' },
      { status: 500 }
    );
  }
}