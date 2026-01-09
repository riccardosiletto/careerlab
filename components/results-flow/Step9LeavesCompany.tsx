'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step9Props {
  data: {
    leavePercentage: number;
    leaveRoles: Array<{
      name: string;
      percentage: number;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step9LeavesCompany({ data, onNext, className }: Step9Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Leaves Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/leaves-icon.svg" 
          alt="Leaves Company" 
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Who leaves <span className="italic text-career-blue-500">the company...</span>
      </h1>

      {/* Percentage Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[48px] font-bold text-career-blue-500">{data.leavePercentage}%</span>
        </div>
        <p className="text-career-grey-dark text-center text-[16px]">
          of people leave this company every year
        </p>
      </div>

      {/* Roles that Leave Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-dark font-medium text-[16px] mb-4">
          Roles with highest turnover:
        </p>
        
        <div className="space-y-4">
          {data.leaveRoles.map((role, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-career-dark font-medium text-[15px]">{role.name}</p>
                <p className="text-career-blue-500 font-semibold text-[14px]">{role.percentage}%</p>
              </div>
              <div className="h-[10px] bg-career-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-career-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${role.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="Industry changes" onClick={onNext} />
      </div>
    </div>
  );
}
