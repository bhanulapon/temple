import React, { useState } from 'react';
import { Volume2, Menu, X, Globe } from 'lucide-react';
import { templeAudio } from '../utils/audio';
import { Language } from '../types';

interface HeaderProps {
  onOpenBooking: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  currentLang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellActive, setBellActive] = useState(false);

  const handleRingBell = () => {
    setBellActive(true);
    templeAudio.playTempleBell();
    setTimeout(() => setBellActive(false), 1200);
  };

  const navLinks = [
    { href: '#schedule', label: currentLang === 'or' ? 'ଦର୍ଶନ ସମୟ' : currentLang === 'hi' ? 'दर्शन समय' : 'Daily Timings' },
    { href: '#sevas', label: currentLang === 'or' ? 'ପୂଜା ଓ ସେବା' : currentLang === 'hi' ? 'पूजा व सेवा' : 'Online Seva' },
    { href: '#festivals', label: currentLang === 'or' ? 'ପର୍ବପର୍ବାଣୀ' : currentLang === 'hi' ? 'पर्व-उत्सव' : 'Festivals' },
    { href: '#ehundi', label: currentLang === 'or' ? 'ଇ-ହୁଣ୍ଡି ଦାନ' : currentLang === 'hi' ? 'ई-हुंडी दान' : 'E-Hundi' },
    { href: '#heritage', label: currentLang === 'or' ? 'ଐତିହ୍ୟ' : currentLang === 'hi' ? 'मंदिर इतिहास' : 'Heritage' },
    { href: '#etiquette', label: currentLang === 'or' ? 'ନିୟମାବଳୀ' : currentLang === 'hi' ? 'नियम व मार्गदर्शिका' : 'Guidelines' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <a
            href="#"
            className="flex items-center gap-3 text-stone-900 group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-600 rounded-sm"
          >
            <div className="w-10 h-10 rounded-full bg-amber-700/10 border border-amber-600/30 flex items-center justify-center text-amber-800 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" fill="#C2410C" />
                <circle cx="50" cy="50" r="39" fill="#1C1917" />
                <circle cx="35" cy="48" r="10" fill="#FAF7F2" />
                <circle cx="35" cy="48" r="5" fill="#1C1917" />
                <circle cx="65" cy="48" r="10" fill="#FAF7F2" />
                <circle cx="65" cy="48" r="5" fill="#1C1917" />
                <path d="M46 26 L54 26 L50 38 Z" fill="#DC2626" />
                <path d="M35 68 Q50 80 65 68" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {currentLang === 'or' ? 'ଦାସ ଜଗନ୍ନାଥ ମନ୍ଦିର' : currentLang === 'hi' ? 'दास जगन्नाथ मंदिर' : 'Das Jagannath Temple'}
            </span>
          </a>

          {/* Zone 2: 5-6 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors focus-visible:outline-2 focus-visible:outline-amber-600 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Utility Affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ambient Temple Bell Button */}
            <button
              type="button"
              onClick={handleRingBell}
              title="Ring Temple Bell (Sacred chime)"
              aria-label="Ring Temple Bell"
              className={`p-2.5 rounded-lg border border-stone-200 text-stone-700 hover:text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600 ${
                bellActive ? 'scale-110 bg-amber-100 text-amber-800' : ''
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center border border-stone-200 rounded-lg p-0.5 bg-stone-100/80 text-xs font-medium">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'en' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('or')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'or' ? 'bg-white text-amber-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ଓଡ଼ିଆ
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'hi' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
            >
              {currentLang === 'or' ? 'ପୂଜା ବୁକିଂ' : currentLang === 'hi' ? 'पूजा बुक करें' : 'Book a Pooja'}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-amber-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-3 bg-[#FAF7F2]">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-stone-800 font-medium hover:bg-amber-50 hover:text-amber-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Language / ଭାଷା:
              </span>
              <div className="flex items-center gap-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => { onLanguageChange('en'); setMobileMenuOpen(false); }}
                  className={`px-2.5 py-1 rounded ${currentLang === 'en' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => { onLanguageChange('or'); setMobileMenuOpen(false); }}
                  className={`px-2.5 py-1 rounded ${currentLang === 'or' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'}`}
                >
                  ଓଡ଼ିଆ
                </button>
                <button
                  type="button"
                  onClick={() => { onLanguageChange('hi'); setMobileMenuOpen(false); }}
                  className={`px-2.5 py-1 rounded ${currentLang === 'hi' ? 'bg-amber-800 text-white' : 'bg-stone-100 text-stone-700'}`}
                >
                  हिन्दी
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
