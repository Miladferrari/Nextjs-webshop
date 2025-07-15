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
    const allBestSellingProducts = await woocommerce.getProducts({
      per_page: 5, // Fetch one extra in case we need to filter out the current product
      orderby: 'popularity',
      order: 'desc'
    });

    // Filter out the current product and take only 4
    const bestSellingProducts = allBestSellingProducts
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    return <ProductDetailEnhanced product={product} relatedProducts={bestSellingProducts} />;
  } catch (error) {
    notFound();
  }
}