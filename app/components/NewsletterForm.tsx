'use client';

import { useState, useCallback, memo } from 'react';

const NewsletterForm = memo(function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('particulier');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);
    setEmail('');

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, [email]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleAccountTypeChange = useCallback((type: string) => {
    setAccountType(type);
  }, []);

  return (
    <div className="bg-navy-blue rounded-2xl p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Blijf op de hoogte van aanbiedingen</h3>
          <p className="text-gray-300">Meld je aan voor onze nieuwsbrief en ontvang €5 korting op je eerste bestelling!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Vul je e-mailadres in"
              value={email}
              onChange={handleEmailChange}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-medical-green"
            />
            <button
              type="submit"
              disabled={isSubmitting || showSuccess}
              className="px-8 py-3 bg-medical-green text-white font-semibold rounded-lg hover:bg-medical-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? 'Verzenden...' : showSuccess ? 'Verstuurd!' : 'Aanmelden'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-sm text-gray-300">Ik ben:</span>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="account_type"
                  value="particulier"
                  checked={accountType === 'particulier'}
                  onChange={() => handleAccountTypeChange('particulier')}
                  className="mr-2 text-medical-green focus:ring-medical-green"
                />
                <span className="text-sm">Particulier</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="account_type"
                  value="zakelijk"
                  checked={accountType === 'zakelijk'}
                  onChange={() => handleAccountTypeChange('zakelijk')}
                  className="mr-2 text-medical-green focus:ring-medical-green"
                />
                <span className="text-sm">Zakelijk</span>
              </label>
            </div>
          </div>

          {showSuccess && (
            <div className="mt-4 p-3 bg-medical-green/20 border border-medical-green/50 rounded-lg text-center">
              <p className="text-sm">Bedankt voor je aanmelding! Check je inbox voor je kortingscode.</p>
            </div>
          )}
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Door je aan te melden ga je akkoord met onze privacyverklaring en algemene voorwaarden.
        </p>
      </div>
    </div>
  );
});

NewsletterForm.displayName = 'NewsletterForm';

export default NewsletterForm;