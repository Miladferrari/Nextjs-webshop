import Link from 'next/link';

export default function VerzendingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Verzending
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <h2 className="text-2xl font-bold text-navy-blue mb-6">Verzending & Levering</h2>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Verzendpartners</h3>
          <p className="mb-4">
            Wij werken samen met betrouwbare verzendpartners om uw bestelling veilig en snel bij u thuis te bezorgen:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>PostNL</strong> - Voor standaard verzendingen binnen Nederland</li>
            <li><strong>UPS</strong> - Voor expressverzendingen en internationale zendingen</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Levertijd</h3>
          <p className="mb-4">
            <strong>Verzending binnen 2 dagen</strong> na ontvangst van uw betaling. Dit betekent dat wanneer uw betaling is verwerkt, wij uw bestelling binnen 2 werkdagen verzenden. De totale levertijd is doorgaans:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Nederland: 1-2 werkdagen na verzending</li>
            <li>België: 2-3 werkdagen na verzending</li>
            <li>Overige EU-landen: 3-5 werkdagen na verzending</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Track & Trace</h3>
          <p className="mb-4">
            Zodra uw bestelling is verzonden, ontvangt u automatisch een e-mail met:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Een trackingnummer waarmee u uw pakket online kunt volgen</li>
            <li>Een link naar de track & trace pagina van de vervoerder</li>
            <li>De geschatte leveringsdatum</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Bezorgopties</h3>
          <div className="mb-6">
            <h4 className="font-semibold text-navy-blue mb-2">Standaard levering</h4>
            <p className="mb-4">
              Aflevering zonder handtekening. Het pakket kan bij de buren worden afgeleverd of op een veilige plek worden achtergelaten indien u niet thuis bent.
            </p>
            
            <h4 className="font-semibold text-navy-blue mb-2">UPS Extra (op aanvraag)</h4>
            <p className="mb-4">
              Verzending met verplichte handtekening bij aflevering. Voor deze service worden extra kosten in rekening gebracht. Neem contact met ons op vóór het plaatsen van uw bestelling als u deze optie wenst.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Verzendkosten</h3>
          <p className="mb-4">
            De verzendkosten zijn inclusief:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Zorgvuldige behandeling van uw bestelling</li>
            <li>Professionele verpakking in stevige dozen</li>
            <li>Frankering en administratiekosten</li>
            <li>Verzekerde verzending</li>
          </ul>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Let op:</strong> We kunnen twee apart geplaatste bestellingen niet samenvoegen. Voor elke bestelling worden afzonderlijke verzendkosten in rekening gebracht. We raden u daarom aan om alle gewenste artikelen in één bestelling te plaatsen.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Veilige verpakking</h3>
          <p className="mb-4">
            Uw noodpakket wordt met de grootste zorg verpakt:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Stevige, grote dozen die voldoende bescherming bieden</li>
            <li>Extra bescherming voor breekbare artikelen</li>
            <li>Waterdichte verpakking waar nodig</li>
            <li>Duidelijke markering van breekbare producten</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Niet thuis?</h3>
          <p className="mb-4">
            Als u niet thuis bent tijdens de bezorging:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>PostNL: Het pakket wordt bij de buren afgeleverd of naar een PostNL-punt gebracht</li>
            <li>UPS: U ontvangt een kaartje met informatie over een nieuwe bezorgpoging of afhaallocatie</li>
            <li>U kunt via track & trace een andere bezorgdag of afleveradres opgeven</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Belangrijke informatie</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <ul className="list-disc list-inside space-y-2">
              <li>Pakketten worden op eigen risico verzonden, maar zijn verzekerd tegen verlies of schade</li>
              <li>Controleer uw pakket bij ontvangst op eventuele beschadigingen</li>
              <li>Meld transportschade binnen 24 uur na ontvangst</li>
              <li>Bewaar de verpakking tot u zeker weet dat alles in orde is</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Contact</h3>
          <p className="mb-4">
            Heeft u vragen over uw verzending? Neem contact met ons op:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Email: info@123noodklaar.nl</p>
            <p>Vermeld altijd uw ordernummer en trackingnummer</p>
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