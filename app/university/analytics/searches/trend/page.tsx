'use client';

import { useState } from 'react';
import Link from 'next/link';
import TrendLineChart from '@/components/university/analytics/TrendLineChart';

// =============================================================================
// MOCK DATA
// =============================================================================

const generateMockTrendData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    // Generate realistic search patterns (more activity on weekdays)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseValue = isWeekend ? 250 : 450;
    const variance = Math.floor(Math.random() * 150) - 75;
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(100, baseValue + variance),
      label: date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' }),
    });
  }
  return data;
};

const mockTrendData = {
  '7d': generateMockTrendData(7),
  '30d': generateMockTrendData(30),
  '90d': generateMockTrendData(90),
  '1y': generateMockTrendData(365),
};

const mockStats = {
  totalSearchesMonth: 15420,
  avgDaily: 514,
  peakDaily: 892,
  peakDate: '12 Gennaio 2024',
  prevMonthTotal: 12530,
  growthPercentage: 23.1,
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

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function SearchTrendPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const currentData = mockTrendData[timeRange];
  const totalSearches = currentData.reduce((sum, d) => sum + d.value, 0);
  const avgDaily = Math.round(totalSearches / currentData.length);
  const peakDaily = Math.max(...currentData.map(d => d.value));

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
            <span className="text-[#FF8A8A]">Trend Ricerche</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#212746]">Trend Ricerche</h1>
              <p className="text-sm text-[#5A607F] mt-1">
                Analizza l&apos;andamento delle ricerche nel tempo
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 bg-[#F5F7FA] p-1 rounded-lg">
              {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-[#FF8A8A] text-white'
                      : 'text-[#8D96AC] hover:text-[#212746]'
                  }`}
                >
                  {range === '7d' ? '7 giorni' : range === '30d' ? '30 giorni' : range === '90d' ? '90 giorni' : '1 anno'}
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
          {/* Total Searches */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Ricerche totali nel periodo
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[56px] text-[#6D7BFC] leading-[52px]">
                  {totalSearches.toLocaleString('it-IT')}
                </p>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+{mockStats.growthPercentage}%</span>
                </div>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Ultimi {timeRange === '7d' ? '7 giorni' : timeRange === '30d' ? '30 giorni' : timeRange === '90d' ? '90 giorni' : '12 mesi'}
              </p>
            </div>
          </div>

          {/* Average Daily */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Media giornaliera
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[56px] text-[#212746] leading-[52px]">
                  {avgDaily.toLocaleString('it-IT')}
                </p>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Ricerche al giorno
              </p>
            </div>
          </div>

          {/* Peak Daily */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Picco giornaliero
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <p className="font-medium text-[56px] text-[#212746] leading-[52px]">
                  {peakDaily.toLocaleString('it-IT')}
                </p>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Record nel periodo
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-lg text-white">
                Vs periodo precedente
              </p>
            </div>
            <div className="flex flex-col gap-3 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 22L14 6" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M7 12L14 6L21 12" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-medium text-[56px] text-[#22C55E] leading-[52px]">
                  {mockStats.growthPercentage}%
                </p>
              </div>
              <p className="font-normal text-sm text-[#5A607F]">
                Crescita rispetto al periodo precedente
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
          {/* Dark header */}
          <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
            <h3 className="font-medium text-[19px] text-white">
              Andamento Ricerche
            </h3>
            <span className="text-sm text-[#D0E957]">
              {currentData.length} giorni visualizzati
            </span>
          </div>

          {/* Chart */}
          <div className="p-6">
            <TrendLineChart
              data={currentData}
              height={350}
              color="#FF8A8A"
              showArea={true}
              showTooltip={true}
              formatValue={(value) => value.toLocaleString('it-IT')}
            />
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peak Days */}
          <div className="bg-white border border-[#E8EAF8] rounded-lg p-6">
            <h4 className="font-semibold text-lg text-[#212746] mb-4">Giorni di picco</h4>
            <div className="space-y-3">
              {currentData
                .sort((a, b) => b.value - a.value)
                .slice(0, 5)
                .map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between py-2 border-b border-[#E8EAF8] last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-[#FF8A8A]/10 text-[#FF8A8A] text-sm font-semibold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-sm text-[#212746]">{day.label}</span>
                    </div>
                    <span className="font-semibold text-[#212746]">{day.value.toLocaleString('it-IT')}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Weekly Pattern */}
          <div className="bg-white border border-[#E8EAF8] rounded-lg p-6">
            <h4 className="font-semibold text-lg text-[#212746] mb-4">Pattern settimanale</h4>
            <p className="text-sm text-[#5A607F] mb-4">
              Distribuzione media delle ricerche per giorno della settimana
            </p>
            <div className="space-y-2">
              {['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato', 'Domenica'].map((day, index) => {
                const isWeekend = index >= 5;
                const percentage = isWeekend ? 35 + Math.random() * 15 : 70 + Math.random() * 30;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-[#5A607F]">{day}</span>
                    <div className="flex-1 h-6 bg-[#F5F7FA] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: isWeekend ? '#8D96AC' : '#FF8A8A',
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-medium text-[#212746]">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
