'use client';

import { useState } from 'react';

interface StepJobRoleProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const popularRoles = [
  { name: 'Software Engineer', icon: '💻', count: '45K+' },
  { name: 'Product Manager', icon: '📊', count: '32K+' },
  { name: 'Data Scientist', icon: '🔬', count: '28K+' },
  { name: 'UX Designer', icon: '🎨', count: '24K+' },
  { name: 'Marketing Manager', icon: '📈', count: '21K+' },
  { name: 'Project Manager', icon: '📋', count: '19K+' },
  { name: 'Business Analyst', icon: '💼', count: '18K+' },
  { name: 'DevOps Engineer', icon: '⚙️', count: '15K+' },
];

const allRoles = [
  'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
  'Marketing Manager', 'Project Manager', 'Business Analyst', 'DevOps Engineer',
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'iOS Developer',
  'Android Developer', 'Machine Learning Engineer', 'Cloud Architect', 'Data Engineer',
  'QA Engineer', 'Security Engineer', 'Technical Writer', 'Scrum Master',
  'Project Manager', 'Senior Project Manager', 'Engineering Manager'
];

export default function StepJobRole({ value, onChange, onNext, onBack }: StepJobRoleProps) {
  const [isFocused, setIsFocused] = useState(false);
  const filteredRoles = allRoles.filter(r => 
    r.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4">
      {/* Icon */}
      <div className="mb-5">
        <img
          src="/results-flow/skills-icon.svg"
          alt="Job Role"
          className="w-[50px] h-auto"
        />
      </div>

      {/* Question */}
      <h2 className="text-[26px] md:text-[28px] font-medium text-career-dark text-center mb-6 leading-tight">
        What role <span className="italic text-career-blue-500">are you interested</span> in?
      </h2>

      {/* Search Input */}
      <div className="w-full relative mb-8">
        <div className={`
          relative bg-white rounded-2xl border-2 transition-all duration-300
          ${isFocused ? 'border-[#6D7BFC] shadow-[0_0_0_4px_rgba(109,123,252,0.1)]' : 'border-[#E8EAF8]'}
        `}>
          <div className="flex items-center px-6 py-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#8D96AC] mr-4">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Type a job role..."
              className="flex-1 text-lg text-[#212746] placeholder-[#8D96AC] outline-none bg-transparent"
            />
            {value && (
              <button 
                onClick={() => onChange('')}
                className="text-[#8D96AC] hover:text-[#5A607F] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isFocused && value && filteredRoles.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E8EAF8] shadow-lg overflow-hidden z-20 max-h-64 overflow-y-auto">
            {filteredRoles.slice(0, 8).map((role) => (
              <button
                key={role}
                onClick={() => onChange(role)}
                className="w-full px-6 py-4 text-left hover:bg-[#F3F4FF] transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-[#E8EAF8] rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#6D7BFC]">
                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-[#212746] font-medium">{role}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popular Roles Grid */}
      <div className="w-full">
        <p className="text-[#8D96AC] text-sm font-medium mb-4 uppercase tracking-wider">Popular Roles</p>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
          {popularRoles.map((role) => (
            <button
              key={role.name}
              onClick={() => onChange(role.name)}
              className={`
                flex items-center md:flex-col gap-4 md:gap-3 p-4 md:p-5 rounded-xl border-2 transition-all duration-300
                ${value === role.name
                  ? 'bg-career-blue-500 border-career-blue-500 text-white shadow-lg shadow-career-blue-500/20'
                  : 'bg-white border-[#E8EAF8] hover:border-career-blue-500/30 hover:bg-career-blue-100'
                }
              `}
            >
              <span className="text-3xl md:text-2xl flex-shrink-0">{role.icon}</span>
              <div className="text-left md:text-center flex-1">
                <p className={`font-medium text-sm md:text-sm ${value === role.name ? 'text-white' : 'text-career-dark'}`}>
                  {role.name}
                </p>
                <p className={`text-xs md:text-xs mt-0.5 md:mt-1 ${value === role.name ? 'text-white/70' : 'text-[#8D96AC]'}`}>
                  {role.count} profiles
                </p>
              </div>
              {value === role.name && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:hidden flex-shrink-0">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full flex flex-col gap-4 mt-8 md:mt-10">
        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!value}
          className={`
            w-full max-w-md mx-auto py-3.5 md:py-4 px-8 rounded-xl font-medium text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-300
            ${value
              ? 'bg-career-blue-500 text-white hover:bg-[#5A68D9] shadow-lg shadow-career-blue-500/20 hover:shadow-career-blue-500/30'
              : 'bg-[#E8EAF8] text-[#8D96AC] cursor-not-allowed'
            }
          `}
        >
          <span>Continue</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-10 h-10 mx-auto rounded-full bg-white border border-[#E8EAF8] flex items-center justify-center text-[#5A607F] hover:bg-career-blue-100 hover:border-career-blue-500/30 transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

