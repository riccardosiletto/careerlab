'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockTopRoles = [
  { name: 'Management Consultant', count: 456, percentage: 16.7, level: 'Entry', trend: 'up' },
  { name: 'Financial Analyst', count: 387, percentage: 14.1, level: 'Entry', trend: 'up' },
  { name: 'Data Scientist', count: 312, percentage: 11.4, level: 'Entry', trend: 'up' },
  { name: 'Product Manager', count: 278, percentage: 10.2, level: 'Mid', trend: 'stable' },
  { name: 'Software Engineer', count: 234, percentage: 8.6, level: 'Entry', trend: 'up' },
  { name: 'Investment Banking Analyst', count: 212, percentage: 7.8, level: 'Entry', trend: 'stable' },
  { name: 'Strategy Consultant', count: 198, percentage: 7.2, level: 'Entry', trend: 'up' },
  { name: 'Business Analyst', count: 187, percentage: 6.8, level: 'Entry', trend: 'stable' },
  { name: 'Marketing Manager', count: 165, percentage: 6.0, level: 'Mid', trend: 'down' },
  { name: 'UX Designer', count: 154, percentage: 5.6, level: 'Entry', trend: 'up' },
  { name: 'Private Equity Associate', count: 143, percentage: 5.2, level: 'Entry', trend: 'up' },
  { name: 'Operations Manager', count: 132, percentage: 4.8, level: 'Mid', trend: 'stable' },
  { name: 'HR Business Partner', count: 121, percentage: 4.4, level: 'Mid', trend: 'down' },
  { name: 'Account Manager', count: 115, percentage: 4.2, level: 'Entry', trend: 'stable' },
  { name: 'Project Manager', count: 108, percentage: 3.9, level: 'Mid', trend: 'stable' },
  { name: 'Risk Analyst', count: 98, percentage: 3.6, level: 'Entry', trend: 'up' },
  { name: 'M&A Analyst', count: 92, percentage: 3.4, level: 'Entry', trend: 'up' },
  { name: 'Supply Chain Analyst', count: 87, percentage: 3.2, level: 'Entry', trend: 'stable' },
  { name: 'Brand Manager', count: 82, percentage: 3.0, level: 'Mid', trend: 'down' },
  { name: 'DevOps Engineer', count: 76, percentage: 2.8, level: 'Entry', trend: 'up' },
];

const mockTrendingRoles = [
  { name: 'AI/ML Engineer', change: '+45%', isRising: true },
  { name: 'Data Scientist', change: '+32%', isRising: true },
  { name: 'Product Manager', change: '+28%', isRising: true },
  { name: 'ESG Analyst', change: '+24%', isRising: true },
  { name: 'Cloud Architect', change: '+22%', isRising: true },
];

const mockDecliningRoles = [
  { name: 'Marketing Manager', change: '-15%', isRising: false },
  { name: 'HR Business Partner', change: '-12%', isRising: false },
  { name: 'Brand Manager', change: '-10%', isRising: false },
  { name: 'Retail Manager', change: '-8%', isRising: false },
  { name: 'Administrative Assistant', change: '-6%', isRising: false },
];

const mockStats = {
  uniqueRoles: 156,
  totalSearches: 2738,
};

const mockCourses = [
  { id: 'all', name: 'Tutti i corsi' },
  { id: 'economics', name: 'Economia e Management' },
  { id: 'engineering', name: 'Ingegneria' },
  { id: 'law', name: 'Giurisprudenza' },
  { id: 'cs', name: 'Informatica' },
];

