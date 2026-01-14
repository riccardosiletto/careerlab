'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockDestinations = {
  sectors: [
    { name: 'Consulting', count: 234, percentage: 28 },
    { name: 'Finance', count: 198, percentage: 24 },
    { name: 'Tech', count: 156, percentage: 19 },
    { name: 'FMCG', count: 89, percentage: 11 },
    { name: 'Healthcare', count: 67, percentage: 8 },
    { name: 'Energy', count: 45, percentage: 5 },
    { name: 'Altri', count: 42, percentage: 5 },
  ],
  topEmployers: [
    { name: 'McKinsey & Company', count: 45, sector: 'Consulting' },
    { name: 'Deloitte', count: 38, sector: 'Consulting' },
    { name: 'Intesa Sanpaolo', count: 32, sector: 'Finance' },
    { name: 'EY', count: 28, sector: 'Consulting' },
    { name: 'BCG', count: 26, sector: 'Consulting' },
    { name: 'Amazon', count: 24, sector: 'Tech' },
    { name: 'UniCredit', count: 22, sector: 'Finance' },
    { name: 'Google', count: 18, sector: 'Tech' },
  ],
  geography: {
    italy: 72,
    abroad: 28,
    topCountries: [
      { name: 'UK', percentage: 12 },
      { name: 'Germania', percentage: 6 },
      { name: 'USA', percentage: 5 },
      { name: 'Svizzera', percentage: 3 },
      { name: 'Francia', percentage: 2 },
    ],
  },
  byCourse: [
    { course: 'Management', topSector: 'Consulting', percentage: 42 },
    { course: 'Finanza', topSector: 'Finance', percentage: 58 },
    { course: 'Marketing', topSector: 'FMCG', percentage: 35 },
    { course: 'Data Science', topSector: 'Tech', percentage: 67 },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 194, g: 153, b: 255 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.12);
    const bgOpacity = Math.max(0.1, opacity * 0.15);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

// =============================================================================
// SANKEY DIAGRAM PLACEHOLDER
// =============================================================================

