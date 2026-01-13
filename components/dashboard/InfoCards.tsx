'use client';

import { ComposedChart, Line, XAxis, ResponsiveContainer, CartesianGrid, Area, LabelList } from 'recharts';

interface InfoCardsProps {
  company: {
    name: string;
    location: string;
    logo: string;
  };
  profilesAnalyzed: number;
  dataQuality: number;
  role: string;
  roleDescription: string;
}

export default function InfoCards({
  company,
  profilesAnalyzed,
  dataQuality,
  role,
}: InfoCardsProps) {
  // Mock data for hiring trends (last 4 years) with cumulative totals
  // Only 2022 is blurred (premium feature)
  const hiringTrendsRaw = [
    { year: '2022', hires: 12, blurred: true },
    { year: '2023', hires: 18, blurred: false },
    { year: '2024', hires: 24, blurred: false },
    { year: '2025', hires: 9, blurred: false },
  ];

  // Calculate cumulative totals starting from existing employee base
  const initialEmployees = 142; // Dipendenti già presenti prima del 2022
  let cumulative = initialEmployees;
  const hiringTrends = hiringTrendsRaw.map(item => {
    cumulative += item.hires;
    return { ...item, total: cumulative };
  });

  // Custom dot component for blur effect
  const CustomDot = (props: { cx?: number; cy?: number; payload?: { blurred?: boolean } }) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#6D7BFC"
        filter={payload?.blurred ? "url(#blurFilter)" : undefined}
        style={payload?.blurred ? { opacity: 0.6 } : undefined}
      />
    );
  };

  const maxHires = Math.max(...hiringTrends.map(t => t.hires));

  return (
    <div className="bg-white px-[53px] pt-8 pb-16 relative">
      {/* Header with Role and Company */}
      <div className="mb-6 flex items-center justify-between bg-[#F5F7FA] -mx-[53px] px-[53px] pt-8 pb-4 -mt-8">
        <div className="flex items-center gap-4">
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg" />
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">{role}</h1>
            <p className="font-normal text-base text-[#5A607F]">{company.name}</p>
          </div>
        </div>

        {/* Stats, Bookmark and New Search */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-[#8D96AC]">
            Questo ruolo è stato cercato <span className="font-semibold text-[#212746]">1567 volte</span>
          </p>
          <button className="w-11 h-11 rounded-full bg-[#F0F3FF] flex items-center justify-center hover:bg-[#E8EAF8] transition-colors">
            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.55556C0 1.14687 1.14687 0 2.55556 0H15.4444C16.8531 0 18 1.14687 18 2.55556V22.1111C18 22.5653 17.6542 22.9111 17.2 22.9111C17.0181 22.9111 16.8417 22.8486 16.7 22.7333L9 16.5556L1.3 22.7333C0.944444 23.0222 0.422222 22.9556 0.133333 22.6C0.0180556 22.4583 -0.0444444 22.2819 -0.0444444 22.1V2.55556H0Z" fill="#6D7BFC" />
            </svg>
          </button>
          {/* New Search Button */}
          <button className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nuova ricerca
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-[3fr_1fr] gap-6">
        {/* Left wrapper: Col 1 + Col 2 + Banner */}
        <div className="flex flex-col min-h-[380px]">
          {/* Top: 2 columns (Profili + Chart) */}
          <div className="grid grid-cols-[1fr_2fr] gap-6 flex-1">
            {/* 1. Left: Profili Analizzati - Flow Style */}
            <div className="bg-white p-6 flex flex-col items-center justify-center h-full">
              <span className="text-base font-semibold text-[#8D96AC] mb-4 mt-[-25px] uppercase tracking-wider text-center">Profili analizzati</span>

              {/* Main number with underline */}
              <div className="relative inline-block">
                <span className="text-[96px] font-bold text-[#212746] leading-none relative z-10">{profilesAnalyzed.toLocaleString('it-IT')}</span>
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

              {/* Sankey-style flow diagram - starts narrow (centered, 15% smaller than number), expands to full bar width */}
              <div className="w-full flex flex-col mt-0">
                <svg width="100%" height="70" viewBox="0 0 200 70" fill="none" preserveAspectRatio="none">
                  {/*
                    Sankey flow:
                    - Top: narrow width centered (15% smaller than number = ~50% width)
                    - Bottom: expands to full bar width (0-35% gray Passati, 35-100% blue Attuali)
                  */}

                  {/* Passati flow (gray) - from narrow top center, expands to left 35% */}
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

                  {/* Attuali flow (blue) - from narrow top center, expands to right 65% */}
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

                {/* Horizontal bar - no top radius, connected to Sankey above */}
                <div className="flex w-full h-12 rounded-b-lg overflow-hidden">
                  {/* Passati section - gray (left) */}
                  <div
                    className="bg-[#8D96AC] flex items-center justify-center"
                    style={{ width: `${(109 / 312) * 100}%` }}
                  >
                    <span className="text-white font-bold text-xl">109</span>
                  </div>
                  {/* Attuali section - blue (right) */}
                  <div
                    className="bg-[#6D7BFC] flex items-center justify-center"
                    style={{ width: `${(203 / 312) * 100}%` }}
                  >
                    <span className="text-white font-bold text-xl">203</span>
                  </div>
                </div>
                {/* Labels below the bar */}
                <div className="flex justify-between mt-3 px-2">
                  <span className="text-sm font-medium text-[#8D96AC] uppercase tracking-wide">Passati</span>
                  <span className="text-sm font-medium text-[#6D7BFC] uppercase tracking-wide">Attuali</span>
                </div>
              </div>

              {/* Qualità dei Dati Box */}
              <div className="w-full mt-6 bg-[#F5F7FA] rounded-lg px-5 py-5 flex items-center justify-between">
                <div className="flex flex-col" style={{ width: '60%' }}>
                  <h4 className="text-base font-bold text-[#212746] mb-0">Qualità dei Dati</h4>
                  <p className="text-xs text-[#8D96AC]">Basata su completezza dei profili</p>
                </div>
                <div className="flex items-center justify-center" style={{ width: '40%' }}>
                  <svg viewBox="0 0 100 60" className="w-24 h-16">
                    <defs>
                      <linearGradient id="qualityGradientSmall" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    {/* Filled arc (green gradient) - 84% */}
                    <path
                      d="M 10 55 A 40 40 0 0 1 90 55"
                      fill="none"
                      stroke="url(#qualityGradientSmall)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(dataQuality / 100) * 125.6} 125.6`}
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
                      {dataQuality}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* 2. Center: Nuove Assunzioni Chart + Insights */}
            <div className="flex flex-col">
              {/* Chart section */}
              <div className="bg-white px-6 pt-5 pb-1 flex flex-col overflow-visible relative flex-1">
                <h3 className="text-base font-semibold text-[#8D96AC] mb-3 uppercase tracking-wider">Nuove Assunzioni</h3>

                {/* "They are hiring" popup with company logo - positioned near 2025 base */}
                <div className="absolute right-6 bottom-[79px] z-20">
                  <div className="bg-white rounded-lg shadow-lg border border-[#E8EAF8] px-3 py-2.5 flex items-center gap-2.5">
                    <div className="flex flex-col min-w-0 text-right">
                      <span className="text-[13px] font-bold text-[#212746] leading-tight flex items-center justify-end gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0E957] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0E957]"></span>
                        </span>
                        Stanno assumendo!
                      </span>
                      <span className="text-[11px] text-[#8D96AC] leading-none mt-0.5">Questa azienda ha posizioni <br />aperte per questo ruolo</span>
                    </div>
                    <img src={company.logo} alt={company.name} className="w-9 h-9 flex-shrink-0 object-contain" />
                  </div>
                  {/* Small triangle pointer pointing down */}
                  <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r border-b border-[#E8EAF8] transform rotate-45"></div>
                </div>

                <div className="flex-1 overflow-visible" style={{ minHeight: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={hiringTrends} margin={{ top: 50, right: 40, bottom: 35, left: 40 }} style={{ overflow: 'visible' }}>
                      <defs>
                        <filter id="blurFilter" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                        </filter>
                        <linearGradient id="colorHiring" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6D7BFC" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="#6D7BFC" stopOpacity={1} />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6D7BFC" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#6D7BFC" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="0" stroke="#E8EAF8" horizontal={true} vertical={false} />
                      <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const dataPoint = hiringTrends.find(d => d.year === payload.value);
                          const isBlurred = dataPoint?.blurred;
                          return (
                            <g transform={`translate(${x},${y})`} filter={isBlurred ? "url(#blurFilter)" : undefined} style={isBlurred ? { opacity: 0.7 } : undefined}>
                              <text x={0} y={18} textAnchor="middle" fill="#212746" fontSize={18} fontWeight={700}>
                                {payload.value}
                              </text>
                            </g>
                          );
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        fill="url(#areaGradient)"
                        stroke="none"
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="url(#colorHiring)"
                        strokeWidth={4}
                        dot={<CustomDot />}
                        activeDot={{ r: 8 }}
                      >
                        <LabelList
                          dataKey="total"
                          position="top"
                          offset={12}
                          fill="#212746"
                          fontSize={22}
                          fontWeight={400}
                          content={(props) => {
                            const { x, y, value, index } = props;
                            const dataPoint = hiringTrends[index as number];
                            const isBlurred = dataPoint?.blurred;
                            return (
                              <text
                                x={x}
                                y={typeof y === 'number' ? y - 8 : y}
                                textAnchor="middle"
                                fill="#212746"
                                fontSize={22}
                                fontWeight={400}
                                filter={isBlurred ? "url(#blurFilter)" : undefined}
                                style={isBlurred ? { opacity: 0.7 } : undefined}
                              >
                                {value}
                              </text>
                            );
                          }}
                        />
                        <LabelList
                          dataKey="hires"
                          position="top"
                          content={({ viewBox, index }) => {
                            if (index === undefined || index === 0) return null;
                            const currentPoint = hiringTrends[index as number];
                            const prevPoint = hiringTrends[(index as number) - 1];
                            const isBlurred = currentPoint?.blurred || prevPoint?.blurred;
                            const vb = viewBox as { x?: number; y?: number };
                            if (!vb?.x || !vb?.y) return null;
                            const midX = vb.x - 40;
                            const midY = vb.y - 35;
                            return (
                              <text
                                x={midX}
                                y={midY}
                                textAnchor="middle"
                                fill="#8D96AC"
                                fontSize={22}
                                fontWeight={300}
                                filter={isBlurred ? "url(#blurFilter)" : undefined}
                                style={isBlurred ? { opacity: 0.7 } : undefined}
                              >
                                +{currentPoint?.hires}
                              </text>
                            );
                          }}
                        />
                      </Line>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights section */}
              <div className="flex gap-7 px-6 pb-4 mr-0 pt-2 mb-[37px] max-w-[580px] mx-auto">
                {/* Insight 1 - Under 25 */}
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
                    <span className="font-bold">Oltre il</span> <span className="font-bold text-[#6D7BFC]">37%</span> delle <span className="font-bold">assunzioni</span> sono <span className="font-bold">Under 25</span>
                  </p>
                </div>

                {/* Insight 2 - Career growth */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#6D7BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 6H23V12" stroke="#6D7BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-[#212746] leading-snug">
                    Si <span className="font-bold">sale di ruolo</span> il <span className="font-bold text-[#6D7BFC]">24%</span> più <span className="font-bold">velocemente</span> dei competitor
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End of grid Profili + Chart */}
        </div>
        {/* End of Left wrapper */}

        {/* 3. Right: Benchmark + Candidati con Recruiter */}
        <div className="flex flex-col gap-4 min-h-[380px] pb-6">
          {/* Benchmark Card - 50% height */}
          <div className="bg-[#6D7BFC]/15 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer group" style={{ flex: '1 1 50%' }}>
            <img src="/results-flow/rocket-icon.svg" alt="Benchmark" className="w-10 h-11 mb-3" />
            <p className="text-[#8D96AC] text-sm mb-1">Confrontati con i <span className="text-[#212746] font-bold">{role}</span> in</p>
            <div className="flex items-center gap-1.5 mb-3 bg-[#F6F7FA] px-2.5 py-1.5 rounded-lg">
              <img src={company.logo} alt={company.name} className="w-5 h-5 rounded" />
              <span className="text-[#212746] font-bold text-sm">{company.name}</span>
            </div>
            <button className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
              Inizia ora
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Candidati con un Recruiter - 50% height */}
          <div className="bg-[#D0E957] p-5 flex flex-col items-center justify-center text-center rounded-lg hover:bg-[#D8F76B] transition-colors cursor-pointer group" style={{ flex: '1 1 50%' }}>
            <div className="mb-3 transform group-hover:scale-105 transition-transform">
              <svg width="40" height="46" viewBox="0 0 48 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_recruiter)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M47.8951 9.45685C47.8777 9.42873 47.858 9.40286 47.8373 9.37812C47.8351 9.37587 47.8329 9.37362 47.8308 9.37024C47.8078 9.34438 47.7838 9.31963 47.7577 9.29826L36.978 0.15409C36.978 0.15409 36.9747 0.15184 36.9736 0.150716C36.9529 0.13272 36.93 0.116973 36.9071 0.102352C36.9038 0.100102 36.8995 0.0978528 36.8962 0.0956033C36.798 0.0359918 36.6845 0 36.5623 0H6.87682C5.50863 0 4.39575 1.14724 4.39575 2.55767V46.281C4.39575 46.5543 4.55505 46.7995 4.79944 46.9041C5.04384 47.0087 5.32533 46.9513 5.51299 46.7579L8.09117 44.1012C8.42066 43.7604 8.86145 43.5737 9.3317 43.5737C9.80194 43.5737 10.2351 43.7582 10.5646 44.0922C10.5668 44.0956 10.57 44.0979 10.5722 44.1012C10.9028 44.4409 11.0839 44.8953 11.0839 45.3801C11.0839 45.8648 10.9028 46.3192 10.5722 46.6589L6.01706 51.3558C5.84795 51.5302 5.78467 51.7855 5.85122 52.0217C5.91778 52.2579 6.10326 52.4378 6.33674 52.4918C6.5135 52.5323 6.69461 52.5537 6.87682 52.5537H45.5188C46.887 52.5537 47.9999 51.4064 47.9999 49.9949V9.82127C47.9999 9.68742 47.9617 9.56145 47.8951 9.45685Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.01594 51.204H45.5189C46.1648 51.204 46.6907 50.6619 46.6907 49.9949V10.4961H36.5613C36.2001 10.4961 35.9067 10.1947 35.9067 9.82128V1.3497H6.87687C6.23097 1.3497 5.70508 1.89183 5.70508 2.55768V44.6512L7.16491 43.1463C7.74208 42.5513 8.51128 42.224 9.33175 42.224C10.1522 42.224 10.9214 42.5513 11.4986 43.1463C11.5019 43.1508 11.5062 43.1542 11.5095 43.1587C12.079 43.7514 12.3933 44.5399 12.3933 45.3801C12.3933 46.2203 12.0758 47.0188 11.4986 47.6138L8.01594 51.204Z" fill="white" />
                  <path d="M26.4007 25.6667C23.7544 25.6667 21.6001 23.474 21.6001 20.7778C21.6001 18.0815 23.7531 15.8889 26.4007 15.8889C29.0483 15.8889 31.2001 18.0815 31.2001 20.7778C31.2001 23.474 29.0471 25.6667 26.4007 25.6667Z" fill="#6D7BFC" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M32.7823 37.8889C33.0037 37.8889 33.2129 37.8065 33.3714 37.6583C33.5177 37.5177 33.6 37.3315 33.6 37.1351V33.1458C33.6 29.6949 30.6355 26.8889 26.9902 26.8889H25.8109C22.1656 26.8889 19.2 29.6962 19.2 33.1458V37.1351C19.2 37.5506 19.5664 37.8889 20.0176 37.8889H32.7823Z" fill="#6D7BFC" />
                </g>
                <defs>
                  <clipPath id="clip0_recruiter">
                    <rect width="48" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4 className="text-base font-bold text-[#212746] mb-1">Candidati con un Recruiter</h4>
            <p className="text-sm text-[#212746]/70 mb-3 leading-tight">
              Fatti notare dalle aziende top<br />con un recruiter esperto
            </p>
            <button className="bg-[#212746] hover:bg-[#2D3456] text-[#D0E957] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-2">
              Manda candidatura
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gray border at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#E8EAF8]"></div>
    </div>
  );
}
