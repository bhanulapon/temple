import React, { useState } from 'react';
import { Clock, Sun, Moon, Sparkles, Bell, LayoutGrid, List } from 'lucide-react';
import { AARTI_SCHEDULE, TEMPLE_INFO } from '../data/templeData';
import { Language, AartiTiming } from '../types';
import { templeAudio } from '../utils/audio';

interface ScheduleSectionProps {
  currentLang: Language;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ currentLang }) => {
  const [filterSession, setFilterSession] = useState<'all' | 'morning' | 'evening'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedTiming, setSelectedTiming] = useState<AartiTiming | null>(null);

  const filteredTimings = AARTI_SCHEDULE.filter((item) => {
    if (filterSession === 'all') return true;
    return item.session === filterSession;
  });

  const handleRingAartiBell = (e: React.MouseEvent) => {
    e.stopPropagation();
    templeAudio.playTempleBell();
  };

  return (
    <section id="schedule" className="py-16 sm:py-24 bg-[#FAF7F2] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              {currentLang === 'or' ? 'ନିତ୍ୟ ଦୈନିକ ନୀତି ଓ ଆଳତି ନିର୍ଘଣ୍ଟ' : currentLang === 'hi' ? 'दैनिक नित्य नीति व आरती समय सारणी' : 'Ritual Order & Daily Darshan'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
              {currentLang === 'or' ? 'ଶ୍ରୀମନ୍ଦିର ଦୈନନ୍ଦିନ ସମୟ ସାରଣୀ' : currentLang === 'hi' ? 'दैनिक दर्शन एवं आरती समय' : 'Daily Darshan & Aarti Timings'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              The sacred rituals begin at Mangala Alati (06:00 AM) and culminate at Ratri Pahuda (09:00 PM). The temple welcomes public darshan during morning (6:00 AM – 2:00 PM) and evening (4:00 PM – 9:00 PM) sessions.
            </p>
          </div>

          {/* Operational Hours Badge Card */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-stone-800 space-y-2 shrink-0">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Temple Operational Windows</span>
            </div>
            <div className="text-stone-600 space-y-1 text-xs">
              <div><strong className="text-stone-800">Morning Session:</strong> {TEMPLE_INFO.darshanMorning}</div>
              <div><strong className="text-stone-800">Evening Session:</strong> {TEMPLE_INFO.darshanEvening}</div>
              <div><strong className="text-stone-800">Pahuda (Doors Closed):</strong> {TEMPLE_INFO.pahudaRest}</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          {/* Segmented Controls for Sessions */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => setFilterSession('all')}
              className={`px-3.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterSession === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Rituals (11)
            </button>
            <button
              type="button"
              onClick={() => setFilterSession('morning')}
              className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterSession === 'morning'
                  ? 'bg-white text-amber-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Morning (6 AM – 2 PM)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterSession('evening')}
              className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterSession === 'evening'
                  ? 'bg-white text-indigo-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Evening (4 PM – 9 PM)</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-stone-200 rounded-lg p-1 bg-white text-xs">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'cards' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Grid card view"
              aria-label="Grid card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-amber-100/80 text-amber-900' : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode: Cards View */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimings.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTiming(item)}
                className={`group bg-white rounded-xl border p-6 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                  item.isSpecial
                    ? 'border-amber-300/80 bg-gradient-to-b from-amber-50/30 to-white'
                    : 'border-stone-200'
                }`}
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-100">
                    <span className="font-mono font-semibold text-amber-800 text-sm tracking-tight tabular-nums">
                      {item.time}
                    </span>
                    <span className="text-stone-400">
                      {item.session === 'morning' ? 'Morning Session' : 'Evening Session'}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="pt-4">
                    <h3 className="font-heading text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                      {item.odiaName}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer with ritual significance and bell action */}
                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 italic line-clamp-1 pr-2">
                    {item.importance}
                  </span>
                  <button
                    type="button"
                    onClick={handleRingAartiBell}
                    title="Ring aarti bell"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-700 hover:bg-amber-50 transition-colors shrink-0 cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode: Clean Accessible Table View */
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-700">
                <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Time</th>
                    <th className="px-6 py-4 font-semibold">Ritual Name</th>
                    <th className="px-6 py-4 font-semibold">Sacred Description</th>
                    <th className="px-6 py-4 font-semibold">Significance</th>
                    <th className="px-4 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80">
                  {filteredTimings.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedTiming(item)}
                    >
                      <td className="px-6 py-4 font-mono font-semibold text-amber-800 tabular-nums whitespace-nowrap">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-heading font-bold text-stone-900">{item.name}</div>
                        <div className="text-xs text-stone-500">{item.odiaName}</div>
                      </td>
                      <td className="px-6 py-4 text-xs sm:text-sm text-stone-600 max-w-md">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-xs text-stone-500 italic max-w-xs">
                        {item.importance}
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={handleRingAartiBell}
                          className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Bell className="w-3 h-3" /> Chime
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for detailed ritual insight if clicked */}
        {selectedTiming && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-stone-200 shadow-2xl relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-semibold text-amber-800 tabular-nums">
                    {selectedTiming.time} · {selectedTiming.session === 'morning' ? 'Morning Session' : 'Evening Session'}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-stone-900 mt-1">
                    {selectedTiming.name}
                  </h3>
                  <p className="text-sm text-stone-500 font-medium">{selectedTiming.odiaName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTiming(null)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-stone-700 text-sm leading-relaxed border-t border-b border-stone-100 py-4">
                <p>{selectedTiming.description}</p>
                <div className="bg-amber-50/70 p-3.5 rounded-lg border border-amber-200/60 text-xs text-amber-950">
                  <strong>Sacred Benefit:</strong> {selectedTiming.importance}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    handleRingAartiBell(e);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" /> Ring Aarti Bell
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTiming(null)}
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
