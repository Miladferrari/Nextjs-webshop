import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar bg-white text-steel-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 hidden lg:flex justify-between items-center">
        {/* USP List */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4 text-medical-green" fill="currentColor">
              <path d="M10 20C4.48 20 0 15.52 0 10S4.48 0 10 0s10 4.48 10 10c-.01 5.52-4.48 9.99-10 10zM6.5 8.89a1.003 1.003 0 0 0-.79 1.62l2.43 3.11c.19.24.48.38.79.38h.01c.31 0 .6-.15.79-.4l4.57-6c.34-.43.27-1.06-.17-1.4s-1.06-.27-1.4.17c-.01.01-.02.02-.02.03l-3.78 4.97L7.3 9.28c-.2-.25-.49-.39-.8-.39z"/>
            </svg>
            <span>Gratis verzenden vanaf €50</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4 text-medical-green" fill="currentColor">
              <path d="M10 20C4.48 20 0 15.52 0 10S4.48 0 10 0s10 4.48 10 10c-.01 5.52-4.48 9.99-10 10zM6.5 8.89a1.003 1.003 0 0 0-.79 1.62l2.43 3.11c.19.24.48.38.79.38h.01c.31 0 .6-.15.79-.4l4.57-6c.34-.43.27-1.06-.17-1.4s-1.06-.27-1.4.17c-.01.01-.02.02-.02.03l-3.78 4.97L7.3 9.28c-.2-.25-.49-.39-.8-.39z"/>
            </svg>
            <span><strong>90 dagen</strong> bedenktijd</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4 text-medical-green" fill="currentColor">
              <path d="M10 20C4.48 20 0 15.52 0 10S4.48 0 10 0s10 4.48 10 10c-.01 5.52-4.48 9.99-10 10zM6.5 8.89a1.003 1.003 0 0 0-.79 1.62l2.43 3.11c.19.24.48.38.79.38h.01c.31 0 .6-.15.79-.4l4.57-6c.34-.43.27-1.06-.17-1.4s-1.06-.27-1.4.17c-.01.01-.02.02-.02.03l-3.78 4.97L7.3 9.28c-.2-.25-.49-.39-.8-.39z"/>
            </svg>
            <span>Klanten geven ons een <strong>4.5/5</strong></span>
          </div>
        </div>
        
        {/* Header Links */}
        <div className="flex items-center gap-4">
          <Link href="/faq" className="text-sm hover:underline">
            Help & Contact
          </Link>
        </div>
      </div>
      
      {/* Mobile version - simplified */}
      <div className="lg:hidden py-2 px-4">
        <p className="text-center text-sm text-steel-gray">
          <strong>GRATIS verzending</strong> vanaf €50 | <strong>90 dagen</strong> bedenktijd
        </p>
      </div>
    </div>
  );
}