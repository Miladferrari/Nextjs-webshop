import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Privacybeleid
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
            <p className="text-sm">
              <strong>Versie:</strong> 1.0<br />
              <strong>Laatst bijgewerkt:</strong> 1 januari 2025<br />
              <strong>Van toepassing op:</strong> www.123noodklaar.nl
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-6">1. Inleiding</h2>
          <p className="mb-6">
            Art-of-Stones B.V., handelend onder de naam 123noodklaar.nl, hecht grote waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens we verzamelen, waarom we dit doen, hoe we deze gebruiken en welke rechten u heeft.
          </p>
          <p className="mb-6">
            Dit privacybeleid is van toepassing op alle diensten die wij aanbieden via onze website www.123noodklaar.nl en op alle klantrelaties die daaruit voortvloeien.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">2. Verantwoordelijke voor gegevensverwerking</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-semibold text-navy-blue">Art-of-Stones B.V.</p>
            <p>Koperhoek 54</p>
            <p>3162LA Rhoon</p>
            <p className="text-sm italic">(geen bezoekadres)</p>
            <p className="mt-2">Email: info@123noodklaar.nl</p>
            <p>KvK: 95898476</p>
            <p>BTW: NL867380998B01</p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">3. Welke gegevens verzamelen wij?</h2>
          <p className="mb-4">Wij verzamelen de volgende categorieën persoonsgegevens:</p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">3.1 Gegevens die u aan ons verstrekt</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Contactgegevens:</strong> naam, adres, postcode, woonplaats, telefoonnummer, e-mailadres</li>
            <li><strong>Bestelgegevens:</strong> bestelnummer, producten, leveringsadres, factuuradres</li>
            <li><strong>Betalingsgegevens:</strong> bankrekeningnummer (alleen voor terugbetalingen)</li>
            <li><strong>Accountgegevens:</strong> gebruikersnaam, wachtwoord (versleuteld)</li>
            <li><strong>Communicatie:</strong> inhoud van e-mails, contactformulieren, reviews</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy-blue mb-3">3.2 Automatisch verzamelde gegevens</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Technische gegevens:</strong> IP-adres, browser type, apparaat type</li>
            <li><strong>Gebruiksgegevens:</strong> bezochte pagina's, klikgedrag, bezoekduur</li>
            <li><strong>Cookie gegevens:</strong> zie ons <a href="/cookies" className="text-medical-green hover:underline">cookiebeleid</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">4. Waarom verzamelen wij deze gegevens?</h2>
          <p className="mb-4">Wij gebruiken uw persoonsgegevens voor de volgende doeleinden:</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Doel</th>
                  <th className="text-left py-2">Gegevens</th>
                  <th className="text-left py-2">Grondslag</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Uitvoeren van uw bestelling</td>
                  <td className="py-2">Contact- en bestelgegevens</td>
                  <td className="py-2">Uitvoering overeenkomst</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Klantenservice</td>
                  <td className="py-2">Contact- en bestelgegevens</td>
                  <td className="py-2">Gerechtvaardigd belang</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Nieuwsbrief (met toestemming)</td>
                  <td className="py-2">E-mailadres, naam</td>
                  <td className="py-2">Toestemming</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Website verbetering</td>
                  <td className="py-2">Technische en gebruiksgegevens</td>
                  <td className="py-2">Gerechtvaardigd belang</td>
                </tr>
                <tr>
                  <td className="py-2">Wettelijke verplichtingen</td>
                  <td className="py-2">Factuurgegevens</td>
                  <td className="py-2">Wettelijke verplichting</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">5. Hoe lang bewaren wij uw gegevens?</h2>
          <p className="mb-4">Wij bewaren uw gegevens niet langer dan noodzakelijk:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Klantgegevens:</strong> 7 jaar na laatste bestelling (wettelijke bewaarplicht)</li>
            <li><strong>Bestelgegevens:</strong> 7 jaar (fiscale bewaarplicht)</li>
            <li><strong>E-mail communicatie:</strong> 2 jaar na laatste contact</li>
            <li><strong>Websitegebruik:</strong> 26 maanden (Google Analytics)</li>
            <li><strong>Nieuwsbrief:</strong> tot uitschrijving</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">6. Met wie delen wij uw gegevens?</h2>
          <p className="mb-4">Wij delen uw gegevens alleen met partijen die ons helpen onze diensten te leveren:</p>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">6.1 Dienstverleners</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Bezorgdiensten:</strong> PostNL, UPS (naam, adres voor levering)</li>
            <li><strong>Betaaldiensten:</strong> Mollie, Klarna (transactiegegevens)</li>
            <li><strong>E-mail marketing:</strong> Mailchimp (e-mailadres, naam)</li>
            <li><strong>Hosting:</strong> Vercel (technische gegevens)</li>
            <li><strong>Analytics:</strong> Google Analytics (geanonimiseerde gegevens)</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy-blue mb-3">6.2 Overige ontvangers</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Overheidsinstanties (alleen indien wettelijk verplicht)</li>
            <li>Accountant (factuurgegevens voor controle)</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <p className="text-sm">
              <strong>Belangrijk:</strong> Wij verkopen uw gegevens nooit aan derden en delen deze alleen voor de hierboven genoemde doeleinden.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">7. Hoe beveiligen wij uw gegevens?</h2>
          <p className="mb-4">Wij nemen de bescherming van uw gegevens serieus en hebben passende maatregelen genomen:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>SSL-certificaat voor beveiligde verbindingen</li>
            <li>Tweefactorauthenticatie voor beheerders</li>
            <li>Regelmatige security updates</li>
            <li>Beperkte toegang tot persoonsgegevens</li>
            <li>Verwerkersovereenkomsten met alle dienstverleners</li>
            <li>Regelmatige back-ups</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">8. Uw rechten</h2>
          <p className="mb-4">Onder de AVG heeft u de volgende rechten:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op inzage</h4>
              <p className="text-sm">U mag opvragen welke gegevens wij van u hebben</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op rectificatie</h4>
              <p className="text-sm">U mag onjuiste gegevens laten corrigeren</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op verwijdering</h4>
              <p className="text-sm">U mag uw gegevens laten verwijderen</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op beperking</h4>
              <p className="text-sm">U mag de verwerking (tijdelijk) laten beperken</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op overdraagbaarheid</h4>
              <p className="text-sm">U mag uw gegevens meenemen naar een andere dienst</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-navy-blue mb-2">Recht op bezwaar</h4>
              <p className="text-sm">U mag bezwaar maken tegen de verwerking</p>
            </div>
          </div>

          <p className="mb-6">
            Om gebruik te maken van uw rechten kunt u contact opnemen via info@123noodklaar.nl. Wij reageren binnen 4 weken op uw verzoek. Voor identificatie vragen wij u een kopie van uw identiteitsbewijs mee te sturen waarbij u uw BSN en pasfoto onleesbaar maakt.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">9. Cookies</h2>
          <p className="mb-6">
            Onze website maakt gebruik van cookies. Voor meer informatie hierover verwijzen wij u naar ons <a href="/cookies" className="text-medical-green hover:underline">cookiebeleid</a>.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">10. Nieuwsbrief</h2>
          <p className="mb-6">
            U kunt zich aanmelden voor onze nieuwsbrief om op de hoogte te blijven van aanbiedingen en tips. Onderaan elke nieuwsbrief vindt u een afmeldlink. U kunt zich ook afmelden door een e-mail te sturen naar info@123noodklaar.nl.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">11. Kinderen</h2>
          <p className="mb-6">
            Onze website is niet gericht op kinderen onder de 16 jaar. Wij verzamelen niet bewust gegevens van kinderen. Indien u vermoedt dat wij gegevens van een kind hebben verzameld, neem dan contact met ons op.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">12. Wijzigingen</h2>
          <p className="mb-6">
            Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. Belangrijke wijzigingen maken wij bekend via onze website. De meest actuele versie vindt u altijd op deze pagina.
          </p>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">13. Klachten</h2>
          <p className="mb-6">
            Heeft u een klacht over hoe wij met uw gegevens omgaan? Neem dan eerst contact met ons op via info@123noodklaar.nl. Wij zullen ons best doen om samen tot een oplossing te komen.
          </p>
          <p className="mb-6">
            U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-semibold">Autoriteit Persoonsgegevens</p>
            <p>Postbus 93374</p>
            <p>2509 AJ Den Haag</p>
            <p>Website: <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-medical-green hover:underline">autoriteitpersoonsgegevens.nl</a></p>
          </div>

          <h2 className="text-2xl font-bold text-navy-blue mb-4">14. Contact</h2>
          <p className="mb-4">
            Voor vragen over dit privacybeleid of over de verwerking van uw persoonsgegevens kunt u contact met ons opnemen:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-navy-blue">Art-of-Stones B.V.</p>
            <p>Email: info@123noodklaar.nl</p>
            <p>KvK: 95898476</p>
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