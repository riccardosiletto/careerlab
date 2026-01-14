'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockStats = {
  activeStudents: 2847,
  monthlySearches: 15420,
  companiesExplored: 892,
  activeCourses: 47,
  searchTrend: 23, // +23%
  studentTrend: 12.5, // +12.5%
  inactiveStudents: 1253,
  engagementQuality: 78,
};

const mockTopCompanies = [
  { name: 'McKinsey & Company', count: 342, percentage: 12.5 },
  { name: 'Bain & Company', count: 289, percentage: 10.6 },
  { name: 'BCG', count: 267, percentage: 9.8 },
  { name: 'Goldman Sachs', count: 234, percentage: 8.5 },
  { name: 'JPMorgan', count: 198, percentage: 7.2 },
];

const mockTopRoles = [
  { name: 'Management Consultant', count: 456, percentage: 16.7 },
  { name: 'Financial Analyst', count: 387, percentage: 14.1 },
  { name: 'Data Scientist', count: 312, percentage: 11.4 },
  { name: 'Product Manager', count: 278, percentage: 10.2 },
  { name: 'Software Engineer', count: 234, percentage: 8.6 },
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
  } : { r: 109, g: 123, b: 252 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.15);
    const bgOpacity = Math.max(0.15, opacity * 0.15);
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

