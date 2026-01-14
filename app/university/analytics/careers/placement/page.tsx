'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockPlacement = {
  rate6Months: 87,
  rate12Months: 94,
  averageTimeToJob: 2.3, // mesi
  nationalAverage: 72,
  trend: [
    { year: 2020, rate: 78 },
    { year: 2021, rate: 82 },
    { year: 2022, rate: 85 },
    { year: 2023, rate: 87 },
    { year: 2024, rate: 89 },
  ],
  byCourse: [
    { name: 'Data Science', rate: 94 },
    { name: 'Management', rate: 92 },
    { name: 'Finanza', rate: 89 },
    { name: 'Marketing', rate: 85 },
    { name: 'Economia', rate: 83 },
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
// GAUGE COMPONENT
// =============================================================================

function PlacementGauge({ value, label, gradientId, startColor, endColor }: {
  value: number;
  label: string;
  gradientId: string;
  startColor: string;
  endColor: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 60" className="w-32 h-20">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
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
        {/* Filled arc */}
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 125.6} 125.6`}
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
          {value}%
        </text>
      </svg>
      <span className="text-sm font-medium text-[#5A607F] mt-1">{label}</span>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function PlacementPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const colorStyles = generateColorFades('#C299FF', mockPlacement.byCourse.length);

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
          <span className="text-[#212746] font-medium">Placement</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">Placement Rate</h1>
            <p className="font-normal text-base text-[#5A607F] mt-1">
              Tasso di occupazione dei laureati entro 6/12 mesi dalla laurea
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

          {/* Card 1: Placement a 6 mesi */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanti trovano lavoro entro 6 mesi?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockPlacement.rate6Months}%
                </p>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+2%</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                dei laureati trova lavoro entro <span className="font-medium">6 mesi</span> dalla laurea
              </p>
            </div>
          </div>

          {/* Card 2: Placement a 12 mesi */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                E dopo un anno?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockPlacement.rate12Months}%
                </p>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium text-[#22C55E]">+{mockPlacement.rate12Months - mockPlacement.rate6Months}%</span> rispetto ai 6 mesi. Il tasso sale a <span className="font-medium">12 mesi</span>
              </p>
            </div>
          </div>

          {/* Card 3: Tempo medio */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanto tempo ci mettono?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end font-medium text-[#212746]">
                <span className="text-[82px] leading-[72px]">
                  {mockPlacement.averageTimeToJob}
                </span>
                <span className="text-2xl pb-3">mesi</span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Tempo medio per trovare il <span className="font-medium">primo impiego</span>
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
          {/* LEFT COLUMN: Trend & Breakdown */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Trend Section */}
            <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
              <div className="grid grid-cols-[1fr_1.5fr] gap-0">

                {/* Left: Gauge Visualization */}
                <div className="bg-white p-6 flex flex-col items-center justify-center border-r border-[#E8EAF8]">
                  <span className="text-base font-semibold text-[#8D96AC] mb-6 uppercase tracking-wider text-center">
                    Confronto Placement
                  </span>

                  <div className="flex gap-8 mb-6">
                    <PlacementGauge
                      value={mockPlacement.rate6Months}
                      label="6 mesi"
                      gradientId="gauge6m"
                      startColor="#C299FF"
                      endColor="#E0CCFF"
                    />
                    <PlacementGauge
                      value={mockPlacement.rate12Months}
                      label="12 mesi"
                      gradientId="gauge12m"
                      startColor="#9D52FF"
                      endColor="#C299FF"
                    />
                  </div>

                  {/* National Average Box */}
                  <div className="w-full bg-[#F5F7FA] rounded-lg px-5 py-5 flex items-center justify-between">
                    <div className="flex flex-col" style={{ width: '60%' }}>
                      <h4 className="text-base font-bold text-[#212746] mb-0">Media Nazionale</h4>
                      <p className="text-xs text-[#8D96AC]">Placement a 6 mesi dal titolo</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-[#212746]">{mockPlacement.nationalAverage}%</span>
                      <span className="text-sm font-semibold text-[#22C55E]">
                        +{mockPlacement.rate6Months - mockPlacement.nationalAverage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Trend Chart */}
                <div className="flex flex-col">
                  <div className="bg-white px-6 pt-5 pb-1 flex flex-col overflow-visible relative flex-1">
                    <h3 className="text-base font-semibold text-[#8D96AC] mb-3 uppercase tracking-wider">
                      Trend Ultimi 5 Anni
                    </h3>

                    {/* Year Selector */}
                    <div className="flex items-center gap-2 mb-4">
                      {mockPlacement.trend.map((item) => (
                        <button
                          key={item.year}
                          onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            selectedYear === item.year
                              ? 'bg-[#C299FF] text-white'
                              : 'bg-[#F5F7FA] text-[#8D96AC] hover:bg-[#E8EAF8]'
                          }`}
                        >
                          {item.year}
                        </button>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="flex-1 min-h-[200px] flex items-center justify-center bg-[#F5F7FA] rounded-lg border-2 border-dashed border-[#E8EAF8]">
                      <div className="text-center">
                        <svg className="mx-auto w-12 h-12 text-[#C299FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 3v18h18" />
                          <path d="M7 16l4-4 4 4 5-6" />
                        </svg>
                        <p className="mt-2 text-sm text-[#8D96AC]">Grafico Trend Placement</p>
                        <p className="text-xs text-[#ADB3C7]">Integrazione con Recharts</p>
                      </div>
                    </div>
                  </div>

                  {/* Trend Stats */}
                  <div className="flex gap-5 px-6 pb-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#C299FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17 6H23V12" stroke="#C299FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-[#212746] leading-snug">
                        <span className="font-bold text-[#C299FF]">+11%</span> di crescita dal <span className="font-bold">2020</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="#C299FF" strokeWidth="2"/>
                          <path d="M12 6v6l4 2" stroke="#C299FF" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-[#212746] leading-snug">
                        Tempo medio ridotto di <span className="font-bold text-[#C299FF]">0.8 mesi</span> negli ultimi 3 anni
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Navigation Cards */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-4">

            {/* Destinazioni Card */}
            <Link
              href="/university/analytics/careers/destinations"
              className="bg-[#C299FF]/15 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer group flex-1 hover:bg-[#C299FF]/25 transition-colors"
            >
              <div className="mb-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#C299FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="#C299FF" strokeWidth="2"/>
                </svg>
              </div>
              <p className="text-[#8D96AC] text-sm mb-1">Scopri dove vanno</p>
              <h4 className="text-[#212746] font-bold text-lg mb-3">Destinazioni</h4>
              <span className="bg-[#C299FF] hover:bg-[#B080FF] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
                Esplora
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            {/* Salari Card */}
            <Link
              href="/university/analytics/careers/salaries"
              className="bg-[#D0E957] p-5 flex flex-col items-center justify-center text-center rounded-lg hover:bg-[#D8F76B] transition-colors cursor-pointer group flex-1"
            >
              <div className="mb-3 transform group-hover:scale-105 transition-transform">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1V23" stroke="#212746" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#212746] mb-1">Distribuzione Salari</h4>
              <p className="text-sm text-[#212746]/70 mb-3 leading-tight">
                Retribuzioni entry-level<br />e progressione salariale
              </p>
              <span className="bg-[#212746] hover:bg-[#2D3456] text-[#D0E957] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
                Vai ai Salari
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* BREAKDOWN BY COURSE - HorizontalBarCard Style */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
          {/* Dark header */}
          <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
            <h3 className="font-medium text-[19px] text-white">
              Placement per Corso di Laurea
            </h3>
            <Link href="/university/analytics/careers" className="text-sm text-[#D0E957] hover:underline">
              Vedi tutti i corsi
            </Link>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
            {mockPlacement.byCourse.map((item, index) => {
              const style = colorStyles[index];
              const maxRate = Math.max(...mockPlacement.byCourse.map(d => d.rate));

              return (
                <div
                  key={item.name}
                  className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#C299FF] transition-all w-full overflow-hidden rounded-lg"
                >
                  {/* Background bar proportional to rate */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: style.bg,
                      width: `${(item.rate / maxRate) * 100}%`,
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
                          {item.rate >= mockPlacement.rate6Months ? 'Sopra la media' : 'Sotto la media'}
                        </p>
                      </div>

                      {/* Rate badge */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xl text-[#212746]">
                          {item.rate}%
                        </span>
                        <span className="font-normal text-[10px] text-[#8D96AC] uppercase">
                          Placement
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

      {/* ================================================================== */}
      {/* NAVIGATION TO OTHER SECTIONS */}
      {/* ================================================================== */}
      <div className="bg-[#F5F7FA] px-[53px] py-8">
        <h3 className="text-lg font-semibold text-[#212746] mb-4">Altre Sezioni Carriere</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            href="/university/analytics/careers/destinations"
            className="flex items-center gap-3 px-4 py-4 bg-white rounded-lg border border-[#E8EAF8] hover:border-[#C299FF] hover:shadow-sm transition-all"
          >
            <span className="text-[#C299FF]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-[#212746]">Destinazioni</span>
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
