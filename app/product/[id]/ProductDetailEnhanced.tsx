'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import type { Product } from '@/lib/woocommerce';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Mock data for psychological triggers
const mockVisitors = Math.floor(Math.random() * 50) + 30;
const mockRecentPurchases = Math.floor(Math.random() * 20) + 5;
const mockWishlistAdds = Math.floor(Math.random() * 100) + 50;

// Enhanced mock reviews with more emotional content
const emotionalReviews = [
  { 
    id: 1, 
    author: "Jan de Vries", 
    rating: 5, 
    date: "2 dagen geleden", 
    comment: "Eindelijk kan ik gerust slapen. Na de stroomuitval vorige maand was ik in paniek. Nu ben ik voorbereid!", 
    verified: true,
    helpful: 23,
    location: "Amsterdam"
  },
  { 
    id: 2, 
    author: "Lisa B.", 
    rating: 5, 
    date: "1 week geleden", 
    comment: "Mijn kinderen zijn mijn alles. Dit pakket geeft me rust dat ik ze kan beschermen in noodgevallen.", 
    verified: true,
    helpful: 45,
    location: "Utrecht"
  },
  { 
    id: 3, 
    author: "Peter van Dam", 
    rating: 5, 
    date: "2 weken geleden", 
    comment: "Na de overstromingen in Limburg weet ik hoe belangrijk voorbereiding is. Dit is een must-have voor elk gezin!", 
    verified: true,
    helpful: 67,
    location: "Maastricht"
  },
  { 
    id: 4, 
    author: "Maria K.", 
    rating: 5, 
    date: "3 weken geleden", 
    comment: "Overheid adviseert het, dus heb ik direct besteld. Alles zit erin wat je nodig hebt. Top kwaliteit!", 
    verified: true,
    helpful: 34,
    location: "Den Haag"
  },
];

// FAQ data
const faqs = [
  {
    question: "Waarom heb ik een noodpakket nodig?",
    answer: "De overheid adviseert elk huishouden om voorbereid te zijn op noodsituaties. Met een noodpakket kunt u minimaal 72 uur zelfstandig overleven zonder hulp van buitenaf. Dit geeft hulpdiensten tijd om de ergste problemen op te lossen."
  },
  {
    question: "Hoe lang zijn de producten houdbaar?",
    answer: "Alle producten in onze noodpakketten hebben een houdbaarheid van minimaal 5 jaar. Het exacte vervaldatum staat op elk product vermeld. We adviseren om de datum jaarlijks te controleren."
  },
  {
    question: "Voor hoeveel personen is dit pakket?",
    answer: "Dit pakket is berekend voor het aangegeven aantal personen voor de vermelde periode. We hebben extra voedsel en water toegevoegd voor zekerheid."
  },
  {
    question: "Kan ik het pakket retourneren?",
    answer: "Ja, u heeft 30 dagen bedenktijd. Ongeopende pakketten kunnen kosteloos geretourneerd worden. We begrijpen dat veiligheid een belangrijke beslissing is."
  },
  {
    question: "Wordt het discreet geleverd?",
    answer: "Ja, alle pakketten worden in neutrale verpakking geleverd. Niemand kan van buitenaf zien wat er in het pakket zit."
  }
];

// Frequently bought together data
const bundleProducts = [
  { name: "Noodradio met Solar", price: 34.95, savings: 5.00 },
  { name: "Extra Water Zuiveringstabletten", price: 19.95, savings: 3.00 },
  { name: "Eerste Hulp Kit Premium", price: 49.95, savings: 7.50 }
];

