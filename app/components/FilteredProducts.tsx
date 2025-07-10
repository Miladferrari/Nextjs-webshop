'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/woocommerce';

interface FilteredProductsProps {
  products: Product[];
  categoryName: string;
}

interface Filters {
  priceRange: string[];
  availability: string[];
  packageSize: string[];
  duration: string[];
  sortBy: string;
}

export default function FilteredProducts({ products, categoryName }: FilteredProductsProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [],
    availability: [], // Show all products by default (both in-stock and out-of-stock)
    packageSize: [],
    duration: [],
    sortBy: 'recommended'
  });

  // Helper function to extract number of persons from product name/description
  const getPackageSize = (product: Product): string => {
    const text = `${product.name} ${product.short_description}`.toLowerCase();
    if (text.includes('1 persoon') || text.includes('solo')) return '1';
    if (text.includes('2') || text.includes('3')) return '2-3';
    if (text.includes('4') || text.includes('5') || text.includes('6')) return '4-6';
    if (text.includes('gezin') || text.includes('familie')) return '4-6';
    if (text.includes('kantoor') || text.includes('bedrijf')) return '6+';
    return '2-3'; // Default
  };

  // Helper function to extract duration from product
  const getDuration = (product: Product): string => {
    const text = `${product.name} ${product.short_description}`.toLowerCase();
    if (text.includes('3 dagen') || text.includes('72 uur')) return '3';
    if (text.includes('7 dagen') || text.includes('week')) return '7';
    if (text.includes('14 dagen') || text.includes('2 weken')) return '14';
    if (text.includes('30 dagen') || text.includes('maand')) return '30';
    if (text.includes('90') || text.includes('3 maand')) return '90+';
    return '3'; // Default to 72 hours
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Price filter
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        return filters.priceRange.some(range => {
          switch (range) {
            case '0-50': return price <= 50;
            case '50-100': return price > 50 && price <= 100;
            case '100-200': return price > 100 && price <= 200;
            case '200+': return price > 200;
            default: return true;
          }
        });
      });
    }

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        if (filters.availability.includes('instock') && product.stock_status === 'instock') return true;
        if (filters.availability.includes('backorder') && product.stock_status !== 'instock') return true;
        return false;
      });
    }

    // Package size filter
    if (filters.packageSize.length > 0) {
      filtered = filtered.filter(product => {
        const size = getPackageSize(product);
        return filters.packageSize.includes(size);
      });
    }

    // Duration filter
    if (filters.duration.length > 0) {
      filtered = filtered.filter(product => {
        const duration = getDuration(product);
        return filters.duration.includes(duration);
      });
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        // For now, sort by ID as we don't have ratings
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for 'recommended'
        break;
    }

    return filtered;
  }, [products, filters]);

  const handleCheckboxChange = (filterType: keyof Omit<Filters, 'sortBy'>, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [],
      availability: [], // Clear all filters, show all products
      packageSize: [],
      duration: [],
      sortBy: 'recommended'
    });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="bg-gradient-to-r from-medical-green to-medical-green/90 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>Filters</span>
          {(filters.priceRange.length + filters.packageSize.length + filters.duration.length + (filters.availability.length > 1 ? filters.availability.length - 1 : 0)) > 0 && (
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
              {filters.priceRange.length + filters.packageSize.length + filters.duration.length + (filters.availability.length > 1 ? filters.availability.length - 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-white to-gray-50 shadow-2xl overflow-y-auto">
            {/* Header with gradient */}
            <div className="sticky top-0 bg-gradient-to-r from-medical-green to-medical-green/90 text-white px-6 py-5 flex items-center justify-between shadow-lg">
              <div>
                <h3 className="text-2xl font-bold">Filter producten</h3>
                <p className="text-sm text-white/80 mt-1">Vind het perfecte noodpakket</p>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Active filters summary */}
            {(filters.priceRange.length + filters.packageSize.length + filters.duration.length + (filters.availability.length > 1 ? filters.availability.length - 1 : 0)) > 0 && (
              <div className="px-6 py-3 bg-amber-orange/10 border-b border-amber-orange/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-navy-blue font-medium">
                    {filters.priceRange.length + filters.packageSize.length + filters.duration.length + (filters.availability.length > 1 ? filters.availability.length - 1 : 0)} filters actief
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-amber-orange hover:text-amber-orange/80 font-medium"
                  >
                    Wis alles
                  </button>
                </div>
              </div>
            )}
            
            <div className="p-6 space-y-6">
              {/* Filter sections with cards */}
              {/* Price Range */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy-blue mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-medical-green/10 rounded-lg flex items-center justify-center">
                    <span className="text-medical-green font-bold">€</span>
                  </div>
                  Prijs bereik
                </h4>
                <div className="space-y-3">
                  {[
                    { value: '0-50', label: '€0 - €50', desc: 'Budget vriendelijk' },
                    { value: '50-100', label: '€50 - €100', desc: 'Meest populair' },
                    { value: '100-200', label: '€100 - €200', desc: 'Premium kwaliteit' },
                    { value: '200+', label: '€200+', desc: 'Complete sets' }
                  ].map(({ value, label, desc }) => (
                    <label key={value} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-medical-green border-gray-300 rounded focus:ring-medical-green mt-0.5"
                        checked={filters.priceRange.includes(value)}
                        onChange={() => handleCheckboxChange('priceRange', value)}
                      />
                      <div className="flex-1">
                        <span className="text-navy-blue font-medium block">{label}</span>
                        <span className="text-xs text-steel-gray">{desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Availability */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy-blue mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-orange/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Beschikbaarheid
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                      checked={filters.availability.includes('instock')}
                      onChange={() => handleCheckboxChange('availability', 'instock')}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-navy-blue font-medium">Op voorraad</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                      checked={filters.availability.includes('backorder')}
                      onChange={() => handleCheckboxChange('availability', 'backorder')}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-navy-blue font-medium">Binnenkort leverbaar</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Package Size */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy-blue mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-navy-blue/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Pakket grootte
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: '1', label: '1 persoon', icon: '👤' },
                    { value: '2-3', label: '2-3 personen', icon: '👥' },
                    { value: '4-6', label: '4-6 personen', icon: '👨‍👩‍👧‍👦' },
                    { value: '6+', label: '6+ personen', icon: '🏢' }
                  ].map(({ value, label, icon }) => (
                    <label key={value} className="flex items-center gap-2 cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-medical-green transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                        checked={filters.packageSize.includes(value)}
                        onChange={() => handleCheckboxChange('packageSize', value)}
                      />
                      <div className="flex-1 text-center">
                        <span className="text-2xl block mb-1">{icon}</span>
                        <span className="text-xs text-navy-blue font-medium">{label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy-blue mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-medical-green/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Noodpakket duur
                </h4>
                <div className="space-y-2">
                  {[
                    { value: '3', label: '3 dagen', desc: '72 uur - Basis' },
                    { value: '7', label: '7 dagen', desc: '1 week - Aanbevolen' },
                    { value: '14', label: '14 dagen', desc: '2 weken - Uitgebreid' },
                    { value: '30', label: '30 dagen', desc: '1 maand - Compleet' },
                    { value: '90+', label: '90+ dagen', desc: '3+ maanden - Maximum' }
                  ].map(({ value, label, desc }) => (
                    <label key={value} className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-medical-green border-gray-300 rounded focus:ring-medical-green mt-0.5"
                        checked={filters.duration.includes(value)}
                        onChange={() => handleCheckboxChange('duration', value)}
                      />
                      <div className="flex-1">
                        <span className="text-navy-blue font-medium block">{label}</span>
                        <span className="text-xs text-steel-gray">{desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Fixed bottom buttons */}
            <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-gradient-to-r from-medical-green to-medical-green/90 text-white py-4 px-6 rounded-full hover:shadow-lg transition-all duration-200 font-bold text-lg flex items-center justify-center gap-2"
              >
                <span>Toon {filteredProducts.length} producten</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={clearFilters}
                className="w-full bg-gray-100 text-steel-gray py-3 px-4 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Alle filters wissen
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
          <h3 className="text-xl font-bold text-navy-blue mb-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </h3>
          
          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-semibold text-navy-blue mb-3">Prijs</h4>
            <div className="space-y-2">
              {[
                { value: '0-50', label: '€0 - €50' },
                { value: '50-100', label: '€50 - €100' },
                { value: '100-200', label: '€100 - €200' },
                { value: '200+', label: '€200+' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                    checked={filters.priceRange.includes(value)}
                    onChange={() => handleCheckboxChange('priceRange', value)}
                  />
                  <span className="text-steel-gray group-hover:text-navy-blue">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Availability */}
          <div className="mb-8">
            <h4 className="font-semibold text-navy-blue mb-3">Beschikbaarheid</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                  checked={filters.availability.includes('instock')}
                  onChange={() => handleCheckboxChange('availability', 'instock')}
                />
                <span className="text-steel-gray group-hover:text-navy-blue">Op voorraad</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                  checked={filters.availability.includes('backorder')}
                  onChange={() => handleCheckboxChange('availability', 'backorder')}
                />
                <span className="text-steel-gray group-hover:text-navy-blue">Binnenkort leverbaar</span>
              </label>
            </div>
          </div>
          
          {/* Package Size */}
          <div className="mb-8">
            <h4 className="font-semibold text-navy-blue mb-3">Pakket grootte</h4>
            <div className="space-y-2">
              {[
                { value: '1', label: '1 persoon' },
                { value: '2-3', label: '2-3 personen' },
                { value: '4-6', label: '4-6 personen' },
                { value: '6+', label: '6+ personen' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                    checked={filters.packageSize.includes(value)}
                    onChange={() => handleCheckboxChange('packageSize', value)}
                  />
                  <span className="text-steel-gray group-hover:text-navy-blue">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Emergency Kit Duration */}
          <div className="mb-8">
            <h4 className="font-semibold text-navy-blue mb-3">Noodpakket duur</h4>
            <div className="space-y-2">
              {[
                { value: '3', label: '3 dagen (72 uur)' },
                { value: '7', label: '7 dagen (1 week)' },
                { value: '14', label: '14 dagen (2 weken)' },
                { value: '30', label: '30 dagen (1 maand)' },
                { value: '90+', label: '90+ dagen (3+ maanden)' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-medical-green border-gray-300 rounded focus:ring-medical-green"
                    checked={filters.duration.includes(value)}
                    onChange={() => handleCheckboxChange('duration', value)}
                  />
                  <span className="text-steel-gray group-hover:text-navy-blue">{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Clear Filters */}
          <button 
            onClick={clearFilters}
            className="w-full bg-gray-100 text-steel-gray py-2 px-4 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Filters wissen
          </button>
        </div>
      </aside>
      
      {/* Products Grid - Max 2 columns */}
      <div className="flex-1">
        {/* Category Title and Description */}
        <div className="category-view mb-8">
          <div className="category-description bg-white rounded-xl p-6 shadow-sm">
            <div className="main-title-wrapper mb-4">
              <h1 className="text-3xl font-bold text-navy-blue">
                <span className="base">{categoryName}</span>
              </h1>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg font-semibold text-navy-blue mb-3">
                {categoryName === 'Basispakketten' && 'Verschillende basispakketten voor jou geselecteerd'}
                {categoryName === 'Uitgebreide pakketten' && 'Complete noodvoorziening voor langdurige situaties'}
                {categoryName === 'Speciale dieetpakketten' && 'Aangepaste pakketten voor specifieke dieetwensen'}
                {!['Basispakketten', 'Uitgebreide pakketten', 'Speciale dieetpakketten'].includes(categoryName) && `${categoryName} voor elke situatie`}
              </p>
              <p className="text-steel-gray">
                {categoryName === 'Basispakketten' && 'Noodpakketten.nl biedt je een ruime keuze aan basispakketten voor noodsituaties. Met onze zorgvuldig samengestelde pakketten ben je voorbereid op het onverwachte. Kies nu jouw ideale noodpakket!'}
                {categoryName === 'Uitgebreide pakketten' && 'Onze uitgebreide pakketten bieden complete voedselzekerheid voor langere periodes. Inclusief gevarieerde maaltijden en extra voedingswaarde voor het hele gezin.'}
                {categoryName === 'Speciale dieetpakketten' && 'Speciaal samengestelde noodpakketten die rekening houden met dieetwensen en allergieën. Van glutenvrij tot vegetarisch, wij hebben voor iedereen een passende oplossing.'}
                {!['Basispakketten', 'Uitgebreide pakketten', 'Speciale dieetpakketten'].includes(categoryName) && 'Ontdek onze selectie van hoogwaardige noodpakketten, samengesteld door experts en goedgekeurd door de overheid. Bereid je voor op elke situatie.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
          <span className="text-sm text-steel-gray">
            {filteredProducts.length} van {products.length} producten
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-steel-gray hidden sm:inline">Sorteer op:</span>
            <select 
              className="ml-2 px-4 py-2 border border-gray-200 rounded-lg text-steel-gray focus:outline-none focus:ring-2 focus:ring-medical-green"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="recommended">Aanbevolen</option>
              <option value="price-low">Prijs: Laag naar hoog</option>
              <option value="price-high">Prijs: Hoog naar laag</option>
              <option value="newest">Nieuwste eerst</option>
              <option value="rating">Beste beoordeeld</option>
            </select>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-navy-blue mb-2">Geen producten gevonden</h3>
            <p className="text-steel-gray mb-4">Probeer andere filters te selecteren</p>
            <button 
              onClick={clearFilters}
              className="text-medical-green hover:text-medical-green/80 font-medium"
            >
              Filters wissen
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}