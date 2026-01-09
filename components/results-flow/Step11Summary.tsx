'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Step11Props {
  data: {
    role: string;
    company: string;
    matchPercentage: number;
    topDegree: string;
    topSkills: Array<{ name: string; percentage: number }>;
  };
  className?: string;
}

export default function Step11Summary({ data, className }: Step11Props) {
  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] mx-auto ${className}`}>
      {/* Summary Icon */}
      <div className="mb-5">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect x="8" y="4" width="34" height="42" rx="4" stroke="#212746" strokeWidth="2"/>
          <path d="M14 15H36" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 23H36" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 31H28" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 28L36 32L44 24" stroke="#D0E957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-[26px] font-medium text-career-dark text-center mb-6 leading-tight">
        Your career <span className="italic text-career-blue-500">summary</span>
      </h1>

      {/* Summary Card */}
      <div className="bg-white rounded-[20px] p-6 w-full shadow-card mb-4">
        {/* Role & Match */}
        <div className="text-center mb-5">
          <div className="inline-block bg-career-green-500 px-4 py-2 rounded-xl mb-3">
            <p className="text-career-dark font-semibold text-[18px]">{data.role}</p>
          </div>
          <p className="text-career-grey-dark text-[15px]">at {data.company}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Match Percentage */}
          <div className="bg-career-blue-100 rounded-xl p-4 text-center">
            <p className="text-career-blue-500 font-bold text-[28px]">{data.matchPercentage}%</p>
            <p className="text-career-grey-dark text-[13px]">Profile Match</p>
          </div>
          
          {/* Top Degree */}
          <div className="bg-career-blue-100 rounded-xl p-4 text-center">
            <p className="text-career-blue-500 font-bold text-[15px] leading-tight mb-1">{data.topDegree.split(' ').slice(0, 2).join(' ')}</p>
            <p className="text-career-grey-dark text-[13px]">Top Degree</p>
          </div>
        </div>

        {/* Top Skills Preview */}
        <div className="mb-2">
          <p className="text-career-dark font-medium text-[15px] mb-3">Top Skills Needed:</p>
          <div className="flex flex-wrap gap-2">
            {data.topSkills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="bg-career-green-200 px-3 py-1.5 rounded-lg text-career-dark text-[14px] font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        {/* Generate Report Button */}
        <button className="w-full bg-career-blue-500 text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-floating hover:bg-career-blue-400 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2V18M2 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-medium text-[17px]">Generate Full Report</span>
        </button>

        {/* New Search Button */}
        <Link 
          href="/search"
          className="w-full bg-white border-2 border-career-blue-500 text-career-blue-500 rounded-full py-3.5 px-6 flex items-center justify-center gap-3 shadow-box hover:bg-career-blue-100 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M13 13L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-medium text-[17px]">New Search</span>
        </Link>
      </div>

      {/* Feedback Section */}
      <div className="pt-6 text-center">
        <p className="text-career-grey-dark text-[14px] mb-2">Was this helpful?</p>
        <div className="flex justify-center gap-4">
          <button className="w-10 h-10 rounded-full bg-career-green-500 flex items-center justify-center hover:scale-110 transition-transform">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 13C5 13 7 16 10 16C13 16 15 13 15 13" stroke="#212746" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="7" cy="8" r="1" fill="#212746"/>
              <circle cx="13" cy="8" r="1" fill="#212746"/>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-career-blue-100 flex items-center justify-center hover:scale-110 transition-transform">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 12C5 12 7 9 10 9C13 9 15 12 15 12" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="7" cy="7" r="1" fill="#6D7BFC"/>
              <circle cx="13" cy="7" r="1" fill="#6D7BFC"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
