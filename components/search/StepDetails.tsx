'use client';

import { useState } from 'react';

interface StepDetailsProps {
  country: string;
  seniority: [number, number];
  onCountryChange: (value: string) => void;
  onSeniorityChange: (value: [number, number]) => void;
  onNext: () => void;
  onBack: () => void;
}

const countries = [
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
];

const seniorityLabels = ['0', '2', '5', '10', '15+'];

export default function StepDetails({ 
  country, 
  seniority, 
  onCountryChange, 
  onSeniorityChange, 
  onNext, 
  onBack 
}: StepDetailsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedCountry = countries.find(c => c.code === country);

  const handleSliderChange = (index: 0 | 1, value: number) => {
    const newSeniority: [number, number] = [...seniority] as [number, number];
    newSeniority[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > seniority[1]) {
      newSeniority[1] = value;
    } else if (index === 1 && value < seniority[0]) {
      newSeniority[0] = value;
    }
    
    onSeniorityChange(newSeniority);
  };

  const getSeniorityLabel = (value: number): string => {
    if (value >= 15) return '15+ years';
    return `${value} years`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      {/* Icon */}
      <div className="mb-5">
        <img
          src="/results-flow/strengths-icon.svg"
          alt="Details"
          className="w-[50px] h-auto"
        />
      </div>

      {/* Question */}
      <h2 className="text-[26px] md:text-[28px] font-medium text-career-dark text-center mb-6 leading-tight">
        Let's <span className="italic text-career-blue-500">refine</span> your search
      </h2>

      <div className="w-full space-y-8">
        {/* Country Selection */}
        <div className="bg-white rounded-2xl border border-[#E8EAF8] p-6">
          <label className="block text-sm font-medium text-[#5A607F] mb-4 uppercase tracking-wider">
            Country
          </label>
          
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all duration-300
                ${isDropdownOpen ? 'border-[#6D7BFC] shadow-[0_0_0_4px_rgba(109,123,252,0.1)]' : 'border-[#E8EAF8] hover:border-[#6D7BFC]/30'}
              `}
            >
              {selectedCountry ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="text-[#212746] font-medium">{selectedCountry.name}</span>
                </div>
              ) : (
                <span className="text-[#8D96AC]">Select a country...</span>
              )}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className={`text-[#8D96AC] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E8EAF8] shadow-lg overflow-hidden z-20 max-h-64 overflow-y-auto">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCountryChange(c.code);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      w-full px-5 py-4 text-left flex items-center gap-3 transition-colors
                      ${country === c.code ? 'bg-[#F3F4FF]' : 'hover:bg-[#F8F9FF]'}
                    `}
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-[#212746] font-medium">{c.name}</span>
                    {country === c.code && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="ml-auto text-[#6D7BFC]">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seniority Slider */}
        <div className="bg-white rounded-2xl border border-[#E8EAF8] p-6">
          <label className="block text-sm font-medium text-[#5A607F] mb-4 uppercase tracking-wider">
            Years of Experience
          </label>
          
          <div className="flex items-center justify-between mb-6">
            <div className="bg-[#F3F4FF] px-4 py-2 rounded-lg">
              <span className="text-[#6D7BFC] font-semibold">{getSeniorityLabel(seniority[0])}</span>
            </div>
            <div className="flex-1 mx-4 text-center text-[#8D96AC]">to</div>
            <div className="bg-[#F3F4FF] px-4 py-2 rounded-lg">
              <span className="text-[#6D7BFC] font-semibold">{getSeniorityLabel(seniority[1])}</span>
            </div>
          </div>

          {/* Custom Slider */}
          <div className="relative pt-2 pb-6">
            <div className="h-2 bg-[#E8EAF8] rounded-full relative">
              <div 
                className="absolute h-2 bg-gradient-to-r from-[#6D7BFC] to-[#9FA9FF] rounded-full"
                style={{
                  left: `${(seniority[0] / 15) * 100}%`,
                  right: `${100 - (seniority[1] / 15) * 100}%`
                }}
              />
            </div>
            
            {/* Min Slider */}
            <input
              type="range"
              min="0"
              max="15"
              value={seniority[0]}
              onChange={(e) => handleSliderChange(0, parseInt(e.target.value))}
              className="absolute top-2 w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#6D7BFC] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
            />
            
            {/* Max Slider */}
            <input
              type="range"
              min="0"
              max="15"
              value={seniority[1]}
              onChange={(e) => handleSliderChange(1, parseInt(e.target.value))}
              className="absolute top-2 w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#6D7BFC] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
            />

            {/* Labels */}
            <div className="flex justify-between mt-4 text-xs text-[#8D96AC]">
              {seniorityLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full flex flex-col gap-4 mt-8 md:mt-10">
        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!country}
          className={`
            w-full max-w-md mx-auto py-3.5 md:py-4 px-8 rounded-xl font-medium text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-300
            ${country
              ? 'bg-career-blue-500 text-white hover:bg-[#5A68D9] shadow-lg shadow-career-blue-500/20 hover:shadow-career-blue-500/30'
              : 'bg-[#E8EAF8] text-[#8D96AC] cursor-not-allowed'
            }
          `}
        >
          <span>Continue</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-10 h-10 mx-auto rounded-full bg-white border border-[#E8EAF8] flex items-center justify-center text-[#5A607F] hover:bg-career-blue-100 hover:border-career-blue-500/30 transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

