'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import AnnouncementBar from './AnnouncementBar';

export default function StickyHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(120); // Default height
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Calculate header height after mount
    const calculateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    calculateHeight();
    // Recalculate on window resize
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  // Don't show header on checkout pages
  if (pathname?.startsWith('/checkout')) {
    return null;
  }

  return (
    <>
      {/* White placeholder to maintain layout and push content down */}
      <div style={{ height: headerHeight }} className="bg-white" />
      
      {/* Fixed header */}
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <AnnouncementBar />
        <Header />
      </div>
    </>
  );
}