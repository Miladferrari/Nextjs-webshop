import Link from 'next/link';

export default function BetalenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Betalen
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <p className="text-lg leading-relaxed">
            Hier komt later de volledige informatie over onze betaalmethoden en -voorwaarden.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center text-medical-green hover:text-medical-green/80 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Terug naar home
          </Link>
        </div>
      </div>
    </div>
  );
}