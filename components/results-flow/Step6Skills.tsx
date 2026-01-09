'use client';

import Image from 'next/image';
import NextButton from './NextButton';

interface Step6Props {
  data: {
    topSkills: Array<{
      name: string;
      percentage: number;
    }>;
  };
  onNext: () => void;
  className?: string;
}

export default function Step6Skills({ data, onNext, className }: Step6Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Skills Icon */}
      <div className="mb-5">
        <Image 
          src="/results-flow/skills-icon.svg" 
          alt="Skills" 
          width={46}
          height={50}
          className="w-[46px] h-[50px]"
        />
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Top skills <span className="italic text-career-blue-500">you need...</span>
      </h1>

      {/* Skills Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card">
        <p className="text-career-grey-dark text-center text-[16px] mb-5">
          The most in-demand skills:
        </p>
        
        <div className="space-y-5">
          {data.topSkills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-career-dark font-medium text-[16px]">{skill.name}</p>
                <p className="text-career-blue-500 font-semibold text-[16px]">{skill.percentage}%</p>
              </div>
              <div className="h-[14px] bg-career-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-career-green-500 rounded-full transition-all duration-700"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-6 w-full flex justify-center">
        <NextButton text="Career prospects" onClick={onNext} />
      </div>
    </div>
  );
}
