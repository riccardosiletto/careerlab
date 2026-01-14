'use client';

import Link from 'next/link';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// =============================================================================
// MOCK DATA
// =============================================================================

const mockOwnUniversity = {
  name: 'Universita Bocconi',
  rankings: {
    overall: 3,
    placement: 2,
    salary: 1,
    engagement: 5,
  },
  scores: {
    placement: 89,
    salary: 92,
    engagement: 78,
    satisfaction: 85,
  },
};

const mockNationalAverage = {
  placement: 72,
  salary: 65,
  engagement: 58,
};

const mockTopCompetitors = [
  { name: 'Politecnico di Milano', ranking: 1, score: 91 },
  { name: 'LUISS', ranking: 2, score: 88 },
  { name: 'Universita Cattolica', ranking: 4, score: 84 },
];

// Radar chart data
const radarData = [
  {
    metric: 'Placement',
    bocconi: 89,
    polimi: 91,
    luiss: 88,
    cattolica: 84,
  },
  {
    metric: 'Salario',
    bocconi: 92,
    polimi: 88,
    luiss: 90,
    cattolica: 82,
  },
  {
    metric: 'Engagement',
    bocconi: 78,
    polimi: 82,
    luiss: 75,
    cattolica: 80,
  },
  {
    metric: 'Soddisfazione',
    bocconi: 85,
    polimi: 87,
    luiss: 82,
    cattolica: 79,
  },
];

// Placement trend data (last 5 years)
const placementTrendData = [
  { year: '2020', bocconi: 82, polimi: 85, media: 68 },
  { year: '2021', bocconi: 84, polimi: 87, media: 69 },
  { year: '2022', bocconi: 86, polimi: 89, media: 70 },
  { year: '2023', bocconi: 88, polimi: 90, media: 71 },
  { year: '2024', bocconi: 89, polimi: 91, media: 72 },
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
  } : { r: 255, g: 184, b: 0 };
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

