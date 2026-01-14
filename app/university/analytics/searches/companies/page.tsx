'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockTopCompanies = [
  { name: 'McKinsey & Company', count: 342, percentage: 12.5, sector: 'Consulting' },
  { name: 'Bain & Company', count: 289, percentage: 10.6, sector: 'Consulting' },
  { name: 'BCG', count: 267, percentage: 9.8, sector: 'Consulting' },
  { name: 'Goldman Sachs', count: 234, percentage: 8.5, sector: 'Finance' },
  { name: 'JPMorgan Chase', count: 198, percentage: 7.2, sector: 'Finance' },
  { name: 'Google', count: 187, percentage: 6.8, sector: 'Tech' },
  { name: 'Amazon', count: 176, percentage: 6.4, sector: 'Tech' },
  { name: 'Deloitte', count: 165, percentage: 6.0, sector: 'Consulting' },
  { name: 'Morgan Stanley', count: 154, percentage: 5.6, sector: 'Finance' },
  { name: 'Apple', count: 143, percentage: 5.2, sector: 'Tech' },
  { name: 'Microsoft', count: 132, percentage: 4.8, sector: 'Tech' },
  { name: 'EY', count: 121, percentage: 4.4, sector: 'Consulting' },
  { name: 'PwC', count: 118, percentage: 4.3, sector: 'Consulting' },
  { name: 'KPMG', count: 112, percentage: 4.1, sector: 'Consulting' },
  { name: 'Accenture', count: 108, percentage: 3.9, sector: 'Consulting' },
  { name: 'BlackRock', count: 98, percentage: 3.6, sector: 'Finance' },
  { name: 'Meta', count: 92, percentage: 3.4, sector: 'Tech' },
  { name: 'Banca Intesa', count: 87, percentage: 3.2, sector: 'Finance' },
  { name: 'Unicredit', count: 82, percentage: 3.0, sector: 'Finance' },
  { name: 'Tesla', count: 76, percentage: 2.8, sector: 'Tech' },
];

const mockSectorBreakdown = [
  { sector: 'Consulting', count: 1322, percentage: 42, color: '#FF8A8A' },
  { sector: 'Finance', count: 953, percentage: 30, color: '#6D7BFC' },
  { sector: 'Tech', count: 806, percentage: 26, color: '#9D52FF' },
  { sector: 'Other', count: 65, percentage: 2, color: '#8D96AC' },
];

const mockStats = {
  uniqueCompanies: 892,
  totalSearches: 3146,
  avgPerCompany: 3.5,
};

const mockCourses = [
  { id: 'all', name: 'Tutti i corsi' },
  { id: 'economics', name: 'Economia e Management' },
  { id: 'engineering', name: 'Ingegneria' },
  { id: 'law', name: 'Giurisprudenza' },
  { id: 'cs', name: 'Informatica' },
];

const mockYears = [
  { id: 'all', name: 'Tutti gli anni' },
  { id: '1', name: '1 Anno' },
  { id: '2', name: '2 Anno' },
  { id: '3', name: '3 Anno' },
  { id: 'master', name: 'Magistrale' },
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
  } : { r: 255, g: 138, b: 138 };
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

export default function TopCompaniesPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const companyColorStyles = generateColorFades('#FF8A8A', mockTopCompanies.length);
  const maxPercentage = Math.max(...mockTopCompanies.map(d => d.percentage));

  return (
    <div className="min-h-screen bg-[#F0F3FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8EAF8]">
        <div className="px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#8D96AC] mb-4">
            <Link href="/university" className="hover:text-[#FF8A8A] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href="/university/analytics" className="hover:text-[#FF8A8A] transition-colors">
              Analytics
            </Link>
            <span>/</span>
            <span className="text-[#FF8A8A]">Top Aziende</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#212746]">Top Aziende Cercate</h1>
              <p className="text-sm text-[#5A607F] mt-1">
                Le aziende piu ricercate dai tuoi studenti
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
                      ? 'bg-[#FF8A8A] text-white'
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
            className="px-4 py-2.5 bg-white border border-[#E8EAF8] rounded-lg text-sm text-[#212746] focus:outline-none focus:border-[#FF8A8A]"
          >
            {mockCourses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2.5 bg-white border border-[#E8EAF8] rounded-lg text-sm text-[#212746] focus:outline-none focus:border-[#FF8A8A]"
          >
            {mockYears.map((year) => (
              <option key={year.id} value={year.id}>{year.name}</option>
            ))}
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Unique Companies */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Quante aziende uniche?
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[72px] text-[#6D7BFC] leading-[68px]">
                  {mockStats.uniqueCompanies.toLocaleString('it-IT')}
                </p>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Aziende esplorate nel periodo
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
                Ricerche su aziende
              </p>
            </div>
          </div>

          {/* Avg per Company */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Media per azienda
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[72px] text-[#212746] leading-[68px]">
                {mockStats.avgPerCompany}
              </p>
              <p className="font-normal text-sm text-[#5A607F]">
                Ricerche medie per azienda
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Companies List */}
          <div className="lg:col-span-2 bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top 20 Aziende
              </h3>
              <span className="text-sm text-[#D0E957]">
                Per numero di ricerche
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full max-h-[800px] overflow-y-auto">
              {mockTopCompanies.map((item, index) => {
                const style = companyColorStyles[index];

                return (
                  <div
                    key={item.name}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#FF8A8A] transition-all w-full overflow-hidden rounded-lg"
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
                          <p className="font-semibold text-base text-[#212746]">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: item.sector === 'Consulting' ? '#FF8A8A20' :
                                                 item.sector === 'Finance' ? '#6D7BFC20' :
                                                 item.sector === 'Tech' ? '#9D52FF20' : '#8D96AC20',
                                color: item.sector === 'Consulting' ? '#FF8A8A' :
                                       item.sector === 'Finance' ? '#6D7BFC' :
                                       item.sector === 'Tech' ? '#9D52FF' : '#8D96AC',
                              }}
                            >
                              {item.sector}
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

          {/* Sidebar - Sector Breakdown */}
          <div className="flex flex-col gap-6">
            {/* Sector Breakdown */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              {/* Dark header */}
              <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Per Settore
                </h3>
              </div>

              <div className="p-5 space-y-4">
                {mockSectorBreakdown.map((sector) => (
                  <div key={sector.sector} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#212746]">{sector.sector}</span>
                      <span className="text-sm text-[#8D96AC]">{sector.count.toLocaleString('it-IT')} ricerche</span>
                    </div>
                    <div className="h-3 bg-[#F5F7FA] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${sector.percentage}%`,
                          backgroundColor: sector.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#8D96AC]">{sector.percentage}% del totale</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg p-5">
              <h4 className="font-semibold text-lg text-[#212746] mb-4">Insight rapidi</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#FF8A8A]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#FF8A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 6H23V12" stroke="#FF8A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      <span className="font-bold text-[#FF8A8A]">42%</span> delle ricerche sono per aziende di <span className="font-semibold">consulting</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#6D7BFC]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#6D7BFC"/>
                      <path d="M2 17L12 22L22 17" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      Le <span className="font-semibold">Big 3</span> (MBB) rappresentano il <span className="font-bold text-[#6D7BFC]">33%</span> delle ricerche totali
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#9D52FF]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#9D52FF" strokeWidth="2"/>
                      <path d="M3 9H21" stroke="#9D52FF" strokeWidth="2"/>
                      <path d="M9 21V9" stroke="#9D52FF" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      <span className="font-bold text-[#9D52FF]">Tech</span> e cresciuto del <span className="font-semibold">15%</span> rispetto al mese scorso
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
