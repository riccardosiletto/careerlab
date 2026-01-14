'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockTopCountries = [
  { name: 'Italia', count: 1200, percentage: 45, flag: 'IT', region: 'Europa' },
  { name: 'Regno Unito', count: 450, percentage: 17, flag: 'GB', region: 'Europa' },
  { name: 'Stati Uniti', count: 380, percentage: 14, flag: 'US', region: 'Nord America' },
  { name: 'Germania', count: 180, percentage: 7, flag: 'DE', region: 'Europa' },
  { name: 'Francia', count: 145, percentage: 5, flag: 'FR', region: 'Europa' },
  { name: 'Spagna', count: 98, percentage: 4, flag: 'ES', region: 'Europa' },
  { name: 'Svizzera', count: 87, percentage: 3, flag: 'CH', region: 'Europa' },
  { name: 'Paesi Bassi', count: 65, percentage: 2, flag: 'NL', region: 'Europa' },
  { name: 'Singapore', count: 45, percentage: 1.7, flag: 'SG', region: 'Asia' },
  { name: 'Emirati Arabi', count: 38, percentage: 1.4, flag: 'AE', region: 'Asia' },
  { name: 'Hong Kong', count: 32, percentage: 1.2, flag: 'HK', region: 'Asia' },
  { name: 'Canada', count: 28, percentage: 1.0, flag: 'CA', region: 'Nord America' },
  { name: 'Australia', count: 24, percentage: 0.9, flag: 'AU', region: 'Oceania' },
  { name: 'Irlanda', count: 22, percentage: 0.8, flag: 'IE', region: 'Europa' },
  { name: 'Lussemburgo', count: 18, percentage: 0.7, flag: 'LU', region: 'Europa' },
];

const mockRegionBreakdown = [
  { region: 'Europa', count: 2265, percentage: 83, color: '#FF8A8A' },
  { region: 'Nord America', count: 408, percentage: 15, color: '#6D7BFC' },
  { region: 'Asia', count: 115, percentage: 4, color: '#9D52FF' },
  { region: 'Oceania', count: 24, percentage: 1, color: '#D0E957' },
];

const mockStats = {
  uniqueCountries: 47,
  totalSearches: 2812,
  italiaPercentage: 45,
  esteroPercentage: 55,
};

// Flag emoji map
const flagEmojis: Record<string, string> = {
  'IT': '\u{1F1EE}\u{1F1F9}',
  'GB': '\u{1F1EC}\u{1F1E7}',
  'US': '\u{1F1FA}\u{1F1F8}',
  'DE': '\u{1F1E9}\u{1F1EA}',
  'FR': '\u{1F1EB}\u{1F1F7}',
  'ES': '\u{1F1EA}\u{1F1F8}',
  'CH': '\u{1F1E8}\u{1F1ED}',
  'NL': '\u{1F1F3}\u{1F1F1}',
  'SG': '\u{1F1F8}\u{1F1EC}',
  'AE': '\u{1F1E6}\u{1F1EA}',
  'HK': '\u{1F1ED}\u{1F1F0}',
  'CA': '\u{1F1E8}\u{1F1E6}',
  'AU': '\u{1F1E6}\u{1F1FA}',
  'IE': '\u{1F1EE}\u{1F1EA}',
  'LU': '\u{1F1F1}\u{1F1FA}',
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
  } : { r: 255, g: 138, b: 138 };
};