export default function UniversityPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const now = new Date();
  const currentMonth = now.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });

  const companyColorStyles = generateColorFades('#6D7BFC', mockTopCompanies.length);
  const roleColorStyles = generateColorFades('#9D52FF', mockTopRoles.length);

  return (
    <div className="bg-white min-h-screen">
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* University Logo */}
            <img
              src="/university icons/icon_bocconi.svg"
              alt="Università Bocconi"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="font-bold text-3xl text-[#212746]">Università Bocconi</h1>
              <p className="font-normal text-base text-[#5A607F]">Dashboard Career Lab</p>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#8D96AC]">
              Questo mese <span className="font-semibold text-[#212746]">{mockStats.monthlySearches.toLocaleString('it-IT')} ricerche</span>
            </p>
            <button className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Esporta Report
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* KPI CARDS - Question Style */}
      {/* ================================================================== */}
      <div className="px-[53px] py-8 bg-white">
        <div className="flex gap-6 items-stretch">

          {/* Card 1: Quanti studenti attivi? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti studenti attivi?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-1 items-end">
                <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockStats.activeStudents.toLocaleString('it-IT')}
                </p>
                {/* Trend Up Arrow */}
                <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 8L13.5 24" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 14L13.5 8L20 14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Studenti che hanno effettuato <span className="font-medium">almeno una ricerca</span> negli ultimi 30 giorni
              </p>
            </div>
          </div>

          {/* Card 2: Quante ricerche questo mese? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quante ricerche questo mese?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-[3px] items-end justify-center">
                {/* Up Arrow */}
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 25L15.5 5" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M7 13L15.5 5L24 13" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockStats.monthlySearches.toLocaleString('it-IT')}
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium text-[#22C55E]">+{mockStats.searchTrend}%</span> rispetto al mese precedente. I tuoi studenti sono sempre piu attivi!
              </p>
            </div>
          </div>

          {/* Card 3: Quali aziende cercano? */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quali aziende cercano?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end font-medium text-[#6D7BFC]">
                <span className="text-[82px] text-[#212746] leading-[72px]">
                  {mockStats.companiesExplored}
                </span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium">Aziende uniche</span> esplorate dai tuoi studenti in {currentMonth}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-[2fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Engagement Overview */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Engagement Section */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_1.5fr] gap-0">

                {/* Left: Student Flow - Sankey Style */}
                <div className="bg-white p-6 flex flex-col items-center justify-center border-r border-[#E8EAF8]">
                  <span className="text-base font-semibold text-[#8D96AC] mb-4 uppercase tracking-wider text-center">Engagement Studenti</span>

                  {/* Main number with yellow underline */}
                  <div className="relative inline-block">
                    <span className="text-[96px] font-bold text-[#212746] leading-none relative z-10">
                      {(mockStats.activeStudents + mockStats.inactiveStudents).toLocaleString('it-IT')}
                    </span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="14"
                      viewBox="0 0 200 14"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M2 10C50 3 150 3 198 10"
                        stroke="#D0E957"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Sankey-style flow diagram */}
                  <div className="w-full flex flex-col mt-0">
                    <svg width="100%" height="70" viewBox="0 0 200 70" fill="none" preserveAspectRatio="none">
                      {/* Inattivi flow (gray) - from narrow top center, expands to left */}
                      <path
                        d="M50 0
                           L70 0
                           C70 30, 70 50, 70 70
                           L0 70
                           C0 50, 50 30, 50 0
                           Z"
                        fill="#8D96AC"
                        opacity="0.5"
                      />
                      {/* Attivi flow (blue) - from narrow top center, expands to right */}
                      <path
                        d="M70 0
                           L150 0
                           C150 30, 200 50, 200 70
                           L70 70
                           C70 50, 70 30, 70 0
                           Z"
                        fill="#6D7BFC"
                        opacity="0.5"
                      />
                    </svg>

                    {/* Horizontal bar */}
                    <div className="flex w-full h-12 rounded-b-lg overflow-hidden">
                      {/* Inattivi section - gray (left) */}
                      <div
                        className="bg-[#8D96AC] flex items-center justify-center"
                        style={{ width: `${(mockStats.inactiveStudents / (mockStats.activeStudents + mockStats.inactiveStudents)) * 100}%` }}
                      >
                        <span className="text-white font-bold text-xl">{mockStats.inactiveStudents.toLocaleString('it-IT')}</span>
                      </div>
                      {/* Attivi section - blue (right) */}
                      <div
                        className="bg-[#6D7BFC] flex items-center justify-center"
                        style={{ width: `${(mockStats.activeStudents / (mockStats.activeStudents + mockStats.inactiveStudents)) * 100}%` }}
                      >
                        <span className="text-white font-bold text-xl">{mockStats.activeStudents.toLocaleString('it-IT')}</span>
                      </div>
                    </div>

                    {/* Labels below the bar */}
                    <div className="flex justify-between mt-3 px-2">
                      <span className="text-sm font-medium text-[#8D96AC] uppercase tracking-wide">Inattivi</span>
                      <span className="text-sm font-medium text-[#6D7BFC] uppercase tracking-wide">Attivi</span>
                    </div>
                  </div>

                  {/* Quality Gauge Box */}
                  <div className="w-full mt-6 bg-[#F5F7FA] rounded-lg px-5 py-5 flex items-center justify-between">
                    <div className="flex flex-col" style={{ width: '60%' }}>
                      <h4 className="text-base font-bold text-[#212746] mb-0">Qualita Engagement</h4>
                      <p className="text-xs text-[#8D96AC]">Basata su frequenza e completamento ricerche</p>
                    </div>
                    <div className="flex items-center justify-center" style={{ width: '40%' }}>
                      <svg viewBox="0 0 100 60" className="w-24 h-16">
                        <defs>
                          <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#B6DC00" />
                            <stop offset="100%" stopColor="#D0E957" />
                          </linearGradient>
                        </defs>
                        {/* Background arc (gray) */}
                        <path
                          d="M 10 55 A 40 40 0 0 1 90 55"
                          fill="none"
                          stroke="#E8EAF8"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        {/* Filled arc (green gradient) */}
                        <path
                          d="M 10 55 A 40 40 0 0 1 90 55"
                          fill="none"
                          stroke="url(#qualityGradient)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={`${(mockStats.engagementQuality / 100) * 125.6} 125.6`}
                        />
                        {/* Percentage text */}
                        <text
                          x="50"
                          y="52"
                          textAnchor="middle"
                          fontSize="22"
                          fontWeight="700"
                          fill="#212746"
                        >
                          {mockStats.engagementQuality}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right: Trend Chart Placeholder + Insights */}
                <div className="flex flex-col">
                  {/* Chart section */}
                  <div className="bg-white px-6 pt-5 pb-1 flex flex-col overflow-visible relative flex-1">
                    <h3 className="text-base font-semibold text-[#8D96AC] mb-3 uppercase tracking-wider">Trend Ricerche</h3>

                    {/* Time range selector */}
                    <div className="flex items-center gap-2 mb-4">
                      {(['7d', '30d', '90d'] as const).map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            timeRange === range
                              ? 'bg-[#6D7BFC] text-white'
                              : 'bg-[#F5F7FA] text-[#8D96AC] hover:bg-[#E8EAF8]'
                          }`}
                        >
                          {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : '90 giorni'}
                        </button>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="flex-1 min-h-[200px] flex items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                      <div className="text-center">
                        <svg className="mx-auto w-12 h-12 text-[#8D96AC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 3v18h18" />
                          <path d="M7 16l4-4 4 4 5-6" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Grafico Trend</p>
                        <p className="text-xs text-[#ADB3C7]">Integrazione con Recharts</p>
                      </div>
                    </div>
                  </div>

                  {/* Insights section */}
                  <div className="flex gap-5 px-6 pb-4 pt-4">
                    {/* Insight 1 */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg width="29" height="29" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3L1 9L12 15L23 9L12 3Z" fill="#6D7BFC"/>
                          <path d="M5 13V17C5 17 8 20 12 20C16 20 19 17 19 17V13" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 9V16" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="21" cy="18" r="1.5" fill="#6D7BFC"/>
                        </svg>
                      </div>
                      <p className="text-sm text-[#212746] leading-snug">
                        <span className="font-bold text-[#6D7BFC]">69%</span> degli studenti attivi sono del <span className="font-bold">primo anno</span>
                      </p>
                    </div>

                    {/* Insight 2 */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#6D7BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17 6H23V12" stroke="#6D7BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-[#212746] leading-snug">
                        Le ricerche sono aumentate del <span className="font-bold text-[#6D7BFC]">45%</span> rispetto allo <span className="font-bold">stesso periodo</span> dello scorso anno
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: CTA Cards */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-4">

            {/* Analytics Deep Dive Card */}
            <div className="bg-[#6D7BFC]/15 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer group flex-1">
              <div className="mb-3">
                <svg width="40" height="46" viewBox="0 0 48 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4L8 14V30L24 40L40 30V14L24 4Z" fill="#6D7BFC" fillOpacity="0.3"/>
                  <path d="M24 4L8 14V30L24 40L40 30V14L24 4Z" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14L24 24L40 14" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 40V24" stroke="#6D7BFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="22" r="4" fill="#6D7BFC"/>
                </svg>
              </div>
              <p className="text-[#8D96AC] text-sm mb-1">Esplora i dati in profondita</p>
              <h4 className="text-[#212746] font-bold text-lg mb-3">Analytics Avanzate</h4>
              <Link
                href="/university/analytics"
                className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
              >
                Esplora
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Benchmark Card */}
            <div className="bg-[#D0E957] p-5 flex flex-col items-center justify-center text-center rounded-lg hover:bg-[#D8F76B] transition-colors cursor-pointer group flex-1">
              <div className="mb-3 transform group-hover:scale-105 transition-transform">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="24" width="10" height="20" rx="2" fill="#212746"/>
                  <rect x="19" y="14" width="10" height="30" rx="2" fill="#212746"/>
                  <rect x="34" y="4" width="10" height="40" rx="2" fill="#212746"/>
                  <path d="M9 8L24 4L39 8" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="4" r="2" fill="#212746"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#212746] mb-1">Confronta con altre Universita</h4>
              <p className="text-sm text-[#212746]/70 mb-3 leading-tight">
                Scopri come si posizionano<br />i tuoi studenti nel mercato
              </p>
              <Link
                href="/university/benchmarking"
                className="bg-[#212746] hover:bg-[#2D3456] text-[#D0E957] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
              >
                Vai al Benchmark
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* TOP LISTS - HorizontalBarCard Style */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-2 gap-6">

          {/* Top Companies */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top Aziende Cercate
              </h3>
              <Link href="/university/analytics/ricerche/aziende" className="text-sm text-[#D0E957] hover:underline">
                Vedi tutte
              </Link>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockTopCompanies.map((item, index) => {
                const style = companyColorStyles[index];
                const maxPercentage = Math.max(...mockTopCompanies.map(d => d.percentage));

                return (
                  <div
                    key={item.name}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#6D7BFC] transition-all w-full overflow-hidden rounded-lg"
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
                          <p className="font-normal text-xs text-[#8D96AC]">
                            {item.percentage}% delle ricerche
                          </p>
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

          {/* Top Roles */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top Ruoli Cercati
              </h3>
              <Link href="/university/analytics/ricerche/ruoli" className="text-sm text-[#D0E957] hover:underline">
                Vedi tutti
              </Link>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockTopRoles.map((item, index) => {
                const style = roleColorStyles[index];
                const maxPercentage = Math.max(...mockTopRoles.map(d => d.percentage));

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
                          <p className="font-normal text-xs text-[#8D96AC]">
                            {item.percentage}% delle ricerche
                          </p>
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

        </div>
      </div>

      {/* ================================================================== */}
      {/* QUICK ACTIONS */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] py-8">
        <h3 className="text-lg font-semibold text-[#212746] mb-4">Azioni Rapide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Action 1: Gestisci Studenti */}
          <Link
            href="/university/studenti"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#6D7BFC] hover:shadow-sm transition-all"
          >
            <span className="text-[#6D7BFC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Gestisci Studenti</span>
          </Link>

          {/* Action 2: Esporta Report */}
          <Link
            href="/university/export"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#6D7BFC] hover:shadow-sm transition-all"
          >
            <span className="text-[#6D7BFC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Esporta Report</span>
          </Link>

          {/* Action 3: Visualizza Analytics */}
          <Link
            href="/university/analytics"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#6D7BFC] hover:shadow-sm transition-all"
          >
            <span className="text-[#6D7BFC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Visualizza Analytics</span>
          </Link>

          {/* Action 4: Impostazioni */}
          <Link
            href="/university/settings"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#6D7BFC] hover:shadow-sm transition-all"
          >
            <span className="text-[#6D7BFC]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Impostazioni</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
