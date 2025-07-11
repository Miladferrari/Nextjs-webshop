import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Cookiebeleid
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
            <p className="text-sm">
              <strong>Laatst bijgewerkt:</strong> 1 januari 2025<br />
              <strong>Van toepassing op:</strong> www.123noodklaar.nl
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-6">Wat zijn cookies?</h2>
          <p className="mb-6">
            Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden opgeslagen wanneer u onze website bezoekt. Ze helpen ons om uw voorkeuren te onthouden, de website te verbeteren en u een betere gebruikerservaring te bieden.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Waarom gebruiken wij cookies?</h2>
          <p className="mb-2">123noodklaar.nl gebruikt cookies voor de volgende doeleinden:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Het onthouden van producten in uw winkelwagen</li>
            <li>Het onthouden van uw taalvoorkeuren</li>
            <li>Het analyseren van websitegebruik om onze diensten te verbeteren</li>
            <li>Het tonen van relevante advertenties</li>
            <li>Het beveiligen van onze website tegen misbruik</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Welke soorten cookies gebruiken wij?</h2>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">1. Noodzakelijke cookies</h3>
          <p className="mb-4">
            Deze cookies zijn essentieel voor het functioneren van onze website. Zonder deze cookies kunnen bepaalde onderdelen niet werken.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie naam</th>
                  <th className="text-left py-2">Doel</th>
                  <th className="text-left py-2">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">123noodklaar-cart</td>
                  <td className="py-2">Bewaart winkelwagen inhoud</td>
                  <td className="py-2">30 dagen</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">123noodklaar-coupon</td>
                  <td className="py-2">Bewaart toegepaste kortingscode</td>
                  <td className="py-2">Sessie</td>
                </tr>
                <tr>
                  <td className="py-2">cookieconsent</td>
                  <td className="py-2">Bewaart cookie voorkeuren</td>
                  <td className="py-2">1 jaar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-navy-blue mb-3">2. Analytische cookies</h3>
          <p className="mb-4">
            Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken, zodat we verbeteringen kunnen aanbrengen.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie naam</th>
                  <th className="text-left py-2">Aanbieder</th>
                  <th className="text-left py-2">Doel</th>
                  <th className="text-left py-2">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">_ga</td>
                  <td className="py-2">Google Analytics</td>
                  <td className="py-2">Onderscheidt unieke bezoekers</td>
                  <td className="py-2">2 jaar</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">_gid</td>
                  <td className="py-2">Google Analytics</td>
                  <td className="py-2">Onderscheidt unieke bezoekers</td>
                  <td className="py-2">24 uur</td>
                </tr>
                <tr>
                  <td className="py-2">_gat</td>
                  <td className="py-2">Google Analytics</td>
                  <td className="py-2">Beperkt aantal verzoeken</td>
                  <td className="py-2">1 minuut</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-navy-blue mb-3">3. Marketing cookies</h3>
          <p className="mb-4">
            Deze cookies worden gebruikt om advertenties relevanter te maken voor u en uw interesses.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Cookie naam</th>
                  <th className="text-left py-2">Aanbieder</th>
                  <th className="text-left py-2">Doel</th>
                  <th className="text-left py-2">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">fbp</td>
                  <td className="py-2">Facebook</td>
                  <td className="py-2">Advertentie targeting</td>
                  <td className="py-2">3 maanden</td>
                </tr>
                <tr>
                  <td className="py-2">ads/ga-audiences</td>
                  <td className="py-2">Google Ads</td>
                  <td className="py-2">Remarketing</td>
                  <td className="py-2">540 dagen</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Hoe kunt u cookies beheren?</h2>
          <p className="mb-4">
            U heeft verschillende opties om cookies te beheren:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Cookie instellingen:</strong> Via onze cookie banner kunt u uw voorkeuren aanpassen</li>
            <li><strong>Browser instellingen:</strong> U kunt cookies blokkeren of verwijderen via uw browser</li>
            <li><strong>Opt-out links:</strong> Voor specifieke diensten kunt u zich afmelden</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy-blue mb-3">Browser instructies</h3>
          <p className="mb-4">Hier vindt u instructies voor het beheren van cookies in populaire browsers:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/nl-nl/windows/cookies-verwijderen-en-beheren-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Microsoft Edge</a></li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Let op:</strong> Het uitschakelen van cookies kan de functionaliteit van onze website beperken. Sommige onderdelen werken mogelijk niet meer naar behoren.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Cookies van derden</h2>
          <p className="mb-6">
            Wij maken gebruik van diensten van derden die ook cookies kunnen plaatsen. Hieronder vindt u links naar hun privacybeleid:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Google Analytics: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Privacybeleid</a></li>
            <li>Facebook: <a href="https://www.facebook.com/policy/cookies/" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Cookiebeleid</a></li>
            <li>Klarna: <a href="https://www.klarna.com/nl/privacy/" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">Privacybeleid</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Wijzigingen in dit cookiebeleid</h2>
          <p className="mb-6">
            Wij kunnen dit cookiebeleid van tijd tot tijd aanpassen om het actueel te houden. Wijzigingen worden op deze pagina gepubliceerd met een nieuwe datum van "laatst bijgewerkt". We raden u aan dit beleid regelmatig te controleren.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">Contact</h2>
          <p className="mb-4">
            Heeft u vragen over ons cookiebeleid? Neem gerust contact met ons op:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-navy-blue">Art-of-Stones B.V.</p>
            <p>Email: info@123noodklaar.nl</p>
            <p>KvK: 95898476</p>
            <p>BTW: NL867380998B01</p>
          </div>
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