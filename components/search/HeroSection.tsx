'use client';

interface HeroSectionProps {
  onBegin: () => void;
  onJoinWaitlist: () => void;
}

export default function HeroSection({ onBegin, onJoinWaitlist }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
      {/* Main Headline */}
      <h1 className="text-[32px] md:text-[52px] leading-[1.15] font-medium text-[#212746] mb-8 md:mb-12">
        Find{' '}
        <span className="relative inline-block">
          <span className="relative z-10 text-[#6D7BFC]">what it takes</span>
          <svg 
            className="absolute -bottom-1 md:-bottom-2 left-0 w-full" 
            height="12" 
            viewBox="0 0 200 12" 
            fill="none"
            preserveAspectRatio="none"
          >
            <path 
              d="M2 8C50 2 150 2 198 8" 
              stroke="#D0E957" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
          </svg>
        </span>
        <br />
        to land your dream job
      </h1>

      {/* Choice Boxes */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full max-w-3xl">
        {/* Left Box - Search by Job Role */}
        <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(109,123,252,0.08)] border-2 border-[#E8EAF8] hover:border-[#6D7BFC]/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(109,123,252,0.15)] group relative overflow-hidden">
          {/* Green accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D0E957]/20 to-transparent rounded-bl-full" />
          
          <div className="flex flex-col items-center gap-5 md:gap-6 relative z-10">
            {/* Icon */}
            <div className="mb-2">
              <img
                src="/results-flow/rocket-icon.svg"
                alt="Search by job role"
                className="w-[50px] h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-medium text-[#212746] mb-1 md:mb-2">Search by job role</h3>
              <p className="text-[#5A607F] text-sm">Discover career insights for any position</p>
            </div>

            {/* Button */}
            <button
              onClick={onBegin}
              className="w-full bg-[#6D7BFC] hover:bg-[#5A68D9] text-white font-medium py-3.5 md:py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#6D7BFC]/20 hover:shadow-[#6D7BFC]/30 group-hover:scale-[1.02]"
            >
              <span>Begin</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5L19 12L8 19V5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Box - Search by Degree */}
        <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border-2 border-[#E8EAF8] relative overflow-hidden group hover:border-[#D0E957]/40 transition-all duration-300">
          {/* Green accent corner */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#D0E957]/15 to-transparent rounded-br-full" />
          
          {/* Coming Soon Badge */}
          <div className="absolute top-4 right-4 bg-[#F1FDD1] text-[#5A607F] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#B6DC00] rounded-full animate-pulse" />
            Coming Soon
          </div>
          
          <div className="flex flex-col items-center gap-5 md:gap-6 relative z-10">
            {/* Icon */}
            <div className="mb-2">
              <img
                src="/results-flow/degree-icon.svg"
                alt="Search by degree"
                className="w-[50px] h-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-medium text-[#212746] mb-1 md:mb-2">Search by degree</h3>
              <p className="text-[#5A607F] text-sm">Find careers matching your education</p>
            </div>

            {/* Button */}
            <button
              onClick={onJoinWaitlist}
              className="w-full bg-[#E8EAF8] hover:bg-[#DCDFFF] text-[#5A607F] font-medium py-3.5 md:py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Join Waitlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-10 md:mt-12 text-sm text-[#8D96AC]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#D0E957] rounded-full" />
          <span><span className="font-semibold text-[#212746]">12,458</span> searches made</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-[#8D96AC] rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#6D7BFC] rounded-full" />
          <span><span className="font-semibold text-[#212746]">3,200+</span> companies</span>
        </div>
        <div className="hidden md:block w-1 h-1 bg-[#8D96AC] rounded-full" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#D0E957] rounded-full" />
          <span><span className="font-semibold text-[#212746]">150+</span> job roles</span>
        </div>
      </div>
    </div>
  );
}
