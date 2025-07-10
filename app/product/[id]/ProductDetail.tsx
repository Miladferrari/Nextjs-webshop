'use client';

import { useState, useEffect } from 'react';
import { useCartWithToast } from '../../hooks/useCartWithToast';
import { useToast } from '../../contexts/ToastContext';
import type { Product } from '@/lib/woocommerce';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Mock reviews data - in production, this would come from your API
const mockReviews = [
  { id: 1, author: "Jan de Vries", rating: 5, date: "2 dagen geleden", comment: "Uitstekende kwaliteit! Precies wat ik zocht voor noodvoorbereiding. Snelle levering ook.", verified: true },
  { id: 2, author: "Lisa B.", rating: 5, date: "1 week geleden", comment: "Zeer tevreden met dit pakket. Alles zit erin wat beloofd werd. Top!", verified: true },
  { id: 3, author: "Peter van Dam", rating: 4, date: "2 weken geleden", comment: "Goede prijs-kwaliteit verhouding. Aanrader voor elk gezin.", verified: true },
  { id: 4, author: "Maria K.", rating: 5, date: "3 weken geleden", comment: "Perfect voor in de kelder. Hopelijk nooit nodig, maar geeft rust.", verified: false },
];

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [activeTab, setActiveTab] = useState<'description' | 'shipping'>('description');
  // Use actual stock quantity from product if available, otherwise use a mock value
  const [stockLeft] = useState(() => {
    if (product.stock_quantity && product.stock_quantity > 0) {
      return product.stock_quantity;
    }
    return Math.floor(Math.random() * 15) + 5;
  });
  const { addToCart } = useCartWithToast();
  const { showToast } = useToast();

  const images = product.images.length > 0 ? product.images : [{ id: 0, src: '', alt: product.name }];
  const mainImage = images[selectedImage];
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  
  // Check if product is out of stock
  const isOutOfStock = product.stock_status !== 'instock' || product.stock_quantity === 0;

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    // Don't add to cart if out of stock
    if (isOutOfStock) return;
    
    addToCart(product, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
    setQuantity(1);
  };

  const averageRating = 4.8;
  const totalReviews = 47;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-off-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-steel-gray hover:text-navy-blue">Home</a>
            <span className="text-steel-gray">/</span>
            <a href="/producten" className="text-steel-gray hover:text-navy-blue">Producten</a>
            <span className="text-steel-gray">/</span>
            <span className="text-navy-blue font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 pb-24 lg:pb-8">
        {/* Mobile-first layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Images section - First on mobile, left on desktop */}
          <div className="order-1">
            <div className="space-y-4">
              {/* Main image */}
              <div className="aspect-square relative bg-off-white rounded-2xl overflow-hidden">
                {mainImage.src ? (
                  <img
                    src={mainImage.src}
                    alt={mainImage.alt || product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-steel-gray">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {isOnSale && !isOutOfStock && (
                  <span className="absolute top-4 left-4 bg-amber-orange text-white text-lg font-bold px-4 py-2 rounded-full">
                    -{discount}%
                  </span>
                )}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-2xl shadow-lg">
                      UITVERKOCHT
                    </div>
                  </div>
                )}
                {/* Trust badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium text-navy-blue">100% Authentiek</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-off-white rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-medical-green' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      {image.src ? (
                        <img
                          src={image.src}
                          alt={image.alt || `${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-steel-gray/50">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tabs section */}
            <div className="mt-8">
              <div className="border-b">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 px-2 font-semibold transition-all relative ${
                      activeTab === 'description' 
                        ? 'text-medical-green' 
                        : 'text-steel-gray hover:text-navy-blue'
                    }`}
                  >
                    Beschrijving
                    {activeTab === 'description' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-green"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-4 px-2 font-semibold transition-all relative ${
                      activeTab === 'shipping' 
                        ? 'text-medical-green' 
                        : 'text-steel-gray hover:text-navy-blue'
                    }`}
                  >
                    Verzending & Retour
                    {activeTab === 'shipping' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-green"></div>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Tab content */}
              <div className="py-6">
                {/* Description tab */}
                {activeTab === 'description' && (
                  <div className="prose prose-lg max-w-none text-steel-gray">
                    {product.description ? (
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    ) : (
                      <p>Geen beschrijving beschikbaar.</p>
                    )}
                  </div>
                )}
                
                {/* Shipping tab */}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <div className="bg-off-white rounded-xl p-5">
                      <h3 className="font-semibold text-navy-blue mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        Verzending
                      </h3>
                      <ul className="space-y-2 text-sm text-steel-gray">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Voor 14:00 besteld, volgende werkdag in huis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Gratis verzending bij bestellingen boven €75</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Track & trace code via email</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Discreet verpakt</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-off-white rounded-xl p-5">
                      <h3 className="font-semibold text-navy-blue mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Retourneren
                      </h3>
                      <ul className="space-y-2 text-sm text-steel-gray">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>30 dagen bedenktijd</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Gratis retourneren</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Geld terug binnen 5 werkdagen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Ongeopende producten in originele verpakking</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product info - shows second on mobile, right on desktop */}
          <div className="flex flex-col order-2 lg:order-2">
            {/* Review highlight box */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-navy-blue">{averageRating}/5</span>
              </div>
              <p className="text-sm text-steel-gray italic mb-2">
                "Uitstekende kwaliteit! Precies wat ik zocht voor noodvoorbereiding."
              </p>
              <a href="#reviews" className="text-sm text-medical-green hover:text-medical-green/80 font-medium underline">
                Bekijk alle {totalReviews} beoordelingen
              </a>
            </div>

            {/* Title - Smaller on mobile for better readability */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-blue mb-4">{product.name}</h1>
            
            {/* Mobile trust badges */}
            <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
              <div className="flex items-center gap-1 bg-medical-green/10 text-medical-green px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Gratis verzending</span>
              </div>
              <div className="flex items-center gap-1 bg-navy-blue/10 text-navy-blue px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Veilig betalen</span>
              </div>
            </div>

            {/* Price section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                {isOnSale && (
                  <span className="text-xl text-steel-gray line-through">
                    €{regularPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-navy-blue">
                  €{price.toFixed(2)}
                </span>
                {isOnSale && (
                  <span className="bg-amber-orange text-white text-sm font-bold px-2 py-1 rounded">
                    -{discount}%
                  </span>
                )}
              </div>
              <p className="text-sm text-steel-gray">Excl. verzendkosten</p>
              
              {/* Urgency: Limited time offer */}
              {isOnSale && (
                <div className="mt-3 bg-amber-orange/10 border border-amber-orange/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-amber-orange font-semibold text-sm">
                      Aanbieding eindigt over: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stock and shipping status */}
            <div className="mb-6 border-t border-b py-4">
              <div className="flex items-center gap-2 mb-3">
                {product.stock_status === 'instock' && product.stock_quantity !== 0 ? (
                  <>
                    <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-medical-green font-semibold">Direct leverbaar</span>
                    {stockLeft < 10 && (
                      <span className="text-amber-orange text-sm font-medium">(Nog {stockLeft} stuks)</span>
                    )}
                  </>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <p className="text-red-800 font-bold">Niet op voorraad</p>
                        <p className="text-red-600 text-sm">Binnenkort weer beschikbaar</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Delivery info - only show when in stock */}
              {product.stock_status === 'instock' && product.stock_quantity !== 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-steel-gray">Voor 14:00 besteld, morgen in huis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-steel-gray">Gratis verzending vanaf €75</span>
                  </div>
                </div>
              )}
            </div>

            {/* Short description */}
            {product.short_description && (
              <div className="mb-6 text-steel-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: product.short_description }} />
            )}

            {/* Purchase section */}
            <div className="space-y-5 mb-8">
              {/* Quantity selector */}
              <div>
                <label className="text-sm text-steel-gray font-medium block mb-3">Aantal:</label>
                <div className="inline-flex items-center border-2 border-gray-200 rounded-full overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1 || isOutOfStock}
                  >
                    <svg className="w-4 h-4 text-steel-gray group-hover:text-navy-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                      // Check stock limit
                      if (product.stock_quantity && newQuantity > product.stock_quantity) {
                        showToast(
                          `Er is niet genoeg voorraad van dit product beschikbaar. Maximum beschikbaar: ${product.stock_quantity}`,
                          'error'
                        );
                        setQuantity(product.stock_quantity);
                      } else {
                        setQuantity(newQuantity);
                      }
                    }}
                    className="w-20 text-center py-3 font-bold text-lg text-navy-blue focus:outline-none bg-transparent disabled:opacity-50"
                    min="1"
                    max={product.stock_quantity || undefined}
                    disabled={isOutOfStock}
                  />
                  <button
                    onClick={() => {
                      const newQuantity = quantity + 1;
                      // Check stock limit
                      if (product.stock_quantity && newQuantity > product.stock_quantity) {
                        showToast(
                          `Er is niet genoeg voorraad van dit product beschikbaar. Maximum beschikbaar: ${product.stock_quantity}`,
                          'error'
                        );
                      } else {
                        setQuantity(newQuantity);
                      }
                    }}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isOutOfStock || (product.stock_quantity !== null && quantity >= product.stock_quantity)}
                  >
                    <svg className="w-4 h-4 text-steel-gray group-hover:text-medical-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button 
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 ${
                  isOutOfStock 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-amber-orange text-white hover:bg-amber-orange/90 disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Uitverkocht</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>In winkelwagen</span>
                  </>
                )}
              </button>

            </div>

            {/* Success message */}
            {showAddedMessage && (
              <div className="mb-6 p-4 bg-medical-green/10 border-2 border-medical-green/30 rounded-xl flex items-center animate-fadeIn">
                <div className="w-10 h-10 bg-medical-green rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-medical-green font-semibold">Product toegevoegd aan winkelwagen!</span>
              </div>
            )}

            {/* Payment methods */}
            <div className="mb-6">
              <p className="text-sm text-steel-gray mb-3">Betaalmethoden:</p>
              <div className="flex gap-2 flex-wrap">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">iDEAL</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">Visa</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">MC</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">PayPal</span>
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">Klarna</span>
                </div>
              </div>
            </div>

            {/* USPs */}
            <div className="space-y-3 py-6 border-t">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-navy-blue text-sm">30 dagen bedenktijd</p>
                  <p className="text-xs text-steel-gray">Niet goed? Geld terug!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-navy-blue text-sm">Gratis verzending vanaf €75</p>
                  <p className="text-xs text-steel-gray">Voor 14:00 besteld, morgen in huis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-navy-blue text-sm">Veilig betalen</p>
                  <p className="text-xs text-steel-gray">SSL beveiligde checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-medical-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-semibold text-navy-blue text-sm">2 jaar garantie</p>
                  <p className="text-xs text-steel-gray">Op alle noodpakketten</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            {product.categories.length > 0 && (
              <div className="pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-steel-gray">Categorieën:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <a 
                        key={category.id} 
                        href={`/producten?category=${category.slug}`}
                        className="bg-off-white hover:bg-medical-green/10 px-3 py-1 rounded-full text-sm text-navy-blue hover:text-medical-green transition-colors"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews section - Trusted Shops style */}
        <div className="mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-blue mb-8">Klantbeoordelingen</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left column - Rating distribution (40%) */}
              <div className="lg:col-span-2">
                <div className="border border-gray-200 rounded-xl p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-navy-blue mb-2">{averageRating}</div>
                    <p className="text-steel-gray mb-3">{totalReviews} beoordelingen</p>
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Rating distribution bars */}
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage = rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : 0;
                      const count = rating === 5 ? 35 : rating === 4 ? 9 : rating === 3 ? 3 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm text-steel-gray w-8 flex items-center gap-1">
                            {rating}
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 relative overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-medical-green rounded-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-steel-gray w-12 text-right">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t text-xs text-steel-gray space-y-2">
                    <p>Verzameld onder de Trusted Shops <a href="#" className="text-medical-green hover:underline">Gebruiksvoorwaarden</a></p>
                    <p><a href="#" className="text-medical-green hover:underline">Over de authenticiteit van beoordelingen</a></p>
                  </div>
                </div>
              </div>

              {/* Right column - Reviews list (60%) */}
              <div className="lg:col-span-3">
                <div className="border border-gray-200 rounded-xl">
                  {/* Filter bar */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-navy-blue">Alle beoordelingen</h3>
                      <div className="flex items-center gap-4">
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-steel-gray focus:outline-none focus:ring-2 focus:ring-medical-green">
                          <option>Meest recent</option>
                          <option>Hoogste beoordeling</option>
                          <option>Laagste beoordeling</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Reviews - scrollable container */}
                  <div className="divide-y max-h-96 overflow-y-auto">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </svg>
                                ))}
                              </div>
                              {review.verified && (
                                <div className="relative group">
                                  <svg className="w-5 h-5 text-medical-green cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                                    NoodKlaar heeft Trusted Shops gebruikt om deze klantenbeoordeling te verzamelen. Dit betekent dat we kunnen verifiëren dat deze beoordeling gebaseerd is op een daadwerkelijke ervaring.
                                    <div className="absolute bottom-0 left-5 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-steel-gray">
                              <span className="font-medium text-navy-blue">{review.author}</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-steel-gray">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  <div className="p-6 text-center border-t">
                    <button className="text-medical-green hover:text-medical-green/80 font-medium">
                      Toon meer beoordelingen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently viewed / Related products section */}
        <div className="mt-16 py-8 border-t">
          <h2 className="text-2xl font-bold text-navy-blue mb-8">Vaak samen gekocht</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relatedPrice = parseFloat(relatedProduct.price);
              const relatedRegularPrice = parseFloat(relatedProduct.regular_price);
              const relatedIsOnSale = relatedProduct.on_sale && relatedRegularPrice > relatedPrice;
              const relatedImage = relatedProduct.images[0];
              
              return (
                <a key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="group">
                  <div className="aspect-square bg-off-white rounded-xl overflow-hidden mb-3 group-hover:shadow-lg transition-shadow relative">
                    {relatedImage?.src ? (
                      <img 
                        src={relatedImage.src} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-steel-gray">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    {relatedIsOnSale && (
                      <div className="absolute top-2 right-2 bg-amber-orange text-white text-xs font-bold px-2 py-1 rounded">
                        -{Math.round(((relatedRegularPrice - relatedPrice) / relatedRegularPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-navy-blue group-hover:text-medical-green transition-colors line-clamp-2 mb-1">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-medical-green font-bold">€{relatedPrice.toFixed(2)}</p>
                    {relatedIsOnSale && (
                      <p className="text-steel-gray line-through text-sm">€{relatedRegularPrice.toFixed(2)}</p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Sticky mobile add to cart bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-steel-gray">€{price.toFixed(2)}</p>
            <p className="font-semibold text-navy-blue truncate">{product.name}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
              isOutOfStock 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-medical-green text-white hover:bg-medical-green/90 disabled:bg-gray-300 disabled:cursor-not-allowed'
            }`}
          >
            {isOutOfStock ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Uitverkocht</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Toevoegen</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}