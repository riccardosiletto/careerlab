'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header className="bg-[#212746] flex items-center justify-between pr-10 py-3">
      {/* Logo - Aligned with sidebar content */}
      <div className="w-[286px] flex items-center pl-6">
        <Link href="/" className="block h-12 w-[124px] relative">
          <Image
            src="/images/careerlab-logo-full-white.png"
            alt="CareerLab"
            fill
            className="object-contain"
          />
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Go Premium Button */}
        <Link 
          href="#" 
          className="flex items-center gap-3 px-6"
        >
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L12.9389 6.90983L20 8.54102L15 14.0902L15.8779 21.541L10 18.09L4.12215 21.541L5 14.0902L0 8.54102L7.06107 6.90983L10 0Z" fill="#D0E957"/>
          </svg>
          <span className="font-medium text-base text-[#D0E957] leading-[18px]">
            Go Premium
          </span>
        </Link>
        
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#6D7BFC] ring-2 ring-white/30 ring-offset-2 ring-offset-[#212746]" />
      </div>
    </header>
  );
}




