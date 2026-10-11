import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Eye, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { TEMPLE_INFO, AARTI_SCHEDULE } from '../data/templeData';
import { Language } from '../types';
import { templeAudio } from '../utils/audio';

interface HeroProps {
  onOpenBooking: (sevaId?: string) => void;
  onOpenDonation: (fundId?: string) => void;
  onOpenVirtualDarshan: () => void;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenDonation,
  onOpenVirtualDarshan,
  currentLang,
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [templeStatus, setTempleStatus] = useState<{
    isOpen: boolean;
    nextAartiName: string;
    nextAartiTime: string;
  }>({
    isOpen: true,
    nextAartiName: 'Sandhya Alati',
    nextAartiTime: '07:00 PM',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const hours = now.getHours();
      // Temple schedule: 6 AM to 2 PM (morning) and 4 PM to 9 PM (evening)
      const isMorningOpen = hours >= 6 && hours < 14;
      const isEveningOpen = hours >= 16 && hours < 21;
      const isOpen = isMorningOpen || isEveningOpen;

      let nextName = 'Sandhya Alati';
      let nextTime = '07:00 PM';

      if (hours < 6) {
        nextName = 'Mangala Alati';
        nextTime = '06:00 AM';
      } else if (hours < 7) {
        nextName = 'Sahanamela Darshan';
        nextTime = '07:00 AM';
      } else if (hours < 10) {
        nextName = 'Sakala Dhupa';
        nextTime = '10:00 AM';
      } else if (hours < 12.5) {
        nextName = 'Bhoga Mandapa Darshan';
        nextTime = '12:30 PM';
      } else if (hours < 14) {
        nextName = 'Madhyanha Pahuda';
        nextTime = '02:00 PM';
      } else if (hours < 19) {
        nextName = 'Sandhya Alati';
        nextTime = '07:00 PM';
      } else if (hours < 20.5) {
        nextName = 'Badasinghar Besha';
        nextTime = '08:30 PM';
      } else {
        nextName = 'Mangala Alati (Tomorrow)';
        nextTime = '06:00 AM';
      }

      setTempleStatus({
        isOpen,
        nextAartiName: nextName,
        nextAartiTime: nextTime,
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConch = () => {
    templeAudio.playSacredConch();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-[#2A1810] to-[#1C1917] text-stone-100">
      {/* Background Sacred Geometric Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #CA8A04 2%, transparent 0%), radial-gradient(circle at 75px 75px, #EA580C 2%, transparent 0%)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Operational Utility Ribbon - Top of Hero */}
      <div className="border-b border-stone-800 bg-black/40 text-xs sm:text-sm text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              {templeStatus.isOpen ? (
                <span className="text-emerald-400 font-semibold">Open for Darshan</span>
              ) : (
                <span className="text-amber-400 font-semibold">Sanctum Pahuda (Rest Period)</span>
              )}
            </span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="text-stone-300">
              Next Aarti: <strong className="text-white font-semibold">{templeStatus.nextAartiName}</strong> at {templeStatus.nextAartiTime}
            </span>
            <span className="hidden md:inline text-stone-600">·</span>
            <span className="hidden md:inline text-stone-400">
              Hours: 6:00 AM – 2:00 PM & 4:00 PM – 9:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-400 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Odisha, India
            </span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="font-mono text-stone-300 tabular-nums">
              {currentTimeStr || '06:00:00 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'or' ? 'ଶ୍ରୀକ୍ଷେତ୍ର ଦାସ ଜଗନ୍ନାଥ ପୀଠ' : currentLang === 'hi' ? 'श्रीक्षेत्र दास जगन्नाथ पीठ' : 'Sacred Heritage of Kalinga'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.12]">
              {currentLang === 'or' ? (
                <>ପରମବ୍ରହ୍ମ ଶ୍ରୀ ଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କ ପବିତ୍ର ଦର୍ଶନ</>
              ) : currentLang === 'hi' ? (
                <>परमब्रह्म श्री जगन्नाथ महाप्रभु का दिव्य दर्शन</>
              ) : (
                <>Das Jagannath Temple, Odisha</>
              )}
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {currentLang === 'or' ? (
                'ମହାପ୍ରଭୁ ଶ୍ରୀ ଜଗନ୍ନାଥ, ବଳଭଦ୍ର, ମାତା ସୁଭଦ୍ରା ଓ ସୁଦର୍ଶନଙ୍କ ନିତ୍ୟ ସେବା, ଆଳତି ସମୟ, ଅନଲାଇନ୍ ପୂଜା ସଂକଳ୍ପ ଏବଂ ମହାପ୍ରସାଦ ସେବାରେ ସାମିଲ ହୁଅନ୍ତୁ।'
              ) : currentLang === 'hi' ? (
                'महाप्रभु श्री जगन्नाथ, बलभद्र, देवी सुभद्रा एवं सुदर्शन चक्र के नित्य दर्शन, दैनिक आरती समय, ऑनलाइन पूजा संकल्प एवं पवित्र महाप्रसाद सेवा में सम्मिलित हों।'
              ) : (
                'Experience the eternal grace of Lord Jagannath, Balabhadra, and Devi Subhadra. Access daily darshan timings (6:00 AM – 2:00 PM), book authenticated Vedic sevas, offer e-Hundi with 80G tax exemption, and participate in centuries-old Odia rituals.'
              )}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Pooja / Seva</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenDonation()}
                className="px-6 py-3.5 text-sm font-semibold text-amber-200 bg-stone-800/80 hover:bg-stone-800 border border-amber-600/50 hover:border-amber-500 rounded-lg transition-all flex items-center gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                <Heart className="w-4 h-4 text-amber-400" />
                <span>Make a Donation (E-Hundi)</span>
              </button>

              <button
                type="button"
                onClick={onOpenVirtualDarshan}
                className="px-5 py-3.5 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Live Darshan Stream</span>
              </button>
            </div>

            {/* Trust and Timings Adjacency Pill */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Reg. Trust: {TEMPLE_INFO.regNumber}
              </span>
              <span>·</span>
              <span>80G Tax Exemption Certified</span>
              <span>·</span>
              <span>Holy Mahaprasad at Anand Bazar</span>
            </div>
          </div>

          {/* Right Column: Lord Jagannath Sacred Sanctum Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-stone-800/90 via-stone-900 to-[#120E0C] p-5 sm:p-7 rounded-2xl border border-amber-900/50 shadow-2xl relative">
              
              {/* Sacred Conch Action Button */}
              <button
                type="button"
                onClick={triggerConch}
                title="Sound Sacred Conch (Shankha)"
                className="absolute top-4 right-4 z-20 px-2.5 py-1.5 rounded-md bg-amber-950/80 border border-amber-700/60 text-amber-300 hover:bg-amber-900 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="text-base">🐚</span> Sound Conch
              </button>

              {/* Sanctum Header */}
              <div className="text-center pb-4 border-b border-stone-800">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  Ratnasinghasana · Sacred Trinity
                </span>
                <h3 className="font-heading text-lg font-bold text-white mt-0.5">
                  Lord Jagannath, Balabhadra & Subhadra
                </h3>
              </div>

              {/* Cultural Odia Sanctum Illustration */}
              <div className="py-6 flex items-center justify-center">
                <svg viewBox="0 0 340 220" className="w-full max-w-[320px] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Temple Arch / Torana */}
                  <path d="M20 210 L20 100 Q170 10 320 100 L320 210" stroke="#CA8A04" strokeWidth="3" fill="none" />
                  <path d="M30 210 L30 105 Q170 20 310 105 L310 210" stroke="#78350F" strokeWidth="1" fill="none" />

                  {/* Nilachakra at pinnacle */}
                  <circle cx="170" cy="22" r="14" fill="#92400E" stroke="#FDE047" strokeWidth="2" />
                  <line x1="170" y1="8" x2="170" y2="36" stroke="#FDE047" strokeWidth="1.5" />
                  <line x1="156" y1="22" x2="184" y2="22" stroke="#FDE047" strokeWidth="1.5" />
                  {/* Patitapabana Flag */}
                  <path d="M170 8 L200 14 L170 20 Z" fill="#DC2626" />

                  {/* 1. Lord Balabhadra (White Face, Oval Eyes) - Left */}
                  <g transform="translate(60, 65)">
                    {/* Crown / Mukut */}
                    <path d="M15 15 L35 0 L55 15 L45 28 L25 28 Z" fill="#CA8A04" stroke="#FAF7F2" strokeWidth="1" />
                    {/* Head */}
                    <rect x="12" y="25" width="46" height="52" rx="20" fill="#FAF7F2" stroke="#B45309" strokeWidth="2" />
                    {/* Eyes */}
                    <ellipse cx="26" cy="46" rx="8" ry="6" fill="#1C1917" />
                    <ellipse cx="26" cy="46" rx="5" ry="3.5" fill="#FAF7F2" />
                    <circle cx="26" cy="46" r="2" fill="#1C1917" />
                    <ellipse cx="44" cy="46" rx="8" ry="6" fill="#1C1917" />
                    <ellipse cx="44" cy="46" rx="5" ry="3.5" fill="#FAF7F2" />
                    <circle cx="44" cy="46" r="2" fill="#1C1917" />
                    {/* Tilak */}
                    <path d="M31 30 L39 30 L35 40 Z" fill="#DC2626" />
                    {/* Smile */}
                    <path d="M25 64 Q35 72 45 64" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    {/* Garlands */}
                    <path d="M12 76 Q35 95 58 76" stroke="#15803D" strokeWidth="4" fill="none" />
                    <path d="M14 78 Q35 98 56 78" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
                  </g>

                  {/* 2. Devi Subhadra (Golden Yellow Face) - Center */}
                  <g transform="translate(138, 75)">
                    {/* Crown */}
                    <path d="M15 12 L32 0 L49 12 L41 24 L23 24 Z" fill="#EAB308" stroke="#78350F" strokeWidth="1" />
                    {/* Head */}
                    <rect x="14" y="20" width="36" height="46" rx="16" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
                    {/* Eyes */}
                    <ellipse cx="25" cy="40" rx="6" ry="5" fill="#1C1917" />
                    <ellipse cx="25" cy="40" rx="3.5" ry="2.5" fill="#FAF7F2" />
                    <circle cx="25" cy="40" r="1.5" fill="#1C1917" />
                    <ellipse cx="39" cy="40" rx="6" ry="5" fill="#1C1917" />
                    <ellipse cx="39" cy="40" rx="3.5" ry="2.5" fill="#FAF7F2" />
                    <circle cx="39" cy="40" r="1.5" fill="#1C1917" />
                    {/* Tilak */}
                    <circle cx="32" cy="30" r="2.5" fill="#DC2626" />
                    {/* Smile */}
                    <path d="M25 55 Q32 61 39 55" stroke="#DC2626" strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Garlands */}
                    <path d="M14 65 Q32 80 50 65" stroke="#DC2626" strokeWidth="3" fill="none" />
                  </g>

                  {/* 3. Lord Jagannath (Black Face, Iconic Round Eyes) - Right */}
                  <g transform="translate(205, 65)">
                    {/* Crown / Mukut */}
                    <path d="M15 15 L35 0 L55 15 L45 28 L25 28 Z" fill="#CA8A04" stroke="#FAF7F2" strokeWidth="1" />
                    {/* Head */}
                    <rect x="10" y="24" width="50" height="54" rx="18" fill="#1C1917" stroke="#CA8A04" strokeWidth="2" />
                    {/* Iconic Large Round Eyes */}
                    <circle cx="24" cy="48" r="11" fill="#FAF7F2" />
                    <circle cx="24" cy="48" r="7.5" fill="#DC2626" />
                    <circle cx="24" cy="48" r="4.5" fill="#1C1917" />
                    <circle cx="26" cy="46" r="1.8" fill="#FAF7F2" />

                    <circle cx="46" cy="48" r="11" fill="#FAF7F2" />
                    <circle cx="46" cy="48" r="7.5" fill="#DC2626" />
                    <circle cx="46" cy="48" r="4.5" fill="#1C1917" />
                    <circle cx="48" cy="46" r="1.8" fill="#FAF7F2" />

                    {/* Sacred Tilak */}
                    <path d="M31 30 L39 30 L35 41 Z" fill="#DC2626" />
                    <circle cx="35" cy="43" r="1.5" fill="#FACC15" />

                    {/* Red Divine Smile */}
                    <path d="M22 66 Q35 77 48 66" stroke="#DC2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M22 66 Q35 74 48 66" stroke="#FACC15" strokeWidth="1" fill="none" strokeLinecap="round" />

                    {/* Fresh Tulasi & Marigold Garlands */}
                    <path d="M10 76 Q35 97 60 76" stroke="#15803D" strokeWidth="4.5" fill="none" />
                    <path d="M12 79 Q35 101 58 79" stroke="#EA580C" strokeWidth="3" fill="none" />
                  </g>

                  {/* 4. Sudarshana Chakra Pillar - Far Left */}
                  <g transform="translate(38, 105)">
                    <rect x="0" y="0" width="8" height="60" rx="3" fill="#CA8A04" />
                    <circle cx="4" cy="8" r="6" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" />
                    <path d="M0 25 L8 25 M0 45 L8 45" stroke="#78350F" strokeWidth="1.5" />
                  </g>

                  {/* Traditional Brass Ghee Diyas with flickering flames */}
                  <g transform="translate(65, 175)">
                    <path d="M4 10 Q12 18 20 10 L16 16 L8 16 Z" fill="#CA8A04" />
                    <path d="M12 2 Q16 6 12 10 Q8 6 12 2 Z" fill="#F59E0B" />
                    <circle cx="12" cy="7" r="2" fill="#FEF08A" />
                  </g>
                  <g transform="translate(250, 175)">
                    <path d="M4 10 Q12 18 20 10 L16 16 L8 16 Z" fill="#CA8A04" />
                    <path d="M12 2 Q16 6 12 10 Q8 6 12 2 Z" fill="#F59E0B" />
                    <circle cx="12" cy="7" r="2" fill="#FEF08A" />
                  </g>
                </svg>
              </div>

              {/* Daily Alankaram Tag & Live Darshan Prompt */}
              <div className="bg-stone-950/70 rounded-xl p-3 border border-stone-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-medium">Daily Besha (Attire):</span>
                  <p className="text-stone-300 font-medium">Sada Besha & Tulasi Malya</p>
                </div>
                <button
                  type="button"
                  onClick={onOpenVirtualDarshan}
                  className="px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 text-xs font-semibold transition-colors cursor-pointer border border-amber-700/50"
                >
                  View 360° Shrine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
