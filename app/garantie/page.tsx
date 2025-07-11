import Link from 'next/link';

export default function GarantiePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Garantie
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <h2 className="text-2xl font-bold text-navy-blue mb-6">Garantievoorwaarden Art-of-Stones B.V.</h2>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">1. Wettelijke garantie</h3>
          <p className="mb-4">
            Op alle producten die u bij 123noodklaar.nl koopt, heeft u recht op de wettelijke garantie. Dit betekent dat het product moet voldoen aan de overeenkomst en de eigenschappen moet hebben die u van het product mag verwachten. De wettelijke garantietermijn bedraagt 2 jaar vanaf het moment van levering.
          </p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">2. Wat valt onder de garantie?</h3>
          <p className="mb-2">De garantie dekt:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Fabricagefouten en materiaalfouten</li>
            <li>Producten die niet functioneren zoals beschreven</li>
            <li>Producten die niet compleet geleverd zijn</li>
            <li>Beschadigingen die al aanwezig waren bij levering</li>
            <li>Producten met een houdbaarheidsdatum die korter is dan redelijkerwijs verwacht mag worden</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">3. Wat valt niet onder de garantie?</h3>
          <p className="mb-2">De garantie dekt geen:</p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Normale slijtage door gebruik</li>
            <li>Schade door onjuist gebruik of nalatigheid</li>
            <li>Schade door externe factoren (water, vuur, extreme temperaturen)</li>
            <li>Producten waarvan de verzegeling is verbroken (waar van toepassing)</li>
            <li>Producten die zijn gewijzigd of gerepareerd door derden</li>
            <li>Verbruiksartikelen na gebruik (voedsel, medicijnen, batterijen)</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">4. Houdbaarheidsdatum producten</h3>
          <p className="mb-4">
            Voor producten met een houdbaarheidsdatum (zoals voedsel, water, medicijnen) garanderen wij dat deze bij levering minimaal 75% van de totale houdbaarheidsperiode hebben, tenzij anders vermeld op de productpagina. Wij adviseren u om de houdbaarheidsdata van uw noodpakket regelmatig te controleren en producten tijdig te vervangen.
          </p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">5. Garantie aanvragen</h3>
          <p className="mb-2">Om aanspraak te maken op garantie:</p>
          <ol className="list-decimal list-inside mb-4 space-y-2">
            <li>Neem binnen redelijke termijn contact met ons op via info@123noodklaar.nl</li>
            <li>Omschrijf het probleem zo duidelijk mogelijk</li>
            <li>Voeg foto's toe van het defect of probleem</li>
            <li>Vermeld uw ordernummer en aankoopdatum</li>
            <li>Bewaar het aankoopbewijs en de originele verpakking</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">6. Afhandeling garantieclaim</h3>
          <p className="mb-4">
            Na ontvangst van uw garantieclaim zullen wij deze binnen 5 werkdagen beoordelen. Bij goedkeuring van uw claim heeft u recht op:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Kosteloos herstel van het product, of</li>
            <li>Vervanging door een nieuw exemplaar, of</li>
            <li>Indien herstel of vervanging niet mogelijk is: restitutie van het aankoopbedrag</li>
          </ul>
          <p className="mb-4">
            De verzendkosten voor het retourneren van defecte producten worden door ons vergoed na goedkeuring van de garantieclaim.
          </p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">7. Extra service</h3>
          <p className="mb-4">
            Naast de wettelijke garantie bieden wij:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Gratis advies over het samenstellen van uw noodpakket</li>
            <li>Herinneringsservice voor het vervangen van producten met houdbaarheidsdatum</li>
            <li>Tips en instructies voor het gebruik en onderhoud van uw noodvoorzieningen</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-4">8. Contact</h3>
          <p className="mb-4">
            Voor vragen over garantie kunt u contact opnemen met onze klantenservice:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-navy-blue">Art-of-Stones B.V.</p>
            <p>Email: info@123noodklaar.nl</p>
            <p>KvK: 95898476</p>
            <p>BTW: NL867380998B01</p>
          </div>
          
          <p className="mt-6 text-sm italic">
            Deze garantievoorwaarden zijn laatst bijgewerkt op 1 januari 2025 en kunnen zonder voorafgaande kennisgeving worden gewijzigd. De meest actuele versie vindt u altijd op onze website.
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