import Link from 'next/link';
import { woocommerce, Category } from '@/lib/woocommerce';
import ProductCard from '../components/ProductCard';
import FilteredProducts from '../components/FilteredProducts';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const selectedCategorySlug = params.category as string | undefined;
  
  let categories: Category[] = [];
  let categoryPrices: Record<number, number> = {};
  let selectedCategory: Category | null = null;
  let categoryProducts: any[] = [];
  
  try {
    // Fetch product categories
    categories = await woocommerce.getCategories({
      per_page: 100,
      orderby: 'count',
      order: 'desc',
      hide_empty: false  // Show all categories
    });
    
    // If a category is selected, find it and fetch its products
    if (selectedCategorySlug) {
      selectedCategory = categories.find(cat => cat.slug === selectedCategorySlug) || null;
      
      if (selectedCategory) {
        try {
          categoryProducts = await woocommerce.getProductsByCategory(selectedCategory.id, {
            per_page: 100,
            orderby: 'menu_order',
            order: 'asc'
          });
        } catch (error) {
          console.error('[Collection Page] Error fetching products:', error);
        }
      }
    } else {
      // Fetch lowest price for each category only when showing all categories
      for (const category of categories) {
        try {
          const products = await woocommerce.getProductsByCategory(category.id, {
            per_page: 100,
            orderby: 'price',
            order: 'asc'
          });
          
          if (products.length > 0) {
            const lowestPrice = Math.min(...products.map(p => parseFloat(p.price) || 0));
            categoryPrices[category.id] = lowestPrice;
          }
        } catch (err) {
          console.error(`Failed to fetch products for category ${category.id}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Failed to load categories:', err);
  }

  return (
    <div className="min-h-screen bg-off-white">

      {/* Show products if category is selected, otherwise show categories */}
      {selectedCategory && categoryProducts.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link className="text-steel-gray hover:text-medical-green transition-colors" href="/">Home</Link>
                <span className="text-steel-gray">/</span>
                <Link className="text-steel-gray hover:text-medical-green transition-colors" href="/noodpakketten">Noodpakketten</Link>
                <span className="text-steel-gray">/</span>
                <span className="text-navy-blue font-medium">{selectedCategory.name}</span>
              </nav>
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Alle categorieën bekijken
              </Link>
            </div>
            
            {/* Action Banner */}
            <div className="mb-6">
              <a href="/contact" className="block">
                <div className="w-full min-h-[60px] pt-3 pb-3 px-4 text-center text-lg leading-6 text-white font-bold rounded-lg flex items-center justify-center flex-wrap sm:flex lg:text-xl transition-colors" style={{backgroundColor: '#fab005'}}>
                  <span className="sm:block">
                    Tijdelijke actie: 15% korting op alle noodpakketten! Gebruik code: VEILIG2024 &gt;
                  </span>
                </div>
              </a>
            </div>
            
            <FilteredProducts products={categoryProducts} categoryName={selectedCategory.name} />
          </div>
        </section>
      ) : selectedCategory && categoryProducts.length === 0 ? (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy-blue mb-2">Geen producten gevonden</h3>
              <p className="text-steel-gray mb-6">Er zijn momenteel geen producten in deze categorie.</p>
              <Link 
                href="/noodpakketten" 
                className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Terug naar categorieën
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
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
              const categoryFeatures: Record<string, string[]> = {
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
        </div>
      </section>
      )}

      {/* Why Choose Section - Emotional Redesign - Only show when no category selected */}
      {!selectedCategory && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
              Stel u voor... het is 3 uur 's nachts
            </h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              De stroom valt uit. Het water stopt. Uw gezin kijkt naar u. 
              Bent u de held die voorbereid is, of moet u zeggen: "Ik weet het niet..."?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                "Papa, ik heb dorst..."
              </h3>
              <p className="text-steel-gray mb-2">
                Met ons pakket heeft u <strong>72 uur schoon drinkwater</strong> voor het hele gezin. 
              </p>
              <p className="text-medical-green font-semibold">
                U bent de held ✓
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                "Schat, wat doen we nu?"
              </h3>
              <p className="text-steel-gray mb-2">
                <strong>Binnen 60 seconden</strong> heeft u licht, warmte en communicatie geregeld.
              </p>
              <p className="text-medical-green font-semibold">
                U heeft de controle ✓
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-green/20 transition-colors">
                <svg className="w-10 h-10 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-blue mb-3">
                "Gelukkig waren wij voorbereid"
              </h3>
              <p className="text-steel-gray mb-2">
                Sluit u aan bij <strong>12.000+ families</strong> die rustig slapen.
              </p>
              <p className="text-medical-green font-semibold">
                U bent niet alleen ✓
              </p>
            </div>
          </div>
          
          <div className="bg-amber-orange/10 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-navy-blue font-medium mb-2">
              "De beste tijd om een boom te planten was 20 jaar geleden.
            </p>
            <p className="text-lg text-navy-blue font-bold">
              De op één na beste tijd is nu."
            </p>
            <p className="text-sm text-steel-gray mt-3">
              - Chinees gezegde, perfect voor noodvoorbereiding
            </p>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section - Only show when no category selected */}
      {!selectedCategory && (
      <section className="py-16 bg-gradient-to-r from-medical-green to-medical-green/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Niet zeker welk pakket bij u past?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Gebruik onze pakket-kiezer of neem contact op voor persoonlijk advies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pakket-kiezer"
              className="bg-white text-medical-green px-8 py-4 rounded-full font-bold hover:bg-off-white transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Start Pakket-kiezer
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-medical-green transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Opnemen
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}