function SankeyPlaceholder() {
  return (
    <div className="bg-[#F5F7FA] rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-[#E8EAF8]">
      {/* Simplified Sankey representation */}
      <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left column - Courses */}
        <rect x="20" y="20" width="60" height="40" rx="4" fill="#C299FF" fillOpacity="0.8"/>
        <rect x="20" y="70" width="60" height="35" rx="4" fill="#C299FF" fillOpacity="0.6"/>
        <rect x="20" y="115" width="60" height="30" rx="4" fill="#C299FF" fillOpacity="0.4"/>
        <rect x="20" y="155" width="60" height="25" rx="4" fill="#C299FF" fillOpacity="0.3"/>

        {/* Middle column - Sectors */}
        <rect x="170" y="15" width="60" height="50" rx="4" fill="#9D52FF" fillOpacity="0.8"/>
        <rect x="170" y="75" width="60" height="45" rx="4" fill="#9D52FF" fillOpacity="0.6"/>
        <rect x="170" y="130" width="60" height="35" rx="4" fill="#9D52FF" fillOpacity="0.4"/>
        <rect x="170" y="175" width="60" height="20" rx="4" fill="#9D52FF" fillOpacity="0.3"/>

        {/* Right column - Companies */}
        <rect x="320" y="20" width="60" height="35" rx="4" fill="#6D7BFC" fillOpacity="0.8"/>
        <rect x="320" y="65" width="60" height="30" rx="4" fill="#6D7BFC" fillOpacity="0.7"/>
        <rect x="320" y="105" width="60" height="28" rx="4" fill="#6D7BFC" fillOpacity="0.6"/>
        <rect x="320" y="143" width="60" height="25" rx="4" fill="#6D7BFC" fillOpacity="0.5"/>
        <rect x="320" y="178" width="60" height="20" rx="4" fill="#6D7BFC" fillOpacity="0.4"/>

        {/* Flow lines - simplified curved paths */}
        <path d="M80 40 C 125 40, 125 40, 170 40" stroke="#C299FF" strokeWidth="8" strokeOpacity="0.3" fill="none"/>
        <path d="M80 45 C 125 45, 125 97, 170 97" stroke="#C299FF" strokeWidth="6" strokeOpacity="0.25" fill="none"/>
        <path d="M80 87 C 125 87, 125 40, 170 40" stroke="#C299FF" strokeWidth="5" strokeOpacity="0.2" fill="none"/>
        <path d="M80 130 C 125 130, 125 147, 170 147" stroke="#C299FF" strokeWidth="4" strokeOpacity="0.2" fill="none"/>

        <path d="M230 40 C 275 40, 275 37, 320 37" stroke="#9D52FF" strokeWidth="7" strokeOpacity="0.3" fill="none"/>
        <path d="M230 97 C 275 97, 275 80, 320 80" stroke="#9D52FF" strokeWidth="6" strokeOpacity="0.25" fill="none"/>
        <path d="M230 97 C 275 97, 275 119, 320 119" stroke="#9D52FF" strokeWidth="5" strokeOpacity="0.2" fill="none"/>
        <path d="M230 147 C 275 147, 275 155, 320 155" stroke="#9D52FF" strokeWidth="4" strokeOpacity="0.2" fill="none"/>
      </svg>

      <div className="flex justify-between w-full px-8 mt-4">
        <span className="text-sm font-semibold text-[#C299FF]">Corsi</span>
        <span className="text-sm font-semibold text-[#9D52FF]">Settori</span>
        <span className="text-sm font-semibold text-[#6D7BFC]">Aziende</span>
      </div>

      <p className="mt-4 text-sm text-[#8D96AC]">Sankey Diagram - Corso → Settore → Azienda</p>
      <p className="text-xs text-[#ADB3C7]">Integrazione con D3.js o Recharts</p>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function DestinationsPage() {
  const [viewMode, setViewMode] = useState<'sectors' | 'employers'>('sectors');

  const sectorColorStyles = generateColorFades('#C299FF', mockDestinations.sectors.length);
  const employerColorStyles = generateColorFades('#9D52FF', mockDestinations.topEmployers.length);

  return (
    <div className="bg-white min-h-screen">
      {/* ================================================================== */}
      {/* BREADCRUMB & HEADER */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] pt-6 pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#8D96AC] mb-4">
          <Link href="/university" className="hover:text-[#6D7BFC] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/university/analytics" className="hover:text-[#6D7BFC] transition-colors">
            Analytics
          </Link>
          <span>/</span>
          <span className="text-[#C299FF] font-medium">Carriere</span>
          <span>/</span>
          <span className="text-[#212746] font-medium">Destinazioni</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">Destinazioni</h1>
            <p className="font-normal text-base text-[#5A607F] mt-1">
              Settori, aziende e localizzazione geografica dei laureati
            </p>
          </div>
          <button className="bg-[#C299FF] hover:bg-[#B080FF] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Esporta Report
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* KPI CARDS */}
      {/* ================================================================== */}
      <div className="px-[53px] py-8 bg-white">
        <div className="flex gap-6 items-stretch">

          {/* Card 1: Top Settore */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Qual e il settore piu popolare?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockDestinations.sectors[0].percentage}%
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                dei laureati lavora in <span className="font-medium">{mockDestinations.sectors[0].name}</span>
              </p>
            </div>
          </div>

          {/* Card 2: Top Employer */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Dove vanno di piu?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[48px] text-[#212746] leading-[48px]">
                  {mockDestinations.topEmployers[0].name}
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium">{mockDestinations.topEmployers[0].count} alumni</span> lavorano qui. E il top employer!
              </p>
            </div>
          </div>

          {/* Card 3: Estero */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti vanno all&apos;estero?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end font-medium text-[#212746]">
                <span className="text-[82px] leading-[72px]">
                  {mockDestinations.geography.abroad}%
                </span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                lavora <span className="font-medium">all&apos;estero</span>. Top: {mockDestinations.geography.topCountries[0].name} ({mockDestinations.geography.topCountries[0].percentage}%)
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* SANKEY DIAGRAM SECTION */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
          <div className="bg-white flex items-center justify-between px-5 py-4 w-full border-b border-[#E8EAF8]">
            <h3 className="font-medium text-xl text-[#212746]">
              Flusso Carriere: Corso → Settore → Azienda
            </h3>
          </div>
          <div className="p-6">
            <SankeyPlaceholder />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-2 gap-6">

          {/* ============================================================ */}
          {/* LEFT: Top Sectors / Employers */}
          {/* ============================================================ */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header with toggle */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode('sectors')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    viewMode === 'sectors'
                      ? 'bg-[#D0E957] text-[#212746]'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  Top Settori
                </button>
                <button
                  onClick={() => setViewMode('employers')}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    viewMode === 'employers'
                      ? 'bg-[#D0E957] text-[#212746]'
                      : 'bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  Top Aziende
                </button>
              </div>
              <Link href="/university/analytics/careers" className="text-sm text-[#D0E957] hover:underline">
                Vedi tutti
              </Link>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {viewMode === 'sectors' ? (
                mockDestinations.sectors.map((item, index) => {
                  const style = sectorColorStyles[index];
                  const maxPercentage = Math.max(...mockDestinations.sectors.map(d => d.percentage));

                  return (
                    <div
                      key={item.name}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#C299FF] transition-all w-full overflow-hidden rounded-lg"
                    >
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(item.percentage / maxPercentage) * 100}%`,
                        }}
                      />
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        <div
                          className="w-1 h-10 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: style.accent }}
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {item.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {item.count} alumni
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xl text-[#212746]">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                mockDestinations.topEmployers.map((item, index) => {
                  const style = employerColorStyles[index];
                  const maxCount = Math.max(...mockDestinations.topEmployers.map(d => d.count));

                  return (
                    <div
                      key={item.name}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                    >
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(item.count / maxCount) * 100}%`,
                        }}
                      />
                      <div className="relative z-10 flex items-center gap-3 w-full">
                        <div
                          className="w-1 h-10 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: style.accent }}
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-semibold text-base text-[#212746]">
                              {item.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              {item.sector}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xl text-[#212746]">
                              {item.count}
                            </span>
                            <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                              Alumni
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: Geographic Distribution */}
          {/* ============================================================ */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Distribuzione Geografica
              </h3>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {/* Italy vs Abroad Bar */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[#212746]">Italia</span>
                  <span className="font-medium text-[#212746]">Estero</span>
                </div>
                <div className="flex w-full h-10 rounded-lg overflow-hidden">
                  <div
                    className="bg-[#C299FF] flex items-center justify-center"
                    style={{ width: `${mockDestinations.geography.italy}%` }}
                  >
                    <span className="text-white font-bold">{mockDestinations.geography.italy}%</span>
                  </div>
                  <div
                    className="bg-[#9D52FF] flex items-center justify-center"
                    style={{ width: `${mockDestinations.geography.abroad}%` }}
                  >
                    <span className="text-white font-bold">{mockDestinations.geography.abroad}%</span>
                  </div>
                </div>
              </div>

              {/* Top Countries */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-[#8D96AC] uppercase tracking-wider">
                  Top Destinazioni Estero
                </h4>
                {mockDestinations.geography.topCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center gap-3">
                    <span className="w-6 text-center font-semibold text-[#8D96AC]">{index + 1}</span>
                    <div className="flex-1 bg-[#F5F7FA] rounded-lg h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C299FF] to-[#E0CCFF] flex items-center px-3"
                        style={{ width: `${(country.percentage / mockDestinations.geography.topCountries[0].percentage) * 100}%` }}
                      >
                        <span className="font-medium text-sm text-[#212746]">{country.name}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-[#212746] w-12 text-right">{country.percentage}%</span>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-[#F5F7FA] rounded-lg p-4 flex items-center justify-center min-h-[120px] border-2 border-dashed border-[#E8EAF8]">
                <div className="text-center">
                  <svg className="mx-auto w-10 h-10 text-[#C299FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <p className="mt-2 text-xs text-[#8D96AC]">Mappa interattiva</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* COURSE → SECTOR BREAKDOWN */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
          <div className="bg-white flex items-center justify-between px-5 py-4 w-full border-b border-[#E8EAF8]">
            <h3 className="font-medium text-xl text-[#212746]">
              Settore Principale per Corso
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-4">
              {mockDestinations.byCourse.map((item) => (
                <div
                  key={item.course}
                  className="bg-[#F5F7FA] rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <span className="text-sm font-medium text-[#8D96AC] mb-2">{item.course}</span>
                  <span className="text-2xl font-bold text-[#C299FF] mb-1">{item.percentage}%</span>
                  <span className="text-sm font-semibold text-[#212746]">{item.topSector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* NAVIGATION TO OTHER SECTIONS */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] py-8">
        <h3 className="text-lg font-semibold text-[#212746] mb-4">Altre Sezioni Carriere</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            href="/university/analytics/careers/placement"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Placement Rate</span>
          </Link>

          <Link
            href="/university/analytics/careers/salaries"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Distribuzione Salari</span>
          </Link>

          <Link
            href="/university/analytics/careers/flow"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Career Flow</span>
          </Link>

          <Link
            href="/university/analytics"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Tutte le Analytics</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
