'use client';

import NextButton from './NextButton';

interface Step2Props {
  data: {
    avgAge: number;
    company: string;
    country: string;
    ageDistribution: Array<{
      range: string;
      percentage: number;
    }>;
    genderDistribution: Array<{
      type: string;
      percentage: number;
    }>;
  };
  onNext: () => void;
  className?: string;
}

// Male icon component
const MaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M14 10L20 4M20 4H15M20 4V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Female icon component
const FemaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 14V21M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Step2AgeDistribution({ data, onNext, className }: Step2Props) {
  // Get the top age range (highest percentage)
  const sortedAgeRanges = [...data.ageDistribution].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Average Age Section */}
      <div className="text-center mb-4">
        <p className="text-career-grey-dark text-[18px] mb-2">
          The average age is:
        </p>
        <div className="inline-flex items-center justify-center border-2 border-career-blue-500 px-6 py-3">
          <span className="text-career-blue-500 text-[42px] font-bold leading-none">{data.avgAge}</span>
          <span className="text-career-blue-500 text-[16px] font-medium ml-2 mt-2">years</span>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white p-6 w-full mb-4">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="bg-career-green-500 text-career-dark px-3 py-1.5 text-[14px] font-medium">
            {data.company} in {data.country}
          </span>
          <span className="text-career-grey-dark text-[16px]">
            last year hired mostly:
          </span>
        </div>

        {/* Age Distribution Bars - Horizontal */}
        <div className="space-y-3">
          {sortedAgeRanges.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Rank number */}
              <div className="w-6 h-6 rounded-full border-2 border-career-grey-300 flex items-center justify-center flex-shrink-0">
                <span className="text-career-grey-dark text-[12px] font-medium">{index + 1}</span>
              </div>

              {/* Age range badge */}
              <div className={`px-3 py-2 ${index === 0 ? 'bg-career-green-500 text-career-dark' : 'bg-career-blue-100 text-career-dark'} font-medium text-[14px] min-w-[70px] text-center`}>
                {item.range}
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-[12px] bg-career-blue-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${index === 0 ? 'bg-career-green-500' : 'bg-career-blue-400'} rounded-full transition-all duration-700`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Percentage */}
              <span className="text-career-dark font-semibold text-[14px] min-w-[40px] text-right">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-career-blue-100 my-5" />

        {/* Gender Section */}
        <p className="text-career-grey-dark text-center text-[16px] mb-4">
          And their <span className="bg-career-green-500 text-career-dark px-2 py-0.5 text-[16px]">gender</span> distribution is:
        </p>

        {/* Gender Distribution */}
        <div className="flex justify-center gap-6">
          {data.genderDistribution.map((gender, index) => {
            const Icon = gender.type === 'Male' ? MaleIcon : FemaleIcon;
            const color = gender.type === 'Male' ? '#6D7BFC' : '#B6DC00';

            return (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="text-white" />
                </div>
                <span className="text-career-dark font-semibold text-[18px]">
                  {gender.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-4 w-full flex justify-center">
        <NextButton text="See Top Degree" onClick={onNext} />
      </div>
    </div>
  );
}
