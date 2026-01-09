'use client';

import Image from 'next/image';

export default function ResultsHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-4 bg-career-dark">
      {/* Menu Icon - Hamburger */}
      <button className="w-[30px] h-[22px] flex flex-col justify-between">
        <span className="w-full h-[3px] bg-white rounded-full" />
        <span className="w-full h-[3px] bg-white rounded-full" />
        <span className="w-full h-[3px] bg-white rounded-full" />
      </button>

      {/* Logo - White version */}
      <div className="flex items-center">
        <Image
          src="/images/careerlab-logo-full-white.png"
          alt="CareerLab"
          width={120}
          height={45}
          className="h-11 w-auto"
          priority
        />
      </div>

      {/* Profile Avatar with border */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-white" />
        <div className="w-full h-full rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="white"/>
            <path d="M4 20C4 16 7 14 12 14C17 14 20 16 20 20" fill="white"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
