import { woocommerce } from '@/lib/woocommerce';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CatalogPageProps {
  params: Promise<{ slug: string }>;
}

// Mock catalog data - replace with actual category from WooCommerce when ready
const mockCatalogs: Record<string, any> = {
  'gezinspakketten': {
    id: 1,
    name: 'Gezinspakketten',
    slug: 'gezinspakketten',
    description: 'Complete noodpakketten voor het hele gezin. Van 2 tot 6 personen.',
    icon: '👨‍👩‍👧‍👦',
    longDescription: `
      Onze gezinspakketten zijn speciaal samengesteld om uw hele gezin te voorzien tijdens noodsituaties. 
      Deze pakketten bevatten voldoende voedsel, water, medische benodigdheden en overlevingsmateriaal 
      voor 72 uur - de cruciale periode die experts aanbevelen voor noodvoorbereiding.
    `,
    benefits: [
      'Complete uitrusting voor 2-6 personen',
      'Minstens 72 uur zelfvoorzienend',
      'Inclusief kinderspecifieke items',
      'Compact opbergsysteem'
    ]
  },
  'solo-pakketten': {
    id: 2,
    name: 'Solo Pakketten',
    slug: 'solo-pakketten',
    description: 'Persoonlijke noodpakketten voor individuele voorbereiding.',
    icon: '🎒',
    longDescription: `
      Perfect voor individuele voorbereiding. Deze compacte pakketten bevatten alle essentiële items 
      voor één persoon en zijn ideaal voor thuis, op kantoor of in de auto.
    `,
    benefits: [
      'Lichtgewicht en draagbaar',
      'Ideaal voor één persoon',
      'Rugzak inbegrepen',
      'Direct inzetbaar'
    ]
  },
  'huisdier-noodkits': {
    id: 3,
    name: 'Huisdier Noodkits',
    slug: 'huisdier-noodkits',
    description: 'Vergeet uw trouwe viervoeter niet in noodsituaties.',
    icon: '🐕',
    longDescription: `
      Uw huisdieren zijn een belangrijk deel van het gezin. Onze huisdier noodkits zorgen ervoor 
      dat ook zij veilig en verzorgd blijven tijdens een noodsituatie.
    `,
    benefits: [
      'Speciaal huisdiervoer',
      'Drinkbakken en voerbakken',
      'EHBO voor huisdieren',
      'Comfort items'
    ]
  },
  'auto-noodkits': {
    id: 4,
    name: 'Auto Noodkits',
    slug: 'auto-noodkits',
    description: 'Essentiële nooduitrusting voor in uw voertuig.',
    icon: '🚗',
    longDescription: `
      Speciaal ontworpen voor in de auto. Deze kits bevatten alles wat u nodig heeft bij pech onderweg, 
      ongelukken of wanneer u vast komt te zitten.
    `,
    benefits: [
      'Compact formaat voor in de kofferbak',
      'Inclusief gevarendriehoek',
      'Startkabels en gereedschap',
      'Warmte dekens'
    ]
  },
  'kantoor-bedrijf': {
    id: 5,
    name: 'Kantoor & Bedrijf',
    slug: 'kantoor-bedrijf',
    description: 'Noodpakketten voor op kantoor of in uw bedrijf.',
    icon: '🏢',
    longDescription: `
      Zorg voor de veiligheid van uw medewerkers met onze kantoor noodpakketten. 
      Voldoet aan alle BHV-richtlijnen en ARBO-wetgeving.
    `,
    benefits: [
      'Schaalbaar van 10-50 personen',
      'BHV gecertificeerd',
      'Inclusief evacuatiemateriaal',
      'Bulk kortingen beschikbaar'
    ]
  },
  'specialistische-kits': {
    id: 6,
    name: 'Specialistische Kits',
    slug: 'specialistische-kits',
    description: 'Gespecialiseerde pakketten voor unieke situaties.',
    icon: '⚡',
    longDescription: `
      Voor specifieke noodsituaties hebben we gespecialiseerde kits ontwikkeld. 
      Van stroomuitval tot overstromingen, wij hebben de juiste uitrusting.
    `,
    benefits: [
      'Situatie-specifieke uitrusting',
      'Professionele kwaliteit',
      'Uitgebreide handleidingen',
      'Expert aanbevelingen'
    ]
  }
};

export default async function CatalogProductsPage({ params }: CatalogPageProps) {
  const { slug } = await params;
  
  // Get the catalog info
  const catalog = mockCatalogs[slug];
  
  if (!catalog) {
    notFound();
  }

  // In production, fetch products by category from WooCommerce
  // const category = await woocommerce.getCategoryBySlug(slug);
  // const products = await woocommerce.getProductsByCategory(category.id);
  
  // For now, fetch all products
  let products: any[] = [];
  let error = null;

  try {
    products = await woocommerce.getProducts({
      per_page: 20,
      page: 1,
      orderby: 'date',
      order: 'desc'
    });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load products';
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-steel-gray hover:text-medical-green transition-colors">
              Home
            </Link>
            <span className="text-steel-gray">/</span>
            <Link href="/noodpakketten" className="text-steel-gray hover:text-medical-green transition-colors">
              Noodpakketten
            </Link>
            <span className="text-steel-gray">/</span>
            <span className="text-navy-blue font-medium">{catalog.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-blue to-navy-blue/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">{catalog.icon}</span>
                <h1 className="text-4xl md:text-5xl font-bold">{catalog.name}</h1>
              </div>
              <p className="text-xl text-gray-300 mb-6">
                {catalog.description}
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                {catalog.longDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catalog.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-medical-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <span className="text-[200px] opacity-20">{catalog.icon}</span>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-medical-green/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-orange/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-steel-gray">Toont</span>
              <span className="font-semibold text-navy-blue">{products.length} producten</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-steel-gray focus:outline-none focus:ring-2 focus:ring-medical-green">
                <option>Sorteer op: Aanbevolen</option>
                <option>Prijs: Laag naar hoog</option>
                <option>Prijs: Hoog naar laag</option>
                <option>Nieuwste eerst</option>
                <option>Beste beoordeeld</option>
              </select>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-steel-gray hover:bg-off-white transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-semibold">Error loading products</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : products.length === 0 ? (
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
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Load More */}
              {products.length >= 20 && (
                <div className="text-center mt-12">
                  <button className="bg-medical-green text-white px-8 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors">
                    Meer producten laden
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-blue mb-1">Kwaliteitsgarantie</h4>
              <p className="text-sm text-steel-gray">Alleen A-merk producten</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-blue mb-1">5 Jaar Houdbaar</h4>
              <p className="text-sm text-steel-gray">Lange houdbaarheid gegarandeerd</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-blue mb-1">Veilig Betalen</h4>
              <p className="text-sm text-steel-gray">iDEAL, Creditcard & meer</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy-blue mb-1">Expert Advies</h4>
              <p className="text-sm text-steel-gray">Persoonlijke hulp beschikbaar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/noodpakketten" 
            className="inline-flex items-center gap-2 text-medical-green hover:text-medical-green/80 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            Bekijk alle categorieën
          </Link>
        </div>
      </section>
    </div>
  );
}