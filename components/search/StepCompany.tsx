'use client';

import { useState } from 'react';

interface StepCompanyProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const latestSearches = [
  { company: 'Google', role: 'Software Engineer', searches: 2341, logo: '/company%20icons/google-icon-svgrepo-com.svg' },
  { company: 'Apple', role: 'Product Designer', searches: 1892, logo: '/company%20icons/apple-173-svgrepo-com.svg' },
  { company: 'Microsoft', role: 'Data Scientist', searches: 1654, logo: '/company%20icons/microsoft-svgrepo-com.svg' },
  { company: 'Amazon', role: 'Product Manager', searches: 1423, logo: '/company%20icons/amazon-color-svgrepo-com.svg' },
  { company: 'Meta', role: 'ML Engineer', searches: 1287, logo: '/company%20icons/Meta_Platforms_logo.svg.png' },
  { company: 'Netflix', role: 'Backend Developer', searches: 1156, logo: '/company%20icons/512px-Netflix_2016_N_logo.svg.png' },
];

const popularCompanies = [
  'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 
  'Spotify', 'Airbnb', 'Uber', 'Tesla', 'Intesa Sanpaolo', 'UniCredit'
];

export default function StepCompany({ value, onChange, onNext, onBack }: StepCompanyProps) {
  const [isFocused, setIsFocused] = useState(false);
  const filteredCompanies = popularCompanies.filter(c => 
    c.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelectCompany = (company: string) => {
    onChange(company);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4">
      {/* Icon */}
      <div className="mb-5">
        <img
          src="/results-flow/rocket-icon.svg"
          alt="Company"
          className="w-[50px] h-auto"
        />
      </div>

      {/* Question */}
      <h2 className="text-[26px] md:text-[28px] font-medium text-career-dark text-center mb-6 leading-tight">
        In which company <span className="italic text-career-blue-500">do you want</span> to work?
      </h2>

      {/* Search Input */}
      <div className="w-full relative mb-8">
        <div className={`
          relative bg-white rounded-2xl border-2 transition-all duration-300
          ${isFocused ? 'border-[#6D7BFC] shadow-[0_0_0_4px_rgba(109,123,252,0.1)]' : 'border-[#E8EAF8]'}
        `}>
          <div className="flex items-center px-6 py-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#8D96AC] mr-4">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Type a company name..."
              className="flex-1 text-lg text-[#212746] placeholder-[#8D96AC] outline-none bg-transparent"
            />
            {value && (
              <button 
                onClick={() => onChange('')}
                className="text-[#8D96AC] hover:text-[#5A607F] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isFocused && value && filteredCompanies.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E8EAF8] shadow-lg overflow-hidden z-20">
            {filteredCompanies.slice(0, 5).map((company) => (
              <button
                key={company}
                onClick={() => handleSelectCompany(company)}
                className="w-full px-6 py-4 text-left hover:bg-[#F3F4FF] transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-[#E8EAF8] rounded-lg flex items-center justify-center text-[#6D7BFC] font-medium text-sm">
                  {company.charAt(0)}
                </div>
                <span className="text-[#212746] font-medium">{company}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Latest Searches Section */}
      <div className="w-full bg-white rounded-2xl border border-[#E8EAF8] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F3F4FF] rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6D7BFC]">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span className="font-medium text-[#212746]">Latest Searches</span>
          </div>
          <div className="flex items-center gap-2 bg-[#F1FDD1] px-4 py-2 rounded-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#212746]">
              <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 21V11C4 9.89543 4.89543 9 6 9H8" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 21V11C20 9.89543 19.1046 9 18 9H16" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 21H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-medium text-[#212746] text-sm">12,458 total searches</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latestSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSelectCompany(search.company)}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-[#F8F9FF] hover:bg-[#F3F4FF] border border-transparent hover:border-[#6D7BFC]/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0 p-2">
                <img 
                  src={search.logo} 
                  alt={search.company} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium text-[#212746] group-hover:text-[#6D7BFC] transition-colors truncate">
                  {search.company}
                </p>
                <p className="text-sm text-[#8D96AC] truncate">{search.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-[#8D96AC]">{search.searches}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full flex flex-col gap-4 mt-6 md:mt-8">
        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!value}
          className={`
            w-full max-w-md mx-auto py-3.5 md:py-4 px-8 rounded-xl font-medium text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-300
            ${value
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

