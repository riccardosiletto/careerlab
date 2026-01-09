'use client';

import { useEffect, useState } from 'react';

interface ProcessingScreenProps {
  data: {
    company: string;
    jobRole: string;
    country: string;
    seniority: [number, number];
    email: string;
  };
}

const countryNames: Record<string, string> = {
  'IT': 'Italia',
  'US': 'United States',
  'UK': 'United Kingdom',
  'DE': 'Germany',
  'FR': 'France',
  'ES': 'Spain',
  'NL': 'Netherlands',
  'CH': 'Switzerland',
};

export default function ProcessingScreen({ data }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto text-center px-4">
      {/* Animated Icon */}
      <div className="relative w-32 h-32 mb-10">
        {/* Outer ring animation */}
        <div className="absolute inset-0 border-4 border-[#E8EAF8] rounded-full" />
        <div 
          className="absolute inset-0 border-4 border-transparent border-t-[#6D7BFC] rounded-full animate-spin"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Inner circle with icon */}
        <div className="absolute inset-3 bg-gradient-to-br from-[#6D7BFC] to-[#5A68D9] rounded-full flex items-center justify-center shadow-lg shadow-[#6D7BFC]/30">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-[28px] md:text-[36px] font-medium text-[#212746] mb-3 md:mb-4">
          Thank you!
        </h2>
        <p className="text-lg md:text-xl text-[#5A607F] leading-relaxed">
          We are now analyzing the profiles of
        </p>
      </div>

      {/* Search Summary Cards */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
        <div className="bg-[#212746] text-white px-5 py-3 rounded-xl font-medium">
          {data.jobRole}
        </div>
        <span className="text-[#5A607F] self-center">in</span>
        <div className="bg-white border border-[#E8EAF8] px-5 py-3 rounded-xl font-medium text-[#212746]">
          {data.company}
        </div>
        <div className="bg-white border border-[#E8EAF8] px-5 py-3 rounded-xl font-medium text-[#212746]">
          {countryNames[data.country] || data.country}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="h-2 bg-[#E8EAF8] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#6D7BFC] to-[#D0E957] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-[#8D96AC] mt-3">
          Analyzing profiles...
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-[#F1FDD1] rounded-2xl p-6 max-w-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#212746]">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="text-[#212746] font-medium mb-1">
              This process might take up to 72 hours
            </p>
            <p className="text-[#5A607F] text-sm">
              We will notify you at <span className="font-medium text-[#6D7BFC]">{data.email}</span> when your personalized report is ready.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 md:mt-10 flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-[#8D96AC]">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Secure & Private</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-[#8D96AC] rounded-full" />
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
            <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 21V11C4 9.89543 4.89543 9 6 9H8" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 21V11C20 9.89543 19.1046 9 18 9H16" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 21H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>AI-Powered</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-[#8D96AC] rounded-full" />
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="md:w-4 md:h-4">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Email Notification</span>
        </div>
      </div>
    </div>
  );
}

