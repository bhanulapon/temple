import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, ChevronRight, Sparkles } from 'lucide-react';
import { UPCOMING_FESTIVALS } from '../data/templeData';
import { Language, FestivalEvent } from '../types';

interface FestivalsSectionProps {
  currentLang: Language;
}

export const FestivalsSection: React.FC<FestivalsSectionProps> = ({ currentLang }) => {
  const [selectedFestival, setSelectedFestival] = useState<FestivalEvent | null>(null);

  // Live countdown ticker state (for demo, calculates based on simulated festival date)
  const [countdown, setCountdown] = useState({
    days: 279,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateIcsCalendar = (fest: FestivalEvent) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Das Jagannath Temple//Festivals//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${fest.name} - Das Jagannath Temple`,
      `DESCRIPTION:${fest.description.replace(/\n/g, ' ')}`,
      `LOCATION:Das Jagannath Temple, Odisha, India`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${fest.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const grandFestival = UPCOMING_FESTIVALS[0]; // Ratha Yatra

  return (
    <section id="festivals" className="py-16 sm:py-24 bg-[#FAF7F2] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              {currentLang === 'or' ? 'ପବିତ୍ର ଯାତ୍ରା ଓ ପର୍ବପର୍ବାଣୀ' : currentLang === 'hi' ? 'पवित्र यात्रा एवं उत्सव' : 'Sacred Utsav & Pilgrimage Calendar'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
              {currentLang === 'or' ? 'ଶ୍ରୀକ୍ଷେତ୍ର ଉତ୍ସବ ସମୂହ' : currentLang === 'hi' ? 'आगामी पर्व एवं महोत्सव' : 'Upcoming Festivals & Sacred Events'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              From the cosmic spectacle of Ratha Yatra to Devasnana Purnima and Chandan Yatra, immerse yourself in the divine celebrations of Odisha’s rich Vaishnava heritage.
            </p>
          </div>
        </div>

        {/* Featured Grand Festival Spotlight Card (Ratha Yatra with Countdown) */}
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-amber-950 via-stone-900 to-[#1C1917] text-white p-6 sm:p-10 border border-amber-800/40 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Featured Grand Annual Festival</span>
                <span>·</span>
                <span>{grandFestival.tithi}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white tracking-tight">
                {grandFestival.name}
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                {grandFestival.odiaName}
              </p>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {grandFestival.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-300">
                {grandFestival.keyRituals.map((r, i) => (
                  <span key={i} className="bg-stone-800/80 px-2.5 py-1 rounded border border-stone-700">
                    {r}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => generateIcsCalendar(grandFestival)}
                  className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" /> Add to Calendar (.ics)
                </button>
              </div>
            </div>

            {/* Live Countdown Clock Widget */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-amber-900/60 rounded-xl p-6 sm:p-7 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Festival Countdown
              </span>
              <p className="text-xs text-stone-400 mb-6 font-mono">
                Scheduled for {grandFestival.date}
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Days</span>
                </div>
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Hours</span>
                </div>
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Mins</span>
                </div>
                <div className="bg-black/60 p-3 rounded-lg border border-stone-800">
                  <span className="block text-2xl sm:text-3xl font-mono font-bold text-amber-400 tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider">Secs</span>
                </div>
              </div>

              <div className="mt-5 text-xs text-stone-400 italic">
                Over 1.5 million pilgrims gather in sacred fellowship.
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {UPCOMING_FESTIVALS.slice(1).map((fest) => (
            <div
              key={fest.id}
              className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                  <span className="font-mono text-amber-800 font-semibold">{fest.monthString}</span>
                  <span className="text-stone-400 font-mono tabular-nums">{fest.daysRemaining} days left</span>
                </div>

                <h4 className="font-heading text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {fest.name}
                </h4>
                <p className="text-xs text-stone-500 font-medium">
                  {fest.odiaName}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {fest.description}
                </p>

                <div className="pt-2 text-[11px] text-stone-500">
                  <strong className="text-stone-700">Tithi:</strong> {fest.tithi}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedFestival(fest)}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Ritual Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => generateIcsCalendar(fest)}
                  title="Add to calendar"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Festival Details Modal */}
        {selectedFestival && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-stone-200 shadow-2xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase text-amber-800 tracking-wider">
                    {selectedFestival.monthString} · {selectedFestival.tithi}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-stone-900 mt-1">
                    {selectedFestival.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">{selectedFestival.odiaName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFestival(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-stone-700 text-sm leading-relaxed border-t border-b border-stone-100 py-4">
                <p>{selectedFestival.description}</p>
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">Key Vedic Rituals:</span>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                    {selectedFestival.keyRituals.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => generateIcsCalendar(selectedFestival)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Add to Calendar (.ics)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFestival(null)}
                  className="px-5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
