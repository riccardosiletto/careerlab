'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step2Props {
  data: {
    matchPercentage: number;
    role: string;
    company: string;
    country: string;
  };
  onNext: () => void;
  className?: string;
}

export default function Step2ProfileMatch({ data, onNext, className }: Step2Props) {
  const percentage = data.matchPercentage;
  
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Profile Match Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/profile-match-icon.png" 
          alt="Profile Match" 
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Your profile <span className="italic text-career-blue-500">matches...</span>
      </h1>

      {/* Match Card */}
      <div className="bg-white rounded-[20px] p-7 w-full shadow-card">
        {/* Gauge */}
        <div className="relative flex justify-center mb-4">
          <svg width="180" height="110" viewBox="0 0 180 110">
            {/* Background arc */}
            <path
              d="M 15 95 A 75 75 0 0 1 165 95"
              fill="none"
              stroke="#E8EAF8"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Progress arc - percentage based */}
            <path
              d="M 15 95 A 75 75 0 0 1 165 95"
              fill="none"
              stroke="#6D7BFC"
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 236} 236`}
            />
          </svg>
          <div className="absolute top-[35px] left-1/2 -translate-x-1/2 flex items-baseline">
            <span className="text-[52px] font-bold text-career-blue-500 leading-none">{percentage}</span>
            <span className="text-[28px] font-bold text-career-blue-500">%</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-career-grey-dark text-center text-[18px] mb-2">
          with other
        </p>
        <div className="flex justify-center my-3">
          <span className="bg-career-green-500 px-5 py-2.5 rounded-xl text-career-dark font-semibold text-[18px]">
            {data.role}s
          </span>
        </div>
        <p className="text-career-grey-dark text-center text-[18px]">
          in <span className="font-semibold text-career-dark">{data.company} {data.country}</span>
        </p>
      </div>

      {/* Next Button */}
      <div className="pt-8 w-full flex justify-center">
        <NextButton text="Strengths & weaknesses" onClick={onNext} />
      </div>
    </div>
  );
}
