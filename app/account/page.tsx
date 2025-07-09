export default function AccountPage() {
  return (
    <div className="min-h-screen bg-off-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy-blue mb-8 text-center">Mijn Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Login */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-navy-blue mb-6">Inloggen</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-steel-gray mb-2">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medical-green"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-steel-gray mb-2">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-medical-green"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-medical-green text-white py-3 rounded-full font-semibold hover:bg-medical-green/90 transition-colors"
              >
                Inloggen
              </button>
              <p className="text-center text-sm text-steel-gray">
                <a href="#" className="text-medical-green hover:underline">Wachtwoord vergeten?</a>
              </p>
            </form>
          </div>
          
          {/* Register */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-navy-blue mb-6">Nieuw Account</h2>
            <p className="text-steel-gray mb-6">
              Maak een account aan om sneller te bestellen en uw bestellingen te volgen.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-steel-gray">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Bestelgeschiedenis bekijken</span>
              </li>
              <li className="flex items-center gap-2 text-steel-gray">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Favorieten opslaan</span>
              </li>
              <li className="flex items-center gap-2 text-steel-gray">
                <svg className="w-5 h-5 text-medical-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sneller afrekenen</span>
              </li>
            </ul>
            <a
              href="/registreren"
              className="block w-full bg-amber-orange text-white py-3 rounded-full font-semibold hover:bg-amber-orange/90 transition-colors text-center"
            >
              Account aanmaken
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}