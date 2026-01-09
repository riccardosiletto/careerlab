'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step1Props {
  data: {
    profilesAnalyzed: number;
    role: string;
    company: string;
    country: string;
  };
  onNext: () => void;
  className?: string;
}

export default function Step1ReportReady({ data, onNext, className }: Step1Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Rocket Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/rocket-icon.svg" 
          alt="Report Ready" 
          width={45}
          height={50}
          className="w-[45px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[28px] font-medium text-career-dark text-center leading-tight">
        Hurray,
      </h1>
      <h2 className="text-[28px] font-medium text-career-dark text-center mb-6 leading-tight">
        your report is <span className="italic text-career-blue-500">ready!</span>
      </h2>

      {/* Info Card */}
      <div className="bg-white p-7 w-full">
        <p className="text-career-grey-dark text-center text-[18px] mb-1">
          We analyzed over
        </p>
        <p className="text-career-dark text-[52px] font-bold text-center leading-none my-2">
          {data.profilesAnalyzed}+
        </p>
        <div className="flex justify-center my-4">
          <span className="bg-career-green-500 px-5 py-2.5 rounded-none text-career-dark font-semibold text-[20px]">
            {data.role}s
          </span>
        </div>
        <p className="text-career-grey-dark text-center text-[18px]">
          in <span className="font-semibold text-career-dark">{data.company} {data.country}</span>
        </p>
      </div>

      {/* Next Button */}
      <div className="pt-8 w-full flex justify-center">
        <NextButton text="See results" onClick={onNext} />
      </div>
    </div>
  );
}
