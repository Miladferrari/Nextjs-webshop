import { woocommerce, Category } from '@/lib/woocommerce';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Lazy load heavy components
const ProductCard = dynamicImport(() => import('./components/ProductCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />,
  ssr: true
});

const TestimonialsSection = dynamicImport(() => import('./components/TestimonialsSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
});

const ComparisonSection = dynamicImport(() => import('./components/ComparisonSection'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
});

export default async function Home() {
  let featuredProducts: any[] = [];
  let categories: Category[] = [];
  let categoryPrices: Record<number, number> = {};
  
  try {
    // Fetch featured products
    featuredProducts = await woocommerce.getProducts({
      per_page: 3,
      page: 1,
      orderby: 'popularity',
      order: 'desc'
    });
    
    // Fetch product categories
    categories = await woocommerce.getCategories({
      per_page: 10,
      orderby: 'count',
      order: 'desc',
      hide_empty: true
    });
    
    // Fetch lowest price for each category
    for (const category of categories.slice(0, 6)) {
      try {
        const products = await woocommerce.getProductsByCategory(category.id, {
          per_page: 100,
          orderby: 'price',
          order: 'asc'
        });
        
        if (products.length > 0) {
          // Find the lowest price among products
          const lowestPrice = Math.min(...products.map(p => parseFloat(p.price) || 0));
          categoryPrices[category.id] = lowestPrice;
        }
      } catch (err) {
        console.error(`Failed to fetch products for category ${category.id}:`, err);
      }
    }
  } catch (err) {
    console.error('Failed to load data:', err);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Simplified */}
      <section className="bg-gradient-to-b from-navy-blue to-navy-blue/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-medical-green/10 rounded-full px-4 py-2 text-medical-green text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Officiële noodpakketten leverancier</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Noodpakketten voor <span className="text-medical-green">uw veiligheid</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Compleet samengestelde noodpakketten. Vandaag besteld, morgen in huis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center justify-center gap-2 bg-medical-green text-white px-8 py-4 rounded-full font-bold hover:bg-medical-green/90 transition-all duration-200 shadow-lg"
              >
                <span>Bekijk alle pakketten</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/quiz" 
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-blue px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-200"
              >
                <span>Hulp bij kiezen</span>
              </Link>
            </div>

            {/* USPs in one line */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Verzending binnen 2 dagen</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">14 dagen bedenktijd</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">5 jaar houdbaar</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">12.000+ tevreden klanten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-off-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-steel-gray">Veilig betalen met iDEAL</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="text-sm text-steel-gray">Verzending binnen 2 dagen</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <svg className="w-6 h-6 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span className="text-sm text-steel-gray">14 dagen bedenktijd</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Prepare Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
              Waarom nu voorbereiden?
            </h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              De overheid adviseert elke burger om voorbereid te zijn op noodsituaties. 
              Hier zijn de meest voorkomende scenario's:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Stroomuitval</h3>
              <p className="text-steel-gray text-sm mb-4">
                Gemiddeld 3x per jaar in Nederland. Kan dagen duren bij extreme weersomstandigheden.
              </p>
              <div className="text-xs text-amber-orange font-semibold">23% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Extreme Weer</h3>
              <p className="text-steel-gray text-sm mb-4">
                Stormen, overstromingen en hittegolven nemen toe door klimaatverandering.
              </p>
              <div className="text-xs text-amber-orange font-semibold">41% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Cyberaanval</h3>
              <p className="text-steel-gray text-sm mb-4">
                Kritieke infrastructuur is kwetsbaar. Kan leiden tot uitval van diensten.
              </p>
              <div className="text-xs text-amber-orange font-semibold">15% kans dit jaar</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-navy-blue mb-2">Pandemie</h3>
              <p className="text-steel-gray text-sm mb-4">
                COVID-19 toonde het belang van voorbereiding. Experts waarschuwen voor nieuwe uitbraken.
              </p>
              <div className="text-xs text-amber-orange font-semibold">8% kans dit jaar</div>
            </div>
          </div>

          <div className="mt-12 bg-amber-orange/10 rounded-2xl p-6 border-2 border-amber-orange/30">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-amber-orange flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-navy-blue mb-1">Overheidsadvies</h4>
                <p className="text-steel-gray">
                  Het Rode Kruis en Rijksoverheid adviseren: "Zorg dat u minimaal 3 dagen zelfvoorzienend bent met water, voedsel, medicijnen en andere essentiële benodigdheden."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Redesigned */}
      {categories.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-off-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
                Onze Collecties
              </h2>
              <p className="text-xl text-steel-gray">
                Kies uit onze zorgvuldig samengestelde productcategorieën
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.slice(0, 6).map((category, index) => {
                // Define color schemes for categories
                const colorSchemes = ['medical-green', 'navy-blue', 'amber-orange'];
                const color = colorSchemes[index % colorSchemes.length];
                
                // Define placeholder images based on category
                const placeholderImages = [
                  'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=600&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1609205807107-454f1c7bc48c?w=600&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
                  'https://images.unsplash.com/photo-1603217039863-aa0c865404f7?w=600&h=400&fit=crop'
                ];
                
                // Get lowest price for category
                const lowestPrice = categoryPrices[category.id];
                const priceDisplay = lowestPrice ? `Vanaf €${Math.floor(lowestPrice)}` : 'Bekijk prijzen';
                
                // Define features based on category (you can customize these)
                const categoryFeatures = {
                  default: [
                    'Premium kwaliteit',
                    'Direct leverbaar',
                    'Volledig compleet'
                  ]
                };
                
                const features = categoryFeatures[category.slug] || categoryFeatures.default;
                
                return (
                  <Link 
                    key={category.id}
                    href={`/noodpakketten?category=${category.slug}`} 
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {index === 0 && (
                      <div className="absolute top-4 right-4 bg-amber-orange text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                        Meest gekozen
                      </div>
                    )}
                    
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={category.image?.src || placeholderImages[index % placeholderImages.length]} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-navy-blue">
                          {category.count} {category.count === 1 ? 'product' : 'producten'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`h-2 bg-${color}`}></div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-navy-blue mb-2 group-hover:text-medical-green transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-steel-gray mb-4">
                        {category.description || 'Ontdek onze selectie van hoogwaardige noodvoorzieningen'}
                      </p>
                      
                      <div className="text-3xl font-bold text-medical-green mb-6">{priceDisplay}</div>
                      
                      <ul className="space-y-3 mb-8">
                        {features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-steel-gray">
                            <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-navy-blue font-semibold group-hover:gap-3 transition-all">
                          <span>Bekijk collectie</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {categories.length > 6 && (
              <div className="text-center mt-12">
                <Link 
                  href="/noodpakketten" 
                  className="inline-flex items-center gap-2 bg-white text-medical-green border-2 border-medical-green px-8 py-3 rounded-full font-semibold hover:bg-medical-green hover:text-white transition-all duration-200"
                >
                  <span>Bekijk alle collecties</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Comparison Section - Simplified */}
      <ComparisonSection />

      {/* Best-selling Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
                Bestsellers deze maand
              </h2>
              <p className="text-xl text-steel-gray">
                De meest gekozen pakketten door onze klanten
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 bg-white text-medical-green border-2 border-medical-green px-8 py-3 rounded-full font-semibold hover:bg-medical-green hover:text-white transition-all duration-200"
              >
                <span>Alle pakketten bekijken</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials - Enhanced */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-blue rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-medical-green rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-orange rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start vandaag met uw voorbereiding
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Meer dan 12.000 Nederlandse gezinnen gingen u voor. 
                Wacht niet tot het te laat is.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/noodpakketten" 
                  className="inline-flex items-center justify-center gap-2 bg-medical-green text-white px-8 py-4 rounded-full font-bold hover:bg-medical-green/90 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  <span>Bekijk alle pakketten</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-navy-blue transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Advies nodig?</span>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Geen abonnement</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Eenmalige aankoop</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">Direct compleet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}