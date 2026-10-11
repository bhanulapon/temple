import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Phone, MapPin, Printer, Sparkles, X } from 'lucide-react';
import { SPECIAL_SEVAS } from '../data/templeData';
import { Language, SevaItem, SevaBookingReceipt } from '../types';

interface SevaSectionProps {
  currentLang: Language;
  onBookSevaDirectly?: (sevaId: string) => void;
}

export const SevaSection: React.FC<SevaSectionProps> = ({ currentLang }) => {
  const [selectedSeva, setSelectedSeva] = useState<SevaItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'archana' | 'bhoga' | 'special' | 'abhisheka'>('all');
  
  // Booking Form State
  const [devoteeName, setDevoteeName] = useState('');
  const [gotra, setGotra] = useState('Kashyapa');
  const [customGotra, setCustomGotra] = useState('');
  const [nakshatra, setNakshatra] = useState('');
  const [rashi, setRashi] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [sankalpaWish, setSankalpaWish] = useState('Family Health, Peace & Prosperity');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  // Generated Confirmation Receipt
  const [confirmedReceipt, setConfirmedReceipt] = useState<SevaBookingReceipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSevas = SPECIAL_SEVAS.filter((seva) => {
    if (activeCategory === 'all') return true;
    return seva.category === activeCategory;
  });

  const handleOpenBooking = (seva: SevaItem) => {
    setSelectedSeva(seva);
    setConfirmedReceipt(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeva || !devoteeName || !phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedReceipt: SevaBookingReceipt = {
        bookingId: `DAS-JAG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        sevaName: selectedSeva.name,
        devoteeName,
        gotra: gotra === 'Other' ? customGotra || 'Kashyapa' : gotra,
        nakshatra: nakshatra || 'Rohini',
        date: bookingDate,
        slot: selectedSeva.timingSlot,
        amount: selectedSeva.contribution,
        priestAssigned: 'Pandit Jagannath Dash Mohapatra (Pradhana Sevayat)',
        reportingGate: 'Gate #2 (Singhadwara North Veranda, Counter #4)',
        reportingTime: '30 minutes prior to scheduled aarti slot',
        paymentMode: 'Temple Hundi / Digital UPI Gateway',
        status: 'CONFIRMED',
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setConfirmedReceipt(generatedReceipt);
      setIsSubmitting(false);
    }, 700);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const gotraOptions = [
    'Kashyapa',
    'Bharadwaja',
    'Vashishta',
    'Sandilya',
    'Gautama',
    'Parashara',
    'Harita',
    'Garga',
    'Kaushika',
    'Atri',
    'Other',
  ];

  const sankalpaOptions = [
    'Family Health, Peace & Prosperity',
    'Birthday & Ayushya Blessings',
    'Wedding Anniversary & Dampatya Sukha',
    'Academic & Professional Success',
    'Ancestral Blessings & Pitru Shanti',
    'Removal of Graha Dosha & Obstacles',
  ];

  return (
    <section id="sevas" className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-800">
              {currentLang === 'or' ? 'ଅନଲାଇନ୍ ପୂଜା ଓ ସେବା ବୁକିଂ' : currentLang === 'hi' ? 'ऑनलाइन पूजा एवं सेवा बुकिंग' : 'Online Seva & Vedic Archana'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-stone-900 tracking-tight">
              {currentLang === 'or' ? 'ମହାପ୍ରଭୁଙ୍କ ପବିତ୍ର ସେବା ସମୂହ' : currentLang === 'hi' ? 'विशेष पूजा एवं सेवा बुकिंग' : 'Special Poojas & Sankalpa Offerings'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Book traditional Vedic rituals performed by initiated Sevayats in your name and Gotra. Devotees receive instant digital booking confirmation, and blessed Nirmalya Mahaprasad is handed in person or dispatched to your address.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs sm:text-sm font-medium shrink-0">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Sevas ({SPECIAL_SEVAS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('archana')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'archana' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Archana
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('bhoga')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'bhoga' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mahaprasad Bhog
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('special')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'special' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Flag & VIP Darshan
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('abhisheka')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeCategory === 'abhisheka' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Havan & Yajna
            </button>
          </div>
        </div>

        {/* Seva Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {filteredSevas.map((seva) => (
            <div
              key={seva.id}
              className="bg-[#FAF7F2]/60 rounded-xl border border-stone-200/90 p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                {/* Unboxed Metadata Line */}
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200/60">
                  <span className="flex items-center gap-1 font-medium text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{seva.duration}</span>
                  </span>
                  <span className="text-amber-800 font-medium">
                    Slot: {seva.timingSlot.split('(')[0]}
                  </span>
                </div>

                {/* Seva Name */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {seva.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    {seva.odiaName}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {seva.description}
                </p>

                {/* Offerings list */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Offerings Included:
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1.5">
                    {seva.offeringsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Contribution & Action */}
              <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Suggested Seva Dakshina</span>
                  <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                    ₹{seva.contribution.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(seva)}
                  className="px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-600"
                >
                  Book This Seva
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Booking Modal */}
        {selectedSeva && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl my-8 relative">
              
              <div className="flex items-start justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
                    {confirmedReceipt ? 'Booking Confirmed' : 'Vedic Seva Registration'}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-stone-900 mt-1">
                    {selectedSeva.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Suggested Contribution: <strong className="text-stone-900">₹{selectedSeva.contribution.toLocaleString('en-IN')}</strong> · {selectedSeva.duration}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => { setSelectedSeva(null); setConfirmedReceipt(null); }}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!confirmedReceipt ? (
                /* Interactive Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Devotee Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Primary Devotee Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Chandra Das"
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40"
                      />
                    </div>

                    {/* Gotra Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Devotee Gotra <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={gotra}
                        onChange={(e) => setGotra(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-white"
                      >
                        {gotraOptions.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      {gotra === 'Other' && (
                        <input
                          type="text"
                          placeholder="Enter your Gotra"
                          value={customGotra}
                          onChange={(e) => setCustomGotra(e.target.value)}
                          className="mt-2 w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                        />
                      )}
                    </div>

                    {/* Nakshatra & Rashi */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Janma Nakshatra (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rohini, Pushya, Ashwini"
                        value={nakshatra}
                        onChange={(e) => setNakshatra(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Janma Rashi (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vrishabha, Mesha, Kanya"
                        value={rashi}
                        onChange={(e) => setRashi(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40"
                      />
                    </div>

                    {/* Booking Date */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Seva Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-white font-mono"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp / Mobile No. <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40 font-mono"
                      />
                    </div>
                  </div>

                  {/* Sankalpa Intention */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Sankalpa Intention / Prayer Cause
                    </label>
                    <select
                      value={sankalpaWish}
                      onChange={(e) => setSankalpaWish(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-white"
                    >
                      {sankalpaOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Family Members */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Additional Family Names for Sankalpa (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Smt. Priyadarshini Das (Wife), Soumya Das (Son)"
                      value={familyMembers}
                      onChange={(e) => setFamilyMembers(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40"
                    />
                  </div>

                  {/* Address for Nirmalya */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Postal Address (For consecrated Nirmalya Prasad delivery)
                    </label>
                    <input
                      type="text"
                      placeholder="House / Apartment, Street, City, Pin Code"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm bg-[#FAF7F2]/40"
                    />
                  </div>

                  {/* Notice & Submit Action */}
                  <div className="bg-amber-50 rounded-xl p-3.5 text-xs text-amber-950 border border-amber-200">
                    <strong>Pilgrim Note:</strong> An instant digital pass with token number will be issued. Reporting instructions and priest assignment will be confirmed immediately.
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSeva(null)}
                      className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Consecrating Sankalpa...</span>
                      ) : (
                        <span>Confirm & Generate Seva Pass (₹{selectedSeva.contribution.toLocaleString('en-IN')})</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Consecrated Seva Pass Receipt View */
                <div className="space-y-6">
                  <div className="border border-amber-300 bg-amber-50/40 rounded-xl p-6 relative print:border-black print:bg-white">
                    {/* Watermark/Emblem */}
                    <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-amber-900 font-bold">
                          Das Jagannath Temple, Odisha
                        </div>
                        <div className="text-xl font-heading font-bold text-stone-900">
                          Official Vedic Seva Pass
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                          {confirmedReceipt.bookingId}
                        </span>
                        <div className="text-[11px] text-stone-500 mt-1">Status: CONFIRMED</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs py-4 border-b border-amber-200/80">
                      <div>
                        <span className="text-stone-500 block">Devotee Name:</span>
                        <strong className="text-stone-900 text-sm">{confirmedReceipt.devoteeName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Gotra / Nakshatra:</span>
                        <strong className="text-stone-900">{confirmedReceipt.gotra} / {confirmedReceipt.nakshatra}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Seva Date:</span>
                        <strong className="text-stone-900 font-mono">{confirmedReceipt.date}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Seva Category:</span>
                        <strong className="text-stone-900">{confirmedReceipt.sevaName}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Assigned Panda/Priest:</span>
                        <strong className="text-stone-900">{confirmedReceipt.priestAssigned}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Contribution Paid:</span>
                        <strong className="text-amber-900 font-bold text-sm font-mono">₹{confirmedReceipt.amount}</strong>
                      </div>
                    </div>

                    <div className="pt-3 text-xs space-y-1.5 text-stone-700">
                      <div><strong>Reporting Gate:</strong> {confirmedReceipt.reportingGate}</div>
                      <div><strong>Reporting Time:</strong> {confirmedReceipt.reportingTime}</div>
                      <div className="text-[11px] text-stone-500 italic pt-1">
                        Please show this digital pass on your mobile or present a printed copy at Counter #4.
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrintReceipt}
                      className="px-4.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / Save Pass (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedSeva(null); setConfirmedReceipt(null); }}
                      className="px-6 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Done (Jai Jagannath)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
