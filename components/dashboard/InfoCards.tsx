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
    { year: '2022', hires: 45, blurred: true },
    { year: '2023', hires: 67, blurred: false },
    { year: '2024', hires: 89, blurred: false },
    { year: '2025', hires: 112, blurred: false },
  ];

  // Calculate cumulative totals
  let cumulative = 0;
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
    <div className="bg-white px-[53px] py-8">
      {/* Header with Role and Company */}
      <div className="mb-6 flex items-center justify-between bg-[#F5F7FA] -mx-[53px] px-[53px] pt-8 pb-4 -mt-8">
        <div className="flex items-center gap-4">
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg" />
          <div>
            <h1 className="font-bold text-3xl text-[#212746]">{role}</h1>
            <p className="font-normal text-base text-[#5A607F]">{company.name}</p>
          </div>
        </div>

        {/* Stats and Bookmark */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-[#8D96AC]">
            Questo ruolo è stato cercato <span className="font-semibold text-[#212746]">1567 volte</span>
          </p>
          <button className="w-11 h-11 rounded-full bg-[#F0F3FF] flex items-center justify-center hover:bg-[#E8EAF8] transition-colors">
            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.55556C0 1.14687 1.14687 0 2.55556 0H15.4444C16.8531 0 18 1.14687 18 2.55556V22.1111C18 22.5653 17.6542 22.9111 17.2 22.9111C17.0181 22.9111 16.8417 22.8486 16.7 22.7333L9 16.5556L1.3 22.7333C0.944444 23.0222 0.422222 22.9556 0.133333 22.6C0.0180556 22.4583 -0.0444444 22.2819 -0.0444444 22.1V2.55556H0Z" fill="#6D7BFC" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Cards Grid - 25-50-25 */}
      <div className="grid grid-cols-[25fr_50fr_25fr] gap-6">

        {/* 1. Left Column: Profiles + Data Quality stacked (25) */}
        <div className="flex flex-col gap-3">
          {/* Profiles Analyzed */}
          <div className="bg-white p-8 flex flex-col justify-center items-center flex-1">
            <span className="text-base font-semibold text-[#8D96AC] mb-4 uppercase tracking-wider">Profili analizzati</span>
            <div className="relative inline-block">
              <span className="text-[84px] font-bold text-[#212746] leading-none relative z-10">{profilesAnalyzed.toLocaleString()}</span>
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
            {/* Current vs Past bar */}
            <div className="w-full mt-[34px]">
              <div className="flex w-full h-2 rounded-full overflow-hidden">
                <div className="bg-[#6D7BFC] h-full" style={{ width: '65%' }} />
                <div className="bg-[#E8EAF8] h-full" style={{ width: '35%' }} />
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#6D7BFC]" />
                  <span className="text-xs font-medium text-[#8D96AC]">Attuali</span>
                  <span className="text-xs font-semibold text-[#212746]">203</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#E8EAF8]" />
                  <span className="text-xs font-medium text-[#8D96AC]">Passati</span>
                  <span className="text-xs font-semibold text-[#212746]">109</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Quality Half-Donut */}
          <div className="bg-[#F5F7FA] p-8 flex flex-col flex-1">
            <h3 className="text-base font-semibold text-[#8D96AC] mb-4 uppercase tracking-wider text-center">Qualità dei Dati</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[207px]">
                <svg viewBox="0 0 200 130" className="w-full">
                  <defs>
                    <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B6DC00" />
                      <stop offset="100%" stopColor="#D0E957" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E8EAF8"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#qualityGradient)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={`${(dataQuality / 100) * 251.2} 251.2`}
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                  <text
                    x="100"
                    y="105"
                    textAnchor="middle"
                    className="text-5xl font-bold"
                    fill="#212746"
                  >
                    {dataQuality}%
                  </text>
                </svg>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B6DC00]" />
                <span className="text-sm font-medium text-[#8D96AC]">Alta qualità</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Middle Column: Hiring Trends Line Chart (50) */}
        <div className="flex flex-col overflow-visible">
          <div className="bg-white px-6 pt-5 pb-1 flex flex-col flex-1 overflow-visible">
            <h3 className="text-base font-semibold text-[#8D96AC] mb-3 uppercase tracking-wider">Nuove Assunzioni</h3>

            {/* Recharts Line Chart */}
            <div className="flex-1 min-h-[320px] overflow-visible">
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
                        // Check if either adjacent point is blurred
                        const isBlurred = currentPoint?.blurred || prevPoint?.blurred;
                        // Get coordinates from viewBox
                        const vb = viewBox as { x?: number; y?: number };
                        if (!vb?.x || !vb?.y) return null;
                        // Position at midpoint between current and previous (horizontally offset left)
                        const midX = vb.x - 40; // Approximate midpoint
                        const midY = vb.y - 35; // Above the line
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

          {/* Premium Upsell Banner */}
          <div className="bg-[#6D7BFC] rounded-lg px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rocket illustration */}
              <div className="w-[50px] h-[50px] flex-shrink-0">
                <img src="/svg/layer-1.svg" alt="Rocket" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-[#D0E957] font-bold text-lg">Sblocca tutte le funzionalità!</h4>
                <p className="text-white text-sm">
                  Go Premium per avere ricerche illimitate per le posizioni che ti interessano e molto altro ancora!
                </p>
              </div>
            </div>
            <button className="bg-[#D0E957] hover:bg-[#E0F067] text-[#212746] font-bold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              Go Premium
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. Right Column: Two CTA Boxes stacked (25) */}
        <div className="flex flex-col gap-6">

          {/* Box 1: Now Hiring */}
          <div className="bg-transparent p-6 flex flex-col items-center justify-center text-center flex-1 hover:bg-[#F5F7FA] transition-colors cursor-pointer group">
            <div className="mb-3 transform group-hover:scale-105 transition-transform">
              <svg width="64" height="50" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_965_12140)">
                  <path d="M61.5394 29.354C61.4283 29.354 61.316 29.3255 61.2141 29.2671L55.2232 25.8348C54.9111 25.6559 54.804 25.2593 54.9842 24.9495C55.1644 24.6397 55.5641 24.5334 55.8762 24.7122L61.8672 28.1446C62.1793 28.3235 62.2864 28.7201 62.1062 29.0299C61.9847 29.2373 61.7653 29.354 61.5407 29.354H61.5394ZM56.6651 17.5066C56.3765 17.5066 56.1126 17.3161 56.0343 17.0257C55.9415 16.6796 56.1479 16.3245 56.4966 16.2324L63.1785 14.4553C63.5272 14.3633 63.8851 14.5681 63.9778 14.9142C64.0705 15.2603 63.8642 15.6154 63.5154 15.7075L56.8336 17.4846C56.7774 17.5001 56.72 17.5066 56.6638 17.5066H56.6651ZM51.4591 10.7741C51.3481 10.7741 51.2358 10.7456 51.1339 10.6873C50.8218 10.5084 50.7147 10.1117 50.8949 9.80195L54.3534 3.85623C54.5336 3.54644 54.9333 3.44015 55.2454 3.61903C55.5576 3.7979 55.6647 4.19454 55.4844 4.50434L52.0259 10.4501C51.9058 10.6574 51.6851 10.7741 51.4604 10.7741H51.4591Z" fill="#6D7BFC" />
                  <path d="M52.133 21.2066L50.5501 15.3426C50.4743 15.0613 50.2183 14.8656 49.9244 14.8617L45.2252 14.8202L41.8503 2.32087C41.3997 0.652651 39.6653 -0.341542 37.9844 0.10565C36.3034 0.552842 35.3017 2.27421 35.7523 3.94243L36.1663 5.47585C32.8685 11.7015 25.4513 17.1521 16.2618 20.0867C13.8547 20.8554 11.3497 21.4776 8.92694 22.0803C7.70837 22.3836 6.44802 22.696 5.21117 23.0252C1.37786 24.0441 -0.792829 27.9236 0.269006 31.855C0.782291 33.7566 1.97081 35.3379 3.61777 36.3088C4.71748 36.9569 5.93996 37.2887 7.18072 37.2887C7.78674 37.2887 8.39667 37.2097 8.99877 37.0502C9.22864 36.9893 9.45851 36.9271 9.68838 36.8636L16.3284 48.278C16.7908 49.0726 17.5392 49.6403 18.4364 49.8788C18.7368 49.9592 19.0424 49.9981 19.3454 49.9981C19.9462 49.9981 20.5379 49.8425 21.0695 49.5379C21.8701 49.0791 22.4421 48.3363 22.6838 47.4458C22.9241 46.5553 22.8026 45.6272 22.3403 44.834L16.5883 34.9478C17.7377 34.6445 18.8949 34.358 20.0494 34.1117C29.4858 32.0922 38.6557 33.1331 44.6479 36.8882L45.062 38.4216C45.2801 39.2279 45.8025 39.9019 46.5339 40.3219C47.0224 40.6018 47.5631 40.7444 48.1103 40.7444C48.3833 40.7444 48.6576 40.7081 48.9279 40.6368C49.7403 40.4204 50.4194 39.9019 50.8426 39.176C51.2658 38.4501 51.3781 37.6063 51.16 36.8001L47.7851 24.302L51.8339 21.9338C52.0873 21.7861 52.2088 21.4892 52.133 21.2079V21.2066Z" fill="#6D7BFC" />
                  <path d="M8.65918 35.7987C7.16895 36.1954 5.61473 35.9815 4.28384 35.196C2.93337 34.3988 1.95512 33.0935 1.53065 31.5212C0.658195 28.2911 2.424 25.1102 5.54942 24.2793C6.77582 23.9527 8.02965 23.6416 9.24429 23.3395C11.4724 22.7861 13.7698 22.2131 16.0137 21.5236L19.1116 32.9911C16.8221 33.5083 14.5443 34.1512 12.3358 34.7786C11.1316 35.1195 9.88688 35.4734 8.65918 35.7987Z" fill="white" />
                  <path d="M21.2066 45.4827C21.494 45.9766 21.5697 46.556 21.4195 47.1121C21.2693 47.6681 20.9128 48.1322 20.4139 48.4173C19.3808 49.0097 18.0538 48.6571 17.4569 47.6305L10.9854 36.5065C11.56 36.3457 12.1308 36.1837 12.6924 36.0243C13.5466 35.7819 14.4112 35.5369 15.281 35.2984L21.2053 45.4827H21.2066Z" fill="white" />
                  <path d="M20.3903 32.7189L17.2583 21.1256C25.9175 18.2364 33.0095 13.1462 36.6469 7.25879L44.1659 35.1066C38.0496 31.8129 29.3447 30.9237 20.3903 32.7176V32.7189Z" fill="white" />
                  <path d="M49.7089 38.5272C49.4607 38.9537 49.0624 39.2583 48.5883 39.384C48.1129 39.5111 47.6152 39.445 47.1855 39.1987C46.7558 38.9524 46.4489 38.557 46.3222 38.0865L37.0139 3.60864C36.7501 2.63 37.3365 1.62155 38.3226 1.35971C39.3073 1.09788 40.3248 1.67988 40.5886 2.65852L49.8969 37.1351C50.0236 37.6069 49.957 38.1008 49.7089 38.5272Z" fill="white" />
                  <path d="M47.4337 23.0013L45.5752 16.121L49.4163 16.1547L50.742 21.066L47.4337 23.0013Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_965_12140">
                    <rect width="64" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#212746] mb-2">Now Hiring!</h4>
            <p className="text-sm text-[#212746] mb-4 leading-relaxed">
              Buone notizie! Intesa Sanpaolo sta assumendo!
            </p>
            <button className="bg-[#6D7BFC] hover:bg-[#5A68E0] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2">
              Vedi annuncio
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Box 2: Candidati con un Recruiter */}
          <div className="bg-[#D0E957] p-6 flex flex-col items-center justify-center text-center flex-1 hover:bg-[#D8F76B] transition-colors cursor-pointer group">
            <div className="mb-3 transform group-hover:scale-105 transition-transform">
              <svg width="40" height="46" viewBox="0 0 48 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_965_12152)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M47.8951 9.45685C47.8777 9.42873 47.858 9.40286 47.8373 9.37812C47.8351 9.37587 47.8329 9.37362 47.8308 9.37024C47.8078 9.34438 47.7838 9.31963 47.7577 9.29826L36.978 0.15409C36.978 0.15409 36.9747 0.15184 36.9736 0.150716C36.9529 0.13272 36.93 0.116973 36.9071 0.102352C36.9038 0.100102 36.8995 0.0978528 36.8962 0.0956033C36.798 0.0359918 36.6845 0 36.5623 0H6.87682C5.50863 0 4.39575 1.14724 4.39575 2.55767V46.281C4.39575 46.5543 4.55505 46.7995 4.79944 46.9041C5.04384 47.0087 5.32533 46.9513 5.51299 46.7579L8.09117 44.1012C8.42066 43.7604 8.86145 43.5737 9.3317 43.5737C9.80194 43.5737 10.2351 43.7582 10.5646 44.0922C10.5668 44.0956 10.57 44.0979 10.5722 44.1012C10.9028 44.4409 11.0839 44.8953 11.0839 45.3801C11.0839 45.8648 10.9028 46.3192 10.5722 46.6589L6.01706 51.3558C5.84795 51.5302 5.78467 51.7855 5.85122 52.0217C5.91778 52.2579 6.10326 52.4378 6.33674 52.4918C6.5135 52.5323 6.69461 52.5537 6.87682 52.5537H45.5188C46.887 52.5537 47.9999 51.4064 47.9999 49.9949V9.82127C47.9999 9.68742 47.9617 9.56145 47.8951 9.45685Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.01594 51.204H45.5189C46.1648 51.204 46.6907 50.6619 46.6907 49.9949V10.4961H36.5613C36.2001 10.4961 35.9067 10.1947 35.9067 9.82128V1.3497H6.87687C6.23097 1.3497 5.70508 1.89183 5.70508 2.55768V44.6512L7.16491 43.1463C7.74208 42.5513 8.51128 42.224 9.33175 42.224C10.1522 42.224 10.9214 42.5513 11.4986 43.1463C11.5019 43.1508 11.5062 43.1542 11.5095 43.1587C12.079 43.7514 12.3933 44.5399 12.3933 45.3801C12.3933 46.2203 12.0758 47.0188 11.4986 47.6138L8.01594 51.204Z" fill="white" />
                  <path d="M26.4007 25.6667C23.7544 25.6667 21.6001 23.474 21.6001 20.7778C21.6001 18.0815 23.7531 15.8889 26.4007 15.8889C29.0483 15.8889 31.2001 18.0815 31.2001 20.7778C31.2001 23.474 29.0471 25.6667 26.4007 25.6667Z" fill="#6D7BFC" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M37.2161 9.14642H45.519L37.2161 2.1044V9.14642Z" fill="white" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.036 44.2981C10.868 44.2981 10.7011 44.2328 10.5723 44.1012C10.317 43.8369 10.317 43.4095 10.5723 43.1463L14.079 39.5314C14.3354 39.2682 14.7489 39.2682 15.0053 39.5314C15.2606 39.7957 15.2606 40.222 15.0053 40.4863L11.4986 44.1012C11.371 44.2328 11.203 44.2981 11.036 44.2981Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.06151 55C2.24212 55 1.47184 54.6727 0.895759 54.0777C0.892485 54.0743 0.890303 54.0721 0.88703 54.0698C0.315316 53.476 0 52.6853 0 51.844C0 51.0027 0.318589 50.2052 0.895759 49.6102L7.16498 43.1463C7.74215 42.5513 8.51134 42.224 9.33182 42.224C10.1523 42.224 10.9215 42.5513 11.4987 43.1463C12.0758 43.7413 12.3933 44.5343 12.3933 45.3801C12.3933 46.2259 12.0758 47.0188 11.4987 47.6138L5.22835 54.0777C4.65227 54.6727 3.88198 55 3.06151 55Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.82649 53.1295C2.15599 53.4647 2.59459 53.6503 3.06157 53.6503C3.52854 53.6503 3.97369 53.4625 4.30319 53.1228L10.5735 46.66C11.2576 45.9537 11.2576 44.8064 10.5735 44.1012C10.2429 43.7615 9.80212 43.5737 9.33187 43.5737C8.86163 43.5737 8.42084 43.7604 8.09134 44.1012L1.82103 50.564C1.49153 50.9037 1.30933 51.3581 1.30933 51.844C1.30933 52.3299 1.49153 52.7831 1.82103 53.1228C1.82321 53.125 1.8254 53.1273 1.82649 53.1295Z" fill="white" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.3981 45.7467C21.7448 45.7467 17.3696 43.8785 14.079 40.4863C7.28715 33.4836 7.28715 22.09 14.079 15.0873C17.3696 11.6951 21.7448 9.82689 26.3981 9.82689C31.0515 9.82689 35.4266 11.6951 38.7173 15.0873C45.5091 22.09 45.5091 33.4836 38.7173 40.4863C35.4266 43.8785 31.0515 45.7467 26.3981 45.7467ZM26.3981 11.1777C22.0939 11.1777 18.0483 12.9053 15.0053 16.0422C8.72298 22.5185 8.72298 33.0551 15.0053 39.5314C18.0483 42.6694 22.095 44.397 26.3981 44.397C30.7013 44.397 34.748 42.6694 37.7909 39.5314C44.0733 33.0551 44.0733 22.5185 37.7909 16.0422C34.748 12.9053 30.7023 11.1777 26.3981 11.1777Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.3981 42.7437C22.5226 42.7437 18.8796 41.1881 16.1388 38.3628C10.4817 32.531 10.4817 23.0426 16.1388 17.2108C18.8796 14.3855 22.5226 12.83 26.3981 12.83C30.2735 12.83 33.9165 14.3855 36.6573 17.2108C42.3144 23.0426 42.3144 32.531 36.6573 38.3628C33.9176 41.1881 30.2735 42.7437 26.3981 42.7437ZM26.3981 14.1796C22.8729 14.1796 19.5571 15.5946 17.0641 18.1646C11.9175 23.47 11.9175 32.1036 17.0641 37.409C19.5571 39.979 22.8729 41.394 26.3981 41.394C29.9233 41.394 33.239 39.979 35.7321 37.409C40.8786 32.1036 40.8786 23.47 35.7321 18.1646C33.239 15.5946 29.9244 14.1796 26.3981 14.1796Z" fill="#212746" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M32.7823 37.8889C33.0037 37.8889 33.2129 37.8065 33.3714 37.6583C33.5177 37.5177 33.6 37.3315 33.6 37.1351V33.1458C33.6 29.6949 30.6355 26.8889 26.9902 26.8889H25.8109C22.1656 26.8889 19.2 29.6962 19.2 33.1458V37.1351C19.2 37.5506 19.5664 37.8889 20.0176 37.8889H32.7823Z" fill="#6D7BFC" />
                </g>
                <defs>
                  <clipPath id="clip0_965_12152">
                    <rect width="48" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-[#212746] mb-2">Candidati con un Recruiter</h4>
            <p className="text-sm text-[#212746] mb-4 leading-relaxed">
              Candidati direttamente con un Recruiter HR di Intesa Sanpaolo
            </p>
            <button className="bg-[#212746] hover:bg-[#2D3456] text-[#D0E957] font-semibold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2">
              Manda la candidatura
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
