'use client';

import Link from 'next/link';

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start py-4">
          <Link href="/" className="flex items-center">
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0L0 8V20C0 31.05 8.5 41.14 20 44C31.5 41.14 40 31.05 40 20V8L20 0Z" fill="#93c84a"/>
              <path d="M28 18H22V12H18V18H12V22H18V28H22V22H28V18Z" fill="white"/>
            </svg>
            <span className="ml-3 text-xl lg:text-2xl font-bold text-navy-blue">123noodklaar.nl</span>
          </Link>
        </div>
      </div>
    </header>
  );
}