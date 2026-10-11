import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { TEMPLE_INFO } from '../data/templeData';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      
      {/* Upper Footer: Directions & Maps Guidance Strip */}
      <div className="border-b border-stone-800/80 bg-stone-950/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Map Guidance Info */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                Pilgrim Location & Directions
              </span>
              <h3 className="text-2xl font-heading font-bold text-white">
                How to Reach Das Jagannath Temple
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Situated along the sacred Puri–Bhubaneswar corridor in Odisha. Conveniently connected by road, rail, and air.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-300">
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <strong className="text-white block">✈️ By Air:</strong>
                  <span>Bhubaneswar Airport (BBI) – 42 km via NH-316 highway.</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 space-y-1">
                  <strong className="text-white block">🚆 By Rail:</strong>
                  <span>Puri Railway Terminal – 18 km / Bhubaneswar Station – 39 km.</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Jagannath+Temple+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Live GPS Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-stone-800 bg-stone-900 p-2 shadow-lg">
                <div className="relative h-64 rounded-lg bg-[#272624] overflow-hidden flex flex-col justify-between p-5 text-stone-200">
                  {/* Subtle Grid and Map roads representation */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="100%" y2="50" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="0" y1="130" x2="100%" y2="130" stroke="#FAF7F2" strokeWidth="3" />
                    <line x1="120" y1="0" x2="120" y2="100%" stroke="#FAF7F2" strokeWidth="2" />
                    <line x1="260" y1="0" x2="260" y2="100%" stroke="#FAF7F2" strokeWidth="3" strokeDasharray="6 6" />
                  </svg>

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="bg-stone-950/80 px-3 py-1.5 rounded-md border border-stone-700 text-xs text-amber-300">
                      Grand Road Corridor · Odisha
                    </div>
                    <span className="text-xs text-stone-400 font-mono">20.2961° N, 85.8245° E</span>
                  </div>

                  {/* Pin */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div className="w-10 h-10 rounded-full bg-amber-600 border-2 border-white flex items-center justify-center text-white shadow-xl animate-bounce">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="mt-1.5 text-xs font-heading font-bold text-white bg-black/80 px-2.5 py-0.5 rounded shadow">
                      Das Jagannath Temple, Odisha
                    </span>
                  </div>

                  <div className="relative z-10 text-[11px] text-stone-400 flex justify-between items-center bg-stone-950/70 p-2 rounded">
                    <span>Singhadwara Gate Parking: 200m</span>
                    <span className="text-emerald-400 font-medium">Free Devotee Parking Available</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Trust Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xl font-heading font-bold text-white tracking-tight">
              Das Jagannath Temple
            </h4>
            <p className="text-xs text-amber-400 font-medium">
              {TEMPLE_INFO.nameOdia} · {TEMPLE_INFO.state}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving pilgrims worldwide under the divine guidance of Shri Jagannath Sanskruti Sevayat Trust. Dedicated to preservation of Vedic rites, Anna Daan, and holy Utkala traditions.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Trust Reg: <strong className="text-stone-300">{TEMPLE_INFO.regNumber}</strong></span>
              </div>
              <div className="text-[11px] text-stone-400 pl-6">
                Section 80G Approval: CIT(E)/OD/80G/2021-22/A-412
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Sacred Portals
            </h5>
            <ul className="text-xs text-stone-400 space-y-2">
              <li><a href="#schedule" className="hover:text-white transition-colors">Daily Aarti Schedule</a></li>
              <li><a href="#sevas" className="hover:text-white transition-colors">Online Seva Booking</a></li>
              <li><a href="#festivals" className="hover:text-white transition-colors">Ratha Yatra Calendar</a></li>
              <li><a href="#ehundi" className="hover:text-white transition-colors">E-Hundi (Anna Daan)</a></li>
              <li><a href="#etiquette" className="hover:text-white transition-colors">Dress Code & Lockers</a></li>
              <li><a href="#heritage" className="hover:text-white transition-colors">Kalinga Architecture</a></li>
            </ul>
          </div>

          {/* Contact Helpline */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Pilgrim Support & Desk
            </h5>
            <ul className="text-xs text-stone-400 space-y-2.5">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-300 font-medium">General Helpdesk:</span>
                  <span>{TEMPLE_INFO.phoneHelpdesk}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-300 font-medium">Pradhana Sevayat Priest Helpline:</span>
                  <span>{TEMPLE_INFO.priestHelpline}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-300 font-medium">Seva Desk Email:</span>
                  <span>{TEMPLE_INFO.email}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup for Festival Panchang */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Festival & Ekadashi Alerts
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive auspicious Panchang notifications, Ekadashi vrat reminders, and live darshan bulletins directly to your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-l-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-r-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Strictly spiritual updates. No marketing emails.
                </span>
              </form>
            ) : (
              <div className="bg-amber-950/60 border border-amber-800/80 p-3 rounded-lg text-xs text-amber-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Jai Jagannath! You are now subscribed for festival updates.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright and Devotional Inscription */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Das Jagannath Temple Religious & Charitable Trust, Odisha. All rights reserved.
          </div>
          <div className="font-serif italic text-stone-400">
            « ଜୟ ଜଗନ୍ନାଥ ସ୍ୱାମୀ ନୟନ ପଥଗାମୀ ଭବତୁ ମେ »
          </div>
        </div>
      </div>
    </footer>
  );
};
