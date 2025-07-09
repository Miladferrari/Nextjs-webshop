'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import AnnouncementBar from './AnnouncementBar';

export default function StickyHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Calculate header height after mount
    const header = document.getElementById('sticky-header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  // Don't show header on checkout pages
  if (pathname?.startsWith('/checkout')) {
    return null;
  }

  if (!mounted) {
    return (
      <>
        <AnnouncementBar />
        <Header />
      </>
    );
  }

  return (
    <>
      {/* Placeholder to maintain layout */}
      <div style={{ height: headerHeight || 'auto' }}>
        {!headerHeight && (
          <>
            <AnnouncementBar />
            <Header />
          </>
        )}
      </div>
      
      {/* Fixed header */}
      <div id="sticky-header" className="fixed top-0 left-0 right-0 z-50 shadow-sm">
        <AnnouncementBar />
        <Header />
      </div>
    </>
  );
}