const mockSeniorityLevels = [
  { id: 'all', name: 'Tutti i livelli' },
  { id: 'entry', name: 'Entry Level' },
  { id: 'mid', name: 'Mid Level' },
  { id: 'senior', name: 'Senior' },
  { id: 'executive', name: 'Executive' },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 157, g: 82, b: 255 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.04);
    const bgOpacity = Math.max(0.08, opacity * 0.15);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function TopRolesPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSeniority, setSelectedSeniority] = useState('all');

  const roleColorStyles = generateColorFades('#9D52FF', mockTopRoles.length);
  const maxPercentage = Math.max(...mockTopRoles.map(d => d.percentage));

  return (
    <div className="min-h-screen bg-[#F0F3FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8EAF8]">
        <div className="px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#8D96AC] mb-4">
            <Link href="/university" className="hover:text-[#9D52FF] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/university/analytics" className="hover:text-[#9D52FF] transition-colors">
              Analytics
            </Link>
            <span>/</span>
            <span className="text-[#9D52FF]">Top Ruoli</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#212746]">Top Ruoli Cercati</h1>
              <p className="text-sm text-[#5A607F] mt-1">
                I ruoli professionali piu ricercati dai tuoi studenti
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-[#F5F7FA] p-1 rounded-lg">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-[#9D52FF] text-white'
                      : 'text-[#8D96AC] hover:text-[#212746]'
                  }`}
                >
                  {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : '90 giorni'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2.5 bg-white border border-[#E8EAF8] rounded-lg text-sm text-[#212746] focus:outline-none focus:border-[#9D52FF]"
          >
            {mockCourses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>

          <select
            value={selectedSeniority}
            onChange={(e) => setSelectedSeniority(e.target.value)}
            className="px-4 py-2.5 bg-white border border-[#E8EAF8] rounded-lg text-sm text-[#212746] focus:outline-none focus:border-[#9D52FF]"
          >
            {mockSeniorityLevels.map((level) => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Unique Roles */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Quanti ruoli unici?
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[72px] text-[#6D7BFC] leading-[68px]">
                {mockStats.uniqueRoles.toLocaleString('it-IT')}
              </p>
              <p className="font-normal text-sm text-[#5A607F]">
                Ruoli diversi cercati nel periodo
              </p>
            </div>
          </div>

          {/* Total Searches */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Ricerche totali
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[72px] text-[#212746] leading-[68px]">
                {mockStats.totalSearches.toLocaleString('it-IT')}
              </p>
              <p className="font-normal text-sm text-[#5A607F]">
                Ricerche su ruoli professionali
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Roles List */}
          <div className="lg:col-span-2 bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top 20 Ruoli
              </h3>
              <span className="text-sm text-[#D0E957]">
                Per numero di ricerche
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full max-h-[800px] overflow-y-auto">
              {mockTopRoles.map((item, index) => {
                const style = roleColorStyles[index];

                return (
                  <div
                    key={item.name}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                  >
                    {/* Background bar proportional to percentage */}
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(item.percentage / maxPercentage) * 100}%`,
                      }}
                    />

                    {/* Content on top of background */}
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      {/* Rank number */}
                      <div className="w-8 h-8 flex items-center justify-center bg-[#212746] text-white text-sm font-bold rounded-full flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* Vertical accent bar */}
                      <div
                        className="w-1 h-10 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: style.accent }}
                      />

                      {/* Content */}
                      <div className="flex-1 flex items-center justify-between">
                        {/* Item info */}
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-base text-[#212746]">
                              {item.name}
                            </p>
                            {/* Trend indicator */}
                            {item.trend === 'up' && (
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {item.trend === 'down' && (
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: item.level === 'Entry' ? '#22C55E20' :
                                                 item.level === 'Mid' ? '#6D7BFC20' : '#FF8A8A20',
                                color: item.level === 'Entry' ? '#22C55E' :
                                       item.level === 'Mid' ? '#6D7BFC' : '#FF8A8A',
                              }}
                            >
                              {item.level}
                            </span>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {item.percentage}% delle ricerche
                            </p>
                          </div>
                        </div>

                        {/* Count badge */}
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xl text-[#212746]">
                            {item.count}
                          </span>
                          <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                            Ricerche
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Trends */}
          <div className="flex flex-col gap-6">
            {/* Rising Roles */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              {/* Green header */}
              <div className="bg-[#22C55E] flex items-center gap-2 px-5 py-4 w-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 6H23V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-medium text-[17px] text-white">
                  Ruoli in crescita
                </h3>
              </div>

              <div className="p-5 space-y-3">
                {mockTrendingRoles.map((role, index) => (
                  <div key={role.name} className="flex items-center justify-between py-2 border-b border-[#E8EAF8] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#212746]">{role.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#22C55E]">{role.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Declining Roles */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              {/* Red header */}
              <div className="bg-[#EF4444] flex items-center gap-2 px-5 py-4 w-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 18L13.5 8.5L8.5 13.5L1 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 18H23V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-medium text-[17px] text-white">
                  Ruoli in calo
                </h3>
              </div>

              <div className="p-5 space-y-3">
                {mockDecliningRoles.map((role, index) => (
                  <div key={role.name} className="flex items-center justify-between py-2 border-b border-[#E8EAF8] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#EF4444]/10 text-[#EF4444] text-xs font-semibold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#212746]">{role.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#EF4444]">{role.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h4 className="font-semibold text-lg text-[#212746] mb-4">Insight rapidi</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#9D52FF]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#9D52FF" strokeWidth="2"/>
                      <path d="M12 6V12L16 14" stroke="#9D52FF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      <span className="font-bold text-[#9D52FF]">73%</span> degli studenti cerca ruoli <span className="font-semibold">Entry Level</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#22C55E]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      I ruoli <span className="font-semibold">Tech</span> sono cresciuti del <span className="font-bold text-[#22C55E]">32%</span> questo trimestre
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
