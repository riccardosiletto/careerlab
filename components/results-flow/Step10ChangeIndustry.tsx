'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step10Props {
  data: {
    industryChanges: Array<{
      role: string;
      industry: string;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step10ChangeIndustry({ data, onNext, className }: Step10Props) {
  // Industry icons mapping
  const getIndustryIcon = (industry: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'Finance': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6D7BFC" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#6D7BFC" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#6D7BFC" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      ),
      'Pharma': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 3H15V8H20V21H4V8H9V3Z" stroke="#6D7BFC" strokeWidth="2"/>
          <path d="M9 14H15M12 11V17" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'Tech': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="#6D7BFC" strokeWidth="2"/>
          <path d="M7 21H17" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 18V21" stroke="#6D7BFC" strokeWidth="2"/>
        </svg>
      ),
    };
    return icons[industry] || icons['Tech'];
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Industry Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/industry-icon.svg" 
          alt="Change Industry" 
          width={40}
          height={50}
          className="w-[40px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Industry <span className="italic text-career-blue-500">changes...</span>
      </h1>

      {/* Industry Changes Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-grey-dark text-center text-[16px] mb-5">
          Common career transitions:
        </p>
        
        <div className="space-y-4">
          {data.industryChanges.map((change, index) => (
            <div 
              key={index}
              className="bg-career-blue-100 rounded-xl p-4 flex items-center gap-4"
            >
              {/* Industry Icon */}
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                {getIndustryIcon(change.industry)}
              </div>
              
              {/* Role & Industry Info */}
              <div className="flex-1">
                <p className="text-career-dark font-semibold text-[15px] mb-0.5">
                  {change.role}
                </p>
                <p className="text-career-grey-dark text-[14px]">
                  in {change.industry}
                </p>
              </div>

              {/* Arrow */}
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="flex-shrink-0">
                <path d="M1 1L7 7L1 13" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="Summary" onClick={onNext} />
      </div>
    </div>
  );
}
