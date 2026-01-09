'use client';

import Image from 'next/image';

interface Step4Props {
  data: {
    courses: Array<{
      name: string;
      platform: string;
      logo?: string;
    }>;
  };
  onSwipe?: () => void;
  className?: string;
}

export default function Step4Learning({ data, onSwipe, className }: Step4Props) {
  // Platform logos - using inline SVG icons for reliable rendering
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: React.ReactElement } = {
      Coursera: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill="#0056D2" />
          <path d="M11 10L19 14L11 18V10Z" fill="white" />
        </svg>
      ),
      'Next MBA': (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="24" height="24" rx="4" fill="#1A1A2E" />
          <path
            d="M7 18V10L11 15L15 10V18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 10V18M19 10H21.5M19 14H21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      Udemy: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="12" fill="#A435F0" />
          <path
            d="M10 10V14C10 16.2 11.8 18 14 18C16.2 18 18 16.2 18 14V10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      LinkedIn: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="24" height="24" rx="4" fill="#0A66C2" />
          <path d="M8 12V20M8 8V8.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 20V15C12 13.5 13.5 12 15 12C16.5 12 18 13.5 18 15V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12V20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    };
    return icons[platform] || icons['Coursera'];
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Learning Icon */}
      <div className="mb-4">
        <Image
          src="/results-flow/learning-icon.svg"
          alt="Learning"
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <p className="text-career-dark text-[22px] font-medium text-center mb-5">
        They are learning about:
      </p>

      {/* Courses Card */}
      <div className="bg-white p-6 w-full mb-4">
        <div className="space-y-4">
          {data.courses.map((course, index) => (
            <div key={index} className="flex flex-col">
              {/* Course name in dark box */}
              <div className="bg-career-green-500 text-career-dark px-4 py-3 font-medium text-[15px]">
                {course.name}
              </div>
              {/* Platform info below */}
              <div className="flex items-center gap-2 mt-2 pl-1">
                <span className="text-career-grey-dark text-[13px]">on</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {getPlatformIcon(course.platform)}
                  </div>
                  <span className="text-career-grey-dark text-[13px] font-medium">
                    {course.platform}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <button className="w-full mt-5 py-2.5 border border-career-grey-300 text-career-grey-dark text-[14px] font-medium hover:bg-career-blue-100 transition-colors">
          Show more
        </button>
      </div>

      {/* Swipe CTA */}
      <div className="flex items-center justify-center gap-3 pt-4 w-full">
        {/* Left arrow */}
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" className="text-career-grey-500">
          <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Swipe text with animated arrows */}
        <button
          onClick={onSwipe}
          className="flex items-center gap-2 group"
        >
          <div className="bg-career-blue-500 text-white px-4 py-2.5 flex items-center gap-2 group-hover:bg-career-blue-400 transition-colors">
            <span className="text-[14px] font-medium">Swipe to see the full Report!</span>
            {/* Triple chevron */}
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 1L13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 1L19 7L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
