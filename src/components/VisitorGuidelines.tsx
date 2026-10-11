import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, AlertCircle, Info, HeartHandshake } from 'lucide-react';
import { VISITOR_GUIDELINES, TEMPLE_INFO } from '../data/templeData';
import { Language } from '../types';

interface VisitorGuidelinesProps {
  currentLang: Language;
}

export const VisitorGuidelines: React.FC<VisitorGuidelinesProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="etiquette" className="py-16 sm:py-24 bg-[#FAF7F2] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 pb-10 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
            {currentLang === 'or' ? 'ଶ୍ରୀମନ୍ଦିର ପ୍ରବେଶ ଓ ଶୃଙ୍ଖଳା ବିଧି' : currentLang === 'hi' ? 'दर्शन मार्गदर्शिका एवं मर्यादा' : 'Pilgrim Etiquette & Sanctum Protocol'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
            {currentLang === 'or' ? 'ଶ୍ରୀକ୍ଷେତ୍ର ଦର୍ଶନ ନିୟମାବଳୀ' : currentLang === 'hi' ? 'श्रद्धालु दर्शन आचार संहिता' : 'Visitor Guidelines & Temple Etiquette'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Preserving the sanctity and tranquil spiritual ambience of Das Jagannath Temple. Please review dress code standards, electronic device safety lockers, and Anand Bazar Mahaprasad timings prior to visiting.
          </p>
        </div>

        {/* 4 Key Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          
          {/* 1. Dress Code */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-lg">
              👔
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-lg">
              Traditional Dress Code
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dhoti-Kurta, Pyjama, or modest shirts/trousers for men; Sarees or Salwar Kameez with Dupatta for women. Western shorts and sleeveless vests are prohibited inside the sanctum.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold pt-1">
              • Leather items strictly prohibited
            </div>
          </div>

          {/* 2. Photography & Lockers */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-lg">
              📷
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-lg">
              Mobile & Camera Rules
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Electronic devices and cameras must be deposited at the free token-operated lockers at Gate #2 (Western Gate). Photography is permitted only in outer gardens.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold pt-1">
              • Free token electronic lockers
            </div>
          </div>

          {/* 3. Anand Bazar Mahaprasad */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-lg">
              🍲
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-lg">
              Anand Bazar Dining
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Mahaprasad is served hot in earthen Kuduas twice daily ({TEMPLE_INFO.mahaPrasadTimings}). All pilgrims sit together without caste or social distinction.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold pt-1">
              • Clay pot consecrated Prasad
            </div>
          </div>

          {/* 4. Accessibility */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-lg">
              ♿
            </div>
            <h3 className="font-heading font-bold text-stone-900 text-lg">
              Accessibility & Elders
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Wheelchair ramps and volunteers are stationed at the North Gate (Hasti Dwara). Senior citizens (65+) and expectant mothers enjoy fast-track priority queues.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold pt-1">
              • Free battery cart shuttles
            </div>
          </div>
        </div>

        {/* Detailed Accordion / Category Tabs */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <h3 className="text-xl font-heading font-bold text-stone-900 mb-6">
            Detailed Protocols & Facilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VISITOR_GUIDELINES.map((guide, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="font-heading font-bold text-amber-900 text-base flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  {guide.category}
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {guide.items.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Helpline banner */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Need elder assistance or lost & found help during visit?
              </span>
            </div>
            <div className="font-medium text-stone-900">
              Pilgrim Information Center: <strong className="text-amber-800">{TEMPLE_INFO.phoneHelpdesk}</strong> (Toll-Free 6 AM – 9 PM)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
