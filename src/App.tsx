/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScheduleSection } from './components/ScheduleSection';
import { SevaSection } from './components/SevaSection';
import { FestivalsSection } from './components/FestivalsSection';
import { DonationSection } from './components/DonationSection';
import { VisitorGuidelines } from './components/VisitorGuidelines';
import { TempleHeritage } from './components/TempleHeritage';
import { VirtualDarshanModal } from './components/VirtualDarshanModal';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isVirtualDarshanOpen, setIsVirtualDarshanOpen] = useState(false);

  const handleOpenBooking = () => {
    const el = document.getElementById('sevas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDonation = () => {
    const el = document.getElementById('ehundi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenDonation={handleOpenDonation}
          onOpenVirtualDarshan={() => setIsVirtualDarshanOpen(true)}
          currentLang={currentLang}
        />

        {/* Daily Darshan & Aarti Timings */}
        <ScheduleSection currentLang={currentLang} />

        {/* Online Seva & Pooja Booking */}
        <SevaSection currentLang={currentLang} />

        {/* Upcoming Festivals & Events */}
        <FestivalsSection currentLang={currentLang} />

        {/* E-Hundi & 80G Donations */}
        <DonationSection currentLang={currentLang} />

        {/* Temple History & Kalinga Architecture */}
        <TempleHeritage currentLang={currentLang} />

        {/* Visitor Guidelines & Temple Etiquette */}
        <VisitorGuidelines currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Virtual Darshan & 360 Shrine Modal */}
      <VirtualDarshanModal
        isOpen={isVirtualDarshanOpen}
        onClose={() => setIsVirtualDarshanOpen(false)}
      />
    </div>
  );
}