const generateColorFades = (baseColor: string, count: number) => {
  const rgb = hexToRgb(baseColor);
  const styles = [];
  for (let i = 0; i < count; i++) {
    const opacity = 1.0 - (i * 0.05);
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

export default function TopCountriesPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const countryColorStyles = generateColorFades('#FF8A8A', mockTopCountries.length);
  const maxPercentage = Math.max(...mockTopCountries.map(d => d.percentage));

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
            <span className="text-[#FF8A8A]">Per Paese</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#212746]">Destinazioni per Paese</h1>
              <p className="text-sm text-[#5A607F] mt-1">
                I paesi di destinazione piu cercati dai tuoi studenti
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
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Unique Countries */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Paesi unici
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <p className="font-medium text-[56px] text-[#6D7BFC] leading-[52px]">
                {mockStats.uniqueCountries}
              </p>
              <p className="font-normal text-sm text-[#5A607F]">
                Paesi esplorati nel periodo
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
              <p className="font-medium text-[56px] text-[#212746] leading-[52px]">
                {mockStats.totalSearches.toLocaleString('it-IT')}
              </p>
              <p className="font-normal text-sm text-[#5A607F]">
                Ricerche per destinazione
              </p>
            </div>
          </div>

          {/* Italia */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Italia
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex items-end gap-2">
                <p className="font-medium text-[56px] text-[#212746] leading-[52px]">
                  {mockStats.italiaPercentage}%
                </p>
                <span className="text-3xl mb-1">{flagEmojis['IT']}</span>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Studenti interessati a restare
              </p>
            </div>
          </div>

          {/* Estero */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Estero
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex items-end gap-2">
                <p className="font-medium text-[56px] text-[#212746] leading-[52px]">
                  {mockStats.esteroPercentage}%
                </p>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                  <circle cx="12" cy="12" r="10" stroke="#9D52FF" strokeWidth="2"/>
                  <path d="M2 12H22" stroke="#9D52FF" strokeWidth="2"/>
                  <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="#9D52FF" strokeWidth="2"/>
                </svg>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Studenti interessati all&apos;estero
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Countries List */}
          <div className="lg:col-span-2 bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            {/* Dark header */}
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Top Paesi di Destinazione
              </h3>
              <span className="text-sm text-[#D0E957]">
                Per numero di ricerche
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full max-h-[700px] overflow-y-auto">
              {mockTopCountries.map((item, index) => {
                const style = countryColorStyles[index];

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
                      {/* Flag */}
                      <div className="w-10 h-10 flex items-center justify-center text-2xl flex-shrink-0">
                        {flagEmojis[item.flag] || item.flag}
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
                                backgroundColor: item.region === 'Europa' ? '#FF8A8A20' :
                                                 item.region === 'Nord America' ? '#6D7BFC20' :
                                                 item.region === 'Asia' ? '#9D52FF20' : '#D0E95720',
                                color: item.region === 'Europa' ? '#FF8A8A' :
                                       item.region === 'Nord America' ? '#6D7BFC' :
                                       item.region === 'Asia' ? '#9D52FF' : '#8D9600',
                              }}
                            >
                              {item.region}
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

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Italia vs Estero */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              {/* Dark header */}
              <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Italia vs Estero
                </h3>
              </div>

              <div className="p-5">
                {/* Donut chart placeholder */}
                <div className="relative flex items-center justify-center mb-6">
                  <svg viewBox="0 0 120 120" className="w-40 h-40">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#F5F7FA"
                      strokeWidth="16"
                    />
                    {/* Italia segment */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#6D7BFC"
                      strokeWidth="16"
                      strokeDasharray={`${mockStats.italiaPercentage * 3.14} 314`}
                      strokeDashoffset="0"
                      transform="rotate(-90 60 60)"
                      strokeLinecap="round"
                    />
                    {/* Estero segment */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#9D52FF"
                      strokeWidth="16"
                      strokeDasharray={`${mockStats.esteroPercentage * 3.14} 314`}
                      strokeDashoffset={`-${mockStats.italiaPercentage * 3.14}`}
                      transform="rotate(-90 60 60)"
                      strokeLinecap="round"
                    />
                    {/* Center text */}
                    <text x="60" y="55" textAnchor="middle" className="text-2xl font-bold" fill="#212746">
                      {mockStats.totalSearches.toLocaleString('it-IT')}
                    </text>
                    <text x="60" y="72" textAnchor="middle" className="text-xs" fill="#8D96AC">
                      ricerche
                    </text>
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#6D7BFC]" />
                    <span className="text-sm text-[#212746]">Italia {mockStats.italiaPercentage}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#9D52FF]" />
                    <span className="text-sm text-[#212746]">Estero {mockStats.esteroPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Breakdown */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              {/* Dark header */}
              <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Per Regione
                </h3>
              </div>

              <div className="p-5 space-y-4">
                {mockRegionBreakdown.map((region) => (
                  <div key={region.region} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#212746]">{region.region}</span>
                      <span className="text-sm text-[#8D96AC]">{region.count.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="h-3 bg-[#F5F7FA] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${region.percentage}%`,
                          backgroundColor: region.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#8D96AC]">{region.percentage}% del totale</span>
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
                      <span className="font-bold text-[#FF8A8A]">UK</span> e la destinazione estera piu cercata con il <span className="font-semibold">17%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#6D7BFC]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#6D7BFC" strokeWidth="2"/>
                      <path d="M2 12H22" stroke="#6D7BFC" strokeWidth="2"/>
                      <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22" stroke="#6D7BFC" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      Le ricerche per <span className="font-semibold">Asia</span> sono cresciute del <span className="font-bold text-[#6D7BFC]">28%</span> questo mese
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#9D52FF]/10 rounded-lg flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#9D52FF"/>
                      <path d="M2 17L12 22L22 17" stroke="#9D52FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#212746]">
                      <span className="font-bold text-[#9D52FF]">55%</span> degli studenti e aperto a lavorare all&apos;estero
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
