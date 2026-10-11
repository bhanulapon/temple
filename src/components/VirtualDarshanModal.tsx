import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, X, Heart, MessageSquare, Flame } from 'lucide-react';
import { templeAudio } from '../utils/audio';

interface VirtualDarshanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualDarshanModal: React.FC<VirtualDarshanModalProps> = ({ isOpen, onClose }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [diyaOffered, setDiyaOffered] = useState(false);
  const [flowersCount, setFlowersCount] = useState(0);
  const [prayerText, setPrayerText] = useState('');
  const [devoteePrayers, setDevoteePrayers] = useState<string[]>([
    'Ramesh from Cuttack: May Lord Jagannath bless my parents with sound health and long life.',
    'Pooja from Bangalore: Seeking divine guidance for upcoming medical exams. Jai Jagannath!',
    'Deepak from California: Bless our newborn daughter with wisdom and happiness. Haribol!',
    'Sunita from Sambalpur: Peace and joy for all devotees across the world.',
  ]);

  const [activeBesha, setActiveBesha] = useState<'daily' | 'suna' | 'hati'>('daily');

  if (!isOpen) return null;

  const handleToggleAudio = () => {
    setIsPlayingSound(!isPlayingSound);
    templeAudio.playTempleBell();
  };

  const handleOfferDiya = () => {
    setDiyaOffered(true);
    templeAudio.playTempleBell();
    setTimeout(() => {
      setDiyaOffered(false);
    }, 4000);
  };

  const handleOfferFlower = () => {
    setFlowersCount((prev) => prev + 1);
    templeAudio.playTempleBell();
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    setDevoteePrayers([`You (Just now): ${prayerText.trim()}`, ...devoteePrayers]);
    setPrayerText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 text-stone-100 rounded-2xl max-w-4xl w-full border border-amber-900/60 shadow-2xl overflow-hidden relative my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Live Sanctum Darshan & 360° Virtual Shrine
              </h3>
              <p className="text-xs text-stone-400">
                Direct Holy Stream · Ratnasinghasana, Das Jagannath Temple
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleAudio}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Chime Bell</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Stream / Sanctum Visual Stage */}
        <div className="relative bg-black flex items-center justify-center min-h-[340px] sm:min-h-[420px] overflow-hidden">
          
          {/* Subtle Golden Glow / Sanctum Atmosphere */}
          <div className="absolute inset-0 bg-radial from-amber-900/30 via-stone-950 to-black pointer-events-none" />

          {/* Diya Aarti Wave Animation Overlay if active */}
          {diyaOffered && (
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
              <div className="animate-bounce flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 animate-ping absolute" />
                <span className="text-4xl">🪔</span>
                <span className="text-xs text-amber-300 font-semibold bg-black/70 px-3 py-1 rounded-full mt-2">
                  Offering Aarti with Camphor Diya...
                </span>
              </div>
            </div>
          )}

          {/* Flowers falling animation if offered */}
          {flowersCount > 0 && (
            <div className="absolute top-4 inset-x-0 z-20 flex justify-center gap-6 pointer-events-none animate-pulse">
              <span className="text-2xl">🌸</span>
              <span className="text-2xl">🌼</span>
              <span className="text-2xl">🌺</span>
              <span className="text-2xl">🌿</span>
            </div>
          )}

          {/* The Holy Trinity Sanctum Display */}
          <div className="p-8 w-full max-w-xl text-center z-10 space-y-4">
            
            <svg viewBox="0 0 400 240" className="w-full max-w-lg mx-auto drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grand Temple Arched Sanctum with Golden Inlay */}
              <path d="M20 230 L20 110 Q200 15 380 110 L380 230" stroke="#CA8A04" strokeWidth="4" />
              <path d="M30 230 L30 115 Q200 25 370 115 L370 230" stroke="#78350F" strokeWidth="1.5" />

              {/* Nilachakra wheel */}
              <circle cx="200" cy="28" r="16" fill="#78350F" stroke="#FDE047" strokeWidth="2.5" />
              <path d="M200 12 L230 18 L200 24 Z" fill="#DC2626" />

              {/* 1. Lord Balabhadra (White Face) */}
              <g transform="translate(70, 75)">
                <path d="M15 15 L35 0 L55 15 L45 28 L25 28 Z" fill="#CA8A04" />
                <rect x="12" y="25" width="46" height="52" rx="20" fill="#FAF7F2" stroke="#B45309" strokeWidth="2" />
                <ellipse cx="26" cy="46" rx="8" ry="6" fill="#1C1917" />
                <ellipse cx="26" cy="46" rx="5" ry="3.5" fill="#FAF7F2" />
                <ellipse cx="44" cy="46" rx="8" ry="6" fill="#1C1917" />
                <ellipse cx="44" cy="46" rx="5" ry="3.5" fill="#FAF7F2" />
                <path d="M31 30 L39 30 L35 40 Z" fill="#DC2626" />
                <path d="M25 64 Q35 72 45 64" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M12 76 Q35 95 58 76" stroke="#15803D" strokeWidth="4" fill="none" />
              </g>

              {/* 2. Devi Subhadra (Golden Yellow Face) */}
              <g transform="translate(165, 85)">
                <path d="M15 12 L32 0 L49 12 L41 24 L23 24 Z" fill="#EAB308" />
                <rect x="14" y="20" width="36" height="46" rx="16" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
                <ellipse cx="25" cy="40" rx="6" ry="5" fill="#1C1917" />
                <ellipse cx="25" cy="40" rx="3.5" ry="2.5" fill="#FAF7F2" />
                <ellipse cx="39" cy="40" rx="6" ry="5" fill="#1C1917" />
                <ellipse cx="39" cy="40" rx="3.5" ry="2.5" fill="#FAF7F2" />
                <circle cx="32" cy="30" r="2.5" fill="#DC2626" />
                <path d="M25 55 Q32 61 39 55" stroke="#DC2626" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M14 65 Q32 80 50 65" stroke="#DC2626" strokeWidth="3" fill="none" />
              </g>

              {/* 3. Lord Jagannath (Black Face, Round Sacred Eyes) */}
              <g transform="translate(245, 75)">
                <path d="M15 15 L35 0 L55 15 L45 28 L25 28 Z" fill="#CA8A04" />
                <rect x="10" y="24" width="50" height="54" rx="18" fill="#1C1917" stroke="#CA8A04" strokeWidth="2" />
                <circle cx="24" cy="48" r="11" fill="#FAF7F2" />
                <circle cx="24" cy="48" r="7.5" fill="#DC2626" />
                <circle cx="24" cy="48" r="4.5" fill="#1C1917" />
                <circle cx="26" cy="46" r="1.8" fill="#FAF7F2" />

                <circle cx="46" cy="48" r="11" fill="#FAF7F2" />
                <circle cx="46" cy="48" r="7.5" fill="#DC2626" />
                <circle cx="46" cy="48" r="4.5" fill="#1C1917" />
                <circle cx="48" cy="46" r="1.8" fill="#FAF7F2" />

                <path d="M31 30 L39 30 L35 41 Z" fill="#DC2626" />
                <path d="M22 66 Q35 77 48 66" stroke="#DC2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M10 76 Q35 97 60 76" stroke="#15803D" strokeWidth="4.5" fill="none" />
              </g>

              {/* Sudarshana Chakra pillar */}
              <g transform="translate(45, 115)">
                <rect x="0" y="0" width="8" height="60" rx="3" fill="#CA8A04" />
                <circle cx="4" cy="8" r="6" fill="#DC2626" />
              </g>

              {/* Brass Diyas */}
              <g transform="translate(75, 195)">
                <path d="M4 10 Q12 18 20 10 L16 16 L8 16 Z" fill="#CA8A04" />
                <path d="M12 2 Q16 6 12 10 Q8 6 12 2 Z" fill="#F59E0B" />
              </g>
              <g transform="translate(295, 195)">
                <path d="M4 10 Q12 18 20 10 L16 16 L8 16 Z" fill="#CA8A04" />
                <path d="M12 2 Q16 6 12 10 Q8 6 12 2 Z" fill="#F59E0B" />
              </g>
            </svg>

            {/* Live stream status ticker */}
            <div className="flex items-center justify-center gap-3 text-xs text-stone-400">
              <span className="text-amber-400 font-medium">Daily Besha: Sada Besha & Tulasi Malya</span>
              <span>·</span>
              <span>Live Viewers: 2,418 Devotees Online</span>
            </div>
          </div>

          {/* Interactive Offering Action Floating Bar */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center items-center gap-3 px-4">
            <button
              type="button"
              onClick={handleOfferDiya}
              className="px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" /> Offer Aarti Diya
            </button>

            <button
              type="button"
              onClick={handleOfferFlower}
              className="px-4 py-2 rounded-full bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5" /> Pushpanjali (Offer Flowers)
            </button>
          </div>
        </div>

        {/* Bottom Half: Besha Gallery Tabs & Live Devotee Prayer Wall */}
        <div className="p-6 bg-stone-950 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Daily Besha Gallery Info */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Alankaram & Sacred Besha Gallery
            </h4>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveBesha('daily')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeBesha === 'daily' ? 'bg-amber-800 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                Sada Besha (Daily)
              </button>
              <button
                type="button"
                onClick={() => setActiveBesha('suna')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeBesha === 'suna' ? 'bg-amber-800 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                Suna Besha (Golden)
              </button>
              <button
                type="button"
                onClick={() => setActiveBesha('hati')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeBesha === 'hati' ? 'bg-amber-800 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'
                }`}
              >
                Hati Besha (Elephant)
              </button>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {activeBesha === 'daily' && 'Sada Besha: The holy deities are adorned with Khandua patta silk, fresh holy Krishna Tulasi garlands, and fragrant champa flowers.'}
              {activeBesha === 'suna' && 'Suna Besha (Rajarajeshwara): Adorned with pure gold mukuts, hands, feet, and precious diamond ornaments on auspicious full moon days.'}
              {activeBesha === 'hati' && 'Hati Besha (Gajanana): Worn on Devasnana Purnima to satisfy devotees of Lord Ganesha, donning majestic elephant head masks.'}
            </p>
          </div>

          {/* Devotee Prayer Stream */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Devotee Prayer Wall (Sankalpa Stream)
            </h4>

            {/* Scrollable Prayers */}
            <div className="max-h-24 overflow-y-auto space-y-1.5 text-xs text-stone-300 pr-2 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
              {devoteePrayers.map((prayer, i) => (
                <div key={i} className="border-b border-stone-800/80 pb-1 last:border-none">
                  {prayer}
                </div>
              ))}
            </div>

            {/* Prayer Input */}
            <form onSubmit={handleSubmitPrayer} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your prayer wish for Lord Jagannath..."
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
              >
                Send Prayer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
