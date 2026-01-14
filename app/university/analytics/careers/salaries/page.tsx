'use client';

import { useState } from 'react';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockSalaries = {
  entry: { min: 28000, median: 35000, p75: 42000, max: 55000 },
  after3Years: { min: 38000, median: 52000, p75: 65000, max: 85000 },
  after5Years: { min: 48000, median: 68000, p75: 82000, max: 120000 },
  bySector: [
    { sector: 'Consulting', entry: 38000, after3: 58000, after5: 85000 },
    { sector: 'Finance', entry: 42000, after3: 62000, after5: 95000 },
    { sector: 'Tech', entry: 40000, after3: 55000, after5: 78000 },
    { sector: 'FMCG', entry: 32000, after3: 45000, after5: 62000 },
    { sector: 'Healthcare', entry: 30000, after3: 42000, after5: 58000 },
  ],
  byCourse: [
    { course: 'Data Science', median: 42000 },
    { course: 'Finanza', median: 40000 },
    { course: 'Management', median: 38000 },
    { course: 'Marketing', median: 34000 },
    { course: 'Economia', median: 33000 },
  ],
  marketBenchmark: {
    national: 32000,
    topUniversities: 36000,
  },
  growthRate: 48, // % growth in 5 years
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const formatSalary = (value: number) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
};

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
    const bgOpacity = Math.max(0.1, opacity * 0.15);
    styles.push({
      bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgOpacity})`,
      accent: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    });
  }
  return styles;
};

// =============================================================================
// SALARY RANGE COMPONENT
// =============================================================================

function SalaryRangeBar({ data, label, color }: {
  data: { min: number; median: number; p75: number; max: number };
  label: string;
  color: string;
}) {
  const range = data.max - data.min;
  const minPos = 0;
  const medianPos = ((data.median - data.min) / range) * 100;
  const p75Pos = ((data.p75 - data.min) / range) * 100;
  const maxPos = 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-[#212746]">{label}</span>
        <span className="text-lg font-bold" style={{ color }}>{formatSalary(data.median)}</span>
      </div>

      {/* Range bar container */}
      <div className="relative h-10 w-full">
        {/* Background track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-[#E8EAF8] rounded-full" />

        {/* Colored range (min to max) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`,
            background: `linear-gradient(to right, ${color}40, ${color}80)`,
          }}
        />

        {/* Median marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
          style={{ left: `${medianPos}%`, transform: 'translate(-50%, -50%)', backgroundColor: color }}
        />

        {/* P75 marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm"
          style={{ left: `${p75Pos}%`, transform: 'translate(-50%, -50%)', backgroundColor: `${color}99` }}
        />

        {/* Min/Max labels */}
        <div className="absolute top-full mt-1 left-0 text-xs text-[#8D96AC]">
          {formatSalary(data.min)}
        </div>
        <div className="absolute top-full mt-1 right-0 text-xs text-[#8D96AC]">
          {formatSalary(data.max)}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-[#8D96AC]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span>Mediana</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${color}99` }} />
          <span>75° percentile</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function SalariesPage() {
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'after3Years' | 'after5Years'>('entry');

  const courseColorStyles = generateColorFades('#C299FF', mockSalaries.byCourse.length);
  const sectorColorStyles = generateColorFades('#9D52FF', mockSalaries.bySector.length);

  const currentData = mockSalaries[experienceLevel];
  const experienceLabels = {
    entry: 'Entry Level',
    after3Years: 'Dopo 3 anni',
    after5Years: 'Dopo 5 anni',
  };

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
          <span className="text-[#212746] font-medium">Salari</span>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">Distribuzione Salari</h1>
            <p className="font-normal text-base text-[#5A607F] mt-1">
              Retribuzioni entry-level e progressione salariale dei laureati
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

          {/* Card 1: Salario Mediano Entry */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanto guadagnano all&apos;inizio?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[72px] text-[#6D7BFC] leading-[64px]">
                  {formatSalary(mockSalaries.entry.median)}
                </p>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+5%</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium">Salario mediano</span> entry level (RAL)
              </p>
            </div>
          </div>

          {/* Card 2: Crescita a 5 anni */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Come crescono in 5 anni?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  +{mockSalaries.growthRate}%
                </p>
                <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 8L13.5 24" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M7 14L13.5 8L20 14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Crescita media della RAL nei <span className="font-medium">primi 5 anni</span>
              </p>
            </div>
          </div>

          {/* Card 3: vs Benchmark */}
          <div className="bg-white flex-1 flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Rispetto al mercato?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end font-medium text-[#212746]">
                <span className="text-[82px] leading-[72px]">
                  +{Math.round(((mockSalaries.entry.median - mockSalaries.marketBenchmark.national) / mockSalaries.marketBenchmark.national) * 100)}%
                </span>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                sopra la <span className="font-medium">media nazionale</span> ({formatSalary(mockSalaries.marketBenchmark.national)})
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* SALARY RANGE VISUALIZATION */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_1.5fr] gap-0">

            {/* Left: Experience Level Selector */}
            <div className="bg-white p-6 flex flex-col border-r border-[#E8EAF8]">
              <span className="text-base font-semibold text-[#8D96AC] mb-6 uppercase tracking-wider">
                Seleziona Esperienza
              </span>

              <div className="flex flex-col gap-3 mb-6">
                {(['entry', 'after3Years', 'after5Years'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      experienceLevel === level
                        ? 'bg-[#C299FF] text-white'
                        : 'bg-[#F5F7FA] text-[#5A607F] hover:bg-[#E8EAF8]'
                    }`}
                  >
                    <span className="font-medium">{experienceLabels[level]}</span>
                    <span className="block text-sm mt-0.5 opacity-80">
                      Mediana: {formatSalary(mockSalaries[level].median)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Benchmark Box */}
              <div className="w-full bg-[#F5F7FA] rounded-lg px-5 py-5 mt-auto">
                <h4 className="text-base font-bold text-[#212746] mb-3">Benchmark Mercato</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#5A607F]">Media Nazionale</span>
                  <span className="font-semibold text-[#212746]">{formatSalary(mockSalaries.marketBenchmark.national)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#5A607F]">Top Universita</span>
                  <span className="font-semibold text-[#212746]">{formatSalary(mockSalaries.marketBenchmark.topUniversities)}</span>
                </div>
              </div>
            </div>

            {/* Right: Range Visualization */}
            <div className="bg-white p-6 flex flex-col">
              <span className="text-base font-semibold text-[#8D96AC] mb-6 uppercase tracking-wider">
                Distribuzione Salariale - {experienceLabels[experienceLevel]}
              </span>

              <div className="flex-1 flex flex-col justify-center">
                <SalaryRangeBar
                  data={currentData}
                  label={experienceLabels[experienceLevel]}
                  color="#C299FF"
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E8EAF8]">
                  <div className="text-center">
                    <span className="text-xs text-[#8D96AC] uppercase tracking-wide">Minimo</span>
                    <p className="font-bold text-lg text-[#212746] mt-1">{formatSalary(currentData.min)}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#8D96AC] uppercase tracking-wide">Mediana</span>
                    <p className="font-bold text-lg text-[#C299FF] mt-1">{formatSalary(currentData.median)}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#8D96AC] uppercase tracking-wide">75° Percentile</span>
                    <p className="font-bold text-lg text-[#212746] mt-1">{formatSalary(currentData.p75)}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#8D96AC] uppercase tracking-wide">Massimo</span>
                    <p className="font-bold text-lg text-[#212746] mt-1">{formatSalary(currentData.max)}</p>
                  </div>
                </div>
              </div>

              {/* Distribution Chart Placeholder */}
              <div className="mt-6 bg-[#F5F7FA] rounded-lg p-4 flex items-center justify-center min-h-[120px] border-2 border-dashed border-[#E8EAF8]">
                <div className="text-center">
                  <svg className="mx-auto w-10 h-10 text-[#C299FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3v18h18" />
                    <path d="M7 12h2v5H7z" fill="currentColor" fillOpacity="0.3"/>
                    <path d="M11 8h2v9h-2z" fill="currentColor" fillOpacity="0.5"/>
                    <path d="M15 10h2v7h-2z" fill="currentColor" fillOpacity="0.4"/>
                  </svg>
                  <p className="mt-2 text-xs text-[#8D96AC]">Grafico distribuzione</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* BREAKDOWN SECTIONS */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="grid grid-cols-2 gap-6">

          {/* By Course */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Salario per Corso di Laurea
              </h3>
              <span className="text-sm text-[#D0E957]">Entry Level</span>
            </div>

            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockSalaries.byCourse.map((item, index) => {
                const style = courseColorStyles[index];
                const maxMedian = Math.max(...mockSalaries.byCourse.map(d => d.median));

                return (
                  <div
                    key={item.course}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#C299FF] transition-all w-full overflow-hidden rounded-lg"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(item.median / maxMedian) * 100}%`,
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
                            {item.course}
                          </p>
                          <p className="font-normal text-xs text-[#8D96AC]">
                            {item.median > mockSalaries.entry.median ? 'Sopra la media' : 'Nella media'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-[#212746]">
                            {formatSalary(item.median)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Sector */}
          <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
              <h3 className="font-medium text-[19px] text-white">
                Salario per Settore
              </h3>
              <span className="text-sm text-[#D0E957]">Entry Level</span>
            </div>

            <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
              {mockSalaries.bySector.map((item, index) => {
                const style = sectorColorStyles[index];
                const maxEntry = Math.max(...mockSalaries.bySector.map(d => d.entry));

                return (
                  <div
                    key={item.sector}
                    className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#9D52FF] transition-all w-full overflow-hidden rounded-lg"
                  >
                    <div
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        backgroundColor: style.bg,
                        width: `${(item.entry / maxEntry) * 100}%`,
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
                            {item.sector}
                          </p>
                          <p className="font-normal text-xs text-[#8D96AC]">
                            +{Math.round(((item.after5 - item.entry) / item.entry) * 100)}% in 5 anni
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-[#212746]">
                            {formatSalary(item.entry)}
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
      {/* PROGRESSION COMPARISON */}
      {/* ================================================================== */}
      <div className="px-[53px] pb-8">
        <div className="bg-white border border-[#E8EAF8] rounded-lg overflow-hidden">
          <div className="bg-white flex items-center justify-between px-5 py-4 w-full border-b border-[#E8EAF8]">
            <h3 className="font-medium text-xl text-[#212746]">
              Progressione Salariale per Settore
            </h3>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8EAF8]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#8D96AC]">Settore</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#8D96AC]">Entry Level</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#8D96AC]">Dopo 3 anni</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#8D96AC]">Dopo 5 anni</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-[#8D96AC]">Crescita 5Y</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalaries.bySector.map((item) => (
                    <tr key={item.sector} className="border-b border-[#E8EAF8] hover:bg-[#F5F7FA]">
                      <td className="py-3 px-4 font-medium text-[#212746]">{item.sector}</td>
                      <td className="py-3 px-4 text-right text-[#5A607F]">{formatSalary(item.entry)}</td>
                      <td className="py-3 px-4 text-right text-[#5A607F]">{formatSalary(item.after3)}</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#C299FF]">{formatSalary(item.after5)}</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#22C55E]">
                        +{Math.round(((item.after5 - item.entry) / item.entry) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
