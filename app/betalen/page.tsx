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
          <h2 className="text-2xl font-bold text-navy-blue mb-6">Veilig en vertrouwd betalen bij 123noodklaar.nl</h2>
          
          <p className="mb-6">
            Bij 123noodklaar.nl kunt u veilig en eenvoudig betalen met verschillende betaalmethoden. Wij werken samen met betrouwbare betaalproviders om uw transacties veilig te verwerken. Alle betalingen zijn beveiligd met SSL-encryptie.
          </p>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Beschikbare betaalmethoden</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">iDEAL</h4>
              <p className="text-sm mb-2">De meest gebruikte betaalmethode in Nederland</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Direct betalen via uw eigen bank</li>
                <li>Veilig en vertrouwd</li>
                <li>Geen extra kosten</li>
                <li>Directe orderbevestiging</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Creditcard</h4>
              <p className="text-sm mb-2">Betaal met Mastercard, Visa of American Express</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Wereldwijd geaccepteerd</li>
                <li>3D Secure beveiliging</li>
                <li>Geen extra kosten</li>
                <li>Snelle verwerking</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Apple Pay</h4>
              <p className="text-sm mb-2">Betaal snel en veilig met uw Apple apparaat</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Betalen met Face ID of Touch ID</li>
                <li>Geen creditcardgegevens invoeren</li>
                <li>Extra veilig door tokenisatie</li>
                <li>Werkt op iPhone, iPad en Mac</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Klarna</h4>
              <p className="text-sm mb-2">Achteraf betalen of in termijnen</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Eerst ontvangen, dan betalen</li>
                <li>14 dagen bedenktijd</li>
                <li>Betaal in 3 termijnen zonder rente</li>
                <li>Veilig en betrouwbaar</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Betalingsproces</h3>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li><strong>Winkelwagen controleren:</strong> Controleer uw bestelling in de winkelwagen</li>
            <li><strong>Gegevens invoeren:</strong> Vul uw persoonlijke en bezorggegevens in</li>
            <li><strong>Betaalmethode kiezen:</strong> Selecteer uw gewenste betaalmethode</li>
            <li><strong>Betaling voltooien:</strong> Voltooi de betaling via de beveiligde omgeving</li>
            <li><strong>Orderbevestiging:</strong> U ontvangt direct een bevestiging per e-mail</li>
          </ol>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Veiligheid</h3>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <p className="mb-3">
              <strong>Uw veiligheid is onze prioriteit:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Alle betalingen verlopen via beveiligde SSL-verbindingen</li>
              <li>Wij slaan geen creditcardgegevens op</li>
              <li>Betalingen worden verwerkt door gecertificeerde payment providers</li>
              <li>Voldoet aan de hoogste PCI-DSS beveiligingsstandaarden</li>
              <li>Continue monitoring op frauduleuze activiteiten</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Betaalvoorwaarden</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Alle prijzen zijn inclusief BTW</li>
            <li>Betaling dient volledig te geschieden bij het plaatsen van de bestelling</li>
            <li>Bij betaling met iDEAL of creditcard wordt uw bestelling direct verwerkt</li>
            <li>Bij Klarna achteraf betalen ontvangt u binnen 14 dagen een factuur</li>
            <li>Verzending vindt plaats binnen 2 werkdagen na ontvangst betaling</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Problemen met betalen?</h3>
          <p className="mb-4">
            Lukt het niet om uw betaling te voltooien? Hier zijn enkele tips:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Controleer of u voldoende saldo heeft</li>
            <li>Controleer of uw creditcard niet verlopen is</li>
            <li>Zorg dat pop-ups niet geblokkeerd worden in uw browser</li>
            <li>Probeer een andere browser of betaalmethode</li>
            <li>Neem contact op met uw bank bij herhaalde afwijzingen</li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Let op:</strong> Om veiligheidsredenen kunnen wij geen betalingen accepteren via telefoon of e-mail. Alle betalingen dienen via onze beveiligde website te verlopen.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Factuur</h3>
          <p className="mb-6">
            Na succesvolle betaling ontvangt u automatisch een factuur per e-mail. Deze factuur bevat:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Uw ordernummer</li>
            <li>Specificatie van bestelde producten</li>
            <li>BTW-specificatie</li>
            <li>Onze bedrijfsgegevens inclusief KvK en BTW-nummer</li>
            <li>Betaalde bedragen</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy-blue mb-4">Contact</h3>
          <p className="mb-4">
            Heeft u vragen over betalingen? Neem gerust contact met ons op:
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