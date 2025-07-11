'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';
import { usePathname } from 'next/navigation';

const Footer = memo(function Footer() {
  const pathname = usePathname();
  
  // Don't render footer on checkout pages
  if (pathname?.startsWith('/checkout')) {
    return null;
  }
  
  return (
    <footer className="bg-white">
      {/* USPs Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/shipping" className="group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-blue mb-1">Verzending binnen 2 dagen</h4>
                  <p className="text-steel-gray text-sm">Na ontvangst van betaling</p>
                  <span className="text-medical-green text-sm group-hover:underline">Meer informatie →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/returns" className="group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-blue mb-1">14 dagen bedenktijd</h4>
                  <p className="text-steel-gray text-sm">Retour binnen 14 dagen na melding</p>
                  <span className="text-medical-green text-sm group-hover:underline">Meer informatie →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/klantenservice" className="group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-12 h-12 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-blue mb-1">Wettelijke garantie</h4>
                  <p className="text-steel-gray text-sm">Veilig & betrouwbaar</p>
                  <span className="text-medical-green text-sm group-hover:underline">Meer informatie →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-navy-blue">Navigatie</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-steel-gray hover:text-medical-green transition-colors">Home</Link></li>
                <li><Link href="/collections" className="text-steel-gray hover:text-medical-green transition-colors">Shop</Link></li>
                <li><Link href="/quiz" className="text-steel-gray hover:text-medical-green transition-colors">Pakket Kiezer</Link></li>
                <li><Link href="/cart" className="text-steel-gray hover:text-medical-green transition-colors">Winkelwagen</Link></li>
              </ul>
            </div>

            {/* Help & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-navy-blue">Hulp & Contact</h4>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-steel-gray hover:text-medical-green transition-colors">Veelgestelde vragen</Link></li>
                <li><Link href="/contact" className="text-steel-gray hover:text-medical-green transition-colors">Contact</Link></li>
                <li><Link href="/over-ons" className="text-steel-gray hover:text-medical-green transition-colors">Over ons</Link></li>
                <li><Link href="/blog" className="text-steel-gray hover:text-medical-green transition-colors">Blog & Tips</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-navy-blue">Klantenservice</h4>
              <ul className="space-y-2">
                <li><Link href="/betalen" className="text-steel-gray hover:text-medical-green transition-colors">Betalen</Link></li>
                <li><Link href="/verzending" className="text-steel-gray hover:text-medical-green transition-colors">Verzending</Link></li>
                <li><Link href="/retourneren" className="text-steel-gray hover:text-medical-green transition-colors">Retourneren</Link></li>
                <li><Link href="/garantie" className="text-steel-gray hover:text-medical-green transition-colors">Garantie</Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-navy-blue">Volg ons</h4>
              <p className="text-steel-gray mb-4 text-sm">
                Blijf op de hoogte van tips en het laatste nieuws
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-steel-gray hover:text-medical-green transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-steel-gray hover:text-medical-green transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-steel-gray hover:text-medical-green transition-colors" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-steel-gray hover:text-medical-green transition-colors" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Trust Section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
              {/* Payment Methods */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                <p className="text-steel-gray text-sm font-normal">Betaal veilig met</p>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 flex-wrap">
                  <Image src="/images/ideal.png" alt="iDEAL" width={29} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                  <Image src="/images/mastercard.png" alt="Mastercard" width={36} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                  <Image src="/images/visa.png" alt="Visa" width={50} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                  <Image src="/images/amex.png" alt="American Express" width={59} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                  <Image src="/images/apple-pay.png" alt="Apple Pay" width={39} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                  <Image src="/images/klarna.png" alt="Klarna" width={44} height={20} className="h-[16px] sm:h-[20px] w-auto" loading="lazy" />
                </div>
              </div>
              
              {/* Shipping Partner */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                <p className="text-steel-gray text-sm font-normal">Onze bezorgpartner</p>
                <div className="flex items-center gap-4">
                  <Image src="/images/shipping/postnl.png" alt="PostNL" width={29} height={29} className="h-[24px] md:h-[29px] w-auto" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300 text-center md:text-left">
              Verzending via UPS of PostNL met tracking. Retourkosten zijn voor de klant.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-medical-green transition-colors">
                Privacybeleid
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-medical-green transition-colors">
                Algemene voorwaarden
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-medical-green transition-colors">
                Cookiebeleid
              </Link>
            </div>
            <p className="text-sm text-gray-300">
              © 2025 123noodklaar.nl. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;