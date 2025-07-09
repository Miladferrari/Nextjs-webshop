'use client';

import Link from 'next/link';
import { memo } from 'react';

const testimonials = [
  {
    name: 'Familie Van Der Berg',
    location: 'Amsterdam',
    rating: 5,
    date: '2 weken geleden',
    review: 'Na de stroomuitval vorig jaar besloten we eindelijk een noodpakket aan te schaffen. Binnen 24 uur geleverd en alles zit erin. De kwaliteit is uitstekend en het geeft een gerust gevoel.',
    verified: true,
    package: 'Gezinspakket Plus'
  },
  {
    name: 'M. Janssen',
    location: 'Rotterdam',
    rating: 5,
    date: '1 maand geleden',
    review: 'Professioneel samengesteld pakket. De checklist was heel handig om te zien wat er allemaal in zit. Ook fijn dat er aan kinderen is gedacht met speciale items.',
    verified: true,
    package: 'Gezinspakket Basis'
  },
  {
    name: 'Stichting Ouderenzorg',
    location: 'Utrecht',
    rating: 5,
    date: '3 weken geleden',
    review: 'Voor onze locaties hebben we meerdere pakketten besteld. Uitstekende service en de pakketten voldoen aan alle BHV-eisen. Zeer tevreden!',
    verified: true,
    package: 'Kantoor Pakket XL'
  }
];

const TestimonialsSection = memo(function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-4">
            12.000+ tevreden klanten
          </h2>
          <p className="text-xl text-steel-gray">
            Lees wat onze klanten over hun ervaring zeggen
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 relative">
              {testimonial.verified && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-medical-green font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Geverifieerde aankoop</span>
                </div>
              )}
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              <p className="text-steel-gray mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy-blue">{testimonial.name}</p>
                    <p className="text-sm text-steel-gray">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-steel-gray">{testimonial.date}</p>
                    <p className="text-xs text-medical-green font-medium">{testimonial.package}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/reviews" className="text-medical-green hover:text-medical-green/80 font-semibold inline-flex items-center gap-2">
            <span>Lees alle 847 reviews</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;