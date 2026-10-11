import React from 'react';

export const JagannathFaceIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Halo */}
    <circle cx="50" cy="50" r="48" fill="#C2410C" />
    <circle cx="50" cy="50" r="43" fill="#CA8A04" stroke="#FAF7F2" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="39" fill="#1C1917" />
    
    {/* Left Eye */}
    <circle cx="33" cy="46" r="13" fill="#FAF7F2" stroke="#CA8A04" strokeWidth="1" />
    <circle cx="33" cy="46" r="8.5" fill="#DC2626" />
    <circle cx="33" cy="46" r="5" fill="#1C1917" />
    <circle cx="35" cy="44" r="2" fill="#FAF7F2" />

    {/* Right Eye */}
    <circle cx="67" cy="46" r="13" fill="#FAF7F2" stroke="#CA8A04" strokeWidth="1" />
    <circle cx="67" cy="46" r="8.5" fill="#DC2626" />
    <circle cx="67" cy="46" r="5" fill="#1C1917" />
    <circle cx="69" cy="44" r="2" fill="#FAF7F2" />

    {/* Sacred Tilak */}
    <path d="M43 24 L57 24 L50 40 Z" fill="#DC2626" />
    <circle cx="50" cy="43" r="2.5" fill="#CA8A04" />

    {/* Divine Sacred Smile */}
    <path d="M33 68 Q50 82 67 68" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M33 68 Q50 78 67 68" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const NilachakraIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="14" fill="currentColor" />
    {/* 8 spokes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 34 * Math.cos((angle * Math.PI) / 180)}
        y2={50 + 34 * Math.sin((angle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="4"
      />
    ))}
  </svg>
);

export const DiyaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C10 5 8 7 8 9a4 4 0 0 0 8 0c0-2-2-4-4-7z" fill="currentColor" fillOpacity="0.3" />
    <path d="M4 14c0 4.418 3.582 8 8 8s8-3.582 8-8c0-1.5-1-2.5-3-3H7c-2 0.5-3 1.5-3 3z" />
    <path d="M2 14h20" />
  </svg>
);

export const ConchIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6c-2-2-6-3-9-1s-5 6-4 9 5 6 9 6 7-3 7-7c0-3-1-5-3-7z" />
    <path d="M14 6c-1 3-3 6-6 7" />
    <path d="M18 10c-1.5 2-4 4-7 4.5" />
    <circle cx="8" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

export const KuduaPotIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="7" ry="2" />
    <path d="M5 5c0 4-2 7-2 11a6 6 0 0 0 12 0c0-4-2-7-2-11" />
    <path d="M5 11h14" strokeDasharray="2 2" />
    <circle cx="12" cy="16" r="2" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const TempleTowerIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2 4v4l-4 0v-4z" />
    <path d="M8 10h8l1 6H7z" />
    <path d="M5 16h14l1 6H4z" />
    <path d="M10 22v-3a2 2 0 0 1 4 0v3" />
    <line x1="12" y1="1" x2="12" y2="2" />
  </svg>
);
