'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy-blue text-lg mb-2">Bel ons</h3>
            <p className="text-steel-gray mb-4">Direct persoonlijk contact</p>
            <a href="tel:+31201234567" className="text-medical-green font-semibold hover:text-medical-green/80">
              +31 20 123 4567
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy-blue text-lg mb-2">Email ons</h3>
            <p className="text-steel-gray mb-4">We reageren binnen 24 uur</p>
            <a href="mailto:info@noodklaar.nl" className="text-medical-green font-semibold hover:text-medical-green/80">
              info@noodklaar.nl
            </a>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-navy-blue text-lg mb-2">Vestigingsadres</h3>
            <p className="text-steel-gray mb-4">Geen bezoekadres</p>
            <p className="text-medical-green font-semibold">
              Rhoon, Nederland
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-navy-blue mb-2">Stuur ons een bericht</h2>
              <p className="text-steel-gray mb-8">Vul het formulier in en we nemen zo snel mogelijk contact met u op.</p>
              
              {submitted ? (
                <div className="bg-medical-green/10 border-2 border-medical-green/30 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-medical-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-medical-green text-xl mb-2">Bedankt voor uw bericht!</p>
                  <p className="text-steel-gray">We nemen binnen 24 uur contact met u op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy-blue mb-2">
                        Naam *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-medical-green transition-colors placeholder-gray-600"
                        placeholder="Uw volledige naam"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-navy-blue mb-2">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-medical-green transition-colors placeholder-gray-600"
                        placeholder="uw@email.nl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy-blue mb-2">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-medical-green transition-colors placeholder-gray-600"
                        placeholder="+31 6 12345678"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-navy-blue mb-2">
                        Onderwerp *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-medical-green transition-colors"
                      >
                        <option value="">Selecteer onderwerp</option>
                        <option value="product">Productvragen</option>
                        <option value="order">Bestelling</option>
                        <option value="shipping">Verzending</option>
                        <option value="custom">Aangepast pakket</option>
                        <option value="other">Anders</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-navy-blue mb-2">
                      Bericht *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-medical-green transition-colors resize-none placeholder-gray-600"
                      placeholder="Vertel ons hoe we u kunnen helpen..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-medical-green text-white py-4 px-8 rounded-lg font-semibold hover:bg-medical-green/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Verstuur bericht
                  </button>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact information sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Info Card */}
            <div className="bg-navy-blue text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Art-of-Stones B.V.</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-medical-green mb-2">Hoofdkantoor</h4>
                  <p className="text-gray-300">
                    Koperhoek 54<br />
                    3162LA Rhoon<br />
                    Nederland<br />
                    <span className="text-sm italic">(geen bezoekadres)</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-medical-green mb-2">Contact</h4>
                  <p className="text-gray-300">
                    Tel: +31 20 123 4567<br />
                    Email: info@noodklaar.nl
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-medical-green mb-2">KvK & BTW</h4>
                  <p className="text-gray-300">
                    KvK: 95898476<br />
                    BTW: NL867380998B01
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-off-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-blue mb-6">Openingstijden</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-steel-gray">Maandag - Vrijdag</span>
                  <span className="font-semibold text-navy-blue">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-gray">Zaterdag</span>
                  <span className="font-semibold text-navy-blue">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-gray">Zondag</span>
                  <span className="font-semibold text-navy-blue">Gesloten</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-steel-gray">
                  <strong>Let op:</strong> Voor spoedbestellingen kunt u ons ook buiten kantooruren bereiken.
                </p>
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-amber-orange/10 border-2 border-amber-orange/30 rounded-2xl p-6">
              <h4 className="font-semibold text-navy-blue mb-2">Hulp nodig?</h4>
              <p className="text-steel-gray text-sm mb-4">
                Bekijk onze veelgestelde vragen voor snelle antwoorden.
              </p>
              <a href="/faq" className="text-amber-orange font-semibold hover:text-amber-orange/80 flex items-center gap-2">
                Naar FAQ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}