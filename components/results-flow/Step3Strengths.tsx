'use client';

import { useState } from 'react';
import Image from 'next/image';
import NextButton from './NextButton';

interface Step3Props {
  data: {
    strengths: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step3Strengths({ data, onNext, className }: Step3Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Icons for different strength types
  const getIconForStrength = (index: number) => {
    const icons = [
      // Age icon - calendar/clock
      <svg key="age" width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto">
        <rect x="5" y="8" width="30" height="26" rx="3" stroke="#6D7BFC" strokeWidth="2" fill="none"/>
        <path d="M5 15H35" stroke="#6D7BFC" strokeWidth="2"/>
        <path d="M12 5V10" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 5V10" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="24" r="5" stroke="#6D7BFC" strokeWidth="2" fill="none"/>
        <path d="M20 22V24L22 25" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
      </svg>,
      // Experience icon - badge/medal
      <svg key="exp" width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto">
        <path d="M20 5L24 13L33 14L26.5 20.5L28 30L20 25.5L12 30L13.5 20.5L7 14L16 13L20 5Z" stroke="#6D7BFC" strokeWidth="2" fill="none"/>
      </svg>,
      // Skills icon - puzzle/lightbulb
      <svg key="skills" width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto">
        <path d="M20 6C14 6 9 11 9 17C9 21 11 24 14 26V32H26V26C29 24 31 21 31 17C31 11 26 6 20 6Z" stroke="#6D7BFC" strokeWidth="2" fill="none"/>
        <path d="M15 35H25" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 38H23" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 12V20" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 16L20 20L24 16" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ];
    return icons[index % icons.length];
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-[360px] mx-auto ${className}`}>
      {/* Strength Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/strengths-icon.svg" 
          alt="Strengths" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Your strengths <span className="italic text-career-blue-500">are...</span>
      </h1>

      {/* Carousel */}
      <div className="relative w-full flex items-center justify-center mb-6">
        {/* Left Arrow */}
        <button 
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          className={`absolute left-0 z-10 w-10 h-10 flex items-center justify-center transition-opacity ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-70'}`}
          disabled={activeIndex === 0}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <path d="M10 2L2 11L10 20" stroke="#6D7BFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Card */}
        <div className="w-[240px] bg-white rounded-[20px] p-6 shadow-card mx-10">
          <div className="flex justify-center mb-4">
            {getIconForStrength(activeIndex)}
          </div>
          <div className="bg-career-blue-500 text-white text-center py-3 px-4 rounded-xl font-semibold text-[18px] mb-4">
            {data.strengths[activeIndex]?.title || 'Strength'}
          </div>
          <p className="text-career-grey-dark text-center text-[15px] leading-relaxed">
            {data.strengths[activeIndex]?.description || 'Description'}
          </p>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => setActiveIndex(Math.min(data.strengths.length - 1, activeIndex + 1))}
          className={`absolute right-0 z-10 w-10 h-10 flex items-center justify-center transition-opacity ${activeIndex === data.strengths.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:opacity-70'}`}
          disabled={activeIndex === data.strengths.length - 1}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <path d="M2 2L10 11L2 20" stroke="#6D7BFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 mb-6">
        {data.strengths.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-career-blue-500 w-6' 
                : 'bg-career-blue-200 w-2'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="You should work on..." onClick={onNext} />
      </div>
    </div>
  );
}
