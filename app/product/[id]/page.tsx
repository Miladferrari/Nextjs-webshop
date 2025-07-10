import { woocommerce } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import ProductDetailEnhanced from './ProductDetailEnhanced';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  try {
    const product = await woocommerce.getProduct(parseInt(id));
    
    if (!product) {
      notFound();
    }

    // Fetch best-selling products for "Vaak samen gekocht" section
    const bestSellingProducts = await woocommerce.getProducts({
      per_page: 4,
      orderby: 'popularity',
      order: 'desc',
      exclude: [product.id] // Exclude current product
    });

    return <ProductDetailEnhanced product={product} relatedProducts={bestSellingProducts} />;
  } catch (error) {
    notFound();
  }
}