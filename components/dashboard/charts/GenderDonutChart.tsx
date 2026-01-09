'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface GenderDonutChartProps {
  data: Array<{ type: string; count: number; percentage: number }>;
}

// SOLID COLORS - NO GRADIENTS
const COLORS = {
  Male: '#6D7BFC',
  Female: '#B6DC00',
  Other: '#8D96AC',
};

// Male icon component
const MaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M14 10L20 4M20 4H15M20 4V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Female icon component
const FemaleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 14V21M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function GenderDonutChart({ data }: GenderDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Filter to only show Male and Female
  const filteredData = data.filter(item => item.type === 'Male' || item.type === 'Female');
  const total = filteredData.reduce((sum, item) => sum + item.count, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Calculate angle positions for icon placement
  const getIconPosition = (index: number) => {
    // Calculate the start and end angles for each slice
    let startAngle = 90; // Recharts starts from 90 degrees (top)
    for (let i = 0; i < index; i++) {
      startAngle -= (filteredData[i].count / total) * 360;
    }
    const sliceAngle = (filteredData[index].count / total) * 360;
    const midAngle = startAngle - sliceAngle / 2;

    // Convert to radians and calculate position (at ~60% of radius)
    const radius = 65; // Position icons at 60% of outer radius (110)
    const angleRad = (midAngle * Math.PI) / 180;
    const x = 130 + radius * Math.cos(angleRad); // 130 = center (50% of 260)
    const y = 130 - radius * Math.sin(angleRad);

    return { x, y };
  };

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Dark blue header */}
      <div className="bg-[#212746] flex items-center px-5 py-4 w-full rounded-none">
        <h3 className="font-medium text-[19px] text-white">
          Qual è il rapporto tra uomini e donne?
        </h3>
      </div>

      <div className="flex-1 flex items-center gap-8 p-6">
        {/* Full Pie Chart with icons */}
        <div className="relative w-[260px] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={110}
                paddingAngle={2}
                dataKey="count"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                startAngle={90}
                endAngle={-270}
              >
                {filteredData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.type as keyof typeof COLORS] || '#8D96AC'}
                    stroke="white"
                    strokeWidth={activeIndex === index ? 4 : 2}
                    style={{
                      filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Icons overlay */}
          {filteredData.map((entry, index) => {
            const pos = getIconPosition(index);
            const Icon = entry.type === 'Male' ? MaleIcon : FemaleIcon;
            return (
              <div
                key={`icon-${index}`}
                className="absolute pointer-events-none"
                style={{
                  left: pos.x - 12, // Center the 24px icon
                  top: pos.y - 12,
                  transition: 'transform 0.3s',
                  transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                <Icon className="text-white drop-shadow-md" />
              </div>
            );
          })}
        </div>

        {/* Legend - CLEAN */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          {filteredData.map((entry, index) => {
            const Icon = entry.type === 'Male' ? MaleIcon : FemaleIcon;
            return (
              <div
                key={entry.type}
                className="flex items-center gap-3 group cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Icon indicator */}
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      backgroundColor: COLORS[entry.type as keyof typeof COLORS] || '#8D96AC',
                      transform: activeIndex === index ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: activeIndex === index
                        ? `0 0 0 4px ${COLORS[entry.type as keyof typeof COLORS] || '#8D96AC'}30`
                        : 'none',
                    }}
                  >
                    <Icon className="text-white w-5 h-5" />
                  </div>
                </div>

                {/* Label and percentage */}
                <div className="flex-1 flex items-baseline justify-between">
                  <span
                    className="font-medium text-lg text-[#212746] transition-colors duration-300"
                    style={{
                      color: activeIndex === index ? COLORS[entry.type as keyof typeof COLORS] : '#212746',
                    }}
                  >
                    {entry.type === 'Male' ? 'Uomini' : 'Donne'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-semibold text-3xl transition-all duration-300"
                      style={{
                        color: activeIndex === index ? COLORS[entry.type as keyof typeof COLORS] : '#212746',
                      }}
                    >
                      {entry.percentage}%
                    </span>
                    <span className="font-normal text-base text-[#8D96AC]">({entry.count})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
