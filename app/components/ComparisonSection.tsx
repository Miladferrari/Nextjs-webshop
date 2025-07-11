'use client';

import Link from 'next/link';
import { memo } from 'react';

const ComparisonSection = memo(function ComparisonSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-blue mb-3">
            Waarom een 123noodklaar.nl pakket?
          </h2>
          <p className="text-lg text-steel-gray">
            De slimme keuze voor uw veiligheid
          </p>
        </div>
        
        {/* Comparison cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 123noodklaar.nl Card */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-medical-green to-medical-green/90 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">123noodklaar.nl Pakket</h3>
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    AANBEVOLEN
                  </span>
                </div>
                <p className="text-white/90 text-sm">Professioneel samengesteld</p>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-medical-green/10 text-medical-green">✓</span>
                  <span className="text-steel-gray text-sm">Compleet pakket, niets vergeten</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-medical-green/10 text-medical-green">✓</span>
                  <span className="text-steel-gray text-sm">Direct gebruiksklaar</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-medical-green/10 text-medical-green">✓</span>
                  <span className="text-steel-gray text-sm">Wettelijke garantie</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-medical-green/10 text-medical-green">✓</span>
                  <span className="text-steel-gray text-sm">Één bestelling, één levering</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-medical-green/10 text-medical-green">✓</span>
                  <span className="text-steel-gray text-sm">Vanaf €89 compleet</span>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <Link 
                    href="/noodpakketten" 
                    className="w-full bg-medical-green text-white py-3 px-6 rounded-full font-bold hover:bg-medical-green/90 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Bekijk pakketten</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Zelf Samenstellen Card */}
          <div className="relative">
            <div className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden border-2 border-gray-200">
              <div className="bg-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-600 mb-2">Zelf Samenstellen</h3>
                <p className="text-gray-500 text-sm">Veel tijd & mogelijk incompleet</p>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3 opacity-75">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-red-50 text-red-400">✗</span>
                  <span className="text-gray-500 line-through text-sm">Uren onderzoek nodig</span>
                </div>
                <div className="flex items-start gap-3 opacity-75">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-red-50 text-red-400">✗</span>
                  <span className="text-gray-500 line-through text-sm">Risico items te vergeten</span>
                </div>
                <div className="flex items-start gap-3 opacity-75">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-red-50 text-red-400">✗</span>
                  <span className="text-gray-500 line-through text-sm">Geen garantie op kwaliteit</span>
                </div>
                <div className="flex items-start gap-3 opacity-75">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-red-50 text-red-400">✗</span>
                  <span className="text-gray-500 line-through text-sm">Meerdere leveringen</span>
                </div>
                <div className="flex items-start gap-3 opacity-75">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold bg-red-50 text-red-400">✗</span>
                  <span className="text-gray-500 line-through text-sm">Vaak duurder (€120+)</span>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <div className="text-center text-gray-500">
                    <p className="text-sm">Waarom moeilijk doen?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simple fact box */}
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-steel-gray">
            <span className="font-bold text-medical-green">97%</span> van onze klanten ontdekte essentiële items die ze zelf waren vergeten
          </p>
        </div>
      </div>
    </section>
  );
});

ComparisonSection.displayName = 'ComparisonSection';

export default ComparisonSection;