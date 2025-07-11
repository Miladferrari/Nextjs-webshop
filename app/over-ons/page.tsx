'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  const milestones = [
    { year: "2020", title: "Het Begin", description: "Opgericht tijdens de eerste lockdown" },
    { year: "2021", title: "Groei", description: "Eerste 1000 klanten bereikt" },
    { year: "2023", title: "Erkenning", description: "Partner van Nederlandse Rode Kruis" },
    { year: "2024", title: "Marktleider", description: "5000+ tevreden klanten" }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Kwaliteit Eerst",
      description: "Alleen gecertificeerde A-merken en hoogwaardige producten in onze pakketten"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Direct Klaar",
      description: "Binnen 24 uur bezorgd en meteen gebruiksklaar voor elke noodsituatie"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Expert Advies",
      description: "Samengesteld door hulpverleners en veiligheidsexperts met jarenlange ervaring"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - matching contact page style */}
      <section className="bg-gradient-to-br from-navy-blue to-navy-blue/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Over 123noodklaar.nl</h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Uw vertrouwde partner in noodvoorbereiding. Professioneel, betrouwbaar, compleet.
          </p>
        </div>
      </section>

      {/* Story Section with Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-blue mb-6">
                Van crisis naar kans
              </h2>
              <div className="space-y-4 text-steel-gray">
                <p>
                  123noodklaar.nl ontstond tijdens de eerste lockdown van 2020. Oprichter Jan van der Berg, 
                  voormalig brandweercommandant, zag hoe onvoorbereid veel Nederlandse gezinnen waren 
                  op crisissituaties.
                </p>
                <p>
                  Wat begon als hulp aan familie en vrienden, groeide uit tot een missie: elk gezin 
                  in Nederland toegang geven tot professionele noodvoorbereiding zonder gedoe.
                </p>
                <p>
                  Vandaag zijn we marktleider in noodpakketten, met meer dan 5000 tevreden klanten 
                  die vertrouwen op onze expertise en kwaliteit.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-off-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-blue mb-6">Onze Mijlpalen</h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-medical-green/10 rounded-full flex items-center justify-center">
                        <span className="text-medical-green font-bold">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy-blue">{milestone.title}</h4>
                      <p className="text-steel-gray text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-medical-green/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-blue mb-4">Onze Missie</h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
              Noodvoorbereiding toegankelijk maken voor elk Nederlands gezin, 
              zonder compromissen op kwaliteit of volledigheid.
            </p>
          </div>

          {/* Values Grid - matching homepage product card style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mb-6 text-medical-green">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-blue mb-3">{value.title}</h3>
                <p className="text-steel-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-blue rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Expertise waar u op kunt vertrouwen</h2>
              <p className="text-lg text-gray-300 mb-8">
                Ons team bestaat uit voormalige hulpverleners, brandweercommandanten, 
                veiligheidsexperts en survival instructeurs. Samen hebben we meer dan 
                50 jaar ervaring in crisismanagement en noodvoorbereiding.
              </p>
              
              {/* Certification badges */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Rode Kruis Partner</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>ISO Gecertificeerd</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>EHBO Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-navy-blue mb-12">
            Waarom kiezen voor 123noodklaar.nl?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "1", title: "Volledig Compleet", description: "Alle essentiële items in één pakket" },
              { number: "2", title: "Kwaliteit Eerst", description: "Alleen A-merken en gecertificeerde producten" },
              { number: "3", title: "Expert Samengesteld", description: "Door professionals met ervaring" },
              { number: "4", title: "Snelle Levering", description: "Binnen 24 uur bij u thuis" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 relative">
                <div className="text-5xl font-bold text-medical-green/20 absolute top-4 right-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-navy-blue mb-2 relative z-10">{item.title}</h3>
                <p className="text-steel-gray text-sm relative z-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - matching homepage style */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-blue mb-6">
            Begin vandaag met voorbereiden
          </h2>
          <p className="text-xl text-steel-gray mb-8">
            Ontdek welk noodpakket het beste past bij uw gezin en situatie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/noodpakketten" 
              className="inline-block bg-medical-green text-white px-8 py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-all"
            >
              Bekijk Noodpakketten
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-navy-blue border-2 border-navy-blue px-8 py-3 rounded-full font-semibold hover:bg-navy-blue hover:text-white transition-all"
            >
              Vraag Advies Aan
            </Link>
          </div>
          
          {/* Trust indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-steel-gray">
            <svg className="w-4 h-4 text-medical-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>14 dagen bedenktijd • Verzending binnen 2 dagen</span>
          </div>
        </div>
      </section>
    </div>
  );
}