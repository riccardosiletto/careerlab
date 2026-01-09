'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step7Props {
  data: {
    salary: { min: number; max: number };
    bonus: { min: number; max: number };
    salaryIncreaseYears: number;
  };
  onNext: () => void;
  className?: string;
}

export default function Step7Career({ data, onNext, className }: Step7Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Astronaut Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/astronaut-icon.svg" 
          alt="Career" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Career prospects <span className="italic text-career-blue-500">include...</span>
      </h1>

      {/* Salary Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card mb-4">
        <p className="text-career-grey-dark text-center text-[16px] mb-4">
          Expected salary range:
        </p>
        
        {/* Salary Range */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-career-green-500 px-5 py-3 rounded-xl">
            <p className="text-career-dark font-bold text-[24px]">${data.salary.min}K</p>
          </div>
          <span className="text-career-grey-dark text-[18px]">-</span>
          <div className="bg-career-green-500 px-5 py-3 rounded-xl">
            <p className="text-career-dark font-bold text-[24px]">${data.salary.max}K</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-career-blue-100 my-4" />

        {/* Bonus Range */}
        <p className="text-career-grey-dark text-center text-[16px] mb-3">
          Typical bonus:
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="bg-career-blue-100 px-4 py-2 rounded-lg">
            <p className="text-career-blue-500 font-semibold text-[18px]">${data.bonus.min}K</p>
          </div>
          <span className="text-career-grey-dark">-</span>
          <div className="bg-career-blue-100 px-4 py-2 rounded-lg">
            <p className="text-career-blue-500 font-semibold text-[18px]">${data.bonus.max}K</p>
          </div>
        </div>
      </div>

      {/* Salary Increase Card */}
      <div className="bg-white rounded-[20px] p-5 w-full shadow-card">
        <div className="flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H10M17 7V14" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-career-dark text-[16px]">
            Average salary increase in <span className="font-semibold text-career-blue-500">{data.salaryIncreaseYears} years</span>
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="How to move up" onClick={onNext} />
      </div>
    </div>
  );
}
