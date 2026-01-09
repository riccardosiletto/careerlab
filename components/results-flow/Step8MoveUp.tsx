'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step8Props {
  data: {
    moveUpPercentage: number;
    sameRoles: Array<{
      name: string;
      percentage: number;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step8MoveUp({ data, onNext, className }: Step8Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Move Up Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/move-up-icon.svg" 
          alt="Move Up" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        How to <span className="italic text-career-blue-500">move up...</span>
      </h1>

      {/* Percentage Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[48px] font-bold text-career-blue-500">{data.moveUpPercentage}%</span>
        </div>
        <p className="text-career-grey-dark text-center text-[16px]">
          of people in this role get promoted
        </p>
      </div>

      {/* Same Role Transitions Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-dark font-medium text-[16px] mb-4">
          People in the same role often become:
        </p>
        
        <div className="space-y-4">
          {data.sameRoles.map((role, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1 bg-career-blue-100 rounded-xl px-4 py-3">
                <p className="text-career-dark font-medium text-[15px]">{role.name}</p>
              </div>
              <div className="bg-career-green-500 px-3 py-2 rounded-lg min-w-[60px] text-center">
                <p className="text-career-dark font-semibold text-[14px]">{role.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="Who leaves" onClick={onNext} />
      </div>
    </div>
  );
}
