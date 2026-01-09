'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step4Props {
  data: {
    topDegree: string;
    degrees: Array<{
      name: string;
      count: number;
      percentage: number;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step4TopDegree({ data, onNext, className }: Step4Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Degree Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/degree-icon.svg" 
          alt="Top Degree" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Your top degree <span className="italic text-career-blue-500">is...</span>
      </h1>

      {/* Top Degree Card */}
      <div className="bg-white rounded-[20px] py-5 px-6 w-full shadow-card mb-4">
        <p className="text-career-blue-500 text-center text-[22px] font-semibold">
          {data.topDegree}
        </p>
      </div>

      {/* Other Degrees Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-dark font-medium text-[18px] mb-5">
          The other top degrees are:
        </p>
        
        <div className="space-y-5">
          {data.degrees.map((degree, index) => (
            <div key={index}>
              <p className="text-career-dark font-medium text-[16px] mb-2">{degree.name}</p>
              <div className="h-[14px] bg-career-blue-100 rounded-full overflow-hidden mb-1">
                <div 
                  className="h-full bg-career-green-500 rounded-full transition-all duration-700"
                  style={{ width: `${degree.percentage}%` }}
                />
              </div>
              <p className="text-career-grey-dark text-[14px]">
                {degree.count} people ({degree.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="You should learn..." onClick={onNext} />
      </div>
    </div>
  );
}