export default function ProductDetailEnhanced({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [activeTab, setActiveTab] = useState<'benefits' | 'description' | 'shipping'>('benefits');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visitors, setVisitors] = useState(mockVisitors);
  const [selectedBundle, setSelectedBundle] = useState<string[]>([]);
  const [stickyOffset, setStickyOffset] = useState(80);
  
  // Use actual stock quantity from product, or generate once on mount
  const [stockLeft] = useState(() => {
    if (product.stock_quantity && product.stock_quantity > 0) {
      return product.stock_quantity;
    }
    // Only generate random stock for demo purposes if no real stock data
    return Math.floor(Math.random() * 15) + 5;
  });
  
  const { addToCart } = useCart();

  const images = product.images.length > 0 ? product.images : [{ id: 0, src: '', alt: product.name }];
  const mainImage = images[selectedImage];
  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;
  const discount = isOnSale ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;

  // Simulate live visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate sticky header offset
  useEffect(() => {
    const calculateOffset = () => {
      const header = document.getElementById('sticky-header');
      if (header) {
        // Subtract 20px to make it start sticking earlier (adjust this value as needed)
        setStickyOffset(header.offsetHeight - 20);
      }
    };
    
    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    
    return () => window.removeEventListener('resize', calculateOffset);
  }, []);


  // Countdown timer
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
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // Add bundle products if selected
    selectedBundle.forEach(bundleName => {
      const bundleProduct = bundleProducts.find(p => p.name === bundleName);
      if (bundleProduct) {
        // Create a mock product for the bundle item
        const mockBundleProduct = {
          ...product,
          id: Date.now() + Math.random(),
          name: bundleProduct.name,
          price: bundleProduct.price.toString(),
          regular_price: (bundleProduct.price + bundleProduct.savings).toString()
        };
        addToCart(mockBundleProduct as Product, 1);
      }
    });
    
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
    setQuantity(1);
    setSelectedBundle([]);
  };

  const calculateBundlePrice = () => {
    const basePrice = price * quantity;
    const bundlePrice = selectedBundle.reduce((total, bundleName) => {
      const bundleProduct = bundleProducts.find(p => p.name === bundleName);
      return total + (bundleProduct?.price || 0);
    }, 0);
    return basePrice + bundlePrice;
  };

  const calculateBundleSavings = () => {
    return selectedBundle.reduce((total, bundleName) => {
      const bundleProduct = bundleProducts.find(p => p.name === bundleName);
      return total + (bundleProduct?.savings || 0);
    }, 0);
  };

  const averageRating = 4.9;
  const totalReviews = 247;

  return (
    <div className="min-h-screen bg-white">


      {/* Breadcrumb */}
      <div className="bg-off-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-steel-gray hover:text-navy-blue">Home</a>
            <span className="text-steel-gray">/</span>
            <a href="/noodpakketten" className="text-steel-gray hover:text-navy-blue">Noodpakketten</a>
            <span className="text-steel-gray">/</span>
            <span className="text-navy-blue font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Live visitors indicator */}
      <div className="bg-medical-green/10 border-b border-medical-green/20">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-medical-green rounded-full animate-pulse"></div>
              <span className="text-medical-green font-medium">{visitors} mensen bekijken dit product</span>
            </div>
            <span className="text-steel-gray">•</span>
            <span className="text-steel-gray">{mockRecentPurchases} verkocht in laatste 24 uur</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Image Gallery */}
          <div className="lg:sticky lg:self-start space-y-4" style={{ top: `${stickyOffset}px` }}>
            <div className="relative w-full aspect-square bg-white rounded-2xl shadow-sm overflow-hidden">
              {mainImage.src ? (
                <>
                  <div 
                    className="relative w-full h-full cursor-zoom-in"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      setZoomPosition({ x, y });
                    }}
                  >
                    <Image
                      src={mainImage.src}
                      alt={mainImage.alt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Zoom preview */}
                    {showZoom && (
                      <div 
                        className="absolute inset-0 overflow-hidden bg-white z-10"
                        style={{
                          backgroundImage: `url(${mainImage.src})`,
                          backgroundSize: '200%',
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-steel-gray">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Only show sale badge if on sale */}
              {isOnSale && (
                <div className="absolute top-4 left-4">
                  <div className="bg-amber-orange text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                    -{discount}% KORTING
                  </div>
                </div>
              )}
              
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail images showcase */}
            {images.length > 1 && (
              <div className="relative">
                <div 
                  className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar"
                  ref={(el) => {
                    if (el) {
                      // Auto-scroll to selected thumbnail
                      const selectedThumb = el.children[selectedImage] as HTMLElement;
                      if (selectedThumb) {
                        const thumbLeft = selectedThumb.offsetLeft;
                        const thumbWidth = selectedThumb.offsetWidth;
                        const containerWidth = el.offsetWidth;
                        const scrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
                        el.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 bg-off-white rounded-lg border-2 transition-all overflow-hidden ${
                        selectedImage === index ? 'border-medical-green ring-2 ring-medical-green/30' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {image.src ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={image.src}
                            alt={image.alt || `${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-steel-gray/50">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Thumbnail navigation arrows - only show when there are more than 6 images */}
                {images.length > 6 && (
                  <>
                    <button
                      onClick={() => {
                        const container = document.querySelector('.flex.gap-2.overflow-x-auto') as HTMLElement;
                        if (container) {
                          container.scrollBy({ left: -200, behavior: 'smooth' });
                        }
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 z-10"
                      aria-label="Previous thumbnails"
                    >
                      <svg className="w-4 h-4 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const container = document.querySelector('.flex.gap-2.overflow-x-auto') as HTMLElement;
                        if (container) {
                          container.scrollBy({ left: 200, behavior: 'smooth' });
                        }
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 z-10"
                      aria-label="Next thumbnails"
                    >
                      <svg className="w-4 h-4 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            )}

          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Emotional headline */}
            <div className="bg-amber-orange/10 border border-amber-orange/30 rounded-xl p-4">
              <p className="text-amber-orange font-semibold text-center">
                ⚡ "Papa, waarom hebben we geen water?" - Zorg dat u dit nooit hoeft te horen
              </p>
            </div>

            {/* Title and rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-navy-blue mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">
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
                  <span className="font-bold text-navy-blue">{averageRating}</span>
                  <a href="#reviews" className="text-sm text-medical-green hover:underline">({totalReviews} beoordelingen)</a>
                </div>
              </div>
              
              {/* Trust badges - subtle */}
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-1 text-xs text-steel-gray">
                  <svg className="w-3.5 h-3.5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aanbevolen door overheid</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-steel-gray">
                  <svg className="w-3.5 h-3.5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Veilig betalen</span>
                </div>
              </div>
            </div>

            {/* Price section with psychological pricing */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                {isOnSale && (
                  <span className="text-2xl text-steel-gray line-through">
                    €{regularPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-navy-blue">
                  €{price.toFixed(2)}
                </span>
                {isOnSale && (
                  <span className="bg-amber-orange text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                    BESPAAR €{(regularPrice - price).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-steel-gray mb-3">Incl. BTW • Gratis verzending</p>
              
              {/* Limited time offer */}
              {isOnSale && (
                <div className="flex items-center gap-2 text-amber-orange">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">
                    Aanbieding eindigt over: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            {/* Stock urgency */}
            <div className="space-y-3">
              {stockLeft < 10 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-semibold">Nog maar {stockLeft} op voorraad!</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-medical-green font-semibold">Direct leverbaar</span>
                </div>
                <div className="flex items-center gap-2 text-steel-gray">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Voor 14:00 besteld, morgen in huis</span>
                </div>
              </div>
            </div>


            {/* Frequently bought together */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-navy-blue mb-4">Vaak samen gekocht</h3>
              <div className="space-y-3">
                {bundleProducts.map((bundle) => (
                  <label key={bundle.name} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedBundle.includes(bundle.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBundle([...selectedBundle, bundle.name]);
                        } else {
                          setSelectedBundle(selectedBundle.filter(n => n !== bundle.name));
                        }
                      }}
                      className="w-5 h-5 text-medical-green rounded focus:ring-medical-green"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-navy-blue group-hover:text-medical-green transition-colors">
                        {bundle.name}
                      </p>
                      <p className="text-sm text-steel-gray">
                        €{bundle.price.toFixed(2)} 
                        <span className="text-medical-green ml-2">Bespaar €{bundle.savings.toFixed(2)}</span>
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              
              {selectedBundle.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-navy-blue">Totaal pakket:</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-medical-green">€{calculateBundlePrice().toFixed(2)}</p>
                      <p className="text-sm text-steel-gray">Bespaar €{calculateBundleSavings().toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm text-steel-gray font-medium block mb-2">Aantal:</label>
                  <div className="inline-flex items-center border-2 border-gray-200 rounded-full overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <svg className="w-4 h-4 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center py-3 font-bold text-lg text-navy-blue focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 text-sm text-steel-gray">
                  <p>{mockWishlistAdds} mensen hebben dit aan hun verlanglijst toegevoegd</p>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-medical-green text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-medical-green/90 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                disabled={product.stock_status !== 'instock'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {product.stock_status === 'instock' ? 'Direct in winkelwagen' : 'Uitverkocht'}
              </button>

              {/* Trust icons - moved here for better conversion */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <p className="text-xs text-steel-gray font-medium">Gratis verzending</p>
                  <p className="text-xs text-medical-green">vanaf €75</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <p className="text-xs text-steel-gray font-medium">30 dagen retour</p>
                  <p className="text-xs text-medical-green">Niet goed, geld terug</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs text-steel-gray font-medium">Veilig betalen</p>
                  <p className="text-xs text-medical-green">SSL beveiligd</p>
                </div>
              </div>

              {/* Secure checkout promise */}
              <div className="flex items-center justify-center gap-6 text-xs text-steel-gray">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Voor 14:00 besteld, morgen in huis</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>100% Veilige betaling</span>
                </div>
              </div>
            </div>

            {/* Enhanced tabs */}
            <div>
              <div className="flex gap-4 border-b">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-3 px-1 font-semibold transition-all relative ${
                    activeTab === 'benefits' 
                      ? 'text-medical-green' 
                      : 'text-steel-gray hover:text-navy-blue'
                  }`}
                >
                  Voordelen
                  {activeTab === 'benefits' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-green"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-3 px-1 font-semibold transition-all relative ${
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
                  className={`pb-3 px-1 font-semibold transition-all relative ${
                    activeTab === 'shipping' 
                      ? 'text-medical-green' 
                      : 'text-steel-gray hover:text-navy-blue'
                  }`}
                >
                  Verzending
                  {activeTab === 'shipping' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-green"></div>
                  )}
                </button>
              </div>

              <div className="py-4">
                {activeTab === 'benefits' && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-blue">72 uur zelfvoorzienend</h4>
                        <p className="text-sm text-steel-gray">Overleef minimaal 3 dagen zonder hulp van buitenaf</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-blue">Overheidsaanbeveling</h4>
                        <p className="text-sm text-steel-gray">Voldoet aan alle richtlijnen van Rijksoverheid.nl</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-blue">5 jaar houdbaar</h4>
                        <p className="text-sm text-steel-gray">Lange houdbaarheid, jaarlijks controleren niet nodig</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-medical-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-blue">Voor het hele gezin</h4>
                        <p className="text-sm text-steel-gray">Bescherm uw dierbaren in noodsituaties</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'description' && (
                  <div className="prose prose-lg max-w-none text-steel-gray">
                    {product.description ? (
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    ) : (
                      <p className="text-gray-500 italic">Geen beschrijving beschikbaar.</p>
                    )}
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      <div>
                        <p className="font-semibold text-navy-blue">Gratis verzending</p>
                        <p className="text-sm text-steel-gray">Bij alle bestellingen boven €75</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-navy-blue">Vandaag besteld, morgen in huis</p>
                        <p className="text-sm text-steel-gray">Voor 14:00 besteld = volgende werkdag geleverd</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-medical-green mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <div>
                        <p className="font-semibold text-navy-blue">30 dagen bedenktijd</p>
                        <p className="text-sm text-steel-gray">Niet tevreden? Geld terug garantie</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Success message */}
            {showAddedMessage && (
              <div className="p-4 bg-medical-green/10 border-2 border-medical-green/30 rounded-xl flex items-center animate-fadeIn">
                <div className="w-10 h-10 bg-medical-green rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-medical-green font-semibold">Product toegevoegd aan winkelwagen!</p>
                  <p className="text-sm text-steel-gray">U kunt verder winkelen of direct afrekenen</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-navy-blue mb-8">Wat klanten zeggen</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <div className="text-center">
                  <div className="text-5xl font-bold text-navy-blue mb-2">{averageRating}</div>
                  <div className="flex justify-center mb-3">
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
                  <p className="text-steel-gray mb-6">{totalReviews} beoordelingen</p>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage = rating === 5 ? 85 : rating === 4 ? 12 : rating === 3 ? 3 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm text-steel-gray w-3">{rating}</span>
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-medical-green h-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-steel-gray w-10 text-right">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {emotionalReviews.map((review) => (
                <div key={review.id} className="bg-white border rounded-xl p-6">
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
                          <span className="bg-medical-green/10 text-medical-green text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Geverifieerde koper
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-steel-gray">
                        <span className="font-medium text-navy-blue">{review.author}</span>
                        <span>•</span>
                        <span>{review.location}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-steel-gray mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-2 text-steel-gray hover:text-medical-green transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>Nuttig ({review.helpful})</span>
                    </button>
                    <button className="text-steel-gray hover:text-medical-green transition-colors">
                      Rapporteer
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 border-2 border-medical-green text-medical-green rounded-lg font-semibold hover:bg-medical-green hover:text-white transition-all">
                Toon alle {totalReviews} beoordelingen
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-navy-blue mb-8">Veelgestelde vragen</h2>
          
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-navy-blue">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-steel-gray transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 text-steel-gray">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-navy-blue mb-8">Anderen bekeken ook</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relatedPrice = parseFloat(relatedProduct.price);
              const relatedRegularPrice = parseFloat(relatedProduct.regular_price);
              const relatedIsOnSale = relatedProduct.on_sale && relatedRegularPrice > relatedPrice;
              const relatedImage = relatedProduct.images[0];
              
              return (
                <a key={relatedProduct.id} href={`/product/${relatedProduct.id}`} className="group">
                  <div className="relative w-full aspect-square bg-off-white rounded-xl mb-3 group-hover:shadow-lg transition-all overflow-hidden">
                    {relatedImage?.src ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={relatedImage.src} 
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
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

      {/* Sticky mobile bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-2xl font-bold text-navy-blue">€{price.toFixed(2)}</p>
            {stockLeft < 10 && (
              <p className="text-xs text-amber-orange">Nog {stockLeft} op voorraad!</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock_status !== 'instock'}
            className="flex-shrink-0 bg-medical-green text-white px-6 py-3 rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-medical-green/90 transition-all shadow-lg"
          >
            <span>In winkelwagen</span>
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}