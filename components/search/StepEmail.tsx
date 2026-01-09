'use client';

import { useState } from 'react';

interface StepEmailProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function StepEmail({ value, onChange, onSubmit, onBack }: StepEmailProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (isValidEmail(value)) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto px-4">
      {/* Icon */}
      <div className="mb-5">
        <img
          src="/results-flow/learning-icon.svg"
          alt="Your report"
          className="w-[50px] h-auto"
        />
      </div>

      {/* Question */}
      <h2 className="text-[26px] md:text-[28px] font-medium text-career-dark text-center mb-6 leading-tight">
        Where should we <span className="italic text-career-blue-500">send</span> your report?
      </h2>

      {/* Email Input */}
      <div className="w-full mb-6">
        <div className={`
          relative bg-white rounded-2xl border-2 transition-all duration-300
          ${isFocused ? 'border-[#6D7BFC] shadow-[0_0_0_4px_rgba(109,123,252,0.1)]' : 'border-[#E8EAF8]'}
          ${value && !isValidEmail(value) ? 'border-red-300' : ''}
        `}>
          <div className="flex items-center px-6 py-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#8D96AC] mr-4">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="email"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your.email@example.com"
              className="flex-1 text-lg text-[#212746] placeholder-[#8D96AC] outline-none bg-transparent"
            />
            {value && isValidEmail(value) && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#B6DC00]">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
        {value && !isValidEmail(value) && (
          <p className="text-red-500 text-sm mt-2 ml-2">Please enter a valid email address</p>
        )}
      </div>

      {/* Privacy Note */}
      <div className="flex items-start gap-3 bg-[#F8F9FF] rounded-xl p-4 mb-8 w-full">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#6D7BFC] mt-0.5 flex-shrink-0">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-sm text-[#5A607F]">
          Your email is safe with us. We'll only use it to send you the report and important updates about your search.
        </p>
      </div>

      {/* Buttons Container */}
      <div className="w-full flex flex-col gap-4">
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValidEmail(value)}
          className={`
            w-full py-4 md:py-5 px-8 rounded-xl font-medium text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-300
            ${isValidEmail(value)
              ? 'bg-gradient-to-r from-career-blue-500 to-[#5A68D9] text-white hover:shadow-xl hover:shadow-career-blue-500/30 hover:scale-[1.02]'
              : 'bg-[#E8EAF8] text-[#8D96AC] cursor-not-allowed'
            }
          `}
        >
          <span>Generate My Report</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

