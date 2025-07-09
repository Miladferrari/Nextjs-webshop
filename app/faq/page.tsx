'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqCategories = [
  { id: 'algemeen', name: 'Algemeen', icon: '❓' },
  { id: 'producten', name: 'Producten', icon: '📦' },
  { id: 'bestellen', name: 'Bestellen & Verzending', icon: '🚚' },
  { id: 'gebruik', name: 'Gebruik & Onderhoud', icon: '🔧' },
];

const faqItems: FAQItem[] = [
  // Algemeen
  {
    id: 1,
    category: 'algemeen',
    question: "Waarom zou ik een noodpakket nodig hebben?",
    answer: "Noodpakketten zijn essentieel voor onverwachte situaties zoals stroomuitval, natuurrampen of andere calamiteiten. De Nederlandse overheid adviseert elk huishouden om voorbereid te zijn voor minimaal 72 uur."
  },
  {
    id: 2,
    category: 'algemeen',
    question: "Voor hoeveel personen is een pakket bedoeld?",
    answer: "Onze pakketten zijn verkrijgbaar voor 1 persoon (Solo), 2 personen (Duo), en 4-6 personen (Gezin). Elk pakket bevat voldoende voorraden voor minimaal 72 uur."
  },
  {
    id: 3,
    category: 'algemeen',
    question: "Zijn jullie pakketten goedgekeurd door autoriteiten?",
    answer: "Onze pakketten zijn samengesteld volgens de richtlijnen van het Nederlandse Rode Kruis en Rijksoverheid. Alle producten voldoen aan Europese veiligheidsnormen."
  },
  
  // Producten
  {
    id: 4,
    category: 'producten',
    question: "Wat zit er precies in een noodpakket?",
    answer: "Een standaard noodpakket bevat: houdbaar voedsel, drinkwater, EHBO-kit, noodradio, zaklamp, warmtedekens, fluitje, lucifers, en een multitool."
  },
  {
    id: 5,
    category: 'producten',
    question: "Hoe lang blijven de producten houdbaar?",
    answer: "De meeste producten hebben een houdbaarheid van minimaal 5 jaar. We adviseren jaarlijks uw pakket te controleren."
  },
  {
    id: 6,
    category: 'producten',
    question: "Kan ik mijn pakket aanpassen?",
    answer: "Ja, u kunt uw basispakket uitbreiden met losse items. Voor volledig aangepaste pakketten kunt u contact opnemen met onze klantenservice."
  },
  
  // Bestellen & Verzending
  {
    id: 7,
    category: 'bestellen',
    question: "Hoe snel wordt mijn bestelling geleverd?",
    answer: "Bestellingen voor 14:00 uur worden dezelfde dag verzonden. Levering binnen Nederland duurt 1 werkdag."
  },
  {
    id: 8,
    category: 'bestellen',
    question: "Wat zijn de verzendkosten?",
    answer: "Verzending binnen Nederland kost €4,95. Boven €50 is verzending gratis."
  },
  {
    id: 9,
    category: 'bestellen',
    question: "Kan ik mijn bestelling retourneren?",
    answer: "U heeft 90 dagen bedenktijd voor ongeopende pakketten. Retourneren is gratis via ons retourlabel."
  },
  
  // Gebruik & Onderhoud
  {
    id: 10,
    category: 'gebruik',
    question: "Waar bewaar ik mijn noodpakket het beste?",
    answer: "Bewaar uw pakket op een droge, koele plaats die makkelijk bereikbaar is. Ideaal zijn: meterkast, zolder, kelder, of garage."
  },
  {
    id: 11,
    category: 'gebruik',
    question: "Hoe onderhoud ik mijn noodpakket?",
    answer: "Controleer uw pakket 2x per jaar. Check batterijen, houdbaarheidsdata, en test apparatuur."
  },
  {
    id: 12,
    category: 'gebruik',
    question: "Wat doe ik als ik mijn pakket heb gebruikt?",
    answer: "U kunt losse items nabestellen via onze webshop. We bieden speciale 'refill-pakketten' met de meest gebruikte verbruiksartikelen."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-navy-blue text-center">Veelgestelde vragen</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Zoek een vraag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 border border-gray-200 rounded-full focus:outline-none focus:border-medical-green transition-colors text-black"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-navy-blue text-white'
                : 'bg-white text-steel-gray hover:text-navy-blue'
            }`}
          >
            Alle vragen
          </button>
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                activeCategory === category.id
                  ? 'bg-navy-blue text-white'
                  : 'bg-white text-steel-gray hover:text-navy-blue'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-navy-blue pr-4">
                    {item.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-steel-gray flex-shrink-0 transform transition-transform ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-5 pb-4 text-steel-gray text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-steel-gray">Geen vragen gevonden</p>
              <button
                onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                className="mt-2 text-medical-green text-sm hover:underline"
              >
                Toon alle vragen
              </button>
            </div>
          )}
        </div>

        {/* Simple Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-steel-gray mb-4">Staat uw vraag er niet bij?</p>
          <a
            href="/contact"
            className="inline-block bg-medical-green text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-medical-green/90 transition-colors"
          >
            Stel een vraag
          </a>
        </div>
      </div>
    </div>
  );
}