export default function BenchmarkingPage() {
  // Calculate differences from national average
  const placementDiff = mockOwnUniversity.scores.placement - mockNationalAverage.placement;
  const salaryDiff = mockOwnUniversity.scores.salary - mockNationalAverage.salary;
  const engagementDiff = mockOwnUniversity.scores.engagement - mockNationalAverage.engagement;

  const colorStyles = generateColorFades('#FFB800', mockTopCompetitors.length + 1);

  return (
    <div className="min-h-screen bg-[#F0F3FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8EAF8]">
        <div className="px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#212746]">Benchmarking</h1>
              <p className="text-sm text-[#5A607F] mt-1">
                Confronta la tua universita con le altre istituzioni italiane
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/university/benchmarking/compare"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8EAF8] text-[#212746] text-sm font-medium rounded-lg hover:border-[#FFB800] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Confronta Atenei
              </Link>
              <Link
                href="/university/benchmarking/rankings"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFB800] text-[#212746] text-sm font-medium rounded-lg hover:bg-[#E5A600] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Classifiche
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-6">

        {/* ================================================================== */}
        {/* KPI CARDS - Question Style with Yellow Theme */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Card 1: Posizione nella classifica generale */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Dove ti posizioni in Italia?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <span className="font-medium text-[82px] text-[#6D7BFC] leading-[72px]">
                  {mockOwnUniversity.rankings.overall}°
                </span>
                <span className="text-[#8D96AC] text-lg font-medium mb-2">posto</span>
                {/* Trend Up Arrow */}
                <div className="flex items-center gap-1 text-[#22C55E] mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <span className="text-sm font-medium">+2</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Classifica generale tra <span className="font-medium">tutte le universita</span> italiane
              </p>
            </div>
          </div>

          {/* Card 2: Placement Rate */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Come va il placement?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <span className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockOwnUniversity.scores.placement}%
                </span>
                {/* Ranking badge */}
                <div className="mb-2 flex items-center gap-1 px-2 py-1 bg-[#FFB800]/20 rounded-full">
                  <span className="text-[#212746] text-sm font-bold">#{mockOwnUniversity.rankings.placement}</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                <span className="font-medium text-[#22C55E]">+{placementDiff}%</span> rispetto alla media nazionale ({mockNationalAverage.placement}%)
              </p>
            </div>
          </div>

          {/* Card 3: Livello Salariale */}
          <div className="bg-white flex flex-col gap-2 items-start pb-6 border border-[#E8EAF8] rounded-b-lg">
            <div className="bg-[#212746] flex items-center justify-center p-5 w-full">
              <p className="flex-1 font-medium text-xl text-white">
                Quanto guadagnano i tuoi laureati?
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center px-6 w-full pt-2">
              <div className="flex gap-2 items-end">
                <span className="font-medium text-[82px] text-[#212746] leading-[72px]">
                  {mockOwnUniversity.rankings.salary}°
                </span>
                {/* First place badge */}
                <div className="mb-2 flex items-center gap-1 px-3 py-1 bg-[#D0E957] rounded-full">
                  <svg className="w-4 h-4 text-[#212746]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[#212746] text-sm font-bold">Top</span>
                </div>
              </div>
              <p className="font-normal text-base text-[#5A607F] leading-5">
                Score salariale <span className="font-medium">{mockOwnUniversity.scores.salary}/100</span> - <span className="font-medium text-[#22C55E]">+{salaryDiff}%</span> vs media
              </p>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* MAIN CONTENT GRID */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Radar Chart & Rankings Summary */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Radar Chart */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Confronto Multidimensionale
                </h3>
                <span className="text-sm text-[#FFB800]">vs Top 3 Competitor</span>
              </div>
              <div className="p-6">
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                      <PolarGrid stroke="#E8EAF8" />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: '#5A607F', fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#8D96AC', fontSize: 10 }}
                        axisLine={false}
                      />
                      <Radar
                        name="Bocconi"
                        dataKey="bocconi"
                        stroke="#FFB800"
                        fill="#FFB800"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Politecnico"
                        dataKey="polimi"
                        stroke="#6D7BFC"
                        fill="#6D7BFC"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                      <Radar
                        name="LUISS"
                        dataKey="luiss"
                        stroke="#9D52FF"
                        fill="#9D52FF"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Cattolica"
                        dataKey="cattolica"
                        stroke="#8D96AC"
                        fill="#8D96AC"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                    <span className="text-sm text-[#212746] font-medium">{mockOwnUniversity.name}</span>
                  </div>
                  {mockTopCompetitors.map((comp, index) => (
                    <div key={comp.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: index === 0 ? '#6D7BFC' : index === 1 ? '#9D52FF' : '#8D96AC' }}
                      />
                      <span className="text-sm text-[#5A607F]">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Placement Trend Chart */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Trend Placement Rate
                </h3>
                <span className="text-sm text-[#FFB800]">Ultimi 5 anni</span>
              </div>
              <div className="p-6">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={placementTrendData} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF8" />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: '#5A607F', fontSize: 12 }}
                        axisLine={{ stroke: '#E8EAF8' }}
                      />
                      <YAxis
                        domain={[60, 100]}
                        tick={{ fill: '#8D96AC', fontSize: 11 }}
                        axisLine={{ stroke: '#E8EAF8' }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#212746',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        labelStyle={{ color: '#FFB800', fontWeight: 'bold' }}
                        formatter={(value) => [`${value}%`, '']}
                      />
                      <Line
                        type="monotone"
                        dataKey="bocconi"
                        name="Bocconi"
                        stroke="#FFB800"
                        strokeWidth={3}
                        dot={{ fill: '#FFB800', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="polimi"
                        name="Politecnico"
                        stroke="#6D7BFC"
                        strokeWidth={2}
                        dot={{ fill: '#6D7BFC', strokeWidth: 2, r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="media"
                        name="Media Nazionale"
                        stroke="#8D96AC"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 rounded-full bg-[#FFB800]" />
                    <span className="text-sm text-[#212746] font-medium">Bocconi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 rounded-full bg-[#6D7BFC]" />
                    <span className="text-sm text-[#5A607F]">Politecnico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 rounded-full bg-[#8D96AC]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #8D96AC 0px, #8D96AC 4px, transparent 4px, transparent 8px)' }} />
                    <span className="text-sm text-[#8D96AC]">Media IT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vs National Average Summary */}
            <div className="bg-white border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Rispetto alla Media Nazionale
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Placement vs National */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className={`text-[48px] font-medium leading-none ${placementDiff >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {placementDiff >= 0 ? '+' : ''}{placementDiff}%
                      </span>
                    </div>
                    <p className="text-sm text-[#8D96AC]">Placement Rate</p>
                    <p className="text-xs text-[#ADB3C7] mt-1">
                      Tu: {mockOwnUniversity.scores.placement}% | Media: {mockNationalAverage.placement}%
                    </p>
                  </div>

                  {/* Salary vs National */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className={`text-[48px] font-medium leading-none ${salaryDiff >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {salaryDiff >= 0 ? '+' : ''}{salaryDiff}%
                      </span>
                    </div>
                    <p className="text-sm text-[#8D96AC]">Score Salariale</p>
                    <p className="text-xs text-[#ADB3C7] mt-1">
                      Tu: {mockOwnUniversity.scores.salary} | Media: {mockNationalAverage.salary}
                    </p>
                  </div>

                  {/* Engagement vs National */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className={`text-[48px] font-medium leading-none ${engagementDiff >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {engagementDiff >= 0 ? '+' : ''}{engagementDiff}%
                      </span>
                    </div>
                    <p className="text-sm text-[#8D96AC]">Engagement</p>
                    <p className="text-xs text-[#ADB3C7] mt-1">
                      Tu: {mockOwnUniversity.scores.engagement}% | Media: {mockNationalAverage.engagement}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Rankings Quick View & CTAs */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">

            {/* Your Position Card */}
            <div className="bg-[#FFB800]/15 border border-[#FFB800]/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFB800] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15L8.5 21L10 16L6 15L12 3L18 15L14 16L15.5 21L12 15Z" fill="#212746"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#5A607F]">La tua posizione</p>
                  <p className="font-bold text-xl text-[#212746]">{mockOwnUniversity.name}</p>
                </div>
              </div>

              {/* Rankings summary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-[#5A607F]">Classifica Generale</span>
                  <span className="font-bold text-[#212746]">#{mockOwnUniversity.rankings.overall}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-[#5A607F]">Placement</span>
                  <span className="font-bold text-[#212746]">#{mockOwnUniversity.rankings.placement}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-[#5A607F]">Salari</span>
                  <span className="font-bold text-[#D0E957] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    #{mockOwnUniversity.rankings.salary}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-[#5A607F]">Engagement</span>
                  <span className="font-bold text-[#212746]">#{mockOwnUniversity.rankings.engagement}</span>
                </div>
              </div>
            </div>

            {/* Top Competitors Quick View */}
            <div className="bg-white flex flex-col border border-[#E8EAF8] rounded-b-lg">
              <div className="bg-[#212746] flex items-center justify-between px-5 py-4 w-full">
                <h3 className="font-medium text-[19px] text-white">
                  Principali Competitor
                </h3>
                <Link href="/university/benchmarking/rankings" className="text-sm text-[#FFB800] hover:underline">
                  Vedi tutti
                </Link>
              </div>

              <div className="flex flex-col gap-2 items-start pb-5 pt-4 px-5 w-full">
                {/* Own university highlighted */}
                <div className="relative flex items-center gap-3 p-3 border-2 border-[#FFB800] bg-[#FFB800]/10 w-full overflow-hidden rounded-lg">
                  <span className="absolute -top-2 -right-2 bg-[#FFB800] text-[#212746] text-xs font-bold px-2 py-0.5 rounded-full">
                    TU
                  </span>
                  <div className="relative z-10 flex items-center gap-3 w-full">
                    <div className="w-1 h-10 flex-shrink-0 rounded-full bg-[#FFB800]" />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold text-base text-[#212746]">
                          {mockOwnUniversity.name}
                        </p>
                        <p className="font-normal text-xs text-[#8D96AC]">
                          Score: {mockOwnUniversity.scores.placement}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-[#FFB800]">
                          #{mockOwnUniversity.rankings.overall}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other competitors */}
                {mockTopCompetitors.map((comp, index) => {
                  const style = colorStyles[index + 1];
                  return (
                    <div
                      key={comp.name}
                      className="relative flex items-center gap-3 p-3 border border-[#E8EAF8] hover:border-[#FFB800] transition-all w-full overflow-hidden rounded-lg"
                    >
                      <div
                        className="absolute inset-0 transition-all duration-300"
                        style={{
                          backgroundColor: style.bg,
                          width: `${(comp.score / 100) * 100}%`,
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
                              {comp.name}
                            </p>
                            <p className="font-normal text-xs text-[#8D96AC]">
                              Score: {comp.score}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xl text-[#212746]">
                              #{comp.ranking}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA: Deep Comparison */}
            <Link
              href="/university/benchmarking/compare"
              className="bg-[#FFB800] p-5 flex flex-col items-center justify-center text-center rounded-lg hover:bg-[#E5A600] transition-colors cursor-pointer group"
            >
              <div className="mb-3 transform group-hover:scale-105 transition-transform">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="24" width="10" height="20" rx="2" fill="#212746"/>
                  <rect x="19" y="14" width="10" height="30" rx="2" fill="#212746"/>
                  <rect x="34" y="4" width="10" height="40" rx="2" fill="#212746"/>
                  <path d="M9 8L24 4L39 8" stroke="#212746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="4" r="2" fill="#212746"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#212746] mb-1">Confronto Approfondito</h4>
              <p className="text-sm text-[#212746]/70 mb-3 leading-tight">
                Seleziona fino a 4 universita<br />da confrontare nel dettaglio
              </p>
              <span className="bg-[#212746] text-[#FFB800] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
                Inizia Confronto
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
