'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step5Props {
  data: {
    courses: Array<{
      name: string;
      platform: string;
      logo: string;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step5Learning({ data, onNext, className }: Step5Props) {
  // Platform logos - using inline SVG icons for reliable rendering
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      'Coursera': (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill="#0056D2"/>
          <path d="M11 10L19 14L11 18V10Z" fill="white"/>
        </svg>
      ),
      'Next MBA': (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="24" height="24" rx="4" fill="#1A1A2E"/>
          <path d="M7 18V10L11 15L15 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 10V18M19 10H21.5M19 14H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'Udemy': (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill="#A435F0"/>
          <path d="M10 10V14C10 16.2 11.8 18 14 18C16.2 18 18 16.2 18 14V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    };
    return icons[platform] || icons['Coursera'];
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Learning Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/learning-icon.svg" 
          alt="Learning" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        You should learn <span className="italic text-career-blue-500">about...</span>
      </h1>

      {/* Courses Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-grey-dark text-center text-[16px] mb-5">
          The top courses for this job:
        </p>
        
        <div className="space-y-4">
          {data.courses.map((course, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 bg-career-blue-100 rounded-xl p-4"
            >
              {/* Platform Logo */}
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                {getPlatformIcon(course.platform)}
              </div>
              
              {/* Course Info */}
              <div className="flex-1">
                <p className="text-career-dark font-semibold text-[16px] mb-0.5">
                  {course.name}
                </p>
                <p className="text-career-grey-dark text-[14px]">
                  {course.platform}
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
        <NextButton text="Top skills" onClick={onNext} />
      </div>
    </div>
  );
}
