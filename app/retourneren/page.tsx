import Link from 'next/link';

export default function RetournerenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Retouren
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <h2 className="text-2xl font-bold text-navy-blue mb-6">Herroepingsrecht en retourneren</h2>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Verzending van uw pakket</h3>
          <p className="mb-4">
            Pakketten worden over het algemeen binnen 2 dagen na ontvangst van uw betaling verzonden via UPS of POSTNL met tracking en aflevering zonder handtekening. Als u de voorkeur geeft aan verzending via UPS Extra met vereiste handtekening, zullen er extra kosten in rekening worden gebracht. Neem contact met ons op voordat u deze bezorgwijze kiest. Welke verzending u ook kiest, u krijgt van ons een trackingnummer waarmee u uw pakket online kunt volgen.
          </p>
          
          <p className="mb-4">
            Verzendkosten zijn inclusief behandeling, verpakking en frankering. Behandelingskosten zijn vaste bedragen, terwijl vervoerskosten afhankelijk zijn van het totaalgewicht. We raden u aan uw artikelen onder te brengen in één bestelling. We kunnen twee apart geplaatste bestellingen niet samenvoegen, voor elke bestelling zullen dus verzendkosten in rekening worden gebracht. Uw pakket wordt op eigen risico verzonden, maar er wordt bijzondere zorg besteed aan breekbare voorwerpen.
          </p>
          
          <p className="mb-6">
            Onze dozen zijn groot genoeg om uw artikelen goed beschermd te kunnen verzenden.
          </p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Bij levering van producten:</h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li>Bij de aankoop van producten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen. Deze bedenktermijn gaat in op de dag na ontvangst van het product door de consument of een vooraf door de consument aangewezen en aan de ondernemer bekend gemaakte vertegenwoordiger.</li>
            <li>Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Hij zal het product slechts in die mate uitpakken of gebruiken voor zover dat nodig is om te kunnen beoordelen of hij het product wenst te behouden. Indien hij van zijn herroepingsrecht gebruik maakt, zal hij het product met alle geleverde toebehoren en - indien redelijkerwijze mogelijk - in de originele staat en verpakking aan de ondernemer retourneren, conform de door de ondernemer verstrekte redelijke en duidelijke instructies.</li>
            <li>Wanneer de consument gebruik wenst te maken van zijn herroepingsrecht is hij verplicht dit binnen 14 dagen, na ontvangst van het product, kenbaar te maken aan de ondernemer. Het kenbaar maken dient de consument te doen middels het modelformulier of door middel van een ander communicatiemiddel zoals per e-mail. Nadat de consument kenbaar heeft gemaakt gebruik te willen maken van zijn herroepingsrecht dient de klant het product binnen 14 dagen retour te sturen. De consument dient te bewijzen dat de geleverde zaken tijdig zijn teruggestuurd, bijvoorbeeld door middel van een bewijs van verzending.</li>
            <li>Indien de klant na afloop van de in lid 2 en 3 genoemde termijnen niet kenbaar heeft gemaakt gebruik te willen maken van zijn herroepingsrecht resp. het product niet aan de ondernemer heeft teruggezonden, is de koop een feit.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Bij levering van diensten:</h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li>Bij levering van diensten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende ten minste 14 dagen, ingaande op de dag van het aangaan van de overeenkomst.</li>
            <li>Om gebruik te maken van zijn herroepingsrecht, zal de consument zich richten naar de door de ondernemer bij het aanbod en/of uiterlijk bij de levering ter zake verstrekte redelijke en duidelijke instructies.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Artikel 7 - Kosten in geval van herroeping</h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li>De consument draagt de rechtstreekse kosten van het terugzenden van het product.</li>
            <li>Indien de consument een bedrag betaald heeft, zal de ondernemer dit bedrag zo spoedig mogelijk, doch uiterlijk binnen 14 dagen na herroeping, terugbetalen. Hierbij is wel de voorwaarde dat het product reeds terug ontvangen is door de webwinkelier of sluitend bewijs van complete terugzending overlegd kan worden. Terugbetaling zal geschieden via de zelfde betaalmethode die door de consument is gebruikt tenzij de consument nadrukkelijk toestemming geeft voor een andere betaalmethode.</li>
            <li>Bij beschadiging van het product door onzorgvuldige omgang door de consument zelf is de consument aansprakelijk voor eventuele waardevermindering van het product.</li>
            <li>De consument kan niet aansprakelijk worden gesteld voor waardevermindering van het product wanneer door de ondernemer niet alle wettelijk verplichte informatie over het herroepingsrecht is verstrekt, dit dient te gebeuren voor het sluiten van de koopovereenkomst.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">Artikel 8 - Uitsluiting herroepingsrecht</h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li>De ondernemer kan het herroepingsrecht van de consument uitsluiten voor producten zoals omschreven in lid 2 en 3. De uitsluiting van het herroepingsrecht geldt slechts indien de ondernemer dit duidelijk in het aanbod, althans tijdig voor het sluiten van de overeenkomst, heeft vermeld.</li>
            <li>Uitsluiting van het herroepingsrecht is slechts mogelijk voor producten:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>die door de ondernemer tot stand zijn aangebracht overeenkomstig specificaties van de consument;</li>
                <li>die duidelijk persoonlijk van aard zijn;</li>
                <li>die door hun aard niet kunnen worden teruggezonden;</li>
                <li>die snel kunnen bederven of verouderen;</li>
                <li>waarvan de prijs gebonden is aan schommelingen op de financiële markt waarop de ondernemer geen invloed heeft;</li>
                <li>voor losse kranten en tijdschriften;</li>
                <li>voor audio- en video-opnamen en computersoftware waarvan de consument de verzegeling heeft verbroken;</li>
                <li>voor hygiënische producten waarvan de consument de verzegeling heeft verbroken.</li>
              </ul>
            </li>
            <li>Uitsluiting van het herroepingsrecht is slechts mogelijk voor diensten:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>betreffende logies, vervoer, restaurantbedrijf of vrijetijdsbesteding te verrichten op een bepaalde datum of tijdens een bepaalde periode;</li>
                <li>waarvan de levering met uitdrukkelijke instemming van de consument is begonnen voordat de bedenktijd is verstreken;</li>
                <li>betreffende weddenschappen en loterijen.</li>
              </ul>
            </li>
          </ol>
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