import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue text-center">
            Algemene Voorwaarden
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none text-steel-gray">
          <nav className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-navy-blue mb-4">Inhoudsopgave</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#artikel1" className="text-medical-green hover:underline">Artikel 1 - Definities</a></li>
              <li><a href="#artikel2" className="text-medical-green hover:underline">Artikel 2 - Identiteit van de ondernemer</a></li>
              <li><a href="#artikel3" className="text-medical-green hover:underline">Artikel 3 - Toepasselijkheid</a></li>
              <li><a href="#artikel4" className="text-medical-green hover:underline">Artikel 4 - Het aanbod</a></li>
              <li><a href="#artikel5" className="text-medical-green hover:underline">Artikel 5 - De overeenkomst</a></li>
              <li><a href="#artikel6" className="text-medical-green hover:underline">Artikel 6 - Herroepingsrecht</a></li>
              <li><a href="#artikel7" className="text-medical-green hover:underline">Artikel 7 - Kosten in geval van herroeping</a></li>
              <li><a href="#artikel8" className="text-medical-green hover:underline">Artikel 8 - Uitsluiting herroepingsrecht</a></li>
              <li><a href="#artikel9" className="text-medical-green hover:underline">Artikel 9 - De prijs</a></li>
              <li><a href="#artikel10" className="text-medical-green hover:underline">Artikel 10 - Conformiteit en garantie</a></li>
              <li><a href="#artikel11" className="text-medical-green hover:underline">Artikel 11 - Levering en uitvoering</a></li>
              <li><a href="#artikel12" className="text-medical-green hover:underline">Artikel 12 - Duurtransacties: duur, opzegging en verlenging</a></li>
              <li><a href="#artikel13" className="text-medical-green hover:underline">Artikel 13 - Betaling</a></li>
              <li><a href="#artikel14" className="text-medical-green hover:underline">Artikel 14 - Klachtenregeling</a></li>
              <li><a href="#artikel15" className="text-medical-green hover:underline">Artikel 15 - Geschillen</a></li>
              <li><a href="#artikel16" className="text-medical-green hover:underline">Artikel 16 - Aanvullende of afwijkende bepalingen</a></li>
            </ul>
          </nav>

          <h2 id="artikel1" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 1 - Definities</h2>
          <p className="mb-4">In deze voorwaarden wordt verstaan onder:</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>Bedenktijd:</strong> de termijn waarbinnen de consument gebruik kan maken van zijn herroepingsrecht;</li>
            <li><strong>Consument:</strong> de natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf en een overeenkomst op afstand aangaat met de ondernemer;</li>
            <li><strong>Dag:</strong> kalenderdag;</li>
            <li><strong>Duurtransactie:</strong> een overeenkomst op afstand met betrekking tot een reeks van producten en/of diensten, waarvan de leverings- en/of afnameverplichting in de tijd is gespreid;</li>
            <li><strong>Duurzame gegevensdrager:</strong> elk middel dat de consument of ondernemer in staat stelt om informatie die aan hem persoonlijk is gericht, op te slaan op een manier die toekomstige raadpleging en ongewijzigde reproductie van de opgeslagen informatie mogelijk maakt.</li>
            <li><strong>Herroepingsrecht:</strong> de mogelijkheid voor de consument om binnen de bedenktijd af te zien van de overeenkomst op afstand;</li>
            <li><strong>Modelformulier:</strong> het modelformulier voor herroeping die de ondernemer ter beschikking stelt die een consument kan invullen wanneer hij gebruik wil maken van zijn herroepingsrecht.</li>
            <li><strong>Ondernemer:</strong> de natuurlijke of rechtspersoon die producten en/of diensten op afstand aan consumenten aanbiedt;</li>
            <li><strong>Overeenkomst op afstand:</strong> een overeenkomst waarbij in het kader van een door de ondernemer georganiseerd systeem voor verkoop op afstand van producten en/of diensten, tot en met het sluiten van de overeenkomst uitsluitend gebruik gemaakt wordt van één of meer technieken voor communicatie op afstand;</li>
            <li><strong>Techniek voor communicatie op afstand:</strong> middel dat kan worden gebruikt voor het sluiten van een overeenkomst, zonder dat consument en ondernemer gelijktijdig in dezelfde ruimte zijn samengekomen.</li>
            <li><strong>Algemene Voorwaarden:</strong> de onderhavige Algemene Voorwaarden van de ondernemer.</li>
          </ul>

          <h2 id="artikel2" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 2 - Identiteit van de ondernemer</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-semibold">Art-of-Stones B.V.</p>
            <p>handelend onder de naam: 123noodklaar.nl</p>
            <p>Koperhoek 54</p>
            <p>3162LA Rhoon</p>
            <p className="text-sm italic">(geen bezoekadres)</p>
            <p className="mt-2">Email: info@123noodklaar.nl</p>
            <p>KvK-nummer: 95898476</p>
            <p>BTW-identificatienummer: NL867380998B01</p>
          </div>

          <h2 id="artikel3" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 3 - Toepasselijkheid</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Deze algemene voorwaarden zijn van toepassing op elk aanbod van de ondernemer en op elke tot stand gekomen overeenkomst op afstand en bestellingen tussen ondernemer en consument.</li>
            <li>Voordat de overeenkomst op afstand wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de consument beschikbaar gesteld. Indien dit redelijkerwijs niet mogelijk is, zal voordat de overeenkomst op afstand wordt gesloten, worden aangegeven dat de algemene voorwaarden bij de ondernemer in te zien en zij op verzoek van de consument zo spoedig mogelijk kosteloos worden toegezonden.</li>
            <li>Indien de overeenkomst op afstand elektronisch wordt gesloten, kan in afwijking van het vorige lid en voordat de overeenkomst op afstand wordt gesloten, de tekst van deze algemene voorwaarden langs elektronische weg aan de consument ter beschikking worden gesteld op zodanige wijze dat deze door de consument op een eenvoudige manier kan worden opgeslagen op een duurzame gegevensdrager. Indien dit redelijkerwijs niet mogelijk is, zal voordat de overeenkomst op afstand wordt gesloten, worden aangegeven waar van de algemene voorwaarden langs elektronische weg kan worden kennisgenomen en dat zij op verzoek van de consument langs elektronische weg of op andere wijze kosteloos zullen worden toegezonden.</li>
            <li>Voor het geval dat naast deze algemene voorwaarden tevens specifieke product- of dienstenvoorwaarden van toepassing zijn, is het tweede en derde lid van overeenkomstige toepassing en kan de consument zich in geval van tegenstrijdige algemene voorwaarden steeds beroepen op de toepasselijke bepaling die voor hem het meest gunstig is.</li>
            <li>Indien één of meerdere bepalingen in deze algemene voorwaarden op enig moment geheel of gedeeltelijk nietig zijn of vernietigd worden, dan blijft de overeenkomst en deze voorwaarden voor het overige in stand en zal de betreffende bepaling in onderling overleg onverwijld vervangen worden door een bepaling dat de strekking van het oorspronkelijke zoveel mogelijk benaderd.</li>
            <li>Situaties die niet in deze algemene voorwaarden zijn geregeld, dienen te worden beoordeeld 'naar de geest' van deze algemene voorwaarden.</li>
            <li>Onduidelijkheden over de uitleg of inhoud van één of meerdere bepalingen van onze voorwaarden, dienen uitgelegd te worden 'naar de geest' van deze algemene voorwaarden.</li>
          </ol>

          <h2 id="artikel4" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 4 - Het aanbod</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Indien een aanbod een beperkte geldigheidsduur heeft of onder voorwaarden geschiedt, wordt dit nadrukkelijk in het aanbod vermeld.</li>
            <li>Het aanbod is vrijblijvend. De ondernemer is gerechtigd het aanbod te wijzigen en aan te passen.</li>
            <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten en/of diensten. De beschrijving is voldoende gedetailleerd om een goede beoordeling van het aanbod door de consument mogelijk te maken. Als de ondernemer gebruik maakt van afbeeldingen zijn deze een waarheidsgetrouwe weergave van de aangeboden producten en/of diensten. Kennelijke vergissingen of kennelijke fouten in het aanbod binden de ondernemer niet.</li>
            <li>Alle afbeeldingen, specificaties gegevens in het aanbod zijn indicatie en kunnen geen aanleiding zijn tot schadevergoeding of ontbinding van de overeenkomst.</li>
            <li>Afbeeldingen bij producten zijn een waarheidsgetrouwe weergave van de aangeboden producten. Ondernemer kan niet garanderen dat de weergegeven kleuren exact overeenkomen met de echte kleuren van de producten.</li>
            <li>Elk aanbod bevat zodanige informatie, dat voor de consument duidelijk is wat de rechten en verplichtingen zijn, die aan de aanvaarding van het aanbod zijn verbonden. Dit betreft in het bijzonder:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>de prijs inclusief belastingen;</li>
                <li>de eventuele kosten van verzending;</li>
                <li>de wijze waarop de overeenkomst tot stand zal komen en welke handelingen daarvoor nodig zijn;</li>
                <li>het al dan niet van toepassing zijn van het herroepingsrecht;</li>
                <li>de wijze van betaling, aflevering en uitvoering van de overeenkomst;</li>
                <li>de termijn voor aanvaarding van het aanbod, dan wel de termijn waarbinnen de ondernemer de prijs garandeert;</li>
                <li>de hoogte van het tarief voor communicatie op afstand indien de kosten van het gebruik van de techniek voor communicatie op afstand worden berekend op een andere grondslag dan het reguliere basistarief voor het gebruikte communicatiemiddel;</li>
                <li>of de overeenkomst na de totstandkoming wordt gearchiveerd, en zo ja op welke deze voor de consument te raadplegen is;</li>
                <li>de manier waarop de consument, voor het sluiten van de overeenkomst, de door hem in het kader van de overeenkomst verstrekte gegevens kan controleren en indien gewenst herstellen;</li>
                <li>de eventuele andere talen waarin, naast het Nederlands, de overeenkomst kan worden gesloten;</li>
                <li>de gedragscodes waaraan de ondernemer zich heeft onderworpen en de wijze waarop de consument deze gedragscodes langs elektronische weg kan raadplegen; en</li>
                <li>de minimale duur van de overeenkomst op afstand in geval van een duurtransactie.</li>
              </ul>
            </li>
          </ol>

          <h2 id="artikel5" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 5 - De overeenkomst</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>De overeenkomst komt, onder voorbehoud van het bepaalde in lid 4, tot stand op het moment van aanvaarding door de consument van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.</li>
            <li>Indien de consument het aanbod langs elektronische weg heeft aanvaard, bevestigt de ondernemer onverwijld langs elektronische weg de ontvangst van de aanvaarding van het aanbod. Zolang de overeenkomst van deze aanvaarding niet door de ondernemer is bevestigd, kan de consument de overeenkomst ontbinden.</li>
            <li>Indien de overeenkomst elektronisch tot stand komt, treft de ondernemer passende technische en organisatorische maatregelen ter beveiliging van de elektronische overdracht van data en zorgt hij voor een veilige webomgeving. Indien de consument elektronisch kan betalen, zal de ondernemer daartoe passende veiligheidsmaatregelen in acht nemen.</li>
            <li>De ondernemer kan zich - binnen wettelijke kaders - op de hoogte stellen of de consument aan zijn betalingsverplichtingen kan voldoen, evenals van al die feiten en factoren die van belang zijn voor een verantwoord aangaan van de overeenkomst op afstand. Indien de ondernemer op grond van dit onderzoek goede gronden heeft om de overeenkomst niet aan te gaan, is hij gerechtigd gemotiveerd een bestelling of aanvraag te weigeren of aan de uitvoering bijzondere voorwaarden te verbinden.</li>
            <li>De ondernemer zal bij het product of dienst aan de consument de volgende informatie, schriftelijk of op zodanige wijze dat deze door de consument op een toegankelijke manier kan worden opgeslagen op een duurzame gegevensdrager, meesturen:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>het bezoekadres van de vestiging van de ondernemer waar de consument met klachten terecht kan;</li>
                <li>de voorwaarden waaronder en de wijze waarop de consument van het herroepingsrecht gebruik kan maken, dan wel een duidelijke melding inzake het uitgesloten zijn van het herroepingsrecht;</li>
                <li>de informatie over garanties en bestaande service na aankoop;</li>
                <li>de in artikel 4 lid 3 van deze voorwaarden opgenomen gegevens, tenzij de ondernemer deze gegevens al aan de consument heeft verstrekt vóór de uitvoering van de overeenkomst;</li>
                <li>de vereisten voor opzegging van de overeenkomst indien de overeenkomst een duur heeft van meer dan één jaar of van onbepaalde duur is.</li>
              </ul>
            </li>
            <li>In geval van een duurtransactie is de bepaling in het vorige lid slechts van toepassing op de eerste levering. Iedere overeenkomst wordt aangegaan onder de opschortende voorwaarden van voldoende beschikbaarheid van de betreffende producten.</li>
          </ol>

          <h2 id="artikel6" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 6 - Herroepingsrecht</h2>
          <h3 className="text-xl font-semibold text-navy-blue mb-3">Bij levering van producten:</h3>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Bij de aankoop van producten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen. Deze bedenktermijn gaat in op de dag na ontvangst van het product door de consument of een vooraf door de consument aangewezen en aan de ondernemer bekend gemaakte vertegenwoordiger.</li>
            <li>Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Hij zal het product slechts in die mate uitpakken of gebruiken voor zover dat nodig is om te kunnen beoordelen of hij het product wenst te behouden. Indien hij van zijn herroepingsrecht gebruik maakt, zal hij het product met alle geleverde toebehoren en - indien redelijkerwijze mogelijk - in de originele staat en verpakking aan de ondernemer retourneren, conform de door de ondernemer verstrekte redelijke en duidelijke instructies.</li>
            <li>Wanneer de consument gebruik wenst te maken van zijn herroepingsrecht is hij verplicht dit binnen 14 dagen, na ontvangst van het product, kenbaar te maken aan de ondernemer. Het kenbaar maken dient de consument te doen middels het modelformulier of door middel van een ander communicatiemiddel zoals per e-mail. Nadat de consument kenbaar heeft gemaakt gebruik te willen maken van zijn herroepingsrecht dient de klant het product binnen 14 dagen retour te sturen. De consument dient te bewijzen dat de geleverde zaken tijdig zijn teruggestuurd, bijvoorbeeld door middel van een bewijs van verzending.</li>
            <li>Indien de klant na afloop van de in lid 2 en 3 genoemde termijnen niet kenbaar heeft gemaakt gebruik te willen maken van zijn herroepingsrecht resp. het product niet aan de ondernemer heeft teruggezonden, is de koop een feit.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">Bij levering van diensten:</h3>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Bij levering van diensten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende ten minste 14 dagen, ingaande op de dag van het aangaan van de overeenkomst.</li>
            <li>Om gebruik te maken van zijn herroepingsrecht, zal de consument zich richten naar de door de ondernemer bij het aanbod en/of uiterlijk bij de levering ter zake verstrekte redelijke en duidelijke instructies.</li>
          </ol>

          <h2 id="artikel7" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 7 - Kosten in geval van herroeping</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>De consument draagt de rechtstreekse kosten van het terugzenden van het product.</li>
            <li>Indien de consument een bedrag betaald heeft, zal de ondernemer dit bedrag zo spoedig mogelijk, doch uiterlijk binnen 14 dagen na herroeping, terugbetalen. Hierbij is wel de voorwaarde dat het product reeds terug ontvangen is door de webwinkelier of sluitend bewijs van complete terugzending overlegd kan worden. Terugbetaling zal geschieden via de zelfde betaalmethode die door de consument is gebruikt tenzij de consument nadrukkelijk toestemming geeft voor een andere betaalmethode.</li>
            <li>Bij beschadiging van het product door onzorgvuldige omgang door de consument zelf is de consument aansprakelijk voor eventuele waardevermindering van het product.</li>
            <li>De consument kan niet aansprakelijk worden gesteld voor waardevermindering van het product wanneer door de ondernemer niet alle wettelijk verplichte informatie over het herroepingsrecht is verstrekt, dit dient te gebeuren voor het sluiten van de koopovereenkomst.</li>
          </ol>

          <h2 id="artikel8" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 8 - Uitsluiting herroepingsrecht</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
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

          <h2 id="artikel9" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 9 - De prijs</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Gedurende de in het aanbod vermelde geldigheidsduur worden de prijzen van de aangeboden producten en/of diensten niet verhoogd, behoudens prijswijzigingen als gevolg van veranderingen in btw-tarieven.</li>
            <li>In afwijking van het vorige lid kan de ondernemer producten of diensten waarvan de prijzen gebonden zijn aan schommelingen op de financiële markt en waar de ondernemer geen invloed op heeft, met variabele prijzen aanbieden. Deze gebondenheid aan schommelingen en het feit dat eventueel vermelde prijzen richtprijzen zijn, worden bij het aanbod vermeld.</li>
            <li>Prijsverhogingen binnen 3 maanden na de totstandkoming van de overeenkomst zijn alleen toegestaan indien zij het gevolg zijn van wettelijke regelingen of bepalingen.</li>
            <li>Prijsverhogingen vanaf 3 maanden na de totstandkoming van de overeenkomst zijn alleen toegestaan indien de ondernemer dit bedongen heeft en:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>deze het gevolg zijn van wettelijke regelingen of bepalingen; of</li>
                <li>de consument de bevoegdheid heeft de overeenkomst op te zeggen met ingang van de dag waarop de prijsverhoging ingaat.</li>
              </ul>
            </li>
            <li>De in het aanbod van producten of diensten genoemde prijzen zijn inclusief btw. Alle prijzen zijn onder voorbehoud van druk – en zetfouten. Voor de gevolgen van druk – en zetfouten wordt geen aansprakelijkheid aanvaard. Bij druk – en zetfouten is de ondernemer niet verplicht het product volgens de foutieve prijs te leveren.</li>
          </ol>

          <h2 id="artikel10" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 10 - Conformiteit en garantie</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>De ondernemer staat er voor in dat de producten en/of diensten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties, aan de redelijke eisen van deugdelijkheid en/of bruikbaarheid en de op de datum van de totstandkoming van de overeenkomst bestaande wettelijke bepalingen en/of overheidsvoorschriften. Indien overeengekomen staat de ondernemer er tevens voor in dat het product geschikt is voor ander dan normaal gebruik.</li>
            <li>Een door de ondernemer, fabrikant of importeur verstrekte garantie doet niets af aan de wettelijke rechten en vorderingen die de consument op grond van de overeenkomst tegenover de ondernemer kan doen gelden.</li>
            <li>Op alle producten is de wettelijke garantie van toepassing. De duur van de wettelijke garantie kan verschillen op basis van de aard van het product.</li>
            <li>Eventuele gebreken of verkeerd geleverde producten dienen binnen 2 maanden na ontdekking schriftelijk aan de ondernemer te worden gemeld.</li>
            <li>De garantie geldt niet indien:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>de consument de geleverde producten zelf heeft gerepareerd en/of bewerkt of door derden heeft laten repareren en/of bewerken;</li>
                <li>de geleverde producten aan abnormale omstandigheden zijn blootgesteld of anderszins onzorgvuldig worden behandeld of in strijd zijn met de aanwijzingen van de ondernemer en/of op de verpakking behandeld zijn;</li>
                <li>de ondeugdelijkheid geheel of gedeeltelijk het gevolg is van voorschriften die de overheid heeft gesteld of zal stellen ten aanzien van de aard of de kwaliteit van de toegepaste materialen.</li>
              </ul>
            </li>
          </ol>

          <h2 id="artikel11" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 11 - Levering en uitvoering</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>De ondernemer zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en bij de uitvoering van bestellingen van producten en bij de beoordeling van aanvragen tot verlening van diensten.</li>
            <li>Als plaats van levering geldt het adres dat de consument aan het bedrijf kenbaar heeft gemaakt.</li>
            <li>Met inachtneming van hetgeen hierover in lid 4 van dit artikel is vermeld, zal het bedrijf geaccepteerde bestellingen met bekwame spoed doch uiterlijk binnen 30 dagen uitvoeren, tenzij consument akkoord is gegaan met een langere leveringstermijn. Indien de bezorging vertraging ondervindt, of indien een bestelling niet dan wel slechts gedeeltelijk kan worden uitgevoerd, ontvangt de consument hiervan uiterlijk 30 dagen nadat hij de bestelling geplaatst heeft bericht. De consument heeft in dat geval het recht om de overeenkomst zonder kosten te ontbinden. De consument heeft geen recht op een contractuele schadevergoeding.</li>
            <li>Alle levertermijnen zijn indicatief. Aan eventuele genoemde termijnen kan de consument geen rechten ontlenen. Overschrijding van een termijn geeft de consument geen recht op contractuele schadevergoeding.</li>
            <li>In geval van ontbinding conform het lid 3 van dit artikel zal de ondernemer het bedrag dat de consument betaald heeft zo spoedig mogelijk, doch uiterlijk binnen 14 dagen na ontbinding, terugbetalen.</li>
            <li>Indien levering van een besteld product onmogelijk blijkt te zijn, zal de ondernemer zich inspannen om een vervangend artikel beschikbaar te stellen. Uiterlijk bij de bezorging zal op duidelijke en begrijpelijke wijze worden gemeld dat een vervangend artikel wordt geleverd. Bij vervangende artikelen kan het herroepingsrecht niet worden uitgesloten. De kosten van een eventuele retourzending zijn voor rekening van de ondernemer.</li>
            <li>Het risico van beschadiging en/of vermissing van producten berust bij de ondernemer tot het moment van bezorging aan de consument of een vooraf aangewezen en aan de ondernemer bekend gemaakte vertegenwoordiger, tenzij uitdrukkelijk anders is overeengekomen.</li>
          </ol>

          <h2 id="artikel12" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 12 - Duurtransacties: duur, opzegging en verlenging</h2>
          <h3 className="text-xl font-semibold text-navy-blue mb-3">Opzegging</h3>
          <ol className="list-decimal list-inside mb-4 space-y-3">
            <li>De consument kan een overeenkomst die voor onbepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, te allen tijde opzeggen met inachtneming van daartoe overeengekomen opzeggingsregels en een opzegtermijn van ten hoogste één maand.</li>
            <li>De consument kan een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, te allen tijde tegen het einde van de bepaalde duur opzeggen met inachtneming van daartoe overeengekomen opzeggingsregels en een opzegtermijn van ten hoogste één maand.</li>
            <li>De consument kan de in de vorige leden genoemde overeenkomsten:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>te allen tijde opzeggen en niet beperkt worden tot opzegging op een bepaald tijdstip of in een bepaalde periode;</li>
                <li>tenminste opzeggen op dezelfde wijze als zij door hem zijn aangegaan;</li>
                <li>altijd opzeggen met dezelfde opzegtermijn als de ondernemer voor zichzelf heeft bedongen.</li>
              </ul>
            </li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">Verlenging</h3>
          <ol className="list-decimal list-inside mb-4 space-y-3">
            <li>Een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, mag niet stilzwijgend worden verlengd of vernieuwd voor een bepaalde duur.</li>
            <li>In afwijking van het vorige lid mag een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van dag- nieuws- en weekbladen en tijdschriften stilzwijgend worden verlengd voor een bepaalde duur van maximaal drie maanden, als de consument deze verlengde overeenkomst tegen het einde van de verlenging kan opzeggen met een opzegtermijn van ten hoogste één maand.</li>
            <li>Een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten of diensten, mag alleen stilzwijgend voor onbepaalde duur worden verlengd als de consument te allen tijde mag opzeggen met een opzegtermijn van ten hoogste één maand en een opzegtermijn van ten hoogste drie maanden in geval de overeenkomst strekt tot het geregeld, maar minder dan eenmaal per maand, afleveren van dag-, nieuws- en weekbladen en tijdschriften.</li>
            <li>Een overeenkomst met beperkte duur tot het geregeld ter kennismaking afleveren van dag-, nieuws- en weekbladen en tijdschriften (proef- of kennismakingsabonnement) wordt niet stilzwijgend voortgezet en eindigt automatisch na afloop van de proef- of kennismakingsperiode.</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-navy-blue mb-3">Duur</h3>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Als een overeenkomst een duur van meer dan een jaar heeft, mag de consument na een jaar de overeenkomst te allen tijde met een opzegtermijn van ten hoogste een maand opzeggen, tenzij de redelijkheid en billijkheid zich tegen opzegging vóór het einde van de overeengekomen duur verzetten.</li>
          </ol>

          <h2 id="artikel13" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 13 - Betaling</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Voor zover niet anders is overeengekomen, dienen de door de consument verschuldigde bedragen te worden voldaan binnen 7 werkdagen na het ingaan van de bedenktermijn als bedoeld in artikel 6 lid 1. In geval van een overeenkomst tot het verlenen van een dienst, vangt deze termijn aan nadat de consument de bevestiging van de overeenkomst heeft ontvangen.</li>
            <li>De consument heeft de plicht om onjuistheden in verstrekte of vermelde betaalgegevens onverwijld aan de ondernemer te melden.</li>
            <li>In geval van wanbetaling van de consument heeft de ondernemer behoudens wettelijke beperkingen, het recht om de vooraf aan de consument kenbaar gemaakte redelijke kosten in rekening te brengen.</li>
          </ol>

          <h2 id="artikel14" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 14 - Klachtenregeling</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>De ondernemer beschikt over een voldoende bekend gemaakte klachtenprocedure en behandelt de klacht overeenkomstig deze klachtenprocedure.</li>
            <li>Klachten over de uitvoering van de overeenkomst moeten binnen 2 maanden volledig en duidelijk omschreven worden ingediend bij de ondernemer, nadat de consument de gebreken heeft geconstateerd.</li>
            <li>Bij de ondernemer ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord. Als een klacht een voorzienbaar langere verwerkingstijd vraagt, wordt door de ondernemer binnen de termijn van 14 dagen geantwoord met een bericht van ontvangst en een indicatie wanneer de consument een meer uitvoerig antwoord kan verwachten.</li>
            <li>Indien de klacht niet in onderling overleg kan worden opgelost ontstaat een geschil dat vatbaar is voor de geschillenregeling.</li>
            <li>Bij klachten dient een consument zich allereerst te wenden tot de ondernemer. Indien de webwinkel is aangesloten bij WebwinkelKeur en bij klachten die niet in onderling overleg opgelost kunnen worden dient de consument zich te wenden tot WebwinkelKeur (www.webwinkelkeur.nl), deze zal gratis bemiddelen. Controleer of deze webwinkel een lopend lidmaatschap heeft via https://www.webwinkelkeur.nl/ledenlijst/. Mocht er dan nog niet tot een oplossing gekomen worden, heeft de consument de mogelijkheid om zijn klacht te laten behandelen door de door WebwinkelKeur aangestelde onafhankelijke geschillencommissie, de uitspraak hiervan is bindend en zowel ondernemer als consument stemmen in met deze bindende uitspraak. Aan het voorleggen van een geschil aan deze geschillencommissie zijn kosten verbonden die door de consument betaald dienen te worden aan de betreffende commissie. Tevens is het mogelijk om klachten aan te melden via het Europees ODR platform (http://ec.europa.eu/odr).</li>
            <li>Een klacht schort de verplichtingen van de ondernemer niet op, tenzij de ondernemer schriftelijk anders aangeeft.</li>
            <li>Indien een klacht gegrond wordt bevonden door de ondernemer, zal de ondernemer naar haar keuze of de geleverde producten kosteloos vervangen of repareren.</li>
          </ol>

          <h2 id="artikel15" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 15 - Geschillen</h2>
          <ol className="list-decimal list-inside mb-6 space-y-3">
            <li>Op overeenkomsten tussen de ondernemer en de consument waarop deze algemene voorwaarden betrekking hebben, is uitsluitend Nederlands recht van toepassing. Ook indien de consument woonachtig is in het buitenland.</li>
            <li>Het Weens Koopverdrag is niet van toepassing.</li>
          </ol>

          <h2 id="artikel16" className="text-2xl font-bold text-navy-blue mb-4 mt-8">Artikel 16 - Aanvullende of afwijkende bepalingen</h2>
          <p className="mb-6">
            Aanvullende dan wel van deze algemene voorwaarden afwijkende bepalingen mogen niet ten nadele van de consument zijn en dienen schriftelijk te worden vastgelegd dan wel op zodanige wijze dat deze door de consument op een toegankelijke manier kunnen worden opgeslagen op een duurzame gegevensdrager.
          </p>
          
          <p className="mt-8 text-sm italic text-gray-600">
            Deze algemene voorwaarden zijn laatst bijgewerkt op 1 januari 2025.
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