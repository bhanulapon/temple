import React from 'react';
import { Sparkles, Compass, Shield, BookOpen } from 'lucide-react';
import { Language } from '../types';

interface TempleHeritageProps {
  currentLang: Language;
}

export const TempleHeritage: React.FC<TempleHeritageProps> = ({ currentLang }) => {
  return (
    <section id="heritage" className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 pb-10 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            {currentLang === 'or' ? 'ଶ୍ରୀକ୍ଷେତ୍ର ଐତିହ୍ୟ ଓ ଦାରୁବ୍ରହ୍ମ ମାହାତ୍ମ୍ୟ' : currentLang === 'hi' ? 'कलिंग स्थापत्य एवं दारुब्रह्म महिमा' : 'Sacred Heritage & Architectural Glory'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
            {currentLang === 'or' ? 'ଦାସ ଜଗନ୍ନାଥ ମନ୍ଦିରର ପବିତ୍ର ଇତିହାସ' : currentLang === 'hi' ? 'दास जगन्नाथ मंदिर का पावन इतिहास' : 'About Das Jagannath Temple'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Erected in the classical Kalinga Rekha-Deula architectural tradition of Odisha, Das Jagannath Temple stands as a sanctified epicenter of Utkala Vaishnavism, universal brotherhood, and divine compassion.
          </p>
        </div>

        {/* 2-Column Editorial Heritage Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          
          {/* Left Column: History Narrative */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
            <div className="space-y-4">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-900 leading-relaxed">
                For centuries, the sacred worship of Lord Jagannath has transcended orthodox boundaries. In Odia culture, the Lord of the Universe is revered not merely as an untouchable deity, but as a living member of every family—who awakes with songs, receives seasonal attire, relishes sixty-four dishes of Mahaprasad, and embarks on chariot journeys amidst his people during Ratha Yatra.
              </p>

              <p>
                Das Jagannath Temple was established to propagate this timeless philosophy of <em>Jagannath Sanskruti</em>—universal harmony, casteless fellowship, and pure devotional service. Built with authentic Khandolite sandstone sourced from Odisha’s heritage quarries, the temple adheres strictly to ancient <em>Shilpa Shastra</em> treatises.
              </p>
            </div>

            {/* 3 Pillars of Jagannath Culture */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
              <div className="space-y-1.5">
                <h4 className="font-heading font-bold text-stone-900 text-base">
                  1. Daru Brahma
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Carved from holy sacred neem wood logs, symbolizing renewal and transcendental embodiment of the formless Supreme.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-heading font-bold text-stone-900 text-base">
                  2. Chhappan Bhog
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Steam-cooked in earthenware atop earthen stoves by Suara Sevayats without tasting until consecrated to Devi Bimala.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-heading font-bold text-stone-900 text-base">
                  3. Patitapabana Flag
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Fluttering at the pinnacle, offering liberation to all pilgrims who behold it from miles around.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Diagram / Visual Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF7F2] to-amber-50/50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <h3 className="font-heading font-bold text-lg text-stone-900 mb-4 pb-2 border-b border-stone-200">
              The 4 Architectural Chambers of Kalinga Temple
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Vimana (Garbhagriha)</span>
                  <span className="text-xs font-mono text-amber-800">Rekha Deula</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The towering curvilinear sanctum housing the Ratnasinghasana where the Holy Trinity and Sudarshana Chakra reside.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Jagamohana (Audience Hall)</span>
                  <span className="text-xs font-mono text-amber-800">Pidha Deula</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pyramidal stepped pavilion where pilgrims assemble for morning and evening Sahanamela public darshan.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Natamandapa (Dance Pavilion)</span>
                  <span className="text-xs font-mono text-amber-800">Festive Hall</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Open-pillared hall dedicated to classical Odissi dances, Mardala recitals, and Jayadeva’s Gita Govinda renditions.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Bhoga Mandapa (Offering Hall)</span>
                  <span className="text-xs font-mono text-amber-800">Consecration</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Where collective offerings of sacred dishes are consecrated by temple Pandas before distribution at Anand Bazar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
