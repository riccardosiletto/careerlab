'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step3Props {
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

export default function Step3TopDegree({ data, onNext, className }: Step3Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Degree Icon */}
      <div className="mb-4">
        <Image
          src="/results-flow/degree-icon.svg"
          alt="Degree"
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <p className="text-career-grey-dark text-[18px] text-center mb-3">
        The top degree is:
      </p>

      {/* Top Degree Highlight Box - rounded-full */}
      <div className="bg-career-green-500 px-8 py-4 rounded-full mb-6">
        <p className="text-career-dark text-center text-[18px] font-semibold">
          {data.topDegree}
        </p>
      </div>

      {/* Other Degrees Card */}
      <div className="bg-white p-6 w-full">
        <p className="text-career-dark font-medium text-[18px] mb-5">
          The other top degrees are:
        </p>

        <div className="space-y-4">
          {data.degrees.map((degree, index) => (
            <div key={index}>
              {/* Bar container */}
              <div className="relative h-[40px] bg-career-blue-100 overflow-hidden mb-1">
                {/* Progress fill */}
                <div
                  className="absolute left-0 top-0 h-full bg-career-blue-500 transition-all duration-700"
                  style={{ width: `${degree.percentage}%` }}
                />
                {/* Degree name inside bar */}
                <div className="absolute inset-0 flex items-center px-3">
                  <span className={`font-medium text-[14px] ${degree.percentage > 30 ? 'text-white' : 'text-career-dark'}`}>
                    {degree.name}
                  </span>
                </div>
              </div>
              {/* Stats below bar */}
              <p className="text-career-grey-dark text-[13px]">
                {degree.count} people ({degree.percentage}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="They are learning..." onClick={onNext} />
      </div>
    </div>
  );
}
